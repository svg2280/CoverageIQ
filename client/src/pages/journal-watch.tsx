// Journal Watch — aggregated RSS from top ID journals + WordPress blog link.
// Hash-routed at /#/journal-watch. Uses the worker /api/rss proxy to bypass CORS.
// Layout: above-the-fold by default — feeds are paneled in a horizontally
// scrollable grid; clicking a panel expands it inline.
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ExternalLink, Newspaper, Rss, RefreshCw } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

// ---- WordPress blog (replace via env or update here when finalized) ----
export const BLOG_URL = "https://blog.coverageiq.net";
export const BLOG_LABEL = "CoverageIQ Blog";

interface FeedDef {
  id: string;
  title: string;
  short: string;
  org: string;
  url: string;
  homepage: string;
  accent: "primary" | "alternate" | "class" | "none";
}

const FEEDS: FeedDef[] = [
  {
    id: "nejm-id",
    title: "NEJM — Infectious Disease",
    short: "NEJM",
    org: "New England Journal of Medicine",
    url: "https://www.nejm.org/action/showFeed?type=etoc&feed=rss&jc=nejm&topic=infectious-disease",
    homepage: "https://www.nejm.org/specialty/infectious-disease",
    accent: "primary",
  },
  {
    id: "jama-id",
    title: "JAMA — Infectious Diseases",
    short: "JAMA",
    org: "JAMA Network",
    url: "https://jamanetwork.com/rss/site_3/67.xml",
    homepage: "https://jamanetwork.com/collections/44038/infectious-diseases",
    accent: "primary",
  },
  {
    id: "cid",
    title: "Clinical Infectious Diseases",
    short: "CID",
    org: "IDSA / Oxford Academic",
    url: "https://academic.oup.com/rss/site_5269/3135.xml",
    homepage: "https://academic.oup.com/cid",
    accent: "alternate",
  },
  {
    id: "jid",
    title: "Journal of Infectious Diseases",
    short: "JID",
    org: "IDSA / Oxford Academic",
    url: "https://academic.oup.com/rss/site_5309/3175.xml",
    homepage: "https://academic.oup.com/jid",
    accent: "alternate",
  },
  {
    id: "ofid",
    title: "Open Forum Infectious Diseases",
    short: "OFID",
    org: "IDSA / Oxford Academic",
    url: "https://academic.oup.com/rss/site_5338/3204.xml",
    homepage: "https://academic.oup.com/ofid",
    accent: "alternate",
  },
  {
    id: "cidr",
    title: "Clinical Infectious Diseases (Advance Articles)",
    short: "CID Online First",
    org: "IDSA / Oxford Academic",
    url: "https://academic.oup.com/rss/site_5269/advanceAccess_3135.xml",
    homepage: "https://academic.oup.com/cid/advance-articles",
    accent: "class",
  },
];

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

interface FeedState {
  status: "idle" | "loading" | "ready" | "error";
  items: FeedItem[];
  error?: string;
  fetchedAt?: number;
}

const SUMMARY_LIMIT = 240;

function shortenSummary(s: string): string {
  const trimmed = s.replace(/\s+/g, " ").trim();
  if (trimmed.length <= SUMMARY_LIMIT) return trimmed;
  return trimmed.slice(0, SUMMARY_LIMIT - 1).replace(/[\s,;:.]+$/, "") + "…";
}

