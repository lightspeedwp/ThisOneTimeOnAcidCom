# Mobile Typography Guidelines

Mobile-specific typography rules for optimal readability and accessibility on small screens.

## Purpose

Ensure readable, accessible typography on mobile devices with:
- Minimum font sizes for touch interfaces
- Appropriate line heights for reading
- Responsive heading adjustments
- Touch-friendly link spacing
- iOS Safari zoom prevention
- Optimal reading line lengths

---

## Core Principles

### 1. Minimum Font Size: 16px

**Critical Rule:** Never use font sizes below 16px for body text on mobile.

```css
/* ❌ WRONG - Triggers iOS zoom on input focus */
body {
  font-size: 14px;
}

input {
  font-size: 12px;
}

/* ✅ CORRECT - Prevents unwanted zoom */
body {
  font-size: 16px; /* or use text-body-guideline: clamp(1rem, 1.5vw, 1.25rem) */
}

input, select, textarea {
  font-size: 16px; /* Minimum for iOS Safari */
}
```

**Why:** iOS Safari automatically zooms when input fields have font-size < 16px, disrupting user experience.

---

## Fluid Typography Scale

### Complete Typography System with clamp() Breakdown

All typography uses `clamp(MIN, PREFERRED, MAX)` for smooth scaling:

```css
/* Hero Title (H1) */
.text-hero-h1 {
  font-size: clamp(2.25rem, 6vw, 7.5rem);
  /* MIN: 36px, PREFERRED: 6% of viewport width, MAX: 120px */
}

/* Section Title (H2) */
.text-section-h2 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* MIN: 24px, PREFERRED: 4% of viewport width, MAX: 48px */
}

/* Subsection Title (H3) */
.text-subsection-h3 {
  font-size: clamp(1.25rem, 3vw, 2.25rem);
  /* MIN: 20px, PREFERRED: 3% of viewport width, MAX: 36px */
}

/* Body Text (Standard) */
.text-body-guideline {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  /* MIN: 16px, PREFERRED: 1.5% of viewport width, MAX: 20px */
}

/* Small Text */
.text-fluid-sm {
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  /* MIN: 14px, PREFERRED: 1.2% of viewport width, MAX: 16px */
}

/* Extra Small Text */
.text-fluid-xs {
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  /* MIN: 12px, PREFERRED: 1% of viewport width, MAX: 14px */
}

/* Large Text */
.text-fluid-lg {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  /* MIN: 18px, PREFERRED: 2% of viewport width, MAX: 24px */
}

/* Extra Large Text */
.text-fluid-xl {
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  /* MIN: 20px, PREFERRED: 2.5% of viewport width, MAX: 32px */
}

/* Button Text */
.text-button-fluid {
  font-size: clamp(1rem, 2vw, 1.125rem);
  /* MIN: 16px, PREFERRED: 2% of viewport width, MAX: 18px */
}
```

### clamp() Breakdown by Viewport

Understanding how `clamp(2.25rem, 6vw, 7.5rem)` works at different viewport widths:

| Viewport Width | 6vw Calculation | Actual Font Size | Note |
|---------------|-----------------|------------------|------|
| **320px** (Mobile) | 19.2px | **36px** | Uses MIN (2.25rem) |
| **480px** (Mobile) | 28.8px | **28.8px** | Uses PREFERRED (6vw) |
| **768px** (Tablet) | 46px | **46px** | Uses PREFERRED (6vw) |
| **1024px** (Desktop) | 61px | **61px** | Uses PREFERRED (6vw) |
| **1440px** (Desktop) | 86px | **86px** | Uses PREFERRED (6vw) |
| **1920px** (Large) | 115px | **115px** | Uses PREFERRED (6vw) |
| **2560px** (Wide) | 154px | **120px** | Uses MAX (7.5rem) |

**How it works:**
1. Browser calculates `6vw` (6% of viewport width)
2. If result < 36px → Uses 36px (minimum)
3. If 36px < result < 120px → Uses the calculated vw value
4. If result > 120px → Uses 120px (maximum)

### Mobile-First Fluid Sizes

Use the fluid typography tokens from `design-tokens/typography.md`:

```tsx
// Hero Titles - Mobile to Desktop
<h1 className="text-hero-h1">
  {/* clamp(2.25rem, 6vw, 7.5rem) → 36px to 120px */}
  Ash Shaw
</h1>

// Section Headings
<h2 className="text-section-h2">
  {/* clamp(1.5rem, 4vw, 3rem) → 24px to 48px */}
  Portfolio
</h2>

// Body Text
<p className="text-body-guideline">
  {/* clamp(1rem, 1.5vw, 1.25rem) → 16px to 20px */}
  Makeup that shines with colour, energy, and connection.
</p>

// Small Text
<span className="text-fluid-sm">
  {/* clamp(0.875rem, 1.2vw, 1rem) → 14px to 16px */}
  Published 3 days ago
</span>
```

