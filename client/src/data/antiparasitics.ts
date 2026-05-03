// Antiparasitic coverage data
// Aligned to CDC Yellow Book / IDSA / WHO guidelines (2023-2025).
import type { Coverage, Drug, DrugClass, Bug, Syndrome } from "./antibacterials";

export const drugClasses: DrugClass[] = [
  { id: "antimalarial-blood",  name: "Antimalarials (blood-stage)", color: "#d4a86f", blurb: "Kill blood-stage Plasmodium." },
  { id: "antimalarial-tissue", name: "Antimalarials (tissue/hypnozoite)", color: "#c4904a", blurb: "8-aminoquinolines — radical cure for P. vivax/ovale." },
  { id: "act",                 name: "ACT Combinations", color: "#b87a3a", blurb: "Artemisinin-based combination therapies — uncomplicated falciparum." },
  { id: "nitroimidazole-antiparasitic", name: "Nitroimidazoles", color: "#7b6fd4", blurb: "Metronidazole / tinidazole — luminal & tissue protozoa." },
  { id: "luminal-amebicide",   name: "Luminal Amebicides", color: "#9988d4", blurb: "Eradicate intraluminal cysts — paromomycin, iodoquinol." },
  { id: "antiprotozoal-other", name: "Other Antiprotozoals", color: "#6f9ed4", blurb: "Nitazoxanide, pentamidine, miltefosine, benznidazole." },
  { id: "antifolate-protozoal", name: "Antifolate Combinations", color: "#5fb3d4", blurb: "TMP-SMX, pyrimethamine-sulfadiazine — toxoplasmosis, cyclospora." },
  { id: "benzimidazole",       name: "Benzimidazoles", color: "#6fd49e", blurb: "Albendazole, mebendazole — broad anti-helminthic." },
  { id: "macrocyclic-lactone", name: "Macrocyclic Lactones", color: "#9ed46f", blurb: "Ivermectin, moxidectin — strongyloides, scabies, lice, onchocerciasis." },
  { id: "praziquantel-class",  name: "Praziquantel", color: "#c4d46f", blurb: "Schistosoma, cestodes (tapeworms), trematodes." },
  { id: "ectoparasiticide",    name: "Topical Ectoparasiticides", color: "#d4c46f", blurb: "Permethrin, malathion — scabies & lice." },
];

