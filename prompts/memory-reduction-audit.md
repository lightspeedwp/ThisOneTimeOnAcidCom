# Memory reduction audit

**Purpose:** Identify and resolve memory bloat across CSS, TSX components, data files, and SVGs by splitting large files, removing unused layers, flattening complexity, and applying DRY patterns.

**Version:** 2.0.0
**Created:** March 2, 2026
**Rewritten:** March 5, 2026

---

## Status of previous audit (v1.0.0)

The v1.0.0 audit ran in March 2026 and completed ~79% of its tasks. The following splits have **already been completed** and should NOT be re-audited:

| Task | Status |
|---|---|
| T05: `about-subpage.css` accent refactor (CSS custom properties) | Done |
| T09: `ebook.css` split into 6 files (base, drawer, navigation, page-types, responsive, settings-modal) | Done |
| T10: `style-guide-page.css` split into 5 files (base, components, elements, patterns, tokens) | Done |
| T11: `blog-page.css` split into `blog-list.css` + `blog-article.css` | Done |
| T14: `EbookPage.tsx` split into sub-components (EbookDrawer, EbookPageContent, EbookReaderNav, ebookHelpers) | Done |
| T17: `about-subpages.ts` split into 17 per-subpage modules under `/data/mock/pages/about/` | Done |
| T18: `ebook-pages.ts` split into 7 modules under `/data/mock/pages/ebook/` | Done |

---

## Scope

This audit covers **four areas** of memory reduction. Each area has specific steps, expected outputs, and references.

### Area 1: Break up large files into smaller ones

**Objective:** Split remaining oversized CSS and TSX files at logical boundaries.

#### 1A. CSS files to review (by priority)

| File | Approx lines | Proposed action |
|---|---|---|
| `/styles/globals.css` | ~942 | Extract utility helpers (containers, spacing, typography helper classes, gap/margin utilities) into `/styles/blocks/utility-helpers.css`. Keep only reset, design tokens, base styles, focus states, and reduced-motion in globals. |
| `/styles/blocks/icon-library.css` | ~1018 | Extract v5.0.0 feature styles (modals, comparison grid, stats dashboard, shuffle, action buttons — line ~487 onward) into `/styles/blocks/icon-library-features.css`. |
| `/styles/blocks/portfolio-detail-page.css` | ~835 | Extract rich-text `.portfolio-rich-text` styles (line ~600 onward) into `/styles/blocks/rich-text-portfolio.css`. Also deduplicate `.story-quote` and `.portfolio-rich-text blockquote` — they are nearly identical. |
| `/styles/blocks/about-subpage.css` | ~736 | Well-refactored already (T05). Low priority. Optionally extract `.book-cover` block (lines 399-460) into a shared `book-cover.css` if reused elsewhere. |
| `/styles/blocks/hidden-about.css` | ~511 | Acceptable size. Low priority. Per-accent hover/dot patterns (lines 397-438) are repetitive but CSS custom properties already handle this. |

#### 1B. TSX components to review

| File | Approx lines | Proposed action |
|---|---|---|
| `/components/pages/dev-tools/IconLibraryPage.tsx` | ~800+ | Extract comparison modal into `IconComparisonModal.tsx`, stats dashboard into `IconStatsModal.tsx`, and color picker card logic into `IconCardEnhanced.tsx` — all in a new `/components/pages/dev-tools/icon-library/` subfolder. |
| `/components/common/Header.tsx` | ~470 | Already has dropdown sub-components extracted (AboutDropdown, BlogMegaMenu, PortfolioMegaMenu, ContactMiniMenu). Acceptable size. Low priority. |

#### 1C. Data files to review

| File | Status |
|---|---|
| `/data/mock/pages/about-subpages.ts` | **Done** (T17) — now a barrel re-export file |
| `/data/mock/pages/ebook-pages.ts` | **Done** (T18) — now a barrel re-export file |
| `/data/mock/blog/posts.ts` | Review size. If >600 lines, split by category into `/data/mock/blog/posts/` submodules. |
| `/data/mock/seo.ts` | Review size. If >500 lines, split into `/data/mock/seo/pages.ts`, `/data/mock/seo/dev-tools.ts`, `/data/mock/seo/dynamic.ts`. |
| `/data/mock/color-palettes.ts` | Review size. If >400 lines, split into palette groups. |

**Steps:**
1. Read each file and identify logical split points (sections, features, page-specific overrides).
2. Propose specific file splits with new filenames.
3. Identify shared/reusable patterns that can be extracted (e.g., rich-text theming, dark/light accent patterns).
4. Verify no circular dependencies would be introduced.
5. After splitting, update all import paths in consuming TSX components.

---

### Area 2: Clean up layers and components

**Objective:** Remove dead code, unused imports, orphaned CSS classes, and redundant wrapper divs.

**Steps:**
1. Scan for unused component imports across the codebase (components that are defined but never imported by any route or parent).
2. Identify deeply nested JSX structures (3+ levels of wrapper divs with no semantic purpose or BEM class).
3. Check for hidden/conditional elements that are never rendered (dead `if` branches, always-false conditions).
4. Check for orphaned CSS classes (defined in CSS but never referenced in any TSX file).
5. Review `/imports/` for unused markdown files and legacy attachments — `content-expansion-prompt.md` and `markdown-guide.md` may be orphaned.
6. Count all CSS block files in `/styles/blocks/` and identify candidates for consolidation (files under 30 lines that could be merged into a parent file).
7. Check for duplicate `@keyframes` definitions across CSS files (e.g., `subtitle-gradient-flow` appears in both `hidden-about.css` and should reference the centralised `animations.css`).

