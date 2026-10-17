# ImageGallery Component

**Version:** 4.0.0  
**Last Updated:** January 2025

Responsive image gallery with multiple layout options and lightbox integration.

## Purpose

Display image collections with:
- Grid, masonry, and justified layouts
- Responsive column counts
- Lazy loading for performance
- Lightbox integration for full-screen viewing
- Hover effects and captions
- Accessibility compliance
- Touch-friendly on mobile

---

## Component Architecture

### Image Gallery Layout Flow (Mermaid)

```mermaid
flowchart TD
    A[ImageGallery Component] --> B[Receive Images Array]
    
    B --> C{Layout Type?}
    
    C -->|grid| D[Grid Layout]
    C -->|masonry| E[Masonry Layout]
    C -->|justified| F[Justified Layout]
    
    D --> D1[CSS Grid<br/>grid-cols-1 md:grid-cols-2 lg:grid-cols-3]
    D --> D2[Equal height rows]
    D --> D3[Fixed aspect ratios]
    
    E --> E1[react-responsive-masonry]
    E --> E2[Variable height items]
    E --> E3[Pinterest-style layout]
    
    F --> F1[Flickr-style justified rows]
    F --> F2[Consistent row heights]
    F --> F3[Variable widths]
    
    D1 --> G[Render Images]
    D2 --> G
    D3 --> G
    E1 --> G
    E2 --> G
    E3 --> G
    F1 --> G
    F2 --> G
    F3 --> G
    
    G --> H[For Each Image]
    
    H --> I[Apply Lazy Loading]
    I --> J[Add Hover Effects]
    J --> K[Add Click Handler]
    K --> L[Render Image Card]
    
    L --> M{User Clicks?}
    
    M -->|Yes| N[onImageClick index]
    M -->|No| O[Display Only]
    
    N --> P[Open Lightbox]
    
    style D fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style E fill:#fce7f3,stroke:#ec4899,stroke-width:2px
    style F fill:#dcfce7,stroke:#22c55e,stroke-width:2px
```

### Responsive Column Breakpoints (Mermaid)

```mermaid
stateDiagram-v2
    [*] --> Mobile: Screen < 768px
    [*] --> Tablet: Screen 768-1023px
    [*] --> Desktop: Screen >= 1024px
    
    Mobile --> Grid1Col: 1 column grid
    Mobile --> Masonry1Col: 1 column masonry
    
    Grid1Col --> GridLayout: grid-cols-1
    Masonry1Col --> MasonryLayout: columnsCount={1}
    
    Tablet --> Grid2Col: 2 columns grid
    Tablet --> Masonry2Col: 2 columns masonry
    
    Grid2Col --> GridLayout: grid-cols-2
    Masonry2Col --> MasonryLayout: columnsCount={2}
    
    Desktop --> Grid3Col: 3 columns grid
    Desktop --> Masonry3Col: 3 columns masonry
    
    Grid3Col --> GridLayout: grid-cols-3
    Masonry3Col --> MasonryLayout: columnsCount={3}
    
    GridLayout --> RenderImages: Apply layout
    MasonryLayout --> RenderImages
    
    note right of Mobile
        Mobile (< 768px):
        - 1 column
        - Full width images
        - Touch-optimized
    end note
    
    note right of Desktop
        Desktop (>= 1024px):
        - 3 columns
        - Optimal viewing
        - Hover effects
    end note
```

### Image Click to Lightbox Flow (Mermaid)

```mermaid
sequenceDiagram
    participant U as User
    participant G as ImageGallery
    participant I as Image Card
    participant P as Parent Component
    participant L as Lightbox
    
    Note over G: Render gallery with 20 images
    G-->>U: Display grid layout
    
    U->>I: Click image #5
    I->>I: Extract index (4, 0-based)
    I->>G: Handle click event
    G->>P: onImageClick(4)
    
    P->>P: setCurrentIndex(4)
    P->>P: setLightboxOpen(true)
    
    P->>L: Render Lightbox
    L->>L: Mount with currentIndex=4
    L->>L: Load image at index 4
    L-->>U: Display full-screen image ✅
    
    U->>L: Click next button
    L->>L: currentIndex + 1 = 5
    L->>L: Load image at index 5
    L-->>U: Display next image ✅
    
    U->>L: Press Escape
    L->>P: onClose()
    P->>P: setLightboxOpen(false)
    P->>L: Unmount Lightbox
    L-->>U: Return to gallery view ✅
```

