# Content Model & CMS Field Mapping

**Version:** 2.0.0
**Last Updated:** March 2026
**Purpose:** Document TypeScript interface to WordPress CPT/ACF field mapping for the Dual Mode Architecture.
**Moved from:** `/data/schema.md` (relocated to `/docs/` per [Guidelines.md folder conventions](../guidelines/Guidelines.md))

---

## Architecture Overview

The application uses a **Dual Mode Architecture** controlled by the `USE_WORDPRESS` constant in `/hooks/useContent.ts`:

```
USE_WORDPRESS = false  (default)  -->  /data/mock/*  (local JSON)
USE_WORDPRESS = true              -->  WordPress REST API + ACF
```

### Data Flow

```
Component
  |
  v
useContent.ts (facade hook)
  |
  +-- USE_WORDPRESS = false --> useMockData.ts --> /data/mock/*
  |
  +-- USE_WORDPRESS = true  --> useWordPress.ts --> WP REST API
```

**Facade Hook:** `/hooks/useContent.ts`
**Mock Data Hook:** `/hooks/useMockData.ts`
**WordPress Hook:** `/hooks/useWordPress.ts`

### ACF Field Access Convention

ACF fields are exposed to the WordPress REST API via `post.meta` with an underscore prefix. When the CMS doc refers to an ACF field like `read_time`, the actual REST API path is `post.meta._read_time`. This convention applies to all ACF custom fields below.

| ACF Admin Label | REST API Path |
|---|---|
| `read_time` | `post.meta._read_time` |
| `featured` | `post.meta._featured` |
| `faqs` | `post.meta._faqs` (JSON string) |
| `images` | `post.meta._images` (JSON string) |
| `location` | `post.meta._location` |
| `event` | `post.meta._event` |
| `subcategory` | `post.meta._subcategory` |

---

## Content Type Mapping

### 1. BlogPost

| TypeScript Field | Required | Type | WordPress Source | Notes |
|---|---|---|---|---|
| `id` | Yes | `string` | `post.id` | Auto (WP post ID, cast to string) |
| `slug` | Yes | `string` | `post.slug` | Auto (WP slug) |
| `title` | Yes | `string` | `post.title.rendered` | Core field |
| `excerpt` | Yes | `string` | `post.excerpt.rendered` | Core field (HTML tags stripped) |
| `content` | Yes | `string` | `post.content.rendered` | Core field (rendered HTML) |
| `featuredImage` | Yes | `BlogImage` | `post._embedded['wp:featuredmedia'][0]` | Core featured image; includes `source_url`, `alt_text`, `media_details.width/height` |
| `publishedAt` | Yes | `string` (ISO 8601) | `post.date` | Core field |
| `updatedAt` | No | `string` (ISO 8601) | `post.modified` | Core field |
| `category` | No | `string` | `post._embedded['wp:term'][0][0].name` | Core taxonomy (first category name) |
| `tags` | No | `string[]` | `post._embedded['wp:term'][1]` | Core taxonomy (array of tag names) |
| `readTime` | No | `number` | `post.meta._read_time` | ACF Number field (parsed to int; default `'5'`) |
| `author` | No | `BlogAuthor` | `post._embedded.author[0]` | Core field; maps `name`, `avatar_urls['96']`, `description` |
| `featured` | No | `boolean` | `post.meta._featured` | ACF True/False (`'1'` = true) |
| `faqs` | No | `FAQ[]` | `post.meta._faqs` | ACF Repeater (JSON string, parsed) |

**Deprecated fields (remove in next major version):**
- `publishedDate` - Use `publishedAt`
- `updatedDate` - Use `updatedAt`
- `readingTime` - Use `readTime`

**Type location:** `/data/types/blog.ts`
**Mock data:** `/data/mock/blog/posts.ts`
**Mapper function:** `mapPostToBlog()` in `/hooks/useWordPress.ts`

---

### 2. PortfolioEntry

