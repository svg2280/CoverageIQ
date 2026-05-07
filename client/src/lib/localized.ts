// Localized field accessor for clinical data objects.
// Returns the Spanish variant of a field when lang === "es" and the variant exists,
// otherwise falls back to the English original. Names (drug/bug/syndrome names) are
// intentionally NOT localized — universal medical terminology.
//
// Usage:
//   const { lang } = useI18n();
//   <p>{loc(drug, "blurb", lang)}</p>
//   {loc(drug, "pearls", lang).map(...)}
import type { Lang } from "./i18n";

/**
 * Pick the localized variant of a string field.
 * Looks for `${field}_es` when lang is "es" and returns it if non-empty.
 * Falls back to the original English field, or "" if both are missing.
 */
export function loc(
  obj: Record<string, unknown> | object,
  field: string,
  lang: Lang,
): string {
  const o = obj as Record<string, unknown>;
  if (lang === "es") {
    const esVal = o[`${field}_es`];
    if (typeof esVal === "string" && esVal.length > 0) return esVal;
  }
  const enVal = o[field];
  return typeof enVal === "string" ? enVal : "";
}

/**
 * Pick the localized variant of a string-array field (e.g. pearls).
 */
export function locArr(
  obj: Record<string, unknown> | object,
  field: string,
  lang: Lang,
): string[] {
  const o = obj as Record<string, unknown>;
  if (lang === "es") {
    const esVal = o[`${field}_es`];
    if (Array.isArray(esVal) && esVal.length > 0) return esVal as string[];
  }
  const enVal = o[field];
  return Array.isArray(enVal) ? (enVal as string[]) : [];
}
