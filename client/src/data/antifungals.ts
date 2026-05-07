// Antifungal coverage data
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";

export const drugClasses: DrugClass[] = [
  { id: "polyene", name: "Polyenes", color: "#d4a86f", blurb: "Amphotericin. Binds ergosterol → membrane damage. Toxic but broad.", blurb_es: "Anfotericina. Se une al ergosterol → daño de membrana. Tóxico pero de amplio espectro." },
  { id: "azole", name: "Azoles", color: "#d4c46f", blurb: "Block ergosterol synthesis (CYP51). Many drug interactions.", blurb_es: "Bloquean la síntesis de ergosterol (CYP51). Múltiples interacciones farmacológicas." },
  { id: "echino", name: "Echinocandins", color: "#c4d46f", blurb: "Inhibit β-1,3-glucan synthase. Candida killers, no kidney toxicity.", blurb_es: "Inhiben la β-1,3-glucano sintasa. Muy activos frente a Candida, sin toxicidad renal." },
  { id: "flucy", name: "Flucytosine", color: "#9ed46f", blurb: "Adjunct for cryptococcal meningitis. Always combo.", blurb_es: "Adyuvante en meningitis criptocócica. Siempre en combinación." },

  // ---- Antimycobacterials & rifamycins (TB / NTM / leprosy) ----
  // ---- Antimycobacterials & rifamycins (TB / NTM / leprosy) ----
  { id: "antimycobacterial", name: "Antimycobacterials", color: "#9c7bd4", blurb: "TB-specific agents. RIPE backbone + 2nd-line + bedaquiline/pretomanid for MDR.", blurb_es: "Agentes específicos para TB. Esquema RIPE como base + 2.ª línea + bedaquilina/pretomanid para TB-MDR." },
  { id: "rifamycin", name: "Rifamycins", color: "#d49e6f", blurb: "RIF/RFB/RPT. CYP3A4 inducers (RFB less so). Backbone of every short TB regimen.", blurb_es: "RIF/RFB/RPT. Inductores de CYP3A4 (RFB en menor grado). Base de todo esquema corto de TB." },
];

