# Component System Overview

This document provides a comprehensive overview of all components available in the Ash Shaw Makeup Portfolio design system, including a **React Component Architecture Diagram** and **Data Layer Integration**. **Always prefer custom components over generic HTML elements.**

**Version:** 5.0.0  
**Last Updated:** February 2026
**Last Reviewed:** February 21, 2026

## 📊 React Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                     │
│                         (Main Application)                               │
│  • State Management (currentPage, blogPostSlug, portfolioId)            │
│  • Client-Side Routing Logic                                            │
│  • Error Boundary Wrapper                                               │
│  • Modal Provider Context                                               │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┬──────────────────┐
           │               │               │                  │
           ▼               ▼               ▼                  ▼
    ┌──────────┐    ┌──────────┐   ┌──────────┐      ┌──────────┐
    │  Header  │    │   Main   │   │  Footer  │      │  Global  │
    │  (Part)  │    │ Content  │   │  (Part)  │      │  Modals  │
    └────┬─────┘    └────┬─────┘   └────┬─────┘      └──────────┘
         │               │               │
         ▼               │               ▼
  ┌──────────┐           │        ┌──────────┐
  │   Logo   │           │        │ Connect  │
  │MobileMenu│           │        │  Button  │
  │  NavLink │           │        │  Social  │
  └──────────┘           │        │  Links   │
                         │        └──────────┘
         ┌───────────────┼───────────────┬──────────────────┐
         │               │               │                  │
         ▼               ▼               ▼                  ▼
  ┌──────────┐    ┌──────────┐   ┌──────────┐      ┌──────────┐
  │ HomePage │    │AboutPage │   │Portfolio │      │ BlogPage │
  │(Template)│    │(Template)│   │  Page    │      │(Template)│
  └────┬─────┘    └────┬─────┘   │(Template)│      └────┬─────┘
       │               │          └────┬─────┘           │
       │               │               │                 │
       ▼               ▼               ▼                 ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Sections   │ │  Sections   │ │  Sections   │ │  Sections   │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Hero      │ │ • Hero      │ │ • Gallery   │ │ • Search    │
│   Layout    │ │   Layout    │ │   Section   │ │   Bar       │
│ • Featured  │ │ • Why       │ │ • Filter    │ │ • Category  │
│   Section   │ │   Section   │ │   Bar       │ │   Filter    │
│ • Blog      │ │ • Journey   │ │ • Portfolio │ │ • Blog      │
│   Preview   │ │   Section   │ │   Grid      │ │   Grid      │
│   Section   │ │ • CTA       │ │ • Lightbox  │ │ • Pagination│
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
┌─────────────┐ ┌────────────┐ ┌─────────────┐ ┌─────────────┐
│   Blocks    │ │   Blocks    │ │   Blocks    │ │   Blocks    │
│  (Cards)    │ │(Content+UI) │ │  (Cards)    │ │  (Cards)    │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Portfolio │ │ • Section   │ │ • Portfolio │ │ • Blog      │
│   Card      │ │   Card      │ │   Card      │ │   Card      │
│ • Slider    │ │ • Content   │ │ • Enhanced  │ │ • Search    │
│   Card      │ │   Blocks    │ │   Lightbox  │ │   Input     │
│ • Image     │ │ • Image     │ │ • Filter    │ │ • Tag       │
│   Gallery   │ │   Blocks    │ │   Buttons   │ │   Badge     │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Components  │ │ Components  │ │ Components  │ │ Components  │
│ (UI Atoms)  │ │ (UI Atoms)  │ │ (UI Atoms)  │ │ (UI Atoms)  │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Button    │ │ • Button    │ │ • Button    │ │ • Input     │
│ • Image     │ │ • Text      │ │ • Image     │ │ • Button    │
│ • Badge     │ │ • Heading   │ │ • Badge     │ │ • Icon      │
│ • Icon      │ │ • Link      │ │ • Icon      │ │ • Badge     │
│ • ReadMore  │ │ • ScrollTo  │ │ • Lightbox  │ │ • Share     │
│   Button    │ │   Top       │ │   Modal     │ │   Component │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘

                    ┌─────────────────────┐
                    │  Data Layer (NEW)   │
                    ├─────────────────────┤
                    │ • Mock Data System  │
                    │ • WordPress CMS     │
                    │ • Type Definitions  │
                    │ • useContent        │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │  Utility Services   │
                    ├─────────────────────┤
                    │ • portfolioService  │
                    └─────────────────────┘
