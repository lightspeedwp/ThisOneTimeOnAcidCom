# Content-type neon colour legend

**Version:** 1.0.0
**Created:** March 6, 2026
**Data source:** `/data/mock/ui/content-type-colours.ts`

---

## Overview

Every content type in the Ash Shaw portfolio has an assigned neon colour used consistently across card accents, badges, tab indicators, FAQ sections, specimen pages, timeline markers, and all other content-type-aware UI components.

**Single source of truth:** Always import from `/data/mock/ui/content-type-colours.ts` rather than hardcoding hex values.

---

## Colour mapping

| Content type | Neon colour | Hex | CSS variable | BEM modifier | Phosphor icon |
|---|---|---|---|---|---|
| **Blog** | Neon pink | `#FF10F0` | `--wp--preset--color--neon-pink` | `--blog` | `Newspaper` |
| **Portfolio** | Neon green | `#39FF14` | `--wp--preset--color--neon-green` | `--portfolio` | `Image` |
| **Video** | Neon blue | `#1F51FF` | `--wp--preset--color--neon-blue` | `--video` | `Play` |
| **Podcast** | Neon purple | `#BE00FE` | `--wp--preset--color--neon-purple` | `--podcast` | `Microphone` |
| **Event** | Neon orange | `#FF5F1F` | `--wp--preset--color--neon-orange` | `--event` | `Calendar` |
| **Ebook** | Neon yellow | `#FFFF00` | `--wp--preset--color--neon-yellow` | `--ebook` | `BookOpen` |
| **Stickers** | Neon cyan | `#00F7FF` | `--wp--preset--color--neon-cyan` | `--stickers` | `Sticker` |
| **Dev tools** | Neon red | `#FF3131` | `--wp--preset--color--neon-red` | `--dev-tools` | `Wrench` |

---

## Visual legend

```
  BLOG         ██████  #FF10F0  Neon Pink      ← Articles, posts, insights
  PORTFOLIO    ██████  #39FF14  Neon Green     ← UV makeup gallery, artwork
  VIDEO        ██████  #1F51FF  Neon Blue      ← Tutorials, showcases, reels
  PODCAST      ██████  #BE00FE  Neon Purple    ← Episodes, transcripts
  EVENT        ██████  #FF5F1F  Neon Orange    ← Festivals, gatherings
  EBOOK        ██████  #FFFF00  Neon Yellow    ← Book chapters, reading
  STICKERS     ██████  #00F7FF  Neon Cyan      ← Sticker art, graphics
  DEV TOOLS    ██████  #FF3131  Neon Red       ← Internal tools, testing
```

---

## Usage

### Importing the data

```typescript
import { getContentTypeColour, contentTypeColours } from '../data/mock/ui/content-type-colours';

// Get a single content type's colour
var blogColour = getContentTypeColour('blog');
// → { id: 'blog', hex: '#FF10F0', cssVariable: '--wp--preset--color--neon-pink', ... }

// Iterate all content types
for (var i = 0; i < contentTypeColours.length; i++) {
  var ct = contentTypeColours[i];
  // ct.id, ct.hex, ct.cssVariable, ct.modifier, ct.icon, ct.description
}
```

### BEM class pattern

When styling content-type-aware components, use the modifier segment:

```css
/* Tab active states */
.tabs__tab--active.tabs__tab--blog {
  border-bottom-color: var(--wp--preset--color--neon-pink);
  color: var(--wp--preset--color--neon-pink);
}

.tabs__tab--active.tabs__tab--portfolio {
  border-bottom-color: var(--wp--preset--color--neon-green);
  color: var(--wp--preset--color--neon-green);
}

/* Card hover glow */
.card--blog:hover {
  box-shadow: 0 8px 32px rgba(255, 16, 240, 0.25);
}

/* Category badge backgrounds */
.badge--blog { background: var(--wp--preset--color--neon-pink); }
.badge--portfolio { background: var(--wp--preset--color--neon-green); }
```

---

## Where this mapping is used

- **Content specimen pages** — Tab indicators, accent borders, FAQ sections
- **Rich text specimens** — Per-tab neon accents
- **Content card gallery** — Hover glow, category badges, border accents
- **Page layout browser** — Content-type filter badges
- **Archive pages** — Category badges on cards
- **Timeline markers** — Category-coloured dots and connectors
- **Dev tools hub** — Badge colours for content-type tools

---

## Rules

1. **Never hardcode hex values** — Always use CSS variables or import from the data file
2. **Maintain consistency** — Every piece of UI that varies by content type must use this mapping
3. **Dark mode safe** — All neon colours are designed for dark (atomic black) backgrounds; use the accessible text variants from `neon-colors.md` for light mode
4. **New content types** — If a new content type is added, assign a colour from the 8 available neons and add it to `content-type-colours.ts` first
