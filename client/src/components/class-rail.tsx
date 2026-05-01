import { cn } from "@/lib/utils";

export interface ClassRailGroup {
  id: string;
  label: string;
  drugIds: Set<string>;
}

interface ClassRailProps {
  groups: ClassRailGroup[];
  hoveredId: string | null;
  pinnedId: string | null;
  onHover: (id: string | null) => void;
  onPin: (id: string) => void;
}

/**
 * Horizontal "Antibiotic Classes / Groups" rail.
 * Hover a chip → corresponding drugs in the matrix turn green (drug-cell--class)
 * and non-matching cells dim via [data-selection="active"].
 * Click pins/unpins the selection.
 */
export function ClassRail({
  groups,
  hoveredId,
  pinnedId,
  onHover,
  onPin,
}: ClassRailProps) {
  const activeId = hoveredId ?? pinnedId;
  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      data-testid="class-rail"
      onMouseLeave={() => onHover(null)}
    >
      <span className="font-script text-[11px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap pr-1">
        Classes / Groups
      </span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {groups.map((g) => {
          const isHovered = hoveredId === g.id;
          const isPinned = pinnedId === g.id;
          const isActive = activeId === g.id;
          const count = g.drugIds.size;
          return (
            <button
              key={g.id}
              type="button"
              onMouseEnter={() => onHover(g.id)}
              onFocus={() => onHover(g.id)}
              onBlur={() => onHover(null)}
              onClick={() => onPin(g.id)}
              data-testid={`class-chip-${g.id}`}
              data-active={isActive ? "true" : "false"}
              aria-pressed={isPinned}
              title={`${g.label} · ${count} drug${count === 1 ? "" : "s"}`}
              className={cn(
                "class-chip group inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-foreground bg-card",
                "font-mono text-[10.5px] uppercase tracking-wider leading-none",
                "transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-block-sm",
                isActive && "class-chip--active",
              )}
            >
              <span className="font-bold">{g.label}</span>
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[16px] h-[14px] px-1 text-[9px] font-bold border border-foreground",
                  isActive ? "bg-foreground/20" : "bg-background",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
