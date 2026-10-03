---
title: "Tailwind-to-BEM Mapping Analysis Report"
filename: "/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md"
created: "2026-03-11"
completed: "2026-03-11"
version: "1.0.0"
status: "complete"
auditor: "AI Assistant"
related_prompt: "/prompts/modern-react-migration/03-tailwind-to-bem-mapping.md"
related_guideline: "/guidelines/tailwind-to-bem-mapping.md"
---

# Tailwind-to-BEM Mapping Analysis Report

**Audit Date:** March 11, 2026  
**Purpose:** Document existing BEM architecture and create Tailwind conversion reference  
**Status:** ✅ Complete - Permanent guideline created

---

## Executive Summary

This report documents the **complete mapping** between Tailwind utility classes and the project's BEM CSS architecture. A permanent guideline has been created at `/guidelines/tailwind-to-bem-mapping.md` for developer reference.

**Key Findings:**
- ✅ 150+ BEM classes documented across `/styles/globals.css` and `/styles/blocks/*.css`
- ✅ WordPress-aligned custom properties for all colors, typography, and spacing
- ✅ Semantic utility classes for common patterns (text alignment, gradients, backgrounds)
- ✅ Complete design token system with CSS variables

---

## Available BEM Classes Inventory

### Layout Classes

| Category | BEM Classes | Count |
|----------|-------------|-------|
| **Containers** | `.container-wide`, `.container-content`, `.section-container` | 3 |
| **Spacing** | `.section-spacing`, `.px-horizontal-section`, `.mb-fluid-sm`, `.mb-fluid-md` | 10+ |
| **Grid** | `.grid-2col`, `.grid-3col`, `.grid-4col`, `.grid-auto-fit` | 8 |
| **Flex** | `.header__nav` (flex), `.footer__grid` (grid) | Component-specific |

### Typography Classes

| Category | BEM Classes | Count |
|----------|-------------|-------|
| **Headings** | `.text-hero-h1`, `.text-section-h2`, `.text-card-h3` | 5 |
| **Body** | `.text-body-p`, `.text-lead`, `.text-fine` | 4 |
| **Font Families** | `.font-heading`, `.font-body`, `.font-title` | 3 |
| **Utilities** | `.text-center`, `.text-left`, `.italic` | 3 |

### Color Classes

| Category | BEM Classes | Count |
|----------|-------------|-------|
| **Text Colors** | `.text-neon-pink`, `.text-neon-yellow`, `.text-neon-green`, `.text-uv-violet` | 8+ |
| **Backgrounds** | `.bg-atomic-noise`, `.bg-gradient-pink-purple-blue`, `.bg-dark-panel` | 12+ |
| **Gradients (Text)** | `.text-gradient-pink-purple-blue`, `.text-gradient-blue-teal-green`, `.text-gradient-gold-peach-coral` | 6 |
| **Gradients (BG)** | `.bg-gradient-cyberpunk`, `.bg-gradient-toxic-lime`, `.bg-gradient-solar-flare` | 8 |

### Component Classes

| Component | BEM Block | Element/Modifier Count |
|-----------|-----------|------------------------|
| **Header** | `.header` | 10 elements |
| **Footer** | `.footer` | 8 elements |
| **Button** | `.button` | 6 modifiers |
| **Form** | `.form` | 8 elements |
| **Card** | `.portfolio-card`, `.blog-card`, `.video-card` | 15+ per type |
| **Mega Menu** | `.mega-menu` | 25+ elements |
| **Ebook Reader** | `.ebook-reader` | 40+ elements |
| **Stickers** | `.stickers-page` | 20+ elements |

---

## Tailwind → BEM Mapping Tables

### Layout Utilities

| Tailwind Class | BEM Equivalent | CSS File |
|----------------|----------------|----------|
| `.container` | `.container-wide` | `globals.css` |
| `.max-w-7xl` | `.container-wide` (max-width: 1440px) | `globals.css` |
| `.max-w-4xl` | `.container-content` (max-width: 800px) | `globals.css` |
| `.mx-auto` | `.section-container` (margin: 0 auto) | `globals.css` |
| `.px-4` | `.px-horizontal-section` | `globals.css` |
| `.py-8` | `.section-spacing` | `globals.css` |
| `.flex` | Use `display: flex` in BEM class | Component CSS |
| `.grid` | `.grid-2col`, `.grid-3col`, `.grid-4col` | `globals.css` |
| `.gap-4` | Use `gap:` in component CSS | Component CSS |

### Typography Utilities