export const drugs: Drug[] = [
  // ---------------- ACT (uncomplicated P. falciparum) ----------------
  { id: "artemether-lumefantrine", name: "Artemether-Lumefantrine (Coartem)", classId: "act", blurb: "First-line for uncomplicated P. falciparum globally.", mechanism: "Artemisinin endoperoxide bridge → ROS damage to parasite + lumefantrine schizonticidal", spectrum: "Uncomplicated P. falciparum, P. vivax", pearls: ["6-dose regimen over 3 days", "Take with fatty food (lumefantrine absorption)", "Avoid in 1st trimester"], doseAdult: "4 tabs (80/480 mg) PO at 0, 8, 24, 36, 48, 60h", route: ["PO"], pregnancy: "caution" },
  { id: "atovaquone-proguanil",   name: "Atovaquone-Proguanil (Malarone)", classId: "act", blurb: "Uncomplicated falciparum + chemoprophylaxis. Daily.", mechanism: "Cytochrome bc1 inhibition + DHFR (proguanil)", spectrum: "P. falciparum, P. vivax", pearls: ["Treatment: 4 tabs PO daily x 3d", "Prophylaxis: 1 tab daily", "Take with food"], doseAdult: "4 adult tabs PO daily x 3d (treatment)", route: ["PO"], pregnancy: "caution" },
  { id: "doxycycline-malaria",    name: "Doxycycline (malaria prophylaxis/adjunct)", short: "Doxy", classId: "antimalarial-blood", blurb: "Prophylaxis + IV-quinidine adjunct for severe.", mechanism: "30S ribosomal inhibition (apicoplast)", spectrum: "Plasmodium spp. (slow-acting)", pearls: ["100 mg PO daily for prophylaxis (start 1-2d before, continue 4 wk after)", "Photosensitivity"], doseAdult: "100 mg PO BID (treatment adjunct) x 7d", route: ["PO"], pregnancy: "avoid" },

  // ---------------- Antimalarials — blood-stage & severe ----------------
  { id: "chloroquine",            name: "Chloroquine", classId: "antimalarial-blood", blurb: "Sensitive Plasmodium (rare regions only). Amebic liver abscess adjunct.", mechanism: "Heme polymerase inhibition", spectrum: "Sensitive P. vivax/ovale/malariae/knowlesi (most P. falciparum resistant)", pearls: ["Largely obsolete for falciparum", "Still effective for P. vivax in most regions except Indonesia/PNG"], doseAdult: "1g PO x1, then 500 mg at 6, 24, 48h", route: ["PO"], pregnancy: "safe" },
  { id: "mefloquine",             name: "Mefloquine", classId: "antimalarial-blood", blurb: "Weekly chemoprophylaxis. Neuropsychiatric risks.", mechanism: "Likely heme polymerase + 80S ribosome inhibition", spectrum: "P. falciparum, P. vivax", pearls: ["Black box: neuropsychiatric AE", "Avoid in seizure d/o, psychiatric history"], doseAdult: "250 mg PO weekly (prophylaxis); 750 mg PO x1, then 500 mg at 6-12h (treatment)", route: ["PO"], pregnancy: "caution" },
  { id: "iv-artesunate",          name: "IV Artesunate", classId: "antimalarial-blood", blurb: "First-line for severe malaria. CDC distributes in US.", mechanism: "Artemisinin → ROS damage", spectrum: "Severe P. falciparum", pearls: ["2.4 mg/kg IV at 0, 12, 24h then daily", "Watch for post-artesunate delayed hemolysis (week 2-3)", "Always follow with full PO course"], doseAdult: "2.4 mg/kg IV at 0, 12, 24h, then daily until PO tolerated", route: ["IV"], pregnancy: "caution" },
  { id: "quinidine",              name: "Quinidine / Quinine", classId: "antimalarial-blood", blurb: "Rarely used in US — superseded by IV artesunate.", mechanism: "Heme polymerase inhibition", spectrum: "P. falciparum", pearls: ["Cardiac toxicity — telemetry monitoring", "Quinine PO available for combination tx in some regions"], doseAdult: "Quinine 650 mg PO TID x 3-7d (combo)", route: ["IV", "PO"], pregnancy: "caution" },

  // ---------------- 8-aminoquinolines (radical cure) ----------------
  { id: "primaquine",             name: "Primaquine", classId: "antimalarial-tissue", blurb: "Radical cure of P. vivax/ovale (kills hypnozoites).", mechanism: "Mitochondrial damage in liver schizonts", spectrum: "P. vivax, P. ovale (hypnozoites); P. falciparum gametocytes", pearls: ["Test G6PD before use — hemolysis risk", "30 mg base PO daily x 14d for radical cure"], doseAdult: "30 mg base PO daily x 14d", route: ["PO"], pregnancy: "avoid" },
  { id: "tafenoquine",            name: "Tafenoquine", classId: "antimalarial-tissue", blurb: "Single-dose radical cure for P. vivax. Long half-life prophylaxis.", mechanism: "8-aminoquinoline (like primaquine)", spectrum: "P. vivax hypnozoites", pearls: ["Quantitative G6PD required", "Single 300 mg PO dose", "Co-administered with chloroquine or ACT for blood stages"], doseAdult: "300 mg PO x1 (radical cure)", route: ["PO"], pregnancy: "avoid" },

  // ---------------- Nitroimidazoles ----------------
  { id: "metronidazole-anti",     name: "Metronidazole", short: "Flagyl", classId: "nitroimidazole-antiparasitic", blurb: "Tissue-stage amoebiasis, giardiasis, trichomoniasis.", mechanism: "DNA damage via reduced nitro group", spectrum: "Entamoeba (tissue), Giardia, Trichomonas, anaerobes", pearls: ["No alcohol — disulfiram-like", "Always pair with luminal agent (paromomycin) after invasive amebiasis"], doseAdult: "750 mg PO TID x 7-10d (amebiasis); 2g PO x1 (trich)", route: ["PO", "IV"], pregnancy: "caution" },
  { id: "tinidazole",             name: "Tinidazole", classId: "nitroimidazole-antiparasitic", blurb: "Single-dose alternative for giardia, trich, BV.", mechanism: "DNA damage via reduced nitro group", spectrum: "Giardia, Trichomonas, Entamoeba", pearls: ["Single 2g PO dose for giardia/trich", "Better tolerated than metronidazole"], doseAdult: "2g PO x1 (giardia/trich); 800 mg TID x 5d (amebiasis)", route: ["PO"], pregnancy: "caution" },

  // ---------------- Luminal amebicides ----------------
  { id: "paromomycin",            name: "Paromomycin", classId: "luminal-amebicide", blurb: "Luminal amebicide; cyst eradication. Also for asymptomatic E. histolytica carriers.", mechanism: "30S ribosomal inhibition (aminoglycoside class — non-absorbed PO)", spectrum: "Entamoeba (luminal), Giardia, Cryptosporidium (limited), Leishmania (topical)", pearls: ["Not absorbed — GI lumen only PO", "GI side effects common"], doseAdult: "25-35 mg/kg/day PO divided TID x 7d", route: ["PO"], pregnancy: "safe" },
  { id: "iodoquinol",             name: "Iodoquinol (Diiodohydroxyquin)", classId: "luminal-amebicide", blurb: "Alternative luminal amebicide.", mechanism: "Halogenated 8-hydroxyquinoline; chelates intracellular metals", spectrum: "Entamoeba (luminal cysts), Dientamoeba fragilis", pearls: ["Optic neuritis with prolonged use — limit course", "Largely supplanted by paromomycin"], doseAdult: "650 mg PO TID x 20d", route: ["PO"], pregnancy: "caution" },

  // ---------------- Other antiprotozoals ----------------
  { id: "nitazoxanide",           name: "Nitazoxanide (Alinia)", classId: "antiprotozoal-other", blurb: "Cryptosporidiosis, giardia (alternative).", mechanism: "Pyruvate-ferredoxin oxidoreductase inhibition", spectrum: "Cryptosporidium, Giardia, Entamoeba (mild)", pearls: ["Take with food", "Limited efficacy in advanced HIV (CD4 <50)"], doseAdult: "500 mg PO BID x 3d", route: ["PO"], pregnancy: "caution" },
  { id: "miltefosine",            name: "Miltefosine (Impavido)", classId: "antiprotozoal-other", blurb: "Visceral & cutaneous leishmaniasis; free-living amoebae.", mechanism: "Disrupts phospholipid metabolism / membrane signaling", spectrum: "Leishmania spp.; Naegleria, Acanthamoeba, Balamuthia", pearls: ["28-day course for VL", "Teratogenic — contraception 5 months after"], doseAdult: "50 mg PO BID-TID x 28d", route: ["PO"], pregnancy: "avoid" },
  { id: "pentamidine",            name: "Pentamidine", classId: "antiprotozoal-other", blurb: "Backup for leishmaniasis, T. brucei, PJP (rarely).", mechanism: "Binds kinetoplast DNA", spectrum: "Leishmania, T. brucei, Pneumocystis", pearls: ["IM injection painful", "Hypoglycemia / nephrotoxicity / pancreatitis"], doseAdult: "4 mg/kg IV/IM daily x 7-14d", route: ["IV"], pregnancy: "caution" },
  { id: "benznidazole",           name: "Benznidazole", classId: "antiprotozoal-other", blurb: "First-line for Chagas (T. cruzi).", mechanism: "Reduced nitro group → free radicals", spectrum: "Trypanosoma cruzi", pearls: ["Acute Chagas, congenital, reactivation, early chronic", "Rash + neurotoxicity common"], doseAdult: "5-7 mg/kg/day PO div BID x 60d", route: ["PO"], pregnancy: "avoid" },
  { id: "nifurtimox",             name: "Nifurtimox", classId: "antiprotozoal-other", blurb: "Alternative for Chagas; 1st line for African T. brucei (with eflornithine).", mechanism: "Free-radical generation", spectrum: "T. cruzi, T. brucei", pearls: ["GI + neuropsychiatric AEs", "Pediatric formulation available"], doseAdult: "8-10 mg/kg/day PO div TID-QID x 90d", route: ["PO"], pregnancy: "avoid" },
  { id: "amphotericin-leish",     name: "Liposomal Amphotericin B", classId: "antiprotozoal-other", blurb: "First-line VL in immunocompetent and HIV co-infected.", mechanism: "Ergosterol binding (parasite membrane)", spectrum: "Leishmania donovani, free-living amoebae", pearls: ["3 mg/kg IV days 1-5, 14, 21 (immunocompetent VL)", "Total 21 mg/kg in HIV co-infection"], doseAdult: "3 mg/kg IV (regimen-dependent)", route: ["IV"], pregnancy: "safe" },

  // ---------------- Antifolate combinations ----------------
  { id: "tmp-smx-parasite",       name: "TMP-SMX (toxoplasmosis prophylaxis & cyclospora)", short: "Bactrim", classId: "antifolate-protozoal", blurb: "Toxo prophylaxis (HIV CD4<100), cyclospora, isospora.", mechanism: "Sequential folate inhibition (DHPS + DHFR)", spectrum: "Toxoplasma, Cyclospora, Cystoisospora, Pneumocystis", pearls: ["Toxo prophylaxis: 1 DS daily when CD4 <100", "Cyclospora: 1 DS BID x 7-10d"], doseAdult: "1 DS PO daily-BID (varies)", route: ["PO", "IV"], pregnancy: "caution" },
  { id: "pyrimethamine-sulfa",    name: "Pyrimethamine + Sulfadiazine", classId: "antifolate-protozoal", blurb: "First-line for toxoplasma encephalitis.", mechanism: "DHFR (pyr) + DHPS (sulfa) inhibition", spectrum: "Toxoplasma gondii", pearls: ["Always co-give leucovorin 10-25 mg PO daily (rescue)", "6-week induction then suppression in HIV"], doseAdult: "Pyrimethamine 200 mg load → 50-75 mg PO daily + sulfadiazine 1-1.5g PO QID + leucovorin", route: ["PO"], pregnancy: "avoid" },

  // ---------------- Benzimidazoles ----------------
  { id: "albendazole",            name: "Albendazole", classId: "benzimidazole", blurb: "Broad anthelmintic — strongyloides, ascaris, hookworm, neurocysticercosis.", mechanism: "β-tubulin polymerization inhibition", spectrum: "Most nematodes & cestode larvae (cysticercus, echinococcus)", pearls: ["Take with fatty meal", "LFTs before/during for prolonged courses", "Add steroid for neurocysticercosis"], doseAdult: "400 mg PO BID x 8-30d (varies)", route: ["PO"], pregnancy: "avoid" },
  { id: "mebendazole",            name: "Mebendazole", classId: "benzimidazole", blurb: "Pinworm, ascaris, hookworm, trichuris.", mechanism: "β-tubulin polymerization inhibition", spectrum: "Pinworm, ascaris, hookworm, whipworm", pearls: ["100 mg PO x1 for pinworm, repeat in 2 weeks", "Limited absorption — luminal effect"], doseAdult: "100 mg PO BID x 3d (most worms)", route: ["PO"], pregnancy: "caution" },

  // ---------------- Macrocyclic lactones ----------------
  { id: "ivermectin",             name: "Ivermectin", classId: "macrocyclic-lactone", blurb: "Strongyloides (incl. hyperinfection), scabies, lice, onchocerciasis.", mechanism: "Glutamate-gated Cl- channel agonist (parasite paralysis)", spectrum: "Strongyloides, Onchocerca, Wuchereria, scabies, lice", pearls: ["200 mcg/kg PO x1, repeat day 14 (most indications)", "Daily x 7-14d in disseminated strongyloides"], doseAdult: "200 mcg/kg PO x1-2 doses (most); daily for hyperinfection", route: ["PO"], pregnancy: "caution" },
  { id: "moxidectin",             name: "Moxidectin", classId: "macrocyclic-lactone", blurb: "Single-dose onchocerciasis (river blindness).", mechanism: "Glutamate-gated Cl- channel agonist", spectrum: "Onchocerca volvulus (microfilaricidal, longer suppression than ivermectin)", pearls: ["FDA-approved 2018", "Single 8 mg PO dose"], doseAdult: "8 mg PO x1", route: ["PO"], pregnancy: "avoid" },

  // ---------------- Praziquantel ----------------
  { id: "praziquantel",           name: "Praziquantel", classId: "praziquantel-class", blurb: "Schistosoma, tapeworms (Taenia, H. nana), liver flukes.", mechanism: "Ca²⁺ influx → tegument disruption + spastic paralysis", spectrum: "Schistosoma spp., cestodes (Taenia, Hymenolepis), trematodes", pearls: ["Schisto: 40-60 mg/kg/d split BID-TID x 1d", "Add albendazole + steroids for neurocysticercosis", "Take with food, swallow whole"], doseAdult: "40-60 mg/kg PO div BID-TID (varies by indication)", route: ["PO"], pregnancy: "caution" },

  // ---------------- Topical ectoparasiticides ----------------
  { id: "permethrin",             name: "Permethrin 5% topical", classId: "ectoparasiticide", blurb: "First-line for scabies & head lice.", mechanism: "Sodium channel disruption in arthropods", spectrum: "Scabies, lice", pearls: ["Apply neck-to-toes, leave 8-14h, repeat day 7-14", "Treat household contacts simultaneously"], doseAdult: "5% topical x1, repeat day 7-14", route: ["PO"], pregnancy: "safe" },
  { id: "malathion",              name: "Malathion 0.5%", classId: "ectoparasiticide", blurb: "Pediculicide — head lice (resistant cases).", mechanism: "Cholinesterase inhibition in arthropods", spectrum: "Pediculus (head lice)", pearls: ["Flammable — keep away from heat", "Apply 8-12h, repeat in 7-9d if live lice"], doseAdult: "Topical, repeat day 7-9", route: ["PO"], pregnancy: "caution" },
];

