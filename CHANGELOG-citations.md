# CoverageIQ — Citation Pass Changelog

All 36 syndromes reviewed against authoritative IDSA/AASLD/ATS/NIH/CDC guidelines via OpenEvidence.
Each syndrome now has:
- A `primary` regimen list (orange chips — preferred/first-line)
- An `alternate` regimen list (yellow chips — second-line / penicillin allergy / resistance)
- One or more `sourceIds` referencing the master citation table in `sources.ts`

## Per-syndrome changes

### aspergilloma
  - Old empiric: [itra, vori]
  - New primary: [vori, itra]
  - New alternate: [posa, isavu, ampho]
  - **Added:** ampho, isavu, posa
  - Sources: aspergillosis-idsa-2016

### aspiration
  - Old empiric: [augmentin, clinda, moxi, unasyn]
  - New primary: [ceftriaxone, azithro, unasyn]
  - New alternate: [levo, moxi, doxy, clinda, metro]
  - **Added:** azithro, ceftriaxone, doxy, levo, metro
  - **Removed:** augmentin
  - Sources: cap-ats-idsa-2019

### biliary
  - Old empiric: [ceftriaxone, metro, zosyn]
  - New primary: [zosyn, ceftriaxone]
  - New alternate: [meropenem, ertapenem, cipro, metro, unasyn]
  - **Added:** cipro, ertapenem, meropenem, unasyn
  - Sources: tokyo-2018, iab-idsa-2010

### bone
  - Old empiric: [ceftriaxone, dapto, vanc]
  - New primary: [vanc, ceftriaxone]
  - New alternate: [naf, cefazolin, dapto, linezolid, cipro, levo]
  - **Added:** cefazolin, cipro, levo, linezolid, naf
  - Sources: nvo-idsa-2015

### candidemia
  - Old empiric: [fluc, mica]
  - New primary: [mica]
  - New alternate: [fluc, ampho, vori, fluc]
  - **Added:** ampho, vori
  - Sources: candida-idsa-2016

### cap
  - Old empiric: [azithro, ceftriaxone, doxy, levo]
  - New primary: [ceftriaxone, azithro]
  - New alternate: [levo, moxi, doxy, amox, unasyn, ceftaroline]
  - **Added:** amox, ceftaroline, moxi, unasyn
  - Sources: cap-ats-idsa-2019

### cmv-disease
  - Old empiric: [foscarnet, ganciclovir]
  - New primary: [ganciclovir]
  - New alternate: [foscarnet, letermovir]
  - **Added:** letermovir
  - Sources: cmv-ast-2019

### crypto-meningitis
  - Coverage list unchanged. Now classified as: primary [ampho, flucy] + alternate [fluc]

### dimorphic
  - Old empiric: [ampho, fluc, itra]
  - New primary: [itra, ampho]
  - New alternate: [fluc, vori, posa]
  - **Added:** posa, vori
  - Sources: histo-idsa-2007, blasto-ecmm-2021

### endocarditis
  - Old empiric: [ag, ceftriaxone, vanc]
  - New primary: [naf, vanc, ceftriaxone]
  - New alternate: [dapto, ag, cefazolin, linezolid, zosyn]
  - **Added:** cefazolin, dapto, linezolid, naf, zosyn
  - Sources: ie-aha-2015

### gi
  - Old empiric: [cipro, metro, vancpo]
  - New primary: [vancpo, metro]
  - New alternate: [cipro, levo, doxy, azithro]
  - **Added:** azithro, doxy, levo
  - Sources: cdi-idsa-2021

### gu-instr
  - Old empiric: [cefepime, vanc, zosyn]
  - New primary: [ceftriaxone, cefepime, cipro, zosyn]
  - New alternate: [meropenem, levo, ag]
  - **Added:** ag, ceftriaxone, cipro, levo, meropenem
  - **Removed:** vanc
  - Sources: cuti-idsa-2025

### hcap
  - Old empiric: [cefepime, linezolid, vanc, zosyn]
  - New primary: [zosyn, cefepime, meropenem]
  - New alternate: [vanc, linezolid, aztreonam, levo]
  - **Added:** aztreonam, levo, meropenem
  - Sources: hap-vap-idsa-2016

### hep-flare
  - Coverage list unchanged. Now classified as: primary [tenofovir, entecavir, sofvel, glecpib] + alternate [tenofovir]

### herpes-mucocutaneous
  - Coverage list unchanged. Now classified as: primary [acyclovir, famciclovir] + alternate [acyclovir]

### hiv-disease
  - Coverage list unchanged. Now classified as: primary [biktarvy, dolutegravir] + alternate [dolutegravir]

### hsv-encephalitis
  - Old empiric: [acyclovir]
  - New primary: [acyclovir]
  - New alternate: [foscarnet, ganciclovir]
  - **Added:** foscarnet, ganciclovir
  - Sources: encephalitis-idsa-2008

