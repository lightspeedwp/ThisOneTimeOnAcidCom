# Implementation Plan: Book website — staged Figma Make package

| Field | Value |
| -- | -- |
| Version | 1.0.0 |
| Last revised | 2026-11-12 (Asia/Bangkok) |
| Spec | `spec.md` |
| Inspected revision | `55079087373e6bc2c85e689aecde2815130b146b` |

## Summary

This plan stages bounded changes to the existing book website through seven Make prompts. Each stage previews its exact changes, stops for Ash's approval, applies only the approved changes, then stops at a manual GitHub checkpoint. This plan schedules nothing and assigns no owners or durations.

## Technical Context

- **Stack (declared in source):** React 19, `react-router` 8, Vite 8, TypeScript, Node 24, npm.
- **Entry:** `src/main.tsx` → `App.tsx` (`RouterProvider`) → `routes.ts` → `RootLayout`.
- **Styles:** `src/styles/index.css` → `default_theme.css` → `globals.css` → tokens → themes → book blocks. Component CSS is imported by its components.
- **Deployment:** Netlify builds `main` (`npm run build`, publishes `dist`). This is recorded, not live-verified; see `verification.md` §5.
- **Testing:** Jest unit tests and Playwright are present. No check runs without approval.
- **Make:** the editing target. The revision and parity are unknown until Prompt 00 runs.

## Constitution and governance check

| Rule | Position |
| -- | -- |
| Specification-first (`CLAUDE.md`, `AGENTS.md`) | Followed: this package precedes any implementation. |
| Feature root `.github/specs` (`.specify/init-options.json`) | Followed. No root `specs/` folder is created. |
| Branch check (`AGENTS.md` lines 93–121) | Documentation is saved on `docs/book-website-make-spec`, under `staged/`, beside the existing 004 files, none of which is modified. Make's work on `main` is subject to the unapproved exception in `decisions.md` §3. |
| Hooks (Lefthook) | Stay enabled. Nothing bypasses them. |
| Spec 003 scope | Not expanded. |
| `.specify/feature.json`, `CATALOG.md` | Not changed by this package. |

## Project Structure

### Documentation (this feature)

```text
.github/specs/004-book-website-make/staged/
├── spec.md
├── plan.md
├── tasks.md
├── sources.md
├── decisions.md
├── verification.md
└── prompts/
    ├── README.md
    ├── 00-preflight.md
    ├── 01-navigation.md
    ├── 02a-themes.md
    ├── 02b-style-guide.md
    ├── 03a-podcast-data.md
    ├── 03b-podcast-routing.md
    └── 03c-podcast-playback.md
```

The Spec Kit template sections `research.md`, `data-model.md`, `quickstart.md` and `contracts/` are not added. `sources.md` and `decisions.md` cover research. The podcast data contract is produced by Stage 03A, not invented here.

## Stage-by-stage file plan

All paths listed are **verified** at the inspected revision unless they are marked as proposed or inferred. Make equivalents must be re-verified in Stage 00.

### Stage 00: Preflight (BASE-01, BASE-02)

- **Operations:** read-only, across every path below.
- **Output:** a parity table and a proposal for the next stage.
- **No file changes.**

### Stage 01: Navigation (NAV-01, NAV-02)

| File | Proposed operation | Condition |
| -- | -- | -- |
| `src/app/data/mock/book-site.ts` | Remove `nav` items Events/Speaking/Media. Remove footer "Author & Press" items Speaking & Workshops, Events and Media & Press. | Approved preview |
| `src/app/components/pages/SitemapPage.tsx` | Remove from `bookPages`: Events, Speaking & workshops, Media & press (D-12); Thank you, Style guide (omit) and Draft viewer, Ebook reader (withhold) (D-15). Keep Read the draft. | Approved preview |
| `src/app/components/common/Header.tsx` | None expected | Only if there is a demonstrated empty-group or gap problem |
| `src/app/components/common/Footer.tsx` | None expected | Same |
| `src/app/routes.ts` | **No change** | Intentional non-change |
| `src/styles/blocks/footer.css`, `mobile-menu.css`, `sitemap-page.css` | None expected | Conditional |

Intentional non-changes in this stage:

- `ui/navigation.ts`, `ui/sitemap.ts` and `ui/footer.ts` properties
- `social-links.ts`
- `public/sitemap.xml`
- `robots.txt`
- `/privacy` and `/terms`
- Page modules

### Stage 02A: Themes (THEME-01, THEME-02)

