#!/usr/bin/env python3
"""Download parasite images locally to client/public/bug-img/."""
import os, sys, json, urllib.request, time

UA = "Mozilla/5.0 (CoverageIQ/1.0; clinical-edu)"
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "client", "public", "bug-img")
os.makedirs(OUT_DIR, exist_ok=True)

# Resolved Wikimedia upload URLs (correct hash prefixes via Commons API)
URLS = {
    "p-falciparum":     "https://upload.wikimedia.org/wikipedia/commons/f/fc/Plasmodium_falciparum_01.png",
    "p-vivax":          "https://upload.wikimedia.org/wikipedia/commons/7/70/Plasmodium_vivax_01.png",
    "entamoeba":        "https://upload.wikimedia.org/wikipedia/commons/c/cb/Entamoeba_histolytica_01.jpg",
    "giardia":          "https://upload.wikimedia.org/wikipedia/commons/0/08/Giardia_lamblia_SEM_8698_lores.jpg",
    "cryptosporidium":  "https://upload.wikimedia.org/wikipedia/commons/9/99/Cryptosporidium_parvum_01.jpg",
    "cyclospora":       "https://upload.wikimedia.org/wikipedia/commons/c/c6/Cyclospora_cayetanensis.jpg",
    "toxoplasma":       "https://upload.wikimedia.org/wikipedia/commons/3/39/Toxoplasma_gondii_tachy.jpg",
    "leishmania":       "https://upload.wikimedia.org/wikipedia/commons/b/b4/Leishmania_donovani_01.png",
    "trypanosoma-cruzi":"https://upload.wikimedia.org/wikipedia/commons/0/0b/Trypanosoma_cruzi_crithidia.jpeg",
    "trichomonas":      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Trichomonas_Giemsa_DPDx.JPG",
    "strongyloides":    "https://upload.wikimedia.org/wikipedia/commons/6/66/Strongyloides_stercoralis_larva.jpg",
    "ascaris-hookworm": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Ascaris_lumbricoides.jpeg",
    "pinworm":          "https://upload.wikimedia.org/wikipedia/commons/7/74/Enterobius_vermicularis.jpg",
    "schistosoma":      "https://upload.wikimedia.org/wikipedia/commons/7/75/Schistosoma_mansoni.jpg",
    "taenia":           "https://upload.wikimedia.org/wikipedia/commons/6/66/Taenia_solium_scolex.JPG",
    "scabies-lice":     "https://upload.wikimedia.org/wikipedia/commons/c/c0/Sarcoptes_scabei_2.jpg",
}

results = {}
for bug_id, url in URLS.items():
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            ctype = resp.headers.get("Content-Type", "")
        if len(data) < 4000:
            results[bug_id] = {"ok": False, "reason": "too small", "bytes": len(data)}
            print(f"FAIL {bug_id}: too small ({len(data)} bytes)", file=sys.stderr)
            continue
        ext = ".jpg"
        if "png" in ctype.lower() or url.lower().endswith(".png"):
            ext = ".png"
        out_path = os.path.join(OUT_DIR, f"{bug_id}{ext}")
        with open(out_path, "wb") as f:
            f.write(data)
        results[bug_id] = {"ok": True, "saved": f"/bug-img/{bug_id}{ext}", "bytes": len(data)}
        print(f"OK  {bug_id}: {len(data)} bytes -> /bug-img/{bug_id}{ext}")
    except Exception as e:
        print(f"FAIL {bug_id}: {e}", file=sys.stderr)
        results[bug_id] = {"ok": False, "reason": str(e)}
    time.sleep(2.5)  # very polite to avoid 429

print("\n--- SUMMARY ---")
ok = sum(1 for r in results.values() if r.get("ok"))
print(f"{ok}/{len(URLS)} downloaded")
print(json.dumps(results, indent=2))
