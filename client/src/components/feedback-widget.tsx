import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";

/**
 * Floating bottom-right feedback widget — modeled on getdesign.md.
 *
 * Closed: pill button with chat icon + "Feedback" label.
 * Open:   small popover with multiline note + optional email + Send button.
 *
 * Send composes a mailto: with the user's message pre-filled, so the user
 * dispatches it from their own client (no backend required).
 */
export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Autofocus textarea when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  }, [open]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = note.trim();
    if (!trimmed) {
      textareaRef.current?.focus();
      return;
    }
    const lines = [
      trimmed,
      "",
      "---",
      email.trim() ? `Reply-to: ${email.trim()}` : "Reply-to: (not provided)",
      `Page: ${typeof window !== "undefined" ? window.location.href : ""}`,
      `UA: ${typeof navigator !== "undefined" ? navigator.userAgent : ""}`,
    ];
    const subject = "CoverageIQ feedback";
    const body = lines.join("\n");
    const url = `mailto:scottvangemert23@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    // Reset + close on next tick so the mailto fires first
    setTimeout(() => {
      setNote("");
      setEmail("");
      setOpen(false);
    }, 50);
  };

  return (
    <>
      {/* TRIGGER — fixed bottom-right pill */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close feedback panel" : "Open feedback panel"}
        aria-expanded={open}
        data-testid="button-feedback"
        className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-primary text-primary-foreground px-3 py-2 text-[12px] font-mono uppercase tracking-wider shadow-block-sm hover:shadow-block-md hover:-translate-x-px hover:-translate-y-px transition-all"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Feedback
      </button>

      {/* PANEL */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Send feedback"
          data-testid="panel-feedback"
          className="fixed bottom-16 right-4 z-[60] w-[min(360px,calc(100vw-2rem))] rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-block-md p-4"
          style={{ animation: "fb-pop 140ms ease-out" }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="text-[13px] font-semibold leading-tight">
              Send us a note
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              data-testid="button-feedback-close"
              className="p-0.5 rounded hover:bg-muted transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <form onSubmit={send} className="flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Share feedback or report a bug. Repro steps help."
              data-testid="textarea-feedback"
              className="w-full resize-none rounded-md border border-foreground/40 bg-background px-2.5 py-2 text-[12.5px] leading-snug placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional, if you'd like a reply)"
              autoComplete="email"
              data-testid="input-feedback-email"
              className="w-full rounded-md border border-foreground/40 bg-background px-2.5 py-1.5 text-[12px] placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
            />
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={!note.trim()}
                data-testid="button-feedback-send"
                className="inline-flex items-center rounded-full border-2 border-foreground bg-primary text-primary-foreground px-3.5 py-1 text-[11.5px] font-mono uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-block-sm hover:-translate-x-px hover:-translate-y-px transition-all"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {/* keyframes scoped to widget */}
      <style>{`
        @keyframes fb-pop {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </>
  );
}
