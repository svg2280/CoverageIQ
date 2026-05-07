import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/**
 * Floating bottom-right feedback widget — modeled on getdesign.md.
 *
 * Closed: pill button with chat icon + "Feedback" label.
 * Open:   small popover with multiline note + optional email + Send button.
 *
 * Send composes a mailto: with the user's message pre-filled, so the user
 * dispatches it from their own client (no backend required).
 */
type SendStatus = "idle" | "sending" | "sent" | "error";

export function FeedbackWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
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

  // Allow other components (e.g. mobile sidebar) to open feedback via a custom event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("coverageiq:open-feedback", handler);
    return () => window.removeEventListener("coverageiq:open-feedback", handler);
  }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = note.trim();
    if (!trimmed) {
      textareaRef.current?.focus();
      return;
    }

    const payload = {
      message: trimmed,
      replyTo: email.trim() || null,
      page: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    setStatus("sending");

    // Try Worker → Resend backend first.
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          setNote("");
          setEmail("");
          setStatus("idle");
          setOpen(false);
        }, 1600);
        return;
      }
      // Non-OK status → fall through to mailto fallback
    } catch {
      // Network/CORS error → fall through to mailto fallback
    }

    // Fallback: open user's mail client with content pre-filled.
    const subject = "CoverageIQ feedback";
    const body = [
      trimmed,
      "",
      "---",
      payload.replyTo ? `Reply-to: ${payload.replyTo}` : "Reply-to: (not provided)",
      `Page: ${payload.page}`,
      `UA: ${payload.userAgent}`,
    ].join("\n");
    const url = `mailto:scottvg@oneMDmedical.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setStatus("sent");
    setTimeout(() => {
      setNote("");
      setEmail("");
      setStatus("idle");
      setOpen(false);
    }, 250);
  };

  return (
    <>
      {/* TRIGGER — fixed bottom-right pill.
          On phones (≤sm) we drop the label so the icon doesn't cover footer links;
          on tablets+ we show the full pill. The page reserves bottom-padding
          via the .has-feedback-widget body class so footer copy never collides. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("fb.close") : t("fb.open")}
        aria-expanded={open}
        data-testid="button-feedback"
        className="inline-flex fixed right-4 z-[60] items-center gap-1.5 rounded-full border-2 border-foreground bg-primary text-primary-foreground shadow-block-sm hover:shadow-block-md hover:-translate-x-px hover:-translate-y-px transition-all px-3 py-2 text-[12px] font-mono uppercase tracking-wider bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-4"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t("nav.feedback")}</span>
      </button>

      {/* PANEL */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={t("fb.title")}
          data-testid="panel-feedback"
          className="fixed bottom-16 right-4 z-[60] w-[min(360px,calc(100vw-2rem))] rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-block-md p-4"
          style={{ animation: "fb-pop 140ms ease-out" }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="text-[13px] font-semibold leading-tight">
              {t("fb.title")}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("fb.close")}
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
              placeholder={t("fb.notePlaceholder")}
              data-testid="textarea-feedback"
              className="w-full resize-none rounded-md border border-foreground/40 bg-background px-2.5 py-2 text-[12.5px] leading-snug placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("fb.emailPlaceholder")}
              autoComplete="email"
              data-testid="input-feedback-email"
              className="w-full rounded-md border border-foreground/40 bg-background px-2.5 py-1.5 text-[12px] placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
            />
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={!note.trim() || status === "sending"}
                data-testid="button-feedback-send"
                className="inline-flex items-center rounded-full border-2 border-foreground bg-primary text-primary-foreground px-3.5 py-1 text-[11.5px] font-mono uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-block-sm hover:-translate-x-px hover:-translate-y-px transition-all"
              >
                {status === "sending" ? t("fb.sending") : status === "sent" ? t("fb.sent") : t("fb.send")}
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
