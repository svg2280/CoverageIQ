// Antiviral coverage data
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";

export const drugClasses: DrugClass[] = [
  { id: "neuraminidase", name: "Neuraminidase Inhibitors", color: "#5fb3d4", blurb: "Block influenza release from infected cells.", blurb_es: "Bloquean la liberación del virus de influenza de las células infectadas." },
  { id: "endonuclease", name: "Cap-dep Endonuclease Inhib", color: "#5e9bd4", blurb: "Baloxavir. Single-dose flu therapy.", blurb_es: "Baloxavir. Terapia de dosis única para influenza." },
  { id: "antiherpes", name: "Anti-Herpetics", color: "#a06fd4", blurb: "Acyclovir family — phosphorylated by viral TK.", blurb_es: "Familia del aciclovir — fosforilados por la timidina cinasa viral." },
  { id: "anticmv", name: "Anti-CMV", color: "#7b6fd4", blurb: "Ganciclovir family + foscarnet.", blurb_es: "Familia del ganciclovir + foscarnet." },
  { id: "covid", name: "Anti-SARS-CoV-2", color: "#d46f9e", blurb: "Paxlovid, remdesivir, molnupiravir.", blurb_es: "Paxlovid, remdesivir, molnupiravir." },
  { id: "rsv", name: "Anti-RSV", color: "#d4a86f", blurb: "Ribavirin, monoclonal Abs.", blurb_es: "Ribavirina, anticuerpos monoclonales." },
  { id: "hbv", name: "Anti-HBV", color: "#d4c46f", blurb: "Tenofovir, entecavir.", blurb_es: "Tenofovir, entecavir." },
  { id: "hcv", name: "Anti-HCV (DAAs)", color: "#c4d46f", blurb: "Sofosbuvir-based combos. >95% cure.", blurb_es: "Combinaciones basadas en sofosbuvir. >95% de curación." },
  { id: "art", name: "Anti-HIV (ART)", color: "#6fd49e", blurb: "Multi-class: NRTIs, INSTIs, boosters.", blurb_es: "Multiclase: ITIAN, ITIN, inhibidores de integrasa, potenciadores." },
];

