# Iconography design tokens

Complete guide to the Phosphor Icons system, weight variants, sizing, colours, and accessibility requirements.

**Version:** 1.0.0
**Created:** March 3, 2026
**Package:** `@phosphor-icons/react`

---

## Overview

The project has completed its migration from hand-rolled Lucide SVG wrappers (`/lib/icons-set-*.tsx`) to [Phosphor Icons](https://phosphoricons.com/) as the primary and only icon library. The `/lib/icons*` files have been deleted and `lucide-react` is no longer a dependency.

**Import pattern:**
```tsx
import { MagnifyingGlass, CaretDown, Star } from '@phosphor-icons/react';

<MagnifyingGlass size={24} weight="regular" />
<CaretDown size={20} weight="bold" />
<Star size={16} weight="fill" />
```

---

## Weight system

Phosphor provides **6 weight variants** per icon — a major upgrade over Lucide's single stroke style.

| Weight | Visual | Stroke equiv. | Best for | A11y rating |
|---|---|---|---|---|
| `thin` | Minimal hairline | ~1px | Large decorative icons (48px+), hero sections | ⚠️ Decorative only |
| `light` | Subtle, refined | ~1.5px | Secondary metadata, background accents (24px+) | ⚠️ Caution below 24px |
| `regular` | **Default** balanced | ~2px | All standard UI: nav, buttons, cards, labels | ✅ Safe at all sizes |
| `bold` | Thick, prominent | ~3px | Emphasis, active states, primary CTAs, neon contexts | ✅ High visibility |
| `fill` | Solid filled | N/A | Toggles, ratings, status indicators, active states | ✅ Maximum contrast |
| `duotone` | Two-tone (20% secondary) | ~2px + fill | Feature cards, hero decorations, empty states | ⚠️ Audit per background |

### Weight-to-context mapping

| Context | Recommended weight | Size |
|---|---|---|
| Navigation (menu, arrows, chevrons) | `regular` | 20–24px |
| Button icons (CTA, actions) | `regular` or `bold` | 20px |
| Metadata labels (date, time, author) | `regular` | 16–20px |
| Card accents / feature highlights | `duotone` | 24–32px |
| Hero section decorative | `thin` or `light` | 48px+ |
| Status indicators (success, error) | `fill` | 16–20px |
| Toggle active/inactive | `fill` (active) / `regular` (inactive) | 20–24px |
| Rating stars | `fill` (filled) / `regular` (empty) | 16–20px |
| Dark mode neon contexts | `bold` or `duotone` | 24px+ |

### TypeScript type

```tsx
type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
```

---

## Size scale

### CSS custom properties

```css
--icon-size-xs: 0.75rem;   /* 12px */
--icon-size-sm: 1rem;       /* 16px */
--icon-size-md: 1.25rem;    /* 20px */
--icon-size-base: 1.5rem;   /* 24px — default */
--icon-size-lg: 2rem;       /* 32px */
--icon-size-xl: 3rem;       /* 48px */
```

### Existing utility classes

Already defined in `/styles/globals.css`:

```css
.icon-xs  { width: 0.75rem; height: 0.75rem; }
.icon-sm  { width: 1rem;    height: 1rem;    }
.icon-md  { width: 1.5rem;  height: 1.5rem;  }
.icon-lg  { width: 2rem;    height: 2rem;    }
.icon-xl  { width: 3rem;    height: 3rem;    }
.icon-2xl { width: 4rem;    height: 4rem;    }
```

### Phosphor `size` prop

Phosphor icons accept a `size` prop (number or string) that sets both width and height:

```tsx
<Star size={24} />        // 24×24px
<Star size="1.5rem" />    // rem-based sizing
```

**Convention:** Use the `size` prop directly for component-level sizing. Use CSS classes for layout-level constraints.

---

## Colour tokens

### Light mode

```css
--icon-color-default:     var(--wp--preset--color--neutral-700);
--icon-color-muted:       var(--wp--preset--color--neutral-500);
--icon-color-accent:      var(--wp--preset--color--neon-pink-text);
--icon-color-interactive: var(--wp--preset--color--neon-blue-text);
--icon-color-success:     var(--wp--preset--color--neon-green-text);
--icon-color-error:       var(--wp--preset--color--neon-red-text);
--icon-color-warning:     var(--wp--preset--color--neon-orange-text);
--icon-color-disabled:    var(--wp--preset--color--neutral-400);
```

### Dark mode

```css
.dark {
  --icon-color-default:     var(--wp--preset--color--neutral-200);
  --icon-color-muted:       var(--wp--preset--color--neutral-400);
  --icon-color-accent:      var(--wp--preset--color--neon-pink);
  --icon-color-interactive: var(--wp--preset--color--neon-blue);
  --icon-color-success:     var(--wp--preset--color--neon-green);
  --icon-color-error:       var(--wp--preset--color--neon-red);
  --icon-color-warning:     var(--wp--preset--color--neon-orange);
  --icon-color-disabled:    var(--wp--preset--color--neutral-600);
}
```

### Using colour with Phosphor

Phosphor icons inherit `currentColor` by default, or accept a `color` prop:

```tsx
// Inherits from parent CSS color:
<Star className="icon-lib__card-icon" />

// Explicit color prop:
<Star color="var(--wp--preset--color--neon-pink)" />
```

**Convention:** Prefer `currentColor` inheritance via BEM classes. Only use the `color` prop for one-off overrides.

---

## Animation tokens

```css
--icon-transition:        200ms ease;
--icon-hover-scale:       1.1;
--icon-hover-opacity:     0.8;
--icon-transition-reduced: 0ms;
```

### Reduced motion

All icon animations **must** respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .ph-icon--interactive:hover {
    transform: none;
  }
}
```

---

## Spacing tokens

```css
--icon-btn-gap:    0.5rem;     /* gap between icon and button text */
--icon-nav-gap:    0.375rem;   /* gap in nav items */
--icon-inline-gap: 0.25rem;    /* gap when inline with text */
```

---

## BEM class system

```css
/* Base */
.ph-icon { display: inline-flex; align-items: center; justify-content: center; }

