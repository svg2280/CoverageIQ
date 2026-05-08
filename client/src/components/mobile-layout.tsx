import { useState, useMemo, useEffect, useRef } from "react";
import { modules, type ModuleKey, type ModuleData } from "@/data";
import { type Selection } from "@/components/matrix";
import { DetailPanel } from "@/components/detail-panel";
import { Logo } from "@/components/logo";
import { MobileDrawer } from "@/components/mobile-drawer";
import { useTheme, FLAVOR_META, type ThemeFlavor } from "@/components/theme-provider";
import { useI18n } from "@/lib/i18n";
import {
  Search,
  Sun,
  Moon,
  X,
  Menu,
  Pill,
  Bug as BugIcon,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BUG_IMAGES } from "@/data/bug-images";

const moduleOrder: ModuleKey[] = ["antibacterials", "antifungals", "antivirals", "antiparasitics"];

type Section = "drugs" | "bugs" | "syndromes";

export function MobileLayout() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("antibacterials");
  const [pinned, setPinned] = useState<Selection>(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<Section>("syndromes");
  const [openClassId, setOpenClassId] = useState<string | null>(null);

  const { theme, flavor, toggle: toggleTheme, cycleFlavor } = useTheme();
  const { lang, setLang, t } = useI18n();

  const data = modules[activeModule];

  function changeModule(key: ModuleKey) {
    if (key === activeModule) return;
    setActiveModule(key);
    setPinned(null);
    setSearch(""); setSearchOpen(false);
    setOpenClassId(null);
  }

  // Close sheet on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (pinned) setPinned(null);
        else if (searchOpen) setSearchOpen(false);
        else if (menuOpen) setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pinned, searchOpen, menuOpen]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (pinned || searchOpen || menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [pinned, searchOpen, menuOpen]);

  const drugsByClass = useMemo(() => {
    const map = new Map<string, typeof data.drugs>();
    for (const dc of data.drugClasses) map.set(dc.id, []);
    for (const d of data.drugs) {
      const list = map.get(d.classId);
      if (list) list.push(d);
    }
    return map;
  }, [data]);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const r: Array<{ kind: "drug" | "bug" | "syndrome"; id: string; label: string; module: ModuleKey; moduleLabel: string }> = [];
    const seen = new Set<string>();
    for (const mk of moduleOrder) {
      const m = modules[mk];
      const moduleLabel = t(`tab.${mk}`);
      for (const d of m.drugs) {
        const key = `drug-${d.id}`;
        if (!seen.has(key) && d.name.toLowerCase().includes(q)) {
          seen.add(key);
          r.push({ kind: "drug", id: d.id, label: d.name, module: mk, moduleLabel });
        }
      }
      for (const b of m.bugs) {
        const key = `bug-${b.id}-${mk}`;
        if (!seen.has(key) && b.name.toLowerCase().includes(q)) {
          seen.add(key);
          r.push({ kind: "bug", id: b.id, label: b.name, module: mk, moduleLabel });
        }
      }
      for (const s of m.syndromes) {
        const key = `syndrome-${s.id}-${mk}`;
        if (!seen.has(key) && s.name.toLowerCase().includes(q)) {
          seen.add(key);
          r.push({ kind: "syndrome", id: s.id, label: s.name, module: mk, moduleLabel });
        }
      }
    }
    return r.slice(0, 50);
  }, [search, t]);

  const flavorMeta = FLAVOR_META[flavor as ThemeFlavor];

  const tabsRef = useRef<HTMLDivElement>(null);
  // Keep active tab visible
  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLButtonElement>(`[data-tab-active="true"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeModule]);

  return (
    <div className="md:hidden min-h-screen bg-background text-foreground">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-background border-b-2 border-foreground">
        <div className="px-3 py-2 flex items-center gap-2">
          <a href="#/" className="flex items-center gap-2 min-w-0" data-testid="link-home">
            <Logo className="w-8 h-8 flex-shrink-0" />
            <span className="font-serif font-black text-[18px] tracking-tight truncate">CoverageIQ</span>
          </a>
          <div className="flex-1" />
          <button
            aria-label={t("search.placeholder") || "Search"}
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 grid place-items-center border-2 border-foreground bg-card active:bg-foreground active:text-background"
            data-testid="button-mobile-search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 grid place-items-center border-2 border-foreground bg-card active:bg-foreground active:text-background"
            data-testid="button-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* MODULE TAB BAR — horizontal scroll with snap, fade edge */}
        <div className="relative border-t-2 border-foreground">
          <div
            ref={tabsRef}
            className="flex gap-1 overflow-x-auto px-3 py-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            data-testid="mobile-tabs"
          >
            {moduleOrder.map((key) => {
              const m = modules[key];
              const active = key === activeModule;
              return (
                <button
                  key={key}
                  onClick={() => changeModule(key)}
                  data-tab-active={active}
                  data-testid={`mtab-${key}`}
                  className={cn(
                    "snap-start flex-shrink-0 px-4 min-h-[44px] flex items-center gap-2 text-[14px] font-bold whitespace-nowrap border-2 border-foreground transition-colors",
                    active ? "bg-foreground text-background" : "bg-card text-foreground",
                  )}
                >
                  <span aria-hidden>{m.emoji}</span>
                  <span>{t(`tab.${key}`)}</span>
                </button>
              );
            })}
            <div className="flex-shrink-0 w-4" />
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />
        </div>

        {/* MODULE SUBTITLE */}
        <div className="px-3 py-2 border-t border-border">
          <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-0.5">
            {t(`tab.${activeModule}`)}
          </div>
          <h1 className="font-serif font-black text-[17px] leading-tight tracking-tight">
            {t(`subtitle.${activeModule}`)}
          </h1>
        </div>
      </header>

      {/* CONTENT — three accordions */}
      <main className="px-3 py-3 space-y-2 pb-24">
        <SectionAccordion
          title={t("col.syndromes")}
          icon={<Stethoscope className="w-5 h-5" />}
          count={data.syndromes.length}
          isOpen={openSection === "syndromes"}
          onToggle={() => setOpenSection(openSection === "syndromes" ? "drugs" : "syndromes")}
        >
          <div className="divide-y divide-border">
            {data.syndromes.map((syn) => (
              <button
                key={syn.id}
                onClick={() => setPinned({ kind: "syndrome", id: syn.id })}
                data-testid={`syndrome-${syn.id}`}
                className="w-full min-h-[56px] flex items-center gap-3 py-2.5 px-3 active:bg-accent text-left"
              >
                <span className="font-script text-[20px] text-muted-foreground flex-shrink-0">§</span>
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-bold text-[15px] leading-snug">
                    {syn.name}
                  </div>
                  {syn.short && syn.short !== syn.name && (
                    <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                      {syn.short}
                    </div>
                  )}
                </div>
                {syn.sourceIds && syn.sourceIds.length > 0 && (
                  <span className="flex-shrink-0 text-[11px] font-mono px-1.5 py-0.5 border border-border rounded">
                    {syn.sourceIds.length}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </SectionAccordion>

        <SectionAccordion
          title={t("col.drugs")}
          icon={<Pill className="w-5 h-5" />}
          count={data.drugs.length}
          isOpen={openSection === "drugs"}
          onToggle={() => setOpenSection(openSection === "drugs" ? "syndromes" : "drugs")}
        >
          <div className="divide-y divide-border">
            {data.drugClasses.map((dc) => {
              const list = drugsByClass.get(dc.id) ?? [];
              if (list.length === 0) return null;
              const isOpen = openClassId === dc.id;
              return (
                <div key={dc.id}>
                  <button
                    onClick={() => setOpenClassId(isOpen ? null : dc.id)}
                    className="w-full min-h-[52px] flex items-center gap-3 py-2 px-3 active:bg-accent text-left"
                    data-testid={`mclass-${dc.id}`}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 border border-foreground"
                      style={{ backgroundColor: dc.color }}
                    />
                    <span className="flex-1 font-serif font-bold text-[14px]">{dc.name}</span>
                    <span className="text-[11px] font-mono text-muted-foreground">{list.length}</span>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <div className="bg-accent/30 px-3 py-1">
                      {list.map((drug) => (
                        <button
                          key={drug.id}
                          onClick={() => setPinned({ kind: "drug", id: drug.id })}
                          data-testid={`drug-${drug.id}`}
                          className="w-full min-h-[52px] flex items-center gap-3 py-2 active:bg-accent text-left border-b border-border/50 last:border-b-0"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-serif font-bold text-[14px] leading-snug">{drug.name}</div>
                            {drug.short && drug.short !== drug.name && (
                              <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground mt-0.5">
                                {drug.short}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionAccordion>

        <SectionAccordion
          title={t("col.bugs")}
          icon={<BugIcon className="w-5 h-5" />}
          count={data.bugs.length}
          isOpen={openSection === "bugs"}
          onToggle={() => setOpenSection(openSection === "bugs" ? "syndromes" : "bugs")}
        >
          <div className="grid grid-cols-2 gap-2 p-3">
            {data.bugs.map((bug) => (
              <button
                key={bug.id}
                onClick={() => setPinned({ kind: "bug", id: bug.id })}
                data-testid={`bug-${bug.id}`}
                className="min-h-[72px] p-3 border-2 border-foreground bg-card active:bg-accent flex flex-col items-start justify-center text-left"
              >
                <div className="font-serif font-bold text-[13px] leading-tight line-clamp-2">{bug.name}</div>
                <div className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground mt-1">
                  {bug.category.replace("-", " ")}
                </div>
              </button>
            ))}
          </div>
        </SectionAccordion>
      </main>

      {/* DETAIL BOTTOM SHEET */}
      {pinned && (
        <BottomSheet onClose={() => setPinned(null)}>
          <DetailPanel
            data={data}
            selection={pinned}
            onClose={() => setPinned(null)}
            onSelect={(sel) => setPinned(sel)}
            bugImages={Object.fromEntries(Object.entries(BUG_IMAGES).map(([k, v]) => [k, v.url]))}
            drugImages={{}}
            embedded
          />
        </BottomSheet>
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex items-center gap-2 px-3 py-3 border-b-2 border-foreground">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              autoFocus
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search.placeholder") || "Search drugs, bugs, syndromes…"}
              className="flex-1 bg-transparent outline-none text-[16px] font-mono"
              data-testid="input-mobile-search"
            />
            <button
              onClick={() => { setSearchOpen(false); setSearch(""); }}
              className="w-10 h-10 grid place-items-center"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {search.trim() && searchResults.length === 0 && (
              <div className="px-3 py-8 text-center text-muted-foreground text-[14px]">
                No matches across any module.
              </div>
            )}
            {searchResults.map((r, i) => (
              <button
                key={`${r.kind}-${r.id}-${r.module}-${i}`}
                onClick={() => {
                  if (r.module !== activeModule) setActiveModule(r.module);
                  setPinned({ kind: r.kind, id: r.id } as Selection);
                  setSearch(""); setSearchOpen(false);
                }}
                className="w-full min-h-[56px] flex items-center gap-3 px-3 py-2 border-b border-border active:bg-accent text-left"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 border border-foreground bg-card flex-shrink-0">
                  {r.kind}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-serif font-bold text-[15px] truncate">{r.label}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{r.moduleLabel}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* OVERFLOW MENU SHEET */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        current="atlas"
      />
    </div>
  );
}

// ============== Helpers ==============

function SectionAccordion({
  title, icon, count, isOpen, onToggle, children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="border-2 border-foreground bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full min-h-[56px] flex items-center gap-3 px-4 py-3 bg-foreground text-background"
        aria-expanded={isOpen}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className="font-serif font-black text-[16px] flex-1 text-left">{title}</span>
        <span className="text-[12px] font-mono opacity-80">{count}</span>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div>{children}</div>}
    </section>
  );
}

function BottomSheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    setDragY(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current == null) return;
    const dy = e.touches[0].clientY - startYRef.current;
    if (dy > 0) setDragY(dy);
  };
  const onTouchEnd = () => {
    if (dragY > 120) onClose();
    else setDragY(0);
    startYRef.current = null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" data-testid="bottom-sheet">
      <div
        className="absolute inset-0 bg-foreground/40 transition-opacity"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full bg-background border-t-2 border-foreground rounded-t-2xl max-h-[88vh] flex flex-col shadow-2xl"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? "transform 0.2s ease" : "none",
        }}
      >
        {/* Drag handle */}
        <div
          className="flex-shrink-0 pt-2 pb-1 flex justify-center cursor-grab touch-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-12 h-1.5 rounded-full bg-foreground/30" aria-hidden />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-6 nice-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
