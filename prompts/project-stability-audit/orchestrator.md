# Project stability audit — orchestrator prompt

**Version:** 1.0.0
**Created:** March 4, 2026
**Type:** Orchestrator prompt (multi-audit, 7 sub-audits)
**Reports folder:** `/reports/project-stability-audit/`
**Task list:** `/tasks/project-stability-audit-tasks.md`
**Master task list:** `/tasks/task-list.md` (promote critical items here)

---

## Background

The Figma Make prototype occasionally fails to publish or renders a blank screen with a `#121212` background (very close to the project's `--wp--preset--color--atomic-black: #0F0F0F`). The root cause is typically one or more of:

1. **Config file errors** — Vite, PostCSS, TypeScript config mismatches
2. **Import chain breaks** — Missing or circular imports that silently fail
3. **CSS cascade issues** — Stylesheets not loaded in correct order, or missing entirely
4. **Route definition errors** — Components not wired to routes, lazy-loading failures
5. **Type misalignment** — Data files referencing stale or missing type definitions
6. **Build memory limits** — Files too large for the Figma Make bundler

This orchestrator addresses all six failure modes across 7 targeted sub-audits, plus establishes guardrails (filesystem conventions, protected files, archiving policies) to prevent regressions.

---

## Objective

1. **Diagnose** all potential causes of blank-screen publishing failures
2. **Audit** every layer of the build pipeline (config → types → data → imports → CSS → routes → output)
3. **Establish guidelines** so future changes don't reintroduce instability
4. **Document** all findings in reports with actionable task lists

---

## Prerequisites

Before running any sub-audit, read these files:

1. **[Guidelines.md](../../guidelines/Guidelines.md)** — Bundler compatibility rules, BEM architecture, folder conventions
2. **[overview-components.md](../../guidelines/overview-components.md)** — Component hierarchy and architecture
3. **[Data System README](../../data/README.md)** — Mock data structure
4. **[css-architecture.md](../../guidelines/css-architecture.md)** — BEM-only CSS rules
5. **[pwa-implementation.md](../../guidelines/pwa-implementation.md)** — Service worker and offline support

---

## Sub-audits

Run each sub-audit in sequence. Each produces its own report file in `/reports/project-stability-audit/`.

---

### Sub-audit 1 — Application stability (config + entrypoint)

**Prompt:** `/prompts/project-stability-audit/01-application-stability.md`
**Report:** `/reports/project-stability-audit/01-application-stability.md`

**Scope — config files:**
- `/vite.config.ts` — Verify Vite plugins, build target, resolve aliases, Tailwind V4 integration, and chunking strategy
- `/postcss.config.js` — Verify PostCSS plugins match Tailwind V4 requirements
- `/package.json` — Check dependency versions, peer dependency conflicts, missing packages
- `/tsconfig.json`, `/tsconfig.node.json` — Verify compiler options, path aliases, strict mode settings, include/exclude patterns

**Scope — entrypoint files:**
- `/main.tsx` — Verify React root creation, StrictMode, global CSS import order
- `/App.tsx` — Verify RouterProvider setup, ErrorBoundary wrapping, global state providers
- `/routes.ts` — Verify router creation function, all route imports resolve, no circular dependencies
- `/index.html` — Verify root element ID, meta tags, script entry point

**Checks:**
1. Does `main.tsx` import CSS files in the correct cascade order?
2. Does `App.tsx` export a default function component?
3. Are all route components importable without errors?
4. Are there any `import.meta.env` usages (forbidden by bundler)?
5. Does the Vite config produce a build that renders content (not just the `#121212` background)?
6. Are there any TypeScript path alias mismatches between `tsconfig.json` and `vite.config.ts`?

**Output:** Stability findings table with severity ratings (Critical/High/Medium/Low).

---

### Sub-audit 2 — Build optimisation

**Prompt:** `/prompts/project-stability-audit/02-build-optimisation.md`
**Report:** `/reports/project-stability-audit/02-build-optimisation.md`

**Scope:**
- Review existing build optimisation documentation (if `/docs/BUILD-OPTIMIZATION.md` exists)
- Measure file sizes across all directories
- Identify files that exceed safe bundler limits
- Identify orphaned files that inflate the bundle with dead code

**Checks:**
1. Which `.tsx` files are the largest? (Flag any over 500 lines)
2. Which `.css` files are the largest? (Flag any over 1000 lines)
3. Which `.ts` data files are the largest? (Flag any over 300 lines)
4. Are there orphaned components (never imported by any route or parent)?
5. Are there orphaned CSS files (never imported and classes never used)?
6. Are there orphaned data files (never imported by any component)?
7. Are there orphaned hooks (never imported)?
8. Are there orphaned utils (never imported)?

**Guidelines to produce:**
- Maximum recommended file sizes per file type
- How to split a large component (extract sub-components, co-locate styles)
- How to split a large data file (barrel exports, sub-modules)
- How to split a large CSS file (one block file per component)
- Import hygiene checklist for new components

**Output:** File size inventory, orphaned file list, and draft build guidelines.

---

### Sub-audit 3 — Routes and URLs

**Prompt:** `/prompts/project-stability-audit/03-routes-urls.md`
**Report:** `/reports/project-stability-audit/03-routes-urls.md`

**Scope:**
- `/routes.ts` — Full inventory of every defined route
- `/App.tsx` — Verify `RouterProvider` consumes the router correctly
- All page components — Verify each has a corresponding route definition
- All internal `<Link>` and `useNavigate()` calls — Verify they point to defined routes

**Checks:**
1. List every route path, its component, and whether it uses lazy loading
2. Are there page components with no route? (orphaned pages)
3. Are there routes pointing to components that don't exist?
4. Are there dynamic route segments (`:slug`, `:id`) and do their components handle missing params?
5. Is there a catch-all `*` route for 404?
6. Are nested routes structured correctly (parent layout → children)?
7. Do all `<Link to="...">` href values match defined route paths?
8. Are breadcrumb `href` values consistent with route paths?

**Guidelines to produce:**
- Store route documentation in `/guidelines/site-structure/` (or update existing `/guidelines/sitemap-routes.md`)
- Document every route: path, component, parent layout, dynamic segments, SEO title
- Document URL generation patterns (how slugs are created from data)
- Document how to add a new route (step-by-step checklist)

**Output:** Complete route inventory table, orphaned page list, broken link list, and route guidelines.

---

### Sub-audit 4 — Mock data and types

**Prompt:** `/prompts/project-stability-audit/04-mock-data-types.md`
**Report:** `/reports/project-stability-audit/04-mock-data-types.md`

**Scope — data files:**
- `/data/mock/` — All mock data files (pages, blog, portfolio, videos, podcasts, events, ui, images, sections, testimonials, feedback, seo)
- `/data/mock/index.ts` — Barrel export integrity
- All sub-folder `index.ts` files — Verify re-exports are complete

**Scope — type files:**
- `/data/types/` — All type definition files (blog, events, portfolio, podcast, videos, search, page, index)
- Cross-reference: every data file must import and satisfy its corresponding type

**Checks:**
1. For each data file: does it import a type from `/data/types/`? Is the type correct?
2. For each type definition: is it used by at least one data file?
3. Are there type fields that exist in the type but are never populated in data?
4. Are there data fields that exist in files but are missing from the type?
5. File size check: flag any data file over 300 lines; recommend split strategy
6. Are barrel exports (`index.ts`) complete? Do they re-export everything from their sub-modules?
7. Is the `seo.ts` data file aligned with all page components?
8. Are all string values in sentence case (per guidelines)?

**Guidelines to produce:**
- Store data structure documentation in `/guidelines/data-structure/` (new folder)
- Document every data module: file path, type reference, field inventory, consumer components
- Define maximum data file size and splitting conventions
- Define how barrel exports must be maintained when adding new files
- Define the type-first workflow: update type → create data → import in component

**Output:** Data-type alignment matrix, size violations, missing fields, and data structure guidelines.

---

### Sub-audit 5 — TS and TSX imports

**Prompt:** `/prompts/project-stability-audit/05-imports-audit.md`
**Report:** `/reports/project-stability-audit/05-imports-audit.md`

**Scope:**
- Every `.tsx` and `.ts` file in `/components/`, `/hooks/`, `/utils/`, `/lib/`, `/data/`
- Focus on import statements that could cause build failures

**Checks:**
1. **Unresolved imports:** Do all `import` paths resolve to existing files?
2. **Circular imports:** Are there any circular dependency chains? (A imports B imports A)
3. **Unused imports:** Are all imported symbols actually used in the file?
4. **CSS imports:** Does each component import its corresponding BEM stylesheet?
5. **Duplicate imports:** Is the same module imported twice in one file?
6. **Side-effect imports:** Are CSS `import` statements at the top of files (before component imports)?
7. **Dynamic imports:** Are there any `import()` calls that could fail at runtime?
8. **Package imports:** Do all external package imports (`lucide-react`, `react-router`, etc.) match installed versions?
9. **Bundler-forbidden patterns:** Are there any `import.meta.env`, optional chaining in imports, or other forbidden syntax?

**Output:** Import health table per directory, circular dependency graph (if any), and remediation list.

---

### Sub-audit 6 — CSS file structure

**Prompt:** `/prompts/project-stability-audit/06-css-structure.md`
**Report:** `/reports/project-stability-audit/06-css-structure.md`

**Scope — CSS entry chain:**
- `/styles/globals.css` — Main CSS file; verify it imports all block CSS files and tokens
- `/styles/animations.css` — Keyframe definitions
- `/styles/tokens/` — Design token CSS files (content-animations, content-colors, content-interactive, content-layouts, content-typography)
- `/styles/blocks/` — All BEM block CSS files (~110 files)
- `/styles/components/` — Component-specific CSS (e.g., `typeform-embed.css`)

**Checks:**
1. **Import chain:** Does `main.tsx` import `globals.css`? Does `globals.css` import all token and block files?
2. **Import order:** Are CSS files imported in the correct cascade order? (tokens → base → blocks → components → overrides)
3. **Missing imports:** Are there CSS files in `/styles/blocks/` that are never imported by `globals.css` or any component?
4. **Orphaned CSS:** Are there CSS class definitions that no component uses?
5. **Duplicate classes:** Are there class names defined in multiple CSS files?
6. **Tailwind leakage:** Are there any remaining raw Tailwind utility classes used in components without a corresponding CSS definition? (only project-defined utilities like `.text-center`, `.mb-fluid-*`, `.gap-fluid-*` are allowed)
7. **Light/dark mode:** Do all neon color classes have both light and dark variants?
8. **Reduced motion:** Do all animation-bearing CSS files have `@media (prefers-reduced-motion: reduce)` blocks?

**Future CSS structure (document for later implementation):**
- `/styles/theme-light.css` — Light mode overrides (planned)
- `/styles/theme-dark.css` — Dark mode overrides (planned)
- `/styles/theme-variables.css` — CSS custom property presets (planned)

**Guidelines to produce:**
- Update `/guidelines/css-architecture.md` with:
  - How to add a new CSS file (create in `/styles/blocks/`, import in component or `globals.css`)
  - CSS import order rules
  - How to verify CSS is loading (dev tools → Network → check file appears)
- Document all current CSS custom properties in `/guidelines/design-tokens/` (verify existing docs are complete)

**Output:** CSS import chain diagram, missing/orphaned file lists, Tailwind leakage inventory, and updated guidelines.

---

### Sub-audit 7 — Protected files and filesystem conventions

**Prompt:** `/prompts/project-stability-audit/07-filesystem-protected-files.md`
**Report:** `/reports/project-stability-audit/07-filesystem-conventions.md`

**Scope:**
This sub-audit establishes and verifies the filesystem rules, protected file policies, and archiving conventions that prevent accidental breakage during cleanups.

**Checks — protected files:**
1. Verify `README.md` and `CHANGELOG.md` exist in root (create if missing)
2. Verify `CHANGELOG.md` follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format and [Semver](https://semver.org/) versioning
3. Verify `Attributions.md` is in root and protected
4. Verify `/components/figma/ImageWithFallback.tsx` is listed as protected (cannot modify)
5. Verify `/utils/supabase/` folder is documented as protected (never used, cannot delete — deployment artifact)

**Checks — folder conventions:**
1. Verify `/imports/` folder exists at root (not `/src/imports/`)
2. All `.md` guideline files are in `/guidelines/` or its subfolders
3. All `.md` documentation files are in `/docs/`
4. All `.md` prompt files are in `/prompts/`
5. All `.md` report files are in `/reports/` subfolders
6. All `.md` task lists are in `/tasks/`
7. All `.sh` and `.py` scripts are in `/scripts/`
8. No stale `.md` files in project root (only `README.md`, `CHANGELOG.md`, `Attributions.md`)
9. Verify `/prompts/` folder is protected (never delete prompt files unless expressly stated)

**Checks — Supabase policy:**
- Document in Guidelines.md that Supabase is NOT used on this project
- `/utils/supabase/` is a system-protected folder — cannot be deleted
- Never suggest or connect Supabase

**Checks — task list management:**
1. Verify `/tasks/task-list.md` exists (all-purpose master checklist — never delete)
2. Verify simple one- or two-checkbox tasks go in `/tasks/task-list.md`
3. Verify full audits get their own dedicated task list (e.g., `/tasks/project-stability-audit-tasks.md`)
4. Define archiving process: completed task lists move to `/tasks/archived/`
5. Define the master task list tracker at `/tasks/master-task-list.md`:
   - References all active task lists with links
   - References archived task lists with links
   - Links related reports to each task list entry
   - Updated whenever a task list is created, completed, or archived
6. Verify `Guidelines.md` is updated with status changes after each audit

**Checks — report management:**
1. Define archiving process: completed reports move to `/reports/archived/`
2. Reports with completed task lists should be archived 7 days after completion
3. Only delete from `/reports/archived/` — never delete active reports
4. Run this check regularly to keep the system clean

**Guidelines to produce:**
- Update `/guidelines/Guidelines.md` with:
  - Protected files list (complete)
  - Supabase non-usage policy
  - Task list management and archiving process
  - Report archiving process (7-day rule)
  - Master task list tracker conventions
  - Prompt folder protection rule

**Output:** Filesystem compliance checklist, missing files/folders, and updated guidelines.

---

## Phosphor icons migration

**Note:** The Lucide → Phosphor icon migration is handled by a dedicated orchestrator:

- **Orchestrator:** `/prompts/phosphor-migration/orchestrator.md`
- **Sub-prompts:** `/prompts/phosphor-migration/01-*.md` through `06-*.md`
- **Report:** `/reports/phosphor-migration/full-audit-report.md`
- **Task list:** `/tasks/phosphor-migration-tasks.md`

This audit does NOT duplicate that work. However, Sub-audit 5 (imports) will flag any broken icon imports, and Sub-audit 6 (CSS) will verify icon stylesheet loading.

---

## Execution order

Run the sub-audits in this sequence (dependencies flow downward):

```
1. Application Stability (config + entrypoint)
   └── establishes baseline: can the app build and render?

2. Build Optimisation (file sizes + orphans)
   └── identifies dead code that may confuse later audits

3. Routes and URLs (route definitions + link integrity)
   └── maps the full navigation tree

4. Mock Data and Types (data ↔ type alignment)
   └── ensures content layer is solid

5. TS/TSX Imports (import resolution + circular deps)
   └��─ uses findings from audits 2-4 to verify import health

6. CSS File Structure (cascade + orphans + Tailwind leakage)
   └── final render-layer check

7. Filesystem Conventions (protected files + archiving)
   └── establishes guardrails for all future work
```

---

## Deliverables

| Deliverable | Location |
|---|---|
| Orchestrator prompt | `/prompts/project-stability-audit/orchestrator.md` (this file) |
| Sub-prompts (7) | `/prompts/project-stability-audit/01-*.md` through `07-*.md` |
| Reports (7) | `/reports/project-stability-audit/01-*.md` through `07-*.md` |
| Consolidated task list | `/tasks/project-stability-audit-tasks.md` |
| Route guidelines | `/guidelines/site-structure/routes.md` (new) |
| Data structure guidelines | `/guidelines/data-structure/` (new folder) |
| Updated CSS architecture guide | `/guidelines/css-architecture.md` (updated) |
| Updated Guidelines.md | `/guidelines/Guidelines.md` (updated with protected files, archiving, Supabase policy) |
| Master task list tracker | `/tasks/master-task-list.md` (new or updated) |

---

## Post-audit steps

1. Create `/reports/project-stability-audit/` with all 7 report files
2. Create `/tasks/project-stability-audit-tasks.md` with all actionable items grouped by priority
3. Promote Critical and High items to `/tasks/task-list.md`
4. Update `/tasks/master-task-list.md` with references to all new task lists and reports
5. Update `/guidelines/Guidelines.md` with audit status
6. Mark this orchestrator as executed with date stamp

---

## Re-running this prompt

This prompt is reusable for ongoing stability checks. Each run:
1. Reads existing reports and task lists for previously identified issues
2. Creates fresh reports in `/reports/project-stability-audit/` (overwriting old ones)
3. Updates task lists with new findings and marks resolved items as complete
4. Archives completed reports after 7 days per the archiving policy

---

## Cross-references

- [Guidelines.md](../../guidelines/Guidelines.md) — Project rules, bundler constraints, BEM architecture
- [Comprehensive cleanup orchestrator](../comprehensive-cleanup/orchestrator.md) — Previous cleanup audits
- [Phosphor migration orchestrator](../phosphor-migration/orchestrator.md) — Icon system migration
- [Design system audit](../design-system-audit-full.md) — BEM compliance audit
- [Bundler compatibility audit](../bundler-compatibility-audit.md) — Forbidden syntax checks
- [Memory reduction audit](../memory-reduction-audit.md) — File splitting strategies
- [Data System README](../../data/README.md) — Mock data conventions
- [CSS architecture](../../guidelines/css-architecture.md) — BEM naming and import rules
- [Sitemap routes](../../guidelines/sitemap-routes.md) — Existing route documentation
