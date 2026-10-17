# Sub-audit 5 — TS and TSX imports

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/05-imports-audit.md`

---

## Context

Import errors are the most common cause of build failures and blank-screen renders in the Figma Make bundler. A single unresolved import silently breaks the entire component tree. This audit systematically verifies every import statement in the codebase.

---

## Step 1 — Unresolved import detection

For each `.tsx` and `.ts` file in the project, verify every `import` statement resolves to an existing file or installed package:

**Directories to scan:**
- `/components/` (all subdirectories)
- `/hooks/`
- `/utils/`
- `/lib/`
- `/data/` (all subdirectories)
- `/App.tsx`, `/main.tsx`, `/routes.ts`

**Checks per file:**
- [ ] Relative imports (`./`, `../`) — does the target file exist?
- [ ] Barrel imports (`from '../data/mock'`) — does the barrel `index.ts` export the requested symbol?
- [ ] Package imports (`from 'react'`, `from 'react-router'`) — is the package in `package.json`?
- [ ] CSS imports (`import '../styles/blocks/...'`) — does the CSS file exist?
- [ ] Asset imports (`from 'figma:asset/...'`) — is the asset path valid?
- [ ] SVG imports (`from './imports/svg-...'`) — does the SVG file exist?

**Output:** Table of all unresolved imports with file path, line number, and target.

---

## Step 2 — Circular dependency detection

Map the import graph and identify circular chains:

1. Build a dependency graph: for each file, list all files it imports
2. Walk the graph depth-first to detect cycles
3. Record each cycle chain (e.g., `A.tsx → B.tsx → C.tsx → A.tsx`)

**Common circular dependency patterns to check:**
- Component A imports Component B which imports Component A
- Utility imports a hook that imports the same utility
- Data file imports a type that imports the same data file
- Router imports a page that imports router utilities

**Output:** List of circular dependency chains (or "None found").

---

## Step 3 — Unused import detection

For each file, verify every imported symbol is actually used:

- [ ] Named imports: is every `{ Foo, Bar }` used in JSX or code body?
- [ ] Default imports: is the default import used?
- [ ] Namespace imports (`import * as X`) — are any properties of X accessed?
- [ ] Type-only imports (`import type { ... }`) — are they used in type annotations?
- [ ] CSS side-effect imports (`import './styles/...'`) — are BEM classes from that CSS file used in the component's JSX `className` attributes?

**Output:** Table of unused imports with file path, imported symbol, and recommendation (remove).

---

## Step 4 — Duplicate import detection

Check for files that import the same module multiple times:

```tsx
// BAD: Duplicate import
import { Foo } from './utils';
import { Bar } from './utils';  // Should be merged with line above

// GOOD: Single import
import { Foo, Bar } from './utils';
```

**Output:** List of duplicate imports with file path and line numbers.

---

## Step 5 — Import order verification

Verify import statements follow the project convention:

1. **CSS imports** (side-effect) — first
2. **React/framework imports** — second
3. **Third-party package imports** — third
4. **Project utility/hook imports** — fourth
5. **Component imports** — fifth
6. **Data/type imports** — sixth
7. **Asset imports** (images, SVGs) — last

**Note:** This is a guideline check, not a strict enforcement. Flag files with significantly disordered imports.

---

## Step 6 — Bundler-forbidden patterns in imports

Search for patterns that break the Figma Make bundler:

- [ ] `import.meta.env` — completely forbidden
- [ ] Optional chaining in import paths — forbidden
- [ ] Dynamic `import()` with template literals — may break
- [ ] Re-exports with `export * from` that create deep chains — may cause memory issues
- [ ] Barrel files that re-export very large modules — may exceed memory

---

## Step 7 — Package version check

Compare `import` package names against `package.json`:

- [ ] Every imported package exists in `dependencies` or `devDependencies`
- [ ] No packages are in `package.json` but never imported (unused packages)
- [ ] Check for known incompatible package versions (react-router-dom vs react-router, etc.)

---

## Output format

```markdown
## Unresolved imports

| File | Line | Import target | Issue |
|---|---|---|---|
| `/components/pages/...` | 5 | `../missing/file` | File does not exist |

## Circular dependencies

| Chain | Files involved |
|---|---|
| None found | — |

## Unused imports

| File | Symbol | Type | Recommendation |
|---|---|---|---|
| `BlogPage.tsx` | `useState` | Named | Remove |

## Duplicate imports

| File | Module | Lines |
|---|---|---|

## Import order issues

| File | Issue |
|---|---|

## Bundler-forbidden patterns

| File | Line | Pattern | Fix |
|---|---|---|---|

## Package health

| Package | In package.json | Imported | Status |
|---|---|---|---|
```
