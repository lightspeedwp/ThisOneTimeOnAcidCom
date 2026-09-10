# WordPress-Aligned Preset System

**Version:** 1.0.0  
**Last Updated:** January 2025

Complete guide to the WordPress theme.json-aligned design token system for the Ash Shaw Makeup Portfolio.

## 📋 Table of Contents

1. [Overview](#overview)
2. [WordPress CSS Variable Standards](#wordpress-css-variable-standards)
3. [Slug Conventions](#slug-conventions)
4. [Color Presets](#color-presets)
5. [Typography Presets](#typography-presets)
6. [Spacing Presets](#spacing-presets)
7. [Shadow Presets](#shadow-presets)
8. [Border Presets](#border-presets)
9. [Custom Tokens](#custom-tokens)
10. [Migration Guide](#migration-guide)
11. [Implementation Checklist](#implementation-checklist)

---

## Overview

### Why WordPress Alignment?

The Ash Shaw Makeup Portfolio now follows WordPress theme.json preset standards to provide:

- **Single Source of Truth:** Predictable, token-based design system
- **Scalability:** Easy to extend without breaking existing styles
- **Maintainability:** Clear naming conventions reduce cognitive load
- **Future-Proof:** Compatible with WordPress block theme ecosystem
- **Consistency:** Same patterns across colors, spacing, typography, etc.

### Key Principles

1. **Numeric slugs** for size-like presets (spacing, font sizes, shadows, radii)
2. **Semantic slugs** for colors (with prefixed numeric scales for ramps)
3. **WordPress-style CSS variables** (`--wp--preset--{feature}--{slug}`)
4. **No breaking changes** to visual design
5. **Backward compatibility** during migration

---

## WordPress CSS Variable Standards

### Preset Variable Pattern

WordPress generates CSS custom properties following this pattern:

```
--wp--preset--{feature}--{slug}
```

### Preset Features

| Feature | CSS Variable Pattern | Example |
|---------|---------------------|---------|
| Colors | `--wp--preset--color--{slug}` | `--wp--preset--color--primary` |
| Font Families | `--wp--preset--font-family--{slug}` | `--wp--preset--font-family--brand-sans` |
| Font Sizes | `--wp--preset--font-size--{slug}` | `--wp--preset--font-size--300` |
| Spacing | `--wp--preset--spacing--{slug}` | `--wp--preset--spacing--40` |
| Shadows | `--wp--preset--shadow--{slug}` | `--wp--preset--shadow--200` |
| Border Radius | `--wp--preset--border-radius--{slug}` | `--wp--preset--border-radius--400` |

### Custom Token Pattern

For tokens without WordPress preset UI (border widths, z-index, animations):

```
--wp--custom--{category}--{slug}
```

Examples:
- `--wp--custom--border-width--200`
- `--wp--custom--z-index--modal`
- `--wp--custom--animation--300`

---

## Slug Conventions

### Numeric Slugs (Size-Like Presets)

Use numeric-only slugs for presets that represent sizes:

**✅ USE NUMERIC SLUGS FOR:**
- Spacing (10, 20, 30... 100)
- Font sizes (100, 200, 300... 900)
- Shadows (100, 200, 300... 600)
- Border radius (0, 100, 200... 900)
- Border widths (0, 100, 200... 400)

**Scale Pattern:**
- Start at **100** (tiny/base)
- Increment by **100**
- Go up to **900** (colossal/maximum)
- Reserve **700-900** for future growth

### Semantic Slugs (Colors & Fonts)

Use semantic names for presets that represent concepts:

**✅ USE SEMANTIC SLUGS FOR:**
- Color roles (`base`, `contrast`, `primary`, `brand`, `cta`)
- Color scales with prefix (`neutral-100`, `accent-500`)
- Font families (`brand-sans`, `brand-serif`, `brand-mono`)

### Label Standards

Shared label set for numeric scales:

| Slug | Label | Use Case |
|------|-------|----------|
| 100 | Tiny | Smallest size |
| 200 | Base | Default/standard size |
| 300 | Small | Slightly above base |
| 400 | Medium | Medium emphasis |
| 500 | Large | High emphasis |
| 600 | X-Large | Very prominent |
| 700 | Huge | Major emphasis |
| 800 | Gigantic | Dramatic scale |
| 900 | Colossal | Maximum size |

---

## Color Presets

### Current Color Scheme (Preserved)

The existing Ash Shaw color palette remains unchanged:

**Brand Gradients:**
- Pink → Purple → Blue (Primary CTA)
- Blue → Teal → Green (Secondary)
- Gold → Peach → Coral (Accent)

**Light Mode:**
- Clean white backgrounds
- Gray text hierarchy
- Subtle borders

**Dark Mode:**
- Deep purple gradient backgrounds
- Lavender/purple text
- Purple borders and accents

### WordPress-Aligned Color Structure

```css
/* Semantic Role Colors */
--wp--preset--color--base: #ffffff;           /* Backgrounds */
--wp--preset--color--contrast: #111111;       /* Text */
--wp--preset--color--primary: #9933ff;        /* Primary brand */
--wp--preset--color--brand: #9933ff;          /* Brand moments */
--wp--preset--color--cta: #ff66cc;            /* Call to action */

/* Neutral Ramp (100-900) */
--wp--preset--color--neutral-50: #f9fafb;
--wp--preset--color--neutral-100: #f3f4f6;
--wp--preset--color--neutral-200: #e5e7eb;
--wp--preset--color--neutral-300: #d1d5db;
--wp--preset--color--neutral-400: #9ca3af;
--wp--preset--color--neutral-500: #6b7280;
--wp--preset--color--neutral-600: #4b5563;
--wp--preset--color--neutral-700: #374151;
--wp--preset--color--neutral-800: #1f2937;
--wp--preset--color--neutral-900: #111827;

/* Purple Accent Ramp (Dark Mode) */
--wp--preset--color--purple-50: #faf5ff;
--wp--preset--color--purple-100: #f5f3ff;
--wp--preset--color--purple-200: #ede9fe;
--wp--preset--color--purple-300: #d8b4fe;
--wp--preset--color--purple-400: #c4b5fd;
--wp--preset--color--purple-500: #a78bfa;
--wp--preset--color--purple-600: #7c3aed;
--wp--preset--color--purple-700: #6b21a8;
--wp--preset--color--purple-800: #5b21b6;
--wp--preset--color--purple-900: #581c87;
--wp--preset--color--purple-950: #1a0033;

/* Brand Gradient Start/Mid/End Points */
--wp--preset--color--gradient-pink-start: #ff66cc;
--wp--preset--color--gradient-pink-mid: #9933ff;
--wp--preset--color--gradient-pink-end: #3399ff;
```

### Usage Examples

```tsx
// In React/TSX
<div className="bg-white dark:bg-[var(--wp--preset--color--purple-950)]">
  <h1 className="text-[var(--wp--preset--color--contrast)] dark:text-[var(--wp--preset--color--purple-100)]">
    Title
  </h1>
</div>

// In CSS
.card {
  background-color: var(--wp--preset--color--base);
  color: var(--wp--preset--color--contrast);
  border-color: var(--wp--preset--color--neutral-200);
}
```

---

## Typography Presets

### Font Families (Semantic Slugs)

```css
--wp--preset--font-family--brand-title: "Righteous", "Arial Black", sans-serif;
--wp--preset--font-family--brand-heading: "Playfair Display", "Times New Roman", serif;
--wp--preset--font-family--brand-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Sizes (Numeric Slugs 100-900)

WordPress-inspired fluid typography scale:

```css
--wp--preset--font-size--100: clamp(0.75rem, 0.65rem + 0.5vw, 0.875rem);   /* 12px → 14px */
--wp--preset--font-size--200: clamp(1rem, 0.85rem + 0.75vw, 1.125rem);     /* 16px → 18px (Base) */
--wp--preset--font-size--300: clamp(1.125rem, 0.95rem + 0.875vw, 1.25rem); /* 18px → 20px */
--wp--preset--font-size--400: clamp(1.25rem, 1rem + 1.25vw, 1.5rem);       /* 20px → 24px */
--wp--preset--font-size--500: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);         /* 24px → 32px */
--wp--preset--font-size--600: clamp(1.875rem, 1.4rem + 2.375vw, 2.5rem);   /* 30px → 40px */
--wp--preset--font-size--700: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);       /* 36px → 48px */
--wp--preset--font-size--800: clamp(2.5rem, 1.9rem + 3vw, 3.5rem);         /* 40px → 56px */
--wp--preset--font-size--900: clamp(3rem, 2.2rem + 4vw, 4.5rem);           /* 48px → 72px */
```

### Special Use Cases

```css
/* Hero Titles (Height-Aware) */
--wp--preset--font-size--hero: clamp(2.25rem, min(4vw + 1rem, 3vh + 2rem), 7.5rem);

/* Section Headings */
--wp--preset--font-size--section: clamp(1.5rem, min(3vw + 0.5rem, 2.5vh + 1rem), 3rem);

/* Body Guideline Text */
--wp--preset--font-size--body-lg: clamp(1rem, 1.2vw + 0.2rem, 1.25rem);
```

### Usage Examples

```tsx
// In React/TSX
<h1 className="text-[length:var(--wp--preset--font-size--800)] font-[family:var(--wp--preset--font-family--brand-title)]">
  Hero Title
</h1>

// In CSS with helper classes
.text-size-800 {
  font-size: var(--wp--preset--font-size--800);
}

.font-brand-title {
  font-family: var(--wp--preset--font-family--brand-title);
}
```

---

## Spacing Presets

### Numeric Slug Scale (10-100)

WordPress-aligned spacing with increments of 10:

```css
--wp--preset--spacing--10: 0.625rem;   /* 10px */
--wp--preset--spacing--20: 1.25rem;    /* 20px */
--wp--preset--spacing--30: 1.875rem;   /* 30px */
--wp--preset--spacing--40: 2.5rem;     /* 40px (Default) */
--wp--preset--spacing--50: 3.125rem;   /* 50px */
--wp--preset--spacing--60: 3.75rem;    /* 60px */
--wp--preset--spacing--70: 4.375rem;   /* 70px */
--wp--preset--spacing--80: 5rem;       /* 80px */
--wp--preset--spacing--90: 5.625rem;   /* 90px */
--wp--preset--spacing--100: 6.25rem;   /* 100px */
```

### Fluid Spacing Extensions

For responsive spacing that scales with viewport:

```css
/* Fluid spacing with viewport-aware scaling */
--wp--preset--spacing--fluid-xs: clamp(0.25rem, 0.15rem + 0.5vw, 0.5rem);     /* 4px → 8px */
--wp--preset--spacing--fluid-sm: clamp(0.5rem, 0.3rem + 1vw, 1rem);           /* 8px → 16px */
--wp--preset--spacing--fluid-md: clamp(1rem, 0.6rem + 2vw, 2rem);             /* 16px → 32px */
--wp--preset--spacing--fluid-lg: clamp(1.5rem, 1rem + 2.5vw, 3rem);           /* 24px → 48px */
--wp--preset--spacing--fluid-xl: clamp(2rem, 1.2rem + 4vw, 4rem);             /* 32px → 64px */
--wp--preset--spacing--fluid-2xl: clamp(3rem, 1.5rem + 7.5vw, 6rem);          /* 48px → 96px */
--wp--preset--spacing--fluid-3xl: clamp(4rem, 2rem + 10vw, 8rem);             /* 64px → 128px */
```

### Component-Specific Spacing

```css
/* Button Spacing */
--wp--preset--spacing--button-x: clamp(1.5rem, 2.5vw + 1rem, 3.375rem);
--wp--preset--spacing--button-y: clamp(1rem, 1.5vw + 0.5rem, 2rem);

/* Card Padding */
--wp--preset--spacing--card-mobile: clamp(1rem, 2.5vw + 0.5rem, 2rem);
--wp--preset--spacing--card-desktop: clamp(2rem, 4vw + 1rem, 6rem);

/* Section Spacing */
--wp--preset--spacing--section: clamp(3rem, 6vw + 1rem, 8rem);
```

### Block Gap (Layout Spacing)

```css
/* Content flow spacing between blocks */
--wp--style--block-gap: 1.5rem;
--wp--preset--spacing--block-gap-sm: clamp(0.75rem, 1.5vw + 0.25rem, 1.5rem);
--wp--preset--spacing--block-gap-md: clamp(1.5rem, 3vw + 0.5rem, 3rem);
--wp--preset--spacing--block-gap-lg: clamp(2.5rem, 5vw + 1rem, 5rem);
```

### Usage Examples

```tsx
// In React/TSX
<div className="p-[length:var(--wp--preset--spacing--40)]">
  <button className="px-[length:var(--wp--preset--spacing--button-x)] py-[length:var(--wp--preset--spacing--button-y)]">
    Click Me
  </button>
</div>

// In CSS
.card {
  padding: var(--wp--preset--spacing--40);
  margin-bottom: var(--wp--preset--spacing--60);
  gap: var(--wp--preset--spacing--20);
}

.section {
  padding-block: var(--wp--preset--spacing--section);
}
```

---

## Shadow Presets

### Numeric Slug Scale (100-600)

WordPress box-shadow presets for elevation:

```css
--wp--preset--shadow--100: 0 1px 2px 0 rgb(0 0 0 / 0.06);
--wp--preset--shadow--200: 0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
--wp--preset--shadow--300: 0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
--wp--preset--shadow--400: 0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
--wp--preset--shadow--500: 0 20px 25px -5px rgb(0 0 0 / 0.12), 0 10px 10px -5px rgb(0 0 0 / 0.08);
--wp--preset--shadow--600: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Intent Mapping

| Slug | Label | Intent |
|------|-------|--------|
| 100 | Tiny | Subtle lift (chips, inputs) |
| 200 | Base | Default cards |
| 300 | Small | Raised cards, dropdowns |
| 400 | Medium | Modals, sticky UI |
| 500 | Large | High emphasis overlays |
| 600 | X-Large | Hero overlays, "floating" elements |

### Usage Examples

```tsx
// In React/TSX
<div className="shadow-[var(--wp--preset--shadow--300)] hover:shadow-[var(--wp--preset--shadow--400)]">
  Card with elevation
</div>

// In CSS
.card {
  box-shadow: var(--wp--preset--shadow--200);
  transition: box-shadow 300ms ease;
}

.card:hover {
  box-shadow: var(--wp--preset--shadow--300);
}
```

---

## Border Presets

### Border Radius (Numeric Slugs 0-900)

```css
--wp--preset--border-radius--0: 0;
--wp--preset--border-radius--100: 0.125rem;    /* 2px */
--wp--preset--border-radius--200: 0.25rem;     /* 4px (Base) */
--wp--preset--border-radius--300: 0.375rem;    /* 6px */
--wp--preset--border-radius--400: 0.5rem;      /* 8px */
--wp--preset--border-radius--500: 0.75rem;     /* 12px */
--wp--preset--border-radius--600: 1rem;        /* 16px */
--wp--preset--border-radius--700: 1.5rem;      /* 24px */
--wp--preset--border-radius--800: 2rem;        /* 32px */
--wp--preset--border-radius--900: 9999px;      /* Full/Pill */
```

### Border Width (Custom Tokens)

Since WordPress doesn't have `border.widthSizes`, use custom tokens:

```css
--wp--custom--border-width--0: 0;
--wp--custom--border-width--100: 1px;
--wp--custom--border-width--200: 2px;
--wp--custom--border-width--300: 4px;
--wp--custom--border-width--400: 8px;
```

### Usage Examples

```tsx
// In React/TSX
<div className="rounded-[var(--wp--preset--border-radius--400)] border-[width:var(--wp--custom--border-width--200)]">
  Card with rounded corners
</div>

// In CSS
.card {
  border-radius: var(--wp--preset--border-radius--400);
  border-width: var(--wp--custom--border-width--100);
  border-color: var(--wp--preset--color--neutral-200);
}

.pill-button {
  border-radius: var(--wp--preset--border-radius--900);
}
```

---

## Custom Tokens

### Animation Durations

```css
--wp--custom--animation--100: 150ms;   /* Fast */
--wp--custom--animation--200: 300ms;   /* Normal */
--wp--custom--animation--300: 500ms;   /* Slow */
--wp--custom--animation--400: 800ms;   /* Very Slow */
```

### Easing Functions

```css
--wp--custom--ease--standard: cubic-bezier(0.4, 0, 0.2, 1);
--wp--custom--ease--decelerate: cubic-bezier(0, 0, 0.2, 1);
--wp--custom--ease--accelerate: cubic-bezier(0.4, 0, 1, 1);
--wp--custom--ease--sharp: cubic-bezier(0.4, 0, 0.6, 1);
--wp--custom--ease--bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Z-Index Scale

```css
--wp--custom--z-index--dropdown: 1000;
--wp--custom--z-index--sticky: 1020;
--wp--custom--z-index--modal: 1050;
--wp--custom--z-index--popover: 1060;
--wp--custom--z-index--tooltip: 1070;
```

### Layout Widths

```css
--wp--style--global--content-size: 40rem;     /* 640px */
--wp--style--global--wide-size: 64rem;        /* 1024px */
```

---

## Migration Guide

### Phase 1: Add WordPress Variables (Non-Breaking)

**Step 1:** Add new WordPress-aligned variables alongside existing ones in `globals.css`:

```css
:root {
  /* Existing variables (keep for now) */
  --text-hero-h1: clamp(2.25rem, 6vw, 7.5rem);
  
  /* New WordPress-aligned variables */
  --wp--preset--font-size--hero: clamp(2.25rem, min(4vw + 1rem, 3vh + 2rem), 7.5rem);
}
```

**Step 2:** Create helper utility classes:

```css
/* Typography helpers */
.text-size-200 { font-size: var(--wp--preset--font-size--200); }
.text-size-800 { font-size: var(--wp--preset--font-size--800); }

/* Spacing helpers */
.p-spacing-40 { padding: var(--wp--preset--spacing--40); }
.py-section { padding-block: var(--wp--preset--spacing--section); }

/* Shadow helpers */
.shadow-200 { box-shadow: var(--wp--preset--shadow--200); }
.shadow-300 { box-shadow: var(--wp--preset--shadow--300); }
```

### Phase 2: Gradual Component Migration

**Step 1:** Start with new components using WordPress variables

**Step 2:** Update existing components one at a time:

```tsx
// BEFORE
<h1 className="text-[length:var(--text-hero-h1)]">
  Title
</h1>

// AFTER
<h1 className="text-[length:var(--wp--preset--font-size--hero)] text-size-hero">
  Title
</h1>
```

### Phase 3: Deprecate Old Variables

**Step 1:** Mark old variables as deprecated with comments:

```css
:root {
  /* @deprecated Use --wp--preset--font-size--hero instead */
  --text-hero-h1: clamp(2.25rem, 6vw, 7.5rem);
}
```

**Step 2:** After all components migrate, remove deprecated variables

### Migration Tracking

**Status Tracking Table:**

| Category | Old Variables | New Variables | Status |
|----------|--------------|---------------|--------|
| Font Sizes | `--text-*` | `--wp--preset--font-size--*` | 🔄 In Progress |
| Spacing | `--space-*` | `--wp--preset--spacing--*` | 📋 Planned |
| Colors | `--color-*` | `--wp--preset--color--*` | 📋 Planned |
| Shadows | *(none)* | `--wp--preset--shadow--*` | 📋 Planned |
| Border Radius | `--radius` | `--wp--preset--border-radius--*` | 📋 Planned |

---

## Implementation Checklist

### CSS Variables
- [ ] Add WordPress-aligned color variables to `:root`
- [ ] Add WordPress-aligned spacing scale (10-100)
- [ ] Add WordPress-aligned font size scale (100-900)
- [ ] Add WordPress-aligned shadow presets (100-600)
- [ ] Add WordPress-aligned border radius presets (0-900)
- [ ] Add custom tokens (animations, easing, z-index)

### Helper Classes
- [ ] Create typography helper classes (`.text-size-*`)
- [ ] Create spacing helper classes (`.p-spacing-*`, `.py-section`)
- [ ] Create shadow helper classes (`.shadow-*`)
- [ ] Create border radius helper classes (`.rounded-*`)

### Documentation
- [ ] Update colors.md with WordPress color structure
- [ ] Update typography.md with numeric font size scale
- [ ] Update spacing.md with numeric spacing scale
- [ ] Document shadow presets and usage
- [ ] Document border radius presets

### Testing
- [ ] Verify no visual regressions
- [ ] Test all components with new variables
- [ ] Confirm dark mode still works correctly
- [ ] Validate accessibility (contrast ratios maintained)
- [ ] Test responsive scaling across viewports

### Migration
- [ ] Identify all components using old variables
- [ ] Create migration plan with priority order
- [ ] Migrate high-traffic components first
- [ ] Update component documentation
- [ ] Remove deprecated variables after migration

---

## Related Documentation

- **[colors.md](./design-tokens/colors.md)** - Complete color system
- **[typography.md](./design-tokens/typography.md)** - Typography scale and hierarchy
- **[spacing.md](./design-tokens/spacing.md)** - Spacing patterns and usage
- **[Guidelines.md](./Guidelines.md)** - Main design system guidelines

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained by:** Ash Shaw Portfolio Team
