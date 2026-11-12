# N020: Hero Pattern

**Document ID:** N020  
**Category:** Patterns (Hero)  
**Authority:** D4 (N-Document Approvals); D3 (Design Authority: WCAG 2.2 AAA)  
**Last Updated:** 2026-11-09

## Purpose

Define the Hero section pattern for page entry points, establishing visual hierarchy and call-to-action messaging on ThisOneTimeOnAcidCom.

## Pattern Overview

The Hero section spans full viewport width with immersive imagery and clear value proposition:

```typescript
┌─────────────────────────────────────────┐
│                                         │
│  Background: Jungle Festival Image      │  ← Hero Image (full bleed)
│  Overlay: Gradient + semi-transparent   │
│                                         │
│         This One Time On Acid           │
│              A Memoir                   │
│                                         │
│   [Read the Book]  [View Festival]      │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```typescript

## Hero Anatomy

| Element | Purpose | Dimensions |
|---------|---------|------------|
| Background Image | Immersive visual | Full viewport width × 60-80vh |
| Overlay Gradient | Ensure text readability | RGBA(0,0,0,0.4) to RGBA(0,0,0,0.2) |
| Heading | Main value proposition | 3.5rem (desktop) / 2rem (mobile) |
| Subheading | Context/tagline | 1.5rem (desktop) / 1rem (mobile) |
| CTA Buttons | Primary action | 2 max, clear hierarchy |

## Responsive Behavior

### Desktop (1025px+)

```typescript
┌──────────────────────────────────┐
│ Hero Image                       │
│                                  │
│   [L] Main Heading        [R]    │
│       Subheading                 │
│       [CTA] [Secondary]          │
│                                  │
└──────────────────────────────────┘
```typescript

### Mobile (320px-640px)

```typescript
┌──────────┐
│ Hero Img │
│          │
│ Heading  │
│ (mobile) │
│          │
│ Subhead  │
│          │
│ [CTA]    │
│ [Sec]    │
│          │
└──────────┘
```typescript

## Component Structure

```tsx
interface HeroProps {
  image: string;           // Hero background image URL
  alt: string;            // Image alt text (e.g., "Jungle festival scene")
  heading: string;        // Main headline
  subheading?: string;    // Optional tagline
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  overlay?: 'dark' | 'light'; // Overlay intensity
}
```typescript

## Accessibility Features

- Image alt text describes scene, not just "hero image"
- Heading must be h1 and programmatically identifiable
- Subheading uses semantic h2 or paragraph
- CTA buttons use descriptive text (not "Click Here")
- Text contrast ≥7:1 for large text (AAA compliance)
- Overlay ensures text readability on all images
- Focus visible on all buttons with focus indicators

## Visual Specifications

### Image Treatment

- Aspect ratio: flexible, recommend 16:9 or wider
- Resolution: 1920px width minimum
- Format: WebP with JPG fallback
- Compression: optimized for <200KB file size
- Lazy load: no (hero loads immediately)

### Text Styling

- Heading: bold, sans-serif, 3.5rem (desktop)
- Subheading: regular weight, secondary color, 1.5rem
- Text alignment: center (default) or left-aligned
- Text shadow: subtle drop shadow for legibility

### Overlay Gradient

```css
.hero__overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
```typescript

## CSS Classes (BEM)

```css
.hero { }
.hero__background { }
.hero__image { }
.hero__overlay { }
.hero__content { }
.hero__heading { }
.hero__subheading { }
.hero__actions { }
.hero__cta { }
.hero--dark-overlay { }
.hero--light-overlay { }
```typescript

## States & Interactions

### Image Loading

- Placeholder blur-up effect
- Skeleton loader on low-end devices
- Graceful fallback to color gradient

### Video Hero (Optional)

- Muted autoplay video as background
- Fallback static image for slow connections
- No audio (silent video only)

### Button Interactions

- Hover: color shift and shadow elevation
- Active: press effect with scale reduction
- Focus: visible focus indicator (ring style)
- Loading: spinner inside button during action

## Performance Optimizations

- Responsive images with srcset (1x, 2x)
- Lazy load below-the-fold content with next/image
- Image dimensions known to prevent layout shift
- Hero image preloaded in head
- CSS animations use transform/opacity (GPU-accelerated)

## Example Implementation

```tsx
import { Hero } from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero
        image="/hero-jungle-festival.jpg"
        alt="Jungle canopy at Koh Phangan festival"
        heading="This One Time On Acid"
        subheading="A memoir of music, psychedelics, and transformation"
        primaryCta={{ text: 'Read the Book', href: '/book' }}
        secondaryCta={{ text: 'Learn About Festival', href: '/about' }}
        overlay="dark"
      />
    </>
  );
}
```typescript

## Testing Strategy

- Unit test: props rendering
- Responsive test: multiple viewports (mobile/tablet/desktop)
- Accessibility audit: contrast, focus, semantic HTML
- Image test: lazy loading, fallback behavior
- E2E test: button clicks and navigation

## See Also

- **N019:** Book Card Pattern
- **N021:** Value Proposition Pattern
- **N012:** Performance Optimization
- **N011:** Accessibility Standards
