// Antifungal coverage data
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";

export const drugClasses: DrugClass[] = [
  { id: "polyene", name: "Polyenes", color: "#d4a86f", blurb: "Amphotericin. Binds ergosterol → membrane damage. Toxic but broad." },
  { id: "azole", name: "Azoles", color: "#d4c46f", blurb: "Block ergosterol synthesis (CYP51). Many drug interactions." },
  { id: "echino", name: "Echinocandins", color: "#c4d46f", blurb: "Inhibit β-1,3-glucan synthase. Candida killers, no kidney toxicity." },
  { id: "flucy", name: "Flucytosine", color: "#9ed46f", blurb: "Adjunct for cryptococcal meningitis. Always combo." },
];

export const drugs: Drug[] = [
  // Polyenes
  { id: "ampho", name: "Amphotericin B (liposomal)", short: "L-AmB", classId: "polyene", blurb: "Big-gun antifungal. Mucor, severe crypto, refractory.", mechanism: "Binds ergosterol → pores", spectrum: "Almost all yeasts and molds (not C. lusitaniae, Aspergillus terreus)", pearls: ["Liposomal less nephrotoxic than deoxycholate", "Pre-medicate for infusion reactions"], doseAdult: "3-5 mg/kg IV daily", route: ["IV"], pregnancy: "caution" },

  // Azoles
  { id: "fluc", name: "Fluconazole", classId: "azole", blurb: "Candida (most), cryptococcus consolidation. Easy oral.", mechanism: "Inhibits CYP51", spectrum: "Most Candida (NOT krusei, variable glabrata), Cryptococcus", pearls: ["No mold coverage", "Watch QTc, hepatotox, drug interactions"], doseAdult: "400-800 mg IV/PO daily", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "itra", name: "Itraconazole", classId: "azole", blurb: "Dimorphics — histo, blasto, sporotrichosis.", mechanism: "Inhibits CYP51", spectrum: "Dimorphics, dermatophytes, some Aspergillus", pearls: ["Take capsules with acidic food/cola", "Negative inotrope — avoid in CHF"], doseAdult: "200 mg PO BID", route: ["PO"], pregnancy: "avoid" },
  { id: "vori", name: "Voriconazole", classId: "azole", blurb: "Aspergillus first-line. Therapeutic monitoring needed.", mechanism: "Inhibits CYP51", spectrum: "Aspergillus, Candida (incl krusei), Scedosporium, Fusarium", pearls: ["Visual disturbances common early", "Trough 2-5.5 mcg/mL"], doseAdult: "6 mg/kg load → 4 mg/kg IV q12h", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "posa", name: "Posaconazole", classId: "azole", blurb: "Mucor + Aspergillus prophylaxis. Broad mold coverage.", mechanism: "Inhibits CYP51", spectrum: "Aspergillus, Mucor, Candida, dimorphics", pearls: ["Tablet > suspension bioavailability", "Therapeutic monitoring recommended"], doseAdult: "300 mg PO daily (after load)", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "isavu", name: "Isavuconazole", classId: "azole", blurb: "Newer broad azole. Aspergillus + Mucor. No QTc prolongation (shortens it).", mechanism: "Inhibits CYP51", spectrum: "Aspergillus, Mucor, Candida", pearls: ["Predictable PK — no routine TDM", "Better-tolerated than vori"], doseAdult: "200 mg PO/IV daily after load", route: ["IV", "PO"], pregnancy: "avoid" },

  // Echinocandins
  { id: "mica", name: "Micafungin / Caspofungin / Anidulafungin", short: "Echino", classId: "echino", blurb: "Empiric Candida. Safe profile.", mechanism: "β-1,3 glucan synthase inhibition", spectrum: "Candida (incl glabrata, krusei), Aspergillus (less)", pearls: ["First-line empiric for candidemia", "No urine penetration — not for Candida UTI"], doseAdult: "Mica 100 mg IV daily", route: ["IV"], pregnancy: "caution" },

  // Flucytosine
  { id: "flucy", name: "Flucytosine (5-FC)", classId: "flucy", blurb: "Cryptococcal meningitis adjunct.", mechanism: "Pyrimidine analog → RNA misincorporation", spectrum: "Cryptococcus, Candida (combo)", pearls: ["Always combo (with ampho)", "Bone marrow suppression — TDM"], doseAdult: "25 mg/kg PO QID", route: ["PO"], pregnancy: "avoid" },
];

