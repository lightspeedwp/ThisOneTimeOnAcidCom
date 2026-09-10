# Sub-audit 4 — Mock data and types

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/04-mock-data-types.md`

---

## Context

All front-end content must be stored in mock data files under `/data/mock/`, never hardcoded in components. Every data file must reference a TypeScript type from `/data/types/`. Misalignment between types and data causes silent rendering failures. Oversized data files risk exceeding bundler memory limits.

---

## Step 1 — Data file inventory

Scan `/data/mock/` recursively. For each `.ts` file, record:

| File | Lines | Type import | Barrel exported? | Consumer count |
|---|---|---|---|---|
| `/data/mock/blog/posts.ts` | 250 | `BlogPost` from `/data/types/blog` | Yes (via `index.ts`) | 3 files |

**Checks:**
- [ ] Every data file imports a type from `/data/types/`
- [ ] Every data file's exports match the imported type shape
- [ ] Every data file is re-exported through its directory's `index.ts`
- [ ] The root `/data/mock/index.ts` re-exports all sub-modules

---

## Step 2 — Type file inventory

Scan `/data/types/` for every `.ts` file. For each type definition, record:

| Type name | File | Used by data files | Used by components |
|---|---|---|---|
| `BlogPost` | `/data/types/blog.ts` | `posts.ts`, `posts-timeline.ts` | `BlogPage.tsx`, `BlogPostPage.tsx` |

**Checks:**
- [ ] Every type is used by at least one data file
- [ ] Every type field has a corresponding value in its data files
- [ ] No type fields are unused across ALL data files (phantom fields)
- [ ] No data files contain fields that are missing from the type (untyped fields)
- [ ] Type names follow conventions: PascalCase, descriptive, no abbreviations

---

## Step 3 — Data-type alignment matrix

For each type, compare every field against every data file entry:

```
Type: BlogPost
Fields: id, title, slug, excerpt, content, category, tags, date, author, image, readTime

Data file: /data/mock/blog/posts.ts
Entry 1: id ✅, title ✅, slug ✅, excerpt ✅, content ✅, category ✅, tags ✅, date ✅, author ✅, image ✅, readTime ✅
Entry 2: id ✅, title ✅, slug ✅, excerpt ✅, content ✅, category ✅, tags ✅, date ✅, author ❌ MISSING, image ✅, readTime ✅
```

Flag:
- [ ] Fields defined in type but missing from data entries
- [ ] Fields present in data but not defined in type
- [ ] Fields with wrong value types (string where number expected, etc.)
- [ ] Optional fields (`?`) that are ALWAYS provided (should be required)
- [ ] Required fields that are sometimes missing (should be optional or data should be fixed)

---

## Step 4 — Data file size check

Flag data files exceeding recommended limits:

| Threshold | Action |
|---|---|
| > 200 lines | Warning — consider splitting |
| > 400 lines | Critical — must split |

For files exceeding thresholds, recommend a split strategy:
- Split by logical group (e.g., posts by year, portfolio by category)
- Maintain barrel `index.ts` with combined re-export
- Document the split pattern

---

## Step 5 — Barrel export integrity

For each directory under `/data/mock/`:

- [ ] Does an `index.ts` exist?
- [ ] Does it re-export ALL files in the directory?
- [ ] Are there files that exist but are NOT re-exported?
- [ ] Does the root `/data/mock/index.ts` re-export all sub-directory barrels?

---

## Step 6 — Content rules verification

- [ ] All string values use sentence case (per Guidelines.md)
- [ ] No hardcoded content exists in component files (search for string literals in JSX)
- [ ] All `seo.ts` entries correspond to existing page components
- [ ] Image URLs reference valid `figma:asset/` paths or Unsplash URLs (no broken links)
- [ ] Dates are in consistent format across all data files

---

## Step 7 — Data structure guidelines

Create `/guidelines/data-structure/README.md` with:

### Data file conventions
- One file per content domain
- Maximum 200 lines per file (split at 200+)
- Always import types from `/data/types/`
- Always export as named exports (for tree-shaking)
- Always include in barrel `index.ts`

### Splitting conventions
- When to split: file exceeds 200 lines
- How to split: by logical grouping (year, category, type)
- Barrel pattern: `index.ts` re-exports all splits with combined array
- Naming: `{domain}-{group}.ts` (e.g., `posts-timeline.ts`, `portfolio-festivals.ts`)

### Type-first workflow
1. Define or update type in `/data/types/{domain}.ts`
2. Create or update data in `/data/mock/{domain}/`
3. Update barrel export in `index.ts`
4. Import in component from `/data/mock`

### Adding a new data domain
1. Create type file: `/data/types/{domain}.ts`
2. Create data folder: `/data/mock/{domain}/`
3. Create data file(s) and `index.ts`
4. Add to root barrel: `/data/mock/index.ts`
5. Add guideline: `/guidelines/data-structure/{domain}.md`

### Field inventory
Document every data module with:
- File path
- Type reference
- Field list with types
- Consumer components
- Related SEO entry

---

## Output format

```markdown
## Data file inventory

[Table from Step 1]

## Type file inventory

[Table from Step 2]

## Alignment issues

| Data file | Field | Issue |
|---|---|---|
| `posts.ts` entry 5 | `author` | Missing (required by type) |

## Size violations

| File | Lines | Status | Split recommendation |
|---|---|---|---|

## Barrel export gaps

| Directory | Missing exports |
|---|---|

## Content rule violations

| File | Line | Issue |
|---|---|---|

## Guidelines draft

[Draft of `/guidelines/data-structure/README.md`]
```