export const drugs: Drug[] = [
  // Polyenes
  { id: "ampho", name: "Amphotericin B (liposomal)", short: "L-AmB", classId: "polyene",
    blurb: "Big-gun antifungal. Mucor, severe crypto, refractory.",
    blurb_es: "Antifúngico de gran potencia. Mucor, criptococosis grave, enfermedad refractaria.",
    mechanism: "Binds ergosterol → pores",
    mechanism_es: "Se une al ergosterol → formación de poros",
    spectrum: "Almost all yeasts and molds (not C. lusitaniae, Aspergillus terreus)",
    spectrum_es: "Casi todas las levaduras y hongos filamentosos (excepto C. lusitaniae, Aspergillus terreus)",
    pearls: ["Liposomal less nephrotoxic than deoxycholate", "Pre-medicate for infusion reactions"],
    pearls_es: ["La formulación liposomal es menos nefrotóxica que el desoxicolato", "Premedicar antes de la infusión para reducir reacciones"],
    doseAdult: "3-5 mg/kg IV daily",
    doseAdult_es: "3–5 mg/kg IV diario",
    route: ["IV"], pregnancy: "caution" },

  // Azoles
  { id: "fluc", name: "Fluconazole", classId: "azole",
    blurb: "Candida (most), cryptococcus consolidation. Easy oral.",
    blurb_es: "Candida (mayoría de especies), consolidación en criptococosis. Cómoda administración oral.",
    mechanism: "Inhibits CYP51",
    mechanism_es: "Inhibe CYP51",
    spectrum: "Most Candida (NOT krusei, variable glabrata), Cryptococcus",
    spectrum_es: "La mayoría de especies de Candida (NO krusei, actividad variable frente a glabrata), Cryptococcus",
    pearls: ["No mold coverage", "Watch QTc, hepatotox, drug interactions"],
    pearls_es: ["Sin cobertura para hongos filamentosos", "Vigilar QTc, hepatotoxicidad e interacciones farmacológicas"],
    doseAdult: "400-800 mg IV/PO daily",
    doseAdult_es: "400–800 mg IV/VO diario",
    route: ["IV", "PO"], pregnancy: "avoid" },

  { id: "itra", name: "Itraconazole", classId: "azole",
    blurb: "Dimorphics — histo, blasto, sporotrichosis.",
    blurb_es: "Hongos dimórficos: histoplasmosis, blastomicosis, esporotricosis.",
    mechanism: "Inhibits CYP51",
    mechanism_es: "Inhibe CYP51",
    spectrum: "Dimorphics, dermatophytes, some Aspergillus",
    spectrum_es: "Hongos dimórficos, dermatofitos, algunos Aspergillus",
    pearls: ["Take capsules with acidic food/cola", "Negative inotrope — avoid in CHF"],
    pearls_es: ["Tomar cápsulas con alimentos ácidos o gaseosa cola para mejorar absorción", "Efecto inotrópico negativo: evitar en insuficiencia cardíaca"],
    doseAdult: "200 mg PO BID",
    doseAdult_es: "200 mg VO BID",
    route: ["PO"], pregnancy: "avoid" },

  { id: "vori", name: "Voriconazole", classId: "azole",
    blurb: "Aspergillus first-line. Therapeutic monitoring needed.",
    blurb_es: "Primera línea para Aspergillus. Requiere monitoreo de niveles terapéuticos.",
    mechanism: "Inhibits CYP51",
    mechanism_es: "Inhibe CYP51",
    spectrum: "Aspergillus, Candida (incl krusei), Scedosporium, Fusarium",
    spectrum_es: "Aspergillus, Candida (incluye krusei), Scedosporium, Fusarium",
    pearls: ["Visual disturbances common early", "Trough 2-5.5 mcg/mL"],
    pearls_es: ["Los trastornos visuales son frecuentes al inicio del tratamiento", "Valle terapéutico: 2–5,5 mcg/mL"],
    doseAdult: "6 mg/kg load → 4 mg/kg IV q12h",
    doseAdult_es: "6 mg/kg IV dosis de carga → 4 mg/kg IV cada 12 h",
    route: ["IV", "PO"], pregnancy: "avoid" },

  { id: "posa", name: "Posaconazole", classId: "azole",
    blurb: "Mucor + Aspergillus prophylaxis. Broad mold coverage.",
    blurb_es: "Profilaxis frente a Mucor y Aspergillus. Amplia cobertura de hongos filamentosos.",
    mechanism: "Inhibits CYP51",
    mechanism_es: "Inhibe CYP51",
    spectrum: "Aspergillus, Mucor, Candida, dimorphics",
    spectrum_es: "Aspergillus, Mucor, Candida, hongos dimórficos",
    pearls: ["Tablet > suspension bioavailability", "Therapeutic monitoring recommended"],
    pearls_es: ["La biodisponibilidad del comprimido es mayor que la de la suspensión", "Se recomienda monitoreo de niveles terapéuticos"],
    doseAdult: "300 mg PO daily (after load)",
    doseAdult_es: "300 mg VO diario (tras dosis de carga)",
    route: ["IV", "PO"], pregnancy: "avoid" },

  { id: "isavu", name: "Isavuconazole", classId: "azole",
    blurb: "Newer broad azole. Aspergillus + Mucor. No QTc prolongation (shortens it).",
    blurb_es: "Azol de amplio espectro más reciente. Aspergillus + Mucor. No prolonga el QTc (lo acorta).",
    mechanism: "Inhibits CYP51",
    mechanism_es: "Inhibe CYP51",
    spectrum: "Aspergillus, Mucor, Candida",
    spectrum_es: "Aspergillus, Mucor, Candida",
    pearls: ["Predictable PK — no routine TDM", "Better-tolerated than vori"],
    pearls_es: ["Farmacocinética predecible: no se requiere monitoreo rutinario de niveles", "Mejor tolerado que voriconazol"],
    doseAdult: "200 mg PO/IV daily after load",
    doseAdult_es: "200 mg VO/IV diario tras dosis de carga",
    route: ["IV", "PO"], pregnancy: "avoid" },

  // Echinocandins
  { id: "mica", name: "Micafungin / Caspofungin / Anidulafungin", short: "Echino", classId: "echino",
    blurb: "Empiric Candida. Safe profile.",
    blurb_es: "Tratamiento empírico de candidiasis. Perfil de seguridad favorable.",
    mechanism: "β-1,3 glucan synthase inhibition",
    mechanism_es: "Inhibición de la β-1,3-glucano sintasa",
    spectrum: "Candida (incl glabrata, krusei), Aspergillus (less)",
    spectrum_es: "Candida (incluye glabrata y krusei), Aspergillus (cobertura menor)",
    pearls: ["First-line empiric for candidemia", "No urine penetration — not for Candida UTI"],
    pearls_es: ["Primera línea empírica para candidemia", "No penetran en orina: no indicadas para infección urinaria por Candida"],
    doseAdult: "Mica 100 mg IV daily",
    doseAdult_es: "Micafungina 100 mg IV diario",
    route: ["IV"], pregnancy: "caution" },

  // Flucytosine
  { id: "flucy", name: "Flucytosine (5-FC)", classId: "flucy",
    blurb: "Cryptococcal meningitis adjunct.",
    blurb_es: "Adyuvante en meningitis criptocócica.",
    mechanism: "Pyrimidine analog → RNA misincorporation",
    mechanism_es: "Análogo de pirimidina → incorporación errónea en el ARN",
    spectrum: "Cryptococcus, Candida (combo)",
    spectrum_es: "Cryptococcus, Candida (siempre en combinación)",
    pearls: ["Always combo (with ampho)", "Bone marrow suppression — TDM"],
    pearls_es: ["Siempre en combinación (con anfotericina)", "Supresión de médula ósea: requiere monitoreo de niveles"],
    doseAdult: "25 mg/kg PO QID",
    doseAdult_es: "25 mg/kg VO cada 6 h",
    route: ["PO"], pregnancy: "avoid" },

  // ---- TB / NTM / Leprosy drugs ----
  // ---- TB / NTM / Leprosy drugs ----
  { id: "inh", name: "Isoniazid (INH)", classId: "antimycobacterial",
    blurb: "TB cornerstone. Cidal vs replicating Mtb. Always with B6.",
    blurb_es: "Pilar fundamental del tratamiento de la TB. Bactericida frente a M. tuberculosis en replicación. Siempre acompañar de B6.",
    mechanism: "Inhibits InhA (enoyl-ACP reductase), blocking mycolic acid biosynthesis in the mycobacterial cell wall after activation by KatG catalase-peroxidase",
    mechanism_es: "Inhibe InhA (enoil-ACP reductasa), bloqueando la biosíntesis de ácidos micólicos en la pared celular micobacteriana tras activación por la catalasa-peroxidasa KatG",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Add pyridoxine 25–50 mg/day to prevent peripheral neuropathy (mandatory for HIV+, DM, CKD, pregnancy, alcoholism, malnutrition)",
      "Check baseline LFTs; discontinue if ALT >3× ULN with symptoms or >5× ULN",
      "CYP2E1 metabolized—slow acetylators at higher neuropathy risk",
      "Contraindicated with acute hepatic disease"
    ],
    pearls_es: [
      "Agregar piridoxina (B6) 25–50 mg/día para prevenir neuropatía periférica (obligatorio en VIH+, DM, ERC, embarazo, alcoholismo, desnutrición)",
      "Verificar transaminasas basales; suspender si ALT >3× LSN con síntomas o >5× LSN",
      "Metabolizado por CYP2E1: los acetiladores lentos tienen mayor riesgo de neuropatía",
      "Contraindicado en enfermedad hepática aguda"
    ],
    doseAdult: "INH 5 mg/kg [max 300 mg] PO daily (or 15 mg/kg [max 900 mg] PO 3× weekly) + pyridoxine (B6) 25–50 mg PO daily",
    doseAdult_es: "INH 5 mg/kg [máx. 300 mg] VO diario (o 15 mg/kg [máx. 900 mg] VO 3 veces por semana) + piridoxina (B6) 25–50 mg VO diario",
    route: ["PO", "IM (rare)"] },

  { id: "rif", name: "Rifampin (RIF)", classId: "rifamycin",
    blurb: "TB backbone. Potent CYP3A4 inducer. Orange tears/urine.",
    blurb_es: "Base del tratamiento de la TB. Potente inductor de CYP3A4. Tiñe de naranja lágrimas y orina.",
    mechanism: "Inhibits DNA-dependent RNA polymerase (rpoB subunit), blocking transcription",
    mechanism_es: "Inhibe la ARN polimerasa dependiente de ADN (subunidad rpoB), bloqueando la transcripción",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Potent inducer of CYP3A4—reduces levels of PIs, NNRTIs, oral contraceptives, warfarin, azoles, many others; switch to rifabutin with most PI-based ART",
      "Orange-tinged urine/tears are expected and benign; warn patients; will stain soft contact lenses",
      "Take 30–60 min before meals for best absorption (but can take with low-fat food if GI intolerance)",
      "Hepatotoxicity"
    ],
    pearls_es: [
      "Potente inductor de CYP3A4: reduce niveles de IP, ITRNN, anticonceptivos orales, warfarina, azoles y otros; sustituir por rifabutina si el paciente recibe TAR basada en IP",
      "La coloración naranja de la orina y las lágrimas es esperada y benigna; advertir al paciente; mancha lentes de contacto blandos",
      "Tomar 30–60 minutos antes de las comidas para mejor absorción (puede tomarse con alimentos bajos en grasa si hay intolerancia digestiva)",
      "Hepatotoxicidad"
    ],
    doseAdult: "RIF 10 mg/kg [max 600 mg] PO daily (or 10 mg/kg [max 600 mg] PO 3× weekly)",
    doseAdult_es: "RIF 10 mg/kg [máx. 600 mg] VO diario (o 10 mg/kg [máx. 600 mg] VO 3 veces por semana)",
    route: ["PO", "IV"] },

  { id: "pza", name: "Pyrazinamide (PZA)", classId: "antimycobacterial",
    blurb: "TB intensive-phase sterilizer. Acid-environment killer. Watch LFTs/uric acid.",
    blurb_es: "Esterilizador de la fase intensiva de la TB. Activo en ambiente ácido. Vigilar transaminasas y ácido úrico.",
    mechanism: "Converted by PncA pyrazinamidase to pyrazinoic acid, which disrupts mycobacterial membrane potential and inhibits fatty acid synthase I in acidic environments",
    mechanism_es: "Convertido por la pirazinamidasa PncA en ácido pirazinoico, que altera el potencial de membrana micobacteriano e inhibe la sintasa de ácidos grasos I en ambientes ácidos",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Used only during 2-month intensive phase (standard regimen); essential for early sterilization",
      "Monitor uric acid and LFTs",
      "Avoid in severe hepatic disease and porphyria",
      "Pregnancy: used when benefits outweigh risks (WHO supports use)"
    ],
    pearls_es: [
      "Se utiliza solo durante la fase intensiva de 2 meses (esquema estándar); esencial para la esterilización temprana",
      "Monitorear ácido úrico y transaminasas",
      "Evitar en enfermedad hepática grave y porfiria",
      "Embarazo: se utiliza cuando los beneficios superan los riesgos (la OMS apoya su uso)"
    ],
    doseAdult: "PZA 20–25 mg/kg PO daily (weight-based: 1000–2000 mg for 40–90 kg; typically 1500 mg for 56–75 kg)",
    doseAdult_es: "PZA 20–25 mg/kg VO diario (según peso: 1000–2000 mg para 40–90 kg; habitualmente 1500 mg para 56–75 kg)",
    route: ["PO"] },

  { id: "emb", name: "Ethambutol (EMB)", classId: "antimycobacterial",
    blurb: "TB 4th drug until DST back. Eye toxicity — monthly visual checks.",
    blurb_es: "Cuarto fármaco de la TB hasta obtener resultados de sensibilidad. Toxicidad ocular: controles visuales mensuales.",
    mechanism: "Inhibits arabinosyl transferase enzymes (EmbA/B/C), blocking arabinogalactan synthesis in the mycobacterial cell wall",
    mechanism_es: "Inhibe las enzimas arabinósil transferasa (EmbA/B/C), bloqueando la síntesis de arabinogalactano en la pared celular micobacteriana",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Baseline visual acuity and color vision testing before initiation; monthly monitoring during therapy",
      "Discontinue if ocular toxicity develops (usually reversible if caught early)",
      "Can be discontinued once INH and RIF susceptibility confirmed; reduces to 3-drug regimen",
      "Dose-reduce in renal impairment"
    ],
    pearls_es: [
      "Evaluar agudeza visual y visión de colores al inicio; monitoreo mensual durante el tratamiento",
      "Suspender si aparece toxicidad ocular (habitualmente reversible si se detecta precozmente)",
      "Puede suspenderse una vez confirmada la sensibilidad a INH y RIF; permite reducir a esquema de 3 fármacos",
      "Ajustar dosis en insuficiencia renal"
    ],
    doseAdult: "EMB 15–20 mg/kg PO daily (weight-based: 800–1600 mg for 40–90 kg; typically 1200 mg for 56–75 kg)",
    doseAdult_es: "EMB 15–20 mg/kg VO diario (según peso: 800–1600 mg para 40–90 kg; habitualmente 1200 mg para 56–75 kg)",
    route: ["PO"] },

  { id: "rpt", name: "Rifapentine (RPT)", classId: "rifamycin",
    blurb: "Long half-life rifamycin. 3HP weekly LTBI; 4-mo DS-TB regimen.",
    blurb_es: "Rifamicina de vida media prolongada. Régimen 3HP semanal para ITBL; esquema de 4 meses para TB sensible.",
    mechanism: "Inhibits DNA-dependent RNA polymerase (rpoB subunit); longer half-life than rifampin allows weekly or daily dosing",
    mechanism_es: "Inhibe la ARN polimerasa dependiente de ADN (subunidad rpoB); su mayor vida media respecto a rifampicina permite dosificación semanal o diaria",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "3HP regimen (RPT + INH weekly ×12) is preferred LTBI regimen—highest completion rate",
      "Take with food (high-fat meal increases absorption ~49%)",
      "Drug interactions similar to rifampin but less potent; review ART compatibility before use",
      "Preferred for LTBI over 9H in most patients; weekly DOT or VOT required for 3HP"
    ],
    pearls_es: [
      "El esquema 3HP (RPT + INH semanal × 12) es el régimen preferido para ITBL: mayor tasa de completamiento",
      "Tomar con alimentos (una comida rica en grasas aumenta la absorción ~49%)",
      "Interacciones similares a rifampicina pero menos potentes; revisar compatibilidad con TAR antes de usar",
      "Preferido sobre el esquema 9H en la mayoría de los pacientes; el 3HP requiere TDO o terapia observada por video (TOV) semanal"
    ],
    doseAdult: "RPT 900 mg PO once weekly (with INH; 3HP LTBI) or RPT 600 mg PO daily (4-month DS-TB regimen with INH, MOX, PZA per Study 31/A5349)",
    doseAdult_es: "RPT 900 mg VO una vez por semana (con INH; 3HP para ITBL) o RPT 600 mg VO diario (esquema de 4 meses para TB sensible con INH, MOX, PZA según Estudio 31/A5349)",
    route: ["PO"] },

  { id: "rfb", name: "Rifabutin (RFB)", classId: "rifamycin",
    blurb: "Rifampin alternate when ART interactions block RIF. Less CYP induction.",
    blurb_es: "Alternativa a rifampicina cuando las interacciones con TAR impiden usar RIF. Menor inducción de CYP.",
    mechanism: "Inhibits DNA-dependent RNA polymerase (rpoB subunit); weaker CYP3A4 inducer than rifampin, used when rifampin drug interactions prohibitive",
    mechanism_es: "Inhibe la ARN polimerasa dependiente de ADN (subunidad rpoB); inductor de CYP3A4 más débil que rifampicina, utilizado cuando las interacciones de rifampicina son prohibitivas",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Preferred rifamycin substitute when patient is on PI-based ART (dose 150 mg daily with ritonavir-boosted PI)",
      "Inhibited by PIs → increased drug levels → uveitis risk at standard dose; reduce dose to 150 mg daily",
      "Induced by EFV/nevirapine → increase dose to 450–600 mg daily",
      "INSTIs (dolutegravir, raltegravir, bictegravir) have less interaction with rifabutin than with rifampin"
    ],
    pearls_es: [
      "Rifamicina sustituta preferida cuando el paciente recibe TAR basada en IP (dosis: 150 mg diario con IP potenciado con ritonavir)",
      "Inhibida por los IP → aumento de niveles → riesgo de uveítis con dosis estándar; reducir a 150 mg diario",
      "Inducida por EFV/nevirapina → aumentar dosis a 450–600 mg diario",
      "Los IIE (dolutegravir, raltegravir, bictegravir) tienen menor interacción con rifabutina que con rifampicina"
    ],
    doseAdult: "RFB 300 mg PO daily (alone); 150 mg PO daily (with ritonavir-boosted PI); 450–600 mg PO daily (with EFV or nevirapine)",
    doseAdult_es: "RFB 300 mg VO diario (solo); 150 mg VO diario (con IP potenciado con ritonavir); 450–600 mg VO diario (con EFV o nevirapina)",
    route: ["PO"] },

  { id: "amk", name: "Amikacin (AMK)", classId: "aminoglycoside",
    blurb: "Aminoglycoside. MDR-TB injectable + refractory MAC (inhaled ALIS).",
    blurb_es: "Aminoglucósido. Inyectable para TB-MDR + CMA refractario (ALIS inhalada).",
    mechanism: "Binds 30S ribosomal subunit (16S rRNA), inhibiting protein synthesis; active against actively dividing Mtb",
    mechanism_es: "Se une a la subunidad ribosómica 30S (ARNr 16S), inhibiendo la síntesis proteica; activo frente a M. tuberculosis en división activa",
    spectrum: "M. tuberculosis (MDR), MAC (refractory), GNRs",
    spectrum_es: "M. tuberculosis (TB-MDR), CMA (refractario), bacilos gramnegativos",
    pearls: [
      "Monitor peak (35–45 mcg/mL) and trough (<1 mcg/mL) levels",
      "Audiometry at baseline and monthly; stop if significant hearing loss",
      "WHO recommends restricting amikacin injection to Group B (use only when Group A drugs cannot form a regimen)",
      "Inhaled amikacin liposome inhalation suspension (ALIS/Arikayce) available for refractory MAC"
    ],
    pearls_es: [
      "Monitorear niveles pico (35–45 mcg/mL) y valle (<1 mcg/mL)",
      "Audiometría basal y mensual; suspender ante pérdida auditiva significativa",
      "La OMS recomienda restringir la amikacina inyectable al Grupo B (usar solo cuando los fármacos del Grupo A no pueden conformar un esquema)",
      "La suspensión de amikacina liposomal para inhalación (ALIS/Arikayce) está disponible para CMA refractario"
    ],
    doseAdult: "AMK 15–20 mg/kg [max 1000 mg] IV/IM daily (or 3× weekly; MDR-TB extended phase); adjust per renal function",
    doseAdult_es: "AMK 15–20 mg/kg [máx. 1000 mg] IV/IM diario (o 3 veces por semana; fase prolongada de TB-MDR); ajustar según función renal",
    route: ["IV", "IM"] },

  { id: "capreo", name: "Capreomycin (CPM)", classId: "antimycobacterial",
    blurb: "Polypeptide TB injectable. WHO discourages — amikacin preferred.",
    blurb_es: "Inyectable polipeptídico para TB. La OMS desaconseja su uso: se prefiere amikacina.",
    mechanism: "Binds 16S and 23S rRNA, inhibiting ribosomal translocation and protein synthesis",
    mechanism_es: "Se une al ARNr 16S y 23S, inhibiendo la translocación ribosomal y la síntesis proteica",
    spectrum: "M. tuberculosis (MDR/XDR-TB injectable)",
    spectrum_es: "M. tuberculosis (inyectable para TB-MDR/TB-XDR)",
    pearls: [
      "WHO guidance (2018) now discourages capreomycin and kanamycin for MDR-TB due to inferior outcomes in meta-analysis—prefer amikacin if injectable required",
      "Audiometry and renal function weekly during use; weekly electrolytes",
      "Reduce dose if BUN >30 mg/dL or declining GFR",
      "Nephrotoxicity (BUN elevation in ~36% patients)"
    ],
    pearls_es: [
      "La guía de la OMS (2018) desaconseja capreomicina y kanamicina en TB-MDR por resultados inferiores en metaanálisis: preferir amikacina si se requiere inyectable",
      "Audiometría y función renal semanales durante el uso; electrolitos semanales",
      "Reducir dosis si BUN >30 mg/dL o disminución del filtrado glomerular",
      "Nefrotoxicidad (elevación del BUN en ~36% de los pacientes)"
    ],
    doseAdult: "CPM 15–20 mg/kg [max 1000 mg] IM/IV daily × 60–120 days, then 2–3× weekly; renal dose adjustment required",
    doseAdult_es: "CPM 15–20 mg/kg [máx. 1000 mg] IM/IV diario × 60–120 días, luego 2–3 veces por semana; requiere ajuste de dosis según función renal",
    route: ["IM", "IV"] },

  { id: "str", name: "Streptomycin (SM)", classId: "aminoglycoside",
    blurb: "OG TB injectable. Aminoglycoside class. Avoid in pregnancy.",
    blurb_es: "Inyectable histórico para TB. Clase aminoglucósido. Evitar en el embarazo.",
    mechanism: "Binds 30S ribosomal subunit (S12 protein and 16S rRNA), causing mRNA misreading and inhibiting translocation",
    mechanism_es: "Se une a la subunidad ribosómica 30S (proteína S12 y ARNr 16S), provocando lectura errónea del ARNm e inhibiendo la translocación",
    spectrum: "M. tuberculosis, brucellosis, plague, tularemia",
    spectrum_es: "M. tuberculosis, brucelosis, peste, tularemia",
    pearls: [
      "Drug-resistant Mtb more commonly resistant to SM than amikacin; DST required",
      "Monitor serum concentrations (courses >2–3 days), renal function, and audiometry",
      "Avoid in pregnancy (congenital deafness risk)",
      "WHO Group B; use only when Group A agents cannot form adequate regimen"
    ],
    pearls_es: [
      "M. tuberculosis resistente es más frecuentemente resistente a estreptomicina que a amikacina; se requiere prueba de sensibilidad a fármacos",
      "Monitorear concentraciones séricas (en tratamientos >2–3 días), función renal y audiometría",
      "Evitar en el embarazo (riesgo de sordera congénita)",
      "Grupo B de la OMS: usar solo cuando los fármacos del Grupo A no conforman un esquema adecuado"
    ],
    doseAdult: "SM 15 mg/kg [typical 1 g] IM daily (adults <40 years); 0.75 g/day (adults ≥40 years); max 40 mg/kg/day in children",
    doseAdult_es: "SM 15 mg/kg [habitualmente 1 g] IM diario (adultos <40 años); 0,75 g/día (adultos ≥40 años); máx. 40 mg/kg/día en niños",
    route: ["IM", "IV (less common)"] },

  { id: "bdq", name: "Bedaquiline (BDQ)", classId: "antimycobacterial",
    blurb: "MDR-TB ATP-synthase inhibitor. QTc + LFT monitoring. BPaL/M backbone.",
    blurb_es: "Inhibidor de la ATP-sintasa para TB-MDR. Monitoreo de QTc y pruebas hepáticas. Pilar de los esquemas BPaL/BPaLM.",
    mechanism: "Inhibits mycobacterial ATP synthase (atpE subunit), disrupting cellular energy production; bactericidal and sterilizing activity",
    mechanism_es: "Inhibe la ATP-sintasa micobacteriana (subunidad atpE), alterando la producción de energía celular; actividad bactericida y esterilizadora",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "ECG at baseline, weeks 2 and 4, then monthly; hold if QTc >500 ms",
      "Take with food (≥18 g fat increases AUC ~2×)",
      "Monitor liver enzymes monthly; avoid in hepatic impairment (Child-Pugh B/C)",
      "Significant QTc risk with clofazimine, delamanid, and fluoroquinolones—ECG essential"
    ],
    pearls_es: [
      "ECG basal, a las semanas 2 y 4, luego mensual; suspender si QTc >500 ms",
      "Tomar con alimentos (≥18 g de grasa aumenta el AUC ~2×)",
      "Monitorear enzimas hepáticas mensualmente; evitar en insuficiencia hepática (Child-Pugh B/C)",
      "Riesgo importante de prolongación del QTc con clofazimina, delamanid y fluoroquinolonas: ECG es indispensable"
    ],
    doseAdult: "BDQ 400 mg PO daily × 2 weeks, then 200 mg PO 3× weekly × 22 weeks (BPaL/M standard); or 200 mg PO daily × 8 weeks then 100 mg PO daily (BPaLM per ZeNix/TB-PRACTECAL data)",
    doseAdult_es: "BDQ 400 mg VO diario × 2 semanas, luego 200 mg VO 3 veces por semana × 22 semanas (estándar BPaL/M); o 200 mg VO diario × 8 semanas, luego 100 mg VO diario (BPaLM según datos ZeNix/TB-PRACTECAL)",
    route: ["PO"] },

  { id: "dla", name: "Delamanid (DLM)", classId: "antimycobacterial",
    blurb: "MDR-TB nitroimidazole. QTc + albumin watch. WHO Group C.",
    blurb_es: "Nitroimidazol para TB-MDR. Vigilar QTc y albúmina. Grupo C de la OMS.",
    mechanism: "Prodrug converted by F420-dependent reductases to metabolites that inhibit mycolic acid synthesis (methoxymycolic and ketomycolic acid); active under aerobic and anaerobic conditions",
    mechanism_es: "Profármaco convertido por reductasas dependientes de F420 en metabolitos que inhiben la síntesis de ácidos micólicos (ácido metoxicoólico y cetomicólico); activo en condiciones aeróbicas y anaeróbicas",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Albumin <2.8 g/dL markedly increases QTc risk—check before initiation",
      "ECG at baseline and monthly; hold if QTc >500 ms or albumin falls below threshold",
      "Not recommended with bedaquiline or other QTc-prolonging drugs without careful ECG monitoring",
      "WHO Group C: use when BPaL/BPaLM not feasible; approved in >40 countries"
    ],
    pearls_es: [
      "Albúmina <2,8 g/dL aumenta notablemente el riesgo de prolongación del QTc: verificar antes de iniciar",
      "ECG basal y mensual; suspender si QTc >500 ms o si la albúmina desciende por debajo del umbral",
      "No se recomienda con bedaquilina u otros fármacos que prolongan el QTc sin monitoreo electrocardiográfico cuidadoso",
      "Grupo C de la OMS: usar cuando BPaL/BPaLM no es factible; aprobado en más de 40 países"
    ],
    doseAdult: "DLM 100 mg PO twice daily × 24 weeks (in combination with an optimized MDR-TB background regimen)",
    doseAdult_es: "DLM 100 mg VO dos veces al día × 24 semanas (en combinación con un esquema optimizado de fondo para TB-MDR)",
    route: ["PO"] },

  { id: "pa", name: "Pretomanid (PA)", classId: "antimycobacterial",
    blurb: "Nitroimidazole. Component of FDA-approved BPaL/BPaLM for MDR/XDR-TB.",
    blurb_es: "Nitroimidazol. Componente de los esquemas BPaL/BPaLM aprobados por la FDA para TB-MDR/TB-XDR.",
    mechanism: "Prodrug activated by Rv3547 reductase; forms reactive nitrogen intermediates that damage DNA and inhibit cell wall lipid synthesis; active against aerobic and anaerobic/non-replicating Mtb",
    mechanism_es: "Profármaco activado por la reductasa Rv3547; forma intermediarios reactivos de nitrógeno que dañan el ADN e inhiben la síntesis de lípidos de la pared celular; activo frente a M. tuberculosis aeróbico y anaeróbico/no replicante",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Component of FDA-approved BPaL and WHO-recommended BPaLM regimens for MDR/XDR-TB",
      "No dose modifications recommended for pretomanid itself (unlike linezolid)",
      "ECG at baseline and monthly given additive QTc effect of bedaquiline",
      "Monitor CBC and liver enzymes monthly during therapy"
    ],
    pearls_es: [
      "Componente de los esquemas BPaL (aprobado por FDA) y BPaLM (recomendado por OMS) para TB-MDR/TB-XDR",
      "No se recomiendan modificaciones de dosis para pretomanid en sí (a diferencia de linezolid)",
      "ECG basal y mensual dado el efecto aditivo sobre el QTc de la bedaquilina",
      "Monitorear hemograma y enzimas hepáticas mensualmente durante el tratamiento"
    ],
    doseAdult: "PA 200 mg PO daily × 26 weeks (with bedaquiline and linezolid ± moxifloxacin; BPaL/BPaLM)",
    doseAdult_es: "PA 200 mg VO diario × 26 semanas (con bedaquilina y linezolid ± moxifloxacino; BPaL/BPaLM)",
    route: ["PO"] },

  { id: "cfz", name: "Clofazimine (CFZ)", classId: "antimycobacterial",
    blurb: "MDR-TB + leprosy + M. abscessus. Reversible orange-brown skin staining.",
    blurb_es: "TB-MDR + lepra + M. abscessus. Pigmentación cutánea naranja-marrón reversible.",
    mechanism: "Binds mycobacterial DNA, generating reactive oxygen species; disrupts potassium transport; bactericidal in slowly dividing cells",
    mechanism_es: "Se une al ADN micobacteriano, generando especies reactivas de oxígeno; altera el transporte de potasio; bactericida en células de división lenta",
    spectrum: "M. leprae, M. tuberculosis (MDR), M. abscessus",
    spectrum_es: "M. leprae, M. tuberculosis (TB-MDR), M. abscessus",
    pearls: [
      "Skin discoloration expected and reversible but persists months after stopping; counsel patients",
      "ECG monitoring required when combined with other QTc-prolonging agents",
      "Take with food (fatty meal improves absorption)",
      "WHO Group A for MDR-TB longer regimens; synergistic with amikacin and macrolides in M. abscessus"
    ],
    pearls_es: [
      "La pigmentación cutánea es esperada y reversible, pero persiste meses tras suspender; asesorar al paciente",
      "Se requiere monitoreo electrocardiográfico al combinarlo con otros fármacos que prolongan el QTc",
      "Tomar con alimentos (una comida grasa mejora la absorción)",
      "Grupo A de la OMS para esquemas prolongados de TB-MDR; sinérgico con amikacina y macrólidos en M. abscessus"
    ],
    doseAdult: "CFZ 100 mg PO daily (MDR-TB, M. abscessus); 300 mg PO monthly + 50 mg PO daily (leprosy multibacillary adult MDT)",
    doseAdult_es: "CFZ 100 mg VO diario (TB-MDR, M. abscessus); 300 mg VO mensual + 50 mg VO diario (lepra multibacilar adulto, TDM)",
    route: ["PO"] },

  { id: "cs", name: "Cycloserine (CS)", classId: "antimycobacterial",
    blurb: "MDR-TB 2nd-line. CNS toxicity — always pair with B6.",
    blurb_es: "Segunda línea para TB-MDR. Toxicidad en el SNC: siempre asociar con B6.",
    mechanism: "Competitive inhibitor of D-alanine racemase and D-Ala:D-Ala ligase, blocking peptidoglycan cell wall synthesis",
    mechanism_es: "Inhibidor competitivo de la D-alanina racemasa y de la D-Ala:D-Ala ligasa, bloqueando la síntesis del peptidoglicano de la pared celular",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Pyridoxine 50 mg per 250 mg cycloserine daily (up to 200 mg/day) reduces seizure risk",
      "Avoid in epilepsy, severe depression, alcohol dependency",
      "Therapeutic drug monitoring peak 20–35 mcg/mL (2 hrs post-dose)",
      "CNS side effects are dose-related and reason for high discontinuation rate; taper up"
    ],
    pearls_es: [
      "Piridoxina 50 mg por cada 250 mg de cicloserina diaria (hasta 200 mg/día) reduce el riesgo de convulsiones",
      "Evitar en epilepsia, depresión grave y dependencia al alcohol",
      "Monitoreo de niveles: pico 20–35 mcg/mL (2 horas pospringesta)",
      "Los efectos adversos en el SNC son dosis-dependientes y causa frecuente de abandono; iniciar con dosis bajas y escalar"
    ],
    doseAdult: "CS 250 mg PO twice daily initially; titrate to 500–750 mg PO daily in 2 divided doses [max 1000 mg/day] based on tolerance",
    doseAdult_es: "CS 250 mg VO dos veces al día inicialmente; ajustar hasta 500–750 mg VO diario en 2 dosis divididas [máx. 1000 mg/día] según tolerancia",
    route: ["PO"] },

  { id: "eto", name: "Ethionamide (ETO)", classId: "antimycobacterial",
    blurb: "MDR-TB. INH-like InhA inhibition via separate activation. GI/thyroid hits.",
    blurb_es: "TB-MDR. Inhibición de InhA similar a INH mediante vía de activación diferente. Afecta TGI y tiroides.",
    mechanism: "Prodrug activated by EthA monooxygenase; inhibits InhA (enoyl-ACP reductase), blocking mycolic acid synthesis (same target as INH, but independent activation pathway)",
    mechanism_es: "Profármaco activado por la monoxigenasa EthA; inhibe InhA (enoil-ACP reductasa), bloqueando la síntesis de ácidos micólicos (mismo blanco que INH, pero vía de activación independiente)",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "Take with food to reduce GI intolerance; administer at bedtime if tolerated",
      "Monitor TSH every 3 months with long-term use (or when combined with PAS)",
      "Pyridoxine supplementation recommended (neuropathy risk)",
      "Drug-ramp dosing (start low, escalate) improves tolerability"
    ],
    pearls_es: [
      "Tomar con alimentos para reducir la intolerancia digestiva; administrar antes de dormir si se tolera",
      "Monitorear TSH cada 3 meses con uso prolongado (o al combinarlo con PAS)",
      "Se recomienda suplementar con piridoxina (riesgo de neuropatía)",
      "La dosis escalonada (inicio bajo y aumento gradual) mejora la tolerabilidad"
    ],
    doseAdult: "ETO 250 mg PO nightly (start); titrate to 500–750 mg PO daily in 2–3 divided doses [max 1000 mg/day]",
    doseAdult_es: "ETO 250 mg VO nocturno (inicio); ajustar hasta 500–750 mg VO diario en 2–3 dosis divididas [máx. 1000 mg/día]",
    route: ["PO"] },

  { id: "pas", name: "Para-aminosalicylic acid (PAS)", classId: "antimycobacterial",
    blurb: "MDR-TB folate-pathway agent. GI burden + hypothyroidism risk.",
    blurb_es: "Agente de la vía del folato para TB-MDR. Carga digestiva considerable y riesgo de hipotiroidismo.",
    mechanism: "Inhibits dihydropteroate synthase and dihydrofolate reductase in folate synthesis; also interferes with iron acquisition; mechanism partially distinct from sulfonamides",
    mechanism_es: "Inhibe la dihidropteroato sintasa y la dihidrofolato reductasa en la síntesis de folato; también interfiere con la adquisición de hierro; mecanismo parcialmente distinto al de las sulfonamidas",
    spectrum: "M. tuberculosis",
    spectrum_es: "M. tuberculosis",
    pearls: [
      "PAS granule sachets (Paser) have improved GI tolerability vs older tablet form",
      "Monitor TSH every 3 months; co-administration with ethionamide increases hypothyroid risk",
      "Vitamin B12 absorption impaired with long-term PAS; supplement if necessary",
      "WHO Group C: use when Group A and B agents cannot form adequate regimen"
    ],
    pearls_es: [
      "Los sobres granulados de PAS (Paser) tienen mejor tolerancia digestiva que la forma en tabletas",
      "Monitorear TSH cada 3 meses; la coadministración con etionamida aumenta el riesgo de hipotiroidismo",
      "La absorción de vitamina B12 se ve afectada con el uso prolongado de PAS; suplementar si es necesario",
      "Grupo C de la OMS: usar cuando los fármacos del Grupo A y B no conforman un esquema adecuado"
    ],
    doseAdult: "PAS 4 g PO twice daily (granules; sachet form) or 8–12 g/day PO in 2–3 divided doses [max 12 g/day]; take with food or acidic beverage",
    doseAdult_es: "PAS 4 g VO dos veces al día (gránulos en sobres) o 8–12 g/día VO en 2–3 dosis divididas [máx. 12 g/día]; tomar con alimentos o bebida ácida",
    route: ["PO"] },
];

