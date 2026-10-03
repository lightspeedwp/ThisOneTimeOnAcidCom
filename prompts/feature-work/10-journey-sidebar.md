# Sub-audit 10: Journey Sidebar Enhancement

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY

---

## Objective

Enhance the reading experience specifically on the `/about/journey/` page by making the ChapterNav sidebar fixed/sticky upon scrolling.

---

## Requirements

1. **Fixed/Sticky Behavior:**
   - Target the `ChapterNav` component.
   - Refactor its CSS and layout parent inside the `/about/journey/` layout.
   - It should behave as a sticky sidebar (`position: sticky; top: var(--header-height);`) so it follows the user as they read long-form content.

2. **Scope Constraint:**
   - This fixed behavior must **ONLY** apply to the main Journey page.
   - Do **NOT** apply it to the Hidden About Page (the 21 sub-page landing).
   - Do **NOT** apply it to the individual sub-pages.

3. **Responsive Degradation:**
   - On mobile/tablet where sidebars are hidden or stacked, ensure the sticky behavior gracefully falls back to static or an off-canvas menu toggle to preserve screen real estate.

---

## Deliverables

- Updated `/styles/blocks/chapter-nav.css` or layout-specific modifier class (e.g. `.layout__sidebar--sticky`).
- Verified implementation on the `/about/journey/` route.
- Testing across standard breakpoints.
