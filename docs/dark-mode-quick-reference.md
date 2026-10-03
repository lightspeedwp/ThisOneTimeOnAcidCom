# 🚀 Dark Mode Quick Reference Card

One-page cheat sheet for rapid development with the dark mode theme system.

**Version:** 2.0.0 | **Last Updated:** March 11, 2026

---

## 🎨 Color Palette

### Core Surfaces
```css
--color-atomic-black: #0F0F0F;     /* Page background */
--color-dark-charcoal: #1A1A1A;    /* Cards, inputs, panels */
--color-dark-panel: #171722;       /* Alternative panels */
--color-hover: #242424;            /* Hover states */
```

### Text Colors
```css
--color-text-light: #F6F2EB;       /* Body text (14.8:1) */
--color-text-muted: #CFC7BB;       /* Secondary text (10.2:1) */
--color-text-fine: #9C9488;        /* Tertiary text (6.5:1) */
#FFFFFF                             /* Headings (21:1) */
```

### Neon Accents
```css
--color-neon-pink: #FF3AAE;        /* Primary CTA */
--color-neon-yellow: #F4FF3C;      /* Hover/Warning */
--color-neon-violet: #8A63FF;      /* Secondary */
--color-neon-green: #00FF85;       /* Success */
--color-neon-cyan: #00D4FF;        /* Info */
--color-neon-orange: #FF7A00;      /* Warning */
--color-neon-red: #FF0055;         /* Error */
--color-neon-blue: #4A90FF;        /* Info alt */
```

---

## 🧩 Component Quick Lookup

### Buttons
```html
<button class="button button--primary">Primary</button>
<button class="button button--secondary">Secondary</button>
<button class="button button--outline">Outline</button>
<button class="button button--ghost">Ghost</button>
<button class="button button--large">Large</button>
<button class="button button--small">Small</button>
```

### Cards
```html
<div class="card">
  <h3 class="card__title">Title</h3>
  <p class="card__description">Description</p>
</div>

<!-- Featured variant -->
<div class="card card--featured">
  <span class="card__badge">Featured</span>
  <h3 class="card__title">Featured Card</h3>
</div>
```

### Forms
```html
<!-- Text Input -->
<div class="form__group">
  <label class="form__label">Label</label>
  <input type="text" class="form__input" placeholder="Text..." />
</div>

<!-- Textarea -->
<div class="form__group">
  <label class="form__label">Message</label>
  <textarea class="form__textarea" rows="4"></textarea>
</div>

<!-- Checkbox -->
<label class="form__checkbox">
  <input type="checkbox" checked />
  <span>Remember me</span>
</label>

<!-- Radio -->
<label class="form__radio">
  <input type="radio" name="plan" value="basic" />
  <span>Basic Plan</span>
</label>

<!-- Select -->
<select class="form__select">
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Switch -->
<label class="switch">
  <input type="checkbox" checked />
  <span class="switch__slider"></span>
  <span class="switch__label">Enable feature</span>
</label>
```

### Alerts
```html
<div class="alert alert--success">Success message</div>
<div class="alert alert--warning">Warning message</div>
<div class="alert alert--error">Error message</div>
<div class="alert alert--info">Info message</div>
```

### Toast Notifications
```html
<div class="toast toast--success">
  <p>✓ Success message</p>
  <button class="toast__close">×</button>
</div>
```

### Badges
```html
<span class="badge badge--primary">New</span>
<span class="badge badge--success">Active</span>
<span class="badge badge--warning">Pending</span>
<span class="badge badge--error">Closed</span>
```

### Progress Bars
```html
<div class="progress">
  <div class="progress__bar" style="width: 75%;"></div>
  <span class="progress__label">75%</span>
</div>

<!-- Color variants -->
<div class="progress__bar progress__bar--success"></div>
<div class="progress__bar progress__bar--warning"></div>
<div class="progress__bar progress__bar--error"></div>
```

