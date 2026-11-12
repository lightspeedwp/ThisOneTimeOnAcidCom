# Media & Asset Guidelines (N004)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25  
**Part of:** This One Time On Acid Design System

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

Canonical image optimization guidance consolidated from `image-optimization.md`.
The component, presets, and hook below match the current source; the build-time
strategy describes the intended integration and its present limitations.

### Component API

Source: [OptimizedImage.tsx](../src/app/components/ui/OptimizedImage.tsx).
The component accepts native image attributes (including `loading`, `sizes`,
`width`, `height`, and `className`) plus these optimization options:

```typescript
interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  preset?: 'sticker' | 'thumbnail' | 'content' | 'gallery' | 'hero' | 'lightbox';
  width?: number;        // Native image width (px)
  height?: number;       // Native image height (px)
  className?: string;    // Additional CSS classes
  loading?: 'lazy' | 'eager'; // Native loading attribute; default: 'lazy'
  maxWidth?: number;     // Default: preset value, otherwise 1200px
  maxHeight?: number;    // Optional height limit
  quality?: number;      // 0–1; default: preset value, otherwise 0.82
  format?: 'image/webp' | 'image/jpeg' | 'image/png'; // Default: WebP
  showPlaceholder?: boolean; // Default: true
  onOptimized?: (result: OptimizedResult) => void;
}
```

`OptimizedResult` contains `url`, `width`, `height`, `sizeBytes`, and `format`;
see [imageOptimizer.ts](../src/app/utils/imageOptimizer.ts). Explicit optimization
options override preset values. Images are downsized with their aspect ratio
preserved, never enlarged. Use CSS `object-fit: cover` for cropped containers.

### Preset Dimensions

Presets limit output width while preserving aspect ratio; they do not set a fixed height.

All presets use WebP. Source: `IMAGE_PRESETS` in
[imageOptimizer.ts](../src/app/utils/imageOptimizer.ts).

| Preset | Max Width | Quality | Usage |
|--------|-----------|---------|-------|
| `sticker` | 320px | 0.70 | Decorative elements, icons |
| `thumbnail` | 480px | 0.78 | Card thumbnails, avatars |
| `content` | 800px | 0.82 | Inline blog images, standard photos |
| `gallery` | 1200px | 0.88 | Portfolio detail main images |
| `hero` | 1440px | 0.85 | Full-width banners |
| `lightbox` | 1920px | 0.90 | Full-screen viewing |

### Usage Example

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/festival-photo.jpg"
  alt="Koh Phangan Festival makeup"
  preset="content"
  loading="lazy"
/>

<OptimizedImage
  src="/images/hero.jpg"
  alt="Festival makeup detail"
  maxWidth={1440}
  quality={0.85}
  format="image/webp"
  loading="eager"
/>
```

Prefer presets for consistent dimensions and compression. Lazy loading is the
default; use `loading="eager"` for critical LCP images. Provide descriptive alt text.

### useOptimizedImage Hook

Source: [useOptimizedImage.ts](../src/app/hooks/useOptimizedImage.ts).
For an optimized URL (for example, a CSS background), pass the original source
and options as separate arguments:

```tsx
import { useOptimizedImage } from '@/hooks/useOptimizedImage';

const { src, loading, error, result } = useOptimizedImage(rawImage, {
  preset: 'thumbnail'
});
```

The hook accepts the optimization options in `OptimizeOptions`, plus `preset`
and `skip`. It uses the runtime optimizer directly, without the component's
manifest lookup.

**Hook returns:**
- `src`: Optimised image URL, or the original source while loading or after an error
- `loading`: Boolean indicating whether optimisation is in progress
- `error`: Boolean indicating whether optimisation failed
- `result`: Full optimisation result, or `null` while loading or after an error; also `null` when optimisation is skipped

### Optimization Strategy

1. **External URL passthrough:** The component and hook render HTTP(S) URLs
   directly to avoid Canvas CORS failures and double compression.
2. **Build-time manifest lookup:** For local sources with a preset, the component
   first calls `lookupOptimizedAsset` in
   [imageManifest.ts](../src/app/utils/imageManifest.ts). Entries are keyed by
   source asset ID and preset, with `path`, `width`, optional `height`, `size`,
   and `srcSet`. A match supplies the generated asset and optional responsive
   `srcSet`, avoiding Canvas work. The current manifest is empty by default;
   `registerOptimizedAsset` supports manual entries.
3. **Runtime fallback:** Without a manifest match, the component uses the Canvas
   API to resize and export a cached WebP/JPEG/PNG blob URL. This requires client
   CPU and memory and may delay the first render. If optimization fails, it uses
   the original source. The hook also supports explicit bypass with `skip`.

### Build Script Contract

The preserved build-time design is: scan extracted `figma:asset` sources, use
`sharp` to generate preset WebP variants under `public/optimized/`, and produce
source-ID/preset mappings for the manifest utility.

Current source: [optimize-images.ts](../src/app/scripts/optimize-images.ts).
It is a template: asset discovery, processing, and manifest writing are commented
out. Its proposed JSON destination is `utils/imageManifest.json` relative to the
working directory; [imageManifest.ts](../src/app/utils/imageManifest.ts) does not
import that JSON yet. Asset extraction and manifest integration remain required
before build-time generation is available. `npm run optimize-images` was the
original intended command, but [package.json](../package.json) defines no such
script. No automatic generation or manifest update is currently guaranteed.

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

