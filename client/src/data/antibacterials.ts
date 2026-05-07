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
  blurb_es?: string;
  mechanism: string;
  mechanism_es?: string;
  spectrum: string;
  spectrum_es?: string;
  pearls: string[];
  pearls_es?: string[];
  doseAdult: string;
  doseAdult_es?: string;
  route: string[]; // ["IV", "PO"]
  pregnancy?: "safe" | "caution" | "avoid";
}

export interface DrugClass {
  id: string;
  name: string;
  color: string; // class accent
  blurb: string;
  blurb_es?: string;
}

export interface Bug {
  id: string;
  name: string;
  category: string; // gram-pos, gram-neg, atypical, anaerobe
  shape: "coccus" | "rod" | "spirochete" | "atypical" | "anaerobe";
  blurb: string;
  blurb_es?: string;
  pearls: string[];
  pearls_es?: string[];
  syndromes: string[]; // syndrome IDs commonly caused
}

export interface Syndrome {
  id: string;
  name: string;
  short?: string;
  category: string;
  blurb: string;
  blurb_es?: string;
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
  guidelineNotes_es?: string;
  commonBugs: string[]; // bug IDs
}

// ============== DRUG CLASSES ==============
export const drugClasses: DrugClass[] = [
  {
    id: "penicillin", name: "Penicillins", color: "#5fb3d4",
    blurb: "β-lactams. Bind PBPs, lyse cell wall.",
    blurb_es: "β-lactámicos. Se unen a PBPs y lisan la pared celular.",
  },
  {
    id: "cephalosporin", name: "Cephalosporins", color: "#5e9bd4",
    blurb: "β-lactams across 5 generations. Broader with each gen.",
    blurb_es: "β-lactámicos en 5 generaciones. Espectro más amplio con cada generación.",
  },
  {
    id: "carbapenem", name: "Carbapenems", color: "#7b6fd4",
    blurb: "Big-gun β-lactams. Last-line for resistant GNRs.",
    blurb_es: "β-lactámicos de gran espectro. Última línea para bacilos gramnegativos resistentes.",
  },
  {
    id: "monobactam", name: "Monobactams", color: "#a06fd4",
    blurb: "Aztreonam. Gram-neg only. Penicillin-allergy friendly.",
    blurb_es: "Aztreonam. Solo gramnegativos. Apto en alergia a penicilina.",
  },
  {
    id: "fluoroquinolone", name: "Fluoroquinolones", color: "#d46f9e",
    blurb: "Inhibit DNA gyrase. Broad. Black-box warnings.",
    blurb_es: "Inhiben la DNA girasa. Amplio espectro. Alertas de caja negra.",
  },
  {
    id: "aminoglycoside", name: "Aminoglycosides", color: "#d47d6f",
    blurb: "Concentration-dependent killers. Synergy + GNR coverage.",
    blurb_es: "Bactericidas concentración-dependientes. Sinergia y cobertura de gramnegativos.",
  },
  {
    id: "macrolide", name: "Macrolides", color: "#d4a86f",
    blurb: "Atypicals + respiratory. Azithro shines for CAP.",
    blurb_es: "Atípicos y respiratorio. Azithromycin destaca en la NAC.",
  },
  {
    id: "tetracycline", name: "Tetracyclines", color: "#c4d46f",
    blurb: "Bacteriostatic. Atypicals, MRSA (skin), tick-borne.",
    blurb_es: "Bacteriostáticos. Atípicos, SARM (piel), enfermedades transmitidas por garrapatas.",
  },
  {
    id: "glycopeptide", name: "Glycopeptides", color: "#6fd49e",
    blurb: "Vancomycin. MRSA + gram-positive workhorses.",
    blurb_es: "Vancomycin. Pilar terapéutico para SARM y grampositivos.",
  },
  {
    id: "lipopeptide", name: "Lipopeptides", color: "#6fd4c4",
    blurb: "Daptomycin. MRSA bacteremia. Inactivated by surfactant — not for pneumonia.",
    blurb_es: "Daptomycin. Bacteriemia por SARM. Inactivado por surfactante — no usar en neumonía.",
  },
  {
    id: "oxazolidinone", name: "Oxazolidinones", color: "#6fc4d4",
    blurb: "Linezolid. Bacteriostatic. Excellent MRSA + VRE.",
    blurb_es: "Linezolid. Bacteriostático. Excelente contra SARM y ERV.",
  },
  {
    id: "nitroimidazole", name: "Nitroimidazoles", color: "#9e6fd4",
    blurb: "Metronidazole. Anaerobes + protozoa.",
    blurb_es: "Metronidazole. Anaerobios y protozoos.",
  },
  {
    id: "lincosamide", name: "Lincosamides", color: "#d46fc4",
    blurb: "Clindamycin. Anaerobes above the diaphragm + toxin suppression.",
    blurb_es: "Clindamycin. Anaerobios por encima del diafragma y supresión de toxinas.",
  },
  {
    id: "sulfa", name: "Sulfas", color: "#d4c46f",
    blurb: "TMP-SMX. PJP, MRSA skin, UTIs, Stenotrophomonas.",
    blurb_es: "TMP-SMX. PJP, SARM cutáneo, ITU, Stenotrophomonas.",
  },
  {
    id: "urinary", name: "Urinary Agents", color: "#d49e6f",
    blurb: "Nitrofurantoin / fosfomycin. Bladder-only.",
    blurb_es: "Nitrofurantoin / fosfomycin. Solo para vejiga (sin penetración tisular).",
  },
];

