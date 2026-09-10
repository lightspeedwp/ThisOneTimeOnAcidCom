# Codebase Consistency Audit — Consolidated Report

**Date:** 2026-09-10 (v2 — updated with Sub-audits H and G)
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`
**Task List:** `src/app/tasks/codebase-consistency-audit-tasks.md`
**Implementation Plan:** `src/app/tasks/2026-09-10-implementation-plan.md`

---

## Executive Summary

The site has not been updated for several months. The audit reveals one systemic architectural issue that dwarfs all other findings: **the `src/styles/tokens/` directory contains 5 CSS files that are never imported anywhere**. These files define the entire font-size scale, extended colour palette, layout container widths, and content-type font families used across the codebase. Since none are loaded, every component relying on `--wp--preset--font-size--100` through `--900`, `--wp--preset--layout--content`, and the extended neon colour set is silently falling back to browser defaults — making the text size hierarchy, container widths, and content accent colours all broken in production.

The good news: the previous audit's fixes (button padding, globals.css token definitions, dark.css hex sweep, inline style reduction) are holding. No regressions found in those areas. The new findings are largely in areas not covered by the first audit.

---

## Severity Matrix

| ID | Domain | Finding | Severity | File(s) |
|---|---|---|---|---|
| E-01 | Tokens | `--wp--preset--font-size--*` scale never loaded (tokens/ not imported) | 🔴 Critical | All block CSS files |
| E-02 | Tokens | `--wp--preset--layout--*` widths never loaded | 🔴 Critical | Layout containers site-wide |
| E-03 | Tokens | Extended neon colour palette (green, cyan, orange + text variants) never loaded | 🔴 Critical | Content accent system |
| E-05 | Tokens | 14 shadow variants undefined (`sm`, `md`, `lg`, `xl`, `2xl`, `card`, `action-btn` etc.) | 🔴 Critical | Button, card, interactive blocks |
| B-02 | Tokens | 15+ hardcoded hex values in `globals.css` selectors (new regressions since last audit) | 🟠 High | `globals.css` |
| B-03 | Tokens | 5 hardcoded neon hex in `mobile-menu.css` | 🟠 High | `mobile-menu.css` |
| B-04 | Tokens | 13+ hardcoded hex in `style-guide-page.css` | 🟠 High | `style-guide-page.css` |
| E-06 | Tokens | 6 border-radius variants undefined (`pill`, `xl`, `2xl`) | 🟠 High | Buttons, badges, cards |
| E-07 | Tokens | 5 spacing tokens undefined (`70`, `90`, `100`, `block-gap`, `fluid-3xl`) | 🟠 High | Layout gaps |
| E-08 | Tokens | 2 z-index tokens undefined (`20`, `header`) | 🟠 High | Header layering |
| E-09 | Tokens | Content-type font families never loaded | 🟠 High | Blog, podcast, portfolio typography |
| B-01 | Tokens | 7+ pixel `font-size` values in `globals.css` not inside `clamp()` | 🟠 High | `globals.css` |
| C-01 | Inline | `SectionCard.tsx:123` — wrong inline style pattern for dynamic border colour | 🟠 High | `SectionCard.tsx` |
| F-01 | Packages | `typescript ^6.0.3` — unpinned major version | 🟠 High | `package.json` |
| B-05 | Tokens | 4 hardcoded hex in `animation-showcase.css` | 🟡 Medium | `animation-showcase.css` |
| B-06 | Tokens | 6 hardcoded hex in `ebook-enhanced-contrast.css` | 🟡 Medium | `ebook-enhanced-contrast.css` |
| B-07 | Tokens | 1 hardcoded hex in `portfolio-card.css` | 🟡 Medium | `portfolio-card.css` |
| B-08 | Tokens | 5 hardcoded `#1A1A1A` in `light.css` | 🟡 Medium | `light.css` |
| B-09 | Tokens | 2 remaining hex in `dark.css` component overrides | 🟡 Medium | `dark.css` |
| C-03 | Inline | `UVMakeupSection.tsx:235` — slider transform should use CSS var injection | 🟡 Medium | `UVMakeupSection.tsx` |
| C-02 | Inline | `FestivalLandingPage.tsx:21` — gradient rgba hardcodes atomic black | 🟡 Medium | `FestivalLandingPage.tsx` |
| E-10 | Tokens | 4 gradient tokens undefined | 🟡 Medium | Decorative gradients |
| F-02 | Packages | `@phosphor-icons/react ^2.1.10` — unpinned | 🟡 Medium | `package.json` |
| A-01 | Buttons | `button-variations.css:69` — `--title` font family token not in loaded CSS | 🟡 Medium | `button-variations.css` |
| E-04 | Tokens | `gray-*` palette and `pure-black` never loaded | 🟡 Medium | `content-layouts.css` |
| E-11 | Tokens | `--wp--preset--aspect-ratio--video` undefined | 🟢 Low | Video player |

---

## Priority Order for Fixes

### 🔴 Do first — Critical (entire typography and layout system is broken)

1. **Add `@import` for all 5 token files to `globals.css`** — single change that fixes E-01, E-02, E-03, E-09 in one shot. This is the highest impact fix in the entire audit.

2. **Define 14 missing shadow variant tokens in `globals.css` `:root {}`** — fixes E-05. All button/card hover glows currently invisible.

### 🟠 Do next — High

