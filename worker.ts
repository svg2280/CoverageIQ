// Cloudflare Worker entry — serves static assets and proxies /api/rss
// Bypasses CORS and applies short-lived caching for journal RSS feeds.

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
}

// Where feedback emails land
const FEEDBACK_TO = "scottvg@oneMDmedical.com";
// Resend's default sender domain — works without DNS verification.
// Switch to "feedback@coverageiq.net" once the domain is verified in Resend.
const FEEDBACK_FROM = "CoverageIQ Feedback <onboarding@resend.dev>";

// Domains we are willing to fetch RSS from. Any other URL is rejected.
const ALLOWED_HOSTS = new Set<string>([
  "www.nejm.org",
  "nejm.org",
  "jamanetwork.com",
  "academic.oup.com",
  "www.thelancet.com",
  "thelancet.com",
  "www.idsociety.org",
  "idsociety.org",
  "www.idse.net",
  "www.contagionlive.com",
  "www.healio.com",
]);

// 1-hour edge cache
const CACHE_TTL_SECONDS = 60 * 60;

// Lightweight RSS / Atom item extractor. We avoid pulling in a parser dep.
function textBetween(src: string, openTag: string, closeTag: string): string {
  const i = src.indexOf(openTag);
  if (i < 0) return "";
  const start = i + openTag.length;
  const j = src.indexOf(closeTag, start);
  if (j < 0) return "";
  return src.slice(start, j);
}

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .trim();
}

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

function parseFeed(xml: string): { title: string; items: RssItem[] } {
  const channelTitle =
    decodeEntities(textBetween(xml, "<title>", "</title>")) ||
    decodeEntities(textBetween(xml, "<title", "</title>").replace(/^[^>]*>/, ""));

  const items: RssItem[] = [];

  // RSS 2.0 <item> blocks
  const itemRe = /<item\b[\s\S]*?<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[0];
    const title = decodeEntities(textBetween(block, "<title>", "</title>"));
    const link =
      decodeEntities(textBetween(block, "<link>", "</link>")) ||
      decodeEntities(textBetween(block, '<link rel="alternate" href="', '"'));
    const pubDate =
      decodeEntities(textBetween(block, "<pubDate>", "</pubDate>")) ||
      decodeEntities(textBetween(block, "<dc:date>", "</dc:date>")) ||
      decodeEntities(textBetween(block, "<published>", "</published>")) ||
      decodeEntities(textBetween(block, "<updated>", "</updated>"));
    const summary =
      decodeEntities(textBetween(block, "<description>", "</description>")) ||
      decodeEntities(textBetween(block, "<summary>", "</summary>")) ||
      decodeEntities(textBetween(block, "<content:encoded>", "</content:encoded>"));
    if (title || link) items.push({ title, link, pubDate, summary });
  }

  // Atom <entry> blocks (fallback)
  if (items.length === 0) {
    const entryRe = /<entry\b[\s\S]*?<\/entry>/g;
    while ((m = entryRe.exec(xml)) !== null) {
      const block = m[0];
      const title = decodeEntities(textBetween(block, "<title>", "</title>"));
      const linkMatch = block.match(/<link[^>]*href="([^"]+)"/);
      const link = linkMatch ? decodeEntities(linkMatch[1]) : "";
      const pubDate =
        decodeEntities(textBetween(block, "<published>", "</published>")) ||
        decodeEntities(textBetween(block, "<updated>", "</updated>"));
      const summary =
        decodeEntities(textBetween(block, "<summary>", "</summary>")) ||
        decodeEntities(textBetween(block, "<content>", "</content>"));
      if (title || link) items.push({ title, link, pubDate, summary });
    }
  }

  return { title: channelTitle, items: items.slice(0, 25) };
}