// ============== DRUGS ==============
export const drugs: Drug[] = [
  // Penicillins
  {
    id: "pcn", name: "Penicillin G/V", classId: "penicillin",
    blurb: "OG β-lactam. Strep, Treponema, Listeria.",
    blurb_es: "β-lactámico de primera generación. Strep, Treponema, Listeria.",
    mechanism: "Binds PBPs → cell wall lysis",
    mechanism_es: "Se une a PBPs → lisis de la pared celular",
    spectrum: "Strep spp, Treponema, oral anaerobes, Listeria",
    spectrum_es: "Streptococcus spp., Treponema, anaerobios orales, Listeria",
    pearls: ["Still first-line for syphilis & strep throat", "IV PCN G for strep bacteremia"],
    pearls_es: ["Sigue siendo de primera línea para sífilis y faringitis estreptocócica", "PCN G IV para bacteriemia por estreptococo"],
    doseAdult: "PCN G 2-4M U IV q4h",
    doseAdult_es: "PCN G 2–4 M U IV cada 4 h",
    route: ["IV", "PO"], pregnancy: "safe",
  },
  {
    id: "amox", name: "Amoxicillin / Ampicillin", classId: "penicillin",
    blurb: "Aminopenicillins. Adds Listeria, some H. flu, enterococci.",
    blurb_es: "Aminopenicilinas. Agrega cobertura para Listeria, algunos H. influenzae y enterococos.",
    mechanism: "Binds PBPs",
    mechanism_es: "Se une a PBPs",
    spectrum: "Strep, enterococci, Listeria, some E. coli/H. flu",
    spectrum_es: "Streptococcus, enterococos, Listeria, algunos E. coli/H. influenzae",
    pearls: ["Ampicillin = drug of choice for Listeria meningitis", "Add gentamicin for enterococcal endocarditis synergy"],
    pearls_es: ["Ampicillin = fármaco de elección para meningitis por Listeria", "Agregar gentamicin para sinergia en endocarditis enterocócica"],
    doseAdult: "Amp 2g IV q4h",
    doseAdult_es: "Ampicillin 2 g IV cada 4 h",
    route: ["IV", "PO"], pregnancy: "safe",
  },
  {
    id: "naf", name: "Nafcillin / Oxacillin", classId: "penicillin",
    blurb: "Antistaph PCNs. MSSA killers — DOC for MSSA bacteremia/endocarditis.",
    blurb_es: "Penicilinas antiestafilocócicas. Fármacos de elección para bacteriemia/endocarditis por SASM.",
    mechanism: "Binds PBPs of MSSA",
    mechanism_es: "Se une a PBPs de SASM",
    spectrum: "MSSA, Strep",
    spectrum_es: "SASM, Streptococcus",
    pearls: ["Beats vancomycin for MSSA bacteremia", "Watch for AIN, hepatitis"],
    pearls_es: ["Superior a vancomycin en bacteriemia por SASM", "Vigilar nefritis intersticial aguda y hepatitis"],
    doseAdult: "2g IV q4h",
    doseAdult_es: "2 g IV cada 4 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "diclox", name: "Dicloxacillin", classId: "penicillin",
    blurb: "Oral antistaph PCN. MSSA cellulitis.",
    blurb_es: "Penicilina antiestafilocócica oral. Celulitis por SASM.",
    mechanism: "Binds PBPs",
    mechanism_es: "Se une a PBPs",
    spectrum: "MSSA, Strep",
    spectrum_es: "SASM, Streptococcus",
    pearls: ["Take on empty stomach"],
    pearls_es: ["Tomar con el estómago vacío"],
    doseAdult: "500 mg PO q6h",
    doseAdult_es: "500 mg VO cada 6 h",
    route: ["PO"], pregnancy: "safe",
  },
  {
    id: "unasyn", name: "Ampicillin-Sulbactam (Unasyn)", classId: "penicillin",
    blurb: "Aminopenicillin + β-lactamase inhibitor. Mouth/bite/aspiration favorite.",
    blurb_es: "Aminopenicilina + inhibidor de β-lactamasa. Favorito para mordeduras y neumonía aspirativa.",
    mechanism: "Sulbactam blocks β-lactamases",
    mechanism_es: "Sulbactam bloquea las β-lactamasas",
    spectrum: "Above + S. aureus (MSSA), oral anaerobes, many GNRs",
    spectrum_es: "Lo anterior + S. aureus (SASM), anaerobios orales, muchos bacilos gramnegativos",
    pearls: ["Great for human/animal bites", "Aspiration pneumonia"],
    pearls_es: ["Excelente para mordeduras humanas o de animales", "Neumonía aspirativa"],
    doseAdult: "3g IV q6h",
    doseAdult_es: "3 g IV cada 6 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "augmentin", name: "Amoxicillin-Clavulanate (Augmentin)", classId: "penicillin",
    blurb: "Oral version of Unasyn-ish. Sinusitis, otitis, bites.",
    blurb_es: "Versión oral similar a Unasyn. Sinusitis, otitis, mordeduras.",
    mechanism: "Clavulanate blocks β-lactamases",
    mechanism_es: "Clavulanato bloquea las β-lactamasas",
    spectrum: "Strep, MSSA, oral anaerobes, H. flu",
    spectrum_es: "Streptococcus, SASM, anaerobios orales, H. influenzae",
    pearls: ["GI upset is the #1 limiter — take with food"],
    pearls_es: ["El malestar gastrointestinal es la principal limitante — tomar con comida"],
    doseAdult: "875/125 mg PO BID",
    doseAdult_es: "875/125 mg VO cada 12 h",
    route: ["PO"], pregnancy: "safe",
  },
  {
    id: "zosyn", name: "Piperacillin-Tazobactam (Zosyn)", classId: "penicillin",
    blurb: "Workhorse broad-spectrum. Pseudomonas + anaerobes.",
    blurb_es: "Antibiótico de amplio espectro y uso frecuente. Cubre Pseudomonas y anaerobios.",
    mechanism: "Anti-pseudomonal PCN + β-lactamase inhibitor",
    mechanism_es: "Penicilina antipseudomónica + inhibidor de β-lactamasa",
    spectrum: "Strep, MSSA, enterococci, GNRs incl Pseudomonas, anaerobes",
    spectrum_es: "Streptococcus, SASM, enterococos, bacilos gramnegativos incluido Pseudomonas, anaerobios",
    pearls: ["Empiric sepsis go-to with vanc", "Watch AKI risk with vanc combo"],
    pearls_es: ["Tratamiento empírico de sepsis junto con vancomycin", "Vigilar riesgo de injuria renal aguda en combinación con vancomycin"],
    doseAdult: "4.5g IV q6-8h (extended infusion)",
    doseAdult_es: "4,5 g IV cada 6–8 h (infusión extendida)",
    route: ["IV"], pregnancy: "safe",
  },

  // Cephalosporins
  {
    id: "cefazolin", name: "Cefazolin", short: "Cefaz", classId: "cephalosporin",
    blurb: "1st gen IV. MSSA + strep. Surgical prophylaxis king.",
    blurb_es: "1.ª generación IV. SASM y estreptococo. Estándar de oro para profilaxis quirúrgica.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "MSSA, Strep, some GNRs (E. coli, K. pneumo, Proteus)",
    spectrum_es: "SASM, Streptococcus, algunos gramnegativos (E. coli, K. pneumoniae, Proteus)",
    pearls: ["Equivalent to nafcillin for MSSA", "Crosses BBB poorly — not for meningitis"],
    pearls_es: ["Equivalente a nafcillin para SASM", "Mala penetración en BHE — no usar para meningitis"],
    doseAdult: "2g IV q8h",
    doseAdult_es: "2 g IV cada 8 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "cephalexin", name: "Cephalexin", short: "Keflex", classId: "cephalosporin",
    blurb: "1st gen PO. Cellulitis, simple UTI.",
    blurb_es: "1.ª generación VO. Celulitis, ITU simple.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "MSSA, Strep, some GNRs",
    spectrum_es: "SASM, Streptococcus, algunos gramnegativos",
    pearls: ["First-line outpatient cellulitis"],
    pearls_es: ["Primera línea para celulitis ambulatoria"],
    doseAdult: "500 mg PO QID",
    doseAdult_es: "500 mg VO cada 6 h",
    route: ["PO"], pregnancy: "safe",
  },
  {
    id: "cefoxitin", name: "Cefoxitin", classId: "cephalosporin",
    blurb: "2nd gen cephamycin. Anaerobic coverage.",
    blurb_es: "Cefamicina de 2.ª generación. Cobertura anaeróbica.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "MSSA, Strep, GNRs, B. fragilis",
    spectrum_es: "SASM, Streptococcus, gramnegativos, B. fragilis",
    pearls: ["Useful intra-abdominal alternative", "Second-line PID"],
    pearls_es: ["Alternativa útil en infecciones intraabdominales", "Segunda línea en enfermedad inflamatoria pélvica"],
    doseAdult: "2g IV q6h",
    doseAdult_es: "2 g IV cada 6 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "cefotetan", name: "Cefotetan", classId: "cephalosporin",
    blurb: "2nd gen cephamycin. Like cefoxitin.",
    blurb_es: "Cefamicina de 2.ª generación. Similar a cefoxitin.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "Same as cefoxitin",
    spectrum_es: "Similar a cefoxitin",
    pearls: ["MTT side chain → disulfiram-like rxn with alcohol"],
    pearls_es: ["Cadena lateral MTT → reacción similar al disulfiram con alcohol"],
    doseAdult: "2g IV q12h",
    doseAdult_es: "2 g IV cada 12 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "ceftriaxone", name: "Ceftriaxone", short: "CTX", classId: "cephalosporin",
    blurb: "3rd gen. CAP, meningitis, GC, pyelo. Once-daily wonder.",
    blurb_es: "3.ª generación. NAC, meningitis, gonococo, pielonefritis. Dosificación una vez al día.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "Strep (incl pneumo), GNRs, N. gonorrhoeae",
    spectrum_es: "Streptococcus (incluido pneumoniae), gramnegativos, N. gonorrhoeae",
    pearls: ["NO Pseudomonas", "Avoid in neonates — biliary sludge"],
    pearls_es: ["SIN cobertura para Pseudomonas", "Evitar en neonatos — riesgo de barro biliar"],
    doseAdult: "1-2g IV daily (2g for CNS/endocarditis)",
    doseAdult_es: "1–2 g IV una vez al día (2 g para SNC/endocarditis)",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "ceftazidime", name: "Ceftazidime", classId: "cephalosporin",
    blurb: "3rd gen with Pseudomonas. Weak gram-positive.",
    blurb_es: "3.ª generación con cobertura para Pseudomonas. Débil contra grampositivos.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "GNRs incl Pseudomonas",
    spectrum_es: "Gramnegativos incluido Pseudomonas",
    pearls: ["Combo with avibactam for KPC/CRE"],
    pearls_es: ["Combinación con avibactam para KPC/CRE"],
    doseAdult: "2g IV q8h",
    doseAdult_es: "2 g IV cada 8 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "cefepime", name: "Cefepime", classId: "cephalosporin",
    blurb: "4th gen. Pseudomonas + AmpC. Neutropenic fever staple.",
    blurb_es: "4.ª generación. Pseudomonas y AmpC. Pilar en fiebre neutropénica.",
    mechanism: "PBP binding, stable to AmpC β-lactamases",
    mechanism_es: "Unión a PBPs; estable frente a β-lactamasas AmpC",
    spectrum: "Strep, MSSA, GNRs incl Pseudomonas, ESCAPPM",
    spectrum_es: "Streptococcus, SASM, gramnegativos incluido Pseudomonas, ESCAPPM",
    pearls: ["Watch neurotoxicity in renal impairment", "First-line febrile neutropenia"],
    pearls_es: ["Vigilar neurotoxicidad en insuficiencia renal", "Primera línea en fiebre neutropénica"],
    doseAdult: "2g IV q8h",
    doseAdult_es: "2 g IV cada 8 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "ceftaroline", name: "Ceftaroline", classId: "cephalosporin",
    blurb: "5th gen. The only β-lactam that hits MRSA.",
    blurb_es: "5.ª generación. El único β-lactámico con actividad frente a SARM.",
    mechanism: "Binds modified PBP2a",
    mechanism_es: "Se une a PBP2a modificada",
    spectrum: "MRSA, MSSA, Strep, many GNRs (no Pseudomonas)",
    spectrum_es: "SARM, SASM, Streptococcus, muchos gramnegativos (sin Pseudomonas)",
    pearls: ["Salvage MRSA bacteremia", "No Pseudomonas, no enterococci"],
    pearls_es: ["Tratamiento de rescate en bacteriemia por SARM", "Sin cobertura para Pseudomonas ni enterococos"],
    doseAdult: "600 mg IV q12h (q8h for severe)",
    doseAdult_es: "600 mg IV cada 12 h (cada 8 h en casos graves)",
    route: ["IV"], pregnancy: "caution",
  },

  // Carbapenems / monobactam
  {
    id: "ertapenem", name: "Ertapenem", classId: "carbapenem",
    blurb: "Once-daily carbapenem. NO Pseudomonas/enterococci.",
    blurb_es: "Carbapenem de dosis única diaria. SIN cobertura para Pseudomonas ni enterococos.",
    mechanism: "Binds multiple PBPs",
    mechanism_es: "Se une a múltiples PBPs",
    spectrum: "GNRs incl ESBL, anaerobes, Strep, MSSA",
    spectrum_es: "Gramnegativos incluido BLEE, anaerobios, Streptococcus, SASM",
    pearls: ["ESBL UTI/intra-abd workhorse", "Outpatient OPAT friendly"],
    pearls_es: ["Fármaco de referencia en ITU/intraabdominal por BLEE", "Apto para terapia IV ambulatoria (OPAT)"],
    doseAdult: "1g IV daily",
    doseAdult_es: "1 g IV una vez al día",
    route: ["IV"], pregnancy: "caution",
  },
  {
    id: "meropenem", name: "Meropenem / Imipenem / Doripenem", short: "Mero", classId: "carbapenem",
    blurb: "Big guns. ESBL, AmpC, Pseudomonas.",
    blurb_es: "Artillería pesada. BLEE, AmpC, Pseudomonas.",
    mechanism: "PBP binding",
    mechanism_es: "Unión a PBPs",
    spectrum: "Almost everything except MRSA, VRE, Stenotrophomonas, atypicals",
    spectrum_es: "Casi todo excepto SARM, ERV, Stenotrophomonas y atípicos",
    pearls: ["Imipenem ↑ seizure risk", "Add vanc for empiric coverage"],
    pearls_es: ["Imipenem aumenta el riesgo de convulsiones", "Agregar vancomycin para cobertura empírica grampositiva"],
    doseAdult: "Mero 1g IV q8h (2g q8h for CNS)",
    doseAdult_es: "Meropenem 1 g IV cada 8 h (2 g cada 8 h para SNC)",
    route: ["IV"], pregnancy: "caution",
  },
  {
    id: "aztreonam", name: "Aztreonam", classId: "monobactam",
    blurb: "Gram-neg only. Safe in PCN allergy (except ceftazidime).",
    blurb_es: "Solo gramnegativos. Seguro en alergia a penicilina (excepto si hay alergia a ceftazidime).",
    mechanism: "PBP3 binding (GNRs only)",
    mechanism_es: "Unión a PBP3 (solo gramnegativos)",
    spectrum: "GNRs incl Pseudomonas",
    spectrum_es: "Gramnegativos incluido Pseudomonas",
    pearls: ["No gram-positive, no anaerobes", "Cross-reacts with ceftazidime side chain"],
    pearls_es: ["Sin cobertura para grampositivos ni anaerobios", "Reactividad cruzada con la cadena lateral de ceftazidime"],
    doseAdult: "2g IV q8h",
    doseAdult_es: "2 g IV cada 8 h",
    route: ["IV"], pregnancy: "safe",
  },

  // Aminoglycosides
  {
    id: "ag", name: "Gentamicin / Tobramycin / Amikacin", short: "AG", classId: "aminoglycoside",
    blurb: "GNR killers. Nephro/ototoxic. Synergy for endocarditis.",
    blurb_es: "Bactericidas contra gramnegativos. Nefro/ototóxicos. Sinergia en endocarditis.",
    mechanism: "30S ribosome → misreading",
    mechanism_es: "Subunidad 30S del ribosoma → lectura errónea del ARNm",
    spectrum: "GNRs (gent/tobra/amik), Pseudomonas (tobra/amik)",
    spectrum_es: "Gramnegativos (gentamicin/tobramycin/amikacin), Pseudomonas (tobramycin/amikacin)",
    pearls: ["Once-daily extended-interval dosing standard", "Add to ampicillin for enterococcal endocarditis"],
    pearls_es: ["Dosificación estándar una vez al día con intervalo extendido", "Agregar a ampicillin para sinergia en endocarditis enterocócica"],
    doseAdult: "Gent 5-7 mg/kg IV q24h",
    doseAdult_es: "Gentamicin 5–7 mg/kg IV cada 24 h",
    route: ["IV"], pregnancy: "avoid",
  },

  // Fluoroquinolones
  {
    id: "cipro", name: "Ciprofloxacin", classId: "fluoroquinolone",
    blurb: "GNR-leaning FQ. UTIs, traveler's diarrhea, Pseudomonas (PO option).",
    blurb_es: "Fluoroquinolona con mayor cobertura gramnegativa. ITU, diarrea del viajero, Pseudomonas (opción VO).",
    mechanism: "DNA gyrase / topo IV inhibition",
    mechanism_es: "Inhibición de DNA girasa / topoisomerasa IV",
    spectrum: "GNRs incl Pseudomonas, atypicals (weak Strep pneumo)",
    spectrum_es: "Gramnegativos incluido Pseudomonas, atípicos (débil contra Streptococcus pneumoniae)",
    pearls: ["NOT for CAP — weak pneumococcus", "Tendon rupture, QTc, dysglycemia"],
    pearls_es: ["NO usar en NAC — débil contra neumococo", "Riesgo de rotura tendinosa, prolongación del QTc y disglucemia"],
    doseAdult: "500-750 mg PO BID / 400 mg IV q8-12h",
    doseAdult_es: "500–750 mg VO cada 12 h / 400 mg IV cada 8–12 h",
    route: ["IV", "PO"], pregnancy: "avoid",
  },
  {
    id: "levo", name: "Levofloxacin", classId: "fluoroquinolone",
    blurb: "Respiratory FQ. CAP, UTI, atypicals.",
    blurb_es: "Fluoroquinolona respiratoria. NAC, ITU, atípicos.",
    mechanism: "DNA gyrase inhibition",
    mechanism_es: "Inhibición de DNA girasa",
    spectrum: "Strep pneumo, atypicals, GNRs incl Pseudomonas",
    spectrum_es: "Streptococcus pneumoniae, atípicos, gramnegativos incluido Pseudomonas",
    pearls: ["750 mg daily for 5d = standard CAP", "Same FQ class warnings"],
    pearls_es: ["750 mg una vez al día por 5 días = NAC estándar", "Mismas advertencias de clase que otras fluoroquinolonas"],
    doseAdult: "750 mg IV/PO daily",
    doseAdult_es: "750 mg IV/VO una vez al día",
    route: ["IV", "PO"], pregnancy: "avoid",
  },
  {
    id: "moxi", name: "Moxifloxacin", classId: "fluoroquinolone",
    blurb: "Respiratory FQ + anaerobes. NO Pseudomonas, NO renal dose adjust.",
    blurb_es: "Fluoroquinolona respiratoria con cobertura anaeróbica. SIN Pseudomonas; sin ajuste de dosis renal.",
    mechanism: "DNA gyrase inhibition",
    mechanism_es: "Inhibición de DNA girasa",
    spectrum: "Strep, atypicals, anaerobes, some GNRs",
    spectrum_es: "Streptococcus, atípicos, anaerobios, algunos gramnegativos",
    pearls: ["No urinary excretion — don't use for UTI", "QTc prolongation"],
    pearls_es: ["Sin excreción urinaria — no usar para ITU", "Prolongación del QTc"],
    doseAdult: "400 mg IV/PO daily",
    doseAdult_es: "400 mg IV/VO una vez al día",
    route: ["IV", "PO"], pregnancy: "avoid",
  },

  // Macrolides
  {
    id: "azithro", name: "Azithromycin / Erythromycin", short: "Azithro", classId: "macrolide",
    blurb: "Atypicals + outpatient strep alt. Z-pak ubiquity.",
    blurb_es: "Atípicos y alternativa ambulatoria para estreptococo. Z-pak de uso extendido.",
    mechanism: "50S ribosome",
    mechanism_es: "Subunidad 50S del ribosoma",
    spectrum: "Strep, atypicals (Mycoplasma, Chlamydia, Legionella), some MSSA",
    spectrum_es: "Streptococcus, atípicos (Mycoplasma, Chlamydia, Legionella), algunos SASM",
    pearls: ["Resistance high — pair with β-lactam for inpatient CAP", "QTc warning"],
    pearls_es: ["Alta resistencia — combinar con β-lactámico en NAC hospitalaria", "Advertencia de prolongación del QTc"],
    doseAdult: "500 mg IV/PO daily",
    doseAdult_es: "500 mg IV/VO una vez al día",
    route: ["IV", "PO"], pregnancy: "safe",
  },

  // Tetracyclines
  {
    id: "doxy", name: "Doxycycline", classId: "tetracycline",
    blurb: "Tick-borne, atypicals, CAP, MRSA skin.",
    blurb_es: "Enfermedades por garrapatas, atípicos, NAC, SARM cutáneo.",
    mechanism: "30S ribosome",
    mechanism_es: "Subunidad 30S del ribosoma",
    spectrum: "Atypicals, Rickettsiae, Borrelia, MRSA (skin), CAP",
    spectrum_es: "Atípicos, Rickettsiae, Borrelia, SARM (piel), NAC",
    pearls: ["First-line tick-borne illness", "Photo-sensitivity, esophagitis"],
    pearls_es: ["Primera línea en enfermedades transmitidas por garrapatas", "Fotosensibilidad y esofagitis"],
    doseAdult: "100 mg PO BID",
    doseAdult_es: "100 mg VO cada 12 h",
    route: ["IV", "PO"], pregnancy: "avoid",
  },
  {
    id: "tige", name: "Tigecycline", classId: "tetracycline",
    blurb: "Glycylcycline. Broad — but NO Pseudomonas, NO bacteremia.",
    blurb_es: "Glicilciclina. Amplio espectro — pero SIN Pseudomonas y NO usar en bacteriemia.",
    mechanism: "30S binding",
    mechanism_es: "Unión a subunidad 30S",
    spectrum: "MRSA, VRE, ESBL, anaerobes, atypicals",
    spectrum_es: "SARM, ERV, BLEE, anaerobios, atípicos",
    pearls: ["Black-box: increased mortality vs comparators", "Avoid in bacteremia"],
    pearls_es: ["Alerta de caja negra: mayor mortalidad frente a comparadores", "Evitar en bacteriemia"],
    doseAdult: "100 mg IV load → 50 mg IV q12h",
    doseAdult_es: "100 mg IV dosis de carga → 50 mg IV cada 12 h",
    route: ["IV"], pregnancy: "avoid",
  },

  // Glycopeptides / lipopeptides / oxazolidinones
  {
    id: "vanc", name: "Vancomycin (IV)", classId: "glycopeptide",
    blurb: "MRSA workhorse + gram-positives.",
    blurb_es: "Pilar terapéutico para SARM y grampositivos.",
    mechanism: "Binds D-Ala-D-Ala",
    mechanism_es: "Se une al dipéptido D-Ala-D-Ala de la pared celular",
    spectrum: "MRSA, MSSA, Strep, enterococci (NOT VRE), C. diff (PO)",
    spectrum_es: "SARM, SASM, Streptococcus, enterococos (NO ERV), C. difficile (VO)",
    pearls: ["Trough 15-20 for serious infections (or AUC-guided)", "Red-man syndrome: slow infusion, premedicate"],
    pearls_es: ["Valle 15–20 mg/L en infecciones graves (o guiado por AUC)", "Síndrome del hombre rojo: infusión lenta, premedicar"],
    doseAdult: "15-20 mg/kg IV q8-12h",
    doseAdult_es: "15–20 mg/kg IV cada 8–12 h",
    route: ["IV"], pregnancy: "safe",
  },
  {
    id: "vancpo", name: "Vancomycin PO", classId: "glycopeptide",
    blurb: "C. diff only. Not absorbed.",
    blurb_es: "Solo para C. difficile. No se absorbe sistémicamente.",
    mechanism: "Same — but stays in gut",
    mechanism_es: "Mismo mecanismo — pero actúa solo en el intestino",
    spectrum: "C. difficile",
    spectrum_es: "C. difficile",
    pearls: ["Now first-line over metronidazole for C. diff"],
    pearls_es: ["Actualmente de primera línea frente a metronidazole para C. difficile"],
    doseAdult: "125 mg PO QID x 10d",
    doseAdult_es: "125 mg VO cada 6 h por 10 días",
    route: ["PO"], pregnancy: "safe",
  },
  {
    id: "dapto", name: "Daptomycin", classId: "lipopeptide",
    blurb: "MRSA bacteremia, VRE. Inactivated by lung surfactant.",
    blurb_es: "Bacteriemia por SARM y ERV. Inactivado por surfactante pulmonar.",
    mechanism: "Membrane depolarization",
    mechanism_es: "Despolarización de la membrana celular bacteriana",
    spectrum: "MRSA, MSSA, VRE, Strep",
    spectrum_es: "SARM, SASM, ERV, Streptococcus",
    pearls: ["Don't use for pneumonia (surfactant inactivation)", "Watch CK weekly"],
    pearls_es: ["No usar en neumonía (inactivación por surfactante)", "Monitorear creatinina-cinasa (CK) semanalmente"],
    doseAdult: "6-10 mg/kg IV daily",
    doseAdult_es: "6–10 mg/kg IV una vez al día",
    route: ["IV"], pregnancy: "caution",
  },
  {
    id: "linezolid", name: "Linezolid", classId: "oxazolidinone",
    blurb: "MRSA, VRE. Oral bioavailable. Watch serotonin syndrome.",
    blurb_es: "SARM, ERV. Alta biodisponibilidad oral. Vigilar síndrome serotoninérgico.",
    mechanism: "50S ribosome",
    mechanism_es: "Subunidad 50S del ribosoma",
    spectrum: "MRSA, MSSA, VRE, Strep, mycobacteria",
    spectrum_es: "SARM, SASM, ERV, Streptococcus, micobacterias",
    pearls: ["MAOI — risk SS with SSRIs", "Cytopenias after >2 weeks"],
    pearls_es: ["IMAO — riesgo de síndrome serotoninérgico con ISRS", "Citopenias con uso mayor a 2 semanas"],
    doseAdult: "600 mg IV/PO q12h",
    doseAdult_es: "600 mg IV/VO cada 12 h",
    route: ["IV", "PO"], pregnancy: "caution",
  },

  // Metronidazole / clindamycin
  {
    id: "metro", name: "Metronidazole", classId: "nitroimidazole",
    blurb: "Anaerobes (below diaphragm), protozoa.",
    blurb_es: "Anaerobios (por debajo del diafragma) y protozoos.",
    mechanism: "DNA disruption in anaerobic env",
    mechanism_es: "Daño al ADN en ambiente anaeróbico",
    spectrum: "Anaerobes, Trichomonas, Giardia, C. diff",
    spectrum_es: "Anaerobios, Trichomonas, Giardia, C. difficile",
    pearls: ["Disulfiram rxn with alcohol", "Peripheral neuropathy with chronic use"],
    pearls_es: ["Reacción tipo disulfiram con alcohol", "Neuropatía periférica con uso crónico"],
    doseAdult: "500 mg IV/PO q8h",
    doseAdult_es: "500 mg IV/VO cada 8 h",
    route: ["IV", "PO"], pregnancy: "caution",
  },
  {
    id: "clinda", name: "Clindamycin", classId: "lincosamide",
    blurb: "Anaerobes above diaphragm + toxin suppression in TSS/necrotizing.",
    blurb_es: "Anaerobios por encima del diafragma y supresión de toxinas en síndrome de choque tóxico/fascitis necrotizante.",
    mechanism: "50S ribosome",
    mechanism_es: "Subunidad 50S del ribosoma",
    spectrum: "Strep, MSSA, MRSA (varies), oral anaerobes",
    spectrum_es: "Streptococcus, SASM, SARM (variable), anaerobios orales",
    pearls: ["Add for toxin suppression in nec fasc / TSS", "C. diff risk highest of any antibiotic"],
    pearls_es: ["Agregar para supresión de toxinas en fascitis necrotizante/síndrome de choque tóxico", "Mayor riesgo de C. difficile de todos los antibióticos"],
    doseAdult: "600-900 mg IV q8h / 300-450 mg PO QID",
    doseAdult_es: "600–900 mg IV cada 8 h / 300–450 mg VO cada 6 h",
    route: ["IV", "PO"], pregnancy: "safe",
  },

  // Sulfas / urinary
  {
    id: "tmpsmx", name: "TMP-SMX (Bactrim)", classId: "sulfa",
    blurb: "PJP, MRSA skin, UTI, Stenotrophomonas.",
    blurb_es: "PJP, SARM cutáneo, ITU, Stenotrophomonas.",
    mechanism: "Folate synthesis blockade (sequential)",
    mechanism_es: "Bloqueo secuencial de la síntesis de folato",
    spectrum: "MRSA, MSSA, GNRs, PJP, Stenotrophomonas, Nocardia",
    spectrum_es: "SARM, SASM, gramnegativos, PJP, Stenotrophomonas, Nocardia",
    pearls: ["Hyperkalemia, AKI, SJS", "First-line PJP prophylaxis & treatment"],
    pearls_es: ["Hipercalemia, injuria renal aguda, síndrome de Stevens-Johnson", "Primera línea para profilaxis y tratamiento de PJP"],
    doseAdult: "1-2 DS PO BID; PJP: 15-20 mg/kg/d TMP IV",
    doseAdult_es: "1–2 comprimidos DS VO cada 12 h; PJP: 15–20 mg/kg/día de TMP IV",
    route: ["IV", "PO"], pregnancy: "avoid",
  },
  {
    id: "nitro", name: "Nitrofurantoin", classId: "urinary",
    blurb: "Bladder UTI only. No tissue penetration.",
    blurb_es: "Solo para cistitis. Sin penetración tisular.",
    mechanism: "Bacterial enzyme inhibition",
    mechanism_es: "Inhibición de enzimas bacterianas",
    spectrum: "E. coli, Enterococcus (incl some VRE), Klebs",
    spectrum_es: "E. coli, Enterococcus (incluido algunos ERV), Klebsiella",
    pearls: ["Don't use if CrCl <30", "Pulmonary fibrosis with chronic use"],
    pearls_es: ["No usar si depuración de creatinina < 30 mL/min", "Fibrosis pulmonar con uso crónico"],
    doseAdult: "100 mg PO BID x 5d",
    doseAdult_es: "100 mg VO cada 12 h por 5 días",
    route: ["PO"], pregnancy: "caution",
  },
  {
    id: "fosfo", name: "Fosfomycin", classId: "urinary",
    blurb: "Single-dose oral UTI. Active vs ESBL.",
    blurb_es: "ITU con dosis única oral. Activo frente a BLEE.",
    mechanism: "MurA inhibition",
    mechanism_es: "Inhibición de MurA (síntesis de pared celular)",
    spectrum: "E. coli (incl ESBL), enterococci",
    spectrum_es: "E. coli (incluido BLEE), enterococos",
    pearls: ["3g PO once for uncomplicated cystitis"],
    pearls_es: ["3 g VO dosis única para cistitis no complicada"],
    doseAdult: "3g PO x1",
    doseAdult_es: "3 g VO dosis única",
    route: ["PO"], pregnancy: "safe",
  },
  {
    id: "imr", name: "Imipenem-cilastatin/relebactam", classId: "carbapenem",
    blurb: "Carbapenem + relebactam. M. abscessus intensive-phase salvage.",
    blurb_es: "Carbapenem + relebactam. Tratamiento de rescate en fase intensiva para M. abscessus.",
    mechanism: "Imipenem inhibits PBPs (penicillin-binding proteins) blocking cell wall synthesis; cilastatin inhibits renal tubular dehydropeptidase I (prevents imipenem degradation); relebactam inhibits class A and C beta-lactamases, expanding spectrum",
    mechanism_es: "Imipenem inhibe las PBPs bloqueando la síntesis de pared celular; cilastatin inhibe la dehidropeptidasa I tubular renal (previene la degradación de imipenem); relebactam inhibe β-lactamasas de clase A y C, ampliando el espectro",
    spectrum: "M. abscessus (intensive phase) + broad GNR/anaerobe (general carbapenem use)",
    spectrum_es: "M. abscessus (fase intensiva) + amplia cobertura de gramnegativos/anaerobios (uso general como carbapenem)",
    pearls: [
      "Used in combination for M. abscessus intensive phase (typically 4–12 weeks); administer with at least 2–3 other active oral agents",
      "Relebactam extends activity against class A and C beta-lactamases—synergistic with amikacin against M. abscessus",
      "Adjust dose for renal impairment per CrCl (creatinine clearance-based tables in PI)",
      "No oral formulation available—requires IV access during intensive phase",
    ],
    pearls_es: [
      "Se usa en combinación para la fase intensiva de M. abscessus (generalmente 4–12 semanas); administrar junto con al menos 2–3 agentes orales activos adicionales",
      "Relebactam extiende la actividad frente a β-lactamasas de clase A y C — efecto sinérgico con amikacin contra M. abscessus",
      "Ajustar dosis según insuficiencia renal conforme a la depuración de creatinina (tablas en la ficha técnica)",
      "No disponible en formulación oral — requiere acceso IV durante la fase intensiva",
    ],
    doseAdult: "Imipenem-cilastatin 500 mg IV q6h + relebactam 250 mg IV q6h (1.25 g combination q6h in adults with CrCl ≥90 mL/min; dose-reduce in renal impairment); used in intensive phase of M. abscessus regimen",
    doseAdult_es: "Imipenem-cilastatin 500 mg IV cada 6 h + relebactam 250 mg IV cada 6 h (combinación 1,25 g cada 6 h en adultos con depuración de creatinina ≥ 90 mL/min; reducir dosis en insuficiencia renal); se usa en la fase intensiva del régimen para M. abscessus",
    route: ["IV"],
  },
];