```

### Diagram Legend

- **App.tsx** - Root application with routing and global state
- **Parts** (Blue) - Global template parts (Header, Footer)
- **Templates** (Green) - Full page layouts
- **Sections** (Purple) - Layout containers for content
- **Blocks** (Orange) - Content units and cards
- **Components** (Gray) - Primitive UI elements
- **Data Layer** (NEW) - Mock data and CMS integration
- **Services** (Yellow) - Data and utility services

---

## 💾 Data Layer Architecture

### Centralized Data Management System

The application uses a comprehensive data layer that separates content from components:

```
Data Layer
├── Mock Data (/data/mock/)
│   ├── Blog (posts.ts, categories.ts)
│   ├── Images (hero-images.ts)
│   ├── Pages (home.ts, about.ts, portfolio.ts)
│   ├── Portfolio (featured.ts, thailand.ts, festivals.ts, etc.)
│   └── UI (social-links.ts)
│
├── Content Integration (/hooks/useContent.ts)
│   ├── useHomepageContent()
│   ├── useAboutPageContent()
│   ├── usePortfolioSections()
│   ├── useBlogPosts()
│   └── useBlogPost(slug)
│
└── Type Definitions (/data/types/)
    ├── blog.ts (BlogPost, BlogCategory, etc.)
    ├── page.ts (HeroContent, AboutSection, etc.)
    └── portfolio.ts (PortfolioEntry, PortfolioImage, etc.)
```

### Data Integration Pattern

**Every component uses this pattern:**

```typescript
// 1. Import mock data
import { homepageHero } from '@/data/mock';

// 2. Import content hook (optional)
import { useHomepageContent } from '@/hooks/useContent';

// 3. Use hook with fallback
const { data: cmsData, loading, error } = useHomepageContent();

// 4. Seamless fallback to mock data
const heroData = cmsData ? cmsData.hero : homepageHero;

// 5. Use data in component
<HeroLayout {...heroData} />
```

**Key Benefits:**
- ✅ Works without CMS configuration
- ✅ Automatic fallback to mock data
- ✅ Type-safe with TypeScript
- ✅ Single source of truth for content
- ✅ Easy content updates

**Documentation:**
- Complete guide: [Data System](../data/README.md)
- CMS integration: [CMS Field Mapping](../docs/cms-field-mapping.md)

---

## 📚 How to Use This Guide

**IMPORTANT:** Before using ANY component, you MUST read its specific guideline file. This overview helps you discover what's available, but the component-specific files contain critical implementation details.

### Reading Order

1. ✅ Read this overview to understand the component system
2. ✅ Find the component you need in the tables below
3. ✅ Read that component's specific guideline file BEFORE using it
4. ✅ Follow the styling requirements in the component guide

---

## 📋 Table of Contents

1. [Component Philosophy](#component-philosophy)
2. [Complete Component List](#complete-component-list)
3. [Component Categories](#component-categories)
4. [Common Component Props](#common-component-props)
5. [Component Usage Patterns](#component-usage-patterns)
6. [Styling Requirements](#styling-requirements)

---

## Component Philosophy

### Always Prefer Components

✅ **CORRECT:** Use design system components
```tsx
<Logo size="md" />
<ScrollDownArrow />
<ScrollBackToTop />
```

❌ **WRONG:** Use generic HTML without styling
```tsx
<div>Logo</div>
<button>Scroll</button>
```

### Explicit Styling Required

Every component must be styled explicitly with guidelines-compliant classes:

```tsx
// ✅ CORRECT - Fully styled
<Button className="w-full sm:w-auto bg-gradient-pink-purple-blue text-white px-button py-button font-body font-medium text-button-fluid rounded-lg shadow-lg hover:shadow-xl">
  Submit
</Button>

