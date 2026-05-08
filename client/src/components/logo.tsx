// CoverageIQ brand logo. Uses FIXED brand colors (not theme variables) so the
// mark looks identical across home/journal-watch, desktop/mobile, and any
// active module/theme. The gradient stays warm-orange → violet to read as
// pharmacology + intelligence. The capsule "C" is white for max contrast.
//
// IMPORTANT: the gradient gets a UNIQUE id per instance via React.useId().
// Home renders <Logo/> twice (mobile + desktop layouts both in DOM). If both
// SVGs share id="logo-grad", the desktop one's fill="url(#logo-grad)" can
// resolve to the (hidden) mobile gradient and render blank in some browsers,
// leaving only the white capsule + 2 dots — a pale "dotted circle" look.
import { useId } from "react";

export function Logo({ className = "" }: { className?: string }) {
  const rid = useId();
  const gradId = `logo-grad-${rid.replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 32 32"
      aria-label="CoverageIQ logo"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#D97A4E" />
          <stop offset="100%" stopColor="#7B5BA8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill={`url(#${gradId})`} />
      <circle cx="16" cy="16" r="14" fill="none" stroke="#1a1a1a" strokeOpacity="0.22" strokeWidth="1" />
      {/* "C" mark formed by a capsule */}
      <path
        d="M11 11h7a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-7z"
        fill="#FFFFFF"
      />
      <circle cx="11" cy="13" r="1.2" fill="#D97A4E" />
      <circle cx="11" cy="19" r="1.2" fill="#7B5BA8" />
    </svg>
  );
}
