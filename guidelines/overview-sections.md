# Section Patterns Overview

**Version:** 4.0.0  
**Last Updated:** January 2025

WordPress-aligned section patterns for the Ash Shaw Portfolio.

## Purpose

Define reusable section patterns following WordPress conventions with:
- Semantic HTML5 `<section>` elements
- Consistent container patterns
- Responsive spacing system
- Background treatment options
- Content width constraints
- Accessibility compliance

---

## Section Architecture

Sections are the **top-level layout containers** that organize page content into distinct semantic blocks, similar to WordPress block theme sections.

### Hierarchy

```
Template (Page)
├── Section (Full-width container)
│   ├── Container (Max-width wrapper)
│   │   ├── Block (Content group)
│   │   │   ├── Component (UI element)
│   │   │   └── Component
│   │   └── Block
│   └── Container
└── Section
```

---

## Section Types

The Ash Shaw portfolio uses **10 section types** organized by purpose. Each has detailed implementation guidelines.

### Content Sections

| Section | Purpose | Guideline File |
|---------|---------|---------------|
| **HeroSection** | Main landing area with primary message | [sections/HeroSection.md](./sections/HeroSection.md) |
| **FeaturedSection** | Showcase highlighted portfolio work | [sections/FeaturedSection.md](./sections/FeaturedSection.md) |
| **WhySection** | Mission and philosophy content | [sections/WhySection.md](./sections/WhySection.md) |
| **BlogPreviewSection** | Latest blog posts preview | [sections/BlogPreviewSection.md](./sections/BlogPreviewSection.md) |
| **FusionNailsSection** | Special project showcase | [sections/FusionNailsSection.md](./sections/FusionNailsSection.md) |

### Layout Sections

| Section | Purpose | Guideline File |
|---------|---------|---------------|
| **ThreeColumnPortfolioSection** | Portfolio gallery grid | [sections/ThreeColumnPortfolioSection.md](./sections/ThreeColumnPortfolioSection.md) |
| **HeroLayout** | Hero wrapper with background | [sections/HeroLayout.md](./sections/HeroLayout.md) |
| **OneColumnLayout** | Single column content | [sections/OneColumnLayout.md](./sections/OneColumnLayout.md) |
| **TwoColumnLayout** | Two column split layout | [sections/TwoColumnLayout.md](./sections/TwoColumnLayout.md) |
| **ThreeColumnLayout** | Three column grid | [sections/ThreeColumnLayout.md](./sections/ThreeColumnLayout.md) |

---

## Standard Section Patterns

### Container Widths

All sections follow these container width standards:

```tsx
// Full width (no max-width)
<div className="w-full px-fluid-md">

// Standard container (1280px) - Most sections
<div className="max-w-7xl mx-auto px-fluid-md">

// Narrow container (896px) - Content sections
<div className="max-w-4xl mx-auto px-fluid-md">

// Reading width (768px) - Articles/blogs
<div className="max-w-3xl mx-auto px-fluid-md">

// Minimal width (640px) - Forms/CTAs
<div className="max-w-2xl mx-auto px-fluid-md">
```

### Vertical Spacing

```tsx
// Section padding (vertical) - Standard for all sections
className="py-section"           // clamp(3rem, 6vw + 1rem, 8rem)

// Alternative fluid spacing
className="py-fluid-3xl"         // clamp(4rem, 2rem + 10vw, 8rem)
className="py-fluid-2xl"         // clamp(3rem, 1.5rem + 7.5vw, 6rem)
className="py-fluid-xl"          // clamp(2rem, 1.2rem + 4vw, 4rem)
```

### Horizontal Spacing

```tsx
// Container padding (horizontal) - Standard for all sections
className="px-fluid-md"          // clamp(1rem, 0.6rem + 2vw, 2rem)

// Alternative breakpoint-based
className="px-4 sm:px-6 md:px-8" // 16px → 24px → 32px
```

### Background Treatments

```tsx
// Gradient backgrounds (Brand colors)
className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
className="bg-gradient-to-br from-pink-100 to-purple-100"
className="bg-gradient-to-r from-blue-50 to-teal-50"

// Solid backgrounds
className="bg-white"
className="bg-gray-50"
className="bg-gradient-pink-purple-blue"  // Brand gradient

// Transparent overlays
className="bg-white/80 backdrop-blur-sm"
className="bg-black/50"
```

