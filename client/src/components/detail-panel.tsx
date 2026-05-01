import type { Selection } from "./matrix";
import type { ModuleData } from "@/data";
import { Button } from "@/components/ui/button";
import { X, Pill, Bug as BugIcon, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  data: ModuleData;
  selection: Selection;
  onClose: () => void;
  onSelect: (sel: Selection) => void;
  bugImages: Record<string, string>;
  drugImages: Record<string, string>;
}

export function DetailPanel({
  data,
  selection,
  onClose,
  onSelect,
  bugImages,
  drugImages,
}: DetailPanelProps) {
  if (!selection) {
    // Empty state — keep slim and quiet so the bottom-right Feature Card is the
    // primary call-to-action area. The Feature Card overlays the bottom of this
    // column when nothing is selected.
    return (
      <aside
        className="hidden xl:flex sticky top-24 rounded-2xl border-2 border-dashed border-border bg-card/30 backdrop-blur-sm p-6 text-sm text-muted-foreground items-center justify-center min-h-[180px]"
        data-testid="detail-panel-empty"
      >
        <div className="text-center max-w-[240px] mx-auto opacity-80">
          <div className="text-3xl mb-2" aria-hidden>🦠</div>
          <p className="font-mono uppercase tracking-[0.18em] text-[11px]">
            Detail card
          </p>
          <p className="text-[12px] leading-snug mt-1.5">
            Hover or click anything in the matrix to load full coverage notes here.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="sticky top-24 rounded-2xl border border-border bg-card/90 backdrop-blur-md p-5 max-h-[calc(100vh-7rem)] overflow-y-auto nice-scroll rise-in"
      data-testid="detail-panel"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-mono">
          {selection.kind === "drug" && <><Pill className="w-3.5 h-3.5" /> Drug</>}
          {selection.kind === "bug" && <><BugIcon className="w-3.5 h-3.5" /> Pathogen</>}
          {selection.kind === "syndrome" && <><Stethoscope className="w-3.5 h-3.5" /> Syndrome</>}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="h-7 w-7 -mr-1 -mt-1"
          data-testid="button-close-panel"
          aria-label="Close detail panel"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {selection.kind === "drug" && <DrugDetail data={data} drugId={selection.id} drugImages={drugImages} onSelect={onSelect} />}
      {selection.kind === "bug" && <BugDetail data={data} bugId={selection.id} bugImages={bugImages} onSelect={onSelect} />}
      {selection.kind === "syndrome" && <SyndromeDetail data={data} synId={selection.id} onSelect={onSelect} />}
    </aside>
  );
}

function Chip({
  label,
  onClick,
  variant = "default",
  testId,
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "alternate";
  testId?: string;
}) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={cn(
        "px-2.5 py-1 rounded-md text-xs font-medium border transition-all hover:-translate-y-0.5 hover:shadow",
        variant === "default" && "border-border bg-background hover:bg-accent",
        variant === "primary" && "cov-primary border-current",
        variant === "alternate" && "cov-alternate border-current",
      )}
    >
      {label}
    </button>
  );
}