| TypeScript Field | Required | Type | WordPress Source | Notes |
|---|---|---|---|---|
| `id` | Yes | `string` | `portfolio.id` | Auto (WP post ID, cast to string) |
| `slug` | Yes | `string` | `portfolio.slug` | Auto (WP slug) |
| `title` | Yes | `string` | `portfolio.title.rendered` | Core field |
| `category` | Yes | `string` (union) | `portfolio._embedded['wp:term'][0][0].name` | Custom taxonomy `portfolio_category`; mapped via `mapCategory()` from `portfolioService.ts` |
| `subcategory` | No | `string` | `portfolio.meta._subcategory` | ACF Text field |
| `images` | Yes | `PortfolioImage[]` | `portfolio.meta._images` | ACF field (JSON string, parsed); fallback: single image from `_embedded['wp:featuredmedia'][0]` with defaults `position: 'center'`, `aspectRatio: '4:3'` |
| `description` | Yes | `string` | `portfolio.content.rendered` | Core field (rendered HTML) |
| `content` | No | `string` | `portfolio.content.rendered` | Same as `description` (both mapped from core content) |
| `excerpt` | No | `string` | `portfolio.excerpt.rendered` | Core field (HTML tags stripped) |
| `location` | No | `string` | `portfolio.meta._location` | ACF Text field |
| `event` | No | `string` | `portfolio.meta._event` | ACF Text field |
| `date` | No | `string` | `portfolio.date` | Core field (WP publish date) |
| `tags` | Yes | `string[]` | `portfolio._embedded['wp:term'][1]` | Custom taxonomy `portfolio_tag` (array of tag names) |
| `featured` | Yes | `boolean` | `portfolio.meta._featured` | ACF True/False (`'1'` = true) |
| `order` | Yes | `number` | `portfolio.menu_order` | Core field (default `0`) |
| `faqs` | No | `FAQ[]` | `portfolio.meta._faqs` | ACF Repeater (JSON string, parsed) |

**Type location:** `/data/types/portfolio.ts`
**Mock data:** `/data/mock/portfolio/`
**Mapper function:** `mapPostToPortfolio()` in `/hooks/useWordPress.ts`

---

### 3. Video

> **Note:** No WordPress hook or mapper currently exists for Videos. The type definition and mock data are complete but WP integration is deferred until Video CPT is registered in WordPress.

| TypeScript Field | Required | Type | WordPress Source (planned) | Notes |
|---|---|---|---|---|
| `id` | Yes | `string` | `video.id` | Auto (WP post ID) |
| `slug` | Yes | `string` | `video.slug` | Auto (WP slug) |
| `title` | Yes | `string` | `video.title.rendered` | Core field |
| `description` | Yes | `string` | `video.excerpt.rendered` | Core field |
| `content` | Yes | `string` | `video.content.rendered` | Core field |
| `thumbnailUrl` | Yes | `string` | `video.meta._thumbnail` | ACF Image field (URL) |
| `videoUrl` | Yes | `string` | `video.meta._video_url` | ACF oEmbed field |
| `platform` | Yes | `'youtube' \| 'vimeo'` | `video.meta._platform` | ACF Select field |
| `duration` | Yes | `string` | `video.meta._duration` | ACF Text field (e.g. "12:34") |
| `category` | Yes | `string` | `video._embedded['wp:term'][0]` | Custom taxonomy `video_category` |
| `tags` | Yes | `string[]` | `video._embedded['wp:term'][1]` | Custom taxonomy `video_tag` |
| `featured` | Yes | `boolean` | `video.meta._featured` | ACF True/False |
| `publishedAt` | Yes | `string` (ISO 8601) | `video.date` | Core field |
| `views` | No | `number` | `video.meta._views` | ACF Number field |
| `likes` | No | `number` | `video.meta._likes` | ACF Number field |
| `faqs` | No | `FAQ[]` | `video.meta._faqs` | ACF Repeater (JSON string) |

**Type location:** `/data/types/videos.ts`
**Mock data:** `/data/mock/videos/entries.ts`

---

### 4. Podcast

> **Note:** No WordPress hook or mapper currently exists for Podcasts. The type definition and mock data are complete but WP integration is deferred until Podcast CPT is registered in WordPress.