### Lazy Loading Implementation (Mermaid)

```mermaid
flowchart TD
    A[Image in Gallery] --> B{Is Visible?}
    
    B -->|No| C[IntersectionObserver]
    B -->|Yes| D[Load Image]
    
    C --> E[Monitor scroll position]
    E --> F{Image enters viewport?}
    
    F -->|No| E
    F -->|Yes| G[Trigger load]
    
    G --> D
    
    D --> H[Fetch image from src]
    H --> I{Load Success?}
    
    I -->|Yes| J[Display image]
    I -->|No| K[Show fallback]
    
    J --> L[Fade in animation]
    K --> M[Display placeholder/error]
    
    L --> N[Mark as loaded]
    
    N --> O[Remove observer]
    
    style C fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style J fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style K fill:#fecaca,stroke:#ef4444,stroke-width:2px
```

---

## Usage

### Basic Usage

```tsx
import { ImageGallery } from './components/ui/ImageGallery';

<ImageGallery 
  images={images}
  layout="grid"
/>
```

### With Lightbox

```tsx
const [lightboxOpen, setLightboxOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

<ImageGallery 
  images={images}
  layout="masonry"
  onImageClick={(index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }}
/>

<Lightbox 
  images={images}
  currentIndex={currentIndex}
  isOpen={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
  onNavigate={setCurrentIndex}
/>
```

### Portfolio Gallery

```tsx
<ImageGallery 
  images={portfolioEntry.images}
  layout="grid"
  columns={{ sm: 2, md: 3, lg: 4 }}
  gap="md"
/>
```

---

## Props

```typescript
interface ImageGalleryProps {
  /**
   * Array of image URLs or image objects
   * @required
   */
  images: string[] | GalleryImage[];
  
  /**
   * Gallery layout type
   * @default "grid"
   */
  layout?: 'grid' | 'masonry' | 'justified';
  
  /**
   * Number of columns per breakpoint
   * @default { sm: 1, md: 2, lg: 3 }
   */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  
  /**
   * Gap size between images
   * @default "md"
   */
  gap?: 'sm' | 'md' | 'lg';
  
  /**
   * Image click handler
   * @optional
   */
  onImageClick?: (index: number) => void;
  
  /**
   * Show captions
   * @default false
   */
  showCaptions?: boolean;
  
  /**
   * Enable lazy loading
   * @default true
   */
  lazyLoad?: boolean;
  
  /**
   * Aspect ratio for grid layout
   * @default "square"
   */
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';
  
  /**
   * Additional CSS classes
   * @default ""
   */
  className?: string;
}

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  thumbnail?: string;
}
```

---

## Features

### Layout Types

```tsx
// Grid Layout
const GridLayout = ({ images, columns, gap }: Props) => (
  <div className={`
    grid 
    grid-cols-${columns.sm} 
    md:grid-cols-${columns.md} 
    lg:grid-cols-${columns.lg}
    gap-${gap}
  `}>
    {images.map((image, index) => (
      <ImageItem key={index} image={image} />
    ))}
  </div>
);

// Masonry Layout (CSS columns)
const MasonryLayout = ({ images, columns }: Props) => (
  <div className={`
    columns-${columns.sm}
    md:columns-${columns.md}
    lg:columns-${columns.lg}
  `}>
    {images.map((image, index) => (
      <div key={index} className="break-inside-avoid mb-4">
        <ImageItem image={image} />
      </div>
    ))}
  </div>
);
```

### Lazy Loading

```tsx
<img
  src={image.url}
  alt={image.alt}
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

### Hover Effects

```tsx
<div className="group relative overflow-hidden cursor-pointer">
  <img 
    src={image.url}
    className="transition-transform duration-500 group-hover:scale-110"
  />
  
  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="absolute inset-0 flex items-center justify-center">
      <Expand className="w-8 h-8 text-white" />
    </div>
  </div>