// ============== BUGS ==============
export const bugs: Bug[] = [
  // Gram-positive cocci (top row in BugDrugDX layout)
  {
    id: "mrsa", name: "MRSA", category: "gram-pos", shape: "coccus",
    blurb: "Methicillin-resistant Staph aureus. Skin, bone, blood, lungs.",
    blurb_es: "Staphylococcus aureus resistente a meticilina (SARM). Piel, hueso, sangre, pulmones.",
    pearls: ["Vanc, dapto, linezolid, ceftaroline IV", "TMP-SMX or doxy for outpatient skin", "Clindamycin if D-test negative"],
    pearls_es: ["Vancomycin, daptomycin, linezolid, ceftaroline IV", "TMP-SMX o doxycycline para infecciones cutáneas ambulatorias", "Clindamycin si la prueba D es negativa"],
    syndromes: ["skin-superficial", "skin-deep", "line", "endocarditis", "hcap", "vap", "bone"],
  },
  {
    id: "mssa", name: "MSSA", category: "gram-pos", shape: "coccus",
    blurb: "Methicillin-susceptible S. aureus. Same disease, better drugs.",
    blurb_es: "Staphylococcus aureus sensible a meticilina (SASM). Misma enfermedad, mejores fármacos.",
    pearls: ["Nafcillin or cefazolin > vancomycin for bacteremia", "Cefazolin = lower nephrotoxicity, similar efficacy"],
    pearls_es: ["Nafcillin o cefazolin superiores a vancomycin para bacteriemia", "Cefazolin = menor nefrotoxicidad con eficacia similar"],
    syndromes: ["skin-superficial", "skin-deep", "line", "endocarditis", "cap", "hcap", "bone"],
  },
  {
    id: "strep", name: "Streptococcus", category: "gram-pos", shape: "coccus",
    blurb: "GAS, pneumoniae, viridans, agalactiae. Wide tent.",
    blurb_es: "Estreptococo grupo A, pneumoniae, viridans, agalactiae. Espectro clínico amplio.",
    pearls: ["Penicillin still works for most", "Add clindamycin for toxin suppression in nec fasc"],
    pearls_es: ["Penicilina sigue siendo eficaz para la mayoría", "Agregar clindamycin para supresión de toxinas en fascitis necrotizante"],
    syndromes: ["skin-superficial", "skin-deep", "endocarditis", "meningitis", "cap", "aspiration"],
  },
  {
    id: "enterococcus", name: "Enterococcus", category: "gram-pos", shape: "coccus",
    blurb: "E. faecalis (more drug-susceptible) and E. faecium (often VRE).",
    blurb_es: "E. faecalis (más sensible a fármacos) y E. faecium (frecuentemente ERV).",
    pearls: ["Ampicillin DOC for E. faecalis", "Add gentamicin for endocarditis synergy"],
    pearls_es: ["Ampicillin es el fármaco de elección para E. faecalis", "Agregar gentamicin para sinergia en endocarditis"],
    syndromes: ["endocarditis", "lower-gu", "upper-gu", "biliary", "intraabd-secondary"],
  },
  {
    id: "vre", name: "VRE", category: "gram-pos", shape: "coccus",
    blurb: "Vancomycin-resistant enterococci. Mostly E. faecium in hospitalized hosts.",
    blurb_es: "Enterococos resistentes a vancomycin (ERV). Predominantemente E. faecium en pacientes hospitalizados.",
    pearls: ["Linezolid or daptomycin", "VRE bacteremia: dapto >8 mg/kg or linezolid"],
    pearls_es: ["Linezolid o daptomycin", "Bacteriemia por ERV: daptomycin > 8 mg/kg o linezolid"],
    syndromes: ["line", "endocarditis", "upper-gu", "biliary", "intraabd-secondary", "neutropenic"],
  },

  // Anaerobes
  {
    id: "anaerobes", name: "Anaerobes", category: "anaerobe", shape: "anaerobe",
    blurb: "Bacteroides, Prevotella, Peptostrep, Fusobacterium. Above & below the diaphragm.",
    blurb_es: "Bacteroides, Prevotella, Peptostreptococcus, Fusobacterium. Por encima y por debajo del diafragma.",
    pearls: ["Above diaphragm = clinda/PCN; below = metro", "B. fragilis = the canonical below-diaphragm anaerobe"],
    pearls_es: ["Por encima del diafragma = clindamycin/penicilina; por debajo = metronidazole", "B. fragilis = el anaerobio abdominal por excelencia"],
    syndromes: ["aspiration", "biliary", "intraabd-spontaneous", "intraabd-secondary", "skin-deep"],
  },

  // Gram-negative — bottom row
  {
    id: "pseudomonas", name: "Pseudomonas", category: "gram-neg", shape: "rod",
    blurb: "P. aeruginosa. Hospital-associated; loves wet places (lungs, urine, skin).",
    blurb_es: "P. aeruginosa. Asociada a entornos hospitalarios; frecuente en lugares húmedos (pulmones, orina, piel).",
    pearls: ["Pip-tazo, cefepime, ceftaz, mero, AGs, cipro", "Double-cover for septic shock or neutropenia"],
    pearls_es: ["Piperacillin-tazobactam, cefepime, ceftazidime, meropenem, aminoglucósidos, ciprofloxacin", "Doble cobertura en choque séptico o neutropenia"],
    syndromes: ["hcap", "vap", "line", "skin-deep", "upper-gu", "neutropenic", "bone"],
  },
  {
    id: "escappm", name: "ESCAPPM (AmpC)", category: "gram-neg", shape: "rod",
    blurb: "Enterobacter, Serratia, Citrobacter, Aeromonas, Providencia, Proteus vulgaris, Morganella.",
    blurb_es: "Enterobacter, Serratia, Citrobacter, Aeromonas, Providencia, Proteus vulgaris, Morganella.",
    pearls: ["Inducible AmpC — avoid 3rd-gen ceph as monotherapy", "Cefepime, carbapenem, FQ, TMP-SMX safer"],
    pearls_es: ["AmpC inducible — evitar cefalosporinas de 3.ª generación en monoterapia", "Cefepime, carbapenémicos, fluoroquinolonas y TMP-SMX son opciones más seguras"],
    syndromes: ["line", "hcap", "vap", "upper-gu", "biliary", "intraabd-secondary"],
  },
  {
    id: "esbl", name: "ESBL", category: "gram-neg", shape: "rod",
    blurb: "Extended-spectrum β-lactamase E. coli, Klebsiella, Proteus.",
    blurb_es: "E. coli, Klebsiella y Proteus productores de β-lactamasas de espectro extendido (BLEE).",
    pearls: ["Carbapenem is workhorse", "Pip-tazo OK for uncomplicated UTI but not bacteremia"],
    pearls_es: ["Carbapenémico es el tratamiento de referencia", "Piperacillin-tazobactam aceptable en ITU no complicada, pero no en bacteriemia"],
    syndromes: ["upper-gu", "lower-gu", "biliary", "intraabd-secondary", "hcap"],
  },
  {
    id: "gnrs", name: "Other GNRs", category: "gram-neg", shape: "rod",
    blurb: "E. coli, Klebsiella, Proteus mirabilis, H. influenzae, Moraxella.",
    blurb_es: "E. coli, Klebsiella, Proteus mirabilis, H. influenzae, Moraxella.",
    pearls: ["Most CAP/UTI/intra-abd guidelines target these", "Susceptibilities vary by region"],
    pearls_es: ["La mayoría de las guías de NAC/ITU/intraabdominal apuntan a estos microorganismos", "La susceptibilidad varía según la región"],
    syndromes: ["lower-gu", "upper-gu", "biliary", "intraabd-secondary", "cap", "meningitis"],
  },
  {
    id: "atypicals", name: "Atypicals", category: "atypical", shape: "atypical",
    blurb: "Mycoplasma, Chlamydia, Legionella, Coxiella. Cell-wall-less or intracellular.",
    blurb_es: "Mycoplasma, Chlamydia, Legionella, Coxiella. Sin pared celular o de localización intracelular.",
    pearls: ["β-lactams don't work — they have no cell wall", "Macrolide, doxycycline, or FQ"],
    pearls_es: ["Los β-lactámicos no son eficaces — carecen de pared celular", "Macrólido, doxycycline o fluoroquinolona"],
    syndromes: ["cap", "zoonotic-sti", "aspiration"],
  },

  // Add: Listeria, Neisseria, Treponema (referenced but smaller cells)
  {
    id: "listeria", name: "Listeria", category: "gram-pos", shape: "rod",
    blurb: "Listeria monocytogenes. Pregnancy, neonates, elderly, immunocomp.",
    blurb_es: "Listeria monocytogenes. Embarazo, neonatos, adultos mayores e inmunodeprimidos.",
    pearls: ["Ampicillin (+ gent for synergy in meningitis)", "Cephalosporins do NOT cover"],
    pearls_es: ["Ampicillin (+ gentamicin para sinergia en meningitis)", "Las cefalosporinas NO cubren Listeria"],
    syndromes: ["meningitis"],
  },
  {
    id: "neisseria", name: "Neisseria", category: "gram-neg", shape: "coccus",
    blurb: "N. meningitidis (meningitis, sepsis) and N. gonorrhoeae (STI).",
    blurb_es: "N. meningitidis (meningitis, sepsis) y N. gonorrhoeae (infección de transmisión sexual).",
    pearls: ["Ceftriaxone is universal answer", "Add azithro for GC dual coverage"],
    pearls_es: ["Ceftriaxone es la respuesta universal", "Agregar azithromycin para doble cobertura en gonorrea"],
    syndromes: ["meningitis", "zoonotic-sti"],
  },
];

