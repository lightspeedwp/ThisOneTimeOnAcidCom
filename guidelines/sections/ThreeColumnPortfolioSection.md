# ThreeColumnPortfolioSection

**Version:** 4.0.0  
**Last Updated:** January 2025

Portfolio gallery grid with three-column responsive layout.

**File:** `/components/sections/ThreeColumnPortfolioSection.tsx`  
**WordPress Equivalent:** `core/gallery` or `core/columns` with images  
**Used In:** PortfolioMainPage

---

## Purpose

The ThreeColumnPortfolioSection is a **gallery display area** for portfolio entries. It combines:
- Three-column responsive grid
- Portfolio card components
- Category filtering
- Layout switcher (grid/list)
- Lightbox integration

---

## Container Styles

### Section Container
```tsx
className="
  py-section                                       // clamp(3rem, 6vw + 1rem, 8rem)
  px-fluid-md                                      // clamp(1rem, 0.6rem + 2vw, 2rem)
  bg-gray-50                                       // Subtle background
"
```

### Grid Layout
```tsx
className="
  grid                                             // CSS Grid
  grid-cols-1                                      // Single column mobile
  sm:grid-cols-2                                   // Two columns tablet
  lg:grid-cols-3                                   // Three columns desktop
  gap-fluid-lg                                     // clamp(1.5rem, 1rem + 2.5vw, 3rem)
"
```

---

## Visual Elements

### Portfolio Cards

Each portfolio entry displays as a card:

```tsx
<PortfolioCard
  entry={entry}
  onClick={() => openLightbox(entry)}
  layoutMode={layoutMode}                          // 'grid' or 'list'
/>
```

**Card Features:**
- Featured image with aspect-square ratio
- Title and category overlay
- Event and location metadata
- Click to open lightbox
- Hover effects with scale transform

---

## Responsive Breakpoints

### Mobile (< 640px)
- Single column (`grid-cols-1`)
- Full-width cards
- Vertical spacing

### Tablet (640px - 1024px)
- Two columns (`sm:grid-cols-2`)
- Equal card widths

### Desktop (1024px+)
- Three columns (`lg:grid-cols-3`)
- Maximum container width
- Enhanced hover effects

---

## Related Documentation

- **[overview-sections.md](../overview-sections.md)** - Section system
- **[PortfolioCard.md](../blocks/PortfolioCard.md)** - Card component
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing tokens

---

**Last Updated:** January 2025  
**Version:** 4.0.0