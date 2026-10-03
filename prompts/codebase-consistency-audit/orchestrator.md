# Codebase Consistency Audit — Orchestrator

**Version:** 3.0.0
**Updated:** 2026-09-10
**Prompt path:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`
**Home:** `src/app/`

---

## Purpose

A comprehensive site health audit covering eight domains. Run this prompt to catch regressions, verify the site meets September 2026 web standards, and ensure the codebase remains maintainable as a headless portfolio site.

**Domains:**
1. Package versions and dependency health
2. Undefined / mismatched CSS custom property references
3. Hardcoded values vs design token usage
4. Button padding and variant inconsistencies
5. Illegal inline styles in TSX components
6. Unguarded console logging
7. Web standards, SEO, AI agent discoverability, and structured data
8. Existing task backlog review

---

## Project Reference

**Site:** Ash Shaw — Neon & UV Makeup Art portfolio / book site
**Stack:** React 18, React Router v7, Vite 6, Tailwind v4, TypeScript 6, Motion 12
**Aesthetic:** 80s neon CLI — neon pink (#FF10F0) and neon yellow (#F4FF3C) on atomic black (#0F0F0F)
**CSS architecture:** Strict BEM — no Tailwind utility classes in component CSS, no inline styles
**Token system:** `--wp--preset--*` naming, defined in `src/styles/globals.css` `:root {}`
**Home directory:** `src/app/` — all prompts, reports, and tasks live here
**No Supabase** — never suggest or implement Supabase

### Directory Layout

```
src/app/
  prompts/    <- reusable AI prompts (this file lives here)
  reports/    <- raw sub-audit findings (one folder per audit run)
  tasks/      <- task checklists AND implementation plans
  components/
  utils/
  data/
  styles/ (at src/styles/)
```

### CSS Load Chain

```
src/styles/index.css
  -> default_theme.css   (shadcn tokens only)
  -> globals.css
       -> tokens/content-colors.css       (VERIFY imported)
       -> tokens/content-typography.css   (VERIFY imported)
       -> tokens/content-layouts.css      (VERIFY imported)
       -> tokens/content-interactive.css  (VERIFY imported)
       -> tokens/content-animations.css   (VERIFY imported)
       -> themes/light.css
       -> themes/dark.css
       -> themes/dark-extended.css
       -> blocks/book-dark-mode.css
       -> blocks/not-found-page.css
       -> (block CSS files imported per-component via TSX)
```

---

## Execution Order

```
H -> F -> E -> B -> A -> C -> D -> G
```

H (backlog review) first — existing tasks inform priority. F (packages), E (undefined tokens), B (hardcoded values), A (button system), C (inline styles), D (console logs), G (web standards / discoverability) last because it spans the whole site.

---

## Sub-audit H — Existing Task Backlog Review

**Purpose:** Before generating new tasks, understand what is already pending. Avoids re-identifying issues that are already tracked.

**Files to check:**

```bash
ls src/app/tasks/
cat src/app/tasks/master-task-list.md
# Then spot-check each "Active" task list for unchecked items:
grep -c "^\- \[ \]" src/app/tasks/animation-movement-tasks.md
grep -c "^\- \[ \]" src/app/tasks/design-system-expansion-tasks.md
grep -c "^\- \[ \]" src/app/tasks/feature-work-expansion-tasks.md
grep -c "^\- \[ \]" src/app/tasks/codebase-consistency-audit-tasks.md
grep -c "^\- \[ \]" src/app/tasks/book-website-tasks.md
```

**Checks:**
1. List all active task lists and their pending item count
2. Flag any task list last touched more than 60 days ago that still has pending items — these are at risk of becoming stale
3. Flag any task that directly overlaps with findings from this audit run — note "already tracked in X" and do not duplicate
4. Note task lists that are NOT STARTED (status from master-task-list.md) — these may contain work that has since been superseded

**Output:** Include a backlog summary table at the top of the consolidated report.

---

## Sub-audit F — Package Versions and Dependency Health

**Purpose:** Confirm the installed stack matches September 2026 best practices.

**Commands:**

```bash
cat package.json | python3 -c "import sys,json; p=json.load(sys.stdin); deps={**p.get('dependencies',{}), **p.get('devDependencies',{}), **p.get('peerDependencies',{})}; [print(k,v) for k,v in deps.items() if not '@' in k[1:]]"
```

**September 2026 package benchmarks:**

| Package | Installed | Latest stable | Notes |
|---|---|---|---|
| `react` | 18.3.1 | 19.x | React 19 stable since late 2024. React 18 still supported. Migration optional but note if server components or async components are desired. |
| `react-router` | 7.13.0 | 7.x | Current — confirm no `react-router-dom` duplicate |
| `vite` | 6.3.5 | 6.x | Note if Vite 7 is available |
| `tailwindcss` | 4.1.12 | 4.x | Current |
| `motion` | 12.x | 12.x | Confirm no `framer-motion` duplicate import |
| `typescript` | ^6.0.3 | 6.x | Flag `^` — should be pinned |
| `@phosphor-icons/react` | ^2.1.10 | 2.x | Flag `^` — should be pinned |
| `lucide-react` | 0.487.0 | — | Note: project migrated to Phosphor; confirm lucide is still needed or can be removed |

**Additional checks:**
1. Duplicate package entries (pnpm alias pattern — document, not necessarily a bug)
2. `react` and `react-dom` only in `peerDependencies` with `optional: true` — risk in some CI environments
3. Unused packages: `react-slick`, `@popperjs/core`, `react-popper` — check if any component still imports these
4. `sharp`, `glob`, `fs`, `path` in dependencies — these are Node.js modules, should be in `devDependencies` if used only in build scripts
5. Check `netlify.toml` for correct build command and publish directory

---

## Sub-audit E — Undefined and Mismatched CSS Token References

**Purpose:** Every `var(--wp--preset--*)` reference must resolve to a defined token.

**Commands:**

```bash
# CRITICAL: Are tokens/ files imported?
grep "@import" src/styles/globals.css

