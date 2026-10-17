---
title: "Tailwind-to-BEM Mapping Guide Creator"
filename: "/prompts/modern-react-migration/03-tailwind-to-bem-mapping.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
prompt_type: "sub-prompt"
execution_order: 3
estimated_duration: "60 minutes"
related_reports: "/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md"
related_guidelines: "/guidelines/tailwind-to-bem-mapping.md"
---

# Tailwind-to-BEM Mapping Guide Creator

## 1. Objective

Create a comprehensive mapping guide that translates Tailwind CSS utility classes to:
1. **BEM classes** (defined in `/styles/globals.css`)
2. **WordPress CSS custom properties** (`--wp--preset--*`)
3. **WordPress block editor classes** (`.wp-block-*`, `.has-*`)

This guide will serve as a **permanent reference** for developers converting Tailwind code to BEM.

---

## 2. Scope

**Files to analyze:**
- `/styles/globals.css` - All available BEM classes
- `/styles/blocks/*.css` - Block-specific BEM classes
- `/styles/themes/*.css` - Theme-specific classes
- All CSS custom properties

**Deliverables:**
1. **Report:** `/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md`
2. **Guideline:** `/guidelines/tailwind-to-bem-mapping.md` (permanent reference)

---

## 3. Audit Steps

### Step 1: Catalog All BEM Classes

Scan all CSS files and create a complete inventory of available BEM classes:

```bash
# Extract all class definitions
grep -r "^\.[a-z]" styles/ | grep -v "^\s*//" | sort | uniq
```

**Categories to document:**
- Layout classes (`.header`, `.footer`, `.section`)
- Component classes (`.card`, `.button`, `.form`)
- Utility classes (`.visually-hidden`, `.sr-only`)
- Modifier classes (`--active`, `--primary`, `--large`)

### Step 2: Catalog WordPress CSS Custom Properties

Extract all `--wp--preset--*` custom properties:

```bash
grep -r "--wp--preset--" styles/
```

**Categories:**
- Color properties (`--wp--preset--color--*`)
- Spacing properties (`--wp--preset--spacing--*`)
- Font properties (`--wp--preset--font-family--*`)
- Border radius (`--wp--preset--border-radius--*`)

### Step 3: Create Mapping Tables

For each Tailwind utility category, create a mapping table:

**Example format:**

| Tailwind Class | BEM Equivalent | WordPress Property | Notes |
|----------------|----------------|-------------------|-------|
| `flex` | `.flex-container` | N/A | Use BEM class |
| `text-center` | `.text-align-center` | N/A | Use BEM class |
| `bg-pink-500` | `.background-neon-pink` | `var(--wp--preset--color--neon-pink)` | Use custom property |

### Step 4: Document Conversion Patterns

Create examples showing how to convert common Tailwind patterns to BEM:

**Example:**

```tsx
// ❌ BEFORE (Tailwind)
<div className="flex items-center justify-between p-4 bg-gray-100">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>

// ✅ AFTER (BEM)
<div className="card card--horizontal">
  <h2 className="card__title">Title</h2>
</div>
```

---

## 4. Success Criteria

This prompt is complete when:

- [ ] All BEM classes cataloged from `/styles/`
- [ ] All WordPress custom properties documented
- [ ] Mapping tables created for all Tailwind categories
- [ ] Conversion examples provided for common patterns
- [ ] Report saved to `/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md`
- [ ] Guideline saved to `/guidelines/tailwind-to-bem-mapping.md`

---

## 5. Report Output

**Location:** `/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md`

**Structure:**

```markdown
---
title: "Tailwind-to-BEM Mapping Report"
filename: "/reports/2026-03-11-modern-react-migration/03-tailwind-to-bem-mapping.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
report_type: "analysis"
related_prompt: "/prompts/modern-react-migration/03-tailwind-to-bem-mapping.md"
status: "complete"
---

# Tailwind-to-BEM Mapping Report

## Executive Summary

**Total BEM Classes Found:** X  
**Total WordPress Custom Properties:** Y  
**Coverage:** Z% of common Tailwind utilities have BEM equivalents

## BEM Class Inventory

### Layout Classes (Total: X)
- `.header`, `.header__inner`, `.header__logo`
- `.footer`, `.footer__grid`, `.footer__brand`
- `.section`, `.section__container`, `.section--dark`

### Component Classes (Total: X)
- `.button`, `.button--primary`, `.button--secondary`
- `.card`, `.card__title`, `.card__image`

## WordPress Custom Properties

### Color Properties
```css
--wp--preset--color--neon-pink: #FF3AAE;
--wp--preset--color--neon-green: #39FF14;
--wp--preset--color--atomic-black: #0F0F0F;
```

### Spacing Properties
```css
--wp--preset--spacing--xs: 0.5rem;
--wp--preset--spacing--sm: 1rem;
--wp--preset--spacing--md: 1.5rem;
```

## Mapping Tables

[Include comprehensive mapping tables]

## Conversion Examples

[Include conversion patterns]

## Recommendations

1. Use this mapping guide when converting Tailwind to BEM
2. Prefer BEM classes over creating new utility classes
3. Use WordPress custom properties for theming
4. Follow WordPress block editor naming patterns for new classes
```