</div>
```

---

## Implementation Example

Complete image gallery implementation:

```tsx
import React from 'react';
import { MagnifyingGlassPlus } from '@phosphor-icons/react';

interface ImageGalleryProps {
  images: string[] | GalleryImage[];
  layout?: 'grid' | 'masonry' | 'justified';
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  onImageClick?: (index: number) => void;
  showCaptions?: boolean;
  lazyLoad?: boolean;
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';
  className?: string;
}

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;

}

export function ImageGallery({ 
  images,
  layout = 'grid',
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'md',
  onImageClick,
  showCaptions = false,
  lazyLoad = true,
  aspectRatio = 'square',
  className = ''
}: ImageGalleryProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    auto: ''
  };

  const normalizedImages: GalleryImage[] = images.map(img => 
    typeof img === 'string' ? { url: img } : img
  );

  // Grid Layout
  if (layout === 'grid') {
    return (
      <div 
        className={`
          grid 
          grid-cols-${columns.sm} 
          md:grid-cols-${columns.md} 
          lg:grid-cols-${columns.lg}
          ${gapClasses[gap]}
          ${className}
        `}
      >
        {normalizedImages.map((image, index) => (
          <div
            key={index}
            className={`
              group relative overflow-hidden rounded-lg
              ${aspectRatioClasses[aspectRatio]}
              ${onImageClick ? 'cursor-pointer' : ''}
            `}
            onClick={() => onImageClick?.(index)}
          >
            <img
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              loading={lazyLoad ? 'lazy' : undefined}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Hover Overlay */}
            {onImageClick && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <MagnifyingGlassPlus className="w-8 h-8 text-white" />
              </div>
            )}
            
            {/* Caption */}
            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-fluid-sm font-body">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Masonry Layout
  if (layout === 'masonry') {
    return (
      <div 
        className={`
          columns-${columns.sm}
          md:columns-${columns.md}
          lg:columns-${columns.lg}
          ${gapClasses[gap]}
          ${className}
        `}
      >
        {normalizedImages.map((image, index) => (
          <div
            key={index}
            className={`
              break-inside-avoid mb-${gap === 'sm' ? '2' : gap === 'md' ? '4' : '6'}
              group relative overflow-hidden rounded-lg
              ${onImageClick ? 'cursor-pointer' : ''}
            `}
            onClick={() => onImageClick?.(index)}
          >
            <img
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              loading={lazyLoad ? 'lazy' : undefined}
              className="w-full transition-transform duration-500 group-hover:scale-105"
            />
            
            {onImageClick && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <MagnifyingGlassPlus className="w-8 h-8 text-white" />
              </div>
            )}
            
            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-fluid-sm font-body">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Justified Layout (flex with varying widths)
  return (
    <div className={`flex flex-wrap ${gapClasses[gap]} ${className}`}>
      {normalizedImages.map((image, index) => (
        <div
          key={index}
          className={`
            flex-grow group relative overflow-hidden rounded-lg
            ${onImageClick ? 'cursor-pointer' : ''}
          `}
          style={{ flexBasis: `${Math.random() * 200 + 200}px` }}
          onClick={() => onImageClick?.(index)}
        >
          <img
            src={image.url}
            alt={image.alt || `Gallery image ${index + 1}`}
            loading={lazyLoad ? 'lazy' : undefined}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {onImageClick && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <MagnifyingGlassPlus className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Usage Patterns

### Portfolio Page Gallery

```tsx
function PortfolioEntry({ entry }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <section className="py-section">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-section-h2 font-heading font-semibold mb-fluid-lg">
          {entry.title}
        </h1>
        
        <ImageGallery 
          images={entry.images}
          layout="masonry"
          columns={{ sm: 1, md: 2, lg: 3 }}
          gap="md"
          onImageClick={(index) => {
            setCurrentIndex(index);
            setLightboxOpen(true);
          }}
        />
      </div>
      
      <Lightbox 
        images={entry.images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
        title={entry.title}
      />
    </section>
  );
}
```

### Instagram-Style Grid

```tsx
<ImageGallery 
  images={instagramImages}
  layout="grid"
  columns={{ sm: 3, md: 3, lg: 3 }}
  gap="sm"
  aspectRatio="square"
  onImageClick={handleImageClick}
/>
```

### Before/After Gallery

```tsx
const beforeAfterImages = [
  { url: '/before1.jpg', caption: 'Before' },
  { url: '/after1.jpg', caption: 'After' },
  { url: '/before2.jpg', caption: 'Before' },
  { url: '/after2.jpg', caption: 'After' }
];

<ImageGallery 
  images={beforeAfterImages}
  layout="grid"
  columns={{ sm: 2, md: 2, lg: 2 }}
  showCaptions={true}
/>
```

### Full-Width Hero Gallery

```tsx
<ImageGallery 
  images={heroImages}
  layout="justified"
  gap="sm"
  className="w-full"
  onImageClick={handleImageClick}
/>
```

---

## Advanced Features

### With Category Filtering

```tsx
function FilteredGallery({ allImages }: Props) {
  const [category, setCategory] = useState('all');
  
  const filteredImages = category === 'all'
    ? allImages
    : allImages.filter(img => img.category === category);
  
  return (
    <>
      <CategoryFilter 
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      
      <ImageGallery 
        images={filteredImages}
        layout="masonry"
      />
    </>
  );
}
```

### With Load More

```tsx
function PaginatedGallery({ images }: Props) {
  const [visibleCount, setVisibleCount] = useState(12);
  const visibleImages = images.slice(0, visibleCount);
  
  return (
    <>
      <ImageGallery images={visibleImages} layout="grid" />
      
      {visibleCount < images.length && (
        <div className="text-center mt-fluid-lg">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="bg-gradient-pink-purple-blue text-white px-button py-button rounded-lg font-body font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
```

### With Skeleton Loading

```tsx
function GalleryWithLoading({ images, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }
  
  return <ImageGallery images={images} />;
}
```

---

## Accessibility

### Semantic HTML

```tsx
<figure>
  <img 
    src={image.url}
    alt={image.alt || `Gallery image ${index + 1}`}
  />
  
  {image.caption && (
    <figcaption>{image.caption}</figcaption>
  )}
</figure>
```

### Keyboard Navigation

```tsx
<div
  tabIndex={0}
  onClick={() => onImageClick(index)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick(index);
    }
  }}
  className="focus:outline-none focus:ring-4 focus:ring-pink-200 rounded-lg"
>
  <img src={image.url} alt={image.alt} />
</div>
```

### ARIA Labels

```tsx
<nav aria-label="Image gallery">
  <div className="grid grid-cols-3 gap-4">
    {images.map((image, index) => (
      <button
        key={index}
        onClick={() => onImageClick(index)}
        aria-label={`View ${image.alt || `image ${index + 1}`} in lightbox`}
      >
        <img src={image.url} alt={image.alt} />
      </button>
    ))}
  </div>
</nav>
```

---

## Common Mistakes

### ❌ Mistake 1: Missing Alt Text

```tsx
// ❌ WRONG
<img src={image} />
```

**Solution:**
```tsx
// ✅ CORRECT
<img 
  src={image}
  alt="Festival makeup with UV accents and glitter"
/>
```

### ❌ Mistake 2: Not Lazy Loading

```tsx
// ❌ WRONG - All images load immediately
<img src={image} />
```

**Solution:**
```tsx
// ✅ CORRECT - Lazy load for performance
<img 
  src={image}
  loading="lazy"
/>
```

### ❌ Mistake 3: Fixed Column Count

```tsx
// ❌ WRONG - Same columns on all screens
<div className="grid grid-cols-4">
```

**Solution:**
```tsx
// ✅ CORRECT - Responsive columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

---

## 🎨 Interactive Mermaid Diagrams

### Mermaid State Diagram (Gallery States)

```mermaid
stateDiagram-v2
    [*] --> Loading: Component mounts
    
    Loading --> LoadingImages: Fetch images
    
    LoadingImages --> Rendering: Images ready
    
    Rendering --> Displayed: Gallery rendered
    
    Displayed --> Filtering: User applies filter
    Displayed --> LayoutSwitch: User toggles layout
    Displayed --> ImageHover: Mouse over image
    Displayed --> ImageClick: User clicks image
    
    Filtering --> ApplyingFilter: Filter by category
    ApplyingFilter --> Displayed: Show filtered images
    
    LayoutSwitch --> TogglingLayout: Grid ↔ Masonry
    TogglingLayout --> Displayed: Layout changed
    
    ImageHover --> ShowingOverlay: Overlay visible
    ShowingOverlay --> Displayed: Mouse out
    
    ImageClick --> OpeningLightbox: Open full view
    OpeningLightbox --> LightboxOpen: Lightbox active
    
    LightboxOpen --> Navigating: Arrow keys / clicks
    LightboxOpen --> Closing: ESC pressed
    
    Navigating --> LightboxOpen: New image displayed
    Closing --> Displayed: Return to gallery
    
    note right of Displayed
        All images visible
        Hover effects active
        Filters applied
    end note
    
    note right of LightboxOpen
        Full-screen mode
        Navigation active
        Focus trapped
    end note
```

### Mermaid Flowchart (Image Loading & Display)

```mermaid
flowchart TD
    A[Gallery Component Mounts] --> B[Load Portfolio Data]
    
    B --> C{Data Source?}
    
    C -->|Contentful CMS| D[Fetch from API]
    C -->|Mock Data| E[Load from /data/mock]
    
    D --> F{API Success?}
    F -->|Yes| G[Transform CMS Data]
    F -->|No/Timeout| E
    
    E --> H[Use Mock Data]
    
    G --> I[Merge Data]
    H --> I
    
    I --> J{Has Filter Active?}
    
    J -->|Yes| K[Filter by Category]
    J -->|No| L[Show All Images]
    
    K --> M[Filtered Image Set]
    L --> N[All Images]
    
    M --> O{Layout Type?}
    N --> O
    
    O -->|Grid| P[CSS Grid Layout]
    O -->|Masonry| Q[Masonry Layout]
    O -->|List| R[List Layout]
    
    P --> S[Render Images]
    Q --> S
    R --> S
    
    S --> T{User Action?}
    
    T -->|Hover| U[Show Overlay]
    T -->|Click| V[Open Lightbox]
    T -->|Filter| K
    T -->|Layout Toggle| O
    
    U --> T
    V --> W[Navigate Images]
    W --> X{Close Lightbox?}
    X -->|Yes| T
    X -->|No| W
    
    style B fill:#e1f5ff,stroke:#01c3cc,stroke-width:2px
    style D fill:#dcfce7,stroke:#22c55e,stroke-width:2px
    style E fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style S fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style V fill:#fecaca,stroke:#ef4444,stroke-width:2px
```

### Mermaid Sequence Diagram (Image Click → Lightbox)

```mermaid
sequenceDiagram
    participant U as User
    participant G as Gallery
    participant I as Image
    participant L as Lightbox
    participant K as Keyboard
    participant B as Body
    
    Note over G: Gallery displayed<br/>All images loaded
    
    U->>I: Click image #3
    I->>G: onClick(index: 3)
    
    G->>L: openLightbox(images, index: 3)
    
    Note over L: Mount lightbox component
    
    L->>B: Lock body scroll
    Note over B: overflow: hidden
    
    L->>L: Trap focus
    L->>L: Load image #3
    
    Note over L: Preload images #2 and #4
    
    L->>U: Display image #3 full-screen
    
    Note over L: Lightbox fully open
    
    U->>K: Press → arrow
    K->>L: Navigate next
    
    L->>L: currentIndex = 4
    L->>L: Load image #4 (preloaded)
    L->>U: Show image #4 instantly ⚡
    
    Note over L: Preload images #3 and #5
    
    U->>K: Press ESC
    K->>L: Close lightbox
    
    L->>L: Release focus trap
    L->>B: Unlock body scroll
    Note over B: overflow: auto
    
    L->>G: Return to gallery
    L->>L: Unmount lightbox
    
    Note over G: Back to gallery<br/>Focus on image #4
```

---

## Related Components

- **[Lightbox](./Lightbox.md)** - Full-screen viewer
- **[PortfolioCard](./PortfolioCard.md)** - Portfolio items
- **[CategoryFilter](./CategoryFilter.md)** - Filtering

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system

---