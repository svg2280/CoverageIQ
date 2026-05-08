// Shared mobile settings drawer used by both Home (mobile-layout) and Journal
// Watch. Renders a right-side sheet with: theme/flavor switcher, language
// toggle, dark/light, Atlas link, Journal Watch link, Feedback button, and
// footer policy links. Identical visual treatment + behaviors across pages.
import { X, Sun, Moon, MessageSquare, ChevronRight, Newspaper, BookOpen } from "lucide-react";
import { useTheme, FLAVOR_META, type ThemeFlavor } from "@/components/theme-provider";
import { useI18n } from "@/lib/i18n";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Which page is currently active — controls which top link is hidden. */
  current: "atlas" | "journal-watch";
}

export function MobileDrawer({ open, onClose, current }: MobileDrawerProps) {
  const { t, lang, setLang } = useI18n();
  const { theme, flavor, toggle: toggleTheme, cycleFlavor } = useTheme();
  const flavorMeta = FLAVOR_META[flavor as ThemeFlavor];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/40 md:hidden"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-72 bg-background border-l-2 border-foreground shadow-2xl p-4 space-y-3 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-serif font-black text-[16px]">Settings</span>
          <button
            onClick={onClose}
            className="w-9 h-9 grid place-items-center"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => {
            cycleFlavor();
          }}
          className="w-full min-h-[52px] flex items-center gap-3 px-3 border-2 border-foreground bg-card active:bg-accent"
          data-testid="mbtn-flavor"
        >
          <span className="text-[18px]">{flavorMeta.emoji}</span>
          <div className="flex-1 text-left">
            <div className="font-serif font-bold text-[14px]">
              Theme: {flavorMeta.label}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {flavorMeta.subtitle}
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            setLang(lang === "en" ? "es" : "en");
            onClose();
          }}
          className="w-full min-h-[52px] flex items-center gap-3 px-3 border-2 border-foreground bg-card active:bg-accent"
          data-testid="mbtn-lang"
        >
          <span className="font-mono font-bold text-[13px] px-2 py-1 border border-foreground">
            {lang.toUpperCase()}
          </span>
          <span className="font-serif font-bold text-[14px] flex-1 text-left">
            {lang === "en" ? "Switch to Español" : "Cambiar a English"}
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className="w-full min-h-[52px] flex items-center gap-3 px-3 border-2 border-foreground bg-card active:bg-accent"
          data-testid="mbtn-theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span className="font-serif font-bold text-[14px] flex-1 text-left">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </button>

        {current !== "atlas" && (
          <a
            href="#/"
            onClick={onClose}
            className="w-full min-h-[52px] flex items-center gap-3 px-3 border-2 border-foreground bg-card active:bg-accent"
            data-testid="mbtn-atlas"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-serif font-bold text-[14px] flex-1 text-left">
              {t("nav.atlas")}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </a>
        )}

        {current !== "journal-watch" && (
          <a
            href="#/journal-watch"
            onClick={onClose}
            className="w-full min-h-[52px] flex items-center gap-3 px-3 border-2 border-foreground bg-card active:bg-accent"
            data-testid="mbtn-journal-watch"
          >
            <Newspaper className="w-5 h-5" />
            <span className="font-serif font-bold text-[14px] flex-1 text-left">
              {t("nav.journalWatch")}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </a>
        )}

        <button
          onClick={() => {
            onClose();
            setTimeout(() => {
              window.dispatchEvent(new Event("coverageiq:open-feedback"));
            }, 150);
          }}
          className="w-full min-h-[52px] flex items-center gap-3 px-3 border-2 border-foreground bg-primary text-primary-foreground active:opacity-90"
          data-testid="mbtn-feedback"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="font-serif font-bold text-[14px] flex-1 text-left">
            {t("nav.feedback")}
          </span>
          <ChevronRight className="w-4 h-4 opacity-70" />
        </button>

        <div className="pt-3 border-t border-border space-y-2">
          <a
            href="#/disclaimer"
            onClick={onClose}
            className="block text-[13px] text-muted-foreground py-2"
          >
            {t("footer.disclaimer")}
          </a>
          <a
            href="#/privacy"
            onClick={onClose}
            className="block text-[13px] text-muted-foreground py-2"
          >
            {t("footer.privacy")}
          </a>
          <a
            href="#/terms"
            onClick={onClose}
            className="block text-[13px] text-muted-foreground py-2"
          >
            {t("footer.terms")}
          </a>
          <a
            href="#/contact"
            onClick={onClose}
            className="block text-[13px] text-muted-foreground py-2"
          >
            {t("footer.contact")}
          </a>
        </div>
      </div>
    </div>
  );
}
