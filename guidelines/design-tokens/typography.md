# Typography Design Tokens

**Version:** 5.0.0  
**Last Updated:** January 2025  
**WordPress Theme.json Compatible:** ✅

Complete typography system for the Ash Shaw Makeup Portfolio, aligned with WordPress block theme standards using numeric font size scale (100-900) with fluid typography.

## ✅ WordPress Theme.json Alignment (v5.0.0)

This typography system now uses WordPress `--wp--preset--` CSS variables:

- ✅ **Font Families:** `--wp--preset--font-family--{slug}` (semantic slugs)
- ✅ **Font Sizes:** `--wp--preset--font-size--{slug}` (numeric slugs 100-900)
- ✅ **Fluid Typography:** Responsive clamp() functions for all sizes
- ✅ **Helper Classes:** `.text-size-{slug}`, `.font-brand-{slug}`

**See Also:** [wordpress-preset-system.md](../wordpress-preset-system.md) for complete implementation details

**Key Difference from Previous Version:**
- **Before:** Custom variables (--text-hero-h1, --text-section-h2, etc.)
- **Now:** WordPress presets (--wp--preset--font-size--800, --wp--preset--font-size--700, etc.)
- **Legacy Support:** Old variables preserved for backward compatibility

## 📋 Table of Contents

