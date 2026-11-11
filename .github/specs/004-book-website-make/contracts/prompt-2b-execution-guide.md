# Figma Make Prompt 2B: Navigation Design Specification — Execution Guide

**Status**: ✅ UNBLOCKED & READY TO EXECUTE  
**Scope**: Design navigation component with all states and responsive breakpoints  
**Approval Gate**: Gates 1, 2 ✅ COMPLETE  
**Dependencies**: Prompt 1 (Navigation Exposure) — should execute first for context

---

## Executive Summary

Design the complete navigation component with all interactive states (default, hover, active) across all device breakpoints (desktop, tablet, mobile).

**Deliverable**: A comprehensive Figma component showing:
- 4 visible navigation items (Home, About, Book, Contact)
- 3 breakpoint designs (Desktop ≥1024px, Tablet 768-1023px, Mobile <768px)
- All interaction states (default, hover, active)
- Mobile drawer/hamburger interaction
- Approved typography and colors applied

**Outcome**: Implementation team has exact specification for building responsive navigation.

---

## The Work

### 1. Navigation Structure

**Visible Items** (after Prompt 1 - speaking/events/media removed):
1. Home (/)
2. About (/about)
3. Book (/book)
4. Contact (/contact)

### 2. Desktop Design (≥1024px)

**Layout**:
- Horizontal menu bar at top of page
- Links displayed inline, left-aligned
- Each link has spacing between

