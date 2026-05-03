import { useMemo } from "react";
import type { Coverage, Drug, Bug, ModuleData } from "@/data";
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
  /** Optional virtual class hover — set of drug IDs to highlight green (drug-cell--class). */
  classFilter?: Set<string> | null;
}

// ---- Highlight logic (preserved from previous version) ----
function drugHighlight(
  drugId: string,
  drugClassId: string,
  data: ModuleData,
  active: Selection,
): { coverage?: Coverage; classMatch?: boolean; isActive?: boolean } {
  if (!active) return {};
  if (active.kind === "drug") {
    if (active.id === drugId) return { isActive: true };
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
    const syn = data.syndromes.find((s) => s.id === synId);
    if (syn?.empiric.includes(active.id)) return { coverage: "primary" };
    return {};
  }
  return {};
}

// Class ID → CSS var token (matches --c-pcn etc.)
const CLASS_VAR: Record<string, string> = {
  penicillin: "c-pcn",
  cephalosporin: "c-ceph",
  carbapenem: "c-carb",
  monobactam: "c-mono",
  fluoroquinolone: "c-fq",
  aminoglycoside: "c-ag",
  macrolide: "c-mac",
  tetracycline: "c-tet",
  glycopeptide: "c-gly",
  lipopeptide: "c-lip",
  oxazolidinone: "c-oxa",
  nitroimidazole: "c-nit",
  lincosamide: "c-linc",
  sulfa: "c-sulf",
  urinary: "c-uri",
  // Antifungals/antivirals fall back to default
};
function classVar(classId: string): string {
  return CLASS_VAR[classId] ?? "c-pcn";
}

// Generation tags for cephalosporins & fluoroquinolones
const DRUG_GEN: Record<string, string> = {
  cefazolin: "1G",
  cephalexin: "1G",
  cefoxitin: "2G",
  cefotetan: "2G",
  ceftriaxone: "3G",
  ceftazidime: "3G",
  cefepime: "4G",
  ceftaroline: "5G",
  cipro: "2G",
  levo: "3G",
  moxi: "4G",
};

// Bug grid placement for the bugdrugdx-style 3-col nested layout
// (only for antibacterials — fungi/virus modules use a simpler grid)
type BugSlot = { col: number; row: number; colSpan?: number; rowSpan?: number; tone: "gp" | "gn" | "anae" | "atyp" };
const BACTERIA_SLOTS: Record<string, BugSlot> = {
  // Column 1: gram-pos cocci (top) -> gram-neg specific (bottom)
  mrsa: { col: 1, row: 1, tone: "gp" },
  mssa: { col: 1, row: 2, tone: "gp" },
  strep: { col: 1, row: 3, tone: "gp" },
  pseudomonas: { col: 1, row: 4, tone: "gn" },
  escappm: { col: 1, row: 5, tone: "gn" },
  esbl: { col: 1, row: 6, tone: "gn" },
  // Column 2: enterococci (top) -> H. flu, GNRs (mid/bottom)
  vre: { col: 2, row: 1, tone: "gp" },
  enterococcus: { col: 2, row: 2, tone: "gp" },
  listeria: { col: 2, row: 3, tone: "gp" },
  neisseria: { col: 2, row: 4, tone: "gn" },
  gnrs: { col: 2, row: 5, rowSpan: 2, tone: "gn" },
  // Column 3: anaerobes (top half) + atypicals (bottom half)
  anaerobes: { col: 3, row: 1, rowSpan: 3, tone: "anae" },
  atypicals: { col: 3, row: 4, rowSpan: 3, tone: "atyp" },
};

function categoryTone(cat: string): "gp" | "gn" | "anae" | "atyp" {
  if (cat === "gram-pos") return "gp";
  if (cat === "gram-neg") return "gn";
  if (cat === "anaerobe") return "anae";
  if (cat === "atypical") return "atyp";
  return "gp";
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
    case "parasite-protozoa": return "Protozoan";
    case "parasite-helminth": return "Helminth";
    case "parasite-ectoparasite": return "Ectoparasite";
    default: return cat;
  }
}