# Tokens defined in globals.css
grep -o "\-\-wp--preset--[^:;, )\"']*" src/styles/globals.css | sort -u | grep -v "var("

# Tokens defined in theme files (also in load chain)
grep -o "\-\-wp--preset--[^:;, )\"']*" src/styles/themes/dark.css src/styles/themes/light.css | sort -u | grep -v "var("

# Tokens USED in block CSS files
grep -rh "var(--wp--preset--" src/styles/blocks/ | grep -o "\-\-wp--preset--[^),' \"]*" | sort -u

# Find used tokens not in defined set (undefined = silent breakage)
# Cross-reference the above two lists manually or with comm -23

# Spot-check critical categories
grep -rn "var(--wp--preset--font-size--" src/styles/blocks/ | head -5
grep -rn "var(--wp--preset--layout--" src/styles/blocks/ | head -5
grep -rn "var(--wp--preset--shadow--" src/styles/blocks/ | head -5
```

**Key findings to verify from previous audit:**
- `src/styles/tokens/` files — confirm they are now imported (CRIT-01 from Sept 2026 plan)
- Shadow variant tokens (sm/md/lg/xl/2xl/card/action-btn etc.) — confirm defined
- Border-radius extended (pill/xl/2xl) — confirm defined
- Spacing extended (70/90/100/block-gap/fluid-3xl) — confirm defined
- Z-index extended (20/header) — confirm defined

**Pass criteria:** Every `var(--wp--preset--*)` resolves. `tokens/` files imported in `globals.css`.

---

## Sub-audit B — Design Token Consistency (Hardcoded Values)

**Commands:**

```bash
# Brand hex in selectors (always a violation outside :root)
grep -rn "#0F0F0F\|#FF10F0\|#F4FF3C\|#F6F2EB\|#CFC7BB\|#333333\|#1A1A1A" src/styles/ --include="*.css" | grep -v ":root" | grep -v "/\*" | grep -v "^ *--"

# All hex in block CSS outside :root definitions
grep -rn "#[0-9a-fA-F]\{3,6\}\b" src/styles/blocks/ --include="*.css" | grep -v "^ *--" | grep -v "/\*"

# Pixel font-sizes not inside clamp()
grep -rn "font-size:.*[0-9]\+px" src/styles/ --include="*.css" | grep -v "clamp" | grep -v "^ *--" | grep -v "/\*"