/* Size modifiers */
.ph-icon--xs   { width: var(--icon-size-xs);   height: var(--icon-size-xs);   }
.ph-icon--sm   { width: var(--icon-size-sm);   height: var(--icon-size-sm);   }
.ph-icon--md   { width: var(--icon-size-md);   height: var(--icon-size-md);   }
.ph-icon--base { width: var(--icon-size-base); height: var(--icon-size-base); }
.ph-icon--lg   { width: var(--icon-size-lg);   height: var(--icon-size-lg);   }
.ph-icon--xl   { width: var(--icon-size-xl);   height: var(--icon-size-xl);   }

/* Functional modifiers */
.ph-icon--interactive { cursor: pointer; transition: transform var(--icon-transition); }
.ph-icon--interactive:hover { transform: scale(var(--icon-hover-scale)); }
.ph-icon--decorative  { pointer-events: none; }
.ph-icon--muted       { color: var(--icon-color-muted); }
.ph-icon--accent      { color: var(--icon-color-accent); }
.ph-icon--neon        { filter: drop-shadow(0 0 6px currentColor); }
```

---

## Duotone weight

The `duotone` weight is unique to Phosphor — each icon has a primary stroke layer and a secondary filled layer at 20% opacity.

### When to use duotone

- ✅ Feature cards (24px+)
- ✅ Hero section accents (32px+)
- ✅ Empty states and illustrations
- ✅ Marketing/landing page highlights

### When NOT to use duotone

- ❌ Small sizes (< 24px) — secondary layer becomes invisible
- ❌ Navigation controls — clarity is paramount
- ❌ Form controls — too decorative
- ❌ Dense data tables — too visually heavy

### Custom duotone opacity

Phosphor applies 20% opacity to the secondary layer by default. This can be customised via CSS:

```css
--icon-duotone-opacity: 0.2; /* default */
```

---

## Accessibility requirements

### ARIA attributes

Phosphor icons include `aria-hidden="true"` by default — correct for most decorative usage.

For **informational icons** (conveying meaning without adjacent text):

```tsx
<Warning size={20} weight="fill" aria-label="Warning" aria-hidden={false} />
```

### Minimum sizes per weight

| Weight | Min safe size | Interactive min |
|---|---|---|
| `thin` | 32px | Not recommended |
| `light` | 24px | Not recommended |
| `regular` | 16px | 20px |
| `bold` | 16px | 16px |
| `fill` | 12px | 16px |
| `duotone` | 24px | 24px |

### Touch targets (WCAG 2.5.5)

Interactive icons (clickable) must have a minimum touch target of **44×44px**. Achieve this via padding on the parent button element, not by inflating the icon size:

```tsx
<button className="scroll-to-top__btn"> {/* 44×44px min */}
  <ArrowUp size={24} weight="regular" aria-hidden="true" />
</button>
```

---

## Migration reference

| Lucide → Phosphor name changes | Count |
|---|---|
| ✅ Same name | 48 |
| ⚠️ Renamed | 44 |
| ❌ Missing | 1 (Blend) |

For the complete mapping table, see:
- [Phosphor migration report](../../reports/phosphor-migration/full-audit-report.md)
- [Phosphor icons dev tool](/dev-tools/phosphor-icons) — live side-by-side comparison

---

## Cross-references

- [Icon system guide](../overview-icons.md)
- [Neon colour system](./neon-colors.md)
- [Reduced motion guide](../prefers-reduced-motion.md)
- [Dark mode implementation](../dark-mode-implementation.md)
- [Phosphor migration tasks](../../tasks/phosphor-migration-tasks.md)