### Viewport Width (vw) vs Breakpoint Scaling

```tsx
// ✅ PREFERRED: Fluid with clamp (smooth scaling)
<h1 className="text-hero-h1">
  {/* Smoothly scales from 36px to 120px */}
</h1>

// ⚠️ ALTERNATIVE: Breakpoint-based (stepped scaling)
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
  {/* Jumps at each breakpoint: 36px → 48px → 60px → 72px → 96px */}
</h1>
```

**When to use each:**
- **clamp() with vw:** Smooth, continuous scaling. Best for hero titles, large headings.
- **Breakpoint classes:** Precise control at specific breakpoints. Better for body text, UI elements.
- **Hybrid:** Use both together for maximum control

```tsx
// Hybrid approach
<h1 className="text-hero-h1 sm:text-hero-h1 lg:leading-tight">
  {/* Fluid sizing + breakpoint line-height adjustment */}
</h1>
```

### Viewport Height (vh) for Typography

```css
/* Large display text based on viewport height */
.hero-title-vh {
  font-size: clamp(2rem, 8vh, 10rem);
  /* MIN: 32px, PREFERRED: 8% of viewport height, MAX: 160px */
}
```

**Usage:**
```tsx
// Full-screen hero with vh-based text
<section className="min-h-screen flex items-center justify-center">
  <h1 className="text-[8vh] min-text-4xl max-text-8xl">
    {/* Scales with viewport height */}
    Ash Shaw
  </h1>
</section>
```

**⚠️ vh Caution on Mobile:**
```tsx
// ❌ AVOID - Mobile browser address bar causes issues
<h1 className="text-[10vh]">
  {/* May be too large or too small depending on address bar visibility */}
</h1>

// ✅ CORRECT - Use vw for width-based scaling or clamp with vh
<h1 className="text-hero-h1">
  {/* clamp with vw is more reliable */}
</h1>

// Or use dvh (dynamic viewport height) if browser supports
<h1 className="text-[8dvh]">
  {/* Adjusts for mobile chrome dynamically */}
</h1>
```

### Mobile-Specific Adjustments

```tsx
// Reduce heading sizes on mobile for better fit
<h1 className="text-hero-h1 md:text-hero-h1">
  {/* Already fluid, but can add breakpoint overrides if needed */}
</h1>

// Smaller hero text on mobile
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-hero-h1">
  Custom Scaling
</h1>
```

---

## Line Height Rules

### Mobile Line Heights

```css
/* Body Text - More generous on mobile */
.text-body-mobile {
  line-height: 1.7; /* vs 1.6 on desktop */
}

/* Headings - Tighter on mobile */
h1, h2, h3 {
  line-height: 1.2; /* vs 1.3 on desktop */
}

/* Long-form Content */
.prose {
  line-height: 1.8; /* Easier reading on small screens */
}
```

### Implementation

```tsx
// Blog content with optimal mobile line height
<article className="prose prose-lg">
  <p className="leading-relaxed md:leading-normal">
    {/* line-height: 1.625 on mobile, 1.5 on desktop */}
  </p>
</article>

// Tight heading line height
<h2 className="leading-tight">
  {/* line-height: 1.25 */}
  Festival Makeup 2024
</h2>

// Generous body text
<p className="leading-loose md:leading-relaxed">
  {/* line-height: 2 on mobile, 1.625 on desktop */}
  Long-form reading content...
</p>
```

---

## Heading Adjustments

### Mobile-Optimized Heading Hierarchy

```tsx
// H1 - Hero Title
<h1 className="
  text-4xl              /* 36px on mobile */
  sm:text-5xl           /* 48px on small tablets */
  md:text-6xl           /* 60px on tablets */
  lg:text-hero-h1       /* Fluid 72px-120px on desktop */
  font-title 
  font-bold 
  text-gradient-pink-purple-blue
  leading-tight         /* 1.25 line height */
  tracking-tight        /* Tighter letter spacing */
">
  Ash Shaw
</h1>

// H2 - Section Title
<h2 className="
  text-2xl              /* 24px on mobile */
  sm:text-3xl           /* 30px on small tablets */
  md:text-section-h2    /* Fluid 32px-48px */
  font-heading 
  font-semibold 
  leading-tight
">
  Portfolio
</h2>

// H3 - Card Title
<h3 className="
  text-xl               /* 20px on mobile */
  md:text-2xl           /* 24px on desktop */
  font-heading 
  font-semibold
">
  Festival Makeup
</h3>

// H4 - Subsection
<h4 className="
  text-lg               /* 18px on mobile */
  md:text-xl            /* 20px on desktop */
  font-heading 
  font-medium
">
  About This Look
</h4>
```

