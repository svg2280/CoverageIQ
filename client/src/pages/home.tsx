import { useState, useMemo } from "react";
import { modules, type ModuleKey } from "@/data";
import { Matrix, type Selection } from "@/components/matrix";
import { DetailPanel } from "@/components/detail-panel";
import { Logo } from "@/components/logo";
import { Legend } from "@/components/legend";
import { useTheme } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sun, Moon, Github, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const moduleOrder: ModuleKey[] = ["antibacterials", "antifungals", "antivirals"];

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("antibacterials");
  const [hovered, setHovered] = useState<Selection>(null);
  const [pinned, setPinned] = useState<Selection>(null);
  const [search, setSearch] = useState("");
  const { theme, toggle: toggleTheme } = useTheme();

  // Reset selection when module changes
  function changeModule(key: ModuleKey) {
    if (key === activeModule) return;
    setActiveModule(key);
    setHovered(null);
    setPinned(null);
    setSearch("");
  }

  const data = modules[activeModule];

  // Bug & drug images stay empty for now — components handle absent gracefully.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bugImages = useMemo<Record<string, string>>(() => ({}), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const drugImages = useMemo<Record<string, string>>(() => ({}), []);

  function onPin(sel: Selection) {
    // Toggle off if clicking the already-pinned item
    if (pinned && sel && pinned.kind === sel.kind && pinned.id === sel.id) {
      setPinned(null);
    } else {
      setPinned(sel);
    }
  }

  return (
    <div className="min-h-screen grid-bg">
      {/* AMBIENT GLOW */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 dark:opacity-80"
        style={{
          background:
            "radial-gradient(60rem 40rem at 20% -10%, hsl(var(--bacteria) / 0.18), transparent 60%), " +
            "radial-gradient(50rem 30rem at 90% 5%, hsl(var(--virus) / 0.15), transparent 60%), " +
            "radial-gradient(45rem 30rem at 50% 110%, hsl(var(--fungi) / 0.15), transparent 60%)",
        }}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-3 flex items-center gap-4">
          <a
            href="#/"
            className="flex items-center gap-2.5 hover-elevate active-elevate-2 -ml-2 px-2 py-1 rounded-lg"
            data-testid="link-home"
          >
            <Logo className="w-8 h-8" />
            <div className="leading-tight">
              <div className="font-display font-bold text-base tracking-tight">
                CoverageIQ
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                Antimicrobial Atlas
              </div>
            </div>
          </a>

          {/* MODULE TABS */}
          <nav
            className="hidden md:flex items-center gap-1 ml-4 rounded-full border border-border bg-card/40 backdrop-blur-sm p-1"
            role="tablist"
            aria-label="Antimicrobial module"
          >
            {moduleOrder.map((key) => {
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
                    "relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                    active
                      ? "text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  style={{
                    background: active ? `hsl(var(--${m.accent}) / 0.18)` : undefined,
                    boxShadow: active
                      ? `0 0 0 1px hsl(var(--${m.accent}) / 0.45), 0 0 24px -8px hsl(var(--${m.accent}) / 0.6)`
                      : undefined,
                  }}
                >
                  <span aria-hidden className="text-base leading-none">
                    {m.emoji}
                  </span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </nav>

          {/* SEARCH + ACTIONS */}
          <div className="flex-1" />

          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drugs, bugs, syndromes…"
              className="pl-8 w-56 lg:w-72 h-9 bg-card/60 backdrop-blur-sm border-border/80"
              data-testid="input-search"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="button-theme"
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <a
            href="https://github.com/scottvangemert23/coverageiq"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
            data-testid="link-github"
          >
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* Mobile module tabs */}
        <div className="md:hidden border-t border-border/60 px-4 py-2 flex gap-1 overflow-x-auto">
          {moduleOrder.map((key) => {
            const m = modules[key];
            const active = key === activeModule;
            return (
              <button
                key={key}
                onClick={() => changeModule(key)}
                data-testid={`tab-mobile-${key}`}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1.5",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
                style={{
                  background: active ? `hsl(var(--${m.accent}) / 0.18)` : "hsl(var(--card))",
                  border: `1px solid ${
                    active ? `hsl(var(--${m.accent}) / 0.5)` : "hsl(var(--border))"
                  }`,
                }}
              >
                <span aria-hidden>{m.emoji}</span>
                {m.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* HERO STRIP */}
      <section className="max-w-[1600px] mx-auto px-4 lg:px-6 pt-6 pb-3">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-1.5">
              <Sparkles className="w-3 h-3" style={{ color: `hsl(var(--${data.accent}))` }} />
              <span>Module · {data.label}</span>
            </div>
            <h1 className="font-display font-bold text-xl leading-tight">
              The interactive antimicrobial spectrum atlas.
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Hover any drug, bug, or syndrome to see what it covers. Click to pin
              a detail card. Built for residents, hospitalists, and the
              caffeine-fueled overnight call.
            </p>
          </div>

          {/* Mobile search */}
          <div className="relative sm:hidden">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="pl-8 h-9"
              data-testid="input-search-mobile"
            />
          </div>

          <Legend />
        </div>
      </section>

      {/* MAIN MATRIX + DETAIL */}
      <main className="max-w-[1600px] mx-auto px-4 lg:px-6 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-4 lg:gap-6">
          <div>
            <Matrix
              data={data}
              hovered={hovered}
              pinned={pinned}
              onHover={setHovered}
              onPin={onPin}
              search={search}
              bugImages={bugImages}
            />
          </div>
          <DetailPanel
            data={data}
            selection={hovered ?? pinned}
            onClose={() => {
              setPinned(null);
              setHovered(null);
            }}
            onSelect={(sel) => setPinned(sel)}
            bugImages={bugImages}
            drugImages={drugImages}
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-card/30 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Logo className="w-5 h-5" />
            <span className="font-mono uppercase tracking-wider">CoverageIQ · v0.1</span>
          </div>
          <p className="max-w-2xl leading-relaxed">
            <strong className="text-foreground">Educational reference only.</strong>{" "}
            Not a substitute for clinical judgment, local antibiogram data, infectious
            disease consultation, or institutional antimicrobial stewardship guidance.
            Always confirm dosing, allergies, and renal/hepatic adjustments before
            prescribing.
          </p>
          <a
            href="https://bugdrugdx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
            data-testid="link-inspiration"
          >
            Inspired by BugDrugDX
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}
