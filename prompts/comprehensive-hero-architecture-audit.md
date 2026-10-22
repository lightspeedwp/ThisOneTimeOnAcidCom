# Comprehensive Hero & Layout Architecture Audit Prompt

**Date:** March 7, 2026
**Type:** Architecture Analysis & Redesign Prompt
**Scope:** Header, Breadcrumbs, Hero, Footer, Mobile Menu Components + Data
Schema

---

## Objectives

1. **Fix immediate routing issue** - Dev tools routes not working

1. **Remove dev tools from sitemap** - Dev tools should not be linked from main site

1. **Standardize hero system** - Create universal hero component powered by data

1. **Modularize layout components** - Header, Breadcrumbs, Footer, Mobile Menu as WordPress-style template parts

1. **Create data schema** - Standardized data structures for all components

1. **Implement pattern variants** - Same data, different layouts/styles

---

## Phase 1: Current State Audit

### 1.1 Component Audit

## Components to audit

- [ ] Header (main site)
- [ ] Header (dev tools)
- [ ] Breadcrumbs
- [ ] Hero (all variants across site)
- [ ] Footer (main site)
- [ ] Footer (dev tools)
- [ ] Mobile Menu (main site)
- [ ] Mobile Menu (dev tools)

## For each component, document

1. File location

1. Props interface

1. Data sources (hardcoded vs imported)

1. CSS files used

1. Variants/patterns in use

1. Dependencies

### 1.2 Data Structure Audit

## Data files to audit

- [ ] `/data/mock/ui/` - All UI-related data files
- [ ] `/data/mock/pages/` - Page content files
- [ ] Hero content sources
- [ ] Navigation data sources
- [ ] Breadcrumb data sources
- [ ] Footer data sources

## For each data file, document

1. Current structure

1. Which components consume it

1. Inconsistencies across files

1. Missing fields

1. Redundant fields

### 1.3 Hero Pattern Audit

## Scan all page components for hero patterns

- [ ] Home page hero
- [ ] About section heroes
- [ ] Portfolio page hero
- [ ] Blog page hero
- [ ] Events page hero
- [ ] Videos page hero
- [ ] Podcasts page hero
- [ ] Dev tools heroes (46 pages)
- [ ] Legal pages heroes
- [ ] Contact page hero

**Document for each:**

1. Hero markup structure

1. Data source

1. Visual elements (badge, icon, buttons, graphics)

1. Layout pattern (centered, left-aligned, two-column, etc.)

1. CSS classes used

1. Scroll down arrow presence

---

## Phase 2: Data Schema Design

### 2.1 Universal Hero Data Schema

**Required fields:**

```typescript
interface HeroConfig {
  // Identifiers
  id: string;
  page: string;

  // Badge/Chip
  badge?: {
    text: string;
    icon?: string; // Icon component name or null
    variant?: 'default' | 'neon' | 'outline';
  };

  // Title
  title: string;
  titleVariant?: 'default' | 'gradient' | 'neon';

  // Subtitle/Description
  subtitle?: string;
  description?: string;

  // Call-to-Action Buttons
  primaryButton?: {
    text: string;
    href: string;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  secondaryButton?: {
    text: string;
    href: string;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };

  // Visual Elements
  graphic?: {
    type: 'image' | 'mosaic' | 'webgl' | 'svg' | null;
    src?: string;
    alt?: string;
    pattern?: string; // For WebGL/SVG patterns
  };

  // Layout
  layout: 'centered' | 'left-aligned' | 'two-column' | 'full-width';
  pattern: 'default' | 'dev-tools' | 'editorial' | 'minimal';

  // Features
  showScrollArrow?: boolean;
  showBreadcrumbs?: boolean;

  // Styling
  className?: string;
  backgroundVariant?: 'default' | 'dark' | 'gradient' | 'noise';
}

```text

### 2.2 Universal Header Data Schema

```typescript
interface HeaderConfig {
  // Logo
  logo: {
    text: string;
    href: string;
    showIcon?: boolean;
  };

  // Navigation
  navigation: Array<{
    label: string;
    href: string;
    active?: boolean;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;

  // Search
  search?: {
    enabled: boolean;
    placeholder: string;
  };

  // Mobile Menu
  mobileMenu: {
    enabled: boolean;
    variant: 'default' | 'full-screen' | 'sidebar';
  };

  // Pattern
  pattern: 'main-site' | 'dev-tools' | 'minimal';
}

```text

### 2.3 Universal Breadcrumbs Data Schema

```typescript
interface BreadcrumbsConfig {
  items: Array<{
    label: string;
    href?: string; // Last item has no href (current page)
  }>;
  variant: 'main-site' | 'dev-tools' | 'minimal';
  centered?: boolean;
  layoutLevel?: boolean; // Render at layout level vs page level
}

```text

### 2.4 Universal Footer Data Schema

