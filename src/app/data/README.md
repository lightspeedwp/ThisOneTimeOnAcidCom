# 📦 Mock Data System Architecture

**Version:** 3.0.0
**Last Updated:** March 2, 2026
**Scope:** Centralized Data Layer

This project uses a centralized mock data system to serve as the **single source of truth** for all application content. This architecture ensures type safety, maintainability, and seamless integration with Headless WordPress.

**Core Philosophy:**
- **Decoupled Content:** No hardcoded strings in components.
- **Type Safety:** All data follows strict TypeScript interfaces.
- **Centralized UI Text:** Labels, error messages, and button text are stored in `data/mock/ui/`.
- **WordPress Fallback:** The mock data serves as a robust fallback when the CMS is unavailable or during development.

---

## 📊 Content Counts (v8.1.0)

| Content Type | Count | Data File(s) |
|---|---|---|
| **Portfolio entries** | 42 | `portfolio/featured.ts`, `uv-makeup.ts`, `festivals.ts`, `thailand.ts`, `nail-art.ts`, `swiss-festivals.ts`, `editorial.ts` |
| **Blog posts** | 18 | `blog/posts.ts` |
| **Videos** | 11 | `videos/entries.ts` |
| **Sticker designs** | 40 | `images/sticker-graphics.ts` |
| **Podcast episodes** | 6 | `podcasts/episodes.ts` |
| **Events** | 1 | `events/origin-festival.ts` |
| **Testimonials** | varies | `testimonials/index.ts` |
| **Ebook pages** | 82 | `pages/ebook-pages.ts` |

---

## 📂 Directory Structure

