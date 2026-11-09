# N004: CSS & Styling Guide

**Purpose:** Utility-first CSS patterns using Tailwind CSS, BEM conventions for custom components, CSS variables for theming, and styling best practices.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority)

---

## Overview

CSS architecture for This One Time On Acid follows utility-first principles with Tailwind CSS:
- Utility classes for common patterns
- CSS variables for design tokens
- BEM conventions for custom components
- Dark mode via CSS variables
- Responsive design with mobile-first approach

**Related Guidelines:** See N001: Design Token Reference for color/spacing tokens; see N009: Responsive Design Patterns for breakpoints.

---

## Utility-First CSS (Tailwind)

### Basic Usage

```jsx
// Use utility classes for styling
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
  <img src="image.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
  <div>
    <h3 className="font-semibold text-lg text-gray-900">Title</h3>
    <p className="text-gray-600">Description</p>
  </div>
</div>
```typescript

### Common Patterns

#### Flexbox Layout
```jsx
// Row layout (default)
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Column layout
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Centering
<div className="flex items-center justify-center h-screen">Content</div>
```typescript

#### Responsive Design
```jsx
// Mobile-first: base classes apply at mobile, override at breakpoints
<div className="p-4 md:p-6 lg:p-8">
  Content
</div>

// Grid that changes columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```typescript

#### Dark Mode
```jsx
// Dark mode support via dark: prefix
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content automatically switches in dark mode
</div>
```typescript

---

## CSS Variables & Theming

### Design Token Variables

All design tokens defined in `src/styles/default-shadcn-theme.css`:

```css
:root {
  /* Colors */
  --color-primary: #[hex];
  --color-secondary: #[hex];
  --color-accent: #[hex];
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  
  /* Typography */
  --font-family-display: [font];
  --font-family-body: [font];
  --font-size-lg: 1.125rem;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #[hex];
    --color-secondary: #[hex];
  }
}
```typescript

### Usage in CSS

```css
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-md) var(--spacing-lg);
  font-family: var(--font-family-body);
}
```typescript

### Usage in Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
    },
    spacing: {
      xs: 'var(--spacing-xs)',
      sm: 'var(--spacing-sm)',
    },
  },
}
```typescript

---

## BEM Naming Convention

For custom components that need class names beyond Tailwind utilities:

### Block-Element-Modifier (BEM)

```html
<!-- Block: .card -->
<div class="card">
  <!-- Element: .card__header -->
  <div class="card__header">
    <!-- Modifier: .card__header--featured -->
    <div class="card__header--featured">Title</div>
  </div>
  
  <!-- Element: .card__body -->
  <div class="card__body">
    Content
  </div>
  
  <!-- Element with Modifier: .card__button -->
  <button class="card__button card__button--primary">Action</button>
</div>
```typescript

### CSS Implementation

```css
/* Block */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Element */
.card__header {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

/* Modifier */
.card__header--featured {
  background: var(--color-primary);
  color: white;
}

/* Element with Modifier */
.card__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card__button--primary {
  background: var(--color-primary);
  color: white;
}

.card__button--secondary {
  background: var(--color-secondary);
  color: white;
}
```typescript

### BEM Advantages
- Clear hierarchy and relationships
- Reduces specificity conflicts
- Self-documenting CSS
- Easier refactoring and maintenance

---

## Responsive Design

### Mobile-First Breakpoints

| Prefix | Min Width | Use Case |
|--------|-----------|----------|
| (none) | 0px | Mobile base styles |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large screens |

### Example: Responsive Typography

```jsx
<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>
```typescript

Renders as:
- Mobile (0px): 1.25rem (20px)
- Small Tablet (640px+): 1.5rem (24px)
- Tablet (768px+): 1.875rem (30px)
- Desktop (1024px+): 2.25rem (36px)

### Media Query Helpers

```css
/* Tablet and up */
@media (min-width: 768px) {
  .component { /* tablet styles */ }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component { /* desktop styles */ }
}

/* Mobile only */
@media (max-width: 767px) {
  .component { /* mobile styles */ }
}

/* Landscape orientation */
@media (orientation: landscape) {
  .component { /* landscape styles */ }
}

/* Reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```typescript

---

## Dark Mode Implementation

### Method: prefers-color-scheme

```css
/* Light mode (default) */
body {
  background-color: white;
  color: #333;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #f0f0f0;
  }
}
```typescript

### High Contrast Support

```css
/* High contrast dark mode */
@media (prefers-color-scheme: dark) and (prefers-contrast: more) {
  body {
    background-color: #000;
    color: #fff;
  }
}
```typescript

### Reduced Motion

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```typescript

---

## Performance Considerations

### CSS Specificity
- Avoid using `!important`
- Keep selectors short and specific
- Use classes, not IDs for styling
- Avoid deep nesting in Sass/SCSS

### Animations & Transitions
- Use GPU-accelerated properties: `transform`, `opacity`
- Avoid animating `left`, `top`, `width`, `height`
- Keep animations under 300ms for responsiveness
- Test performance on low-end devices

### File Size Optimization
- PurgeCSS/Tailwind removes unused styles
- Use critical CSS for above-the-fold content
- Lazy load non-critical stylesheets
- Monitor bundle size in CI/CD

---

## Linting & Code Standards

### Stylelint Configuration
- Enforce consistent property ordering
- Prevent invalid CSS
- Enforce BEM naming conventions
- Check color contrast ratios

### Pre-commit Hooks
- Run stylelint before commit
- Auto-format CSS with Prettier
- Validate against design tokens

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS-Tricks Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [BEM Naming Convention](https://getbem.com/)
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

**Authority:** D4 (N-Document Approvals) | D3 (Design Authority)  
**Last Updated:** 2026-11-09  
**Related:** N001: Design Token Reference · N009: Responsive Design Patterns · N002: Accessibility Checklist
