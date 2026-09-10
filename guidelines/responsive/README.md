# Responsive Design System

**Version:** 5.0.0  
**Last Updated:** January 2025  
**WordPress Block Theme Compatible:** ✅

Complete responsive design system for the Ash Shaw Makeup Portfolio, providing unified guidance for mobile, tablet, and desktop experiences.

## 🎯 Overview

This responsive system provides a **single source of truth** for how the design scales across all devices. Instead of separate mobile/tablet/desktop guidelines, this unified approach shows **progressive enhancement** across breakpoints.

### Why Unified Responsive Guidelines?

- ✅ **Single source of truth** - No conflicts between device-specific docs
- ✅ **Shows progression** - See how components evolve across breakpoints
- ✅ **Easier maintenance** - Update one file, not three
- ✅ **WordPress-aligned** - Matches block theme responsive philosophy
- ✅ **Better for AI agents** - Clear, consistent guidance

---

## 📱 Device Breakpoints

### Three-Tier Breakpoint System

```
┌─────────────────────────────────────────────────────────────────────┐
│                    RESPONSIVE BREAKPOINT SYSTEM                      │
└─────────────────────────────────────────────────────────────────────┘

Mobile                Tablet                  Desktop
< 768px               768px - 1023px          1024px+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────┐      ┌──────────────────┐   ┌──────────────────────────┐
│   Single    │      │    2 Columns     │   │      Multi-Column        │
│   Column    │      │    Hybrid        │   │   Full Features          │
│   Stacked   │      │   Touch+Hover    │   │   Hover Effects          │
│   Touch     │      │                  │   │   Larger Screens         │
└─────────────┘      └──────────────────┘   └──────────────────────────┘

375px - 767px        768px - 1023px          1024px - 1920px+
```

### Breakpoint Details

| Device | Range | CSS Variable | Container Max-Width |
|--------|-------|--------------|---------------------|
| **Mobile** | < 768px | `--breakpoint-mobile: 767px` | 100% |
| **Tablet** | 768px - 1023px | `--breakpoint-tablet: 1023px` | 720px |
| **Desktop** | 1024px+ | `--breakpoint-desktop: 1024px` | 1280px |
| **Large Desktop** | 1440px+ | `--breakpoint-xl: 1440px` | 1600px |

---

## 📚 Documentation Structure

This responsive system is organized into focused guideline files:

### 1. **[breakpoints-system.md](./breakpoints-system.md)**
Complete breakpoint definitions, media query patterns, and container queries.

**Covers:**
- CSS breakpoint variables
- Media query best practices
- Container query usage
- Viewport-based responsive patterns

**Read when:** Setting up responsive layouts or creating new components

---

### 2. **[layout-patterns.md](./layout-patterns.md)**
Responsive grid, flexbox, and container patterns that adapt across devices.

**Covers:**
- Grid systems (1 column → 2 columns → 3+ columns)
- Flexbox patterns (stack → row)
- Container patterns (padding, max-width)
- Common layout transformations

**Read when:** Building page layouts or section structures

---

### 3. **[navigation-responsive.md](./navigation-responsive.md)**
How navigation evolves from mobile hamburger menu to desktop horizontal nav.

**Covers:**
- Mobile: Hamburger menu + full-screen overlay
- Tablet: Hybrid menu (some items visible)
- Desktop: Full horizontal navigation
- Menu animation patterns

**Read when:** Implementing navigation or header components

---

### 4. **[typography-scaling.md](./typography-scaling.md)**
How fluid typography scales across breakpoints (aligned with WordPress font size scale).

**Covers:**
- Fluid typography with clamp()
- Font size progression (100-900 scale)
- Line height adjustments per device
- Reading width optimization

**Read when:** Implementing text content or adjusting typography

---

### 5. **[spacing-adjustments.md](./spacing-adjustments.md)**
How spacing values adapt across breakpoints (aligned with WordPress spacing scale).

**Covers:**
- Spacing scale usage per device (10-100)
- Section padding progression
- Component spacing adjustments
- Responsive gap patterns

**Read when:** Adjusting padding, margins, or gaps in components

---

### 6. **[interaction-modes.md](./interaction-modes.md)**
Touch vs Hover vs Keyboard interaction patterns.

**Covers:**
- Touch targets (44px minimum)
- Hover detection with `@media (hover: hover)`
- Keyboard navigation patterns
- Focus indicators

**Read when:** Implementing interactive elements (buttons, cards, links)

---

## 🚀 Quick Start Guide

### For Developers Building Components

**Step 1:** Read [breakpoints-system.md](./breakpoints-system.md)
- Understand the three breakpoints (mobile, tablet, desktop)
- Learn media query patterns

