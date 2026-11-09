# N005: Media & Asset Optimization

**Purpose:** Image formats, CDN setup, asset pipeline, performance optimization, and best practices for media delivery.

**Authority:** D4 (N-Document Approvals); D3 (Design Authority)

---

## Overview

Media optimization strategy for This One Time On Acid:
- Image format selection (WebP, AVIF, JPEG, PNG)
- Responsive image delivery with `srcset`
- CDN configuration for global delivery
- Asset pipeline and build optimization
- Performance budgets and monitoring
- Lazy loading and progressive enhancement

**Related Guidelines:** See [N001: Design Token Reference](#) for visual style; see [N012: Performance Guidelines](#) for Core Web Vitals targets.

---

## Image Formats

### Format Selection Guide

| Format | Best For | Pros | Cons |
|--------|----------|------|------|
| **WebP** | Modern browsers (90%+ support) | 25-35% smaller than JPEG/PNG | No IE11 support |
| **AVIF** | Future standard (new browsers) | 50%+ smaller than JPEG | Limited browser support (≈80%) |
| **JPEG** | Photographs, fallback | Universal support, small size | Lossy compression, no transparency |
| **PNG** | Graphics, transparency needed | Lossless, transparency, sharp edges | Larger file size |
| **SVG** | Icons, logos, scalable graphics | Infinitely scalable, tiny size | Not suitable for photographs |
| **GIF** | Animated images (outdated) | Universal support | Very large file size; use MP4 instead |

### Recommended Format Strategy

```
Photograph/Complex Image:
  Primary: AVIF (modern browsers)
  Fallback: WebP (modern browsers)
  Fallback: JPEG (legacy browsers)

Icon/Logo:
  Primary: SVG (all browsers)
  Fallback: PNG (if interactive styling needed)

Animation:
  Primary: MP4 video (small, efficient)
  Fallback: WebP animation (if needed)
  Avoid: GIF (use MP4 instead)
```

---

## Responsive Images

### `srcset` Attribute

```html
<!-- Multiple density versions -->
<img
  src="photo.jpg"
  srcset="photo-small.jpg 1x, photo-medium.jpg 2x"
  alt="Description"
/>

<!-- Multiple sizes for responsive design -->
<img
  src="photo.jpg"
  srcset="photo-480.jpg 480w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Description"
/>
```

### `<picture>` Element (Format Selection)

```html
<picture>
  <!-- Modern format: AVIF -->
  <source srcset="photo.avif" type="image/avif" />
  <!-- Fallback: WebP -->
  <source srcset="photo.webp" type="image/webp" />
  <!-- Fallback: JPEG -->
  <img src="photo.jpg" alt="Description" />
</picture>
```

### Responsive Images with Format Selection

```html
<picture>
  <!-- AVIF: Multiple densities -->
  <source
    media="(min-width: 1024px)"
    srcset="hero-1200.avif 1x, hero-2400.avif 2x"
    type="image/avif"
  />
  <!-- WebP: Multiple densities -->
  <source
    media="(min-width: 1024px)"
    srcset="hero-1200.webp 1x, hero-2400.webp 2x"
    type="image/webp"
  />
  <!-- JPEG fallback -->
  <img
    src="hero-1200.jpg"
    srcset="hero-1200.jpg 1x, hero-2400.jpg 2x"
    alt="Hero"
  />
</picture>
```

---

## Image Compression

### Compression Targets

| Image Type | Target Size | Tool |
|---|---|---|
| Thumbnail | < 10 KB | TinyPNG, ImageOptim |
| Hero Image | < 100 KB | ImageMagick, ffmpeg |
| Full-width | < 200 KB | ImageMagick, Squoosh |
| Icon | < 5 KB | SVG compressor |

### Compression Tools

```bash
# ImageMagick (convert & compress)
convert photo.jpg -quality 80 -resize 1200x photo-1200.jpg

# ImageOptim (lossless compression)
imageoptim --quality high photo.jpg

# WebP conversion
cwebp -quality 80 photo.jpg -o photo.webp

# AVIF conversion
avifenc --quality 75 photo.jpg photo.avif

# Batch processing
for f in *.jpg; do cwebp -quality 80 "$f" -o "${f%.jpg}.webp"; done
```

---

## Lazy Loading

### Native Lazy Loading

```html
<!-- Browser defers loading until near viewport -->
<img src="below-fold.jpg" alt="Lazy loaded" loading="lazy" />

<!-- With responsive images -->
<img
  src="below-fold-small.jpg"
  srcset="below-fold-480.jpg 480w, below-fold-800.jpg 800w"
  loading="lazy"
  alt="Lazy loaded responsive"
/>
```

### Intersection Observer API

```javascript
// Manual lazy loading for custom behavior
const images = document.querySelectorAll('[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

### React Component Example

```jsx
import Image from 'next/image';

// Next.js optimizes images automatically
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  loading="lazy"
  quality={80}
/>
```

---

## CDN Configuration

### CloudFlare CDN Setup

```
1. Add site to Cloudflare
2. Enable Image Optimization in Cache Rules
3. Set browser cache TTL: 1 month
4. Set Cache Everything for images
5. Enable WebP conversion (Automatic Platform Optimization)
6. Monitor performance in Analytics
```

### Image CDN Headers

```
Cache-Control: public, max-age=31536000
Content-Type: image/webp
Vary: Accept-Encoding
ETag: "abc123"
```

---

## Performance Budgets

### Image Size Targets

| Page Type | Total Image Size | Per Image | Constraint |
|---|---|---|---|
| Mobile Home | < 500 KB | Hero: < 100 KB | LCP < 2.5s |
| Desktop Home | < 1 MB | Hero: < 200 KB | LCP < 2.5s |
| Article | < 2 MB | Article images: < 200 KB | LCP < 2.5s |
| Gallery | < 5 MB | Thumbnails: < 50 KB | LCP < 2.5s |

### Monitoring

```bash
# Check bundle size
npm run build && npm run analyze

# Lighthouse performance audit
npx lighthouse https://site.com --output-path report.html

# WebPageTest analysis
# Visit https://webpagetest.org and enter URL
```

---

## Asset Pipeline

### Build Process

```
Source Images (src/assets/)
  ↓
[Resize for responsive breakpoints]
  ↓
[Convert to WebP and AVIF]
  ↓
[Compress with target quality]
  ↓
[Generate srcset combinations]
  ↓
Optimized Images (public/images/)
  ↓
CDN Upload
  ↓
Serve via CDN (optimized-cdn-url.com/...)
```

### Automation Script

```bash
#!/bin/bash
# optimize-images.sh

for img in src/assets/*.jpg; do
  base=$(basename "$img" .jpg)
  
  # Resize for mobile (480px)
  convert "$img" -resize 480x -quality 80 "public/images/${base}-480.jpg"
  cwebp -quality 75 "public/images/${base}-480.jpg" -o "public/images/${base}-480.webp"
  avifenc --quality 70 "$img" "public/images/${base}-480.avif"
  
  # Resize for tablet (800px)
  convert "$img" -resize 800x -quality 80 "public/images/${base}-800.jpg"
  cwebp -quality 80 "public/images/${base}-800.jpg" -o "public/images/${base}-800.webp"
  avifenc --quality 75 "$img" "public/images/${base}-800.avif"
  
  # Resize for desktop (1200px)
  convert "$img" -resize 1200x -quality 85 "public/images/${base}-1200.jpg"
  cwebp -quality 85 "public/images/${base}-1200.jpg" -o "public/images/${base}-1200.webp"
  avifenc --quality 80 "$img" "public/images/${base}-1200.avif"
done
```

---

## Accessibility

### Alt Text Guidelines

```html
<!-- Decorative images -->
<img src="divider.png" alt="" aria-hidden="true" />

<!-- Informative images -->
<img src="chart.png" alt="2024 revenue increased 25% to $1.2M" />

<!-- Complex images (use longdesc or aria-describedby) -->
<img
  src="complex-diagram.png"
  alt="System architecture diagram"
  aria-describedby="diagram-description"
/>
<div id="diagram-description">
  [Detailed description of diagram components and relationships]
</div>
```

### Loading States

```jsx
// Placeholder while loading
<img
  src="photo.jpg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  alt="Photo"
  loading="lazy"
/>
```

---

## Common Mistakes to Avoid

- ❌ **Storing images in git:** Use CDN or asset management system
- ❌ **Using GIF for animation:** Use MP4 video instead (100x smaller)
- ❌ **Not compressing images:** Always compress before deployment
- ❌ **Fixed image dimensions:** Use responsive images with srcset
- ❌ **No alt text:** Every image needs descriptive alt text
- ❌ **Ignoring mobile:** Test on actual mobile devices
- ❌ **Missing lazy loading:** Lazy load all below-the-fold images

---

## Resources

- [Image Optimization Guide](https://developers.google.com/speed/docs/insights)
- [Web.dev Performance](https://web.dev/performance/)
- [ImageMagick Documentation](https://imagemagick.org/index.php)
- [WebP Format](https://developers.google.com/speed/webp)
- [AVIF Format](https://aomediacodec.org/av1-image-format/)

---

**Authority:** D4 (N-Document Approvals) | D3 (Design Authority)  
**Last Updated:** 2026-11-09  
**Related:** [N001: Design Token Reference](#) · [N012: Performance Guidelines](#) · [N009: Responsive Design Patterns](#)