function DrugDetail({
  data,
  drugId,
  drugImages,
  onSelect,
}: {
  data: ModuleData;
  drugId: string;
  drugImages: Record<string, string>;
  onSelect: (sel: Selection) => void;
}) {
  const drug = data.drugs.find((d) => d.id === drugId);
  if (!drug) return null;
  const drugClass = data.drugClasses.find((c) => c.id === drug.classId);

  // Bugs with coverage
  const primaryBugs = data.bugs.filter((b) => data.getCoverage(drug.id, b.id) === "primary");
  const altBugs = data.bugs.filter((b) => data.getCoverage(drug.id, b.id) === "alternate");

  // Syndromes where this drug is empiric
  const synList = data.syndromes.filter((s) => s.empiric.includes(drug.id));

  const img = drugImages[drug.id];

  return (
    <>
      <div className="flex items-start gap-3">
        {img && (
          <img
            src={img}
            alt={drug.name}
            className="w-20 h-20 rounded-xl object-cover border border-border shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-xl leading-tight">{drug.name}</h3>
          {drugClass && (
            <div
              className="text-xs font-medium mt-1 inline-flex items-center gap-1.5"
              style={{ color: drugClass.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: drugClass.color }} />
              {drugClass.name}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm mt-3 text-foreground/85 leading-relaxed">{drug.blurb}</p>

      <Section title="Mechanism">
        <p className="text-sm">{drug.mechanism}</p>
      </Section>

      <Section title="Spectrum">
        <p className="text-sm text-foreground/85">{drug.spectrum}</p>
      </Section>

      <Section title="Adult dose">
        <code className="text-xs font-mono bg-muted/50 px-2 py-1 rounded">{drug.doseAdult}</code>
        <span className="text-xs text-muted-foreground ml-2">{drug.route.join(" / ")}</span>
      </Section>

      {drug.pearls.length > 0 && (
        <Section title="Pearls">
          <ul className="space-y-1.5">
            {drug.pearls.map((p, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {primaryBugs.length > 0 && (
        <Section title="Primary coverage">
          <div className="flex flex-wrap gap-1.5">
            {primaryBugs.map((b) => (
              <Chip
                key={b.id}
                label={b.name}
                variant="primary"
                onClick={() => onSelect({ kind: "bug", id: b.id })}
                testId={`chip-bug-${b.id}`}
              />
            ))}
          </div>
        </Section>
      )}

      {altBugs.length > 0 && (
        <Section title="Alternate coverage">
          <div className="flex flex-wrap gap-1.5">
            {altBugs.map((b) => (
              <Chip
                key={b.id}
                label={b.name}
                variant="alternate"
                onClick={() => onSelect({ kind: "bug", id: b.id })}
                testId={`chip-bug-${b.id}`}
              />
            ))}
          </div>
        </Section>
      )}

      {synList.length > 0 && (
        <Section title="Empiric for">
          <div className="flex flex-wrap gap-1.5">
            {synList.map((s) => (
              <Chip
                key={s.id}
                label={s.short ?? s.name}
                onClick={() => onSelect({ kind: "syndrome", id: s.id })}
                testId={`chip-syn-${s.id}`}
              />
            ))}
          </div>
        </Section>
      )}

      {drug.pregnancy && (
        <div className="mt-4 text-xs text-muted-foreground">
          <span className="font-mono uppercase tracking-wider">Pregnancy</span>: {drug.pregnancy}
        </div>
      )}
    </>
  );
}

function BugDetail({
  data,
  bugId,
  bugImages,
  onSelect,
}: {
  data: ModuleData;
  bugId: string;
  bugImages: Record<string, string>;
  onSelect: (sel: Selection) => void;
}) {
  const bug = data.bugs.find((b) => b.id === bugId);
  if (!bug) return null;

  const primaryDrugs = data.drugs.filter((d) => data.getCoverage(d.id, bug.id) === "primary");
  const altDrugs = data.drugs.filter((d) => data.getCoverage(d.id, bug.id) === "alternate");
  const synList = data.syndromes.filter((s) => bug.syndromes.includes(s.id));
  const img = bugImages[bug.id];

  return (
    <>
      <div className="flex items-start gap-3">
        {img && (
          <img
            src={img}
            alt={bug.name}
            className="w-20 h-20 rounded-xl object-cover border border-border shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-xl leading-tight">{bug.name}</h3>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mt-1">
            {bug.category}
          </div>
        </div>
      </div>

      <p className="text-sm mt-3 text-foreground/85 leading-relaxed">{bug.blurb}</p>

      {bug.pearls.length > 0 && (
        <Section title="Pearls">
          <ul className="space-y-1.5">
            {bug.pearls.map((p, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {primaryDrugs.length > 0 && (
        <Section title="First-line drugs">
          <div className="flex flex-wrap gap-1.5">
            {primaryDrugs.map((d) => (
              <Chip
                key={d.id}
                label={d.short ?? d.name}
                variant="primary"
                onClick={() => onSelect({ kind: "drug", id: d.id })}
                testId={`chip-drug-${d.id}`}
              />
            ))}
          </div>
        </Section>
      )}

      {altDrugs.length > 0 && (
        <Section title="Alternates">
          <div className="flex flex-wrap gap-1.5">
            {altDrugs.map((d) => (
              <Chip
                key={d.id}
                label={d.short ?? d.name}
                variant="alternate"
                onClick={() => onSelect({ kind: "drug", id: d.id })}
                testId={`chip-drug-${d.id}`}
              />
            ))}
          </div>
        </Section>
      )}

      {synList.length > 0 && (
        <Section title="Common syndromes">
          <div className="flex flex-wrap gap-1.5">
            {synList.map((s) => (
              <Chip
                key={s.id}
                label={s.short ?? s.name}
                onClick={() => onSelect({ kind: "syndrome", id: s.id })}
                testId={`chip-syn-${s.id}`}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function SyndromeDetail({
  data,
  synId,
  onSelect,
}: {
  data: ModuleData;
  synId: string;
  onSelect: (sel: Selection) => void;
}) {
  const syn = data.syndromes.find((s) => s.id === synId);
  if (!syn) return null;
  const empDrugs = syn.empiric.map((id) => data.drugs.find((d) => d.id === id)).filter(Boolean) as typeof data.drugs;
  const bugList = syn.commonBugs.map((id) => data.bugs.find((b) => b.id === id)).filter(Boolean) as typeof data.bugs;

  return (
    <>
      <h3 className="font-display font-bold text-xl leading-tight">{syn.name}</h3>
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mt-1">
        {syn.category}
      </div>

      <p className="text-sm mt-3 text-foreground/85 leading-relaxed">{syn.blurb}</p>

      {empDrugs.length > 0 && (
        <Section title="Empiric regimen">
          <div className="flex flex-wrap gap-1.5">
            {empDrugs.map((d) => (
              <Chip
                key={d.id}
                label={d.short ?? d.name}
                variant="primary"
                onClick={() => onSelect({ kind: "drug", id: d.id })}
                testId={`chip-drug-${d.id}`}
              />
            ))}
          </div>
        </Section>
      )}

      {bugList.length > 0 && (
        <Section title="Likely pathogens">
          <div className="flex flex-wrap gap-1.5">
            {bugList.map((b) => (
              <Chip
                key={b.id}
                label={b.name}
                onClick={() => onSelect({ kind: "bug", id: b.id })}
                testId={`chip-bug-${b.id}`}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1.5">
        {title}
      </div>
      {children}
    </div>
  );
}