# Pixel padding not inside clamp() on interactive elements
grep -rn "padding:.*[0-9]\+px" src/styles/blocks/ --include="*.css" | grep -v "clamp"
```

**High-priority files to check** (known violations from Sept 2026 audit):
- `src/styles/globals.css` — ~15 new hex regressions in selectors, 7 px font-sizes
- `src/styles/blocks/mobile-menu.css` — 5 neon hex
- `src/styles/blocks/style-guide-page.css` — 13+ neon/brand hex
- `src/styles/blocks/animation-showcase.css` — 4 hex
- `src/styles/blocks/ebook-enhanced-contrast.css` — 6 hex
- `src/styles/themes/light.css` — 5 instances of `#1A1A1A`

**Pass criteria:** Brand hex never used in selectors outside `:root`. All interactive padding uses `clamp()` or spacing tokens.

---

## Sub-audit A — Button System Consistency

**Commands:**

```bash
find src/styles -name "button*.css" -o -name "read-more-btn.css"
grep -n "padding" src/styles/blocks/button.css
grep -n "padding" src/styles/blocks/button-variations.css
grep -n "padding" src/styles/blocks/read-more-btn.css
grep -rn "\.btn\|\.button\|wp-block-button__link" src/styles/ --include="*.css" | grep "padding" | grep -v "clamp"
```

**Systems to check:**
1. `.btn` — canonical (`button.css`)
2. `.button` — legacy (`globals.css`) — must have `/* legacy -- prefer .btn */` comment
3. `.wp-block-button__link` — WP-style (`button-variations.css`)
4. `.read-more-btn` — standalone (`read-more-btn.css`)

**Pass criteria:** All use `clamp()` padding, `--wp--preset--border-radius--*` tokens, `--wp--preset--font-family--brand-*` tokens. No raw `px` on any button selector.

---

## Sub-audit C — Inline Styles in TSX

**Commands:**

```bash
grep -rln "style={{" src/app/components/ --include="*.tsx"
grep -rn "style={{" src/app/components/ --include="*.tsx"
```

**Classification table:**

| Pattern | Classification |
|---|---|
| `style={{ '--var': value } as React.CSSProperties}` | Accepted — CSS var injection |
| `style={{ width: pct + '%' }}` | Accepted — computed, no alt |
| `style={{ backgroundImage: 'url(...)' }}` | Accepted — dynamic URL |
| `style={{ transform: 'translateX(...)' }}` computed from data | Violation — use CSS var injection (see C-03) |
| `style={{ borderColor: 'var(--...)' }}` string ref | Violation — use CSS var injection (see C-01) |
| Any static colour / layout / spacing value | Violation |

**Known accepted exceptions (do not re-flag):**
`PortfolioMegaMenu`, `BlogMegaMenu`, `AboutDropdown` (stagger vars), `BlogPostPage`/`PodcastDetailPage` (progress bar width), `PortfolioCard` (backgroundImage), `ResponsiveGridSlider` (flex basis), `PaletteDemoModal` (live hex demo), `PressKitPage:38` (dynamic backgroundImage), `WhySection:152` (CSS var injection), `TimelinePage` (CSS var injection), `HistoryPage` (CSS var injection), `SliderCard:257` (backgroundImage)

**Known violations from Sept 2026 audit** (confirm still outstanding):
- `SectionCard.tsx:123` — string CSS var ref → needs CSS var injection pattern
- `UVMakeupSection.tsx:235` — computed transform → needs CSS var injection

---

## Sub-audit D — Console Logging Policy

**Commands:**

```bash
grep -rn "console\." src/app/components/ src/app/hooks/ src/app/utils/ --include="*.tsx" --include="*.ts" | grep -v "import.meta.env.DEV" | grep -v "componentDidCatch" | grep -v "extensionErrorSuppressor" | grep -v "scripts/"
```

**Pass criteria:** Zero unguarded `console.*` in browser-context code. Scripts in `src/app/scripts/` are Node.js — exempt.

---

## Sub-audit G — Web Standards, SEO, and AI Agent Discoverability (September 2026)

This is the most important new sub-audit. The site needs to meet modern discovery standards for both human search engines and AI agents.

### G.1 — Core Web Vitals targets (September 2026)

| Metric | Target | How to check |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Check if hero images have `loading="eager"` and `fetchpriority="high"` |
| INP (Interaction to Next Paint) | < 200ms | Replaces FID since March 2024. Check for heavy JS on interaction handlers |
| CLS (Cumulative Layout Shift) | < 0.1 | Check for images without explicit `width`/`height`, font swaps (FOUT) |
| TTFB (Time to First Byte) | < 800ms | Check Netlify edge caching config |

