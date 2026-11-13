# N024: Book Home Page

**Document ID:** N024  
**Category:** Pages (Book Home)  
**Authority:** D4 (N-Document Approvals); D2 (Publication Model)  
**Last Updated:** 2026-11-09

## Purpose

Define the Book Home page that serves as the entry point to the full manuscript, showing book metadata, reading progress, and chapter navigation.

## Page Structure

### Header / Book Metadata

```markdown
# This One Time On Acid: The Complete Memoir

By Ashley | Published November 2024
★★★★★ 4.8/5.0 (234 reviews)

**Progress: 45% Complete (Chapter 8 of 15)**

[Resume Reading] [Start from Beginning] [Add to Reading List]
```typescript

### Book Overview

```markdown
## About This Book

A 200+ page memoir exploring consciousness, music, and personal
transformation through the lens of a transformative psychedelic
experience at an international music festival in Thailand.

**Key Themes:**
- Personal transformation through psychedelic experience
- Festival culture and community
- Consciousness exploration
- Authenticity and self-discovery
- Music and altered states

**Word Count:** 52,000 | **Estimated Reading Time:** 6-8 hours
```typescript

### Table of Contents

```markdown
## Contents

**Introduction: The Call** (8 pages)
Setting the scene, motivation for the journey

**Part 1: The Festival** (45 pages)
Chapters 1-5: Arrival, discovery, the scene

**Part 2: The Experience** (82 pages)
Chapters 6-10: The journey, peaks and valleys, insights

**Part 3: Integration** (58 pages)
Chapters 11-15: Return, reflection, transformation

[View Detailed Table of Contents]
```typescript

### Chapter Grid

Grid view with chapter cards:

```typescript
┌──────────────┬──────────────┬──────────────┐
│ Ch. 1        │ Ch. 2        │ Ch. 3        │
│ Arrival      │ The Scene    │ Jungle Night │
│ 8 pages      │ 12 pages     │ 14 pages     │
│ [Read]       │ [Read]       │ [Read]       │
└──────────────┴──────────────┴──────────────┘
```typescript

### Reading Progress

```markdown
## Your Reading Progress

**Last Read:** 2 hours ago (Chapter 8: Peak Experience, Page 94/200)

[Resume Reading] [View All Bookmarks] [Clear Progress]

**Chapter Timeline**
✓ Ch. 1-7: Complete
⟳ Ch. 8: In Progress (47% done)
○ Ch. 9-15: Not started
```typescript

### Reader Reviews (Optional)

```markdown
## What Readers Are Saying

[Review 1 from reader]
[Review 2 from reader]
[Review 3 from reader]

[Read All Reviews] [Write a Review]
```typescript

### Related Content

```markdown
## Related Journal Entries

Featured journal entries that provide behind-the-scenes context
or additional perspective on book chapters.

[Journal Preview] [Journal Preview] [Journal Preview]

[Read Full Journal]
```typescript

## Responsive Behavior

### Desktop (1025px+)

- Book metadata in 2-column layout (image + info)
- Overview and table of contents side-by-side
- 3-column chapter grid
- Sidebar with reading progress

### Tablet (641px-1024px)

- Book metadata stacked (image on top)
- Overview and TOC stacked
- 2-column chapter grid
- Progress bar at top

### Mobile (320px-640px)

- Book metadata stacked
- Overview and TOC stacked
- 1-column chapter list
- Progress bar at top
- Sticky "Resume Reading" button

## Component Specifications

### Book Metadata Card

```tsx
interface BookMetadata {
  title: string;
  author: string;
  publishedDate: Date;
  rating: number;
  reviewCount: number;
  coverImage: string;
  wordCount: number;
  estimatedReadingTime: number;
  progressPercentage: number;
  currentChapter: number;
  totalChapters: number;
}
```typescript

### Chapter Card

```tsx
interface ChapterCard {
  number: number;
  title: string;
  pages: number;
  status: 'not_started' | 'in_progress' | 'completed';
  readingTime: number;
  lastRead?: Date;
}
```typescript