// ---- Drug Cell ----
function DrugCell({
  drug,
  hl,
  isPinned,
  isMatch,
  onHover,
  onPin,
}: {
  drug: Drug;
  hl: { coverage?: Coverage; classMatch?: boolean; isActive?: boolean };
  isPinned: boolean;
  isMatch: boolean;
  onHover: (s: Selection) => void;
  onPin: (s: Selection) => void;
}) {
  const cov = hl.coverage;
  const gen = DRUG_GEN[drug.id];
  return (
    <button
      onMouseEnter={() => onHover({ kind: "drug", id: drug.id })}
      onMouseLeave={() => onHover(null)}
      onClick={() => onPin({ kind: "drug", id: drug.id })}
      data-testid={`drug-${drug.id}`}
      className={cn(
        "drug-cell group flex items-center justify-between gap-1 px-2 py-[5px] text-[11.5px] font-medium leading-[1.15] text-left transition-all",
        "border-2 hover:-translate-x-px hover:-translate-y-px hover:shadow-block-sm",
        cov === "primary" && "drug-cell--primary",
        cov === "alternate" && "drug-cell--alternate",
        hl.classMatch && !cov && "drug-cell--class",
        hl.isActive && "drug-cell--active",
        isPinned && !hl.isActive && "drug-cell--pinned",
        isMatch && "drug-cell--match",
      )}
      title={drug.name}
    >
      <span className="truncate">{drug.short ?? drug.name}</span>
      {gen && <span className="drug-gen">{gen}</span>}
    </button>
  );
}

