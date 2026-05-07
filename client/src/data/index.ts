// Unified module accessor — picks the right dataset based on the active module.
import * as antibac from "./antibacterials";
import * as antifun from "./antifungals";
import * as antivir from "./antivirals";
import * as antipar from "./antiparasitics";
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";
import { sources, getSource } from "./sources";
import type { SourceRef } from "./sources";

export type { Coverage, Drug, DrugClass, Bug, Syndrome, SourceRef };
export { sources, getSource };

// Cross-module drug shim: TB/NTM/leprosy regimens reference some drugs (moxi, levo,
// linezolid, azithro, amikacin) whose canonical entries live in Antibacterials.
// We import those entries into the Antifungals module's drug list and synthesize
// a coverage row for them against TB bugs so the matrix renders correctly.
const SHARED_AB_DRUG_IDS = antifun.sharedAntibacterialDrugIds;
const sharedAntibacDrugs: Drug[] = SHARED_AB_DRUG_IDS
  .map((id) => antibac.drugs.find((d) => d.id === id))
  .filter((d): d is Drug => Boolean(d));
const sharedAntibacClasses: DrugClass[] = Array.from(
  new Set(sharedAntibacDrugs.map((d) => d.classId))
)
  .map((cid) => antibac.drugClasses.find((c) => c.id === cid))
  .filter((c): c is DrugClass => Boolean(c) && !antifun.drugClasses.some((ac) => ac.id === c!.id));

// Build the Antifungals/Anti-TB drug list = native antifungal drugs + shared antibacterial drugs.
const antifunDrugsCombined: Drug[] = [...antifun.drugs, ...sharedAntibacDrugs];
const antifunClassesCombined: DrugClass[] = [...antifun.drugClasses, ...sharedAntibacClasses];

// Cross-module getCoverage for the Antifungals/Anti-TB module:
// - if a row exists in antifun.coverage, use it
// - else if the bug is mycobacterial AND the drug is shared, fall back to antibac.getCoverage
const MYCOBACTERIAL_BUGS = new Set(["mtb", "mavium", "mabscessus", "mleprae", "mkansasii"]);
function antifunGetCoverage(drugId: string, bugId: string): Coverage {
  const direct = antifun.getCoverage(drugId, bugId);
  if (direct !== "none") return direct;
  if (MYCOBACTERIAL_BUGS.has(bugId) && SHARED_AB_DRUG_IDS.includes(drugId)) {
    return antibac.getCoverage(drugId, bugId);
  }
  return "none";
}

export type ModuleKey = "antibacterials" | "antifungals" | "antivirals" | "antiparasitics";

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
    label: "Antifungals / Anti-TB",
    emoji: "🍄",
    accent: "fungi",
    drugs: antifunDrugsCombined,
    drugClasses: antifunClassesCombined,
    bugs: antifun.bugs,
    syndromes: antifun.syndromes,
    getCoverage: antifunGetCoverage,
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
  antiparasitics: {
    key: "antiparasitics",
    label: "Antiparasitics",
    emoji: "🪱",
    accent: "parasite",
    drugs: antipar.drugs,
    drugClasses: antipar.drugClasses,
    bugs: antipar.bugs,
    syndromes: antipar.syndromes,
    getCoverage: antipar.getCoverage,
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
    case "mycobacteria": return "atypical";
    case "virus": return "virus";
    case "parasite-protozoa": return "parasite";
    case "parasite-helminth": return "parasite";
    case "parasite-ectoparasite": return "parasite";
    default: return "gram-pos";
  }
}