### ic-mucocutaneous
  - Old empiric: [fluc]
  - New primary: [fluc]
  - New alternate: [itra, posa, vori, mica, ampho]
  - **Added:** ampho, itra, mica, posa, vori
  - Sources: candida-idsa-2016

### ic-uti
  - Old empiric: [ampho, fluc]
  - New primary: [fluc]
  - New alternate: [ampho, flucy]
  - **Added:** flucy
  - Sources: candida-idsa-2016

### intraabd-secondary
  - Old empiric: [ceftriaxone, ertapenem, metro, zosyn]
  - New primary: [zosyn, ceftriaxone, metro]
  - New alternate: [meropenem, ertapenem, cipro, tige]
  - **Added:** cipro, meropenem, tige
  - Sources: iab-idsa-2010

### intraabd-spontaneous
  - Old empiric: [ceftriaxone]
  - New primary: [ceftriaxone]
  - New alternate: [zosyn, cipro, meropenem]
  - **Added:** cipro, meropenem, zosyn
  - Sources: sbp-aasld-2021

### ipa
  - Old empiric: [ampho, isavu, vori]
  - New primary: [vori]
  - New alternate: [isavu, ampho, posa, mica]
  - **Added:** mica, posa
  - Sources: aspergillosis-idsa-2016

### line
  - Old empiric: [cefepime, vanc]
  - New primary: [vanc, cefepime]
  - New alternate: [dapto, zosyn, meropenem, ag]
  - **Added:** ag, dapto, meropenem, zosyn
  - Sources: clabsi-idsa-2009

### lower-gu
  - Old empiric: [cephalexin, fosfo, nitro, tmpsmx]
  - New primary: [nitro, tmpsmx, fosfo]
  - New alternate: [cipro, levo, augmentin, cephalexin]
  - **Added:** augmentin, cipro, levo
  - Sources: uti-idsa-2011

### meningitis
  - Old empiric: [amox, ceftriaxone, vanc]
  - New primary: [ceftriaxone, vanc]
  - New alternate: [meropenem, ampho, cefepime, aztreonam]
  - **Added:** ampho, aztreonam, cefepime, meropenem
  - **Removed:** amox
  - Sources: meningitis-idsa-2004, hcvm-idsa-2017

### mucor
  - Coverage list unchanged. Now classified as: primary [ampho] + alternate [isavu, posa]

### neutropenic
  - Old empiric: [cefepime, meropenem, vanc, zosyn]
  - New primary: [cefepime, zosyn, meropenem]
  - New alternate: [vanc, cipro, levo, augmentin, ag]
  - **Added:** ag, augmentin, cipro, levo
  - Sources: fn-idsa-2010

### pjp
  - Old empiric: []
  - New primary: [tmpsmx]
  - New alternate: [dapto]
  - **Added:** dapto, tmpsmx
  - Sources: pjp-nih-oi-2023

### resp-covid
  - Coverage list unchanged. Now classified as: primary [paxlovid] + alternate [remdesivir, molnupiravir]

### resp-flu
  - Old empiric: [baloxavir, oseltamivir]
  - New primary: [oseltamivir]
  - New alternate: [zanamivir, baloxavir]
  - **Added:** zanamivir
  - Sources: flu-idsa-2018

### resp-rsv
  - Coverage list unchanged. Now classified as: primary [ribavirin] + alternate []

### skin-deep
  - Old empiric: [clinda, vanc, zosyn]
  - New primary: [vanc, zosyn, meropenem]
  - New alternate: [linezolid, clinda, ceftriaxone, metro]
  - **Added:** ceftriaxone, linezolid, meropenem, metro
  - Sources: ssti-idsa-2014

### skin-superficial
  - Old empiric: [cephalexin, clinda, diclox, doxy, tmpsmx]
  - New primary: [cephalexin, diclox, naf]
  - New alternate: [vanc, clinda, doxy, tmpsmx]
  - **Added:** naf, vanc
  - Sources: ssti-idsa-2014

### upper-gu
  - Old empiric: [ceftriaxone, cipro, ertapenem]
  - New primary: [cipro, levo]
  - New alternate: [ceftriaxone, tmpsmx, ag, zosyn]
  - **Added:** ag, levo, tmpsmx, zosyn
  - **Removed:** ertapenem
  - Sources: uti-idsa-2011

### vap
  - Old empiric: [ag, cefepime, vanc, zosyn]
  - New primary: [zosyn, cefepime, meropenem]
  - New alternate: [vanc, linezolid, aztreonam, ag, cipro]
  - **Added:** aztreonam, cipro, linezolid, meropenem
  - Sources: hap-vap-idsa-2016

### zoonotic-sti
  - Old empiric: [azithro, ceftriaxone, doxy, pcn]
  - New primary: [doxy, ceftriaxone, azithro]
  - New alternate: [amox, pcn, levo, moxi]
  - **Added:** amox, levo, moxi
  - Sources: lyme-idsa-2020, sti-cdc-2021