**Commands:**

```bash
# Check for images without dimensions
grep -rn "<img" src/app/components/ --include="*.tsx" | grep -v "width\|ImageWithFallback\|OptimizedImage" | head -20

# Check for lazy loading on images
grep -rn "loading=" src/app/components/ --include="*.tsx" | head -20

# Check hero images for priority loading
grep -rn "fetchpriority\|loading=\"eager\"" src/app/components/ --include="*.tsx" | head -10
```

### G.2 — JSON-LD Schema Coverage

The site already has schema infrastructure (`schemaService.ts`, `faqSchema.ts`, `seo.ts`). Audit coverage gaps.

**Required schemas (September 2026 best practice):**

| Schema type | Where | Status check |
|---|---|---|
| `Person` | `index.html` (global) | Check `index.html` — already present but verify completeness |
| `WebSite` with `SearchAction` | `index.html` (global) | Check if present — enables Google Sitelinks Search Box |
| `WebPage` | Every page component | Check each page's `useEffect` for schema injection |
| `Article` | Every blog post page | Check `BlogPostPage.tsx` |
| `PodcastEpisode` | Every podcast detail | Check `PodcastDetailPage.tsx` |
| `VideoObject` | Every video detail | Check `VideoDetailPage.tsx` |
| `VisualArtwork` | Every portfolio detail | Check `PortfolioDetailPage.tsx` |
| `Event` | Event pages | Check event page components |
| `Book` | Book/ebook pages | Check `BookPage.tsx`, `EbookPage.tsx` |
| `FAQPage` | FAQ page | Check `FaqSection.tsx` — already implemented |
| `BreadcrumbList` | All pages with breadcrumbs | Check `Breadcrumbs.tsx` — already implemented |
| `ItemList` | Archive / listing pages | Check Blog, Portfolio, Video index pages |
| `Organization` | Index page (supplementary) | Check if present alongside Person schema |

**Commands:**

```bash
# Pages using schema injection
grep -rln "injectSchema\|buildSchema\|application/ld\+json\|SchemaOrg" src/app/components/pages/ --include="*.tsx"

# Pages NOT using any schema
find src/app/components/pages -name "*.tsx" | xargs grep -L "injectSchema\|schema\|Schema" | grep -v "__tests__"

# Check index.html for global schemas
grep -A 30 "application/ld+json" src/app/index.html
```

**Key gaps to verify:**
- Does `index.html` have a `WebSite` schema with `SearchAction`?
- Does `BlogPostPage.tsx` inject `Article` schema with `author`, `datePublished`, `image`?
- Do About sub-pages (BioPage, ManifestoPage etc.) inject `WebPage` or `ProfilePage` schema?
- Does `BookPage.tsx` / `EbookPage.tsx` inject `Book` schema?
- Do Video pages inject `VideoObject` schema?

### G.3 — AI Agent and LLM Discoverability

AI search agents (Perplexity, ChatGPT Search, Claude, Gemini) crawl and index sites differently from traditional search engines. As of September 2026, the following are best practice:

**`llms.txt` file (check if present):**

```bash
ls src/app/public/ | grep llms
cat src/app/public/llms.txt 2>/dev/null || echo "MISSING"
```

`llms.txt` is a plain-text file at the root of a site that gives AI crawlers a summary of the site's content and how to understand it. Proposed standard: https://llmstxt.org. If missing, create `public/llms.txt` with:
- One-paragraph site description
- Content inventory (what pages exist, what topics are covered)
- Author bio summary
- Preferred citation format
- Contact information

**`robots.txt` AI bot policy (check current):**

```bash
cat src/app/public/robots.txt 2>/dev/null || cat public/robots.txt 2>/dev/null || echo "MISSING"
```

As of September 2026, major AI crawlers use these user-agent strings:
- `GPTBot` (OpenAI)
- `ClaudeBot` (Anthropic)
- `PerplexityBot`
- `CCBot` (Common Crawl — used by many LLM training datasets)
- `Google-Extended` (Google AI training)
- `anthropic-ai`
- `Applebot-Extended` (Apple AI)

Check if `robots.txt` explicitly allows or disallows these. For a portfolio site seeking discoverability, allowing all crawlers is recommended. Flag if any are blocked.

