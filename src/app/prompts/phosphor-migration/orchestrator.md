# Phosphor Icons migration — orchestrator prompt

**Version:** 1.0.0
**Created:** March 3, 2026
**Purpose:** Audit all Lucide React icon usage, plan a phased migration to `@phosphor-icons/react`, and produce actionable deliverables.

---

## Objective

Migrate the icon system from hand-rolled Lucide SVG wrappers (`/lib/icons-set-*.tsx`) to `@phosphor-icons/react` as a direct import. The migration runs in two phases:

1. **Phase 1 (parallel):** Install Phosphor alongside Lucide. New components use Phosphor directly. Build a Phosphor dev tools page and iconography guide.
2. **Phase 2 (replacement):** Migrate existing 77+ consumer files from `/lib/icons` barrel to `@phosphor-icons/react` imports. Remove `/lib/icons-set-*.tsx` files.

---

## Sub-audits

Run each sub-audit in sequence. Each produces a section in the consolidated report at `/reports/phosphor-migration/full-audit-report.md`.

### Sub-audit 1 — Lucide icon inventory

**File:** `/prompts/phosphor-migration/01-lucide-inventory.md`

Scope:
- List every unique icon name exported from `/lib/icons.ts` (currently 96)
- List every `.tsx` file that imports from `/lib/icons` or `lucide-react`, with the specific icons imported
- List every `.ts` mock data file that references icon names as strings
- List every guideline `.md` file that references Lucide imports
- Count total import statements, total unique icons, and total consumer files
- Flag any icons referenced in data files but missing from `/lib/icons.ts`

Output: Complete inventory table in report.

### Sub-audit 2 — Phosphor equivalents mapping

**File:** `/prompts/phosphor-migration/02-phosphor-mapping.md`

Scope:
- For each of the 96 Lucide icons, find the exact `@phosphor-icons/react` equivalent
- Categorise: ✅ same name, ⚠️ renamed, ❌ no direct equivalent (needs alternative)
- Document Phosphor's 6 weight variants: thin, light, regular, bold, fill, duotone
- Recommend a default weight that best matches Lucide's stroke aesthetic (likely `regular` or `light`)
- Test whether `import { IconName } from '@phosphor-icons/react'` works in the Figma Make bundler
- If direct import fails, document the `@phosphor-icons/core` fallback strategy
- Note any Phosphor icons that offer superior metaphors for the project's use cases

Output: Full mapping table (Lucide name → Phosphor name → status) in report.

### Sub-audit 3 — WCAG AA icon accessibility audit

**File:** `/prompts/phosphor-migration/03-accessibility-audit.md`

Scope:
- Audit icon contrast ratios in both light mode and dark mode across all CSS files
- Verify all icons have appropriate `aria-hidden="true"` or `aria-label` attributes
- Check icon sizing meets WCAG touch target minimums (44×44px for interactive icons)
- Audit hover/focus states on interactive icons for sufficient contrast delta
- Review icon animations for `prefers-reduced-motion` compliance
- Assess each Phosphor weight variant for accessibility:
  - `thin` / `light` — may fail contrast on small sizes or low-contrast backgrounds
  - `regular` — baseline safe
  - `bold` — safe, higher visibility
  - `fill` — solid, highest contrast
  - `duotone` — secondary layer at 20% opacity may fail contrast
- Recommend which weights are safe for which contexts (decorative vs interactive vs informational)
- Cross-reference with existing WCAG compliance report at `/guidelines/accessibility-report-feb-2025.md`

Output: Accessibility findings table with violations and recommendations.

### Sub-audit 4 — Iconography design tokens guide

**File:** `/prompts/phosphor-migration/04-design-tokens-guide.md`