---

## 6. Guideline Output

**Location:** `/guidelines/tailwind-to-bem-mapping.md`

**Structure:**

```markdown
---
title: "Tailwind-to-BEM Mapping Guide"
filename: "/guidelines/tailwind-to-bem-mapping.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
---

# Tailwind-to-BEM Mapping Guide

This guide provides a complete reference for converting Tailwind CSS utility classes to BEM classes used in this project.

## Quick Reference

### Layout

| Tailwind | BEM Class | Example |
|----------|-----------|---------|
| `flex` | `.flex-container` or component-specific | `.header__inner` |
| `grid` | `.grid` | `.portfolio__grid` |
| `block` | Default (no class needed) | `<div>` |
| `hidden` | `.visually-hidden` or `.hidden` | `.sr-only` |

### Spacing

| Tailwind | BEM Class | WordPress Property |
|----------|-----------|-------------------|
| `p-4` | Component-specific | `--wp--preset--spacing--md` |
| `m-4` | Component-specific | `--wp--preset--spacing--md` |
| `gap-4` | Component-specific | `--wp--preset--spacing--md` |

### Typography

| Tailwind | BEM Class | WordPress Property |
|----------|-----------|-------------------|
| `text-2xl` | `.text-section-h2` | `--wp--preset--font-size--2xl` |
| `font-bold` | `.font-heading` | `--wp--preset--font-weight--bold` |
| `text-center` | `.text-align-center` | N/A |

### Colors

| Tailwind | BEM Class | WordPress Property |
|----------|-----------|-------------------|
| `bg-gray-100` | `.background-neutral` | `--wp--preset--color--neutral-50` |
| `text-gray-900` | `.text-primary` | `--wp--preset--color--neutral-900` |
| `bg-pink-500` | `.background-neon-pink` | `--wp--preset--color--neon-pink` |

## Complete Mapping Tables

[Include all mapping tables from report]

## Conversion Patterns

### Pattern 1: Flex Container

```tsx
// ❌ Tailwind
<div className="flex items-center justify-between">

// ✅ BEM
<div className="flex-container flex-container--between">
// OR use component-specific class
<div className="header__inner">
```

### Pattern 2: Card with Spacing

```tsx
// ❌ Tailwind
<div className="p-6 bg-white rounded-lg shadow-md">

// ✅ BEM
<div className="card card--elevated">
```

### Pattern 3: Typography

```tsx
// ❌ Tailwind
<h2 className="text-2xl font-bold text-gray-900">

// ✅ BEM
<h2 className="card__title">
```

## WordPress Block Editor Alignment

### Block Classes

WordPress block editor uses specific class patterns:

```
.wp-block-*           # Block wrapper
.has-*-color          # Color utility
.has-*-background     # Background color utility
.is-style-*           # Block style variation
```

**Our BEM equivalents:**

| WP Block Class | BEM Equivalent |
|----------------|----------------|
| `.wp-block-group` | `.section` |
| `.wp-block-columns` | `.grid` or `.flex-container` |
| `.has-text-align-center` | `.text-align-center` |
| `.has-pink-color` | `.text-neon-pink` |
| `.has-black-background-color` | `.background-atomic-black` |

## Best Practices

1. **Always prefer existing BEM classes** over creating new ones
2. **Use WordPress custom properties** for colors, spacing, typography
3. **Follow BEM naming convention** when creating new classes
4. **Avoid inline styles** - always use classes
5. **Use semantic class names** - describe purpose, not appearance

## When to Create New BEM Classes

Create new BEM classes when:
- The pattern is reused across multiple components
- There's no suitable existing class
- The component needs unique styling

**Always add to:**
- Appropriate CSS file in `/styles/blocks/`
- Document in this mapping guide

---

**Last Updated:** March 11, 2026  
**Maintained By:** Development Team
```

---

## Related Documentation

**Guidelines:**
- [BEM Architecture](../../guidelines/css-architecture.md)
- [WordPress FSE Patterns](../../guidelines/wordpress-fse-patterns.md)
- [Design Tokens](../../guidelines/design-tokens/)

---

**Last Updated:** March 11, 2026