---

## Complete Section Structure Template

```tsx
<section 
  id="section-id"                    // For anchor links
  className="
    relative                         // Position context
    bg-gradient-to-br from-pink-50   // Background
    py-section                       // Vertical padding
    px-fluid-md                      // Horizontal padding
    overflow-hidden                  // Contain decorations
  "
  aria-labelledby="section-heading"  // Accessibility
>
  {/* Background decorations (optional) */}
  <div className="absolute top-0 left-0 w-full h-full opacity-20">
    {/* Gradient orbs, patterns, etc. */}
  </div>

  {/* Main container */}
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Section header (optional) */}
    <div className="text-center mb-fluid-2xl">
      <h2 
        id="section-heading"
        className="text-section-h2 font-heading font-bold mb-fluid-md"
      >
        Section Title
      </h2>
      <p className="text-body-guideline text-gray-600 max-w-2xl mx-auto">
        Section description
      </p>
    </div>

    {/* Section content */}
    <div className="section-content">
      {/* Blocks, components, patterns */}
    </div>

    {/* Section footer (optional) */}
    <div className="text-center mt-fluid-xl">
      <button className="w-full sm:w-auto px-button py-button">
        View More
      </button>
    </div>
  </div>
</section>
```

---

## WordPress Block Theme Alignment

### Core Blocks Equivalent

| Ash Shaw Section | WordPress Block | Purpose |
|-----------------|-----------------|---------|
| `HeroSection` | `core/cover` | Hero with background image/gradient |
| `FeaturedSection` | `core/query` | Post/portfolio grid display |
| `WhySection` | `core/group` | Content group with heading |
| `BlogPreviewSection` | `core/latest-posts` | Recent posts preview |
| `ThreeColumnPortfolioSection` | `core/gallery` | Image gallery grid |
| `FusionNailsSection` | `core/media-text` | Image + text combination |

---

## Best Practices

### 1. Consistent Container Pattern
```tsx
// ✅ Always wrap section content in max-width container
<section className="py-section px-fluid-md">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### 2. Responsive Padding
```tsx
// ✅ Use fluid utilities for smooth scaling
className="py-section px-fluid-md"

// ✅ Or breakpoint-based for precise control
className="py-8 sm:py-12 md:py-16 lg:py-20"
```

### 3. Background Decorations
```tsx
// ✅ Keep decorations in separate layer
<section className="relative">
  <div className="absolute inset-0 opacity-20">
    {/* Decorations */}
  </div>
  <div className="relative z-10">
    {/* Content above decorations */}
  </div>
</section>
```

### 4. Semantic HTML
```tsx
// ✅ CORRECT - Proper section usage
<section aria-labelledby="about-heading">
  <h2 id="about-heading">About</h2>
</section>

// ❌ WRONG - Generic div
<div className="section">
  <h2>About</h2>
</div>
```

---

## Section Guidelines

For detailed implementation of each section type, see the specific guideline files:

### Content Sections
- **[HeroSection.md](./sections/HeroSection.md)** - Main hero with image mosaic and CTAs
- **[FeaturedSection.md](./sections/FeaturedSection.md)** - Portfolio showcase grid with cards
- **[WhySection.md](./sections/WhySection.md)** - Mission statement and philosophy
- **[BlogPreviewSection.md](./sections/BlogPreviewSection.md)** - Latest blog posts preview
- **[FusionNailsSection.md](./sections/FusionNailsSection.md)** - Special project showcase

### Layout Sections
- **[ThreeColumnPortfolioSection.md](./sections/ThreeColumnPortfolioSection.md)** - Portfolio grid layout
- **[HeroLayout.md](./sections/HeroLayout.md)** - Hero wrapper with background
- **[OneColumnLayout.md](./sections/OneColumnLayout.md)** - Single column content
- **[TwoColumnLayout.md](./sections/TwoColumnLayout.md)** - Two column split
- **[ThreeColumnLayout.md](./sections/ThreeColumnLayout.md)** - Three column grid

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines
- **[overview-blocks.md](./overview-blocks.md)** - Block patterns
- **[overview-patterns.md](./overview-patterns.md)** - Design patterns
- **[overview-components.md](./overview-components.md)** - Component library
- **[design-tokens/spacing.md](./design-tokens/spacing.md)** - Spacing system

---

**Last Updated:** January 2025  
**Version:** 4.0.0