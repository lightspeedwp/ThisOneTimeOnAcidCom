# Media & Asset Guidelines (N004)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25  
**Part of:** Ash Shaw Makeup Portfolio Design System

---

## Overview

Guidelines for image optimization, responsive images, iconography usage, and asset management across the portfolio site.

---

## Image Optimization

### Format Selection

- **JPEG:** Photographs, complex scenes
- **PNG:** Icons, graphics with transparency
- **WebP:** Modern format, better compression (with fallback)
- **SVG:** Icons, logos, vectors

### Size & Compression

- **Lazy-load:** Images below the fold
- **Responsive images:** Use `srcset` for multiple resolutions
- **Max file size:** 500KB per image (after optimization)
- **Thumbnail:** < 50KB

Reference: `guidelines/media-guidelines.md`

---

## Responsive Images

### Implementation

```html
<img
  src="image-medium.jpg"
  srcset="image-small.jpg 640w,
          image-medium.jpg 1024w,
          image-large.jpg 1536w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Descriptive alt text"
/>
```

---

## OptimizedImage Component

The `OptimizedImage` component provides automatic responsive image optimisation with WebP support, lazy loading, and preset dimensions.

### Component API

```typescript
interface OptimizedImageProps {
  src: string;           // Image source path
  alt: string;           // Accessibility alt text (required)
  preset?: 'hero' | 'portfolio' | 'thumbnail' | 'gallery';
  width?: number;        // Fixed width (px)
  height?: number;       // Fixed height (px)
  className?: string;    // Additional CSS classes
  loading?: 'lazy' | 'eager';  // Native loading attribute (default: 'lazy')
}
```

### Preset Dimensions

| Preset | Width | Height | Use Case |
|--------|-------|--------|----------|
| `hero` | 1920px | 600px | Homepage hero, full-width banner |
| `portfolio` | 800px | 600px | Portfolio card, gallery display |
| `thumbnail` | 300px | 300px | Small previews, icon-sized images |
| `gallery` | 1200px | 800px | Gallery grid, expanded view |

### Usage Example

```jsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export default function Portfolio() {
  return (
    <OptimizedImage
      src="/images/festival-photo.jpg"
      alt="Koh Phangan Festival makeup"
      preset="portfolio"
      loading="lazy"
    />
  );
}
```

### useOptimizedImage Hook

For advanced use cases, use the `useOptimizedImage` hook to manage image loading state:

```typescript
const { src, loading, error, result } = useOptimizedImage({ assetPath: 'toa-heroImage1' });
```

**Hook returns:**
- `src`: String containing the optimised image URL (available when loaded)
- `loading`: Boolean indicating if image is currently loading
- `error`: Boolean indicating if loading failed
- `result`: ImageExportResult object with full metadata (dimensions, format, etc.)

---

## Iconography

### Icon Sets

**Interface Icons** (`guidelines/media-guidelines.md`)
- Navigation, UI controls, status

**Travel & Portfolio Icons** (`guidelines/media-guidelines.md`)
- Festival locations, travel themes

### Usage Rules

- Minimum size: 16px
- Color: Semantic or inherited
- Dark mode: Ensure visibility in both modes

---

## Asset Management

- Store in `/public/assets/`
- Use descriptive names
- Version control for SVGs
- CDN delivery for large files

---

## Consolidated G-Document References

This N-document (N004) consolidates content from and maintains cross-references to the following G-documents per the guidelines refactor (Specification 003):

- **Guidelines Preserved (Type 2 Consolidation):** Old files consolidated here
  - `guidelines/media-guidelines.md` → content integrated
  - `guidelines/media-guidelines.md` → reference maintained
  - `guidelines/media-guidelines.md` → reference maintained

All original files accessible as pointers to this canonical reference.

---

**Last Updated:** 2026-10-25  
**Canonical Reference:** Yes  
**N-Document ID:** N004 (Specification 003 - Guidelines Refactor)

