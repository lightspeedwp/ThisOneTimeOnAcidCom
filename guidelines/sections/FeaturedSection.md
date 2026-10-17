# FeaturedSection

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The FeaturedSection is a **content showcase area** that displays curated portfolio work. It combines:
- Portfolio card grid layout
- Interactive image sliders
- Lightbox functionality for full-screen viewing
- Integration with portfolio service
- Gradient background for visual appeal

---

## Section Structure

```tsx
<section className="[container-styles]">
  {/* Content Container */}
  <div className="[max-width-container]">
    {/* Section Header */}
    <div className="[header-styles]">
      <h2>{/* Section title */}</h2>
      <p>{/* Section description */}</p>
    </div>
    
    {/* Grid */}
    <div className="[grid-layout]">
      {entries.map(entry => (
        <SliderCard 
          key={entry.id}
          entry={entry}
          onImageClick={openLightbox}
        />
      ))}
    </div>
    
    {/* View More Button */}
    <div className="[button-container]">
      <button onClick={navigateToPortfolio}>
        View Full Portfolio
      </button>
    </div>
  </div>
  
  {/* Lightbox Modal */}
  <EnhancedLightbox {...lightboxProps} />
</section>
```

---

## Container Styles

### Section Container
```tsx
className="
  bg-gradient-to-br from-pink-100 to-purple-100   // Brand gradient background
  py-section                                       // clamp(3rem, 6vw + 1rem, 8rem)
  px-fluid-md                                      // clamp(1rem, 0.6rem + 2vw, 2rem)
"
```

### Inner Container
```tsx
className="
  max-w-7xl                                        // 1280px max-width
  mx-auto                                          // Center horizontally
"
```

### Section Header
```tsx
className="
  text-center                                      // Center alignment
  mb-fluid-2xl                                     // clamp(3rem, 1.5rem + 7.5vw, 6rem)
"
```

### Grid Layout
```tsx
className="
  grid                                             // CSS Grid
  grid-cols-1                                      // Single column mobile
  md:grid-cols-2                                   // Two columns tablet+
  lg:grid-cols-3                                   // Three columns desktop
  gap-fluid-lg                                     // clamp(1.5rem, 1rem + 2.5vw, 3rem)
  mb-fluid-xl                                      // Margin below grid
"
```

---

## Visual Elements

### 1. Section Header

#### Section Title (H2)
```tsx
<h2 className="
  text-section-h2                                  // clamp(1.5rem, 4vw, 3rem)
  font-heading                                     // Playfair Display
  font-bold 
  text-gray-800
  mb-fluid-md
">
  Featured Work
</h2>
```

#### Section Description
```tsx
<p className="
  text-body-guideline                              // clamp(1rem, 1.5vw, 1.25rem)
  text-gray-600 
  max-w-2xl                                        // 672px max-width
  mx-auto
">
  Explore my latest makeup artistry from festivals, events, and creative collaborations.
</p>
```

---

### 2. Portfolio Grid

The grid displays **SliderCard** components for each portfolio entry:

#### SliderCard Integration
```tsx
<SliderCard
  key={entry.id}
  entry={entry}                                    // Portfolio data object
  onImageClick={(images, index, title, desc) =>
    openLightbox(images, index, title, desc)
  }
  layoutMode="grid"                                // Grid layout mode
/>
```

**SliderCard Features:**
- Aspect-square image container
- Multiple image slider with navigation
- Category badge overlay
- Title and description
- Click to open lightbox
- Hover effects with scale transform

---

### 3. View More Button

#### Button Container
```tsx
<div className="
  text-center                                      // Center button
  mt-fluid-xl                                      // Top margin
">
```

#### CTA Button
```tsx
<button
  onClick={() => setCurrentPage('portfolio')}
  className="
    w-full sm:w-auto                               // Full width mobile
    bg-gradient-pink-purple-blue                   // Brand gradient
    hover:from-purple-700 hover:to-pink-700        // Hover gradient shift
    text-white 
    px-button                                      // clamp(1.5rem, 1rem + 2.5vw, 3rem)
    py-button                                      // clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem)
    font-body 
    font-medium 
    text-button-fluid                              // clamp(1rem, 0.9rem + 0.5vw, 1.25rem)
    transition-all duration-300 
    rounded-lg 
    shadow-lg hover:shadow-xl 
    transform hover:scale-105 
    focus:outline-none 
    focus:ring-4 focus:ring-pink-200 
    focus:ring-opacity-50
  "
>
  View Full Portfolio
</button>
```

---

## Data Integration

### Portfolio Service

```tsx
import { getFeaturedPortfolioEntries } from "../../utils/portfolioService";

// Get featured entries (static data)
const featuredEntries = useMemo(() => {
  return getFeaturedPortfolioEntries();
}, []);
```

### Portfolio Entry Structure