// ❌ WRONG - Relying on defaults
<Button>Submit</Button>
```

---

## Complete Component List

### All Available Components (24 Total)

| # | Component | Category | Guidelines File | Status |
|---|-----------|----------|----------------|--------|
| 1 | **Logo** | Brand & Identity | [Logo.md](./components/Logo.md) | ✅ Complete |
| 2 | **Header** | Navigation | [Header.md](./components/Header.md) | ✅ Complete |
| 3 | **Footer** | Navigation | [Footer.md](./components/Footer.md) | ✅ Complete |
| 4 | **ScrollDownArrow** | Navigation & Scroll | [ScrollDownArrow.md](./components/ScrollDownArrow.md) | ✅ Complete |
| 5 | **ScrollBackToTop** | Navigation & Scroll | [ScrollBackToTop.md](./components/ScrollBackToTop.md) | ✅ Complete |
| 6 | **LayoutSwitcher** | Layout | [LayoutSwitcher.md](./components/LayoutSwitcher.md) | ✅ Complete |
| 7 | **HeroSection** | Layout | [HeroSection.md](./components/HeroSection.md) | ✅ Complete |
| 8 | **PortfolioCard** | Content Display | [PortfolioCard.md](./components/PortfolioCard.md) | ✅ Complete |
| 9 | **BlogCard** | Content Display | [BlogCard.md](./components/BlogCard.md) | ✅ Complete |
| 10 | **SectionCard** | Content Display | [SectionCard.md](./components/SectionCard.md) | ✅ Complete |
| 11 | **TestimonialCard** | Content Display | [TestimonialCard.md](./components/TestimonialCard.md) | ✅ Complete |
| 12 | **ImageGallery** | Media & Display | [ImageGallery.md](./components/ImageGallery.md) | ✅ Complete |
| 13 | **Lightbox** | Media & Display | [Lightbox.md](./components/Lightbox.md) | ✅ Complete |
| 14 | **TypeformEmbed** | Forms & Input | [TypeformEmbed.md](./components/TypeformEmbed.md) | ✅ Complete |
| 15 | **SearchBar** | Forms & Input | [SearchBar.md](./components/SearchBar.md) | ✅ Complete |
| 16 | **CategoryFilter** | Interactive | [CategoryFilter.md](./components/CategoryFilter.md) | ✅ Complete |
| 17 | **ReadMoreButton** | Interactive | [ReadMoreButton.md](./components/ReadMoreButton.md) | ✅ Complete |
| 18 | **ShareComponent** | Interactive | [ShareComponent.md](./components/ShareComponent.md) | ✅ Complete |
| 19 | **Pagination** | Navigation | [Pagination.md](./components/Pagination.md) | ✅ Complete |
| 20 | **Breadcrumbs** | Navigation | [Breadcrumbs.md](./components/Breadcrumbs.md) | ✅ Complete |
| 21 | **SocialLinks** | Social & Sharing | [SocialLinks.md](./components/SocialLinks.md) | ✅ Complete |
| 22 | **Modal** | UI Controls | [Modal.md](./components/Modal.md) | ✅ Complete |
| 23 | **LoadingSpinner** | UI Controls | [LoadingSpinner.md](./components/LoadingSpinner.md) | ✅ Complete |
| 24 | **Tag** | UI Controls | [Tag.md](./components/Tag.md) | ✅ Complete |

---

## Component Categories

### 1. Brand & Identity (1 component)

Components that establish brand identity and visual consistency.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **Logo** | Site brand logo with responsive sizing and animations | [Logo.md](./components/Logo.md) |
| **SocialLinks** | Social media icon links (Instagram, email) | [SocialLinks.md](./components/SocialLinks.md) |

### 2. Navigation & Layout (7 components)

Components for site navigation, page structure, and scrolling behavior.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **Header** | Main navigation with mobile hamburger menu | [Header.md](./components/Header.md) |
| **Footer** | Footer with contact form and social links | [Footer.md](./components/Footer.md) |
| **ScrollDownArrow** | Animated scroll indicator for hero sections | [ScrollDownArrow.md](./components/ScrollDownArrow.md) |
| **ScrollBackToTop** | Floating button to scroll back to top | [ScrollBackToTop.md](./components/ScrollBackToTop.md) |
| **Breadcrumbs** | Hierarchical navigation breadcrumb trail | [Breadcrumbs.md](./components/Breadcrumbs.md) |
| **Pagination** | Page navigation for blog and portfolio listings | [Pagination.md](./components/Pagination.md) |
| **HeroSection** | Hero banner with background and CTA | [HeroSection.md](./components/HeroSection.md) |

### 3. Content Display Cards (4 components)

Card components for displaying portfolio items, blog posts, and testimonials.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **PortfolioCard** | Portfolio item card with image slider | [PortfolioCard.md](./components/PortfolioCard.md) |
| **BlogCard** | Blog post preview card with metadata | [BlogCard.md](./components/BlogCard.md) |
| **SectionCard** | Generic content card for features/services | [SectionCard.md](./components/SectionCard.md) |
| **TestimonialCard** | Client testimonial with star rating | [TestimonialCard.md](./components/TestimonialCard.md) |

### 4. Media & Display (2 components)

Components for image galleries and media viewing.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **ImageGallery** | Responsive image gallery (grid/masonry/justified) | [ImageGallery.md](./components/ImageGallery.md) |
| **Lightbox** | Full-screen image viewer with navigation | [Lightbox.md](./components/Lightbox.md) |

### 5. Forms & Input (2 components)

Form and search input components.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **TypeformEmbed** | Typeform integration with light/dark mode support | [TypeformEmbed.md](./components/TypeformEmbed.md) |
| **SearchBar** | Search input with icon and clear button | [SearchBar.md](./components/SearchBar.md) |

### 6. Interactive Controls (4 components)

Components for filtering, expanding content, and user interactions.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **CategoryFilter** | Category/tag filtering chips | [CategoryFilter.md](./components/CategoryFilter.md) |
| **LayoutSwitcher** | Toggle between grid and list views | [LayoutSwitcher.md](./components/LayoutSwitcher.md) |
| **ReadMoreButton** | Expandable content toggle button | [ReadMoreButton.md](./components/ReadMoreButton.md) |
| **ShareComponent** | Social media sharing buttons | [ShareComponent.md](./components/ShareComponent.md) |

### 7. UI Controls & Feedback (4 components)

Modal dialogs, loading indicators, and tag components.

| Component | Purpose | Guidelines File |
|-----------|---------|----------------|
| **Modal** | Dialog/modal with overlay and focus trap | [Modal.md](./components/Modal.md) |
| **LoadingSpinner** | Loading indicator (spinner/dots/pulse/bars) | [LoadingSpinner.md](./components/LoadingSpinner.md) |
| **Tag** | Label/badge for categories and metadata | [Tag.md](./components/Tag.md) |

---

## Quick Reference: When to Use Which Component

### Building a Page?
- Start with **Header** and **Footer**
- Add **ScrollBackToTop** for long pages
- Use **HeroSection** for landing pages
- Add **Breadcrumbs** for deep navigation

### Displaying Portfolio?
- Use **PortfolioCard** in grids
- Add **ImageGallery** for multiple images
- Enable **Lightbox** for full-screen viewing
- Add **CategoryFilter** for filtering
- Use **LayoutSwitcher** for grid/list toggle

### Building Blog?
- Use **BlogCard** for post listings
- Add **SearchBar** for search functionality
- Use **Pagination** for page navigation
- Add **Tag** for categories
- Include **ShareComponent** on post pages

### Need User Interaction?
- Use **TypeformEmbed** for contact forms and inquiries
- Use **ReadMoreButton** for expandable content
- Add **ShareComponent** for social sharing
- Use **Modal** for dialogs and confirmations

### Loading States?
- Use **LoadingSpinner** while fetching data
- Show skeleton loaders in cards

### Social Features?
- Add **SocialLinks** in footer
- Use **ShareComponent** for sharing
- Include **TestimonialCard** for reviews

---

## Common Component Props

Most components accept these common props:

### Standard Props

```typescript
interface CommonProps {
  /** Additional CSS classes for customization */
  className?: string;
  
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  
  /** Test/tracking identifier */
  id?: string;
  
