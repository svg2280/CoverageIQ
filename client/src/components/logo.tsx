export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-label="CoverageIQ logo"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--bacteria))" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#logo-grad)" />
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
      {/* "C" mark formed by a capsule */}
      <path
        d="M11 11h7a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-7z"
        fill="hsl(var(--background))"
      />
      <circle cx="11" cy="13" r="1.2" fill="hsl(var(--primary))" />
      <circle cx="11" cy="19" r="1.2" fill="hsl(var(--bacteria))" />
    </svg>
  );
}
