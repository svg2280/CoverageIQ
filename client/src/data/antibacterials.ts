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
  empiric: string[]; // drug IDs
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
    empiric: ["cephalexin", "diclox", "tmpsmx", "doxy", "clinda"],
    commonBugs: ["strep", "mssa", "mrsa"]},
  { id: "skin-deep", name: "Deep soft tissue, bone & hardware", short: "Skin/bone (deep)", category: "skin",
    blurb: "Necrotizing fasciitis, diabetic foot, hardware infections, osteomyelitis.",
    empiric: ["vanc", "zosyn", "clinda"],
    commonBugs: ["mrsa", "mssa", "strep", "anaerobes", "pseudomonas", "gnrs"]},
  { id: "bone", name: "Osteomyelitis", category: "skin",
    blurb: "Native or hardware-associated bone infection.",
    empiric: ["vanc", "ceftriaxone", "dapto"],
    commonBugs: ["mssa", "mrsa", "strep", "pseudomonas"]},
  { id: "line", name: "Line-associated bloodstream infection", short: "CLABSI", category: "bloodstream",
    blurb: "Catheter-related bacteremia. Skin and gut flora.",
    empiric: ["vanc", "cefepime"],
    commonBugs: ["mrsa", "mssa", "vre", "pseudomonas", "escappm", "gnrs"]},
  { id: "endocarditis", name: "Endocarditis", category: "bloodstream",
    blurb: "Native and prosthetic valve infection.",
    empiric: ["vanc", "ceftriaxone", "ag"],
    commonBugs: ["strep", "mssa", "mrsa", "enterococcus", "vre"]},
  { id: "meningitis", name: "Meningitis", category: "cns",
    blurb: "Bacterial meningitis. Empiric covers pneumococcus, meningococcus, Listeria.",
    empiric: ["ceftriaxone", "vanc", "amox"],
    commonBugs: ["strep", "neisseria", "listeria", "gnrs"]},
  { id: "cap", name: "Community-acquired pneumonia", short: "CAP", category: "respiratory",
    blurb: "Outpatient or non-ICU inpatient. Pneumococcus + atypicals dominate.",
    empiric: ["ceftriaxone", "azithro", "levo", "doxy"],
    commonBugs: ["strep", "atypicals", "mssa", "gnrs"]},
  { id: "hcap", name: "HAP / HCAP", category: "respiratory",
    blurb: "Hospital-acquired pneumonia (≥48h after admission).",
    empiric: ["zosyn", "cefepime", "vanc", "linezolid"],
    commonBugs: ["pseudomonas", "mrsa", "mssa", "escappm", "gnrs"]},
  { id: "vap", name: "Ventilator-associated pneumonia", short: "VAP", category: "respiratory",
    blurb: "Pneumonia >48h after intubation. Broad empiric, narrow on cultures.",
    empiric: ["zosyn", "cefepime", "vanc", "ag"],
    commonBugs: ["pseudomonas", "mrsa", "escappm", "esbl", "gnrs"]},
  { id: "aspiration", name: "Aspiration pneumonia", category: "respiratory",
    blurb: "Anaerobic + oral flora coverage. Often community.",
    empiric: ["unasyn", "augmentin", "moxi", "clinda"],
    commonBugs: ["strep", "anaerobes", "atypicals", "mssa"]},
  { id: "biliary", name: "Biliary tract infection", category: "intraabd",
    blurb: "Cholangitis, cholecystitis. Gut flora.",
    empiric: ["zosyn", "ceftriaxone", "metro"],
    commonBugs: ["gnrs", "esbl", "enterococcus", "anaerobes", "escappm"]},
  { id: "intraabd-spontaneous", name: "Spontaneous intraperitoneal", short: "SBP", category: "intraabd",
    blurb: "Spontaneous bacterial peritonitis (cirrhosis).",
    empiric: ["ceftriaxone"],
    commonBugs: ["gnrs", "strep", "anaerobes"]},
  { id: "intraabd-secondary", name: "Secondary intraabdominal", category: "intraabd",
    blurb: "Perforation, abscess, post-surgical. Polymicrobial.",
    empiric: ["zosyn", "ertapenem", "metro", "ceftriaxone"],
    commonBugs: ["gnrs", "esbl", "anaerobes", "enterococcus", "escappm"]},
  { id: "gi", name: "GI / colitis", category: "gi",
    blurb: "C. diff, traveler's diarrhea, invasive Salmonella/Shigella.",
    empiric: ["vancpo", "metro", "cipro"],
    commonBugs: ["anaerobes", "gnrs"]},
  { id: "lower-gu", name: "Lower GU (cystitis)", category: "gu",
    blurb: "Uncomplicated cystitis.",
    empiric: ["nitro", "fosfo", "tmpsmx", "cephalexin"],
    commonBugs: ["gnrs", "esbl", "enterococcus"]},
  { id: "upper-gu", name: "Upper GU (pyelo)", category: "gu",
    blurb: "Pyelonephritis. Need tissue penetration.",
    empiric: ["ceftriaxone", "cipro", "ertapenem"],
    commonBugs: ["gnrs", "esbl", "enterococcus", "pseudomonas", "escappm"]},
  { id: "gu-instr", name: "GU with instrumentation", category: "gu",
    blurb: "Post-procedural UTI. Broader resistance patterns.",
    empiric: ["zosyn", "cefepime", "vanc"],
    commonBugs: ["pseudomonas", "esbl", "escappm", "vre", "enterococcus"]},
  { id: "zoonotic-sti", name: "Zoonotics & STIs", category: "other",
    blurb: "Rickettsia, Borrelia, gonorrhea, chlamydia, syphilis.",
    empiric: ["doxy", "ceftriaxone", "azithro", "pcn"],
    commonBugs: ["atypicals", "neisseria"]},
  { id: "neutropenic", name: "Febrile neutropenia", category: "other",
    blurb: "Fever in neutropenic host. Broad empiric.",
    empiric: ["cefepime", "zosyn", "meropenem", "vanc"],
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