  /** Inline styles (use sparingly) */
  style?: React.CSSProperties;
}
```

### Sizing Props

```typescript
interface SizingProps {
  /** Component size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Responsive width behavior */
  fullWidth?: boolean;
}
```

### Interaction Props

```typescript
interface InteractionProps {
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  
  /** Keyboard handler */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  
  /** Disabled state */
  disabled?: boolean;
}
```

---

## Component Usage Patterns

### 1. Page Structure Pattern

Standard page layout structure:

```tsx
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollBackToTop } from './components/ui/ScrollBackToTop';

function PageComponent() {
  return (
    <>
      <Header currentPage="home" onNavigate={handleNavigate} />
      
      <main className="min-h-screen">
        {/* Page content */}
      </main>
      
      <Footer />
      <ScrollBackToTop />
    </>
  );
}
```

### 2. Hero Section Pattern

Standard hero section with scroll indicator:

```tsx
import { HeroLayout } from './components/sections/HeroLayout';
import { ScrollDownArrow } from './components/ui/ScrollDownArrow';

function HeroSection() {
  return (
    <HeroLayout
      title="Hi, I'm Ash Shaw"
      subtitle="Makeup Artist & Creative"
      backgroundImage="hero-bg.jpg"
    >
      <p className="text-body-guideline font-body">
        Makeup that shines with colour, energy, and connection.
      </p>
      
      <ScrollDownArrow targetId="featured-section" />
    </HeroLayout>
  );
}
```

### 3. Content Grid Pattern

Responsive grid layout with cards:

```tsx
import { ThreeColumnLayout } from './components/sections/ThreeColumnLayout';
import { SectionCard } from './components/ui/SectionCard';

