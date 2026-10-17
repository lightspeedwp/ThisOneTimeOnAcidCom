# Timeline Component

**File:** `/components/ui/Timeline.tsx`  
**Version:** 1.0.0  
**Category:** UI Component (Phase 3)

## Purpose

Displays chronological events along a vertical timeline with neon-glowing dots, optional Phosphor icons, and a configurable color accent. Designed for "story" layouts — education history, notable rides, creative milestones, etc.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `events` | `TimelineEvent[]` | *required* | Array of events with `year`, `title`, `description`, and optional `icon` |
| `variant` | `'vertical'` \| `'horizontal'` | `'vertical'` | Layout direction |
| `colorAccent` | `'pink'` \| `'green'` \| `'blue'` \| `'purple'` \| `'yellow'` | `'pink'` | Neon color for dots and connector |

### TimelineEvent Shape

```ts
{
  year: string;        // Label shown in the dot area (e.g. "2019", "Step 3")
  title: string;       // Event heading
  description: string; // Event body text
  icon?: ReactNode;    // Optional Phosphor icon rendered inside the dot
}
```

## Usage

```tsx
import { Timeline } from '../../ui/Timeline';

var events = [
  { year: '2019', title: 'UV Paint', description: 'The final evolution' },
  { year: '2022', title: 'Ozora Festival', description: 'International debut' },
];

<Timeline events={events} variant="vertical" colorAccent="pink" />
```

## Where Used

- **ProcessPage** — creative process steps
- **CyclingPage** — notable rides
- **EducationPage** — formal education timeline
- **HistoryPage** — career milestones
- **LightSpeedPage** — company timeline
- **AboutPage** — costume evolution timeline

## CSS

Styles are defined in `/styles/blocks/timeline.css`, imported by the component.

**BEM structure:**
- `.timeline` — block
- `.timeline--vertical` / `.timeline--horizontal` — variant modifiers
- `.timeline__connector` — the vertical/horizontal line
- `.timeline__event` — individual event
- `.timeline__dot` — neon-glowing circle
- `.timeline__content` — text area
- `.timeline__year`, `.timeline__title`, `.timeline__desc` — text elements

## Accessibility

- Semantic `<ol>` list structure with `role="list"` for screen readers
- Descriptive `aria-label` on wrapper (`"Timeline"`)
- Keyboard navigable via natural tab order
- `prefers-reduced-motion`: animations disabled

## Bundler Rules

- No arrow functions — use named `function` expressions
- No template literals — use string concatenation
- No `const` — use `var`
- Build timeline data with a `for` loop, not `.map()` with arrows