## Accessibility Features (D3: WCAG 2.2 AAA)

- Heading hierarchy: h1 (book title), h2 (sections), h3 (chapters)
- Reading progress announced via aria-live
- Chapter links descriptive: "Read Chapter 1: Arrival"
- Book image alt text: "{book.title} cover by {book.author}"
- Rating expressed as text: "4.8 out of 5 stars"
- Focus visible on all buttons
- Color contrast ≥4.5:1 for body text, ≥7:1 for headings
- No keyboard traps
- Screen reader friendly table of contents

## Navigation Patterns

### Primary Navigation

```typescript
[Home] [Book] [Journal] [About] [Contact]
                ↓
          [Reading Progress]
          [Chapter Grid]
          [Related Content]
```typescript

### Chapter Reading

- "Previous Chapter" / "Next Chapter" buttons at top/bottom
- Chapter breadcrumb: "Home > Book > Chapter 8: Peak Experience"
- Progress indicator: "Chapter 8 of 15 (47%)"
- Sticky navigation for quick jumps

### Reading Resume

- Save last read position (chapter + page)
- Fetch via tRPC query `book.getReadingProgress`
- Update via tRPC mutation `book.updateReadingProgress`
- Sync across devices via Supabase

## Performance Targets

- LCP (Largest Contentful Paint): ≤2.5s
- Chapter load: <500ms per chapter
- Search within book: instant results
- Bookmark operations: <200ms
- Rating update: optimistic UI + server sync

## SEO Specifications

```html
<!-- Title -->
<title>This One Time On Acid: The Complete Memoir | Read Online</title>

<!-- Meta Description -->
<meta name="description" 
      content="Read the complete memoir. 200+ pages exploring consciousness,
               music, and personal transformation through psychedelic experience.">

<!-- Schema: Book + BreadcrumbList + ReadingAction -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "This One Time On Acid",
  "url": "https://example.com/book",
  "potentialAction": {
    "@type": "ReadAction",
    "target": "https://example.com/book/chapter/1"
  }
}
</script>
```typescript

## Content Sections

### About This Book

3-4 sentence compelling summary. Answer: "Why should I read this?"

✅ **Focus on reader outcomes**  
- What will I learn?
- What experiences will I share?
- How might this change my perspective?

### Themes & Topics

Bulleted list of 4-6 key themes. Use filtering/search if >10 topics.

### Reading Stats

- Word count
- Estimated reading time
- Chapter count
- Publication date
- Review count & rating

### Chapters Listing

- Chapter number and title
- Page count or word count
- Brief chapter summary (optional)
- Reading time estimate
- Status indicator (read/unread/in-progress)

## Related Features

### Reading Progress Tracking

- Automatic save on chapter completion
- Manual bookmarking of passages
- Highlight and note-taking (optional advanced feature)
- Resume from last position

### Social Features

- Share chapter via social media
- Leave review
- Add to reading list / favorites
- Follow author for updates

## Integration Points

- **N023:** README (link to Book Home)
- **N025:** Sitemap (book page entry)
- **N019:** Book Card Pattern (book metadata display)
- **N022:** Journal Preview (related entries)
- **N015:** Navigation & Routing (chapter URLs)

## Implementation Notes

- Next.js page: `app/book/page.tsx`
- Dynamic metadata via `generateMetadata()`
- Chapter data from Supabase (chapters table)
- Reading progress from tRPC (`book.getReadingProgress`)
- Image optimization with `next/image`
- Streaming for faster FCP

## Related Pages

- **N023:** README - Getting Started
- **N025:** Sitemap - Navigation reference
- **N022:** Journal Preview - Related content
- **N015:** Navigation & Routing - URL patterns
- Guidelines.md: Development workflow

## See Also

- D2 Decision: Publication Model
- N008: Content Model (chapter schema)
- N012: Performance Optimization
- N011: Accessibility Standards
