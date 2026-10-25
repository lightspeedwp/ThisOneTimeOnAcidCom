# Design Token Reference (N001)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25  
**Part of:** Ash Shaw Makeup Portfolio Design System

---

## Overview

Comprehensive reference for all design tokens used throughout the project, including colors, spacing, typography, animations, and iconography. This document serves as the single source of truth for design system values and their usage patterns.

---

## Table of Contents

1. [Color Tokens](#1-color-tokens)
2. [Spacing System](#2-spacing-system)
3. [Typography Scale](#3-typography-scale)
4. [Animation Tokens](#4-animation-tokens)
5. [Iconography System](#5-iconography-system)
6. [Implementation Guide](#6-implementation-guide)

---

## 1. Color Tokens

### Brand Palette

The primary brand palette consists of neon colors optimized for dark mode display:

- **Neon Pink:** `#FF006E` (primary action, highlights)
- **Neon Cyan:** `#00F5FF` (secondary, accents)
- **Neon Yellow:** `#FFFF00` (warnings, critical attention)
- **Neon Green:** `#39FF14` (success, positive states)
- **Neon Purple:** `#BC13FE` (tertiary, special features)

### Neutral Palette

- **Light:** `#FFFFFF` (backgrounds, text on dark)
- **Medium:** `#888888` (borders, disabled states)
- **Dark:** `#000000` (backgrounds, text on light)

### Semantic Colors

- **Success:** `#39FF14` (form validation, confirmations)
- **Error:** `#FF006E` (form errors, alerts)
- **Warning:** `#FFFF00` (warnings, cautions)
- **Info:** `#00F5FF` (informational content)

### Dark Mode Palette

All colors have dark mode variants. See `guidelines/design-tokens/light-dark-mode.md` for complete dark mode implementation.

---

## 2. Spacing System

Spacing values follow an 8px base unit progression:

| Scale | Value | Use Case |
|-------|-------|----------|
| xs | 4px | Micro-spacing (icon internal) |
| sm | 8px | Compact spacing |
| md | 16px | Default spacing |
| lg | 24px | Generous spacing |
| xl | 32px | Large sections |
| 2xl | 48px | Page sections |
| 3xl | 64px | Major layout breaks |

Reference: `guidelines/design-tokens/spacing.md`

---

## 3. Typography Scale

Font stack: `Inter`, `system-ui`, `-apple-system`, sans-serif

| Level | Size | Line Height | Weight | Use Case |
|-------|------|-------------|--------|----------|
| h1 | 48px | 1.2 | Bold (700) | Page titles |
| h2 | 36px | 1.3 | Semibold (600) | Section headings |
| h3 | 28px | 1.4 | Semibold (600) | Subsections |
| h4 | 24px | 1.5 | Medium (500) | Small headings |
| body | 16px | 1.6 | Regular (400) | Body text |
| sm | 14px | 1.5 | Regular (400) | Captions, small text |

Reference: `guidelines/design-tokens/typography.md`

---

## 4. Animation Tokens

Key animation timing values:

| Name | Duration | Easing | Use Case |
|------|----------|--------|----------|
| fast | 150ms | ease-out | Quick feedback |
| normal | 300ms | ease-in-out | Standard transitions |
| slow | 500ms | ease-out | Deliberate reveals |
| verySlow | 1000ms | ease-out | Entrance animations |

Reference: `guidelines/design-tokens/animations.md`

---

## 5. Iconography System

### Icon Sets

1. **Interface Icons** (`guidelines/icons/interface.md`)
   - Navigation, UI controls, status indicators
   - 24px and 32px sizes

2. **Travel & Portfolio Icons** (`guidelines/icons/travel.md`)
   - Festival locations, travel themes
   - Thematic icons for portfolio items

### Icon Usage

- All icons support dark/light mode variants
- Minimum size: 16px
- Padding: 8px minimum internal space
- Color: Inherit from parent or apply semantic color

---

## 6. Implementation Guide

### CSS Variables

Design tokens are implemented as CSS custom properties in your theme:

```css
:root {
  /* Colors */
  --color-primary: #FF006E;
  --color-secondary: #00F5FF;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Typography */
  --text-size-base: 16px;
  --text-line-height-base: 1.6;
}
```

### Related Guidelines

- **Color Palette:** `guidelines/design-tokens/colors.md`
- **Typography Detailed:** `guidelines/design-tokens/typography.md`
- **Spacing Detailed:** `guidelines/design-tokens/spacing.md`
- **Animations Detailed:** `guidelines/design-tokens/animations.md`
- **Neon System:** `guidelines/design-tokens/neon-system.md`
- **Light/Dark Mode:** `guidelines/design-tokens/light-dark-mode.md`
- **Iconography Detailed:** `guidelines/design-tokens/iconography.md`
- **Portfolio Tokens:** `guidelines/design-tokens/portfolio-design-tokens.md`

---

## Usage Examples

### Apply Brand Color

```tsx
<button style={{ color: 'var(--color-primary)' }}>
  Click Me
</button>
```

### Use Spacing Scale

```css
.card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-radius: 8px;
}
```

### Typography Hierarchy

```tsx
<h1 style={{ fontSize: 'var(--text-size-h1)' }}>
  Main Title
</h1>
```

---

**Last Updated:** 2026-10-25  
**Maintained by:** Ash Shaw Portfolio Team  
**Canonical Reference:** Yes