1. [Font Families](#font-families)
2. [WordPress Numeric Typography Scale](#wordpress-numeric-typography-scale)
3. [Fluid Typography System](#fluid-typography-system)
4. [Helper Classes](#helper-classes)
5. [Semantic HTML Mapping](#semantic-html-mapping)
6. [Migration Guide](#migration-guide)
7. [Common Typography Patterns](#common-typography-patterns)

---

## Font Families

### WordPress Font Family Presets

```css
/* WordPress-Aligned Font Family Variables */
--wp--preset--font-family--brand-title: "Righteous", "Arial Black", sans-serif;
--wp--preset--font-family--brand-heading: "Playfair Display", "Times New Roman", serif;
--wp--preset--font-family--brand-body: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--wp--preset--font-family--brand-sans: var(--wp--preset--font-family--brand-body);
--wp--preset--font-family--brand-serif: var(--wp--preset--font-family--brand-heading);
```

### Primary Fonts (Unchanged)

The Ash Shaw brand uses these fonts (preserved from original design):

#### Playfair Display (Serif)
**Usage:** Headings, elegant titles, sophisticated moments

```css
/* WordPress CSS Variable */
--wp--preset--font-family--brand-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
--wp--preset--font-family--brand-serif: var(--wp--preset--font-family--brand-heading);

/* Legacy Variable (Preserved) */
--font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;

/* Helper Classes */
.font-brand-heading
.font-brand-serif
.font-heading /* legacy */
```

**Characteristics:**
- High-contrast serif design
- Elegant and sophisticated
- Best for headings and display text
- Variable font (400-900 weight range)

**Example:**
```tsx
<h1 className="font-brand-heading font-bold text-size-700">
  Elegant Section Title
</h1>
```

#### Inter (Sans-Serif)
**Usage:** Body text, UI elements, readable content

```css
/* WordPress CSS Variable */
--wp--preset--font-family--brand-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--wp--preset--font-family--brand-sans: var(--wp--preset--font-family--brand-body);

/* Legacy Variable (Preserved) */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Helper Classes */
.font-brand-body
.font-brand-sans
.font-body /* legacy */
```

**Characteristics:**
- Highly readable sans-serif
- Optimized for screens
- Excellent for body text
- Variable font (100-900 weight range)

**Example:**
```tsx
<p className="font-brand-body font-normal text-size-200">
  Readable body text with optimal line height
</p>
```

#### Righteous (Display)
**Usage:** Hero titles, main branding, attention-grabbing headlines

```css
/* WordPress CSS Variable */
--wp--preset--font-family--brand-title: 'Righteous', sans-serif;

/* Legacy Variable (Preserved) */
--font-title: 'Righteous', sans-serif;

/* Helper Classes */
.font-brand-title
.font-title /* legacy */
```

**Characteristics:**
- Bold, modern display font
- High impact for hero sections
- Best for large sizes only
- Single weight (400/normal)

**Example:**
```tsx
<h1 className="font-brand-title text-gradient-pink-purple-blue">
  Hi, I'm Ash Shaw
</h1>
```

---

## WordPress Numeric Typography Scale

### Core Font Size Scale

All font sizes use **numeric slugs (100-900)** with fluid typography:

```css
/* WordPress Theme.json Typography Scale */
--wp--preset--font-size--100: clamp(0.65rem, 0.9vw, 0.75rem);      /* Tiny */
--wp--preset--font-size--200: clamp(0.875rem, 1.1vw, 1rem);        /* Base */
--wp--preset--font-size--300: clamp(1rem, 1.3vw, 1.25rem);         /* Small */
--wp--preset--font-size--400: clamp(1.25rem, 1.6vw, 1.5rem);       /* Medium */
--wp--preset--font-size--500: clamp(1.5rem, 2.2vw, 2rem);          /* Large */
--wp--preset--font-size--600: clamp(2rem, 2.8vw, 2.5rem);          /* X-Large */
--wp--preset--font-size--700: clamp(2.5rem, 3.5vw, 3rem);          /* XX-Large */
--wp--preset--font-size--800: clamp(3rem, 4.5vw, 4rem);            /* Huge */
--wp--preset--font-size--900: clamp(3.5rem, 6vw, 5rem);            /* Gigantic */
```

### Visual Typography Scale

```
┌─────────────────────────────────────────────────────────────────────┐
│           WORDPRESS NUMERIC TYPOGRAPHY SCALE (Fluid)                 │
└─────────────────────────────────────────────────────────────────────┘

MOBILE (320px) ────────────────────────────────→ DESKTOP (1440px)

--font-size--100 (Tiny)
▓                                                ▓▓
0.65rem (10.4px)                                 0.75rem (12px)

--font-size--200 (Base)
▓▓                                               ▓▓▓
0.875rem (14px)                                  1rem (16px)

--font-size--300 (Small)
▓▓▓                                              ▓▓▓▓
1rem (16px)                                      1.25rem (20px)

--font-size--400 (Medium)
▓▓▓▓                                             ▓▓▓▓▓
1.25rem (20px)                                   1.5rem (24px)

--font-size--500 (Large)
▓▓▓▓▓▓                                           ▓▓▓▓▓▓▓▓
1.5rem (24px)                                    2rem (32px)

--font-size--600 (X-Large)
▓▓▓▓▓▓▓▓                                         ▓▓▓▓▓▓▓▓▓▓
2rem (32px)                                      2.5rem (40px)

--font-size--700 (XX-Large)
▓▓▓▓▓▓▓▓▓▓                                       ▓▓▓▓▓▓▓▓▓▓▓▓
2.5rem (40px)                                    3rem (48px)

--font-size--800 (Huge)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
3rem (48px)                                      4rem (64px)

--font-size--900 (Gigantic)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
3.5rem (56px)                                    5rem (80px)
```

### Font Size Progression

| Slug | Min Size | Max Size | Name | Use Case |
|------|----------|----------|------|----------|
| `100` | 0.65rem (10.4px) | 0.75rem (12px) | Tiny | Fine print, captions |
| `200` | 0.875rem (14px) | 1rem (16px) | **Base** | Body text default |
| `300` | 1rem (16px) | 1.25rem (20px) | Small | Large body text, small headings |
| `400` | 1.25rem (20px) | 1.5rem (24px) | Medium | H6, subheadings |
| `500` | 1.5rem (24px) | 2rem (32px) | Large | H5, section subheadings |
| `600` | 2rem (32px) | 2.5rem (40px) | X-Large | H4, card titles |
| `700` | 2.5rem (40px) | 3rem (48px) | XX-Large | H3, section titles |
| `800` | 3rem (48px) | 4rem (64px) | Huge | H2, page titles |
| `900` | 3.5rem (56px) | 5rem (80px) | Gigantic | H1, hero titles |

---

## Fluid Typography System

### How Fluid Typography Works

WordPress uses `clamp()` for responsive font sizes without media queries:

```css
/* Anatomy of clamp() */
font-size: clamp(
  [minimum size],
  [preferred size with viewport scaling],
  [maximum size]
);

/* Example: Font Size 400 */
font-size: clamp(1.25rem, 1.6vw, 1.5rem);
/*              ↑          ↑        ↑
 *           minimum    fluid    maximum
 *          (mobile)   scaling  (desktop)
 */
```

### Viewport Scaling Configuration

```css
/* Global Fluid Typography Settings */
--wp--typography--fluid--min-font-size: 0.875rem;  /* 14px minimum */
--wp--typography--fluid--max-viewport-width: 1440px;
--wp--typography--fluid--min-viewport-width: 320px;
```

### Benefits of Fluid Typography

- ✅ **No breakpoints needed** - Smooth scaling across all viewport sizes
- ✅ **Automatic clamping** - Prevents too-small or too-large text
- ✅ **Better accessibility** - Text scales naturally with viewport
- ✅ **Consistent hierarchy** - Maintains proportions at all sizes

---

## Helper Classes

### Font Size Classes

```css
/* Font Size Helper Classes */
.text-size-100 { font-size: var(--wp--preset--font-size--100); }
.text-size-200 { font-size: var(--wp--preset--font-size--200); }
.text-size-300 { font-size: var(--wp--preset--font-size--300); }
.text-size-400 { font-size: var(--wp--preset--font-size--400); }
.text-size-500 { font-size: var(--wp--preset--font-size--500); }
.text-size-600 { font-size: var(--wp--preset--font-size--600); }
.text-size-700 { font-size: var(--wp--preset--font-size--700); }
.text-size-800 { font-size: var(--wp--preset--font-size--800); }
.text-size-900 { font-size: var(--wp--preset--font-size--900); }
```

### Brand Font Classes

```css
/* Brand Font Helper Classes */
.font-brand-title { font-family: var(--wp--preset--font-family--brand-title); }
.font-brand-heading { font-family: var(--wp--preset--font-family--brand-heading); }
.font-brand-body { font-family: var(--wp--preset--font-family--brand-body); }
.font-brand-sans { font-family: var(--wp--preset--font-family--brand-sans); }
.font-brand-serif { font-family: var(--wp--preset--font-family--brand-serif); }
```

---

## Semantic HTML Mapping

### Default Element Styles

```css
/* Heading Hierarchy */
h1 {
  font-size: var(--wp--preset--font-size--900);  /* Gigantic */
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: var(--wp--preset--font-size--800);  /* Huge */
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 700;
  line-height: 1.2;
}

h3 {
  font-size: var(--wp--preset--font-size--700);  /* XX-Large */
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 600;
  line-height: 1.3;
}

h4 {
  font-size: var(--wp--preset--font-size--600);  /* X-Large */
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 600;
  line-height: 1.3;
}

h5 {
  font-size: var(--wp--preset--font-size--500);  /* Large */
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 600;
  line-height: 1.4;
}

h6 {
  font-size: var(--wp--preset--font-size--400);  /* Medium */
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 600;
  line-height: 1.4;
}

/* Body Text */
p {
  font-size: var(--wp--preset--font-size--200);  /* Base */
  font-family: var(--wp--preset--font-family--brand-body);
  font-weight: 400;
  line-height: 1.6;
}

/* Small Text */
small {
  font-size: var(--wp--preset--font-size--100);  /* Tiny */
  line-height: 1.5;
}
```

### React/TSX Usage Examples

```tsx
{/* Hero Title - Gigantic */}
<h1 className="font-brand-title text-gradient-pink-purple-blue">
  Hi, I'm Ash Shaw
</h1>

{/* Section Title - Huge */}
<h2 className="font-brand-heading font-bold text-foreground-light dark:text-foreground-dark">
  Featured Work
</h2>

{/* Subsection Title - XX-Large */}
<h3 className="font-brand-heading font-semibold">
  Festival Makeup
</h3>

{/* Card Title - X-Large */}
<h4 className="font-brand-heading font-medium">
  UV Artistry
</h4>

{/* Body Text - Base */}
<p className="font-brand-body font-normal text-body-light dark:text-body-dark">
  Makeup that shines with colour, energy, and connection.
</p>

{/* Caption - Tiny */}
<small className="font-brand-body text-caption-light dark:text-caption-dark">
  Photo taken at Modem Festival 2024
</small>
```

---

## Migration Guide

### Old vs New Mapping

| Old Class | New WordPress Variable | Slug | Use Case |
|-----------|----------------------|------|----------|
| `.text-hero-h1` | `--font-size--900` | `900` | Hero titles |
| `.text-section-h2` | `--font-size--800` | `800` | Section headings |
| `.text-subsection-h3` | `--font-size--700` | `700` | Subsection titles |
| `.text-card-h4` | `--font-size--600` | `600` | Card titles |
| `.text-body-guideline` | `--font-size--200` | `200` | Body text |
| `.text-small` | `--font-size--100` | `100` | Captions, fine print |

### Migration Examples

**Before (Semantic):**
```tsx
<h1 className="text-hero-h1 font-title font-bold">
  Hero Title
</h1>

<h2 className="text-section-h2 font-heading font-semibold">
  Section Title
</h2>

<p className="text-body-guideline font-body">
  Body content
</p>
```

**After (WordPress Numeric):**
```tsx
<h1 className="font-brand-title font-bold">
  Hero Title
</h1>

<h2 className="font-brand-heading font-semibold">
  Section Title
</h2>

<p className="font-brand-body">
  Body content
</p>
```

**Note:** The new system relies on semantic HTML (`<h1>`, `<h2>`, `<p>`) to automatically apply the correct font sizes. This is more maintainable and accessible.

---

## Common Typography Patterns

### Hero Sections

```tsx
{/* Large Impact Hero */}
<section className="hero">
  <h1 className="font-brand-title font-normal text-gradient-pink-purple-blue">
    Hi, I'm Ash Shaw
  </h1>
  <h2 className="font-brand-heading font-bold text-gradient-purple-pink">
    makeup artist
  </h2>
  <p className="font-brand-body font-normal text-hero-description">
    Makeup that shines with colour, energy, and connection.
  </p>
</section>
```

### Section Headers

```tsx
{/* Standard Section */}
<section>
  <h2 className="font-brand-heading font-bold mb-spacing-40">
    Featured Work
  </h2>
  <p className="font-brand-body text-section-description mb-spacing-60">
    Explore my latest festival and UV makeup artistry.
  </p>
</section>
```

### Card Components

```tsx
{/* Portfolio Card */}
<article className="card">
  <h3 className="font-brand-heading font-semibold mb-spacing-20">
    Festival Artistry
  </h3>
  <p className="font-brand-body text-card-description">
    Vibrant festival makeup with UV accents.
  </p>
  <small className="font-brand-body text-caption">
    Modem Festival 2024
  </small>
</article>
```

### Blog Content

```tsx
{/* Blog Post */}
<article className="blog-post">
  <h1 className="font-brand-heading font-bold mb-spacing-30">
    Ultimate UV Makeup Guide
  </h1>
  
  <p className="font-brand-body mb-spacing-40">
    Introduction paragraph with regular body text.
  </p>
  
  <h2 className="font-brand-heading font-semibold mb-spacing-20">
    What is UV Makeup?
  </h2>
  
  <p className="font-brand-body mb-spacing-30">
    Body content explaining UV makeup techniques.
  </p>
  
  <h3 className="font-brand-heading font-medium mb-spacing-20">
    Essential Products
  </h3>
  
  <ul className="font-brand-body">
    <li>UV-reactive face paint</li>
    <li>Blacklight for testing</li>
    <li>Setting spray</li>
  </ul>
</article>
```

---

## Font Weight System

### Available Weights

```css
/* Font Weight Variables */
--font-weight-thin: 100;
--font-weight-extralight: 200;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;
```

### Global CSS Font Weight Classes

Defined in `/styles/globals.css` and available as utility classes:

```css
.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }
```

**Note:** These classes are defined in the `/styles/globals.css` file and work seamlessly with WordPress theme.json standards. They're not raw Tailwind utilities, but semantic classes built on top of the Tailwind foundation.

### Weight Usage Guidelines

| Weight | Class | Use Case |
|--------|-------|----------|
| 400 | `.font-normal` | Body text, paragraphs |
| 500 | `.font-medium` | Emphasized text, buttons |
| 600 | `.font-semibold` | Subheadings (H4-H6) |
| 700 | `.font-bold` | Main headings (H1-H3) |

---

## Line Height System

### Default Line Heights

```css
/* Line Height Variables */
--line-height-none: 1;
--line-height-tight: 1.2;
--line-height-snug: 1.3;
--line-height-normal: 1.5;
--line-height-relaxed: 1.6;
--line-height-loose: 1.8;
```

### Element-Specific Line Heights

```css
/* Headings: Tight */
h1, h2, h3 {
  line-height: 1.2;
}

/* Subheadings: Snug */
h4, h5, h6 {
  line-height: 1.3;
}

/* Body Text: Relaxed */
p {
  line-height: 1.6;
}

/* Small Text: Normal */
small {
  line-height: 1.5;
}
```

---

## Best Practices

### ✅ DO

1. **Use semantic HTML elements**
   ```tsx
   {/* ✅ GOOD - Semantic HTML applies correct sizing */}
   <h1>Hero Title</h1>
   <h2>Section Title</h2>
   <p>Body text</p>
   ```

2. **Rely on default styles when possible**
   ```tsx
   {/* ✅ GOOD - Let CSS handle sizing */}
   <h1 className="font-brand-title text-gradient-pink-purple-blue">
     Hi, I'm Ash Shaw
   </h1>
   ```

3. **Use WordPress CSS variables**
   ```css
   /* ✅ GOOD */
   .custom-heading {
     font-size: var(--wp--preset--font-size--700);
   }
   ```

4. **Maintain hierarchy**
   - Don't skip heading levels (h1 → h3)
   - Keep consistent font family per element type
   - Use appropriate weights for emphasis

### ❌ DON'T

1. **Don't hardcode font sizes**
   ```css
   /* ❌ BAD */
   .heading {
     font-size: 48px; /* Don't hardcode */
   }
   
   /* ✅ GOOD */
   .heading {
     font-size: var(--wp--preset--font-size--800);
   }
   ```

2. **Don't use non-semantic classes for sizing**
   ```tsx
   {/* ❌ BAD */}
   <div className="text-5xl">Title</div>
   
   {/* ✅ GOOD */}
   <h2>Title</h2>
   ```

3. **Don't break heading hierarchy**
   ```tsx
   {/* ❌ BAD */}
   <h1>Page Title</h1>
   <h3>Skipped H2</h3> {/* Don't skip levels */}
   
   {/* ✅ GOOD */}
   <h1>Page Title</h1>
   <h2>Section Title</h2>
   <h3>Subsection Title</h3>
   ```

---

## Accessibility Considerations

### Minimum Font Size

```css
/* Always maintain readable minimum */
--wp--typography--fluid--min-font-size: 0.875rem; /* 14px minimum */
```

**WCAG 2.2 Guidelines:**
- Body text: Minimum 16px (1rem) recommended
- Large text (18pt+/24px+): Easier to read for low vision users
- Don't go below 14px for any content

### High Contrast Mode

```css
/* Ensure sufficient color contrast */
@media (prefers-contrast: high) {
  body {
    font-weight: 500; /* Slightly bolder in high contrast */
  }
}
```

### Font Scaling Respect

```css
/* Respect user font size preferences */
html {
  font-size: 100%; /* Allow browser zoom */
}

/* Use rem, not px */
p {
  font-size: var(--wp--preset--font-size--200); /* Uses rem */
}
```

---

## WordPress Block Editor Integration

### Block Pattern Typography

```html
<!-- wp:heading {"level":1,"fontSize":"900"} -->
<h1 class="wp-block-heading has-900-font-size">Hero Title</h1>
<!-- /wp:heading -->

<!-- wp:heading {"level":2,"fontSize":"800"} -->
<h2 class="wp-block-heading has-800-font-size">Section Title</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"200"} -->
<p class="has-200-font-size">Body text content.</p>
<!-- /wp:paragraph -->
```

### Custom Block Styles

```css
/* Custom typography for blocks */
.wp-block-custom-hero {
  font-size: var(--wp--preset--font-size--900);
  font-family: var(--wp--preset--font-family--brand-title);
  line-height: 1.1;
}

.wp-block-custom-card-title {
  font-size: var(--wp--preset--font-size--600);
  font-family: var(--wp--preset--font-family--brand-heading);
  font-weight: 600;
}
```

---

## Summary

### Key Takeaways

- ✅ **Numeric scale (100-900)** replaces semantic names
- ✅ **Fluid typography** with clamp() for all font sizes
- ✅ **WordPress theme.json compatible** with standard CSS variables
- ✅ **Semantic HTML** applies correct sizing automatically
- ✅ **Brand fonts preserved** (Playfair Display, Inter, Righteous)

### Quick Reference

| Size | Slug | Min | Max | Element | Use Case |
|------|------|-----|-----|---------|----------|
| Tiny | `100` | 0.65rem | 0.75rem | `<small>` | Captions |
| **Base** | `200` | 0.875rem | 1rem | `<p>` | Body text |
| Small | `300` | 1rem | 1.25rem | - | Large body |
| Medium | `400` | 1.25rem | 1.5rem | `<h6>` | Subheadings |
| Large | `500` | 1.5rem | 2rem | `<h5>` | Section subs |
| X-Large | `600` | 2rem | 2.5rem | `<h4>` | Card titles |
| XX-Large | `700` | 2.5rem | 3rem | `<h3>` | Section titles |
| Huge | `800` | 3rem | 4rem | `<h2>` | Page titles |
| Gigantic | `900` | 3.5rem | 5rem | `<h1>` | Hero titles |

---

**Version:** 5.0.0 (WordPress Numeric Scale)  
**Last Updated:** January 2025  
**Maintained By:** Ash Shaw Portfolio Team

**Related Documentation:**
- [Spacing Design Tokens](./spacing.md) - Spacing system
- [Colors Design Tokens](./colors.md) - Color palette
- [Component Guidelines](../components/) - Component-specific usage