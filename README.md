# CoverageIQ

> An interactive antimicrobial atlas — drugs × bugs × syndromes coverage matrix with clinical citations from OpenEvidence, IDSA, Sanford Guide, and Johns Hopkins ABX.

**Live:** [coverageiq.net](https://coverageiq.net)
**Owner:** Scott Van Gemert, MD ([scottvg@oneMDmedical.com](mailto:scottvg@oneMDmedical.com))
**Status:** v1.2 — bilingual (EN/ES), mobile-optimized, Journal Watch live

---

## What this is

CoverageIQ is a single-page web app for clinicians (residents, hospitalists, ID consult teams) to quickly answer "does drug X cover bug Y in syndrome Z?" — without paging through chapters of a textbook. Hover or click any cell in the matrix to load full coverage notes, dosing, mechanism, pearls, and references.

Two main views:

1. **Atlas** (`/`) — the interactive coverage matrix across four tabs: Antibacterials, Antifungals / Anti-TB, Antivirals, Antiparasitics.
2. **Journal Watch** (`/#/journal-watch`) — live RSS aggregator for NEJM, JAMA, CID, JID, OFID, and CID Online First, proxied through a Cloudflare Worker for CORS bypass and edge caching.

**Educational reference only.** Not a substitute for clinical judgment, local antibiogram, or ID consult.

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Radix UI primitives + 3 custom themes (Apothecary / Editorial / Bauhaus) |
| Routing | Hash-based (`wouter`) — works on static hosting |
| State | React hooks + LocalStorage (`coverageiq.lang`, `coverageiq.flavor`, theme) |
| i18n | Custom lightweight provider (`client/src/lib/i18n.tsx`) + `loc()`/`locArr()` fallback helpers in `client/src/lib/localized.ts`. Latin American clinical Spanish. |
| Backend | Cloudflare Worker (`worker.ts`) — serves static assets via the `ASSETS` binding, plus `/api/rss` proxy and `/api/feedback` (Resend) |
| Build | `tsx script/build.ts` — orchestrates Vite client build + esbuild server bundle |
| Hosting | Cloudflare Workers (Static Assets binding, NOT Pages) |
| CI/CD | GitHub Actions → `wrangler deploy` on push to `master` (see `.github/workflows/deploy.yml`) |
| Email | Resend (`feedback@coverageiq.net` verified domain) |

---

## Repository layout

```
coverageiq/
├── client/src/
│   ├── pages/
│   │   ├── home.tsx              # Main Atlas view (desktop + mobile-layout switch)
│   │   ├── journal-watch.tsx     # RSS aggregator
│   │   └── legal.tsx             # Disclaimer / Privacy / Terms
│   ├── components/
│   │   ├── matrix.tsx            # Drug × bug coverage grid
│   │   ├── class-rail.tsx        # Top drug-class chip rail
│   │   ├── detail-panel.tsx      # Hover/click card with coverage notes
│   │   ├── legend.tsx            # Color legend (Primary/Alternate/None/Class)
│   │   ├── feedback-widget.tsx   # Floating pill + Resend popover
│   │   ├── logo.tsx              # Brand mark (uses React.useId for unique gradient IDs)
│   │   ├── mobile-layout.tsx     # <768px bottom-sheet UI
│   │   ├── mobile-drawer.tsx     # Shared overflow menu (Home + Journal Watch)
│   │   ├── theme-provider.tsx    # Apothecary/Editorial/Bauhaus + dark mode
│   │   └── ui/                   # shadcn/radix wrappers
│   ├── data/
│   │   ├── antibacterials.ts     # ~35 drugs, all with _es Spanish fields
│   │   ├── antifungals.ts        # incl. TB/NTM/leprosy regimens
│   │   ├── antivirals.ts
│   │   ├── antiparasitics.ts
│   │   ├── bug-images.ts         # Gram-stain / morphology illustrations
│   │   └── sources.ts            # OpenEvidence/IDSA/Sanford/Hopkins citations
│   ├── lib/
│   │   ├── i18n.tsx              # Language provider + t() helper
│   │   └── localized.ts          # loc() / locArr() — _es field fallback
│   └── index.css                 # Theme tokens + global styles
├── server/                       # Dev-mode Express server (not used in prod)
├── worker.ts                     # Cloudflare Worker — assets + /api/rss + /api/feedback
├── script/build.ts               # Build orchestrator
├── wrangler.toml                 # Worker config (name: coverageiq)
└── .github/workflows/deploy.yml  # CI: build + deploy + purge on push to master
```

---

## Local development

**Prerequisites:** Node 22+ (`/tmp/node22/bin/` on the sandbox; locally just use `node --version`).

```bash
git clone https://github.com/svg2280/CoverageIQ.git
cd CoverageIQ
npm ci
npm run dev          # http://localhost:5173 (Vite) with Express API proxy
```

**Build for production:**

```bash
npm run build        # outputs dist/public/ (static assets) + dist/index.cjs (unused in prod)
```

**Type-check:**

```bash
npm run check
```

---

## Deploying

**You don't need to deploy manually.** Push to `master` and the GitHub Actions workflow does it.

```bash
git add -A
git commit -m "your change"
git push origin master
# → .github/workflows/deploy.yml runs:
#   1. npm ci
#   2. npm run build
#   3. echo "_worker.js" > dist/public/.assetsignore
#   4. wrangler deploy
#   5. curl purge_cache on zone b7ee2e72...
# ~60–90s end to end. Watch at: https://github.com/svg2280/CoverageIQ/actions
```

**Manual deploy** (only if CI is broken):

```bash
export PATH="/tmp/node22/bin:$PATH"
npm run build
echo "_worker.js" > dist/public/.assetsignore
export CLOUDFLARE_API_TOKEN="<token>"
export CLOUDFLARE_ACCOUNT_ID="5985a940e78c061a66f6582a259cea26"
npx wrangler deploy
curl -X POST "https://api.cloudflare.com/client/v4/zones/b7ee2e7278270996f097a3f27b480ef6/purge_cache" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

GitHub Actions secrets (already configured):

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID` — `5985a940e78c061a66f6582a259cea26`
- `CLOUDFLARE_ZONE_ID` — `b7ee2e7278270996f097a3f27b480ef6`

---

## Conventions for contributors (humans + AI coding agents)

If you're an AI coding agent (Claude Code, Google Antigravity, Cursor, etc.) editing this repo, read this section before making changes.

### Brand & visual rules (locked)

- **Logo colors are FIXED hex**, not theme variables: `#D97A4E` (orange) → `#7B5BA8` (violet), white `#FFFFFF` C-capsule. Same lockup across desktop home, mobile, and Journal Watch. Don't theme it.
- **Logo gradient IDs must be unique per instance** (`React.useId()` in `logo.tsx`). Home mounts the Logo twice (mobile + desktop layouts coexist in the DOM); shared IDs make one of them render blank.
- **Three themes**: Apothecary (default warm/serif), Editorial (cool/sans), Bauhaus (bold geometric). User picks via the top-right theme switcher. Theme tokens live in `index.css`.
- **Legend colors are semantic** — don't repurpose: Orange = primary/definitive, Yellow = possible alternative, White = not effective, Green = same drug class.
- **"Above the fold, no scrolling"** is the desktop design rule. Relaxed for mobile (<768px) where bottom-sheet scrolling is fine.

### Internationalization (i18n)

- The site supports English and Latin American clinical Spanish.
- **What to translate:** clinical prose — blurbs, mechanism, spectrum, pearls, dose strings, guideline notes, UI labels.
- **What to keep in English:** drug names, bug names, syndrome names, drug class subgroup labels (Penicillins, Polyenes, Azoles), the theme switcher label ("APOTHECARY"), all source brand names.
- **How to add Spanish to a drug/bug/syndrome:** add a sibling field with `_es` suffix in the relevant data file. The `loc()` helper in `client/src/lib/localized.ts` returns `_es` when language is Spanish, falls back to English otherwise.
- **Reference terminology:** Sanford Guide ES, Johns Hopkins ABX guide, IDSA Spanish guidelines, WHO. Common substitutions: SARM/MRSA, BLEE/ESBL, NAC/CAP, ITU/UTI, BHE/BBB, ITBL/LTBI, TAR/ART, AAD/DAA, VIH/HIV, PO→VO, "q12h"→"cada 12 h".

### Citations

- Always cite OpenEvidence, IDSA, Sanford Guide, or Johns Hopkins for new clinical claims.
- Add the URL in the data file alongside the claim (search existing files for `references:` patterns).

### Data file structure (drugs/bugs/syndromes)

Every clinical entity has the same shape — see `client/src/data/antibacterials.ts` as the canonical example. Optional `_es` fields are layered on for Spanish: `blurb_es`, `mechanism_es`, `spectrum_es`, `pearls_es`, `doseAdult_es`, `guidelineNotes_es`.

### Mobile

- Breakpoint is `<768px`. `<MobileLayout />` renders below; the desktop layout above.
- Both mount simultaneously (CSS toggled), so anything that uses unique DOM IDs must scope them per instance.
- Mobile drawer (`mobile-drawer.tsx`) is shared between Home and Journal Watch — pass `current="atlas" | "journal-watch"` to hide the link to the current page.

### Commit style

Conventional-ish: `fix(scope): ...`, `feat(scope): ...`, `chore: ...`, `ci: ...`. First line ≤72 chars. Body explains *why*, not *what* (the diff shows what).

### Things that have bitten us — don't repeat them

1. **Shared SVG gradient IDs** caused a "dotted circle" logo on desktop home — fixed in `f834325`, use `React.useId()` if you add another SVG with gradients.
2. **Cloudflare Pages was never set up** — we use Workers with the Static Assets binding. Don't try to wire Pages-style `_redirects` or `_headers` files; configure routing in `wrangler.toml` and `worker.ts` instead.
3. **`dist/public/.assetsignore`** must contain `_worker.js` before `wrangler deploy`, otherwise the worker tries to serve itself as a static asset. The CI workflow handles this — keep that step if you edit it.
4. **`main` branch is stale.** The active branch is `master`. Don't push to `main`.

---

## Monitoring

A scheduled task scans the repo every weekday at 8 AM CDT and emails `scottvg@oneMDmedical.com` only when something needs attention (failed deploy, stalled issue/PR, site down). All-clear runs produce a one-line confirmation email so the monitor is verifiably alive.

---

## License

All clinical content, design, and code: © 2026 Scott A. Van Gemert, MD. All rights reserved.

Educational reference only. Not a substitute for clinical judgment, local antibiogram, or infectious-disease consultation.
