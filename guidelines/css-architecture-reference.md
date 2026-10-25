# CSS Architecture & Pattern Reference (N003)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25  
**Part of:** Ash Shaw Makeup Portfolio Design System

---

## Overview

Comprehensive guide to CSS architecture, BEM pattern implementation, dark mode rules, and responsive breakpoints for consistent styling across the portfolio site.

---

## Table of Contents

1. [BEM Architecture](#1-bem-architecture)
2. [CSS File Organization](#2-css-file-organization)
3. [Dark Mode Implementation](#3-dark-mode-implementation)
4. [Responsive Breakpoints](#4-responsive-breakpoints)
5. [CSS Best Practices](#5-css-best-practices)

---

## 1. BEM Architecture

Block, Element, Modifier (BEM) naming convention ensures predictable, maintainable CSS.

### Structure

**Block:** Standalone component  
**Element:** Part of a block  
**Modifier:** Variation or state

### Naming

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

### Example

```css
/* Block: Card */
.card {
  background: var(--bg-dark);
  padding: var(--spacing-md);
  border-radius: 8px;
}

/* Element: Card title */
.card__title {
  font-size: var(--text-size-h3);
  margin-bottom: var(--spacing-sm);
}

/* Modifier: Featured variant */
.card--featured {
  border: 3px solid var(--color-primary);
  box-shadow: 0 0 20px var(--color-primary);
}

/* Element modifier: Title in featured card */
.card__title--featured {
  color: var(--color-primary);
}
```

---

## 2. CSS File Organization

### Structure

```text
/styles/
  ├── globals.css           # Global resets, variables
  ├── themes/
  │   ├── light.css        # Light mode overrides
  │   └── dark.css         # Dark mode overrides
  └── blocks/
      ├── header.css       # Header component
      ├── footer.css       # Footer component
      ├── button.css       # Button components
      └── ...              # Other blocks
```

### Block CSS File Rules

1. **One block per file** (or closely related elements)
2. **Include all states:** normal, hover, focus, active, disabled
3. **Include reduced-motion overrides**
4. **Include dark mode variants**
5. **Use CSS variables** for all tokens

---

## 3. Dark Mode Implementation

### Media Query Approach

```css
/* Light mode (default) */
.card {
  background: #FFFFFF;
  color: #000000;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  .card {
    background: #1a1a1a;
    color: #FFFFFF;
  }
}
```

### CSS Variable Approach (Preferred)

```css
:root {
  --bg-primary: #FFFFFF;
  --text-primary: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a1a1a;
    --text-primary: #FFFFFF;
  }
}

.card {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

### Related Guidance

- **Dark Mode Lessons Learned:** `guidelines/dark-mode-lessons-learned.md`
- **Light/Dark Mode Tokens:** `guidelines/design-tokens/light-dark-mode.md`

---

## 4. Responsive Breakpoints

### Breakpoint System

| Name | Size | Use Case |
|------|------|----------|
| mobile | < 640px | Mobile phones |
| tablet | 640px – 1024px | Tablets, small laptops |
| desktop | 1024px – 1536px | Desktops |
| wide | > 1536px | Large monitors |

### Media Query Usage

```css
/* Mobile-first approach */
.container {
  display: block;
  width: 100%;
}

/* Tablet and up */
@media (min-width: 640px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Related Guidance

- **Responsive Design:** `guidelines/responsive-design.md`
- **Breakpoints System:** `guidelines/responsive/breakpoints-system.md`
- **Layout Patterns:** `guidelines/responsive/layout-patterns.md`

---

## 5. CSS Best Practices

### Variables First

Always use CSS variables for values that might change:

```css
/* Good */
.button {
  background: var(--color-primary);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--text-size-base);
}

/* Avoid hardcoding */
.button {
  background: #FF006E;
  padding: 16px 24px;
  font-size: 16px;
}
```

### Specificity Management

Keep selector specificity low:

```css
/* Good: Low specificity */
.card__title {
  color: var(--text-primary);
}

/* Avoid: High specificity */
.container .card-wrapper .card .card__title {
  color: var(--text-primary);
}
```

### Avoid !important

Use specificity to solve conflicts, not !important:

```css
/* Good */
.button--secondary {
  background: var(--color-secondary);
}

/* Avoid */
.button {
  background: var(--color-primary) !important;
}
```

---

## Implementation Checklist

- [ ] BEM naming convention applied consistently
- [ ] CSS organized into logical block files
- [ ] Dark mode overrides present for all blocks
- [ ] Responsive breakpoints applied for tablet/mobile
- [ ] CSS variables used for all design tokens
- [ ] Reduced motion overrides included
- [ ] Focus states are visible and accessible
- [ ] No !important declarations
- [ ] Media queries use mobile-first approach

---

**Last Updated:** 2026-10-25  
**Maintained by:** Ash Shaw Portfolio Team  
**Canonical Reference:** Yes