```typescript
interface FooterConfig {
  // Columns
  columns: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  }>;

  // Social Links
  social: Array<{
    platform: string;
    href: string;
    icon: string;
  }>;

  // Meta
  meta: {
    copyright: string;
    tagline?: string;
  };

  // Stats (for dev tools footer)
  stats?: {
    toolCount?: number;
    categoryCount?: number;
  };

  // Pattern
  pattern: 'main-site' | 'dev-tools' | 'minimal';
}

```text

### 2.5 Universal Mobile Menu Data Schema

```typescript
interface MobileMenuConfig {
  // Navigation (inherited from header)
  navigation: Array<{
    label: string;
    href: string;
    icon?: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;

  // Search
  search?: {
    enabled: boolean;
    placeholder: string;
  };

  // Pattern
  pattern: 'main-site' | 'dev-tools' | 'minimal';
  variant: 'full-screen' | 'sidebar' | 'bottom-sheet';
}

```text

---

## Phase 3: Component Redesign

### 3.1 Universal Hero Component

**Component:** `/components/ui/Hero.tsx`

**Props:**

```typescript
interface HeroProps {
  config: HeroConfig;
  children?: React.ReactNode; // For custom content below hero
}

```text

**Features:**

- Renders all hero elements based on config
- Conditional rendering (buttons, badge, graphic, scroll arrow)
- Layout variants via CSS classes
- Pattern variants via CSS files
- Lazy-load graphics
- Accessibility (ARIA labels, semantic HTML)

**CSS Files:**

- `/styles/blocks/hero.css` - Base hero styles
- `/styles/blocks/hero--centered.css` - Centered layout
- `/styles/blocks/hero--left-aligned.css` - Left-aligned layout
- `/styles/blocks/hero--two-column.css` - Two-column layout
- `/styles/blocks/hero--dev-tools.css` - Dev tools pattern
- `/styles/blocks/hero--editorial.css` - Editorial pattern

### 3.2 Modular Header Component

**Component:** `/components/common/Header.tsx`

**Props:**

```typescript
interface HeaderProps {
  pattern?: 'main-site' | 'dev-tools' | 'minimal';
  config?: HeaderConfig; // Optional override
}

```text

**Features:**

- Loads default config based on pattern
- Allows config override for custom headers
- Renders navigation, logo, search, burger
- Handles mobile menu state
- Pattern-specific styling

**CSS Files:**

- `/styles/blocks/header.css` - Base header styles
- `/styles/blocks/header--main-site.css` - Main site pattern
- `/styles/blocks/header--dev-tools.css` - Dev tools pattern
- `/styles/blocks/header--minimal.css` - Minimal pattern

### 3.3 Modular Breadcrumbs Component

**Component:** `/components/ui/Breadcrumbs.tsx` (already exists, needs update)

**Props:**

```typescript
interface BreadcrumbsProps {
  config?: BreadcrumbsConfig; // New: accept full config
  items?: BreadcrumbItem[]; // Legacy: maintain backward compatibility
  variant?: 'main-site' | 'dev-tools' | 'minimal';
  centered?: boolean;
  layoutLevel?: boolean;
}

```text

**Features:**

- Accept config object OR legacy props
- Pattern-specific styling
- Schema.org JSON-LD (already implemented)
- Accessibility (aria-current)

### 3.4 Modular Footer Component

**Component:** `/components/common/Footer.tsx`

**Props:**

```typescript
interface FooterProps {
  pattern?: 'main-site' | 'dev-tools' | 'minimal';
  config?: FooterConfig; // Optional override
}

```text

**Features:**

- Loads default config based on pattern
- Allows config override
- Renders columns, social links, meta
- Pattern-specific styling

**CSS Files:**

- `/styles/blocks/footer.css` - Base footer styles
- `/styles/blocks/footer--main-site.css` - Main site pattern
- `/styles/blocks/footer--dev-tools.css` - Dev tools pattern
- `/styles/blocks/footer--minimal.css` - Minimal pattern

### 3.5 Modular Mobile Menu Component

**Component:** `/components/common/MobileMenu.tsx`

**Props:**

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pattern?: 'main-site' | 'dev-tools' | 'minimal';
  config?: MobileMenuConfig; // Optional override
}

```text

**Features:**

- Loads default config based on pattern
- Full-screen overlay vs sidebar vs bottom sheet
- Search integration
- Pattern-specific styling
- Keyboard accessible (Escape to close)

**CSS Files:**

- `/styles/blocks/mobile-menu.css` - Base mobile menu styles
- `/styles/blocks/mobile-menu--main-site.css` - Main site pattern
- `/styles/blocks/mobile-menu--dev-tools.css` - Dev tools pattern
- `/styles/blocks/mobile-menu--minimal.css` - Minimal pattern

---

## Phase 4: Data File Structure

### 4.1 Centralized Data Files

**Create:**

```text
/data/mock/ui/
├── heroes.ts              ← All hero configs (main site)
├── heroes-dev-tools.ts    ← All dev tools hero configs
├── headers.ts             ← Header configs (main-site, dev-tools, minimal)
├── breadcrumbs.ts         ← Breadcrumb configs (auto-generated from routes?)
├── footers.ts             ← Footer configs (main-site, dev-tools, minimal)
├── mobile-menus.ts        ← Mobile menu configs (main-site, dev-tools, minimal)
└── (existing files)

