# Header Component Audit

**Date:** March 8, 2026
**Status:** COMPLETE

## 1. Components Audited
- `/components/common/Header.tsx`
- `/components/dev-tools/DevToolsHeader.tsx`

## 2. Findings
- **Redundancy:** There are two distinct header components. `DevToolsHeader` was created to support a different layout (search + specific layout controls) but shares 60% of logic with `Header.tsx`.
- **Styling:** Both use standard BEM CSS, but `DevToolsHeader` has extra light/dark mode overrides.
- **State Management:** Both handle scroll state (`isScrolled`) and mobile menu toggling.

## 3. Recommendations
- Merge into a single `/components/template-parts/Header.tsx` component.
- Use a `variant="default" | "devtools" | "minimal"` prop to toggle specific UI elements (like the search bar or layout switcher).
