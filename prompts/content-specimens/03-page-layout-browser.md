# Sub-audit 3: Page layout browser

**Parent:** [orchestrator.md](./orchestrator.md)
**Route:** `/dev-tools/page-layouts`

---

## Objective

Create a template browser dev tool that shows miniature wireframe previews of every page template in the application. Click any preview to see an expanded view with component annotations, CSS file references, and structural anatomy.

---

## Design concept

The page should feel like a **template selection screen** — a grid of cards where each card is a miniature structural wireframe of a page layout. Think of it like a CMS template picker or a Figma frame browser.

### Wireframe style

Each preview is a **simplified structural diagram** drawn with CSS (not screenshots or rendered pages). Use:
- Rectangles with rounded corners for sections
- Solid fills in neutral greys for content blocks
- Dashed borders for optional sections
- Neon colour-coded blocks for content-type-specific areas
- Small labels in monospace font for section names

```
┌──────────────────────────┐
│  ░░░░ Header ░░░░░░░░░░  │
├──────────────────────────┤
│  ████████████████████████ │  ← Hero (large block)
│  ████████████████████████ │
├──────────────────────────┤
│  ██ ██ ██  │ ████████████ │  ← Grid + Sidebar
│  ██ ██ ██  │ ████████████ │
│  ██ ██ ██  │              │
├──────────────────────────┤
│  ░░░░ Footer ░░░░░░░░░░  │
└──────────────────────────┘
```

---

## Page layout inventory

### Blog layouts
| Layout | Route | Structure |
|---|---|---|
| Blog archive | `/blog` | Hero → ArchiveFilters → 2-col card grid → Pagination |
| Blog post | `/blog/:slug` | Hero → Reading progress → Article body → Author bio → FAQ → Related |
| Blog category | `/blog/category/:slug` | Hero → Category description → Card grid → Pagination |
| Blog tag | `/blog/tag/:slug` | Hero → Tag description → Card grid → Pagination |

### Portfolio layouts
| Layout | Route | Structure |
|---|---|---|
| Portfolio archive | `/portfolio` | Hero → Filters → Card grid → Pagination |
| Portfolio detail | `/portfolio/:id` | Hero image → Gallery → Content → FAQ → Feedback → Related |
| Portfolio category | `/portfolio/category/:slug` | Hero → Category → Card grid → Pagination |
| Portfolio tag | `/portfolio/tag/:slug` | Hero → Tag → Card grid → Pagination |

### Video layouts
| Layout | Route | Structure |
|---|---|---|
| Video archive | `/videos` | Hero → Filters → Card grid → Pagination |
| Video detail | `/videos/:slug` | Video embed → Meta → Content → FAQ → Related |
| Video category | `/videos/category/:slug` | Hero → Card grid → Pagination |

### Podcast layouts
| Layout | Route | Structure |
|---|---|---|
| Podcast archive | `/podcasts` | Hero → Filters → Card grid → Pagination |
| Podcast detail | `/podcasts/:slug` | Cover art → Audio → Show notes → Transcript → FAQ → Related |
| Podcast category | `/podcasts/category/:slug` | Hero → Card grid → Pagination |

### Event layouts
| Layout | Route | Structure |
|---|---|---|
| Event archive | `/events` | Hero → Stats → Card grid |
| Event detail | `/events/:slug` | Hero → Editions timeline → Travel → Gallery → FAQ |

### About layouts
| Layout | Route | Structure |
|---|---|---|
| About (journey) | `/about` | Hero → ChapterNav sidebar → Scroll-spy content sections |
| Hidden About | `/about` (unlisted) | Hero → Story summary → Media links → Sub-page grid |
| About sub-page | `/about/:slug` | Hero → Content sections → Pull quotes → FAQ |

### Other layouts
| Layout | Route | Structure |
|---|---|---|
| Home | `/` | Hero → Featured → Blog preview → FAQ |
| Contact | `/contact` | Hero → Typeform embed → FAQ |
| FAQ aggregate | `/faq` | Hero → Search → Category filter → Accordion list |
| Style guide | `/dev-tools/style-guide` | Hero → Token sections |
| Dev tools hub | `/dev-tools` | Hero → Jump nav → Category groups → Tool cards |
| Gear | `/gear` | Hero → Category cards → Item lists |
| Stickers | `/stickers` | Hero → Masonry grid |
| Feedback | `/feedback` | Hero → Testimonial cards |
| Ebook | `/about/ebook` | Hero → Chapter nav → Reading pane |
| Search results | `/search` | Search bar → Tabs → Result groups |

---

## Page structure

