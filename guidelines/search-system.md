# Search System Documentation

**Version:** 1.0.0
**Last Updated:** February 2026
**Purpose:** Document the global search architecture, ranking, filtering, and URL sync

---

## 1. Architecture Overview

The search system consists of three layers:

```
Header (SearchInput)  ──>  /search?q=...  ──>  SearchResultsPage
                                                    │
                                                    ▼
                                            searchService.ts
                                            (queries all mock data)
                                                    │
                        ┌─────────────┬──────────┬──┴──────────┬──────────┐
                        ▼             ▼          ▼             ▼          ▼
                    blogPosts   portfolio    videos      podcasts     pages
```

### Files

| File | Purpose |
|------|---------|
| `/utils/searchService.ts` | Core search logic; `searchAllContent()` |
| `/data/types/search.ts` | `SearchResult`, `SearchFilters`, `SearchState` |
| `/data/mock/ui/search.ts` | UI strings (placeholder, labels, no-results) |
| `/styles/blocks/search.css` | BEM styles for input + results page |
| `/components/common/Header.tsx` | Search input in nav bar |
| `/components/pages/search/SearchResultsPage.tsx` | Full results page |

---

## 2. Search Service

### `searchAllContent(query, filters?)`

Searches across all content types and returns a unified `SearchResult[]`.

**Fields searched per type:**

| Type | Fields |
|------|--------|
| Blog | `title`, `excerpt`, `tags[]`, `category` |
| Portfolio | `title`, `description`, `tags[]`, `category` |
| Video | `title`, `description`, `category` |
| Podcast | `title`, `description`, `tags[]` |
| Page | `title`, `description` (static entries) |

### Scoring Algorithm

Each field is scored 0-100 using `scoreMatch()`:

| Match Type | Score |
|------------|-------|
| Exact match | 100 |
| Starts with query | 80 |
| Contains query | 60 |
| Partial word match | 0-40 (proportional) |

Field weights:
- Title: 1.0x
- Excerpt/Description: 0.7x
- Tags: 0.5x
- Category: 0.4x
- Featured bonus: +5

---

## 3. Filtering

The `SearchFilters` interface:

```typescript
interface SearchFilters {
  type?: string;        // 'blog' | 'portfolio' | 'video' | 'podcast' | 'page'
  category?: string;    // Category name (case-insensitive)
  sortBy: 'relevance' | 'recent' | 'popular' | 'featured' | 'alphabetical';
}
```

When `type` is set, only that content type is searched. When `category` is set, results are post-filtered by category name.

---

## 4. URL Parameter Sync

The `SearchResultsPage` syncs state to URL query parameters:

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `q` | Search query | `?q=neon` |
| `type` | Content type filter (comma-separated) | `?type=blog,portfolio` |
| `sort` | Sort order | `?sort=recent` |

URL updates use `replace: true` to avoid polluting browser history.

---

## 5. Header Search Input

The search input in the Header:
- Collapsed by default (icon button only)
- Expands on click with 300ms width animation
- Supports `Ctrl+K` / `Cmd+K` keyboard shortcut to open
- `Escape` closes and clears
- `Enter` navigates to `/search?q=...`
- Neon pink border-glow on focus (dark mode)
- Shows `Ctrl+K` hint badge when collapsed

---

## 6. Results Grouping

Results are grouped by `type` on the results page:
- Each group has a heading with count
- Groups are rendered in the order they appear in the data
- The `ArchiveFilters` component provides type toggle chips + sort options
- Chip counts reflect the unfiltered result distribution

---

## 7. Performance Notes

- Search is client-side against in-memory mock data
- Debounced at 300ms to avoid excessive re-renders
- `useMemo` caches filtered/grouped results
- For production with large datasets, consider:
  - Server-side search API
  - Full-text search engine (e.g., Algolia, MeiliSearch)
  - Pre-computed search index

---

**Last Updated:** February 2026
