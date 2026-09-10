# Sub-audit 2: Card & layout redesign — dev tools laboratory

**Parent:** [orchestrator.md](./orchestrator.md)
**Status:** READY
**Created:** March 6, 2026
**Version:** 2.0.0 — Full scope defined (replaces v1.0.0 PENDING draft)

---

## Objective

Build a comprehensive **Card & Layout Laboratory** inside the dev tools system. This is NOT a production portfolio redesign — it is a visual playground where every card shape, interaction, grid layout, and detail page template can be previewed, compared, and evaluated before any production decisions are made.

The laboratory consists of **4 major sub-pages** under a new "Card & Layout Lab" dev tools category, plus **6 content-type detail template browsers** (one per content type).

---

## Critical rules

Same as all other prompts — see [Guidelines.md](../../guidelines/Guidelines.md). Key reminders:
- BEM-only styling, no Tailwind utilities, no inline styles
- Bundler-safe syntax (`var`, no arrow callbacks, no destructuring, no optional chaining, no `for...of`)
- All placeholder content from `/data/mock/` files (create new data files as needed)
- Sentence case for all headings
- He/him pronouns
- Neon vs Atomic Black design system
- Content-type neon colour mapping from `/data/mock/ui/content-type-colours.ts`
- Helper functions (`grab()`, `arrayGet()`, `setProp()`) from `/lib/router.tsx` for safe property access
- `prefers-reduced-motion` support for all animations
- WCAG 2.1 AA compliance (contrast, keyboard nav, ARIA labels)

---

## Architecture overview

```
Dev Tools Hub (/dev-tools)
└── Card & Layout Lab (new category group)
    ├── Card shapes       (/dev-tools/card-shapes)      — 11 card shape specimens
    ├── Card interactions  (/dev-tools/card-interactions) — 10 interaction specimens
    ├── Grid layouts       (/dev-tools/grid-layouts)      — 6 grid layout specimens with pagination variants
    └── Detail templates   (/dev-tools/detail-templates)  — Hub linking to 6 content-type detail browsers
        ├── Blog detail templates      (/dev-tools/detail-templates/blog)
        ├── Portfolio detail templates (/dev-tools/detail-templates/portfolio)
        ├── Video detail templates     (/dev-tools/detail-templates/video)
        ├── Podcast detail templates   (/dev-tools/detail-templates/podcast)
        ├── Event detail templates     (/dev-tools/detail-templates/event)
        └── Ebook detail templates     (/dev-tools/detail-templates/ebook)
```

---

## Sub-page 1: Card shapes (`/dev-tools/card-shapes`)

### Component: `CardShapesLabPage.tsx`
### CSS: `/styles/blocks/card-shapes-lab.css`
### Data: `/data/mock/ui/card-shapes-lab.ts`
### Route: `/dev-tools/card-shapes`

Display **11 card shape variants**, each in its own specimen section with:
- A title and short description of the shape concept
- 3 example cards per shape (using placeholder portfolio/blog content from existing mock data)
- Light/dark mode toggle (shared across all sections)
- Each card uses content-type neon colour accents where appropriate

### 11 card shapes

#### 1. Polaroid
- White border (thicker at bottom), slight random rotation (-3deg to +3deg per card)
- Handwritten-style caption below the image (use `.font-title` Righteous for the handwritten feel)
- Neon glow on hover (colour matches content type)
- Drop shadow simulating a physical photo on a surface
- BEM: `.card-shape--polaroid`, `.card-shape__polaroid-caption`

#### 2. Masonry / Pinterest
- Mixed aspect ratios — portrait (3:4), landscape (16:9), square (1:1) — randomly assigned per card
- No uniform height, cards flow naturally in columns
- Thin 1px neon border on hover
- Category badge in top-left corner
- BEM: `.card-shape--masonry`, `.card-shape--masonry-portrait`, `.card-shape--masonry-landscape`, `.card-shape--masonry-square`

#### 3. Hexagonal
- Hexagon clip-path on the image (`polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`)
- Title and metadata below the hexagon
- Neon border glow following the hexagonal outline
- Honeycomb grid alignment (offset every other row)
- BEM: `.card-shape--hexagonal`, `.card-shape__hex-image`

