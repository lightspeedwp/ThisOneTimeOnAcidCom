# StatCard Component

**Location:** `/components/ui/StatCard.tsx`
**Version:** 1.0.0
**Created:** March 1, 2026

## Purpose

Reusable stat/fact grid component that renders an accessible list of label/value pairs. Replaces the repeated `about-subpage__facts` + `about-subpage__fact` inline pattern used across 8+ about sub-pages.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `StatItem[]` | Yes | Array of `{ id, label, value }` objects |
| `ariaLabel` | `string` | Yes | Accessible label for the stat grid |

### `StatItem` interface

```ts
interface StatItem {
  id: string;
  label: string;
  value: string;
}
```

## Usage

```tsx
import { StatCard } from '../../ui/StatCard';

<StatCard
  items={data.quickFacts}
  ariaLabel="ADHD quick facts"
/>
```

## CSS Classes Used

All classes are defined in `/styles/blocks/about-subpage.css`:

- `.about-subpage__facts` — grid container
- `.about-subpage__fact` — individual stat card
- `.about-subpage__fact-label` — label text (neon accent in dark mode)
- `.about-subpage__fact-value` — value text

## Accessibility

- Uses `role="list"` on container and `role="listitem"` on each card
- `aria-label` on the container describes the stat collection
- No interactive elements (purely informational display)

## Pages Using This Component

1. BioPage — "Quick facts about Ash Shaw"
2. AdhdPage — "ADHD quick facts"
3. AquariusPage — "Aquarian traits"
4. CyclingPage — "Cycling stats"
5. EducationPage — "Education stats"
6. FitnessPage — "Fitness stats"
7. LightSpeedPage — "LightSpeed stats"
8. MusicPage — "Music stats"