| Tailwind Class | BEM Equivalent | Notes |
|----------------|----------------|-------|
| `.text-4xl` | `.text-hero-h1` | Fluid typography with clamp() |
| `.text-2xl` | `.text-section-h2` | Fluid typography |
| `.text-xl` | `.text-card-h3` | Fixed size |
| `.text-lg` | `.text-lead` | Fluid lead text |
| `.text-base` | `.text-body-p` | Body copy |
| `.text-sm` | `.text-fine` | Small print |
| `.font-bold` | Use `.font-heading` + weight | Handled by font-family |
| `.font-sans` | `.font-body` | Inter font stack |
| `.font-serif` | `.font-heading` | Playfair Display |
| `.text-center` | `.text-center` | Direct utility |
| `.text-left` | `.text-left` | Direct utility |
| `.italic` | `.italic` | Direct utility |

### Color Utilities

| Tailwind Class | BEM Equivalent | Custom Property |
|----------------|----------------|-----------------|
| `.text-gray-900` | `.text-neon-pink` (primary) | `var(--color-neon-pink)` |
| `.text-gray-600` | Default body color | `var(--color-text-muted)` |
| `.text-white` | Default heading color | `var(--color-text-light)` |
| `.bg-black` | Body background | `var(--color-atomic-black)` |
| `.bg-gray-800` | `.bg-dark-panel` | `var(--color-dark-panel)` |
| `.bg-blue-500` | `.bg-neon-blue` (custom) | `var(--color-neon-blue)` |
| `.bg-gradient-to-r` | `.bg-gradient-cyberpunk` | Multi-stop gradient |

### Spacing Utilities

| Tailwind Class | BEM Equivalent | CSS Value |
|----------------|----------------|-----------|
| `.p-4` | Component-specific padding | Use in BEM class |
| `.px-6` | `.px-horizontal-section` | `clamp(1rem, 4vw, 3rem)` |
| `.py-8` | `.section-spacing` | `clamp(2rem, 6vw, 4rem)` |
| `.mb-4` | `.mb-fluid-sm` | `clamp(1rem, 2vw, 1.5rem)` |
| `.mb-8` | `.mb-fluid-md` | `clamp(2rem, 4vw, 3rem)` |
| `.gap-4` | Defined in component CSS | `gap: 1rem` or `gap: var(--spacing-4)` |

### Display Utilities

| Tailwind Class | BEM Equivalent | Notes |
|----------------|----------------|-------|
| `.block` | Define in component CSS | `display: block` |
| `.inline-block` | Define in component CSS | `display: inline-block` |
| `.flex` | Define in component CSS | `display: flex` |
| `.grid` | Use `.grid-*col` utilities | Predefined grid templates |
| `.hidden` | `.visually-hidden` | For screen readers |

### Position Utilities

| Tailwind Class | BEM Equivalent | Notes |
|----------------|----------------|-------|
| `.relative` | Define in component CSS | `position: relative` |
| `.absolute` | Define in component CSS | `position: absolute` |
| `.fixed` | Define in component CSS | `position: fixed` |
| `.sticky` | `.header` uses sticky | `position: sticky; top: 0` |

---

## WordPress Custom Properties Mapping

### Color Presets

```css
/* Tailwind → WordPress Custom Properties */
--tw-gray-900    → --wp--preset--color--atomic-black: #0B0B10
--tw-pink-500    → --wp--preset--color--neon-pink: #FF3AAE
--tw-yellow-400  → --wp--preset--color--neon-yellow: #F4FF3C
--tw-purple-500  → --wp--preset--color--uv-violet: #8A63FF
--tw-green-400   → --wp--preset--color--neon-green: #39FF14
--tw-blue-500    → --wp--preset--color--neon-blue: #00F7FF
--tw-orange-500  → --wp--preset--color--neon-orange: #FF6B35
--tw-red-500     → --wp--preset--color--neon-red: #FF0055
```

### Typography Presets

```css
/* Font Sizes */
--tw-text-xs     → --wp--preset--font-size--small: 12px
--tw-text-base   → --wp--preset--font-size--medium: 16px
--tw-text-2xl    → --wp--preset--font-size--large: 24px
--tw-text-4xl    → --wp--preset--font-size--hero-h1: clamp(36px, 5vw, 120px)

/* Font Families */
--tw-font-sans   → --wp--preset--font-family--body: 'Inter', sans-serif
--tw--font-serif → --wp--preset--font-family--heading: 'Space Grotesk', 'Playfair Display', serif
```

### Spacing Presets

```css
--tw-spacing-4   → --wp--preset--spacing--20: 0.5rem
--tw-spacing-8   → --wp--preset--spacing--30: 1rem
--tw-spacing-16  → --wp--preset--spacing--40: 1.5rem
--tw-spacing-24  → --wp--preset--spacing--50: 2rem
--tw-spacing-32  → --wp--preset--spacing--60: 3rem
```

---

## Common Pattern Conversions

### Flexbox Patterns

**Tailwind:**
```html
<div class="flex items-center justify-between gap-4">
```

**BEM:**
```html
<div class="header__nav">
```

```css
/* In /styles/blocks/header.css */
.header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
```

---

