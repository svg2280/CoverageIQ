# Cloudflare Pages — coverageiq.net deploy guide

## Build settings (paste into Cloudflare Pages UI)

- **Framework preset:** None
- **Build command:** `npm run build`
- **Build output directory:** `dist/public`
- **Root directory:** `/` (default)
- **Node version env var:** `NODE_VERSION` = `20`

The `npm run build` script (script/build.ts) uses Vite to build the frontend
to `dist/public`. The Express server build (`dist/index.cjs`) is unused on Pages
because the app makes no API calls — it's pure static SPA.

## Custom domain

After first deploy succeeds:
1. Pages → coverageiq project → Custom domains → Set up a custom domain
2. Add `coverageiq.net` (apex)
3. Add `www.coverageiq.net` (www)
4. Cloudflare gives you the exact DNS records to paste into Squarespace.

## Squarespace DNS — what to delete and add

**Delete (Squarespace defaults):**
- A @ 198.49.23.144
- A @ 198.49.23.145
- A @ 198.185.159.144
- A @ 198.185.159.145

**Keep (do not touch):**
- TXT _domainkey (DKIM)
- TXT _dmarc (DMARC)
- TXT @ v=spf1 -all (SPF)
- CNAME _domainconnect (Squarespace housekeeping; safe to keep)

**Add (Cloudflare Pages will give you exact values):**
- A @ → CF-provided IP(s) OR ALIAS/ANAME if Squarespace supports it
- CNAME www → coverageiq.pages.dev

If Squarespace doesn't support apex CNAME, Cloudflare provides A records.
