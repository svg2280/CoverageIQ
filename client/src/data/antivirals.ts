// Antiviral coverage data
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";

export const drugClasses: DrugClass[] = [
  { id: "neuraminidase", name: "Neuraminidase Inhibitors", color: "#5fb3d4", blurb: "Block influenza release from infected cells." },
  { id: "endonuclease", name: "Cap-dep Endonuclease Inhib", color: "#5e9bd4", blurb: "Baloxavir. Single-dose flu therapy." },
  { id: "antiherpes", name: "Anti-Herpetics", color: "#a06fd4", blurb: "Acyclovir family — phosphorylated by viral TK." },
  { id: "anticmv", name: "Anti-CMV", color: "#7b6fd4", blurb: "Ganciclovir family + foscarnet." },
  { id: "covid", name: "Anti-SARS-CoV-2", color: "#d46f9e", blurb: "Paxlovid, remdesivir, molnupiravir." },
  { id: "rsv", name: "Anti-RSV", color: "#d4a86f", blurb: "Ribavirin, monoclonal Abs." },
  { id: "hbv", name: "Anti-HBV", color: "#d4c46f", blurb: "Tenofovir, entecavir." },
  { id: "hcv", name: "Anti-HCV (DAAs)", color: "#c4d46f", blurb: "Sofosbuvir-based combos. >95% cure." },
  { id: "art", name: "Anti-HIV (ART)", color: "#6fd49e", blurb: "Multi-class: NRTIs, INSTIs, boosters." },
];

