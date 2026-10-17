# Sub-audit 2 — Build optimisation

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/02-build-optimisation.md`

---

## Context

The Figma Make bundler has memory limits. Large files, orphaned code, and inefficient imports inflate the bundle and can cause build failures or blank-screen renders. This audit identifies oversized files, dead code, and establishes size guidelines.

---

## Step 1 — File size inventory

Scan every directory and record file sizes. Flag files exceeding these thresholds:

| File type | Warning threshold | Critical threshold |
|---|---|---|
| `.tsx` component | 300 lines | 500 lines |
| `.ts` data file | 200 lines | 400 lines |
| `.ts` utility/hook | 200 lines | 400 lines |
| `.css` stylesheet | 500 lines | 1000 lines |
| `.md` documentation | 300 lines | 600 lines |

**Directories to scan:**
- `/components/` (all subdirectories)
- `/data/mock/` (all subdirectories)
- `/data/types/`
- `/hooks/`
- `/utils/`
- `/lib/`
- `/styles/` (all subdirectories)

**Output:** Table of all files exceeding warning threshold, sorted by size descending.

---

## Step 2 — Orphaned file detection

For each file type, check if the file is imported by any other file in the project:

### Components (`.tsx`)
- [ ] Scan `/components/pages/` — Is every page component referenced in `/routes.ts`?
- [ ] Scan `/components/sections/` — Is every section component imported by a page?
- [ ] Scan `/components/ui/` — Is every UI component imported by a section or page?
- [ ] Scan `/components/common/` — Is every common component imported somewhere?

### Hooks (`.ts`)
- [ ] Scan `/hooks/` — Is every hook imported by at least one component?

### Utilities (`.ts`)
- [ ] Scan `/utils/` — Is every utility imported by at least one file?

### Data files (`.ts`)
- [ ] Scan `/data/mock/` — Is every data file imported (directly or via barrel export)?
- [ ] Scan `/data/types/` — Is every type file imported by a data file or component?

### CSS files (`.css`)
- [ ] Scan `/styles/blocks/` — Is every CSS file imported by a component or `globals.css`?
- [ ] Scan `/styles/tokens/` — Is every token CSS file imported by `globals.css`?
- [ ] Scan `/styles/components/` — Is every CSS file imported by its component?

### Library files (`.tsx`, `.ts`)
- [ ] Scan `/lib/` — Is every export consumed by at least one file?

**Output:** Orphaned files table with recommendation (delete / keep with rationale).

---

## Step 3 — Build optimisation guidelines

Create guidelines at `/guidelines/build-optimisation.md` covering:

### File size limits
- Recommended maximum sizes per file type (from the thresholds above)
- How the Figma Make bundler handles large files
- Symptoms of exceeding memory limits (build failure, blank screen, partial render)

### Splitting large components
1. Extract sub-components into the same directory
2. Co-locate styles (one CSS block file per component)
3. Extract data transformations into utility functions
4. Extract complex hooks into `/hooks/`
5. Maximum JSX depth: 4 levels of nesting before extracting

### Splitting large data files
1. One file per content domain (e.g., `blog/posts.ts`, `blog/categories.ts`)
2. When a data file exceeds 200 lines, split by logical grouping:
   - By content type (posts vs categories vs tags)
   - By date range (e.g., `posts-2024.ts`, `posts-2025.ts`)
   - By content section (e.g., `ebook/part-1.ts`, `ebook/part-2.ts`)
3. Always maintain a barrel `index.ts` that re-exports all splits
4. Update the barrel export EVERY time you add a new file

### Splitting large CSS files
1. One block CSS file per component (BEM block = one file)
2. When a block file exceeds 500 lines, split by concern:
   - Base styles: `{block}.css`
   - Responsive overrides: `{block}-responsive.css`
   - Theme variants: `{block}-theme.css`
3. Import all splits from the component or from `globals.css`

### Import hygiene checklist (for new components)
- [ ] Import your CSS file at the top
- [ ] Import data from `/data/mock/` (never hardcode content)
- [ ] Import types from `/data/types/`
- [ ] Import hooks from `/hooks/`
- [ ] Import icons from the current icon system
- [ ] Verify all imports resolve before committing
- [ ] Remove any unused imports

---

## Output format

```markdown
## File size inventory

| File | Lines | Threshold | Status |
|---|---|---|---|
| `/components/pages/...` | 650 | 500 (Critical) | OVER |

## Orphaned files

| File | Type | Imported by | Recommendation |
|---|---|---|---|
| `/components/ui/...` | Component | None | Delete |

## Guidelines

[Draft of `/guidelines/build-optimisation.md`]
```
