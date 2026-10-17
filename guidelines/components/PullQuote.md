# PullQuote Component

**File:** `/components/ui/PullQuote.tsx`  
**Version:** 1.0.0  
**Category:** UI Component (Phase 3)

## Purpose

Renders a large, visually emphasized quotation with neon border accents, decorative quotation marks, and optional author attribution. Replaces manual `<blockquote>` elements across about sub-pages.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `quote` | `string` | *required* | The quote text |
| `author` | `string` | `undefined` | Optional author attribution (rendered in `<cite>`) |
| `variant` | `'left'` \| `'center'` \| `'right'` | `'left'` | Text alignment and decorative positioning |
| `neonColor` | `'pink'` \| `'green'` \| `'blue'` \| `'yellow'` \| `'purple'` | `'pink'` | Neon color for border accent and decorative quotation mark |

## Usage

```tsx
import { PullQuote } from '../../ui/PullQuote';

<PullQuote
  quote="The kid who was made to feel small now makes other people feel radiant."
  author="Ash Shaw"
  variant="center"
  neonColor="pink"
/>
```

## Where Used

- **MusicPage** — featured music quote (purple)
- **FitnessPage** — fitness philosophy quote (green)
- **EducationPage** — education philosophy quote (yellow)
- **PartnersPage** — gratitude quote (pink)
- **ManifestoPage** — manifesto quote
- **AquariusPage** — identity quote
- **AdhdPage** — ADHD quote
- **LightSpeedPage** — company philosophy quote
- **AboutPage** — "the bullied kid" quote

## CSS

Styles are defined in `/styles/blocks/pull-quote.css`, imported by the component.

**BEM structure:**
- `.pull-quote` — block (uses `<blockquote>`)
- `.pull-quote--center` / `.pull-quote--left` / `.pull-quote--right` — alignment modifiers
- `.pull-quote--neon-pink` (etc.) — color modifiers
- `.pull-quote__mark` — decorative quotation mark (aria-hidden)
- `.pull-quote__text` — quote text
- `.pull-quote__author` — `<cite>` author attribution

## Accessibility

- Uses semantic `<blockquote>` element
- Decorative quotation mark is `aria-hidden="true"`
- Author attribution uses `<cite>` element
- WCAG AA color contrast in both light and dark modes

## Migration from Manual Blockquotes

**Before (manual):**
```tsx
<blockquote className="about-subpage__pull-quote" aria-label="Featured quote">
  <p className="about-subpage__pull-quote-text">{data.pullQuote}</p>
</blockquote>
```

**After (Phase 3 component):**
```tsx
<PullQuote quote={data.pullQuote} variant="center" neonColor="purple" />
```
