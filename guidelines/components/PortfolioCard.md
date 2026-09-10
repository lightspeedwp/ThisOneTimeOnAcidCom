# PortfolioCard Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Interactive portfolio item card with multi-image slider, category badges, and lightbox integration.

## Purpose

Display portfolio entries with:
- Multi-image carousel with smooth transitions
- Category badges and metadata
- Featured image optimization
- "Read Story" CTA linking to detail page
- Touch gesture support for mobile
- Accessibility compliance
- Hover animations and transitions

---

## 🔗 CMS Integration

This component displays portfolio entries from **Headless WordPress** (or mock data) via the unified `useContent` hook.

### Data Flow

```
Component Request
    ↓
usePortfolioSections() hook
    ↓
useContent facade (Mock or WordPress)
    ↓
Success → CMS Data
Timeout/Error → Mock Data (fallback)
    ↓
PortfolioCard renders with data
```

### Complete Documentation

For complete setup and configuration:

- **[CMS Field Mapping](../../docs/cms-field-mapping.md)** - WordPress CPT/ACF field mapping
- **[Data System](../../data/README.md)** - Fallback data system
- **[Guidelines.md](../Guidelines.md)** - Main project guidelines

### Usage Pattern with CMS

```typescript
import { portfolioEntries } from '@/data/mock/portfolio';
import { usePortfolioSections } from '@/hooks/useContent';
import { PortfolioCard } from '@/components/ui/PortfolioCard';

export function PortfolioSection() {
  // Fetch CMS data with automatic fallback
  const { sectionData, loading, error } = usePortfolioSections();
  
  // Use CMS data if available, otherwise fallback to mock
  const entries = sectionData ? sectionData.thailand : portfolioEntries.thailand;
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
      {entries.map((entry) => (
        <PortfolioCard 
          key={entry.id} 
          entry={entry}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}
```

### Portfolio Data Sources

**Mock Data (Development/Fallback):**
- ✅ **43 complete portfolio entries**
- ✅ **19 real Figma assets** integrated
- ✅ **6 categories** (Thailand, Festivals, UV Makeup, Nails, Bridal, Editorial)
- ✅ **Rich metadata** (dates, locations, tags)
- ✅ **Located in:** `/data/mock/portfolio/`

**WordPress CMS (Production):**
- ✅ **Dynamic content updates** without code changes
- ✅ **Rich text descriptions** with formatting
- ✅ **Image optimization** via WordPress media library
- ✅ **Draft/published workflow** for content staging
- ✅ **Multi-image support** with ordering

### Data Structure

```typescript
export interface PortfolioEntry {
  id: string;
  title: string;
  description: string;
  category: 'festival' | 'editorial' | 'special-event' | 'nails' | 'thailand' | 'bridal' | 'uv-makeup';
  images: string[];          // Multiple images for carousel
  featuredImage?: string;    // Primary display image
  story?: string;            // Full story text (rich text in CMS)
  date?: string;             // Event/shoot date
  location?: string;         // Location name
  tags?: string[];           // Searchable tags
  featured?: boolean;        // Feature on homepage
}
```

**Type location:** `/data/types/portfolio.ts`

### Import Patterns

```typescript
// Mock data (always available)
import { portfolioEntries, getFeaturedWork } from '@/data/mock/portfolio';

// CMS hook (with automatic fallback)
import { usePortfolioSections } from '@/hooks/useContent';

// Types
import type { PortfolioEntry } from '@/data/types/portfolio';
```

### Benefits

✅ **Works Offline** - Uses mock data when CMS unavailable  
✅ **Fast Development** - No CMS setup required  
✅ **Production Ready** - Seamless CMS integration  
✅ **Type Safe** - Full TypeScript support  
✅ **Real Assets** - 19 actual Figma images  
✅ **SEO Optimized** - Image optimization and metadata

### Utility Functions

```typescript
import { getFeaturedWork, getWorkByCategory } from '@/data/mock/portfolio';

// Get featured portfolio entries
const featured = getFeaturedWork();

// Get entries by category
const thailandWork = getWorkByCategory('thailand');
const festivalWork = getWorkByCategory('festival');
```

**See [CMS Field Mapping](../../docs/cms-field-mapping.md) for complete setup.**

---

## Usage

### Basic Usage

```tsx
import { PortfolioCard } from './components/ui/PortfolioCard';

<PortfolioCard 
  entry={portfolioEntry}
  onClick={handleOpenDetails}
/>
```