#### 4. Glassmorphism
- Frosted glass overlay on the image (`backdrop-filter: blur(12px); background: rgba(15,15,15,0.6)`)
- Title and metadata rendered on top of the blurred image
- Subtle neon text glow for title
- Thin 1px semi-transparent border
- BEM: `.card-shape--glass`, `.card-shape__glass-overlay`

#### 5. Magazine editorial
- Oversized featured card (spans 2 columns) mixed with smaller standard cards
- Text overlaid on image with gradient mask (bottom-to-top black gradient)
- Large display typography for title (`.font-heading`)
- Category and date as small caps above the title
- BEM: `.card-shape--editorial`, `.card-shape--editorial-featured`, `.card-shape__editorial-overlay`

#### 6. Film strip
- Card styled as a 35mm film frame with sprocket holes on top and bottom edges
- Film frame number in top-right corner
- Slight warm colour cast overlay (sepia hint)
- On hover, colour cast lifts to reveal full-colour image
- Neon accent line between frames
- BEM: `.card-shape--filmstrip`, `.card-shape__sprocket-holes`, `.card-shape__frame-number`

#### 7. Vinyl record
- Circular card — image clipped to circle
- Centre label with title text (like a vinyl centre sticker)
- On hover, a rectangular "sleeve" slides out from behind revealing description text
- Subtle rotation animation on hover (like a spinning record)
- Groove lines rendered as subtle concentric circle CSS gradients
- BEM: `.card-shape--vinyl`, `.card-shape__vinyl-label`, `.card-shape__vinyl-sleeve`

#### 8. Torn paper
- Ragged/torn edges using SVG clip-path or CSS `clip-path: polygon()` with irregular points
- Layered appearance — cards slightly overlapping with `z-index` stacking
- Paper-like texture background (off-white in light mode, dark charcoal in dark mode)
- Handwritten-style metadata (`.font-title`)
- BEM: `.card-shape--torn`, `.card-shape__torn-edge`

#### 9. Neon sign
- Card outline rendered as neon tube segments (thick neon-coloured border with outer glow)
- Title text has neon glow effect (`text-shadow` with colour matching content type)
- Dark background inside the card (like a bar/club sign)
- Flicker animation on hover (subtle brightness oscillation)
- Content-type neon colour determines the sign's tube colour
- BEM: `.card-shape--neon-sign`, `.card-shape__neon-tube`

#### 10. Stacked fan
- 3 image layers stacked with slight rotation offsets (-5deg, 0deg, +5deg)
- On hover, stack fans out to reveal all 3 images (like spreading a hand of cards)
- Top card shows title and category
- Neon accent on the visible edges of back cards
- BEM: `.card-shape--fan`, `.card-shape__fan-layer`, `.card-shape__fan-layer--back`, `.card-shape__fan-layer--mid`

#### 11. Holographic
- Iridescent gradient overlay that shifts with mouse position (CSS `background-position` tied to mouse)
- Rainbow shimmer effect using `linear-gradient` with multiple colour stops at steep angles
- Title and metadata over the shifting gradient
- Foil-stamp texture hint (subtle noise overlay)
- Content-type colour as the dominant hue anchor
- BEM: `.card-shape--holographic`, `.card-shape__holo-shimmer`

---

## Sub-page 2: Card interactions (`/dev-tools/card-interactions`)

### Component: `CardInteractionsLabPage.tsx`
### CSS: `/styles/blocks/card-interactions-lab.css`
### Data: `/data/mock/ui/card-interactions-lab.ts`
### Route: `/dev-tools/card-interactions`

Display **10 interaction specimens**, each demonstrating a unique hover/focus/click behaviour. Each section shows 3 cards with the interaction applied.

### 10 card interactions

#### 1. Reveal on hover
- Card shows only the image at rest
- On hover, title + category + excerpt slide up from the bottom (CSS `transform: translateY()` transition)
- Dark gradient overlay fades in behind the text
- BEM: `.card-ix--reveal`, `.card-ix__reveal-content`

