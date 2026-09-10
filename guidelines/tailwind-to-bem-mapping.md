---
title: "Tailwind to BEM Mapping Guide"
filename: "/guidelines/tailwind-to-bem-mapping.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
related_report: "/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md"
---

# Tailwind to BEM Mapping Guide

**Purpose:** Reference guide for converting Tailwind utility classes to BEM CSS architecture  
**Audience:** Developers joining the project or refactoring Tailwind code  
**Status:** Permanent guideline

---

## Quick Reference

This guide provides **direct mappings** from common Tailwind utility classes to the project's BEM CSS classes and WordPress-aligned custom properties.

---

## Core Principles

1. **No Tailwind utilities allowed** - Use BEM classes from `/styles/globals.css` or component CSS files
2. **WordPress-aligned custom properties** - Use `--wp--preset--*` format for colors, typography, spacing
3. **Semantic class names** - Classes should describe **what**, not **how** (`.portfolio-card` not `.flex-container`)
4. **Component-first** - Create BEM classes for reusable components, avoid one-off inline styles

---

## Layout Utilities

| Tailwind | BEM Class | Location | Example |
|----------|-----------|----------|---------|
| `.container` | `.container-wide` | `globals.css` | `<div class="container-wide">` |
| `.max-w-7xl` | `.container-wide` | `globals.css` | Max-width: 1440px |
| `.max-w-4xl` | `.container-content` | `globals.css` | Max-width: 800px (reading width) |
| `.mx-auto` | `.section-container` | `globals.css` | `margin: 0 auto` |
| `.px-4` | `.px-horizontal-section` | `globals.css` | Fluid horizontal padding |
| `.py-8` | `.section-spacing` | `globals.css` | Fluid vertical spacing |
| `.flex` | Component CSS | `component.css` | Define in BEM class |
| `.grid` | `.grid-2col`, `.grid-3col`, `.grid-4col` | `globals.css` | Responsive grid templates |
| `.gap-4` | Component CSS | `component.css` | `gap: 1rem` |

**Example:**
```html
<!-- Tailwind -->
<div class="container mx-auto px-4 py-8">

<!-- BEM -->
<div class="container-wide section-container px-horizontal-section section-spacing">
```

---

## Typography Utilities

| Tailwind | BEM Class | CSS Value | Notes |
|----------|-----------|-----------|-------|
| `.text-6xl` | `.text-hero-h1` | `clamp(36px, 5vw, 120px)` | Fluid hero headings |
| `.text-4xl` | `.text-section-h2` | `clamp(24px, 4vw, 48px)` | Section headings |
| `.text-2xl` | `.text-card-h3` | `24px` | Card/article headings |
| `.text-xl` | `.text-lead` | `clamp(18px, 2vw, 24px)` | Lead paragraphs |
| `.text-base` | `.text-body-p` | `16px → 20px` | Body copy |
| `.text-sm` | `.text-fine` | `12px` | Small print |
| `.font-bold` | `.font-heading` | 700 weight | Heading font stack |
| `.font-sans` | `.font-body` | Inter | Body font |
| `.font-serif` | `.font-heading` | Playfair Display | Display font |
| `.text-center` | `.text-center` | `text-align: center` | Direct utility |
| `.text-left` | `.text-left` | `text-align: left` | Direct utility |
| `.italic` | `.italic` | `font-style: italic` | Direct utility |

**Example:**
```html
<!-- Tailwind -->
<h1 class="text-6xl font-bold text-center">

<!-- BEM -->
<h1 class="text-hero-h1 text-center">
```

---

## Color Utilities

### Text Colors

| Tailwind | BEM Class | Custom Property |
|----------|-----------|-----------------|
| `.text-white` | Default (body) | `--color-text-light` |
| `.text-gray-400` | Default (body) | `--color-text-muted` |
| `.text-gray-600` | `.text-fine` | `--color-text-fine` |
| `.text-pink-500` | `.text-neon-pink` | `--color-neon-pink` |
| `.text-yellow-400` | `.text-neon-yellow` | `--color-neon-yellow` |
| `.text-green-400` | `.text-neon-green` | `--color-neon-green` |
| `.text-purple-500` | `.text-uv-violet` | `--color-uv-violet` |