**Step 2:** Read relevant pattern guide
- Building a layout? → [layout-patterns.md](./layout-patterns.md)
- Building navigation? → [navigation-responsive.md](./navigation-responsive.md)
- Adjusting typography? → [typography-scaling.md](./typography-scaling.md)

**Step 3:** Implement mobile-first
```css
/* Start with mobile styles (default) */
.component {
  padding: var(--wp--preset--spacing--20);
  display: flex;
  flex-direction: column;
}

/* Add tablet styles */
@media (min-width: 768px) {
  .component {
    padding: var(--wp--preset--spacing--40);
    flex-direction: row;
  }
}

/* Add desktop styles */
@media (min-width: 1024px) {
  .component {
    padding: var(--wp--preset--spacing--60);
    max-width: 1280px;
    margin-inline: auto;
  }
}
```

---

## 📏 Responsive Design Principles

### 1. Mobile-First Approach

Always start with mobile styles, then enhance for larger screens:

```css
/* ✅ GOOD - Mobile first */
.card {
  padding: var(--wp--preset--spacing--20);
  width: 100%;
}

@media (min-width: 768px) {
  .card {
    padding: var(--wp--preset--spacing--40);
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: var(--wp--preset--spacing--60);
    width: 33.333%;
  }
}
```

```css
/* ❌ BAD - Desktop first */
.card {
  padding: var(--wp--preset--spacing--60);
  width: 33.333%;
}

@media (max-width: 1023px) {
  .card {
    padding: var(--wp--preset--spacing--40);
    width: 50%;
  }
}

@media (max-width: 767px) {
  .card {
    padding: var(--wp--preset--spacing--20);
    width: 100%;
  }
}
```

---

### 2. Progressive Enhancement

Enhance experiences for capable devices, don't degrade:

```css
/* Base experience (mobile) - fully functional */
.interactive-card {
  background: white;
  padding: var(--wp--preset--spacing--40);
  cursor: pointer;
}

/* Enhanced for hover-capable devices */
@media (hover: hover) {
  .interactive-card {
    transition: transform var(--animation-200) var(--ease-standard);
  }
  
  .interactive-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
}

/* Enhanced for large screens */
@media (min-width: 1024px) {
  .interactive-card {
    padding: var(--wp--preset--spacing--60);
  }
}
```

---

### 3. Content-First Design

Let content determine breakpoints, not devices:

```css
/* ❌ BAD - Device-specific thinking */
@media (min-width: 375px) { /* iPhone SE */ }
@media (min-width: 414px) { /* iPhone 12 Pro Max */ }
@media (min-width: 768px) { /* iPad */ }

/* ✅ GOOD - Content-driven breakpoints */
@media (min-width: 768px) {
  /* When content benefits from 2 columns */
}

@media (min-width: 1024px) {
  /* When content can support 3+ columns */
}
```

---

### 4. Touch vs Hover Detection

Always detect interaction capability, don't assume:

```css
/* Base: Works for both touch and hover */
.button {
  padding: var(--wp--preset--spacing--20) var(--wp--preset--spacing--40);
  min-height: 44px; /* Touch target minimum */
}

/* Enhanced for hover-capable devices */
@media (hover: hover) {
  .button {
    transition: all var(--animation-200) var(--ease-standard);
  }
  
  .button:hover {
    transform: scale(1.05);
  }
}

/* Touch feedback for all devices */
.button:active {
  transform: scale(0.95);
}
```

---

## 🎨 Component Behavior Across Devices

### Example: Hero Section

Shows how a component progressively enhances:

#### Mobile (< 768px)
- ✅ Single column layout
- ✅ Stacked text and images
- ✅ Smaller spacing (--spacing--40)
- ✅ Touch-optimized buttons
- ✅ Vertical scrolling

#### Tablet (768px - 1023px)
- ✅ Still mostly stacked OR early 2-column
- ✅ Medium spacing (--spacing--60)
- ✅ Hybrid touch + hover support
- ✅ Larger typography starts scaling

#### Desktop (1024px+)
- ✅ Full 2-column split layout
- ✅ Large spacing (--spacing--80)
- ✅ Hover effects active
- ✅ Maximum typography scale
- ✅ Parallax or advanced effects

---

## 📊 Responsive Checklist

Use this checklist when building responsive components:

### Layout
- [ ] Mobile: Single column, stacked layout
- [ ] Tablet: 2 columns where appropriate
- [ ] Desktop: Multi-column with optimal width (1280px max)
- [ ] Content readable at all sizes

### Typography
- [ ] Fluid typography scales smoothly
- [ ] Line length optimal (45-75 characters)
- [ ] Font sizes use WordPress scale (100-900)
- [ ] Heading hierarchy maintained