#### 2. Flip card
- Front face: image with category badge
- Back face: description, tags, and "View" link on solid dark background
- 3D flip on hover (`transform: rotateY(180deg)`, `backface-visibility: hidden`)
- Neon border accent on the back face
- BEM: `.card-ix--flip`, `.card-ix__flip-front`, `.card-ix__flip-back`

#### 3. Neon border pulse
- Card border glows in the content-type neon colour
- Pulsing animation (opacity oscillation 0.5 → 1.0) using existing `neonPulse` keyframe
- On hover, pulse speeds up and glow intensity increases (`box-shadow` spread)
- BEM: `.card-ix--neon-pulse`, `.card-ix__neon-border`

#### 4. Tilt parallax
- Card tilts toward the mouse cursor using CSS `perspective` + `transform: rotateX/rotateY`
- Implemented via `onMouseMove` named function handler (bundler-safe)
- Image layer shifts opposite direction for depth parallax
- Reset to flat on mouse leave
- BEM: `.card-ix--tilt`, `.card-ix__tilt-inner`

#### 5. Blacklight reveal
- Card appears in desaturated/muted tones at rest (`filter: saturate(0.3) brightness(0.7)`)
- On hover, "UV blacklight turns on" — full saturation + neon glow (`filter: saturate(1.4) brightness(1.1)`)
- Purple-blue overlay fades out (simulating the blacklight ambiance)
- Neon elements "light up" with `text-shadow` glow
- BEM: `.card-ix--blacklight`, `.card-ix__blacklight-overlay`

#### 6. Magnetic pull
- Card subtly shifts position toward the cursor when mouse enters a proximity zone (100px radius)
- Smooth elastic return to origin on mouse leave
- Implemented with `mousemove` on the parent container, calculating distance per card
- Named function handler for bundler safety
- BEM: `.card-ix--magnetic`

#### 7. Glitch effect
- On hover, RGB colour channels split horizontally (red left, blue right, 2-3px offset)
- Brief scan-line flicker overlay (horizontal lines at 10% opacity)
- Text shifts by 1px in alternating directions (controlled CSS animation, 3 keyframes)
- Cyberpunk aesthetic matching the neon brand
- BEM: `.card-ix--glitch`, `.card-ix__glitch-scanlines`

#### 8. Morph expand
- Card starts at standard size in the grid
- On click (not hover), card smoothly expands inline to reveal full content (description, tags, gallery count)
- Other cards in the grid shift to accommodate
- Click again to collapse
- Expand/collapse managed via React state (bundler-safe: `var isExpanded = ...`)
- BEM: `.card-ix--morph`, `.card-ix--morph-expanded`

#### 9. Smoke reveal
- Fog/smoke overlay on the card at rest (CSS `radial-gradient` simulating fog patches)
- On hover, fog dissipates (opacity transition from centre outward using multiple gradient layers)
- Image revealed progressively as fog clears
- Title fades in after fog clears (0.2s delay)
- BEM: `.card-ix--smoke`, `.card-ix__smoke-layer`

#### 10. Neon trace
- Card border starts invisible
- On hover, an animated border line traces around the entire card perimeter (using `conic-gradient` or `@keyframes` that animate `border-image` / pseudo-element position)
- Trail leaves a neon glow that fades (content-type colour)
- Trace completes one full loop in ~1.5s, then holds as a steady neon border
- BEM: `.card-ix--trace`, `.card-ix__trace-line`

---

## Sub-page 3: Grid layouts (`/dev-tools/grid-layouts`)

### Component: `GridLayoutsLabPage.tsx`
### CSS: `/styles/blocks/grid-layouts-lab.css`
### Data: `/data/mock/ui/grid-layouts-lab.ts`
### Route: `/dev-tools/grid-layouts`

Display **6 grid layout specimens**, each in a full-width demo section with 8-12 cards. Each grid section includes a toggle for its pagination/loading strategy.

### 6 grid layouts

#### 1. Uniform grid
- Standard equal-size cards in responsive columns (1→2→3→4 based on breakpoints)
- All cards same height and width
- Gap: `var(--wp--preset--spacing--fluid-md)`
- Pagination: **Numbered pagination** (1, 2, 3... with Prev/Next)
- BEM: `.grid-lab--uniform`