### Background Colors

| Tailwind | BEM Class | Custom Property |
|----------|-----------|-----------------|
| `.bg-black` | Body default | `--color-atomic-black` |
| `.bg-gray-900` | `.bg-dark-panel` | `--color-dark-panel` |
| `.bg-gray-800` | `.bg-dark-charcoal` | `--color-dark-charcoal` |
| `.bg-pink-500` | `.bg-neon-pink` | `--color-neon-pink` |

### Gradients

| Tailwind | BEM Class | Example |
|----------|-----------|---------|
| `.bg-gradient-to-r from-pink-500 to-purple-600` | `.bg-gradient-cyberpunk` | Pink → Purple → Blue |
| `.bg-gradient-to-r from-green-400 to-cyan-500` | `.bg-gradient-toxic-lime` | Green → Cyan |
| `.bg-gradient-to-r from-orange-500 to-yellow-400` | `.bg-gradient-solar-flare` | Orange → Yellow |
| `.text-transparent bg-clip-text bg-gradient-*` | `.text-gradient-pink-purple-blue` | Gradient text |

**Example:**
```html
<!-- Tailwind -->
<div class="bg-gradient-to-r from-pink-500 to-purple-600">
  <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">

<!-- BEM -->
<div class="bg-gradient-cyberpunk">
  <h1 class="text-gradient-pink-purple-blue">
```

---

## Spacing Utilities

| Tailwind | BEM Class | CSS Value | Notes |
|----------|-----------|-----------|-------|
| `.p-4` | Component CSS | `1rem` | Define in BEM class |
| `.px-6` | `.px-horizontal-section` | `clamp(1rem, 4vw, 3rem)` | Fluid horizontal padding |
| `.py-8` | `.section-spacing` | `clamp(2rem, 6vw, 4rem)` | Fluid vertical spacing |
| `.mb-4` | `.mb-fluid-sm` | `clamp(1rem, 2vw, 1.5rem)` | Small fluid margin |
| `.mb-8` | `.mb-fluid-md` | `clamp(2rem, 4vw, 3rem)` | Medium fluid margin |
| `.gap-4` | Component CSS | `gap: 1rem` | Define in component |

**WordPress Spacing Presets:**
```css
--wp--preset--spacing--20: 0.5rem   /* Tailwind spacing-2 */
--wp--preset--spacing--30: 1rem     /* Tailwind spacing-4 */
--wp--preset--spacing--40: 1.5rem   /* Tailwind spacing-6 */
--wp--preset--spacing--50: 2rem     /* Tailwind spacing-8 */
--wp--preset--spacing--60: 3rem     /* Tailwind spacing-12 */
```

---

## Display & Position Utilities

| Tailwind | BEM Approach | Notes |
|----------|--------------|-------|
| `.block` | Define in component CSS | `display: block` |
| `.inline-block` | Define in component CSS | `display: inline-block` |
| `.flex` | Define in component CSS | `display: flex` |
| `.grid` | Use `.grid-*col` or define | Predefined responsive grids |
| `.hidden` | `.visually-hidden` | For screen readers |
| `.relative` | Define in component CSS | `position: relative` |
| `.absolute` | Define in component CSS | `position: absolute` |
| `.fixed` | Define in component CSS | `position: fixed` |
| `.sticky` | Example: `.header` | `position: sticky; top: 0` |

---

## Common Pattern Conversions

### Pattern 1: Flex Container

**Tailwind:**
```html
<div class="flex items-center justify-between gap-4 p-6">
  <span>Left</span>
  <span>Right</span>
</div>
```

**BEM:**
```html
<div class="header__nav">
  <span>Left</span>
  <span>Right</span>
</div>
```

```css
/* /styles/blocks/header.css */
.header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.5rem;
}
```

---

### Pattern 2: Grid Layout

