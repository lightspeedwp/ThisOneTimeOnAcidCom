# Comprehensive Codebase Cleanup - Orchestrator Prompt

**Created:** February 25, 2026
**Type:** Orchestrator Prompt (multi-audit)
**Reports folder:** `/reports/comprehensive-cleanup/`
**Task list:** `/tasks/comprehensive-cleanup-tasks.md`
**Master task list:** `/tasks/task-list.md` (consolidate critical items here)

---

## Purpose

Perform a full codebase hygiene sweep across all folders. This prompt covers 6 audits, each producing a separate report. Findings are consolidated into a dedicated task list and critical items are promoted to the master `/tasks/task-list.md`.

**References:**
- [Guidelines.md](../../guidelines/Guidelines.md) - Root directory restrictions, mandatory folder conventions, bundler rules
- [css-architecture.md](../../guidelines/css-architecture.md) - BEM-only CSS rules
- [overview-components.md](../../guidelines/overview-components.md) - Component hierarchy
- [Data System README](../../data/README.md) - Mock data system

---

## Prerequisites

Before running any audit, read these guidelines:
1. **[Guidelines.md - Root Restrictions](../../guidelines/Guidelines.md)** - Only `README.md`, `CHANGELOG.md`, `Attributions.md` allowed in root
2. **[Guidelines.md - Folder Conventions](../../guidelines/Guidelines.md)** - All prompts, reports, tasks, docs, scripts in designated folders
3. **[Guidelines.md - Bundler Rules](../../guidelines/Guidelines.md)** - Forbidden syntax list
4. **[Guidelines.md - Image Protection](../../guidelines/Guidelines.md)** - Never replace existing images

---

## Audit 1: Root Directory Compliance
**Report:** `/reports/comprehensive-cleanup/01-root-compliance.md`

1. List every file in the project root (`/`)
2. Flag any `.md` file that is NOT `README.md`, `CHANGELOG.md`, or `Attributions.md`
3. Flag any `.sh` script file in root (must be in `/scripts/`)
4. Flag any prompt, report, or task file that is in root instead of its designated folder
5. Check for stale build artifacts (`/dist/`, temp files)
6. **Action:** Move or delete non-compliant files. Respect protected files.

---

## Audit 2: Orphaned Files & Imports (TSX, TS, CSS)
**Report:** `/reports/comprehensive-cleanup/02-orphaned-files.md`

1. Scan `/components/` for `.tsx` files that are never imported by any other file
2. Scan `/hooks/` for `.ts` files that are never imported
3. Scan `/utils/` for `.ts` files that are never imported
4. Scan `/styles/blocks/` for `.css` files that are never imported
5. Scan `/data/` for `.ts` files that are never imported from any component
6. Scan `/content/` for markdown files with zero code references
7. Scan `/lib/` for exports that are never consumed
8. **Action:** Flag orphaned files for deletion. Note any that are kept as intentional stubs.

---

## Audit 3: Unused Imports Within Files
**Report:** `/reports/comprehensive-cleanup/03-unused-imports.md`

1. For each `.tsx` and `.ts` file, check if all `import` statements are actually used in the file body
2. Flag imports that are declared but never referenced in JSX or code
3. Pay special attention to CSS imports (`import '../styles/blocks/...'`) - verify the BEM classes from that CSS file are used in the component
4. Check for duplicate imports (same module imported twice)
5. **Action:** Remove unused imports. Clean up dead references.

---

## Audit 4: Deprecated Patterns & Hooks
**Report:** `/reports/comprehensive-cleanup/04-deprecated-patterns.md`

1. Search for `useContentful` imports - all should be migrated to `useContent`
2. Search for `import.meta.env` usage (forbidden by bundler)
3. Search for inline styles (`style={{`) - must use BEM classes
4. Search for hardcoded text strings in JSX (should use mock data)
5. Search for `console.log`/`console.warn`/`console.error` without dev checks
6. **Action:** Document each finding with file path, line, and recommended fix.

---

## Audit 5: CSS Hygiene
**Report:** `/reports/comprehensive-cleanup/05-css-hygiene.md`

1. List all files in `/styles/blocks/` and `/styles/components/`
2. For each CSS file, find the component(s) that import it
3. For CSS files with zero imports, check if their BEM classes appear in any `.tsx` file (via `globals.css` cascade)
4. Check for duplicate class definitions across CSS files
5. Check for classes defined in CSS but never used in any component
6. **Action:** Flag truly orphaned CSS for deletion. Document class usage gaps.

---

## Audit 6: Folder Hygiene & Stale Artifacts
**Report:** `/reports/comprehensive-cleanup/06-folder-hygiene.md`

1. Review `/reports/` - delete reports older than 7 days
2. Review `/tasks/` - archive completed tasks in master task list
3. Review `/prompts/` - remove obsolete prompts that have been fully executed
4. Review `/docs/` - verify all docs are current and referenced
5. Review `/public/` - check for unused static assets
6. Review `/dist/` - should not be in source; flag for `.gitignore`
7. **Action:** Clean up stale artifacts. Archive where appropriate.

---

## Post-Audit Steps

1. Create `/reports/comprehensive-cleanup/` with all 6 report files
2. Create `/tasks/comprehensive-cleanup-tasks.md` with all actionable items
3. Promote critical/high-priority items to `/tasks/task-list.md`
4. Mark this orchestrator as executed with date stamp

---

## Re-running This Prompt

This prompt is reusable. Each run:
1. Reads existing task lists for previously identified issues
2. Creates fresh reports in `/reports/comprehensive-cleanup/` (overwriting old ones)
3. Updates task lists with new findings and marks resolved items as complete
