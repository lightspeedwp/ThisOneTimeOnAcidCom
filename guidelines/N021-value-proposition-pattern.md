# N021: Value Proposition Pattern

**Document ID:** N021  
**Category:** Patterns (Value Proposition)  
**Authority:** D4 (N-Document Approvals); D1 (Canonical Voice: Balanced Hybrid)  
**Last Updated:** 2026-11-09

## Purpose

Define the Value Proposition section pattern for communicating core benefits and unique differentiators of ThisOneTimeOnAcidCom to visitors.

## Pattern Overview

The Value Proposition displays 3-4 key benefits in a grid with icons and descriptions:

```typescript
┌────────────────────────────────────┐
│   Why Read This One Time On Acid?  │
├────────────────────────────────────┤
│
│  [Icon]         [Icon]    [Icon]
│  Immersive    Authentic  Inspiring
│  Storytelling   Voice       Journey
│
│  Deep dive      Raw, honest  Personal
│  into psyched-  first-person transformation
│  elic culture   narrative    across 200+
│                              pages
│
│          [Learn More]
│
└────────────────────────────────────┘
```typescript

## Section Anatomy

| Element | Purpose | Content |
|---------|---------|---------|
| Section Heading | Section title | "Why Read...", "Key Benefits", etc. |
| Subheading | Context | Optional tagline or description |
| Benefit Cards | Individual value points | 3-4 cards max |
| Card Icon | Visual identifier | SVG or image icon |
| Card Heading | Benefit title | 1-2 words |
| Card Description | Detailed explanation | 2-3 sentences |
| CTA Button | Action | "Learn More", "Get Started" |

## Responsive Behavior

### Desktop (1025px+)

```typescript
┌────────────────────────────────────┐
│ Heading                            │
│                                    │
│  [Icon] [Icon] [Icon] [Icon]       │
│ Benefit Benefit Benefit Benefit     │
│ Description Description Description │
│                                    │
│           [CTA Button]             │
└────────────────────────────────────┘
```typescript

### Tablet (641px-1024px)

```typescript
┌──────────────────────┐
│ Heading              │
│                      │
│ [Icon] [Icon]        │
│ Benefit Benefit      │
│ Description...       │
│                      │
│ [Icon] [Icon]        │
│ Benefit Benefit      │
│ Description...       │
│                      │
│      [CTA Button]    │
└──────────────────────┘
```typescript

### Mobile (320px-640px)

```typescript
┌──────────┐
│ Heading  │
│          │
│ [Icon]   │
│ Benefit  │
│ Desc...  │
│          │
│ [Icon]   │
│ Benefit  │
│ Desc...  │
│          │
│  [CTA]   │
└──────────┘
```typescript

## Component Structure

```tsx
interface BenefitCard {
  icon: React.ReactNode;  // SVG or icon component
  title: string;          // Benefit headline
  description: string;    // Detailed explanation
}

interface ValuePropositionProps {
  heading: string;        // Section title
  subheading?: string;    // Optional tagline
  benefits: BenefitCard[];  // 3-4 benefit cards
  cta?: {
    text: string;
    href: string;
  };
}
```typescript

## Voice & Messaging

### Heading Guidelines (D1: Balanced Hybrid Voice)

✅ **Conversational + Professional**
- "Why Read This One Time On Acid?"
- "What Makes This Book Different?"
- "Join Readers Exploring Consciousness"

❌ **Avoid**
- "Value Proposition" (too corporate)
- "Features" (too technical)
- "Discover the Truth About..." (too sensational)

### Description Guidelines

- **Honest & Authentic:** Speak truth without hyperbole
- **Benefit-Focused:** Emphasize reader outcomes, not book features
- **Conversational:** Write as if speaking to an intelligent friend
- **Specific:** Provide concrete details, not vague claims

### Example Messaging

```markdown
### Immersive Storytelling
Dive deep into the author's lived experience, woven through
vivid scenes, introspection, and unexpected humor. Experience
the festival and the inner journey as one integrated narrative.

### Authentic Voice
Raw, first-person account without pretense or self-help
platitudes. Honest exploration of consciousness, culture,
and personal transformation.

### Transformative Insights
Thoughtful reflection on psychedelic experience, festival
culture, and what it means to seek meaning. Relevant whether
you're experienced or curious.
```typescript

## Visual Specifications

### Icons

- Size: 48px × 48px (default), 64px × 64px (desktop)
- Style: Consistent with design system (N001)
- Color: Primary brand color (high contrast)
- Animation: Optional subtle hover effect

### Cards

- Background: Subtle background color or transparent
- Padding: 24px (mobile), 32px (desktop)
- Border radius: 8px (consistent with design tokens)
- Shadow: Subtle elevation (0.5rem offset, 8% opacity)
- Hover: slight shadow increase, no scale change

### Typography

- Heading: bold, 2rem (desktop) / 1.5rem (mobile)
- Subheading: regular, 1.125rem
- Card title: semi-bold, 1.125rem
- Card description: regular, 1rem

## CSS Classes (BEM)

```css
.value-proposition { }
.value-proposition__heading { }
.value-proposition__subheading { }
.value-proposition__benefits { }
.benefit-card { }
.benefit-card__icon { }
.benefit-card__title { }
.benefit-card__description { }
.value-proposition__cta { }
```typescript

## Accessibility Features

- Heading is h2 (or h1 if first on page)
- Card titles are h3 for semantic structure
- Icon alt text or aria-label for screen readers
- CTA button has descriptive text
- Color contrast ≥4.5:1 for all text
- No color-only meaning (use icons + text)
- Focus visible on cards and buttons
- Sufficient touch target size (48px minimum)

## States & Interactions

### Hover State (Desktop)

- Card background color slight shift
- Shadow elevation increases
- Icon scale increase (1.05x)
- Transition time: 200ms ease-out

### Mobile Interactions

- Tap-friendly card size (avoid hover effects)
- Focus ring visible on keyboard navigation
- Touch target size: 48px × 48px minimum

## Performance Considerations

- Icons as inline SVG (no extra requests)
- Images served as WebP with JPG fallback
- Lazy load entire section if below fold
- Avoid animation on low-end devices
- CSS animations use GPU-accelerated properties

## Example Implementation

```tsx
import { ValueProposition } from '@/components/ValueProposition';

const benefits = [
  {
    icon: <BookIcon />,
    title: 'Immersive',
    description: 'Vivid storytelling that transports you into the experience...',
  },
  {
    icon: <VoiceIcon />,
    title: 'Authentic',
    description: 'Raw, honest first-person narrative without pretense...',
  },
  {
    icon: <InsightIcon />,
    title: 'Transformative',
    description: 'Thoughtful reflection on consciousness and meaning...',
  },
];

export function HomePage() {
  return (
    <ValueProposition
      heading="Why Read This One Time On Acid?"
      subheading="A memoir that speaks to everyone seeking authenticity"
      benefits={benefits}
      cta={{ text: 'Start Reading', href: '/book' }}
    />
  );
}
```typescript

## Testing Strategy

- Unit test: props rendering and card count
- Responsive test: 3+ viewport sizes
- Accessibility audit: heading hierarchy, contrast, focus
- Visual regression: card styles consistency
- Voice audit: messaging tone consistency with D1

## See Also

- **N020:** Hero Pattern
- **N019:** Book Card Pattern
- **Guidelines.md:** Writing style and voice guidelines
- D1 Decision: Canonical Voice
