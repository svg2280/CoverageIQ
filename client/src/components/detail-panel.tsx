import type { Selection } from "./matrix";
import type { ModuleData } from "@/data";
import { sources as sourceTable } from "@/data";
import { Button } from "@/components/ui/button";
import { X, Pill, Bug as BugIcon, Stethoscope, ExternalLink, BookOpen } from "lucide-react";
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

  // Use the new primary/alternate split if available, else fall back to flat empiric.
  const primaryIds = syn.empiricPrimary ?? syn.empiric;
  const alternateIds = syn.empiricAlternate ?? [];
  const primaryDrugs = primaryIds
    .map((id) => data.drugs.find((d) => d.id === id))
    .filter(Boolean) as typeof data.drugs;
  const alternateDrugs = alternateIds
    .map((id) => data.drugs.find((d) => d.id === id))
    .filter(Boolean) as typeof data.drugs;
  const bugList = syn.commonBugs
    .map((id) => data.bugs.find((b) => b.id === id))
    .filter(Boolean) as typeof data.bugs;

  const sourceIds = syn.sourceIds ?? [];
  const refs = sourceIds
    .map((id) => sourceTable[id])
    .filter(Boolean);
  // Re-query OpenEvidence link — use Google site-search to land on a public OE page,
  // since OpenEvidence's /ask path generates private per-user conversations.
  const oeQuery = encodeURIComponent(`${syn.name} empiric antibiotic regimen guidelines`);
  const oeUrl = `https://www.google.com/search?q=site%3Aopenevidence.com+${oeQuery}`;

  return (
    <>
      <div className="flex items-start gap-2">
        <h3 className="font-display font-bold text-xl leading-tight flex-1">{syn.name}</h3>
        {refs.length > 0 && (
          <a
            href="#sources-block"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("sources-block");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="cite-badge cite-badge--inline shrink-0"
            title={`${refs.length} guideline source${refs.length > 1 ? "s" : ""}—jump to references`}
            data-testid="button-jump-sources"
            aria-label={`${refs.length} guideline references`}
          >
            {refs.map((_, i) => (
              <span key={i} className="cite-badge__num">[{i + 1}]</span>
            ))}
          </a>
        )}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mt-1">
        {syn.category}
      </div>

      <p className="text-sm mt-3 text-foreground/85 leading-relaxed">{syn.blurb}</p>

      {primaryDrugs.length > 0 && (
        <Section title={`Primary regimen${refs.length > 0 ? " \u2014 first-line per guideline" : ""}`}>
          <div className="flex flex-wrap gap-1.5 items-center">
            {primaryDrugs.map((d) => (
              <Chip
                key={d.id}
                label={d.short ?? d.name}
                variant="primary"
                onClick={() => onSelect({ kind: "drug", id: d.id })}
                testId={`chip-drug-${d.id}`}
              />
            ))}
            {refs.map((_, i) => (
              <a
                key={`ref-${i}`}
                href="#sources-block"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("sources-block")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="cite-badge cite-badge--ref"
                title="Jump to source citation"
                aria-label={`Citation ${i + 1}`}
              >
                [{i + 1}]
              </a>
            ))}
          </div>
        </Section>
      )}

      {alternateDrugs.length > 0 && (
        <Section title="Alternate regimen">
          <div className="flex flex-wrap gap-1.5">
            {alternateDrugs.map((d) => (
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

      {syn.guidelineNotes && (
        <Section title="Guideline notes">
          <p className="text-[12.5px] leading-relaxed text-foreground/80">
            {syn.guidelineNotes}
          </p>
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

      {refs.length > 0 && (
        <div id="sources-block" className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-2">
            <BookOpen className="w-3 h-3" />
            Sources
          </div>
          <ol className="space-y-2">
            {refs.map((ref, i) => (
              <li key={ref.id} className="text-[11px] leading-snug flex gap-2" data-testid={`source-${ref.id}`}>
                <span className="cite-badge__num shrink-0 mt-0.5">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9.5px] uppercase font-mono tracking-wider px-1.5 py-0.5 border border-border bg-background text-foreground">
                      {ref.org} · {ref.year}
                    </span>
                  </div>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/85 hover:text-primary hover:underline decoration-dotted underline-offset-2"
                  >
                    {ref.citation}
                    <ExternalLink className="inline-block w-2.5 h-2.5 ml-1 align-baseline opacity-60" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={oeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-openevidence-requery"
          >
            <span>Re-query in OpenEvidence</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
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