```
/data/
├── mock/                          # Centralized mock data
│   ├── blog/                      # Blog content (18 posts)
│   │   ├── categories.ts          # Blog categories (5 categories)
│   │   ├── posts.ts               # Blog posts with rich content
│   │   ├── tags.ts                # Blog tags
│   │   └── index.ts               # Barrel export for blog data
│   │
│   ├── events/                    # Events system
│   │   ├── origin-festival.ts     # Origin Festival event data
│   │   ├── categories.ts          # Event categories
│   │   └── index.ts               # Barrel export + helper functions
│   │
│   ├── feedback/                  # Feedback/testimonials
│   │   └── index.ts               # Testimonial data
│   │
│   ├── images/                    # Asset management
│   │   ├── hero-images.ts         # Hero image collections
│   │   ├── sticker-graphics.ts    # Sticker designs (40 entries)
│   │   └── index.ts               # Barrel export for images
│   │
│   ├── pages/                     # Page-specific content
│   │   ├── home.ts                # Homepage hero, why section
│   │   ├── about.ts               # About page narrative
│   │   ├── about-landing.ts       # About landing (HiddenAboutPage)
│   │   ├── about-subpages.ts      # About sub-page content
│   │   ├── accessibility.ts       # Accessibility statement
│   │   ├── artistry.ts            # Artistry page
│   │   ├── blog.ts                # Blog page content + authorBio
│   │   ├── contact.ts             # Contact page content
│   │   ├── ebook-pages.ts         # Ebook (82 pages, 20 chapters, 2 appendices)
│   │   ├── events.ts              # Events page content
│   │   ├── festival.ts            # Festival landing content
│   │   ├── gear.ts                # Gear/toolkit content
│   │   ├── hidden-about.ts        # Hidden about gateway
│   │   ├── history.ts             # History page content
│   │   ├── legal.ts               # Legal pages (privacy, terms)
│   │   ├── manifesto.ts           # Manifesto content
│   │   ├── portfolio.ts           # Portfolio page structure
│   │   ├── press.ts               # Press kit content
│   │   ├── six-cats.ts            # Six Cats page content
│   │   ├── tribes.ts              # Tribes page content
│   │   └── index.ts               # Barrel export for pages
│   │
│   ├── podcasts/                  # Podcast system (6 episodes)
│   │   ├── categories.ts          # Podcast categories
│   │   ├── episodes.ts            # Podcast episodes
│   │   ├── tags.ts                # Podcast tags
│   │   └── index.ts               # Barrel export
│   │
│   ├── portfolio/                 # Portfolio entries (42 total)
│   │   ├── featured.ts            # Featured homepage work (3 entries)
│   │   ├── uv-makeup.ts           # UV makeup collection (11 entries: 6 original + 5 Berlin clubs)
│   │   ├── festivals.ts           # Festival makeup collection (11 entries: 2 original + 9 international)
│   │   ├── thailand.ts            # Thailand collection (5 entries: 4 original + 1 Chiang Mai)
│   │   ├── nail-art.ts            # Nail art portfolio (3 entries)
│   │   ├── swiss-festivals.ts     # Swiss festival collection (6 entries)
│   │   ├── editorial.ts           # Editorial & experimental (3 entries) — NEW Phase 6
│   │   ├── categories.ts          # Portfolio categories
│   │   ├── tags.ts                # Portfolio tags
│   │   └── index.ts               # Barrel export + allPortfolioWork + portfolioSections
│   │
│   ├── sections/                  # Section-specific data
│   │   ├── countdown.ts           # Festival countdown data
│   │   ├── faq.ts                 # FAQ section data
│   │   └── index.ts               # Barrel export
│   │
│   ├── seo.ts                     # Centralised SEO metadata (46 pages)
│   │
│   ├── testimonials/              # Testimonials
│   │   └── index.ts               # Testimonial entries
│   │
│   ├── ui/                        # UI labels and text (20+ files)
│   │   ├── about-dropdown.ts      # About dropdown UI
│   │   ├── about.ts               # About page UI strings
│   │   ├── accessibility-tester.ts # Accessibility tester UI
│   │   ├── analytics-dashboard.ts # Analytics dashboard UI
│   │   ├── blog.ts                # Blog page UI strings
│   │   ├── branding.ts            # Logo and brand text
│   │   ├── breadcrumbs.ts         # Breadcrumb labels
│   │   ├── code-quality.ts        # Code quality page UI
│   │   ├── component-api.ts       # Component API page UI
│   │   ├── component-showcase.ts  # Component showcase UI
│   │   ├── contact.ts             # Contact page UI strings
│   │   ├── countdown.ts           # Countdown UI
│   │   ├── deployment-readiness.ts # Deployment page UI
│   │   ├── design-tokens-ref.ts   # Design tokens page UI
│   │   ├── dev-tools.ts           # Dev tools page UI
│   │   ├── ebook.ts               # Ebook UI
│   │   ├── error.ts               # Error messages
│   │   ├── events.ts              # Events page UI
│   │   ├── faq.ts                 # FAQ UI
│   │   ├── feedback.ts            # Feedback page UI
│   │   ├── filters.ts             # Archive filter UI
│   │   ├── footer.ts              # Footer content
│   │   ├── home.ts                # Homepage UI strings
│   │   ├── icon-library.ts        # Icon library UI
│   │   ├── instagram.ts           # Instagram feed UI
│   │   ├── navigation.ts          # Menu items
│   │   ├── performance-tester.ts  # Performance tester UI
│   │   ├── podcasts.ts            # Podcasts page UI
│   │   ├── portfolio.ts           # Portfolio page UI strings
│   │   ├── search.ts              # Search page UI
│   │   ├── sitemap.ts             # Sitemap page UI
│   │   ├── snippet-generator.ts   # Snippet generator UI
│   │   ├── social-links.ts        # Social media data
│   │   ├── stickers.ts            # Stickers page UI + theme map
│   │   ├── style-guide.ts         # Style guide UI
│   │   ├── videos.ts              # Videos page UI
│   │   └── index.ts               # Barrel export
│   │
│   ├── videos/                    # Video system (11 entries)
│   │   ├── categories.ts          # Video categories
│   │   ├── entries.ts             # Video entries
│   │   ├── tags.ts                # Video tags
│   │   └── index.ts               # Barrel export
│   │
│   └── index.ts                   # Master barrel export
│
└── types/                         # TypeScript definitions
    ├── blog.ts                    # Blog interfaces
    ├── events.ts                  # Event interfaces
    ├── index.ts                   # Barrel export
    ├── page.ts                    # Page content interfaces
    ├── podcast.ts                 # Podcast interfaces
    ├── portfolio.ts               # Portfolio interfaces
    ├── search.ts                  # Search interfaces
    └── videos.ts                  # Video interfaces
```

---

## 🛠️ Usage Patterns

