// Cloudflare Pages Worker — handles /api/rss for Journal Watch.
// Falls through to static assets for everything else.
//
// Pages auto-detects this file at the build-output root (dist/public/_worker.js).

const ALLOWED_HOSTS = new Set([
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

const CACHE_TTL = 60 * 60; // 1 hour

function textBetween(src, openTag, closeTag) {
  const i = src.indexOf(openTag);
  if (i < 0) return "";
  const start = i + openTag.length;
  const j = src.indexOf(closeTag, start);
  if (j < 0) return "";
  return src.slice(start, j);
}

function decodeEntities(s) {
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

function parseFeed(xml) {
  const channelTitle = decodeEntities(textBetween(xml, "<title>", "</title>"));
  const items = [];

  const itemRe = /<item\b[\s\S]*?<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[0];
    const title = decodeEntities(textBetween(block, "<title>", "</title>"));
    let link = decodeEntities(textBetween(block, "<link>", "</link>"));
    if (!link) {
      const lm = block.match(/<link[^>]*href="([^"]+)"/);
      if (lm) link = decodeEntities(lm[1]);
    }
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

  if (items.length === 0) {
    const entryRe = /<entry\b[\s\S]*?<\/entry>/g;
    while ((m = entryRe.exec(xml)) !== null) {
      const block = m[0];
      const title = decodeEntities(textBetween(block, "<title>", "</title>"));
      const lm = block.match(/<link[^>]*href="([^"]+)"/);
      const link = lm ? decodeEntities(lm[1]) : "";
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

async function handleRss(req) {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");
  if (!target) {
    return new Response(JSON.stringify({ error: "missing url param" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return new Response(JSON.stringify({ error: "invalid url" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
  if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return new Response(JSON.stringify({ error: "host not allowed", host: parsed.hostname }), {
      status: 403,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const cache = caches.default;
  const cacheKey = new Request(`https://cache.coverageiq/rss?u=${encodeURIComponent(parsed.toString())}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let xml;
  try {
    const r = await fetch(parsed.toString(), {
      headers: {
        "User-Agent": "CoverageIQ/1.0 (+https://coverageiq.net) RSS-Aggregator",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
      },
      cf: { cacheTtl: CACHE_TTL, cacheEverything: true },
    });
    if (!r.ok) {
      return new Response(
        JSON.stringify({ error: "upstream error", status: r.status, url: parsed.toString() }),
        { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    xml = await r.text();
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "fetch failed", detail: String(e && e.message || e) }),
      { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }

  const feed = parseFeed(xml);
  const resp = new Response(JSON.stringify({ ...feed, source: parsed.toString() }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
  await cache.put(cacheKey, resp.clone());
  return resp;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/api/rss") return handleRss(req);
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
    // Fall through to static assets
    return env.ASSETS.fetch(req);
  },
};