**Structured data quality for AI:**
- Schema.org data is the primary signal AI uses to understand content
- Ensure `Person` schema has complete `sameAs` array (social profiles)
- Ensure `Article` schema includes `keywords`, `about`, `mentions`
- Ensure `description` in all schemas is rich and specific (not placeholder text)

### G.4 — Open Graph and Social Meta

**Commands:**

```bash
grep -n "og:\|twitter:" src/app/index.html
# Check if og:image actually exists
ls src/app/public/ | grep -i "og\|social\|share"
```

**Checks:**
1. `og:image` must point to a real, accessible file (currently `https://ashshaw.com/og-image.jpg` — verify this file exists in `/public/`)
2. `og:image` dimensions should be 1200x630px
3. Every page component that calls `setSEO()` should also set `og:image` per-page if the content warrants it
4. `twitter:card` should be `summary_large_image` — confirm set globally
5. `og:site_name` — check if set
6. `og:locale` — check if set (should be `en_GB` or `en_ZA` for South Africa)

### G.5 — Semantic HTML and Accessibility

**Commands:**

```bash
# Check for landmark regions in page components
grep -rn "<main\|<nav\|<header\|<footer\|<article\|<aside\|<section" src/app/components/ --include="*.tsx" | grep -v "//" | head -30

# Check heading hierarchy issues (h3 before h2 pattern)
grep -rn "<h[1-6]" src/app/components/pages/ --include="*.tsx" | head -40

# Check for alt text on all images
grep -rn "<img" src/app/components/ --include="*.tsx" | grep -v "alt=" | head -20

# Check for aria-label on icon-only buttons
grep -rn "<button" src/app/components/ --include="*.tsx" | grep -v "aria-\|children\|className.*text" | head -20

# Check for skip-to-main-content link
grep -rn "skip\|Skip to" src/app/ --include="*.tsx" --include="*.html" | head -5
```

**WCAG 2.2 checks (current standard as of Sept 2026):**
- **2.4.11 Focus Visible (AA):** Focus indicators must be visible — check CSS for `:focus-visible` rules
- **2.5.8 Target Size (AA):** Interactive targets must be at least 24x24px
- **3.2.6 Consistent Help (A):** If a contact mechanism exists, it must be in a consistent location

### G.6 — Performance and Loading

**Commands:**

```bash
# Check font loading strategy
grep -n "font\|preconnect\|preload" src/app/index.html

# Count total Google Font variants loaded (too many = performance hit)
grep -c "family=" src/app/index.html

# Check for image optimization component usage
grep -rln "OptimizedImage\|ImageWithFallback\|loading=" src/app/components/ --include="*.tsx" | wc -l

# Check for code splitting / lazy loading
grep -rn "lazy\|Suspense\|React.lazy" src/app/ --include="*.tsx" --include="*.ts" | head -10
```

**Checks:**
1. Count Google Font families loaded — current `index.html` loads 25+ font families. This is excessive. Flag if > 8 families or > 5 weights per family.
2. Confirm `display=swap` is set for all Google Font requests (avoids FOUT)
3. Check if React.lazy() is used for route-level code splitting
4. Check `netlify.toml` for cache-control headers
5. Check if `og-image.jpg` exists in `/public/` (referenced in meta but may be missing)

### G.7 — robots.txt and sitemap.xml

**Commands:**

```bash
find src/app/public -name "robots.txt" -o -name "sitemap.xml" -o -name "sitemap*.xml"
cat src/app/public/robots.txt 2>/dev/null
```

**Checks:**
1. `robots.txt` exists and allows major crawlers
2. `sitemap.xml` or `sitemap-index.xml` referenced in `robots.txt`
3. If using a dynamic sitemap component (`SitemapPage.tsx`), is there also a static `sitemap.xml` for crawler use?
4. `Sitemap:` directive in `robots.txt` pointing to the canonical sitemap URL

### G.8 — Security Headers (Netlify)

```bash
cat src/app/netlify.toml
```

Check `netlify.toml` for:
- `X-Frame-Options: DENY` or `SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` header
- Content Security Policy (CSP) — complex but recommended

---

## Output Format and Naming Conventions

**All output files live under `src/app/`.** There is no separate `/plan/` folder — implementation plans are stored in `src/app/tasks/`.

