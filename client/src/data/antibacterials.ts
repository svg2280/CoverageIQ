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
];

// ============== SYNDROMES ==============
export const syndromes: Syndrome[] = [
  { id: "skin-superficial", name: "Superficial skin/soft tissue", short: "Skin (superficial)", category: "skin",
    blurb: "Cellulitis, erysipelas, simple abscess. Usually strep or staph.",
    empiric: ["cephalexin", "diclox", "naf", "vanc", "clinda", "doxy", "tmpsmx"],
    empiricPrimary: ["cephalexin", "diclox", "naf"],
    empiricAlternate: ["vanc", "clinda", "doxy", "tmpsmx"],
    sourceIds: ["ssti-idsa-2014"],
    guidelineNotes: "Nonpurulent (cellulitis/erysipelas): cephalexin or dicloxacillin PO for mild; nafcillin or cefazolin IV for moderate-severe. MRSA risk: vancomycin IV or TMP-SMX/doxycycline/clindamycin PO. Purulent (abscess): incision & drainage is primary; add TMP-SMX or doxycycline if MRSA suspected. Impetigo: topical mupirocin or retapamulin; systemic cephalexin or amoxicillin-clavulanate for extensive disease. Duration 5 days for cellulitis (extend if not improving).",
    commonBugs: ["strep", "mssa", "mrsa"]},
  { id: "skin-deep", name: "Deep soft tissue, bone & hardware", short: "Skin/bone (deep)", category: "skin",
    blurb: "Necrotizing fasciitis, diabetic foot, hardware infections, osteomyelitis.",
    empiric: ["vanc", "zosyn", "meropenem", "linezolid", "clinda", "ceftriaxone", "metro"],
    empiricPrimary: ["vanc", "zosyn", "meropenem"],
    empiricAlternate: ["linezolid", "clinda", "ceftriaxone", "metro"],
    sourceIds: ["ssti-idsa-2014"],
    guidelineNotes: "Necrotizing fasciitis: emergent surgical debridement + broad-spectrum empiric antibiotics. Polymicrobial (Type I): vancomycin + piperacillin-tazobactam or carbapenem. Monomicrobial GAS (Type II): penicillin G + clindamycin. Suspected MRSA: add vancomycin or linezolid. Deep abscess/prosthetic joint: empiric vancomycin ± broad gram-negative coverage pending cultures; 6+ weeks for prosthetic joint infection.",
    commonBugs: ["mrsa", "mssa", "strep", "anaerobes", "pseudomonas", "gnrs"]},
  { id: "bone", name: "Osteomyelitis", category: "skin",
    blurb: "Native or hardware-associated bone infection.",
    empiric: ["vanc", "ceftriaxone", "naf", "cefazolin", "dapto", "linezolid", "cipro", "levo"],
    empiricPrimary: ["vanc", "ceftriaxone"],
    empiricAlternate: ["naf", "cefazolin", "dapto", "linezolid", "cipro", "levo"],
    sourceIds: ["nvo-idsa-2015"],
    guidelineNotes: "Empiric: vancomycin IV + ceftriaxone or 3rd-gen cephalosporin (gram-negative coverage) for severe/septic presentations; hold empiric antibiotics in stable patients without epidural abscess until bone biopsy cultures. MSSA: nafcillin or cefazolin. MRSA/CNS: vancomycin; alternatives daptomycin or linezolid. Gram-negative: ciprofloxacin PO or ceftriaxone IV. Duration: 6 weeks standard (vertebral osteomyelitis IDSA 2015).",
    commonBugs: ["mssa", "mrsa", "strep", "pseudomonas"]},
  { id: "line", name: "Line-associated bloodstream infection", short: "CLABSI", category: "bloodstream",
    blurb: "Catheter-related bacteremia. Skin and gut flora.",
    empiric: ["vanc", "cefepime", "dapto", "zosyn", "meropenem", "ag"],
    empiricPrimary: ["vanc", "cefepime"],
    empiricAlternate: ["dapto", "zosyn", "meropenem", "ag"],
    sourceIds: ["clabsi-idsa-2009"],
    guidelineNotes: "Empiric: vancomycin for gram-positive coverage (MRSA, CoNS). Add gram-negative coverage (cefepime, piperacillin-tazobactam, or carbapenem) based on local resistance patterns and severity. Remove catheter when feasible; essential for S. aureus, Candida, or persistent bacteremia. Duration: 14 days for uncomplicated S. aureus; 7-14 days for CoNS if catheter removed; 4-6 weeks for complicated IE or persistent bacteremia.",
    commonBugs: ["mrsa", "mssa", "vre", "pseudomonas", "escappm", "gnrs"]},
  { id: "endocarditis", name: "Endocarditis", category: "bloodstream",
    blurb: "Native and prosthetic valve infection.",
    empiric: ["naf", "vanc", "ceftriaxone", "dapto", "ag", "cefazolin", "linezolid", "zosyn"],
    empiricPrimary: ["naf", "vanc", "ceftriaxone"],
    empiricAlternate: ["dapto", "ag", "cefazolin", "linezolid", "zosyn"],
    sourceIds: ["ie-aha-2015"],
    guidelineNotes: "Native valve, MSSA: nafcillin 2g IV q4h x 6 weeks (cefazolin alternative for non-anaphylactic penicillin allergy). Native valve, MRSA: vancomycin x 6 weeks; daptomycin 6 mg/kg/day alternative. Streptococcal (PCN-susceptible): penicillin G or ceftriaxone x 4 weeks (2-week shortened course with gentamicin in uncomplicated NVE). Enterococcal: ampicillin + ceftriaxone x 6 weeks (preferred for HLAR), or ampicillin + gentamicin. Prosthetic valve: add rifampin to backbone agent x ≥6 weeks + gentamicin x 2 weeks. HACEK: ceftriaxone x 4 weeks NVE / 6 weeks PVE.",
    commonBugs: ["strep", "mssa", "mrsa", "enterococcus", "vre"]},
  { id: "meningitis", name: "Meningitis", category: "cns",
    blurb: "Bacterial meningitis. Empiric covers pneumococcus, meningococcus, Listeria.",
    empiric: ["ceftriaxone", "vanc", "meropenem", "ampho", "cefepime", "aztreonam"],
    empiricPrimary: ["ceftriaxone", "vanc"],
    empiricAlternate: ["meropenem", "ampho", "cefepime", "aztreonam"],
    sourceIds: ["meningitis-idsa-2004", "hcvm-idsa-2017"],
    guidelineNotes: "Empiric (community, adult): vancomycin + ceftriaxone (add ampicillin if age >50 or immunocompromised for Listeria coverage). Post-neurosurgical/healthcare-associated: vancomycin + cefepime or ceftazidime or meropenem (Pseudomonas coverage). Add dexamethasone 0.15 mg/kg q6h x 4 days (start with or before first antibiotic dose) for pneumococcal meningitis. Duration: S. pneumoniae 10-14 days; N. meningitidis 7 days; Listeria 21+ days; gram-negative bacilli 21 days.",
    commonBugs: ["strep", "neisseria", "listeria", "gnrs"]},
  { id: "cap", name: "Community-acquired pneumonia", short: "CAP", category: "respiratory",
    blurb: "Outpatient or non-ICU inpatient. Pneumococcus + atypicals dominate.",
    empiric: ["ceftriaxone", "azithro", "levo", "moxi", "doxy", "amox", "unasyn", "ceftaroline"],
    empiricPrimary: ["ceftriaxone", "azithro"],
    empiricAlternate: ["levo", "moxi", "doxy", "amox", "unasyn", "ceftaroline"],
    sourceIds: ["cap-ats-idsa-2019"],
    guidelineNotes: "Outpatient, no comorbidities: amoxicillin 1g TID, OR doxycycline 100mg BID, OR azithromycin/clarithromycin (if local pneumococcal resistance <25%). Outpatient with comorbidities: amoxicillin-clavulanate or cephalosporin + macrolide, OR respiratory FQ monotherapy (levofloxacin or moxifloxacin). Inpatient non-severe (non-ICU): beta-lactam (ceftriaxone, cefotaxime, unasyn, or ceftaroline) + azithromycin OR respiratory FQ monotherapy. Inpatient severe (ICU): beta-lactam + macrolide OR beta-lactam + respiratory FQ. Minimum 5 days (clinical stability required). No routine anaerobic coverage unless lung abscess/empyema.",
    commonBugs: ["strep", "atypicals", "mssa", "gnrs"]},
  { id: "hcap", name: "HAP / HCAP", category: "respiratory",
    blurb: "Hospital-acquired pneumonia (≥48h after admission).",
    empiric: ["zosyn", "cefepime", "meropenem", "vanc", "linezolid", "aztreonam", "levo"],
    empiricPrimary: ["zosyn", "cefepime", "meropenem"],
    empiricAlternate: ["vanc", "linezolid", "aztreonam", "levo"],
    sourceIds: ["hap-vap-idsa-2016"],
    guidelineNotes: "HAP (non-ventilated): All patients need coverage for S. aureus and gram-negatives. No MRSA risk factors: piperacillin-tazobactam, cefepime, levofloxacin, imipenem, or meropenem. MRSA risk factors (prior IV antibiotics, septic shock, structural lung disease, high local prevalence): add vancomycin or linezolid. Avoid aminoglycosides as single agent for HAP. Duration 7 days. Local antibiogram should guide coverage.",
    commonBugs: ["pseudomonas", "mrsa", "mssa", "escappm", "gnrs"]},
  { id: "vap", name: "Ventilator-associated pneumonia", short: "VAP", category: "respiratory",
    blurb: "Pneumonia >48h after intubation. Broad empiric, narrow on cultures.",
    empiric: ["zosyn", "cefepime", "meropenem", "vanc", "linezolid", "aztreonam", "ag", "cipro"],
    empiricPrimary: ["zosyn", "cefepime", "meropenem"],
    empiricAlternate: ["vanc", "linezolid", "aztreonam", "ag", "cipro"],
    sourceIds: ["hap-vap-idsa-2016"],
    guidelineNotes: "All VAP: antipseudomonal beta-lactam (piperacillin-tazobactam, cefepime, or carbapenem) as backbone. MRSA risk (≥5 days hospitalization before VAP, prior IV antibiotics, renal replacement therapy): add vancomycin or linezolid; otherwise MRSA coverage not required. MDR risk or high local resistance (>10% of gram-negatives resistant to preferred agent, prior IV antibiotics within 90 days): use TWO antipseudomonal agents from different classes. Duration: 7 days.",
    commonBugs: ["pseudomonas", "mrsa", "escappm", "esbl", "gnrs"]},
  { id: "aspiration", name: "Aspiration pneumonia", category: "respiratory",
    blurb: "Anaerobic + oral flora coverage. Often community.",
    empiric: ["ceftriaxone", "azithro", "unasyn", "levo", "moxi", "doxy", "clinda", "metro"],
    empiricPrimary: ["ceftriaxone", "azithro", "unasyn"],
    empiricAlternate: ["levo", "moxi", "doxy", "clinda", "metro"],
    sourceIds: ["cap-ats-idsa-2019"],
    guidelineNotes: "Community-onset aspiration pneumonia: treat per 2019 ATS/IDSA CAP guidelines — standard CAP regimens (beta-lactam + macrolide or FQ monotherapy). Anaerobic coverage NOT routinely added unless lung abscess or empyema is suspected (very low quality evidence). Hospital-onset aspiration: treat as HAP. Classic aspiration pleuropulmonary syndrome (loss of consciousness + gingival disease): unasyn or add metronidazole to standard regimen. Minimum 5 days, extend for abscess/empyema.",
    commonBugs: ["strep", "anaerobes", "atypicals", "mssa"]},
  { id: "biliary", name: "Biliary tract infection", category: "intraabd",
    blurb: "Cholangitis, cholecystitis. Gut flora.",
    empiric: ["zosyn", "ceftriaxone", "meropenem", "ertapenem", "cipro", "metro", "unasyn"],
    empiricPrimary: ["zosyn", "ceftriaxone"],
    empiricAlternate: ["meropenem", "ertapenem", "cipro", "metro", "unasyn"],
    sourceIds: ["tokyo-2018", "iab-idsa-2010"],
    guidelineNotes: "Mild (Grade I) cholangitis/cholecystitis: ampicillin-sulbactam or cephalosporin ± metronidazole. Moderate-severe (Grade II-III): piperacillin-tazobactam, or ceftriaxone + metronidazole, or carbapenem (meropenem or ertapenem) for severe/healthcare-associated. Biliary drainage essential for Grade II-III cholangitis. Duration: 4-7 days after source control per Tokyo Guidelines 2018; cholecystectomy is definitive treatment for cholecystitis.",
    commonBugs: ["gnrs", "esbl", "enterococcus", "anaerobes", "escappm"]},
  { id: "intraabd-spontaneous", name: "Spontaneous intraperitoneal", short: "SBP", category: "intraabd",
    blurb: "Spontaneous bacterial peritonitis (cirrhosis).",
    empiric: ["ceftriaxone", "zosyn", "cipro", "meropenem"],
    empiricPrimary: ["ceftriaxone"],
    empiricAlternate: ["zosyn", "cipro", "meropenem"],
    sourceIds: ["sbp-aasld-2021"],
    guidelineNotes: "Community-acquired SBP: ceftriaxone 1-2g IV q24h (or IV cefotaxime 2g q8h) for 5-7 days. Nosocomial SBP or critically ill: piperacillin-tazobactam or carbapenem (meropenem). Add vancomycin if MRSA risk (prior MRSA, IV antibiotics within 90 days, septic shock). Albumin infusion (1.5 g/kg at diagnosis, 1 g/kg on day 3) reduces renal failure and mortality. Prophylaxis post-SBP: ciprofloxacin 500 mg/day or TMP-SMX long-term.",
    commonBugs: ["gnrs", "strep", "anaerobes"]},
  { id: "intraabd-secondary", name: "Secondary intraabdominal", category: "intraabd",
    blurb: "Perforation, abscess, post-surgical. Polymicrobial.",
    empiric: ["zosyn", "ceftriaxone", "metro", "meropenem", "ertapenem", "cipro", "tige"],
    empiricPrimary: ["zosyn", "ceftriaxone", "metro"],
    empiricAlternate: ["meropenem", "ertapenem", "cipro", "tige"],
    sourceIds: ["iab-idsa-2010"],
    guidelineNotes: "Community-acquired, mild-moderate: ceftriaxone + metronidazole, or piperacillin-tazobactam, or ciprofloxacin + metronidazole, or ertapenem. Severe/healthcare-associated: meropenem or piperacillin-tazobactam + coverage for ESBL/resistant organisms based on local epidemiology. Source control (drainage, debridement, or surgery) is essential. Duration: 4-7 days after adequate source control; 24 hours if perforation identified and surgically addressed within 12 hours.",
    commonBugs: ["gnrs", "esbl", "anaerobes", "enterococcus", "escappm"]},
  { id: "gi", name: "GI / colitis", category: "gi",
    blurb: "C. diff, traveler's diarrhea, invasive Salmonella/Shigella.",
    empiric: ["vancpo", "metro", "cipro", "levo", "doxy", "azithro"],
    empiricPrimary: ["vancpo", "metro"],
    empiricAlternate: ["cipro", "levo", "doxy", "azithro"],
    sourceIds: ["cdi-idsa-2021"],
    guidelineNotes: "C. difficile infection (initial episode): fidaxomicin 200 mg PO BID x 10 days (preferred); vancomycin 125 mg PO QID x 10 days (acceptable alternative); metronidazole 500 mg TID x 10 days only if fidaxomicin/vancomycin unavailable. Fulminant CDI: vancomycin 500 mg PO/NG QID + metronidazole 500 mg IV q8h; consider rectal vancomycin if ileus. Recurrent CDI: fidaxomicin preferred. Traveler's diarrhea: ciprofloxacin or azithromycin x 3 days. Shigella: ciprofloxacin or azithromycin. Salmonella (non-typhi, if treatment indicated): ciprofloxacin or ceftriaxone.",
    commonBugs: ["anaerobes", "gnrs"]},
  { id: "lower-gu", name: "Lower GU (cystitis)", category: "gu",
    blurb: "Uncomplicated cystitis.",
    empiric: ["nitro", "tmpsmx", "fosfo", "cipro", "levo", "augmentin", "cephalexin"],
    empiricPrimary: ["nitro", "tmpsmx", "fosfo"],
    empiricAlternate: ["cipro", "levo", "augmentin", "cephalexin"],
    sourceIds: ["uti-idsa-2011"],
    guidelineNotes: "First-line: nitrofurantoin monohydrate/macrocrystals 100 mg BID x 5 days (avoid if GFR <30), TMP-SMX DS BID x 3 days (avoid if local resistance >20%), or fosfomycin trometamol 3g single dose. Fluoroquinolones (ciprofloxacin, levofloxacin) are highly effective but reserved for important uses due to collateral damage risk. Beta-lactams (cephalexin, augmentin) are less effective than preferred agents. Urine culture not routinely needed for uncomplicated premenopausal women.",
    commonBugs: ["gnrs", "esbl", "enterococcus"]},
  { id: "upper-gu", name: "Upper GU (pyelo)", category: "gu",
    blurb: "Pyelonephritis. Need tissue penetration.",
    empiric: ["cipro", "levo", "ceftriaxone", "tmpsmx", "ag", "zosyn"],
    empiricPrimary: ["cipro", "levo"],
    empiricAlternate: ["ceftriaxone", "tmpsmx", "ag", "zosyn"],
    sourceIds: ["uti-idsa-2011"],
    guidelineNotes: "Outpatient: ciprofloxacin 500 mg BID x 7 days or levofloxacin 750 mg daily x 5 days (first-line if local FQ resistance <10%); if FQ resistance ≥10%, give initial IV ceftriaxone 1g or aminoglycoside dose then switch to oral FQ or TMP-SMX (based on sensitivities) x 14 days. Inpatient: IV fluoroquinolone, or aminoglycoside ± ampicillin, or extended-spectrum cephalosporin/penicillin; transition to oral when improving. Duration: FQ 5-7 days; beta-lactam 10-14 days.",
    commonBugs: ["gnrs", "esbl", "enterococcus", "pseudomonas", "escappm"]},
  { id: "gu-instr", name: "GU with instrumentation", category: "gu",
    blurb: "Post-procedural UTI. Broader resistance patterns.",
    empiric: ["ceftriaxone", "cefepime", "cipro", "zosyn", "meropenem", "levo", "ag"],
    empiricPrimary: ["ceftriaxone", "cefepime", "cipro", "zosyn"],
    empiricAlternate: ["meropenem", "levo", "ag"],
    sourceIds: ["cuti-idsa-2025"],
    guidelineNotes: "Empiric selection follows a 4-step approach: (1) Assess severity (sepsis vs. non-sepsis); (2) Consider patient-specific resistance risk factors (prior resistant cultures, prior FQ exposure within 12 months); (3) Consider patient-specific adverse effect risk; (4) For septic patients, consult local antibiogram. Non-septic cUTI: cephalosporins (3rd/4th gen), piperacillin-tazobactam, or FQ. Septic cUTI: carbapenems, cephalosporins, pip-tazo, or FQ. Duration: 5-7 days FQ or 7 days non-FQ. Definitive therapy guided by urine culture.",
    commonBugs: ["pseudomonas", "esbl", "escappm", "vre", "enterococcus"]},
  { id: "zoonotic-sti", name: "Zoonotics & STIs", category: "other",
    blurb: "Rickettsia, Borrelia, gonorrhea, chlamydia, syphilis.",
    empiric: ["doxy", "ceftriaxone", "azithro", "amox", "pcn", "levo", "moxi"],
    empiricPrimary: ["doxy", "ceftriaxone", "azithro"],
    empiricAlternate: ["amox", "pcn", "levo", "moxi"],
    sourceIds: ["lyme-idsa-2020", "sti-cdc-2021"],
    guidelineNotes: "Lyme disease (early, erythema migrans): doxycycline 100 mg BID x 10 days OR amoxicillin 500 mg TID x 14 days OR cefuroxime axetil 500 mg BID x 14 days. Neurologic Lyme: IV ceftriaxone 2g/day x 14-21 days. RMSF/Ehrlichiosis: doxycycline 100 mg BID x 5-7 days (drug of choice; safe in children). Gonorrhea (uncomplicated urogenital/rectal): ceftriaxone 500 mg IM single dose (1g if >150 kg). Chlamydia: doxycycline 100 mg BID x 7 days (preferred over azithromycin). Syphilis (primary/secondary/early latent): benzathine penicillin G 2.4 million units IM x 1; late latent/unknown duration: benzathine PCN G weekly x 3 doses.",
    commonBugs: ["atypicals", "neisseria"]},
  { id: "neutropenic", name: "Febrile neutropenia", category: "other",
    blurb: "Fever in neutropenic host. Broad empiric.",
    empiric: ["cefepime", "zosyn", "meropenem", "vanc", "cipro", "levo", "augmentin", "ag"],
    empiricPrimary: ["cefepime", "zosyn", "meropenem"],
    empiricAlternate: ["vanc", "cipro", "levo", "augmentin", "ag"],
    sourceIds: ["fn-idsa-2010"],
    guidelineNotes: "High-risk (anticipated prolonged neutropenia >7 days, ANC <100, MASCC <21): IV empiric monotherapy with antipseudomonal beta-lactam — cefepime 2g IV q8h, piperacillin-tazobactam 4.5g IV q6h, or meropenem 1g IV q8h. Add vancomycin only if: hemodynamic instability, skin/catheter-site infection, suspected GPC bacteremia, or MRSA risk factors. Low-risk (MASCC ≥21, anticipated neutropenia ≤7 days): oral ciprofloxacin + amoxicillin-clavulanate (or clindamycin if PCN allergic). Empiric antifungal if persistent fever after 4-7 days of antibiotics and prolonged neutropenia expected.",
    commonBugs: ["pseudomonas", "escappm", "mrsa", "vre", "esbl", "gnrs"]},
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

export const coverage = C;

export function getCoverage(drugId: string, bugId: string): Coverage {
  return C[drugId]?.[bugId] || "none";
}

export function getDrugById(id: string) { return drugs.find(d => d.id === id); }
export function getBugById(id: string) { return bugs.find(b => b.id === id); }
export function getSyndromeById(id: string) { return syndromes.find(s => s.id === id); }
export function getClassById(id: string) { return drugClasses.find(c => c.id === id); }
