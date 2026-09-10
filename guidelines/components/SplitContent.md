# SplitContent Component

**File:** `/components/sections/SplitContent.tsx`  
**Version:** 1.0.0  
**Category:** Section Component (Phase 3)

## Purpose

Renders a responsive two-column layout with an image on one side and text content on the other. Supports even (50/50) and image-emphasis (60/40) splits. Stacks vertically on mobile with image first.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `imageUrl` | `string` | *required* | Image source URL |
| `imageAlt` | `string` | *required* | Alt text for the image (required for accessibility) |
| `imageSide` | `'left'` \| `'right'` | `'left'` | Which side the image appears on (desktop) |
| `variant` | `'even'` \| `'image-emphasis'` | `'even'` | Column ratio (`even` = 50/50, `image-emphasis` = 60/40) |
| `children` | `ReactNode` | *required* | Text content (rendered on the opposite side) |

## Usage

```tsx
import { SplitContent } from '../../sections/SplitContent';

<SplitContent
  imageUrl={uvArtImage}
  imageAlt="Ash painting at a festival under UV light"
  imageSide="left"
  variant="even"
>
  <h3 className="content-section__title">ADHD — Wired Different</h3>
  <p className="about-subpage__section-text">
    It's not a deficit of attention — it's an abundance directed in bursts.
  </p>
</SplitContent>
```

## Where Used

- **AboutPage** — ADHD section (image-text split with UV art photo)

## CSS

Styles are defined in `/styles/blocks/split-content.css`, imported by the component.

**BEM structure:**
- `.split-content` — block (flexbox row)
- `.split-content--image-left` / `--image-right` — side modifier
- `.split-content--even` / `--image-emphasis` — ratio modifier
- `.split-content__image-col` — image column
- `.split-content__image` — `<img>` element (uses `ImageWithFallback`)
- `.split-content__text-col` — text column

**Responsive behavior:**
- **Desktop (>768px):** Side-by-side columns
- **Mobile (<768px):** Stacked vertically, image first

## Image Handling

Uses `ImageWithFallback` from `/components/figma/ImageWithFallback.tsx` internally. The `imageUrl` prop is passed directly — use Unsplash URLs or `figma:asset/` imports.

**Important:** Never replace existing `figma:asset/` imports. Use `ImageWithFallback` only for new images.

## Accessibility

- Image requires `imageAlt` prop (enforced by TypeScript)
- Stacks vertically on mobile maintaining reading order
- Content maintains source order in DOM regardless of `imageSide`
- Images use `loading="lazy"` for performance

## Bundler Rules

- Use `var` for all variables
- No arrow functions — use named function expressions
- String concatenation for dynamic class names
