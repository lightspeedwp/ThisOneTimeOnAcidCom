# N022: Journal Preview Pattern

**Document ID:** N022  
**Category:** Patterns (Journal Preview)  
**Authority:** D4 (N-Document Approvals); D2 (Publication Model: Mixed visibility)  
**Last Updated:** 2026-11-09

## Purpose

Define the Journal Preview component pattern for displaying journal entries in lists, archives, and featured sections with progressive disclosure of content.

## Pattern Overview

The Journal Preview displays entry metadata and excerpt with progressive content revelation:

```
┌──────────────────────────────────────┐
│ Date: Nov 9, 2024                    │  ← Metadata
│ Author: Ashley                       │
│ Reading Time: 4 min                  │
│                                      │
│ Consciousness and the Festival       │  ← Title (h3)
│ (category tag)                       │
│                                      │
│ "The jungle doesn't just change      │  ← Excerpt (150 chars)
│  your perception—it rewires your...  │
│                                      │
│          [Read Full Entry]            │  ← CTA
│          [Save to Journal]            │
└──────────────────────────────────────┘
```

## Component Anatomy

| Element | Purpose | Display |
|---------|---------|---------|
| Publish Date | Chronological context | "Nov 9, 2024" or "2 days ago" |
| Category/Tag | Content classification | Badge or inline label |
| Entry Title | Headline | h3, truncate to 1-2 lines |
| Author | Content creator | Secondary text |
| Reading Time | Content estimate | "4 min read" |
| Excerpt | Content preview | 150-200 characters, truncated |
| Visibility Indicator | Access level | 🔒 Private, 👥 Shared, 🌐 Public |
| CTA Buttons | Primary actions | "Read More", "Save", "Share" |

## Responsive Behavior

### Desktop (1025px+)

```
┌─────────────────────────────────────────┐
│ Nov 9 | ⏱️ 4 min | 🔒 Private           │
│                                         │
│ Consciousness and the Festival          │
│ Featured                                │
│                                         │
│ The jungle doesn't just change your...  │
│                                         │
│ [Read Full Entry]  [Save]  [Share]      │
└─────────────────────────────────────────┘
```

### Mobile (320px-640px)

```
┌──────────────────┐
│ Nov 9 | 4 min    │
│ 🔒 Private       │
│                  │
│ Consciousness    │
│ and the Festival │
│ Featured         │
│                  │
│ The jungle       │
│ doesn't just...  │
│                  │
│ [Read More]      │
│ [Save]           │
└──────────────────┘
```

## Component Structure

```tsx
interface JournalPreviewProps {
  entry: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: Date;
    author: { name: string };
    category?: string;
    readingTime: number;       // minutes
    visibility: 'private' | 'shared' | 'public';
  };
  showActions?: boolean;       // Show save/share buttons
  compact?: boolean;           // Minimal info variant
}
```

## Content Variants

### Full Preview (Default)

- All metadata visible
- Full excerpt (150-200 chars)
- All CTA buttons
- Used in journal archives and feeds

### Compact Preview

- Essential metadata only (date, reading time)
- Shorter excerpt (80-100 chars)
- Single CTA (Read More)
- Used in sidebars and related entries

### Feature Preview

- No category, simplified metadata
- Featured indicator/badge
- Larger title text
- Emphasis on visual interest
- Used on homepage featured section

## Visibility Indicators (D2: Mixed Publication Model)

| Visibility | Icon | Meaning | Audience |
|-----------|------|---------|----------|
| Private | 🔒 | Author only | Self-reflection, drafts |
| Shared | 👥 | Selected readers | Invited friends, supporters |
| Public | 🌐 | Everyone | Published, canonical entries |

## Accessibility Features

- Heading is h3 within preview card
- Metadata provided as list items or definition list
- Excerpt ends with ellipsis ("...") to indicate truncation
- "Read Full Entry" link is descriptive
- Visibility indicator has aria-label: "Private entry"
- Category badge has proper semantics
- All interactive elements keyboard accessible
- Focus visible on all buttons and links

## Visual Specifications

### Typography

- Title: bold, 1.25rem (desktop) / 1.125rem (mobile)
- Metadata text: 0.875rem, secondary color
- Excerpt: regular, 1rem
- Category tag: 0.75rem, bold

### Spacing & Layout

- Padding: 20px (mobile), 24px (desktop)
- Border: subtle divider between entries
- Gap between title and excerpt: 12px
- Gap between buttons: 8px (mobile), 12px (desktop)

### Colors

- Title text: primary (dark mode/light mode)
- Metadata: secondary color (muted)
- Visibility icon: category-specific color
- Hover state: subtle background color change

## CSS Classes (BEM)

```css
.journal-preview { }
.journal-preview__metadata { }
.journal-preview__date { }
.journal-preview__reading-time { }
.journal-preview__visibility { }
.journal-preview__title { }
.journal-preview__category { }
.journal-preview__excerpt { }
.journal-preview__actions { }
.journal-preview--compact { }
.journal-preview--featured { }
```

## States & Interactions

### Hover State (Desktop)

- Background color subtle shift
- Title color emphasis (darker/lighter)
- Shadow elevation increases
- Transition: 200ms ease-out
- No scale change (maintains focus targets)

### Active/Reading State

- Currently open entry: highlighted state
- Visited entries: lighter text color
- Recently saved: checkmark indicator on save button

### Loading State

- Skeleton loader for content sections
- Metadata loads first (date, reading time)
- Content lazy loads as needed

## Metadata Strategy

### Static Metadata

```typescript
{
  date: '2024-11-09',
  author: 'Ashley',
  readingTime: 4,
  visibility: 'private',
  category: 'Reflection',
}
```

### Dynamic Metadata

```typescript
{
  viewCount: 234,
  saveCount: 12,
  commentCount: 3,
  lastModified: '2 hours ago',
}
```

## Performance Considerations

- Lazy load entries below fold
- Excerpt generated server-side (no truncation on client)
- Visibility icon as CSS pseudo-element (no extra image)
- Optimize re-renders with React.memo for lists
- Paginate long lists (10-20 entries per page)

## Example Implementation

```tsx
import { JournalPreview } from '@/components/JournalPreview';

export function JournalArchive({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="journal-archive">
      {entries.map((entry) => (
        <JournalPreview
          key={entry.id}
          entry={entry}
          showActions={true}
        />
      ))}
    </div>
  );
}
```

## Testing Strategy

- Unit test: metadata rendering, visibility indicators
- Responsive test: compact/featured variants
- Accessibility audit: heading hierarchy, focus, semantics
- Visual regression: hover states, spacing consistency
- E2E test: navigation to full entry, save functionality

## See Also

- **N023:** README - Getting Started
- **N019:** Book Card Pattern (similar preview pattern)
- **N008:** Content Model (journal entry schema)
- D2 Decision: Publication Model & visibility
