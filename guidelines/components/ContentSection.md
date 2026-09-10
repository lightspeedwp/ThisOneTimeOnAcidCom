# ContentSection Component

**File:** `/components/sections/ContentSection.tsx`  
**Version:** 1.0.0  
**Category:** Section Component (Phase 3)

## Purpose

A versatile section wrapper that provides consistent spacing, optional titles/subtitles, color accents, and background patterns. The primary building block for about sub-page body content, replacing raw `<section>` + `<h2>` patterns.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Optional section heading (renders as `<h2>`) |
| `subtitle` | `string` | `undefined` | Optional subtitle below heading |
| `children` | `ReactNode` | *required* | Section content |
| `variant` | `'default'` \| `'hero'` \| `'callout'` \| `'aside'` | `'default'` | Layout variant |
| `colorAccent` | `'pink'` \| `'green'` \| `'blue'` \| `'purple'` \| `'yellow'` | `'pink'` | Neon color for left border and accent |
| `backgroundPattern` | `'noise'` \| `'gradient'` \| `'none'` | `'none'` | Optional background pattern |
| `id` | `string` | `undefined` | HTML id for anchor linking / scroll spy |

## Variants

| Variant | Description |
|---|---|
| `default` | Standard content section with left-border accent |
| `hero` | Full-width, larger spacing, gradient background |
| `callout` | Highlighted box with stronger background |
| `aside` | Smaller, lighter — for supplementary content |

## Usage

```tsx
import { ContentSection } from '../../sections/ContentSection';

<ContentSection
  id="philosophy"
  title="The Aquarian Blueprint"
  subtitle="Born under the water bearer sign"
  variant="callout"
  colorAccent="blue"
>
  <p className="about-subpage__section-text">
    Ash has always questioned everything...
  </p>
</ContentSection>
```

## Common Pattern: Wrapping Data-Driven Sections

```tsx
{data.sections.map(function (section, idx) {
  var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

  return (
    <div key={section.id} className={'entrance-fade-up' + delayClass}>
      <ContentSection
        id={section.id}
        title={section.title}
        variant="default"
        colorAccent="green"
      >
        {section.paragraphs.map(function (p, i) {
          return (
            <p key={section.id + '-p-' + i} className="about-subpage__section-text">
              {p}
            </p>
          );
        })}
      </ContentSection>
    </div>
  );
})}
```

## Where Used

Every about sub-page uses ContentSection for body sections. Key examples:
- **AboutPage** — all 4 main content areas
- **BerlinPage** — city sections (blue accent)
- **MusicPage** — music sections (purple accent)
- **CyclingPage** — ride sections + notable rides wrapper (green accent)
- **HistoryPage** — milestones wrapper (pink accent)
- **All other sub-pages** — body content sections

## CSS

Styles are defined in `/styles/blocks/content-section.css`, imported by the component.

**BEM structure:**
- `.content-section` — block
- `.content-section--default` / `--hero` / `--callout` / `--aside` — variant modifiers
- `.content-section--accent-pink` (etc.) — color modifiers
- `.content-section__header` — title/subtitle area
- `.content-section__title` — `<h2>` heading
- `.content-section__subtitle` — subtitle text
- `.content-section__body` — children wrapper

## Accessibility

- Uses `<section>` semantic element
- `aria-labelledby` links to the title when present
- Title rendered as `<h2>` maintaining heading hierarchy
- Color accents meet WCAG AA contrast requirements

## Bundler Rules

- Use `var` for all variables
- String concatenation for dynamic class names (no template literals)
- Named function expressions in `.map()` callbacks
