// Antibacterial coverage data — drugs × bugs × syndromes
// Coverage values: "primary" (orange) | "alternate" (yellow) | "none" (white)
// Educational reference only — based on common practice in US adults.

export type Coverage = "primary" | "alternate" | "none";

export interface Drug {
  id: string;
  name: string;
  short?: string;
  classId: string;
  blurb: string;
  mechanism: string;
  spectrum: string;
  pearls: string[];
  doseAdult: string;
  route: string[]; // ["IV", "PO"]
  pregnancy?: "safe" | "caution" | "avoid";
}

export interface DrugClass {
  id: string;
  name: string;
  color: string; // class accent
  blurb: string;
}

export interface Bug {
  id: string;
  name: string;
  category: string; // gram-pos, gram-neg, atypical, anaerobe
  shape: "coccus" | "rod" | "spirochete" | "atypical" | "anaerobe";
  blurb: string;
  pearls: string[];
  syndromes: string[]; // syndrome IDs commonly caused
}

export interface Syndrome {
  id: string;
  name: string;
  short?: string;
  category: string;
  blurb: string;
  /** Combined empiric list (primary + alternate, dedupe). Kept for legacy callers. */
  empiric: string[];
  /** Preferred / first-line regimens (orange) */
  empiricPrimary?: string[];
  /** Second-line / penicillin-allergy / resistance fallbacks (yellow) */
  empiricAlternate?: string[];
  /** IDs into `sources` table in @/data/sources */
  sourceIds?: string[];
  /** Plain-English regimen notes from guideline */
  guidelineNotes?: string;
  commonBugs: string[]; // bug IDs
}

// ============== DRUG CLASSES ==============
export const drugClasses: DrugClass[] = [
  { id: "penicillin", name: "Penicillins", color: "#5fb3d4", blurb: "β-lactams. Bind PBPs, lyse cell wall." },
  { id: "cephalosporin", name: "Cephalosporins", color: "#5e9bd4", blurb: "β-lactams across 5 generations. Broader with each gen." },
  { id: "carbapenem", name: "Carbapenems", color: "#7b6fd4", blurb: "Big-gun β-lactams. Last-line for resistant GNRs." },
  { id: "monobactam", name: "Monobactams", color: "#a06fd4", blurb: "Aztreonam. Gram-neg only. Penicillin-allergy friendly." },
  { id: "fluoroquinolone", name: "Fluoroquinolones", color: "#d46f9e", blurb: "Inhibit DNA gyrase. Broad. Black-box warnings." },
  { id: "aminoglycoside", name: "Aminoglycosides", color: "#d47d6f", blurb: "Concentration-dependent killers. Synergy + GNR coverage." },
  { id: "macrolide", name: "Macrolides", color: "#d4a86f", blurb: "Atypicals + respiratory. Azithro shines for CAP." },
  { id: "tetracycline", name: "Tetracyclines", color: "#c4d46f", blurb: "Bacteriostatic. Atypicals, MRSA (skin), tick-borne." },
  { id: "glycopeptide", name: "Glycopeptides", color: "#6fd49e", blurb: "Vancomycin. MRSA + gram-positive workhorses." },
  { id: "lipopeptide", name: "Lipopeptides", color: "#6fd4c4", blurb: "Daptomycin. MRSA bacteremia. Inactivated by surfactant — not for pneumonia." },
  { id: "oxazolidinone", name: "Oxazolidinones", color: "#6fc4d4", blurb: "Linezolid. Bacteriostatic. Excellent MRSA + VRE." },
  { id: "nitroimidazole", name: "Nitroimidazoles", color: "#9e6fd4", blurb: "Metronidazole. Anaerobes + protozoa." },
  { id: "lincosamide", name: "Lincosamides", color: "#d46fc4", blurb: "Clindamycin. Anaerobes above the diaphragm + toxin suppression." },
  { id: "sulfa", name: "Sulfas", color: "#d4c46f", blurb: "TMP-SMX. PJP, MRSA skin, UTIs, Stenotrophomonas." },
  { id: "urinary", name: "Urinary Agents", color: "#d49e6f", blurb: "Nitrofurantoin / fosfomycin. Bladder-only." },
  // ---- Antimycobacterials & rifamycins (TB / NTM / leprosy) ----
  { id: "antimycobacterial", name: "Antimycobacterials", color: "#9c7bd4", blurb: "TB-specific agents. RIPE backbone + 2nd-line + bedaquiline/pretomanid for MDR." },
  { id: "rifamycin", name: "Rifamycins", color: "#d49e6f", blurb: "RIF/RFB/RPT. CYP3A4 inducers (RFB less so). Backbone of every short TB regimen." },
];

