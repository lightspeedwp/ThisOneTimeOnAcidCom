# Mobile Spacing Guidelines

Mobile-specific spacing rules with fluid clamp values, viewport units, and responsive patterns.

## Purpose

Define spacing system for mobile devices with:
- Fluid clamp() values for smooth scaling
- Viewport unit (vh/vw) usage patterns
- Container padding standards
- Component spacing rules
- Touch-friendly spacing
- Responsive breakpoints

---

## Core Spacing Principles

### 1. Fluid Spacing with clamp()

Use `clamp()` for all spacing to scale smoothly between mobile and desktop.

```css
/* Syntax: clamp(MIN, PREFERRED, MAX) */
clamp(minimum-value, viewport-based-value, maximum-value)

/* Example */
padding: clamp(1rem, 5vw, 3rem);
/* = 16px minimum, 5% of viewport width, 48px maximum */
```

---

## Container Padding System

### Page Container Padding

```css
/* Mobile-first container padding */
.page-container {
  padding-left: clamp(1rem, 4vw, 1.5rem);   /* 16px → 24px */
  padding-right: clamp(1rem, 4vw, 1.5rem);  /* 16px → 24px */
}
```

**Tailwind Implementation:**
```tsx
<div className="px-4 sm:px-6 md:px-8 lg:px-12">
  {/* Content */}
</div>
```

**Breakdown:**
- **Mobile (< 640px):** `16px` (1rem = px-4)
- **Small tablet (640px+):** `24px` (1.5rem = px-6)
- **Tablet (768px+):** `32px` (2rem = px-8)
- **Desktop (1024px+):** `48px` (3rem = px-12)

### Section Padding (Vertical)

```css
/* Vertical section spacing */
.section {
  padding-top: clamp(3rem, 8vh, 6rem);      /* 48px → 96px */
  padding-bottom: clamp(3rem, 8vh, 6rem);   /* 48px → 96px */
}
```

**Tailwind Implementation:**
```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  {/* Section content */}
</section>
```

**Breakdown:**
- **Mobile (< 640px):** `48px` vertical (py-12)
- **Small tablet (640px+):** `64px` vertical (py-16)
- **Tablet (768px+):** `80px` vertical (py-20)
- **Desktop (1024px+):** `96px` vertical (py-24)

---

## Fluid Spacing Scale

### Complete Spacing System

```css
/* Extra Small - Component internal spacing */
--space-xs: clamp(0.25rem, 0.5vw, 0.5rem);     /* 4px → 8px */

/* Small - Tight element spacing */
--space-sm: clamp(0.5rem, 1vw, 1rem);          /* 8px → 16px */

/* Medium - Standard element spacing */
--space-md: clamp(1rem, 2vw, 1.5rem);          /* 16px → 24px */

/* Large - Section element spacing */
--space-lg: clamp(1.5rem, 3vw, 2.5rem);        /* 24px → 40px */

/* Extra Large - Major section spacing */
--space-xl: clamp(2rem, 4vw, 4rem);            /* 32px → 64px */

/* 2XL - Hero/feature spacing */
--space-2xl: clamp(3rem, 6vw, 6rem);           /* 48px → 96px */

/* 3XL - Page section spacing */
--space-3xl: clamp(4rem, 8vw, 8rem);           /* 64px → 128px */
```

### Tailwind Fluid Spacing Classes

```css
/* Defined in styles/globals.css */
.p-fluid-xs { padding: clamp(0.25rem, 0.5vw, 0.5rem); }
.p-fluid-sm { padding: clamp(0.5rem, 1vw, 1rem); }
.p-fluid-md { padding: clamp(1rem, 2vw, 1.5rem); }
.p-fluid-lg { padding: clamp(1.5rem, 3vw, 2.5rem); }
.p-fluid-xl { padding: clamp(2rem, 4vw, 4rem); }
.p-fluid-2xl { padding: clamp(3rem, 6vw, 6rem); }
.p-fluid-3xl { padding: clamp(4rem, 8vw, 8rem); }

/* Margin variants */
.mb-fluid-md { margin-bottom: clamp(1rem, 2vw, 1.5rem); }
.mt-fluid-lg { margin-top: clamp(1.5rem, 3vw, 2.5rem); }
.gap-fluid-sm { gap: clamp(0.5rem, 1vw, 1rem); }
```

---

## Component-Specific Spacing

### Card Padding

```css
/* Card internal padding */
.card-padding {
  padding: clamp(1rem, 3vw, 2rem);  /* 16px → 32px */
}
```

**Tailwind:**
```tsx
<div className="p-4 sm:p-6 md:p-8">
  {/* Card content */}
</div>

// Or fluid
<div className="p-fluid-md">
  {/* Scales from 16px to 24px */}
</div>
```

**Responsive Card Padding:**
```tsx
// Portfolio Card
<div className="p-4 sm:p-5 md:p-6 lg:p-8">
  {/* 16px → 20px → 24px → 32px */}
</div>

// Blog Card
<div className="p-5 sm:p-6 md:p-7">
  {/* 20px → 24px → 28px */}
</div>

// Testimonial Card
<div className="p-6 sm:p-8 md:p-10">
  {/* 24px → 32px → 40px */}
</div>
```