function relativeTime(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  if (diff < 86400 * 14) return `${Math.round(diff / 86400)}d ago`;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function accentClass(a: FeedDef["accent"]): string {
  switch (a) {
    case "primary":
      return "feed-card--primary";
    case "alternate":
      return "feed-card--alternate";
    case "class":
      return "feed-card--class";
    default:
      return "";
  }
}

// Smaller pill used inside the marquee ticker.
function accentChip(a: FeedDef["accent"]): string {
  switch (a) {
    case "primary":
      return "bg-primary text-primary-foreground";
    case "alternate":
      return "bg-accent text-foreground";
    case "class":
      return "bg-muted text-foreground";
    default:
      return "bg-card text-foreground";
  }
}

export default function JournalWatchPage() {
  const [feeds, setFeeds] = useState<Record<string, FeedState>>(() =>
    Object.fromEntries(FEEDS.map((f) => [f.id, { status: "idle", items: [] }])),
  );
  const [active, setActive] = useState<string | null>(null);
  const [bumpKey, setBumpKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setFeeds((prev) =>
      Object.fromEntries(
        FEEDS.map((f) => [f.id, { ...prev[f.id], status: "loading" as const }]),
      ),
    );

    FEEDS.forEach(async (f) => {
      try {
        const r = await fetch(`/api/rss?url=${encodeURIComponent(f.url)}`);
        if (!r.ok) {
          const errBody = await r.text().catch(() => "");
          throw new Error(`HTTP ${r.status}${errBody ? ` — ${errBody.slice(0, 80)}` : ""}`);
        }
        const data = (await r.json()) as { items?: FeedItem[]; title?: string; error?: string };
        if (cancelled) return;
        if (data.error) throw new Error(data.error);
        setFeeds((prev) => ({
          ...prev,
          [f.id]: {
            status: "ready",
            items: data.items ?? [],
            fetchedAt: Date.now(),
          },
        }));
      } catch (e: any) {
        if (cancelled) return;
        setFeeds((prev) => ({
          ...prev,
          [f.id]: {
            status: "error",
            items: [],
            error: e?.message || String(e),
          },
        }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [bumpKey]);

  const total = useMemo(
    () => Object.values(feeds).reduce((acc, s) => acc + s.items.length, 0),
    [feeds],
  );

  const latest = useMemo(() => {
    const all: { feed: FeedDef; item: FeedItem }[] = [];
    FEEDS.forEach((f) => {
      const st = feeds[f.id];
      if (!st) return;
      st.items.slice(0, 5).forEach((it) => all.push({ feed: f, item: it }));
    });
    return all
      .filter(({ item }) => item.pubDate)
      .sort(
        (a, b) =>
          (new Date(b.item.pubDate).getTime() || 0) -
          (new Date(a.item.pubDate).getTime() || 0),
      )
      .slice(0, 24);
  }, [feeds]);

  const activeFeed = active ? FEEDS.find((f) => f.id === active) : null;
  const activeState = active ? feeds[active] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground journal-watch">
      <header className="flex-shrink-0 border-b-2 border-foreground bg-background">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6 py-2 flex items-center gap-3">
          <a href="#/" className="flex items-center gap-2 px-1 py-0.5" data-testid="link-home">
            <Logo className="w-8 h-8" />
            <div className="leading-tight">
              <div className="font-serif font-black text-[18px] tracking-tight">CoverageIQ</div>
              <div className="font-script text-[12px] text-muted-foreground -mt-0.5">
                an antimicrobial atlas
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-2 ml-4">
            <a
              href="#/"
              className="px-3 py-1.5 font-serif font-bold text-[13px] tracking-tight border-2 border-foreground bg-card hover:bg-accent transition-colors"
              data-testid="link-back-atlas"
            >
              <ChevronLeft className="inline w-3.5 h-3.5 -mt-0.5 mr-0.5" />
              Atlas
            </a>
            <span className="px-3 py-1.5 font-serif font-bold text-[13px] tracking-tight border-2 border-foreground bg-foreground text-background">
              <Newspaper className="inline w-3.5 h-3.5 -mt-0.5 mr-1" />
              Journal Watch
            </span>
          </div>

          <div className="flex-1" />

          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 font-serif font-bold text-[13px] tracking-tight border-2 border-foreground bg-accent hover:bg-foreground hover:text-background transition-colors"
            data-testid="link-blog"
          >
            <Rss className="w-3.5 h-3.5" />
            {BLOG_LABEL}
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <button
            onClick={() => setBumpKey((k) => k + 1)}
            className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider border-2 border-foreground bg-card hover:bg-accent transition-colors flex items-center gap-1"
            title="Refresh all feeds"
            data-testid="btn-refresh"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6 py-3 h-full flex flex-col gap-3">
          {/* Hero strip — marquee ticker of latest headlines across all journals */}
          <section
            aria-label="Latest across all journals"
            className="border-2 border-foreground bg-card flex items-stretch overflow-hidden"
            data-testid="latest-strip"
          >
            {/* Fixed label (sticky-style, not part of the moving track) */}
            <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-r-2 border-foreground bg-foreground text-background">
              <span className="font-serif font-black text-[13px] tracking-tight uppercase">
                Latest
              </span>
              <span className="hidden md:inline font-mono text-[9.5px] uppercase tracking-wider opacity-80">
                {total} headlines
              </span>
            </div>

            {/* Marquee */}
            <div
              className="relative flex-1 min-w-0 overflow-hidden marquee-mask marquee-pause"
              role="marquee"
              aria-label="Scrolling headlines"
            >
              {latest.length === 0 ? (
                <div className="px-3 py-2 text-[12px] text-muted-foreground">
                  Loading current issues…
                </div>
              ) : (
                <div className="marquee-track" aria-hidden={false}>
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex items-center gap-0" aria-hidden={copy === 1}>
                      {latest.map(({ feed, item }, i) => (
                        <a
                          key={`${copy}-${i}`}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-3 py-2 border-r border-foreground/20 hover:bg-accent/50 transition-colors"
                          tabIndex={copy === 1 ? -1 : 0}
                          data-testid={copy === 0 ? `ticker-item-${i}` : undefined}
                        >
                          <span
                            className={cn(
                              "shrink-0 inline-flex items-center justify-center px-1.5 py-0.5 border border-foreground font-mono text-[9.5px] uppercase tracking-wider",
                              accentChip(feed.accent),
                            )}
                            title={feed.org}
                          >
                            {feed.short}
                          </span>
                          <span className="text-[12px] leading-tight max-w-[460px] truncate group-hover:underline underline-offset-2">
                            {item.title}
                          </span>
                          <span className="shrink-0 font-mono text-[9.5px] text-muted-foreground">
                            {relativeTime(item.pubDate)}
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Feed grid — above the fold */}
          <section
            aria-label="Journal feeds"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 flex-1 min-h-0"
          >
            {FEEDS.map((f) => {
              const st = feeds[f.id];
              const items = st?.items ?? [];
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "feed-card text-left flex flex-col border-2 border-foreground bg-card overflow-hidden hover:shadow-[4px_4px_0_0_var(--foreground)] transition-shadow",
                    accentClass(f.accent),
                  )}
                  data-testid={`feed-${f.id}`}
                >
                  <div className="flex items-center justify-between border-b-2 border-foreground px-2.5 py-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider">
                      {f.short}
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground">
                      {st?.status === "loading"
                        ? "loading…"
                        : st?.status === "error"
                          ? "feed unavailable"
                          : `${items.length} items`}
                    </div>
                  </div>
                  <div className="px-2.5 pt-1.5 pb-1">
                    <div className="font-serif font-black text-[14px] leading-tight tracking-tight">
                      {f.title}
                    </div>
                    <div className="font-script text-[11px] text-muted-foreground -mt-0.5">
                      {f.org}
                    </div>
                  </div>
                  <ul className="px-2.5 pb-2 pt-1 space-y-1 flex-1 overflow-hidden text-[11.5px] leading-snug">
                    {st?.status === "loading" &&
                      Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="h-3 bg-accent/40 animate-pulse rounded-sm" />
                      ))}
                    {st?.status === "error" && (
                      <li className="text-muted-foreground italic text-[10.5px]">
                        {st.error || "Unable to load — open the journal directly →"}
                      </li>
                    )}
                    {items.slice(0, 4).map((it, i) => (
                      <li key={i} className="truncate">
                        <span className="font-mono text-[9px] uppercase text-muted-foreground mr-1">
                          {relativeTime(it.pubDate) || "—"}
                        </span>
                        {it.title}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </section>
        </div>
      </main>

      {activeFeed && activeState && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-background border-2 border-foreground max-w-[900px] w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeFeed.title}
          >
            <div className="border-b-2 border-foreground px-4 py-2 flex items-center gap-3">
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {activeFeed.short} · {activeFeed.org}
                </div>
                <div className="font-serif font-black text-[18px] leading-tight">
                  {activeFeed.title}
                </div>
              </div>
              <a
                href={activeFeed.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border-2 border-foreground bg-card hover:bg-accent inline-flex items-center gap-1"
              >
                Visit journal
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setActive(null)}
                className="px-2 py-1 font-mono text-[12px] uppercase tracking-wider border-2 border-foreground bg-card hover:bg-accent"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-foreground/30">
              {activeState.status === "loading" && (
                <li className="px-4 py-6 text-center text-muted-foreground">Loading…</li>
              )}
              {activeState.status === "error" && (
                <li className="px-4 py-6 text-center text-muted-foreground">
                  Could not reach this feed: {activeState.error || "unknown error"}
                </li>
              )}
              {activeState.items.map((it, i) => (
                <li key={i} className="px-4 py-3 hover:bg-accent/40">
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex items-baseline gap-2">
                      <div className="font-serif font-bold text-[14px] leading-tight flex-1">
                        {it.title}
                      </div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground shrink-0">
                        {relativeTime(it.pubDate)}
                      </div>
                    </div>
                    {it.summary && (
                      <div className="text-[12px] leading-snug text-muted-foreground mt-1">
                        {shortenSummary(it.summary)}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <footer className="flex-shrink-0 border-t-2 border-foreground bg-card">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6 py-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-between flex-wrap gap-2">
          <span>
            Journal Watch · feeds proxied via worker · cached 1h · sources:{" "}
            {FEEDS.map((f, i) => (
              <span key={f.id}>
                <a href={f.homepage} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {f.short}
                </a>
                {i < FEEDS.length - 1 ? " · " : ""}
              </span>
            ))}
          </span>
          <span>
            <a href="#/" className="hover:underline">Atlas</a>
            {" · "}
            <a href="#/disclaimer" className="hover:underline">Disclaimer</a>
            {" · "}
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Blog
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