export const drugs: Drug[] = [
  // Influenza
  { id: "oseltamivir", name: "Oseltamivir (Tamiflu)", classId: "neuraminidase", blurb: "Influenza A & B. PO. Within 48h ideal but use anyway in severe.", mechanism: "Neuraminidase inhibition", spectrum: "Influenza A, B", pearls: ["75 mg PO BID x 5d", "Severe/hospitalized: still treat after 48h"], doseAdult: "75 mg PO BID x 5d", route: ["PO"], pregnancy: "safe" },
  { id: "zanamivir", name: "Zanamivir", classId: "neuraminidase", blurb: "Inhaled. Avoid in asthma/COPD.", mechanism: "Neuraminidase inhibition", spectrum: "Influenza A, B", pearls: ["Bronchospasm risk"], doseAdult: "10 mg INH BID", route: ["PO"], pregnancy: "safe" },
  { id: "baloxavir", name: "Baloxavir (Xofluza)", classId: "endonuclease", blurb: "Single dose. Resistance emerges with treatment.", mechanism: "Cap-dependent endonuclease inhibition", spectrum: "Influenza A, B", pearls: ["One-time PO dose", "Some resistance with monotherapy"], doseAdult: "40-80 mg PO x1", route: ["PO"], pregnancy: "caution" },

  // Herpes
  { id: "acyclovir", name: "Acyclovir / Valacyclovir", short: "ACV", classId: "antiherpes", blurb: "HSV, VZV. IV for severe; PO for cold sores/genital.", mechanism: "Activated by viral thymidine kinase → DNA chain termination", spectrum: "HSV-1/2, VZV", pearls: ["IV crystallization — hydrate well", "Valacyclovir = oral prodrug, better bioavailability"], doseAdult: "ACV 10 mg/kg IV q8h (encephalitis); valacyclovir 1g PO BID-TID", route: ["IV", "PO"], pregnancy: "safe" },
  { id: "famciclovir", name: "Famciclovir", classId: "antiherpes", blurb: "Penciclovir prodrug. HSV/VZV alternative.", mechanism: "Activated by viral TK", spectrum: "HSV-1/2, VZV", pearls: ["Episodic and suppressive HSV"], doseAdult: "500 mg PO TID", route: ["PO"], pregnancy: "caution" },

  // CMV
  { id: "ganciclovir", name: "Ganciclovir / Valganciclovir", short: "GCV", classId: "anticmv", blurb: "CMV first-line. Bone marrow toxicity.", mechanism: "Activated by CMV UL97 kinase", spectrum: "CMV, HSV, VZV", pearls: ["Watch neutropenia", "Valganciclovir = oral prodrug"], doseAdult: "GCV 5 mg/kg IV q12h induction", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "foscarnet", name: "Foscarnet", classId: "anticmv", blurb: "GCV-resistant CMV, ACV-resistant HSV.", mechanism: "Pyrophosphate analog — direct DNA pol inhibition", spectrum: "CMV, HSV (resistant), HHV-6", pearls: ["Renal toxicity, electrolyte derangements", "Penile ulcers!"], doseAdult: "60 mg/kg IV q8h", route: ["IV"], pregnancy: "avoid" },
  { id: "letermovir", name: "Letermovir", classId: "anticmv", blurb: "CMV prophylaxis post-HSCT.", mechanism: "CMV terminase complex inhibition", spectrum: "CMV", pearls: ["Doesn't cause myelosuppression", "Drug interactions via CYP3A"], doseAdult: "480 mg PO/IV daily", route: ["IV", "PO"], pregnancy: "caution" },

  // COVID
  { id: "paxlovid", name: "Nirmatrelvir-Ritonavir (Paxlovid)", classId: "covid", blurb: "Outpatient COVID. Within 5 days of symptoms in high-risk.", mechanism: "Mpro protease inhibitor + ritonavir booster", spectrum: "SARS-CoV-2", pearls: ["MASSIVE drug interactions via CYP3A4", "Renal-dose adjusted"], doseAdult: "300/100 mg PO BID x 5d", route: ["PO"], pregnancy: "caution" },
  { id: "remdesivir", name: "Remdesivir", classId: "covid", blurb: "IV. Hospitalized COVID with O2 requirements.", mechanism: "RNA polymerase chain terminator", spectrum: "SARS-CoV-2, RSV (some)", pearls: ["3-5 day course depending on severity", "Transaminitis"], doseAdult: "200 mg IV x1, then 100 mg IV daily", route: ["IV"], pregnancy: "caution" },
  { id: "molnupiravir", name: "Molnupiravir", classId: "covid", blurb: "Oral COVID alternative. Lower efficacy than Paxlovid.", mechanism: "RNA mutagenesis", spectrum: "SARS-CoV-2", pearls: ["Avoid in pregnancy and <18", "When Paxlovid contraindicated"], doseAdult: "800 mg PO BID x 5d", route: ["PO"], pregnancy: "avoid" },

  // RSV
  { id: "ribavirin", name: "Ribavirin", classId: "rsv", blurb: "RSV (immunocomp), HCV (legacy), VHFs.", mechanism: "Guanosine analog", spectrum: "RSV, HCV, VHFs", pearls: ["Teratogenic — black box", "Hemolytic anemia"], doseAdult: "Varies by indication", route: ["IV", "PO"], pregnancy: "avoid" },

  // HBV
  { id: "tenofovir", name: "Tenofovir (TDF/TAF)", classId: "hbv", blurb: "HBV + HIV. TAF preferred for renal/bone profile.", mechanism: "Nucleotide RT inhibitor", spectrum: "HBV, HIV", pearls: ["TDF: monitor renal/bone", "TAF: better safety, used in newer regimens"], doseAdult: "TAF 25 mg PO daily", route: ["PO"], pregnancy: "safe" },
  { id: "entecavir", name: "Entecavir", classId: "hbv", blurb: "HBV monotherapy.", mechanism: "Guanosine analog", spectrum: "HBV", pearls: ["Avoid as monotherapy in HIV co-infection"], doseAdult: "0.5 mg PO daily", route: ["PO"], pregnancy: "caution" },

  // HCV DAAs
  { id: "sofvel", name: "Sofosbuvir-Velpatasvir (Epclusa)", classId: "hcv", blurb: "Pan-genotypic 12-week HCV cure.", mechanism: "NS5B + NS5A inhibitors", spectrum: "HCV (all genotypes)", pearls: [">95% SVR12", "Check HBV before starting (reactivation risk)"], doseAdult: "400/100 mg PO daily x 12wk", route: ["PO"], pregnancy: "caution" },
  { id: "glecpib", name: "Glecaprevir-Pibrentasvir (Mavyret)", classId: "hcv", blurb: "8-week pan-genotypic HCV cure.", mechanism: "NS3/4A + NS5A inhibitors", spectrum: "HCV (all genotypes)", pearls: ["8 weeks for treatment-naive without cirrhosis"], doseAdult: "300/120 mg PO daily x 8-12wk", route: ["PO"], pregnancy: "caution" },

  // HIV ART (representative single-tablets)
  { id: "biktarvy", name: "Bictegravir/FTC/TAF (Biktarvy)", classId: "art", blurb: "STR INSTI-based regimen. Most-prescribed first-line ART.", mechanism: "INSTI + 2 NRTIs", spectrum: "HIV-1", pearls: ["Once daily", "High barrier to resistance"], doseAdult: "1 tab PO daily", route: ["PO"], pregnancy: "safe" },
  { id: "dolutegravir", name: "Dolutegravir", classId: "art", blurb: "INSTI backbone — dual or triple regimens.", mechanism: "Integrase inhibition", spectrum: "HIV-1", pearls: ["High barrier to resistance", "Combine with TAF/FTC or 3TC"], doseAdult: "50 mg PO daily", route: ["PO"], pregnancy: "safe" },
];