function ContentGrid() {
  return (
    <section className="py-section">
      <h2 className="text-section-h2 font-heading font-semibold text-center mb-fluid-lg">
        Why I Do Makeup
      </h2>
      
      <ThreeColumnLayout>
        <SectionCard
          title="Connection"
          description="Building relationships through artistry"
          icon={<ColorfulIcon name="sparkles" />}
        />
        <SectionCard
          title="Creativity"
          description="Expressing unique visions"
          icon={<ColorfulIcon name="palette" />}
        />
        <SectionCard
          title="Confidence"
          description="Empowering through transformation"
          icon={<ColorfulIcon name="star" />}
        />
      </ThreeColumnLayout>
    </section>
  );
}
```

### 4. Portfolio Display Pattern

Portfolio grid with filtering and lightbox:

```tsx
import { PortfolioCard } from './components/ui/PortfolioCard';
import { PortfolioLightbox } from './components/ui/PortfolioLightbox';
import { LayoutSwitcher } from './components/ui/LayoutSwitcher';

function PortfolioSection() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [selectedEntry, setSelectedEntry] = useState<PortfolioEntry | null>(null);

  return (
    <section className="py-section">
      <div className="flex justify-between items-center mb-fluid-lg">
        <h2 className="text-section-h2 font-heading font-semibold">Portfolio</h2>
        <LayoutSwitcher value={layout} onChange={setLayout} />
      </div>
      
      <div className={layout === 'grid' ? 'grid grid-cols-2 gap-fluid-md' : 'flex flex-col gap-fluid-md'}>
        {portfolioEntries.map(entry => (
          <PortfolioCard
            key={entry.id}
            entry={entry}
            onClick={() => setSelectedEntry(entry)}
          />
        ))}
      </div>
      
      {selectedEntry && (
        <PortfolioLightbox
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </section>
  );
}
```

### 5. Blog Content Pattern

Blog listing with search and pagination:

```tsx
import { BlogCard } from './components/ui/BlogCard';
import { BlogPagination } from './components/ui/BlogPagination';
import { SearchBar } from './components/ui/SearchBar';

function BlogSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <section className="py-section">
      <h2 className="text-section-h2 font-heading font-semibold mb-fluid-lg">
        Latest Insights
      </h2>
      
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search blog posts..."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md mt-fluid-lg">
        {filteredPosts.map(post => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => navigateToBlogPost(post.slug)}
          />
        ))}
      </div>
      
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
```

---

## Styling Requirements

### Typography Styling (REQUIRED)

All text must use explicit typography classes:

```tsx
// Headings
<h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue">
  Main Title
