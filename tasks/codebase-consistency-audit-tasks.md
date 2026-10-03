# Codebase Consistency Audit — Task List

**Updated:** 2026-09-10 (v2 — G and F tasks added)
**Source Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`
**Consolidated Report:** `src/app/reports/codebase-consistency-audit/2026-09-10-consolidated-report.md`
**Implementation Plan:** `src/app/tasks/2026-09-10-implementation-plan.md`

---

## Previous Audit (2026-06-19) — ✅ All 14 tasks complete

See `src/app/reports/archived/2026-06-19-codebase-consistency-audit/` for details.

---

## Current Audit (2026-09-10)

### Status: 0/16 complete

---

## 🔴 Critical — Fix first (silent visual breakage)

### CRIT-01 — Import `tokens/` CSS layer into `globals.css`
**Ref:** E-01, E-02, E-03, E-09 | **File:** `src/styles/globals.css`
- [x] Add `@import "./tokens/content-colors.css"` to `globals.css` (before theme imports)
- [x] Add `@import "./tokens/content-typography.css"` to `globals.css`
- [x] Add `@import "./tokens/content-layouts.css"` to `globals.css`
- [x] Add `@import "./tokens/content-interactive.css"` to `globals.css`
- [x] Add `@import "./tokens/content-animations.css"` to `globals.css`
- [x] Verify `--wp--preset--font-size--100` through `--900` now resolve in browser DevTools

---

### CRIT-02 — Define 14 missing shadow variant tokens
**Ref:** E-05 | **File:** `src/styles/globals.css` `:root {}`
- [x] Add `--wp--preset--shadow--sm` through `--2xl` (5 tokens)
- [x] Add `--wp--preset--shadow--card`
- [x] Add `--wp--preset--shadow--action-btn`, `--action-btn-glow`, `--action-btn-hover`
- [x] Add `--wp--preset--shadow--focus-ring-pink`, `--focus-ring-strong`
- [x] Add `--wp--preset--shadow--neon-md`, `--neon-pink-dot`, `--neon-purple-hover`

---

## 🟠 High — Standards violations

### HIGH-01 — Define missing border-radius, spacing, z-index tokens
**Ref:** E-06, E-07, E-08 | **File:** `src/styles/globals.css` `:root {}`
- [x] Add `--wp--preset--border-radius--pill`, `--xl`, `--2xl`, `--200`, `--300`, `--400`
- [x] Add `--wp--preset--spacing--70`, `--90`, `--100`, `--block-gap`, `--fluid-3xl`
- [x] Add `--wp--preset--z-index--20`, `--z-index--header`

---

### HIGH-02 — Replace hardcoded hex in `globals.css` selectors
**Ref:** B-02 | **File:** `src/styles/globals.css`
- [x] Replace `#FF10F0` instances in selectors → `var(--color-neon-pink)`
- [x] Replace `#F4FF3C` instances → `var(--color-neon-yellow)`
- [x] Replace `#F6F2EB` instances → `var(--color-text-light)`
- [x] Replace `#0F0F0F` instances → `var(--color-atomic-black)`
- [x] Replace `#39FF14` instances → `var(--wp--preset--color--neon-green)` (after CRIT-01)
- [x] Verify: `grep -n "#[0-9a-fA-F]" src/styles/globals.css | grep -v "^ *--" | grep -v "/\*"` returns zero non-root hits

---

### HIGH-03 — Sweep `mobile-menu.css` and `style-guide-page.css`
**Ref:** B-03, B-04 | **Files:** `src/styles/blocks/mobile-menu.css`, `src/styles/blocks/style-guide-page.css`
- [x] `mobile-menu.css:278,327` — `#FF10F0` → `var(--color-neon-pink)`
- [x] `mobile-menu.css:281,314,320` — `#F4FF3C` → `var(--color-neon-yellow)`
- [x] `style-guide-page.css` — `#0F0F0F` → `var(--color-atomic-black)` (all instances)
- [x] `style-guide-page.css` — `#FF10F0` → `var(--color-neon-pink)` (all instances)
- [x] `style-guide-page.css` — `#F4FF3C` → `var(--color-neon-yellow)` (all instances)

---

### HIGH-04 — Convert pixel `font-size` to `clamp()` in `globals.css`
**Ref:** B-01 | **File:** `src/styles/globals.css`
- [x] Line 202: `20px` → `clamp(1.125rem, 2vw, 1.25rem)`
- [x] Line 339: `16px` → `clamp(0.875rem, 1.5vw, 1rem)`
- [x] Line 506: `12px` → `clamp(0.625rem, 1vw, 0.75rem)`
- [x] Line 522: `14px` → `clamp(0.75rem, 1.25vw, 0.875rem)`
- [x] Line 627: `14px` → `clamp(0.75rem, 1.25vw, 0.875rem)`
- [x] Line 749: `16px` → `clamp(0.875rem, 1.5vw, 1rem)`
- [x] Line 760: `18px` → `clamp(1rem, 1.75vw, 1.125rem)`

