# Component Dark Mode Reference

**Version:** 1.0.0  
**Last Updated:** January 2025

Component-by-component dark mode styling reference for the Ash Shaw Makeup Portfolio.

## 📋 Table of Contents

1. [Page Components](#page-components)
2. [Section Components](#section-components)
3. [UI Components](#ui-components)
4. [Common Components](#common-components)
5. [Quick Reference Table](#quick-reference-table)

---

## Page Components

### HomePage

**Location:** `/components/pages/home/HomePage.tsx`

**Light Mode:**
- Background: `bg-white`
- Clean, professional aesthetic
- Subtle gray borders and text

**Dark Mode:**
- Background: `dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950`
- Rich purple gradient
- High contrast lavender text

**Implementation:**
```tsx
<main className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950 transition-colors duration-300">
  {/* Loading State */}
  <div className="bg-gray-200 dark:bg-purple-800/50 animate-pulse"></div>
  
  {/* Error State */}
  <div className="bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200"></div>
</main>
```

---

### AboutPage

**Location:** `/components/pages/about/AboutPage.tsx`

**Light Mode:**
- Background: `bg-white`
- Gray text hierarchy
- Clean card surfaces

**Dark Mode:**
- Background: `dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950`
- Purple text variants
- Glowing decorative elements

**Implementation:**
```tsx
<div className="bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950 min-h-screen transition-colors duration-300">
  {/* Section Card */}
  <div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm">
    <h2 className="text-gray-800 dark:text-purple-100">Section Title</h2>
    <p className="text-gray-700 dark:text-purple-100">Body text</p>
  </div>
</div>
```

---

### PortfolioPage

**Location:** `/components/pages/portfolio/PortfolioPage.tsx`

**Light Mode:**
- Background: `bg-white`
- Grid with subtle shadows
- Clear category buttons

**Dark Mode:**
- Background: `dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950`
- Purple-tinted overlays
- Glowing hover effects

**Implementation:**
```tsx
<main className="bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950 min-h-screen transition-colors duration-300">
  {/* Gallery Item */}
  <div className="bg-white/80 dark:bg-purple-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-purple-700/50">
    <img src="..." alt="..." className="rounded-lg" />
    <div className="p-4">
      <h3 className="text-gray-800 dark:text-purple-100">Title</h3>
      <p className="text-gray-600 dark:text-purple-300">Description</p>
    </div>
  </div>
</main>
```

---

### BlogPage

**Location:** `/components/pages/blog/BlogPage.tsx`

**Light Mode:**
- Background: `bg-white`
- Card-based article layout
- Clear search and filter UI

**Dark Mode:**
- Background: `dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950`
- Translucent purple cards
- Enhanced readability

**Implementation:**
```tsx
<main className="bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:via-purple-900/50 dark:to-purple-950 min-h-screen transition-colors duration-300">
  {/* Article Card */}
  <article className="bg-white/80 dark:bg-purple-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-purple-700/50">
    <h2 className="text-gray-800 dark:text-purple-100">Article Title</h2>
    <p className="text-gray-700 dark:text-purple-100">Excerpt</p>
    <div className="text-gray-500 dark:text-purple-400">Metadata</div>
  </article>
</main>
```

---

## Section Components

### HeroLayout

**Location:** `/components/sections/HeroLayout.tsx`

**Light Mode:**
- Transparent overlay on images
- White/light text on images
- Clean gradient text effects

**Dark Mode:**
- Maintains same visual style
- Gradient text works in both themes
- Enhanced image contrast

**Implementation:**
```tsx
<section className="relative">
  {/* Hero Content Container */}
  <div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-2xl p-fluid-2xl border border-white/50 dark:border-purple-700/50">
    <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue">
      Hero Title
    </h1>
    <p className="text-body-guideline font-body text-gray-700 dark:text-purple-100">
      Description text
    </p>
  </div>
</section>
```

---

### FeaturedSection

**Location:** `/components/sections/FeaturedSection.tsx`

**Light Mode:**
- White card backgrounds
- Gray text and borders
- Subtle shadows

**Dark Mode:**
- Purple translucent cards
- Lavender text
- Enhanced shadows with purple tint

**Implementation:**
```tsx
<section className="py-section">
  <div className="container mx-auto px-4">
    <h2 className="text-section-h2 font-heading font-bold text-gray-800 dark:text-purple-100 text-center mb-fluid-xl">
      Featured Work
    </h2>
    
    {/* Featured Card */}
    <div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-gray-800 dark:text-purple-100">Work Title</h3>
      <p className="text-gray-700 dark:text-purple-100">Description</p>
    </div>
  </div>
</section>
```

---

### WhySection

**Location:** `/components/sections/WhySection.tsx`

**Light Mode:**
- White icon card backgrounds
- Gray icons and text
- Clean, minimal aesthetic

**Dark Mode:**
- Purple translucent cards
- Colorful icons stand out
- Enhanced visual hierarchy

**Implementation:**
```tsx
<section className="py-section">
  {/* Reason Card */}
  <div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-lg border border-white/50 dark:border-purple-700/50">
    <div className="flex items-center justify-center mb-fluid-md">
      {/* Icon maintains color in both themes */}
      <Sparkles className="w-12 h-12 text-pink-500" />
    </div>
    <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 dark:text-purple-100 text-center mb-fluid-sm">
      Reason Title
    </h3>
    <p className="text-body-guideline font-body text-gray-700 dark:text-purple-100 text-center">
      Description
    </p>
  </div>
</section>
```

---

### BlogPreviewSection

**Location:** `/components/sections/BlogPreviewSection.tsx`

**Light Mode:**
- White article cards
- Gray text hierarchy
- Subtle hover effects

**Dark Mode:**
- Purple article cards
- Lavender text
- Enhanced hover glow

**Implementation:**
```tsx
<section className="py-section">
  {/* Article Preview Card */}
  <article className="bg-white/80 dark:bg-purple-900/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-purple-800 rounded-t-xl overflow-hidden">
      <img src="..." alt="..." className="object-cover" />
    </div>
    <div className="p-fluid-md">
      <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 dark:text-purple-100 mb-fluid-sm">
        Article Title
      </h3>
      <p className="text-body-guideline font-body text-gray-700 dark:text-purple-100">
        Excerpt
      </p>
      <div className="text-fluid-sm text-gray-500 dark:text-purple-400">
        Date · Category
      </div>
    </div>
  </article>
</section>
```

---

### FusionNailsSection

**Location:** `/components/sections/FusionNailsSection.tsx`

**Light Mode:**
- White container background
- Clear image grid
- Gray text and borders

**Dark Mode:**
- Purple container background
- Enhanced image visibility
- Lavender text

**Implementation:**
```tsx
<section className="py-section bg-gray-50 dark:bg-purple-950/50">
  <div className="container mx-auto px-4">
    <h2 className="text-section-h2 font-heading font-bold text-gray-800 dark:text-purple-100 text-center mb-fluid-xl">
      Fusion Nails
    </h2>
    
    {/* Nail Art Card */}
    <div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 dark:border-purple-700/50">
      <img src="..." alt="..." className="w-full" />
    </div>
  </div>
</section>
```

---

## UI Components

### ScrollToTop

**Location:** `/components/ui/ScrollToTop.tsx`

**Light Mode:**
- White button background
- Gray icon
- Subtle shadow

**Dark Mode:**
- Purple button background
- Lavender icon
- Enhanced glow

**Implementation:**
```tsx
<button
  className="fixed bottom-8 right-8 z-50 bg-white/95 dark:bg-purple-900/95 backdrop-blur-sm p-4 rounded-full shadow-lg dark:shadow-purple-500/30 border border-gray-200 dark:border-purple-700 hover:shadow-xl dark:hover:shadow-purple-500/50 transition-all duration-300"
  aria-label="Scroll to top"
>
  <ArrowUp className="w-6 h-6 text-gray-800 dark:text-purple-100" />
</button>
```

---

### ScrollDownArrow

**Location:** `/components/ui/ScrollDownArrow.tsx`

**Light Mode:**
- White/transparent background
- Gray icon
- Subtle animation

**Dark Mode:**
- Purple glow
- Lavender icon
- Enhanced animation

**Implementation:**
```tsx
<button
  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-down-arrow z-20 bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm p-3 rounded-full shadow-lg dark:shadow-purple-500/30 border border-white/50 dark:border-purple-700/50 hover:shadow-xl transition-all duration-300"
  aria-label="Scroll down to next section"
>
  <ChevronDown className="w-6 h-6 text-gray-800 dark:text-purple-100" />
</button>
```

---

### ThemeToggle

**Location:** `/components/ui/ThemeToggle.tsx`

**Light Mode:**
- White button background
- Shows Moon icon
- Gray border

**Dark Mode:**
- Purple button background
- Shows Sun icon
- Purple border with glow

**Implementation:**
```tsx
<button
  onClick={toggleTheme}
  className="bg-white/95 dark:bg-purple-900/95 backdrop-blur-sm p-3 rounded-lg border border-gray-200 dark:border-purple-700 shadow-md dark:shadow-purple-500/30 hover:shadow-lg dark:hover:shadow-purple-500/50 transition-all duration-300"
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
>
  {theme === 'light' ? (
    <Moon className="w-5 h-5 text-gray-800" />
  ) : (
    <Sun className="w-5 h-5 text-purple-100" />
  )}
</button>
```

---

### SectionCard

**Location:** `/components/ui/SectionCard.tsx`

**Light Mode:**
- White background with opacity
- Gray borders
- Subtle shadows

**Dark Mode:**
- Purple background with opacity
- Purple borders
- Enhanced shadows

**Implementation:**
```tsx
<div className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border-2 border-gray-200 dark:border-purple-700/50 shadow-lg transition-colors duration-300">
  <h2 className="text-section-h2 font-heading font-bold text-gray-800 dark:text-purple-100 mb-fluid-md">
    Section Title
  </h2>
  <p className="text-body-guideline font-body text-gray-700 dark:text-purple-100 leading-relaxed">
    Content
  </p>
</div>
```

---

### ContactForm

**Location:** `/components/common/ContactForm.tsx`

**Light Mode:**
- White input backgrounds
- Gray borders
- Clear labels

**Dark Mode:**
- Purple translucent inputs
- Purple borders
- Lavender labels

**Implementation:**
```tsx
<form className="space-y-fluid-md">
  <div>
    <label className="block text-gray-700 dark:text-purple-100 font-body font-medium mb-2">
      Name
    </label>
    <input
      type="text"
      className="w-full px-4 py-3 bg-white dark:bg-purple-900/30 border border-gray-300 dark:border-purple-700 rounded-lg text-gray-800 dark:text-purple-100 placeholder-gray-500 dark:placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-300"
      placeholder="Your name"
    />
  </div>
  
  <button
    type="submit"
    className="w-full bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button rounded-lg font-body font-medium transition-all duration-300"
  >
    Submit
  </button>
</form>
```

---

## Common Components

### Header

**Location:** `/components/common/Header.tsx`

**Light Mode:**
- White/95 background with blur
- Gray text
- Gray borders

**Dark Mode:**
- Purple-950/95 background with blur
- Lavender text
- Purple borders

**Implementation:**
```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-purple-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-purple-800 transition-colors duration-300">
  <nav className="container mx-auto px-4 h-24 flex items-center justify-between">
    <Logo />
    
    <ul className="hidden md:flex items-center gap-8">
      <li>
        <a className="text-gray-700 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-300 font-body font-medium transition-colors">
          Link
        </a>
      </li>
    </ul>
    
    <ThemeToggle />
  </nav>
</header>
```

---

### Footer

**Location:** `/components/common/Footer.tsx`

**Light Mode:**
- Gray-50 background
- Gray text
- Clear dividers

**Dark Mode:**
- Purple-950 background
- Lavender text
- Purple dividers

**Implementation:**
```tsx
<footer className="bg-gray-50 dark:bg-purple-950/80 border-t border-gray-200 dark:border-purple-800 py-fluid-3xl transition-colors duration-300">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-fluid-xl">
      {/* Footer Column */}
      <div>
        <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 dark:text-purple-100 mb-fluid-md">
          Column Title
        </h3>
        <p className="text-gray-600 dark:text-purple-300 font-body">
          Content
        </p>
      </div>
    </div>
    
    <div className="border-t border-gray-200 dark:border-purple-800 mt-fluid-xl pt-fluid-lg">
      <p className="text-center text-gray-500 dark:text-purple-400 text-fluid-sm">
        © 2025 Ash Shaw Makeup
      </p>
    </div>
  </div>
</footer>
```

---

### Logo

**Location:** `/components/common/Logo.tsx`

**Light Mode:**
- Standard SVG colors
- Normal brightness
- Clean appearance

**Dark Mode:**
- Enhanced brightness (+30%)
- Increased saturation (+40%)
- Double purple glow effect
- Enhanced contrast

**Implementation:**
```tsx
<a href="/" className="flex items-center gap-3 group">
  <div className="relative">
    {/* SVG with dark mode enhancements */}
    <img
      src={logoSvg}
      alt="Ash Shaw Makeup Logo"
      className="h-12 w-auto transition-all duration-300 
        dark:brightness-130 dark:saturate-140 dark:contrast-110
        dark:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]
        dark:drop-shadow-[0_0_16px_rgba(168,85,247,0.2)]
        group-hover:scale-105"
    />
  </div>
  <span className="text-xl font-title font-bold text-gray-800 dark:text-purple-100">
    Ash Shaw
  </span>
</a>
```

---

## Quick Reference Table

| Component | Light Background | Dark Background | Light Text | Dark Text |
|-----------|-----------------|-----------------|------------|-----------|
| **Pages** | `bg-white` | `dark:bg-gradient-to-br dark:from-purple-950...` | `text-gray-800` | `dark:text-purple-100` |
| **Cards** | `bg-white/80` | `dark:bg-purple-900/50` | `text-gray-700` | `dark:text-purple-100` |
| **Header** | `bg-white/95` | `dark:bg-purple-950/95` | `text-gray-700` | `dark:text-purple-200` |
| **Footer** | `bg-gray-50` | `dark:bg-purple-950/80` | `text-gray-600` | `dark:text-purple-300` |
| **Buttons (Primary)** | `bg-gradient-pink-purple-blue` | `bg-gradient-pink-purple-blue` | `text-white` | `text-white` |
| **Buttons (Secondary)** | `bg-gray-200` | `dark:bg-purple-700` | `text-gray-800` | `dark:text-white` |
| **Inputs** | `bg-white` | `dark:bg-purple-900/30` | `text-gray-800` | `dark:text-purple-100` |
| **Borders** | `border-gray-200` | `dark:border-purple-700` | - | - |
| **Loading** | `bg-gray-200` | `dark:bg-purple-800/50` | - | - |
| **Success** | `bg-green-100` | `dark:bg-green-900/30` | `text-green-900` | `dark:text-green-200` |
| **Error** | `bg-red-100` | `dark:bg-red-900/30` | `text-red-900` | `dark:text-red-200` |

---

## Related Documentation

- **[colors.md](./design-tokens/colors.md)** - Complete color palette
- **[dark-mode-implementation.md](./dark-mode-implementation.md)** - Implementation guide
- **[Guidelines.md](./Guidelines.md)** - Main guidelines

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained by:** Ash Shaw Portfolio Team