```
┌──────────────────────────────────────────────────────────────┐
│  Breadcrumbs: Home > Developer Tools > Page layout browser   │
│  Badge: Content                                              │
│  H1: Page layout browser (gradient)                          │
│  Subtitle: Structural wireframe previews of every page...    │
├──────────────────────────────────────────────────────────────┤
│  Category filter tabs:                                       │
│  [All] [Blog] [Portfolio] [Video] [Podcast] [Event]          │
│  [About] [Other]                                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Theme toggle: [Light] [Dark]                                │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ wireframe │  │ wireframe │  │ wireframe │  │ wireframe │   │
│  │          │  │          │  │          │  │          │    │
│  │ Blog     │  │ Blog     │  │ Blog     │  │ Portfolio │   │
│  │ Archive  │  │ Post     │  │ Category │  │ Archive  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ wireframe │  │ wireframe │  │ wireframe │  │ wireframe │   │
│  │          │  │          │  │          │  │          │    │
│  │ Portfolio │  │ Video    │  │ Video    │  │ Podcast  │    │
│  │ Detail   │  │ Archive  │  │ Detail   │  │ Archive  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Expanded detail panel

When clicking a wireframe preview, an expanded panel (modal or slide-out) shows:

```
┌──────────────────────────────────────────────────────────────┐
│  [X Close]                                                    │
│                                                              │
│  Blog post detail                                            │
│  Route: /blog/:slug                                          │
│  Content type: Blog (neon pink)                               │
│                                                              │
│  ┌── Large annotated wireframe ─────────────────────────┐   │
│  │                                                       │   │
│  │  ┌─────────────────────────┐ ← header.css             │   │
│  │  │ Header                  │                          │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ █ Reading progress bar  │ ← blog-article.css       │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ ████████████████████    │ ← Hero image             │   │
│  │  │ Title + Meta            │                          │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ Article body            │ ← blog-rich-text.css     │   │
│  │  │ (rich text content)     │                          │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ Author bio card         │ ← blog-article.css       │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ FAQ section             │ ← faq.css                │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ Related posts (3 cards) │ ← blog-list.css          │   │
│  │  ├─────────────────────────┤                          │   │
│  │  │ Footer                  │ ← footer.css             │   │
│  │  └─────────────────────────┘                          │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  Components used:                                            │
│  - BlogPostPage (main)                                       │
│  - Breadcrumbs                                               │
│  - OptimizedImage                                            │
│  - ShareComponent                                            │
│  - FaqSection                                                │
│  - SliderCard / ResponsiveGridSlider                          │
│                                                              │
│  CSS files:                                                  │
│  - /styles/blocks/blog-article.css                            │
│  - /styles/blocks/blog-rich-text.css                          │
│  - /styles/blocks/faq.css                                     │
│                                                              │
│  Neon colour: Pink (#FF10F0)                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Technical implementation

### Wireframe renderer

Create a reusable `PageWireframe` component that renders structural blocks:

```typescript
interface WireframeBlock {
  id: string;
  label: string;
  type: 'header' | 'hero' | 'content' | 'sidebar' | 'grid' | 'footer' | 'section';
  height: 'sm' | 'md' | 'lg' | 'xl';
  children?: WireframeBlock[];
  cssFile?: string;
  neonColour?: string;
}
```

The wireframe is rendered entirely with CSS (BEM classes like `.wireframe__block`, `.wireframe__block--hero`, etc.) — no images needed.

### Data file

`/data/mock/ui/page-layout-browser.ts`:
```typescript
export interface PageLayout {
  id: string;
  name: string;
  route: string;
  contentType: 'blog' | 'portfolio' | 'video' | 'podcast' | 'event' | 'about' | 'other';
  neonColour: string;
  blocks: WireframeBlock[];
  components: string[];
  cssFiles: string[];
}

export const pageLayouts: PageLayout[] = [
  {
    id: 'blog-archive',
    name: 'Blog archive',
    route: '/blog',
    contentType: 'blog',
    neonColour: '--wp--preset--color--neon-pink',
    blocks: [...],
    components: ['BlogPage', 'ArchiveFilters', 'Pagination', 'FaqSection'],
    cssFiles: ['blog-list.css', 'archive-filters.css', 'faq.css'],
  },
  // ... all other layouts
];
```

---

## Output

- Component: `/components/pages/dev-tools/PageLayoutBrowserPage.tsx`
- Sub-component: `/components/ui/PageWireframe.tsx` (reusable wireframe renderer)
- CSS: `/styles/blocks/page-layout-browser.css`, `/styles/blocks/page-wireframe.css`
- Data: `/data/mock/ui/page-layout-browser.ts`
- Route registered
- SEO entry added
- Breadcrumb entry added