### Button Spacing

```css
/* Button internal padding */
.button-padding {
  padding-left: clamp(1rem, 3vw, 2rem);   /* 16px → 32px */
  padding-right: clamp(1rem, 3vw, 2rem);  /* 16px → 32px */
  padding-top: clamp(0.75rem, 2vw, 1rem); /* 12px → 16px */
  padding-bottom: clamp(0.75rem, 2vw, 1rem); /* 12px → 16px */
}
```

**Tailwind:**
```tsx
// Standard button
<button className="px-6 py-3 sm:px-8 sm:py-4">
  {/* Mobile: 24px x 12px, Desktop: 32px x 16px */}
</button>

// Using design tokens
<button className="px-button py-button">
  {/* Uses defined button padding from globals.css */}
</button>
```

### Grid Gap Spacing

```css
/* Portfolio/Blog grid gaps */
.grid-gap-mobile {
  gap: clamp(1rem, 2vw, 1.5rem);  /* 16px → 24px */
}

.grid-gap-desktop {
  gap: clamp(1.5rem, 3vw, 2.5rem); /* 24px → 40px */
}
```

**Tailwind:**
```tsx
// Portfolio Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>

// Blog Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  {/* Mobile: 24px, Desktop: 32px */}
</div>

// Fluid gap
<div className="grid grid-cols-2 gap-fluid-md">
  {/* Smoothly scales from 16px to 24px */}
</div>
```

---

## Viewport Height (vh) Usage

### Hero Section Heights

```css
/* Hero section minimum height */
.hero-mobile {
  min-height: clamp(400px, 60vh, 800px);
}

.hero-desktop {
  min-height: clamp(600px, 80vh, 1000px);
}
```

**Tailwind:**
```tsx
// Mobile hero
<section className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
  {/* Scales with viewport height */}
</section>

// Full viewport hero
<section className="min-h-screen">
  {/* Always 100vh */}
</section>

// Safe area for mobile (accounting for browser chrome)
<section className="min-h-[calc(100vh-80px)]">
  {/* 100vh minus header height */}
</section>
```

### Vertical Spacing with vh

```css
/* Section spacing based on viewport height */
.section-spacing-vh {
  padding-top: clamp(2rem, 8vh, 6rem);
  padding-bottom: clamp(2rem, 8vh, 6rem);
}
```

**Usage Patterns:**
```tsx
// Homepage sections
<section className="py-[8vh] min-py-8 max-py-24">
  {/* 8% of viewport height, minimum 32px, maximum 96px */}
</section>

// Content sections
<section className="py-[6vh] min-py-6 max-py-20">
  {/* 6% of viewport height */}
</section>
```

**⚠️ vh Caution:**
```tsx
// ❌ AVOID - Mobile browser chrome issues
<div className="h-screen">  
  {/* May be cut off by address bar on mobile */}
</div>

// ✅ CORRECT - Safe mobile height
<div className="min-h-[calc(100vh-80px)]">
  {/* Accounts for header/chrome */}
</div>

// Or use dvh (dynamic viewport height) if supported
<div className="h-[100dvh]">
  {/* Modern solution, adjusts for mobile chrome */}
</div>
```

---

## Viewport Width (vw) Usage

### Container Width

```css
/* Content container with vw padding */
.content-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(1rem, 4vw, 3rem);   /* 16px → 48px */
  padding-right: clamp(1rem, 4vw, 3rem);  /* 16px → 48px */
}
```

**Tailwind:**
```tsx
<div className="max-w-7xl mx-auto px-[4vw] sm:px-8 md:px-12">
  {/* 4% of viewport width on mobile, fixed on larger screens */}
</div>
```

### Typography with vw

```css
/* Fluid typography using vw */
.hero-title {
  font-size: clamp(2rem, 6vw, 7.5rem);  /* 32px → 120px */
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 3rem);  /* 24px → 48px */
}
```

**Breakdown:**
- **Mobile (320px):** 6vw = 19.2px → clamps to 32px (minimum)
- **Tablet (768px):** 6vw = 46px → uses 46px
- **Desktop (1920px):** 6vw = 115px → uses 115px
- **Wide (2560px):** 6vw = 154px → clamps to 120px (maximum)

---

## Touch-Friendly Spacing

### Minimum Touch Targets

```css
/* Minimum 44x44px touch target (Apple HIG & WCAG) */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}
```

**Tailwind:**
```tsx
// Button touch target
<button className="min-h-[44px] min-w-[44px] px-4 py-3">
  Action
</button>

// Icon button
<button className="w-12 h-12 flex items-center justify-center">
  <Icon className="w-5 h-5" />
</button>

// Link touch target
<a 
  href="#"
  className="inline-block py-3 px-4 min-h-[44px]"
>
  Learn More
</a>
```

### Spacing Between Touch Targets

```css
/* Minimum 8px spacing between touch targets */
.touch-spacing {
  gap: clamp(0.5rem, 2vw, 1rem);  /* 8px → 16px */
}
```

