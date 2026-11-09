# N019: Book Card Pattern

**Document ID:** N019  
**Category:** Patterns (Book Card)  
**Authority:** D4 (N-Document Approvals); D3 (Design Authority: WCAG 2.2 AAA)  
**Last Updated:** 2026-11-09

## Purpose

Define the reusable Book Card component pattern for displaying book previews in grid and list contexts throughout ThisOneTimeOnAcidCom.

## Pattern Overview

The Book Card displays a book with visual hierarchy:

```
┌─────────────────────┐
│   Cover Image       │  ← Responsive aspect ratio 2:3
│   (Lazy-loaded)     │
├─────────────────────┤
│ Book Title          │  ← Bold, truncate to 2 lines
│                     │
│ Author Name         │  ← Secondary text
│ Reading Time        │
│                     │
│ ⭐ 4.5/5.0          │  ← Rating display
│ (234 reviews)       │
│                     │
│ [Add to List]       │  ← Call-to-action
│ [Share]             │
└─────────────────────┘
```

## Component Structure

```tsx
interface BookCardProps {
  book: {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    author: { name: string };
    rating: number;
    reviewCount: number;
    readingTime: number; // minutes
  };
  variant?: 'grid' | 'list';
}

export function BookCard({ book, variant = 'grid' }: BookCardProps) {
  // Component implementation
}
```

## Responsive Behavior

| Breakpoint | Layout | Columns |
|------------|--------|---------|
| 320px-640px | Stack (vertical) | 1 column |
| 641px-1024px | Grid | 2 columns |
| 1025px-1440px | Grid | 3 columns |
| 1441px+ | Grid | 4 columns |

## Accessibility Features

- Semantic heading hierarchy (h3 for title within card)
- Image alt text: `"{book.title} cover by {book.author.name}"`
- Rating expressed as text: `"{book.rating} out of 5 stars"`
- Button labels clear: `"Add {book.title} to reading list"`
- Focus visible on all interactive elements
- Color contrast ≥4.5:1 for text

## States & Interactions

### Hover State (Desktop)

- Subtle shadow increase (elevation 2 → 4)
- Cover image slight zoom (1.02x scale)
- CTA buttons become more prominent
- Transition time: 200ms ease-out

### Active/Loading State

- Disabled buttons during API call
- Loading spinner on "Add to List" action
- Optimistic UI update with rollback on error

### No Cover Image

- Fallback: gradient background with book icon
- Alt text still provided
- Maintain aspect ratio

## CSS Classes (BEM)

```css
.book-card { }
.book-card__cover { }
.book-card__cover--loading { }
.book-card__info { }
.book-card__title { }
.book-card__author { }
.book-card__rating { }
.book-card__actions { }
.book-card--variant-list { }
```

## Integration Points

- **N015:** Navigation routing (book detail link)
- **N012:** Performance (image lazy-loading)
- **N011:** Accessibility (WCAG 2.2 AAA)
- **N003:** Component Library (base card component)

## Example Usage

```tsx
import { BookCard } from '@/components/BookCard';

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} variant="grid" />
      ))}
    </div>
  );
}
```

## Testing Strategy

- Unit test: prop validation and rendering
- Snapshot test: component output
- A11y test: accessibility compliance
- Visual regression: cross-browser consistency
- E2E test: click actions and navigation

## See Also

- **N020:** Hero Pattern
- **N021:** Value Proposition Pattern
- **N022:** Journal Preview Pattern