**Tailwind:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**BEM:**
```html
<div class="videos-grid">
  <div class="video-card">Item 1</div>
  <div class="video-card">Item 2</div>
  <div class="video-card">Item 3</div>
</div>
```

```css
/* /styles/blocks/videos.css */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

@media (min-width: 768px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### Pattern 3: Card Component

**Tailwind:**
```html
<div class="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow">
  <h3 class="text-2xl font-bold text-white mb-4">Title</h3>
  <p class="text-gray-400 mb-6">Description text</p>
  <button class="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600">
    Read More
  </button>
</div>
```

**BEM:**
```html
<div class="portfolio-card">
  <h3 class="portfolio-card__title">Title</h3>
  <p class="portfolio-card__desc">Description text</p>
  <button class="button button--primary">Read More</button>
</div>
```

```css
/* /styles/blocks/portfolio-card.css */
.portfolio-card {
  background-color: var(--color-dark-panel);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
}

.portfolio-card:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
}

.portfolio-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.portfolio-card__desc {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
}
```

---

### Pattern 4: Button Component

**Tailwind:**
```html
<button class="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-md shadow-lg transition-all transform hover:-translate-y-1">
  Click Me
</button>
```

**BEM:**
```html
<button class="button button--primary">
  Click Me
</button>
```

```css
/* /styles/globals.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-family: var(--font-heading);
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button--primary {
  background-color: var(--color-neon-pink);
  color: #fff;
  box-shadow: 0 4px 20px rgba(255, 58, 174, 0.3);
}

.button--primary:hover {
  background-color: #ff52b9;
  box-shadow: 0 4px 25px rgba(255, 58, 174, 0.5);
  transform: translateY(-2px);
}

.button--secondary {
  background-color: transparent;
  color: var(--color-text-light);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.button--secondary:hover {
  border-color: var(--color-neon-yellow);
  color: var(--color-neon-yellow);
}
```

---

## WordPress Custom Properties

### Color Presets

```css
/* WordPress-aligned color system */
--wp--preset--color--atomic-black: #0B0B10;
--wp--preset--color--neon-pink: #FF3AAE;
--wp--preset--color--neon-yellow: #F4FF3C;
--wp--preset--color--neon-green: #39FF14;
--wp--preset--color--neon-blue: #00F7FF;
--wp--preset--color--uv-violet: #8A63FF;
--wp--preset--color--neon-orange: #FF6B35;
--wp--preset--color--neon-red: #FF0055;
```

### Typography Presets

```css
/* Font sizes */
--wp--preset--font-size--small: 12px;
--wp--preset--font-size--medium: 16px;
--wp--preset--font-size--large: 24px;
--wp--preset--font-size--hero-h1: clamp(36px, 5vw, 120px);
--wp--preset--font-size--section-h2: clamp(24px, 4vw, 48px);

/* Font families */
--wp--preset--font-family--heading: 'Space Grotesk', 'Playfair Display', serif;
--wp--preset--font-family--body: 'Inter', sans-serif;
```

---

## BEM Naming Convention

### Block
The standalone component (e.g., `.card`, `.button`, `.header`)

```css
.portfolio-card { }
```

### Element
A part of the block (use `__` double underscore)

```css
.portfolio-card__image { }
.portfolio-card__title { }
.portfolio-card__desc { }
```

### Modifier
A variation of the block or element (use `--` double hyphen)

```css
.portfolio-card--featured { }
.portfolio-card__title--large { }
.button--primary { }
.button--secondary { }
```

### Example Component

```css
/* Block */
.mega-menu { }

/* Elements */
.mega-menu__grid { }
.mega-menu__featured { }
.mega-menu__featured-image { }
.mega-menu__featured-title { }
.mega-menu__cat-link { }

