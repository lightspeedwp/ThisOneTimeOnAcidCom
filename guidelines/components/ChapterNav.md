# ChapterNav Component

**File:** `/components/ui/ChapterNav.tsx`  
**Version:** 1.0.0  
**Category:** UI Component (Phase 3)

## Purpose

Renders a sticky chapter navigation sidebar (desktop) or horizontal scroll strip (mobile) that highlights the active section as the user scrolls. Used on long-form pages to provide persistent wayfinding.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `chapters` | `ChapterEntry[]` | *required* | Array of navigable chapters |
| `activeChapter` | `string` | `undefined` | Currently active chapter ID (set via scroll spy) |
| `onChapterClick` | `(id: string) => void` | `undefined` | Callback when a chapter link is clicked |

### ChapterEntry Shape

```ts
{
  id: string;    // Matches the section's HTML id attribute
  label: string; // Display label in the nav
}
```

## Usage

```tsx
import { ChapterNav } from '../../ui/ChapterNav';

var chapters = [
  { id: 'aquarian', label: 'The Aquarian Blueprint' },
  { id: 'wired', label: 'Wired Different' },
  { id: 'costume', label: 'The Costume Evolution' },
  { id: 'bullied', label: 'The Bullied Kid' },
];

<ChapterNav
  chapters={chapters}
  activeChapter={activeId}
  onChapterClick={handleChapterClick}
/>
```

## Scroll Spy Integration

The parent page manages scroll spy state. Pattern from `AboutPage.tsx`:

```tsx
var chapterState = useState('');
var activeChapter = chapterState[0];
var setActiveChapter = chapterState[1];

useEffect(function () {
  function handleScroll() {
    // Check each chapter section's position
    // Set activeChapter to the one currently in view
  }
  window.addEventListener('scroll', handleScroll);
  return function () {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

## Where Used

- **AboutPage** — main about landing page (4 chapters)

## CSS

Styles are defined in `/styles/blocks/chapter-nav.css`, imported by the component.

**BEM structure:**
- `.chapter-nav` — block (uses `<nav>`)
- `.chapter-nav__list` — scrollable list container
- `.chapter-nav__item` — individual chapter link
- `.chapter-nav__item--active` — highlighted active state (neon glow)

**Responsive behavior:**
- **Desktop (>1024px):** Vertical sidebar, `position: sticky`, left-aligned
- **Mobile (<1024px):** Horizontal scroll strip at top of content area

## Accessibility

- Uses `<nav>` element with `aria-label="Chapter navigation"`
- `aria-current="true"` on the active chapter
- Keyboard navigable: Tab through links, Enter/Space to activate
- `prefers-reduced-motion`: smooth scroll replaced with instant jump

## Bundler Rules

- No arrow functions in `onChapterClick` callback — wrap in named function
- Use `var` for state declarations