```
src/app/reports/codebase-consistency-audit/
  YYYY-MM-DD-H-backlog-review.md
  YYYY-MM-DD-F-package-health.md
  YYYY-MM-DD-E-undefined-tokens.md
  YYYY-MM-DD-B-design-tokens.md
  YYYY-MM-DD-A-button-system.md
  YYYY-MM-DD-C-inline-styles.md
  YYYY-MM-DD-D-console-logging.md
  YYYY-MM-DD-G-web-standards.md
  YYYY-MM-DD-consolidated-report.md

src/app/tasks/
  codebase-consistency-audit-tasks.md    <- checkbox task list (updated in-place)
  YYYY-MM-DD-implementation-plan.md      <- implementation plan with root causes + fix approach
  master-task-list.md                    <- tracker index (NEVER DELETE)
  task-list.md                           <- persistent general task list (NEVER DELETE)
```

---

### Report file structure

```markdown
# Sub-audit [X] -- [Name]

**Date:** YYYY-MM-DD
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

## Findings

| ID | File:Line | Severity | Description |
|---|---|---|---|

## Accepted Exceptions

| File | Pattern | Reason |
|---|---|---|

## Recommended Actions

- ID-01: [exact change -- file path, before value, after value]
```

---

### Implementation plan structure

Save to: `src/app/tasks/YYYY-MM-DD-implementation-plan.md`

```markdown
# Implementation Plan — YYYY-MM-DD

**Generated by:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`
**Audit reports:** `src/app/reports/codebase-consistency-audit/`
**Status:** Pending

## Background

[One paragraph summary of what this audit found and why it matters]

## Critical Fixes

### CRIT-01 -- [Title]
**Audit refs:** [IDs]
**Root cause:** [why it is broken -- not just what]
**Affected files:** [list]
**Fix:**
[code snippet -- before / after]
**Status:** Pending

## High Priority Fixes
## Medium Priority Fixes
## Accepted Exceptions table
## Files to Modify table
```

---

### Task list structure

Update `src/app/tasks/codebase-consistency-audit-tasks.md` in-place.

```markdown
## Critical

### CRIT-01 -- [Title]
**Ref:** audit ID | **File:** path
- [ ] specific action
- [ ] specific action

## High
## Medium
## Completed  (move items here when done)
```

---

## Re-run Instructions

Re-run after every major sprint or when site has not been worked on for more than two weeks.

**Steps:**
1. Archive previous reports: `mv src/app/reports/codebase-consistency-audit src/app/reports/archived/YYYY-MM-DD-codebase-consistency-audit`
2. Run all 8 sub-audits in order: H -> F -> E -> B -> A -> C -> D -> G
3. Save sub-audit reports with today's date prefix
4. Save implementation plan to `src/app/tasks/YYYY-MM-DD-implementation-plan.md`
5. Update `src/app/tasks/codebase-consistency-audit-tasks.md` in-place (append new, do not delete previous completed section)
6. Update `src/app/tasks/master-task-list.md` entry for this task list

**Trigger conditions:**
- After adding a new page component
- After any CSS refactor touching `globals.css` or theme files
- Before a production deployment
- After updating any major dependency
- When site has not been worked on for more than two weeks

**30-second spot check between full audits:**

```bash
# New inline style violations
grep -rn "style={{" src/app/components/ --include="*.tsx" | grep -v "\-\-\|url(\|%\|backgroundImage"
# Unguarded console calls
grep -rn "console\." src/app/components/ --include="*.tsx" | grep -v "import.meta.env.DEV\|ErrorBoundary"
# Brand hex regressions in block CSS
grep -rn "#FF10F0\|#F4FF3C\|#0F0F0F" src/styles/blocks/ --include="*.css" | grep -v "^ *--" | wc -l
# Missing schema coverage
find src/app/components/pages -name "*.tsx" | xargs grep -L "injectSchema\|setSEO" | wc -l
```

---

## Output Locations Summary

```
src/app/prompts/codebase-consistency-audit/orchestrator.md   <- this file
src/app/reports/codebase-consistency-audit/                  <- sub-audit findings
src/app/tasks/codebase-consistency-audit-tasks.md            <- checkboxes
src/app/tasks/YYYY-MM-DD-implementation-plan.md              <- actionable plan
src/app/tasks/master-task-list.md                            <- index of all task lists
```