</h1>

<h2 className="text-section-h2 font-heading font-semibold text-gray-800">
  Section Title
</h2>

// Body text
<p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed">
  Body content with proper line height and spacing.
</p>
```

### Button Styling (REQUIRED)

All buttons must use complete styling:

```tsx
// Primary CTA
<button className="w-full sm:w-auto justify-center text-center bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50">
  Explore Portfolio
</button>

// Secondary action
<button className="w-full sm:w-auto justify-center text-center bg-gradient-blue-teal-green hover:from-blue-700 hover:to-teal-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50">
  Read More
</button>
```

### Card Styling (REQUIRED)

All cards must use complete styling:

```tsx
<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-card-responsive border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
  <h3 className="text-section-h2 font-heading font-semibold text-gray-800 mb-fluid-md group-hover:text-gradient-pink-purple-blue transition-colors duration-300">
    Card Title
  </h3>
  <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed">
    Card content
  </p>
</div>
```

---

## Accessibility Requirements

### Keyboard Navigation

All interactive components must support:
- **Tab** - Focus navigation
- **Enter/Space** - Activation
- **Escape** - Close/cancel
- **Arrow Keys** - Navigation within component

### Screen Reader Support

```tsx
// Proper ARIA labels
<button
  aria-label="Open portfolio gallery in lightbox view"
  aria-expanded={isOpen}
  onClick={handleOpen}
>
  View Gallery
</button>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Focus Management

```tsx
// Visible focus indicators
<button className="focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50">
  Action
</button>

// Focus trapping in modals
useEffect(() => {
  if (isOpen) {
    const firstFocusable = modalRef.current?.querySelector('button, [href], input');
    (firstFocusable as HTMLElement)?.focus();
  }
}, [isOpen]);
```

---

## Component-Specific Guidelines

Before using any component, read its specific guideline file:

### Core UI Components
- **[Logo](./components/Logo.md)** - Brand logo with responsive sizing
- **[ScrollDownArrow](./components/ScrollDownArrow.md)** - Animated scroll indicator
- **[ScrollBackToTop](./components/ScrollBackToTop.md)** - Floating scroll button
- **[LayoutSwitcher](./components/LayoutSwitcher.md)** - Grid/list view toggle

### Phase 3 Content Components (NEW)
- **[Timeline](./components/Timeline.md)** - Chronological event timeline with neon accents
- **[PullQuote](./components/PullQuote.md)** - Visually emphasized blockquote with neon borders
- **[Accordion](./components/Accordion.md)** - Collapsible content sections with keyboard navigation
- **[ChapterNav](./components/ChapterNav.md)** - Sticky chapter navigation with scroll spy
- **[ContentSection](./components/ContentSection.md)** - Flexible content wrapper with design variants
- **[SplitContent](./components/SplitContent.md)** - Two-column image-text split layout

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines document
- **[overview-icons.md](./overview-icons.md)** - Icon system and verification
- **[design-tokens/colors.md](./design-tokens/colors.md)** - Color system
- **[design-tokens/typography.md](./design-tokens/typography.md)** - Typography scale
- **[design-tokens/spacing.md](./design-tokens/spacing.md)** - Spacing system

---

**Last Updated:** February 2026  
**Version:** 5.0.0

## Component Extraction Patterns

**Added:** March 11, 2026  
**Based on:** Modern React Migration Audit

### When to Extract Components

**Size Guidelines:**

| Lines of Code | Action Required |
|---------------|-----------------|
| 0-150 | ✅ Good size, no action needed |
| 150-300 | ⚠️ Consider splitting if logic is complex |
| 300-500 | 🔴 Should split into smaller components |
| 500+ | 🚨 Must split immediately |

**Complexity Signals - Extract when you see:**
- Multiple `useState` calls (5+) managing different concerns
- Deeply nested JSX (4+ levels)
- Multiple `useEffect` hooks for different purposes
- Copy-pasted code blocks across files
- Difficulty understanding component purpose at a glance
- Inline component definitions inside other components