---

### HIGH-05 — Fix `SectionCard.tsx` inline style pattern
**Ref:** C-01 | **Files:** `src/app/components/ui/SectionCard.tsx:123`, `src/styles/blocks/section-card.css`
- [x] Replace `style={{ borderColor: 'var(--wp--preset--color--${...})' }}` with CSS var injection pattern
- [x] Add `border-color: var(--section-accent, var(--wp--preset--color--neon-pink))` to `section-card.css`

---

### HIGH-06 — Pin unpinned package versions
**Ref:** F-01, F-02 | **File:** `package.json`
- [x] Pin `"typescript": "6.0.3"` (remove `^`)
- [x] Pin `"@phosphor-icons/react": "2.1.10"` (remove `^`)

---

## 🟡 Medium — Inconsistencies to resolve

### MED-01 — Sweep `animation-showcase.css` and `ebook-enhanced-contrast.css`
**Ref:** B-05, B-06
- [x] `animation-showcase.css` — replace `#FF10F0`, `#F4FF3C`, `#0F0F0F` with token refs
- [x] `ebook-enhanced-contrast.css` — `#1A1A1A` → `var(--color-surface-elevated)`, `#F4FF3C` → `var(--color-neon-yellow)`

---

### MED-02 — Fix `portfolio-card.css` and `light.css` hardcoded hex
**Ref:** B-07, B-08
- [x] `portfolio-card.css:132` — `#0F0F0F` → `var(--wp--preset--color--atomic-black)`
- [x] `light.css:365,390,396,470,495` — `#1A1A1A` → create `--color-dark-ink` token + use `var(--color-dark-ink)`

---

### MED-03 — CSS var injection for `UVMakeupSection.tsx` slider transform
**Ref:** C-03 | **Files:** `src/app/components/sections/UVMakeupSection.tsx:235`, `src/styles/blocks/uv-makeup.css`
- [x] Replace `style={{ transform: ... }}` with `style={{ '--slide-index': ..., '--slides-per-view': ... }}`
- [x] Add transform rule to `uv-makeup.css` consuming `--slide-index` and `--slides-per-view`

---

### MED-04 — Fix `button-variations.css` font-family token ref
**Ref:** A-01 | **File:** `src/styles/blocks/button-variations.css:69`
- [x] Replace `var(--wp--preset--font-family--title)` → `var(--wp--preset--font-family--brand-heading)`

---

### MED-05 — Clear remaining hex in `dark.css` and `light.css`
**Ref:** B-08, B-09
- [x] `dark.css:189` — `#1A1A1A` → `var(--color-surface-elevated)`
- [x] `dark.css:190` — `#F6F2EB` → `var(--color-text-light)`
- [x] `light.css` — confirm `--color-dark-ink` token applied from MED-02

---

---

## 🔴 Critical — Web Standards (G, new Sep 10)

### G-01 — Create `robots.txt`
**Ref:** G-01, G-14 | **File:** `src/app/public/robots.txt` (create new)
- [x] Create `robots.txt` at `src/app/public/robots.txt`
- [x] Allow: GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended, Applebot-Extended, anthropic-ai
- [x] Add `Sitemap: https://ashshaw.com/sitemap.xml` directive
- [x] Add standard `User-agent: *` / `Allow: /` block

### G-02 — Create `llms.txt`
**Ref:** G-02 | **File:** `src/app/public/llms.txt` (create new)
- [x] Create `llms.txt` at `src/app/public/llms.txt`
- [x] Include: one-paragraph site description (Ash Shaw, neon/UV makeup art, Berlin/international festivals)
- [x] Include: content inventory (portfolio, blog, podcasts, videos, book, events, about/bio)
- [x] Include: author bio summary
- [x] Include: preferred citation format and contact (ashshaw.com, Instagram)

### G-05 — Create `og-image.jpg`
**Ref:** G-05 | **File:** `src/app/public/og-image.jpg` (create)
- [x] Create 1200×630px open graph image for social sharing
- [x] OR update `index.html` to reference an existing image in `/public/` that actually exists
- [x] Verify `og:image` and `twitter:image` both point to the live file

---

## 🟠 High — Web Standards (G, new Sep 10)