### In Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
  {portfolioEntries.map(entry => (
    <PortfolioCard
      key={entry.id}
      entry={entry}
      onClick={handleCardClick}
    />
  ))}
</div>
```

### With Layout Mode

```tsx
<PortfolioCard 
  entry={entry}
  layout="list" // or "grid"
  onClick={handleClick}
/>
```

---

## Props

```typescript
interface PortfolioCardProps {
  /**
   * Portfolio entry data
   * @required
   */
  entry: PortfolioEntry;
  
  /**
   * Click handler for card interaction
   * @required
   */
  onClick: (entry: PortfolioEntry) => void;
  
  /**
   * Layout mode
   * @default "grid"
   */
  layout?: 'grid' | 'list';
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
  
  /**
   * Show category badge
   * @default true
   */
  showCategory?: boolean;
  
  /**
   * Show image count
   * @default true
   */
  showImageCount?: boolean;
}

interface PortfolioEntry {
  id: string;
  title: string;
  description: string;
  category: 'festival' | 'editorial' | 'special-event' | 'nails' | 'thailand' | 'bridal' | 'uv-makeup';
  images: string[];
  featuredImage?: string;
  story?: string;
  date?: string;
  location?: string;
  tags?: string[];
  featured?: boolean;
}
```

---

## Features

### Multi-Image Carousel

```tsx
const [currentImageIndex, setCurrentImageIndex] = useState(0);

const nextImage = () => {
  setCurrentImageIndex((prev) => 
    prev === entry.images.length - 1 ? 0 : prev + 1
  );
};

const previousImage = () => {
  setCurrentImageIndex((prev) => 
    prev === 0 ? entry.images.length - 1 : prev - 1
  );
};
```

### Category Badges

```tsx
const categoryStyles = {
  festival: 'bg-purple-100 text-purple-700',
  editorial: 'bg-pink-100 text-pink-700',
  'special-event': 'bg-blue-100 text-blue-700',
  nails: 'bg-green-100 text-green-700'
};

<span className={`
  inline-flex items-center px-3 py-1 rounded-full 
  text-fluid-sm font-body font-medium
  ${categoryStyles[entry.category]}
`}>
  {entry.category}
</span>
```

### Touch Gesture Support

```tsx
const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);

const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
};

const handleTouchEnd = () => {
  if (touchStart - touchEnd > 50) {
    nextImage();
  }
  if (touchStart - touchEnd < -50) {
    previousImage();
  }
};
```

---

## Implementation Example

Complete portfolio card implementation:

```tsx
import React, { useState } from 'react';
import { CaretLeft, CaretRight, Images } from '@phosphor-icons/react';

interface PortfolioCardProps {
  entry: PortfolioEntry;
  onClick: (entry: PortfolioEntry) => void;
  layout?: 'grid' | 'list';
  className?: string;
}