### Extract to Custom Hooks When:

**State Management:**
- Component has 5+ related `useState` calls
- Complex state logic that could be reused
- State needs to be shared across multiple components

**Side Effects:**
- Multiple `useEffect` hooks doing different things
- Event listeners that need cleanup
- API calls with loading/error states

**Data Transformation:**
- Complex filtering, sorting, or mapping logic
- Search functionality
- Pagination logic

**Browser APIs:**
- Fullscreen API
- Intersection Observer
- Media queries
- LocalStorage/SessionStorage

**Example - EbookPage Refactoring:**

```typescript
// BEFORE - 800+ line component
export function EbookPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  // ... 10+ more useState calls
  
  // Touch gesture handling
  useEffect(() => {
    const handleTouchStart = (e) => { /* ... */ };
    const handleTouchEnd = (e) => { /* ... */ };
    // ... 50+ lines
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => { /* ... */ };
    // ... 40+ lines
  }, []);
  
  // ... 600+ more lines
}

// AFTER - 100 line component with extracted hooks
export function EbookPage() {
  const ebookState = useEbookState(0);
  useTouchGestures({
    onSwipeLeft: ebookState.nextPage,
    onSwipeRight: ebookState.prevPage,
  });
  useKeyboardNav({
    onNext: ebookState.nextPage,
    onPrev: ebookState.prevPage,
    onClose: ebookState.toggleToc,
  });
  const fullscreen = useFullscreen();

  return (
    <div className="ebook">
      <EbookHeader {...headerProps} />
      <EbookContent {...contentProps} />
      {ebookState.showToc && <EbookToc {...tocProps} />}
    </div>
  );
}
```

### Extract to Separate Components When:

**UI Patterns:**
- Component appears in 3+ places with minor variations
- Large JSX blocks (100+ lines) that could be self-contained
- Modal/dialog content
- Card layouts
- Form sections

**Layout Structures:**
- Archive page layouts (blog, portfolio, videos)
- Section wrappers
- Grid layouts
- List layouts

**Example - Shared Archive Layout:**

```typescript
// BEFORE - 70% duplicated code across 3 files
// VideoCategoryPage.tsx (300 lines)
// VideoTagPage.tsx (300 lines)
// BlogCategoryPage.tsx (300 lines)

// AFTER - Shared layout component
export function TaxonomyArchiveLayout({
  breadcrumbs,
  header,
  filters,
  children,
  faqPageId,
}: TaxonomyArchiveLayoutProps) {
  return (
    <div className="archive-page">
      <Breadcrumbs items={breadcrumbs} />
      <div className="archive-header">{header}</div>
      {filters && <ArchiveFilters {...filters} />}
      <div className="archive-content">{children}</div>
      <FaqSection pageId={faqPageId} />
    </div>
  );
}

// Usage - 100 lines instead of 300
export function VideoCategoryPage() {
  const filteredVideos = useVideoFiltering(/* ... */);

  return (
    <TaxonomyArchiveLayout
      breadcrumbs={videoCategoryBreadcrumbs(category)}
      header={<h1>{category.name} Videos</h1>}
      filters={{ /* ... */ }}
      faqPageId="videos"
    >
      <VideoGrid videos={filteredVideos} />
    </TaxonomyArchiveLayout>
  );
}
```

### Component Organization Best Practices

**File Structure:**

```
/components/
├── common/           # Shared across entire app
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── index.tsx     # Barrel export
├── ui/               # Reusable UI primitives
│   ├── Button.tsx
│   ├── Breadcrumbs.tsx
│   ├── StickerLightbox.tsx
│   └── index.tsx     # Barrel export
├── sections/         # Page sections
│   ├── HeroSection.tsx
│   ├── FaqSection.tsx
│   └── index.tsx
├── pages/            # Route components
│   ├── HomePage.tsx
│   ├── about/
│   │   ├── AboutPage.tsx
│   │   ├── EbookPage.tsx
│   │   └── index.tsx
│   └── videos/
│       ├── VideosPage.tsx
│       ├── VideoCategoryPage.tsx
│       └── index.tsx
└── layout/           # Layout components
    ├── TaxonomyArchiveLayout.tsx
    └── index.tsx
```

