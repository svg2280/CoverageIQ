# Changelog

All notable changes to CoverageIQ. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — newest entries on top, grouped by Added / Changed / Fixed / Infrastructure.

> Older citation-specific change history lives in [`CHANGELOG-citations.md`](./CHANGELOG-citations.md).

---

## [Unreleased]

_Nothing yet — add new entries here as you work, then promote to a dated release section when you ship a version bump._

---

## 2026-05-24 — Auto-deploy + repo docs

### Infrastructure
- **CI/CD pipeline live.** Added `.github/workflows/deploy.yml` — every push to `master` triggers `npm ci` → `npm run build` → `wrangler deploy` → Cloudflare cache purge. End-to-end ~60–90s. First successful auto-deploy was Worker version 37. ([`e324123`](https://github.com/svg2280/CoverageIQ/commit/e324123))
- GitHub Actions secrets configured: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID`.
- Scheduled task added: weekday 8 AM CDT briefing emails only when deploys fail, issues/PRs stall, or the site goes down.

### Added
- `README.md` — full onboarding doc for human and AI contributors (Claude Code, Antigravity, Cursor). Covers stack, layout, dev setup, brand rules, i18n conventions, and gotchas.
- `CHANGELOG.md` — this file.

---

## 2026-05-08 — Logo consistency pass

### Fixed
- **Desktop home logo rendered as a pale "dotted circle"** instead of the gradient mark. Cause: Home mounts `<Logo />` twice (mobile + desktop layouts coexist in the DOM) and both SVGs shared `id="logo-grad"`. The desktop `fill="url(#logo-grad)"` resolved to the hidden mobile gradient and painted nothing. Fix: `React.useId()` gives each instance a unique gradient ID. ([`f834325`](https://github.com/svg2280/CoverageIQ/commit/f834325))

### Changed
- Mobile home now shows the `an antimicrobial atlas` script tagline under the wordmark, matching desktop and Journal Watch. ([`c61537b`](https://github.com/svg2280/CoverageIQ/commit/c61537b))
- Journal Watch (mobile) now uses the same drawer/sidebar as Home via a shared `<MobileDrawer />` component. ([`570a264`](https://github.com/svg2280/CoverageIQ/commit/570a264))
- Journal Watch desktop header restored flavor / language / dark-mode switchers (had been stripped during a refactor). ([`431669d`](https://github.com/svg2280/CoverageIQ/commit/431669d))
- Logo colors locked to fixed brand hex (`#D97A4E` → `#7B5BA8`, white `#FFFFFF` C-capsule). No longer shifts with theme/flavor/module. Mobile size bumped `w-7` → `w-8` to match desktop. ([`50feeff`](https://github.com/svg2280/CoverageIQ/commit/50feeff))

---

## 2026-05-07 — Full Spanish translation (Option C)

### Added
- **808 `_es` fields** added across all four data files: antibacterials (254), antifungals (200), antivirals (133), antiparasitics (221). Translations use Latin American clinical Spanish from Sanford Guide ES, Johns Hopkins ABX, IDSA Spanish guidelines, and WHO terminology. ([`83b53a5`](https://github.com/svg2280/CoverageIQ/commit/83b53a5))
- `client/src/lib/localized.ts` — `loc()` / `locArr()` helpers that return the `_es` field when language is Spanish, falling back to English.
- Drug / Bug / Syndrome / DrugClass TypeScript interfaces extended with optional `_es` fields: `blurb_es`, `mechanism_es`, `spectrum_es`, `pearls_es`, `doseAdult_es`, `guidelineNotes_es`.
- 16 new `section.*` translation keys in `i18n.tsx`. Detail panel now uses `loc()` / `locArr()` / `t()` everywhere. ([`af9c3dc`](https://github.com/svg2280/CoverageIQ/commit/af9c3dc))

### Changed
- Drug names, bug names, syndrome names, and drug class subgroup labels deliberately remain in English (universal medical terminology).
- Mobile drawer auto-closes when the language is toggled.

---

## 2026-05 — TB / NTM / leprosy expansion

### Added
- NTM coverage matrix entries: MAC, M. abscessus, M. kansasii, M. leprae. ([`df273dc`](https://github.com/svg2280/CoverageIQ/commit/df273dc))
- TB / NTM / leprosy regimens moved into the Antifungals / Anti-TB tab + tab label updated to include "Anti-TB". ([`0bbb58a`](https://github.com/svg2280/CoverageIQ/commit/0bbb58a), [`a84b47e`](https://github.com/svg2280/CoverageIQ/commit/a84b47e))
- Initial TB / NTM / leprosy regimens added to the Antibacterials tab. ([`f478554`](https://github.com/svg2280/CoverageIQ/commit/f478554))
- Global search across drugs, bugs, and syndromes. Mobile feedback widget. ([`0bbb58a`](https://github.com/svg2280/CoverageIQ/commit/0bbb58a))

### Changed
- Journal Watch marquee speed slowed (60s → 150s). Added clickable journal logo strip in footer. ([`90860ef`](https://github.com/svg2280/CoverageIQ/commit/90860ef))

---

## 2026-05 — Mobile + feedback infrastructure

### Added
- **Mobile layout** for `<768px`: bottom sheet, accordion sections, swipeable tabs. ([`4170e0b`](https://github.com/svg2280/CoverageIQ/commit/4170e0b))
- Floating Feedback pill + popover (Resend-backed). ([`3fc8fea`](https://github.com/svg2280/CoverageIQ/commit/3fc8fea))
- Journal Watch marquee ticker for latest headlines. ([`de027a8`](https://github.com/svg2280/CoverageIQ/commit/de027a8))

### Changed
- Feedback `FROM` switched to `feedback@coverageiq.net` (Resend domain now verified). ([`01c4d7f`](https://github.com/svg2280/CoverageIQ/commit/01c4d7f))
- Footer right-padding extended to 1440px so the floating Feedback pill never overlaps footer links/logos. ([`a0a5ea9`](https://github.com/svg2280/CoverageIQ/commit/a0a5ea9))

---

## 2026-05-01 — v1.2

### Added
- i18n foundation (EN / ES toggle, LocalStorage persistence, auto-detect from `navigator.language` on first visit).
- Source logos for OpenEvidence, IDSA, Sanford, Johns Hopkins ABX.
- Resend-backed feedback backend.
- Contact email updated to `scottvg@oneMDmedical.com`. ([`d2c4e4f`](https://github.com/svg2280/CoverageIQ/commit/d2c4e4f))

---

## Earlier history

For citation-by-citation change history of the clinical data set, see [`CHANGELOG-citations.md`](./CHANGELOG-citations.md).

For initial scaffold and design system decisions (Apothecary / Editorial / Bauhaus themes, matrix layout, drug-class rail), see the git log prior to `d2c4e4f`.
