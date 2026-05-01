import { useState, useMemo } from "react";
import { modules, type ModuleKey } from "@/data";
import { Matrix, type Selection } from "@/components/matrix";
import { DetailPanel } from "@/components/detail-panel";
import { Logo } from "@/components/logo";
import { Legend } from "@/components/legend";
import { useTheme, FLAVOR_META, type ThemeFlavor } from "@/components/theme-provider";
import { Search, Sun, Moon, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUG_IMAGES, type BugImage } from "@/data/bug-images";

const moduleOrder: ModuleKey[] = ["antibacterials", "antifungals", "antivirals"];

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("antibacterials");
  const [hovered, setHovered] = useState<Selection>(null);
  const [pinned, setPinned] = useState<Selection>(null);
  const [search, setSearch] = useState("");
  // Bug images are bundled into the JS at build time so they survive any
  // proxy that 404s static JSON files.
  const bugImages: Record<string, BugImage> = BUG_IMAGES;
  const { theme, flavor, toggle: toggleTheme, cycleFlavor } = useTheme();

  function changeModule(key: ModuleKey) {
    if (key === activeModule) return;
    setActiveModule(key);
    setHovered(null);
    setPinned(null);
    setSearch("");
  }

  const data = modules[activeModule];

  function onPin(sel: Selection) {
    if (pinned && sel && pinned.kind === sel.kind && pinned.id === sel.id) {
      setPinned(null);
    } else {
      setPinned(sel);
    }
  }

  // URL-only map for components that just need an image src
  const bugImageUrls = useMemo<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(bugImages)) out[k] = v.url;
    return out;
  }, [bugImages]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const drugImages = useMemo<Record<string, string>>(() => ({}), []);

  const flavorMeta = FLAVOR_META[flavor as ThemeFlavor];

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="flex-shrink-0 border-b-2 border-foreground bg-background">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6 py-2 flex items-center gap-3">
          <a
            href="#/"
            className="flex items-center gap-2 px-1 py-0.5"
            data-testid="link-home"
          >
            <Logo className="w-8 h-8" />
            <div className="leading-tight">
              <div className="font-serif font-black text-[18px] tracking-tight">
                CoverageIQ
              </div>
              <div className="font-script text-[12px] text-muted-foreground -mt-0.5">
                an antimicrobial atlas
              </div>
            </div>
          </a>

          {/* MODULE TABS */}
          <nav
            className="hidden md:flex items-center ml-3 border-2 border-foreground"
            role="tablist"
            aria-label="Antimicrobial module"
          >
            {moduleOrder.map((key, i) => {
              const m = modules[key];
              const active = key === activeModule;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => changeModule(key)}
                  data-testid={`tab-${key}`}
                  className={cn(
                    "px-3.5 py-1.5 font-serif font-bold text-[13px] tracking-tight transition-colors",
                    i > 0 && "border-l-2 border-foreground",
                    active
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-accent",
                  )}
                >
                  <span aria-hidden className="mr-1">{m.emoji}</span>
                  {m.label}
                </button>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* SEARCH */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drugs, bugs, syndromes…"
              className="pl-8 pr-3 py-1.5 w-56 lg:w-72 h-8 bg-card border-2 border-foreground text-[13px] font-mono outline-none focus:bg-background"
              data-testid="input-search"
            />
          </div>

          {/* FLAVOR SWITCHER */}
          <button
            onClick={cycleFlavor}
            className="theme-switcher"
            title={`Theme: ${flavorMeta.label} — ${flavorMeta.subtitle}`}
            aria-label="Switch visual theme"
            data-testid="button-flavor"
          >
            <span aria-hidden className="text-[14px] leading-none">{flavorMeta.emoji}</span>
            <span>{flavorMeta.label}</span>
          </button>

          {/* DARK / LIGHT */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="button-theme"
            className="w-8 h-8 grid place-items-center border-2 border-foreground bg-card hover:bg-foreground hover:text-background transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/scottvangemert23/coverageiq"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:grid w-8 h-8 place-items-center border-2 border-foreground bg-card hover:bg-foreground hover:text-background transition-colors"
            aria-label="GitHub"
            data-testid="link-github"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile module tabs */}
        <div className="md:hidden border-t-2 border-foreground px-4 py-2 flex gap-1 overflow-x-auto">
          {moduleOrder.map((key) => {
            const m = modules[key];
            const active = key === activeModule;
            return (
              <button
                key={key}
                onClick={() => changeModule(key)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border-2 border-foreground",
                  active ? "bg-foreground text-background" : "bg-card",
                )}
              >
                <span aria-hidden>{m.emoji}</span>
                {m.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* HERO STRIP — single line, compact */}
      <section className="flex-shrink-0 max-w-[1700px] w-full mx-auto px-4 lg:px-6 pt-2 pb-1.5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-baseline gap-3 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
              <Sparkles className="w-3 h-3" style={{ color: `hsl(var(--${data.accent}))` }} />
              <span className="hidden sm:inline">Module · </span>
              <span>{data.label}</span>
            </div>
            <h1 className="font-serif font-black text-[17px] leading-tight tracking-tight truncate">
              The interactive antimicrobial spectrum atlas.
            </h1>
          </div>

          <Legend />
        </div>
      </section>

      {/* MAIN MATRIX — fills all remaining vertical space */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 lg:px-6 pb-2 min-h-0 flex">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-3 w-full min-h-0">
          {/* Left: Matrix container with feature card pinned bottom-right */}
          <div className="relative flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <Matrix
                data={data}
                hovered={hovered}
                pinned={pinned}
                onHover={setHovered}
                onPin={onPin}
                search={search}
                bugImages={bugImageUrls}
              />
            </div>
          </div>

          {/* Right side: Detail panel with feature card overlay at bottom */}
          <div className="relative flex flex-col min-h-0">
            <DetailPanel
              data={data}
              selection={hovered ?? pinned}
              onClose={() => {
                setPinned(null);
                setHovered(null);
              }}
              onSelect={(sel) => setPinned(sel)}
              bugImages={bugImageUrls}
              drugImages={drugImages}
            />
            {/* Feature card — bottom-right pinned overlay (only when nothing is selected) */}
            {!(hovered || pinned) && (
              <FeatureCard className="hidden xl:block absolute bottom-2 right-2 left-2 z-20" />
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex-shrink-0 border-t-2 border-foreground bg-card">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6 py-1.5 flex items-center justify-between gap-3 text-[10.5px]">
          <div className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <Logo className="w-3.5 h-3.5" />
            <span>CoverageIQ · v0.1</span>
          </div>
          <p className="hidden md:block flex-1 text-center text-muted-foreground max-w-3xl mx-auto leading-snug">
            <strong className="text-foreground">Educational reference only.</strong>{" "}
            Not a substitute for clinical judgment, local antibiogram, or ID consult.
          </p>
          <a
            href="https://bugdrugdx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-script text-[12px] hover:text-primary"
          >
            inspired by BugDrugDX
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("feature-card p-3", className)}
      data-testid="feature-card"
      role="note"
      aria-label="How to use"
    >
      <div className="flex items-start gap-2">
        <div className="text-[22px] leading-none mt-0.5" aria-hidden>🔬</div>
        <div className="flex-1 min-w-0">
          <div className="font-sans font-black text-[15px] leading-tight tracking-tight">
            Hover. Click. Cover.
          </div>
          <p className="text-[10.5px] leading-snug mt-1 opacity-95">
            Hover any drug, bug, or syndrome to preview coverage.
          </p>
          <ul className="mt-1.5 grid gap-0.5 text-[9.5px] font-mono uppercase tracking-wider opacity-90">
            <li className="flex justify-between gap-2"><span>Hover</span><span>preview coverage</span></li>
            <li className="flex justify-between gap-2"><span>Click</span><span>pin details</span></li>
            <li className="flex justify-between gap-2"><span>Search</span><span>jump anywhere</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
