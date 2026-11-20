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
- Hover: Text color changes to accent (#FF3AAE hot pink — same in both themes) and the link gains underline emphasis, so colour is not the only state cue
- Active: Current page link bold, accent color (#FF3AAE hot pink)

**Tablet (768-1023px)**:
- Same as desktop with possible wrapping
- Menu may compress based on space

**Mobile (<768px)**:
- Hamburger menu icon
- Drawer/slide-out navigation on icon click
- All links stacked vertically
- Overlay/backdrop when drawer open

### Figma Make Instructions (Deprecated)

1. Create or update Navigation component with 4 visible links
2. Add state variations (default, hover, active) for each breakpoint
3. Use approved typography (Inter for links)
4. Use approved colors (primary text, #FF3AAE hot pink accent on hover/active) and add underline emphasis to the hover state
5. Document responsive breakpoints (1024px, 768px)
6. Export component states for implementation

---

## Claude Execution

### Input Specification

Claude receives:
- Navigation spec from Prompt 1 (4 visible links: Home, About, Book, Contact)
- Design baseline (typography: Inter, colors: approved palette with #FF3AAE hot pink)
- Responsive breakpoints (1024px desktop, 768px tablet, <768px mobile)
- Decision 7 approval (Option A selected)
- Design register guidance (hover emphasis + underline)

### Output Specification

Claude produces a **TypeScript component spec document** containing:

1. **Component Interface** (TypeScript)
   ```typescript
   interface NavigationProps {
     currentPath: string;
     isOpen?: boolean;
     onMenuToggle?: () => void;
     items?: NavItem[];
   }

   interface NavItem {
     label: string;
     href: string;
     isActive?: boolean;
     isHidden?: boolean;
   }
   ```

2. **State & Variant Matrix** (markdown table)

   | Breakpoint | State | Style | Notes |
   | --- | --- | --- | --- |
   | Desktop (≥1024px) | default | Horizontal menu, Inter font, text color #F6F2EB | Links stacked horizontally |
   | Desktop (≥1024px) | hover | Accent pink (#FF3AAE) + underline (2px solid) | Underline emphasizes state |
   | Desktop (≥1024px) | active | Accent pink (#FF3AAE) + bold font | Current page |
   | Tablet (768–1023px) | default | Horizontal menu, may wrap | Responsive wrapping |
   | Tablet (768–1023px) | hover/active | Same as desktop | Underline emphasis maintained |
   | Mobile (<768px) | default | Hamburger icon visible, menu closed | Icon at top-right |
   | Mobile (<768px) | open | Drawer overlay, links stacked vertically | Slide-in drawer from side |
   | Mobile (<768px) | link hover | Accent pink (#FF3AAE) + underline | Underline in drawer too |

3. **Responsive CSS Structure** (SCSS pseudo-code)
   ```scss
   /* Navigation Component */
   .nav {
     font-family: var(--font-body); /* Inter */
     color: var(--nav-link-color);
     
     &__link {
       text-decoration: none;
       transition: all 0.2s ease;
       
       &:hover {
         color: var(--nav-link-color-hover); /* #FF3AAE */
         text-decoration: underline;
         text-decoration-thickness: 2px;
       }
       
       &:active, &.active {
         color: var(--nav-link-color-active); /* #FF3AAE */
         font-weight: bold;
         text-decoration: underline;
       }
     }
   }

   /* Mobile Hamburger */
   @media (max-width: 768px) {
     .nav {
       /* Hamburger menu styles */
       &__menu { display: none; }
       &__toggle { display: block; }
       
       &.open __menu { display: flex; flex-direction: column; }
     }
   }
   ```

4. **Accessibility Checklist** (WCAG 2.2 AA)
   - [ ] Link text is descriptive (Home, About, Book, Contact)
   - [ ] Hover state distinguishable without color (underline emphasis)
   - [ ] Focus state visible (outline or underline)
   - [ ] Mobile drawer has backdrop overlay (focus trap)
   - [ ] Keyboard navigation works (Tab through links, Enter/Space to open menu)
   - [ ] ARIA attributes: `role="navigation"`, `aria-label="Main Navigation"`
   - [ ] Hidden links not in DOM (or `display: none`, not `visibility: hidden`)
   - [ ] Mobile drawer uses `aria-hidden` on backdrop

5. **Implementation Notes** (developer guidance)
   - Navigation component should be responsive-first
   - Hamburger icon: 3-line icon, standard size (24px×24px)
   - Drawer overlay: semi-transparent backdrop (opacity 0.5–0.7)
   - Transitions smooth (0.2–0.3s easing)
   - Mobile drawer: slide in from left (or right, consistency check)

6. **Validation Against Acceptance Criteria** (CR-2B.1 through CR-2B.6)
   - CR-2B.1: 4 visible links — ✅ (Home, About, Book, Contact)
   - CR-2B.2: States (default, hover, active) with colors + underline — ✅
   - CR-2B.3: Responsive (horizontal desktop, hamburger mobile) — ✅
   - CR-2B.4: Typography (Inter) — ✅
   - CR-2B.5: Mobile drawer documented — ✅
   - CR-2B.6: Breakpoints specified (1024px, 768px) — ✅

### Validation Criteria

✅ TypeScript interfaces are valid and complete  
✅ State/variant matrix covers all breakpoints and states  
✅ SCSS structure is implementation-ready  
✅ Accessibility checklist complete (WCAG 2.2 AA)  
✅ Hover state has underline + color (not color alone)  
✅ Responsive breakpoints clear (1024px, 768px)  
✅ All acceptance criteria (CR-2B.1 through CR-2B.6) explicitly addressed  

### Acceptance Criteria

✅ **CR-2B.1**: Navigation displays only approved visible items (4 links)

✅ **CR-2B.2**: All states (default, hover, active) properly styled with approved colors; hover adds underline emphasis and remains distinguishable without relying on colour alone (per `references/05-design-reader-decision-register.md`, Hover emphasis and Inline links)

✅ **CR-2B.3**: Responsive behavior correct (horizontal desktop, hamburger mobile)

✅ **CR-2B.4**: Typography: Inter font for navigation links

✅ **CR-2B.5**: Mobile drawer overlay and interaction documented

✅ **CR-2B.6**: All breakpoints specified (1024px, 768px)

### Dependencies

- Prompt 1 (Navigation Exposure) — Should execute first

### Reference Documents

- Design Baseline: `.github/specs/004-book-website-make/references/04-design-brief.md` (v1.1.2)
- Navigation Hidden Routes: Prompt 1 (Speaking, Events, Media not included)

---

## Validation Checklist

- [ ] Navigation component updated in Figma
- [ ] 4 visible links (Home, About, Book, Contact)
- [ ] All states designed (default, hover, active)
- [ ] Responsive design for 3 breakpoints (desktop, tablet, mobile)
- [ ] Typography: Inter font applied
- [ ] Colors: Approved palette used (primary + accent)
- [ ] Hover state has underline emphasis and is distinguishable without colour (for example, in a greyscale check)
- [ ] Mobile drawer documented and designed
- [ ] All acceptance criteria met
