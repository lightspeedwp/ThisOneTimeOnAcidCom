# Breadcrumbs Component Audit

**Date:** March 8, 2026
**Status:** COMPLETE

## 1. Components Audited
- `/components/ui/Breadcrumbs.tsx`
- `/components/common/AutoBreadcrumbs.tsx`

## 2. Findings
- **Data Structure:** `Breadcrumbs.tsx` expects a manual array of `{ label, href }` items. `AutoBreadcrumbs.tsx` attempts to infer it from the router.
- **Accessibility:** `Breadcrumbs.tsx` correctly implements `aria-label="Breadcrumb"` and schema.org JSON-LD.
- **Styling:** Uses `/styles/blocks/breadcrumbs.css`. Dev Tools have a separate file `/styles/blocks/dev-tools-breadcrumbs.css`.

## 3. Recommendations
- Create a unified Template Part for Breadcrumbs.
- Merge the styles so `variant="devtools"` can trigger the correct styling without a separate component.