### Mobile Heading Patterns

```tsx
// Page Title Pattern
<div className="text-center px-6 py-8">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-title font-bold text-gradient-pink-purple-blue mb-4">
    Page Title
  </h1>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
    Subtitle or tagline
  </p>
</div>

// Card Title Pattern
<h3 className="text-lg sm:text-xl font-heading font-semibold line-clamp-2">
  Card Title That Might Be Long
</h3>
```

---

## Touch-Friendly Link Spacing

### Minimum Touch Target: 44x44px

```tsx
// ❌ WRONG - Links too close together
<nav className="flex gap-2">
  <a href="#" className="text-sm">Home</a>
  <a href="#" className="text-sm">About</a>
</nav>

// ✅ CORRECT - Adequate spacing
<nav className="flex gap-4">
  <a 
    href="#" 
    className="text-base py-3 px-4 min-h-[44px] flex items-center"
  >
    Home
  </a>
  <a 
    href="#" 
    className="text-base py-3 px-4 min-h-[44px] flex items-center"
  >
    About
  </a>
</nav>
```

### Mobile Link Patterns

```tsx
// Inline Links in Text
<p className="text-base leading-relaxed">
  View my{' '}
  <a 
    href="/portfolio"
    className="text-pink-600 underline underline-offset-4 py-1"
  >
    portfolio
  </a>
  {' '}for more examples.
</p>

// List Links
<ul className="space-y-2">
  <li>
    <a 
      href="/festival"
      className="block py-3 px-4 text-base hover:bg-gray-50 rounded-lg"
    >
      Festival Makeup
    </a>
  </li>
  <li>
    <a 
      href="/editorial"
      className="block py-3 px-4 text-base hover:bg-gray-50 rounded-lg"
    >
      Editorial Shoots
    </a>
  </li>
</ul>
```

---

## Reading Line Length

### Optimal Characters Per Line

```tsx
// ❌ WRONG - Too wide on mobile
<p className="max-w-6xl">
  Long paragraph text...
</p>

// ✅ CORRECT - Optimal reading width
<p className="max-w-prose">
  {/* 65-75 characters per line */}
  Long paragraph text...
</p>

// Blog Content
<article className="prose prose-lg max-w-none px-6 md:max-w-prose md:mx-auto">
  <p>Content with optimal line length...</p>
</article>
```

### Mobile Content Width

```tsx
// Full width on mobile, constrained on desktop
<div className="
  px-4                    /* Mobile padding */
  sm:px-6                 /* Tablet padding */
  md:max-w-2xl           /* Desktop max width */
  md:mx-auto             /* Center on desktop */
">
  <p className="text-base leading-relaxed">
    Content text...
  </p>
</div>
```

---

## Mobile Typography Patterns

### Blog Post Mobile

```tsx
function BlogPost({ post }: Props) {
  return (
    <article className="px-4 sm:px-6 py-8">
      {/* Title */}
      <h1 className="
        text-2xl sm:text-3xl md:text-4xl 
        font-heading font-bold 
        leading-tight 
        mb-4
      ">
        {post.title}
      </h1>
      
      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readingTime} min read</span>
      </div>
      
      {/* Content */}
      <div className="
        prose prose-base 
        sm:prose-lg 
        max-w-none 
        leading-relaxed
      ">
        {post.content}
      </div>
    </article>
  );
}
```

### Portfolio Entry Mobile

```tsx
function PortfolioEntry({ entry }: Props) {
  return (
    <section className="px-4 sm:px-6 py-8">
      {/* Category Tag */}
      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
        {entry.category}
      </span>
      
      {/* Title */}
      <h1 className="
        text-3xl sm:text-4xl 
        font-heading font-bold 
        leading-tight 
        mb-4
      ">
        {entry.title}
      </h1>
      
      {/* Description */}
      <p className="
        text-base sm:text-lg 
        text-gray-700 
        leading-relaxed 
        mb-8
      ">
        {entry.description}
      </p>
    </section>
  );
}
```

### Hero Section Mobile