```typescript
interface UnifiedPortfolioEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    description?: string;
  }>;
  featured: boolean;
  event?: string;
  location?: string;
  date?: string;
}
```

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column grid (`grid-cols-1`)
- Full-width cards
- Stack vertically with consistent spacing
- Full-width CTA button

### Tablet (768px - 1024px)
- Two column grid (`md:grid-cols-2`)
- Cards maintain aspect ratio
- Responsive padding and gaps
- Button auto-width

### Desktop (1024px+)
- Three column grid (`lg:grid-cols-3`)
- Maximum container width (1280px)
- Larger spacing between cards
- Hover effects active

---

## Interactive Features

### 1. Lightbox Integration

State management for lightbox modal:

```tsx
const [lightbox, setLightbox] = useState({
  isOpen: false,
  images: [],
  currentIndex: 0,
  title: "",
  description: "",
});

const openLightbox = (images, currentIndex, title, description) => {
  setLightbox({
    isOpen: true,
    images,
    currentIndex,
    title,
    description,
  });
};

const closeLightbox = () => {
  setLightbox({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
    description: "",
  });
};
```

### 2. Navigation

Navigate to full portfolio page:

```tsx
const handleViewPortfolio = () => {
  setCurrentPage('portfolio');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### 3. Card Interactions

Each SliderCard has:
- Image slider with dot navigation
- Click to open lightbox
- Hover scale transform
- Focus ring for keyboard navigation

---

## Accessibility

### Semantic HTML
```tsx
<section aria-labelledby="featured-heading">
  <h2 id="featured-heading">Featured Work</h2>
  {/* Content */}
</section>
```

### ARIA Labels
```tsx
// SliderCard images
<img 
  src={image.src}
  alt={image.alt}
  aria-label={`View ${entry.title} in lightbox`}
/>

// Navigation button
<button
  onClick={handleViewPortfolio}
  aria-label="View full portfolio page"
>
  View Full Portfolio
</button>
```

### Keyboard Navigation
- Tab through cards
- Enter/Space to open lightbox
- Arrow keys in slider navigation
- Escape to close lightbox

---

## Typography Scale

| Element | Class | Size (Mobile → Desktop) |
|---------|-------|------------------------|
| Section Title | `text-section-h2` | 24px → 48px |
| Description | `text-body-guideline` | 16px → 20px |
| Button Text | `text-button-fluid` | 16px → 20px |

---

## Color Palette

### Background
```css
bg-gradient-to-br from-pink-100 to-purple-100
```

### Text Colors
```css
text-gray-800                      /* Section title */
text-gray-600                      /* Description */
text-white                         /* Button text */
```

### Button Gradient
```css
bg-gradient-pink-purple-blue                     /* Default */
hover:from-purple-700 hover:to-pink-700          /* Hover state */
```

### Focus Ring
```css
focus:ring-pink-200                              /* Focus indicator */
```

---

## Best Practices

### 1. Data Loading
```tsx
// ✅ Use memoized data
const featuredEntries = useMemo(() => {
  return getFeaturedPortfolioEntries();
}, []);

// ✅ Handle empty state
{featuredEntries.length === 0 && (
  <p className="text-center text-gray-600">
    No featured work available.
  </p>
)}
```

### 2. Grid Layout
```tsx
// ✅ Responsive grid columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// ✅ Consistent gap
className="gap-fluid-lg"
```

### 3. Performance
```tsx
// ✅ Lazy load lightbox
{lightbox.isOpen && (
  <EnhancedLightbox
    isOpen={lightbox.isOpen}
    images={lightbox.images}
    currentIndex={lightbox.currentIndex}
    onClose={closeLightbox}
    title={lightbox.title}
    description={lightbox.description}
  />
)}
```

### 4. Consistent Spacing
```tsx
// ✅ Use fluid spacing tokens
py-section                         // Section padding
mb-fluid-2xl                       // Header margin
gap-fluid-lg                       // Grid gap
mt-fluid-xl                        // Button margin
```

---

## WordPress Comparison

### WordPress `core/query` Block
```html
<!-- wp:query -->
<div class="wp-block-query">
  <div class="wp-block-post-template">
    <!-- wp:post-featured-image /-->
    <!-- wp:post-title /-->
    <!-- wp:post-excerpt /-->
  </div>
</div>
<!-- /wp:query -->
```

### Ash Shaw FeaturedSection
```tsx
<section className="bg-gradient-to-br from-pink-100 to-purple-100 py-section px-fluid-md">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-fluid-2xl">
      <h2>Featured Work</h2>
      <p>Description</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
      {entries.map(entry => <SliderCard {...entry} />)}
    </div>
  </div>
</section>
```

---

## Related Documentation

- **[overview-sections.md](../overview-sections.md)** - Section system overview
- **[SliderCard.md](../components/SliderCard.md)** - Card component details
- **[Lightbox.md](../blocks/Lightbox.md)** - Lightbox modal (EnhancedLightbox component)
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing tokens

---

**Last Updated:** January 2025  
**Version:** 4.0.0