**Tailwind:**
```tsx
// Button group
<div className="flex gap-3 sm:gap-4">
  <button className="min-h-[44px]">Action 1</button>
  <button className="min-h-[44px]">Action 2</button>
</div>

// Navigation links
<nav className="flex gap-4 sm:gap-6">
  <a href="#" className="py-3">Home</a>
  <a href="#" className="py-3">About</a>
</nav>
```

---

## Responsive Spacing Patterns

### Mobile-First Spacing

```tsx
// Vertical rhythm - mobile to desktop
<div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
  <section>Section 1</section>
  <section>Section 2</section>
  <section>Section 3</section>
</div>

// Grid gap - responsive
<div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
  {/* 8px → 16px → 24px → 32px */}
</div>

// Flex gap - responsive
<div className="flex gap-3 sm:gap-4 md:gap-6">
  {/* 12px → 16px → 24px */}
</div>
```

### Container Max Width Pattern

```tsx
// Content sections with responsive padding
<section className="py-section">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
    {/* Content */}
  </div>
</section>

// Narrow content (blog posts)
<article className="py-section">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
    {/* Article content */}
  </div>
</article>

// Full width with padding
<section className="py-section px-4 sm:px-6 md:px-8">
  {/* Full width content */}
</section>
```

---

## Common Spacing Mistakes

### ❌ Mistake 1: Fixed Spacing on Mobile

```tsx
// ❌ WRONG - Fixed spacing doesn't scale
<div className="p-8 mb-12">
  {/* 32px padding and 48px margin on all screens */}
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Responsive spacing
<div className="p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
  {/* Scales appropriately */}
</div>

// Or use fluid
<div className="p-fluid-md mb-fluid-lg">
  {/* Smooth scaling with clamp */}
</div>
```

### ❌ Mistake 2: No Container Padding

```tsx
// ❌ WRONG - Content touches edges on mobile
<section>
  <h2>Section Title</h2>
  <p>Content...</p>
</section>
```

**Solution:**
```tsx
// ✅ CORRECT - Proper container padding
<section className="px-4 sm:px-6 md:px-8">
  <div className="max-w-7xl mx-auto">
    <h2>Section Title</h2>
    <p>Content...</p>
  </div>
</section>
```

### ❌ Mistake 3: Inconsistent Grid Gaps

```tsx
// ❌ WRONG - Different gaps in different grids
<div className="grid gap-4">...</div>
<div className="grid gap-6">...</div>
<div className="grid gap-3">...</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Consistent gap pattern
<div className="grid gap-4 md:gap-6">...</div>
<div className="grid gap-4 md:gap-6">...</div>
<div className="grid gap-4 md:gap-6">...</div>

// Or use design token
<div className="grid gap-fluid-md">...</div>
```

---

## Practical Examples

### Homepage Hero

```tsx
<section className="min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] px-4 sm:px-6 md:px-8">
  <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
    <div className="text-center space-y-6 sm:space-y-8">
      <h1 className="text-hero-h1 mb-fluid-md">
        Ash Shaw
      </h1>
      <p className="text-body-guideline max-w-2xl mx-auto px-4">
        Makeup that shines with colour, energy, and connection.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-fluid-lg">
        <button>Explore Portfolio</button>
        <button>Get In Touch</button>
      </div>
    </div>
  </div>
</section>
```

### Portfolio Grid

```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <h2 className="text-section-h2 mb-8 sm:mb-10 md:mb-12">
      Portfolio
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {portfolioItems.map(item => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  </div>
</section>
```

### Blog Post Article

```tsx
<article className="py-section">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
    {/* Featured Image */}
    <div className="mb-8 sm:mb-10 md:mb-12">
      <img src={post.image} alt={post.title} />
    </div>
    
    {/* Content */}
    <div className="prose prose-lg space-y-6 sm:space-y-8">
      <h1 className="mb-6">{post.title}</h1>
      <div>{post.content}</div>
    </div>
    
    {/* Share Component */}
    <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t">
      <ShareComponent />
    </div>
  </div>
</article>
```

---

## Testing Checklist

### Mobile Spacing Testing

- [ ] All content has container padding (minimum 16px)
- [ ] Touch targets are minimum 44x44px
- [ ] Spacing between touch targets is minimum 8px
- [ ] Grid gaps are consistent across breakpoints
- [ ] Sections have appropriate vertical spacing
- [ ] Hero sections use viewport heights appropriately
- [ ] No horizontal scrolling on mobile
- [ ] Content doesn't touch screen edges

### Viewport Testing

Test on these viewport widths:
- **320px** - Smallest mobile (iPhone SE)
- **375px** - Standard mobile (iPhone)
- **768px** - Tablet
- **1024px** - Desktop
- **1920px** - Large desktop

---

## Related Documentation

- **[mobile/typography.md](./typography.md)** - Typography scaling
- **[mobile/buttons.md](./buttons.md)** - Button spacing and sizing
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Full spacing system

---

**Last Updated:** January 2025  
**Version:** 3.2.0
