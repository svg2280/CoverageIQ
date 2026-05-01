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
    empiric: ["mica", "fluc", "ampho", "vori"],
    empiricPrimary: ["mica"],
    empiricAlternate: ["fluc", "ampho", "vori", "fluc"],
    sourceIds: ["candida-idsa-2016"],
    guidelineNotes: "Nonneutropenic: echinocandin (micafungin 100 mg/day, caspofungin 70 mg load then 50 mg/day, or anidulafungin 200 mg load then 100 mg/day) is preferred initial therapy. Fluconazole IV/PO (800 mg loading then 400 mg/day) acceptable for non-critically ill patients unlikely to have azole-resistant species. Transition echinocandin to fluconazole at 5-7 days if clinically stable, azole-susceptible isolate, and negative repeat cultures. Neutropenic: same echinocandin preference. Remove central venous catheter when feasible. Duration: minimum 2 weeks after documented clearance from bloodstream + resolution of symptoms. Ophthalmologic exam recommended.",
    commonBugs: ["candida-albicans", "candida-glabrata", "candida-krusei", "candida-auris"]},
  { id: "ic-mucocutaneous", name: "Mucocutaneous candidiasis", category: "skin",
    blurb: "Oral thrush, esophagitis, vaginitis.",
    empiric: ["fluc", "itra", "posa", "vori", "mica", "ampho"],
    empiricPrimary: ["fluc"],
    empiricAlternate: ["itra", "posa", "vori", "mica", "ampho"],
    sourceIds: ["candida-idsa-2016"],
    guidelineNotes: "Oropharyngeal, mild: clotrimazole troches 10 mg 5 times/day x 7-14 days OR nystatin suspension. Oropharyngeal, moderate-severe: fluconazole 100-200 mg/day x 7-14 days. Esophageal: fluconazole 200-400 mg/day PO x 14-21 days (systemic therapy always required; diagnostic antifungal trial appropriate). If cannot tolerate oral: IV fluconazole 400 mg/day or IV echinocandin. Fluconazole-refractory esophageal: itraconazole solution 200 mg/day or voriconazole 200 mg BID x 14-21 days. Vulvovaginal: fluconazole 150 mg single oral dose (uncomplicated); recurring: 10-14 days induction then fluconazole 150 mg weekly x 6 months.",
    commonBugs: ["candida-albicans", "candida-glabrata"]},
  { id: "ic-uti", name: "Candida UTI", category: "gu",
    blurb: "Asymptomatic candiduria rarely needs treatment. Symptomatic → fluconazole or AmB bladder irrigation.",
    empiric: ["fluc", "ampho", "flucy"],
    empiricPrimary: ["fluc"],
    empiricAlternate: ["ampho", "flucy"],
    sourceIds: ["candida-idsa-2016"],
    guidelineNotes: "Candida cystitis (fluconazole-susceptible): fluconazole 200 mg/day PO x 2 weeks. Fluconazole-resistant C. glabrata: amphotericin B deoxycholate 0.3-0.6 mg/kg/day IV x 1-7 days OR flucytosine 25 mg/kg QID x 7-10 days. C. krusei: amphotericin B. Echinocandins have poor urinary penetration and should be used with caution (generally limited to salvage). Asymptomatic candiduria: treat only if high-risk (neutropenic, undergoing urologic procedures, very low birth weight infants). Remove Foley catheters when feasible.",
    commonBugs: ["candida-albicans", "candida-glabrata"]},
  { id: "crypto-meningitis", name: "Cryptococcal meningitis", category: "cns",
    blurb: "Induction → consolidation → maintenance.",
    empiric: ["ampho", "flucy", "fluc"],
    empiricPrimary: ["ampho", "flucy"],
    empiricAlternate: ["fluc"],
    sourceIds: ["crypto-idsa-2010"],
    guidelineNotes: "Induction (2 weeks): liposomal amphotericin B (AmB) 3-4 mg/kg/day IV + flucytosine 25 mg/kg QID (high-income setting). If flucytosine unavailable: AmB deoxycholate 0.7-1.0 mg/kg/day + fluconazole 800-1200 mg/day. Consolidation (8 weeks): fluconazole 400 mg/day PO. Maintenance (≥1 year): fluconazole 200 mg/day PO (continue until CD4 >200 in HIV). Serial therapeutic lumbar punctures to manage elevated ICP — critical for survival. HIV patients: delay ART initiation 4-6 weeks to avoid IRIS.",
    commonBugs: ["crypto"]},
  { id: "ipa", name: "Invasive pulmonary aspergillosis", short: "IPA", category: "respiratory",
    blurb: "Voriconazole or isavuconazole first-line.",
    empiric: ["vori", "isavu", "ampho", "posa", "mica"],
    empiricPrimary: ["vori"],
    empiricAlternate: ["isavu", "ampho", "posa", "mica"],
    sourceIds: ["aspergillosis-idsa-2016"],
    guidelineNotes: "Primary therapy: voriconazole 6 mg/kg IV q12h x 2 doses, then 4 mg/kg IV q12h; oral 200-300 mg q12h acceptable. Alternative primary: isavuconazole (strong recommendation, moderate evidence) OR liposomal amphotericin B 3-5 mg/kg/day. Combination voriconazole + echinocandin may be considered in select patients with documented IPA. Echinocandin monotherapy NOT recommended for primary therapy. Preemptive/empiric (febrile neutropenia): liposomal AmB, caspofungin, micafungin, or voriconazole. Duration: minimum 6-12 weeks depending on clinical response and immune recovery.",
    commonBugs: ["aspergillus"]},
  { id: "aspergilloma", name: "Aspergilloma / chronic", category: "respiratory",
    blurb: "Cavity-dwelling fungus ball. Itraconazole or surgery.",
    empiric: ["vori", "itra", "posa", "isavu", "ampho"],
    empiricPrimary: ["vori", "itra"],
    empiricAlternate: ["posa", "isavu", "ampho"],
    sourceIds: ["aspergillosis-idsa-2016"],
    guidelineNotes: "Simple aspergilloma (single cavity, no symptoms): antifungal treatment not routinely required; surgical resection for selected patients (hemoptysis, complications). Chronic cavitary pulmonary aspergillosis (CCPA)/chronic necrotizing (CNPA): treat symptomatic patients or those with progressive lung function loss or radiographic progression with minimum 6 months antifungal therapy. Preferred oral agents: itraconazole 200 mg BID or voriconazole 200 mg BID. Posaconazole 300 mg daily is useful third-line for adverse events or failure. Duration often 12-24+ months; relapse common after discontinuation.",
    commonBugs: ["aspergillus"]},
  { id: "mucor", name: "Mucormycosis", category: "respiratory",
    blurb: "Surgical debridement + L-AmB. Step-down to posa/isavu.",
    empiric: ["ampho", "isavu", "posa"],
    empiricPrimary: ["ampho"],
    empiricAlternate: ["isavu", "posa"],
    sourceIds: ["mucor-idsociety-2019"],
    guidelineNotes: "First-line: liposomal amphotericin B (L-AmB) high dose (5-10 mg/kg/day IV) — drug of choice per global guidelines. Surgical debridement mandatory when possible; essential for rhinocerebral, cutaneous, and pulmonary forms. Reverse underlying immunosuppression/hyperglycemia when feasible. Step-down/alternative: isavuconazole 372 mg TID x 2 days (loading), then 372 mg daily (approved FDA 2015 for mucormycosis when AmB inappropriate). Posaconazole 300 mg daily (oral tablet) as alternative or salvage. Combination AmB + echinocandin not routinely recommended. Duration of treatment highly individualized (minimum weeks to months).",
    commonBugs: ["mucor"]},
  { id: "dimorphic", name: "Dimorphic fungi", category: "systemic",
    blurb: "Histo / blasto / cocci. Itraconazole or AmB by severity.",
    empiric: ["itra", "ampho", "fluc", "vori", "posa"],
    empiricPrimary: ["itra", "ampho"],
    empiricAlternate: ["fluc", "vori", "posa"],
    sourceIds: ["histo-idsa-2007", "blasto-ecmm-2021"],
    guidelineNotes: "Histoplasmosis — disseminated/severe: liposomal AmB 3 mg/kg/day x 1-2 weeks then itraconazole 200 mg TID x 3 days then BID x ≥12 months. Mild-moderate pulmonary histo (symptomatic): itraconazole 200 mg BID x 6-12 weeks (conditionally). Blastomycosis — severe/CNS: liposomal AmB induction then step-down to itraconazole 200 mg BID x 6-12 months. Mild-moderate blastomycosis: itraconazole 200 mg TID x 3 days then BID x 6-12 months. Coccidioidomycosis — primary pulmonary in immunocompetent usually self-limited; disseminated or severe: fluconazole 400 mg/day or itraconazole 200 mg BID; meningitis: fluconazole 400-800 mg/day lifelong. Itraconazole levels should be monitored.",
    commonBugs: ["histo", "blasto", "cocci"]},
  { id: "pjp", name: "PJP pneumonia", category: "respiratory",
    blurb: "TMP-SMX + steroids if hypoxic. (TMP-SMX in antibacterials data.)",
    empiric: ["tmpsmx", "dapto"],
    empiricPrimary: ["tmpsmx"],
    empiricAlternate: ["dapto"],
    sourceIds: ["pjp-nih-oi-2023"],
    guidelineNotes: "Drug of choice: TMP-SMX (trimethoprim 15-20 mg/kg/day + sulfamethoxazole 75-100 mg/kg/day) PO or IV in 3-4 divided doses x 21 days. IV for severe disease (PaO2 <70 mmHg or A-a gradient >35 mmHg). Adjunctive corticosteroids (prednisone 40 mg BID x 5 days → 40 mg/day x 5 days → 20 mg/day x 11 days) in HIV-infected patients with moderate-severe PJP. Alternatives: pentamidine 4 mg/kg IV/day x 21 days; dapsone 100 mg/day + trimethoprim 5 mg/kg TID (mild-moderate); atovaquone 750 mg BID (mild-moderate); primaquine + clindamycin (salvage). Note: dapsone is not in the CoverageIQ drug vocabulary — atovaquone and pentamidine are also not listed.",
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
