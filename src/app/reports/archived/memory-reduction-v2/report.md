# Memory reduction audit v2.0 — Report

**Audit date:** March 5, 2026
**Prompt:** [memory-reduction-audit.md](../../prompts/memory-reduction-audit.md) (v2.0.0)
**Auditor:** AI assistant
**Scope:** CSS file splits, component cleanup, SVG complexity, DRY pattern extraction

---

## Executive summary

The v1.0.0 memory reduction audit (March 2026) completed ~79% of its tasks, successfully splitting 7 large files. This v2.0 audit identifies **18 remaining actionable items** across four areas. The highest-impact finding is the **7 markdown CSS files** that share identical structural patterns and could be consolidated using CSS custom properties, reducing ~2,100 lines of CSS to ~500 lines.

**Estimated total savings:** ~2,800 lines of CSS and ~600 lines of TSX code through file splits, deduplication, and DRY refactoring.

---

## Area 1: Break up large files — Findings

### 1A. CSS files

#### F1: `globals.css` — 942 lines (HIGH priority)

**Current structure:**
- Lines 1-13: Imports (@import statements)
- Lines 14-56: CSS reset
- Lines 58-296: Design tokens (:root custom properties)
- Lines 298-327: App container + noise overlay
- Lines 328-347: Dark mode token overrides
- Lines 350-500: Base styles + text utilities + icon tokens
- Lines 490-720: **Utility helper classes** (containers, spacing, gap, margin, typography helpers)
- Lines 720-800: Animations and effects
- Lines 800-942: Accessibility (reduced motion, focus states)

**Recommendation:** Extract lines 490-720 (utility helpers) into `/styles/blocks/utility-helpers.css`. This file contains 12 container classes, 20+ spacing helpers, and typography scale utilities — all self-contained with no dependencies on other styles. Import it from `globals.css` via `@import`.

**Impact:** Reduces `globals.css` from ~942 to ~712 lines. The utility file (~230 lines) loads independently.

---

#### F2: `icon-library.css` — 1,018 lines (HIGH priority)

**Current structure:**
- Lines 1-486: Core icon library (controls, grid, cards, info bar, settings) — v4.1.0 features
- Lines 487-1018: v5.0.0 additions (action buttons, shuffle, color picker, comparison modal, stats modal, responsive breakpoints, reduced motion)

**Recommendation:** Extract lines 487-1018 into `/styles/blocks/icon-library-features.css`. The v5.0.0 styles are self-contained and only used by `IconLibraryPage.tsx`.

**Impact:** Reduces `icon-library.css` from ~1,018 to ~486 lines. Feature file: ~532 lines.

---

#### F3: `portfolio-detail-page.css` — 835 lines (MEDIUM priority)

**Current structure:**
- Lines 1-599: Page layout, hero, gallery, event info, related posts, footer row, story quote
- Lines 600-835: `.portfolio-rich-text` — complete rich-text theming (headings, lists, links, blockquotes, code)

**Findings:**
1. `.portfolio-rich-text` block (lines 600-835) is a self-contained styling system that could live in its own file.
2. `.story-quote` (lines 552-599) and `.portfolio-rich-text blockquote` (lines 766-812) are **near-identical** — same `border-image`, same diamond `::before`, same dark mode treatment. Only padding and margin values differ slightly.

**Recommendation:**
- Extract `.portfolio-rich-text` into `/styles/blocks/rich-text-portfolio.css` (~235 lines).
- Deduplicate `.story-quote` by making it inherit from or alias `.portfolio-rich-text blockquote`.

**Impact:** Reduces `portfolio-detail-page.css` from ~835 to ~555 lines. Removes ~45 lines of duplicated blockquote styles.

---

#### F4: `about-subpage.css` — 736 lines (LOW priority)

Well-refactored by T05. The `.book-cover` block (lines 399-460) could optionally be extracted if it's reused elsewhere, but it's only used on the Book subpage. **No action recommended.**

#### F5: `hidden-about.css` — 511 lines (LOW priority)

Acceptable size. The per-accent hover patterns (lines 397-438) are already efficient as single-line declarations. **No action recommended.**

### 1B. TSX components

#### F6: `IconLibraryPage.tsx` — ~800+ lines (HIGH priority)

The v5.0.0 features (comparison modal, stats dashboard, color picker logic) add significant complexity to what was originally a ~400-line page.

**Recommendation:** Extract into `/components/pages/dev-tools/icon-library/`:
- `IconComparisonModal.tsx` — the 6-weight side-by-side comparison overlay
- `IconStatsModal.tsx` — usage statistics dashboard with bar charts
- `IconCardActions.tsx` — per-card color picker + compare button + copy button
- Keep `IconLibraryPage.tsx` as the orchestrator with state management

**Impact:** Reduces main file from ~800 to ~400 lines. Three new files of ~100-150 lines each.

