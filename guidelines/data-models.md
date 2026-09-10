# Data Models Reference

**Version:** 1.0.0
**Last Updated:** February 2026
**Purpose:** Document all TypeScript interfaces used in the mock data system

---

## 1. Overview

All content is stored as TypeScript mock data in `/data/mock/`. Types are defined in `/data/types/`. Every piece of text, image URL, and configuration value used in components must be imported from these files - never hardcoded.

### File Locations

```
/data/
  types/
    index.ts              # Barrel export for all types
    blog.ts               # BlogPost, BlogCategory, BlogAuthor, BlogImage
    portfolio.ts          # PortfolioEntry, PortfolioImage, PortfolioSection
    videos.ts             # Video
    page.ts               # General page types
  mock/
    index.ts              # Barrel export for all mock data
    blog/
      index.ts            # Barrel export
      posts.ts            # Blog post entries
      categories.ts       # Blog categories + tags
    portfolio/
      index.ts            # Barrel export
      featured.ts         # Featured portfolio entries
      festivals.ts        # Festival portfolio entries
      uv-makeup.ts        # UV makeup portfolio entries
      nail-art.ts         # Nail art portfolio entries
      thailand.ts         # Thailand portfolio entries
      swiss-festivals.ts  # Swiss festival entries
    videos.ts             # Video entries
    images/               # Hero and shared image references
    pages/                # Page content (home, about, portfolio, blog, contact, legal)
    sections/             # Section content (FAQ, countdown)
    testimonials/         # Testimonial entries
    ui/                   # UI string content (navigation, blog UI, branding, etc.)
```

---

## 2. Blog Types (`/data/types/blog.ts`)

### BlogPost

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `slug` | `string` | Yes | URL-friendly slug |
| `title` | `string` | Yes | Post title |
| `excerpt` | `string` | Yes | Short summary |
| `content` | `string \| any` | Yes | Full markdown content |
| `featuredImage` | `BlogImage` | Yes | Hero image |
| `publishedAt` | `string` | Yes | ISO 8601 date (primary) |
| `publishedDate` | `string` | No | Legacy date field |
| `updatedAt` | `string` | No | Last updated date |
| `category` | `string` | No | Post category name |
| `tags` | `string[]` | No | Tag strings for filtering |
| `readTime` | `number` | No | Minutes to read (primary) |
| `readingTime` | `number` | No | Legacy reading time |
| `author` | `BlogAuthor` | No | Author info |
| `featured` | `boolean` | No | Featured flag |

### BlogImage

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `src` | `string` | Yes | Image URL or figma:asset |
| `alt` | `string` | Yes | Accessible alt text |
| `caption` | `string` | No | Image caption |
| `title` | `string` | No | Title attribute |
| `width` | `number` | No | Width in px |
| `height` | `number` | No | Height in px |

### BlogAuthor

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Author name |
| `avatar` | `string` | No | Avatar URL |
| `bio` | `string` | No | Short bio |

### BlogCategory

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `name` | `string` | Yes | Display name |
| `slug` | `string` | Yes | URL slug |
| `description` | `string` | No | Category description |
| `count` | `number` | No | Number of posts |
| `color` | `string` | No | Hex colour for chips |

---

## 3. Portfolio Types (`/data/types/portfolio.ts`)

### PortfolioEntry

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `slug` | `string` | Yes | URL-friendly slug |
| `title` | `string` | Yes | Display title |
| `category` | `string` | Yes | Primary category |
| `images` | `PortfolioImage[]` | Yes | Image gallery |
| `description` | `string` | Yes | Full description |
| `tags` | `string[]` | Yes | Searchable tags |
| `featured` | `boolean` | Yes | Homepage featured flag |
| `order` | `number` | Yes | Sort priority (lower = higher) |
| `subcategory` | `string` | No | Additional classification |
| `location` | `string` | No | Where work was created |
| `event` | `string` | No | Event name |
| `date` | `string` | No | Date of work |
| `excerpt` | `string` | No | Short preview text |

### PortfolioImage

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `src` | `string` | Yes | Image URL |
| `alt` | `string` | Yes | Accessible alt text |
| `title` | `string` | Yes | Display title |
| `type` | `'image' \| 'video'` | No | Media type |
| `poster` | `string` | No | Video poster image |
| `caption` | `string` | No | Short caption |
| `description` | `string` | No | Detailed description |
| `aspectRatio` | `string` | No | Responsive ratio hint |

### Categories

Portfolio categories are string unions defined on `PortfolioEntry.category`:

`'Festival Makeup' | 'UV Makeup' | 'Nail Art' | 'Portrait' | 'Special Effects' | 'Body Art'`

---

## 4. Video Types (`/data/types/videos.ts`)

### Video

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `title` | `string` | Yes | Video title |
| `description` | `string` | Yes | Short description |
| `thumbnailUrl` | `string` | Yes | Thumbnail image |
| `videoUrl` | `string` | Yes | Embed URL |
| `platform` | `'youtube' \| 'vimeo'` | Yes | Video platform |
| `publishedAt` | `string` | Yes | ISO 8601 date |
| `duration` | `string` | No | Duration string |
| `category` | `string` | No | Video category |
| `featured` | `boolean` | No | Featured flag |

---

## 5. Planned Types (Task List)

### Podcast (to be created)

```typescript
interface Podcast {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  audioUrl: string;
  duration: string;
  episodeNumber: number;
  seasonNumber?: number;
  category: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
  coverImage: { src: string; alt: string };
  transcript?: string;
  guests?: { name: string; role: string }[];
}
```

### SearchResult (to be created)

```typescript
interface SearchResult {
  id: string;
  type: 'blog' | 'portfolio' | 'video' | 'podcast' | 'page';
  title: string;
  excerpt: string;
  url: string;
  image?: string;
  category?: string;
  tags?: string[];
  date?: string;
  relevanceScore: number;
}
```

---

## 6. Relationships

```
BlogPost ──────> BlogCategory (via category string)
BlogPost ──────> BlogAuthor (optional embedded)
BlogPost ──────> string[] (tags)

PortfolioEntry ──> PortfolioImage[] (embedded gallery)
PortfolioEntry ──> string (category)
PortfolioEntry ──> string[] (tags)

Video ──────────> string (category)
```

---

## 7. How to Add New Content

### Adding a Blog Post

1. Open `/data/mock/blog/posts.ts`
2. Add a new `BlogPost` object to the `blogPosts` array
3. Ensure `id` and `slug` are unique
4. Add a `featuredImage` with proper alt text
5. Write content in markdown format

### Adding a Portfolio Entry

1. Choose the appropriate file (e.g., `festivals.ts`, `uv-makeup.ts`)
2. Add a new `PortfolioEntry` object
3. Add images to the `images` array with proper alt text
4. Set `featured: true` if it should appear on the homepage
5. Set `order` for sort priority

### Adding a New Content Type

1. Create type interface in `/data/types/new-type.ts`
2. Export from `/data/types/index.ts`
3. Create mock data in `/data/mock/new-type/`
4. Create barrel export in `/data/mock/new-type/index.ts`
5. Export from `/data/mock/index.ts`
6. Create UI strings in `/data/mock/ui/new-type.ts`

---

**Last Updated:** February 2026