async function handleRss(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response(JSON.stringify({ error: "missing url param" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new Response(JSON.stringify({ error: "invalid url" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return new Response(JSON.stringify({ error: "host not allowed", host: parsed.hostname }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Edge-cached fetch of the upstream feed
  const cacheUrl = new URL(req.url);
  cacheUrl.searchParams.set("__cached", "1");
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });
  // @ts-ignore — caches.default exists on Cloudflare
  const cache = caches.default as Cache;

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let xml: string;
  let upstreamStatus = 0;
  try {
    const r = await fetch(parsed.toString(), {
      headers: {
        "User-Agent": "CoverageIQ/1.0 (+https://coverageiq.net) RSS-Aggregator",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
      // @ts-ignore — Cloudflare-specific
      cf: { cacheTtl: CACHE_TTL_SECONDS, cacheEverything: true },
    });
    upstreamStatus = r.status;
    if (!r.ok) {
      return new Response(
        JSON.stringify({ error: "upstream error", status: r.status, url: parsed.toString() }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    xml = await r.text();
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "fetch failed", detail: String(e?.message || e) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const feed = parseFeed(xml);
  const body = JSON.stringify({ ...feed, source: parsed.toString(), upstreamStatus });
  const resp = new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}, s-maxage=${CACHE_TTL_SECONDS}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

  // Stash in edge cache
  // @ts-ignore
  await cache.put(cacheKey, resp.clone());
  return resp;
}

// ---- Feedback handler --------------------------------------------------

function stripTags(s: string, max = 4000): string {
  return String(s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/[\r\n]+/g, "\n")
    .slice(0, max)
    .trim();
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(s: string): boolean {
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

async function handleFeedback(req: Request, env: Env): Promise<Response> {
  // CORS preflight (same-origin in practice, but be tolerant)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "email service not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const message = stripTags(body?.message ?? "", 4000);
  if (!message) {
    return new Response(JSON.stringify({ error: "message required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const replyToRaw = stripTags(body?.replyTo ?? "", 254);
  const replyTo = isValidEmail(replyToRaw) ? replyToRaw : "";
  const page = stripTags(body?.page ?? "", 500);
  const userAgent = stripTags(body?.userAgent ?? req.headers.get("user-agent") ?? "", 500);
  const cf = (req as any).cf ?? {};
  const country = stripTags(cf?.country ?? "", 8);

  const text = [
    message,
    "",
    "---",
    `Page: ${page || "(unknown)"}`,
    `Reply-To: ${replyTo || "(none provided)"}`,
    `Country: ${country || "(unknown)"}`,
    `UA: ${userAgent || "(unknown)"}`,
    `Sent: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:#1a1a1a;">
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.55;border-left:3px solid #111;padding:8px 14px;background:#fafafa;">${escapeHtml(message)}</div>
      <hr style="border:none;border-top:1px solid #e5e5e5;margin:18px 0;" />
      <table style="font-size:12px;color:#555;border-collapse:collapse;">
        <tr><td style="padding:2px 10px 2px 0;"><b>Page</b></td><td>${escapeHtml(page || "(unknown)")}</td></tr>
        <tr><td style="padding:2px 10px 2px 0;"><b>Reply-To</b></td><td>${escapeHtml(replyTo || "(none provided)")}</td></tr>
        <tr><td style="padding:2px 10px 2px 0;"><b>Country</b></td><td>${escapeHtml(country || "(unknown)")}</td></tr>
        <tr><td style="padding:2px 10px 2px 0;"><b>UA</b></td><td>${escapeHtml(userAgent || "(unknown)")}</td></tr>
        <tr><td style="padding:2px 10px 2px 0;"><b>Sent</b></td><td>${new Date().toISOString()}</td></tr>
      </table>
    </div>
  `;

  const payload: Record<string, unknown> = {
    from: FEEDBACK_FROM,
    to: [FEEDBACK_TO],
    subject: `CoverageIQ feedback${replyTo ? ` — from ${replyTo}` : ""}`,
    text,
    html,
  };
  if (replyTo) payload.reply_to = replyTo;

  let r: Response;
  try {
    r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "network error", detail: String(e?.message || e) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: "resend error", status: r.status, detail: detail.slice(0, 500) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await r.json().catch(() => ({}));
  return new Response(JSON.stringify({ ok: true, id: (data as any)?.id ?? null }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/api/rss") return handleRss(req);
    if (url.pathname === "/api/feedback") return handleFeedback(req, env);
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    // Static SPA fallback
    return env.ASSETS.fetch(req);
  },
};
