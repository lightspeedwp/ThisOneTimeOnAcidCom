# Root Cleanup & Codebase Audit - Orchestrator Prompt

**Created:** February 25, 2026
**Type:** Orchestrator Prompt (multi-audit)
**Reports folder:** `/reports/root-cleanup/`
**Task list:** `/tasks/task-list.md`

---

## Purpose

Perform a comprehensive cleanup and audit of the Ash Shaw Makeup Portfolio codebase. This prompt covers multiple audit areas, each producing a separate report in `/reports/root-cleanup/`. All actionable findings are consolidated into `/tasks/task-list.md`.

---

## Prerequisites

Before running any audit, read:
- **[Guidelines.md](../guidelines/Guidelines.md)** - Project workflow & file organization rules
- **[css-architecture.md](../guidelines/css-architecture.md)** - BEM-only CSS rules
- **[overview-components.md](../guidelines/overview-components.md)** - Component hierarchy
- **[Bundler Compatibility Rules](../guidelines/Guidelines.md#-bundler-compatibility-rules-figma-make)** - Syntax restrictions

---

## Audit Sequence

Run each audit in order. For each audit, create a separate report file in `/reports/root-cleanup/` and add findings to `/tasks/task-list.md`.

### Audit 1: Root File Cleanup
**Report:** `/reports/root-cleanup/01-root-files.md`

1. Review every file in the project root (`/`)
2. Identify files that are:
   - No longer imported or referenced by any `.ts`/`.tsx` file
   - Build artifacts that should not be in source control (e.g., `/dist/`)
   - Redundant config files
3. Check `/Attributions.md` - is it referenced anywhere?
4. Check `/theme.json` - is it imported or only used as WordPress reference documentation?
5. Check `/data/schema.md` - documentation only or actively used?
6. **Action:** Delete confirmed orphaned files. Archive completed tasks.

### Audit 2: Orphaned Content Files
**Report:** `/reports/root-cleanup/02-orphaned-content.md`

1. Scan the `/content/` folder for all markdown files
2. Search for any import or reference to these files in `.ts`/`.tsx` code
3. Determine if `/content/` is entirely orphaned (leftover from pre-mock-data era)
4. **Action:** If orphaned, flag for deletion or archival.

### Audit 3: Deprecated Hook Migration
**Report:** `/reports/root-cleanup/03-deprecated-hooks.md`

1. Check `/hooks/useContentful.ts` - it re-exports from `useContent.ts` but is deprecated
2. List every component still importing from `useContentful`
3. Plan migration: change all imports to `useContent`
4. **Action:** Update imports, then delete `useContentful.ts`.

### Audit 4: Unused UI Primitives
**Report:** `/reports/root-cleanup/04-unused-ui-primitives.md`

1. List all files in `/components/ui/` (the ~50 shadcn-style stubs)
2. For each file, search for imports across the entire codebase
3. Categorize as: **actively used**, **protected stub** (kept for UI library), or **orphaned**
4. Note: These are protected stubs per project architecture. Do NOT delete unless confirmed orphaned AND not part of the shadcn primitive set.
5. **Action:** Document findings. Flag truly orphaned non-stub components.

### Audit 5: Unused CSS Block Files
**Report:** `/reports/root-cleanup/05-unused-css.md`

1. List all files in `/styles/blocks/`
2. For each CSS file, search for `import` statements in `.tsx` files AND check if the BEM classes defined in the CSS file are used in any component
3. Flag CSS files with zero imports AND zero class usage
4. **Action:** Delete confirmed orphaned CSS files.

### Audit 6: Unused Utility & Service Files
**Report:** `/reports/root-cleanup/06-unused-utils.md`

1. List all files in `/utils/`
2. For each utility, search for imports across the codebase
3. Check `/utils/imageManifest.ts`, `/utils/imageOptimizer.ts`, `/utils/contentCounts.ts` - are they actively used?
4. **Action:** Delete confirmed orphaned utilities.

### Audit 7: Bundler Compatibility Scan
**Report:** `/reports/root-cleanup/07-bundler-compatibility.md`

1. Search all `.tsx` and `.ts` files for forbidden syntax patterns:
   - `?.` (optional chaining)
   - `??` (nullish coalescing)
   - `import.meta.env`
   - Nested ternaries
   - `for...of` loops
   - `new Set<` generics in `.tsx` files
2. Note: `/components/figma/ImageWithFallback.tsx` is a protected file and MUST NOT be modified even if it contains `??`
3. **Action:** Fix all instances (except protected files) using workarounds documented in Guidelines.md.

### Audit 8: Supabase Stubs Review
**Report:** `/reports/root-cleanup/08-supabase-stubs.md`

1. Review `/supabase/functions/server/index.tsx` and `kv_store.tsx`
2. Check if these stubs are actively imported by any frontend code
3. Verify `netlify.toml` references them as functions directory
4. **Action:** Document status. If only used by Netlify deployment, note as deployment-only artifacts.

---

## Post-Audit Steps

1. Consolidate all findings into `/tasks/task-list.md`
2. Prioritize tasks: Critical (bundler breaks) > High (orphaned code) > Medium (deprecated patterns) > Low (documentation)
3. Archive completed tasks to a `## Completed` section at the bottom of the task list
4. Delete reports older than 7 days in subsequent cleanup runs

---

## Re-running This Prompt

This prompt can be re-run at any time for ongoing maintenance. Each run should:
1. Check `/tasks/task-list.md` for previously identified issues
2. Create fresh reports in `/reports/root-cleanup/` (overwriting old ones)
3. Update the task list with new findings and mark resolved items as complete