/* Modifiers */
.mega-menu--blog { }
.mega-menu--portfolio { }
.mega-menu__grid--three { }
.mega-menu__featured-overlay--blog { }
```

---

## When to Create BEM Classes

✅ **Create a BEM class when:**
- Component appears 3+ times across the site
- Component has multiple states or variations
- Styling is semantically meaningful (`.portfolio-card` vs `.flex-container`)
- Component should be reusable

❌ **Use inline styles when:**
- Value is dynamically calculated (e.g., `transform: translateX(${offset}px)`)
- ES5 constraint requires object literal workaround
- One-time unique styling that won't be reused
- Working with JavaScript-computed values

**Example of acceptable inline style (ES5 constraint):**
```typescript
// ES5 bundler doesn't support object literals in createElement
React.createElement('div', {
  style: { 
    transform: `translateX(${swipeOffset}px)`,
    transition: isAnimating ? 'transform 0.3s ease' : 'none'
  }
})
```

---

## File Organization

### Global Utilities
**File:** `/styles/globals.css`  
**Purpose:** Site-wide utilities (containers, typography, colors, buttons, forms)

```css
.container-wide { }
.text-hero-h1 { }
.text-gradient-pink-purple-blue { }
.button { }
.button--primary { }
```

### Component Styles
**Files:** `/styles/blocks/*.css`  
**Purpose:** Component-specific BEM classes

```
/styles/blocks/
├── header.css                 # .header, .header__nav, etc.
├── footer.css                 # .footer, .footer__grid, etc.
├── mega-menu.css              # .mega-menu, .mega-menu__grid, etc.
├── portfolio-card.css         # .portfolio-card, .portfolio-card__title, etc.
├── ebook-base.css             # .ebook-reader, .ebook-reader__controls, etc.
└── ...
```

### Import Pattern
Components import their own CSS:

```typescript
// In component file
import '../../styles/blocks/portfolio-card.css';

export function PortfolioCard() {
  return React.createElement('div', { className: 'portfolio-card' }, ...);
}
```

---

## Migration Checklist

When converting Tailwind code to BEM:

- [ ] Identify reusable components (3+ uses)
- [ ] Create semantic BEM class names (`.portfolio-card` not `.card-1`)
- [ ] Use WordPress-aligned custom properties (`--wp--preset--color--*`)
- [ ] Create component CSS file in `/styles/blocks/`
- [ ] Import CSS file in component
- [ ] Replace all Tailwind classes with BEM classes
- [ ] Test responsive behavior
- [ ] Verify dark mode support (if applicable)
- [ ] Update component documentation

---

## Quick Lookup Table

| Need | BEM Class | File |
|------|-----------|------|
| **Container** | `.container-wide`, `.section-container` | `globals.css` |
| **Heading** | `.text-hero-h1`, `.text-section-h2`, `.text-card-h3` | `globals.css` |
| **Paragraph** | `.text-body-p`, `.text-lead`, `.text-fine` | `globals.css` |
| **Button** | `.button`, `.button--primary`, `.button--secondary` | `globals.css` |
| **Form** | `.form`, `.form__input`, `.form__label` | `globals.css` |
| **Grid** | `.grid-2col`, `.grid-3col`, `.grid-4col` | `globals.css` |
| **Spacing** | `.section-spacing`, `.px-horizontal-section`, `.mb-fluid-*` | `globals.css` |
| **Background** | `.bg-atomic-noise`, `.bg-gradient-cyberpunk`, `.bg-dark-panel` | `globals.css` |
| **Text Gradient** | `.text-gradient-pink-purple-blue`, `.text-gradient-toxic-lime` | `globals.css` |
| **Text Color** | `.text-neon-pink`, `.text-neon-green`, `.text-uv-violet` | `globals.css` |

---

## Related Documentation

**Guidelines:**
- [Main Guidelines](./Guidelines.md) - Project overview and BEM architecture rules
- [CSS Architecture](./css-architecture.md) - BEM naming and organization
- [Component Guidelines](./overview-components.md) - Component patterns

**Reports:**
- [Tailwind Violations Audit](../reports/2026-03-11-modern-react-migration/02-tailwind-violations-audit.md)
- [Tailwind-to-BEM Mapping Report](../reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md)

---

**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
