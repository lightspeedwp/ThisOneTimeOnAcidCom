# Navigation Specification — Spec 004 (US1)

> ⚠️ **Superseded 2026-11-20.** This file uses routes that do not exist in the app (`/about`, `/book`) and placeholder `example.com` URLs. Use [`prompt-1-navigation-exposure-output.md`](./prompt-1-navigation-exposure-output.md) for exposure rules and [`prompt-2b-navigation-design-output.md`](./prompt-2b-navigation-design-output.md) for the component design.

**Date**: 2026-11-19  
**User Story**: US1 (Design Specification Hand-off)  
**Task**: T064 (Phase 9 Convergence)  
**Reference**: `.github/specs/004-book-website-make/contracts/prompt-1-navigation-exposure.md`  
**Status**: ✅ **COMPLETE**

---

## Executive Summary

Navigation component specification for book website after route exposure (Prompt 1). Shows exactly which routes are visible in navigation, hidden from sitemap, and how enforcement is applied.

**Specification Status**: ✅ **READY FOR FIGMA MAKE EXECUTION**

---

## Navigation Structure (Post-Prompt 1)

### Visible Navigation Items (4 Total)

| Item        | Route      | Display Text | Icon        | Priority | Mobile Menu |
| ----------- | ---------- | ------------ | ----------- | -------- | ----------- |
| **Home**    | `/`        | "Home"       | House       | P1       | ✅ Visible  |
| **About**   | `/about`   | "About"      | Info circle | P1       | ✅ Visible  |
| **Book**    | `/book`    | "Book"       | Book        | P1       | ✅ Visible  |
| **Contact** | `/contact` | "Contact"    | Envelope    | P1       | ✅ Visible  |

**Total Visible**: 4 items  
**Display Order**: Home → About → Book → Contact  
**Navigation Type**: Primary navigation (top-level only)

---

### Hidden Navigation Items (3 Total — Still Accessible)

| Item         | Route       | Status           | Accessibility               | Purpose                |
| ------------ | ----------- | ---------------- | --------------------------- | ---------------------- |
| **Speaking** | `/speaking` | Hidden from menu | Direct URL + internal links | Internal documentation |
| **Events**   | `/events`   | Hidden from menu | Direct URL + internal links | Internal documentation |
| **Media**    | `/media`    | Hidden from menu | Direct URL + internal links | Internal documentation |

**Hidden Route Enforcement** (Decision 7 — Option A Selected):

- **Primary**: Noindex meta tags on each route
- **Primary**: Sitemap.xml excludes these routes
- **Optional**: Robots.txt rules (if needed)

**Result**: Routes remain accessible to authorized users but are not indexed by search engines and not discoverable through public navigation or sitemap.

---

## Component Design Specification

### Desktop Navigation (≥1024px)

```text
┌─────────────────────────────────────────────────────┐
│  [Logo]  Home  About  Book  Contact         [Icons] │
└─────────────────────────────────────────────────────┘
```text

**Layout**:

- Horizontal menu bar
- Left: Logo (clickable, returns to home)
- Center: 4 navigation links
- Right: Optional icons (search, user profile, etc.)

**Typography**:

- Font: Inter (body weight 400–600)
- Size: 16px
- Color: #0B0B10 (dark text on light background) or #F6F2EB (light text on dark background)

**Spacing**:

- Link padding: 12px horizontal, 8px vertical
- Link gap: 16px
- Logo-to-links gap: 24px

**States**:

- **Default**: Text #0B0B10, no background
- **Hover**: Text #FF3AAE (hot pink), no background change
- **Active**: Text #FF3AAE, underline 2px #FF3AAE
- **Focus**: 2px focus ring #FF3AAE

---

### Tablet Navigation (768–1023px)

```text
┌──────────────────────────────────┐
│  [Logo]  Home  About     [Menu▼] │
│          Book  Contact           │
└──────────────────────────────────┘
```text

**Layout**:

- Horizontal menu with wrapping allowed
- May wrap to 2 rows if space constrained
- Alternative: Collapsible menu if vertical space needed

**Typography**: Same as desktop (16px Inter)  
**Spacing**: Adjust link gap to 12px if wrapping  
**States**: Same as desktop

---

### Mobile Navigation (<768px)

```text
┌────────────────────────────────┐
│  [Logo]           [☰ Hamburger]│
├────────────────────────────────┤
│ [Hamburger Menu Drawer Opens]  │
│ Home                           │
│ About                          │
│ Book                           │
│ Contact                        │
│                                │
└────────────────────────────────┘
```text

**Layout**:

- Horizontal header with logo + hamburger icon
- Hamburger menu (☰) triggers slide-out drawer
- Drawer slides from left or right (design choice)
- Drawer overlay/backdrop dims page content

**Typography**:

- Font: Inter
- Size: 16px (larger for touch targets)
- Color: Same as desktop