export const bugs: Bug[] = [
  { id: "p-falciparum",  name: "P. falciparum", category: "parasite-protozoa", shape: "atypical",
    blurb: "Most lethal Plasmodium. Severe disease + cerebral malaria.",
    pearls: ["IV artesunate for severe", "ACT (e.g. artemether-lumefantrine) uncomplicated", "Test for severity criteria: parasitemia >5%, organ failure, ARDS, AMS"],
    syndromes: ["malaria-uncomplicated", "malaria-severe"]},
  { id: "p-vivax",       name: "P. vivax / ovale", category: "parasite-protozoa", shape: "atypical",
    blurb: "Hypnozoites cause relapse — radical cure required.",
    pearls: ["Chloroquine still works in most regions (Indonesia/PNG resistant)", "Add primaquine or tafenoquine after G6PD testing"],
    syndromes: ["malaria-uncomplicated", "malaria-relapse"]},
  { id: "entamoeba",     name: "Entamoeba histolytica", category: "parasite-protozoa", shape: "atypical",
    blurb: "Amebic colitis & liver abscess. Always treat tissue + lumen.",
    pearls: ["Metronidazole + paromomycin sequence", "Asymptomatic cyst carriers: paromomycin alone"],
    syndromes: ["amebiasis", "liver-abscess"]},
  { id: "giardia",       name: "Giardia lamblia", category: "parasite-protozoa", shape: "atypical",
    blurb: "Persistent diarrhea, malabsorption — beaver fever.",
    pearls: ["Tinidazole single dose preferred", "Nitazoxanide alternative; refractory: combination"],
    syndromes: ["giardiasis"]},
  { id: "cryptosporidium", name: "Cryptosporidium", category: "parasite-protozoa", shape: "atypical",
    blurb: "Watery diarrhea — chronic and severe in HIV/AIDS.",
    pearls: ["Nitazoxanide for immunocompetent", "ART + supportive care most important in AIDS"],
    syndromes: ["cryptosporidiosis"]},
  { id: "cyclospora",    name: "Cyclospora / Cystoisospora", category: "parasite-protozoa", shape: "atypical",
    blurb: "Berries/salads outbreaks — prolonged watery diarrhea.",
    pearls: ["TMP-SMX is first-line", "Long courses in HIV/AIDS"],
    syndromes: ["cyclospora-isospora"]},
  { id: "toxoplasma",    name: "Toxoplasma gondii", category: "parasite-protozoa", shape: "atypical",
    blurb: "Reactivates in HIV/AIDS — ring-enhancing brain lesions.",
    pearls: ["Pyrimethamine + sulfadiazine + leucovorin first-line", "TMP-SMX for prophylaxis when CD4 <100"],
    syndromes: ["toxoplasmosis"]},
  { id: "leishmania",    name: "Leishmania spp.", category: "parasite-protozoa", shape: "atypical",
    blurb: "Visceral (kala-azar) and cutaneous forms.",
    pearls: ["Liposomal amphotericin first-line VL", "Miltefosine PO for cutaneous + VL alternative"],
    syndromes: ["leishmaniasis"]},
  { id: "trypanosoma-cruzi", name: "Trypanosoma cruzi", category: "parasite-protozoa", shape: "atypical",
    blurb: "Chagas disease — acute myocarditis → chronic cardiomyopathy.",
    pearls: ["Benznidazole first-line (60d)", "Treat acute, congenital, reactivation, early chronic"],
    syndromes: ["chagas"]},
  { id: "trichomonas",   name: "Trichomonas vaginalis", category: "parasite-protozoa", shape: "atypical",
    blurb: "STI — frothy yellow-green discharge, strawberry cervix.",
    pearls: ["Treat partner(s)", "Single 2g metronidazole or tinidazole"],
    syndromes: ["trichomoniasis"]},
  { id: "strongyloides", name: "Strongyloides stercoralis", category: "parasite-helminth", shape: "atypical",
    blurb: "Autoinfection cycle — hyperinfection in steroids/HTLV-1.",
    pearls: ["Screen before steroids/biologics in endemic areas", "Daily ivermectin in disseminated/hyperinfection"],
    syndromes: ["strongyloidiasis"]},
  { id: "ascaris-hookworm", name: "Ascaris / Hookworm / Trichuris", category: "parasite-helminth", shape: "atypical",
    blurb: "Soil-transmitted helminths — anemia, malnutrition, GI sx.",
    pearls: ["Albendazole or mebendazole single dose", "Mass drug administration in endemic areas"],
    syndromes: ["sth-stl"]},
  { id: "pinworm",       name: "Enterobius vermicularis", category: "parasite-helminth", shape: "atypical",
    blurb: "Pinworm — perianal pruritus, often whole household.",
    pearls: ["Mebendazole or albendazole single dose, repeat in 2 wk", "Treat whole household"],
    syndromes: ["pinworm"]},
  { id: "schistosoma",   name: "Schistosoma spp.", category: "parasite-helminth", shape: "atypical",
    blurb: "Acute (Katayama) and chronic (urinary/intestinal) disease.",
    pearls: ["Praziquantel 40-60 mg/kg single day", "Add steroids for Katayama / heavy egg burden"],
    syndromes: ["schistosomiasis"]},
  { id: "taenia",        name: "Taenia / Cysticercus", category: "parasite-helminth", shape: "atypical",
    blurb: "Adult tapeworm = praziquantel; cysticercus larva = albendazole.",
    pearls: ["Neurocysticercosis: albendazole + praziquantel + steroids + AEDs", "ID number/location of cysts before treating"],
    syndromes: ["taeniasis-ncc"]},
  { id: "scabies-lice",  name: "Scabies / Lice", category: "parasite-ectoparasite", shape: "atypical",
    blurb: "Sarcoptes scabiei + Pediculus — pruritic infestations.",
    pearls: ["Permethrin 5% first-line for scabies", "Oral ivermectin for crusted scabies/outbreaks", "Treat household + clothing/bedding"],
    syndromes: ["scabies", "pediculosis"]},
];