### 1C. Data files

#### F7: `/data/mock/blog/posts.ts` — needs size check

The barrel `posts.ts` imports from `posts-timeline.ts` and may still contain inline post definitions. If >600 lines, split by topic into `/data/mock/blog/posts/` submodules (following the about-subpages pattern from T17).

#### F8: `/data/mock/seo.ts` — needs size check

Contains SEO metadata for ~46 pages. If >500 lines, split into `seo/pages.ts`, `seo/dev-tools.ts`, `seo/dynamic.ts` with a barrel re-export.

#### F9: `/data/mock/color-palettes.ts` — needs size check

Contains 33 color palette definitions. If >400 lines, split into palette groups.

---

## Area 2: Clean up layers and components — Findings

#### F10: Orphaned files in `/imports/`

Two markdown files exist in `/imports/`:
- `content-expansion-prompt.md`
- `markdown-guide.md`

These appear to be reference documents that were imported at some point but may no longer be used by any TSX component. **Verify whether any component imports these files.** If not, they can be deleted or moved to `/docs/`.

#### F11: Duplicate `@keyframes` definitions

The `subtitle-gradient-flow` animation is defined in both:
- `/styles/blocks/hidden-about.css` (line 124)
- Potentially other files that use the same animation name

**Recommendation:** Centralise all shared `@keyframes` in `/styles/animations.css` (which already exists) and remove duplicate definitions from block CSS files.

#### F12: Small CSS file candidates for consolidation

Several CSS files in `/styles/blocks/` are very small and could potentially be merged:
- `badge.css` — if < 30 lines, merge into nearest parent
- `read-more-btn.css` — if < 30 lines, merge into `button.css`

**Recommendation:** Audit all files under 30 lines. Only merge if the block is tightly coupled to its parent (e.g., a button variant into `button.css`).

---

## Area 3: Flatten complex SVGs — Findings

#### F13: `ColorfulIcons.tsx` — uses `dangerouslySetInnerHTML`

The component renders custom animated SVG icons with gradient `<defs>` and `<animate>` elements. Each icon uses `dangerouslySetInnerHTML` to bypass bundler SVG issues.

**Assessment:** The SVGs are purpose-built brand icons. They cannot be replaced with Phosphor icons. The `dangerouslySetInnerHTML` approach is necessary for the bundler. **No simplification possible without losing visual fidelity.**

**Recommendation:** No action. The SVG complexity is justified and intentional.

#### F14: Inline SVG noise overlay in `RootLayout.tsx`

Uses a single `<svg>` with `<filter>` and `<feTurbulence>` for the grain texture. This is a minimal, well-optimised approach (single filter element, no paths).

**Recommendation:** No action. Already minimal.

---

## Area 4: Trim variants and apply DRY patterns — Findings

#### F15: 7 markdown CSS files — HIGHEST IMPACT (HIGH priority)

**The finding:** Seven CSS files in `/styles/blocks/` follow an **identical structural pattern**:

```
markdown-blog.css       → .blog-*     → neon-pink    → Poppins / Merriweather / Fira Code
markdown-content.css    → .content-*  → neon-cyan    → Ubuntu / Lora / Roboto Mono
markdown-portfolio.css  → .portfolio-* → neon-green  → Montserrat / Crimson Pro / JetBrains Mono
markdown-video.css      → .video-*    → neon-purple  → Work Sans / Spectral / Space Mono
markdown-podcast.css    → .podcast-*  → neon-blue    → Nunito / Source Serif Pro / IBM Plex Mono
markdown-event.css      → .event-*    → neon-orange  → Raleway / Libre Baskerville / Courier Prime
markdown-faq.css        → .faq-*      → neon-yellow  → DM Sans / PT Serif / Anonymous Pro
```

Each file defines the **exact same elements** with the same structure:
- 6 heading levels (h1-h6) with serif font, dark mode overrides, and size scale
- h2 has a `border-bottom` accent line
- Paragraph + inline text (strong, em, del)
- Blockquotes with accent left border
- Code blocks with accent-tinted background
- Lists (ul/ol) with custom markers
- Links with accent color
- Horizontal rules
- Dark mode overrides for every element

**Estimated duplication:** Each file is ~200-300 lines. Total: ~1,500-2,100 lines of CSS. A shared base would reduce this to ~300 lines (base) + ~30 lines per variant (7 x 30 = 210 lines) = ~510 lines total.

**Proposed solution:**
1. Create `/styles/blocks/markdown-base.css` with CSS custom properties:
   ```css
   [data-md-theme] {
     --md-accent: var(--wp--preset--color--neon-pink);
     --md-accent-text: var(--wp--preset--color--neon-pink-text);
     --md-font-serif: var(--wp--preset--font-family--blog-serif);
     --md-font-sans: var(--wp--preset--font-family--blog-sans);
     --md-font-mono: var(--wp--preset--font-family--blog-mono);
   }
   ```
