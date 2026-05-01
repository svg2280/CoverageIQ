export function Legend() {
  const items = [
    { label: "Primary / definitive", className: "cov-primary" },
    { label: "Possible alternative", className: "cov-alternate" },
    { label: "Drug class", className: "cov-class" },
    { label: "Not effective", className: "bg-card border-border text-muted-foreground" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]" data-testid="legend">
      {items.map((item) => (
        <div
          key={item.label}
          className={`px-2 py-0.5 rounded-md border ${item.className} font-medium flex items-center gap-1`}
          data-testid={`legend-${item.label.toLowerCase().replace(/\s/g, "-")}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {item.label}
        </div>
      ))}
    </div>
  );
}
