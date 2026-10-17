# Hero Component Specification

**Date:** March 8, 2026
**Status:** APPROVED

## 1. Unified `HeroConfig` Interface
```typescript
export interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'spotify' | 'soundcloud';
  icon?: string;
}

export interface HeroConfig {
  id: string;
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    icon?: string;
  };
  buttons?: HeroButton[];
  layout: 'centered' | 'left' | 'split' | 'fullscreen';
  backgroundVariant?: 'none' | 'gradient' | 'webgl' | 'image';
  backgroundImage?: string;
  stats?: boolean; // Toggles the DevToolsStatsBar
}
```

## 2. Layout Pattern Variants
- **`centered`:** Default for generic text pages. Center-aligned text, single column.
- **`left`:** Used by DevTools and Music. Left-aligned text, optional right-side graphic.
- **`split`:** 50/50 split layout.
- **`fullscreen`:** 100vh height with overlay.

## 3. Background Variants
- Optional WebGL graphic support via `backgroundVariant: 'webgl'`.
- Supports SVG morphs and particle systems as fallback.