export const bugs: Bug[] = [
  { id: "candida-albicans", name: "Candida albicans", category: "yeast", shape: "atypical",
    blurb: "Most common candidiasis. Usually fluconazole-susceptible.",
    blurb_es: "Causa más frecuente de candidiasis. Habitualmente sensible a fluconazol.",
    pearls: ["Echinocandin first if recent azole exposure or unstable", "De-escalate to fluconazole when stable"],
    pearls_es: ["Equinocandina de primera línea si hubo exposición reciente a azoles o el paciente está inestable", "Desescalar a fluconazol una vez estabilizado"],
    syndromes: ["candidemia", "ic-mucocutaneous", "ic-uti"]},
  { id: "candida-glabrata", name: "Candida glabrata", category: "yeast", shape: "atypical",
    blurb: "Reduced fluconazole susceptibility. Echinocandin first.",
    blurb_es: "Sensibilidad reducida a fluconazol. Equinocandina de primera línea.",
    pearls: ["High-dose fluconazole if susceptible", "Resistance increasing"],
    pearls_es: ["Fluconazol a dosis altas si es sensible", "La resistencia va en aumento"],
    syndromes: ["candidemia", "ic-uti"]},
  { id: "candida-krusei", name: "Candida krusei", category: "yeast", shape: "atypical",
    blurb: "Intrinsically fluconazole-resistant.",
    blurb_es: "Resistencia intrínseca a fluconazol.",
    pearls: ["Echinocandin or voriconazole"],
    pearls_es: ["Equinocandina o voriconazol"],
    syndromes: ["candidemia"]},
  { id: "candida-auris", name: "Candida auris", category: "yeast", shape: "atypical",
    blurb: "Multi-drug-resistant emerging yeast. Strict isolation.",
    blurb_es: "Levadura emergente multirresistente. Requiere aislamiento estricto.",
    pearls: ["Echinocandin first", "Often resistant to fluconazole and ampho"],
    pearls_es: ["Equinocandina de primera línea", "Con frecuencia resistente a fluconazol y anfotericina"],
    syndromes: ["candidemia"]},
  { id: "crypto", name: "Cryptococcus", category: "yeast", shape: "atypical",
    blurb: "C. neoformans — meningitis in HIV/immunocomp.",
    blurb_es: "C. neoformans: meningitis en pacientes con VIH o inmunocomprometidos.",
    pearls: ["Induction: L-AmB + flucytosine", "Consolidation: fluconazole 400 mg"],
    pearls_es: ["Inducción: L-AmB + flucitosina", "Consolidación: fluconazol 400 mg"],
    syndromes: ["crypto-meningitis"]},
  { id: "aspergillus", name: "Aspergillus", category: "mold", shape: "atypical",
    blurb: "A. fumigatus — invasive pulmonary disease in immunocompromised.",
    blurb_es: "A. fumigatus: enfermedad pulmonar invasora en pacientes inmunocomprometidos.",
    pearls: ["Voriconazole or isavuconazole first", "Galactomannan, BDG markers"],
    pearls_es: ["Voriconazol o isavuconazol de primera línea", "Marcadores: galactomanano y BDG"],
    syndromes: ["ipa", "aspergilloma"]},
  { id: "mucor", name: "Mucorales", category: "mold", shape: "atypical",
    blurb: "Rhino-orbital-cerebral, pulmonary. Diabetic ketoacidosis classic host.",
    blurb_es: "Rinoorbital-cerebral, pulmonar. Huésped clásico: cetoacidosis diabética.",
    pearls: ["Surgical debridement + L-AmB", "Posa/isavu for step-down"],
    pearls_es: ["Desbridamiento quirúrgico + L-AmB", "Posaconazol/isavuconazol para desescalada"],
    syndromes: ["mucor"]},
  { id: "histo", name: "Histoplasma", category: "dimorphic", shape: "atypical",
    blurb: "Mississippi/Ohio valleys. Bat/bird droppings.",
    blurb_es: "Valles del Mississippi/Ohio. Asociado a excrementos de murciélagos y aves.",
    pearls: ["Itraconazole for mild-mod", "L-AmB for severe/CNS"],
    pearls_es: ["Itraconazol para enfermedad leve-moderada", "L-AmB para enfermedad grave o del SNC"],
    syndromes: ["dimorphic"]},
  { id: "blasto", name: "Blastomyces", category: "dimorphic", shape: "atypical",
    blurb: "Great Lakes, Mississippi/Ohio. Pulmonary + skin.",
    blurb_es: "Grandes Lagos, Mississippi/Ohio. Compromiso pulmonar y cutáneo.",
    pearls: ["Itraconazole for mild-mod"],
    pearls_es: ["Itraconazol para enfermedad leve-moderada"],
    syndromes: ["dimorphic"]},
  { id: "cocci", name: "Coccidioides", category: "dimorphic", shape: "atypical",
    blurb: "Valley fever — Southwest US, Central America.",
    blurb_es: "Fiebre del valle: suroeste de EE. UU. y América Central.",
    pearls: ["Fluconazole high-dose", "Lifelong suppression in CNS disease"],
    pearls_es: ["Fluconazol a dosis altas", "Supresión de por vida en enfermedad del SNC"],
    syndromes: ["dimorphic"]},
  { id: "pjp", name: "Pneumocystis jirovecii", category: "atypical-fungus", shape: "atypical",
    blurb: "PJP pneumonia in HIV/immunocomp.",
    blurb_es: "Neumonía por PJP en pacientes con VIH o inmunocomprometidos.",
    pearls: ["TMP-SMX first-line (treated as 'antibiotic' but it's a fungus)", "Add steroids if PaO2 <70 or A-a gradient >35"],
    pearls_es: ["TMP-SMX de primera línea (tratado como 'antibiótico' pero es un hongo)", "Agregar corticoides si PaO₂ <70 mmHg o gradiente A-a >35 mmHg"],
    syndromes: ["pjp"]},

  // ---- Mycobacteria ----
  // ---- Mycobacteria ----
  { id: "mtb", name: "Mycobacterium tuberculosis", category: "mycobacteria", shape: "rod",
    blurb: "Obligate human pathogen; aerobic, slow-growing, acid-fast bacillus; causes >10 million new cases and ~1.6 million deaths annually worldwide",
    blurb_es: "Patógeno humano obligado; bacilo aeróbico, de crecimiento lento, ácido-alcohol resistente; causa más de 10 millones de nuevos casos y ~1,6 millones de muertes anuales en todo el mundo",
    pearls: [
      "Complex cell wall with mycolic acids confers intrinsic resistance to most standard antibiotics and enables intracellular survival in macrophages",
      "DST (drug susceptibility testing) essential before finalizing regimen; molecular tests (GeneXpert MTB/RIF) detect rifampin resistance rapidly",
      "IGRA or TST testing for latent infection; sputum AFB smear + NAAT + culture for active disease"
    ],
    pearls_es: [
      "La pared celular compleja con ácidos micólicos confiere resistencia intrínseca a la mayoría de los antibióticos estándar y permite la supervivencia intracelular en macrófagos",
      "La prueba de sensibilidad a fármacos (DST) es esencial antes de definir el esquema; las pruebas moleculares (GeneXpert MTB/RIF) detectan resistencia a rifampicina rápidamente",
      "IGRA o PPD para infección latente; baciloscopia de esputo + NAAT + cultivo para enfermedad activa"
    ],
    syndromes: ["tb-pulmonary-ds", "tb-ltbi", "tb-meningitis", "tb-miliary", "tb-pleural", "tb-lymphatic", "tb-hiv", "tb-mdr", "tb-xdr"] },

  { id: "mavium", name: "Mycobacterium avium complex (MAC)", category: "mycobacteria", shape: "rod",
    blurb: "Ubiquitous environmental NTM; M. avium and M. intracellulare most common; causes pulmonary disease in patients with structural lung disease (bronchiectasis, COPD, prior TB) and disseminated disease in advanced HIV",
    blurb_es: "MNT ambiental ubicuo; M. avium y M. intracellulare son los más frecuentes; causa enfermedad pulmonar en pacientes con enfermedad pulmonar estructural (bronquiectasias, EPOC, TB previa) y enfermedad diseminada en VIH avanzado",
    pearls: [
      "Diagnosis requires ≥2 positive sputum cultures or 1 positive BAL/bronchoscopy culture with compatible clinical and radiographic findings (ATS diagnostic criteria)",
      "Azithromycin preferred macrolide for pulmonary MAC (fewer DDI, better tolerance than clarithromycin)",
      "Disseminated MAC in HIV (CD4 <50) presents with fever, sweats, weight loss, hepatosplenomegaly—treat with azithromycin + ethambutol ± rifabutin"
    ],
    pearls_es: [
      "El diagnóstico requiere ≥2 cultivos de esputo positivos o 1 cultivo positivo de BAL/broncoscopia con hallazgos clínicos y radiológicos compatibles (criterios diagnósticos de la ATS)",
      "Azitromicina es el macrólido preferido para CMA pulmonar (menos interacciones, mejor tolerancia que claritromicina)",
      "El CMA diseminado en VIH (CD4 <50) se presenta con fiebre, sudoración, pérdida de peso y hepatoesplenomegalia: tratar con azitromicina + etambutol ± rifabutina"
    ],
    syndromes: ["tb-mac-pulm", "tb-lymphatic"] },

  { id: "mabscessus", name: "Mycobacterium abscessus complex", category: "mycobacteria", shape: "rod",
    blurb: "Rapidly growing NTM with intrinsic macrolide resistance (via inducible erm(41) gene in M. abscessus and M. bolletii subspecies); causes progressive pulmonary disease in bronchiectasis and cystic fibrosis; skin/soft tissue infections after trauma/surgery",
    blurb_es: "MNT de crecimiento rápido con resistencia intrínseca a macrólidos (gen erm(41) inducible en subespecies M. abscessus y M. bolletii); causa enfermedad pulmonar progresiva en bronquiectasias y fibrosis quística; infecciones de piel y partes blandas tras traumatismos o cirugía",
    pearls: [
      "Subspecies identification and macrolide susceptibility testing (erm(41) sequencing + 14-day incubation) are essential before treatment—M. massiliense (nonfunctional erm) is macrolide-susceptible, unlike M. abscessus subsp. abscessus",
      "No FDA-approved regimen; combination therapy guided by susceptibility results (amikacin, imipenem, azithromycin/clarithromycin if susceptible, clofazimine, linezolid, tigecycline)",
      "Imipenem-cilastatin/relebactam (Recarbrio) emerging as option in intensive phase for refractory pulmonary disease"
    ],
    pearls_es: [
      "La identificación de la subespecie y la prueba de sensibilidad a macrólidos (secuenciación de erm(41) + incubación 14 días) son esenciales antes del tratamiento: M. massiliense (erm no funcional) es sensible a macrólidos, a diferencia de M. abscessus subsp. abscessus",
      "No existe un esquema aprobado por la FDA; el tratamiento combinado se guía por los resultados de sensibilidad (amikacina, imipenem, azitromicina/claritromicina si sensible, clofazimina, linezolid, tigeciclina)",
      "Imipenem-cilastatina/relebactam (Recarbrio) emerge como opción en la fase intensiva para enfermedad pulmonar refractaria"
    ],
    syndromes: ["tb-mabscessus"] },

  { id: "mleprae", name: "Mycobacterium leprae", category: "mycobacteria", shape: "rod",
    blurb: "Obligate intracellular pathogen; highly tropism for skin macrophages and peripheral nerve Schwann cells; cannot be cultured in vitro; causes leprosy (Hansen disease)",
    blurb_es: "Patógeno intracelular obligado; marcado tropismo por macrófagos cutáneos y células de Schwann del nervio periférico; no puede cultivarse in vitro; causa lepra (enfermedad de Hansen)",
    pearls: [
      "Classified by WHO as paucibacillary (PB: 1–5 lesions, smear-negative) or multibacillary (MB: ≥6 lesions, smear-positive)—determines MDT duration (6 vs. 12 months)",
      "Type 1 (reversal) and Type 2 (erythema nodosum leprosum) lepra reactions require systemic corticosteroids in addition to continuing MDT",
      "Incubation period 2–12 years; transmitted via respiratory secretions from untreated MB leprosy patients; not highly contagious"
    ],
    pearls_es: [
      "Clasificada por la OMS como paucibacilar (PB: 1–5 lesiones, baciloscopia negativa) o multibacilar (MB: ≥6 lesiones, baciloscopia positiva): determina la duración del TDM (6 vs. 12 meses)",
      "Las reacciones leprosas Tipo 1 (reversa) y Tipo 2 (eritema nudoso leproso) requieren corticoides sistémicos además de continuar el TDM",
      "Período de incubación 2–12 años; se transmite por secreciones respiratorias de pacientes con lepra MB sin tratar; no es muy contagiosa"
    ],
    syndromes: ["tb-leprosy"] },

  { id: "mkansasii", name: "Mycobacterium kansasii", category: "mycobacteria", shape: "rod",
    blurb: "Slowly growing photochromogenic NTM; second most common cause of NTM pulmonary disease in the US; treatment response generally better than MAC; usually rifampin-susceptible",
    blurb_es: "MNT fotocromógena de crecimiento lento; segunda causa más frecuente de enfermedad pulmonar por MNT en EE. UU.; la respuesta al tratamiento suele ser mejor que en el CMA; habitualmente sensible a rifampicina",
    pearls: [
      "Rifampin susceptibility testing critical: rifampin-susceptible strains treated with INH + RIF + EMB daily for ≥18 months (or 12 months after sputum culture conversion); rifampin-resistant: substitute clarithromycin or moxifloxacin for rifampin",
      "ATS guideline recommends daily oral regimen (INH + RIF + EMB) rather than 3×/week for M. kansasii pulmonary disease",
      "Acquired rifampin resistance can occur with monotherapy—always use ≥3 drugs; test rifampin susceptibility in all isolates"
    ],
    pearls_es: [
      "La prueba de sensibilidad a rifampicina es crítica: cepas sensibles se tratan con INH + RIF + EMB diario durante ≥18 meses (o 12 meses tras conversión del cultivo de esputo); resistentes a rifampicina: sustituir por claritromicina o moxifloxacino",
      "La guía de la ATS recomienda el esquema oral diario (INH + RIF + EMB) en lugar de 3 veces por semana para la enfermedad pulmonar por M. kansasii",
      "Puede desarrollarse resistencia adquirida a rifampicina con monoterapia: usar siempre ≥3 fármacos; realizar prueba de sensibilidad a rifampicina en todos los aislados"
    ],
    syndromes: [] },
];

