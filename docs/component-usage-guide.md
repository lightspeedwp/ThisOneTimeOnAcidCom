---
title: "Component Usage Guide"
filename: "/docs/component-usage-guide.md"
created: "2026-03-12"
modified: "2026-03-12"
version: "1.0.0"
related_docs:
  - "/guidelines/overview-components.md"
  - "/docs/component-composition-guide.md"
  - "/docs/custom-hooks-guide.md"
---

# Component Usage Guide

**Created:** March 12, 2026  
**Last Updated:** March 12, 2026  
**Status:** Active

---

## Overview

This guide provides practical examples and best practices for using Nova News components. It covers common patterns, prop configurations, and integration examples for all major component categories.

**Target Audience:** Developers working with the Nova News codebase who need quick reference for component usage.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Common Components](#common-components)
3. [UI Components](#ui-components)
4. [Page Components](#page-components)
5. [Section Components](#section-components)
6. [Form Components](#form-components)
7. [Animation Components](#animation-components)
8. [Best Practices](#best-practices)

---

## Layout Components

### HeroLayout

**Purpose:** Reusable hero section with auto-stagger animations and flexible content slots.

**Props:**

```typescript
interface HeroLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaButtons?: React.ReactNode;
  media?: React.ReactNode;
  autoStagger?: boolean;
  darkMode?: boolean;
  className?: string;
}
```

**Basic Usage:**

```tsx
import { HeroLayout } from '@/components/sections/HeroLayout';

<HeroLayout
  title="Welcome to Nova News"
  subtitle="A retro 80s neon CLI aesthetic"
  description="Dive into the story behind the dancefloor"
  autoStagger={true}
  darkMode={true}
/>
```

**With CTA Buttons:**

```tsx
<HeroLayout
  title="Read the draft"
  subtitle="This one time at band camp"
  ctaButtons={
    <>
      <a href="/ebook" className="btn btn--primary animate-neon-pulse">
        Start reading
      </a>
      <a href="/about" className="btn btn--outline">
        About the author
      </a>
    </>
  }
  autoStagger={true}
/>
```

**With Floating Media:**

```tsx
<HeroLayout
  title="Portfolio"
  subtitle="Neon makeup artistry"
  media={
    <img 
      src="/hero-image.jpg" 
      alt="Portfolio hero"
      className="hero__media animate-float"
    />
  }
  autoStagger={true}
/>
```

**Key Features:**
- ✅ Auto-stagger animations (100ms delays)
- ✅ Terminal boot sequence
- ✅ Neon pulse CTAs
- ✅ Holographic title shimmer (optional)
- ✅ Floating media animation
- ✅ Fully accessible (reduced motion support)

---

### VideoArchiveLayout

**Purpose:** Shared layout for video archive pages (VideosPage, VideoCategoryPage, VideoTagPage).

**Props:**

```typescript
interface VideoArchiveLayoutProps {
  title: string;
  description?: string;
  videos: Video[];
  categories: string[];
  tags: string[];
  showFilters?: boolean;
}
```

**Usage:**

```tsx
import { VideoArchiveLayout } from '@/components/layout/VideoArchiveLayout';
import { videoData } from '@/data/mock/videos/video-data';

<VideoArchiveLayout
  title="All videos"
  description="Watch makeup tutorials and behind-the-scenes content"
  videos={videoData.videos}
  categories={videoData.categories}
  tags={videoData.tags}
  showFilters={true}
/>
```

**Features:**
- ✅ Archive filters (category/tag/search)
- ✅ Sort controls (date/views/title)
- ✅ Responsive grid (1-4 columns)
- ✅ VideoCard integration
- ✅ Empty state handling

---

## Common Components

### Header

**Purpose:** Global site navigation with mobile menu, mega menus, and theme switcher.

**Usage:**

```tsx
import { Header } from '@/components/common/Header';

<Header />
```

**No props required** - Header uses internal state and context.

**Features:**
- ✅ Desktop navigation with hover mega menus
- ✅ Mobile hamburger menu (slide-in drawer)
- ✅ Theme switcher toggle
- ✅ Active link highlighting
- ✅ Scroll-aware sticky positioning
- ✅ Keyboard accessible

**Customization:**

To modify navigation links, edit `/data/mock/ui/navigation.ts`:

```typescript
export const navigationData = {
  mainNav: [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio', hasMegaMenu: true },
    { label: 'Blog', href: '/blog', hasMegaMenu: true },
    { label: 'Videos', href: '/videos' },
    { label: 'Podcasts', href: '/podcasts' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};
```

---

### Footer

**Purpose:** Site footer with navigation, social links, and copyright.

**Usage:**

```tsx
import { Footer } from '@/components/common/Footer';

<Footer />
```

**Features:**
- ✅ Multi-column link layout
- ✅ Social media icons (Instagram, Twitter, etc.)
- ✅ Newsletter signup link
- ✅ Copyright with dynamic year
- ✅ BEM CSS (no inline styles)

---

### MobileMenu

**Purpose:** Slide-in drawer navigation for mobile devices.

**Props:**

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Usage:**

```tsx
import { MobileMenu } from '@/components/common/MobileMenu';

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

<MobileMenu 
  isOpen={mobileMenuOpen} 
  onClose={() => setMobileMenuOpen(false)} 
/>
```

**Features:**
- ✅ Slide-in from right animation
- ✅ Backdrop overlay
- ✅ Close on backdrop click
- ✅ Close on Escape key
- ✅ Theme switcher integrated
- ✅ Focus trap for accessibility

---

### ThemeSwitcher

**Purpose:** Toggle between light and dark themes.

**Usage:**

```tsx
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';

<ThemeSwitcher />
```

**No props required** - Uses localStorage to persist theme preference.

**How It Works:**

1. Reads saved theme from `localStorage.getItem('theme')`
2. Applies `data-theme` attribute to `<html>` element
3. CSS responds to `[data-theme="dark"]` and `[data-theme="light"]`
4. Updates icon (☀️ for dark mode, 🌙 for light mode)

**Customization:**

To change default theme, edit `ThemeSwitcher.tsx`:

```tsx
const [theme, setTheme] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'dark'; // Change default here
  }
  return 'dark';
});
```

---

## UI Components

### Breadcrumbs

**Purpose:** Hierarchical navigation trail.

**Props:**

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string; // Omit for current page
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
```

**Usage:**

```tsx
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Festival Makeup' }, // No href = current page
]} />
```

**Features:**
- ✅ Semantic `<nav>` with `aria-label="Breadcrumb"`
- ✅ Schema.org BreadcrumbList JSON-LD
- ✅ Current page marked with `aria-current="page"`
- ✅ Chevron separators (›)
- ✅ BEM CSS styling

**Best Practices:**

- Always include Home as first item
- Last item should NOT have `href` (represents current page)
- Use on all sub-pages (not on homepage)

---

### Button

**Purpose:** Reusable button component with variant styles.

**Props:**

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}
```

**Usage:**

```tsx
import { Button } from '@/components/ui/Button';

// Primary CTA
<Button variant="primary" size="lg">
  Get started
</Button>

// Outline button
<Button variant="outline">
  Learn more
</Button>

// Link button
<Button href="/contact" variant="secondary">
  Contact us
</Button>

// Disabled button
<Button disabled>
  Coming soon
</Button>
```

**Variants:**

- `primary` - Cyberpunk gradient background, white text, neon pulse animation
- `secondary` - Neon pink background, atomic black text
- `outline` - Transparent background, neon pink border
- `ghost` - Transparent background, no border, hover effect

**Sizes:**

- `sm` - 32px height, 16px padding
- `md` - 40px height (default), 24px padding
- `lg` - 48px height, 32px padding

---

### PortfolioCard

**Purpose:** Display portfolio entry in grid/list layouts.

**Props:**

```typescript
interface PortfolioCardProps {
  title: string;
  image: string;
  category: string;
  location?: string;
  featured?: boolean;
  url: string;
}
```

**Usage:**

```tsx
import { PortfolioCard } from '@/components/ui/PortfolioCard';

<PortfolioCard
  title="Origin Festival 2025"
  image="/images/portfolio/origin-2025.jpg"
  category="Festival Makeup"
  location="Cape Town, South Africa"
  featured={true}
  url="/portfolio/origin-festival-2025"
/>
```

**Features:**
- ✅ Hover scale animation
- ✅ Neon glow on featured entries
- ✅ Category badge
- ✅ Location icon
- ✅ Lazy-loaded images
- ✅ Accessible alt text

**Grid Layout:**

```tsx
<div className="portfolio-grid portfolio-grid--3-col">
  {portfolioData.entries.map((entry) => (
    <PortfolioCard key={entry.id} {...entry} />
  ))}
</div>
```

---

### VideoCard

**Purpose:** Display video entry with thumbnail and metadata.

**Props:**

```typescript
interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  category: string;
  url: string;
}
```

**Usage:**

```tsx
import { VideoCard } from '@/components/ui/VideoCard';

<VideoCard
  title="UV makeup tutorial"
  thumbnail="/images/videos/uv-tutorial.jpg"
  duration="5:32"
  views={12500}
  category="Tutorial"
  url="/videos/uv-makeup-tutorial"
/>
```

**Features:**
- ✅ Play button overlay
- ✅ Duration badge
- ✅ View count
- ✅ Category badge
- ✅ Hover effect (lift + glow)

---

### BlogCard

**Purpose:** Display blog post in archive grids.

**Props:**

```typescript
interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url: string;
}
```

**Usage:**

```tsx
import { BlogCard } from '@/components/ui/BlogCard';

<BlogCard
  title="The dancefloor gave me everything"
  excerpt="A journey through Berlin's techno scene..."
  image="/images/blog/dancefloor.jpg"
  date="2026-02-15"
  readTime="5 min read"
  category="Personal"
  tags={['Berlin', 'Techno', 'Community']}
  url="/blog/the-dancefloor-gave-me-everything"
/>
```

**Features:**
- ✅ Excerpt truncation (3 lines max)
- ✅ Category badge
- ✅ Tag pills
- ✅ Read time indicator
- ✅ Formatted date

---

### ArchiveFilters

**Purpose:** Filter controls for archive pages (blog, videos, portfolio).

**Props:**

```typescript
interface ArchiveFiltersProps {
  categories: string[];
  tags?: string[];
  activeCategory: string;
  activeTags: string[];
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onSearchChange?: (query: string) => void;
  sortOptions?: { label: string; value: string }[];
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}
```

**Usage:**

```tsx
import { ArchiveFilters } from '@/components/ui/ArchiveFilters';
import { useState } from 'react';

const [activeCategory, setActiveCategory] = useState('all');
const [activeTags, setActiveTags] = useState<string[]>([]);
const [sortBy, setSortBy] = useState('date');

<ArchiveFilters
  categories={['All', 'Festival', 'Editorial', 'UV']}
  tags={['Berlin', 'Cape Town', 'Koh Phangan']}
  activeCategory={activeCategory}
  activeTags={activeTags}
  onCategoryChange={setActiveCategory}
  onTagToggle={(tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  }}
  sortOptions={[
    { label: 'Newest first', value: 'date' },
    { label: 'Most viewed', value: 'views' },
    { label: 'Title A-Z', value: 'title' },
  ]}
  sortBy={sortBy}
  onSortChange={setSortBy}
/>
```

**Features:**
- ✅ Category buttons (exclusive selection)
- ✅ Tag pills (multi-select)
- ✅ Search input (optional)
- ✅ Sort dropdown (optional)
- ✅ Active state styling
- ✅ Responsive layout (stacks on mobile)

---

### Lightbox

**Purpose:** Full-screen image viewer with gallery navigation.

**Props:**

```typescript
interface LightboxProps {
  images: Array<{ url: string; alt: string }>;
  currentIndex: number;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}
```

**Usage:**

```tsx
import { Lightbox } from '@/components/ui/Lightbox';
import { useState } from 'react';

const [lightboxOpen, setLightboxOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(0);

const images = [
  { url: '/image1.jpg', alt: 'Festival makeup 1' },
  { url: '/image2.jpg', alt: 'Festival makeup 2' },
  { url: '/image3.jpg', alt: 'Festival makeup 3' },
];

// Open lightbox on thumbnail click
<img 
  src={images[0].url} 
  onClick={() => {
    setCurrentImage(0);
    setLightboxOpen(true);
  }}
/>

{lightboxOpen && (
  <Lightbox
    images={images}
    currentIndex={currentImage}
    onClose={() => setLightboxOpen(false)}
    onNext={() => setCurrentImage(prev => (prev + 1) % images.length)}
    onPrev={() => setCurrentImage(prev => (prev - 1 + images.length) % images.length)}
  />
)}
```

**Features:**
- ✅ Fullscreen overlay
- ✅ Prev/Next navigation
- ✅ Close on Escape key
- ✅ Close on backdrop click
- ✅ Keyboard arrow key navigation
- ✅ Image counter (1 of 10)
- ✅ Zoom support

---

## Page Components

### HomePage

**Purpose:** Landing page with hero, featured content, and blog preview.

**Usage:**

```tsx
import { HomePage } from '@/components/pages/HomePage';

<HomePage />
```

**Features:**
- ✅ Terminal boot animation
- ✅ Auto-stagger hero elements
- ✅ Featured portfolio grid (3 entries)
- ✅ Featured blog posts (3 posts)
- ✅ Neon pulse CTAs
- ✅ Holographic title shimmer

**Customization:**

Edit `/data/mock/pages/home-page.ts`:

```typescript
export const homePageContent = {
  hero: {
    title: 'Welcome to Nova News',
    subtitle: 'A retro 80s neon CLI aesthetic',
    description: 'Dive into the story behind the dancefloor',
  },
  featuredPortfolio: {
    title: 'Featured portfolio',
    entries: [...], // Portfolio IDs
  },
  featuredBlog: {
    title: 'Latest insights',
    posts: [...], // Blog post IDs
  },
};
```

---

### PortfolioPage

**Purpose:** Portfolio archive with filters and grid.

**Usage:**

```tsx
import { PortfolioPage } from '@/components/pages/portfolio/PortfolioPage';

<PortfolioPage />
```

**Features:**
- ✅ Category filters (Festival, Editorial, UV, etc.)
- ✅ Tag filters (Location, event name)
- ✅ Sort controls (date, views, title)
- ✅ Responsive grid (1-4 columns)
- ✅ Lightbox integration
- ✅ Page header animations

---

### BlogPage

**Purpose:** Blog archive with search, filters, and pagination.

**Usage:**

```tsx
import { BlogPage } from '@/components/pages/blog/BlogPage';

<BlogPage />
```

**Features:**
- ✅ Full-text search
- ✅ Category filters
- ✅ Tag filters
- ✅ Sort controls
- ✅ Pagination (10 posts per page)
- ✅ Featured posts section
- ✅ Page header animations

---

## Section Components

### CTASection

**Purpose:** Call-to-action banner with gradient background.

**Props:**

```typescript
interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}
```

**Usage:**

```tsx
import { CTASection } from '@/components/sections/CTASection';

<CTASection
  title="Ready to dive in?"
  description="Join the waitlist for exclusive updates"
  primaryButton={{
    text: 'Join waitlist',
    href: '/waitlist',
  }}
  secondaryButton={{
    text: 'Learn more',
    href: '/about',
  }}
/>
```

**Features:**
- ✅ Cyberpunk gradient background
- ✅ Neon pulse buttons
- ✅ Centered layout
- ✅ Responsive text sizing

---

## Form Components

### ContactForm

**Purpose:** Typeform embed for contact inquiries.

**Usage:**

```tsx
import { ContactForm } from '@/components/ui/ContactForm';

<ContactForm />
```

**No props required** - Typeform URL configured internally.

**Features:**
- ✅ Responsive iframe embed
- ✅ Full-screen modal option
- ✅ Loading state
- ✅ BEM CSS styling

---

### NewsletterSignup

**Purpose:** Email capture form (currently mock).

**Props:**

```typescript
interface NewsletterSignupProps {
  inline?: boolean;
}
```

**Usage:**

```tsx
import { NewsletterSignup } from '@/components/ui/NewsletterSignup';

// Inline form (e.g., in footer)
<NewsletterSignup inline={true} />

// Full-width form (e.g., dedicated page)
<NewsletterSignup />
```

**Features:**
- ✅ Email validation
- ✅ Success/error states
- ✅ GDPR compliance notice
- ✅ BEM CSS styling

---

## Animation Components

### ScrollDownArrow

**Purpose:** Animated scroll indicator.

**Usage:**

```tsx
import { ScrollDownArrow } from '@/components/ui/ScrollDownArrow';

<ScrollDownArrow targetId="content" />
```

**Features:**
- ✅ Bounce animation
- ✅ Smooth scroll to target
- ✅ Auto-hide on scroll
- ✅ Neon glow effect

---

### ScrollToTop

**Purpose:** Floating button to scroll to page top.

**Usage:**

```tsx
import { ScrollToTop } from '@/components/ui/ScrollToTop';

<ScrollToTop />
```

**No props required** - Auto-shows after 300px scroll.

**Features:**
- ✅ Fade-in/out on scroll
- ✅ Fixed bottom-right position
- ✅ Smooth scroll to top
- ✅ Neon pink background

---

## Best Practices

### 1. Always Import from Barrel Exports

```tsx
// ✅ GOOD - Barrel export
import { Breadcrumbs, Button, PortfolioCard } from '@/components/ui';

// ❌ BAD - Direct file imports
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
```

### 2. Use Mock Data for Content

```tsx
// ✅ GOOD - Import from mock data
import { portfolioData } from '@/data/mock/portfolio/portfolio-data';

<PortfolioCard {...portfolioData.entries[0]} />

// ❌ BAD - Hardcoded data
<PortfolioCard
  title="Hardcoded title"
  image="/hardcoded.jpg"
/>
```

### 3. Set SEO Meta Tags on Pages

```tsx
// ✅ GOOD - Set SEO on page load
import { setSEO } from '@/utils/seo';
import { pageSEO } from '@/data/mock/seo';

useEffect(() => {
  setSEO(pageSEO.portfolio);
}, []);

// ❌ BAD - Forget SEO
// Page loads with default meta tags
```

### 4. Always Add Breadcrumbs to Sub-Pages

```tsx
// ✅ GOOD - Breadcrumbs on every sub-page
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Portfolio' },
]} />

// ❌ BAD - No breadcrumbs
// Users can't navigate back
```

### 5. Use BEM Classes, Not Tailwind

```tsx
// ✅ GOOD - BEM classes
<div className="portfolio-card portfolio-card--featured">
  <h3 className="portfolio-card__title">Title</h3>
</div>

// ❌ BAD - Tailwind utilities
<div className="bg-black p-4 rounded-lg">
  <h3 className="text-xl font-bold">Title</h3>
</div>
```

### 6. Wrap Interactive Components in SafetyWrapper

```tsx
// ✅ GOOD - Error boundary wrapper
import { SafetyWrapper } from '@/components/common/SafetyWrapper';

<SafetyWrapper fallback={<div>Failed to load form</div>}>
  <ContactForm />
</SafetyWrapper>

// ❌ BAD - No error handling
<ContactForm />
// If ContactForm crashes, entire page breaks
```

### 7. Test with Reduced Motion

```tsx
// ✅ GOOD - All animations respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  .animate-float {
    animation: none;
  }
}

// ❌ BAD - Forced animations
.animate-float {
  animation: float 4s ease-in-out infinite !important;
}
```

---

## Quick Reference

### Component Import Map

| Component | Import Path |
|---|---|
| Header | `@/components/common/Header` or `@/components/common` |
| Footer | `@/components/common/Footer` or `@/components/common` |
| ThemeSwitcher | `@/components/common/ThemeSwitcher` or `@/components/common` |
| Breadcrumbs | `@/components/ui/Breadcrumbs` or `@/components/ui` |
| Button | `@/components/ui/Button` or `@/components/ui` |
| PortfolioCard | `@/components/ui/PortfolioCard` or `@/components/ui` |
| VideoCard | `@/components/ui/VideoCard` or `@/components/ui` |
| BlogCard | `@/components/ui/BlogCard` or `@/components/ui` |
| HeroLayout | `@/components/sections/HeroLayout` |
| ArchiveFilters | `@/components/ui/ArchiveFilters` or `@/components/ui` |
| Lightbox | `@/components/ui/Lightbox` or `@/components/ui` |
| ScrollToTop | `@/components/ui/ScrollToTop` or `@/components/ui` |
| ScrollDownArrow | `@/components/ui/ScrollDownArrow` or `@/components/ui` |

### BEM Class Reference

| Component | Block Class | Modifiers |
|---|---|---|
| Portfolio Card | `.portfolio-card` | `--featured`, `--large` |
| Video Card | `.video-card` | `--featured` |
| Blog Card | `.blog-card` | `--featured`, `--large` |
| Button | `.btn` | `--primary`, `--secondary`, `--outline`, `--ghost` |
| Hero | `.hero` | `--dark`, `--light` |
| Section | `.section` | `--dark`, `--narrow`, `--wide` |

---

## Summary

This guide covered:

1. ✅ Layout components (HeroLayout, VideoArchiveLayout)
2. ✅ Common components (Header, Footer, ThemeSwitcher, MobileMenu)
3. ✅ UI components (Breadcrumbs, Button, Cards, Lightbox, Filters)
4. ✅ Page components (HomePage, PortfolioPage, BlogPage)
5. ✅ Section components (CTASection)
6. ✅ Form components (ContactForm, NewsletterSignup)
7. ✅ Animation components (ScrollToTop, ScrollDownArrow)
8. ✅ Best practices and quick reference

**Related Guides:**

- [Component Architecture Overview](../guidelines/overview-components.md)
- [Component Composition Guide](./component-composition-guide.md)
- [Custom Hooks Guide](./custom-hooks-guide.md)

---

**Last Updated:** March 12, 2026  
**Maintained By:** Development Team