Scope:
- Define icon design tokens for `/guidelines/design-tokens/iconography.md`:
  - Size scale: `--icon-xs` (12px), `--icon-sm` (16px), `--icon-md` (20px), `--icon-lg` (24px), `--icon-xl` (32px), `--icon-2xl` (48px)
  - Weight mapping: when to use each of the 6 Phosphor weights
  - Color tokens: icon colors for light/dark mode, interactive states, disabled, error, success
  - Spacing: margin/padding around icons in buttons, nav items, cards
  - Animation tokens: icon transition timing, hover scale, reduced-motion alternatives
- Define BEM classes for icon containers: `.icon`, `.icon--sm`, `.icon--lg`, `.icon--interactive`, `.icon--decorative`
- Define how Phosphor's `weight` prop maps to the project's visual hierarchy
- Define duotone opacity tokens and when duotone is appropriate

Output: Complete draft of `iconography.md` guideline file.

### Sub-audit 5 — Phosphor dev tools page specification

**File:** `/prompts/phosphor-migration/05-devtools-page.md`

Scope:
- Specify a new dev tools page at `/dev-tools/phosphor-icons`
- Features:
  - Searchable grid of all Phosphor icons needed for the project
  - Weight switcher (thin/light/regular/bold/fill/duotone) with live preview
  - Size selector (16/20/24/32/48)
  - Color preview against light and dark backgrounds
  - Copy-to-clipboard for import statements
  - Side-by-side comparison: current Lucide icon vs Phosphor equivalent
  - WCAG contrast indicator per icon/weight/background combination
- Data structure: array of icon entries with `lucideName`, `phosphorName`, `category`, `usedIn` (file list)
- Component architecture: page shell, icon grid, icon card, filter bar, comparison modal
- Routing: add to DevToolsPage hub under existing dev-tools routes

Output: Component specification and data structure in report.

### Sub-audit 6 — Migration task plan

**File:** `/prompts/phosphor-migration/06-migration-tasks.md`

Scope:
- Phase 1 tasks (parallel operation):
  - Install `@phosphor-icons/react`
  - Create iconography design tokens guide
  - Create Phosphor dev tools page
  - Create Phosphor icon comparison data file
  - Update `overview-icons.md` guidelines
  - Write `PhosphorIcon` wrapper component (if needed for BEM class application)
- Phase 2 tasks (file-by-file migration):
  - Group consumer files by priority (common → ui → pages)
  - For each file: update import, swap component names, verify weight prop
  - Update mock data string references
  - Update `IconLibraryPage.tsx` to show Phosphor instead of Lucide
  - Update `StyleGuidePage.tsx` type references
  - Remove `/lib/icons-set-*.tsx`, `/lib/icon-base.tsx`, `/lib/icons.ts`
  - Update `vite.config.ts`
  - Update all guideline `.md` files
- Verification:
  - Type-check, build, visual regression per batch
  - Light mode + dark mode spot-check
  - Lighthouse accessibility re-audit

Output: Prioritised task list with file counts and effort estimates.

---

## Deliverables

| Deliverable | Location |
|---|---|
| Orchestrator prompt | `/prompts/phosphor-migration/orchestrator.md` (this file) |
| Sub-prompts (6) | `/prompts/phosphor-migration/01-*.md` through `06-*.md` |
| Full audit report | `/reports/phosphor-migration/full-audit-report.md` |
| Task list | `/tasks/phosphor-migration-tasks.md` |
| Iconography guide | `/guidelines/design-tokens/iconography.md` (created during Phase 1) |
| Phosphor dev tools page | `/components/pages/dev-tools/PhosphorIconsPage.tsx` (created during Phase 1) |

---

## Cross-references

- [Previous investigation report](../../reports/phosphor-migration/report.md)
- [Current icon system guide](../../guidelines/overview-icons.md)
- [Icon interface guide](../../guidelines/icons/interface.md)
- [WCAG accessibility report](../../guidelines/accessibility-report-feb-2025.md)
- [Reduced motion guide](../../guidelines/prefers-reduced-motion.md)
- [Neon color system](../../guidelines/design-tokens/neon-colors.md)
- [Animation system](../../guidelines/design-tokens/animations.md)