| TypeScript Field | Required | Type | WordPress Source (planned) | Notes |
|---|---|---|---|---|
| `id` | Yes | `string` | `podcast.id` | Auto (WP post ID) |
| `slug` | Yes | `string` | `podcast.slug` | Auto (WP slug) |
| `title` | Yes | `string` | `podcast.title.rendered` | Core field |
| `description` | Yes | `string` | `podcast.excerpt.rendered` | Core field |
| `content` | Yes | `string` | `podcast.content.rendered` | Core field |
| `audioUrl` | Yes | `string` | `podcast.meta._audio_url` | ACF File field (URL) |
| `duration` | Yes | `string` | `podcast.meta._duration` | ACF Text field |
| `episodeNumber` | Yes | `number` | `podcast.meta._episode_number` | ACF Number field |
| `seasonNumber` | No | `number` | `podcast.meta._season_number` | ACF Number field |
| `category` | Yes | `string` | `podcast._embedded['wp:term'][0]` | Custom taxonomy `podcast_category` |
| `tags` | Yes | `string[]` | `podcast._embedded['wp:term'][1]` | Custom taxonomy `podcast_tag` |
| `publishedAt` | Yes | `string` (ISO 8601) | `podcast.date` | Core field |
| `featured` | Yes | `boolean` | `podcast.meta._featured` | ACF True/False |
| `coverImage` | Yes | `{ src, alt }` | `podcast._embedded['wp:featuredmedia']` | Core (featured image) |
| `transcript` | No | `string` | `podcast.meta._transcript` | ACF Textarea field |
| `guests` | No | `Guest[]` | `podcast.meta._guests` | ACF Repeater (JSON string) |
| `faqs` | No | `FAQ[]` | `podcast.meta._faqs` | ACF Repeater (JSON string) |

**Type location:** `/data/types/podcast.ts`
**Mock data:** `/data/mock/podcasts/episodes.ts`

---

### 5. EventEntry (DEPRECATED)

> **Status:** The Events feature was removed in v5.3.0 (personal art project migration). The "Events" link has been excluded from footer navigation. No WordPress hook or mapper exists. The type definition remains in `/data/types/events.ts` for reference but is not actively used.

| TypeScript Field | Required | Type | WordPress Source (deprecated) | Notes |
|---|---|---|---|---|
| `id` | Yes | `string` | `event.id` | Auto (WP post ID) |
| `slug` | Yes | `string` | `event.slug` | Auto (WP slug) |
| `title` | Yes | `string` | `event.title.rendered` | Core field |
| `description` | Yes | `string` | `event.content.rendered` | Core field |
| `type` | Yes | `EventType` | `event.meta._event_type` | ACF Select field |
| `location` | Yes | `EventLocation` | `event.meta._location` | ACF Group field |
| `editions` | Yes | `EventEdition[]` | `event.meta._editions` | ACF Repeater field |
| `category` | Yes | `string` | `event._embedded['wp:term'][0]` | Custom taxonomy `event_category` |
| `tags` | Yes | `string[]` | `event._embedded['wp:term'][1]` | Custom taxonomy `event_tag` |
| `featured` | Yes | `boolean` | `event.meta._featured` | ACF True/False field |
| `faqs` | No | `FAQ[]` | `event.meta._faqs` | ACF Repeater field |

**Type location:** `/data/types/events.ts`
**Mock data:** `/data/mock/events/` (if re-created)

---

### 6. HeroContent (Page Meta)

| TypeScript Field | Required | Type | WordPress Source | Notes |
|---|---|---|---|---|
| `title` | Yes | `string` | Page ACF or Options Page | `meta._hero_title` |
| `subtitle` | No | `string` | Page ACF or Options Page | `meta._hero_subtitle` |
| `tagline` | No | `string` | Page ACF or Options Page | `meta._hero_tagline` |
| `images` | No | `HeroImage[]` | Page ACF or Options Page | `meta._hero_images` (Gallery, JSON string) |

**Type location:** `/data/types/page.ts`
**Mock data:** `/data/mock/pages/home.ts`, `/data/mock/images/hero-images.ts`

---

## WordPress Custom Post Types