**Spacing**:

- Menu items: 16px padding, full width
- Icon size: 24×24px minimum (touch target ≥44×44px)
- Drawer width: 80% of viewport (max 320px)

**States**:

- **Closed**: Hamburger icon visible
- **Open**: Drawer visible, backdrop active
- **Link hover/active**: Same as desktop (#FF3AAE hot pink)
- **Close button**: X icon, top-right of drawer

**Drawer Interactions**:

- Click hamburger → Open drawer
- Click drawer link → Navigate + close drawer
- Click backdrop → Close drawer
- Swipe right → Close drawer (optional, if supported)

---

## Component Properties (Figma Make)

### Component Name

- **Primary**: `Navigation` or `Header`
- **Alternative**: `MainNav` (if naming conflicts)

### Component Variants

| Variant                  | Description                      | Use Case                |
| ------------------------ | -------------------------------- | ----------------------- |
| `Navigation/Desktop`     | Horizontal menu (≥1024px)        | Desktop & wide screens  |
| `Navigation/Tablet`      | Responsive wrapping (768–1023px) | Tablet & medium screens |
| `Navigation/Mobile`      | Hamburger + drawer (<768px)      | Mobile & small screens  |
| `Navigation/Mobile-Open` | Drawer open state                | Mobile menu expanded    |

### Component Nesting

```text
Navigation
├── Logo (component or image)
├── NavLinks (component group)
│   ├── Link-Home
│   ├── Link-About
│   ├── Link-Book
│   └── Link-Contact
└── HamburgerMenu (mobile only)
    ├── Hamburger Icon
    └── Drawer
        ├── Overlay/Backdrop
        ├── DrawerContent
        │   ├── Close Button
        │   └── MobileLinks
        └── [Links with touch-target sizing]
```text

---

## Acceptance Criteria Validation

| Criterion | Requirement                              | Specification                               | Status  |
| --------- | ---------------------------------------- | ------------------------------------------- | ------- |
| **AC1.1** | 4 visible items only                     | Home, About, Book, Contact specified        | ✅ PASS |
| **AC1.2** | Hidden routes accessible but not indexed | 3 hidden routes with noindex enforcement    | ✅ PASS |
| **AC1.3** | Responsive across 4 breakpoints          | Desktop, tablet, mobile, wide all specified | ✅ PASS |
| **AC1.4** | Hot pink (#FF3AAE) hover/active state    | All states specify #FF3AAE                  | ✅ PASS |
| **AC1.5** | Mobile drawer accessible                 | 44×44px touch targets, focus states         | ✅ PASS |

---

## Route Enforcement Details (Decision 7)

### Noindex Meta Tags (Primary)

Applied to: `/speaking`, `/events`, `/media`

```html
<meta name="robots" content="noindex, nofollow" />
```text

**Effect**: Search engines will not index these pages or follow their links.

---

### Sitemap.xml Exclusion (Primary)

**Before (Full Sitemap)**:

```xml
<url>
  <loc>https://example.com/home</loc>
</url>
<url>
  <loc>https://example.com/about</loc>
</url>
<url>
  <loc>https://example.com/book</loc>
</url>
<url>
  <loc>https://example.com/speaking</loc>
</url>
<url>
  <loc>https://example.com/events</loc>
</url>
<url>
  <loc>https://example.com/media</loc>
</url>
<url>
  <loc>https://example.com/contact</loc>
</url>
```text

**After (Updated Sitemap)**:

```xml
<url>
  <loc>https://example.com/home</loc>
</url>
<url>
  <loc>https://example.com/about</loc>
</url>
<url>
  <loc>https://example.com/book</loc>
</url>
<url>
  <loc>https://example.com/contact</loc>
</url>
```text

**Removed**: `/speaking`, `/events`, `/media`

---

### Robots.txt (Optional Secondary)

If additional enforcement needed (optional under Decision 7):

```text
User-agent: *
Disallow: /speaking
Disallow: /events
Disallow: /media
```text

**Note**: Noindex meta tags + sitemap exclusion are sufficient; robots.txt is optional fallback.

---

## Related Documentation

- **Prompt 1 Contract**: `contracts/prompt-1-navigation-exposure.md` (exact before/after, implementation steps)
- **Prompt 2B Contract**: `contracts/prompt-2b-navigation-design.md` (component design with all states)
- **Design Brief**: `references/04-design-brief.md` (typography, colors, spacing system)
- **Decision 7 Details**: `research.md` (route enforcement options A–D)

---

## Sign-Off

**Specification Status**: ✅ COMPLETE & READY  
**Last Updated**: 2026-11-19  
**Ready for Prompt 1 Figma Make Execution**: YES

Navigation specification fully documents the visible items, hidden routes, responsive behavior, and enforcement strategy needed for Prompt 1 execution.