### 1. UI Text & Labels
Use `data/mock/ui/*` for button text, headers, empty states, and error messages.

**Example (Component):**
```tsx
import { portfolioUI } from '@/data/mock/ui/portfolio';

export function PortfolioSection() {
  return (
    <section>
      <h2>{portfolioUI.listing.header.title}</h2>
      <p>{portfolioUI.listing.header.description}</p>
      {/* ... */}
      <button>{portfolioUI.listing.empty.action}</button>
    </section>
  );
}
```

### 2. Page Content (with Fallback)
Use `data/mock/pages/*` combined with CMS hooks for robust content loading.

**Example (Page):**
```tsx
import { aboutHero } from '@/data/mock/pages/about';
import { useContent } from '@/hooks/useContent';

export function AboutPage() {
  const { data } = useContent('about');
  
  // Use CMS data if available, otherwise fallback to mock
  const title = data ? data.hero.title : aboutHero.title;
  
  return <Hero title={title} />;
}
```

### 3. Portfolio & Blog Data
Use utility functions from `data/mock/blog` and `data/mock/portfolio` to access content.

**Example (Data Access):**
```tsx
import { getPortfolioEntryById } from '@/utils/portfolioService'; // Abstraction layer
// OR directly
import { featuredWork } from '@/data/mock/portfolio/featured';
```

### 4. Portfolio Sections
The portfolio index aggregates all entries and organises them into display sections.

**Example (Portfolio Sections):**
```tsx
import { allPortfolioWork, portfolioSections } from '@/data/mock/portfolio';

// allPortfolioWork — flat array of all 42 entries
// portfolioSections — ordered array of section objects:
//   1. Featured (3 entries)
//   2. UV Makeup (11 entries)
//   3. Festivals (11 entries)
//   4. Thailand (5 entries)
//   5. Nail Art (3 entries)
//   6. Swiss Festivals (6 entries)
//   7. Editorial & experimental (3 entries) — NEW Phase 6
```

---

## 📝 Adding New Data

### Step 1: Define TypeScript Interface

```typescript
// /data/types/your-type.ts
export interface YourDataType {
  id: string;
  title: string;
  // ... other fields
}
```

### Step 2: Create Mock Data File

```typescript
// /data/mock/your-category/your-data.ts
import { YourDataType } from '../../types';

export const yourData: YourDataType[] = [
  {
    id: 'example-1',
    title: 'Example Title',
    // ... other fields
  }
];
```

### Step 3: Export from Barrel

```typescript
// /data/mock/your-category/index.ts
export * from './your-data';

// /data/mock/index.ts
export * from './your-category';
```

---

## 🎯 Best Practices

### 1. Keep Data Semantic

❌ **Don't include styling in data:**
```typescript
{
  title: "Example",
  className: "text-xl font-bold" // ❌ No!
}
```

✅ **Use semantic properties:**
```typescript
{
  title: "Example",
  position: "center", // ✅ Yes!
  featured: true
}
```

### 2. Use Descriptive IDs

❌ **Generic IDs:**
```typescript
{ id: '1', title: 'Work' }
```

✅ **Descriptive IDs:**
```typescript
{ id: 'festival-eye-art', title: 'Festival eye art' }
```

### 3. Use TypeScript Interfaces

Always import and use defined types:
```typescript
import { PortfolioEntry } from '@/data/types';

export const myWork: PortfolioEntry[] = [
  // TypeScript will enforce the correct structure
];
```

### 4. Use Sentence Case for All Titles

All titles, labels, and headings must use sentence case (capitalise only the first word and proper nouns):
```typescript
// ✅ Correct
{ title: 'Neon architecture series 1' }
{ title: 'Berlin called, I answered' }

// ❌ Wrong
{ title: 'Neon Architecture Series 1' }
{ title: 'Berlin Called, I Answered' }
```

### 5. Use CSS Variables for Colors

Category colors must use CSS variable strings, not raw hex:
```typescript
// ✅ Correct
{ color: 'var(--wp--preset--color--neon-pink)' }

// ❌ Wrong
{ color: '#FF10F0' }
```

---

## 🎨 Theme Support

The data files support light and dark mode values where applicable, particularly for gradients and specific color tokens passed to components.

Ensure any new data structures added consider how they will be rendered in both light and dark modes by the consuming components.