export const drugs: Drug[] = [
  // Influenza
  { id: "oseltamivir", name: "Oseltamivir (Tamiflu)", classId: "neuraminidase", blurb: "Influenza A & B. PO. Within 48h ideal but use anyway in severe.", blurb_es: "Influenza A y B. VO. Lo ideal es iniciar en las primeras 48 h, pero se utiliza de todas formas en casos graves.", mechanism: "Neuraminidase inhibition", mechanism_es: "Inhibición de neuraminidasa", spectrum: "Influenza A, B", spectrum_es: "Influenza A, B", pearls: ["75 mg PO BID x 5d", "Severe/hospitalized: still treat after 48h"], pearls_es: ["75 mg VO BID por 5 días", "Grave/hospitalizado: tratar igualmente después de las 48 h"], doseAdult: "75 mg PO BID x 5d", doseAdult_es: "75 mg VO BID por 5 días", route: ["PO"], pregnancy: "safe" },
  { id: "zanamivir", name: "Zanamivir", classId: "neuraminidase", blurb: "Inhaled. Avoid in asthma/COPD.", blurb_es: "Inhalado. Evitar en asma/EPOC.", mechanism: "Neuraminidase inhibition", mechanism_es: "Inhibición de neuraminidasa", spectrum: "Influenza A, B", spectrum_es: "Influenza A, B", pearls: ["Bronchospasm risk"], pearls_es: ["Riesgo de broncoespasmo"], doseAdult: "10 mg INH BID", doseAdult_es: "10 mg inhalado BID", route: ["PO"], pregnancy: "safe" },
  { id: "baloxavir", name: "Baloxavir (Xofluza)", classId: "endonuclease", blurb: "Single dose. Resistance emerges with treatment.", blurb_es: "Dosis única. Puede surgir resistencia con el tratamiento.", mechanism: "Cap-dependent endonuclease inhibition", mechanism_es: "Inhibición de la endonucleasa dependiente del extremo 5'-cap", spectrum: "Influenza A, B", spectrum_es: "Influenza A, B", pearls: ["One-time PO dose", "Some resistance with monotherapy"], pearls_es: ["Dosis única VO", "Cierta resistencia con monoterapia"], doseAdult: "40-80 mg PO x1", doseAdult_es: "40-80 mg VO dosis única", route: ["PO"], pregnancy: "caution" },

  // Herpes
  { id: "acyclovir", name: "Acyclovir / Valacyclovir", short: "ACV", classId: "antiherpes", blurb: "HSV, VZV. IV for severe; PO for cold sores/genital.", blurb_es: "VHS, VVZ. IV para casos graves; VO para herpes labial/genital.", mechanism: "Activated by viral thymidine kinase → DNA chain termination", mechanism_es: "Activado por la timidina cinasa viral → terminación de la cadena de ADN", spectrum: "HSV-1/2, VZV", spectrum_es: "VHS-1/2, VVZ", pearls: ["IV crystallization — hydrate well", "Valacyclovir = oral prodrug, better bioavailability"], pearls_es: ["Cristalización IV — hidratar adecuadamente", "Valaciclovir = profármaco oral, mejor biodisponibilidad"], doseAdult: "ACV 10 mg/kg IV q8h (encephalitis); valacyclovir 1g PO BID-TID", doseAdult_es: "Aciclovir 10 mg/kg IV cada 8 h (encefalitis); valaciclovir 1 g VO BID-TID", route: ["IV", "PO"], pregnancy: "safe" },
  { id: "famciclovir", name: "Famciclovir", classId: "antiherpes", blurb: "Penciclovir prodrug. HSV/VZV alternative.", blurb_es: "Profármaco del penciclovir. Alternativa para VHS/VVZ.", mechanism: "Activated by viral TK", mechanism_es: "Activado por la timidina cinasa viral", spectrum: "HSV-1/2, VZV", spectrum_es: "VHS-1/2, VVZ", pearls: ["Episodic and suppressive HSV"], pearls_es: ["VHS episódico y terapia supresiva"], doseAdult: "500 mg PO TID", doseAdult_es: "500 mg VO TID", route: ["PO"], pregnancy: "caution" },

  // CMV
  { id: "ganciclovir", name: "Ganciclovir / Valganciclovir", short: "GCV", classId: "anticmv", blurb: "CMV first-line. Bone marrow toxicity.", blurb_es: "CMV de primera línea. Toxicidad medular.", mechanism: "Activated by CMV UL97 kinase", mechanism_es: "Activado por la cinasa UL97 del CMV", spectrum: "CMV, HSV, VZV", spectrum_es: "CMV, VHS, VVZ", pearls: ["Watch neutropenia", "Valganciclovir = oral prodrug"], pearls_es: ["Vigilar neutropenia", "Valganciclovir = profármaco oral"], doseAdult: "GCV 5 mg/kg IV q12h induction", doseAdult_es: "Ganciclovir 5 mg/kg IV cada 12 h (inducción)", route: ["IV", "PO"], pregnancy: "avoid" },
  { id: "foscarnet", name: "Foscarnet", classId: "anticmv", blurb: "GCV-resistant CMV, ACV-resistant HSV.", blurb_es: "CMV resistente a ganciclovir, VHS resistente a aciclovir.", mechanism: "Pyrophosphate analog — direct DNA pol inhibition", mechanism_es: "Análogo del pirofosfato — inhibición directa de la ADN polimerasa", spectrum: "CMV, HSV (resistant), HHV-6", spectrum_es: "CMV, VHS (resistente), VHH-6", pearls: ["Renal toxicity, electrolyte derangements", "Penile ulcers!"], pearls_es: ["Toxicidad renal, alteraciones electrolíticas", "¡Úlceras peneanas!"], doseAdult: "60 mg/kg IV q8h", doseAdult_es: "60 mg/kg IV cada 8 h", route: ["IV"], pregnancy: "avoid" },
  { id: "letermovir", name: "Letermovir", classId: "anticmv", blurb: "CMV prophylaxis post-HSCT.", blurb_es: "Profilaxis de CMV post-TCMH.", mechanism: "CMV terminase complex inhibition", mechanism_es: "Inhibición del complejo terminasa del CMV", spectrum: "CMV", spectrum_es: "CMV", pearls: ["Doesn't cause myelosuppression", "Drug interactions via CYP3A"], pearls_es: ["No causa mielosupresión", "Interacciones medicamentosas por CYP3A"], doseAdult: "480 mg PO/IV daily", doseAdult_es: "480 mg VO/IV cada 24 h", route: ["IV", "PO"], pregnancy: "caution" },

  // COVID
  { id: "paxlovid", name: "Nirmatrelvir-Ritonavir (Paxlovid)", classId: "covid", blurb: "Outpatient COVID. Within 5 days of symptoms in high-risk.", blurb_es: "COVID-19 ambulatorio. Dentro de los 5 días de síntomas en pacientes de alto riesgo.", mechanism: "Mpro protease inhibitor + ritonavir booster", mechanism_es: "Inhibidor de la proteasa Mpro + potenciador ritonavir", spectrum: "SARS-CoV-2", spectrum_es: "SARS-CoV-2", pearls: ["MASSIVE drug interactions via CYP3A4", "Renal-dose adjusted"], pearls_es: ["IMPORTANTES interacciones medicamentosas por CYP3A4", "Ajuste de dosis renal"], doseAdult: "300/100 mg PO BID x 5d", doseAdult_es: "300/100 mg VO BID por 5 días", route: ["PO"], pregnancy: "caution" },
  { id: "remdesivir", name: "Remdesivir", classId: "covid", blurb: "IV. Hospitalized COVID with O2 requirements.", blurb_es: "IV. COVID-19 hospitalizado con requerimientos de oxígeno.", mechanism: "RNA polymerase chain terminator", mechanism_es: "Terminador de la cadena de ARN polimerasa", spectrum: "SARS-CoV-2, RSV (some)", spectrum_es: "SARS-CoV-2, VRS (algunos)", pearls: ["3-5 day course depending on severity", "Transaminitis"], pearls_es: ["Curso de 3-5 días según gravedad", "Transaminitis"], doseAdult: "200 mg IV x1, then 100 mg IV daily", doseAdult_es: "200 mg IV dosis inicial, luego 100 mg IV cada 24 h", route: ["IV"], pregnancy: "caution" },
  { id: "molnupiravir", name: "Molnupiravir", classId: "covid", blurb: "Oral COVID alternative. Lower efficacy than Paxlovid.", blurb_es: "Alternativa oral para COVID-19. Menor eficacia que Paxlovid.", mechanism: "RNA mutagenesis", mechanism_es: "Mutagénesis del ARN", spectrum: "SARS-CoV-2", spectrum_es: "SARS-CoV-2", pearls: ["Avoid in pregnancy and <18", "When Paxlovid contraindicated"], pearls_es: ["Evitar en embarazo y menores de 18 años", "Cuando Paxlovid está contraindicado"], doseAdult: "800 mg PO BID x 5d", doseAdult_es: "800 mg VO BID por 5 días", route: ["PO"], pregnancy: "avoid" },

  // RSV
  { id: "ribavirin", name: "Ribavirin", classId: "rsv", blurb: "RSV (immunocomp), HCV (legacy), VHFs.", blurb_es: "VRS (inmunodeprimidos), VHC (uso histórico), fiebres hemorrágicas virales.", mechanism: "Guanosine analog", mechanism_es: "Análogo de guanosina", spectrum: "RSV, HCV, VHFs", spectrum_es: "VRS, VHC, fiebres hemorrágicas virales", pearls: ["Teratogenic — black box", "Hemolytic anemia"], pearls_es: ["Teratogénico — advertencia en recuadro negro", "Anemia hemolítica"], doseAdult: "Varies by indication", doseAdult_es: "Variable según indicación", route: ["IV", "PO"], pregnancy: "avoid" },

  // HBV
  { id: "tenofovir", name: "Tenofovir (TDF/TAF)", classId: "hbv", blurb: "HBV + HIV. TAF preferred for renal/bone profile.", blurb_es: "VHB + VIH. TAF preferido por perfil renal/óseo.", mechanism: "Nucleotide RT inhibitor", mechanism_es: "Inhibidor nucleotídico de la transcriptasa inversa", spectrum: "HBV, HIV", spectrum_es: "VHB, VIH", pearls: ["TDF: monitor renal/bone", "TAF: better safety, used in newer regimens"], pearls_es: ["TDF: monitorizar función renal y densidad ósea", "TAF: mejor perfil de seguridad, usado en regímenes más nuevos"], doseAdult: "TAF 25 mg PO daily", doseAdult_es: "TAF 25 mg VO cada 24 h", route: ["PO"], pregnancy: "safe" },
  { id: "entecavir", name: "Entecavir", classId: "hbv", blurb: "HBV monotherapy.", blurb_es: "Monoterapia para VHB.", mechanism: "Guanosine analog", mechanism_es: "Análogo de guanosina", spectrum: "HBV", spectrum_es: "VHB", pearls: ["Avoid as monotherapy in HIV co-infection"], pearls_es: ["Evitar como monoterapia en coinfección con VIH"], doseAdult: "0.5 mg PO daily", doseAdult_es: "0,5 mg VO cada 24 h", route: ["PO"], pregnancy: "caution" },

  // HCV DAAs
  { id: "sofvel", name: "Sofosbuvir-Velpatasvir (Epclusa)", classId: "hcv", blurb: "Pan-genotypic 12-week HCV cure.", blurb_es: "Cura del VHC pangenotípica en 12 semanas.", mechanism: "NS5B + NS5A inhibitors", mechanism_es: "Inhibidores de NS5B + NS5A", spectrum: "HCV (all genotypes)", spectrum_es: "VHC (todos los genotipos)", pearls: [">95% SVR12", "Check HBV before starting (reactivation risk)"], pearls_es: [">95% de RVS12", "Descartar VHB antes de iniciar (riesgo de reactivación)"], doseAdult: "400/100 mg PO daily x 12wk", doseAdult_es: "400/100 mg VO cada 24 h por 12 semanas", route: ["PO"], pregnancy: "caution" },
  { id: "glecpib", name: "Glecaprevir-Pibrentasvir (Mavyret)", classId: "hcv", blurb: "8-week pan-genotypic HCV cure.", blurb_es: "Cura del VHC pangenotípica en 8 semanas.", mechanism: "NS3/4A + NS5A inhibitors", mechanism_es: "Inhibidores de NS3/4A + NS5A", spectrum: "HCV (all genotypes)", spectrum_es: "VHC (todos los genotipos)", pearls: ["8 weeks for treatment-naive without cirrhosis"], pearls_es: ["8 semanas para pacientes sin tratamiento previo y sin cirrosis"], doseAdult: "300/120 mg PO daily x 8-12wk", doseAdult_es: "300/120 mg VO cada 24 h por 8-12 semanas", route: ["PO"], pregnancy: "caution" },

  // HIV ART (representative single-tablets)
  { id: "biktarvy", name: "Bictegravir/FTC/TAF (Biktarvy)", classId: "art", blurb: "STR INSTI-based regimen. Most-prescribed first-line ART.", blurb_es: "Régimen STR basado en inhibidor de integrasa. TAR de primera línea más prescrito.", mechanism: "INSTI + 2 NRTIs", mechanism_es: "Inhibidor de integrasa + 2 ITIAN", spectrum: "HIV-1", spectrum_es: "VIH-1", pearls: ["Once daily", "High barrier to resistance"], pearls_es: ["Una vez al día", "Alta barrera genética a la resistencia"], doseAdult: "1 tab PO daily", doseAdult_es: "1 comprimido VO cada 24 h", route: ["PO"], pregnancy: "safe" },
  { id: "dolutegravir", name: "Dolutegravir", classId: "art", blurb: "INSTI backbone — dual or triple regimens.", blurb_es: "Base de régimen inhibidor de integrasa — esquemas duales o triples.", mechanism: "Integrase inhibition", mechanism_es: "Inhibición de la integrasa", spectrum: "HIV-1", spectrum_es: "VIH-1", pearls: ["High barrier to resistance", "Combine with TAF/FTC or 3TC"], pearls_es: ["Alta barrera genética a la resistencia", "Combinar con TAF/FTC o 3TC"], doseAdult: "50 mg PO daily", doseAdult_es: "50 mg VO cada 24 h", route: ["PO"], pregnancy: "safe" },
];

