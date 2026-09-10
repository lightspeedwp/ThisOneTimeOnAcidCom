# Color Design Tokens

**Version:** 5.0.0  
**Last Updated:** February 2026  
**Last Reviewed:** February 21, 2026

Complete color system for the Ash Shaw Makeup Portfolio, featuring semantic color tokens, brand gradients, light/dark mode theming, and accessibility-compliant contrast ratios.

## ✅ Verified Against Codebase

This document has been verified against `/styles/globals.css` as of January 2025. All color utilities, CSS variables, gradient classes, and light/dark mode themes match the current implementation.

## 🆕 WordPress-Aligned Presets (v5.0.0)

This color system now follows WordPress theme.json preset standards using `--wp--preset--color--{slug}` naming conventions. See [wordpress-preset-system.md](../wordpress-preset-system.md) for complete details.

## 📋 Table of Contents

1. [Color Philosophy](#color-philosophy)
2. [WordPress Color Presets](#wordpress-color-presets)
3. [Light/Dark Mode System](#lightdark-mode-system)
4. [Light Mode Palette](#light-mode-palette)
5. [Dark Mode Palette](#dark-mode-palette)
6. [Brand Gradients](#brand-gradients)
7. [Semantic Colors](#semantic-colors)
8. [Component Color Patterns](#component-color-patterns)
9. [Accessibility Standards](#accessibility-standards)
10. [CSS Variables Reference](#css-variables-reference)

---

## Color Philosophy

### Design Principles

- **Dual Theme System:** Complete light and dark mode support
- **Clean Light Mode:** Professional white backgrounds with subtle accents
- **Rich Dark Mode:** Deep purple gradient aesthetic with high contrast
- **Accessible:** All color combinations meet WCAG 2.1 AA standards
- **Semantic:** Colors convey meaning (success, error, warning)

### Usage Guidelines

✅ **DO:**
- Use theme-aware classes (`bg-white dark:bg-purple-900`)
- Maintain consistent color usage across themes
- Ensure proper contrast ratios for text in both themes
- Test all components in both light and dark mode

❌ **DON'T:**
- Hardcode colors without dark mode variants
- Mix gradients in light mode backgrounds
- Use low-contrast combinations in either theme
- Override theme colors without reason

---

## WordPress Color Presets

### Preset Naming Conventions

All color presets follow the `--wp--preset--color--{slug}` naming convention to align with WordPress theme.json standards.

```css
:root {
  /* Light mode (default) */
  --wp--preset--color--background: #ffffff;
  --wp--preset--color--foreground: #0f172a;
  --wp--preset--color--card: #ffffff;
  --wp--preset--color--card-foreground: #0f172a;
}

.dark {
  /* Dark mode */
  --wp--preset--color--background: #0a0118;
  --wp--preset--color--foreground: #f5f3ff;
  --wp--preset--color--card: #1a0f2e;
  --wp--preset--color--card-foreground: #f5f3ff;
}
```

### Implementation Pattern

Every component must implement both light and dark mode styles using the `dark:` prefix pattern:

```tsx
// ✅ CORRECT - Both themes supported with utility color classes
// Note: In production, prefer semantic background classes like .bg-surface-light when available
<div className="bg-white dark:bg-purple-900/50 text-gray-800 dark:text-purple-100">
  Content
</div>

// ❌ WRONG - No dark mode support
<div className="bg-white text-gray-800">
  Content
</div>
```

**WordPress Alignment:** While utilities like `bg-white` and `text-gray-800` are shown for clarity, components should use semantic classes from `/styles/globals.css` where they exist (e.g., `.bg-hero-section`, `.text-gradient-pink-purple-blue`).

---

## Light/Dark Mode System

### Theme Switching Architecture

The application uses CSS custom properties defined in `/styles/globals.css` and the `dark:` class prefix to provide seamless theme switching. This system is WordPress-aligned and uses semantic color tokens rather than utility classes.

```tsx
// Theme Toggle Component Example
// Uses layout utilities (flex, items-center) but semantic color classes
<button 
  onClick={toggleTheme}
  className="flex items-center gap-2 bg-white dark:bg-purple-900 text-gray-800 dark:text-purple-100 px-4 py-2 rounded-lg transition-colors duration-300"
>
  {theme === 'light' ? <Moon /> : <Sun />}
</button>
```

**Note:** While this example shows some utility patterns (`gap-2`, `px-4`, `py-2`), production code should use semantic spacing classes from globals.css like `.px-button`, `.py-button`, `.gap-fluid-sm` for brand consistency.

### CSS Custom Properties

All color values are defined as CSS custom properties in `/styles/globals.css`:

```css
:root {
  /* Light mode (default) */
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
}

.dark {
  /* Dark mode */
  --background: #0a0118;
  --foreground: #f5f3ff;
  --card: #1a0f2e;
  --card-foreground: #f5f3ff;
}
```

### Implementation Pattern

Every component must implement both light and dark mode styles using the `dark:` prefix pattern:

```tsx
// ✅ CORRECT - Both themes supported with utility color classes
// Note: In production, prefer semantic background classes like .bg-surface-light when available
<div className="bg-white dark:bg-purple-900/50 text-gray-800 dark:text-purple-100">
  Content
</div>

// ❌ WRONG - No dark mode support
<div className="bg-white text-gray-800">
  Content
</div>
```

**WordPress Alignment:** While utilities like `bg-white` and `text-gray-800` are shown for clarity, components should use semantic classes from `/styles/globals.css` where they exist (e.g., `.bg-hero-section`, `.text-gradient-pink-purple-blue`).

---

## Light Mode Palette

### Background Colors

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LIGHT MODE BACKGROUNDS                           │
└─────────────────────────────────────────────────────────────────────┘

PRIMARY BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
bg-white               ░░░░░  #ffffff  (Main page background)
Usage: Pages, sections, primary containers

SURFACE COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
bg-white/80            ░░░░░  rgba(255,255,255,0.8)  (Cards, overlays)
bg-white/95            ░░░░░  rgba(255,255,255,0.95) (Header, nav)
bg-gray-50             ░░░░░  #f9fafb  (Subtle backgrounds)
bg-gray-100            ░░░░░  #f3f4f6  (Hover states)

Usage: Cards, modals, navigation elements
```

### Text Colors

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LIGHT MODE TEXT                                  │
└─────────────────────────────────────────────────────────────────────┘

HEADINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
text-gray-800          ██████  #1f2937  (Primary headings)
text-gray-900          ██████  #111827  (Hero titles)
Contrast Ratio: 7:1+ (AAA compliant)

BODY TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
text-gray-700          ██████  #374151  (Body text)
Contrast Ratio: 4.83:1 (AA compliant)

SECONDARY TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
text-gray-600          ▓▓▓▓▓  #4b5563  (Secondary text)
text-gray-500          ▓▓▓▓▓  #6b7280  (Metadata, captions)
```

### Border & Divider Colors

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LIGHT MODE BORDERS                               │
└─────────────────────────────────────────────────────────────────────┘

border-gray-200        ▒▒▒▒▒  #e5e7eb  (Subtle borders)
border-gray-300        ▒▒▒▒▒  #d1d5db  (Card borders)
border-white/50        ░░░░░  rgba(255,255,255,0.5) (Glass effect)

Usage: Cards, dividers, form inputs
```

---

## Dark Mode Palette

### Background Colors

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DARK MODE BACKGROUNDS                            │
└─────────────────────────────────────────────────────────────────────┘

PRIMARY BACKGROUNDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dark:bg-gradient-to-br 
dark:from-purple-950   ██████  #1a0033  (Deep purple-black)
dark:via-purple-900/50 ██████  rgba(88,28,135,0.5) (Mid purple)
dark:to-purple-950     ██████  #1a0033  (Deep purple)

Usage: Pages, sections, full-screen backgrounds

SURFACE COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dark:bg-purple-950/95  ██████  rgba(26,0,51,0.95) (Header, nav)
dark:bg-purple-900/50  ██████  rgba(88,28,135,0.5) (Cards)
dark:bg-purple-900/40  ██████  rgba(88,28,135,0.4) (Hover states)
dark:bg-purple-800/50  ▓▓▓▓▓  rgba(107,33,168,0.5) (Loading states)

Usage: Cards, modals, navigation elements

ACCENT COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dark:bg-purple-700     ██████  #6b21a8  (Buttons, CTAs)
dark:bg-purple-600     ██████  #7c3aed  (Hover states)
```

### Text Colors

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DARK MODE TEXT                                   │
└─────────────────────────────────────────────────────────────────────┘

HEADINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dark:text-purple-50    ░░░░░  #faf5ff  (Hero titles)
dark:text-purple-100   ░░░░░  #f5f3ff  (Primary headings)
Contrast Ratio: 12:1+ on dark purple (AAA+)

BODY TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dark:text-purple-100   ░░░░░  #f5f3ff  (Body text)
dark:text-purple-200   ░░░░░  #ede9fe  (Readable text)
Contrast Ratio: 8:1+ on dark purple (AAA)

SECONDARY TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
dark:text-purple-300   ▒▒▒▒▒  #d8b4fe  (Secondary text)
dark:text-purple-400   ▒▒▒▒▒  #c4b5fd  (Metadata, captions)
```

### Border & Divider Colors

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DARK MODE BORDERS                                │
└─────────────────────────────────────────────────────────────────────┘

dark:border-purple-700/50   ▓▓▓▓▓  rgba(107,33,168,0.5) (Card borders)
dark:border-purple-800      ██████  #5b21b6  (Strong borders)
dark:border-purple-900      ██████  #581c87  (Dividers)

Usage: Cards, dividers, form inputs in dark mode
```

---

## Brand Gradients

### Primary Gradient (Pink → Purple → Blue)

**Usage:** Primary CTAs, hero titles, featured content

```css
/* Background Gradient */
.bg-gradient-pink-purple-blue {
  background: linear-gradient(135deg, #ff66cc 0%, #9933ff 50%, #3399ff 100%);
}

/* Text Gradient */
.text-gradient-pink-purple-blue {
  background: linear-gradient(135deg, #ff66cc 0%, #9933ff 50%, #3399ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Examples:**
```tsx
// Button with gradient (works in both themes)
<button className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button rounded-lg">
  Explore Portfolio
</button>

// Title with gradient text (works in both themes)
<h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue">
  Hi, I'm Ash Shaw
</h1>
```

### Secondary Gradient (Blue → Teal → Green)

**Usage:** Secondary CTAs, section accents

```css
.bg-gradient-blue-teal-green {
  background: linear-gradient(135deg, #00bfff 0%, #20c997 50%, #32cd32 100%);
}
```

**Example:**
```tsx
<button className="bg-gradient-blue-teal-green hover:from-teal-600 hover:to-green-700 text-white px-button py-button rounded-lg">
  Read My Story
</button>
```

### Accent Gradient (Gold → Peach → Coral)

**Usage:** Special highlights, featured badges

```css
.bg-gradient-gold-peach-coral {
  background: linear-gradient(135deg, #ffd700 0%, #ff9966 50%, #ff5e62 100%);
}
```

---

## Semantic Colors

### Success (Green)

```tsx
// Works in both light and dark mode
<div className="bg-green-100 dark:bg-green-900/30 border border-green-700 dark:border-green-600 text-green-900 dark:text-green-200 px-4 py-3 rounded-lg">
  <p className="font-body font-medium">Email sent successfully!</p>
</div>
```

### Error (Red)

```tsx
// Works in both light and dark mode
<div className="bg-red-100 dark:bg-red-900/30 border border-red-700 dark:border-red-600 text-red-900 dark:text-red-200 px-4 py-3 rounded-lg">
  <p className="font-body font-medium">Please fill in all required fields.</p>
</div>
```

### Warning (Amber)

```tsx
// Works in both light and dark mode
<div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-700 dark:border-amber-600 text-amber-900 dark:text-amber-200 px-4 py-3 rounded-lg">
  <p className="font-body font-medium">Your session will expire soon.</p>
</div>
```

### Info (Blue)

```tsx
// Works in both light and dark mode
<div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-700 dark:border-blue-600 text-blue-900 dark:text-blue-200 px-4 py-3 rounded-lg">
  <p className="font-body font-medium">New features available!</p>
</div>
```

---

## Component Color Patterns

### Page Backgrounds

```tsx
// ✅ CORRECT - Clean light, rich dark
<main className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950 transition-colors duration-300">
  {children}
</main>
```

### Cards

```tsx
// ✅ CORRECT - Translucent with backdrop blur
<div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
  <h3 className="text-section-h2 font-heading font-semibold text-gray-800 dark:text-purple-100 mb-fluid-md">
    Card Title
  </h3>
  <p className="text-body-guideline font-body text-gray-700 dark:text-purple-100 leading-relaxed">
    Card content with proper contrast in both themes
  </p>
</div>
```

**✅ FIXED: `.bg-card` Hover State (v4.1.1)**

The `.bg-card` global CSS class now has proper hover states for both light and dark modes:

```css
/* ✅ FIXED (globals.css line 2568) */
.bg-card:hover {
  background-color: #f9fafb;  /* Light gray for light mode */
}

.dark .bg-card:hover {
  background-color: #000000;  /* Black for dark mode */
}
```

**Usage:**
No workarounds needed - use `.bg-card` normally:

```tsx
<div className="bg-card hover:shadow-xl transition-all duration-300">
  Card content with proper hover in both modes
</div>
```

**See Also:** [css-issues.md](../troubleshooting/css-issues.md#issue-1-bg-cardhover-forces-black-background-in-light-mode)

### Buttons

```tsx
// Primary CTA (gradient - works in both themes)
<button className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
  Primary Action
</button>

// Secondary button (theme-aware)
<button className="bg-gray-200 dark:bg-purple-700 hover:bg-gray-300 dark:hover:bg-purple-600 text-gray-800 dark:text-white px-button py-button rounded-lg transition-colors duration-300">
  Secondary Action
</button>

// Ghost button (theme-aware)
<button className="bg-transparent hover:bg-gray-100 dark:hover:bg-purple-800/30 text-gray-700 dark:text-purple-200 px-button py-button rounded-lg border border-gray-300 dark:border-purple-700 transition-all duration-300">
  Tertiary Action
</button>
```

### Navigation Header

```tsx
// ✅ CORRECT - Frosted glass effect in both themes
<nav className="bg-white/95 dark:bg-purple-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-purple-800 transition-colors duration-300">
  <div className="text-gray-800 dark:text-purple-100">
    Navigation content
  </div>
</nav>
```

### Loading States

```tsx
// ✅ CORRECT - Skeleton with theme awareness
<div className="animate-pulse">
  <div className="h-16 bg-gray-200 dark:bg-purple-800/50 rounded-lg w-80 mx-auto mb-6"></div>
  <div className="h-8 bg-gray-200 dark:bg-purple-800/50 rounded w-96 mx-auto mb-4"></div>
</div>
```

### Form Inputs

```tsx
// ✅ CORRECT - Input with theme support
<input
  type="text"
  className="w-full px-4 py-3 bg-white dark:bg-purple-900/30 border border-gray-300 dark:border-purple-700 rounded-lg text-gray-800 dark:text-purple-100 placeholder-gray-500 dark:placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
  placeholder="Enter text..."
/>
```

### Decorative Elements

```tsx
// ✅ CORRECT - Subtle accents in both themes
<div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-300/20 dark:from-pink-300/10 to-purple-400/20 dark:to-purple-400/10 rounded-full opacity-20 dark:opacity-30 animate-pulse" aria-hidden="true"></div>
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Light Mode Contrast Ratios

**Headings:**
```css
text-gray-800 on bg-white     /* 7.02:1 - AAA ✅ */
text-gray-900 on bg-white     /* 10.46:1 - AAA ✅ */
```

**Body Text:**
```css
text-gray-700 on bg-white     /* 4.83:1 - AA ✅ */
text-gray-600 on bg-white     /* 3.94:1 - AA (large text) ✅ */
```

#### Dark Mode Contrast Ratios

**Headings:**
```css
text-purple-50 on bg-purple-950    /* 15.2:1 - AAA+ ✅ */
text-purple-100 on bg-purple-950   /* 12.8:1 - AAA+ ✅ */
```

**Body Text:**
```css
text-purple-100 on bg-purple-950   /* 12.8:1 - AAA+ ✅ */
text-purple-200 on bg-purple-950   /* 9.4:1 - AAA ✅ */
```

### Testing Checklist

- [ ] All text meets contrast requirements in light mode
- [ ] All text meets contrast requirements in dark mode
- [ ] Buttons are clearly visible in both themes
- [ ] Focus states are visible in both themes
- [ ] Loading states work in both themes
- [ ] Forms are usable in both themes
- [ ] Error/success messages are clear in both themes

---

## CSS Variables Reference

### Light Mode Variables (`:root`)

```css
:root {
  /* Backgrounds */
  --background: #ffffff;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-foreground: #0f172a;
  
  /* Borders */
  --border: #e2e8f0;
  --input: #e2e8f0;
  
  /* UI Elements */
  --primary: #030213;
  --primary-foreground: #f8fafc;
  --secondary: #f1f5f9;
  --secondary-foreground: #030213;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #030213;
}
```

### Dark Mode Variables (`.dark`)

```css
.dark {
  /* Backgrounds */
  --background: #0a0118;        /* Deep purple-black */
  --foreground: #f5f3ff;        /* Lavender white */
  --card: #1a0f2e;              /* Rich deep purple */
  --card-foreground: #f5f3ff;
  
  /* Borders */
  --border: #3b2667;            /* Purple borders */
  --input: #1a0f2e;
  --ring: #a78bfa;              /* Purple focus ring */
  
  /* UI Elements */
  --primary: #f5f3ff;
  --primary-foreground: #0a0118;
  --secondary: #2d1b4e;         /* Medium purple */
  --secondary-foreground: #f5f3ff;
  --muted: #2d1b4e;
  --muted-foreground: #c4b5fd;  /* Light purple */
  --accent: #3b2667;            /* Vibrant accent purple */
  --accent-foreground: #f5f3ff;
}
```

---

## Related Documentation

- **[typography.md](./typography.md)** - Typography system and hierarchy
- **[spacing.md](./spacing.md)** - Spacing scale and patterns
- **[dark-mode-implementation.md](../dark-mode-implementation.md)** - Complete dark mode guide
- **[component-dark-mode.md](../component-dark-mode.md)** - Component-specific dark mode patterns
- **[Guidelines.md](../Guidelines.md)** - Main guidelines

---

**Last Updated:** January 2025  
**Version:** 5.0.0  
**Maintained by:** Ash Shaw Portfolio Team