**Barrel Exports:**

Create `/components/ui/index.tsx`:

```typescript
export { Breadcrumbs } from './Breadcrumbs';
export { Button } from './Button';
export { StickerLightbox } from './StickerLightbox';
export { OptimizedImage } from './OptimizedImage';
// ... all UI components
```

**Usage:**

```typescript
// BEFORE - Long relative paths
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { Button } from '../../ui/Button';
import { StickerLightbox } from '../../ui/StickerLightbox';

// AFTER - Single import
import { Breadcrumbs, Button, StickerLightbox } from '../../ui';
```

### Custom Hooks Organization

**File Structure:**

```
/hooks/
├── useEbookState.ts        # State management hooks
├── useVideoFiltering.ts    # Data transformation hooks
├── useStickerSearch.ts     # Search hooks
├── useTouchGestures.ts     # Interaction hooks
├── useKeyboardNav.ts       # Interaction hooks
├── useFullscreen.ts        # Browser API hooks
├── useScrollSpy.ts         # Browser API hooks
├── useTheme.ts             # App-wide state hooks
└── index.ts                # Barrel export
```

**Barrel Export `/hooks/index.ts`:**

```typescript
// State Management
export { useEbookState } from './useEbookState';
export { useTheme } from './useTheme';

// Data Transformation
export { useVideoFiltering } from './useVideoFiltering';
export { useStickerSearch } from './useStickerSearch';

// Interaction
export { useTouchGestures } from './useTouchGestures';
export { useKeyboardNav } from './useKeyboardNav';

// Browser APIs
export { useFullscreen } from './useFullscreen';
export { useScrollSpy } from './useScrollSpy';
```

### Refactoring Checklist

When refactoring a large component, follow this checklist:

- [ ] Identify distinct concerns (state, side effects, UI)
- [ ] Extract state management to custom hooks (5+ useState → useReducer)
- [ ] Extract side effects to custom hooks (useEffect with cleanup)
- [ ] Extract data transformation to custom hooks (filtering, sorting)
- [ ] Extract repeated UI patterns to components
- [ ] Create barrel exports for new components/hooks
- [ ] Update imports in parent components
- [ ] Add TypeScript interfaces for all new components/hooks
- [ ] Add JSDoc documentation
- [ ] Test extracted components in isolation
- [ ] Verify no regressions in original component

### Common Patterns from Codebase

**Pattern 1: Archive Page Layout**
- Used by: VideoCategoryPage, VideoTagPage, BlogCategoryPage
- Shared: Header, Breadcrumbs, Filters, FAQ section
- Component: `TaxonomyArchiveLayout`

**Pattern 2: Lightbox/Modal**
- Used by: StickersPage, PortfolioPage
- Shared: Overlay, keyboard nav, prev/next controls
- Component: `StickerLightbox`, modal base

**Pattern 3: State + Touch + Keyboard**
- Used by: EbookPage, gallery components
- Shared: State management, touch gestures, keyboard shortcuts
- Hooks: `useEbookState`, `useTouchGestures`, `useKeyboardNav`

**Pattern 4: Search + Filter + Sort**
- Used by: StickersPage, VideosPage, BlogPage
- Shared: Search input, category filters, sort dropdown
- Hooks: `useStickerSearch`, `useVideoFiltering`

### Further Reading

- **[Custom Hooks Guide](/docs/custom-hooks-guide.md)** - Comprehensive hook patterns
- **[Component Composition Guide](/docs/component-composition-guide.md)** - Composition strategies

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines document
- **[overview-icons.md](./overview-icons.md)** - Icon system and verification
- **[design-tokens/colors.md](./design-tokens/colors.md)** - Color system
- **[design-tokens/typography.md](./design-tokens/typography.md)** - Typography scale
- **[design-tokens/spacing.md](./design-tokens/spacing.md)** - Spacing system

---

**Last Updated:** February 2026  
**Version:** 5.0.0