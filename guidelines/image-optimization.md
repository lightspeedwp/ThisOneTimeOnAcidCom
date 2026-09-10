# Image Optimization System

**Version:** 1.0.0
**Created:** February 2026

The Ash Shaw Portfolio uses a hybrid image optimization strategy designed for a static environment (Figma Make/Netlify) where server-side image processing (like Next.js Image Optimization) is unavailable at runtime.

The system combines **build-time asset generation** with **client-side runtime optimization** as a fallback.

---

## 1. Components & Utilities

### `<OptimizedImage>` Component

The primary interface for rendering images. It is a drop-in replacement for `<img>`.

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

// Basic usage with preset (recommended)
<OptimizedImage 
  src={myImage} 
  alt="Description" 
  preset="thumbnail" 
/>

// Manual configuration
<OptimizedImage 
  src={heroImg} 
  alt="Hero" 
  maxWidth={1440} 
  quality={0.85} 
  format="image/webp" 
/>
```

### Presets

Presets define standard sizes and compression levels for different contexts. Using presets ensures consistency and simplifies usage.

| Preset | Max Width | Quality | Usage |
|--------|-----------|---------|-------|
| `sticker` | 320px | 0.70 | Decorative elements, icons |
| `thumbnail` | 480px | 0.78 | Card thumbnails, avatars |
| `content` | 800px | 0.82 | Inline blog images, standard photos |
| `gallery` | 1200px | 0.88 | Portfolio detail main images |
| `hero` | 1440px | 0.85 | Full-width banners |
| `lightbox` | 1920px | 0.90 | Full-screen viewing |

### Hook: `useOptimizedImage`

For cases where you need an optimized URL string (e.g., `background-image` in CSS), use the hook.

```tsx
const { src, loading } = useOptimizedImage({ 
  src: rawImage, 
  preset: 'thumbnail' 
});

return <div style={{ backgroundImage: `url(${src})` }} />;
```

---

## 2. Optimization Strategy

### Priority 1: Build-Time Optimization (Manifest Lookup)

At build time (or via `npm run optimize-images`), the project scans for assets and generates optimized WebP variants. These are cataloged in `/utils/imageManifest.ts`.

When `<OptimizedImage>` mounts:
1. It checks the manifest for a matching entry (Src + Preset).
2. If found, it immediately uses the pre-generated asset path.
3. It applies `srcSet` attributes if available for responsive sizing.
4. **Pros:** Instant loading, zero runtime CPU cost, optimal caching.

### Priority 2: Runtime Optimization (Canvas API)

If no pre-optimized asset is found (e.g., dynamic content, missing manifest entry):
1. The component loads the original image into an HTML5 Canvas.
2. It resizes the image to the target dimensions.
3. It exports a `blob:` URL (WebP or JPEG).
4. **Pros:** Works for any image source, no build step required.
5. **Cons:** Slight delay on first load, uses client CPU/Memory.

### Priority 3: External URL Passthrough

For external URLs (e.g., Unsplash, Cloudinary), the component skips optimization to avoid CORS issues and double-compression. It renders the `src` directly.

---

## 3. Build Script

The project includes a Node.js script to generate optimized assets.

```bash
npm run optimize-images
```

This script:
1. Scans `figma:asset` imports (mock implementation in this environment).
2. Uses `sharp` to resize and compress images.
3. Outputs files to `/public/optimized/`.
4. Updates `/utils/imageManifest.ts` with the new mappings.

---

## 4. Best Practices

1. **Always use presets:** Avoid manual `maxWidth` unless absolutely necessary.
2. **Lazy Load:** The component defaults to `loading="lazy"`. Only disable for LCP (Largest Contentful Paint) images like the Hero.
3. **Alt Text:** Always provide descriptive `alt` text.
4. **Aspect Ratio:** The optimization preserves the original aspect ratio. Use CSS `object-fit: cover` on the component to enforce container shapes.
