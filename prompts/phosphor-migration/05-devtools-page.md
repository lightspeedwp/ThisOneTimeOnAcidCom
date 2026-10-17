# Sub-audit 5 — Phosphor dev tools page specification

**Parent:** [orchestrator.md](./orchestrator.md)

## Instructions

Specify a new dev tools page at route `/dev-tools/phosphor-icons` that serves as the living icon reference for the Phosphor migration.

1. **Page features:**
   - Searchable grid of all Phosphor icons needed for the project (96+ entries)
   - Weight switcher — toggle between thin/light/regular/bold/fill/duotone with live preview
   - Size selector — 16/20/24/32/48px
   - Colour preview — toggle light/dark background
   - Copy-to-clipboard — import statement and JSX usage snippet
   - Side-by-side comparison panel — Lucide icon (current) vs Phosphor equivalent (new)
   - WCAG contrast badge per icon (pass/warning/fail based on weight + size + background)
   - Category filter — navigation, media, social, status, content, etc.
   - Migration status badge — "migrated" / "pending" / "Phosphor only" per icon

2. **Data structure:**
   - Create `/data/mock/ui/phosphor-icons.ts` with:
     ```ts
     interface PhosphorIconEntry {
       lucideName: string | null;    // null if Phosphor-only
       phosphorName: string;
       category: string;
       usedInFiles: string[];        // consumer file paths
       migrated: boolean;
       notes?: string;
     }
     ```
   - Populate from the mapping table in Sub-audit 2

3. **Component architecture:**
   - `PhosphorIconsPage.tsx` — page shell with Breadcrumbs, SEO, filters
   - Icon grid — responsive masonry or uniform grid
   - Icon card — shows icon at selected weight/size, names, copy button
   - Comparison modal — side-by-side Lucide vs Phosphor rendering
   - Filter bar — search input, weight selector, size selector, category pills

4. **Routing:**
   - Add to existing DevToolsPage hub (tool #24)
   - Route: `/dev-tools/phosphor-icons`
   - Breadcrumb: Home > Developer tools > Phosphor icons

5. **Existing reference:**
   - Model after `/components/pages/dev-tools/IconLibraryPage.tsx` (the current Lucide icon browser)
   - Reuse patterns: `ICON_MAP`, size selector, search, copy-to-clipboard

## Output format

Write the full specification to the "Sub-audit 5" section of `/reports/phosphor-migration/full-audit-report.md`.
