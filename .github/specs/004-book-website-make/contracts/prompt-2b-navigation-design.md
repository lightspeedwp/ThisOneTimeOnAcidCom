# Figma Make Prompt 2B: Navigation Design Specification

**Status**: ✅ UNBLOCKED  
**Priority**: P1  
**Prompt ID**: 2B  
**Type**: navigation-design

---

## Specification

### Goal

Generate exact navigation component design with all states (default, hover, active, mobile), using approved design baseline (Space Grotesk headings, Inter body, 9-color palette).

### Visible Navigation Items (Post-Prompt 1)

- Home (/)
- About (/about)
- Book (/book)
- Contact (/contact)

### Component States

**Desktop (≥1024px)**:
- Default: Links in horizontal menu bar
- Hover: Text color changes to accent (#FF3AAE hot pink — same in both themes)
- Active: Current page link bold, accent color (#FF3AAE hot pink)

**Tablet (768-1023px)**:
- Same as desktop with possible wrapping
- Menu may compress based on space

**Mobile (<768px)**:
- Hamburger menu icon
- Drawer/slide-out navigation on icon click
- All links stacked vertically
- Overlay/backdrop when drawer open

### Figma Make Instructions

1. Create or update Navigation component with 4 visible links
2. Add state variations (default, hover, active) for each breakpoint
3. Use approved typography (Inter for links)
4. Use approved colors (primary text, #FF3AAE hot pink accent on hover/active)
5. Document responsive breakpoints (1024px, 768px)
6. Export component states for implementation

### Acceptance Criteria

✅ **CR-2B.1**: Navigation displays only approved visible items (4 links)

✅ **CR-2B.2**: All states (default, hover, active) properly styled with approved colors

✅ **CR-2B.3**: Responsive behavior correct (horizontal desktop, hamburger mobile)

✅ **CR-2B.4**: Typography: Inter font for navigation links

✅ **CR-2B.5**: Mobile drawer overlay and interaction documented

✅ **CR-2B.6**: All breakpoints specified (1024px, 768px)

### Dependencies

- Prompt 1 (Navigation Exposure) — Should execute first

### Reference Documents

- Design Baseline: 04-design-brief.md (v1.1.2)
- Navigation Hidden Routes: Prompt 1 (Speech, Events, Media not included)

---

## Validation Checklist

- [ ] Navigation component updated in Figma
- [ ] 4 visible links (Home, About, Book, Contact)
- [ ] All states designed (default, hover, active)
- [ ] Responsive design for 3 breakpoints (desktop, tablet, mobile)
- [ ] Typography: Inter font applied
- [ ] Colors: Approved palette used (primary + accent)
- [ ] Mobile drawer documented and designed
- [ ] All acceptance criteria met