---

### Area 3: Flatten complex SVGs and vector shapes

**Objective:** Reduce SVG complexity where possible to lower DOM node count and memory footprint.

**Steps:**
1. Review `/components/common/ColorfulIcons.tsx` — uses `dangerouslySetInnerHTML` for complex SVGs with gradients and animations. Count total path/shape elements. Identify any that could be simplified.
2. Check the inline SVG noise overlay in `/components/common/RootLayout.tsx` — uses `feTurbulence`. Confirm it's minimal.
3. Scan all TSX files for inline SVG elements (not Phosphor icon imports) and assess whether any can be replaced with simpler CSS effects or Phosphor icons.
4. Check for duplicated SVG definitions (e.g., gradient `<defs>` that could be shared).

---

### Area 4: Trim component variants and apply DRY patterns

**Objective:** Reduce duplication by extracting shared patterns into reusable components and shared CSS.

#### 4A. Markdown CSS files (HIGHEST IMPACT)

**Finding:** Seven markdown CSS files follow an **identical structural pattern** with only three variables differing:
- CSS class prefix (`.blog-`, `.content-`, `.portfolio-`, `.video-`, `.podcast-`, `.event-`, `.faq-`)
- Accent neon color (pink, cyan, green, purple, blue, orange, yellow)
- Font family trio (sans, serif, mono)

| File | Prefix | Accent | Font trio |
|---|---|---|---|
| `markdown-blog.css` | `.blog-` | neon-pink | Poppins / Merriweather / Fira Code |
| `markdown-content.css` | `.content-` | neon-cyan | Ubuntu / Lora / Roboto Mono |
| `markdown-portfolio.css` | `.portfolio-` | neon-green | Montserrat / Crimson Pro / JetBrains Mono |
| `markdown-video.css` | `.video-` | neon-purple | Work Sans / Spectral / Space Mono |
| `markdown-podcast.css` | `.podcast-` | neon-blue | Nunito / Source Serif Pro / IBM Plex Mono |
| `markdown-event.css` | `.event-` | neon-orange | Raleway / Libre Baskerville / Courier Prime |
| `markdown-faq.css` | `.faq-` | neon-yellow | DM Sans / PT Serif / Anonymous Pro |

**Proposed solution:** Create a shared `markdown-base.css` that uses CSS custom properties (`--md-accent`, `--md-accent-text`, `--md-font-sans`, `--md-font-serif`, `--md-font-mono`). Each content-type file then sets only its custom properties and any type-specific overrides. This could reduce total markdown CSS by ~60-70%.

#### 4B. Archive taxonomy pages

**Finding:** Six taxonomy archive pages share near-identical structure:
- `BlogCategoryPage.tsx` / `BlogTagPage.tsx`
- `PortfolioCategoryPage.tsx` / `PortfolioTagPage.tsx`
- `VideoCategoryPage.tsx` / `VideoTagPage.tsx`
- `PodcastCategoryPage.tsx` / `PodcastTagPage.tsx`

Each follows the same pattern: URL params, data filtering, SEO, breadcrumbs, ArchiveFilters, card grid, empty state, FAQ section.

**Proposed solution:** Extract a shared `TaxonomyArchivePage` component that accepts configuration (content type, data source, card renderer, SEO builder). Each page becomes a thin wrapper that passes configuration.

#### 4C. Container helper classes

**Finding:** `globals.css` defines 8+ near-identical container classes:
```css
.container-wide, .container-desktop-wide, .container-ultra-wide,
.container-desktop-xl, .container-full-hd, .container-7xl,
.container-6xl, .container-5xl, .container-xl, .container-lg,
.container-4xl, .container-3xl
```
All share the same `margin: 0 auto; padding-left/right` pattern with only `max-width` differing.

**Proposed solution:** Use a single `.container` class with a `--container-max-width` custom property, then define modifier classes (`.container--wide`, `.container--xl`, etc.) that only set the max-width.

#### 4D. Portfolio rich-text duplication

**Finding:** `.story-quote` in `portfolio-detail-page.css` (lines 552-599) is nearly identical to `.portfolio-rich-text blockquote` (lines 766-812). Same gradient border, same diamond accent, same dark mode styles.

**Proposed solution:** Remove `.story-quote` and use `.portfolio-rich-text blockquote` consistently. If `.story-quote` is used outside rich-text contexts, alias it with the same styles via `@extend` or CSS nesting.

---

## References

- [Guidelines.md](../guidelines/Guidelines.md) — Project standards, BEM architecture, bundler rules
- [overview-components.md](../guidelines/overview-components.md) — Component hierarchy
- [Data System README](../data/README.md) — Mock data structure
- [Previous memory reduction tasks (archived)](../tasks/master-task-list.md) — Previous audit results

## Output

- **Report:** `/reports/memory-reduction-v2/report.md`
- **Task list:** `/tasks/memory-reduction-v2-tasks.md`
- **Master task list update:** Add entry to `/tasks/master-task-list.md`
