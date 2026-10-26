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
  preset?: 'sticker' | 'thumbnail' | 'content' | 'hero' | 'gallery' | 'lightbox';
  width?: number;        // Fixed width (px)
  height?: number;       // Fixed height (px)
  className?: string;    // Additional CSS classes
  loading?: 'lazy' | 'eager'; // Native loading attribute (default: 'lazy'); use 'eager' for critical images
  maxWidth?: number;     // Maximum optimised width (px)
  maxHeight?: number;    // Maximum optimised height (px)
  quality?: number;      // Compression quality (0–1)
  format?: 'image/webp' | 'image/jpeg' | 'image/png';
}
```

### Preset Maximum Widths

Presets limit output width while preserving aspect ratio; they do not set a fixed height.

| Preset | Maximum Width | Use Case |
|--------|---------------|----------|
| `sticker` | 320px | Small decorative graphics |
| `thumbnail` | 480px | Thumbnails and cards |
| `content` | 800px | Standard content images |
| `hero` | 1440px | Homepage hero, full-width banner |
| `gallery` | 1200px | Gallery grid, expanded view |
| `lightbox` | 1920px | Full-screen lightbox |

### Usage Example

```jsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export default function Portfolio() {
  return (
    <OptimizedImage
      src="/images/festival-photo.jpg"
      alt="Koh Phangan Festival makeup"
      preset="content"
      loading="lazy"
    />
  );
}
```

### useOptimizedImage Hook

For advanced use cases, use the `useOptimizedImage` hook to manage image loading state:

```typescript
const { src, loading, error, result } = useOptimizedImage(imageSrc);
```

**Hook returns:**
- `src`: Optimised image URL, or the original source while loading or after an error
- `loading`: Boolean indicating whether optimisation is in progress
- `error`: Boolean indicating whether optimisation failed
- `result`: Full optimisation result, or `null` while loading or after an error; also `null` when optimisation is skipped

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

