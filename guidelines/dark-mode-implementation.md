# Dark Mode Implementation Guide

**Version:** 1.0.0  
**Last Updated:** January 2025

Complete implementation guide for light/dark mode theming across the Ash Shaw Makeup Portfolio.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Implementation Plan](#implementation-plan)
4. [Component Checklist](#component-checklist)
5. [Testing Strategy](#testing-strategy)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### Theme System Goals

✅ **Complete Coverage:** Every component supports both themes  
✅ **Consistent Aesthetic:** Clean light mode, rich dark mode  
✅ **Smooth Transitions:** 300ms duration on theme changes  
✅ **Accessible:** WCAG 2.1 AA compliant in both themes  
✅ **Performant:** No layout shifts or flickering  

### Theme Aesthetics

**Light Mode:**
- Clean white backgrounds (`bg-white`)
- Professional gray text (`text-gray-700`, `text-gray-800`)
- Subtle borders (`border-gray-200`)
- Minimal decorative elements
- Perfect for daytime reading

**Dark Mode:**
- Deep purple gradient backgrounds
- High contrast lavender text (`text-purple-100`)
- Rich purple accents (`border-purple-700`)
- Glowing decorative elements
- Perfect for nighttime browsing

---

## Architecture

### CSS Custom Properties

The theme system uses CSS custom properties defined in `/styles/globals.css`:

```css
:root {
  /* Light mode (default) */
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --border: #e2e8f0;
}

.dark {
  /* Dark mode */
  --background: #0a0118;
  --foreground: #f5f3ff;
  --card: #1a0f2e;
  --card-foreground: #f5f3ff;
  --border: #3b2667;
}
```

### Tailwind Dark Mode Classes

Every styled element must include both light and dark variants:

```tsx
// ✅ CORRECT
<div className="bg-white dark:bg-purple-900 text-gray-800 dark:text-purple-100">
  
// ❌ WRONG - Missing dark mode
<div className="bg-white text-gray-800">
```

### Theme Toggle Component

Located at `/components/ui/ThemeToggle.tsx`:

```tsx
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="bg-white/95 dark:bg-purple-900/95 p-2 rounded-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
```

---

## Implementation Plan

### Phase 1: Foundation (✅ Complete)

**CSS Variables Setup**
- [x] Define light mode CSS variables in `:root`
- [x] Define dark mode CSS variables in `.dark`
- [x] Add transition properties to body element
- [x] Test variable switching

**Theme Toggle**
- [x] Create ThemeToggle component
- [x] Implement localStorage persistence
- [x] Add smooth animations
- [x] Add accessibility features

### Phase 2: Core Pages (✅ Complete)

**HomePage**
- [x] Update background: `bg-white dark:bg-gradient-to-br dark:from-purple-950...`
- [x] Update loading states
- [x] Update error states
- [x] Test all sections

**AboutPage**
- [x] Update background colors
- [x] Update text colors
- [x] Update loading/error states
- [x] Test scrolling behavior

**PortfolioPage**
- [x] Update gallery backgrounds
- [x] Update lightbox styles
- [x] Update filter buttons
- [x] Test image overlays

**BlogPage**
- [x] Update article cards
- [x] Update search bar
- [x] Update category filters
- [x] Test pagination

### Phase 3: Components (In Progress)

**Navigation Components**
- [x] Header - `bg-white/95 dark:bg-purple-950/95`
- [ ] Footer - Verify dark mode styling
- [x] Mobile menu - Update overlay and links
- [x] Logo - Enhanced dark mode with glow effect

**Section Components**
- [x] HeroLayout - Card backgrounds and text
- [x] FeaturedSection - Portfolio cards
- [x] WhySection - Icon cards and text
- [x] BlogPreviewSection - Article cards
- [ ] FusionNailsSection - Verify colors
- [ ] TestimonialsSection - Verify video player
- [ ] InstagramFeed - Verify image overlays
- [ ] FestivalCountdown - Verify timer display

**UI Components**
- [x] ScrollToTop - Button background and icon
- [x] ScrollDownArrow - Icon color and animation
- [ ] SectionCard - Verify all theme variants
- [ ] Lightbox - Verify overlay and controls
- [ ] ContactForm - Verify input styles
- [ ] SearchBar - Verify input and results
- [ ] CategoryFilter - Verify button states
- [ ] Pagination - Verify button styles

### Phase 4: Testing & Polish (Next)

**Visual Testing**
- [ ] Test all pages in light mode
- [ ] Test all pages in dark mode
- [ ] Test theme transitions (no flickering)
- [ ] Test with different screen sizes
- [ ] Test loading states in both themes

**Accessibility Testing**
- [ ] Contrast ratios (light mode)
- [ ] Contrast ratios (dark mode)
- [ ] Focus indicators (both themes)
- [ ] Screen reader announcements
- [ ] Keyboard navigation

**Performance Testing**
- [ ] No layout shifts on theme change
- [ ] Smooth 300ms transitions
- [ ] No visual artifacts
- [ ] localStorage persistence works

---

## Component Checklist

### ✅ Backgrounds

```tsx
// Pages
<main className="bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950">

// Cards
<div className="bg-white/80 dark:bg-purple-900/50">

// Navigation
<nav className="bg-white/95 dark:bg-purple-950/95">

// Modals/Overlays
<div className="bg-white dark:bg-purple-900">

// Loading skeletons
<div className="bg-gray-200 dark:bg-purple-800/50">
```

### ✅ Text Colors

```tsx
// Headings
<h1 className="text-gray-800 dark:text-purple-100">

// Body text
<p className="text-gray-700 dark:text-purple-100">

// Secondary text
<span className="text-gray-600 dark:text-purple-300">

// Muted text
<small className="text-gray-500 dark:text-purple-400">
```

### ✅ Borders

```tsx
// Card borders
<div className="border border-white/50 dark:border-purple-700/50">

// Input borders
<input className="border border-gray-300 dark:border-purple-700">

// Dividers
<hr className="border-gray-200 dark:border-purple-800">
```

### ✅ Buttons

```tsx
// Primary (gradient - works in both themes)
<button className="bg-gradient-pink-purple-blue text-white">

// Secondary
<button className="bg-gray-200 dark:bg-purple-700 text-gray-800 dark:text-white">

// Ghost
<button className="bg-transparent hover:bg-gray-100 dark:hover:bg-purple-800/30 text-gray-700 dark:text-purple-200 border border-gray-300 dark:border-purple-700">
```

### ✅ Forms

```tsx
// Input fields
<input className="bg-white dark:bg-purple-900/30 border-gray-300 dark:border-purple-700 text-gray-800 dark:text-purple-100 placeholder-gray-500 dark:placeholder-purple-400">

// Textareas
<textarea className="bg-white dark:bg-purple-900/30 border-gray-300 dark:border-purple-700 text-gray-800 dark:text-purple-100">

// Select dropdowns
<select className="bg-white dark:bg-purple-900/30 border-gray-300 dark:border-purple-700 text-gray-800 dark:text-purple-100">
```

### ✅ Status Messages

```tsx
// Success
<div className="bg-green-100 dark:bg-green-900/30 border-green-700 dark:border-green-600 text-green-900 dark:text-green-200">

// Error
<div className="bg-red-100 dark:bg-red-900/30 border-red-700 dark:border-red-600 text-red-900 dark:text-red-200">

// Warning
<div className="bg-amber-100 dark:bg-amber-900/30 border-amber-700 dark:border-amber-600 text-amber-900 dark:text-amber-200">

// Info
<div className="bg-blue-100 dark:bg-blue-900/30 border-blue-700 dark:border-blue-600 text-blue-900 dark:text-blue-200">
```

---

## Testing Strategy

### Manual Testing Checklist

#### Visual Testing

```
Light Mode Testing:
[ ] All pages have white backgrounds
[ ] Text is dark and readable
[ ] Cards have subtle shadows
[ ] Borders are visible but not distracting
[ ] Buttons have clear hover states
[ ] Forms are clearly delineated
[ ] Images have proper contrast

Dark Mode Testing:
[ ] All pages have purple gradient backgrounds
[ ] Text is light and readable
[ ] Cards have purple translucent backgrounds
[ ] Borders are visible in purple tones
[ ] Buttons maintain visibility
[ ] Forms are usable with dark backgrounds
[ ] Images don't feel washed out
```

#### Accessibility Testing

```
Contrast Ratios (use browser DevTools):
[ ] Light mode headings: 7:1+ (AAA)
[ ] Light mode body text: 4.5:1+ (AA)
[ ] Dark mode headings: 7:1+ (AAA)
[ ] Dark mode body text: 4.5:1+ (AA)
[ ] Button text in both modes: 4.5:1+
[ ] Form labels in both modes: 4.5:1+

Keyboard Navigation:
[ ] Focus indicators visible in light mode
[ ] Focus indicators visible in dark mode
[ ] Theme toggle accessible via keyboard
[ ] Tab order maintained in both themes
```

#### Transition Testing

```
Theme Switching:
[ ] No layout shift on theme change
[ ] 300ms smooth transition
[ ] No flickering
[ ] No content reflow
[ ] Scroll position maintained
[ ] Focus state preserved
[ ] No console errors
```

### Automated Testing

```typescript
// Example test for dark mode classes
describe('Component Dark Mode', () => {
  it('should apply dark mode classes correctly', () => {
    render(<Component />, { wrapper: DarkModeProvider });
    
    const element = screen.getByRole('main');
    expect(element).toHaveClass('dark:bg-purple-950');
  });
  
  it('should have sufficient contrast in dark mode', () => {
    const { container } = render(<Component />, { 
      wrapper: DarkModeProvider 
    });
    
    // Use jest-axe for accessibility testing
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## Common Patterns

### Pattern 1: Page Background

```tsx
// ✅ RECOMMENDED PATTERN
<main className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950 transition-colors duration-300">
  {children}
</main>
```

### Pattern 2: Card Component

```tsx
// ✅ RECOMMENDED PATTERN
<div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
  <h3 className="text-gray-800 dark:text-purple-100 font-heading font-semibold mb-fluid-sm">
    Title
  </h3>
  <p className="text-gray-700 dark:text-purple-100 font-body">
    Content
  </p>
</div>
```

### Pattern 3: Navigation Header

```tsx
// ✅ RECOMMENDED PATTERN
<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-purple-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-purple-800 transition-colors duration-300">
  <nav className="container mx-auto px-4">
    <ul className="flex items-center gap-6">
      <li>
        <a className="text-gray-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
          Link
        </a>
      </li>
    </ul>
  </nav>
</header>
```

### Pattern 4: Form Input

```tsx
// ✅ RECOMMENDED PATTERN
<input
  type="text"
  className="w-full px-4 py-3 bg-white dark:bg-purple-900/30 border border-gray-300 dark:border-purple-700 rounded-lg text-gray-800 dark:text-purple-100 placeholder-gray-500 dark:placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
  placeholder="Enter text..."
/>
```

### Pattern 5: Button Variants

```tsx
// Primary CTA (gradient - theme-agnostic)
<button className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
  Primary Action
</button>

// Secondary (theme-aware)
<button className="bg-gray-200 dark:bg-purple-700 hover:bg-gray-300 dark:hover:bg-purple-600 text-gray-800 dark:text-white px-button py-button rounded-lg transition-all duration-300">
  Secondary Action
</button>

// Ghost (theme-aware)
<button className="bg-transparent hover:bg-gray-100 dark:hover:bg-purple-800/30 text-gray-700 dark:text-purple-200 px-button py-button rounded-lg border border-gray-300 dark:border-purple-700 transition-all duration-300">
  Tertiary Action
</button>
```

---

## Troubleshooting

### Issue: Flickering on Theme Change

**Problem:** Page flickers or shows wrong theme briefly

**Solution:**
```tsx
// Add theme class to html element before React mounts
// In index.html or main.tsx
<script>
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
</script>
```

### Issue: `.bg-card:hover` Forces Black Background in Light Mode

**Problem:** Cards with `.bg-card` class turn black on hover in light mode instead of light gray

**Root Cause:** Global CSS file (`/styles/globals.css`) has incorrect hover state around line 2375:

```css
/* ❌ CURRENT - Forces black in both modes */
.bg-card:hover {
  background-color: #000000;  /* Wrong for light mode */
}

.dark .bg-card:hover {
  background-color: #000000;  /* Correct for dark mode */
}
```

**Solution:**
Update `/styles/globals.css` to use light gray hover in light mode:

```css
/* ✅ CORRECT - Light gray for light mode, black for dark mode */
.bg-card:hover {
  background-color: #f9fafb;  /* gray-50 - very light gray */
}

.dark .bg-card:hover {
  background-color: #000000;  /* Keep black for dark mode */
}
```

**Affected Components:**
- SliderCard (home page featured section)
- PortfolioCard (portfolio page)
- Any component using `.bg-card` class

**Status:** 🐛 **KNOWN ISSUE** - Fix pending in v4.1.1

### Issue: Missing Dark Mode Styles

**Problem:** Component doesn't change in dark mode

**Solution:**
```tsx
// ❌ WRONG - Missing dark: prefix
<div className="bg-white text-gray-800">

// ✅ CORRECT - Both themes supported
<div className="bg-white dark:bg-purple-900 text-gray-800 dark:text-purple-100">
```

### Issue: Low Contrast in Dark Mode

**Problem:** Text hard to read on dark purple background

**Solution:**
```tsx
// ❌ WRONG - Insufficient contrast
<p className="text-purple-500 dark:text-purple-500">

// ✅ CORRECT - High contrast
<p className="text-gray-700 dark:text-purple-100">
```

### Issue: Gradient Backgrounds in Light Mode

**Problem:** Light mode shows colorful gradients

**Solution:**
```tsx
// ❌ WRONG - Gradient in both modes
<div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-purple-950...">

// ✅ CORRECT - Solid light, gradient dark
<div className="bg-white dark:bg-gradient-to-br dark:from-purple-950...">
```

### Issue: Border Visibility

**Problem:** Borders not visible in one or both themes

**Solution:**
```tsx
// ❌ WRONG - Same color in both modes
<div className="border border-gray-300">

// ✅ CORRECT - Theme-appropriate borders
<div className="border border-gray-300 dark:border-purple-700">
```

---

## Related Documentation

- **[colors.md](./design-tokens/colors.md)** - Complete color palette
- **[component-dark-mode.md](./component-dark-mode.md)** - Component-specific patterns
- **[Guidelines.md](./Guidelines.md)** - Main guidelines

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained by:** Ash Shaw Portfolio Team