#### 2. Masonry grid
- `react-responsive-masonry` package for true masonry layout
- Mixed card heights based on content and image aspect ratio
- Responsive columns: 1 (mobile) → 2 (tablet) → 3 (desktop) → 4 (wide)
- Pagination: **Infinite scroll** (Intersection Observer triggers next batch)
- BEM: `.grid-lab--masonry`

#### 3. Featured hero + grid
- First card is a hero card spanning full width with large image, title, and description overlay
- Remaining cards in a standard 3-column grid below
- Hero card uses `.card-shape--editorial` styling
- Pagination: **Load more button** (neon-styled, loads 6 more cards per click)
- BEM: `.grid-lab--featured`, `.grid-lab__hero-card`

#### 4. Bento grid
- CSS Grid with predefined template areas — some cards span 2 rows, some span 2 columns
- Irregular, magazine-like layout with varied card sizes
- Template: `"large large small1" "large large small2" "wide wide wide"` (repeating)
- Pagination: **Numbered pagination**
- BEM: `.grid-lab--bento`, `.grid-lab__bento-large`, `.grid-lab__bento-small`, `.grid-lab__bento-wide`

#### 5. Carousel / horizontal scroll
- Horizontal scrolling strip of cards (snap scrolling via `scroll-snap-type: x mandatory`)
- Cards are fixed width (300px mobile, 400px desktop), full height
- Left/right arrow navigation buttons (Phosphor `CaretLeft`/`CaretRight`)
- Dot indicators below (1 dot per card, active dot is neon)
- Pagination: **Swipe/arrows** (no traditional pagination)
- BEM: `.grid-lab--carousel`, `.grid-lab__carousel-track`, `.grid-lab__carousel-arrow`, `.grid-lab__carousel-dots`

#### 6. Category-sorted columns
- Cards sorted into vertical columns by category (each category gets its own column)
- Column headers show category name + neon colour accent + card count
- Categories use the content-type neon colour mapping
- Within each column, cards stack vertically
- Horizontal scroll if more categories than viewport can fit
- Pagination: **Filter chips** (click category chip to show only that column, "All" to show all)
- BEM: `.grid-lab--category-columns`, `.grid-lab__category-column`, `.grid-lab__category-header`

### Pagination/loading variants

Each grid section has a small control bar allowing the user to switch between pagination strategies:
- **Numbered pagination** — Classic 1/2/3 with prev/next
- **Load more button** — "Show more" button at bottom
- **Infinite scroll** — Auto-load on scroll to bottom (with loading skeleton)

Control bar uses radio button chips (BEM: `.grid-lab__pagination-switcher`, `.grid-lab__pagination-chip`, `.grid-lab__pagination-chip--active`).

---

## Sub-page 4: Detail templates hub (`/dev-tools/detail-templates`)

### Component: `DetailTemplatesHubPage.tsx`
### CSS: `/styles/blocks/detail-templates-hub.css`
### Data: `/data/mock/ui/detail-templates-lab.ts`
### Route: `/dev-tools/detail-templates`

A hub page that links to **6 content-type detail template browsers** (one per content type). Each content type card links to its own sub-page.

### Hub layout

- Hero with title "Detail page templates" and description
- 6 large content-type cards in a 2x3 grid (or 3x2 on desktop)
- Each card shows:
  - Content-type neon colour as border/accent
  - Content-type Phosphor icon (from content-type-colours.ts)
  - Content-type name (e.g., "Blog detail templates")
  - Template count (e.g., "3 template concepts")
  - Link to sub-page
- BEM: `.detail-hub`, `.detail-hub__card`, `.detail-hub__card--blog`, etc.

### Content-type sub-pages (6 pages)

Each sub-page shows **3 detail template concepts** for its content type, rendered with placeholder content from existing mock data. Each template is displayed as a full-width preview section with a title, description, and the actual rendered template.

#### Template concepts (same 3 for each content type, adapted to content-type specifics):

