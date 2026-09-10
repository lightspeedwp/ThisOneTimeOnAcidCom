# CSS Architecture Guide

**Version:** 1.0.0
**Last Updated:** February 2026
**Last Reviewed:** February 21, 2026
**Purpose:** Document the BEM architecture, file structure, import system, and styling rules

---

## 1. Architecture Overview

This project uses a **strict Semantic BEM (Block Element Modifier)** CSS architecture. Tailwind utility classes are **forbidden**. All styles are defined in dedicated CSS files within `/styles/`.

### File Structure

```
/styles/
  globals.css              # Root: design tokens, reset, base styles, utility helpers
  animations.css           # Centralised keyframe animations (26 keyframes)
  blocks/                  # One CSS file per component or page
    header.css
    footer.css
    blog-page.css
    portfolio-card.css
    ...
  components/
    typeform-embed.css     # Third-party component overrides
```

---

## 2. How Imports Work

### Entry Point: `globals.css`

`/styles/globals.css` is the root stylesheet loaded by the application. It:

1. Imports `animations.css` at the top: `@import './animations.css';`
2. Defines the CSS reset (replacing Tailwind Preflight)
3. Defines all `:root` design tokens (WordPress preset architecture)
4. Defines `.dark` mode overrides
5. Defines base element styles (`body`, headings, `p`)
6. Defines global utility helpers (`.text-center`, `.sr-only`, `.container-wide`, etc.)
7. Defines global animation utilities (`.animate-neon-pulse-*`, `.bg-aurora-mesh`)
8. Defines accessibility rules (`:focus-visible`, `prefers-reduced-motion`)

### Block CSS Files

Each component/page imports its own block CSS file directly in the TSX:

```tsx
// In /components/pages/blog/BlogPage.tsx
import "@/styles/blocks/blog-page.css";
```

The `@/` alias resolves to the project root. This means every block CSS file is independently loaded by the component that uses it.

### Key Rules

- **One CSS file per component/page** - e.g., `blog-page.css` for `BlogPage.tsx`
- **No circular imports** - block files do NOT import `globals.css` (it's already loaded)
- **No `@apply`** - Tailwind's `@apply` directive is forbidden
- **No `@import` in block files** - all tokens are available globally from `globals.css`

---

## 3. BEM Naming Convention

### Structure

```
.block                          # Standalone component
.block__element                 # Child element of the block
.block--modifier                # Variant of the block
.block__element--modifier       # Variant of an element
```

### Examples

```css
/* Block */
.blog-card { }

/* Elements */
.blog-card__image { }
.blog-card__title { }
.blog-card__footer { }

/* Modifiers */
.blog-card--featured { }
.blog-card__title--large { }
```

### Naming Rules

- **Block names:** lowercase, hyphen-separated: `.portfolio-card`, `.hero-layout`
- **Elements:** double underscore: `.portfolio-card__image`
- **Modifiers:** double hyphen: `.portfolio-card--featured`
- **No nesting beyond 2 levels:** `.block__element--modifier` is the max depth
- **No standalone modifiers:** always pair with the block: `.blog-card.blog-card--featured`

---

## 4. Dark Mode Pattern

All dark mode styles use the `.dark` class selector on the `<html>` element:

```css
/* Light mode (default) */
.blog-card {
  background-color: var(--wp--preset--color--base);
  color: var(--wp--preset--color--contrast);
}

/* Dark mode override */
.dark .blog-card {
  background-color: var(--wp--preset--color--atomic-black);
  color: var(--wp--preset--color--neutral-200);
}
```

### Rules

- Every visible component **must** have a `.dark` variant
- Use `.dark .block` selector (space between `.dark` and the block)
- Text colours use `-text` suffix tokens: `--neon-purple-text` (accessible in light), `--neon-purple` (bright in dark)
- The `.dark` class is toggled on `<html>` by `ThemeToggle.tsx`

---

## 5. Design Token Usage

### Always Use Tokens

| Property | Token Pattern | Example |
|----------|--------------|---------|
| Colour | `--wp--preset--color--*` | `var(--wp--preset--color--neon-pink)` |
| Font family | `--wp--preset--font-family--*` | `var(--wp--preset--font-family--brand-heading)` |
| Font size | `--wp--preset--font-size--*` | `var(--wp--preset--font-size--300)` |
| Spacing | `--wp--preset--spacing--*` | `var(--wp--preset--spacing--fluid-md)` |
| Border radius | `--wp--preset--border-radius--*` | `var(--wp--preset--border-radius--lg)` |
| Shadow | `--wp--preset--shadow--*` | `var(--wp--preset--shadow--card)` |
| Gradient | `--wp--preset--gradient--*` | `var(--wp--preset--gradient--cyberpunk)` |
| Z-index | `--wp--preset--z-index--*` | `var(--wp--preset--z-index--header)` |

### Never Hardcode

```css
/* BAD - hardcoded values */
.card { background: #f3f4f6; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }

/* GOOD - token references */
.card { background: var(--wp--preset--color--neutral-100); border-radius: var(--wp--preset--border-radius--lg); box-shadow: var(--wp--preset--shadow--card); }
```

---

## 6. Spacing Rules

### Gap Over Margin

**Rule:** Use `gap` on flex/grid containers instead of `margin` on children.

```css
/* BAD - margin on children */
.card-list .card { margin-bottom: 1rem; }

/* GOOD - gap on parent */
.card-list { display: flex; flex-direction: column; gap: var(--wp--preset--spacing--block-gap); }
```

### blockGap Token

The standard inter-element gap is `--wp--preset--spacing--block-gap` which maps to `fluid-md` (clamp 1rem-2rem).

### When Margin Is Acceptable

- `margin: 0 auto` for centering containers
- Legacy utility helpers (`.mb-fluid-md`) for compatibility (prefer gap)

---

## 7. Media Query Pattern

Mobile-first with standard breakpoints:

```css
/* Base: mobile */
.grid { grid-template-columns: 1fr; }

/* Tablet portrait */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Wide desktop */
@media (min-width: 1440px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 8. Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| Tailwind utilities (`flex`, `p-4`, `text-center`) | Strict BEM architecture |
| Inline styles (`style={{ ... }}`) | Except dynamic data-driven values |
| `!important` | Architecture issue - fix specificity instead |
| `@apply` | Tailwind directive - not available |
| Raw hex colours | Use CSS custom properties |
| Hardcoded px spacing | Use fluid spacing tokens |
| `margin` for element spacing | Use `gap` on parent |
| Nested selectors beyond `.dark .block__element` | Keep specificity flat |

---

## 9. Shadow Token Scale

Defined in `:root` of `globals.css`:

| Token | Value | Use Case |
|-------|-------|----------|
| `--sm` | Subtle 1px | Inputs, small elements |
| `--md` | Medium 4px | Cards at rest |
| `--lg` | Elevated 10px | Dropdowns, popovers |
| `--xl` | High 20px | Modals, overlays |
| `--2xl` | Maximum 25px | Hero elements |
| `--card` | Card default | Portfolio/blog cards |
| `--card-hover` | Card hover | Lift on hover |
| `--neon-pink` | Pink glow | Neon accents |
| `--neon-purple` | Purple glow | Primary neon |
| `--neon-blue` | Blue glow | CTA neon |

---

**Last Updated:** February 2026