2. Define all shared structural styles using `[data-md-theme]` prefix selectors.
3. Reduce each per-type file to ~30 lines that set the three custom property values.
4. Update consuming TSX components to add a `data-md-theme="blog"` attribute.

**Impact:** ~1,400-1,600 lines of CSS eliminated.

---

#### F16: 8 taxonomy archive pages (MEDIUM priority)

Six taxonomy archive pages follow the same pattern:

| Page | Content type |
|---|---|
| `BlogCategoryPage.tsx` | Blog posts by category |
| `BlogTagPage.tsx` | Blog posts by tag |
| `PortfolioCategoryPage.tsx` | Portfolio by category |
| `PortfolioTagPage.tsx` | Portfolio by tag |
| `VideoCategoryPage.tsx` | Videos by category |
| `VideoTagPage.tsx` | Videos by tag |
| `PodcastCategoryPage.tsx` | Podcasts by category |
| `PodcastTagPage.tsx` | Podcasts by tag |

Each follows the same structural pattern: params → filter data → SEO → breadcrumbs → ArchiveFilters → card grid → empty state → FaqSection.

**Proposed solution:** Create a shared `TaxonomyArchiveLayout` component that accepts:
- `contentType: string` — for BEM classes and aria labels
- `items: array` — filtered content items
- `renderCard: (item) => JSX` — card renderer function
- `breadcrumbs: array` — breadcrumb configuration
- `filterConfig: object` — ArchiveFilters configuration

Each page becomes a ~50-line wrapper that provides configuration and data.

**Impact:** ~200-300 lines per page x 8 pages = ~1,600-2,400 lines. With shared component: 8 x 50 + 200 (shared) = ~600 lines. **Savings: ~1,000-1,800 lines.**

**Note:** This is a significant refactor. Implement carefully with the bundler constraints (no arrow functions, no destructuring).

---

#### F17: Container helper class duplication (LOW priority)

`globals.css` defines 12 container classes that all share:
```css
margin-left: auto;
margin-right: auto;
padding-left: var(--wp--preset--spacing--fluid-md);
padding-right: var(--wp--preset--spacing--fluid-md);
```

Only `max-width` differs.

**Proposed solution:** Define a `.container-base` mixin pattern (or shared class) and modifier classes that only set max-width. Since this is vanilla CSS (no preprocessor), use a single `.container` class with CSS custom property `--container-w`:

```css
.container {
  max-width: var(--container-w, var(--wp--preset--layout--wide));
  margin: 0 auto;
  padding-left: var(--wp--preset--spacing--fluid-md);
  padding-right: var(--wp--preset--spacing--fluid-md);
}
.container--xl { --container-w: 1200px; }
.container--5xl { --container-w: 64rem; }
/* etc. */
```

**Impact:** Reduces ~60 lines to ~25 lines. Low effort, low risk.

---

#### F18: `.story-quote` duplication in portfolio detail (LOW priority)

As noted in F3, `.story-quote` and `.portfolio-rich-text blockquote` are near-identical (both 48 lines each, ~90% overlap). 

**Proposed solution:** Consolidate into a single `.portfolio-blockquote` class used by both contexts.

**Impact:** ~45 duplicate lines removed.

---

## Priority matrix

| Priority | Finding | Estimated savings | Effort |
|---|---|---|---|
| HIGH | F15: Markdown CSS DRY (7 files) | ~1,400 lines CSS | Medium |
| HIGH | F2: `icon-library.css` split | Cleaner file organisation | Low |
| HIGH | F6: `IconLibraryPage.tsx` split | ~400 lines extracted | Medium |
| HIGH | F1: `globals.css` utility extraction | ~230 lines extracted | Low |
| MEDIUM | F16: Taxonomy archive DRY (8 pages) | ~1,000-1,800 lines TSX | High |
| MEDIUM | F3: Portfolio rich-text extraction | ~280 lines extracted | Low |
| LOW | F17: Container class DRY | ~35 lines | Low |
| LOW | F18: Story quote dedup | ~45 lines | Low |
| LOW | F10: Orphaned imports check | Cleanup | Low |
| LOW | F11: Duplicate keyframes | Cleanup | Low |
| LOW | F12: Small CSS consolidation | Cleanup | Low |
| INFO | F7-F9: Data file size checks | TBD | Low |
| NONE | F4, F5, F13, F14 | No action needed | None |

---

## Conclusion

The codebase is already in good shape following the v1.0.0 audit. The remaining opportunities are primarily **DRY consolidation** (markdown CSS, taxonomy pages, containers) rather than file splitting. The markdown CSS consolidation alone could eliminate ~1,400 lines — making it the single highest-impact task in this audit.