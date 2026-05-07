import { useI18n } from "@/lib/i18n";

export function Legend() {
  const { t } = useI18n();
  const items = [
    { key: "primary", label: t("legend.primary"), className: "cov-primary" },
    { key: "alternate", label: t("legend.alternate"), className: "cov-alternate" },
    { key: "class", label: t("legend.class"), className: "cov-class" },
    { key: "none", label: t("legend.none"), className: "bg-card border-border text-muted-foreground" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]" data-testid="legend">
      {items.map((item) => (
        <div
          key={item.key}
          className={`px-2 py-0.5 rounded-md border ${item.className} font-medium flex items-center gap-1`}
          data-testid={`legend-${item.key}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {item.label}
        </div>
      ))}
    </div>
  );
}
