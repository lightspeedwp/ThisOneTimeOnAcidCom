# Content specimens dev tools — orchestrator

**Created:** March 4, 2026
**Version:** 1.0.0
**Scope:** New dev tools section with content-type specimens (rich text, cards, page layout previews), light/dark mode, tabbed interface, per-content-type neon colours

---

## Overview

Create a new "Content specimens" section within the Developer Tools hub. This section provides comprehensive visual reference for how each content type (blog, portfolio, video, podcast, event) is styled across the site. Three sub-tool pages, all supporting light and dark mode with per-content-type neon rainbow colours.

### New dev tools to create

| Tool | Route | Purpose |
|---|---|---|
| Rich text specimens | `/dev-tools/rich-text-specimens` | Every typography/layout element inside a single post body |
| Content card specimens | `/dev-tools/content-cards` | 5 card variants per content type in grid, list, featured, sidebar, mini contexts |
| Page layout browser | `/dev-tools/page-layouts` | Miniature previews of each content type's detail page layout |

---

## Critical rules

- **[Guidelines.md](../../guidelines/Guidelines.md)** — All rules apply (BEM-only, sentence case, bundler safety, no Tailwind)
- **Light and dark mode** — Every specimen must be viewable in both themes. Include a theme toggle or side-by-side preview.
- **Neon colour assignment** — Each content type gets its own signature neon colour:

| Content type | Neon colour | CSS variable |
|---|---|---|
| Blog | Neon pink | `--wp--preset--color--neon-pink` |
| Portfolio | Neon green | `--wp--preset--color--neon-green` |
| Video | Neon blue | `--wp--preset--color--neon-blue` |
| Podcast | Neon purple | `--wp--preset--color--neon-purple` |
| Event | Neon orange | `--wp--preset--color--neon-orange` |

- **FAQ sections** — Each content type tab/section includes a FAQ section styled with that content type's neon colour
- **Sticker graphics** — Use sticker images from `/data/mock/images/sticker-graphics.ts` as decorative elements
- **No hardcoded content** — All specimen text/data in `/data/mock/ui/` files
- **Breadcrumbs** — `Home > Developer Tools > [Page Name]`
- **SEO** — Register in `/data/mock/seo.ts`
- **Bundler safety** — `var` declarations, no arrow callbacks, no destructuring, `grab()`/`arrayGet()` helpers

---

## Sub-audit 1: Rich text specimens page

**Prompt:** [01-rich-text-specimens.md](./01-rich-text-specimens.md)
**Route:** `/dev-tools/rich-text-specimens`
**Component:** `/components/pages/dev-tools/RichTextSpecimensPage.tsx`
**CSS:** `/styles/blocks/rich-text-specimens.css`
**Data:** `/data/mock/ui/rich-text-specimens.ts`

### Requirements

1. **Tabbed interface** — One tab per content type (Blog, Portfolio, Video, Podcast, Event)
2. **Each tab shows** a complete rich-text specimen for that content type, demonstrating every available styling element within a single post/detail page:
   - Headings (h1–h6)
   - Paragraphs with emphasis, strong, links
   - Blockquotes and pull quotes
   - Ordered and unordered lists
   - Images (full-width, inline, captioned)
   - Code blocks and inline code
   - Tables
   - Horizontal rules
   - Callout boxes / info panels
   - Video embeds (placeholder)
   - Gallery grids
   - Timeline sections (for events)
   - Tags and category badges
   - Share buttons
   - Author bio section (blog)
   - Related content section
3. **Tab accent** — Each tab uses its assigned neon colour for the active indicator
4. **FAQ section per tab** — 3 FAQs per content type, styled with that type's neon colour accent
5. **Theme toggle** — Button to switch between light and dark mode within the page (or use the global theme toggle)
6. **Responsive** — Specimens must look correct at all breakpoints

### Content type-specific elements