**Template A: Current layout (reference)**
- Render the existing detail page layout as-is (link to the live page for reference)
- Show a wireframe/screenshot representation if the actual component is complex
- Label: "Current production layout"
- Includes a "View live" button linking to an actual entry (e.g., `/blog/first-post-slug`, `/portfolio/first-entry-slug`)
- BEM: `.detail-template--current`

**Template B: Full-screen lightbox**
- Full-viewport hero image (100vh, `object-fit: cover`)
- Floating metadata overlay in bottom-left (title, category, date)
- Scroll down to reveal content body below the fold
- Minimal chrome — image dominates
- Gallery section uses full-screen lightbox with keyboard navigation (Escape to close, arrows to navigate)
- Neon-themed lightbox controls (close X, prev/next arrows with glow)
- BEM: `.detail-template--lightbox`, `.detail-template__lightbox-hero`, `.detail-template__lightbox-controls`

**Template C: Art exhibition**
- Pure white/pure black background (matches light/dark mode)
- Image centred with generous whitespace (max-width: 800px, auto margins)
- Title below image in large serif typography (`.font-heading`)
- Minimal metadata — just category and date, small and subdued
- Content body in a narrow reading column (max-width: 640px)
- Gallery as a horizontal scroll strip below the content (exhibition walkthrough feel)
- No sidebar, no related posts — just the work and the words
- BEM: `.detail-template--exhibition`, `.detail-template__exhibition-image`, `.detail-template__exhibition-gallery`

#### Content-type sub-pages

| Route | Component | Content type | Neon accent | Sample data source |
|---|---|---|---|---|
| `/dev-tools/detail-templates/blog` | `BlogDetailTemplatesPage.tsx` | Blog | Pink `#FF10F0` | First 3 posts from `/data/mock/blog/` |
| `/dev-tools/detail-templates/portfolio` | `PortfolioDetailTemplatesPage.tsx` | Portfolio | Green `#39FF14` | First 3 entries from `/data/mock/portfolio/` |
| `/dev-tools/detail-templates/video` | `VideoDetailTemplatesPage.tsx` | Video | Blue `#1F51FF` | First 3 entries from `/data/mock/videos/` |
| `/dev-tools/detail-templates/podcast` | `PodcastDetailTemplatesPage.tsx` | Podcast | Purple `#BE00FE` | First 3 entries from `/data/mock/podcasts/` |
| `/dev-tools/detail-templates/event` | `EventDetailTemplatesPage.tsx` | Event | Orange `#FF5F1F` | First 3 entries from `/data/mock/events/` |
| `/dev-tools/detail-templates/ebook` | `EbookDetailTemplatesPage.tsx` | Ebook | Yellow `#FFFF00` | First 3 pages from `/data/mock/pages/ebook-pages.ts` |

Each sub-page has:
- Breadcrumbs: `Home > Developer tools > Detail templates > {Content type}`
- Content-type neon accent throughout (headings, borders, active states)
- 3 sections (one per template concept), each full-width
- Toggle between template concepts via tab bar at the top (sticky)
- SEO via `setSEO()` from `/utils/seo.ts`

---

## Data files to create

### `/data/mock/ui/card-shapes-lab.ts`
- Array of 11 card shape definitions: `id`, `name`, `description`, `bemModifier`, `category` (geometric/analog/digital/artistic)
- 3 placeholder card items per shape (title, image description for ImageWithFallback, category, date, excerpt) — pull from existing portfolio/blog mock data where possible

### `/data/mock/ui/card-interactions-lab.ts`
- Array of 10 interaction definitions: `id`, `name`, `description`, `bemModifier`, `animationType` (css-only/js-required/hybrid)
- 3 placeholder card items per interaction

### `/data/mock/ui/grid-layouts-lab.ts`
- Array of 6 grid layout definitions: `id`, `name`, `description`, `bemModifier`, `defaultPagination` (numbered/load-more/infinite/arrows/filter-chips)
- 12 placeholder card items per grid (reuse from existing mock data)

### `/data/mock/ui/detail-templates-lab.ts`
- Array of 6 content-type entries: `id`, `contentType`, `neonColor`, `neonHex`, `icon`, `templateCount`, `href`
- Array of 3 template concepts: `id`, `name`, `description`, `bemModifier`