### G-03 — Expand `Person` schema and add `og:site_name` / `og:locale`
**Ref:** G-03, G-06, G-15 | **File:** `src/app/index.html`
- [x] Add `og:site_name` meta tag (`Ash Shaw`)
- [x] Add `og:locale` meta tag (`en_GB`)
- [x] Expand `Person` schema `sameAs` array to include all public social profiles (TikTok, YouTube, SoundCloud, Spotify if applicable)

### G-04 — Add schema to key unschemed pages
**Ref:** G-04 | **Files:** `EventDetailPage.tsx`, `BookPage.tsx`, `EbookPage.tsx`, `ContactPage.tsx`, about sub-pages
- [x] `EventDetailPage.tsx` — inject `Event` schema (name, startDate, location, organizer)
- [x] `BookPage.tsx` and `EbookPage.tsx` — inject `Book` schema (name, author, isbn/url, description)
- [x] All About sub-pages (BioPage, ManifestoPage, etc.) — inject `WebPage` or `ProfilePage` schema
- [x] `ContactPage.tsx` — inject `ContactPage` WebPage schema
- [x] `book-site/TheBookPage.tsx` — inject `Book` schema
- [x] (Optional) `PressKitPage.tsx` — inject `ProfilePage` or `Organization` schema

### G-07 — Reduce Google Font families to ≤ 8
**Ref:** G-07 | **File:** `src/app/index.html`
- [x] Audit which font families are actually consumed in CSS token files and component CSS
- [x] Identify and remove unused families (candidates: Vampiro One, Rubik Glitch, Anonymous Pro, DM Sans, PT Serif, Montserrat, Raleway, Source Serif Pro)
- [x] Consolidate to a single Google Fonts request URL with ≤ 8 families

### G-08 — Add `fetchpriority="high"` to hero images
**Ref:** G-08 | **Files:** Hero components across page types
- [x] Identify the main hero image element on: `HomePage`, `PortfolioMainPage`, `BlogPage`, `AboutPage`
- [x] Add `fetchpriority="high"` and `loading="eager"` to those images

### G-09 — Implement route-level code splitting
**Ref:** G-09 | **File:** router/routes file (find with `grep -rn "createBrowserRouter\|Routes\|Route" src/app`)
- [x] Wrap all page-level components in `React.lazy()` imports
- [x] Wrap the router outlet in `<Suspense fallback={<PageSkeleton />}>`
- [x] Verify build output shows per-route chunks

---

## 🟡 Medium — Web Standards (G, new Sep 10)

### G-10 — Fix missing `alt` attributes
**Ref:** G-10 | **Files:** `ImageGallery.tsx`, `PortfolioImage.tsx`, `BlogMegaMenu.tsx`, `PortfolioMegaMenu.tsx`, `EventsPage.tsx`
- [x] Add descriptive `alt` to all 14 `<img>` elements missing it (use empty `alt=""` for decorative images) ~~FALSE POSITIVE — all have alt= on subsequent lines~~

### G-11 — Add skip-to-main-content link
**Ref:** G-11 | **File:** `src/app/components/common/RootLayout.tsx`
- [x] Add `<a href="#main-content" className="skip-link">Skip to main content</a>` as first child of layout
- [x] Add `id="main-content"` to `<main>` element
- [x] Add `.skip-link` CSS — visually hidden until focused (standard pattern)

### G-12 — Add security headers to `netlify.toml`
**Ref:** G-12 | **File:** `src/app/netlify.toml`
- [x] Add `Permissions-Policy` header (disable camera, microphone, geolocation)
- [x] Add basic Content Security Policy header

### G-14 — Generate static `sitemap.xml`
**Ref:** G-14 | **File:** `src/app/public/sitemap.xml` (create)
- [x] Create a static `sitemap.xml` covering all primary routes (or generate via build script)
- [x] Reference it in `robots.txt` once G-01 is done

---

## 🟡 Medium — Package cleanup (F, new Sep 10)

### F-NEW — Clean up unused and misplaced dependencies
**Ref:** F-07, F-10, F-11, F-12 | **File:** `package.json`, `netlify.toml`
- [x] Remove `lucide-react` (confirmed zero imports)
- [x] Remove `react-slick`, `@popperjs/core`, `react-popper` (confirm zero imports, then remove)
- [x] Move `fs`, `path`, `sharp`, `glob` from `dependencies` to `devDependencies`
- [x] Update `netlify.toml` build command from `npm run build` → `pnpm run build`

---

## Completed

_Completed tasks are moved here when done. Previous audit items archived at `src/app/reports/archived/2026-06-19-codebase-consistency-audit/`._