3. **Define missing border-radius, spacing, z-index tokens** (E-06, E-07, E-08) — add `--pill`, `--xl`, `--2xl`, spacing 70/90/100, z-index `--header` to `globals.css` `:root {}`
4. **Replace `globals.css` selector hex with token refs** (B-02) — ~15 new regressions since last audit
5. **Replace `mobile-menu.css` hardcoded neon hex** (B-03) — 5 instances
6. **Replace `style-guide-page.css` hardcoded hex** (B-04) — 13+ instances
7. **Convert pixel `font-size` to `clamp()`** in `globals.css` (B-01) — 7 instances
8. **Fix `SectionCard.tsx` inline style pattern** (C-01) — replace string CSS var ref with proper injection
9. **Pin `typescript` and `@phosphor-icons/react`** in `package.json` (F-01, F-02)

### 🟡 Nice to have — Medium

10. Replace `animation-showcase.css` hardcoded hex (B-05)
11. Replace `ebook-enhanced-contrast.css` hardcoded hex (B-06)
12. Fix `portfolio-card.css` single hex instance (B-07)
13. Fix `light.css` `#1A1A1A` instances (B-08)
14. Fix 2 remaining `dark.css` hex instances (B-09)
15. Convert `UVMakeupSection.tsx` transform to CSS var injection (C-03)
16. Fix `button-variations.css` font-family token ref (A-01)

---

## G — Web Standards, SEO, AI Discoverability (NEW in this run)

| ID | Area | Severity | Finding |
|---|---|---|---|
| G-01 | AI | 🔴 Critical | `robots.txt` MISSING — no crawler policy |
| G-02 | AI | 🔴 Critical | `llms.txt` MISSING — no AI agent summary |
| G-03 | Schema | 🟠 High | `Person` schema has only 1 `sameAs` entry; no `Organization` or global `WebSite` in static HTML |
| G-04 | Schema | 🟠 High | 53 page components have no schema (EventDetailPage, BookPage, EbookPage, ContactPage, all book-site/, all About sub-pages, GearPage, PressKitPage, legal pages) |
| G-05 | OG | 🟠 High | `og-image.jpg` referenced in `index.html` but file does not exist in `/public/` — broken social share image |
| G-07 | Performance | 🟠 High | 27 Google Font families loaded — 3× the 8-family threshold. Blocking LCP. |
| G-08 | Performance | 🟠 High | No `fetchpriority="high"` on any hero image — LCP at risk |
| G-09 | Performance | 🟠 High | No route-level code splitting (`React.lazy`) — entire page bundle loads on every route |
| G-06 | OG | 🟡 Medium | `og:site_name` and `og:locale` missing from `index.html` |
| G-10 | A11y | 🟡 Medium | 14 `<img>` without `alt` attributes — WCAG 2.2 AA failure |
| G-11 | A11y | 🟡 Medium | No native skip-to-main-content link in `RootLayout.tsx` |
| G-12 | Security | 🟡 Medium | `netlify.toml` missing `Permissions-Policy` and CSP |
| G-14 | Sitemap | 🟡 Medium | No static `sitemap.xml` — only a JS-rendered page |
| G-15 | AI | 🟡 Medium | `Person` schema `sameAs` has only Instagram |

See `2026-09-10-G-web-standards.md` for full details.

---

## F — Package Health (additions from this run)

| ID | Severity | Finding |
|---|---|---|
| F-07 | 🟡 Medium | `lucide-react` — zero imports found; safe to remove (Phosphor migration complete) |
| F-10 | 🟡 Medium | `react-slick`, `@popperjs/core`, `react-popper` — zero imports found; candidates for removal |
| F-11 | 🟡 Medium | `fs`, `path`, `sharp`, `glob` in `dependencies` — should be `devDependencies` |
| F-12 | 🟡 Medium | `netlify.toml` uses `npm run build` but project is pnpm |

---

## Passing Areas (no action needed)

- Button padding — all three systems use `clamp()` ✅
- Console logging — zero unguarded calls in browser code ✅
- `TimelinePage.tsx`, `HistoryPage.tsx` CSS var injection — still correct ✅
- `PaletteDemoModal.tsx` BEM refactor — still correct ✅
- Dark theme sweep from previous audit — holding with minor new regressions ✅
- Previous `globals.css` token additions (shadow, border-radius, z-index, spacing) — still present ✅
- `WebSite` schema with `SearchAction` — injected via `HomePage.tsx` ✅
- `FAQPage` schema — `FaqSection.tsx` ✅
- `BreadcrumbList` schema — `Breadcrumbs.tsx` ✅
- `twitter:card` = `summary_large_image` ✅
- `focus-visible` CSS rules — 74 instances across stylesheet ✅

---

## Accepted Exceptions

| File | Pattern | Reason |
|---|---|---|
| All animation stagger components | `--col-index`, `--item-index`, `--node-index` CSS var injection | Correct CSS var injection pattern |
| `BlogPostPage.tsx`, `PodcastDetailPage.tsx` | Progress bar `width` | Computed value, no CSS alternative |
| `PortfolioCard.tsx` | `backgroundImage` URL | Dynamic asset URL |
| `ResponsiveGridSlider.tsx` | Computed flex basis | Computed layout value |
| `PaletteDemoModal.tsx` | Live colour swatch hex | Dev-tool context only |
| `PressKitPage.tsx:38` | `backgroundImage` + gradient | Dynamic URL + gradient |
| `WhySection.tsx:152` | `--slide-index`, `--slides-per-view` | Correct CSS var injection |
| `SliderCard.tsx:257` | `backgroundImage` URL | Dynamic asset URL |
| `ErrorBoundary.tsx:196-199` | `console.error` | `componentDidCatch` crash reporting |
| `src/app/scripts/*` | `console.*` | Node.js CLI scripts, not browser code |