```tsx
function HeroSection() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
      <div className="text-center">
        {/* Subtitle */}
        <p className="
          text-sm sm:text-base 
          font-body font-medium 
          text-gray-600 
          tracking-wide 
          uppercase 
          mb-3
        ">
          Makeup Artist
        </p>
        
        {/* Main Title */}
        <h1 className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
          font-title font-bold 
          text-gradient-pink-purple-blue 
          leading-tight 
          tracking-tight 
          mb-4
        ">
          Ash Shaw
        </h1>
        
        {/* Tagline */}
        <p className="
          text-base sm:text-lg md:text-xl 
          text-gray-700 
          leading-relaxed 
          max-w-2xl mx-auto
        ">
          Makeup that shines with colour, energy, and connection.
        </p>
      </div>
    </section>
  );
}
```

---

## Form Input Typography

### Preventing iOS Zoom

```tsx
// ❌ WRONG - iOS will zoom on focus
<input 
  type="text"
  className="text-sm px-3 py-2"
  placeholder="Email"
/>

// ✅ CORRECT - 16px minimum prevents zoom
<input 
  type="text"
  className="text-base px-4 py-3"
  placeholder="Email"
/>

// All form inputs
<input 
  type="email"
  className="
    w-full 
    text-base               /* 16px minimum */
    px-4 py-3 
    rounded-lg 
    border border-gray-300
    font-body
  "
  placeholder="your@email.com"
/>

<textarea 
  className="
    w-full 
    text-base               /* 16px minimum */
    px-4 py-3 
    rounded-lg
  "
  rows={5}
/>

<select 
  className="
    w-full 
    text-base               /* 16px minimum */
    px-4 py-3 
    rounded-lg
  "
>
  <option>Select service</option>
</select>
```

---

## Accessibility Requirements

### Screen Reader Optimizations

```tsx
// Descriptive text for screen readers
<span className="sr-only">
  Navigate to home page
</span>

// Skip to content link (mobile first)
<a 
  href="#main-content"
  className="
    sr-only 
    focus:not-sr-only 
    focus:fixed 
    focus:top-4 
    focus:left-4 
    focus:z-50
    focus:px-6 
    focus:py-3
    focus:bg-pink-600 
    focus:text-white
    focus:text-base
    focus:rounded-lg
  "
>
  Skip to main content
</a>
```

### Color Contrast

```tsx
// ❌ WRONG - Low contrast on mobile screens
<p className="text-gray-400">
  Hard to read in sunlight
</p>

// ✅ CORRECT - High contrast
<p className="text-gray-700">
  {/* WCAG AA: 4.5:1 minimum */}
  Easy to read
</p>

// Headings need higher contrast
<h2 className="text-gray-900">
  {/* WCAG AAA: 7:1 for headings */}
  High contrast heading
</h2>
```

---

## Common Mistakes

### ❌ Mistake 1: Text Too Small

```tsx
// ❌ WRONG
<p className="text-xs">Important mobile content</p>
```

**Solution:**
```tsx
// ✅ CORRECT
<p className="text-base md:text-sm">
  {/* 16px on mobile, can be smaller on desktop */}
</p>
```

### ❌ Mistake 2: No Line Height Adjustment

```tsx
// ❌ WRONG - Default line height too tight
<p className="text-base">
  Long paragraph with default leading...
</p>
```

**Solution:**
```tsx
// ✅ CORRECT - Relaxed line height
<p className="text-base leading-relaxed">
  {/* line-height: 1.625 */}
  Long paragraph with comfortable reading...
</p>
```

### ❌ Mistake 3: Headings Too Large

```tsx
// ❌ WRONG - Overwhelming on mobile
<h1 className="text-8xl">Title</h1>
```

**Solution:**
```tsx
// ✅ CORRECT - Responsive scaling
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Title
</h1>
```

---

## Testing Checklist

### Mobile Typography Testing

- [ ] All body text is minimum 16px on mobile
- [ ] Form inputs are minimum 16px (iOS zoom test)
- [ ] Line heights are comfortable (1.6+ for body)
- [ ] Headings scale appropriately across breakpoints
- [ ] Links have adequate touch targets (44x44px)
- [ ] Text remains readable in direct sunlight (contrast test)
- [ ] Reading line length is optimal (65-75 characters)
- [ ] Long words don't break layout (hyphenation/overflow)

### Device Testing

Test on:
- iPhone SE (smallest modern iPhone)
- iPhone 14 Pro (standard size)
- Samsung Galaxy S23 (Android)
- iPad Mini (small tablet)

---

## Related Documentation

- **[design-tokens/typography.md](../design-tokens/typography.md)** - Full typography system
- **[mobile/forms.md](./forms.md)** - Mobile form patterns
- **[Guidelines.md](../Guidelines.md)** - Main guidelines

---

**Last Updated:** January 2025  
**Version:** 3.2.0