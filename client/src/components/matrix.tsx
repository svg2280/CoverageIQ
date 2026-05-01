import { useMemo } from "react";
import type { Coverage, Drug, DrugClass, Bug, Syndrome, ModuleData } from "@/data";
import { bugCategoryColor } from "@/data";
import { cn } from "@/lib/utils";

export type Selection =
  | { kind: "drug"; id: string }
  | { kind: "bug"; id: string }
  | { kind: "syndrome"; id: string }
  | null;

interface MatrixProps {
  data: ModuleData;
  hovered: Selection;
  pinned: Selection;
  onHover: (sel: Selection) => void;
  onPin: (sel: Selection) => void;
  search: string;
  bugImages: Record<string, string>;
}

// Determine the highlight state for a given drug given current hovered/pinned selection
function drugHighlight(
  drugId: string,
  drugClassId: string,
  data: ModuleData,
  active: Selection,
): { coverage?: Coverage; classMatch?: boolean; isActive?: boolean } {
  if (!active) return {};
  if (active.kind === "drug") {
    if (active.id === drugId) return { isActive: true };
    // Same class? show class highlight
    const otherDrug = data.drugs.find((d) => d.id === active.id);
    if (otherDrug && otherDrug.classId === drugClassId) return { classMatch: true };
    return {};
  }
  if (active.kind === "bug") {
    const cov = data.getCoverage(drugId, active.id);
    if (cov !== "none") return { coverage: cov };
    return {};
  }
  if (active.kind === "syndrome") {
    const syn = data.syndromes.find((s) => s.id === active.id);
    if (syn?.empiric.includes(drugId)) return { coverage: "primary" };
    return {};
  }
  return {};
}

function bugHighlight(
  bugId: string,
  data: ModuleData,
  active: Selection,
): { coverage?: Coverage; isActive?: boolean } {
  if (!active) return {};
  if (active.kind === "bug") {
    if (active.id === bugId) return { isActive: true };
    return {};
  }
  if (active.kind === "drug") {
    const cov = data.getCoverage(active.id, bugId);
    if (cov !== "none") return { coverage: cov };
    return {};
  }
  if (active.kind === "syndrome") {
    const syn = data.syndromes.find((s) => s.id === active.id);
    if (syn?.commonBugs.includes(bugId)) return { coverage: "primary" };
    return {};
  }
  return {};
}

function syndromeHighlight(
  synId: string,
  data: ModuleData,
  active: Selection,
): { coverage?: Coverage; isActive?: boolean } {
  if (!active) return {};
  if (active.kind === "syndrome") {
    if (active.id === synId) return { isActive: true };
    return {};
  }
  if (active.kind === "bug") {
    const bug = data.bugs.find((b) => b.id === active.id);
    if (bug?.syndromes.includes(synId)) return { coverage: "primary" };
    return {};
  }
  if (active.kind === "drug") {
    // Highlight syndromes that have this drug in empiric regimen
    const syn = data.syndromes.find((s) => s.id === synId);
    if (syn?.empiric.includes(active.id)) return { coverage: "primary" };
    return {};
  }
  return {};
}

function coverageClass(c?: Coverage, classMatch?: boolean, isActive?: boolean) {
  if (isActive) return "halo-primary ring-2 ring-primary/60 bg-primary/15 text-primary-foreground border-primary/50";
  if (c === "primary") return "cov-primary halo-primary";
  if (c === "alternate") return "cov-alternate halo-alternate";
  if (classMatch) return "cov-class";
  return "";
}