### Spacing
- [ ] Mobile: Compact spacing (--spacing--20 to --spacing--40)
- [ ] Tablet: Medium spacing (--spacing--40 to --spacing--60)
- [ ] Desktop: Large spacing (--spacing--60 to --spacing--100)
- [ ] Consistent vertical rhythm

### Interactions
- [ ] Touch targets minimum 44px on mobile
- [ ] Hover effects only with `@media (hover: hover)`
- [ ] Focus indicators visible at all sizes
- [ ] Keyboard navigation works on all devices

### Performance
- [ ] Images responsive (srcset, sizes)
- [ ] No horizontal scrolling
- [ ] Fast paint times on mobile
- [ ] Animations respect `prefers-reduced-motion`

### Testing
- [ ] Tested on mobile (375px - 767px)
- [ ] Tested on tablet (768px - 1023px)
- [ ] Tested on desktop (1024px+)
- [ ] Tested on large desktop (1440px+)

---

## 🔗 Related Documentation

### Design Tokens
- [Spacing Scale](../design-tokens/spacing.md) - WordPress spacing scale (10-100)
- [Typography Scale](../design-tokens/typography.md) - WordPress font sizes (100-900)
- [Animation Durations](../design-tokens/animations.md) - Animation timing system
- [Colors](../design-tokens/colors.md) - Color palette and gradients

### Component Guidelines
- [Logo](../components/Logo.md) - Logo responsive behavior
- [ScrollDownArrow](../components/ScrollDownArrow.md) - Scroll indicator
- [HeroLayout](../components/HeroLayout.md) - Hero section patterns

### Accessibility
- [Interactions & Accessibility](../interactions-accessibility.md) - Touch, hover, keyboard patterns

---

## 🎯 Best Practices Summary

### ✅ DO

1. **Start mobile-first**
   ```css
   .component { /* Mobile styles */ }
   @media (min-width: 768px) { /* Tablet */ }
   @media (min-width: 1024px) { /* Desktop */ }
   ```

2. **Use WordPress CSS variables**
   ```css
   .section {
     padding: var(--wp--preset--spacing--40);
     font-size: var(--wp--preset--font-size--300);
   }
   ```

3. **Detect hover capability**
   ```css
   @media (hover: hover) {
     .card:hover { transform: scale(1.05); }
   }
   ```

4. **Test across all breakpoints**
   - 375px (mobile)
   - 768px (tablet)
   - 1024px (desktop)
   - 1440px+ (large desktop)

### ❌ DON'T

1. **Don't use device-specific breakpoints**
   ```css
   /* ❌ BAD */
   @media (min-width: 375px) { /* iPhone SE */ }
   @media (min-width: 768px) { /* iPad */ }
   ```

2. **Don't assume hover support**
   ```css
   /* ❌ BAD - Breaks on touch devices */
   .button:hover { /* No fallback */ }
   ```

3. **Don't hardcode values**
   ```css
   /* ❌ BAD */
   .component {
     padding: 40px;
     font-size: 24px;
   }
   
   /* ✅ GOOD */
   .component {
     padding: var(--wp--preset--spacing--40);
     font-size: var(--wp--preset--font-size--400);
   }
   ```

---

## 📖 Reading Order

**For New Developers:**
1. This README (you are here)
2. [breakpoints-system.md](./breakpoints-system.md)
3. [layout-patterns.md](./layout-patterns.md)
4. Other guides as needed

**For Specific Tasks:**
- Building navigation? → [navigation-responsive.md](./navigation-responsive.md)
- Adjusting typography? → [typography-scaling.md](./typography-scaling.md)
- Fixing spacing? → [spacing-adjustments.md](./spacing-adjustments.md)
- Implementing interactions? → [interaction-modes.md](./interaction-modes.md)

---

## 🎉 Summary

This responsive system provides:
- ✅ **Unified guidance** for all devices (mobile, tablet, desktop)
- ✅ **WordPress-aligned** breakpoints and design tokens
- ✅ **Progressive enhancement** approach
- ✅ **Accessibility-first** with touch, hover, and keyboard support
- ✅ **Single source of truth** - no conflicting guidelines

**Next Steps:**
1. Read [breakpoints-system.md](./breakpoints-system.md) for complete breakpoint details
2. Review relevant pattern guides for your specific component
3. Implement mobile-first, progressively enhance for larger screens

---

**Version:** 5.0.0 (Unified Responsive System)  
**Last Updated:** January 2025  
**Maintained By:** Ash Shaw Portfolio Team

**Questions?** Refer to specific pattern guides or component documentation.