export const bugs: Bug[] = [
  { id: "influenza", name: "Influenza A/B", category: "virus", shape: "atypical",
    blurb: "Seasonal flu. Treat early in high-risk.",
    pearls: ["Oseltamivir within 48h ideal", "Severe: continue regardless of timing"],
    syndromes: ["resp-flu"]},
  { id: "covid", name: "SARS-CoV-2", category: "virus", shape: "atypical",
    blurb: "COVID-19. Outpatient antivirals + hospitalized strategies.",
    pearls: ["Paxlovid for high-risk outpatient", "Remdesivir + dexamethasone for hospitalized"],
    syndromes: ["resp-covid"]},
  { id: "rsv", name: "RSV", category: "virus", shape: "atypical",
    blurb: "Respiratory syncytial virus. Mostly supportive in adults.",
    pearls: ["Ribavirin in immunocompromised", "Vaccines now available for elderly"],
    syndromes: ["resp-rsv"]},
  { id: "hsv", name: "HSV-1 / HSV-2", category: "virus", shape: "atypical",
    blurb: "Herpes simplex. Encephalitis = emergent IV ACV.",
    pearls: ["Empiric IV acyclovir for any encephalitis", "Suppression for frequent recurrences"],
    syndromes: ["herpes-mucocutaneous", "hsv-encephalitis"]},
  { id: "vzv", name: "VZV", category: "virus", shape: "atypical",
    blurb: "Chickenpox + shingles. Treat zoster within 72h.",
    pearls: ["Valacyclovir 1g PO TID x 7d for zoster", "Disseminated → IV ACV"],
    syndromes: ["herpes-mucocutaneous"]},
  { id: "cmv", name: "CMV", category: "virus", shape: "atypical",
    blurb: "Major issue in transplant/HIV. Retinitis, colitis, viremia.",
    pearls: ["Valganciclovir for most", "Foscarnet for resistant"],
    syndromes: ["cmv-disease"]},
  { id: "hbv", name: "Hepatitis B", category: "virus", shape: "atypical",
    blurb: "Chronic HBV — long-term suppression goal.",
    pearls: ["Tenofovir or entecavir", "Always reactivation-screen before chemo/biologics"],
    syndromes: ["hep-flare"]},
  { id: "hcv", name: "Hepatitis C", category: "virus", shape: "atypical",
    blurb: "Curable with DAAs in 8-12 weeks.",
    pearls: [">95% SVR12 with current regimens", "Check HBV before — reactivation risk"],
    syndromes: ["hep-flare"]},
  { id: "hiv", name: "HIV", category: "virus", shape: "atypical",
    blurb: "Lifelong ART — undetectable = untransmittable.",
    pearls: ["INSTI-based STRs first-line (Biktarvy, Dovato)", "Resistance testing baseline"],
    syndromes: ["hiv-disease"]},
];

