# Sub-audit 2: Content card specimens page

**Parent:** [orchestrator.md](./orchestrator.md)
**Route:** `/dev-tools/content-cards`

---

## Objective

Create a dev tools page showcasing 5 distinct card variants for each of the 5 content types (25 total card designs), plus existing tool/tip card types. Every card is shown in light and dark mode with full hover/focus interactions.

---

## Card variant definitions

### Variant 1: Standard card
The default archive/listing card. Used on content archive pages.

**Structure:**
- Image area (aspect varies by content type)
- Content type badge with neon colour
- Title (truncated at 2 lines)
- Excerpt (truncated at 3 lines)
- Meta bar (date, read time / duration / location)
- Hover: lift + neon border glow

### Variant 2: Featured card
Large hero card for homepage features and top-of-archive slots.

**Structure:**
- Full-width or 2-column image (taller, more prominent)
- Overlay gradient mask at bottom
- Title overlaid on image (large typography)
- Category badge floating top-left
- Featured indicator (star/sparkle icon)
- Hover: image zoom + glow intensification

### Variant 3: Compact card
Small horizontal card for sidebars and related content sections.

**Structure:**
- Thumbnail (small square, left side)
- Text block (right side): title + date
- No excerpt, minimal meta
- Hover: subtle background shift + neon accent line

### Variant 4: Minimal card
Text-only card for dense lists and search results.

**Structure:**
- Content type icon + badge (inline, small)
- Title
- One-line excerpt or description
- Date (right-aligned or below)
- No image
- Hover: left border neon accent line appears

### Variant 5: Editorial card
Magazine-style card for highlighted/special content.

**Structure:**
- Large image with artistic crop (portrait for portfolio, landscape for blog)
- Large display title overlaid or adjacent (editorial typography)
- Pull quote or highlighted snippet
- Neon accent stripe along one edge
- Author/artist attribution
- Hover: parallax shift or tilt effect

---

## Content type-specific adaptations

Each content type's 5 variants should be subtly different to reflect the nature of the content:

### Blog cards
- **Aspect ratio:** 16:9 landscape
- **Meta:** Date, category, read time, tag count
- **Accent:** Neon pink (#FF10F0)
- **Featured variant:** Large hero image with gradient text overlay
- **Editorial variant:** Pull quote from the post

### Portfolio cards
- **Aspect ratio:** 1:1 square or 3:4 portrait (face close-ups benefit from portrait)
- **Meta:** Event, location, date, image count
- **Accent:** Neon green (#39FF14)
- **Featured variant:** Masonry-style oversized image, minimal text
- **Editorial variant:** Full-bleed image with floating title
- **Standard variant:** Image carousel dots visible (gallery indicator)

### Video cards
- **Aspect ratio:** 16:9 landscape
- **Meta:** Duration badge (overlay on image), view count, category
- **Accent:** Neon blue (#1F51FF)
- **Featured variant:** Video player placeholder with large play button
- **Compact variant:** Thumbnail + title + duration (YouTube-style)

### Podcast cards
- **Aspect ratio:** 1:1 square (album art style)
- **Meta:** Episode number, season, duration, guest name
- **Accent:** Neon purple (#BE00FE)
- **Featured variant:** Large cover art with episode details overlaid
- **Editorial variant:** Waveform decoration, transcript preview snippet

### Event cards
- **Aspect ratio:** 16:9 or 4:3
- **Meta:** Date range, location, event type badge, travel method icon
- **Accent:** Neon orange (#FF5F1F)
- **Featured variant:** Large banner with event logo/image, date countdown
- **Compact variant:** Date + name + location (calendar-style)
- **Editorial variant:** Multi-edition summary with attendance badges

---

## Page layout

```
┌──────────────────────────────────────────────────────────────┐
│  Breadcrumbs: Home > Developer Tools > Content card gallery  │
│  Badge: Content                                              │
│  H1: Content card gallery (gradient)                         │
│  Subtitle: 5 card variants for every content type...         │
├──────────────────────────────────────────────────────────────┤
│  [ Blog ] [ Portfolio ] [ Video ] [ Podcast ] [ Event ]      │
│  ─────── active tab with neon colour underline               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Theme toggle: [Light] [Dark] [Side by side]                 │
│                                                              │
│  ┌── Standard ──────────────────────────────────────────┐   │
│  │  3-column grid of standard cards                      │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── Featured ──────────────────────────────────────────┐   │
│  │  1 large + 2 small layout                             │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── Compact ───────────────────────────────────────────┐   │
│  │  Narrow sidebar column with 3 compact cards           │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── Minimal ───────────────────────────────────────────┐   │
│  │  Dense list of 4 minimal cards                        │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── Editorial ─────────────────────────────────────────┐   │
│  │  2-column editorial layout                            │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  FAQ section (3 FAQs, content-type neon colour)              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Interaction requirements

All cards must demonstrate:

1. **Default state** — Clean, readable, well-spaced
2. **Hover state** — Transform + shadow + neon glow
3. **Focus state** — 3px neon focus ring (accessibility)
4. **Active state** — Scale-down feedback

### Hover effects per variant:
- **Standard:** `translateY(-4px)` + neon box-shadow + image scale(1.05)
- **Featured:** Image zoom to scale(1.08) + gradient mask intensification
- **Compact:** Background colour shift + left neon accent line
- **Minimal:** Left border neon line slides in from transparent
- **Editorial:** Subtle parallax tilt or image shift

### Reduced motion:
All hover animations wrapped in `@media (prefers-reduced-motion: reduce)` — falls back to opacity change only.

---

## Relationship to existing CardSpecimenPage

The existing `/dev-tools/cards` (CardSpecimenPage) shows 6 generic card types (blog, tool, video, podcast, sticker, tip). This new page is a **superset** focused on content-type-specific variants.

**Decision:** Keep both pages:
- `/dev-tools/cards` — Generic card interaction specimens (hover/focus states)
- `/dev-tools/content-cards` — Content-type-specific card gallery (5 variants × 5 types)

Cross-link between them for reference.

---

## Data file

`/data/mock/ui/content-card-specimens.ts`:
```typescript
export const contentCardSpecimens = {
  blog: {
    cards: [
      { variant: 'standard', title: '...', excerpt: '...', image: '...', category: '...', date: '...', readTime: 5 },
      { variant: 'featured', ... },
      { variant: 'compact', ... },
      { variant: 'minimal', ... },
      { variant: 'editorial', ... },
    ],
    faqs: [...],
  },
  portfolio: { ... },
  video: { ... },
  podcast: { ... },
  event: { ... },
};
```

---

## Output

- Component: `/components/pages/dev-tools/ContentCardSpecimensPage.tsx`
- CSS: `/styles/blocks/content-card-specimens.css`
- Data: `/data/mock/ui/content-card-specimens.ts`
- Route registered
- SEO entry added
- Breadcrumb entry added