export const bugs: Bug[] = [
  { id: "influenza", name: "Influenza A/B", category: "virus", shape: "atypical",
    blurb: "Seasonal flu. Treat early in high-risk.",
    blurb_es: "Gripe estacional. Tratar precozmente en pacientes de alto riesgo.",
    pearls: ["Oseltamivir within 48h ideal", "Severe: continue regardless of timing"],
    pearls_es: ["Oseltamivir en las primeras 48 h, ideal", "Grave: continuar independientemente del tiempo transcurrido"],
    syndromes: ["resp-flu"]},
  { id: "covid", name: "SARS-CoV-2", category: "virus", shape: "atypical",
    blurb: "COVID-19. Outpatient antivirals + hospitalized strategies.",
    blurb_es: "COVID-19. Antivirales ambulatorios + estrategias para pacientes hospitalizados.",
    pearls: ["Paxlovid for high-risk outpatient", "Remdesivir + dexamethasone for hospitalized"],
    pearls_es: ["Paxlovid para ambulatorios de alto riesgo", "Remdesivir + dexametasona para hospitalizados"],
    syndromes: ["resp-covid"]},
  { id: "rsv", name: "RSV", category: "virus", shape: "atypical",
    blurb: "Respiratory syncytial virus. Mostly supportive in adults.",
    blurb_es: "Virus respiratorio sincitial (VRS). Manejo principalmente de soporte en adultos.",
    pearls: ["Ribavirin in immunocompromised", "Vaccines now available for elderly"],
    pearls_es: ["Ribavirina en inmunodeprimidos", "Vacunas disponibles para adultos mayores"],
    syndromes: ["resp-rsv"]},
  { id: "hsv", name: "HSV-1 / HSV-2", category: "virus", shape: "atypical",
    blurb: "Herpes simplex. Encephalitis = emergent IV ACV.",
    blurb_es: "Virus del herpes simple (VHS). Encefalitis = aciclovir IV de urgencia.",
    pearls: ["Empiric IV acyclovir for any encephalitis", "Suppression for frequent recurrences"],
    pearls_es: ["Aciclovir IV empírico ante cualquier encefalitis", "Terapia supresiva para recurrencias frecuentes"],
    syndromes: ["herpes-mucocutaneous", "hsv-encephalitis"]},
  { id: "vzv", name: "VZV", category: "virus", shape: "atypical",
    blurb: "Chickenpox + shingles. Treat zoster within 72h.",
    blurb_es: "Varicela + herpes zóster. Tratar el zóster dentro de las 72 h.",
    pearls: ["Valacyclovir 1g PO TID x 7d for zoster", "Disseminated → IV ACV"],
    pearls_es: ["Valaciclovir 1 g VO TID por 7 días para zóster", "Diseminado → aciclovir IV"],
    syndromes: ["herpes-mucocutaneous"]},
  { id: "cmv", name: "CMV", category: "virus", shape: "atypical",
    blurb: "Major issue in transplant/HIV. Retinitis, colitis, viremia.",
    blurb_es: "Patógeno importante en trasplante/VIH. Retinitis, colitis, viremia.",
    pearls: ["Valganciclovir for most", "Foscarnet for resistant"],
    pearls_es: ["Valganciclovir para la mayoría", "Foscarnet para cepas resistentes"],
    syndromes: ["cmv-disease"]},
  { id: "hbv", name: "Hepatitis B", category: "virus", shape: "atypical",
    blurb: "Chronic HBV — long-term suppression goal.",
    blurb_es: "Hepatitis B crónica — objetivo de supresión a largo plazo.",
    pearls: ["Tenofovir or entecavir", "Always reactivation-screen before chemo/biologics"],
    pearls_es: ["Tenofovir o entecavir", "Siempre descartar reactivación antes de quimioterapia/biológicos"],
    syndromes: ["hep-flare"]},
  { id: "hcv", name: "Hepatitis C", category: "virus", shape: "atypical",
    blurb: "Curable with DAAs in 8-12 weeks.",
    blurb_es: "Curable con antivirales de acción directa (AAD) en 8-12 semanas.",
    pearls: [">95% SVR12 with current regimens", "Check HBV before — reactivation risk"],
    pearls_es: [">95% de RVS12 con los regímenes actuales", "Descartar VHB antes — riesgo de reactivación"],
    syndromes: ["hep-flare"]},
  { id: "hiv", name: "HIV", category: "virus", shape: "atypical",
    blurb: "Lifelong ART — undetectable = untransmittable.",
    blurb_es: "TAR de por vida — indetectable = intransmisible.",
    pearls: ["INSTI-based STRs first-line (Biktarvy, Dovato)", "Resistance testing baseline"],
    pearls_es: ["STR basados en inhibidor de integrasa de primera línea (Biktarvy, Dovato)", "Prueba de resistencia al inicio del tratamiento"],
    syndromes: ["hiv-disease"]},
];

