# Spacing Adjustments Responsive Guidelines

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Part of:** Ash Shaw Makeup Portfolio Design System

## Overview

This document defines how spacing scales and adjusts across different device sizes, ensuring consistent rhythm, comfortable touch targets, and optimal use of screen real estate from mobile to desktop.

## Table of Contents

1. [Fluid Spacing System](#fluid-spacing-system)
2. [Device-Specific Adjustments](#device-specific-adjustments)
3. [Component Spacing](#component-spacing)
4. [Section Spacing](#section-spacing)
5. [Touch Target Sizing](#touch-target-sizing)
6. [Grid & Gap Patterns](#grid--gap-patterns)
7. [Implementation Patterns](#implementation-patterns)

---

## Fluid Spacing System

### Core Principle

All spacing uses CSS `clamp()` for fluid scaling between minimum and maximum values:

```css
padding: clamp([min-spacing], [preferred-spacing], [max-spacing]);
```

**Benefits:**
- ✅ Smooth transitions between breakpoints
- ✅ No jarring layout shifts
- ✅ Efficient use of screen space at every size
- ✅ Maintains consistent rhythm

### Spacing Scale

```css
/* Extra Small */
--spacing-fluid-xs: clamp(0.25rem, 0.5vw, 0.5rem);      /* 4px → 8px */

/* Small */
--spacing-fluid-sm: clamp(0.5rem, 1vw, 1rem);           /* 8px → 16px */

/* Medium */
--spacing-fluid-md: clamp(1rem, 2vw, 1.5rem);           /* 16px → 24px */

/* Large */
--spacing-fluid-lg: clamp(1.5rem, 3vw, 2.5rem);         /* 24px → 40px */

/* Extra Large */
--spacing-fluid-xl: clamp(2rem, 4vw, 3.5rem);           /* 32px → 56px */

/* 2XL */
--spacing-fluid-2xl: clamp(3rem, 6vw, 5rem);            /* 48px → 80px */

/* 3XL */
--spacing-fluid-3xl: clamp(4rem, 8vw, 7rem);            /* 64px → 112px */

/* 4XL */
--spacing-fluid-4xl: clamp(5rem, 10vw, 9rem);           /* 80px → 144px */

/* 5XL */
--spacing-fluid-5xl: clamp(6rem, 12vw, 11rem);          /* 96px → 176px */

/* 6XL */
--spacing-fluid-6xl: clamp(8rem, 16vw, 14rem);          /* 128px → 224px */
```

---

## Device-Specific Adjustments

### Mobile (320px - 767px)

**Spacing Priorities:**
- ✅ Maximize usable screen space
- ✅ Maintain readability with minimal padding
- ✅ Ensure touch targets are accessible (44px minimum)
- ✅ Prevent content from feeling cramped

**Typical Values:**
```css
/* Container padding */
.container-mobile {
  padding-left: clamp(1rem, 2vw, 1.5rem);    /* 16px → 18px */
  padding-right: clamp(1rem, 2vw, 1.5rem);   /* 16px → 18px */
}

/* Section vertical spacing */
.section-mobile {
  padding-top: clamp(3rem, 6vw, 5rem);       /* 48px → 54px */
  padding-bottom: clamp(3rem, 6vw, 5rem);    /* 48px → 54px */
}

/* Component spacing */
.card-mobile {
  padding: clamp(1rem, 2vw, 1.5rem);         /* 16px → 18px */
  margin-bottom: clamp(1rem, 2vw, 1.5rem);   /* 16px → 18px */
}

/* Stack gap (vertical rhythm) */
.stack-mobile {
  gap: clamp(0.75rem, 1.5vw, 1.25rem);       /* 12px → 14px */
}
```

**Mobile-Specific Patterns:**
```css
/* Reduce section padding on very small screens */
@media (max-width: 374px) {
  .section-xs {
    padding-top: 2.5rem;    /* 40px */
    padding-bottom: 2.5rem;
  }
}

/* Optimize for standard mobile (375px - 767px) */
@media (min-width: 375px) and (max-width: 767px) {
  .section-standard {
    padding-top: 3rem;      /* 48px */
    padding-bottom: 3rem;
  }
}
```

### Tablet (768px - 1023px)

**Spacing Priorities:**
- ✅ Balance efficiency and breathing room
- ✅ Accommodate both portrait and landscape orientations
- ✅ Scale up from mobile but maintain compactness
- ✅ Prepare for desktop-like layouts

**Typical Values:**
```css
/* Container padding */
.container-tablet {
  padding-left: clamp(1.5rem, 3vw, 2.5rem);  /* 24px → 30px */
  padding-right: clamp(1.5rem, 3vw, 2.5rem); /* 24px → 30px */
}

/* Section vertical spacing */
.section-tablet {
  padding-top: clamp(4rem, 8vw, 7rem);       /* 64px → 82px */
  padding-bottom: clamp(4rem, 8vw, 7rem);    /* 64px → 82px */
}

/* Component spacing */
.card-tablet {
  padding: clamp(1.5rem, 3vw, 2rem);         /* 24px → 30px */
  margin-bottom: clamp(1.5rem, 3vw, 2rem);   /* 24px → 30px */
}

/* Grid gap */
.grid-tablet {
  gap: clamp(1rem, 2vw, 1.5rem);             /* 16px → 20px */
}
```

**Orientation Adjustments:**
```css
/* Portrait: Taller, narrower - more vertical spacing */
@media (min-width: 768px) and (orientation: portrait) {
  .section-portrait {
    padding-top: 5rem;      /* 80px */
    padding-bottom: 5rem;
  }
}

/* Landscape: Wider - more horizontal spacing */
@media (min-width: 768px) and (orientation: landscape) {
  .section-landscape {
    padding-left: 3rem;     /* 48px */
    padding-right: 3rem;
  }
}
```

### Desktop (1024px+)

**Spacing Priorities:**
- ✅ Maximum visual breathing room
- ✅ Clear section delineation
- ✅ Generous component spacing
- ✅ Professional, polished appearance

**Typical Values:**
```css
/* Container padding */
.container-desktop {
  padding-left: clamp(2rem, 4vw, 3.5rem);    /* 32px → 56px */
  padding-right: clamp(2rem, 4vw, 3.5rem);   /* 32px → 56px */
}

/* Section vertical spacing */
.section-desktop {
  padding-top: clamp(5rem, 10vw, 9rem);      /* 80px → 144px */
  padding-bottom: clamp(5rem, 10vw, 9rem);   /* 80px → 144px */
}

/* Component spacing */
.card-desktop {
  padding: clamp(2rem, 4vw, 3rem);           /* 32px → 48px */
  margin-bottom: clamp(2rem, 4vw, 3rem);     /* 32px → 48px */
}

/* Grid gap */
.grid-desktop {
  gap: clamp(1.5rem, 3vw, 2.5rem);           /* 24px → 40px */
}
```

**Large Desktop Optimizations:**
```css
/* Extra large screens (1920px+) */
@media (min-width: 1920px) {
  .container-xl {
    max-width: 1600px;      /* Prevent excessive width */
    margin-left: auto;
    margin-right: auto;
  }
  
  .section-xl {
    padding-top: 9rem;      /* 144px - cap vertical spacing */
    padding-bottom: 9rem;
  }
}
```

---

## Component Spacing

### Buttons

**Purpose:** Comfortable tap targets, clear CTAs

```css
/* Button padding - scales with text size */
.button-spacing {
  padding-left: clamp(1.5rem, 3vw, 2rem);    /* 24px → 32px */
  padding-right: clamp(1.5rem, 3vw, 2rem);   /* 24px → 32px */
  padding-top: clamp(0.75rem, 1.5vw, 1rem);  /* 12px → 16px */
  padding-bottom: clamp(0.75rem, 1.5vw, 1rem); /* 12px → 16px */
  
  /* Minimum touch target */
  min-height: 44px;         /* Accessibility requirement */
  min-width: 44px;
}

/* Button groups */
.button-group {
  gap: clamp(0.75rem, 1.5vw, 1.25rem);       /* 12px → 20px */
}
```

**Mobile Adjustments:**
```css
@media (max-width: 767px) {
  /* Full-width buttons on mobile */
  .button-mobile {
    width: 100%;
    padding: 1rem;          /* 16px - generous tap target */
  }
  
  /* Stacked button groups */
  .button-group-mobile {
    flex-direction: column;
    gap: 0.75rem;           /* 12px */
  }
}
```

### Cards

**Purpose:** Content containers with consistent rhythm

```css
/* Card internal padding */
.card-padding {
  padding: clamp(1rem, 2vw, 1.5rem);         /* 16px → 24px */
}

/* Responsive card padding */
.card-padding-responsive {
  padding: clamp(1.25rem, 2.5vw, 2rem);      /* 20px → 32px */
}

/* Card spacing in grids */
.card-gap {
  gap: clamp(1rem, 2vw, 1.5rem);             /* 16px → 24px */
}
```

**Component Parts Spacing:**
```css
/* Space between card image and content */
.card-image-gap {
  margin-bottom: clamp(0.75rem, 1.5vw, 1.25rem); /* 12px → 20px */
}

/* Space between card elements */
.card-element-gap {
  margin-bottom: clamp(0.5rem, 1vw, 1rem);   /* 8px → 16px */
}

/* Card footer spacing */
.card-footer {
  margin-top: clamp(1rem, 2vw, 1.5rem);      /* 16px → 24px */
  padding-top: clamp(0.75rem, 1.5vw, 1.25rem); /* 12px → 20px */
  border-top: 1px solid var(--border-color);
}
```

### Forms

**Purpose:** Accessible, user-friendly input spacing

```css
/* Form field vertical spacing */
.form-field-gap {
  margin-bottom: clamp(1rem, 2vw, 1.5rem);   /* 16px → 24px */
}

/* Input padding */
.input-padding {
  padding: clamp(0.75rem, 1.5vw, 1rem);      /* 12px → 16px */
  min-height: 44px;       /* Touch target */
}

/* Label spacing */
.label-spacing {
  margin-bottom: clamp(0.25rem, 0.5vw, 0.5rem); /* 4px → 8px */
}

/* Form sections */
.form-section {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem); /* 24px → 40px */
}
```

**Mobile Form Optimizations:**
```css
@media (max-width: 767px) {
  /* Larger touch targets */
  .input-mobile {
    padding: 1rem;          /* 16px */
    font-size: 16px;        /* Prevent zoom on iOS */
  }
  
  /* Stack form groups */
  .form-group-mobile {
    flex-direction: column;
    gap: 1rem;              /* 16px */
  }
}
```

### Navigation

**Purpose:** Accessible menu spacing for all devices

```css
/* Desktop horizontal nav */
.nav-desktop {
  gap: clamp(1.5rem, 3vw, 2.5rem);           /* 24px → 40px */
}

/* Mobile vertical nav */
.nav-mobile {
  gap: clamp(1rem, 2vw, 1.5rem);             /* 16px → 24px */
  padding: clamp(1rem, 2vw, 1.5rem);         /* 16px → 24px */
}

/* Nav item padding */
.nav-item {
  padding: clamp(0.5rem, 1vw, 0.75rem);      /* 8px → 12px */
  min-height: 44px;       /* Touch target */
}
```

---

## Section Spacing

### Hero Sections

**Purpose:** Maximum impact with appropriate breathing room

```css
/* Hero vertical padding */
.hero-section {
  padding-top: clamp(3rem, 6vw, 5rem);       /* 48px → 80px */
  padding-bottom: clamp(3rem, 6vw, 5rem);    /* 48px → 80px */
}

/* Hero element spacing */
.hero-title-gap {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem); /* 24px → 40px */
}

.hero-cta-gap {
  margin-top: clamp(2rem, 4vw, 3.5rem);      /* 32px → 56px */
}
```

**Mobile Hero Adjustments:**
```css
@media (max-width: 767px) {
  .hero-mobile {
    padding-top: 2.5rem;    /* 40px - conserve space */
    padding-bottom: 2.5rem;
  }
}
```

### Content Sections

**Purpose:** Clear visual separation between major sections

```css
/* Standard section */
.section-spacing {
  padding-top: clamp(4rem, 8vw, 7rem);       /* 64px → 112px */
  padding-bottom: clamp(4rem, 8vw, 7rem);    /* 64px → 112px */
}

/* Alternate sections (lighter) */
.section-light {
  padding-top: clamp(3rem, 6vw, 5rem);       /* 48px → 80px */
  padding-bottom: clamp(3rem, 6vw, 5rem);    /* 48px → 80px */
}

/* Section header spacing */
.section-header {
  margin-bottom: clamp(2rem, 4vw, 3.5rem);   /* 32px → 56px */
}
```

### Gallery Sections

**Purpose:** Optimize for visual content display

```css
/* Gallery padding */
.gallery-section {
  padding-top: clamp(3rem, 6vw, 5rem);       /* 48px → 80px */
  padding-bottom: clamp(3rem, 6vw, 5rem);    /* 48px → 80px */
}

/* Gallery grid gaps */
.gallery-grid {
  gap: clamp(0.75rem, 1.5vw, 1.25rem);       /* 12px → 20px */
}

/* Gallery item padding (minimal) */
.gallery-item {
  padding: 0;               /* No padding - maximize image */
  margin: 0;
}
```

---

## Touch Target Sizing

### Minimum Touch Target Size

**WCAG 2.1 Requirement:** 44x44px minimum for touch targets

```css
/* Base touch target */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  
  /* Ensure clickable area */
  padding: 0.5rem;          /* 8px minimum */
}

/* Enhanced touch target (recommended) */
.touch-target-enhanced {
  min-width: 48px;
  min-height: 48px;
  padding: 0.75rem;         /* 12px */
}
```

### Component Touch Targets

```css
/* Buttons */
.button-touch {
  min-height: 44px;
  padding: 0.75rem 1.5rem;  /* 12px 24px */
}

/* Icon buttons */
.icon-button-touch {
  width: 44px;
  height: 44px;
  padding: 0.625rem;        /* 10px - center icon */
}

/* Links in text */
.text-link-touch {
  padding: 0.25rem 0;       /* 4px vertical */
  margin: -0.25rem 0;       /* Expand clickable area */
}

/* Navigation items */
.nav-item-touch {
  min-height: 44px;
  padding: 0.75rem 1rem;    /* 12px 16px */
}

/* Form inputs */
.input-touch {
  min-height: 44px;
  padding: 0.75rem;         /* 12px */
}
```

### Mobile Touch Target Enhancements

```css
@media (max-width: 767px) {
  /* Increase all touch targets on mobile */
  .touch-mobile {
    min-width: 48px;
    min-height: 48px;
  }
  
  /* Extra spacing between touch targets */
  .touch-group-mobile {
    gap: 0.75rem;           /* 12px minimum */
  }
  
  /* Full-width touch for important actions */
  .touch-primary-mobile {
    width: 100%;
    min-height: 48px;
    padding: 1rem;          /* 16px */
  }
}
```

---

## Grid & Gap Patterns

### Grid Gaps by Device

```css
/* Mobile grid (1 column or 2 columns) */
.grid-mobile {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);             /* 16px → 24px */
}

/* Tablet grid (2-3 columns) */
.grid-tablet {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);             /* 24px → 32px */
}

/* Desktop grid (3-4 columns) */
.grid-desktop {
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: clamp(2rem, 4vw, 3rem);               /* 32px → 48px */
}
```

### Responsive Grid Pattern

```css
/* Adaptive grid with fluid gaps */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
}

/* Portfolio grid example */
.portfolio-grid {
  display: grid;
  gap: clamp(1rem, 2vw, 1.5rem);
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(1.5rem, 3vw, 2rem);
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(2rem, 4vw, 2.5rem);
  }
}
```

### Flexbox Gaps

```css
/* Horizontal flex gap */
.flex-horizontal {
  display: flex;
  gap: clamp(0.75rem, 1.5vw, 1.25rem);       /* 12px → 20px */
}

/* Vertical flex gap (stack) */
.flex-vertical {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.5rem);             /* 16px → 24px */
}

/* Wrap gap (for chip lists, tags) */
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1vw, 0.75rem);          /* 8px → 12px */
}
```

---

## Implementation Patterns

### Pattern: Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="py-fluid-2xl px-fluid-md bg-gradient-to-br from-white to-pink-50 dark:from-purple-950 dark:to-purple-900">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-fluid-xl">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue dark:text-purple-100 mb-fluid-md">
              Ash Shaw
            </h1>
            <p className="text-fluid-xl font-body text-gray-700 dark:text-purple-200 mb-fluid-lg max-w-2xl mx-auto lg:mx-0">
              Makeup that shines with colour, energy, and connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-fluid-sm justify-center lg:justify-start">
              <button className="px-button py-button min-h-[44px] bg-gradient-pink-purple-blue text-white rounded-lg">
                View Portfolio
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1">
            {/* Hero image */}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Pattern: Card Grid

```tsx
export function PortfolioGrid() {
  return (
    <section className="py-fluid-3xl px-fluid-md">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-fluid-2xl">
          <h2 className="text-section-h2 font-heading font-bold text-gray-800 dark:text-purple-100 mb-fluid-md">
            Featured Work
          </h2>
          <p className="text-body-guideline font-body text-gray-600 dark:text-purple-300 max-w-2xl mx-auto">
            Explore my latest makeup artistry projects
          </p>
        </div>
        
        {/* Grid with responsive gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md lg:gap-fluid-lg">
          {items.map((item) => (
            <article key={item.id} className="bg-white dark:bg-purple-900 rounded-xl overflow-hidden shadow-lg">
              {/* Card image */}
              <div className="aspect-video">
                {/* Image */}
              </div>
              
              {/* Card content with consistent padding */}
              <div className="p-card-responsive">
                <h3 className="text-card-title font-heading font-semibold mb-fluid-sm">
                  {item.title}
                </h3>
                <p className="text-body-guideline font-body text-gray-600 dark:text-purple-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pattern: Form Layout

```tsx
export function ContactForm() {
  return (
    <form className="max-w-2xl mx-auto px-fluid-md py-fluid-lg">
      {/* Form fields with consistent spacing */}
      <div className="flex flex-col gap-fluid-md">
        <div>
          <label className="block text-fluid-base font-body font-medium mb-fluid-xs">
            Name
          </label>
          <input 
            type="text"
            className="w-full px-fluid-sm py-fluid-sm min-h-[44px] rounded-lg border border-gray-300 dark:border-purple-700"
          />
        </div>
        
        <div>
          <label className="block text-fluid-base font-body font-medium mb-fluid-xs">
            Email
          </label>
          <input 
            type="email"
            className="w-full px-fluid-sm py-fluid-sm min-h-[44px] rounded-lg border border-gray-300 dark:border-purple-700"
          />
        </div>
        
        <div>
          <label className="block text-fluid-base font-body font-medium mb-fluid-xs">
            Message
          </label>
          <textarea 
            rows={6}
            className="w-full px-fluid-sm py-fluid-sm rounded-lg border border-gray-300 dark:border-purple-700"
          />
        </div>
        
        {/* Button with proper spacing */}
        <button 
          type="submit"
          className="w-full sm:w-auto px-button py-button min-h-[44px] bg-gradient-pink-purple-blue text-white rounded-lg mt-fluid-md"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
```

---

## Testing Checklist

### Spacing Validation

- [ ] **Mobile (320px):** Content not cramped, adequate breathing room
- [ ] **Mobile (375px):** Comfortable spacing without waste
- [ ] **Tablet (768px):** Balanced spacing for medium screens
- [ ] **Desktop (1024px):** Generous spacing, professional appearance
- [ ] **Large Desktop (1920px+):** Spacing doesn't become excessive

### Touch Target Validation

- [ ] **All interactive elements:** Minimum 44x44px
- [ ] **Mobile buttons:** Full width or adequate width
- [ ] **Icon buttons:** Proper padding around icons
- [ ] **Navigation items:** Comfortable tap areas
- [ ] **Form inputs:** Minimum 44px height

### Grid & Layout Validation

- [ ] **Grid gaps:** Appropriate for device size
- [ ] **Column count:** Adapts to screen width
- [ ] **Content width:** Constrained appropriately
- [ ] **Section spacing:** Clear visual separation

---

## Related Documentation

- **[Breakpoints Guide](./breakpoints.md)** - Responsive breakpoint system
- **[Spacing Tokens](../design-tokens/spacing.md)** - Complete spacing scale
- **[Typography Scaling](./typography-scaling.md)** - Responsive typography
- **[Layout Patterns](./layout-patterns.md)** - Responsive layout strategies

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Maintained by:** Ash Shaw Portfolio Team
