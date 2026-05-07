import { useState, useMemo, useEffect } from "react";
import { modules, type ModuleKey } from "@/data";
import { Matrix, type Selection } from "@/components/matrix";
import { DetailPanel } from "@/components/detail-panel";
import { Logo } from "@/components/logo";
import { Legend } from "@/components/legend";
import { ClassRail, type ClassRailGroup } from "@/components/class-rail";
import { MobileLayout } from "@/components/mobile-layout";
import { useTheme, FLAVOR_META, type ThemeFlavor } from "@/components/theme-provider";
import {
  Search,
  Sun,
  Moon,
  Github,
  Sparkles,
  Mail,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { SiX, SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { BUG_IMAGES, type BugImage } from "@/data/bug-images";
import { useI18n } from "@/lib/i18n";

const moduleOrder: ModuleKey[] = ["antibacterials", "antifungals", "antivirals", "antiparasitics"];

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("antibacterials");
  const [hovered, setHovered] = useState<Selection>(null);
  const [pinned, setPinned] = useState<Selection>(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredClassGroup, setHoveredClassGroup] = useState<string | null>(null);
  const [pinnedClassGroup, setPinnedClassGroup] = useState<string | null>(null);
  // Bug images are bundled into the JS at build time so they survive any
  // proxy that 404s static JSON files.
  const bugImages: Record<string, BugImage> = BUG_IMAGES;
  const { theme, flavor, toggle: toggleTheme, cycleFlavor } = useTheme();
  const { lang, setLang, t } = useI18n();

  function changeModule(key: ModuleKey) {
    if (key === activeModule) return;
    setActiveModule(key);
    setHovered(null);
    setPinned(null);
    setSearch("");
    setHoveredClassGroup(null);
    setPinnedClassGroup(null);
  }

  const data = modules[activeModule];

  // Antibiotic class/group rail (only for antibacterials)
  const classRailGroups: ClassRailGroup[] = useMemo(() => {
    if (activeModule !== "antibacterials") return [];
    const drugIdsByClassId = (classIds: string[]) => {
      const set = new Set<string>();
      for (const d of data.drugs) if (classIds.includes(d.classId)) set.add(d.id);
      return set;
    };
    const drugIdsByPredicate = (pred: (d: typeof data.drugs[number]) => boolean) => {
      const set = new Set<string>();
      for (const d of data.drugs) if (pred(d)) set.add(d.id);
      return set;
    };
    return [
      { id: "penicillins", label: "Penicillins", drugIds: drugIdsByClassId(["penicillin"]) },
      { id: "carbapenems", label: "Carbapenems", drugIds: drugIdsByClassId(["carbapenem"]) },
      { id: "cephalosporins", label: "Cephalosporins", drugIds: drugIdsByClassId(["cephalosporin"]) },
      { id: "aminoglycosides", label: "Aminoglycosides", drugIds: drugIdsByClassId(["aminoglycoside"]) },
      { id: "macrolides", label: "Macrolides", drugIds: drugIdsByClassId(["macrolide"]) },
      { id: "fluoroquinolones", label: "Fluoroquinolones", drugIds: drugIdsByClassId(["fluoroquinolone"]) },
      { id: "tetracyclines", label: "Tetracyclines", drugIds: drugIdsByClassId(["tetracycline"]) },
      {
        id: "po",
        label: "PO Options",
        drugIds: drugIdsByPredicate((d) =>
          (d.route ?? []).some((r) => r.toUpperCase().includes("PO")),
        ),
      },
      {
        id: "bacteriostatic",
        label: "Bacteriostatic",
        drugIds: drugIdsByPredicate((d) =>
          [
            "tetracycline",
            "macrolide",
            "oxazolidinone",
            "sulfa",
            "lincosamide",
            "urinary",
          ].includes(d.classId),
        ),
      },
    ];
  }, [activeModule, data]);

  const activeClassGroupId = hoveredClassGroup ?? pinnedClassGroup;
  const classFilter = useMemo<Set<string> | null>(() => {
    if (!activeClassGroupId) return null;
    const g = classRailGroups.find((x) => x.id === activeClassGroupId);
    return g ? g.drugIds : null;
  }, [activeClassGroupId, classRailGroups]);

  // Search across drugs, bugs, syndromes — globally across ALL modules.
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const results: Array<{ kind: "drug" | "bug" | "syndrome"; id: string; label: string; module: ModuleKey; moduleLabel: string }> = [];
    const seen = new Set<string>();
    for (const mk of moduleOrder) {
      const m = modules[mk];
      const moduleLabel = m.label;
      for (const d of m.drugs) {
        const key = `drug-${d.id}`;
        if (!seen.has(key) && d.name.toLowerCase().includes(q)) {
          seen.add(key);
          results.push({ kind: "drug", id: d.id, label: d.name, module: mk, moduleLabel });
        }
      }
      for (const b of m.bugs) {
        const key = `bug-${b.id}-${mk}`;
        if (!seen.has(key) && b.name.toLowerCase().includes(q)) {
          seen.add(key);
          results.push({ kind: "bug", id: b.id, label: b.name, module: mk, moduleLabel });
        }
      }
      for (const s of m.syndromes) {
        const key = `syndrome-${s.id}-${mk}`;
        if (!seen.has(key) && s.name.toLowerCase().includes(q)) {
          seen.add(key);
          results.push({ kind: "syndrome", id: s.id, label: s.name, module: mk, moduleLabel });
        }
      }
    }
    return results;
  }, [search]);

  function onPin(sel: Selection) {
    if (pinned && sel && pinned.kind === sel.kind && pinned.id === sel.id) {
      setPinned(null);
    } else {
      setPinned(sel);
    }
  }

  // URL-only map for components that just need an image src
  const bugImageUrls = useMemo<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(bugImages)) out[k] = v.url;
    return out;
  }, [bugImages]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const drugImages = useMemo<Record<string, string>>(() => ({}), []);

  const flavorMeta = FLAVOR_META[flavor as ThemeFlavor];

  return (
    <>
    {/* MOBILE LAYOUT (<768px) */}
    <MobileLayout />
    {/* DESKTOP / TABLET LAYOUT (≥768px) */}
    <div className="hidden md:flex h-screen overflow-hidden flex-col">
      {/* HEADER */}
      <header className="flex-shrink-0 border-b-2 border-foreground bg-background">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6 py-2 flex items-center gap-3">
          <a
            href="#/"
            className="flex items-center gap-2 px-1 py-0.5"
            data-testid="link-home"
          >
            <Logo className="w-8 h-8" />
            <div className="leading-tight">
              <div className="font-serif font-black text-[18px] tracking-tight">
                CoverageIQ
              </div>
              <div className="font-script text-[12px] text-muted-foreground -mt-0.5">
                an antimicrobial atlas
              </div>
            </div>
          </a>

          {/* MODULE TABS */}
          <nav
            className="hidden md:flex items-center ml-3 border-2 border-foreground"
            role="tablist"
            aria-label="Antimicrobial module"
          >
            {moduleOrder.map((key, i) => {
              const m = modules[key];
              const active = key === activeModule;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => changeModule(key)}
                  data-testid={`tab-${key}`}
                  className={cn(
                    "px-3.5 py-1.5 font-serif font-bold text-[13px] tracking-tight transition-colors",
                    i > 0 && "border-l-2 border-foreground",
                    active
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-accent",
                  )}
                >
                  <span aria-hidden className="mr-1">{m.emoji}</span>
                  {m.label}
                </button>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* JOURNAL WATCH LINK */}
          <a
            href="#/journal-watch"
            className="hidden md:inline-flex items-center px-3 py-1.5 mr-2 font-serif font-bold text-[12px] tracking-tight uppercase border-2 border-foreground bg-card text-foreground hover:bg-foreground hover:text-background transition-colors"
            data-testid="link-journal-watch"
            title={t("nav.journalWatch")}
          >
            {t("nav.journalWatch")}
          </a>

          {/* SEARCH */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              placeholder={t("search.placeholder")}
              className="pl-8 pr-3 py-1.5 w-56 lg:w-72 h-8 bg-card border-2 border-foreground text-[13px] font-mono outline-none focus:bg-background"
              data-testid="input-search"
            />
            {searchOpen && search.trim() && searchResults.length > 0 && (
              <div
                className="absolute right-0 top-full mt-1 w-72 max-h-[60vh] overflow-y-auto bg-card border-2 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))] z-50"
                data-testid="search-results"
              >
                {searchResults.slice(0, 12).map((r, i) => (
                  <button
                    key={`${r.kind}-${r.id}-${r.module}-${i}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      if (r.module !== activeModule) changeModule(r.module);
                      setPinned({ kind: r.kind, id: r.id } as Selection);
                      setSearch("");
                      setSearchOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 flex items-start gap-2 border-b border-border last:border-b-0 hover:bg-accent transition-colors"
                    data-testid={`search-result-${r.kind}-${r.id}`}
                  >
                    <span
                      className="font-script text-[10px] uppercase tracking-wider px-1.5 py-0.5 border border-foreground bg-background mt-0.5"
                    >
                      {r.kind}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif font-bold text-[12px] truncate">{r.label}</span>
                      <span className="block text-[10px] text-muted-foreground truncate">{r.moduleLabel}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {searchOpen && search.trim() && searchResults.length === 0 && (
              <div className="absolute right-0 top-full mt-1 w-72 bg-card border-2 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))] z-50 px-3 py-3 text-[12px] text-muted-foreground">
                No matches across any module.
              </div>
            )}
          </div>

          {/* FLAVOR SWITCHER */}
          <button
            onClick={cycleFlavor}
            className="theme-switcher"
            title={`Theme: ${flavorMeta.label} — ${flavorMeta.subtitle}`}
            aria-label="Switch visual theme"
            data-testid="button-flavor"
          >
            <span aria-hidden className="text-[14px] leading-none">{flavorMeta.emoji}</span>
            <span>{flavorMeta.label}</span>
          </button>

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            aria-label={lang === "en" ? "Cambiar a espa\u00f1ol" : "Switch to English"}
            title={lang === "en" ? "Espa\u00f1ol" : "English"}
            data-testid="button-lang"
            className="px-2 h-8 inline-flex items-center justify-center border-2 border-foreground bg-card hover:bg-foreground hover:text-background transition-colors font-mono text-[11px] font-bold tracking-wider uppercase"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>

          {/* DARK / LIGHT */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="button-theme"
            className="w-8 h-8 grid place-items-center border-2 border-foreground bg-card hover:bg-foreground hover:text-background transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/svg2280/CoverageIQ"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:grid w-8 h-8 place-items-center border-2 border-foreground bg-card hover:bg-foreground hover:text-background transition-colors"
            aria-label="GitHub"
            data-testid="link-github"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile module tabs */}
        <div className="md:hidden border-t-2 border-foreground px-4 py-2 flex gap-1 overflow-x-auto">
          {moduleOrder.map((key) => {
            const m = modules[key];
            const active = key === activeModule;
            return (
              <button
                key={key}
                onClick={() => changeModule(key)}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border-2 border-foreground",
                  active ? "bg-foreground text-background" : "bg-card",
                )}
              >
                <span aria-hidden>{m.emoji}</span>
                {t(`tab.${key}`)}
              </button>
            );
          })}
        </div>
      </header>

      {/* HERO STRIP — single line, compact */}
      <section className="flex-shrink-0 max-w-[1700px] w-full mx-auto px-4 lg:px-6 pt-2 pb-1.5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-baseline gap-3 min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
              <Sparkles className="w-3 h-3" style={{ color: `hsl(var(--${data.accent}))` }} />
              <span className="hidden sm:inline">Module · </span>
              <span>{data.label}</span>
            </div>
            <h1 className="font-serif font-black text-[17px] leading-tight tracking-tight truncate">
              {t(`subtitle.${activeModule}`)}
            </h1>
          </div>

          <Legend />
        </div>
      </section>

      {/* CLASS / GROUP RAIL — antibacterials only */}
      {activeModule === "antibacterials" && classRailGroups.length > 0 && (
        <section className="flex-shrink-0 max-w-[1700px] w-full mx-auto px-4 lg:px-6 pb-1.5">
          <ClassRail
            groups={classRailGroups}
            hoveredId={hoveredClassGroup}
            pinnedId={pinnedClassGroup}
            onHover={setHoveredClassGroup}
            onPin={(id) =>
              setPinnedClassGroup((cur) => (cur === id ? null : id))
            }
          />
        </section>
      )}

      {/* MAIN MATRIX — fills all remaining vertical space */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 lg:px-6 pb-2 min-h-0 flex">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-3 w-full min-h-0">
          {/* Left: Matrix container with feature card pinned bottom-right */}
          <div className="relative flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <Matrix
                data={data}
                hovered={hovered}
                pinned={pinned}
                onHover={setHovered}
                onPin={onPin}
                search={search}
                bugImages={bugImageUrls}
                classFilter={classFilter}
              />
            </div>
          </div>

          {/* Right side: Detail panel with feature card overlay at bottom */}
          <div className="relative flex flex-col min-h-0">
            <DetailPanel
              data={data}
              selection={hovered ?? pinned}
              onClose={() => {
                setPinned(null);
                setHovered(null);
              }}
              onSelect={(sel) => setPinned(sel)}
              bugImages={bugImageUrls}
              drugImages={drugImages}
            />
            {/* Feature card — bottom-right pinned overlay (only when nothing is selected) */}
            {!(hovered || pinned) && (
              <FeatureCard className="hidden xl:block absolute bottom-2 right-2 left-2 z-20" />
            )}
          </div>
        </div>
      </main>

      {/* FOOTER — 2 strips: meta row + sources/share/legal row */}
      <footer className="flex-shrink-0 border-t-2 border-foreground bg-card">
        <div className="max-w-[1700px] mx-auto px-4 lg:px-6">
          {/* Row 1 — meta */}
          <div className="footer-meta py-1.5">
            <div className="flex items-center gap-2 font-mono uppercase tracking-wider">
              <Logo className="w-3.5 h-3.5" />
              <span>CoverageIQ · v1.2</span>
            </div>
            <p className="hidden md:block flex-1 text-center text-muted-foreground max-w-3xl mx-auto leading-snug">
              <strong className="text-foreground">{t("footer.disclaimerStrong")}</strong>{" "}
              {t("footer.disclaimerRest")}
            </p>
            <span
              className="font-script text-[12px] text-muted-foreground whitespace-nowrap"
              data-testid="text-copyright"
            >
              {t("footer.copyright")}
            </span>
          </div>

          {/* Row 2 — sources, share, legal */}
          <FooterExtras />
        </div>
      </footer>
    </div>
    </>
  );
}

function FooterExtras() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://coverageiq.net";
  const shareText = "CoverageIQ — interactive antimicrobial spectrum atlas";

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  function copyLink() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => setCopied(true))
        .catch(() => setCopied(false));
    }
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl,
  )}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    `${shareText} ${shareUrl}`,
  )}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(
    shareText,
  )}&body=${encodeURIComponent(`Check this out:\n\n${shareUrl}`)}`;

  return (
    <div className="footer-extras">
      <div className="footer-source-strip" data-testid="footer-sources">
        <span className="footer-source-strip__label">{t("footer.sourcedFrom")}</span>
        <a
          href="https://www.openevidence.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="source-logo"
          aria-label="OpenEvidence"
          title="OpenEvidence"
          data-testid="link-source-openevidence"
        >
          <img
            src="/sources/openevidence.png"
            alt="OpenEvidence"
            width={18}
            height={18}
            className="source-logo__img"
            loading="lazy"
          />
          <span className="source-logo__name">OpenEvidence</span>
        </a>
        <a
          href="https://www.idsociety.org/practice-guideline/alphabetical-guidelines/"
          target="_blank"
          rel="noopener noreferrer"
          className="source-logo"
          aria-label="IDSA Practice Guidelines"
          title="IDSA Practice Guidelines"
          data-testid="link-source-idsa"
        >
          <img
            src="/sources/idsa.png"
            alt="IDSA"
            width={18}
            height={18}
            className="source-logo__img"
            loading="lazy"
          />
          <span className="source-logo__name">IDSA</span>
        </a>
        <a
          href="https://www.sanfordguide.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="source-logo"
          aria-label="Sanford Guide"
          title="Sanford Guide"
          data-testid="link-source-sanford"
        >
          <img
            src="/sources/sanford.png"
            alt="Sanford Guide"
            width={18}
            height={18}
            className="source-logo__img"
            loading="lazy"
          />
          <span className="source-logo__name">Sanford</span>
        </a>
        <a
          href="https://www.hopkinsguides.com/hopkins/ub"
          target="_blank"
          rel="noopener noreferrer"
          className="source-logo"
          aria-label="Johns Hopkins Antibiotic Guide"
          title="Johns Hopkins Antibiotic Guide"
          data-testid="link-source-hopkins"
        >
          <img
            src="/sources/hopkins.png"
            alt="Johns Hopkins ABX"
            width={18}
            height={18}
            className="source-logo__img"
            loading="lazy"
          />
          <span className="source-logo__name">Hopkins ABX</span>
        </a>
      </div>

      <div className="footer-legal" data-testid="footer-legal">
        <a href="#/journal-watch" data-testid="link-journal-watch-footer">{t("footer.journalWatch")}</a>
        <span className="footer-legal__sep">·</span>
        <a href="#/disclaimer" data-testid="link-disclaimer">{t("footer.disclaimer")}</a>
        <span className="footer-legal__sep">·</span>
        <a href="#/privacy" data-testid="link-privacy">{t("footer.privacy")}</a>
        <span className="footer-legal__sep">·</span>
        <a href="#/terms" data-testid="link-terms">{t("footer.terms")}</a>
        <span className="footer-legal__sep">·</span>
        <a href="#/contact" data-testid="link-contact">{t("footer.contact")}</a>
      </div>

      <div className="share-strip" role="group" aria-label="Share CoverageIQ" data-testid="share-strip">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on X (Twitter)"
          aria-label="Share on X"
          data-testid="share-x"
        >
          <SiX size={11} />
        </a>
        <a
          href={liUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
          data-testid="share-linkedin"
        >
          <FaLinkedinIn size={11} />
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
          data-testid="share-whatsapp"
        >
          <SiWhatsapp size={11} />
        </a>
        <a
          href={mailUrl}
          className="share-btn"
          title="Email this link"
          aria-label="Share via email"
          data-testid="share-email"
        >
          <Mail size={11} />
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="share-btn"
          title={copied ? "Link copied" : "Copy link"}
          aria-label={copied ? "Link copied to clipboard" : "Copy link"}
          data-testid="share-copy"
          data-copied={copied ? "true" : "false"}
        >
          {copied ? <Check size={11} /> : <LinkIcon size={11} />}
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("feature-card p-3", className)}
      data-testid="feature-card"
      role="note"
      aria-label="How to use"
    >
      <div className="flex items-start gap-2">
        <div className="text-[22px] leading-none mt-0.5" aria-hidden>🔬</div>
        <div className="flex-1 min-w-0">
          <div className="font-sans font-black text-[15px] leading-tight tracking-tight">
            Hover. Click. Cover.
          </div>
          <p className="text-[10.5px] leading-snug mt-1 opacity-95">
            Hover any drug, bug, or syndrome to preview coverage.
          </p>
          <ul className="mt-1.5 grid gap-0.5 text-[9.5px] font-mono uppercase tracking-wider opacity-90">
            <li className="flex justify-between gap-2"><span>Hover</span><span>preview coverage</span></li>
            <li className="flex justify-between gap-2"><span>Click</span><span>pin details</span></li>
            <li className="flex justify-between gap-2"><span>Search</span><span>jump anywhere</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