### Grid Patterns

**Tailwind:**
```html
<div class="grid grid-cols-3 gap-8">
```

**BEM:**
```html
<div class="grid-3col">
```

```css
/* In globals.css */
.grid-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
```

---

### Card Component

**Tailwind:**
```html
<div class="bg-gray-800 p-6 rounded-lg shadow-lg">
  <h3 class="text-2xl font-bold mb-4">Title</h3>
  <p class="text-gray-400">Description</p>
</div>
```

**BEM:**
```html
<div class="portfolio-card">
  <h3 class="portfolio-card__title">Title</h3>
  <p class="portfolio-card__desc">Description</p>
</div>
```

```css
/* In /styles/blocks/portfolio-card.css */
.portfolio-card {
  background-color: var(--color-dark-panel);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.portfolio-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.portfolio-card__desc {
  color: var(--color-text-muted);
}
```

---

### Button Component

**Tailwind:**
```html
<button class="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-md font-bold">
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
/* In globals.css */
.button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
}
.button--primary {
  background-color: var(--color-neon-pink);
  color: #fff;
  box-shadow: 0 4px 20px rgba(255, 58, 174, 0.3);
}
.button--primary:hover {
  background-color: #ff52b9;
  transform: translateY(-2px);
}
```

---

## Design Token System

### Available CSS Variables

```css
/* Colors */
--color-atomic-black: #0B0B10;
--color-dark-charcoal: #12121A;
--color-dark-panel: #171722;
--color-neon-pink: #FF3AAE;
--color-neon-yellow: #F4FF3C;
--color-neon-green: #39FF14;
--color-neon-blue: #00F7FF;
--color-uv-violet: #8A63FF;
--color-text-light: #F6F2EB;
--color-text-muted: #CFC7BB;
--color-text-fine: #9C9488;

/* Typography */
--font-heading: 'Space Grotesk', 'Righteous', 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;

/* Responsive Spacing (from WordPress presets) */
--wp--preset--spacing--20: clamp(0.5rem, 1vw, 0.75rem);
--wp--preset--spacing--30: clamp(1rem, 2vw, 1.5rem);
--wp--preset--spacing--40: clamp(1.5rem, 3vw, 2rem);
```

---

## Conversion Guidelines

### When to Create BEM Classes

✅ **Create a BEM class when:**
- Component appears 3+ times across the site
- Component has multiple states/variations
- Styling is semantically meaningful
- Component is reusable

❌ **Use inline styles when:**
- Value is dynamically calculated (transform, color from props)
- ES5 constraint requires object literal workaround
- One-time unique styling that won't be reused

### BEM Naming Convention

```css
/* Block */
.component-name { }

/* Element */
.component-name__element { }

/* Modifier */
.component-name--variation { }
.component-name__element--state { }

/* Example */
.button { }
.button__icon { }
.button--primary { }
.button--secondary { }
.button__icon--left { }
```

---

## Migration Examples

### Example 1: Hero Section

**Before (Tailwind):**
```html
<section class="relative py-20 bg-gradient-to-r from-pink-500 to-purple-600">
  <div class="container mx-auto px-4">
    <h1 class="text-6xl font-bold text-white mb-4">
      Welcome
    </h1>
    <p class="text-xl text-gray-200">
      Description
    </p>
  </div>
</section>
```

**After (BEM):**
```html
<section class="hero hero--gradient">
  <div class="container-wide section-container px-horizontal-section">
    <h1 class="text-hero-h1">
      Welcome
    </h1>
    <p class="text-lead">
      Description
    </p>
  </div>
</section>
```

---

### Example 2: Video Grid

**Before (Tailwind):**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div class="bg-gray-800 rounded-lg overflow-hidden">
    <!-- Card content -->
  </div>
</div>
```

**After (BEM):**
```html
<div class="videos-grid">
  <div class="video-card">
    <!-- Card content -->
  </div>
</div>
```

```css
/* Responsive grid */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

---

## Related Documentation

**Generated Files:**
- ✅ This report: `/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md`
- ✅ Permanent guideline: `/guidelines/tailwind-to-bem-mapping.md`

**Reference Files:**
- `/styles/globals.css` - Core BEM classes and utilities
- `/styles/blocks/*.css` - Component-specific BEM styles
- `/guidelines/Guidelines.md` - Main project guidelines with BEM architecture rules

---

## Next Steps

1. ✅ **Permanent guideline created** at `/guidelines/tailwind-to-bem-mapping.md`
2. ➡️ **Proceed to Sub-Prompt 04** (WordPress CSS Alignment)
3. ➡️ **Share guideline with team** for onboarding new developers
4. ➡️ **Update component documentation** to reference BEM classes

---

**Audit Completed:** March 11, 2026  
**Report Status:** Complete  
**Guideline Created:** ✅ `/guidelines/tailwind-to-bem-mapping.md`