| Content type | Unique elements to demonstrate |
|---|---|
| Blog | Author bio, reading time, category badge, tag chips, related posts, social share |
| Portfolio | Image gallery grid, lightbox trigger, event/location metadata, techniques list |
| Video | Video embed placeholder, duration badge, view count, play button overlay |
| Podcast | Episode number, season badge, duration, transcript section, guest info |
| Event | Date range, location map placeholder, travel method badge, edition history, social links |

---

## Sub-audit 2: Content card specimens page

**Prompt:** [02-content-card-specimens.md](./02-content-card-specimens.md)
**Route:** `/dev-tools/content-cards`
**Component:** `/components/pages/dev-tools/ContentCardSpecimensPage.tsx`
**CSS:** `/styles/blocks/content-card-specimens.css`
**Data:** `/data/mock/ui/content-card-specimens.ts`

### Requirements

1. **5 card variants per content type** — Each content type (blog, portfolio, video, podcast, event) gets 5 distinct card designs:

| Variant | Description | Use case |
|---|---|---|
| Standard | Default grid card with image, title, meta, excerpt | Archive/listing pages |
| Featured | Large hero card, full-width image, overlay text | Homepage features, top of archives |
| Compact | Small horizontal card, thumbnail left, text right | Sidebar, related content |
| Minimal | Text-only with subtle border, no image | Dense lists, search results |
| Editorial | Magazine-style, large typography, artistic crop | Special features, highlighted content |

2. **Context demonstrations** — Show each variant in:
   - 3-column grid (standard archive view)
   - 2-column grid (tablet)
   - 1-column list (mobile / list view)
   - Sidebar widget (narrow column)
   - Featured row (1 large + 2 small)

3. **Neon colour accents** — Each content type's cards use its assigned neon colour for:
   - Hover border glow
   - Category/type badge
   - Active/focus indicators

4. **Hover states** — All cards demonstrate:
   - Lift shadow on hover
   - Neon border glow (content-type colour)
   - Image zoom or reveal effect
   - Focus ring for keyboard navigation

5. **Light and dark mode** — Every card rendered in both themes, side by side or with theme toggle

6. **This REPLACES or EXTENDS the existing CardSpecimenPage** — The current `/dev-tools/cards` page has 6 basic card types. This new page is a superset with 5 variants × 5 content types = 25 card specimens, plus the existing tool/tip card types.

### Card design direction

Cards should feel **bold, artistic, and energetic** — not corporate. Design cues:
- Neon accent borders and glows
- Category badges with neon background colours
- Strong contrast between image and text sections
- Hover effects that feel alive (glow, lift, subtle animation)
- Portfolio cards especially should feel different from blog cards — more visual, less text-heavy

---

## Sub-audit 3: Page layout browser

**Prompt:** [03-page-layout-browser.md](./03-page-layout-browser.md)
**Route:** `/dev-tools/page-layouts`
**Component:** `/components/pages/dev-tools/PageLayoutBrowserPage.tsx`
**CSS:** `/styles/blocks/page-layout-browser.css`
**Data:** `/data/mock/ui/page-layout-browser.ts`

### Requirements

1. **Template browser interface** — Grid of miniature page previews, like a template selection screen:
   - Thumbnail preview of each page layout (rendered as a simplified wireframe/schematic, not a full screenshot)
   - Click to expand into a larger preview
   - Label with page name and content type

2. **Pages to include:**

| Content type | Pages |
|---|---|
| Blog | Blog archive, Blog post detail, Blog category archive, Blog tag archive |
| Portfolio | Portfolio archive, Portfolio detail, Portfolio category, Portfolio tag |
| Video | Video archive, Video detail, Video category |
| Podcast | Podcast archive, Podcast detail, Podcast category |
| Event | Event archive, Event detail |
| About | About main, Hidden About landing, About sub-page (generic) |
| Other | Home, Contact, FAQ, Style Guide, Dev Tools, Gear, Stickers, Feedback |

