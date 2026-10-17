# Site Structure & Navigation Guide (Sitemap)

**Version:** 6.0.0
**Last Updated:** February 2026
**Purpose:** Define site structure, navigation, and routing

---

## Table of Contents

1. [Overview](#overview)
2. [Site Architecture](#site-architecture)
3. [Complete Route Table](#complete-route-table)
4. [Navigation Structure](#navigation-structure)
5. [URL Structure](#url-structure)
6. [Routing Implementation](#routing-implementation)
7. [SEO & Meta](#seo--meta)
8. [Breadcrumbs](#breadcrumbs)
9. [Navigation Components](#navigation-components)

---

## Overview

### Site Type

**Single Page Application (SPA)** with client-side routing via React Router (Data mode).

**Technology:**
- React Router `createBrowserRouter` (client-side, Data mode)
- `RootLayout` shell with `<Outlet />` for child routes
- `useNavigate()` and `<Link>` for programmatic and declarative navigation
- Scroll restoration on route change

**Key Features:**
- Fast page transitions (no full page reloads)
- Persistent Header/Footer via `RootLayout`
- Deep linking support (real URL paths)
- Browser back/forward support
- 46 page components across 60+ routes

---

## Site Architecture

### Visual Sitemap

```
                        Home Page (/)
                        Hero, Featured work, Blog preview
                                |
    ----+--------+--------+--------+--------+--------+----
    |        |        |        |        |        |
  About  Portfolio   Blog   Videos  Podcasts  Contact
  /about /portfolio  /blog  /videos /podcasts /contact
             |        |        |        |
         +---+---+ +--+--+ +--+--+ +---+---+
         |       | |     | |     | |       |
      category/ category/ category/ category/
      tag/      tag/      tag/      tag/
      :slug     :slug     :slug     :slug

    ----+--------+--------+--------+--------+----
    |        |          |          |          |
   FAQ    Feedback   Stickers   Search   Style Guide
   /faq  /feedback  /stickers  /search  /style-guide

    ----+----
    |
  Dev Tools (24 sub-tools)
  /dev-tools
    +-- /style-guide        (Style Guide)
    +-- /typography         (Typography Specimens)
    +-- /spacing            (Spacing Scale)
    +-- /shadows            (Shadow & Glow Scale)
    +-- /radius             (Border Radius Specimens)
    +-- /buttons            (Button Variants)
    +-- /cards              (Card Interactions)
    +-- /neon               (Neon Animations)
    +-- /tokens             (Design Tokens Reference)
    +-- /icons              (Icon Library)
    +-- /phosphor-icons     (Phosphor Icons Migration)
    +-- /api                (Component API)
    +-- /playground         (Design System Playground)
    +-- /code-quality       (Code Quality Dashboard)
    +-- /deployment         (Deployment Readiness)
    +-- /analytics          (Analytics Dashboard)
    +-- /components         (Component Showcase)
    +-- /snippets           (Snippet Generator)
    +-- /docs               (Documentation Generator)
    +-- /visual-regression  (Visual Regression Tester)
    +-- /integration        (Integration Tester)
    +-- /stickers           (Sticker Designs)
    +-- /accessibility      (Accessibility Tester)
    +-- /performance        (Performance Tester)

    ----+--------+----
    |        |       |
  Terms  Privacy  Sitemap
  /terms /privacy /sitemap
```

---

## Complete Route Table

### Primary Pages (Level 1)

All accessible from main navigation:

| Page | Route | Component | Description |
|------|-------|-----------|-------------|
| **Home** | `/` | `HomePage` | Landing page with hero, featured work, blog preview |
| **About** | `/about` | `AboutPage` | Journey, philosophy, skills |
| **Portfolio** | `/portfolio` | `PortfolioMainPage` | Gallery with category filtering |
| **Blog** | `/blog` | `BlogPage` | Listing with search, filters, pagination |
| **Videos** | `/videos` | `VideosPage` | Video showcase with filtering |
| **Podcasts** | `/podcasts` | `PodcastsPage` | Podcast archive with filtering |
| **Contact** | `/contact` | `ContactPage` | Typeform embed integration |

### Detail Pages (Level 2)

| Page | Route | Component | Parent |
|------|-------|-----------|--------|
| **Blog Post** | `/blog/:slug` | `BlogPostPageRoute` | Blog |
| **Portfolio Detail** | `/portfolio/:slug` | `PortfolioResolver` | Portfolio |
| **Video Detail** | `/video/:slug` | `VideoDetailPage` | Videos |
| **Podcast Detail** | `/podcast/:slug` | `PodcastDetailPage` | Podcasts |

### Taxonomy Archives (Level 2)

| Page | Route | Component |
|------|-------|-----------|
| **Blog Category** | `/blog/category/:slug` | `BlogCategoryPage` |
| **Blog Tag** | `/blog/tag/:slug` | `BlogTagPage` |
| **Portfolio Category** | `/portfolio/category/:slug` | `PortfolioCategoryPage` |
| **Portfolio Tag** | `/portfolio/tag/:slug` | `PortfolioTagPage` |
| **Video Category** | `/videos/category/:slug` | `VideoCategoryPage` |
| **Video Tag** | `/videos/tag/:slug` | `VideoTagPage` |
| **Podcast Category** | `/podcasts/category/:slug` | `PodcastCategoryPage` |
| **Podcast Tag** | `/podcasts/tag/:slug` | `PodcastTagPage` |

### Utility Pages

| Page | Route | Component |
|------|-------|-----------|
| **Search** | `/search` | `SearchResultsPage` |
| **FAQ** | `/faq` | `FaqAggregatePage` |
| **Feedback** | `/feedback` | `FeedbackPage` |
| **Stickers** | `/stickers` | `StickersPage` |
| **Style Guide** | `/style-guide` | `StyleGuidePage` |
| **Sitemap** | `/sitemap` | `SitemapPage` |
| **Terms** | `/terms` | `TermsAndConditions` |
| **Privacy** | `/privacy` | `PrivacyPolicy` |

### Developer Tools (24 sub-tools)

| Page | Route | Component | Badge |
|------|-------|-----------|-------|
| **Hub** | `/dev-tools` | `DevToolsPage` | — |
| **Style Guide** | `/dev-tools/style-guide` | `StyleGuidePage` | Design System |
| **Typography** | `/dev-tools/typography` | `TypographySpecimenPage` | Typography |
| **Spacing** | `/dev-tools/spacing` | `SpacingSpecimenPage` | Spacing |
| **Shadows** | `/dev-tools/shadows` | `ShadowSpecimenPage` | Shadows |
| **Radius** | `/dev-tools/radius` | `RadiusSpecimenPage` | Radius |
| **Buttons** | `/dev-tools/buttons` | `ButtonSpecimenPage` | Buttons |
| **Cards** | `/dev-tools/cards` | `CardSpecimenPage` | Cards |
| **Neon Animations** | `/dev-tools/neon` | `AnimationSpecimenPage` | Animations |
| **Tokens Reference** | `/dev-tools/tokens` | `DesignTokensRefPage` | Reference |
| **Icon Library** | `/dev-tools/icons` | `IconLibraryPage` | Reference |
| **Phosphor Icons Migration** | `/dev-tools/phosphor-icons` | `PhosphorIconsPage` | Migration |
| **Component API** | `/dev-tools/api` | `ComponentApiPage` | Reference |
| **Playground** | `/dev-tools/playground` | `PlaygroundPage` | Interactive |
| **Code Quality** | `/dev-tools/code-quality` | `CodeQualityPage` | Testing |
| **Deployment** | `/dev-tools/deployment` | `DeploymentReadinessPage` | Deployment |
| **Analytics** | `/dev-tools/analytics` | `AnalyticsDashboardPage` | Analytics |
| **Components** | `/dev-tools/components` | `ComponentShowcasePage` | Visual Preview |
| **Snippets** | `/dev-tools/snippets` | `SnippetGeneratorPage` | Builder |
| **Docs Generator** | `/dev-tools/docs` | `DocumentationGeneratorPage` | Docs |
| **Visual Regression** | `/dev-tools/visual-regression` | `VisualRegressionTesterPage` | Testing |
| **Integration** | `/dev-tools/integration` | `IntegrationTesterPage` | Testing |
| **Stickers** | `/dev-tools/stickers` | `StickersPage` | Asset Library |
| **Accessibility** | `/dev-tools/accessibility` | `AccessibilityTesterPage` | WCAG Audit |
| **Performance** | `/dev-tools/performance` | `PerformanceTesterPage` | Web Vitals |

### Error Pages

| Page | Route | Component |
|------|-------|-----------|
| **404** | `*` | `NotFoundPage` |

---

## Navigation Structure

### Primary Navigation

**Location:** Header (persistent via `RootLayout`)

**Menu Items** (from `/data/mock/ui/navigation.ts`):
1. **Home** `/`
2. **About** `/about`
3. **Portfolio** `/portfolio`
4. **Videos** `/videos`
5. **Blog** `/blog`
6. **Contact** `/contact`

### Footer Navigation

**Links:**
- Social media (Instagram, YouTube)
- Legal pages (Terms, Privacy, Sitemap)
- Contact link

---

## URL Structure

### URL Patterns

**Static Pages:**
```
/about
/portfolio
/blog
/videos
/podcasts
/contact
/faq
/feedback
/stickers
/search
/style-guide
/dev-tools
```

**Dynamic Detail Pages:**
```
/blog/festival-makeup-survival-guide
/portfolio/lost-paradise-thailand
/video/neon-uv-tutorial
/podcast/episode-one
```

**Taxonomy Archives:**
```
/blog/category/tutorials
/blog/tag/festival-art
/portfolio/category/face-paint
/portfolio/tag/neon
/videos/category/tutorials
/videos/tag/uv-paint
/podcasts/category/interviews
/podcasts/tag/berlin
```

**Query Parameters:**
```
/blog?category=tutorials
/search?q=neon+paint
```

### URL Best Practices

- Use lowercase
- Use hyphens for spaces (`festival-makeup`)
- Keep URLs short and descriptive
- Use slugs for readability
- Never use underscores, spaces, or IDs in URLs

---

## Routing Implementation

### React Router Data Mode

**File:** `/routes.ts`

```typescript
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/common/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'portfolio', Component: PortfolioMainPage },
      { path: 'portfolio/category/:slug', Component: PortfolioCategoryPage },
      { path: 'portfolio/tag/:slug', Component: PortfolioTagPage },
      { path: 'portfolio/:slug', Component: PortfolioResolver },
      { path: 'blog', Component: BlogPage },
      { path: 'blog/category/:slug', Component: BlogCategoryPage },
      { path: 'blog/tag/:slug', Component: BlogTagPage },
      { path: 'blog/:slug', Component: BlogPostPageRoute },
      // ... all routes
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
```

**Entry Point:** `/App.tsx`

```tsx
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

### RootLayout

**File:** `/components/common/RootLayout.tsx`

Provides the persistent Header/Footer shell with `<Outlet />` for child page content. All page components render inside the outlet.

---

## SEO & Meta

### Centralised SEO System

**Single Source Utility:** `/utils/seo.ts` exports `setSEO()` which sets `document.title`, `<meta description>`, Open Graph, and Twitter Card tags.

**Single Source Data:** `/data/mock/seo.ts` exports SEO data for all 46 page components.

**Usage:**
```tsx
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';

useEffect(() => {
  setSEO(pageSEO.about);
}, []);
```

**Dynamic pages** use helper functions:
```tsx
import { blogPostSEO } from '../../../data/mock/seo';
setSEO(blogPostSEO(post.title, post.excerpt));
```

### Schema.org Structured Data

**Service:** `/utils/schemaService.ts`

Provides builder functions and inject/cleanup utilities for JSON-LD schemas:

| Schema Type | Pages |
|-------------|-------|
| `WebSite` + `SearchAction` | HomePage |
| `Person` | HomePage, AboutPage |
| `BlogPosting` | BlogPostPage |
| `VideoObject` | VideoDetailPage |
| `PodcastEpisode` | PodcastDetailPage |
| `VisualArtwork` | PortfolioDetailPage |
| `ImageGallery` | PortfolioMainPage |
| `CollectionPage` | All archive/listing pages (8 taxonomy + 3 main listings) |
| `BreadcrumbList` | All pages with Breadcrumbs component (automatic) |
| `FAQPage` | All pages with FaqSection component (automatic) |

---

## Breadcrumbs

### Single Source Component

**Component:** `/components/ui/Breadcrumbs.tsx`
**CSS:** `/styles/blocks/breadcrumbs.css` (imported by the component)

**Rules:**
- All breadcrumbs MUST use this single component
- Never create inline breadcrumb markup
- Never render `<Breadcrumbs>` more than once per page
- Last item has no `href` (renders as plain text with `aria-current="page"`)
- Schema.org BreadcrumbList JSON-LD is injected automatically

**Pattern:**

```tsx
import { Breadcrumbs } from '../../ui/Breadcrumbs';

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Developer Tools', href: '/dev-tools' },
  { label: 'Typography Specimens' },
]} />
```

### Coverage

All sub-pages and dev-tools pages include breadcrumbs. Main landing pages (Home, Portfolio, Blog, Videos, Podcasts) do not use breadcrumbs since they are top-level.

**Dev-Tools pattern:** `Home > Developer Tools > {Page Name}`
**Taxonomy pattern:** `Home > {Section} > {Category/Tag Name}`
**Detail pattern:** `Home > {Section} > {Item Title}`

---

## Navigation Components

### Header Component

**File:** `/components/common/Header.tsx`

Features:
- Logo (links to home)
- Primary navigation from `/data/mock/ui/navigation.ts`
- Mobile hamburger menu toggle
- Active page highlighting via React Router
- Sticky positioning with BEM classes

### Mobile Menu Component

**File:** `/components/common/MobileMenu.tsx`

Features:
- Full-screen overlay with CSS animation (no motion/react)
- Touch-friendly buttons (min 44px targets)
- Close on navigation, close button, or escape key
- Same menu items as desktop navigation
- `prefers-reduced-motion` support

### Scroll to Top

**File:** `/components/ui/ScrollToTop.tsx`

Features:
- Floating button (bottom-right)
- Appears after scrolling past threshold
- Smooth scroll animation
- WCAG-accessible with ARIA label

---

**Last Updated:** February 2026
**Maintained by:** Ash Shaw Portfolio Team