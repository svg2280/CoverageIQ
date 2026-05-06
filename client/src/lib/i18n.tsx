// Lightweight i18n for CoverageIQ (English + Spanish).
//
// Scope: ONLY the chrome (UI labels, footer, headers, helper text).
// Drug/bug/syndrome names stay in English on purpose — they are universal
// medical/pharmacological terms used identically in Spanish-language
// hospitals and ID literature, and translating them would harm safety.
//
// Usage:
//   const { t, lang, setLang } = useI18n();
//   <button>{t("nav.atlas")}</button>
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "es";

type Dict = Record<string, string>;

const en: Dict = {
  // Header / nav
  "nav.atlas": "Atlas",
  "nav.journalWatch": "Journal Watch",
  "nav.openBlog": "CoverageIQ Blog",
  "nav.refresh": "Refresh",
  "nav.feedback": "Feedback",

  // Tabs (modules)
  "tab.antibacterials": "Antibacterials",
  "tab.antifungals": "Antifungals",
  "tab.antivirals": "Antivirals",
  "tab.antiparasitics": "Antiparasitics",

  // Search
  "search.placeholder": "Search drugs, bugs, syndromes…",

  // Module subtitle
  "subtitle.antibacterials": "The interactive antimicrobial spectrum atlas.",
  "subtitle.antifungals": "Coverage map for systemic mycoses.",
  "subtitle.antivirals": "Direct-acting antivirals at a glance.",
  "subtitle.antiparasitics": "Drug ↔ parasite coverage at a glance.",

  // Coverage legend
  "legend.primary": "Primary / definitive",
  "legend.alternate": "Possible alternative",
  "legend.class": "Drug class",
  "legend.none": "Not effective",

  // Columns
  "col.drugs": "Drugs",
  "col.bugs": "Bugs",
  "col.syndromes": "Syndromes",

  // Detail card placeholder
  "detail.title": "Detail card",
  "detail.placeholder":
    "Hover or click anything in the matrix to load full coverage notes here.",
  "detail.helper.title": "Hover. Click. Cover.",
  "detail.helper.body":
    "Hover any drug, bug, or syndrome to preview coverage.",
  "detail.helper.hover": "Hover",
  "detail.helper.preview": "Preview coverage",
  "detail.helper.click": "Click",
  "detail.helper.pin": "Pin details",
  "detail.helper.search": "Search",
  "detail.helper.jump": "Jump anywhere",

  // Footer
  "footer.disclaimerStrong": "Educational reference only.",
  "footer.disclaimerRest":
    "Not a substitute for clinical judgment, local antibiogram, or ID consult.",
  "footer.copyright": "© 2026 Scott A. Van Gemert, MD · All rights reserved",
  "footer.sourcedFrom": "Sourced from",
  "footer.journalWatch": "Journal Watch",
  "footer.disclaimer": "Disclaimer",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.contact": "Contact",
  "footer.shareCopy": "Copy link",
  "footer.shareCopied": "Copied!",

  // Feedback widget
  "fb.open": "Open feedback panel",
  "fb.close": "Close feedback panel",
  "fb.title": "Send us a note",
  "fb.notePlaceholder": "Share feedback or report a bug. Repro steps help.",
  "fb.emailPlaceholder": "Email (optional, if you'd like a reply)",
  "fb.send": "Send",
  "fb.sending": "Sending…",
  "fb.sent": "Sent ✓",

  // Language toggle
  "lang.toggle": "Idioma",
};

const es: Dict = {
  // Header / nav
  "nav.atlas": "Atlas",
  "nav.journalWatch": "Revistas",
  "nav.openBlog": "Blog CoverageIQ",
  "nav.refresh": "Actualizar",
  "nav.feedback": "Comentarios",

  // Tabs
  "tab.antibacterials": "Antibacterianos",
  "tab.antifungals": "Antifúngicos",
  "tab.antivirals": "Antivirales",
  "tab.antiparasitics": "Antiparasitarios",

  "search.placeholder": "Buscar fármacos, microbios, síndromes…",

  "subtitle.antibacterials": "Atlas interactivo del espectro antimicrobiano.",
  "subtitle.antifungals": "Mapa de cobertura para micosis sistémicas.",
  "subtitle.antivirals": "Antivirales de acción directa, de un vistazo.",
  "subtitle.antiparasitics": "Cobertura fármaco ↔ parásito de un vistazo.",

  "legend.primary": "Primaria / definitiva",
  "legend.alternate": "Alternativa posible",
  "legend.class": "Clase del fármaco",
  "legend.none": "No efectivo",

  "col.drugs": "Fármacos",
  "col.bugs": "Microbios",
  "col.syndromes": "Síndromes",

  "detail.title": "Ficha clínica",
  "detail.placeholder":
    "Pasa el cursor o haz clic sobre cualquier elemento para ver las notas completas.",
  "detail.helper.title": "Pasa. Haz clic. Cubre.",
  "detail.helper.body":
    "Pasa el cursor sobre cualquier fármaco, microbio o síndrome para previsualizar la cobertura.",
  "detail.helper.hover": "Pasar",
  "detail.helper.preview": "Vista previa",
  "detail.helper.click": "Clic",
  "detail.helper.pin": "Fijar detalles",
  "detail.helper.search": "Buscar",
  "detail.helper.jump": "Ir a cualquier lugar",

  "footer.disclaimerStrong": "Solo referencia educativa.",
  "footer.disclaimerRest":
    "No sustituye al juicio clínico, al antibiograma local ni a la consulta con un infectólogo.",
  "footer.copyright": "© 2026 Scott A. Van Gemert, MD · Todos los derechos reservados",
  "footer.sourcedFrom": "Fuentes",
  "footer.journalWatch": "Revistas",
  "footer.disclaimer": "Aviso legal",
  "footer.privacy": "Privacidad",
  "footer.terms": "Términos",
  "footer.contact": "Contacto",
  "footer.shareCopy": "Copiar enlace",
  "footer.shareCopied": "¡Copiado!",

  "fb.open": "Abrir panel de comentarios",
  "fb.close": "Cerrar panel de comentarios",
  "fb.title": "Envíanos un mensaje",
  "fb.notePlaceholder":
    "Comparte un comentario o reporta un error. Los pasos para reproducirlo ayudan.",
  "fb.emailPlaceholder": "Correo (opcional, si quieres respuesta)",
  "fb.send": "Enviar",
  "fb.sending": "Enviando…",
  "fb.sent": "Enviado ✓",

  "lang.toggle": "Language",
};

const dictionaries: Record<Lang, Dict> = { en, es };

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "coverageiq.lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;
  // Auto-detect from browser if Spanish-speaking locale
  const nav = navigator.language || "en";
  if (/^es\b/i.test(nav)) return "es";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang());

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: (l) => setLangState(l),
      t: (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe fallback: no provider mounted (shouldn't happen in production)
    return {
      lang: "en",
      setLang: () => {},
      t: (key: string) => en[key] ?? key,
    };
  }
  return ctx;
}
