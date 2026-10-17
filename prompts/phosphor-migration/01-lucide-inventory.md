# Sub-audit 1 — Lucide icon inventory

**Parent:** [orchestrator.md](./orchestrator.md)

## Instructions

1. Read `/lib/icons.ts` and list every exported icon name
2. Read `/lib/icons-set-a.tsx` through `icons-set-e.tsx` to confirm the count
3. Search all `.tsx` files for `from '...lib/icons'` — list each file and its imported icons
4. Search for the one legacy `from "lucide-react"` import in `AboutPage.tsx`
5. Search `/data/mock/` for string icon references (e.g., `icon: 'Music'`)
6. Search `/guidelines/` for Lucide import references
7. Compile into:
   - **Icon inventory table:** name, set file, consumer count
   - **Consumer file table:** file path, icons imported
   - **String reference table:** data file, icon strings used
   - **Guideline reference table:** `.md` file, Lucide references
8. Flag any icons in data files that aren't in `/lib/icons.ts`

## Output format

Write results to the "Sub-audit 1" section of `/reports/phosphor-migration/full-audit-report.md`.