```text

### 4.2 Data File Schemas

**Example: `/data/mock/ui/heroes.ts`**

```typescript
import type { HeroConfig } from '../../types/hero';

export const mainSiteHeroes: Record<string, HeroConfig> = {
  home: {
    id: 'home',
    page: '/',
    badge: {
      text: 'Cape Town • Berlin • Thailand',
      variant: 'neon',
    },
    title: 'Ash Shaw',
    titleVariant: 'gradient',
    description: 'Makeup artist, creative nomad, psytrance enthusiast',
    primaryButton: {
      text: 'View portfolio',
      href: '/portfolio',
      icon: 'ArrowRight',
      variant: 'primary',
    },
    secondaryButton: {
      text: 'Read my story',
      href: '/about',
      variant: 'outline',
    },
    graphic: {
      type: 'mosaic',
      pattern: 'portfolio-grid-4x4',
    },
    layout: 'centered',
    pattern: 'default',
    showScrollArrow: true,
    showBreadcrumbs: false,
    backgroundVariant: 'noise',
  },

  portfolio: {
    id: 'portfolio',
    page: '/portfolio',
    badge: {
      text: 'Gallery',
      icon: 'GridFour',
    },
    title: 'Portfolio',
    subtitle: 'Festival makeup & creative work',
    primaryButton: {
      text: 'Filter by category',
      href: '#filters',
      variant: 'secondary',
    },
    graphic: {
      type: 'image',
      src: 'figma:asset/hero-portfolio.png',
      alt: 'Festival makeup work',
    },
    layout: 'left-aligned',
    pattern: 'editorial',
    showScrollArrow: true,
    showBreadcrumbs: true,
    backgroundVariant: 'dark',
  },

  // ... more heroes
};

```text

---

## Phase 5: Implementation Plan

### 5.1 Fix Immediate Issues

**Tasks:**

1. **Debug dev tools routing**

   - Check browser console for errors
   - Verify React Router v7 compatibility
   - Test `/dev-tools` URL manually
   - Check if `createBrowserRouter` is working correctly

1. **Remove dev tools from sitemap**

   - Edit `/components/pages/SitemapPage.tsx`
   - Remove dev tools section from sitemap data
   - Update `/data/mock/ui/sitemap.ts` if it exists

### 5.2 Create Data Schema

**Tasks:**

1. Create TypeScript interfaces for all schemas

1. Create centralized data files

1. Migrate existing hero content to new schema

1. Validate all data structures

### 5.3 Build Universal Hero Component

**Tasks:**

1. Create `/components/ui/Hero.tsx`

1. Create CSS files for all layout variants

1. Create CSS files for all patterns

1. Implement conditional rendering logic

1. Add graphics support (image, mosaic, WebGL placeholder)

1. Add scroll down arrow component

1. Test with 5 pilot pages

### 5.4 Modularize Layout Components

**Tasks:**

1. Refactor Header component with pattern support

1. Refactor Breadcrumbs component with pattern support

1. Refactor Footer component with pattern support

1. Create MobileMenu component with pattern support

1. Create layout wrapper components (RootLayout, DevToolsLayout)

1. Test all patterns

### 5.5 Migrate All Pages

**Tasks:**

1. Update home page with new Hero component

1. Update about section pages (21 pages)

1. Update portfolio page

1. Update blog page

1. Update events page

1. Update videos page

1. Update podcasts page

1. Update dev tools pages (46 pages)

1. Update legal/utility pages

### 5.6 Documentation

**Tasks:**

1. Create data schema documentation

1. Create component usage guide

1. Create pattern guide

1. Update Guidelines.md

1. Create migration guide for future pages

---

## Success Criteria

## ✅ Dev tools routing working

- All `/dev-tools/*` URLs load correctly
- No console errors
- Navigation works smoothly

## ✅ Standardized hero system

- Single Hero component used across all pages
- All heroes powered by data files
- No hardcoded hero content in page components

## ✅ Modular layout components

- Header, Breadcrumbs, Footer, Mobile Menu support patterns
- Pattern switching via props (no code changes)
- Clean separation of concerns

## ✅ Data schema in place

- All data structures documented
- TypeScript interfaces defined
- Data files organized and consistent

## ✅ No breaking changes

- All existing URLs work
- All page content intact
- Visual appearance unchanged (unless improved)

---

## Deliverables

1. **Fixed routing** for dev tools section

1. **Data schema documentation** (TypeScript interfaces)

1. **Centralized data files** for all layout components

1. **Universal Hero component** with all variants

1. **Modular layout components** (Header, Breadcrumbs, Footer, Mobile Menu)

1. **Migration of all pages** to new hero system

1. **Updated Guidelines.md** with new architecture

1. **Component usage guide** for future development

---

## Next Steps

1. Run this audit prompt to analyze current state

1. Create detailed findings report

1. Create implementation task list

1. Begin Phase 5.1 (fix immediate issues)

1. Proceed with systematic implementation