export const syndromes: Syndrome[] = [
  { id: "resp-flu", name: "Influenza", category: "respiratory",
    blurb: "Seasonal flu. Antivirals shorten course in early or high-risk patients.",
    empiric: ["oseltamivir", "baloxavir"],
    commonBugs: ["influenza"]},
  { id: "resp-covid", name: "COVID-19", category: "respiratory",
    blurb: "Risk-stratified. Outpatient → Paxlovid; hospitalized with O2 → remdesivir + dex.",
    empiric: ["paxlovid", "remdesivir", "molnupiravir"],
    commonBugs: ["covid"]},
  { id: "resp-rsv", name: "RSV (adult)", category: "respiratory",
    blurb: "Supportive care for most. Ribavirin in immunocomp.",
    empiric: ["ribavirin"],
    commonBugs: ["rsv"]},
  { id: "herpes-mucocutaneous", name: "Herpes (mucocutaneous)", category: "skin",
    blurb: "Cold sores, genital herpes, zoster.",
    empiric: ["acyclovir", "famciclovir"],
    commonBugs: ["hsv", "vzv"]},
  { id: "hsv-encephalitis", name: "HSV encephalitis", category: "cns",
    blurb: "Empiric IV acyclovir for any altered mental status with concerning features.",
    empiric: ["acyclovir"],
    commonBugs: ["hsv"]},
  { id: "cmv-disease", name: "CMV disease", category: "systemic",
    blurb: "Retinitis, colitis, pneumonitis, viremia in transplant/HIV.",
    empiric: ["ganciclovir", "foscarnet"],
    commonBugs: ["cmv"]},
  { id: "hep-flare", name: "Viral hepatitis", category: "systemic",
    blurb: "HBV (suppression) and HCV (cure with DAAs).",
    empiric: ["tenofovir", "entecavir", "sofvel", "glecpib"],
    commonBugs: ["hbv", "hcv"]},
  { id: "hiv-disease", name: "HIV", category: "systemic",
    blurb: "Lifelong ART. INSTI-based STRs first-line.",
    empiric: ["biktarvy", "dolutegravir"],
    commonBugs: ["hiv"]},
];

const C: Record<string, Record<string, Coverage>> = {};
const set = (drug: string, bug: string, c: Coverage) => {
  if (!C[drug]) C[drug] = {};
  C[drug][bug] = c;
};

set("oseltamivir", "influenza", "primary");
set("zanamivir", "influenza", "alternate");
set("baloxavir", "influenza", "primary");

set("acyclovir", "hsv", "primary"); set("acyclovir", "vzv", "primary");
set("famciclovir", "hsv", "primary"); set("famciclovir", "vzv", "primary");

set("ganciclovir", "cmv", "primary"); set("ganciclovir", "hsv", "alternate");
set("foscarnet", "cmv", "primary"); set("foscarnet", "hsv", "alternate");
set("letermovir", "cmv", "primary");

set("paxlovid", "covid", "primary");
set("remdesivir", "covid", "primary"); set("remdesivir", "rsv", "alternate");
set("molnupiravir", "covid", "alternate");

set("ribavirin", "rsv", "primary"); set("ribavirin", "hcv", "alternate");

set("tenofovir", "hbv", "primary"); set("tenofovir", "hiv", "primary");
set("entecavir", "hbv", "primary");

set("sofvel", "hcv", "primary"); set("glecpib", "hcv", "primary");

set("biktarvy", "hiv", "primary"); set("dolutegravir", "hiv", "primary");

export const coverage = C;
export function getCoverage(drugId: string, bugId: string): Coverage {
  return C[drugId]?.[bugId] || "none";
}
export function getDrugById(id: string) { return drugs.find(d => d.id === id); }
export function getBugById(id: string) { return bugs.find(b => b.id === id); }
export function getSyndromeById(id: string) { return syndromes.find(s => s.id === id); }
export function getClassById(id: string) { return drugClasses.find(c => c.id === id); }
