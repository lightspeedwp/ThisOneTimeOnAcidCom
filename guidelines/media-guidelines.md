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

Reference: `guidelines/image-optimization.md`

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

## Iconography

### Icon Sets

**Interface Icons** (`guidelines/icons/interface.md`)
- Navigation, UI controls, status

**Travel & Portfolio Icons** (`guidelines/icons/travel.md`)
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

**Last Updated:** 2026-10-25  
**Canonical Reference:** Yes