// ---- Bug Cell ----
function BugCell({
  bug,
  slot,
  hl,
  isPinned,
  isMatch,
  onHover,
  onPin,
  bugImage,
}: {
  bug: Bug;
  slot?: BugSlot;
  hl: { coverage?: Coverage; isActive?: boolean };
  isPinned: boolean;
  isMatch: boolean;
  onHover: (s: Selection) => void;
  onPin: (s: Selection) => void;
  bugImage?: string;
}) {
  const tone = slot?.tone ?? categoryTone(bug.category);
  const cov = hl.coverage;
  const style: React.CSSProperties = slot
    ? {
        gridColumnStart: slot.col,
        gridRowStart: slot.row,
        gridColumnEnd: slot.colSpan ? `span ${slot.colSpan}` : undefined,
        gridRowEnd: slot.rowSpan ? `span ${slot.rowSpan}` : undefined,
      }
    : {};

  return (
    <button
      onMouseEnter={() => onHover({ kind: "bug", id: bug.id })}
      onMouseLeave={() => onHover(null)}
      onClick={() => onPin({ kind: "bug", id: bug.id })}
      data-testid={`bug-${bug.id}`}
      style={style}
      className={cn(
        "bug-cell group relative flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden",
        "border-2 transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-block-sm",
        `bug-tone-${tone}`,
        cov === "primary" && "bug-cell--primary",
        cov === "alternate" && "bug-cell--alternate",
        hl.isActive && "bug-cell--active",
        isPinned && !hl.isActive && "bug-cell--pinned",
        isMatch && "bug-cell--match",
      )}
    >
      {bugImage && (
        <img
          src={bugImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-70 transition-opacity"
          loading="lazy"
        />
      )}
      <span className="bug-cell__cat absolute top-1 left-2">{categoryLabel(bug.category)}</span>
      <span className="bug-cell__name relative z-10 px-2">{bug.name}</span>
    </button>
  );
}

// ---- Main matrix ----
export function Matrix({
  data,
  hovered,
  pinned,
  onHover,
  onPin,
  search,
  bugImages,
  classFilter,
}: MatrixProps) {
  const active: Selection = hovered ?? pinned;
  const searchLower = search.trim().toLowerCase();
  const filterActive = !!classFilter && classFilter.size > 0 && !active;

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

  const isAntibac = data.key === "antibacterials";

  const selectionActive = !!active || filterActive;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.85fr)] gap-2 lg:gap-2.5 items-stretch h-full min-h-0"
      data-selection={selectionActive ? "active" : "idle"}
    >
      {/* DRUGS COLUMN */}
      <section className="panel flex flex-col min-h-0" data-testid="column-drugs">
        <header className="panel__header">
          <h2 className="panel__title">Drugs</h2>
          <span className="panel__count">{data.drugs.length}</span>
        </header>
        <div className="flex-1 overflow-hidden p-1.5 space-y-1 min-h-0">
          {data.drugClasses.map((dc) => {
            const list = drugsByClass.get(dc.id) ?? [];
            if (list.length === 0) return null;
            const cv = classVar(dc.id);
            const classActive =
              active?.kind === "drug" &&
              data.drugs.find((d) => d.id === active.id)?.classId === dc.id;
            return (
              <div
                key={dc.id}
                className={cn("dclass", classActive && "dclass--active")}
                style={{ ["--klass" as any]: `var(--${cv})` }}
                data-testid={`class-${dc.id}`}
              >
                <div className="dclass__head">
                  <span className="dclass__swatch" />
                  <span>{dc.name}</span>
                </div>
                <div className="dclass__grid">
                  {list.map((drug) => {
                    let hl = drugHighlight(drug.id, drug.classId, data, active);
                    if (filterActive && !active && classFilter!.has(drug.id)) {
                      hl = { classMatch: true };
                    }
                    const isPinned = pinned?.kind === "drug" && pinned.id === drug.id;
                    const isMatch = matchesSearch(drug.name) || matchesSearch(drug.short ?? "");
                    return (
                      <DrugCell
                        key={drug.id}
                        drug={drug}
                        hl={hl}
                        isPinned={isPinned}
                        isMatch={isMatch}
                        onHover={onHover}
                        onPin={onPin}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BUGS COLUMN */}
      <section className="panel flex flex-col min-h-0" data-testid="column-bugs">
        <header className="panel__header">
          <h2 className="panel__title">Bugs</h2>
          <span className="panel__count">{data.bugs.length}</span>
        </header>
        <div className="flex-1 overflow-hidden p-2 min-h-0">
          {isAntibac ? (
            <div
              className="grid h-full gap-1.5"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "repeat(6, minmax(0, 1fr))",
              }}
            >
              {data.bugs.map((bug) => {
                const slot = BACTERIA_SLOTS[bug.id];
                if (!slot) return null;
                const hl = bugHighlight(bug.id, data, active);
                const isPinned = pinned?.kind === "bug" && pinned.id === bug.id;
                const isMatch = matchesSearch(bug.name);
                return (
                  <BugCell
                    key={bug.id}
                    bug={bug}
                    slot={slot}
                    hl={hl}
                    isPinned={isPinned}
                    isMatch={isMatch}
                    onHover={onHover}
                    onPin={onPin}
                    bugImage={bugImages[bug.id]}
                  />
                );
              })}
            </div>
          ) : (
            <div
              className="grid h-full gap-1.5"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "minmax(0, 1fr)",
              }}
            >
              {data.bugs.map((bug) => {
                const hl = bugHighlight(bug.id, data, active);
                const isPinned = pinned?.kind === "bug" && pinned.id === bug.id;
                const isMatch = matchesSearch(bug.name);
                return (
                  <BugCell
                    key={bug.id}
                    bug={bug}
                    hl={hl}
                    isPinned={isPinned}
                    isMatch={isMatch}
                    onHover={onHover}
                    onPin={onPin}
                    bugImage={bugImages[bug.id]}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SYNDROMES COLUMN */}
      <section className="panel flex flex-col min-h-0" data-testid="column-syndromes">
        <header className="panel__header">
          <h2 className="panel__title">Syndromes</h2>
          <span className="panel__count">{data.syndromes.length}</span>
        </header>
        <div className="flex-1 overflow-y-auto nice-scroll px-1.5 py-1 min-h-0">
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
                data-testid={`syndrome-${syn.id}`}
                className={cn(
                  "synd-row group w-full flex items-center gap-2 px-2 py-[5px] text-[12.5px] leading-tight text-left transition-all",
                  hl.isActive && "synd-row--active",
                  hl.coverage === "primary" && "synd-row--primary",
                  hl.coverage === "alternate" && "synd-row--alternate",
                  isPinned && !hl.isActive && "synd-row--pinned",
                  isMatch && "synd-row--match",
                )}
              >
                <span className="synd-row__ico">§</span>
                <span className="flex-1 truncate">{syn.short ?? syn.name}</span>
                {syn.sourceIds && syn.sourceIds.length > 0 && (
                  <span
                    className="cite-badge cite-badge--row"
                    aria-label={`${syn.sourceIds.length} source${syn.sourceIds.length > 1 ? "s" : ""} cited`}
                    title={`${syn.sourceIds.length} guideline source${syn.sourceIds.length > 1 ? "s" : ""} — click for details`}
                  >
                    {syn.sourceIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