### Breadcrumbs
```html
<nav class="breadcrumbs">
  <a href="/" class="breadcrumbs__link">Home</a>
  <span class="breadcrumbs__separator">/</span>
  <a href="/blog" class="breadcrumbs__link">Blog</a>
  <span class="breadcrumbs__separator">/</span>
  <span class="breadcrumbs__current">Post Title</span>
</nav>
```

### Pagination
```html
<nav class="pagination">
  <button class="pagination__link">← Previous</button>
  <button class="pagination__link">1</button>
  <button class="pagination__link pagination__link--active">2</button>
  <button class="pagination__link">3</button>
  <button class="pagination__link">Next →</button>
</nav>
```

### Tabs
```html
<div class="tabs">
  <div class="tabs__list">
    <button class="tabs__button tabs__button--active">Tab 1</button>
    <button class="tabs__button">Tab 2</button>
    <button class="tabs__button">Tab 3</button>
  </div>
  <div class="tabs__panel">Content here</div>
</div>
```

### Accordion
```html
<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__header accordion__header--active">
      <span>Question</span>
      <svg class="accordion__icon"><!-- Icon --></svg>
    </button>
    <div class="accordion__content">
      <p>Answer</p>
    </div>
  </div>
</div>
```

### Modal
```html
<div class="modal">
  <div class="modal__backdrop"></div>
  <div class="modal__content">
    <h2>Modal Title</h2>
    <p>Modal content...</p>
    <button class="modal__close">×</button>
  </div>
</div>
```

### Tooltip
```html
<button data-tooltip="Helpful text">Hover me</button>
```

### Dropdown
```html
<div class="dropdown">
  <button class="dropdown__trigger">Options ▼</button>
  <div class="dropdown__menu">
    <button class="dropdown__item">Edit</button>
    <button class="dropdown__item">Delete</button>
  </div>
</div>
```

### Timeline
```html
<div class="timeline">
  <div class="timeline__item">
    <div class="timeline__marker"></div>
    <div class="timeline__content">
      <h4 class="timeline__title">Event Title</h4>
      <p class="timeline__date">March 11, 2026</p>
      <p>Description</p>
    </div>
  </div>
</div>
```

### Rating
```html
<div class="rating">
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star">★</span>
  <span class="rating__star">★</span>
  <span class="rating__count">(3/5)</span>
</div>
```

### Status Indicators
```html
<span class="status status--online"></span> <!-- Green -->
<span class="status status--offline"></span> <!-- Gray -->
<span class="status status--busy"></span> <!-- Red -->
<span class="status status--away"></span> <!-- Yellow -->
```

### Loading Spinner
```html
<div class="spinner" role="status">
  <span class="sr-only">Loading...</span>
</div>

<!-- Neon variant -->
<div class="spinner spinner--neon"></div>
```

### Skeleton Loader
```html
<div class="skeleton skeleton--text"></div>
<div class="skeleton skeleton--heading"></div>
<div class="skeleton skeleton--circle"></div>
<div class="skeleton skeleton--neon skeleton--text"></div>
```

---

## 🎯 Common Patterns

### Two-Column Layout
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
  <div>Left column</div>
  <div>Right column</div>
</div>
```

### Three-Column Grid
```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Responsive Grid (Auto-fit)
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
  <!-- Cards automatically adjust -->
</div>
```

### Centered Container
```html
<div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
  <!-- Content -->
</div>
```

### Flex Row with Gap
```html
<div style="display: flex; gap: 1rem; align-items: center;">
  <button class="button button--primary">Action</button>
  <button class="button button--secondary">Cancel</button>
</div>
```

### Sticky Header
```html
<header class="header" style="position: sticky; top: 0; z-index: 100;">
  <!-- Nav content -->