| CPT Slug | TypeScript Interface | REST Endpoint | Hook Status |
|---|---|---|---|
| `post` | `BlogPost` | `/wp-json/wp/v2/posts` | Active (`useBlogPosts`, `useBlogPost`) |
| `portfolio` | `PortfolioEntry` | `/wp-json/wp/v2/portfolio` | Active (`usePortfolioSections`, `usePortfolioEntries`) |
| `video` | `Video` | `/wp-json/wp/v2/video` | Deferred (mock data only) |
| `podcast` | `Podcast` | `/wp-json/wp/v2/podcast` | Deferred (mock data only) |
| `event` | `EventEntry` | `/wp-json/wp/v2/event` | Deprecated (feature removed v5.3.0) |

## WordPress Custom Taxonomies

| Taxonomy Slug | Used By | REST Endpoint |
|---|---|---|
| `category` | BlogPost | `/wp-json/wp/v2/categories` |
| `post_tag` | BlogPost | `/wp-json/wp/v2/tags` |
| `portfolio_category` | PortfolioEntry | `/wp-json/wp/v2/portfolio_category` |
| `portfolio_tag` | PortfolioEntry | `/wp-json/wp/v2/portfolio_tag` |
| `video_category` | Video | `/wp-json/wp/v2/video_category` |
| `video_tag` | Video | `/wp-json/wp/v2/video_tag` |
| `podcast_category` | Podcast | `/wp-json/wp/v2/podcast_category` |
| `podcast_tag` | Podcast | `/wp-json/wp/v2/podcast_tag` |
| `event_category` | EventEntry | `/wp-json/wp/v2/event_category` |
| `event_tag` | EventEntry | `/wp-json/wp/v2/event_tag` |

---

## Date Field Standards

All date fields MUST use **ISO 8601** format: `YYYY-MM-DDTHH:mm:ssZ`

**Example:** `2026-02-21T12:00:00Z`

**Canonical field names:**
- `publishedAt` (not ~~publishedDate~~)
- `updatedAt` (not ~~updatedDate~~)
- `readTime` (not ~~readingTime~~)

---

## Image Field Standards

All image objects follow the `PortfolioImage` or `BlogImage` interface:

| Field | Required | Description |
|---|---|---|
| `src` | Yes | Image URL (Figma asset, CDN URL, or WP media URL) |
| `alt` | Yes | Accessible alt text |
| `title` | No | Display title (lightbox captions) |
| `caption` | No | Short caption |
| `width` | No | Width in pixels |
| `height` | No | Height in pixels |

**Known alias:** Some legacy code uses `url` instead of `src`. The `useMockData.ts` hook maps `src` to `url` for backward compatibility. Prefer `src` in all new code.

**Featured media fallback defaults** (when portfolio has no `_images` meta but has a featured image):
- `position`: `'center'`
- `aspectRatio`: `'4:3'`

---

## useContent Facade Pattern

The `useContent.ts` hook re-exports from either `useMockData.ts` or `useWordPress.ts` based on a constant toggle:

```typescript
// /hooks/useContent.ts
var USE_WORDPRESS = true; // Toggle for WP vs mock data

// Re-exports the appropriate hook based on toggle
```

**All page components should import from `useContent`, never directly from `useMockData` or `useWordPress`.**

---

## WordPress Caching Layer

`useWordPress.ts` (v1.5.0) includes a localStorage caching layer with a 30-minute TTL. All four active hooks follow a 3-step resolution strategy:

1. **Check localStorage cache** (skip on manual refresh)
2. **Check `wpUnreachable` flag** (session-level; set after first failed fetch)
3. **Fetch from WP API** (with 8-second timeout via AbortController)

Cache management is available in the Integration Tester dev tool at `/dev-tools/integration`.

**Exported utilities:**
- `clearAllWPCache()` - Remove all WP cache entries
- `getWPCacheStats()` - Diagnostic stats (entry count, total bytes, age)

---

## Content Import

> **Note:** The `/dist/wordpress-export.json` file was deleted on February 25, 2026 during the cleanup audit. To regenerate, run the WP export script against the production WordPress instance.

**Import steps:**
1. Set up WordPress instance with required CPTs and ACF fields
2. Export content from WP-CLI or generate a new export
3. Set `USE_WORDPRESS = true` in `/hooks/useContent.ts`
4. Verify all endpoints return expected data shape

---

**Last Updated:** March 2026