// ============== SYNDROMES ==============
export const syndromes: Syndrome[] = [
  {
    id: "skin-superficial", name: "Superficial skin/soft tissue", short: "Skin (superficial)", category: "skin",
    blurb: "Cellulitis, erysipelas, simple abscess. Usually strep or staph.",
    blurb_es: "Celulitis, erisipela, absceso simple. Generalmente por estreptococo o estafilococo.",
    empiric: ["cephalexin", "diclox", "naf", "vanc", "clinda", "doxy", "tmpsmx"],
    empiricPrimary: ["cephalexin", "diclox", "naf"],
    empiricAlternate: ["vanc", "clinda", "doxy", "tmpsmx"],
    sourceIds: ["ssti-idsa-2014", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Nonpurulent (cellulitis/erysipelas): cephalexin or dicloxacillin PO for mild; nafcillin or cefazolin IV for moderate-severe. MRSA risk: vancomycin IV or TMP-SMX/doxycycline/clindamycin PO. Purulent (abscess): incision & drainage is primary; add TMP-SMX or doxycycline if MRSA suspected. Impetigo: topical mupirocin or retapamulin; systemic cephalexin or amoxicillin-clavulanate for extensive disease. Duration 5 days for cellulitis (extend if not improving).",
    guidelineNotes_es: "No purulenta (celulitis/erisipela): cephalexin o dicloxacillin VO en casos leves; nafcillin o cefazolin IV en casos moderados-graves. Riesgo de SARM: vancomycin IV o TMP-SMX/doxycycline/clindamycin VO. Purulenta (absceso): la incisión y drenaje es el tratamiento principal; agregar TMP-SMX o doxycycline si se sospecha SARM. Impétigo: mupirocina o retapamulina tópica; cephalexin o amoxicillin-clavulanate sistémico en enfermedad extensa. Duración: 5 días para celulitis (extender si no mejora).",
    commonBugs: ["strep", "mssa", "mrsa"],
  },
  {
    id: "skin-deep", name: "Deep soft tissue, bone & hardware", short: "Skin/bone (deep)", category: "skin",
    blurb: "Necrotizing fasciitis, diabetic foot, hardware infections, osteomyelitis.",
    blurb_es: "Fascitis necrotizante, pie diabético, infecciones asociadas a implantes, osteomielitis.",
    empiric: ["vanc", "zosyn", "meropenem", "linezolid", "clinda", "ceftriaxone", "metro"],
    empiricPrimary: ["vanc", "zosyn", "meropenem"],
    empiricAlternate: ["linezolid", "clinda", "ceftriaxone", "metro"],
    sourceIds: ["ssti-idsa-2014", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Necrotizing fasciitis: emergent surgical debridement + broad-spectrum empiric antibiotics. Polymicrobial (Type I): vancomycin + piperacillin-tazobactam or carbapenem. Monomicrobial GAS (Type II): penicillin G + clindamycin. Suspected MRSA: add vancomycin or linezolid. Deep abscess/prosthetic joint: empiric vancomycin ± broad gram-negative coverage pending cultures; 6+ weeks for prosthetic joint infection.",
    guidelineNotes_es: "Fascitis necrotizante: desbridamiento quirúrgico urgente + antibióticos empíricos de amplio espectro. Polimicrobiana (Tipo I): vancomycin + piperacillin-tazobactam o carbapenémico. Monomicrobiana por SGA (Tipo II): penicilina G + clindamycin. SARM sospechado: agregar vancomycin o linezolid. Absceso profundo/articulación protésica: vancomycin empírico ± cobertura gramnegativa amplia pendiente de cultivos; ≥ 6 semanas para infección de articulación protésica.",
    commonBugs: ["mrsa", "mssa", "strep", "anaerobes", "pseudomonas", "gnrs"],
  },
  {
    id: "bone", name: "Osteomyelitis", category: "skin",
    blurb: "Native or hardware-associated bone infection.",
    blurb_es: "Infección ósea nativa o asociada a material de osteosíntesis.",
    empiric: ["vanc", "ceftriaxone", "naf", "cefazolin", "dapto", "linezolid", "cipro", "levo"],
    empiricPrimary: ["vanc", "ceftriaxone"],
    empiricAlternate: ["naf", "cefazolin", "dapto", "linezolid", "cipro", "levo"],
    sourceIds: ["nvo-idsa-2015", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric: vancomycin IV + ceftriaxone or 3rd-gen cephalosporin (gram-negative coverage) for severe/septic presentations; hold empiric antibiotics in stable patients without epidural abscess until bone biopsy cultures. MSSA: nafcillin or cefazolin. MRSA/CNS: vancomycin; alternatives daptomycin or linezolid. Gram-negative: ciprofloxacin PO or ceftriaxone IV. Duration: 6 weeks standard (vertebral osteomyelitis IDSA 2015).",
    guidelineNotes_es: "Empírico: vancomycin IV + ceftriaxone o cefalosporina de 3.ª generación (cobertura gramnegativa) en presentaciones graves/sépticas; diferir antibióticos empíricos en pacientes estables sin absceso epidural hasta obtener cultivos de biopsia ósea. SASM: nafcillin o cefazolin. SARM/SNC: vancomycin; alternativas daptomycin o linezolid. Gramnegativos: ciprofloxacin VO o ceftriaxone IV. Duración: 6 semanas como estándar (osteomielitis vertebral, IDSA 2015).",
    commonBugs: ["mssa", "mrsa", "strep", "pseudomonas"],
  },
  {
    id: "line", name: "Line-associated bloodstream infection", short: "CLABSI", category: "bloodstream",
    blurb: "Catheter-related bacteremia. Skin and gut flora.",
    blurb_es: "Bacteriemia relacionada con catéter. Flora cutánea e intestinal.",
    empiric: ["vanc", "cefepime", "dapto", "zosyn", "meropenem", "ag"],
    empiricPrimary: ["vanc", "cefepime"],
    empiricAlternate: ["dapto", "zosyn", "meropenem", "ag"],
    sourceIds: ["clabsi-idsa-2009", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric: vancomycin for gram-positive coverage (MRSA, CoNS). Add gram-negative coverage (cefepime, piperacillin-tazobactam, or carbapenem) based on local resistance patterns and severity. Remove catheter when feasible; essential for S. aureus, Candida, or persistent bacteremia. Duration: 14 days for uncomplicated S. aureus; 7-14 days for CoNS if catheter removed; 4-6 weeks for complicated IE or persistent bacteremia.",
    guidelineNotes_es: "Empírico: vancomycin para cobertura grampositiva (SARM, estafilococo coagulasa-negativo). Agregar cobertura gramnegativa (cefepime, piperacillin-tazobactam o carbapenémico) según patrones de resistencia locales y gravedad. Retirar el catéter cuando sea posible; esencial en S. aureus, Candida o bacteriemia persistente. Duración: 14 días para S. aureus no complicado; 7–14 días para estafilococo coagulasa-negativo si se retira el catéter; 4–6 semanas en endocarditis complicada o bacteriemia persistente.",
    commonBugs: ["mrsa", "mssa", "vre", "pseudomonas", "escappm", "gnrs"],
  },
  {
    id: "endocarditis", name: "Endocarditis", category: "bloodstream",
    blurb: "Native and prosthetic valve infection.",
    blurb_es: "Infección de válvula nativa o protésica.",
    empiric: ["naf", "vanc", "ceftriaxone", "dapto", "ag", "cefazolin", "linezolid", "zosyn"],
    empiricPrimary: ["naf", "vanc", "ceftriaxone"],
    empiricAlternate: ["dapto", "ag", "cefazolin", "linezolid", "zosyn"],
    sourceIds: ["ie-aha-2015", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Native valve, MSSA: nafcillin 2g IV q4h x 6 weeks (cefazolin alternative for non-anaphylactic penicillin allergy). Native valve, MRSA: vancomycin x 6 weeks; daptomycin 6 mg/kg/day alternative. Streptococcal (PCN-susceptible): penicillin G or ceftriaxone x 4 weeks (2-week shortened course with gentamicin in uncomplicated NVE). Enterococcal: ampicillin + ceftriaxone x 6 weeks (preferred for HLAR), or ampicillin + gentamicin. Prosthetic valve: add rifampin to backbone agent x ≥6 weeks + gentamicin x 2 weeks. HACEK: ceftriaxone x 4 weeks NVE / 6 weeks PVE.",
    guidelineNotes_es: "Válvula nativa, SASM: nafcillin 2 g IV cada 4 h por 6 semanas (cefazolin como alternativa en alergia no anafiláctica a penicilina). Válvula nativa, SARM: vancomycin por 6 semanas; daptomycin 6 mg/kg/día como alternativa. Estreptocócica (sensible a penicilina): penicilina G o ceftriaxone por 4 semanas (curso acortado de 2 semanas con gentamicin en endocarditis valvular nativa no complicada). Enterocócica: ampicillin + ceftriaxone por 6 semanas (preferido para HLAR), o ampicillin + gentamicin. Válvula protésica: agregar rifampicina al agente principal por ≥ 6 semanas + gentamicin por 2 semanas. HACEK: ceftriaxone por 4 semanas (válvula nativa) / 6 semanas (válvula protésica).",
    commonBugs: ["strep", "mssa", "mrsa", "enterococcus", "vre"],
  },
  {
    id: "meningitis", name: "Meningitis", category: "cns",
    blurb: "Bacterial meningitis. Empiric covers pneumococcus, meningococcus, Listeria.",
    blurb_es: "Meningitis bacteriana. El tratamiento empírico cubre neumococo, meningococo y Listeria.",
    empiric: ["ceftriaxone", "vanc", "meropenem", "ampho", "cefepime", "aztreonam"],
    empiricPrimary: ["ceftriaxone", "vanc"],
    empiricAlternate: ["meropenem", "ampho", "cefepime", "aztreonam"],
    sourceIds: ["meningitis-idsa-2004", "hcvm-idsa-2017", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric (community, adult): vancomycin + ceftriaxone (add ampicillin if age >50 or immunocompromised for Listeria coverage). Post-neurosurgical/healthcare-associated: vancomycin + cefepime or ceftazidime or meropenem (Pseudomonas coverage). Add dexamethasone 0.15 mg/kg q6h x 4 days (start with or before first antibiotic dose) for pneumococcal meningitis. Duration: S. pneumoniae 10-14 days; N. meningitidis 7 days; Listeria 21+ days; gram-negative bacilli 21 days.",
    guidelineNotes_es: "Empírico (comunitario, adulto): vancomycin + ceftriaxone (agregar ampicillin si edad > 50 años o inmunodeprimido para cobertura de Listeria). Posquirúrgico/asociado a atención sanitaria: vancomycin + cefepime o ceftazidime o meropenem (cobertura de Pseudomonas). Agregar dexametasona 0,15 mg/kg cada 6 h por 4 días (iniciar con o antes de la primera dosis de antibiótico) para meningitis neumocócica. Duración: S. pneumoniae 10–14 días; N. meningitidis 7 días; Listeria ≥ 21 días; bacilos gramnegativos 21 días.",
    commonBugs: ["strep", "neisseria", "listeria", "gnrs"],
  },
  {
    id: "cap", name: "Community-acquired pneumonia", short: "CAP", category: "respiratory",
    blurb: "Outpatient or non-ICU inpatient. Pneumococcus + atypicals dominate.",
    blurb_es: "Ambulatorio o intrahospitalario no-UCI. Predominan neumococo y atípicos.",
    empiric: ["ceftriaxone", "azithro", "levo", "moxi", "doxy", "amox", "unasyn", "ceftaroline"],
    empiricPrimary: ["ceftriaxone", "azithro"],
    empiricAlternate: ["levo", "moxi", "doxy", "amox", "unasyn", "ceftaroline"],
    sourceIds: ["cap-ats-idsa-2019", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Outpatient, no comorbidities: amoxicillin 1g TID, OR doxycycline 100mg BID, OR azithromycin/clarithromycin (if local pneumococcal resistance <25%). Outpatient with comorbidities: amoxicillin-clavulanate or cephalosporin + macrolide, OR respiratory FQ monotherapy (levofloxacin or moxifloxacin). Inpatient non-severe (non-ICU): beta-lactam (ceftriaxone, cefotaxime, unasyn, or ceftaroline) + azithromycin OR respiratory FQ monotherapy. Inpatient severe (ICU): beta-lactam + macrolide OR beta-lactam + respiratory FQ. Minimum 5 days (clinical stability required). No routine anaerobic coverage unless lung abscess/empyema.",
    guidelineNotes_es: "Ambulatorio sin comorbilidades: amoxicillin 1 g cada 8 h, O doxycycline 100 mg cada 12 h, O azithromycin/claritromicina (si resistencia local de neumococo < 25%). Ambulatorio con comorbilidades: amoxicillin-clavulanate o cefalosporina + macrólido, O fluoroquinolona respiratoria en monoterapia (levofloxacin o moxifloxacin). Hospitalizado no grave (no-UCI): β-lactámico (ceftriaxone, cefotaxime, unasyn o ceftaroline) + azithromycin O fluoroquinolona respiratoria en monoterapia. Hospitalizado grave (UCI): β-lactámico + macrólido O β-lactámico + fluoroquinolona respiratoria. Mínimo 5 días (requiere estabilidad clínica). No se requiere cobertura anaeróbica rutinaria salvo absceso pulmonar o empiema.",
    commonBugs: ["strep", "atypicals", "mssa", "gnrs"],
  },
  {
    id: "hcap", name: "HAP / HCAP", category: "respiratory",
    blurb: "Hospital-acquired pneumonia (≥48h after admission).",
    blurb_es: "Neumonía intrahospitalaria (≥ 48 h tras el ingreso).",
    empiric: ["zosyn", "cefepime", "meropenem", "vanc", "linezolid", "aztreonam", "levo"],
    empiricPrimary: ["zosyn", "cefepime", "meropenem"],
    empiricAlternate: ["vanc", "linezolid", "aztreonam", "levo"],
    sourceIds: ["hap-vap-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "HAP (non-ventilated): All patients need coverage for S. aureus and gram-negatives. No MRSA risk factors: piperacillin-tazobactam, cefepime, levofloxacin, imipenem, or meropenem. MRSA risk factors (prior IV antibiotics, septic shock, structural lung disease, high local prevalence): add vancomycin or linezolid. Avoid aminoglycosides as single agent for HAP. Duration 7 days. Local antibiogram should guide coverage.",
    guidelineNotes_es: "Neumonía intrahospitalaria (no ventilado): todos los pacientes requieren cobertura para S. aureus y gramnegativos. Sin factores de riesgo para SARM: piperacillin-tazobactam, cefepime, levofloxacin, imipenem o meropenem. Con factores de riesgo para SARM (antibióticos IV previos, choque séptico, enfermedad pulmonar estructural, alta prevalencia local): agregar vancomycin o linezolid. Evitar aminoglucósidos como agente único. Duración: 7 días. El antibiograma local debe guiar la cobertura.",
    commonBugs: ["pseudomonas", "mrsa", "mssa", "escappm", "gnrs"],
  },
  {
    id: "vap", name: "Ventilator-associated pneumonia", short: "VAP", category: "respiratory",
    blurb: "Pneumonia >48h after intubation. Broad empiric, narrow on cultures.",
    blurb_es: "Neumonía > 48 h tras la intubación. Tratamiento empírico amplio; desescalar según cultivos.",
    empiric: ["zosyn", "cefepime", "meropenem", "vanc", "linezolid", "aztreonam", "ag", "cipro"],
    empiricPrimary: ["zosyn", "cefepime", "meropenem"],
    empiricAlternate: ["vanc", "linezolid", "aztreonam", "ag", "cipro"],
    sourceIds: ["hap-vap-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "All VAP: antipseudomonal beta-lactam (piperacillin-tazobactam, cefepime, or carbapenem) as backbone. MRSA risk (≥5 days hospitalization before VAP, prior IV antibiotics, renal replacement therapy): add vancomycin or linezolid; otherwise MRSA coverage not required. MDR risk or high local resistance (>10% of gram-negatives resistant to preferred agent, prior IV antibiotics within 90 days): use TWO antipseudomonal agents from different classes. Duration: 7 days.",
    guidelineNotes_es: "Toda NAV: β-lactámico antipseudomónico (piperacillin-tazobactam, cefepime o carbapenémico) como base. Riesgo de SARM (≥ 5 días de hospitalización antes de la NAV, antibióticos IV previos, terapia de reemplazo renal): agregar vancomycin o linezolid; de lo contrario no se requiere cobertura para SARM. Riesgo de microorganismo multirresistente o alta resistencia local (> 10% de gramnegativos resistentes al agente preferido, antibióticos IV en los últimos 90 días): usar DOS agentes antipseudomónicos de clases diferentes. Duración: 7 días.",
    commonBugs: ["pseudomonas", "mrsa", "escappm", "esbl", "gnrs"],
  },
  {
    id: "aspiration", name: "Aspiration pneumonia", category: "respiratory",
    blurb: "Anaerobic + oral flora coverage. Often community.",
    blurb_es: "Cobertura para anaerobios y flora oral. Frecuentemente de origen comunitario.",
    empiric: ["ceftriaxone", "azithro", "unasyn", "levo", "moxi", "doxy", "clinda", "metro"],
    empiricPrimary: ["ceftriaxone", "azithro", "unasyn"],
    empiricAlternate: ["levo", "moxi", "doxy", "clinda", "metro"],
    sourceIds: ["cap-ats-idsa-2019", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Community-onset aspiration pneumonia: treat per 2019 ATS/IDSA CAP guidelines — standard CAP regimens (beta-lactam + macrolide or FQ monotherapy). Anaerobic coverage NOT routinely added unless lung abscess or empyema is suspected (very low quality evidence). Hospital-onset aspiration: treat as HAP. Classic aspiration pleuropulmonary syndrome (loss of consciousness + gingival disease): unasyn or add metronidazole to standard regimen. Minimum 5 days, extend for abscess/empyema.",
    guidelineNotes_es: "Neumonía aspirativa de inicio comunitario: tratar según guías ATS/IDSA 2019 de NAC — régimen estándar de NAC (β-lactámico + macrólido o fluoroquinolona en monoterapia). La cobertura anaeróbica NO se añade de rutina salvo sospecha de absceso pulmonar o empiema (evidencia de muy baja calidad). Neumonía aspirativa intrahospitalaria: tratar como neumonía intrahospitalaria. Síndrome pleuropulmonar aspirativo clásico (pérdida de conciencia + enfermedad gingival): unasyn o agregar metronidazole al régimen estándar. Mínimo 5 días; extender en absceso/empiema.",
    commonBugs: ["strep", "anaerobes", "atypicals", "mssa"],
  },
  {
    id: "biliary", name: "Biliary tract infection", category: "intraabd",
    blurb: "Cholangitis, cholecystitis. Gut flora.",
    blurb_es: "Colangitis, colecistitis. Flora intestinal.",
    empiric: ["zosyn", "ceftriaxone", "meropenem", "ertapenem", "cipro", "metro", "unasyn"],
    empiricPrimary: ["zosyn", "ceftriaxone"],
    empiricAlternate: ["meropenem", "ertapenem", "cipro", "metro", "unasyn"],
    sourceIds: ["tokyo-2018", "iab-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Mild (Grade I) cholangitis/cholecystitis: ampicillin-sulbactam or cephalosporin ± metronidazole. Moderate-severe (Grade II-III): piperacillin-tazobactam, or ceftriaxone + metronidazole, or carbapenem (meropenem or ertapenem) for severe/healthcare-associated. Biliary drainage essential for Grade II-III cholangitis. Duration: 4-7 days after source control per Tokyo Guidelines 2018; cholecystectomy is definitive treatment for cholecystitis.",
    guidelineNotes_es: "Leve (Grado I) colangitis/colecistitis: ampicillin-sulbactam o cefalosporina ± metronidazole. Moderada-grave (Grado II-III): piperacillin-tazobactam, o ceftriaxone + metronidazole, o carbapenémico (meropenem o ertapenem) en casos graves/asociados a atención sanitaria. El drenaje biliar es esencial en colangitis Grado II-III. Duración: 4–7 días tras control del foco según Guías de Tokio 2018; la colecistectomía es el tratamiento definitivo para la colecistitis.",
    commonBugs: ["gnrs", "esbl", "enterococcus", "anaerobes", "escappm"],
  },
  {
    id: "intraabd-spontaneous", name: "Spontaneous intraperitoneal", short: "SBP", category: "intraabd",
    blurb: "Spontaneous bacterial peritonitis (cirrhosis).",
    blurb_es: "Peritonitis bacteriana espontánea (cirrosis).",
    empiric: ["ceftriaxone", "zosyn", "cipro", "meropenem"],
    empiricPrimary: ["ceftriaxone"],
    empiricAlternate: ["zosyn", "cipro", "meropenem"],
    sourceIds: ["sbp-aasld-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Community-acquired SBP: ceftriaxone 1-2g IV q24h (or IV cefotaxime 2g q8h) for 5-7 days. Nosocomial SBP or critically ill: piperacillin-tazobactam or carbapenem (meropenem). Add vancomycin if MRSA risk (prior MRSA, IV antibiotics within 90 days, septic shock). Albumin infusion (1.5 g/kg at diagnosis, 1 g/kg on day 3) reduces renal failure and mortality. Prophylaxis post-SBP: ciprofloxacin 500 mg/day or TMP-SMX long-term.",
    guidelineNotes_es: "PBE adquirida en la comunidad: ceftriaxone 1–2 g IV cada 24 h (o cefotaxime IV 2 g cada 8 h) por 5–7 días. PBE nosocomial o paciente crítico: piperacillin-tazobactam o carbapenémico (meropenem). Agregar vancomycin si riesgo de SARM (SARM previo, antibióticos IV en los últimos 90 días, choque séptico). Infusión de albúmina (1,5 g/kg al diagnóstico, 1 g/kg al día 3) reduce la insuficiencia renal y la mortalidad. Profilaxis post-PBE: ciprofloxacin 500 mg/día o TMP-SMX a largo plazo.",
    commonBugs: ["gnrs", "strep", "anaerobes"],
  },
  {
    id: "intraabd-secondary", name: "Secondary intraabdominal", category: "intraabd",
    blurb: "Perforation, abscess, post-surgical. Polymicrobial.",
    blurb_es: "Perforación, absceso, posquirúrgico. Polimicrobiano.",
    empiric: ["zosyn", "ceftriaxone", "metro", "meropenem", "ertapenem", "cipro", "tige"],
    empiricPrimary: ["zosyn", "ceftriaxone", "metro"],
    empiricAlternate: ["meropenem", "ertapenem", "cipro", "tige"],
    sourceIds: ["iab-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Community-acquired, mild-moderate: ceftriaxone + metronidazole, or piperacillin-tazobactam, or ciprofloxacin + metronidazole, or ertapenem. Severe/healthcare-associated: meropenem or piperacillin-tazobactam + coverage for ESBL/resistant organisms based on local epidemiology. Source control (drainage, debridement, or surgery) is essential. Duration: 4-7 days after adequate source control; 24 hours if perforation identified and surgically addressed within 12 hours.",
    guidelineNotes_es: "Adquirida en la comunidad, leve-moderada: ceftriaxone + metronidazole, o piperacillin-tazobactam, o ciprofloxacin + metronidazole, o ertapenem. Grave/asociada a atención sanitaria: meropenem o piperacillin-tazobactam + cobertura para BLEE/organismos resistentes según epidemiología local. El control del foco (drenaje, desbridamiento o cirugía) es esencial. Duración: 4–7 días tras control adecuado del foco; 24 horas si la perforación fue identificada y corregida quirúrgicamente dentro de las primeras 12 horas.",
    commonBugs: ["gnrs", "esbl", "anaerobes", "enterococcus", "escappm"],
  },
  {
    id: "gi", name: "GI / colitis", category: "gi",
    blurb: "C. diff, traveler's diarrhea, invasive Salmonella/Shigella.",
    blurb_es: "C. difficile, diarrea del viajero, Salmonella/Shigella invasoras.",
    empiric: ["vancpo", "metro", "cipro", "levo", "doxy", "azithro"],
    empiricPrimary: ["vancpo", "metro"],
    empiricAlternate: ["cipro", "levo", "doxy", "azithro"],
    sourceIds: ["cdi-idsa-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "C. difficile infection (initial episode): fidaxomicin 200 mg PO BID x 10 days (preferred); vancomycin 125 mg PO QID x 10 days (acceptable alternative); metronidazole 500 mg TID x 10 days only if fidaxomicin/vancomycin unavailable. Fulminant CDI: vancomycin 500 mg PO/NG QID + metronidazole 500 mg IV q8h; consider rectal vancomycin if ileus. Recurrent CDI: fidaxomicin preferred. Traveler's diarrhea: ciprofloxacin or azithromycin x 3 days. Shigella: ciprofloxacin or azithromycin. Salmonella (non-typhi, if treatment indicated): ciprofloxacin or ceftriaxone.",
    guidelineNotes_es: "Infección por C. difficile (episodio inicial): fidaxomicina 200 mg VO cada 12 h por 10 días (preferida); vancomycin 125 mg VO cada 6 h por 10 días (alternativa aceptable); metronidazole 500 mg cada 8 h por 10 días solo si fidaxomicina/vancomycin no están disponibles. ICD fulminante: vancomycin 500 mg VO/SNG cada 6 h + metronidazole 500 mg IV cada 8 h; considerar vancomycin rectal si hay íleo. ICD recurrente: fidaxomicina es preferida. Diarrea del viajero: ciprofloxacin o azithromycin por 3 días. Shigella: ciprofloxacin o azithromycin. Salmonella (no tifoidea, si está indicado tratamiento): ciprofloxacin o ceftriaxone.",
    commonBugs: ["anaerobes", "gnrs"],
  },
  {
    id: "lower-gu", name: "Lower GU (cystitis)", category: "gu",
    blurb: "Uncomplicated cystitis.",
    blurb_es: "Cistitis no complicada.",
    empiric: ["nitro", "tmpsmx", "fosfo", "cipro", "levo", "augmentin", "cephalexin"],
    empiricPrimary: ["nitro", "tmpsmx", "fosfo"],
    empiricAlternate: ["cipro", "levo", "augmentin", "cephalexin"],
    sourceIds: ["uti-idsa-2011", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "First-line: nitrofurantoin monohydrate/macrocrystals 100 mg BID x 5 days (avoid if GFR <30), TMP-SMX DS BID x 3 days (avoid if local resistance >20%), or fosfomycin trometamol 3g single dose. Fluoroquinolones (ciprofloxacin, levofloxacin) are highly effective but reserved for important uses due to collateral damage risk. Beta-lactams (cephalexin, augmentin) are less effective than preferred agents. Urine culture not routinely needed for uncomplicated premenopausal women.",
    guidelineNotes_es: "Primera línea: nitrofurantoin monohidrato/macrocristales 100 mg cada 12 h por 5 días (evitar si FG < 30 mL/min), TMP-SMX DS cada 12 h por 3 días (evitar si resistencia local > 20%), o fosfomycin trometamol 3 g dosis única. Las fluoroquinolonas (ciprofloxacin, levofloxacin) son muy eficaces pero se reservan para usos prioritarios por el riesgo de daño colateral. Los β-lactámicos (cephalexin, augmentin) son menos eficaces que los agentes de primera línea. El urocultivo no es necesario de rutina en mujeres premenopáusicas con cistitis no complicada.",
    commonBugs: ["gnrs", "esbl", "enterococcus"],
  },
  {
    id: "upper-gu", name: "Upper GU (pyelo)", category: "gu",
    blurb: "Pyelonephritis. Need tissue penetration.",
    blurb_es: "Pielonefritis. Se requiere penetración tisular.",
    empiric: ["cipro", "levo", "ceftriaxone", "tmpsmx", "ag", "zosyn"],
    empiricPrimary: ["cipro", "levo"],
    empiricAlternate: ["ceftriaxone", "tmpsmx", "ag", "zosyn"],
    sourceIds: ["uti-idsa-2011", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Outpatient: ciprofloxacin 500 mg BID x 7 days or levofloxacin 750 mg daily x 5 days (first-line if local FQ resistance <10%); if FQ resistance ≥10%, give initial IV ceftriaxone 1g or aminoglycoside dose then switch to oral FQ or TMP-SMX (based on sensitivities) x 14 days. Inpatient: IV fluoroquinolone, or aminoglycoside ± ampicillin, or extended-spectrum cephalosporin/penicillin; transition to oral when improving. Duration: FQ 5-7 days; beta-lactam 10-14 days.",
    guidelineNotes_es: "Ambulatorio: ciprofloxacin 500 mg cada 12 h por 7 días o levofloxacin 750 mg una vez al día por 5 días (primera línea si resistencia local a FQ < 10%); si resistencia a FQ ≥ 10%, administrar dosis inicial IV de ceftriaxone 1 g o aminoglucósido y luego cambiar a FQ oral o TMP-SMX (según sensibilidades) por 14 días. Hospitalizado: fluoroquinolona IV, o aminoglucósido ± ampicillin, o cefalosporina/penicilina de amplio espectro; transición a vía oral al mejorar. Duración: fluoroquinolonas 5–7 días; β-lactámicos 10–14 días.",
    commonBugs: ["gnrs", "esbl", "enterococcus", "pseudomonas", "escappm"],
  },
  {
    id: "gu-instr", name: "GU with instrumentation", category: "gu",
    blurb: "Post-procedural UTI. Broader resistance patterns.",
    blurb_es: "ITU postprocedimiento. Patrones de resistencia más amplios.",
    empiric: ["ceftriaxone", "cefepime", "cipro", "zosyn", "meropenem", "levo", "ag"],
    empiricPrimary: ["ceftriaxone", "cefepime", "cipro", "zosyn"],
    empiricAlternate: ["meropenem", "levo", "ag"],
    sourceIds: ["cuti-idsa-2025", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Empiric selection follows a 4-step approach: (1) Assess severity (sepsis vs. non-sepsis); (2) Consider patient-specific resistance risk factors (prior resistant cultures, prior FQ exposure within 12 months); (3) Consider patient-specific adverse effect risk; (4) For septic patients, consult local antibiogram. Non-septic cUTI: cephalosporins (3rd/4th gen), piperacillin-tazobactam, or FQ. Septic cUTI: carbapenems, cephalosporins, pip-tazo, or FQ. Duration: 5-7 days FQ or 7 days non-FQ. Definitive therapy guided by urine culture.",
    guidelineNotes_es: "La selección empírica sigue un enfoque de 4 pasos: (1) Evaluar la gravedad (sepsis vs. no sepsis); (2) Considerar factores de riesgo de resistencia específicos del paciente (cultivos previos resistentes, exposición a FQ en los últimos 12 meses); (3) Considerar el riesgo de efectos adversos específico del paciente; (4) Para pacientes sépticos, consultar el antibiograma local. ITU complicada no séptica: cefalosporinas de 3.ª/4.ª generación, piperacillin-tazobactam o FQ. ITU complicada séptica: carbapenémicos, cefalosporinas, piperacillin-tazobactam o FQ. Duración: 5–7 días con FQ o 7 días sin FQ. Tratamiento definitivo guiado por urocultivo.",
    commonBugs: ["pseudomonas", "esbl", "escappm", "vre", "enterococcus"],
  },
  {
    id: "zoonotic-sti", name: "Zoonotics & STIs", category: "other",
    blurb: "Rickettsia, Borrelia, gonorrhea, chlamydia, syphilis.",
    blurb_es: "Rickettsia, Borrelia, gonorrea, clamidia, sífilis.",
    empiric: ["doxy", "ceftriaxone", "azithro", "amox", "pcn", "levo", "moxi"],
    empiricPrimary: ["doxy", "ceftriaxone", "azithro"],
    empiricAlternate: ["amox", "pcn", "levo", "moxi"],
    sourceIds: ["lyme-idsa-2020", "sti-cdc-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Lyme disease (early, erythema migrans): doxycycline 100 mg BID x 10 days OR amoxicillin 500 mg TID x 14 days OR cefuroxime axetil 500 mg BID x 14 days. Neurologic Lyme: IV ceftriaxone 2g/day x 14-21 days. RMSF/Ehrlichiosis: doxycycline 100 mg BID x 5-7 days (drug of choice; safe in children). Gonorrhea (uncomplicated urogenital/rectal): ceftriaxone 500 mg IM single dose (1g if >150 kg). Chlamydia: doxycycline 100 mg BID x 7 days (preferred over azithromycin). Syphilis (primary/secondary/early latent): benzathine penicillin G 2.4 million units IM x 1; late latent/unknown duration: benzathine PCN G weekly x 3 doses.",
    guidelineNotes_es: "Enfermedad de Lyme (temprana, eritema migratorio): doxycycline 100 mg cada 12 h por 10 días, O amoxicillin 500 mg cada 8 h por 14 días, O cefuroxima axetilo 500 mg cada 12 h por 14 días. Lyme neurológico: ceftriaxone IV 2 g/día por 14–21 días. Fiebre maculosa de las Montañas Rocosas/Ehrlichiosis: doxycycline 100 mg cada 12 h por 5–7 días (fármaco de elección; seguro en niños). Gonorrea (urogenital/rectal no complicada): ceftriaxone 500 mg IM dosis única (1 g si > 150 kg). Clamidia: doxycycline 100 mg cada 12 h por 7 días (preferido sobre azithromycin). Sífilis (primaria/secundaria/latente temprana): penicilina G benzatínica 2,4 millones de U IM dosis única; latente tardía/duración desconocida: penicilina G benzatínica semanal por 3 dosis.",
    commonBugs: ["atypicals", "neisseria"],
  },
  {
    id: "neutropenic", name: "Febrile neutropenia", category: "other",
    blurb: "Fever in neutropenic host. Broad empiric.",
    blurb_es: "Fiebre en huésped neutropénico. Tratamiento empírico de amplio espectro.",
    empiric: ["cefepime", "zosyn", "meropenem", "vanc", "cipro", "levo", "augmentin", "ag"],
    empiricPrimary: ["cefepime", "zosyn", "meropenem"],
    empiricAlternate: ["vanc", "cipro", "levo", "augmentin", "ag"],
    sourceIds: ["fn-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "High-risk (anticipated prolonged neutropenia >7 days, ANC <100, MASCC <21): IV empiric monotherapy with antipseudomonal beta-lactam — cefepime 2g IV q8h, piperacillin-tazobactam 4.5g IV q6h, or meropenem 1g IV q8h. Add vancomycin only if: hemodynamic instability, skin/catheter-site infection, suspected GPC bacteremia, or MRSA risk factors. Low-risk (MASCC ≥21, anticipated neutropenia ≤7 days): oral ciprofloxacin + amoxicillin-clavulanate (or clindamycin if PCN allergic). Empiric antifungal if persistent fever after 4-7 days of antibiotics and prolonged neutropenia expected.",
    guidelineNotes_es: "Alto riesgo (neutropenia prolongada prevista > 7 días, RAN < 100, MASCC < 21): monoterapia empírica IV con β-lactámico antipseudomónico — cefepime 2 g IV cada 8 h, piperacillin-tazobactam 4,5 g IV cada 6 h o meropenem 1 g IV cada 8 h. Agregar vancomycin solo si: inestabilidad hemodinámica, infección cutánea/en sitio de catéter, sospecha de bacteriemia por coco grampositivo o factores de riesgo para SARM. Bajo riesgo (MASCC ≥ 21, neutropenia prevista ≤ 7 días): ciprofloxacin oral + amoxicillin-clavulanate (o clindamycin si alergia a penicilina). Antifúngico empírico si fiebre persistente tras 4–7 días de antibióticos y se espera neutropenia prolongada.",
    commonBugs: ["pseudomonas", "escappm", "mrsa", "vre", "esbl", "gnrs"],
  },
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
