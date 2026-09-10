# Sub-audit 6 — CSS file structure

**Parent:** [orchestrator.md](./orchestrator.md)
**Report:** `/reports/project-stability-audit/06-css-structure.md`

---

## Context

CSS cascade order is critical. If stylesheets load in the wrong order, base tokens are undefined when block styles reference them, causing invisible or broken layouts. The project uses a strict BEM architecture with CSS custom properties (design tokens). Tailwind V4 is the CSS engine, but raw Tailwind utility classes are forbidden in components — all styling goes through BEM classes defined in `/styles/`.

---

## Step 1 — CSS entry chain audit

Trace the complete CSS import chain from the application entry point:

### Entry point: `/main.tsx`
- [ ] What CSS files does `main.tsx` import?
- [ ] Is `globals.css` imported? (It should be the primary CSS entry)

### Primary CSS: `/styles/globals.css`
- [ ] Read `globals.css` in full
- [ ] List every `@import` statement in order
- [ ] Verify each `@import` target file exists
- [ ] Verify import order follows the correct cascade:
  1. **Tailwind directives** (`@tailwind base`, etc. or Tailwind V4 equivalents)
  2. **Design tokens** (`/styles/tokens/*.css`)
  3. **Animations** (`/styles/animations.css`)
  4. **Base/global styles** (body, headings, links, typography classes)
  5. **Block styles** (`/styles/blocks/*.css`)
  6. **Component styles** (`/styles/components/*.css`)
  7. **Print styles** (if any)

### Token files: `/styles/tokens/`
- [ ] List all files: `content-animations.css`, `content-colors.css`, `content-interactive.css`, `content-layouts.css`, `content-typography.css`
- [ ] Verify each is imported by `globals.css`
- [ ] Verify token CSS custom properties are defined before they are referenced by block styles

### Block files: `/styles/blocks/`
- [ ] List all ~110 block CSS files
- [ ] For each file, determine HOW it is imported:
  - Imported by `globals.css` via `@import`?
  - Imported directly by its component via `import '../styles/blocks/...'`?
  - Both? (potential duplicate loading)
  - Neither? (orphaned — classes may be undefined at runtime)

### Component files: `/styles/components/`
- [ ] List all component CSS files
- [ ] Verify each is imported by its component

---

## Step 2 — Missing CSS imports

Cross-reference components against CSS files:

- [ ] For each page component, check if it has a corresponding CSS file in `/styles/blocks/`
- [ ] For each CSS file, check if it is imported somewhere (globals.css OR component)
- [ ] Flag CSS files that exist but are never imported (orphaned CSS)
- [ ] Flag components that use BEM classes but don't import any CSS (relying on cascade alone)

---

## Step 3 — Tailwind leakage audit

Search all `.tsx` files for class names that are NOT defined in the project CSS:

**Allowed project utility classes** (defined in `globals.css`):
- `.text-center`, `.font-bold` — layout helpers
- `.mb-fluid-*`, `.gap-fluid-*` — spacing utilities
- `.inline-flex-center` — flex helper
- `.text-gradient-*` — gradient text classes
- `.text-hero-h1`, `.text-section-h2`, `.text-body-*` — typography classes
- `.container-*`, `.section-container` — layout containers
- `.bg-atomic-noise`, `.section-spacing`, `.px-horizontal-section` — section utilities

**Forbidden raw Tailwind utilities** (no CSS definition):
- `flex`, `grid`, `block`, `hidden`, `inline`
- `p-*`, `m-*`, `px-*`, `py-*`, `mx-*`, `my-*` (except project-defined `mb-fluid-*`)
- `w-*`, `h-*`, `min-w-*`, `max-w-*`
- `text-*` (except project-defined typography classes)
- `bg-*` (except project-defined backgrounds)
- `border-*`, `rounded-*`, `shadow-*`
- `flex-row`, `flex-col`, `flex-wrap`, `items-*`, `justify-*`
- `gap-*` (except project-defined `gap-fluid-*`)
- `z-*`, `relative`, `absolute`, `fixed`, `sticky`
- `opacity-*`, `transition-*`, `duration-*`
- Any class with `[` brackets (arbitrary values like `w-[300px]`)

**How to check:** For each `className` attribute, split into individual class names and verify each is either:
1. Defined in a CSS file (search for `.{className} {` or `.{className},`)
2. A known project utility class from the list above
3. A BEM class following the `block__element--modifier` pattern that IS defined

**Output:** List of all undefined class names with file path and line number.

---

## Step 4 — CSS custom properties inventory

List ALL CSS custom properties (`--wp--*`, `--*`) defined in:
- `/styles/globals.css`
- `/styles/tokens/*.css`
- `/styles/blocks/*.css` (local properties)

Cross-reference with `/guidelines/design-tokens/` documentation:
- [ ] Are all defined properties documented?
- [ ] Are there documented properties that no longer exist in CSS?
- [ ] Are there CSS properties that are not documented?

---

## Step 5 — Light/dark mode completeness

For each neon colour class and component class that sets colour:
- [ ] Does it have a `.dark` variant? (e.g., `.dark .hero__title { color: ... }`)
- [ ] Does the dark variant use the correct neon token (full brightness for dark, text variant for light)?

---

## Step 6 — Reduced motion compliance

For each CSS file that defines `transition`, `animation`, or `transform`:
- [ ] Does it have a corresponding `@media (prefers-reduced-motion: reduce)` block?
- [ ] Does the reduced motion block disable or simplify all animations?

Reference: `/guidelines/prefers-reduced-motion.md`

---

## Step 7 — CSS guidelines update

Update `/guidelines/css-architecture.md` with:

### How to add a new CSS file
1. Create `/styles/blocks/{block-name}.css`
2. Define BEM classes: `.block`, `.block__element`, `.block--modifier`
3. Import in your component: `import '../../styles/blocks/{block-name}.css'`
4. OR add `@import './blocks/{block-name}.css'` to `globals.css`
5. Add `.dark` variants for all colour properties
6. Add `@media (prefers-reduced-motion: reduce)` for any animations
7. Verify CSS loads in dev tools (Network tab)

### CSS import order rules
- `globals.css` must be imported first in `main.tsx`
- Within `globals.css`, imports follow: tailwind → tokens → animations → base → blocks → components
- Never import the same CSS file twice (once in globals.css AND once in component)

### Future CSS structure
Document planned expansions:
- `/styles/theme-light.css` — Dedicated light mode overrides
- `/styles/theme-dark.css` — Dedicated dark mode overrides
- `/styles/theme-variables.css` — CSS custom property presets

---

## Output format

```markdown
## CSS import chain

main.tsx
└── globals.css
    ├── @tailwind directives
    ├── tokens/content-colors.css
    ├── tokens/content-typography.css
    ├── ...
    ├── animations.css
    ├── blocks/header.css
    ├── blocks/hero.css
    ├── ...
    └── components/typeform-embed.css

## Missing imports

| CSS file | Expected importer | Status |
|---|---|---|

## Orphaned CSS files

| File | Classes defined | Classes used | Recommendation |
|---|---|---|---|

## Tailwind leakage

| File | Line | Class name | Status |
|---|---|---|---|

## Custom properties inventory

| Property | File | Documented? |
|---|---|---|

## Light/dark mode gaps

| Class | Has dark variant? | File |
|---|---|---|

## Reduced motion gaps

| CSS file | Has animations? | Has reduced motion? |
|---|---|---|
```