// ============== DRUGS ==============
export const drugs: Drug[] = [
  // Penicillins
  { id: "pcn", name: "Penicillin G/V", classId: "penicillin", blurb: "OG β-lactam. Strep, Treponema, Listeria.", mechanism: "Binds PBPs → cell wall lysis", spectrum: "Strep spp, Treponema, oral anaerobes, Listeria", pearls: ["Still first-line for syphilis & strep throat", "IV PCN G for strep bacteremia"], doseAdult: "PCN G 2-4M U IV q4h", route: ["IV", "PO"], pregnancy: "safe" },
  { id: "amox", name: "Amoxicillin / Ampicillin", classId: "penicillin", blurb: "Aminopenicillins. Adds Listeria, some H. flu, enterococci.", mechanism: "Binds PBPs", spectrum: "Strep, enterococci, Listeria, some E. coli/H. flu", pearls: ["Ampicillin = drug of choice for Listeria meningitis", "Add gentamicin for enterococcal endocarditis synergy"], doseAdult: "Amp 2g IV q4h", route: ["IV", "PO"], pregnancy: "safe" },
  { id: "naf", name: "Nafcillin / Oxacillin", classId: "penicillin", blurb: "Antistaph PCNs. MSSA killers — DOC for MSSA bacteremia/endocarditis.", mechanism: "Binds PBPs of MSSA", spectrum: "MSSA, Strep", pearls: ["Beats vancomycin for MSSA bacteremia", "Watch for AIN, hepatitis"], doseAdult: "2g IV q4h", route: ["IV"], pregnancy: "safe" },
  { id: "diclox", name: "Dicloxacillin", classId: "penicillin", blurb: "Oral antistaph PCN. MSSA cellulitis.", mechanism: "Binds PBPs", spectrum: "MSSA, Strep", pearls: ["Take on empty stomach"], doseAdult: "500 mg PO q6h", route: ["PO"], pregnancy: "safe" },
  { id: "unasyn", name: "Ampicillin-Sulbactam (Unasyn)", classId: "penicillin", blurb: "Aminopenicillin + β-lactamase inhibitor. Mouth/bite/aspiration favorite.", mechanism: "Sulbactam blocks β-lactamases", spectrum: "Above + S. aureus (MSSA), oral anaerobes, many GNRs", pearls: ["Great for human/animal bites", "Aspiration pneumonia"], doseAdult: "3g IV q6h", route: ["IV"], pregnancy: "safe" },
  { id: "augmentin", name: "Amoxicillin-Clavulanate (Augmentin)", classId: "penicillin", blurb: "Oral version of Unasyn-ish. Sinusitis, otitis, bites.", mechanism: "Clavulanate blocks β-lactamases", spectrum: "Strep, MSSA, oral anaerobes, H. flu", pearls: ["GI upset is the #1 limiter — take with food"], doseAdult: "875/125 mg PO BID", route: ["PO"], pregnancy: "safe" },
  { id: "zosyn", name: "Piperacillin-Tazobactam (Zosyn)", classId: "penicillin", blurb: "Workhorse broad-spectrum. Pseudomonas + anaerobes.", mechanism: "Anti-pseudomonal PCN + β-lactamase inhibitor", spectrum: "Strep, MSSA, enterococci, GNRs incl Pseudomonas, anaerobes", pearls: ["Empiric sepsis go-to with vanc", "Watch AKI risk with vanc combo"], doseAdult: "4.5g IV q6-8h (extended infusion)", route: ["IV"], pregnancy: "safe" },

  // Cephalosporins
  { id: "cefazolin", name: "Cefazolin", short: "Cefaz", classId: "cephalosporin", blurb: "1st gen IV. MSSA + strep. Surgical prophylaxis king.", mechanism: "PBP binding", spectrum: "MSSA, Strep, some GNRs (E. coli, K. pneumo, Proteus)", pearls: ["Equivalent to nafcillin for MSSA", "Crosses BBB poorly — not for meningitis"], doseAdult: "2g IV q8h", route: ["IV"], pregnancy: "safe" },
  { id: "cephalexin", name: "Cephalexin", short: "Keflex", classId: "cephalosporin", blurb: "1st gen PO. Cellulitis, simple UTI.", mechanism: "PBP binding", spectrum: "MSSA, Strep, some GNRs", pearls: ["First-line outpatient cellulitis"], doseAdult: "500 mg PO QID", route: ["PO"], pregnancy: "safe" },
  { id: "cefoxitin", name: "Cefoxitin", classId: "cephalosporin", blurb: "2nd gen cephamycin. Anaerobic coverage.", mechanism: "PBP binding", spectrum: "MSSA, Strep, GNRs, B. fragilis", pearls: ["Useful intra-abdominal alternative", "Second-line PID"], doseAdult: "2g IV q6h", route: ["IV"], pregnancy: "safe" },
  { id: "cefotetan", name: "Cefotetan", classId: "cephalosporin", blurb: "2nd gen cephamycin. Like cefoxitin.", mechanism: "PBP binding", spectrum: "Same as cefoxitin", pearls: ["MTT side chain → disulfiram-like rxn with alcohol"], doseAdult: "2g IV q12h", route: ["IV"], pregnancy: "safe" },
  { id: "ceftriaxone", name: "Ceftriaxone", short: "CTX", classId: "cephalosporin", blurb: "3rd gen. CAP, meningitis, GC, pyelo. Once-daily wonder.", mechanism: "PBP binding", spectrum: "Strep (incl pneumo), GNRs, N. gonorrhoeae", pearls: ["NO Pseudomonas", "Avoid in neonates — biliary sludge"], doseAdult: "1-2g IV daily (2g for CNS/endocarditis)", route: ["IV"], pregnancy: "safe" },
  { id: "ceftazidime", name: "Ceftazidime", classId: "cephalosporin", blurb: "3rd gen with Pseudomonas. Weak gram-positive.", mechanism: "PBP binding", spectrum: "GNRs incl Pseudomonas", pearls: ["Combo with avibactam for KPC/CRE"], doseAdult: "2g IV q8h", route: ["IV"], pregnancy: "safe" },
  { id: "cefepime", name: "Cefepime", classId: "cephalosporin", blurb: "4th gen. Pseudomonas + AmpC. Neutropenic fever staple.", mechanism: "PBP binding, stable to AmpC β-lactamases", spectrum: "Strep, MSSA, GNRs incl Pseudomonas, ESCAPPM", pearls: ["Watch neurotoxicity in renal impairment", "First-line febrile neutropenia"], doseAdult: "2g IV q8h", route: ["IV"], pregnancy: "safe" },
  { id: "ceftaroline", name: "Ceftaroline", classId: "cephalosporin", blurb: "5th gen. The only β-lactam that hits MRSA.", mechanism: "Binds modified PBP2a", spectrum: "MRSA, MSSA, Strep, many GNRs (no Pseudomonas)", pearls: ["Salvage MRSA bacteremia", "No Pseudomonas, no enterococci"], doseAdult: "600 mg IV q12h (q8h for severe)", route: ["IV"], pregnancy: "caution" },

  // Carbapenems / monobactam
  { id: "ertapenem", name: "Ertapenem", classId: "carbapenem", blurb: "Once-daily carbapenem. NO Pseudomonas/enterococci.", mechanism: "Binds multiple PBPs", spectrum: "GNRs incl ESBL, anaerobes, Strep, MSSA", pearls: ["ESBL UTI/intra-abd workhorse", "Outpatient OPAT friendly"], doseAdult: "1g IV daily", route: ["IV"], pregnancy: "caution" },
  { id: "meropenem", name: "Meropenem / Imipenem / Doripenem", short: "Mero", classId: "carbapenem", blurb: "Big guns. ESBL, AmpC, Pseudomonas.", mechanism: "PBP binding", spectrum: "Almost everything except MRSA, VRE, Stenotrophomonas, atypicals", pearls: ["Imipenem ↑ seizure risk", "Add vanc for empiric coverage"], doseAdult: "Mero 1g IV q8h (2g q8h for CNS)", route: ["IV"], pregnancy: "caution" },
  { id: "aztreonam", name: "Aztreonam", classId: "monobactam", blurb: "Gram-neg only. Safe in PCN allergy (except ceftazidime).", mechanism: "PBP3 binding (GNRs only)", spectrum: "GNRs incl Pseudomonas", pearls: ["No gram-positive, no anaerobes", "Cross-reacts with ceftazidime side chain"], doseAdult: "2g IV q8h", route: ["IV"], pregnancy: "safe" },

  // Aminoglycosides
  { id: "ag", name: "Gentamicin / Tobramycin / Amikacin", short: "AG", classId: "aminoglycoside", blurb: "GNR killers. Nephro/ototoxic. Synergy for endocarditis.", mechanism: "30S ribosome → misreading", spectrum: "GNRs (gent/tobra/amik), Pseudomonas (tobra/amik)", pearls: ["Once-daily extended-interval dosing standard", "Add to ampicillin for enterococcal endocarditis"], doseAdult: "Gent 5-7 mg/kg IV q24h", route: ["IV"], pregnancy: "avoid" },

  // Fluoroquinolones
  { id: "cipro", name: "Ciprofloxacin", classId: "fluoroquinolone", blurb: "GNR-leaning FQ. UTIs, traveler's diarrhea, Pseudomonas (PO option).", mechanism: "DNA gyrase / topo IV inhibition", spectrum: "GNRs incl Pseudomonas, atypicals (weak Strep pneumo)", pearls: ["NOT for CAP — weak pneumococcus", "Tendon rupture, QTc, dysglycemia"], doseAdult: "500-750 mg PO BID / 400 mg IV q8-12h", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "levo", name: "Levofloxacin", classId: "fluoroquinolone", blurb: "Respiratory FQ. CAP, UTI, atypicals.", mechanism: "DNA gyrase inhibition", spectrum: "Strep pneumo, atypicals, GNRs incl Pseudomonas", pearls: ["750 mg daily for 5d = standard CAP", "Same FQ class warnings"], doseAdult: "750 mg IV/PO daily", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "moxi", name: "Moxifloxacin", classId: "fluoroquinolone", blurb: "Respiratory FQ + anaerobes. NO Pseudomonas, NO renal dose adjust.", mechanism: "DNA gyrase inhibition", spectrum: "Strep, atypicals, anaerobes, some GNRs", pearls: ["No urinary excretion — don't use for UTI", "QTc prolongation"], doseAdult: "400 mg IV/PO daily", route: ["IV", "PO"], pregnancy: "avoid" },

  // Macrolides
  { id: "azithro", name: "Azithromycin / Erythromycin", short: "Azithro", classId: "macrolide", blurb: "Atypicals + outpatient strep alt. Z-pak ubiquity.", mechanism: "50S ribosome", spectrum: "Strep, atypicals (Mycoplasma, Chlamydia, Legionella), some MSSA", pearls: ["Resistance high — pair with β-lactam for inpatient CAP", "QTc warning"], doseAdult: "500 mg IV/PO daily", route: ["IV", "PO"], pregnancy: "safe" },

  // Tetracyclines
  { id: "doxy", name: "Doxycycline", classId: "tetracycline", blurb: "Tick-borne, atypicals, CAP, MRSA skin.", mechanism: "30S ribosome", spectrum: "Atypicals, Rickettsiae, Borrelia, MRSA (skin), CAP", pearls: ["First-line tick-borne illness", "Photo-sensitivity, esophagitis"], doseAdult: "100 mg PO BID", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "tige", name: "Tigecycline", classId: "tetracycline", blurb: "Glycylcycline. Broad — but NO Pseudomonas, NO bacteremia.", mechanism: "30S binding", spectrum: "MRSA, VRE, ESBL, anaerobes, atypicals", pearls: ["Black-box: increased mortality vs comparators", "Avoid in bacteremia"], doseAdult: "100 mg IV load → 50 mg IV q12h", route: ["IV"], pregnancy: "avoid" },

  // Glycopeptides / lipopeptides / oxazolidinones
  { id: "vanc", name: "Vancomycin (IV)", classId: "glycopeptide", blurb: "MRSA workhorse + gram-positives.", mechanism: "Binds D-Ala-D-Ala", spectrum: "MRSA, MSSA, Strep, enterococci (NOT VRE), C. diff (PO)", pearls: ["Trough 15-20 for serious infections (or AUC-guided)", "Red-man syndrome: slow infusion, premedicate"], doseAdult: "15-20 mg/kg IV q8-12h", route: ["IV"], pregnancy: "safe" },
  { id: "vancpo", name: "Vancomycin PO", classId: "glycopeptide", blurb: "C. diff only. Not absorbed.", mechanism: "Same — but stays in gut", spectrum: "C. difficile", pearls: ["Now first-line over metronidazole for C. diff"], doseAdult: "125 mg PO QID x 10d", route: ["PO"], pregnancy: "safe" },
  { id: "dapto", name: "Daptomycin", classId: "lipopeptide", blurb: "MRSA bacteremia, VRE. Inactivated by lung surfactant.", mechanism: "Membrane depolarization", spectrum: "MRSA, MSSA, VRE, Strep", pearls: ["Don't use for pneumonia (surfactant inactivation)", "Watch CK weekly"], doseAdult: "6-10 mg/kg IV daily", route: ["IV"], pregnancy: "caution" },
  { id: "linezolid", name: "Linezolid", classId: "oxazolidinone", blurb: "MRSA, VRE. Oral bioavailable. Watch serotonin syndrome.", mechanism: "50S ribosome", spectrum: "MRSA, MSSA, VRE, Strep, mycobacteria", pearls: ["MAOI — risk SS with SSRIs", "Cytopenias after >2 weeks"], doseAdult: "600 mg IV/PO q12h", route: ["IV", "PO"], pregnancy: "caution" },

  // Metronidazole / clindamycin
  { id: "metro", name: "Metronidazole", classId: "nitroimidazole", blurb: "Anaerobes (below diaphragm), protozoa.", mechanism: "DNA disruption in anaerobic env", spectrum: "Anaerobes, Trichomonas, Giardia, C. diff", pearls: ["Disulfiram rxn with alcohol", "Peripheral neuropathy with chronic use"], doseAdult: "500 mg IV/PO q8h", route: ["IV", "PO"], pregnancy: "caution" },
  { id: "clinda", name: "Clindamycin", classId: "lincosamide", blurb: "Anaerobes above diaphragm + toxin suppression in TSS/necrotizing.", mechanism: "50S ribosome", spectrum: "Strep, MSSA, MRSA (varies), oral anaerobes", pearls: ["Add for toxin suppression in nec fasc / TSS", "C. diff risk highest of any antibiotic"], doseAdult: "600-900 mg IV q8h / 300-450 mg PO QID", route: ["IV", "PO"], pregnancy: "safe" },

  // Sulfas / urinary
  { id: "tmpsmx", name: "TMP-SMX (Bactrim)", classId: "sulfa", blurb: "PJP, MRSA skin, UTI, Stenotrophomonas.", mechanism: "Folate synthesis blockade (sequential)", spectrum: "MRSA, MSSA, GNRs, PJP, Stenotrophomonas, Nocardia", pearls: ["Hyperkalemia, AKI, SJS", "First-line PJP prophylaxis & treatment"], doseAdult: "1-2 DS PO BID; PJP: 15-20 mg/kg/d TMP IV", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "nitro", name: "Nitrofurantoin", classId: "urinary", blurb: "Bladder UTI only. No tissue penetration.", mechanism: "Bacterial enzyme inhibition", spectrum: "E. coli, Enterococcus (incl some VRE), Klebs", pearls: ["Don't use if CrCl <30", "Pulmonary fibrosis with chronic use"], doseAdult: "100 mg PO BID x 5d", route: ["PO"], pregnancy: "caution" },
  { id: "fosfo", name: "Fosfomycin", classId: "urinary", blurb: "Single-dose oral UTI. Active vs ESBL.", mechanism: "MurA inhibition", spectrum: "E. coli (incl ESBL), enterococci", pearls: ["3g PO once for uncomplicated cystitis"], doseAdult: "3g PO x1", route: ["PO"], pregnancy: "safe" },
  // ---- TB / NTM / Leprosy drugs ----
  { id: "inh", name: "Isoniazid (INH)", classId: "antimycobacterial", blurb: "TB cornerstone. Cidal vs replicating Mtb. Always with B6.", mechanism: "Inhibits InhA (enoyl-ACP reductase), blocking mycolic acid biosynthesis in the mycobacterial cell wall after activation by KatG catalase-peroxidase", spectrum: "M. tuberculosis", pearls: ["Add pyridoxine 25–50 mg/day to prevent peripheral neuropathy (mandatory for HIV+, DM, CKD, pregnancy, alcoholism, malnutrition)", "Check baseline LFTs; discontinue if ALT >3× ULN with symptoms or >5× ULN", "CYP2E1 metabolized—slow acetylators at higher neuropathy risk", "Contraindicated with acute hepatic disease"], doseAdult: "INH 5 mg/kg [max 300 mg] PO daily (or 15 mg/kg [max 900 mg] PO 3× weekly) + pyridoxine (B6) 25–50 mg PO daily", route: ["PO", "IM (rare)"] },
  { id: "rif", name: "Rifampin (RIF)", classId: "rifamycin", blurb: "TB backbone. Potent CYP3A4 inducer. Orange tears/urine.", mechanism: "Inhibits DNA-dependent RNA polymerase (rpoB subunit), blocking transcription", spectrum: "M. tuberculosis", pearls: ["Potent inducer of CYP3A4—reduces levels of PIs, NNRTIs, oral contraceptives, warfarin, azoles, many others; switch to rifabutin with most PI-based ART", "Orange-tinged urine/tears are expected and benign; warn patients; will stain soft contact lenses", "Take 30–60 min before meals for best absorption (but can take with low-fat food if GI intolerance)", "Hepatotoxicity"], doseAdult: "RIF 10 mg/kg [max 600 mg] PO daily (or 10 mg/kg [max 600 mg] PO 3× weekly)", route: ["PO", "IV"] },
  { id: "pza", name: "Pyrazinamide (PZA)", classId: "antimycobacterial", blurb: "TB intensive-phase sterilizer. Acid-environment killer. Watch LFTs/uric acid.", mechanism: "Converted by PncA pyrazinamidase to pyrazinoic acid, which disrupts mycobacterial membrane potential and inhibits fatty acid synthase I in acidic environments", spectrum: "M. tuberculosis", pearls: ["Used only during 2-month intensive phase (standard regimen); essential for early sterilization", "Monitor uric acid and LFTs", "Avoid in severe hepatic disease and porphyria", "Pregnancy: used when benefits outweigh risks (WHO supports use)"], doseAdult: "PZA 20–25 mg/kg PO daily (weight-based: 1000–2000 mg for 40–90 kg; typically 1500 mg for 56–75 kg)", route: ["PO"] },
  { id: "emb", name: "Ethambutol (EMB)", classId: "antimycobacterial", blurb: "TB 4th drug until DST back. Eye toxicity — monthly visual checks.", mechanism: "Inhibits arabinosyl transferase enzymes (EmbA/B/C), blocking arabinogalactan synthesis in the mycobacterial cell wall", spectrum: "M. tuberculosis", pearls: ["Baseline visual acuity and color vision testing before initiation; monthly monitoring during therapy", "Discontinue if ocular toxicity develops (usually reversible if caught early)", "Can be discontinued once INH and RIF susceptibility confirmed; reduces to 3-drug regimen", "Dose-reduce in renal impairment"], doseAdult: "EMB 15–20 mg/kg PO daily (weight-based: 800–1600 mg for 40–90 kg; typically 1200 mg for 56–75 kg)", route: ["PO"] },
  { id: "rpt", name: "Rifapentine (RPT)", classId: "rifamycin", blurb: "Long half-life rifamycin. 3HP weekly LTBI; 4-mo DS-TB regimen.", mechanism: "Inhibits DNA-dependent RNA polymerase (rpoB subunit); longer half-life than rifampin allows weekly or daily dosing", spectrum: "M. tuberculosis", pearls: ["3HP regimen (RPT + INH weekly ×12) is preferred LTBI regimen—highest completion rate", "Take with food (high-fat meal increases absorption ~49%)", "Drug interactions similar to rifampin but less potent; review ART compatibility before use", "Preferred for LTBI over 9H in most patients; weekly DOT or VOT required for 3HP"], doseAdult: "RPT 900 mg PO once weekly (with INH; 3HP LTBI) or RPT 600 mg PO daily (4-month DS-TB regimen with INH, MOX, PZA per Study 31/A5349)", route: ["PO"] },
  { id: "rfb", name: "Rifabutin (RFB)", classId: "rifamycin", blurb: "Rifampin alternate when ART interactions block RIF. Less CYP induction.", mechanism: "Inhibits DNA-dependent RNA polymerase (rpoB subunit); weaker CYP3A4 inducer than rifampin, used when rifampin drug interactions prohibitive", spectrum: "M. tuberculosis", pearls: ["Preferred rifamycin substitute when patient is on PI-based ART (dose 150 mg daily with ritonavir-boosted PI)", "Inhibited by PIs → increased drug levels → uveitis risk at standard dose; reduce dose to 150 mg daily", "Induced by EFV/nevirapine → increase dose to 450–600 mg daily", "INSTIs (dolutegravir, raltegravir, bictegravir) have less interaction with rifabutin than with rifampin"], doseAdult: "RFB 300 mg PO daily (alone); 150 mg PO daily (with ritonavir-boosted PI); 450–600 mg PO daily (with EFV or nevirapine)", route: ["PO"] },
  { id: "amk", name: "Amikacin (AMK)", classId: "aminoglycoside", blurb: "Aminoglycoside. MDR-TB injectable + refractory MAC (inhaled ALIS).", mechanism: "Binds 30S ribosomal subunit (16S rRNA), inhibiting protein synthesis; active against actively dividing Mtb", spectrum: "M. tuberculosis (MDR), MAC (refractory), GNRs", pearls: ["Monitor peak (35–45 mcg/mL) and trough (<1 mcg/mL) levels", "Audiometry at baseline and monthly; stop if significant hearing loss", "WHO recommends restricting amikacin injection to Group B (use only when Group A drugs cannot form a regimen)", "Inhaled amikacin liposome inhalation suspension (ALIS/Arikayce) available for refractory MAC"], doseAdult: "AMK 15–20 mg/kg [max 1000 mg] IV/IM daily (or 3× weekly; MDR-TB extended phase); adjust per renal function", route: ["IV", "IM"] },
  { id: "capreo", name: "Capreomycin (CPM)", classId: "antimycobacterial", blurb: "Polypeptide TB injectable. WHO discourages — amikacin preferred.", mechanism: "Binds 16S and 23S rRNA, inhibiting ribosomal translocation and protein synthesis", spectrum: "M. tuberculosis (MDR/XDR-TB injectable)", pearls: ["WHO guidance (2018) now discourages capreomycin and kanamycin for MDR-TB due to inferior outcomes in meta-analysis—prefer amikacin if injectable required", "Audiometry and renal function weekly during use; weekly electrolytes", "Reduce dose if BUN >30 mg/dL or declining GFR", "Nephrotoxicity (BUN elevation in ~36% patients)"], doseAdult: "CPM 15–20 mg/kg [max 1000 mg] IM/IV daily × 60–120 days, then 2–3× weekly; renal dose adjustment required", route: ["IM", "IV"] },
  { id: "str", name: "Streptomycin (SM)", classId: "aminoglycoside", blurb: "OG TB injectable. Aminoglycoside class. Avoid in pregnancy.", mechanism: "Binds 30S ribosomal subunit (S12 protein and 16S rRNA), causing mRNA misreading and inhibiting translocation", spectrum: "M. tuberculosis, brucellosis, plague, tularemia", pearls: ["Drug-resistant Mtb more commonly resistant to SM than amikacin; DST required", "Monitor serum concentrations (courses >2–3 days), renal function, and audiometry", "Avoid in pregnancy (congenital deafness risk)", "WHO Group B; use only when Group A agents cannot form adequate regimen"], doseAdult: "SM 15 mg/kg [typical 1 g] IM daily (adults <40 years); 0.75 g/day (adults ≥40 years); max 40 mg/kg/day in children", route: ["IM", "IV (less common)"] },
  { id: "bdq", name: "Bedaquiline (BDQ)", classId: "antimycobacterial", blurb: "MDR-TB ATP-synthase inhibitor. QTc + LFT monitoring. BPaL/M backbone.", mechanism: "Inhibits mycobacterial ATP synthase (atpE subunit), disrupting cellular energy production; bactericidal and sterilizing activity", spectrum: "M. tuberculosis", pearls: ["ECG at baseline, weeks 2 and 4, then monthly; hold if QTc >500 ms", "Take with food (≥18 g fat increases AUC ~2×)", "Monitor liver enzymes monthly; avoid in hepatic impairment (Child-Pugh B/C)", "Significant QTc risk with clofazimine, delamanid, and fluoroquinolones—ECG essential"], doseAdult: "BDQ 400 mg PO daily × 2 weeks, then 200 mg PO 3× weekly × 22 weeks (BPaL/M standard); or 200 mg PO daily × 8 weeks then 100 mg PO daily (BPaLM per ZeNix/TB-PRACTECAL data)", route: ["PO"] },
  { id: "dla", name: "Delamanid (DLM)", classId: "antimycobacterial", blurb: "MDR-TB nitroimidazole. QTc + albumin watch. WHO Group C.", mechanism: "Prodrug converted by F420-dependent reductases to metabolites that inhibit mycolic acid synthesis (methoxymycolic and ketomycolic acid); active under aerobic and anaerobic conditions", spectrum: "M. tuberculosis", pearls: ["Albumin <2.8 g/dL markedly increases QTc risk—check before initiation", "ECG at baseline and monthly; hold if QTc >500 ms or albumin falls below threshold", "Not recommended with bedaquiline or other QTc-prolonging drugs without careful ECG monitoring", "WHO Group C: use when BPaL/BPaLM not feasible; approved in >40 countries"], doseAdult: "DLM 100 mg PO twice daily × 24 weeks (in combination with an optimized MDR-TB background regimen)", route: ["PO"] },
  { id: "pa", name: "Pretomanid (PA)", classId: "antimycobacterial", blurb: "Nitroimidazole. Component of FDA-approved BPaL/BPaLM for MDR/XDR-TB.", mechanism: "Prodrug activated by Rv3547 reductase; forms reactive nitrogen intermediates that damage DNA and inhibit cell wall lipid synthesis; active against aerobic and anaerobic/non-replicating Mtb", spectrum: "M. tuberculosis", pearls: ["Component of FDA-approved BPaL and WHO-recommended BPaLM regimens for MDR/XDR-TB", "No dose modifications recommended for pretomanid itself (unlike linezolid)", "ECG at baseline and monthly given additive QTc effect of bedaquiline", "Monitor CBC and liver enzymes monthly during therapy"], doseAdult: "PA 200 mg PO daily × 26 weeks (with bedaquiline and linezolid ± moxifloxacin; BPaL/BPaLM)", route: ["PO"] },
  { id: "cfz", name: "Clofazimine (CFZ)", classId: "antimycobacterial", blurb: "MDR-TB + leprosy + M. abscessus. Reversible orange-brown skin staining.", mechanism: "Binds mycobacterial DNA, generating reactive oxygen species; disrupts potassium transport; bactericidal in slowly dividing cells", spectrum: "M. leprae, M. tuberculosis (MDR), M. abscessus", pearls: ["Skin discoloration expected and reversible but persists months after stopping; counsel patients", "ECG monitoring required when combined with other QTc-prolonging agents", "Take with food (fatty meal improves absorption)", "WHO Group A for MDR-TB longer regimens; synergistic with amikacin and macrolides in M. abscessus"], doseAdult: "CFZ 100 mg PO daily (MDR-TB, M. abscessus); 300 mg PO monthly + 50 mg PO daily (leprosy multibacillary adult MDT)", route: ["PO"] },
  { id: "cs", name: "Cycloserine (CS)", classId: "antimycobacterial", blurb: "MDR-TB 2nd-line. CNS toxicity — always pair with B6.", mechanism: "Competitive inhibitor of D-alanine racemase and D-Ala:D-Ala ligase, blocking peptidoglycan cell wall synthesis", spectrum: "M. tuberculosis", pearls: ["Pyridoxine 50 mg per 250 mg cycloserine daily (up to 200 mg/day) reduces seizure risk", "Avoid in epilepsy, severe depression, alcohol dependency", "Therapeutic drug monitoring peak 20–35 mcg/mL (2 hrs post-dose)", "CNS side effects are dose-related and reason for high discontinuation rate; taper up"], doseAdult: "CS 250 mg PO twice daily initially; titrate to 500–750 mg PO daily in 2 divided doses [max 1000 mg/day] based on tolerance", route: ["PO"] },
  { id: "eto", name: "Ethionamide (ETO)", classId: "antimycobacterial", blurb: "MDR-TB. INH-like InhA inhibition via separate activation. GI/thyroid hits.", mechanism: "Prodrug activated by EthA monooxygenase; inhibits InhA (enoyl-ACP reductase), blocking mycolic acid synthesis (same target as INH, but independent activation pathway)", spectrum: "M. tuberculosis", pearls: ["Take with food to reduce GI intolerance; administer at bedtime if tolerated", "Monitor TSH every 3 months with long-term use (or when combined with PAS)", "Pyridoxine supplementation recommended (neuropathy risk)", "Drug-ramp dosing (start low, escalate) improves tolerability"], doseAdult: "ETO 250 mg PO nightly (start); titrate to 500–750 mg PO daily in 2–3 divided doses [max 1000 mg/day]", route: ["PO"] },
  { id: "pas", name: "Para-aminosalicylic acid (PAS)", classId: "antimycobacterial", blurb: "MDR-TB folate-pathway agent. GI burden + hypothyroidism risk.", mechanism: "Inhibits dihydropteroate synthase and dihydrofolate reductase in folate synthesis; also interferes with iron acquisition; mechanism partially distinct from sulfonamides", spectrum: "M. tuberculosis", pearls: ["PAS granule sachets (Paser) have improved GI tolerability vs older tablet form", "Monitor TSH every 3 months; co-administration with ethionamide increases hypothyroid risk", "Vitamin B12 absorption impaired with long-term PAS; supplement if necessary", "WHO Group C: use when Group A and B agents cannot form adequate regimen"], doseAdult: "PAS 4 g PO twice daily (granules; sachet form) or 8–12 g/day PO in 2–3 divided doses [max 12 g/day]; take with food or acidic beverage", route: ["PO"] },
  { id: "imr", name: "Imipenem-cilastatin/relebactam", classId: "carbapenem", blurb: "Carbapenem + relebactam. M. abscessus intensive-phase salvage.", mechanism: "Imipenem inhibits PBPs (penicillin-binding proteins) blocking cell wall synthesis; cilastatin inhibits renal tubular dehydropeptidase I (prevents imipenem degradation); relebactam inhibits class A and C beta-lactamases, expanding spectrum", spectrum: "M. abscessus (intensive phase) + broad GNR/anaerobe (general carbapenem use)", pearls: ["Used in combination for M. abscessus intensive phase (typically 4–12 weeks); administer with at least 2–3 other active oral agents", "Relebactam extends activity against class A and C beta-lactamases—synergistic with amikacin against M. abscessus", "Adjust dose for renal impairment per CrCl (creatinine clearance-based tables in PI)", "No oral formulation available—requires IV access during intensive phase"], doseAdult: "Imipenem-cilastatin 500 mg IV q6h + relebactam 250 mg IV q6h (1.25 g combination q6h in adults with CrCl ≥90 mL/min; dose-reduce in renal impairment); used in intensive phase of M. abscessus regimen", route: ["IV"] },
];