</header>
```

---

## ⚡ Quick Tips

### Activation
```html
<!-- Add .dark class to html or body -->
<html class="dark">
```

### Imports
```css
@import './themes/dark.css';
@import './themes/dark-extended.css';
```

### Custom Colors
```css
/* Use CSS variables */
.custom-element {
  background-color: var(--color-neon-pink);
  color: var(--color-text-light);
}
```

### Gradients
```css
/* Pink → Violet → Cyan */
background: linear-gradient(
  135deg, 
  #FF3AAE 0%, 
  #8A63FF 50%, 
  #00D4FF 100%
);
```

### Glow Effect
```css
box-shadow: 0 0 20px rgba(255, 58, 174, 0.5);
```

### Hover States
```css
.element:hover {
  border-color: var(--color-neon-pink);
  box-shadow: 0 0 20px rgba(255, 58, 174, 0.5);
}
```

### Focus States
```css
.element:focus {
  outline: 2px solid var(--color-neon-pink);
  outline-offset: 2px;
  box-shadow: 0 0 0 2px rgba(255, 58, 174, 0.3);
}
```

---

## 🔧 Utility Classes

### Spacing
```css
.m-0    /* margin: 0 */
.p-0    /* padding: 0 */
.mt-1   /* margin-top: 0.25rem */
.mb-2   /* margin-bottom: 0.5rem */
.px-4   /* padding-left/right: 1rem */
.py-2   /* padding-top/bottom: 0.5rem */
```

### Text Alignment
```css
.text-left
.text-center
.text-right
```

### Display
```css
.d-none         /* display: none */
.d-block        /* display: block */
.d-flex         /* display: flex */
.d-grid         /* display: grid */
```

### Visibility (Screen Readers)
```css
.sr-only        /* Visually hidden, screen reader accessible */
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
@media (min-width: 480px) { /* Mobile */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large desktop */ }

/* Hide on mobile */
@media (max-width: 767px) {
  .hide-mobile { display: none; }
}

/* Hide on desktop */
@media (min-width: 768px) {
  .hide-desktop { display: none; }
}
```

---

## ♿ Accessibility Checklist

- [ ] Add `.dark` class to `<html>`
- [ ] Use semantic HTML (`<nav>`, `<article>`, `<aside>`)
- [ ] Include ARIA labels on icons
- [ ] Ensure 4.5:1 contrast minimum
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Add focus indicators to all interactive elements
- [ ] Support `prefers-reduced-motion`
- [ ] Include alt text on images
- [ ] Use proper heading hierarchy (h1 → h2 → h3)
- [ ] Test with screen reader

---

## 🐛 Common Issues

**Dark mode not working?**
```html
<!-- Ensure .dark class is on html or body -->
<html class="dark">
```

**Colors look wrong?**
```css
/* Check CSS import order */
@import './themes/light.css';
@import './themes/dark.css';
@import './themes/dark-extended.css';
```

**Component not styled?**
```html
<!-- Verify exact BEM class names -->
<button class="button button--primary">Click</button>
<!-- NOT: btn btn-primary -->
```

**Focus indicator missing?**
```css
/* Never remove outline without replacement */
button:focus {
  outline: 2px solid var(--color-neon-pink);
}
```

---

## 📚 Resources

- **Complete Guide:** `/docs/dark-mode-usage-guide.md`
- **All Components:** `/docs/dark-mode-component-showcase.md`
- **Patterns:** `/docs/dark-mode-composition-patterns.md`
- **Checklist:** `/tasks/dark-mode-implementation-checklist.md`
- **Report:** `/reports/theme-styling-audit/dark-mode-final-completion-report.md`

---

## 🎨 Color Swatches

```
█ #0F0F0F  Atomic Black (background)
█ #1A1A1A  Dark Charcoal (cards)
█ #F6F2EB  Text Light (body)
█ #FFFFFF  Pure White (headings)
█ #FF3AAE  Neon Pink (primary)
█ #F4FF3C  Neon Yellow (hover)
█ #8A63FF  UV Violet (secondary)
█ #00FF85  Neon Green (success)
█ #00D4FF  Aqua Cyan (info)
█ #FF7A00  Blazing Orange (warning)
█ #FF0055  Hot Red (error)
█ #4A90FF  Royal Blue (info alt)
```

---

**Print this page for desk reference!** 🖨️

**Version:** 2.0.0 | **Components:** 54 | **WCAG:** AA ✅