export const syndromes: Syndrome[] = [
  { id: "candidemia", name: "Candidemia / Invasive candidiasis", category: "bloodstream",
    blurb: "Echinocandin first. De-escalate based on speciation/sensitivities.",
    blurb_es: "Equinocandina de primera línea. Desescalar según especie y sensibilidades.",
    empiric: ["mica", "fluc", "ampho", "vori"],
    empiricPrimary: ["mica"],
    empiricAlternate: ["fluc", "ampho", "vori", "fluc"],
    sourceIds: ["candida-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Nonneutropenic: echinocandin (micafungin 100 mg/day, caspofungin 70 mg load then 50 mg/day, or anidulafungin 200 mg load then 100 mg/day) is preferred initial therapy. Fluconazole IV/PO (800 mg loading then 400 mg/day) acceptable for non-critically ill patients unlikely to have azole-resistant species. Transition echinocandin to fluconazole at 5-7 days if clinically stable, azole-susceptible isolate, and negative repeat cultures. Neutropenic: same echinocandin preference. Remove central venous catheter when feasible. Duration: minimum 2 weeks after documented clearance from bloodstream + resolution of symptoms. Ophthalmologic exam recommended.",
    guidelineNotes_es: "No neutropénico: la equinocandina (micafungina 100 mg/día, caspofungina 70 mg de carga luego 50 mg/día, o anidulafungina 200 mg de carga luego 100 mg/día) es el tratamiento inicial preferido. Fluconazol IV/VO (800 mg de carga luego 400 mg/día) aceptable en pacientes no críticos sin sospecha de especies resistentes a azoles. Transición de equinocandina a fluconazol a los 5–7 días si el paciente está clínicamente estable, el aislado es sensible a azoles y los cultivos de control son negativos. Neutropénico: misma preferencia por equinocandinas. Retirar catéter venoso central cuando sea factible. Duración: mínimo 2 semanas tras documentar aclaramiento sanguíneo + resolución de síntomas. Se recomienda examen oftalmológico.",
    commonBugs: ["candida-albicans", "candida-glabrata", "candida-krusei", "candida-auris"]},

  { id: "ic-mucocutaneous", name: "Mucocutaneous candidiasis", category: "skin",
    blurb: "Oral thrush, esophagitis, vaginitis.",
    blurb_es: "Candidiasis oral, esofagitis, vaginitis.",
    empiric: ["fluc", "itra", "posa", "vori", "mica", "ampho"],
    empiricPrimary: ["fluc"],
    empiricAlternate: ["itra", "posa", "vori", "mica", "ampho"],
    sourceIds: ["candida-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Oropharyngeal, mild: clotrimazole troches 10 mg 5 times/day x 7-14 days OR nystatin suspension. Oropharyngeal, moderate-severe: fluconazole 100-200 mg/day x 7-14 days. Esophageal: fluconazole 200-400 mg/day PO x 14-21 days (systemic therapy always required; diagnostic antifungal trial appropriate). If cannot tolerate oral: IV fluconazole 400 mg/day or IV echinocandin. Fluconazole-refractory esophageal: itraconazole solution 200 mg/day or voriconazole 200 mg BID x 14-21 days. Vulvovaginal: fluconazole 150 mg single oral dose (uncomplicated); recurring: 10-14 days induction then fluconazole 150 mg weekly x 6 months.",
    guidelineNotes_es: "Orofaríngea leve: trociscos de clotrimazol 10 mg 5 veces al día × 7–14 días O suspensión de nistatina. Orofaríngea moderada-grave: fluconazol 100–200 mg/día × 7–14 días. Esofágica: fluconazol 200–400 mg/día VO × 14–21 días (siempre se requiere tratamiento sistémico; es apropiado el ensayo antifúngico diagnóstico). Si no tolera la vía oral: fluconazol IV 400 mg/día o equinocandina IV. Esofágica refractaria a fluconazol: solución de itraconazol 200 mg/día o voriconazol 200 mg BID × 14–21 días. Vulvovaginal: fluconazol 150 mg dosis única oral (sin complicaciones); recurrente: inducción 10–14 días luego fluconazol 150 mg semanal × 6 meses.",
    commonBugs: ["candida-albicans", "candida-glabrata"]},

  { id: "ic-uti", name: "Candida UTI", category: "gu",
    blurb: "Asymptomatic candiduria rarely needs treatment. Symptomatic → fluconazole or AmB bladder irrigation.",
    blurb_es: "La candiduria asintomática raramente requiere tratamiento. Sintomática → fluconazol o irrigación vesical con anfotericina B.",
    empiric: ["fluc", "ampho", "flucy"],
    empiricPrimary: ["fluc"],
    empiricAlternate: ["ampho", "flucy"],
    sourceIds: ["candida-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Candida cystitis (fluconazole-susceptible): fluconazole 200 mg/day PO x 2 weeks. Fluconazole-resistant C. glabrata: amphotericin B deoxycholate 0.3-0.6 mg/kg/day IV x 1-7 days OR flucytosine 25 mg/kg QID x 7-10 days. C. krusei: amphotericin B. Echinocandins have poor urinary penetration and should be used with caution (generally limited to salvage). Asymptomatic candiduria: treat only if high-risk (neutropenic, undergoing urologic procedures, very low birth weight infants). Remove Foley catheters when feasible.",
    guidelineNotes_es: "Cistitis por Candida (sensible a fluconazol): fluconazol 200 mg/día VO × 2 semanas. C. glabrata resistente a fluconazol: anfotericina B desoxicolato 0,3–0,6 mg/kg/día IV × 1–7 días O flucitosina 25 mg/kg cada 6 h × 7–10 días. C. krusei: anfotericina B. Las equinocandinas tienen escasa penetración urinaria y deben usarse con precaución (generalmente limitadas a rescate). Candiduria asintomática: tratar solo en pacientes de alto riesgo (neutropénicos, sometidos a procedimientos urológicos, recién nacidos de muy bajo peso). Retirar catéter de Foley cuando sea factible.",
    commonBugs: ["candida-albicans", "candida-glabrata"]},

  { id: "crypto-meningitis", name: "Cryptococcal meningitis", category: "cns",
    blurb: "Induction → consolidation → maintenance.",
    blurb_es: "Inducción → consolidación → mantenimiento.",
    empiric: ["ampho", "flucy", "fluc"],
    empiricPrimary: ["ampho", "flucy"],
    empiricAlternate: ["fluc"],
    sourceIds: ["crypto-idsa-2010", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Induction (2 weeks): liposomal amphotericin B (AmB) 3-4 mg/kg/day IV + flucytosine 25 mg/kg QID (high-income setting). If flucytosine unavailable: AmB deoxycholate 0.7-1.0 mg/kg/day + fluconazole 800-1200 mg/day. Consolidation (8 weeks): fluconazole 400 mg/day PO. Maintenance (≥1 year): fluconazole 200 mg/day PO (continue until CD4 >200 in HIV). Serial therapeutic lumbar punctures to manage elevated ICP — critical for survival. HIV patients: delay ART initiation 4-6 weeks to avoid IRIS.",
    guidelineNotes_es: "Inducción (2 semanas): anfotericina B liposomal (L-AmB) 3–4 mg/kg/día IV + flucitosina 25 mg/kg cada 6 h (en entornos de altos ingresos). Si flucitosina no disponible: anfotericina B desoxicolato 0,7–1,0 mg/kg/día + fluconazol 800–1200 mg/día. Consolidación (8 semanas): fluconazol 400 mg/día VO. Mantenimiento (≥1 año): fluconazol 200 mg/día VO (continuar hasta CD4 >200 en VIH). Punciones lumbares terapéuticas seriadas para manejar la hipertensión intracraneal: fundamental para la supervivencia. Pacientes con VIH: diferir el inicio de TAR 4–6 semanas para evitar el SIRI.",
    commonBugs: ["crypto"]},

  { id: "ipa", name: "Invasive pulmonary aspergillosis", short: "IPA", category: "respiratory",
    blurb: "Voriconazole or isavuconazole first-line.",
    blurb_es: "Voriconazol o isavuconazol de primera línea.",
    empiric: ["vori", "isavu", "ampho", "posa", "mica"],
    empiricPrimary: ["vori"],
    empiricAlternate: ["isavu", "ampho", "posa", "mica"],
    sourceIds: ["aspergillosis-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Primary therapy: voriconazole 6 mg/kg IV q12h x 2 doses, then 4 mg/kg IV q12h; oral 200-300 mg q12h acceptable. Alternative primary: isavuconazole (strong recommendation, moderate evidence) OR liposomal amphotericin B 3-5 mg/kg/day. Combination voriconazole + echinocandin may be considered in select patients with documented IPA. Echinocandin monotherapy NOT recommended for primary therapy. Preemptive/empiric (febrile neutropenia): liposomal AmB, caspofungin, micafungin, or voriconazole. Duration: minimum 6-12 weeks depending on clinical response and immune recovery.",
    guidelineNotes_es: "Tratamiento primario: voriconazol 6 mg/kg IV cada 12 h × 2 dosis, luego 4 mg/kg IV cada 12 h; 200–300 mg VO cada 12 h es aceptable. Alternativa primaria: isavuconazol (recomendación fuerte, evidencia moderada) O anfotericina B liposomal 3–5 mg/kg/día. La combinación voriconazol + equinocandina puede considerarse en pacientes seleccionados con aspergilosis invasora documentada. La monoterapia con equinocandina NO se recomienda como tratamiento primario. Empírico/anticipado (neutropenia febril): L-AmB, caspofungina, micafungina o voriconazol. Duración: mínimo 6–12 semanas según respuesta clínica y recuperación inmunológica.",
    commonBugs: ["aspergillus"]},

  { id: "aspergilloma", name: "Aspergilloma / chronic", category: "respiratory",
    blurb: "Cavity-dwelling fungus ball. Itraconazole or surgery.",
    blurb_es: "Bola fúngica en cavidad. Itraconazol o cirugía.",
    empiric: ["vori", "itra", "posa", "isavu", "ampho"],
    empiricPrimary: ["vori", "itra"],
    empiricAlternate: ["posa", "isavu", "ampho"],
    sourceIds: ["aspergillosis-idsa-2016", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Simple aspergilloma (single cavity, no symptoms): antifungal treatment not routinely required; surgical resection for selected patients (hemoptysis, complications). Chronic cavitary pulmonary aspergillosis (CCPA)/chronic necrotizing (CNPA): treat symptomatic patients or those with progressive lung function loss or radiographic progression with minimum 6 months antifungal therapy. Preferred oral agents: itraconazole 200 mg BID or voriconazole 200 mg BID. Posaconazole 300 mg daily is useful third-line for adverse events or failure. Duration often 12-24+ months; relapse common after discontinuation.",
    guidelineNotes_es: "Aspergiloma simple (cavidad única, asintomático): no se requiere tratamiento antifúngico de rutina; resección quirúrgica en pacientes seleccionados (hemoptisis, complicaciones). Aspergilosis pulmonar cavitaria crónica (APCC)/aspergilosis necrosante crónica (ANC): tratar a pacientes sintomáticos o con pérdida progresiva de función pulmonar o progresión radiológica con un mínimo de 6 meses de tratamiento antifúngico. Fármacos orales preferidos: itraconazol 200 mg BID o voriconazol 200 mg BID. Posaconazol 300 mg diario es útil como tercera línea ante eventos adversos o fracaso. Duración frecuente 12–24+ meses; la recaída es común tras la suspensión.",
    commonBugs: ["aspergillus"]},

  { id: "mucor", name: "Mucormycosis", category: "respiratory",
    blurb: "Surgical debridement + L-AmB. Step-down to posa/isavu.",
    blurb_es: "Desbridamiento quirúrgico + L-AmB. Desescalar a posaconazol/isavuconazol.",
    empiric: ["ampho", "isavu", "posa"],
    empiricPrimary: ["ampho"],
    empiricAlternate: ["isavu", "posa"],
    sourceIds: ["mucor-idsociety-2019", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "First-line: liposomal amphotericin B (L-AmB) high dose (5-10 mg/kg/day IV) — drug of choice per global guidelines. Surgical debridement mandatory when possible; essential for rhinocerebral, cutaneous, and pulmonary forms. Reverse underlying immunosuppression/hyperglycemia when feasible. Step-down/alternative: isavuconazole 372 mg TID x 2 days (loading), then 372 mg daily (approved FDA 2015 for mucormycosis when AmB inappropriate). Posaconazole 300 mg daily (oral tablet) as alternative or salvage. Combination AmB + echinocandin not routinely recommended. Duration of treatment highly individualized (minimum weeks to months).",
    guidelineNotes_es: "Primera línea: anfotericina B liposomal (L-AmB) a dosis altas (5–10 mg/kg/día IV): fármaco de elección según guías globales. Desbridamiento quirúrgico obligatorio cuando sea posible; esencial en formas rinocerebral, cutánea y pulmonar. Revertir la inmunosupresión subyacente o la hiperglucemia cuando sea factible. Desescalada/alternativa: isavuconazol 372 mg TID × 2 días (carga), luego 372 mg diario (aprobado por FDA 2015 para mucormicosis cuando la anfotericina B no es apropiada). Posaconazol 300 mg diario (comprimido oral) como alternativa o rescate. La combinación anfotericina B + equinocandina no se recomienda de rutina. La duración del tratamiento es muy individualizada (mínimo semanas a meses).",
    commonBugs: ["mucor"]},

  { id: "dimorphic", name: "Dimorphic fungi", category: "systemic",
    blurb: "Histo / blasto / cocci. Itraconazole or AmB by severity.",
    blurb_es: "Histoplasma / Blastomyces / Coccidioides. Itraconazol o anfotericina B según gravedad.",
    empiric: ["itra", "ampho", "fluc", "vori", "posa"],
    empiricPrimary: ["itra", "ampho"],
    empiricAlternate: ["fluc", "vori", "posa"],
    sourceIds: ["histo-idsa-2007", "blasto-ecmm-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Histoplasmosis — disseminated/severe: liposomal AmB 3 mg/kg/day x 1-2 weeks then itraconazole 200 mg TID x 3 days then BID x ≥12 months. Mild-moderate pulmonary histo (symptomatic): itraconazole 200 mg BID x 6-12 weeks (conditionally). Blastomycosis — severe/CNS: liposomal AmB induction then step-down to itraconazole 200 mg BID x 6-12 months. Mild-moderate blastomycosis: itraconazole 200 mg TID x 3 days then BID x 6-12 months. Coccidioidomycosis — primary pulmonary in immunocompetent usually self-limited; disseminated or severe: fluconazole 400 mg/day or itraconazole 200 mg BID; meningitis: fluconazole 400-800 mg/day lifelong. Itraconazole levels should be monitored.",
    guidelineNotes_es: "Histoplasmosis — diseminada/grave: L-AmB 3 mg/kg/día × 1–2 semanas, luego itraconazol 200 mg TID × 3 días, luego BID × ≥12 meses. Histoplasmosis pulmonar leve-moderada (sintomática): itraconazol 200 mg BID × 6–12 semanas (condicionalmente). Blastomicosis — grave/SNC: inducción con L-AmB y luego desescalar a itraconazol 200 mg BID × 6–12 meses. Blastomicosis leve-moderada: itraconazol 200 mg TID × 3 días luego BID × 6–12 meses. Coccidioidomicosis — pulmonar primaria en inmunocompetentes usualmente autolimitada; diseminada o grave: fluconazol 400 mg/día o itraconazol 200 mg BID; meningitis: fluconazol 400–800 mg/día de por vida. Monitorear niveles de itraconazol.",
    commonBugs: ["histo", "blasto", "cocci"]},

  { id: "pjp", name: "PJP pneumonia", category: "respiratory",
    blurb: "TMP-SMX + steroids if hypoxic. (TMP-SMX in antibacterials data.)",
    blurb_es: "TMP-SMX + corticoides si hay hipoxia. (TMP-SMX se encuentra en los datos de antibacterianos.)",
    empiric: ["tmpsmx", "dapto"],
    empiricPrimary: ["tmpsmx"],
    empiricAlternate: ["dapto"],
    sourceIds: ["pjp-nih-oi-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Drug of choice: TMP-SMX (trimethoprim 15-20 mg/kg/day + sulfamethoxazole 75-100 mg/kg/day) PO or IV in 3-4 divided doses x 21 days. IV for severe disease (PaO2 <70 mmHg or A-a gradient >35 mmHg). Adjunctive corticosteroids (prednisone 40 mg BID x 5 days → 40 mg/day x 5 days → 20 mg/day x 11 days) in HIV-infected patients with moderate-severe PJP. Alternatives: pentamidine 4 mg/kg IV/day x 21 days; dapsone 100 mg/day + trimethoprim 5 mg/kg TID (mild-moderate); atovaquone 750 mg BID (mild-moderate); primaquine + clindamycin (salvage). Note: dapsone is not in the CoverageIQ drug vocabulary — atovaquone and pentamidine are also not listed.",
    guidelineNotes_es: "Fármaco de elección: TMP-SMX (trimetoprim 15–20 mg/kg/día + sulfametoxazol 75–100 mg/kg/día) VO o IV en 3–4 dosis divididas × 21 días. IV para enfermedad grave (PaO₂ <70 mmHg o gradiente A-a >35 mmHg). Corticoides adyuvantes (prednisona 40 mg BID × 5 días → 40 mg/día × 5 días → 20 mg/día × 11 días) en pacientes con VIH y PJP moderada-grave. Alternativas: pentamidina 4 mg/kg IV/día × 21 días; dapsona 100 mg/día + trimetoprim 5 mg/kg TID (leve-moderada); atovacuona 750 mg BID (leve-moderada); primaquina + clindamicina (rescate). Nota: la dapsona no está en el vocabulario farmacológico de CoverageIQ, tampoco atovacuona ni pentamidina.",
    commonBugs: ["pjp"]},

  // ---- Mycobacterial syndromes (TB / NTM / leprosy) ----
  // ---- Mycobacterial syndromes (TB / NTM / leprosy) ----
  { id: "tb-pulmonary-ds", name: "Active Pulmonary TB (Drug-Susceptible)", short: "DS-TB", category: "mycobacterial",
    blurb: "Standard-of-care treatment for drug-susceptible pulmonary Mtb; 6-month RIPE regimen remains backbone with 4-month RPT-MOX now an option for eligible adults",
    blurb_es: "Tratamiento estándar para TB pulmonar sensible a fármacos; el esquema RIPE de 6 meses sigue siendo la base, con el esquema RPT-MOX de 4 meses como opción para adultos elegibles",
    empiric: ["inh", "rif", "pza", "emb", "rpt", "moxi"], empiricPrimary: ["inh", "rif", "pza", "emb", "rpt", "moxi"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-tb-2016", "cdc-rpt-mox-2022", "ats-cdc-idsa-2025"],
    guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily (weight-based) + EMB 15–20 mg/kg PO daily | Continuation phase (4 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Add pyridoxine 25–50 mg PO daily throughout (B6 for all patients) | Alternative 4-month regimen (≥12 years, ≥40 kg, drug-susceptible): 2HPZM/2HPM — RPT 600 mg + MOX 400 mg + INH 5 mg/kg [max 300 mg] + PZA (wt-based) daily × 8 weeks, then RPT 600 mg + MOX 400 mg + INH 5 mg/kg [max 300 mg] daily × 9 weeks (119 total doses) — ALTERNATE: 3× weekly DOT regimen (all drugs 3×/week): INH 15 mg/kg + RIF 10 mg/kg + PZA (35–45 mg/kg) + EMB (30 mg/kg) × 8 weeks then INH 15 mg/kg + RIF 10 mg/kg × 18 weeks (avoid in HIV, cavitary disease) | If cavitation on CXR + positive culture at 2 months: extend continuation phase to 7 months (total 9 months) — Standard regimen 2HRZE/4HR: 2-month intensive phase (RIPE) followed by 4-month continuation (RI). Daily DOT or video-observed therapy (VOT) preferred; 5 days/week counts as daily. Add pyridoxine 25–50 mg/day to prevent INH-induced peripheral neuropathy (mandatory for HIV+, DM, CKD, elderly, pregnancy, alcohol use). Extend continuation to 7 months if cavitation on baseline CXR and sputum culture remains positive at 2 months. The 2022 CDC/NIH 4-month RPT-MOX regimen (Study 31/A5349) is conditionally recommended for adults ≥12 years with drug-susceptible ... [truncated, 2248 chars]",
    guidelineNotes_es: "PRIMARIO: Fase intensiva (2 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario + PZA 20–25 mg/kg VO diario (según peso) + EMB 15–20 mg/kg VO diario | Fase de continuación (4 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario | Agregar piridoxina 25–50 mg VO diario durante todo el tratamiento (B6 para todos los pacientes) | Esquema alternativo de 4 meses (≥12 años, ≥40 kg, sensible a fármacos): 2HPZM/2HPM — RPT 600 mg + MOX 400 mg + INH 5 mg/kg [máx. 300 mg] + PZA (según peso) diario × 8 semanas, luego RPT 600 mg + MOX 400 mg + INH 5 mg/kg [máx. 300 mg] diario × 9 semanas (119 dosis totales) — ALTERNATIVO: Esquema TDO 3 veces por semana (todos los fármacos 3×/semana): INH 15 mg/kg + RIF 10 mg/kg + PZA (35–45 mg/kg) + EMB (30 mg/kg) × 8 semanas, luego INH 15 mg/kg + RIF 10 mg/kg × 18 semanas (evitar en VIH y enfermedad cavitaria) | Si cavitación en Rx de tórax + cultivo positivo a los 2 meses: extender fase de continuación a 7 meses (total 9 meses) — Esquema estándar 2HRZE/4HR: fase intensiva de 2 meses (RIPE) seguida de fase de continuación de 4 meses (RI). TDO diario o terapia observada por video (TOV) preferidos; 5 días/semana equivale a diario. Agregar piridoxina 25–50 mg/día para prevenir neuropatía periférica inducida por INH (obligatorio en VIH+, DM, ERC, adultos mayores, embarazo, consumo de alcohol). Extender continuación a 7 meses si hay cavitación en Rx de tórax basal y el cultivo de esputo permanece positivo a los 2 meses. El esquema RPT-MOX de 4 meses (Estudio 31/A5349) está condicionalmente recomendado para adultos ≥12 años con TB sensible a fármacos.",
    commonBugs: ["mtb"] },

  { id: "tb-ltbi", name: "Latent TB Infection (LTBI)", short: "LTBI", category: "mycobacterial",
    blurb: "Treatment of latent Mtb infection to prevent progression to active TB disease; short rifamycin-based regimens preferred over 9-month isoniazid monotherapy",
    blurb_es: "Tratamiento de la ITBL para prevenir la progresión a TB activa; los esquemas cortos basados en rifamicinas son preferidos sobre la monoterapia con isoniazida de 9 meses",
    empiric: ["inh", "rif", "rpt"], empiricPrimary: ["inh", "rif", "rpt"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-ltbi-2020"],
    guidelineNotes: "PRIMARY: 3HP (preferred): INH 15 mg/kg [max 900 mg] PO + RPT (weight-based: ≥50 kg 900 mg; 32–49.9 kg 750 mg; 25.1–32 kg 600 mg) PO once weekly × 12 doses; DOT or VOT required | 4R: RIF 10 mg/kg [max 600 mg] PO daily × 4 months (120 doses); self-administered acceptable | 3HR: INH 5 mg/kg [max 300 mg] + RIF 10 mg/kg [max 600 mg] PO daily × 3 months (90 doses) — ALTERNATE: 9H: INH 5 mg/kg [max 300 mg] PO daily × 9 months (270 doses); alternative when rifamycin contraindicated or drug interactions prohibitive | 6H: INH 5 mg/kg [max 300 mg] PO daily × 6 months (180 doses); less preferred due to lower completion rates vs short-course | Add pyridoxine 25–50 mg/day with any INH-containing regimen for high-risk patients — NTCA/CDC 2020 guidelines preferentially recommend short-course rifamycin-based regimens (3HP, 4R, 3HR) over 6–9 months isoniazid monotherapy due to higher completion rates, equivalent efficacy, and lower toxicity. 3HP (once-weekly INH + RPT × 12) has highest completion of all options; can be DOT or VOT. Rule out active TB disease before initiating. Review rifamycin drug interactions (ART, warfarin, oral contraceptives) before selecting regimen; use 9H if rifamycin interactions not manageable. Add pyridoxine 25–50 mg/day with INH for neuropathy prevention in at-risk patients. Reassess LTBI treatment in contacts with documented exposure to INH-resistant or MDR-TB sources.",
    guidelineNotes_es: "PRIMARIO: 3HP (preferido): INH 15 mg/kg [máx. 900 mg] VO + RPT (según peso: ≥50 kg 900 mg; 32–49,9 kg 750 mg; 25,1–32 kg 600 mg) VO una vez por semana × 12 dosis; se requiere TDO o TOV | 4R: RIF 10 mg/kg [máx. 600 mg] VO diario × 4 meses (120 dosis); autoadministración aceptable | 3HR: INH 5 mg/kg [máx. 300 mg] + RIF 10 mg/kg [máx. 600 mg] VO diario × 3 meses (90 dosis) — ALTERNATIVO: 9H: INH 5 mg/kg [máx. 300 mg] VO diario × 9 meses (270 dosis); alternativa cuando la rifamicina está contraindicada o las interacciones farmacológicas son prohibitivas | 6H: INH 5 mg/kg [máx. 300 mg] VO diario × 6 meses (180 dosis); menos preferido por menores tasas de completamiento respecto a esquemas cortos | Agregar piridoxina 25–50 mg/día con cualquier esquema que contenga INH en pacientes de alto riesgo — Las guías NTCA/CDC 2020 recomiendan preferentemente los esquemas cortos basados en rifamicinas (3HP, 4R, 3HR) sobre la monoterapia con isoniazida de 6–9 meses por sus mayores tasas de completamiento, eficacia equivalente y menor toxicidad. El 3HP (INH + RPT una vez por semana × 12) tiene el mayor completamiento de todas las opciones; puede ser TDO o TOV. Descartar TB activa antes de iniciar. Revisar las interacciones farmacológicas de las rifamicinas (TAR, warfarina, anticonceptivos orales) antes de seleccionar el esquema; usar 9H si las interacciones son inmanejables. Agregar piridoxina 25–50 mg/día con INH para prevenir neuropatía en pacientes de riesgo. Reevaluar el tratamiento de ITBL en contactos con exposición documentada a fuentes de TB resistente a INH o TB-MDR.",
    commonBugs: ["mtb"] },

  { id: "tb-meningitis", name: "CNS TB / TB Meningitis", short: "TBM", category: "mycobacterial",
    blurb: "Most severe form of TB; 12 months total therapy with adjunctive dexamethasone; high mortality and disability without prompt treatment",
    blurb_es: "Forma más grave de TB; 12 meses de tratamiento total con dexametasona adyuvante; alta mortalidad y discapacidad sin tratamiento oportuno",
    empiric: ["inh", "rif", "pza", "emb", "levo", "moxi", "linezolid", "cs", "eto"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: ["levo", "moxi", "linezolid", "cs", "eto"], sourceIds: ["ats-cdc-idsa-tb-2016", "ats-cdc-idsa-2025"],
    guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO/IV daily + RIF 10 mg/kg [max 600 mg] PO/IV daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (10 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Adjunctive: Dexamethasone 0.4 mg/kg/day IV/PO tapering over 6–8 weeks (adult); start at same time as anti-TB therapy | Add pyridoxine 25–50 mg PO daily — ALTERNATE: If INH resistance confirmed or suspected: replace INH with levofloxacin 750–1000 mg PO daily (good CNS penetration) | Drug-resistant CNS TB: consult ID/TB specialist; use drugs with adequate CNS penetration (LFX, MOX, ETO/PTO, CS, LZD) — TB meningitis requires 12 months total therapy (2 months intensive + 10 months continuation). Adjunctive dexamethasone strongly recommended for HIV-negative patients (reduces mortality; high certainty evidence); weak recommendation for PLHIV (uncertain benefit, but safe). Standard rifampin dose 10 mg/kg/day—no definitive evidence that higher doses (15+ mg/kg) reduce mortality, though ongoing trials (HARVEST, INTENSE-TBM) are evaluating. Defer ART 4–8 weeks after starting TB treatment in TB meningitis/HIV co-infection (one RCT; exception to usual ≤2-week rule) to reduce IRIS-related inflammatory CNS complications. Use drugs with good CNS penetration: INH (excellent), PZA (excellent), RIF (moderate), EMB (poor—use nonetheless to cover resistance). Daily regimen throughout (no intermittent dosing for CNS TB)... [truncated, 2026 chars]",
    guidelineNotes_es: "PRIMARIO: Fase intensiva (2 meses): INH 5 mg/kg [máx. 300 mg] VO/IV diario + RIF 10 mg/kg [máx. 600 mg] VO/IV diario + PZA 20–25 mg/kg VO diario + EMB 15–20 mg/kg VO diario | Fase de continuación (10 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario | Adyuvante: dexametasona 0,4 mg/kg/día IV/VO en reducción progresiva durante 6–8 semanas (adultos); iniciar al mismo tiempo que el tratamiento antituberculoso | Agregar piridoxina 25–50 mg VO diario — ALTERNATIVO: Si se confirma o sospecha resistencia a INH: reemplazar INH por levofloxacino 750–1000 mg VO diario (buena penetración en SNC) | TB del SNC resistente: consultar con especialista en infecciología/TB; usar fármacos con adecuada penetración en SNC (LFX, MOX, ETO/PTO, CS, LZD) — La meningitis tuberculosa requiere 12 meses de tratamiento total (2 meses de fase intensiva + 10 meses de continuación). La dexametasona adyuvante está fuertemente recomendada en pacientes VIH negativos (reduce mortalidad; evidencia de alta certeza); recomendación débil para PVVS (beneficio incierto, pero segura). Dosis estándar de rifampicina 10 mg/kg/día; sin evidencia definitiva de que dosis más altas (≥15 mg/kg) reduzcan mortalidad, aunque ensayos en curso (HARVEST, INTENSE-TBM) están evaluándolo. Diferir TAR 4–8 semanas tras iniciar tratamiento de TB en coinfección TB-meningitis/VIH (excepción a la regla habitual de ≤2 semanas) para reducir complicaciones inflamatorias del SNC por SIRI. Usar fármacos con buena penetración en SNC: INH (excelente), PZA (excelente), RIF (moderada), EMB (escasa, pero se usa para cobertura de resistencias). Régimen diario durante todo el tratamiento (sin dosificación intermitente en TB del SNC).",
    commonBugs: ["mtb"] },

  { id: "tb-miliary", name: "Miliary / Disseminated TB", short: "Miliary-TB", category: "mycobacterial",
    blurb: "Life-threatening hematogenous dissemination of Mtb; treatment mirrors pulmonary TB but duration extended to 9–12 months if CNS involvement present",
    blurb_es: "Diseminación hematógena potencialmente mortal de M. tuberculosis; el tratamiento es similar al de la TB pulmonar, pero la duración se extiende a 9–12 meses si hay compromiso del SNC",
    empiric: ["inh", "rif", "pza", "emb"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-tb-2016"],
    guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (4 months, no CNS involvement): INH + RIF daily (total 6 months) | If CNS/meningeal involvement: extend total duration to 12 months (see TB meningitis regimen) | Add pyridoxine 25–50 mg PO daily — ALTERNATE: Consider adjunctive corticosteroids (dexamethasone or prednisolone) for patients with severe respiratory compromise, serositis, or adrenal insufficiency | Daily dosing recommended for entire course (no intermittent dosing given severity) — Miliary TB uses the standard RIPE regimen; minimum 6 months for disseminated disease without CNS involvement, extended to 9–12 months for CNS/meningeal co-involvement or slow treatment response. Evaluate for TB meningitis in all miliary TB cases—lumbar puncture should be performed if feasible. Daily therapy throughout the entire course is recommended given severity. Adjunctive corticosteroids may benefit patients with severe hypoxia, serositis, or adrenal insufficiency complicating miliary disease. DST results from any culture-positive site should guide therapy. IRIS may occur in HIV co-infection after ART initiation; manage with NSAIDs, and prednisolone if severe.",
    guidelineNotes_es: "PRIMARIO: Fase intensiva (2 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario + PZA 20–25 mg/kg VO diario + EMB 15–20 mg/kg VO diario | Fase de continuación (4 meses, sin compromiso del SNC): INH + RIF diario (total 6 meses) | Si hay compromiso del SNC/meningeal: extender duración total a 12 meses (ver esquema de meningitis tuberculosa) | Agregar piridoxina 25–50 mg VO diario — ALTERNATIVO: Considerar corticoides adyuvantes (dexametasona o prednisolona) en pacientes con compromiso respiratorio grave, serositis o insuficiencia suprarrenal | Se recomienda dosificación diaria durante todo el tratamiento (sin dosificación intermitente dada la gravedad) — La TB miliar utiliza el esquema RIPE estándar; mínimo 6 meses para enfermedad diseminada sin compromiso del SNC, extendido a 9–12 meses si hay co-compromiso del SNC/meningeal o respuesta lenta al tratamiento. Evaluar meningitis tuberculosa en todos los casos de TB miliar: realizar punción lumbar si es factible. Se recomienda tratamiento diario durante todo el curso dada la gravedad. Los corticoides adyuvantes pueden beneficiar a pacientes con hipoxia grave, serositis o insuficiencia suprarrenal que complica la TB miliar. Los resultados de DST de cualquier sitio con cultivo positivo deben guiar el tratamiento. El SIRI puede ocurrir en coinfección VIH tras el inicio de TAR; manejar con AINEs y prednisolona en casos graves.",
    commonBugs: ["mtb"] },

  { id: "tb-pleural", name: "Pleural TB", short: "Pleural-TB", category: "mycobacterial",
    blurb: "TB pleuritis/pleural effusion from parietal pleura hypersensitivity reaction to Mtb; responds well to standard anti-TB therapy with same 6-month duration as pulmonary TB",
    blurb_es: "Pleuritis tuberculosa/derrame pleural por reacción de hipersensibilidad de la pleura parietal a M. tuberculosis; responde bien al tratamiento antituberculoso estándar con la misma duración de 6 meses que la TB pulmonar",
    empiric: ["inh", "rif", "pza", "emb"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: [], sourceIds: ["ats-cdc-idsa-tb-2016"],
    guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (4 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Add pyridoxine 25–50 mg PO daily — ALTERNATE: Adjunctive corticosteroids (prednisolone 0.75 mg/kg/day tapering over 4 weeks) may accelerate fluid reabsorption—evidence limited, not routinely recommended | Therapeutic thoracentesis for large symptomatic effusions; chest tube rarely required — TB pleuritis is most often a hypersensitivity reaction to Mtb antigens in the pleural space and may occur with primary or reactivation TB. Sputum and pleural fluid cultures are often negative; pleural biopsy and ADA (adenosine deaminase) elevation are diagnostically helpful. Standard 6-month RIPE regimen is effective; total duration same as pulmonary TB. Adjunctive corticosteroids may speed resolution of effusion and symptoms but do not clearly improve long-term outcomes. Most TB pleural effusions resolve with anti-TB therapy alone. Ensure DST performed on any culture-positive specimen. Daily therapy is recommended.",
    guidelineNotes_es: "PRIMARIO: Fase intensiva (2 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario + PZA 20–25 mg/kg VO diario + EMB 15–20 mg/kg VO diario | Fase de continuación (4 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario | Agregar piridoxina 25–50 mg VO diario — ALTERNATIVO: Los corticoides adyuvantes (prednisolona 0,75 mg/kg/día en reducción progresiva durante 4 semanas) pueden acelerar la reabsorción del líquido: evidencia limitada, no se recomienda de rutina | Toracocentesis terapéutica en derrames grandes y sintomáticos; tubo de drenaje raramente necesario — La pleuritis tuberculosa es en la mayoría de los casos una reacción de hipersensibilidad a antígenos de M. tuberculosis en el espacio pleural y puede ocurrir con TB primaria o reactivación. Los cultivos de esputo y líquido pleural frecuentemente son negativos; la biopsia pleural y la elevación de ADA (adenosina desaminasa) son diagnósticamente útiles. El esquema RIPE estándar de 6 meses es efectivo; la duración total es la misma que para TB pulmonar. Los corticoides adyuvantes pueden acelerar la resolución del derrame y los síntomas, pero no mejoran claramente los resultados a largo plazo. La mayoría de los derrames pleurales tuberculosos se resuelven solo con el tratamiento antituberculoso. Realizar DST en cualquier muestra con cultivo positivo. Se recomienda tratamiento diario.",
    commonBugs: ["mtb"] },

  { id: "tb-lymphatic", name: "Lymphatic TB (Scrofula)", short: "TB-Lymph", category: "mycobacterial",
    blurb: "TB lymphadenitis (most common extrapulmonary TB site); standard 6-month RIPE regimen effective; paradoxical enlargement of nodes common during treatment",
    blurb_es: "Linfadenitis tuberculosa (sitio más frecuente de TB extrapulmonar); el esquema RIPE estándar de 6 meses es efectivo; el agrandamiento paradójico de los ganglios es frecuente durante el tratamiento",
    empiric: ["inh", "rif", "pza", "emb", "azithro"], empiricPrimary: ["inh", "rif", "pza", "emb"], empiricAlternate: ["azithro"], sourceIds: ["ats-cdc-idsa-tb-2016"],
    guidelineNotes: "PRIMARY: Intensive phase (2 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily + PZA 20–25 mg/kg PO daily + EMB 15–20 mg/kg PO daily | Continuation phase (4 months): INH 5 mg/kg [max 300 mg] PO daily + RIF 10 mg/kg [max 600 mg] PO daily | Add pyridoxine 25–50 mg PO daily — ALTERNATE: NTM lymphadenitis (especially in children, MAC): surgical excision preferred; azithromycin + rifampin + ethambutol if excision incomplete | Consider 9 months total if slow response or immunocompromised host — TB lymphadenitis (cervical scrofula most common) is treated with the same 6-month RIPE regimen as pulmonary TB; studies show equivalent outcomes between 6 and 9 months for drug-susceptible organisms. Paradoxical enlargement of lymph nodes (new or enlarging nodes) occurs in 15–25% of patients during initial weeks of therapy and does not indicate treatment failure—continue anti-TB therapy; NSAIDs may help symptoms. Residual lymph node abnormality on imaging after 6 months does not alone require extended therapy. Excision is generally not required for TB lymphadenitis but may help if abscess forms. Send tissue for AFB smear, culture, and histopathology at excision/biopsy.",
    guidelineNotes_es: "PRIMARIO: Fase intensiva (2 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario + PZA 20–25 mg/kg VO diario + EMB 15–20 mg/kg VO diario | Fase de continuación (4 meses): INH 5 mg/kg [máx. 300 mg] VO diario + RIF 10 mg/kg [máx. 600 mg] VO diario | Agregar piridoxina 25–50 mg VO diario — ALTERNATIVO: Linfadenitis por MNT (especialmente en niños, CMA): se prefiere escisión quirúrgica; azitromicina + rifampicina + etambutol si la escisión es incompleta | Considerar 9 meses en total si la respuesta es lenta o el huésped está inmunocomprometido — La linfadenitis tuberculosa (escrófula cervical es la más frecuente) se trata con el mismo esquema RIPE de 6 meses que la TB pulmonar; los estudios muestran resultados equivalentes entre 6 y 9 meses para organismos sensibles. El agrandamiento paradójico de los ganglios linfáticos (ganglios nuevos o que crecen) ocurre en el 15–25% de los pacientes durante las primeras semanas de tratamiento y no indica fracaso terapéutico: continuar el tratamiento antituberculoso; los AINEs pueden aliviar los síntomas. La anomalía ganglionar residual en imagen después de 6 meses por sí sola no requiere tratamiento prolongado. La escisión generalmente no es necesaria para la linfadenitis tuberculosa, pero puede ser útil si se forma un absceso. Enviar tejido para baciloscopia, cultivo e histopatología en escisión/biopsia.",
    commonBugs: ["mtb", "mavium"] },

  { id: "tb-hiv", name: "TB + HIV Co-treatment", short: "TB-HIV", category: "mycobacterial",
    blurb: "TB/HIV co-infection requires coordinated anti-TB and ART timing; rifamycin-ART drug interactions mandate regimen selection based on CD4 count and ART choice",
    blurb_es: "La coinfección TB/VIH requiere coordinación en el inicio de tratamiento antituberculoso y TAR; las interacciones farmacológicas rifamicina-TAR determinan la selección del esquema según el recuento de CD4 y el TAR elegido",
    empiric: ["rif", "rfb"], empiricPrimary: ["rif"], empiricAlternate: ["rfb"], sourceIds: ["ats-cdc-idsa-tb-2016", "who-tb-2022"],
    guidelineNotes: "PRIMARY: Anti-TB: Standard 2HRZE/4HR daily regimen (rifampin-based preferred; do not use intermittent dosing at CD4 <100) | ART timing: CD4 <50 cells/mm³ → start ART within 2 weeks of TB treatment; CD4 ≥50 → start ART within 2–8 weeks; TB meningitis → defer ART 4–8 weeks | Preferred ART with rifampin: Efavirenz 600 mg PO daily (no dose adjustment needed) or Dolutegravir 50 mg PO twice daily (double standard dose due to rifampin CYP induction) | Add pyridoxine 25–50 mg PO daily — ALTERNATE: If PI-based ART required: substitute rifabutin 150 mg PO daily for rifampin (reduces rifamycin induction of PIs) | Raltegravir 400 mg PO twice daily: acceptable alternative INSTI with rifampin (less affected than dolutegravir) | Rifabutin 300 mg PO daily with EFV-based ART (EFV induces rifabutin—increase dose) — All PLHIV with active TB who are ART-naive should start ART. Rifampin is a potent CYP3A4 inducer—reduces levels of most PIs and some INSTIs significantly. Preferred approach: use efavirenz-based or dolutegravir-based ART (DTG 50 mg twice daily) with standard rifampin-based TB regimen. If PI-based ART is mandatory, substitute rifabutin 150 mg daily for rifampin. Dolutegravir once-daily may be adequate with rifampin per recent phase 2b data, but standard guidance remains twice-daily DTG. Monitor for IRIS (inflammatory reconstitution syndrome) 2–8 weeks after ART initiation; treat with NSAIDs; prednisone 1.5 mg/kg/day tapering over 4 weeks for severe IRIS. Avoid rifapentine 3HP for LTBI in patients requiring twice-daily DTG.",
    guidelineNotes_es: "PRIMARIO: Tratamiento antituberculoso: esquema diario estándar 2HRZE/4HR (preferido basado en rifampicina; no usar dosificación intermitente con CD4 <100) | Inicio de TAR: CD4 <50 células/mm³ → iniciar TAR dentro de las 2 semanas del inicio del tratamiento de TB; CD4 ≥50 → iniciar TAR dentro de las 2–8 semanas; meningitis tuberculosa → diferir TAR 4–8 semanas | TAR preferido con rifampicina: Efavirenz 600 mg VO diario (sin ajuste de dosis) o Dolutegravir 50 mg VO dos veces al día (doble de la dosis estándar por inducción del CYP por rifampicina) | Agregar piridoxina 25–50 mg VO diario — ALTERNATIVO: Si se requiere TAR basado en IP: sustituir rifabutina 150 mg VO diario por rifampicina (reduce la inducción de rifamicinas sobre los IP) | Raltegravir 400 mg VO dos veces al día: IIE alternativo aceptable con rifampicina (menos afectado que dolutegravir) | Rifabutina 300 mg VO diario con TAR basado en EFV (EFV induce rifabutina: aumentar dosis) — Todas las PVVS con TB activa y TAR-naïves deben iniciar TAR. La rifampicina es un potente inductor de CYP3A4: reduce significativamente los niveles de la mayoría de los IP y algunos IIE. Enfoque preferido: usar TAR basado en efavirenz o dolutegravir (DTG 50 mg dos veces al día) con esquema de TB basado en rifampicina. Si el TAR basado en IP es obligatorio, sustituir rifabutina 150 mg diario por rifampicina. El dolutegravir una vez al día puede ser adecuado con rifampicina según datos recientes de fase 2b, pero la guía estándar sigue siendo DTG dos veces al día. Vigilar SIRI 2–8 semanas tras el inicio de TAR; tratar con AINEs; prednisona 1,5 mg/kg/día en reducción progresiva durante 4 semanas en SIRI grave. Evitar rifapentina 3HP para ITBL en pacientes que requieren DTG dos veces al día.",
    commonBugs: ["mtb"] },

  { id: "tb-mdr", name: "MDR-TB Regimen (BPaLM/BPaL)", short: "MDR-TB", category: "mycobacterial",
    blurb: "Multidrug-resistant TB (resistant to at least INH and RIF); WHO 2022 and ATS/CDC/ERS/IDSA 2025 recommend 6-month all-oral BPaLM or BPaL regimens",
    blurb_es: "TB multirresistente (resistente al menos a INH y RIF); la OMS 2022 y ATS/CDC/ERS/IDSA 2025 recomiendan los esquemas orales BPaLM o BPaL de 6 meses",
    empiric: ["moxi", "bdq", "pa", "linezolid", "pza", "emb", "levo", "cfz", "eto"], empiricPrimary: ["moxi", "bdq", "pa", "linezolid"], empiricAlternate: ["pza", "emb", "levo", "cfz", "eto"], sourceIds: ["who-bpalm-2022", "ats-cdc-idsa-2025", "curry-mdr-tb"],
    guidelineNotes: "PRIMARY: BPaLM (fluoroquinolone-susceptible): Bedaquiline 400 mg PO daily × 2 wk then 200 mg PO 3×/wk × 22 wk + Pretomanid 200 mg PO daily × 26 wk + Linezolid 600 mg PO daily × 26 wk + Moxifloxacin 400 mg PO daily × 26 wk (total 26 weeks/6 months) | BPaL (fluoroquinolone-resistant or intolerant): Bedaquiline + Pretomanid (as above) + Linezolid 600 mg PO daily × 26 wk; extend to 39 wk if culture conversion delayed >8 weeks — ALTERNATE: If linezolid toxicity: reduce to 300 mg daily (do not discontinue before week 9 without necessity) | 9-month oral regimen (fluoroquinolone-susceptible, no FQ resistance): BDQ + LFX/MOX + ETH + PZA + EMB + clofazimine (alternately for those not meeting BPaLM criteria) | Longer individualized regimens (18 months) if exposure to BDQ/LZD >1 month prior — BPaLM (6-month all-oral) is the WHO 2022 and ATS/CDC/ERS/IDSA 2025 preferred regimen for MDR/RR-TB with fluoroquinolone susceptibility (ages ≥14 years, pulmonary). BPaL is recommended for fluoroquinolone-resistant or pre-XDR-TB. DOT/VOT mandatory. Critical safety monitoring: ECG at baseline, weeks 2 and 4, then monthly for QTc (bedaquiline + moxifloxacin + clofazimine have additive QTc effects); CBC weekly initial 8 weeks for linezolid myelosuppression; optic nerve/peripheral neuropathy assessment monthly (linezolid). Linezolid TDM trough goal <2 mcg/mL. Extend to 9 months if sputum culture conversion does not occur by week 8. Expert TB consultation mandatory before initi... [truncated, 2031 chars]",
    guidelineNotes_es: "PRIMARIO: BPaLM (sensible a fluoroquinolonas): Bedaquilina 400 mg VO diario × 2 semanas, luego 200 mg VO 3 veces/semana × 22 semanas + Pretomanid 200 mg VO diario × 26 semanas + Linezolid 600 mg VO diario × 26 semanas + Moxifloxacino 400 mg VO diario × 26 semanas (total 26 semanas/6 meses) | BPaL (resistente a fluoroquinolonas o intolerante): Bedaquilina + Pretomanid (como arriba) + Linezolid 600 mg VO diario × 26 semanas; extender a 39 semanas si la conversión del cultivo se demora >8 semanas — ALTERNATIVO: Si toxicidad por linezolid: reducir a 300 mg diario (no suspender antes de la semana 9 sin necesidad) | Esquema oral de 9 meses (sensible a fluoroquinolonas, sin resistencia a FQ): BDQ + LFX/MOX + ETH + PZA + EMB + clofazimina (alternativa para quienes no cumplen criterios de BPaLM) | Esquemas individualizados más prolongados (18 meses) si exposición previa a BDQ/LZD >1 mes — BPaLM (6 meses, completamente oral) es el esquema preferido de la OMS 2022 y ATS/CDC/ERS/IDSA 2025 para TB-MDR/TB-RR con sensibilidad a fluoroquinolonas (edades ≥14 años, enfermedad pulmonar). BPaL está recomendado para TB-MDR resistente a fluoroquinolonas o pre-TB-XDR. TDO/TOV obligatorio. Monitoreo de seguridad crítico: ECG basal, semanas 2 y 4, luego mensual para QTc (bedaquilina + moxifloxacino + clofazimina tienen efectos aditivos sobre el QTc); hemograma semanal las primeras 8 semanas por mielotoxicidad de linezolid; evaluación mensual de neuropatía óptica y periférica (linezolid). Monitoreo de niveles de linezolid: nivel valle objetivo <2 mcg/mL. Extender a 9 meses si la conversión del cultivo de esputo no ocurre antes de la semana 8. Consulta obligatoria con experto en TB antes de iniciar.",
    commonBugs: ["mtb"] },

  { id: "tb-xdr", name: "XDR-TB Regimen", short: "XDR-TB", category: "mycobacterial",
    blurb: "Extensively drug-resistant TB (MDR + resistance to any fluoroquinolone and at least one Group B injectable or bedaquiline/linezolid); BPaL is preferred regimen",
    blurb_es: "TB extremadamente resistente (TB-MDR + resistencia a cualquier fluoroquinolona y al menos un inyectable del Grupo B o bedaquilina/linezolid); BPaL es el esquema preferido",
    empiric: ["bdq", "dla", "pa", "linezolid", "levo", "moxi", "cfz"], empiricPrimary: ["bdq", "dla", "pa", "linezolid"], empiricAlternate: ["levo", "moxi", "cfz"], sourceIds: ["who-bpalm-2022", "ats-cdc-idsa-2025", "curry-mdr-tb"],
    guidelineNotes: "PRIMARY: BPaL (primary for XDR-TB): Bedaquiline 400 mg PO daily × 2 wk then 200 mg PO 3×/wk × 22 wk + Pretomanid 200 mg PO daily × 26 wk + Linezolid 600 mg PO daily × 26 wk; extend to 39 wk if culture conversion delayed | Add delamanid 100 mg PO twice daily if additional coverage needed and BDQ toxicity manageable (consult specialist; additive QTc) — ALTERNATE: Individualized longer regimens (18–24 months) if BPaL not feasible: assemble ≥4 likely effective drugs from Group A (BDQ, LFX/MOX, LZD), Group B (CFZ), and Group C agents based on DST and treatment history | Clofazimine 100 mg daily may augment BPaL when tolerated — XDR-TB carries high mortality and requires TB expert management. BPaL (bedaquiline + pretomanid + linezolid) for 6–9 months is the WHO/ATS 2025 recommended approach for XDR and pre-XDR-TB with FQ resistance. ZeNix trial showed 84–93% favorable outcome across BPaL regimens; 600 mg linezolid × 26 weeks had best risk-benefit ratio. Monitor ECG monthly; CBC weekly then biweekly for linezolid toxicity; optic neuritis assessment monthly. DOT/VOT mandatory given complexity. Culture conversion milestone (month 2) determines if extension to 9 months needed. Infection control critical during hospitalization. Surgical resection may be considered in selected patients with localized disease failing medical therapy.",
    guidelineNotes_es: "PRIMARIO: BPaL (primario para TB-XDR): Bedaquilina 400 mg VO diario × 2 semanas, luego 200 mg VO 3 veces/semana × 22 semanas + Pretomanid 200 mg VO diario × 26 semanas + Linezolid 600 mg VO diario × 26 semanas; extender a 39 semanas si la conversión del cultivo se demora | Agregar delamanid 100 mg VO dos veces al día si se necesita cobertura adicional y la toxicidad de BDQ es manejable (consultar especialista; QTc aditivo) — ALTERNATIVO: Esquemas individualizados más prolongados (18–24 meses) si BPaL no es factible: ensamblar ≥4 fármacos probablemente efectivos del Grupo A (BDQ, LFX/MOX, LZD), Grupo B (CFZ) y agentes del Grupo C según DST e historia de tratamiento | Clofazimina 100 mg diario puede complementar BPaL cuando se tolera — La TB-XDR tiene alta mortalidad y requiere manejo por expertos en TB. BPaL (bedaquilina + pretomanid + linezolid) durante 6–9 meses es el enfoque recomendado por la OMS/ATS 2025 para TB-XDR y pre-TB-XDR con resistencia a FQ. El ensayo ZeNix mostró 84–93% de resultados favorables con esquemas BPaL; linezolid 600 mg × 26 semanas tuvo la mejor relación riesgo-beneficio. Monitorear ECG mensualmente; hemograma semanal y luego quincenal por toxicidad de linezolid; evaluación mensual de neuritis óptica. TDO/TOV obligatorio dada la complejidad. La conversión del cultivo en el mes 2 determina si es necesario extender a 9 meses. El control de infecciones es crítico durante la hospitalización. La resección quirúrgica puede considerarse en pacientes seleccionados con enfermedad localizada refractaria al tratamiento médico.",
    commonBugs: ["mtb"] },

  { id: "tb-mac-pulm", name: "MAC Pulmonary Disease", short: "MAC-PD", category: "mycobacterial",
    blurb: "Pulmonary disease caused by Mycobacterium avium complex; macrolide-based 3-drug regimen for ≥12 months after sputum culture conversion",
    blurb_es: "Enfermedad pulmonar causada por el complejo Mycobacterium avium; esquema de 3 fármacos basado en macrólidos durante ≥12 meses tras la conversión del cultivo de esputo",
    empiric: ["rif", "emb", "amk", "azithro", "rfb"], empiricPrimary: ["rif", "emb", "amk", "azithro"], empiricAlternate: ["rfb"], sourceIds: ["ats-idsa-ntm-2020"],
    guidelineNotes: "PRIMARY: Nodular/bronchiectatic (non-cavitary): Azithromycin 500 mg PO 3×/week + RIF 600 mg PO 3×/week + EMB 25 mg/kg PO 3×/week (for ≥12 months after sputum culture conversion) | Cavitary or advanced/severe disease: Azithromycin 250–500 mg PO daily + RIF 10 mg/kg PO daily + EMB 15 mg/kg PO daily ± parenteral amikacin 15–25 mg/kg IV/IM 3×/week × 2–3 months initial — ALTERNATE: Clarithromycin 500 mg PO twice daily substituted for azithromycin if not tolerated (higher DDI risk with rifamycins) | Rifabutin 150–300 mg PO daily substituted for rifampin if better tolerated or drug interaction concerns | Add amikacin liposome inhalation suspension (ALIS) 590 mg inhaled daily if sputum culture positive after ≥6 months of guideline-based therapy (FDA-approved for refractory MAC) — ATS/ERS/ESCMID/IDSA 2020 guideline recommends 3-drug macrolide-based regimen for macrolide-susceptible MAC pulmonary disease. Azithromycin preferred over clarithromycin (less DDI, better tolerance, equal efficacy). Three-times-weekly dosing for non-cavitary nodular/bronchiectatic disease; daily regimen for cavitary or advanced disease. Add parenteral amikacin or streptomycin initial 2–3 months for cavitary, advanced, or macrolide-resistant MAC. Treat for ≥12 months after sputum culture conversion (not a fixed duration). Macrolide susceptibility testing mandatory before initiation. ALIS (Arikayce) approved for refractory MAC—add if culture-positive after 6 months of guideline therapy. Rifampin significantly reduces clarithromycin levels via CYP3A4; use azithromycin when rifampin include... [truncated, 2030 chars]",
    guidelineNotes_es: "PRIMARIO: Nodular/bronquiectásica (no cavitaria): Azitromicina 500 mg VO 3 veces/semana + RIF 600 mg VO 3 veces/semana + EMB 25 mg/kg VO 3 veces/semana (durante ≥12 meses tras la conversión del cultivo de esputo) | Enfermedad cavitaria o avanzada/grave: Azitromicina 250–500 mg VO diario + RIF 10 mg/kg VO diario + EMB 15 mg/kg VO diario ± amikacina parenteral 15–25 mg/kg IV/IM 3 veces/semana × 2–3 meses inicial — ALTERNATIVO: Claritromicina 500 mg VO dos veces al día sustituye a azitromicina si no se tolera (mayor riesgo de interacciones con rifamicinas) | Rifabutina 150–300 mg VO diario sustituye a rifampicina si mejor tolerada o hay preocupaciones por interacciones farmacológicas | Agregar suspensión de amikacina liposomal para inhalación (ALIS) 590 mg inhalados diariamente si el cultivo de esputo persiste positivo tras ≥6 meses de tratamiento basado en guías (aprobado por FDA para CMA refractario) — La guía ATS/ERS/ESCMID/IDSA 2020 recomienda un esquema de 3 fármacos basado en macrólidos para la enfermedad pulmonar por CMA sensible a macrólidos. Azitromicina preferida sobre claritromicina (menos interacciones, mejor tolerancia, eficacia equivalente). Dosificación tres veces por semana para la enfermedad nodular/bronquiectásica no cavitaria; esquema diario para la enfermedad cavitaria o avanzada. Agregar amikacina parenteral o estreptomicina los primeros 2–3 meses en CMA cavitario, avanzado o resistente a macrólidos. Tratar durante ≥12 meses tras la conversión del cultivo de esputo (no una duración fija). La prueba de sensibilidad a macrólidos es obligatoria antes del inicio. ALIS (Arikayce) aprobada para CMA refractario: agregar si el cultivo es positivo tras 6 meses de tratamiento basado en guías.",
    commonBugs: ["mavium"] },

  { id: "tb-mabscessus", name: "M. abscessus Pulmonary Disease", short: "Mabs-PD", category: "mycobacterial",
    blurb: "Rapidly growing NTM with intrinsic drug resistance; requires intensive IV-based initial phase followed by prolonged oral/inhaled continuation; prognosis guarded especially for M. abscessus subsp. abscessus",
    blurb_es: "MNT de crecimiento rápido con resistencia intrínseca a fármacos; requiere una fase inicial intensiva basada en IV seguida de continuación oral/inhalada prolongada; pronóstico reservado, especialmente para M. abscessus subsp. abscessus",
    empiric: ["amk", "linezolid", "cfz", "azithro", "imr"], empiricPrimary: ["amk", "linezolid", "cfz", "azithro", "imr"], empiricAlternate: [], sourceIds: ["ats-idsa-ntm-2020"],
    guidelineNotes: "PRIMARY: Initial (intensive) phase — IV ≥4 weeks: Amikacin 15 mg/kg IV daily (or 3×/week) + Imipenem-cilastatin 500 mg IV q6h (or cefoxitin 12 g/day IV divided) + Azithromycin 500 mg PO daily (if macrolide-susceptible subsp. massiliense) ± Clofazimine 100 mg PO daily | Continuation phase: Azithromycin 250–500 mg PO daily + Clofazimine 100 mg PO daily + Linezolid 600 mg PO daily (if tolerated); continue ≥12 months after symptomatic improvement — ALTERNATE: Imipenem-cilastatin/relebactam 500/500/250 mg IV q6h if targeting beta-lactamase-producing strains or prior treatment failure | Tigecycline 50 mg IV daily (initial intensive phase; reserve for refractory/severe disease) | M. abscessus subsp. abscessus with inducible erm(41) macrolide resistance: macrolide for immunomodulation only (not counted as active drug); build ≥4 active drug regimen — M. abscessus pulmonary disease is guided by subspecies identification and macrolide susceptibility testing (erm(41) gene sequencing plus 14-day incubation). M. massiliense (non-functional erm gene) is macrolide-susceptible; M. abscessus/bolletii has functional erm → inducible macrolide resistance. Regimens include ≥3 active drugs in intensive phase (IV agents: amikacin, imipenem or cefoxitin, tigecycline) followed by oral continuation. No FDA-approved regimen; expert consultation required. Imipenem-cilastatin/relebactam (Recarbrio) used investigationally in refractory cases. Duration typically >12 months for continuation... [truncated, 2179 chars]",
    guidelineNotes_es: "PRIMARIO: Fase inicial (intensiva) — IV ≥4 semanas: Amikacina 15 mg/kg IV diario (o 3 veces/semana) + Imipenem-cilastatina 500 mg IV cada 6 h (o cefoxitina 12 g/día IV divididos) + Azitromicina 500 mg VO diario (si subsp. massiliense sensible a macrólidos) ± Clofazimina 100 mg VO diario | Fase de continuación: Azitromicina 250–500 mg VO diario + Clofazimina 100 mg VO diario + Linezolid 600 mg VO diario (si se tolera); continuar ≥12 meses tras mejoría sintomática — ALTERNATIVO: Imipenem-cilastatina/relebactam 500/500/250 mg IV cada 6 h si se dirige a cepas productoras de beta-lactamasas o fracaso previo al tratamiento | Tigeciclina 50 mg IV diario (fase intensiva inicial; reservar para enfermedad refractaria/grave) | M. abscessus subsp. abscessus con resistencia inducible a macrólidos por erm(41): el macrólido solo se usa para inmunomodulación (no cuenta como fármaco activo); construir un esquema con ≥4 fármacos activos — La enfermedad pulmonar por M. abscessus se guía por la identificación de la subespecie y la prueba de sensibilidad a macrólidos (secuenciación del gen erm(41) más incubación de 14 días). M. massiliense (gen erm no funcional) es sensible a macrólidos; M. abscessus/bolletii tiene erm funcional → resistencia inducible a macrólidos. Los esquemas incluyen ≥3 fármacos activos en la fase intensiva (agentes IV: amikacina, imipenem o cefoxitina, tigeciclina) seguidos de continuación oral. No existe esquema aprobado por la FDA; se requiere consulta con experto. Imipenem-cilastatina/relebactam (Recarbrio) se usa de forma investigacional en casos refractarios. La duración de la fase de continuación típicamente es >12 meses.",
    commonBugs: ["mabscessus"] },

  { id: "tb-leprosy", name: "Leprosy (M. leprae MDT)", short: "Leprosy", category: "mycobacterial",
    blurb: "Chronic granulomatous skin and nerve disease caused by M. leprae; WHO multidrug therapy (MDT) with rifampicin + dapsone ± clofazimine; 6 months (PB) or 12 months (MB)",
    blurb_es: "Enfermedad granulomatosa crónica de piel y nervios causada por M. leprae; terapia multimedicamentosa (TDM) de la OMS con rifampicina + dapsona ± clofazimina; 6 meses (PB) o 12 meses (MB)",
    empiric: ["rif", "cfz", "azithro"], empiricPrimary: ["rif", "cfz"], empiricAlternate: ["azithro"], sourceIds: ["who-leprosy-2018"],
    guidelineNotes: "PRIMARY: Paucibacillary (PB) — 1–5 skin lesions, negative slit-skin smear: RIF 600 mg PO once monthly (supervised) + Dapsone 100 mg PO daily × 6 months | Multibacillary (MB) — ≥6 skin lesions or positive slit-skin smear: RIF 600 mg PO once monthly (supervised) + Clofazimine 300 mg PO once monthly (supervised) + Clofazimine 50 mg PO daily + Dapsone 100 mg PO daily × 12 months — ALTERNATE: RIF resistance or intolerance: Substitute ofloxacin 400 mg or clarithromycin 500 mg or minocycline 100 mg PO daily (consult leprosy specialist) | Dapsone hypersensitivity: substitute clofazimine 50 mg PO daily in PB regimen — WHO 2018 recommends the same 3-drug MDT for all leprosy patients (PB and MB differ only in duration: 6 vs. 12 months). Rifampicin given once monthly under supervision (once-monthly administration has shown no toxic effects and is well tolerated); dapsone and clofazimine given daily. PB patients receive only rifampicin and dapsone (clofazimine not included in PB regimen). Lepra reactions (Type 1 reversal reaction, Type 2 erythema nodosum leprosum) require additional corticosteroid therapy. Clofazimine causes reversible skin hyperpigmentation—counsel patients. Monitor CBC and G6PD status before dapsone. Slit-skin smear and clinical assessment at 6 and 12 months post-MDT; relapse is uncommon (<1% per year) but requires retreatment.",
    guidelineNotes_es: "PRIMARIO: Paucibacilar (PB) — 1–5 lesiones cutáneas, baciloscopia de raspado cutáneo negativa: RIF 600 mg VO una vez al mes (supervisada) + Dapsona 100 mg VO diario × 6 meses | Multibacilar (MB) — ≥6 lesiones cutáneas o baciloscopia de raspado positiva: RIF 600 mg VO una vez al mes (supervisada) + Clofazimina 300 mg VO una vez al mes (supervisada) + Clofazimina 50 mg VO diario + Dapsona 100 mg VO diario × 12 meses — ALTERNATIVO: Resistencia o intolerancia a RIF: sustituir por ofloxacino 400 mg o claritromicina 500 mg o minociclina 100 mg VO diario (consultar a especialista en lepra) | Hipersensibilidad a dapsona: sustituir por clofazimina 50 mg VO diario en el esquema PB — La OMS 2018 recomienda el mismo TDM de 3 fármacos para todos los pacientes con lepra (PB y MB difieren solo en la duración: 6 vs. 12 meses). La rifampicina se administra una vez al mes bajo supervisión (sin efectos tóxicos y bien tolerada); dapsona y clofazimina se administran diariamente. Los pacientes PB reciben solo rifampicina y dapsona (clofazimina no incluida en el esquema PB). Las reacciones leprosas (Tipo 1 reversa, Tipo 2 eritema nudoso leproso) requieren tratamiento adicional con corticoides. La clofazimina causa hiperpigmentación cutánea reversible: asesorar al paciente. Monitorear hemograma y estado de G6PD antes de iniciar dapsona. Baciloscopia de raspado y evaluación clínica a los 6 y 12 meses post-TDM; la recidiva es infrecuente (<1% por año) pero requiere retratamiento.",
    commonBugs: ["mleprae"] },
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

// --- M. avium complex (MAC) — ATS/IDSA/ERS/ESCMID 2020 ---
// Macrolide-based 3-drug regimen: macrolide + rifamycin + ethambutol; amikacin (IV or ALIS) for severe/refractory
set("azithro", "mavium", "primary");
set("clari", "mavium", "primary");
set("emb", "mavium", "primary");
set("rif", "mavium", "primary");
set("rfb", "mavium", "primary"); // preferred rifamycin in HIV due to fewer DDIs with ART
set("amk", "mavium", "alternate"); // IV or ALIS for cavitary/refractory
set("moxi", "mavium", "alternate");
set("linezolid", "mavium", "alternate");
set("cfz", "mavium", "alternate");

// --- M. abscessus complex — ATS/IDSA 2020 (intensive multi-drug, macrolide-resistance common) ---
set("azithro", "mabscessus", "primary"); // if functional erm(41)/macrolide-susceptible
set("clari", "mabscessus", "primary");
set("amk", "mabscessus", "primary"); // IV or ALIS
set("cfz", "mabscessus", "primary");
set("linezolid", "mabscessus", "alternate");
set("bdq", "mabscessus", "alternate");
set("eto", "mabscessus", "alternate");
set("moxi", "mabscessus", "alternate");

// --- M. kansasii — ATS/IDSA 2020 (RIF + EMB + macrolide or INH for ≥12 mo after culture conversion) ---
set("rif", "mkansasii", "primary");
set("emb", "mkansasii", "primary");
set("azithro", "mkansasii", "primary");
set("clari", "mkansasii", "primary");
set("inh", "mkansasii", "primary"); // historical RHE regimen still used
set("rfb", "mkansasii", "alternate");
set("moxi", "mkansasii", "alternate");
set("linezolid", "mkansasii", "alternate");

// --- M. leprae — WHO MDT (multibacillary: RIF + dapsone + clofazimine; paucibacillary: RIF + dapsone) ---
// dapsone is not in our drug list; rif/cfz/azithro/moxi covered as alternates per WHO update + ROM regimen
set("moxi", "mleprae", "alternate"); // ROM (rifampin/ofloxacin/minocycline) — moxi commonly substituted
set("linezolid", "mleprae", "alternate");
set("clari", "mleprae", "alternate");

export const coverage = C;
export function getCoverage(drugId: string, bugId: string): Coverage {
  return C[drugId]?.[bugId] || "none";
}
export function getDrugById(id: string) { return drugs.find(d => d.id === id); }
export function getBugById(id: string) { return bugs.find(b => b.id === id); }
export function getSyndromeById(id: string) { return syndromes.find(s => s.id === id); }
export function getClassById(id: string) { return drugClasses.find(c => c.id === id); }

// IDs of drugs whose canonical home is the Antibacterials module
// but which appear in TB/NTM/leprosy regimens here.
export const sharedAntibacterialDrugIds = ["moxi", "levo", "linezolid", "azithro", "amk", "ag", "clari"];