// ============== BUGS ==============
export const bugs: Bug[] = [
  // Gram-positive cocci (top row in BugDrugDX layout)
  { id: "mrsa", name: "MRSA", category: "gram-pos", shape: "coccus",
    blurb: "Methicillin-resistant Staph aureus. Skin, bone, blood, lungs.",
    pearls: ["Vanc, dapto, linezolid, ceftaroline IV", "TMP-SMX or doxy for outpatient skin", "Clindamycin if D-test negative"],
    syndromes: ["skin-superficial", "skin-deep", "line", "endocarditis", "hcap", "vap", "bone"]},
  { id: "mssa", name: "MSSA", category: "gram-pos", shape: "coccus",
    blurb: "Methicillin-susceptible S. aureus. Same disease, better drugs.",
    pearls: ["Nafcillin or cefazolin > vancomycin for bacteremia", "Cefazolin = lower nephrotoxicity, similar efficacy"],
    syndromes: ["skin-superficial", "skin-deep", "line", "endocarditis", "cap", "hcap", "bone"]},
  { id: "strep", name: "Streptococcus", category: "gram-pos", shape: "coccus",
    blurb: "GAS, pneumoniae, viridans, agalactiae. Wide tent.",
    pearls: ["Penicillin still works for most", "Add clindamycin for toxin suppression in nec fasc"],
    syndromes: ["skin-superficial", "skin-deep", "endocarditis", "meningitis", "cap", "aspiration"]},
  { id: "enterococcus", name: "Enterococcus", category: "gram-pos", shape: "coccus",
    blurb: "E. faecalis (more drug-susceptible) and E. faecium (often VRE).",
    pearls: ["Ampicillin DOC for E. faecalis", "Add gentamicin for endocarditis synergy"],
    syndromes: ["endocarditis", "lower-gu", "upper-gu", "biliary", "intraabd-secondary"]},
  { id: "vre", name: "VRE", category: "gram-pos", shape: "coccus",
    blurb: "Vancomycin-resistant enterococci. Mostly E. faecium in hospitalized hosts.",
    pearls: ["Linezolid or daptomycin", "VRE bacteremia: dapto >8 mg/kg or linezolid"],
    syndromes: ["line", "endocarditis", "upper-gu", "biliary", "intraabd-secondary", "neutropenic"]},

  // Anaerobes
  { id: "anaerobes", name: "Anaerobes", category: "anaerobe", shape: "anaerobe",
    blurb: "Bacteroides, Prevotella, Peptostrep, Fusobacterium. Above & below the diaphragm.",
    pearls: ["Above diaphragm = clinda/PCN; below = metro", "B. fragilis = the canonical below-diaphragm anaerobe"],
    syndromes: ["aspiration", "biliary", "intraabd-spontaneous", "intraabd-secondary", "skin-deep"]},

  // Gram-negative — bottom row
  { id: "pseudomonas", name: "Pseudomonas", category: "gram-neg", shape: "rod",
    blurb: "P. aeruginosa. Hospital-associated; loves wet places (lungs, urine, skin).",
    pearls: ["Pip-tazo, cefepime, ceftaz, mero, AGs, cipro", "Double-cover for septic shock or neutropenia"],
    syndromes: ["hcap", "vap", "line", "skin-deep", "upper-gu", "neutropenic", "bone"]},
  { id: "escappm", name: "ESCAPPM (AmpC)", category: "gram-neg", shape: "rod",
    blurb: "Enterobacter, Serratia, Citrobacter, Aeromonas, Providencia, Proteus vulgaris, Morganella.",
    pearls: ["Inducible AmpC — avoid 3rd-gen ceph as monotherapy", "Cefepime, carbapenem, FQ, TMP-SMX safer"],
    syndromes: ["line", "hcap", "vap", "upper-gu", "biliary", "intraabd-secondary"]},
  { id: "esbl", name: "ESBL", category: "gram-neg", shape: "rod",
    blurb: "Extended-spectrum β-lactamase E. coli, Klebsiella, Proteus.",
    pearls: ["Carbapenem is workhorse", "Pip-tazo OK for uncomplicated UTI but not bacteremia"],
    syndromes: ["upper-gu", "lower-gu", "biliary", "intraabd-secondary", "hcap"]},
  { id: "gnrs", name: "Other GNRs", category: "gram-neg", shape: "rod",
    blurb: "E. coli, Klebsiella, Proteus mirabilis, H. influenzae, Moraxella.",
    pearls: ["Most CAP/UTI/intra-abd guidelines target these", "Susceptibilities vary by region"],
    syndromes: ["lower-gu", "upper-gu", "biliary", "intraabd-secondary", "cap", "meningitis"]},
  { id: "atypicals", name: "Atypicals", category: "atypical", shape: "atypical",
    blurb: "Mycoplasma, Chlamydia, Legionella, Coxiella. Cell-wall-less or intracellular.",
    pearls: ["β-lactams don't work — they have no cell wall", "Macrolide, doxycycline, or FQ"],
    syndromes: ["cap", "zoonotic-sti", "aspiration"]},

  // Add: Listeria, Neisseria, Treponema (referenced but smaller cells)
  { id: "listeria", name: "Listeria", category: "gram-pos", shape: "rod",
    blurb: "Listeria monocytogenes. Pregnancy, neonates, elderly, immunocomp.",
    pearls: ["Ampicillin (+ gent for synergy in meningitis)", "Cephalosporins do NOT cover"],
    syndromes: ["meningitis"]},
  { id: "neisseria", name: "Neisseria", category: "gram-neg", shape: "coccus",
    blurb: "N. meningitidis (meningitis, sepsis) and N. gonorrhoeae (STI).",
    pearls: ["Ceftriaxone is universal answer", "Add azithro for GC dual coverage"],
    syndromes: ["meningitis", "zoonotic-sti"]},
  // ---- Mycobacteria ----
  { id: "mtb", name: "Mycobacterium tuberculosis", category: "mycobacteria", shape: "rod", blurb: "Obligate human pathogen; aerobic, slow-growing, acid-fast bacillus; causes >10 million new cases and ~1.6 million deaths annually worldwide", pearls: ["Complex cell wall with mycolic acids confers intrinsic resistance to most standard antibiotics and enables intracellular survival in macrophages", "DST (drug susceptibility testing) essential before finalizing regimen; molecular tests (GeneXpert MTB/RIF) detect rifampin resistance rapidly", "IGRA or TST testing for latent infection; sputum AFB smear + NAAT + culture for active disease"], syndromes: ["tb-pulmonary-ds", "tb-ltbi", "tb-meningitis", "tb-miliary", "tb-pleural", "tb-lymphatic", "tb-hiv", "tb-mdr", "tb-xdr"] },
  { id: "mavium", name: "Mycobacterium avium complex (MAC)", category: "mycobacteria", shape: "rod", blurb: "Ubiquitous environmental NTM; M. avium and M. intracellulare most common; causes pulmonary disease in patients with structural lung disease (bronchiectasis, COPD, prior TB) and disseminated disease in advanced HIV", pearls: ["Diagnosis requires ≥2 positive sputum cultures or 1 positive BAL/bronchoscopy culture with compatible clinical and radiographic findings (ATS diagnostic criteria)", "Azithromycin preferred macrolide for pulmonary MAC (fewer DDI, better tolerance than clarithromycin)", "Disseminated MAC in HIV (CD4 <50) presents with fever, sweats, weight loss, hepatosplenomegaly—treat with azithromycin + ethambutol ± rifabutin"], syndromes: ["tb-mac-pulm", "tb-lymphatic"] },
  { id: "mabscessus", name: "Mycobacterium abscessus complex", category: "mycobacteria", shape: "rod", blurb: "Rapidly growing NTM with intrinsic macrolide resistance (via inducible erm(41) gene in M. abscessus and M. bolletii subspecies); causes progressive pulmonary disease in bronchiectasis and cystic fibrosis; skin/soft tissue infections after trauma/surgery", pearls: ["Subspecies identification and macrolide susceptibility testing (erm(41) sequencing + 14-day incubation) are essential before treatment—M. massiliense (nonfunctional erm) is macrolide-susceptible, unlike M. abscessus subsp. abscessus", "No FDA-approved regimen; combination therapy guided by susceptibility results (amikacin, imipenem, azithromycin/clarithromycin if susceptible, clofazimine, linezolid, tigecycline)", "Imipenem-cilastatin/relebactam (Recarbrio) emerging as option in intensive phase for refractory pulmonary disease"], syndromes: ["tb-mabscessus"] },
  { id: "mleprae", name: "Mycobacterium leprae", category: "mycobacteria", shape: "rod", blurb: "Obligate intracellular pathogen; highly tropism for skin macrophages and peripheral nerve Schwann cells; cannot be cultured in vitro; causes leprosy (Hansen disease)", pearls: ["Classified by WHO as paucibacillary (PB: 1–5 lesions, smear-negative) or multibacillary (MB: ≥6 lesions, smear-positive)—determines MDT duration (6 vs. 12 months)", "Type 1 (reversal) and Type 2 (erythema nodosum leprosum) lepra reactions require systemic corticosteroids in addition to continuing MDT", "Incubation period 2–12 years; transmitted via respiratory secretions from untreated MB leprosy patients; not highly contagious"], syndromes: ["tb-leprosy"] },
  { id: "mkansasii", name: "Mycobacterium kansasii", category: "mycobacteria", shape: "rod", blurb: "Slowly growing photochromogenic NTM; second most common cause of NTM pulmonary disease in the US; treatment response generally better than MAC; usually rifampin-susceptible", pearls: ["Rifampin susceptibility testing critical: rifampin-susceptible strains treated with INH + RIF + EMB daily for ≥18 months (or 12 months after sputum culture conversion); rifampin-resistant: substitute clarithromycin or moxifloxacin for rifampin", "ATS guideline recommends daily oral regimen (INH + RIF + EMB) rather than 3×/week for M. kansasii pulmonary disease", "Acquired rifampin resistance can occur with monotherapy—always use ≥3 drugs; test rifampin susceptibility in all isolates"], syndromes: [] },
];

