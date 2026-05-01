// Unified module accessor — picks the right dataset based on the active module.
import * as antibac from "./antibacterials";
import * as antifun from "./antifungals";
import * as antivir from "./antivirals";
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";
import { sources, getSource } from "./sources";
import type { SourceRef } from "./sources";

export type { Coverage, Drug, DrugClass, Bug, Syndrome, SourceRef };
export { sources, getSource };

export type ModuleKey = "antibacterials" | "antifungals" | "antivirals";

export interface ModuleData {
  key: ModuleKey;
  label: string;
  emoji: string;
  accent: string;     // CSS class fragment (e.g. "bacteria")
  drugs: Drug[];
  drugClasses: DrugClass[];
  bugs: Bug[];
  syndromes: Syndrome[];
  getCoverage: (drugId: string, bugId: string) => Coverage;
}

export const modules: Record<ModuleKey, ModuleData> = {
  antibacterials: {
    key: "antibacterials",
    label: "Antibacterials",
    emoji: "🦠",
    accent: "bacteria",
    drugs: antibac.drugs,
    drugClasses: antibac.drugClasses,
    bugs: antibac.bugs,
    syndromes: antibac.syndromes,
    getCoverage: antibac.getCoverage,
  },
  antifungals: {
    key: "antifungals",
    label: "Antifungals",
    emoji: "🍄",
    accent: "fungi",
    drugs: antifun.drugs,
    drugClasses: antifun.drugClasses,
    bugs: antifun.bugs,
    syndromes: antifun.syndromes,
    getCoverage: antifun.getCoverage,
  },
  antivirals: {
    key: "antivirals",
    label: "Antivirals",
    emoji: "🧬",
    accent: "virus",
    drugs: antivir.drugs,
    drugClasses: antivir.drugClasses,
    bugs: antivir.bugs,
    syndromes: antivir.syndromes,
    getCoverage: antivir.getCoverage,
  },
};

// Helper for bug category styling — returns CSS variable name (without --)
export function bugCategoryColor(category: string): string {
  switch (category) {
    case "gram-pos": return "gram-pos";
    case "gram-neg": return "gram-neg";
    case "atypical": return "atypical";
    case "anaerobe": return "anaerobe";
    case "yeast": return "fungi";
    case "mold": return "fungi";
    case "dimorphic": return "fungi";
    case "atypical-fungus": return "fungi";
    case "virus": return "virus";
    default: return "gram-pos";
  }
}