export const syndromes: Syndrome[] = [
  { id: "resp-flu", name: "Influenza", category: "respiratory",
    blurb: "Seasonal flu. Antivirals shorten course in early or high-risk patients.",
    blurb_es: "Gripe estacional. Los antivirales acortan la evolución si se inician precozmente o en pacientes de alto riesgo.",
    empiric: ["oseltamivir", "zanamivir", "baloxavir"],
    empiricPrimary: ["oseltamivir"],
    empiricAlternate: ["zanamivir", "baloxavir"],
    sourceIds: ["flu-idsa-2018", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Preferred treatment: oral oseltamivir 75 mg BID x 5 days for uncomplicated influenza; start within 48 hours of symptom onset for maximum benefit. Inhaled zanamivir 10 mg BID x 5 days (not for patients with chronic respiratory disease). Single-dose oral baloxavir marboxil (effective for influenza A and B; may be superior for influenza B). Hospitalized patients: oral/enteral oseltamivir as soon as possible regardless of symptom duration — may extend course beyond 5 days in immunocompromised or severe disease. Higher doses (oseltamivir 150 mg BID) sometimes used for severe disease in immunocompromised (not routinely recommended). Avoid routinely combining antivirals.",
    guidelineNotes_es: "Tratamiento preferido: oseltamivir oral 75 mg BID por 5 días para influenza no complicada; iniciar dentro de las 48 horas del inicio de síntomas para máximo beneficio. Zanamivir inhalado 10 mg BID por 5 días (no para pacientes con enfermedad respiratoria crónica). Baloxavir marboxil oral en dosis única (eficaz para influenza A y B; puede ser superior para influenza B). Pacientes hospitalizados: oseltamivir oral/enteral lo antes posible independientemente de la duración de síntomas — puede extenderse más allá de 5 días en inmunodeprimidos o enfermedad grave. Dosis más altas (oseltamivir 150 mg BID) se usan a veces en enfermedad grave en inmunodeprimidos (no recomendado de rutina). Evitar la combinación rutinaria de antivirales.",
    commonBugs: ["influenza"]},
  { id: "resp-covid", name: "COVID-19", category: "respiratory",
    blurb: "Risk-stratified. Outpatient → Paxlovid; hospitalized with O2 → remdesivir + dex.",
    blurb_es: "Estratificado por riesgo. Ambulatorio → Paxlovid; hospitalizado con O₂ → remdesivir + dexametasona.",
    empiric: ["paxlovid", "remdesivir", "molnupiravir"],
    empiricPrimary: ["paxlovid"],
    empiricAlternate: ["remdesivir", "molnupiravir"],
    sourceIds: ["covid-nih-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Outpatient, high-risk (non-hospitalized): ritonavir-boosted nirmatrelvir (Paxlovid) 300 mg/100 mg BID x 5 days — preferred for most high-risk patients with mild-moderate COVID-19. Start within 5 days of symptom onset. When Paxlovid contraindicated (drug-drug interactions): remdesivir 200 mg IV day 1 then 100 mg/day x 3 days (outpatient infusion within 7 days of symptoms). Molnupiravir 800 mg BID x 5 days — for high-risk adults when other options unavailable/inappropriate. Hospitalized: remdesivir + dexamethasone for supplemental O2 requirements. Severe disease with systemic inflammation: IL-6 inhibitors or baricitinib as adjuncts.",
    guidelineNotes_es: "Ambulatorio de alto riesgo (no hospitalizado): nirmatrelvir potenciado con ritonavir (Paxlovid) 300 mg/100 mg BID por 5 días — preferido para la mayoría de pacientes de alto riesgo con COVID-19 leve-moderado. Iniciar dentro de los 5 días del inicio de síntomas. Cuando Paxlovid está contraindicado (interacciones medicamentosas): remdesivir 200 mg IV el día 1, luego 100 mg/día por 3 días (infusión ambulatoria dentro de los 7 días de síntomas). Molnupiravir 800 mg BID por 5 días — para adultos de alto riesgo cuando otras opciones no están disponibles o son inadecuadas. Hospitalizado: remdesivir + dexametasona para requerimientos de O₂ suplementario. Enfermedad grave con inflamación sistémica: inhibidores de IL-6 o baricitinib como adyuvantes.",
    commonBugs: ["covid"]},
  { id: "resp-rsv", name: "RSV (adult)", category: "respiratory",
    blurb: "Supportive care for most. Ribavirin in immunocomp.",
    blurb_es: "Manejo de soporte para la mayoría. Ribavirina en inmunodeprimidos.",
    empiric: ["ribavirin"],
    empiricPrimary: ["ribavirin"],
    empiricAlternate: [],
    sourceIds: ["rsv-idsa-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Immunocompetent adults: no approved antiviral treatment for RSV lower respiratory tract disease; supportive care (oxygen, hydration). RSV in immunocompromised (transplant recipients, heme malignancy, CAR-T): oral ribavirin (weight-based dosing: 400-1800 mg/day in divided doses x 7 days) — used for lower respiratory tract disease in lung transplant, HSCT, and hematologic malignancy patients. Evidence for ribavirin is primarily observational; combination with IVIG or anti-RSV monoclonal antibodies considered for severe disease. Note: ribavirin is not in the CoverageIQ antiviral vocabulary as listed but is the primary clinical agent; there are no IDSA/CDC formal treatment guideline recommendations for approved RSV antivirals in adults as of 2024. Prevention via nirsevimab or vaccine for eligible adults.",
    guidelineNotes_es: "Adultos inmunocompetentes: no existe tratamiento antiviral aprobado para la enfermedad del tracto respiratorio inferior por VRS; manejo de soporte (oxígeno, hidratación). VRS en inmunodeprimidos (receptores de trasplante, neoplasias hematológicas, CAR-T): ribavirina oral (dosificación por peso: 400-1800 mg/día en dosis divididas por 7 días) — se usa en enfermedad del tracto respiratorio inferior en trasplante pulmonar, TCMH y pacientes con neoplasias hematológicas. La evidencia para ribavirina es principalmente observacional; se considera la combinación con IVIG o anticuerpos monoclonales anti-VRS en enfermedad grave. Prevención mediante nirsevimab o vacuna en adultos elegibles.",
    commonBugs: ["rsv"]},
  { id: "herpes-mucocutaneous", name: "Herpes (mucocutaneous)", category: "skin",
    blurb: "Cold sores, genital herpes, zoster.",
    blurb_es: "Herpes labial, herpes genital, herpes zóster.",
    empiric: ["acyclovir", "famciclovir"],
    empiricPrimary: ["acyclovir", "famciclovir"],
    empiricAlternate: ["acyclovir"],
    sourceIds: ["sti-cdc-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Genital herpes (first episode): acyclovir 400 mg TID x 7-10 days, OR famciclovir 250 mg TID x 7-10 days, OR valacyclovir 1g BID x 7-10 days. Genital herpes (recurrent): acyclovir 800 mg BID x 5 days, OR famciclovir 1000 mg BID x 1 day (single-day therapy), OR valacyclovir 500 mg BID x 3 days. Daily suppressive therapy: acyclovir 400 mg BID or valacyclovir 500-1000 mg daily. Orolabial HSV (recurrent): famciclovir 1500 mg single dose, OR valacyclovir 2g BID x 1 day, OR acyclovir 400 mg 5 times/day x 5 days. Immunocompromised: treat with IV acyclovir 5 mg/kg q8h for severe or disseminated disease; lower threshold for treatment.",
    guidelineNotes_es: "Herpes genital (primer episodio): aciclovir 400 mg TID por 7-10 días, O famciclovir 250 mg TID por 7-10 días, O valaciclovir 1 g BID por 7-10 días. Herpes genital (recurrente): aciclovir 800 mg BID por 5 días, O famciclovir 1000 mg BID por 1 día (terapia de un día), O valaciclovir 500 mg BID por 3 días. Terapia supresiva diaria: aciclovir 400 mg BID o valaciclovir 500-1000 mg cada 24 h. VHS orolabial (recurrente): famciclovir 1500 mg en dosis única, O valaciclovir 2 g BID por 1 día, O aciclovir 400 mg 5 veces/día por 5 días. Inmunodeprimidos: aciclovir IV 5 mg/kg cada 8 h para enfermedad grave o diseminada; umbral más bajo para iniciar tratamiento.",
    commonBugs: ["hsv", "vzv"]},
  { id: "hsv-encephalitis", name: "HSV encephalitis", category: "cns",
    blurb: "Empiric IV acyclovir for any altered mental status with concerning features.",
    blurb_es: "Aciclovir IV empírico ante cualquier alteración del estado mental con características sugestivas.",
    empiric: ["acyclovir", "foscarnet", "ganciclovir"],
    empiricPrimary: ["acyclovir"],
    empiricAlternate: ["foscarnet", "ganciclovir"],
    sourceIds: ["encephalitis-idsa-2008", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Initiate IV acyclovir empirically in all patients with suspected encephalitis without delay (A-I recommendation). Dose: acyclovir 10 mg/kg IV q8h x 14-21 days (immunocompetent adults; 21 days for confirmed HSV encephalitis). Adjust dose for renal impairment. In rare cases of IV acyclovir unavailability or failure: IV foscarnet. CMV encephalitis (immunocompromised): ganciclovir + foscarnet combination. Transition to oral valacyclovir (500 mg-1g TID) for step-down therapy after clinical improvement in some centers. PCR of CSF is diagnostic standard; continue acyclovir pending PCR results.",
    guidelineNotes_es: "Iniciar aciclovir IV empíricamente en todos los pacientes con encefalitis sospechada sin demora (recomendación A-I). Dosis: aciclovir 10 mg/kg IV cada 8 h por 14-21 días (adultos inmunocompetentes; 21 días para encefalitis por VHS confirmada). Ajustar dosis en insuficiencia renal. En casos excepcionales de no disponibilidad o falla de aciclovir IV: foscarnet IV. Encefalitis por CMV (inmunodeprimidos): combinación de ganciclovir + foscarnet. Transición a valaciclovir oral (500 mg-1 g TID) como terapia de descalada tras mejoría clínica en algunos centros. La PCR en LCR es el estándar diagnóstico; continuar aciclovir mientras se esperan resultados.",
    commonBugs: ["hsv"]},
  { id: "cmv-disease", name: "CMV disease", category: "systemic",
    blurb: "Retinitis, colitis, pneumonitis, viremia in transplant/HIV.",
    blurb_es: "Retinitis, colitis, neumonitis, viremia en trasplante/VIH.",
    empiric: ["ganciclovir", "foscarnet", "letermovir"],
    empiricPrimary: ["ganciclovir"],
    empiricAlternate: ["foscarnet", "letermovir"],
    sourceIds: ["cmv-ast-2019", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Treatment of CMV disease in SOT: oral valganciclovir 900 mg BID (noninferior to IV ganciclovir per VICTOR trial; for nonsevere disease with adequate GI absorption) or IV ganciclovir 5 mg/kg q12h for at least 2-3 weeks until symptoms resolve and CMV DNAemia undetectable. Recheck CMV viral load at 2 weeks and then at ≥7-day intervals. If CMV PCR not suppressed after 2-4 weeks, evaluate for resistance (UL97, UL54 mutations). Resistant/refractory CMV: maribavir 400 mg BID (FDA-approved; superior to investigator-assigned therapy) or foscarnet 60 mg/kg q8h (nephrotoxic). Reduce immunosuppression when clinically feasible. Prophylaxis post-treatment may be required in high-risk patients.",
    guidelineNotes_es: "Tratamiento de enfermedad por CMV en trasplante de órgano sólido: valganciclovir oral 900 mg BID (no inferior a ganciclovir IV según el ensayo VICTOR; para enfermedad no grave con absorción gastrointestinal adecuada) o ganciclovir IV 5 mg/kg cada 12 h por al menos 2-3 semanas hasta que los síntomas resuelvan y la DNAemia por CMV sea indetectable. Reevaluar la carga viral de CMV a las 2 semanas y luego a intervalos ≥7 días. Si la PCR de CMV no se suprime tras 2-4 semanas, evaluar resistencia (mutaciones UL97, UL54). CMV resistente/refractario: maribavir 400 mg BID (aprobado por la FDA; superior a la terapia asignada por el investigador) o foscarnet 60 mg/kg cada 8 h (nefrotóxico). Reducir la inmunosupresión cuando sea clínicamente factible. Puede requerirse profilaxis postratamiento en pacientes de alto riesgo.",
    commonBugs: ["cmv"]},
  { id: "hep-flare", name: "Viral hepatitis", category: "systemic",
    blurb: "HBV (suppression) and HCV (cure with DAAs).",
    blurb_es: "VHB (supresión) y VHC (cura con AAD).",
    empiric: ["tenofovir", "entecavir", "sofvel", "glecpib"],
    empiricPrimary: ["tenofovir", "entecavir", "sofvel", "glecpib"],
    empiricAlternate: ["tenofovir"],
    sourceIds: ["hbv-aasld-2018", "hcv-aasld-idsa-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "HBV (chronic, immune-active): tenofovir disoproxil fumarate (TDF) 300 mg/day, tenofovir alafenamide (TAF) 25 mg/day, or entecavir 0.5 mg/day (1 mg/day if lamivudine-experienced). TAF preferred over TDF for renal/bone comorbidities. Pegylated interferon 48 weeks is an alternative for finite-duration treatment. HBV flare/acute: initiate antiviral rapidly; TDF or entecavir. HCV (treatment-naïve, no cirrhosis or compensated cirrhosis): sofosbuvir/velpatasvir (sofvel) 1 tablet daily x 12 weeks (pangenotypic) OR glecaprevir/pibrentasvir (glecpib) x 8 weeks (treatment-naïve without cirrhosis). SVR rates >95% with both regimens. Decompensated cirrhosis: sofosbuvir-based regimens (not NS3/4A protease inhibitors); consult hepatologist.",
    guidelineNotes_es: "VHB (crónico, inmunológicamente activo): tenofovir disoproxil fumarato (TDF) 300 mg/día, tenofovir alafenamida (TAF) 25 mg/día o entecavir 0,5 mg/día (1 mg/día si hay experiencia previa con lamivudina). TAF preferido sobre TDF en comorbilidades renales u óseas. Interferón pegilado por 48 semanas es una alternativa para tratamiento de duración finita. Brote agudo/agudización de VHB: iniciar antiviral rápidamente; TDF o entecavir. VHC (sin tratamiento previo, sin cirrosis o cirrosis compensada): sofosbuvir/velpatasvir (sofvel) 1 comprimido cada 24 h por 12 semanas (pangenotípico) O glecaprevir/pibrentasvir (glecpib) por 8 semanas (sin tratamiento previo y sin cirrosis). Tasas de RVS >95% con ambos regímenes. Cirrosis descompensada: regímenes basados en sofosbuvir (no inhibidores de proteasa NS3/4A); consultar con hepatología.",
    commonBugs: ["hbv", "hcv"]},
  { id: "hiv-disease", name: "HIV", category: "systemic",
    blurb: "Lifelong ART. INSTI-based STRs first-line.",
    blurb_es: "TAR de por vida. STR basados en inhibidor de integrasa de primera línea.",
    empiric: ["biktarvy", "dolutegravir"],
    empiricPrimary: ["biktarvy", "dolutegravir"],
    empiricAlternate: ["dolutegravir"],
    sourceIds: ["hiv-dhhs-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "ART recommended for all individuals with HIV regardless of CD4 count. Preferred initial regimens for most people: bictegravir/tenofovir alafenamide/emtricitabine (BIC/TAF/FTC = Biktarvy) once daily (evidence rating AIa) OR dolutegravir + tenofovir/emtricitabine (DTG + TAF/FTC or TDF/FTC) once daily (AIa). ABC/3TC/DTG (Triumeq) no longer a first-choice due to cardiovascular risk and need for HLA-B*5701 testing. Start ART as soon as possible after HIV diagnosis (same day if feasible) — obtain resistance genotype before start. Long-acting injectable cabotegravir + rilpivirine monthly or every 2 months for virologically suppressed patients without treatment failure history.",
    guidelineNotes_es: "Se recomienda TAR para todas las personas con VIH independientemente del recuento de CD4. Regímenes iniciales preferidos para la mayoría: bictegravir/tenofovir alafenamida/emtricitabina (BIC/TAF/FTC = Biktarvy) una vez al día (nivel de evidencia AIa) O dolutegravir + tenofovir/emtricitabina (DTG + TAF/FTC o TDF/FTC) una vez al día (AIa). ABC/3TC/DTG (Triumeq) ya no es de primera elección por riesgo cardiovascular y necesidad de prueba HLA-B*5701. Iniciar TAR lo antes posible tras el diagnóstico de VIH (el mismo día si es factible) — obtener genotipo de resistencia antes del inicio. Cabotegravir + rilpivirina inyectable de acción prolongada mensual o cada 2 meses para pacientes con supresión virológica y sin antecedentes de fracaso terapéutico.",
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