// ============== SYNDROMES ==============
export const syndromes: Syndrome[] = [
  { id: "skin-superficial", name: "Superficial skin/soft tissue", short: "Skin (superficial)", category: "skin",
    blurb: "Cellulitis, erysipelas, simple abscess. Usually strep or staph.",
    empiric: ["cephalexin", "diclox", "naf", "vanc", "clinda", "doxy", "tmpsmx"],
    empiricPrimary: ["cephalexin", "diclox", "naf"],
    empiricAlternate: ["vanc", "clinda", "doxy", "tmpsmx"],
    sourceIds: ["ssti-idsa-2014", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Nonpurulent (cellulitis/erysipelas): cephalexin or dicloxacillin PO for mild; nafcillin or cefazolin IV for moderate-severe. MRSA risk: vancomycin IV or TMP-SMX/doxycycline/clindamycin PO. Purulent (abscess): incision & drainage is primary; add TMP-SMX or doxycycline if MRSA suspected. Impetigo: topical mupirocin or retapamulin; systemic cephalexin or amoxicillin-clavulanate for extensive disease. Duration 5 days for cellulitis (extend if not improving).",
    commonBugs: ["strep", "mssa", "mrsa"]},
  { id: "skin-deep", name: "Deep soft tissue, bone & hardware", short: "Skin/bone (deep)", category: "skin",
    blurb: "Necrotizing fasciitis, diabetic foot, hardware infections, osteomyelitis.",
    empiric: ["vanc", "zosyn", "meropenem", "linezolid", "clinda", "ceftriaxone", "metro"],
    empiricPrimary: ["vanc", "zosyn", "meropenem"],
    empiricAlternate: ["linezolid", "clinda", "ceftriaxone", "metro"],
    sourceIds: ["ssti-idsa-2014", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Necrotizing fasciitis: emergent surgical debridement + broad-spectrum empiric antibiotics. Polymicrobial (Type I): vancomycin + piperacillin-tazobactam or carbapenem. Monomicrobial GAS (Type II): penicillin G + clindamycin. Suspected MRSA: add vancomycin or linezolid. Deep abscess/prosthetic joint: empiric vancomycin ± broad gram-negative coverage pending cultures; 6+ weeks for prosthetic joint infection.",
    commonBugs: ["mrsa", "mssa", "strep", "anaerobes", "pseudomonas", "gnrs"]},
  { id: "bone", name: "Osteomyelitis", category: "skin",
    blurb: "Native or hardware-associated bone infection.",
    empiric: ["vanc", "ceftriaxone", "naf", "cefazolin", "dapto", "linezolid", "cipro", "levo"],
    empiricPrimary: ["vanc", "ceftriaxone"],
    empiricAlternate: ["naf", "cefazolin", "dapto", "linezolid", "cipro", "levo"],
    sourceIds: ["nvo-idsa-2015", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric: vancomycin IV + ceftriaxone or 3rd-gen cephalosporin (gram-negative coverage) for severe/septic presentations; hold empiric antibiotics in stable patients without epidural abscess until bone biopsy cultures. MSSA: nafcillin or cefazolin. MRSA/CNS: vancomycin; alternatives daptomycin or linezolid. Gram-negative: ciprofloxacin PO or ceftriaxone IV. Duration: 6 weeks standard (vertebral osteomyelitis IDSA 2015).",
    commonBugs: ["mssa", "mrsa", "strep", "pseudomonas"]},
  { id: "line", name: "Line-associated bloodstream infection", short: "CLABSI", category: "bloodstream",
    blurb: "Catheter-related bacteremia. Skin and gut flora.",
    empiric: ["vanc", "cefepime", "dapto", "zosyn", "meropenem", "ag"],
    empiricPrimary: ["vanc", "cefepime"],
    empiricAlternate: ["dapto", "zosyn", "meropenem", "ag"],
    sourceIds: ["clabsi-idsa-2009", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric: vancomycin for gram-positive coverage (MRSA, CoNS). Add gram-negative coverage (cefepime, piperacillin-tazobactam, or carbapenem) based on local resistance patterns and severity. Remove catheter when feasible; essential for S. aureus, Candida, or persistent bacteremia. Duration: 14 days for uncomplicated S. aureus; 7-14 days for CoNS if catheter removed; 4-6 weeks for complicated IE or persistent bacteremia.",
    commonBugs: ["mrsa", "mssa", "vre", "pseudomonas", "escappm", "gnrs"]},
  { id: "endocarditis", name: "Endocarditis", category: "bloodstream",
    blurb: "Native and prosthetic valve infection.",
    empiric: ["naf", "vanc", "ceftriaxone", "dapto", "ag", "cefazolin", "linezolid", "zosyn"],
    empiricPrimary: ["naf", "vanc", "ceftriaxone"],
    empiricAlternate: ["dapto", "ag", "cefazolin", "linezolid", "zosyn"],
    sourceIds: ["ie-aha-2015", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Native valve, MSSA: nafcillin 2g IV q4h x 6 weeks (cefazolin alternative for non-anaphylactic penicillin allergy). Native valve, MRSA: vancomycin x 6 weeks; daptomycin 6 mg/kg/day alternative. Streptococcal (PCN-susceptible): penicillin G or ceftriaxone x 4 weeks (2-week shortened course with gentamicin in uncomplicated NVE). Enterococcal: ampicillin + ceftriaxone x 6 weeks (preferred for HLAR), or ampicillin + gentamicin. Prosthetic valve: add rifampin to backbone agent x ≥6 weeks + gentamicin x 2 weeks. HACEK: ceftriaxone x 4 weeks NVE / 6 weeks PVE.",
    commonBugs: ["strep", "mssa", "mrsa", "enterococcus", "vre"]},
  { id: "meningitis", name: "Meningitis", category: "cns",
    blurb: "Bacterial meningitis. Empiric covers pneumococcus, meningococcus, Listeria.",
    empiric: ["ceftriaxone", "vanc", "meropenem", "ampho", "cefepime", "aztreonam"],
    empiricPrimary: ["ceftriaxone", "vanc"],
    empiricAlternate: ["meropenem", "ampho", "cefepime", "aztreonam"],
    sourceIds: ["meningitis-idsa-2004", "hcvm-idsa-2017", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric (community, adult): vancomycin + ceftriaxone (add ampicillin if age >50 or immunocompromised for Listeria coverage). Post-neurosurgical/healthcare-associated: vancomycin + cefepime or ceftazidime or meropenem (Pseudomonas coverage). Add dexamethasone 0.15 mg/kg q6h x 4 days (start with or before first antibiotic dose) for pneumococcal meningitis. Duration: S. pneumoniae 10-14 days; N. meningitidis 7 days; Listeria 21+ days; gram-negative bacilli 21 days.",
    commonBugs: ["strep", "neisseria", "listeria", "gnrs"]},
  { id: "cap", name: "Community-acquired pneumonia", short: "CAP", category: "respiratory",
    blurb: "Outpatient or non-ICU inpatient. Pneumococcus + atypicals dominate.",
    empiric: ["ceftriaxone", "azithro", "levo", "moxi", "doxy", "amox", "unasyn", "ceftaroline"],
    empiricPrimary: ["ceftriaxone", "azithro"],
    empiricAlternate: ["levo", "moxi", "doxy", "amox", "unasyn", "ceftaroline"],
    sourceIds: ["cap-ats-idsa-2019", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Outpatient, no comorbidities: amoxicillin 1g TID, OR doxycycline 100mg BID, OR azithromycin/clarithromycin (if local pneumococcal resistance <25%). Outpatient with comorbidities: amoxicillin-clavulanate or cephalosporin + macrolide, OR respiratory FQ monotherapy (levofloxacin or moxifloxacin). Inpatient non-severe (non-ICU): beta-lactam (ceftriaxone, cefotaxime, unasyn, or ceftaroline) + azithromycin OR respiratory FQ monotherapy. Inpatient severe (ICU): beta-lactam + macrolide OR beta-lactam + respiratory FQ. Minimum 5 days (clinical stability required). No routine anaerobic coverage unless lung abscess/empyema.",
    commonBugs: ["strep", "atypicals", "mssa", "gnrs"]},
  { id: "hcap", name: "HAP / HCAP", category: "respiratory",
    blurb: "Hospital-acquired pneumonia (≥48h after admission).",
    empiric: ["zosyn", "cefepime", "meropenem", "vanc", "linezolid", "aztreonam", "levo"],
    empiricPrimary: ["zosyn", "cefepime", "meropenem"],
    empiricAlternate: ["vanc", "linezolid", "aztreonam", "levo"],
    sourceIds: ["hap-vap-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "HAP (non-ventilated): All patients need coverage for S. aureus and gram-negatives. No MRSA risk factors: piperacillin-tazobactam, cefepime, levofloxacin, imipenem, or meropenem. MRSA risk factors (prior IV antibiotics, septic shock, structural lung disease, high local prevalence): add vancomycin or linezolid. Avoid aminoglycosides as single agent for HAP. Duration 7 days. Local antibiogram should guide coverage.",
    commonBugs: ["pseudomonas", "mrsa", "mssa", "escappm", "gnrs"]},
  { id: "vap", name: "Ventilator-associated pneumonia", short: "VAP", category: "respiratory",
    blurb: "Pneumonia >48h after intubation. Broad empiric, narrow on cultures.",
    empiric: ["zosyn", "cefepime", "meropenem", "vanc", "linezolid", "aztreonam", "ag", "cipro"],
    empiricPrimary: ["zosyn", "cefepime", "meropenem"],
    empiricAlternate: ["vanc", "linezolid", "aztreonam", "ag", "cipro"],
    sourceIds: ["hap-vap-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "All VAP: antipseudomonal beta-lactam (piperacillin-tazobactam, cefepime, or carbapenem) as backbone. MRSA risk (≥5 days hospitalization before VAP, prior IV antibiotics, renal replacement therapy): add vancomycin or linezolid; otherwise MRSA coverage not required. MDR risk or high local resistance (>10% of gram-negatives resistant to preferred agent, prior IV antibiotics within 90 days): use TWO antipseudomonal agents from different classes. Duration: 7 days.",
    commonBugs: ["pseudomonas", "mrsa", "escappm", "esbl", "gnrs"]},
  { id: "aspiration", name: "Aspiration pneumonia", category: "respiratory",
    blurb: "Anaerobic + oral flora coverage. Often community.",
    empiric: ["ceftriaxone", "azithro", "unasyn", "levo", "moxi", "doxy", "clinda", "metro"],
    empiricPrimary: ["ceftriaxone", "azithro", "unasyn"],
    empiricAlternate: ["levo", "moxi", "doxy", "clinda", "metro"],
    sourceIds: ["cap-ats-idsa-2019", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Community-onset aspiration pneumonia: treat per 2019 ATS/IDSA CAP guidelines — standard CAP regimens (beta-lactam + macrolide or FQ monotherapy). Anaerobic coverage NOT routinely added unless lung abscess or empyema is suspected (very low quality evidence). Hospital-onset aspiration: treat as HAP. Classic aspiration pleuropulmonary syndrome (loss of consciousness + gingival disease): unasyn or add metronidazole to standard regimen. Minimum 5 days, extend for abscess/empyema.",
    commonBugs: ["strep", "anaerobes", "atypicals", "mssa"]},
  { id: "biliary", name: "Biliary tract infection", category: "intraabd",
    blurb: "Cholangitis, cholecystitis. Gut flora.",
    empiric: ["zosyn", "ceftriaxone", "meropenem", "ertapenem", "cipro", "metro", "unasyn"],
    empiricPrimary: ["zosyn", "ceftriaxone"],
    empiricAlternate: ["meropenem", "ertapenem", "cipro", "metro", "unasyn"],
    sourceIds: ["tokyo-2018", "iab-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Mild (Grade I) cholangitis/cholecystitis: ampicillin-sulbactam or cephalosporin ± metronidazole. Moderate-severe (Grade II-III): piperacillin-tazobactam, or ceftriaxone + metronidazole, or carbapenem (meropenem or ertapenem) for severe/healthcare-associated. Biliary drainage essential for Grade II-III cholangitis. Duration: 4-7 days after source control per Tokyo Guidelines 2018; cholecystectomy is definitive treatment for cholecystitis.",
    commonBugs: ["gnrs", "esbl", "enterococcus", "anaerobes", "escappm"]},
  { id: "intraabd-spontaneous", name: "Spontaneous intraperitoneal", short: "SBP", category: "intraabd",
    blurb: "Spontaneous bacterial peritonitis (cirrhosis).",
    empiric: ["ceftriaxone", "zosyn", "cipro", "meropenem"],
    empiricPrimary: ["ceftriaxone"],
    empiricAlternate: ["zosyn", "cipro", "meropenem"],
    sourceIds: ["sbp-aasld-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Community-acquired SBP: ceftriaxone 1-2g IV q24h (or IV cefotaxime 2g q8h) for 5-7 days. Nosocomial SBP or critically ill: piperacillin-tazobactam or carbapenem (meropenem). Add vancomycin if MRSA risk (prior MRSA, IV antibiotics within 90 days, septic shock). Albumin infusion (1.5 g/kg at diagnosis, 1 g/kg on day 3) reduces renal failure and mortality. Prophylaxis post-SBP: ciprofloxacin 500 mg/day or TMP-SMX long-term.",
    commonBugs: ["gnrs", "strep", "anaerobes"]},
  { id: "intraabd-secondary", name: "Secondary intraabdominal", category: "intraabd",
    blurb: "Perforation, abscess, post-surgical. Polymicrobial.",
    empiric: ["zosyn", "ceftriaxone", "metro", "meropenem", "ertapenem", "cipro", "tige"],
    empiricPrimary: ["zosyn", "ceftriaxone", "metro"],
    empiricAlternate: ["meropenem", "ertapenem", "cipro", "tige"],
    sourceIds: ["iab-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Community-acquired, mild-moderate: ceftriaxone + metronidazole, or piperacillin-tazobactam, or ciprofloxacin + metronidazole, or ertapenem. Severe/healthcare-associated: meropenem or piperacillin-tazobactam + coverage for ESBL/resistant organisms based on local epidemiology. Source control (drainage, debridement, or surgery) is essential. Duration: 4-7 days after adequate source control; 24 hours if perforation identified and surgically addressed within 12 hours.",
    commonBugs: ["gnrs", "esbl", "anaerobes", "enterococcus", "escappm"]},
  { id: "gi", name: "GI / colitis", category: "gi",
    blurb: "C. diff, traveler's diarrhea, invasive Salmonella/Shigella.",
    empiric: ["vancpo", "metro", "cipro", "levo", "doxy", "azithro"],
    empiricPrimary: ["vancpo", "metro"],
    empiricAlternate: ["cipro", "levo", "doxy", "azithro"],
    sourceIds: ["cdi-idsa-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "C. difficile infection (initial episode): fidaxomicin 200 mg PO BID x 10 days (preferred); vancomycin 125 mg PO QID x 10 days (acceptable alternative); metronidazole 500 mg TID x 10 days only if fidaxomicin/vancomycin unavailable. Fulminant CDI: vancomycin 500 mg PO/NG QID + metronidazole 500 mg IV q8h; consider rectal vancomycin if ileus. Recurrent CDI: fidaxomicin preferred. Traveler's diarrhea: ciprofloxacin or azithromycin x 3 days. Shigella: ciprofloxacin or azithromycin. Salmonella (non-typhi, if treatment indicated): ciprofloxacin or ceftriaxone.",
    commonBugs: ["anaerobes", "gnrs"]},
  { id: "lower-gu", name: "Lower GU (cystitis)", category: "gu",
    blurb: "Uncomplicated cystitis.",
    empiric: ["nitro", "tmpsmx", "fosfo", "cipro", "levo", "augmentin", "cephalexin"],
    empiricPrimary: ["nitro", "tmpsmx", "fosfo"],
    empiricAlternate: ["cipro", "levo", "augmentin", "cephalexin"],
    sourceIds: ["uti-idsa-2011", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "First-line: nitrofurantoin monohydrate/macrocrystals 100 mg BID x 5 days (avoid if GFR <30), TMP-SMX DS BID x 3 days (avoid if local resistance >20%), or fosfomycin trometamol 3g single dose. Fluoroquinolones (ciprofloxacin, levofloxacin) are highly effective but reserved for important uses due to collateral damage risk. Beta-lactams (cephalexin, augmentin) are less effective than preferred agents. Urine culture not routinely needed for uncomplicated premenopausal women.",
    commonBugs: ["gnrs", "esbl", "enterococcus"]},
  { id: "upper-gu", name: "Upper GU (pyelo)", category: "gu",
    blurb: "Pyelonephritis. Need tissue penetration.",
    empiric: ["cipro", "levo", "ceftriaxone", "tmpsmx", "ag", "zosyn"],
    empiricPrimary: ["cipro", "levo"],
    empiricAlternate: ["ceftriaxone", "tmpsmx", "ag", "zosyn"],
    sourceIds: ["uti-idsa-2011", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Outpatient: ciprofloxacin 500 mg BID x 7 days or levofloxacin 750 mg daily x 5 days (first-line if local FQ resistance <10%); if FQ resistance ≥10%, give initial IV ceftriaxone 1g or aminoglycoside dose then switch to oral FQ or TMP-SMX (based on sensitivities) x 14 days. Inpatient: IV fluoroquinolone, or aminoglycoside ± ampicillin, or extended-spectrum cephalosporin/penicillin; transition to oral when improving. Duration: FQ 5-7 days; beta-lactam 10-14 days.",
    commonBugs: ["gnrs", "esbl", "enterococcus", "pseudomonas", "escappm"]},
  { id: "gu-instr", name: "GU with instrumentation", category: "gu",
    blurb: "Post-procedural UTI. Broader resistance patterns.",
    empiric: ["ceftriaxone", "cefepime", "cipro", "zosyn", "meropenem", "levo", "ag"],
    empiricPrimary: ["ceftriaxone", "cefepime", "cipro", "zosyn"],
    empiricAlternate: ["meropenem", "levo", "ag"],
    sourceIds: ["cuti-idsa-2025", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric selection follows a 4-step approach: (1) Assess severity (sepsis vs. non-sepsis); (2) Consider patient-specific resistance risk factors (prior resistant cultures, prior FQ exposure within 12 months); (3) Consider patient-specific adverse effect risk; (4) For septic patients, consult local antibiogram. Non-septic cUTI: cephalosporins (3rd/4th gen), piperacillin-tazobactam, or FQ. Septic cUTI: carbapenems, cephalosporins, pip-tazo, or FQ. Duration: 5-7 days FQ or 7 days non-FQ. Definitive therapy guided by urine culture.",
    commonBugs: ["pseudomonas", "esbl", "escappm", "vre", "enterococcus"]},
  { id: "zoonotic-sti", name: "Zoonotics & STIs", category: "other",
    blurb: "Rickettsia, Borrelia, gonorrhea, chlamydia, syphilis.",
    empiric: ["doxy", "ceftriaxone", "azithro", "amox", "pcn", "levo", "moxi"],
    empiricPrimary: ["doxy", "ceftriaxone", "azithro"],
    empiricAlternate: ["amox", "pcn", "levo", "moxi"],
    sourceIds: ["lyme-idsa-2020", "sti-cdc-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Lyme disease (early, erythema migrans): doxycycline 100 mg BID x 10 days OR amoxicillin 500 mg TID x 14 days OR cefuroxime axetil 500 mg BID x 14 days. Neurologic Lyme: IV ceftriaxone 2g/day x 14-21 days. RMSF/Ehrlichiosis: doxycycline 100 mg BID x 5-7 days (drug of choice; safe in children). Gonorrhea (uncomplicated urogenital/rectal): ceftriaxone 500 mg IM single dose (1g if >150 kg). Chlamydia: doxycycline 100 mg BID x 7 days (preferred over azithromycin). Syphilis (primary/secondary/early latent): benzathine penicillin G 2.4 million units IM x 1; late latent/unknown duration: benzathine PCN G weekly x 3 doses.",
    commonBugs: ["atypicals", "neisseria"]},
  { id: "neutropenic", name: "Febrile neutropenia", category: "other",
    blurb: "Fever in neutropenic host. Broad empiric.",
    empiric: ["cefepime", "zosyn", "meropenem", "vanc", "cipro", "levo", "augmentin", "ag"],
    empiricPrimary: ["cefepime", "zosyn", "meropenem"],
    empiricAlternate: ["vanc", "cipro", "levo", "augmentin", "ag"],
    sourceIds: ["fn-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "High-risk (anticipated prolonged neutropenia >7 days, ANC <100, MASCC <21): IV empiric monotherapy with antipseudomonal beta-lactam — cefepime 2g IV q8h, piperacillin-tazobactam 4.5g IV q6h, or meropenem 1g IV q8h. Add vancomycin only if: hemodynamic instability, skin/catheter-site infection, suspected GPC bacteremia, or MRSA risk factors. Low-risk (MASCC ≥21, anticipated neutropenia ≤7 days): oral ciprofloxacin + amoxicillin-clavulanate (or clindamycin if PCN allergic). Empiric antifungal if persistent fever after 4-7 days of antibiotics and prolonged neutropenia expected.",
    commonBugs: ["pseudomonas", "escappm", "mrsa", "vre", "esbl", "gnrs"]},
  // ---- Mycobacterial syndromes (TB / NTM / leprosy) ----
  { id: "tb-pulmonary-ds", name: "Active Pulmonary TB (Drug-Susceptible)", short: "DS-TB", category: "mycobacterial", blurb: "Standard-of-care treatment for drug-susceptible pulmonary Mtb; 6-month RIPE regimen remains backbone with 4-month RPT-MOX now an option for eligible adults", empiric: ["inh", "rif", "pza", "emb", "rpt", "moxi"], empiricPrimary: ["inh", "rif", "pza", "emb", "rpt", "moxi"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-tb-2016", "cdc-rpt-mox-2022", "ats-cdc-idsa-2025"], guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily (weight-based) + EMB 15–20 mg/kg PO daily | Continuation phase (4 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Add pyridoxine 25–50 mg PO daily throughout (B6 for all patients) | Alternative 4-month regimen (≥12 years, ≥40 kg, drug-susceptible): 2HPZM/2HPM — RPT 600 mg + MOX 400 mg + INH 5 mg/kg [max 300 mg] + PZA (wt-based) daily × 8 weeks, then RPT 600 mg + MOX 400 mg + INH 5 mg/kg [max 300 mg] daily × 9 weeks (119 total doses) — ALTERNATE: 3× weekly DOT regimen (all drugs 3×/week): INH 15 mg/kg + RIF 10 mg/kg + PZA (35–45 mg/kg) + EMB (30 mg/kg) × 8 weeks then INH 15 mg/kg + RIF 10 mg/kg × 18 weeks (avoid in HIV, cavitary disease) | If cavitation on CXR + positive culture at 2 months: extend continuation phase to 7 months (total 9 months) — Standard regimen 2HRZE/4HR: 2-month intensive phase (RIPE) followed by 4-month continuation (RI). Daily DOT or video-observed therapy (VOT) preferred; 5 days/week counts as daily. Add pyridoxine 25–50 mg/day to prevent INH-induced peripheral neuropathy (mandatory for HIV+, DM, CKD, elderly, pregnancy, alcohol use). Extend continuation to 7 months if cavitation on baseline CXR and sputum culture remains positive at 2 months. The 2022 CDC/NIH 4-month RPT-MOX regimen (Study 31/A5349) is conditionally recommended for adults ≥12 years with drug-susceptible pulmonary TB and ≥40 kg; daily rifapentine 600 mg replaces rifampin. Check EMB ocular toxicity at baseline. IRIS may occur in TB-HIV co-infection 2–8 weeks after starting ART; treat with NSAIDs or corticosteroids if severe.", commonBugs: ["mtb"] },
  { id: "tb-ltbi", name: "Latent TB Infection (LTBI)", short: "LTBI", category: "mycobacterial", blurb: "Treatment of latent Mtb infection to prevent progression to active TB disease; short rifamycin-based regimens preferred over 9-month isoniazid monotherapy", empiric: ["inh", "rif", "rpt"], empiricPrimary: ["inh", "rif", "rpt"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-ltbi-2020"], guidelineNotes: "PRIMARY: 3HP (preferred): INH 15 mg/kg [max 900 mg] PO + RPT (weight-based: ≥50 kg 900 mg; 32–49.9 kg 750 mg; 25.1–32 kg 600 mg) PO once weekly × 12 doses; DOT or VOT required | 4R: RIF 10 mg/kg [max 600 mg] PO daily × 4 months (120 doses); self-administered acceptable | 3HR: INH 5 mg/kg [max 300 mg] + RIF 10 mg/kg [max 600 mg] PO daily × 3 months (90 doses) — ALTERNATE: 9H: INH 5 mg/kg [max 300 mg] PO daily × 9 months (270 doses); alternative when rifamycin contraindicated or drug interactions prohibitive | 6H: INH 5 mg/kg [max 300 mg] PO daily × 6 months (180 doses); less preferred due to lower completion rates vs short-course | Add pyridoxine 25–50 mg/day with any INH-containing regimen for high-risk patients — NTCA/CDC 2020 guidelines preferentially recommend short-course rifamycin-based regimens (3HP, 4R, 3HR) over 6–9 months isoniazid monotherapy due to higher completion rates, equivalent efficacy, and lower toxicity. 3HP (once-weekly INH + RPT × 12) has highest completion of all options; can be DOT or VOT. Rule out active TB disease before initiating. Review rifamycin drug interactions (ART, warfarin, oral contraceptives) before selecting regimen; use 9H if rifamycin interactions not manageable. Add pyridoxine 25–50 mg/day with INH for neuropathy prevention in at-risk patients. Reassess LTBI treatment in contacts with documented exposure to INH-resistant or MDR-TB sources.", commonBugs: ["mtb"] },
  { id: "tb-meningitis", name: "CNS TB / TB Meningitis", short: "TBM", category: "mycobacterial", blurb: "Most severe form of TB; 12 months total therapy with adjunctive dexamethasone; high mortality and disability without prompt treatment", empiric: ["inh", "rif", "pza", "emb", "levo", "moxi", "linezolid", "cs", "eto"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: ["levo", "moxi", "linezolid", "cs", "eto"], sourceIds: ["ats-cdc-idsa-tb-2016", "ats-cdc-idsa-2025"], guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO/IV daily + RIF 10 mg/kg [max 600 mg] PO/IV daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (10 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Adjunctive: Dexamethasone 0.4 mg/kg/day IV/PO tapering over 6–8 weeks (adult); start at same time as anti-TB therapy | Add pyridoxine 25–50 mg PO daily — ALTERNATE: If INH resistance confirmed or suspected: replace INH with levofloxacin 750–1000 mg PO daily (good CNS penetration) | Drug-resistant CNS TB: consult ID/TB specialist; use drugs with adequate CNS penetration (LFX, MOX, ETO/PTO, CS, LZD) — TB meningitis requires 12 months total therapy (2 months intensive + 10 months continuation). Adjunctive dexamethasone strongly recommended for HIV-negative patients (reduces mortality; high certainty evidence); weak recommendation for PLHIV (uncertain benefit, but safe). Standard rifampin dose 10 mg/kg/day—no definitive evidence that higher doses (15+ mg/kg) reduce mortality, though ongoing trials (HARVEST, INTENSE-TBM) are evaluating. Defer ART 4–8 weeks after starting TB treatment in TB meningitis/HIV co-infection (one RCT; exception to usual ≤2-week rule) to reduce IRIS-related inflammatory CNS complications. Use drugs with good CNS penetration: INH (excellent), PZA (excellent), RIF (moderate), EMB (poor—use nonetheless to cover resistance). Daily regimen throughout (no intermittent dosing for CNS TB).", commonBugs: ["mtb"] },
  { id: "tb-miliary", name: "Miliary / Disseminated TB", short: "Miliary-TB", category: "mycobacterial", blurb: "Life-threatening hematogenous dissemination of Mtb; treatment mirrors pulmonary TB but duration extended to 9–12 months if CNS involvement present", empiric: ["inh", "rif", "pza", "emb"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-tb-2016"], guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (4 months, no CNS involvement): INH + RIF daily (total 6 months) | If CNS/meningeal involvement: extend total duration to 12 months (see TB meningitis regimen) | Add pyridoxine 25–50 mg PO daily — ALTERNATE: Consider adjunctive corticosteroids (dexamethasone or prednisolone) for patients with severe respiratory compromise, serositis, or adrenal insufficiency | Daily dosing recommended for entire course (no intermittent dosing given severity) — Miliary TB uses the standard RIPE regimen; minimum 6 months for disseminated disease without CNS involvement, extended to 9–12 months for CNS/meningeal co-involvement or slow treatment response. Evaluate for TB meningitis in all miliary TB cases—lumbar puncture should be performed if feasible. Daily therapy throughout the entire course is recommended given severity. Adjunctive corticosteroids may benefit patients with severe hypoxia, serositis, or adrenal insufficiency complicating miliary disease. DST results from any culture-positive site should guide therapy. IRIS may occur in HIV co-infection after ART initiation; manage with NSAIDs, and prednisolone if severe.", commonBugs: ["mtb"] },
  { id: "tb-pleural", name: "Pleural TB", short: "Pleural-TB", category: "mycobacterial", blurb: "TB pleuritis/pleural effusion from parietal pleura hypersensitivity reaction to Mtb; responds well to standard anti-TB therapy with same 6-month duration as pulmonary TB", empiric: ["inh", "rif", "pza", "emb"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-tb-2016"], guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (4 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Add pyridoxine 25–50 mg PO daily — ALTERNATE: Adjunctive corticosteroids (prednisolone 0.75 mg/kg/day tapering over 4 weeks) may accelerate fluid reabsorption—evidence limited, not routinely recommended | Therapeutic thoracentesis for large symptomatic effusions; chest tube rarely required — TB pleuritis is most often a hypersensitivity reaction to Mtb antigens in the pleural space and may occur with primary or reactivation TB. Sputum and pleural fluid cultures are often negative; pleural biopsy and ADA (adenosine deaminase) elevation are diagnostically helpful. Standard 6-month RIPE regimen is effective; total duration same as pulmonary TB. Adjunctive corticosteroids may speed resolution of effusion and symptoms but do not clearly improve long-term outcomes. Most TB pleural effusions resolve with anti-TB therapy alone. Ensure DST performed on any culture-positive specimen. Daily therapy is recommended.", commonBugs: ["mtb"] },
  { id: "tb-lymphatic", name: "Lymphatic TB (Scrofula)", short: "TB-Lymph", category: "mycobacterial", blurb: "TB lymphadenitis (most common extrapulmonary TB site); standard 6-month RIPE regimen effective; paradoxical enlargement of nodes common during treatment", empiric: ["inh", "rif", "pza", "emb", "azithro"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: ["azithro"], sourceIds: ["ats-cdc-idsa-tb-2016"], guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (4 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Add pyridoxine 25–50 mg PO daily — ALTERNATE: NTM lymphadenitis (especially in children, MAC): surgical excision preferred; azithromycin + rifampin + ethambutol if excision incomplete | Consider 9 months total if slow response or immunocompromised host — TB lymphadenitis (cervical scrofula most common) is treated with the same 6-month RIPE regimen as pulmonary TB; studies show equivalent outcomes between 6 and 9 months for drug-susceptible organisms. Paradoxical enlargement of lymph nodes (new or enlarging nodes) occurs in 15–25% of patients during initial weeks of therapy and does not indicate treatment failure—continue anti-TB therapy; NSAIDs may help symptoms. Residual lymph node abnormality on imaging after 6 months does not alone require extended therapy. Excision is generally not required for TB lymphadenitis but may help if abscess forms. Send tissue for AFB smear, culture, and histopathology at excision/biopsy.", commonBugs: ["mtb", "mavium"] },
  { id: "tb-hiv", name: "TB + HIV Co-treatment", short: "TB-HIV", category: "mycobacterial", blurb: "TB/HIV co-infection requires coordinated anti-TB and ART timing; rifamycin-ART drug interactions mandate regimen selection based on CD4 count and ART choice", empiric: ["rif", "rfb"], empiricPrimary: ["rif"], empiricAlternate: ["rfb"], sourceIds: ["ats-cdc-idsa-tb-2016", "who-tb-2022"], guidelineNotes: "PRIMARY: Anti-TB: Standard 2HRZE/4HR daily regimen (rifampin-based preferred; do not use intermittent dosing at CD4 <100) | ART timing: CD4 <50 cells/mm³ → start ART within 2 weeks of TB treatment; CD4 ≥50 → start ART within 2–8 weeks; TB meningitis → defer ART 4–8 weeks | Preferred ART with rifampin: Efavirenz 600 mg PO daily (no dose adjustment needed) or Dolutegravir 50 mg PO twice daily (double standard dose due to rifampin CYP induction) | Add pyridoxine 25–50 mg PO daily — ALTERNATE: If PI-based ART required: substitute rifabutin 150 mg PO daily for rifampin (reduces rifamycin induction of PIs) | Raltegravir 400 mg PO twice daily: acceptable alternative INSTI with rifampin (less affected than dolutegravir) | Rifabutin 300 mg PO daily with EFV-based ART (EFV induces rifabutin—increase dose) — All PLHIV with active TB who are ART-naive should start ART. Rifampin is a potent CYP3A4 inducer—reduces levels of most PIs and some INSTIs significantly. Preferred approach: use efavirenz-based or dolutegravir-based ART (DTG 50 mg twice daily) with standard rifampin-based TB regimen. If PI-based ART is mandatory, substitute rifabutin 150 mg daily for rifampin. Dolutegravir once-daily may be adequate with rifampin per recent phase 2b data, but standard guidance remains twice-daily DTG. Monitor for IRIS (inflammatory reconstitution syndrome) 2–8 weeks after ART initiation; treat with NSAIDs; prednisone 1.5 mg/kg/day tapering over 4 weeks for severe IRIS. Avoid rifapentine 3HP for LTBI in patients requiring twice-daily DTG.", commonBugs: ["mtb"] },
  { id: "tb-mdr", name: "MDR-TB Regimen (BPaLM/BPaL)", short: "MDR-TB", category: "mycobacterial", blurb: "Multidrug-resistant TB (resistant to at least INH and RIF); WHO 2022 and ATS/CDC/ERS/IDSA 2025 recommend 6-month all-oral BPaLM or BPaL regimens", empiric: ["moxi", "bdq", "pa", "linezolid", "pza", "emb", "levo", "cfz", "eto"], empiricPrimary: ["moxi", "bdq", "pa", "linezolid"], empiricAlternate: ["pza", "emb", "levo", "cfz", "eto"], sourceIds: ["who-bpalm-2022", "ats-cdc-idsa-2025", "curry-mdr-tb"], guidelineNotes: "PRIMARY: BPaLM (fluoroquinolone-susceptible): Bedaquiline 400 mg PO daily × 2 wk then 200 mg PO 3×/wk × 22 wk + Pretomanid 200 mg PO daily × 26 wk + Linezolid 600 mg PO daily × 26 wk + Moxifloxacin 400 mg PO daily × 26 wk (total 26 weeks/6 months) | BPaL (fluoroquinolone-resistant or intolerant): Bedaquiline + Pretomanid (as above) + Linezolid 600 mg PO daily × 26 wk; extend to 39 wk if culture conversion delayed >8 weeks — ALTERNATE: If linezolid toxicity: reduce to 300 mg daily (do not discontinue before week 9 without necessity) | 9-month oral regimen (fluoroquinolone-susceptible, no FQ resistance): BDQ + LFX/MOX + ETH + PZA + EMB + clofazimine (alternately for those not meeting BPaLM criteria) | Longer individualized regimens (18 months) if exposure to BDQ/LZD >1 month prior — BPaLM (6-month all-oral) is the WHO 2022 and ATS/CDC/ERS/IDSA 2025 preferred regimen for MDR/RR-TB with fluoroquinolone susceptibility (ages ≥14 years, pulmonary). BPaL is recommended for fluoroquinolone-resistant or pre-XDR-TB. DOT/VOT mandatory. Critical safety monitoring: ECG at baseline, weeks 2 and 4, then monthly for QTc (bedaquiline + moxifloxacin + clofazimine have additive QTc effects); CBC weekly initial 8 weeks for linezolid myelosuppression; optic nerve/peripheral neuropathy assessment monthly (linezolid). Linezolid TDM trough goal <2 mcg/mL. Extend to 9 months if sputum culture conversion does not occur by week 8. Expert TB consultation mandatory before initiating.", commonBugs: ["mtb"] },
  { id: "tb-xdr", name: "XDR-TB Regimen", short: "XDR-TB", category: "mycobacterial", blurb: "Extensively drug-resistant TB (MDR + resistance to any fluoroquinolone and at least one Group B injectable or bedaquiline/linezolid); BPaL is preferred regimen", empiric: ["bdq", "dla", "pa", "linezolid", "levo", "moxi", "cfz"], empiricPrimary: ["bdq", "dla", "pa", "linezolid"], empiricAlternate: ["levo", "moxi", "cfz"], sourceIds: ["who-bpalm-2022", "ats-cdc-idsa-2025", "curry-mdr-tb"], guidelineNotes: "PRIMARY: BPaL (primary for XDR-TB): Bedaquiline 400 mg PO daily × 2 wk then 200 mg PO 3×/wk × 22 wk + Pretomanid 200 mg PO daily × 26 wk + Linezolid 600 mg PO daily × 26 wk; extend to 39 wk if culture conversion delayed | Add delamanid 100 mg PO twice daily if additional coverage needed and BDQ toxicity manageable (consult specialist; additive QTc) — ALTERNATE: Individualized longer regimens (18–24 months) if BPaL not feasible: assemble ≥4 likely effective drugs from Group A (BDQ, LFX/MOX, LZD), Group B (CFZ), and Group C agents based on DST and treatment history | Clofazimine 100 mg daily may augment BPaL when tolerated — XDR-TB carries high mortality and requires TB expert management. BPaL (bedaquiline + pretomanid + linezolid) for 6–9 months is the WHO/ATS 2025 recommended approach for XDR and pre-XDR-TB with FQ resistance. ZeNix trial showed 84–93% favorable outcome across BPaL regimens; 600 mg linezolid × 26 weeks had best risk-benefit ratio. Monitor ECG monthly; CBC weekly then biweekly for linezolid toxicity; optic neuritis assessment monthly. DOT/VOT mandatory given complexity. Culture conversion milestone (month 2) determines if extension to 9 months needed. Infection control critical during hospitalization. Surgical resection may be considered in selected patients with localized disease failing medical therapy.", commonBugs: ["mtb"] },
  { id: "tb-mac-pulm", name: "MAC Pulmonary Disease", short: "MAC-PD", category: "mycobacterial", blurb: "Pulmonary disease caused by Mycobacterium avium complex; macrolide-based 3-drug regimen for ≥12 months after sputum culture conversion", empiric: ["rif", "emb", "amk", "azithro", "rfb"], empiricPrimary: ["rif", "emb", "amk", "azithro"], empiricAlternate: ["rfb"], sourceIds: ["ats-idsa-ntm-2020"], guidelineNotes: "PRIMARY: Nodular/bronchiectatic (non-cavitary): Azithromycin 500 mg PO 3×/week + RIF 600 mg PO 3×/week + EMB 25 mg/kg PO 3×/week (for ≥12 months after sputum culture conversion) | Cavitary or advanced/severe disease: Azithromycin 250–500 mg PO daily + RIF 10 mg/kg PO daily + EMB 15 mg/kg PO daily ± parenteral amikacin 15–25 mg/kg IV/IM 3×/week × 2–3 months initial — ALTERNATE: Clarithromycin 500 mg PO twice daily substituted for azithromycin if not tolerated (higher DDI risk with rifamycins) | Rifabutin 150–300 mg PO daily substituted for rifampin if better tolerated or drug interaction concerns | Add amikacin liposome inhalation suspension (ALIS) 590 mg inhaled daily if sputum culture positive after ≥6 months of guideline-based therapy (FDA-approved for refractory MAC) — ATS/ERS/ESCMID/IDSA 2020 guideline recommends 3-drug macrolide-based regimen for macrolide-susceptible MAC pulmonary disease. Azithromycin preferred over clarithromycin (less DDI, better tolerance, equal efficacy). Three-times-weekly dosing for non-cavitary nodular/bronchiectatic disease; daily regimen for cavitary or advanced disease. Add parenteral amikacin or streptomycin initial 2–3 months for cavitary, advanced, or macrolide-resistant MAC. Treat for ≥12 months after sputum culture conversion (not a fixed duration). Macrolide susceptibility testing mandatory before initiation. ALIS (Arikayce) approved for refractory MAC—add if culture-positive after 6 months of guideline therapy. Rifampin significantly reduces clarithromycin levels via CYP3A4; use azithromycin when rifampin included.", commonBugs: ["mavium"] },
  { id: "tb-mabscessus", name: "M. abscessus Pulmonary Disease", short: "Mabs-PD", category: "mycobacterial", blurb: "Rapidly growing NTM with intrinsic drug resistance; requires intensive IV-based initial phase followed by prolonged oral/inhaled continuation; prognosis guarded especially for M. abscessus subsp. abscessus", empiric: ["amk", "linezolid", "cfz", "azithro", "imr"], empiricPrimary: ["amk", "linezolid", "cfz", "azithro", "imr"], empiricAlternate: [], sourceIds: ["ats-idsa-ntm-2020"], guidelineNotes: "PRIMARY: Initial (intensive) phase — IV ≥4 weeks: Amikacin 15 mg/kg IV daily (or 3×/week) + Imipenem-cilastatin 500 mg IV q6h (or cefoxitin 12 g/day IV divided) + Azithromycin 500 mg PO daily (if macrolide-susceptible subsp. massiliense) ± Clofazimine 100 mg PO daily | Continuation phase: Azithromycin 250–500 mg PO daily + Clofazimine 100 mg PO daily + Linezolid 600 mg PO daily (if tolerated); continue ≥12 months after symptomatic improvement — ALTERNATE: Imipenem-cilastatin/relebactam 500/500/250 mg IV q6h if targeting beta-lactamase-producing strains or prior treatment failure | Tigecycline 50 mg IV daily (initial intensive phase; reserve for refractory/severe disease) | M. abscessus subsp. abscessus with inducible erm(41) macrolide resistance: macrolide for immunomodulation only (not counted as active drug); build ≥4 active drug regimen — M. abscessus pulmonary disease is guided by subspecies identification and macrolide susceptibility testing (erm(41) gene sequencing plus 14-day incubation). M. massiliense (non-functional erm gene) is macrolide-susceptible; M. abscessus/bolletii has functional erm → inducible macrolide resistance. Regimens include ≥3 active drugs in intensive phase (IV agents: amikacin, imipenem or cefoxitin, tigecycline) followed by oral continuation. No FDA-approved regimen; expert consultation required. Imipenem-cilastatin/relebactam (Recarbrio) used investigationally in refractory cases. Duration typically >12 months for continuation phase; intermittent multidrug courses used by some experts. Surgical resection considered for localized disease not responding to medical therapy.", commonBugs: ["mabscessus"] },
  { id: "tb-leprosy", name: "Leprosy (M. leprae MDT)", short: "Leprosy", category: "mycobacterial", blurb: "Chronic granulomatous skin and nerve disease caused by M. leprae; WHO multidrug therapy (MDT) with rifampicin + dapsone ± clofazimine; 6 months (PB) or 12 months (MB)", empiric: ["rif", "cfz", "azithro"], empiricPrimary: ["rif", "cfz"], empiricAlternate: ["azithro"], sourceIds: ["who-leprosy-2018"], guidelineNotes: "PRIMARY: Paucibacillary (PB) — 1–5 skin lesions, negative slit-skin smear: RIF 600 mg PO once monthly (supervised) + Dapsone 100 mg PO daily × 6 months | Multibacillary (MB) — ≥6 skin lesions or positive slit-skin smear: RIF 600 mg PO once monthly (supervised) + Clofazimine 300 mg PO once monthly (supervised) + Clofazimine 50 mg PO daily + Dapsone 100 mg PO daily × 12 months — ALTERNATE: RIF resistance or intolerance: Substitute ofloxacin 400 mg or clarithromycin 500 mg or minocycline 100 mg PO daily (consult leprosy specialist) | Dapsone hypersensitivity: substitute clofazimine 50 mg PO daily in PB regimen — WHO 2018 recommends the same 3-drug MDT for all leprosy patients (PB and MB differ only in duration: 6 vs. 12 months). Rifampicin given once monthly under supervision (once-monthly administration has shown no toxic effects and is well tolerated); dapsone and clofazimine given daily. PB patients receive only rifampicin and dapsone (clofazimine not included in PB regimen). Lepra reactions (Type 1 reversal reaction, Type 2 erythema nodosum leprosum) require additional corticosteroid therapy. Clofazimine causes reversible skin hyperpigmentation—counsel patients. Monitor CBC and G6PD status before dapsone. Slit-skin smear and clinical assessment at 6 and 12 months post-MDT; relapse is uncommon (<1% per year) but requires retreatment.", commonBugs: ["mleprae"] },
];

// ============== COVERAGE MATRIX ==============
// drugId × bugId → Coverage
// "primary" = orange (preferred/definitive), "alternate" = yellow, "none" = white

type CoverageMap = Record<string, Coverage>;

const C: Record<string, CoverageMap> = {};
const set = (drug: string, bug: string, c: Coverage) => {
  if (!C[drug]) C[drug] = {};
  C[drug][bug] = c;
};

// PCN G/V — Strep, Treponema, oral anaerobes, Neisseria
set("pcn", "strep", "primary"); set("pcn", "neisseria", "primary"); set("pcn", "anaerobes", "alternate");
set("pcn", "listeria", "alternate");

// Amox/Amp — Strep, enterococci, Listeria, some E. coli/H. flu
set("amox", "strep", "primary"); set("amox", "enterococcus", "primary"); set("amox", "listeria", "primary");
set("amox", "gnrs", "alternate"); set("amox", "neisseria", "primary"); set("amox", "anaerobes", "alternate");

// Naf/Ox — MSSA primary
set("naf", "mssa", "primary"); set("naf", "strep", "alternate");

// Diclox — MSSA oral
set("diclox", "mssa", "primary"); set("diclox", "strep", "alternate");

// Unasyn — adds anaerobes, MSSA, some GNRs
set("unasyn", "strep", "primary"); set("unasyn", "mssa", "primary"); set("unasyn", "anaerobes", "primary");
set("unasyn", "enterococcus", "primary"); set("unasyn", "gnrs", "primary"); set("unasyn", "neisseria", "primary");
set("unasyn", "listeria", "alternate");

// Augmentin
set("augmentin", "strep", "primary"); set("augmentin", "mssa", "primary"); set("augmentin", "anaerobes", "primary");
set("augmentin", "gnrs", "primary"); set("augmentin", "enterococcus", "alternate");

// Zosyn — broad including Pseudomonas, anaerobes
set("zosyn", "strep", "primary"); set("zosyn", "mssa", "primary"); set("zosyn", "enterococcus", "primary");
set("zosyn", "anaerobes", "primary"); set("zosyn", "gnrs", "primary"); set("zosyn", "pseudomonas", "primary");
set("zosyn", "escappm", "alternate"); set("zosyn", "esbl", "alternate"); set("zosyn", "neisseria", "primary");

// Cefazolin — MSSA, strep, some GNRs
set("cefazolin", "mssa", "primary"); set("cefazolin", "strep", "primary"); set("cefazolin", "gnrs", "primary");

// Cephalexin
set("cephalexin", "mssa", "primary"); set("cephalexin", "strep", "primary"); set("cephalexin", "gnrs", "alternate");

// Cefoxitin / cefotetan
set("cefoxitin", "mssa", "primary"); set("cefoxitin", "strep", "primary"); set("cefoxitin", "anaerobes", "primary");
set("cefoxitin", "gnrs", "primary"); set("cefoxitin", "neisseria", "primary");
set("cefotetan", "mssa", "primary"); set("cefotetan", "strep", "primary"); set("cefotetan", "anaerobes", "primary");
set("cefotetan", "gnrs", "primary");

// Ceftriaxone
set("ceftriaxone", "strep", "primary"); set("ceftriaxone", "mssa", "primary"); set("ceftriaxone", "gnrs", "primary");
set("ceftriaxone", "neisseria", "primary"); set("ceftriaxone", "esbl", "alternate");

// Ceftazidime
set("ceftazidime", "pseudomonas", "primary"); set("ceftazidime", "gnrs", "primary"); set("ceftazidime", "neisseria", "primary");

// Cefepime
set("cefepime", "strep", "primary"); set("cefepime", "mssa", "primary"); set("cefepime", "gnrs", "primary");
set("cefepime", "pseudomonas", "primary"); set("cefepime", "escappm", "primary"); set("cefepime", "neisseria", "primary");
set("cefepime", "esbl", "alternate");

// Ceftaroline — MRSA-active β-lactam
set("ceftaroline", "mrsa", "primary"); set("ceftaroline", "mssa", "primary"); set("ceftaroline", "strep", "primary");
set("ceftaroline", "gnrs", "primary");

// Ertapenem — broad except no Pseudomonas/enterococci
set("ertapenem", "strep", "primary"); set("ertapenem", "mssa", "primary"); set("ertapenem", "gnrs", "primary");
set("ertapenem", "esbl", "primary"); set("ertapenem", "anaerobes", "primary"); set("ertapenem", "escappm", "primary");
set("ertapenem", "neisseria", "primary");

// Meropenem — almost everything
set("meropenem", "strep", "primary"); set("meropenem", "mssa", "primary"); set("meropenem", "gnrs", "primary");
set("meropenem", "pseudomonas", "primary"); set("meropenem", "esbl", "primary"); set("meropenem", "escappm", "primary");
set("meropenem", "anaerobes", "primary"); set("meropenem", "enterococcus", "alternate"); set("meropenem", "neisseria", "primary");
set("meropenem", "listeria", "alternate");

// Aztreonam — GNRs only
set("aztreonam", "gnrs", "primary"); set("aztreonam", "pseudomonas", "primary"); set("aztreonam", "escappm", "primary");
set("aztreonam", "neisseria", "primary");

// Aminoglycosides — GNR + synergy
set("ag", "gnrs", "primary"); set("ag", "pseudomonas", "primary"); set("ag", "escappm", "primary");
set("ag", "esbl", "alternate"); set("ag", "enterococcus", "alternate");

// Cipro — GNRs + Pseudomonas; weak Strep pneumo
set("cipro", "gnrs", "primary"); set("cipro", "pseudomonas", "primary"); set("cipro", "atypicals", "primary");
set("cipro", "escappm", "primary"); set("cipro", "neisseria", "primary"); set("cipro", "esbl", "alternate");
set("cipro", "anaerobes", "alternate");

// Levo
set("levo", "strep", "primary"); set("levo", "atypicals", "primary"); set("levo", "gnrs", "primary");
set("levo", "pseudomonas", "alternate"); set("levo", "escappm", "primary"); set("levo", "mssa", "alternate");

// Moxi
set("moxi", "strep", "primary"); set("moxi", "atypicals", "primary"); set("moxi", "anaerobes", "primary");
set("moxi", "gnrs", "alternate"); set("moxi", "mssa", "alternate");

// Azithro
set("azithro", "strep", "alternate"); set("azithro", "atypicals", "primary"); set("azithro", "neisseria", "primary");

// Doxy
set("doxy", "atypicals", "primary"); set("doxy", "mrsa", "primary"); set("doxy", "mssa", "primary");
set("doxy", "strep", "alternate"); set("doxy", "gnrs", "alternate"); set("doxy", "neisseria", "alternate");

// Tige
set("tige", "mrsa", "primary"); set("tige", "mssa", "primary"); set("tige", "vre", "primary");
set("tige", "esbl", "primary"); set("tige", "anaerobes", "primary"); set("tige", "atypicals", "primary");
set("tige", "gnrs", "primary");

// Vanc IV
set("vanc", "mrsa", "primary"); set("vanc", "mssa", "primary"); set("vanc", "strep", "primary");
set("vanc", "enterococcus", "primary");

// Vanc PO
// (only C. diff — we don't have a "C. diff" bug ID; covered as "anaerobes" alternate)
set("vancpo", "anaerobes", "alternate");

// Dapto
set("dapto", "mrsa", "primary"); set("dapto", "mssa", "primary"); set("dapto", "vre", "primary");
set("dapto", "enterococcus", "primary"); set("dapto", "strep", "primary");

// Linezolid
set("linezolid", "mrsa", "primary"); set("linezolid", "mssa", "primary"); set("linezolid", "vre", "primary");
set("linezolid", "enterococcus", "primary"); set("linezolid", "strep", "primary");

// Metro
set("metro", "anaerobes", "primary");

// Clinda
set("clinda", "strep", "primary"); set("clinda", "mssa", "primary"); set("clinda", "mrsa", "alternate");
set("clinda", "anaerobes", "primary");

// TMP-SMX
set("tmpsmx", "mrsa", "primary"); set("tmpsmx", "mssa", "primary"); set("tmpsmx", "gnrs", "primary");
set("tmpsmx", "escappm", "alternate"); set("tmpsmx", "esbl", "alternate");

// Nitrofurantoin
set("nitro", "gnrs", "primary"); set("nitro", "enterococcus", "primary"); set("nitro", "esbl", "alternate");

// Fosfomycin
set("fosfo", "gnrs", "primary"); set("fosfo", "esbl", "primary"); set("fosfo", "enterococcus", "alternate");


// === TB / NTM / Leprosy coverage ===
set("inh", "mtb", "primary");
set("rif", "mtb", "primary");  set("rif", "mleprae", "primary");
set("pza", "mtb", "primary");
set("emb", "mtb", "primary");
set("rpt", "mtb", "primary");
set("rfb", "mtb", "alternate");
set("levo", "mtb", "alternate");
set("moxi", "mtb", "primary");
set("linezolid", "mtb", "alternate");
set("cfz", "mleprae", "primary");
set("cs", "mtb", "alternate");
set("eto", "mtb", "alternate");
set("azithro", "mtb", "alternate");  set("azithro", "mleprae", "alternate");

export const coverage = C;

export function getCoverage(drugId: string, bugId: string): Coverage {
  return C[drugId]?.[bugId] || "none";
}

export function getDrugById(id: string) { return drugs.find(d => d.id === id); }
export function getBugById(id: string) { return bugs.find(b => b.id === id); }
export function getSyndromeById(id: string) { return syndromes.find(s => s.id === id); }
export function getClassById(id: string) { return drugClasses.find(c => c.id === id); }