export const bugs: Bug[] = [
  { id: "candida-albicans", name: "Candida albicans", category: "yeast", shape: "atypical",
    blurb: "Most common candidiasis. Usually fluconazole-susceptible.",
    pearls: ["Echinocandin first if recent azole exposure or unstable", "De-escalate to fluconazole when stable"],
    syndromes: ["candidemia", "ic-mucocutaneous", "ic-uti"]},
  { id: "candida-glabrata", name: "Candida glabrata", category: "yeast", shape: "atypical",
    blurb: "Reduced fluconazole susceptibility. Echinocandin first.",
    pearls: ["High-dose fluconazole if susceptible", "Resistance increasing"],
    syndromes: ["candidemia", "ic-uti"]},
  { id: "candida-krusei", name: "Candida krusei", category: "yeast", shape: "atypical",
    blurb: "Intrinsically fluconazole-resistant.",
    pearls: ["Echinocandin or voriconazole"],
    syndromes: ["candidemia"]},
  { id: "candida-auris", name: "Candida auris", category: "yeast", shape: "atypical",
    blurb: "Multi-drug-resistant emerging yeast. Strict isolation.",
    pearls: ["Echinocandin first", "Often resistant to fluconazole and ampho"],
    syndromes: ["candidemia"]},
  { id: "crypto", name: "Cryptococcus", category: "yeast", shape: "atypical",
    blurb: "C. neoformans — meningitis in HIV/immunocomp.",
    pearls: ["Induction: L-AmB + flucytosine", "Consolidation: fluconazole 400 mg"],
    syndromes: ["crypto-meningitis"]},
  { id: "aspergillus", name: "Aspergillus", category: "mold", shape: "atypical",
    blurb: "A. fumigatus — invasive pulmonary disease in immunocompromised.",
    pearls: ["Voriconazole or isavuconazole first", "Galactomannan, BDG markers"],
    syndromes: ["ipa", "aspergilloma"]},
  { id: "mucor", name: "Mucorales", category: "mold", shape: "atypical",
    blurb: "Rhino-orbital-cerebral, pulmonary. Diabetic ketoacidosis classic host.",
    pearls: ["Surgical debridement + L-AmB", "Posa/isavu for step-down"],
    syndromes: ["mucor"]},
  { id: "histo", name: "Histoplasma", category: "dimorphic", shape: "atypical",
    blurb: "Mississippi/Ohio valleys. Bat/bird droppings.",
    pearls: ["Itraconazole for mild-mod", "L-AmB for severe/CNS"],
    syndromes: ["dimorphic"]},
  { id: "blasto", name: "Blastomyces", category: "dimorphic", shape: "atypical",
    blurb: "Great Lakes, Mississippi/Ohio. Pulmonary + skin.",
    pearls: ["Itraconazole for mild-mod"],
    syndromes: ["dimorphic"]},
  { id: "cocci", name: "Coccidioides", category: "dimorphic", shape: "atypical",
    blurb: "Valley fever — Southwest US, Central America.",
    pearls: ["Fluconazole high-dose", "Lifelong suppression in CNS disease"],
    syndromes: ["dimorphic"]},
  { id: "pjp", name: "Pneumocystis jirovecii", category: "atypical-fungus", shape: "atypical",
    blurb: "PJP pneumonia in HIV/immunocomp.",
    pearls: ["TMP-SMX first-line (treated as 'antibiotic' but it's a fungus)", "Add steroids if PaO2 <70 or A-a gradient >35"],
    syndromes: ["pjp"]},
];

