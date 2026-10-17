# Accordion Component

**File:** `/components/ui/Accordion.tsx`  
**Version:** 1.0.0  
**Category:** UI Component (Phase 3)

## Purpose

Renders a list of expandable/collapsible sections with full keyboard navigation, ARIA attributes, and animated transitions. Supports single-item and multi-item open modes. Used for chapter previews, kit lists, episode previews, grading systems, and FAQ-style content.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | *required* | Array of accordion sections |
| `allowMultiple` | `boolean` | `false` | When true, multiple items can be open simultaneously |
| `defaultOpen` | `string[]` | `[]` | Array of item IDs that should be open on mount |

### AccordionItem Shape

```ts
{
  id: string;              // Unique identifier
  title: string;           // Trigger/header text
  content: React.ReactNode; // Content rendered when expanded
}
```

## Usage

```tsx
import { Accordion } from '../../ui/Accordion';

var items = [
  {
    id: 'art',
    title: 'Art in ADHD',
    content: React.createElement('p', null, 'Hyperfocus is a superpower...'),
  },
  {
    id: 'biz',
    title: 'Business in ADHD',
    content: React.createElement('p', null, 'Process obsession...'),
  },
];

<Accordion items={items} allowMultiple={false} defaultOpen={['art']} />
```

## Building Items from Data (Bundler-Safe Pattern)

```tsx
function buildAccordionItems() {
  var source = somePageData.chapters;
  var items = [];
  for (var i = 0; i < source.length; i++) {
    var ch = source[i];
    items.push({
      id: ch.id,
      title: ch.number + '. ' + ch.title,
      content: React.createElement(
        'p',
        { className: 'about-subpage__section-text' },
        ch.description
      ),
    });
  }
  return items;
}
```

## Where Used

- **BookPage** — chapter previews
- **CyclingPage** — bike kit list
- **PodcastPage** — upcoming episodes
- **SixCatsPage** — grading system
- **LightSpeedPage** — team members, services

## CSS

Styles are defined in `/styles/blocks/accordion.css`, imported by the component.

**BEM structure:**
- `.accordion` — block
- `.accordion__item` — individual section
- `.accordion__trigger` — clickable header button
- `.accordion__trigger--active` — expanded state
- `.accordion__icon` — chevron indicator
- `.accordion__icon--rotated` — rotated state when expanded
- `.accordion__panel` — content wrapper
- `.accordion__content` — inner content area

## Accessibility

- Full keyboard navigation: Arrow Up/Down, Enter/Space, Home, End
- `aria-expanded` on trigger buttons
- `aria-controls` linking triggers to content panels
- `aria-labelledby` linking panels to triggers
- `role="region"` on content panels
- `prefers-reduced-motion`: expand/collapse animations disabled

## Bundler Rules

- Build items array with `for` loop and `React.createElement()` (not JSX in data builders)
- Use `var` instead of `const`/`let`
- No arrow functions in callbacks — use named function expressions