---

## CSS files to create

| File | Scope |
|---|---|
| `/styles/blocks/card-shapes-lab.css` | All 11 card shape BEM classes + responsive + reduced motion |
| `/styles/blocks/card-interactions-lab.css` | All 10 interaction BEM classes + keyframes + reduced motion |
| `/styles/blocks/grid-layouts-lab.css` | All 6 grid layouts + pagination variants + responsive |
| `/styles/blocks/detail-templates-hub.css` | Hub page layout + content-type cards |
| `/styles/blocks/detail-template-lightbox.css` | Template B: full-screen lightbox layout + controls |
| `/styles/blocks/detail-template-exhibition.css` | Template C: art exhibition layout + gallery strip |
| `/styles/blocks/detail-template-current.css` | Template A: current layout wireframe/reference styling |

---

## Dev tools registration

### New category in `/data/mock/ui/dev-tools.ts`

Add a new category group:

```typescript
{
  id: 'card-layout-lab',
  title: 'Card & Layout Lab',
  description:
    'Visual playground for card shapes, hover interactions, grid layouts, and detail page templates — compare every option before committing to production.',
  accent: 'orange',
  tools: [
    'card-shapes',
    'card-interactions',
    'grid-layouts',
    'detail-templates',
  ],
}
```

### New tool entries in the `tools` array

```typescript
{
  id: 'card-shapes',
  title: 'Card shapes',
  description: '11 card shape specimens — polaroid, hexagonal, glassmorphism, film strip, vinyl, neon sign, holographic, and more.',
  href: '/dev-tools/card-shapes',
  icon: 'Cards',
  badge: 'Lab',
},
{
  id: 'card-interactions',
  title: 'Card interactions',
  description: '10 hover and click interaction specimens — flip, tilt parallax, blacklight reveal, glitch, magnetic pull, neon trace, and more.',
  href: '/dev-tools/card-interactions',
  icon: 'CursorClick',
  badge: 'Lab',
},
{
  id: 'grid-layouts',
  title: 'Grid layouts',
  description: '6 grid layout specimens with switchable pagination — uniform, masonry, bento, carousel, featured hero, and category columns.',
  href: '/dev-tools/grid-layouts',
  icon: 'GridFour',
  badge: 'Lab',
},
{
  id: 'detail-templates',
  title: 'Detail page templates',
  description: '3 detail page concepts for each of 6 content types — current layout, full-screen lightbox, and art exhibition.',
  href: '/dev-tools/detail-templates',
  icon: 'BrowsersThree',
  badge: 'Lab',
},
```

---

## Routes to register in `/App.tsx` (or routes file)

```
/dev-tools/card-shapes           → CardShapesLabPage
/dev-tools/card-interactions     → CardInteractionsLabPage
/dev-tools/grid-layouts          → GridLayoutsLabPage
/dev-tools/detail-templates      → DetailTemplatesHubPage
/dev-tools/detail-templates/blog      → BlogDetailTemplatesPage
/dev-tools/detail-templates/portfolio → PortfolioDetailTemplatesPage
/dev-tools/detail-templates/video     → VideoDetailTemplatesPage
/dev-tools/detail-templates/podcast   → PodcastDetailTemplatesPage
/dev-tools/detail-templates/event     → EventDetailTemplatesPage
/dev-tools/detail-templates/ebook     → EbookDetailTemplatesPage
```

---

## SEO entries to add in `/data/mock/seo.ts`

Add entries for all 10 new routes under `devToolsSEO`:
- `cardShapes`, `cardInteractions`, `gridLayouts`, `detailTemplates`
- `detailTemplatesBlog`, `detailTemplatesPortfolio`, `detailTemplatesVideo`, `detailTemplatesPodcast`, `detailTemplatesEvent`, `detailTemplatesEbook`

---

## Sitemap entries to add in `/data/mock/ui/sitemap.ts`

Add all 10 new routes with taglines to the sitemap data.

---

## Execution sequence