- **Inspect:**
  - `src/main.tsx`, `App.tsx`, `RootLayout.tsx`
  - `ThemeProvider.tsx`, `ThemeToggleES5.tsx`, `ThemeSwitcher.tsx`, `Header.tsx`, `Footer.tsx`
  - `src/styles/index.css`, `default_theme.css`, `globals.css`
  - `tokens/content-{colors,typography,layouts,interactive,animations}.css`
  - `themes/{light,dark,dark-extended}.css`
  - `themes/brutalist.css` (present but not imported)
  - `blocks/book-dark-mode.css`, `book.css`, `theme-toggle.css`, `theme-switcher.css`
- **Produce first:** the mapping table and the theme-state trace.
- **Candidate operations, after approval:**
  - Mount or replace the provider so both controls share state.
  - Map approved primitives to semantic variables in `globals.css` and the tokens.
  - Reconcile overrides in `book-dark-mode.css`.
- **Exact edits:** proposed only after Q-06, Q-07 and Q-08 are resolved.
- **Excluded:** global hex replacement and third-mode removal.

### Stage 02B: Style guide (GUIDE-01)

- **Edit candidates:** `src/app/components/pages/StyleGuidePage.tsx` and `src/styles/blocks/style-guide-page.css`.
- **Inspect only:** `ui/style-guide.ts` and `ui/branding.ts` (legacy portfolio identity).
- **Section changes:**
  - Remove Nova News.
  - Label swatch, alias and computed specimens.
  - Add keyboard activation for swatches.
- **Shared repairs to report separately rather than fix here:**
  - The `body.dark` selector, which the toggles do not target (they set the class on `html`).
  - The nested `main` element and duplicate `id`.
- **Depends on:** 02A mappings.

### Stage 03A: Podcast data (POD-01, POD-02)

- **Inspect:**
  - `src/app/data/types/podcast.ts`
  - `src/app/data/mock/podcasts/{episodes,episodes-season1,index,categories,tags}.ts`
  - `src/app/data/mock/ui/podcasts.ts`
  - `content/podcasts/*.md` (4 files)
  - Consumers, including `SearchResultsPage`
- **Output:** the field-level contract and the eligibility rule.
- **Proposed new files:** none until the contract is accepted.
- **Excluded:** route registration and player work.

### Stage 03B: Podcast routing (POD-01)

- **Inspect:**
  - `routes.ts`
  - `pages/podcasts/{PodcastsPage,PodcastDetailPage,PodcastCategoryPage,PodcastTagPage}.tsx`
  - `ui/ArchiveFilters.tsx`, `shared/TaxonomyArchiveLayout.tsx`
  - `utils/{contentCounts,simpleMarkdown,schemaService}.ts`
  - `ui/breadcrumbs.ts`, `seo.ts`
  - `blocks/{podcasts-page,archive-filters}.css`
- **Candidate operation:** register the approved routes only (Q-13).
- **Excluded:** no global navigation exposure without separate approval.

### Stage 03C: Playback (POD-03)

- **Edit candidates:**
  - `PodcastDetailPage.tsx`: replace the simulated progress with a source-bound `<audio>`.
  - `podcast.ts` types, `ui/podcasts.ts`, `podcasts-page.css`.
- **Inspect:** shared `portfolio-detail-page.css` and `blog-article.css`.

## Shared-file dependencies and risks

| Shared file | Stages | Risk | Response |
| -- | -- | -- | -- |
| `globals.css` | 02A, 02B, 03B | Cascade conflicts | Serialise; 02A first |
| `Header.tsx` / `Footer.tsx` | 01, 02A | Navigation and theme-control edits collide | Finish and checkpoint 01 before 02A |
| `routes.ts` | 01 (no change), 03B | Accidental route removal | 01 makes no change there; 03B adds only |
| `PodcastDetailPage.tsx` | 03B, 03C | Presentation vs playback | 03B leaves the player untouched |
| Podcast data | 03A, search | Preview content leaks through search | 03A defines the eligibility filter |

Other risks:

- Make parity is unknown.
- A Make workspace may lack recent commits.
- Make-side guideline conflict: Tailwind is banned yet imported.
- A push to `main` is likely to deploy.

## Main-based workflow and deployment implications

- Make edits `main`, subject to the exception in `decisions.md` §3.
- Ash reviews, commits and pushes manually.
- Before recommending a push, the stage report states that it may trigger a Netlify production deploy.
- Checks must have passed, or exceptions must be explicitly accepted, before `Commit to GitHub` is issued.

## Complexity Tracking

| Item | Why needed | Simpler alternative rejected because |
| -- | -- | -- |
| Separate 02A/02B stages | Shared theme repairs would otherwise enlarge TOA-445 silently | A single stage hides shared-file impact |
| Three podcast stages | Data authority, routes and playback each need different evidence | Combining them allows simulated playback to pass |