3. **Wireframe/schematic style** — Each layout preview should be a **simplified structural diagram** (not a screenshot or full render) showing:
   - Header/nav placeholder
   - Hero section shape
   - Content area blocks (text columns, image areas, sidebar)
   - Grid/card layout areas
   - Footer placeholder
   - Labelled with BEM section names

4. **Light and dark variants** — Toggle between themes to see how layout elements shift

5. **Click to expand** — Clicking a layout preview opens a larger modal/panel with:
   - Annotated wireframe showing key sections
   - List of components used on that page
   - List of CSS files imported
   - Route path
   - Neon colour assignment (if applicable)

6. **Category filtering** — Filter layouts by content type using tabs or dropdown

---

## Integration with dev tools hub

### Update DevToolsPage

Add a new category group to the dev tools hub:

```typescript
{
  id: 'content-specimens',
  title: 'Content specimens',
  description:
    'Visual reference for content-type styling — rich text elements, card variants, and page layout wireframes across all content types.',
  accent: 'cyan',  // New accent colour — neon cyan
  tools: [
    'rich-text-specimens',
    'content-cards',
    'page-layouts',
  ],
}
```

### New tool entries

Add 3 new entries to the `tools` array in `/data/mock/ui/dev-tools.ts`:

```typescript
{
  id: 'rich-text-specimens',
  title: 'Rich text specimens',
  description: 'Every typography and layout element available inside post content bodies — blockquotes, pull quotes, galleries, tables, and more — for each content type.',
  href: '/dev-tools/rich-text-specimens',
  icon: 'FileText',
  badge: 'Content',
},
{
  id: 'content-cards',
  title: 'Content card gallery',
  description: '5 card variants for each content type — standard, featured, compact, minimal, and editorial — with hover effects, neon accents, and theme previews.',
  href: '/dev-tools/content-cards',
  icon: 'LayoutGrid',
  badge: 'Content',
},
{
  id: 'page-layouts',
  title: 'Page layout browser',
  description: 'Miniature wireframe previews of every page template — click to inspect components, CSS files, and structural anatomy.',
  href: '/dev-tools/page-layouts',
  icon: 'Browser',
  badge: 'Content',
},
```

### Route registration

Add routes in the router configuration for all 3 new pages.

### SEO entries

Add entries to `/data/mock/seo.ts` for `devToolsSEO.richTextSpecimens`, `devToolsSEO.contentCards`, `devToolsSEO.pageLayouts`.

### Breadcrumb entries

Add breadcrumb builder entries using the existing `devToolBreadcrumbs()` pattern.

---

## Deliverables

1. **3 new dev tools pages** (components + CSS + data files)
2. **Updated DevToolsPage** with new "Content specimens" category
3. **Updated dev-tools data** (tools, categories, SEO, breadcrumbs)
4. **Routes registered** for all 3 pages
5. **Report:** `/reports/content-specimens/implementation-report.md`
6. **Task list:** `/tasks/content-specimens-tasks.md`
7. **Master task list** updated

---

## Content neon colour legend (reference)

```
┌─────────────────────────────────────────────────────────────────┐
│              CONTENT TYPE → NEON COLOUR MAPPING                  │
└─────────────────────────────────────────────────────────────────┘

  BLOG         ██████  #FF10F0  Neon Pink      ← Articles, posts, insights
  PORTFOLIO    ██████  #39FF14  Neon Green     ← UV makeup gallery, artwork
  VIDEO        ██████  #1F51FF  Neon Blue      ← Tutorials, showcases, reels
  PODCAST      ██████  #BE00FE  Neon Purple    ← Episodes, transcripts
  EVENT        ██████  #FF5F1F  Neon Orange    ← Festivals, gatherings
  EBOOK        ██████  #FFFF00  Neon Yellow    ← Book chapters, reading
  STICKERS     ██████  #00F7FF  Neon Cyan      ← Sticker art, graphics
  DEV TOOLS    ██████  #FF3131  Neon Red       ← Internal tools, testing
```

This mapping should be documented in a guideline file and referenced by all content-type-aware components.