### Phase 1: Foundation (data + registration)
1. Create 4 data files in `/data/mock/ui/`
2. Register 4 new tools + 1 new category in `dev-tools.ts`
3. Add SEO entries to `seo.ts`
4. Add sitemap entries to `sitemap.ts`
5. Register all 10 routes in the router

### Phase 2: Card shapes page
6. Create `CardShapesLabPage.tsx` with 11 specimen sections
7. Create `card-shapes-lab.css` with all BEM classes + responsive + reduced motion

### Phase 3: Card interactions page
8. Create `CardInteractionsLabPage.tsx` with 10 interaction sections
9. Create `card-interactions-lab.css` with all BEM classes + keyframes + reduced motion

### Phase 4: Grid layouts page
10. Create `GridLayoutsLabPage.tsx` with 6 grid sections + pagination switcher
11. Create `grid-layouts-lab.css` with all grid patterns + pagination + responsive

### Phase 5: Detail templates hub + 6 sub-pages
12. Create `DetailTemplatesHubPage.tsx` hub
13. Create `detail-templates-hub.css`
14. Create 6 content-type detail template pages
15. Create `detail-template-lightbox.css`, `detail-template-exhibition.css`, `detail-template-current.css`

### Phase 6: Polish
16. Verify all pages load without errors
17. Test light/dark mode on all pages
18. Test keyboard navigation + screen reader
19. Verify `prefers-reduced-motion` disables all animations
20. Cross-reference breadcrumbs, SEO, and sitemap entries

---

## Accessibility requirements

- All card shapes: Focusable with visible focus ring (3px neon pink glow)
- Flip cards: Toggle via Enter/Space key (not just hover)
- Morph expand: Toggle via Enter/Space key, announce state change via `aria-expanded`
- Carousel: Arrow key navigation, `aria-roledescription="carousel"`, `aria-label` on each slide
- All animations: Respect `prefers-reduced-motion: reduce` (disable transforms, transitions, keyframes)
- All interactive elements: `role="button"` or native `<button>` with descriptive `aria-label`
- Tab order: Logical left-to-right, top-to-bottom within each section
- Lightbox: Focus trap when open, Escape to close, arrow keys to navigate

---

## Output files summary

### Components (10 new pages)
- `/components/pages/dev-tools/CardShapesLabPage.tsx`
- `/components/pages/dev-tools/CardInteractionsLabPage.tsx`
- `/components/pages/dev-tools/GridLayoutsLabPage.tsx`
- `/components/pages/dev-tools/DetailTemplatesHubPage.tsx`
- `/components/pages/dev-tools/BlogDetailTemplatesPage.tsx`
- `/components/pages/dev-tools/PortfolioDetailTemplatesPage.tsx`
- `/components/pages/dev-tools/VideoDetailTemplatesPage.tsx`
- `/components/pages/dev-tools/PodcastDetailTemplatesPage.tsx`
- `/components/pages/dev-tools/EventDetailTemplatesPage.tsx`
- `/components/pages/dev-tools/EbookDetailTemplatesPage.tsx`

### Data (4 new files)
- `/data/mock/ui/card-shapes-lab.ts`
- `/data/mock/ui/card-interactions-lab.ts`
- `/data/mock/ui/grid-layouts-lab.ts`
- `/data/mock/ui/detail-templates-lab.ts`

### CSS (7 new files)
- `/styles/blocks/card-shapes-lab.css`
- `/styles/blocks/card-interactions-lab.css`
- `/styles/blocks/grid-layouts-lab.css`
- `/styles/blocks/detail-templates-hub.css`
- `/styles/blocks/detail-template-lightbox.css`
- `/styles/blocks/detail-template-exhibition.css`
- `/styles/blocks/detail-template-current.css`

### Modified files
- `/data/mock/ui/dev-tools.ts` — New tools + category
- `/data/mock/seo.ts` — 10 new SEO entries
- `/data/mock/ui/sitemap.ts` — 10 new sitemap entries
- `/App.tsx` (or routes file) — 10 new routes
- `/data/mock/ui/breadcrumbs.ts` — Breadcrumb patterns for new pages

### Report
- `/reports/feature-work/02-portfolio-redesign.md`