export const syndromes: Syndrome[] = [
  { id: "candidemia", name: "Candidemia / Invasive candidiasis", category: "bloodstream",
    blurb: "Echinocandin first. De-escalate based on speciation/sensitivities.",
    empiric: ["mica", "fluc"],
    commonBugs: ["candida-albicans", "candida-glabrata", "candida-krusei", "candida-auris"]},
  { id: "ic-mucocutaneous", name: "Mucocutaneous candidiasis", category: "skin",
    blurb: "Oral thrush, esophagitis, vaginitis.",
    empiric: ["fluc"],
    commonBugs: ["candida-albicans", "candida-glabrata"]},
  { id: "ic-uti", name: "Candida UTI", category: "gu",
    blurb: "Asymptomatic candiduria rarely needs treatment. Symptomatic → fluconazole or AmB bladder irrigation.",
    empiric: ["fluc", "ampho"],
    commonBugs: ["candida-albicans", "candida-glabrata"]},
  { id: "crypto-meningitis", name: "Cryptococcal meningitis", category: "cns",
    blurb: "Induction → consolidation → maintenance.",
    empiric: ["ampho", "flucy", "fluc"],
    commonBugs: ["crypto"]},
  { id: "ipa", name: "Invasive pulmonary aspergillosis", short: "IPA", category: "respiratory",
    blurb: "Voriconazole or isavuconazole first-line.",
    empiric: ["vori", "isavu", "ampho"],
    commonBugs: ["aspergillus"]},
  { id: "aspergilloma", name: "Aspergilloma / chronic", category: "respiratory",
    blurb: "Cavity-dwelling fungus ball. Itraconazole or surgery.",
    empiric: ["itra", "vori"],
    commonBugs: ["aspergillus"]},
  { id: "mucor", name: "Mucormycosis", category: "respiratory",
    blurb: "Surgical debridement + L-AmB. Step-down to posa/isavu.",
    empiric: ["ampho", "isavu", "posa"],
    commonBugs: ["mucor"]},
  { id: "dimorphic", name: "Dimorphic fungi", category: "systemic",
    blurb: "Histo / blasto / cocci. Itraconazole or AmB by severity.",
    empiric: ["itra", "fluc", "ampho"],
    commonBugs: ["histo", "blasto", "cocci"]},
  { id: "pjp", name: "PJP pneumonia", category: "respiratory",
    blurb: "TMP-SMX + steroids if hypoxic. (TMP-SMX in antibacterials data.)",
    empiric: [],
    commonBugs: ["pjp"]},
];

const C: Record<string, Record<string, Coverage>> = {};
const set = (drug: string, bug: string, c: Coverage) => {
  if (!C[drug]) C[drug] = {};
  C[drug][bug] = c;
};

// AmB — broad
set("ampho", "candida-albicans", "primary"); set("ampho", "candida-glabrata", "primary");
set("ampho", "candida-krusei", "primary"); set("ampho", "candida-auris", "alternate");
set("ampho", "crypto", "primary"); set("ampho", "aspergillus", "alternate");
set("ampho", "mucor", "primary"); set("ampho", "histo", "primary");
set("ampho", "blasto", "primary"); set("ampho", "cocci", "primary");

// Fluconazole
set("fluc", "candida-albicans", "primary"); set("fluc", "candida-glabrata", "alternate");
set("fluc", "crypto", "primary"); set("fluc", "cocci", "primary"); set("fluc", "histo", "alternate");

// Itraconazole
set("itra", "histo", "primary"); set("itra", "blasto", "primary"); set("itra", "cocci", "alternate");
set("itra", "aspergillus", "alternate");

// Voriconazole
set("vori", "aspergillus", "primary"); set("vori", "candida-albicans", "primary");
set("vori", "candida-glabrata", "alternate"); set("vori", "candida-krusei", "primary");

// Posaconazole
set("posa", "aspergillus", "primary"); set("posa", "mucor", "primary");
set("posa", "candida-albicans", "primary"); set("posa", "histo", "alternate"); set("posa", "blasto", "alternate");

// Isavuconazole
set("isavu", "aspergillus", "primary"); set("isavu", "mucor", "primary");
set("isavu", "candida-albicans", "primary");

// Echinocandin
set("mica", "candida-albicans", "primary"); set("mica", "candida-glabrata", "primary");
set("mica", "candida-krusei", "primary"); set("mica", "candida-auris", "primary");
set("mica", "aspergillus", "alternate");

// Flucytosine
set("flucy", "crypto", "primary"); set("flucy", "candida-albicans", "alternate");

export const coverage = C;
export function getCoverage(drugId: string, bugId: string): Coverage {
  return C[drugId]?.[bugId] || "none";
}
export function getDrugById(id: string) { return drugs.find(d => d.id === id); }
export function getBugById(id: string) { return bugs.find(b => b.id === id); }
export function getSyndromeById(id: string) { return syndromes.find(s => s.id === id); }
export function getClassById(id: string) { return drugClasses.find(c => c.id === id); }