export const syndromes: Syndrome[] = [
  { id: "malaria-uncomplicated", name: "Uncomplicated malaria", category: "systemic",
    blurb: "Symptomatic Plasmodium without severe-disease criteria.",
    empiric: ["artemether-lumefantrine", "atovaquone-proguanil", "chloroquine", "mefloquine", "primaquine", "tafenoquine"],
    empiricPrimary: ["artemether-lumefantrine"],
    empiricAlternate: ["atovaquone-proguanil", "chloroquine", "mefloquine"],
    sourceIds: ["malaria-cdc-2024", "malaria-who-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Uncomplicated P. falciparum (CDC 2024): artemether-lumefantrine 4 tabs PO at 0, 8, 24, 36, 48, 60 hours (preferred). Alternatives: atovaquone-proguanil 4 adult tabs daily x 3 days; quinine sulfate 650 mg PO TID + doxycycline/clindamycin x 3-7 days; mefloquine (where resistance permits) 750 mg PO x1 then 500 mg in 6-12h. Confirm species and acquired region; chloroquine retains activity for sensitive P. malariae/knowlesi and most P. vivax/ovale (resistance in Indonesia/PNG/Oceania). For P. vivax/ovale add radical cure with primaquine 30 mg base PO daily x 14 days OR tafenoquine 300 mg PO x1 (must document G6PD activity ≥70% normal first). Avoid primaquine and tafenoquine in pregnancy and severe G6PD deficiency.",
    commonBugs: ["p-falciparum", "p-vivax"]},
  { id: "malaria-severe", name: "Severe malaria", category: "systemic",
    blurb: "Parasitemia >5%, AMS, ARDS, renal failure, acidosis, hypoglycemia, shock.",
    empiric: ["iv-artesunate", "doxycycline-malaria", "quinidine"],
    empiricPrimary: ["iv-artesunate"],
    empiricAlternate: ["quinidine"],
    sourceIds: ["malaria-cdc-2024", "malaria-who-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Severe malaria (any species, CDC 2024): IV artesunate 2.4 mg/kg IV at 0, 12, 24h then daily until parasitemia <1% and PO tolerated (commercially available; CDC distributes via Malaria Hotline +1-770-488-7788). Always follow with full course of oral antimalarial (artemether-lumefantrine, atovaquone-proguanil, mefloquine, or doxycycline-based regimen). Monitor for post-artesunate delayed hemolysis (peak day 14-21; check Hb weekly x 4 weeks). If artesunate unavailable: IV quinidine gluconate (telemetry mandatory; cardiotoxicity) + doxycycline. Empiric antibacterial coverage if bacterial sepsis cannot be excluded. Exchange transfusion no longer routinely recommended.",
    commonBugs: ["p-falciparum"]},
  { id: "malaria-relapse", name: "P. vivax / ovale relapse prevention", category: "systemic",
    blurb: "Radical cure to eradicate hypnozoites.",
    empiric: ["primaquine", "tafenoquine"],
    empiricPrimary: ["primaquine", "tafenoquine"],
    empiricAlternate: ["primaquine"],
    sourceIds: ["malaria-cdc-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Document G6PD activity quantitatively before either agent. Primaquine 30 mg base PO daily x 14 days OR tafenoquine 300 mg PO x1 (in addition to a blood-stage agent — chloroquine where sensitive, or ACT). Tafenoquine requires G6PD ≥70% normal; primaquine permitted at intermediate G6PD activity per WHO with caution. Both contraindicated in pregnancy (give weekly chloroquine prophylaxis until delivery, then radical cure). Tafenoquine is the only single-dose option but cannot be used in <16 years.",
    commonBugs: ["p-vivax"]},
  { id: "amebiasis", name: "Amebiasis (invasive / colitis)", category: "gi",
    blurb: "Bloody diarrhea, fulminant colitis, or asymptomatic carriage.",
    empiric: ["metronidazole-anti", "tinidazole", "paromomycin", "iodoquinol"],
    empiricPrimary: ["metronidazole-anti", "paromomycin"],
    empiricAlternate: ["tinidazole", "iodoquinol"],
    sourceIds: ["amebiasis-cdc-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Invasive amebiasis (colitis, liver abscess, extraintestinal): metronidazole 750 mg PO TID x 7-10 days OR tinidazole 2g PO daily x 3-5 days (colitis) or x 5 days (liver abscess). MUST follow tissue agent with luminal amebicide to clear cysts: paromomycin 25-35 mg/kg/day PO div TID x 7 days (preferred) OR iodoquinol 650 mg PO TID x 20 days. Asymptomatic E. histolytica cyst passers: paromomycin alone. Liver abscess drainage rarely needed unless impending rupture, large left-lobe abscesses near pericardium, or no response in 5-7 days.",
    commonBugs: ["entamoeba"]},
  { id: "liver-abscess", name: "Amebic liver abscess", category: "gi",
    blurb: "RUQ pain, fever, history of travel/cysts. Single right-lobe lesion classic.",
    empiric: ["metronidazole-anti", "tinidazole", "paromomycin"],
    empiricPrimary: ["metronidazole-anti"],
    empiricAlternate: ["tinidazole"],
    sourceIds: ["amebiasis-cdc-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Metronidazole 750 mg PO/IV TID x 7-10 days (or tinidazole 2g PO daily x 5 days), followed by luminal amebicide (paromomycin 25-35 mg/kg/d div TID x 7d). Serology (IHA/EIA) positive in >95% by 1 week. Aspiration only for: failure to improve at 5-7 days, large left-lobe abscess at risk for pericardial rupture, diagnosis uncertain (rule out pyogenic). Add empiric antibacterial coverage if pyogenic abscess possible.",
    commonBugs: ["entamoeba"]},
  { id: "giardiasis", name: "Giardiasis", category: "gi",
    blurb: "Persistent diarrhea, bloating, malabsorption — daycare, travelers, beavers.",
    empiric: ["tinidazole", "metronidazole-anti", "nitazoxanide", "paromomycin"],
    empiricPrimary: ["tinidazole"],
    empiricAlternate: ["metronidazole-anti", "nitazoxanide", "paromomycin"],
    sourceIds: ["giardia-cdc-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Tinidazole 2g PO single dose (preferred — single dose, ~90% efficacy). Alternatives: metronidazole 250 mg PO TID x 5-7 days; nitazoxanide 500 mg PO BID x 3 days (preferred in children ≥1 year and pregnancy if needed). Pregnancy: paromomycin 500 mg PO TID x 5-10 days is non-absorbed and considered safest in 1st trimester. Refractory disease (after 2 nitroimidazole courses): combination (e.g. albendazole 400 mg/d + metronidazole) or quinacrine via CDC.",
    commonBugs: ["giardia"]},
  { id: "cryptosporidiosis", name: "Cryptosporidiosis", category: "gi",
    blurb: "Watery diarrhea — self-limited if immunocompetent, devastating in AIDS.",
    empiric: ["nitazoxanide", "paromomycin"],
    empiricPrimary: ["nitazoxanide"],
    empiricAlternate: ["paromomycin"],
    sourceIds: ["crypto-cdc-2023", "opportunistic-hiv-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Immunocompetent: nitazoxanide 500 mg PO BID x 3 days (modest benefit; most patients self-resolve). HIV/AIDS: ART is the most effective intervention — restoring CD4 >100 typically clears infection. Adjunctive nitazoxanide 500-1000 mg PO BID x 14+ days has limited benefit. Aggressive rehydration. Paromomycin + azithromycin combination has been used in advanced AIDS. No effective treatment without immune reconstitution.",
    commonBugs: ["cryptosporidium"]},
  { id: "cyclospora-isospora", name: "Cyclospora / Cystoisospora", category: "gi",
    blurb: "Prolonged watery diarrhea — fresh produce outbreaks (raspberries, basil, salad).",
    empiric: ["tmp-smx-parasite"],
    empiricPrimary: ["tmp-smx-parasite"],
    empiricAlternate: [],
    sourceIds: ["cyclospora-cdc-2023", "opportunistic-hiv-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "TMP-SMX 1 DS tablet PO BID x 7-10 days (immunocompetent) or x 10-14 days (HIV/AIDS). For sulfa-allergic patients: nitazoxanide is an off-label alternative with limited evidence. HIV/AIDS with CD4 <200 — chronic suppression with TMP-SMX 1 DS PO 3x/week may be needed until CD4 >200 for >3 months. Cystoisospora belli treated identically; may require longer maintenance dosing.",
    commonBugs: ["cyclospora"]},
  { id: "toxoplasmosis", name: "Toxoplasmic encephalitis", category: "cns",
    blurb: "Reactivation in HIV/AIDS — ring-enhancing brain lesions, focal deficits.",
    empiric: ["pyrimethamine-sulfa", "tmp-smx-parasite"],
    empiricPrimary: ["pyrimethamine-sulfa"],
    empiricAlternate: ["tmp-smx-parasite"],
    sourceIds: ["opportunistic-hiv-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Acute TE (HIV/AIDS, CD4 <100): pyrimethamine 200 mg PO load → 50-75 mg PO daily + sulfadiazine 1000-1500 mg PO QID + leucovorin 10-25 mg PO daily (rescue from BM toxicity) x ≥6 weeks (induction), longer if incomplete response. Maintenance: same agents at half dose until CD4 >200 for >6 months. Sulfa-allergic alternative: pyrimethamine + clindamycin 600 mg IV/PO q6h + leucovorin. Resource-limited or sulfa-allergic: TMP-SMX 5/25 mg/kg PO/IV BID is non-inferior in some studies. Add dexamethasone only for significant edema/mass effect. Primary prophylaxis: TMP-SMX 1 DS daily when CD4 <100 and Toxo IgG positive.",
    commonBugs: ["toxoplasma"]},
  { id: "leishmaniasis", name: "Leishmaniasis (visceral / cutaneous)", category: "systemic",
    blurb: "VL: fever, hepatosplenomegaly, pancytopenia. CL: chronic ulcers.",
    empiric: ["amphotericin-leish", "miltefosine", "pentamidine", "paromomycin"],
    empiricPrimary: ["amphotericin-leish"],
    empiricAlternate: ["miltefosine", "pentamidine"],
    sourceIds: ["leish-idsa-astmh-2017", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Visceral leishmaniasis (immunocompetent): liposomal amphotericin B 3 mg/kg IV days 1-5, 14, and 21 (total dose 21 mg/kg; FDA-approved regimen). HIV co-infection: total dose 40 mg/kg recommended; consider secondary prophylaxis. Alternatives: miltefosine 50 mg PO BID-TID x 28 days; sodium stibogluconate (CDC investigational) 20 mg/kg/d IV x 28 days; paromomycin IM in some regions. Cutaneous leishmaniasis: depends on Old vs New World species, lesion size/location, host immunity — options include miltefosine PO, intralesional antimony, liposomal amphotericin (mucosal/disseminated), thermotherapy, cryotherapy. Mucosal leishmaniasis: liposomal amphotericin or amphotericin B deoxycholate strongly preferred.",
    commonBugs: ["leishmania"]},
  { id: "chagas", name: "Chagas disease (T. cruzi)", category: "systemic",
    blurb: "Acute (myocarditis), chronic indeterminate, chronic cardiac, chronic GI (megacolon/megaesophagus).",
    empiric: ["benznidazole", "nifurtimox"],
    empiricPrimary: ["benznidazole"],
    empiricAlternate: ["nifurtimox"],
    sourceIds: ["chagas-cdc-2023", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Treat: acute infection (any age), congenital infection, reactivation in immunocompromised, children/adolescents with chronic infection, women of childbearing age (to prevent congenital transmission), and adults <50 in chronic indeterminate phase. Benznidazole 5-7 mg/kg/day PO div BID x 60 days (first-line; better tolerated than nifurtimox). Nifurtimox 8-10 mg/kg/day PO div TID-QID x 90 days. Both have substantial AEs (rash, peripheral neuropathy, GI, anorexia, neuropsychiatric). Treatment for established Chagas cardiomyopathy is controversial (BENEFIT trial showed no major clinical benefit); decision individualized. Consult CDC for medication access.",
    commonBugs: ["trypanosoma-cruzi"]},
  { id: "trichomoniasis", name: "Trichomoniasis", category: "gu",
    blurb: "STI — frothy yellow-green discharge, strawberry cervix.",
    empiric: ["metronidazole-anti", "tinidazole"],
    empiricPrimary: ["metronidazole-anti"],
    empiricAlternate: ["tinidazole"],
    sourceIds: ["sti-cdc-2021", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Women: metronidazole 500 mg PO BID x 7 days (CDC 2021 update — preferred over single 2g dose due to higher cure rates in women). Men: metronidazole 2g PO single dose remains acceptable. Alternative: tinidazole 2g PO single dose (better tolerated; equivalent efficacy). Treat partners simultaneously and abstain from sex until both partners complete therapy and asymptomatic. No alcohol during and 24h after metronidazole / 72h after tinidazole. Persistent infection: re-treat with metronidazole 500 mg BID x 7d → if still positive, escalating regimens (e.g. metronidazole/tinidazole 2g daily x 7 days).",
    commonBugs: ["trichomonas"]},
  { id: "strongyloidiasis", name: "Strongyloidiasis", category: "gi",
    blurb: "Larva currens, eosinophilia, GI sx — risk of hyperinfection on steroids/HTLV-1.",
    empiric: ["ivermectin", "albendazole"],
    empiricPrimary: ["ivermectin"],
    empiricAlternate: ["albendazole"],
    sourceIds: ["strongyloides-cdc-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Uncomplicated strongyloidiasis: ivermectin 200 mcg/kg PO daily x 1-2 days (some experts give 2 doses 14 days apart). Hyperinfection / disseminated strongyloidiasis: ivermectin 200 mcg/kg PO daily until stool, sputum, or other relevant sample is negative for ≥2 weeks (often 14+ days total). In severe ileus or unable to take PO: subcutaneous veterinary ivermectin via CDC compassionate use. Add empiric broad-spectrum antibacterials for concurrent gram-negative bacteremia from translocation. Albendazole 400 mg PO BID x 7 days is a less-effective alternative. Screen ALL patients from endemic regions before steroids, biologics, HSCT, or solid organ transplant.",
    commonBugs: ["strongyloides"]},
  { id: "sth-stl", name: "Soil-transmitted helminths (Ascaris/Hookworm/Trichuris)", category: "gi",
    blurb: "Asymptomatic to anemia, malabsorption, growth failure.",
    empiric: ["albendazole", "mebendazole", "ivermectin"],
    empiricPrimary: ["albendazole"],
    empiricAlternate: ["mebendazole"],
    sourceIds: ["sth-who-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Albendazole 400 mg PO single dose (Ascaris, hookworm, single-dose efficacy >90%). Trichuris is less responsive — use albendazole 400 mg PO daily x 3 days OR add ivermectin 200 mcg/kg PO x 1-3 days for combination. Mebendazole 100 mg PO BID x 3 days is an equivalent alternative. Mass drug administration with single-dose albendazole or mebendazole is standard in endemic regions. Eosinophilia warrants empirical screening for strongyloides before any steroid use.",
    commonBugs: ["ascaris-hookworm"]},
  { id: "pinworm", name: "Pinworm (Enterobius)", category: "gi",
    blurb: "Perianal pruritus — tape test diagnostic.",
    empiric: ["mebendazole", "albendazole", "ivermectin"],
    empiricPrimary: ["mebendazole"],
    empiricAlternate: ["albendazole"],
    sourceIds: ["pinworm-cdc-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Mebendazole 100 mg PO single dose, repeat in 2 weeks (preferred). Albendazole 400 mg PO single dose, repeat in 2 weeks is equivalent. Ivermectin 200 mcg/kg PO x1, repeat in 2 weeks is an alternative. Treat all symptomatic and asymptomatic household contacts simultaneously. Wash bedding/clothing in hot water on day of treatment.",
    commonBugs: ["pinworm"]},
  { id: "schistosomiasis", name: "Schistosomiasis", category: "systemic",
    blurb: "Acute Katayama fever, chronic intestinal/urinary disease, periportal fibrosis.",
    empiric: ["praziquantel"],
    empiricPrimary: ["praziquantel"],
    empiricAlternate: [],
    sourceIds: ["schisto-cdc-2024", "schisto-who-2022", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Praziquantel 40 mg/kg PO div BID x 1 day (S. haematobium, S. mansoni); 60 mg/kg PO div TID x 1 day (S. japonicum, S. mekongi). Take with food, swallow whole. Acute schistosomiasis (Katayama syndrome) — add prednisone 1 mg/kg/day x 5-7 days; delay or repeat praziquantel after acute reaction subsides since adult worms (target of praziquantel) may not yet be mature. Re-treat 4-6 weeks later for prepatent worms. Eosinophilia and serology may persist months after successful cure; follow eggs in urine/stool.",
    commonBugs: ["schistosoma"]},
  { id: "taeniasis-ncc", name: "Taeniasis / Neurocysticercosis", category: "cns",
    blurb: "Adult tapeworm = praziquantel; brain cysts = albendazole + steroids ± praziquantel.",
    empiric: ["praziquantel", "albendazole"],
    empiricPrimary: ["praziquantel"],
    empiricAlternate: ["albendazole"],
    sourceIds: ["ncc-idsa-astmh-2018", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Adult intestinal taeniasis (T. saginata, T. solium, H. nana): praziquantel 5-10 mg/kg PO single dose (T. saginata/solium) or 25 mg/kg single dose (H. nana). Active parenchymal neurocysticercosis: anthelmintic therapy with albendazole 15 mg/kg/day PO div BID (max 1200 mg/day) ± praziquantel 50 mg/kg/day PO div TID, both x 10-14 days. ALWAYS co-administer corticosteroids (dexamethasone or prednisone) starting before/with anthelmintic to attenuate inflammation. Anti-epileptic drugs for seizures. NCC with hydrocephalus or extraparenchymal disease — neurosurgical evaluation; anthelmintic timing controversial. Single enhancing lesions often resolve with steroids/AEDs alone; consider not treating with anthelmintics.",
    commonBugs: ["taenia"]},
  { id: "scabies", name: "Scabies", category: "skin",
    blurb: "Pruritic burrows, classic distribution. Crusted form in immunocomp.",
    empiric: ["permethrin", "ivermectin"],
    empiricPrimary: ["permethrin"],
    empiricAlternate: ["ivermectin"],
    sourceIds: ["scabies-cdc-2024", "scabies-idsa-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Classic scabies: permethrin 5% topical applied neck-to-toes, leave on 8-14 hours, repeat in 7-14 days (first-line). Oral ivermectin 200 mcg/kg PO at 0 and day 7-14 is an equally effective alternative — preferred for outbreaks (institutions, refugee camps), failure of topical, or noncompliance. Crusted (Norwegian) scabies: combination of permethrin (daily for 7 days then 2x/wk until cure) PLUS ivermectin 200 mcg/kg PO on days 1, 2, 8, 9, and 15 (add days 22 and 29 if extensive). Treat all close contacts simultaneously; wash bedding/clothing in hot water; pruritus may persist 2-4 weeks after successful treatment.",
    commonBugs: ["scabies-lice"]},
  { id: "pediculosis", name: "Pediculosis (head/body/pubic lice)", category: "skin",
    blurb: "Head lice in school outbreaks; pubic lice = STI; body lice = poor hygiene.",
    empiric: ["permethrin", "malathion", "ivermectin"],
    empiricPrimary: ["permethrin"],
    empiricAlternate: ["malathion", "ivermectin"],
    sourceIds: ["lice-cdc-2024", "sanford-guide-2025", "hopkins-abx-guide", "openevidence"],
    guidelineNotes: "Head lice: permethrin 1% OTC (or 5% if resistance suspected) applied to dry hair x10 minutes, repeat day 9. Resistance widespread — alternatives: malathion 0.5% lotion x 8-12h (repeat 7-9d if live lice), spinosad 0.9%, ivermectin 0.5% topical, or oral ivermectin 200-400 mcg/kg PO at 0 and day 9. Pubic lice (phthiriasis): permethrin 1% topical, repeat in 9-10 days; treat sexual partners. Body lice (Pediculus humanus corporis): improved hygiene, launder clothing/bedding in hot water; pediculicide rarely needed. Body lice transmit relapsing fever, trench fever, epidemic typhus.",
    commonBugs: ["scabies-lice"]},
];

const C: Record<string, Record<string, Coverage>> = {};
const set = (drug: string, bug: string, c: Coverage) => {
  if (!C[drug]) C[drug] = {};
  C[drug][bug] = c;
};

// Plasmodium
set("artemether-lumefantrine", "p-falciparum", "primary"); set("artemether-lumefantrine", "p-vivax", "primary");
set("atovaquone-proguanil",   "p-falciparum", "primary"); set("atovaquone-proguanil", "p-vivax", "alternate");
set("chloroquine",            "p-vivax", "primary"); set("chloroquine", "p-falciparum", "alternate");
set("mefloquine",             "p-falciparum", "alternate"); set("mefloquine", "p-vivax", "alternate");
set("iv-artesunate",          "p-falciparum", "primary"); set("iv-artesunate", "p-vivax", "primary");
set("quinidine",              "p-falciparum", "alternate");
set("doxycycline-malaria",    "p-falciparum", "alternate");
set("primaquine",             "p-vivax", "primary"); // tissue schizonticide
set("tafenoquine",            "p-vivax", "primary");

// Entamoeba
set("metronidazole-anti", "entamoeba", "primary");
set("tinidazole", "entamoeba", "primary");
set("paromomycin", "entamoeba", "primary"); // luminal phase
set("iodoquinol", "entamoeba", "alternate");

// Giardia
set("tinidazole", "giardia", "primary");
set("metronidazole-anti", "giardia", "primary");
set("nitazoxanide", "giardia", "alternate");
set("paromomycin", "giardia", "alternate");

// Cryptosporidium
set("nitazoxanide", "cryptosporidium", "primary");
set("paromomycin", "cryptosporidium", "alternate");

// Cyclospora / Cystoisospora
set("tmp-smx-parasite", "cyclospora", "primary");

// Toxoplasma
set("pyrimethamine-sulfa", "toxoplasma", "primary");
set("tmp-smx-parasite", "toxoplasma", "alternate");

// Leishmania
set("amphotericin-leish", "leishmania", "primary");
set("miltefosine", "leishmania", "primary");
set("pentamidine", "leishmania", "alternate");
set("paromomycin", "leishmania", "alternate");

// T. cruzi
set("benznidazole", "trypanosoma-cruzi", "primary");
set("nifurtimox", "trypanosoma-cruzi", "alternate");

// Trichomonas
set("metronidazole-anti", "trichomonas", "primary");
set("tinidazole", "trichomonas", "primary");

// Strongyloides
set("ivermectin", "strongyloides", "primary");
set("albendazole", "strongyloides", "alternate");

// Soil-transmitted helminths
set("albendazole", "ascaris-hookworm", "primary");
set("mebendazole", "ascaris-hookworm", "primary");
set("ivermectin", "ascaris-hookworm", "alternate");

// Pinworm
set("mebendazole", "pinworm", "primary");
set("albendazole", "pinworm", "primary");
set("ivermectin", "pinworm", "alternate");

// Schistosoma
set("praziquantel", "schistosoma", "primary");

// Taenia / cysticercus
set("praziquantel", "taenia", "primary");
set("albendazole", "taenia", "primary");

// Scabies & lice
set("permethrin", "scabies-lice", "primary");
set("malathion", "scabies-lice", "alternate");
set("ivermectin", "scabies-lice", "primary");

export const coverage = C;
export function getCoverage(drugId: string, bugId: string): Coverage {
  return C[drugId]?.[bugId] || "none";
}
export function getDrugById(id: string) { return drugs.find(d => d.id === id); }
export function getBugById(id: string) { return bugs.find(b => b.id === id); }
export function getSyndromeById(id: string) { return syndromes.find(s => s.id === id); }
export function getClassById(id: string) { return drugClasses.find(c => c.id === id); }