export function Matrix({
  data,
  hovered,
  pinned,
  onHover,
  onPin,
  search,
  bugImages,
}: MatrixProps) {
  // The "active" selection for highlighting is hovered if present, else pinned.
  const active: Selection = hovered ?? pinned;
  const searchLower = search.trim().toLowerCase();

  const drugsByClass = useMemo(() => {
    const map = new Map<string, Drug[]>();
    for (const dc of data.drugClasses) map.set(dc.id, []);
    for (const d of data.drugs) {
      const list = map.get(d.classId);
      if (list) list.push(d);
    }
    return map;
  }, [data]);

  function matchesSearch(text: string): boolean {
    if (!searchLower) return false;
    return text.toLowerCase().includes(searchLower);
  }

  // Group bugs by category for the treemap-style center
  const bugCategories = useMemo(() => {
    const cats = new Map<string, Bug[]>();
    for (const b of data.bugs) {
      const list = cats.get(b.category) ?? [];
      list.push(b);
      cats.set(b.category, list);
    }
    return cats;
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] gap-4 lg:gap-6 items-start">
      {/* DRUGS COLUMN */}
      <section className="space-y-3" data-testid="column-drugs">
        <header className="flex items-baseline justify-between px-1">
          <h2 className="font-display font-bold text-lg">Drugs</h2>
          <span className="text-xs text-muted-foreground font-mono">{data.drugs.length}</span>
        </header>
        <div className="space-y-3">
          {data.drugClasses.map((dc) => {
            const list = drugsByClass.get(dc.id) ?? [];
            if (list.length === 0) return null;
            const classActive =
              active?.kind === "drug" &&
              data.drugs.find((d) => d.id === active.id)?.classId === dc.id;
            return (
              <div
                key={dc.id}
                className={cn(
                  "rounded-xl border bg-card/60 backdrop-blur-sm p-2.5 transition-all",
                  classActive && "ring-1 ring-primary/40",
                )}
                style={{
                  borderColor: classActive ? `${dc.color}80` : undefined,
                  background: classActive ? `${dc.color}12` : undefined,
                }}
                data-testid={`class-${dc.id}`}
              >
                <div
                  className="flex items-center gap-2 mb-2 px-1.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: dc.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: dc.color }} />
                  {dc.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {list.map((drug) => {
                    const hl = drugHighlight(drug.id, drug.classId, data, active);
                    const isPinned = pinned?.kind === "drug" && pinned.id === drug.id;
                    const isMatch = matchesSearch(drug.name) || matchesSearch(drug.short ?? "");
                    return (
                      <button
                        key={drug.id}
                        onMouseEnter={() => onHover({ kind: "drug", id: drug.id })}
                        onMouseLeave={() => onHover(null)}
                        onClick={() => onPin({ kind: "drug", id: drug.id })}
                        className={cn(
                          "px-2.5 py-1.5 rounded-md text-xs font-medium border border-border bg-background/70 transition-all",
                          "hover:scale-[1.04] hover:-translate-y-0.5",
                          coverageClass(hl.coverage, hl.classMatch, hl.isActive),
                          isPinned && "ring-2 ring-primary",
                          isMatch && "ring-2 ring-primary/60 shadow-md",
                        )}
                        data-testid={`drug-${drug.id}`}
                      >
                        {drug.short ?? drug.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BUGS COLUMN — treemap style */}
      <section className="space-y-3" data-testid="column-bugs">
        <header className="flex items-baseline justify-between px-1">
          <h2 className="font-display font-bold text-lg">Bugs</h2>
          <span className="text-xs text-muted-foreground font-mono">{data.bugs.length}</span>
        </header>
        <div className="grid grid-cols-12 auto-rows-[minmax(80px,auto)] gap-2">
          {data.bugs.map((bug) => {
            const hl = bugHighlight(bug.id, data, active);
            const isPinned = pinned?.kind === "bug" && pinned.id === bug.id;
            const isMatch = matchesSearch(bug.name);
            const colorClass = bugCategoryColor(bug.category);
            const img = bugImages[bug.id];

            // Decide span — give high-yield bugs more real estate
            const span = bigBugSpans[bug.id] ?? "col-span-4 row-span-1";

            return (
              <button
                key={bug.id}
                onMouseEnter={() => onHover({ kind: "bug", id: bug.id })}
                onMouseLeave={() => onHover(null)}
                onClick={() => onPin({ kind: "bug", id: bug.id })}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm p-2.5 pr-3 text-left transition-all",
                  "hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg",
                  span,
                  hl.isActive && "ring-2 ring-primary halo-primary",
                  hl.coverage === "primary" && "cov-primary halo-primary",
                  hl.coverage === "alternate" && "cov-alternate halo-alternate",
                  isPinned && !hl.isActive && "ring-2 ring-primary/80",
                  isMatch && "ring-2 ring-primary/60",
                )}
                style={{
                  borderColor: !hl.isActive && !hl.coverage ? `hsl(var(--${colorClass}) / 0.4)` : undefined,
                }}
                data-testid={`bug-${bug.id}`}
              >
                {/* Background illustration */}
                {img && (
                  <img
                    src={img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity"
                  />
                )}
                {/* Color tint - more vibrant */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--${colorClass}) / 0.22), hsl(var(--${colorClass}) / 0.04) 70%, transparent)`,
                  }}
                />
                {/* Decorative bug glyph in corner */}
                <div
                  aria-hidden
                  className="absolute -bottom-2 -right-2 opacity-20 group-hover:opacity-40 transition-opacity text-3xl leading-none select-none"
                  style={{ color: `hsl(var(--${colorClass}))` }}
                >
                  {bugGlyph(bug.category)}
                </div>
                <div className="relative z-10 flex flex-col gap-1.5 min-h-[60px]">
                  <div
                    className="text-[10px] uppercase tracking-wider font-mono font-bold"
                    style={{ color: `hsl(var(--${colorClass}))` }}
                  >
                    {categoryLabel(bug.category)}
                  </div>
                  <div className="font-display font-bold text-[13px] leading-[1.15] break-words hyphens-auto" lang="en">
                    {bug.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SYNDROMES COLUMN */}
      <section className="space-y-3" data-testid="column-syndromes">
        <header className="flex items-baseline justify-between px-1">
          <h2 className="font-display font-bold text-lg">Syndromes</h2>
          <span className="text-xs text-muted-foreground font-mono">{data.syndromes.length}</span>
        </header>
        <div className="space-y-1.5">
          {data.syndromes.map((syn) => {
            const hl = syndromeHighlight(syn.id, data, active);
            const isPinned = pinned?.kind === "syndrome" && pinned.id === syn.id;
            const isMatch = matchesSearch(syn.name);
            return (
              <button
                key={syn.id}
                onMouseEnter={() => onHover({ kind: "syndrome", id: syn.id })}
                onMouseLeave={() => onHover(null)}
                onClick={() => onPin({ kind: "syndrome", id: syn.id })}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm border border-border bg-card/70 transition-all",
                  "hover:bg-card hover:scale-[1.01] hover:-translate-y-0.5",
                  hl.isActive && "halo-primary ring-2 ring-primary bg-primary/15",
                  hl.coverage === "primary" && "cov-primary halo-primary",
                  hl.coverage === "alternate" && "cov-alternate halo-alternate",
                  isPinned && !hl.isActive && "ring-2 ring-primary/80",
                  isMatch && "ring-2 ring-primary/60",
                )}
                data-testid={`syndrome-${syn.id}`}
              >
                <div className="font-medium leading-tight">{syn.short ?? syn.name}</div>
                {syn.short && (
                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {syn.name}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function categoryLabel(cat: string): string {
  switch (cat) {
    case "gram-pos": return "Gram +";
    case "gram-neg": return "Gram −";
    case "anaerobe": return "Anaerobe";
    case "atypical": return "Atypical";
    case "yeast": return "Yeast";
    case "mold": return "Mold";
    case "dimorphic": return "Dimorphic";
    case "atypical-fungus": return "Fungus";
    case "virus": return "Virus";
    default: return cat;
  }
}

// Decorative emoji per category to give the cards visual character
function bugGlyph(cat: string): string {
  switch (cat) {
    case "gram-pos": return "●●";
    case "gram-neg": return "▀▀";
    case "anaerobe": return "○";
    case "atypical": return "✵";
    case "yeast": return "●";
    case "mold": return "✿";
    case "dimorphic": return "⦿";
    case "atypical-fungus": return "✿";
    case "virus": return "✴";
    default: return "●";
  }
}

// Treemap-ish layout: each bug occupies a span of cells in a 12-col grid.
// Tuned so the layout looks dense but balanced for ~15 bugs.
const bigBugSpans: Record<string, string> = {
  // Bacteria
  mrsa: "col-span-3 row-span-2",
  mssa: "col-span-3 row-span-2",
  strep: "col-span-6 row-span-1",
  enterococcus: "col-span-4 row-span-1",
  vre: "col-span-2 row-span-1",
  anaerobes: "col-span-6 row-span-2",
  pseudomonas: "col-span-4 row-span-2",
  escappm: "col-span-4 row-span-1",
  esbl: "col-span-4 row-span-1",
  gnrs: "col-span-4 row-span-2",
  atypicals: "col-span-4 row-span-2",
  listeria: "col-span-4 row-span-1",
  neisseria: "col-span-4 row-span-1",

  // Fungi
  "candida-albicans": "col-span-4 row-span-2",
  "candida-glabrata": "col-span-4 row-span-1",
  "candida-krusei": "col-span-4 row-span-1",
  "candida-auris": "col-span-4 row-span-1",
  crypto: "col-span-4 row-span-2",
  aspergillus: "col-span-4 row-span-2",
  mucor: "col-span-4 row-span-1",
  histo: "col-span-4 row-span-1",
  blasto: "col-span-4 row-span-1",
  cocci: "col-span-4 row-span-1",
  pjp: "col-span-12 row-span-1",

  // Viruses
  influenza: "col-span-6 row-span-2",
  covid: "col-span-6 row-span-2",
  rsv: "col-span-4 row-span-1",
  hsv: "col-span-4 row-span-2",
  vzv: "col-span-4 row-span-1",
  cmv: "col-span-4 row-span-2",
  hbv: "col-span-4 row-span-1",
  hcv: "col-span-4 row-span-1",
  hiv: "col-span-4 row-span-2",
};
