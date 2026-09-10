# Sub-audit 2 — Phosphor equivalents mapping

**Parent:** [orchestrator.md](./orchestrator.md)

## Instructions

1. For each of the 96 Lucide icons in `/lib/icons.ts`, find the `@phosphor-icons/react` equivalent
2. Categorise each mapping:
   - ✅ Same name (e.g., `Play` → `Play`)
   - ⚠️ Renamed (e.g., `ChevronDown` → `CaretDown`)
   - ❌ No equivalent — recommend closest alternative
3. Test `import { IconName } from '@phosphor-icons/react'` in the Figma Make bundler
4. Document Phosphor's 6 weight variants with visual descriptions:
   - `thin` (1px stroke equivalent)
   - `light` (1.5px stroke equivalent)
   - `regular` (default, ~2px stroke equivalent — closest to Lucide)
   - `bold` (~3px stroke equivalent)
   - `fill` (solid filled icon)
   - `duotone` (two-tone with primary + 20% opacity secondary layer)
5. Recommend default weight for the project
6. Note any Phosphor icons that are superior alternatives

## Key references

- Phosphor icon explorer: https://phosphoricons.com/
- Phosphor React docs: https://github.com/phosphor-icons/react
- Current icon base types: `/lib/icon-base.tsx`

## Output format

Write results to the "Sub-audit 2" section of `/reports/phosphor-migration/full-audit-report.md`.
