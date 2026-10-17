# Footer Component Audit

**Date:** March 8, 2026
**Status:** COMPLETE

## 1. Components Audited
- `/components/common/Footer.tsx`
- `/components/dev-tools/DevToolsFooter.tsx`

## 2. Findings
- **DevToolsFooter** is lightweight, containing only a back-to-home link and some copyright text.
- **Footer.tsx** contains the full site map (socials, columns of links, newsletter signup).
- BEM classes are used effectively (`.footer`, `.dev-tools-footer`).

## 3. Recommendations
- Merge into a single `/components/template-parts/Footer.tsx`.
- Support `variant="default" | "minimal" | "devtools"`.