export function PortfolioCard({ 
  entry, 
  onClick,
  layout = 'grid',
  className = '' 
}: PortfolioCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const categoryStyles = {
    festival: 'bg-purple-100 text-purple-700',
    editorial: 'bg-pink-100 text-pink-700',
    'special-event': 'bg-blue-100 text-blue-700',
    nails: 'bg-green-100 text-green-700'
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === entry.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? entry.images.length - 1 : prev - 1
    );
  };

  const isGridLayout = layout === 'grid';

  return (
    <article
      className={`
        bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden
        border border-white/50 shadow-lg hover:shadow-2xl
        transition-all duration-300
        cursor-pointer group
        ${isGridLayout ? 'flex flex-col' : 'flex flex-col sm:flex-row gap-fluid-md'}
        ${className}
      `}
      onClick={() => onClick(entry)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className={`
        relative overflow-hidden
        ${isGridLayout ? 'aspect-[4/3]' : 'sm:w-1/3 aspect-[4/3] sm:aspect-auto'}
      `}>
        {/* Current Image */}
        <img
          src={entry.images[currentImageIndex]}
          alt={`${entry.title} - Image ${currentImageIndex + 1} of ${entry.images.length}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`
            inline-flex items-center px-3 py-1 rounded-full
            text-fluid-sm font-body font-medium backdrop-blur-sm
            ${categoryStyles[entry.category]}
          `}>
            {entry.category}
          </span>
        </div>
        
        {/* Image Count */}
        {entry.images.length > 1 && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
            <Images className="w-4 h-4 text-white" />
            <span className="text-fluid-sm font-body font-medium text-white">
              {entry.images.length}
            </span>
          </div>
        )}
        
        {/* Navigation Arrows (show on hover if multiple images) */}
        {entry.images.length > 1 && isHovered && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <CaretLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <CaretRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
        
        {/* Image Indicators */}
        {entry.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {entry.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`
                  w-2 h-2 rounded-full transition-all
                  ${index === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/75'
                  }
                `}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className={`
        p-fluid-md flex flex-col
        ${isGridLayout ? '' : 'sm:flex-1'}
      `}>
        <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm group-hover:text-gradient-pink-purple-blue transition-colors">
          {entry.title}
        </h3>
        
        <p className="text-body-guideline font-body text-gray-700 mb-fluid-md line-clamp-3">
          {entry.description}
        </p>
        
        {/* Metadata */}
        {(entry.date || entry.location) && (
          <div className="flex flex-wrap gap-3 text-fluid-sm text-gray-600 mb-fluid-md">
            {entry.date && <span>{entry.date}</span>}
            {entry.date && entry.location && <span>•</span>}
            {entry.location && <span>{entry.location}</span>}
          </div>
        )}
        
        {/* Tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-fluid-md">
            {entry.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-fluid-xs font-body"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* CTA */}
        <button className="mt-auto text-fluid-sm font-body font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1 group/cta">
          <span>Read Story</span>
          <CaretRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
        </button>
      </div>
    </article>
  );
}
```

---

## Layout Variations

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
  {entries.map(entry => (
    <PortfolioCard 
      key={entry.id}
      entry={entry}
      layout="grid"
      onClick={handleClick}
    />
  ))}
</div>
```

### List Layout

```tsx
<div className="flex flex-col gap-fluid-md">
  {entries.map(entry => (
    <PortfolioCard 
      key={entry.id}
      entry={entry}
      layout="list"
      onClick={handleClick}
    />
  ))}
</div>
```

### Masonry Layout

```tsx
<div className="columns-1 md:columns-2 lg:columns-3 gap-fluid-md">
  {entries.map(entry => (
    <div key={entry.id} className="break-inside-avoid mb-fluid-md">
      <PortfolioCard 
        entry={entry}
        onClick={handleClick}
      />
    </div>
  ))}
</div>
```

---

## Accessibility

### Semantic HTML

```tsx
<article 
  role="article"
  aria-label={`Portfolio entry: ${entry.title}`}
>
  <img 
    src={entry.images[0]}
    alt={`${entry.title} - ${entry.category} makeup`}
  />
  
  <h3>{entry.title}</h3>
  <p>{entry.description}</p>
</article>
```

### Keyboard Navigation

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick(entry);
  }
  
  if (e.key === 'ArrowLeft') {
    previousImage(e as any);
  }
  
  if (e.key === 'ArrowRight') {
    nextImage(e as any);
  }
};

<article
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={() => onClick(entry)}
>
  {/* Card content */}
</article>
```

---

## Common Mistakes

### ❌ Mistake 1: No Image Alt Text

```tsx
// ❌ WRONG
<img src={image} />
```

**Solution:**
```tsx
// ✅ CORRECT
<img 
  src={image}
  alt={`${entry.title} - ${entry.category} makeup portfolio`}
/>
```

### ❌ Mistake 2: Missing Loading States

```tsx
// ❌ WRONG - No loading feedback
<img src={entry.images[0]} />
```

**Solution:**
```tsx
// ✅ CORRECT - Lazy loading with placeholder
<img 
  src={entry.images[0]}
  loading="lazy"
  className="bg-gray-100"
/>
```

---

## Related Components

- **[PortfolioLightbox](./PortfolioLightbox.md)** - Full-screen image viewer
- **[LayoutSwitcher](./LayoutSwitcher.md)** - Grid/list toggle
- **[SectionCard](./SectionCard.md)** - Generic content card
- **[BlogCard](./BlogCard.md)** - Blog post card (similar pattern)

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main project guidelines
- **[CMS Field Mapping](../../docs/cms-field-mapping.md)** - CMS setup
- **[Data System](../../data/README.md)** - Mock data system
- **[overview-components.md](../overview-components.md)** - Component architecture
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization

---

**Last Updated:** January 2025  
**Version:** 4.0.0