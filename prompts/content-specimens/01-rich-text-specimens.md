# Sub-audit 1: Rich text specimens page

**Parent:** [orchestrator.md](./orchestrator.md)
**Route:** `/dev-tools/rich-text-specimens`

---

## Objective

Create a tabbed dev tools page that demonstrates every rich-text styling element available within single-post/detail-page content bodies. One tab per content type, each styled with its assigned neon colour.

---

## Page structure

```
┌──────────────────────────────────────────────────────────────┐
│  Breadcrumbs: Home > Developer Tools > Rich text specimens   │
│  Badge: Content                                              │
│  H1: Rich text specimens (gradient)                          │
│  Subtitle: Every typography and layout element available...   │
├──────────────────────────────────────────────────────────────┤
│  [ Blog ] [ Portfolio ] [ Video ] [ Podcast ] [ Event ]      │
│  ─────── (active tab underline in content-type neon colour)  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌── Theme toggle ──────────────────────────────────────┐   │
│  │  [Light]  [Dark]  [Side by side]                      │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── Rich text specimen (scrollable) ───────────────────┐   │
│  │                                                       │   │
│  │  H1: Post title                                       │   │
│  │  Meta bar: date, category, read time, author          │   │
│  │  Body text paragraphs...                              │   │
│  │  H2: Section heading                                  │   │
│  │  Blockquote                                           │   │
│  │  Image (full-width, captioned)                        │   │
│  │  Unordered list                                       │   │
│  │  H3: Subsection heading                               │   │
│  │  Ordered list                                         │   │
│  │  Pull quote                                           │   │
│  │  Image gallery (2-3 column grid)                      │   │
│  │  Table                                                │   │
│  │  Code block                                           │   │
│  │  Callout / info panel                                 │   │
│  │  Horizontal rule                                      │   │
│  │  Tags + Share                                         │   │
│  │  Author bio section                                   │   │
│  │  FAQ section (neon coloured)                           │   │
│  │  Related content cards                                │   │
│  │                                                       │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Tab content specifications

### Blog tab (neon pink)

Demonstrate the complete blog post body styling:
- Post title (h1 with neon pink gradient)
- Meta bar: published date, category badge (pink), read time, author avatar + name
- Opening paragraph with **bold**, *italic*, and [links](#)
- H2 section heading
- Blockquote with left border (neon pink)
- Full-width image with caption
- Unordered list (3–4 items)
- H3 sub-heading
- Ordered list (numbered steps)
- Pull quote component (PullQuote from `/components/ui/PullQuote.tsx`)
- Image gallery (2–3 images in a responsive grid)
- Table (3 columns, 4 rows — e.g., UV paint comparison)
- Inline code and code block
- Callout box (tip/warning style)
- Horizontal rule
- Tag chips + share buttons
- Author bio card
- FAQ section with 3 FAQs (pink accent)
- Related posts (3 blog cards)

### Portfolio tab (neon green)

Demonstrate the portfolio detail page content styling:
- Entry title (h1 with neon green gradient)
- Meta bar: date, location, event name, category badge (green)
- Opening description paragraph
- Hero image (full-width, 3:4 or 1:1 aspect)
- Technique description (h2 + paragraphs)
- Image gallery (masonry or grid, 4–6 images)
- H3: Behind the scenes
- Pull quote about the design
- Tags list
- FAQ section with 3 FAQs (green accent)
- Related portfolio entries (3 cards)

### Video tab (neon blue)

Demonstrate the video detail page content styling:
- Video title (h1 with neon blue gradient)
- Video embed placeholder (16:9 with play button overlay)
- Meta bar: duration, views, likes, category badge (blue), publish date
- Description paragraphs with timestamps
- H2: What you'll see
- Unordered list of highlights
- H2: Behind the scenes
- Paragraphs with inline images
- FAQ section with 3 FAQs (blue accent)
- Related videos (3 cards)

### Podcast tab (neon purple)

Demonstrate the podcast detail page content styling:
- Episode title (h1 with neon purple gradient)
- Cover image (square, album-art style)
- Meta bar: episode number, season, duration, category badge (purple)
- Audio player placeholder
- Show notes (h2 + rich text)
- H2: Transcript
- Transcript section (styled dialogue format with speaker labels)
- Guest info card (if applicable)
- FAQ section with 3 FAQs (purple accent)
- Related episodes (3 cards)

### Event tab (neon orange)

Demonstrate the event detail page content styling:
- Event name (h1 with neon orange gradient)
- Date range badge, location, genre tags
- Hero image
- Description paragraphs
- H2: Editions attended
- Timeline component (vertical, orange accent) showing edition history
- H2: Travel
- Travel method badge (bicycle icon), distance, route description
- Image gallery from the event
- Social links (event's social accounts)
- FAQ section with 3 FAQs (orange accent)
- Related events (3 cards)

---

## Technical implementation

### Tab component

Build a reusable tab component or use a simple state-driven approach:
```typescript
var [activeTab, setActiveTab] = useState('blog');
```

Each tab button gets its neon colour as the active underline:
```css
.rich-text-tabs__tab--blog.rich-text-tabs__tab--active {
  border-bottom-color: var(--wp--preset--color--neon-pink);
}
```

### Theme preview modes

Provide 3 viewing modes:
1. **Light** — forces light theme on the specimen container
2. **Dark** — forces dark theme on the specimen container
3. **Side by side** — renders the same specimen in two columns, one light, one dark

Implementation: wrap specimen in a container with `.force-light` or `.force-dark` class that overrides CSS variables.

### Data file

All specimen content text lives in `/data/mock/ui/rich-text-specimens.ts`:
```typescript
export const richTextSpecimens = {
  blog: {
    title: 'UV Makeup at Origin Festival 2026',
    meta: { date: '2026-02-15', category: 'Festival', readTime: 8, author: 'Ash Shaw' },
    content: '...',
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

- Component: `/components/pages/dev-tools/RichTextSpecimensPage.tsx`
- CSS: `/styles/blocks/rich-text-specimens.css`
- Data: `/data/mock/ui/rich-text-specimens.ts`
- Route registered
- SEO entry added
- Breadcrumb entry added