**States** (Approved Baseline):
- **Default**: Text color = Primary (#0B0B10 light / #F6F2EB dark)
- **Hover**: Text color = Accent (#FF3AAE hot pink — same in both themes)
- **Active**: Text color = Accent (#FF3AAE hot pink), bold weight (600 instead of 400)

**Typography**:
- Font: Inter
- Weight: 400 (default), 600 (active)
- Size: 16px

**Example Visuals**:
```text
┌─────────────────────────────────────────┐
│ Home    About    Book    Contact        │
│ ^^^^
│ default state (dark #0B0B10 / cream #F6F2EB)
│
│         ^^^^^^
│         hover state (hot pink #FF3AAE)
│
│ Book (bold, hot pink accent #FF3AAE)
│ ^^^^ active state
└─────────────────────────────────────────┘
```text

### 3. Tablet Design (768-1023px)

**Layout**:
- Same as desktop but with potential wrapping
- If space is constrained, links may wrap to second line
- Similar styling and spacing

**States**:
- Same as desktop (default, hover, active)

**Typography**:
- Font: Inter
- Weight: 400 (default), 600 (active)
- Size: 16px (or slightly smaller if space needed)

**Notes**:
- No hamburger menu needed at tablet width
- Full horizontal menu still visible
- Touch-friendly link spacing

### 4. Mobile Design (<768px)

**Layout**:
- Hamburger menu icon (≡) in top-right
- Icon triggers slide-out drawer on left or right side
- When drawer is closed: only hamburger icon visible
- When drawer is open: full-screen or near-full-screen overlay with menu

**Drawer Content**:
- Links stacked vertically
- Full width of drawer (typically 80-90% of screen width)
- Padding around each link for touch targets
- Semi-transparent backdrop/overlay behind drawer (dimmed background)

**States**:
- **Default**: Text color = Primary
- **Hover/Tap**: Text color = Accent
- **Active**: Text color = Accent, bold weight

**Drawer Interaction**:
- Hamburger icon toggles drawer open/closed
- Clicking link navigates and closes drawer
- Clicking backdrop/overlay closes drawer
- Smooth slide-in animation (from left or right)

**Typography**:
- Font: Inter
- Weight: 400 (default), 600 (active)
- Size: 16px (or 18px for better mobile touch targets)

**Example Visuals**:
```text
CLOSED:                    OPEN:
┌─────────────────────┐   ┌─────────────────────────┐
│              [≡]    │   │ ✕                       │
│                     │   │                         │
│                     │   │ Home                    │
│                     │   │ About                   │
│                     │   │ Book                    │
│                     │   │ Contact                 │
│                     │   │                         │
└─────────────────────┘   └─────────────────────────┘
                          (semi-transparent backdrop behind)
```text

---

## Design Specifications

### Color Palette (Approved)

| Property | Light Theme | Dark Theme |
|----------|-------------|-----------|
| Primary Text | #1a1a1a | #ffffff |
| Accent (hover/active) | #e8d4b8 | #d4a574 |
| Backdrop Overlay | rgba(0,0,0,0.5) | rgba(0,0,0,0.7) |

### Responsive Breakpoints

| Breakpoint | Width Range | Layout | Behavior |
|-----------|-------------|--------|----------|
| Desktop | ≥1024px | Horizontal menu | All links visible |
| Tablet | 768-1023px | Horizontal menu | All links visible |
| Mobile | <768px | Hamburger + drawer | Links hidden until toggled |

### Typography

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Nav Link (default) | Inter | 400 | 16px | Primary |
| Nav Link (hover) | Inter | 400 | 16px | Accent |
| Nav Link (active) | Inter | 600 | 16px | Accent |
| Hamburger Icon | — | — | 24px | Primary |

---

## Acceptance Criteria

All of these must be true when complete:

✅ **CR-2B.1**: Navigation displays ONLY approved visible items
- ✓ Home, About, Book, Contact
- ✗ No Speaking, Events, Media
- ✗ No other routes

✅ **CR-2B.2**: All states properly styled with approved colors
- Default: Primary color (#1a1a1a light or #ffffff dark)
- Hover: Accent color (#e8d4b8 light or #d4a574 dark)
- Active: Accent color + bold weight (600)

✅ **CR-2B.3**: Responsive behavior correct
- Desktop (≥1024px): Horizontal menu, all links visible
- Tablet (768-1023px): Horizontal menu, all links visible
- Mobile (<768px): Hamburger icon, drawer opens on click

✅ **CR-2B.4**: Typography correct
- Font: Inter (not Space Grotesk)
- Weight: 400 default, 600 active
- Size: 16px (or appropriately scaled)

✅ **CR-2B.5**: Mobile drawer documented
- Drawer opens/closes on hamburger icon click
- Overlay/backdrop visible when drawer open
- Links stacked vertically in drawer
- Tap-friendly spacing around links

✅ **CR-2B.6**: All breakpoints specified
- 1024px breakpoint documented (desktop/tablet divider)
- 768px breakpoint documented (tablet/mobile divider)
- Breakpoint values clearly labeled

---

## Step-by-Step Execution

### Phase 1: Create Desktop Navigation Component

1. Open ThisOneTimeOnAcidCom Figma file
2. Create or locate the Navigation component
3. Add 4 link items:
   - Home
   - About
   - Book
   - Contact
4. Set layout to horizontal (flex row)
5. Apply typography: Inter, 16px, weight 400
6. Set default text color to Primary (#1a1a1a for light theme)
7. Add spacing between links (e.g., 24px margin-right)

### Phase 2: Create Desktop States

1. **Default state**:
   - Text color: Primary (#1a1a1a)
   - Weight: 400
   - Create component instance or variant

2. **Hover state**:
   - Text color: Accent (#e8d4b8)
   - Weight: 400
   - Create as separate variant

3. **Active state**:
   - Text color: Accent (#e8d4b8)
   - Weight: 600 (bold)
   - Create as separate variant

4. Document each state clearly in Figma (use component variants or naming)

### Phase 3: Create Tablet Variant

1. Duplicate desktop navigation
2. Adjust width/spacing for tablet constraints
3. Apply same states (default, hover, active)
4. Document as 768-1023px breakpoint

### Phase 4: Create Mobile Navigation

1. **Closed State**:
   - Display only hamburger icon (≡) in top-right
   - Icon size: 24px
   - Icon color: Primary (#1a1a1a)

2. **Drawer Component**:
   - Create full-height slide-out drawer
   - Width: 80-90% of screen (or fixed width like 320px)
   - Background: Secondary (#ffffff light / #1a1a1a dark)
   - Shadow/elevation for depth

3. **Links in Drawer**:
   - Stacked vertically
   - Padding: 16px horizontal, 12px vertical per link
   - Typography: Inter, 16px, weight 400
   - Colors: Same as desktop (default, hover, active)

4. **Overlay/Backdrop**:
   - Semi-transparent overlay behind drawer
   - Color: rgba(0,0,0,0.5) to rgba(0,0,0,0.7)
   - Clicking overlay closes drawer

5. **Open State**:
   - Drawer slides in from left (or right)
   - Animation: Smooth 300ms transition
   - Hamburger icon becomes close icon (✕)

### Phase 5: Document Interactions

1. Create a flow diagram or notes showing:
   - Hamburger icon click → drawer opens
   - Link click → navigate + drawer closes
   - Overlay click → drawer closes

2. Label breakpoints clearly:
   - "Desktop (≥1024px)"
   - "Tablet (768-1023px)"
   - "Mobile (<768px)"

3. Add notes for developers:
   - "All links use Inter font"
   - "Active link is bold (weight 600)"
   - "Hover color is accent: #e8d4b8 (light) / #d4a574 (dark)"

### Phase 6: Apply Dark Theme

1. Create dark theme variant (if not already using theme-based colors)
2. Dark theme colors:
   - Primary text: #ffffff
   - Accent: #d4a574
   - Backdrop: rgba(0,0,0,0.7)
3. Apply to all states and breakpoints

### Phase 7: Validation

1. ✅ All 4 links visible
2. ✅ No hidden routes showing (speaking, events, media removed)
3. ✅ All states created (default, hover, active)
4. ✅ Desktop design complete
5. ✅ Tablet design complete
6. ✅ Mobile hamburger + drawer complete
7. ✅ All breakpoints labeled (1024px, 768px)
8. ✅ Correct typography (Inter, 16px)
9. ✅ Correct colors (primary + accent)
10. ✅ Interactions documented

---

## Deliverables

When Prompt 2B execution is complete, provide:

1. **Figma Component**
   - Navigation component with 4 visible items
   - Desktop variant (horizontal menu, all breakpoints)
   - Tablet variant (horizontal menu)
   - Mobile variant (hamburger + drawer)
   - All states (default, hover, active)

2. **Design Specification**
   - Breakpoints clearly labeled (1024px, 768px)
   - Color values documented
   - Typography specifications (font, weight, size)
   - State definitions (default, hover, active)

3. **Interaction Documentation**
   - How hamburger menu opens/closes
   - Drawer behavior and animation
   - Overlay interaction
   - Link navigation and drawer closing

4. **Validation Report**
   - Checklist confirming all 6 acceptance criteria met
   - Before/after comparison (if updating existing design)
   - Dark theme implementation status

---

## Success Definition

✅ **Prompt 2B is complete when**:
- Navigation component shows exactly 4 items (Home, About, Book, Contact)
- All 3 breakpoints designed (desktop, tablet, mobile)
- All states working (default, hover, active)
- Mobile drawer/hamburger fully specified
- Approved typography applied (Inter, 16px)
- Approved colors applied (primary + accent)
- All breakpoints labeled and documented
- All acceptance criteria (CR-2B.1 through CR-2B.6) verified
- Implementation team can build from specification

---

## Next Steps (After Prompt 2B)

Once Prompt 2B is complete:
- **Prompt 3A** can reference navigation design for form context
- Prompts 1, 2A, and 3A can execute in parallel
- Complete navigation specification ready for development
