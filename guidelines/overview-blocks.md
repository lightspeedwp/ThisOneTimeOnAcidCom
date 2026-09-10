# Block Patterns Overview

**Version:** 4.0.0  
**Last Updated:** January 2025

WordPress-aligned block patterns for the Ash Shaw Portfolio.

## Purpose

Define reusable content blocks following WordPress Gutenberg block conventions:
- Self-contained content units
- Composable and nestable
- Consistent styling patterns
- Theme-agnostic design
- Accessible by default

---

## What Are Blocks?

**Blocks** are self-contained content units that can be combined to build sections and pages. They are similar to WordPress Gutenberg blocks and represent individual pieces of content or functionality.

### Block vs Component vs Section

```
Section (Layout container)
├── Block (Content unit)
│   ├── Component (UI primitive)
│   └── Component
└── Block
    └── Component
```

**Examples:**
- **Section:** `HeroSection` - Full viewport hero area
- **Block:** `PortfolioCard` - Individual portfolio item
- **Component:** `Button` - Primitive UI element

---

## Block Types

The Ash Shaw portfolio uses **8 primary block types** organized by category. Each has detailed implementation guidelines.

### Content Blocks

| Block | Purpose | Guideline File |
|-------|---------|---------------|
| **PortfolioCard** | Portfolio entry display card | [blocks/PortfolioCard.md](./blocks/PortfolioCard.md) |
| **BlogCard** | Blog post preview card | [blocks/BlogCard.md](./blocks/BlogCard.md) |
| **SectionCard** | Generic content card container | [blocks/SectionCard.md](./blocks/SectionCard.md) |
| **TestimonialCard** | Client testimonial display | [blocks/TestimonialCard.md](./blocks/TestimonialCard.md) |

### Media Blocks

| Block | Purpose | Guideline File |
|-------|---------|---------------|
| **ImageGallery** | Multi-image grid display | [blocks/ImageGallery.md](./blocks/ImageGallery.md) |
| **Lightbox** | Full-screen image viewer | [blocks/Lightbox.md](./blocks/Lightbox.md) |

### Interactive Blocks

| Block | Purpose | Guideline File |
|-------|---------|---------------|
| **CategoryFilter** | Content filtering controls | [blocks/CategoryFilter.md](./blocks/CategoryFilter.md) |
| **ShareComponent** | Social sharing buttons | [blocks/ShareComponent.md](./blocks/ShareComponent.md) |
| **Pagination** | Page navigation controls | [blocks/Pagination.md](./blocks/Pagination.md) |
| **SearchBar** | Content search input | [blocks/SearchBar.md](./blocks/SearchBar.md) |

---

## Standard Block Patterns

### Card Pattern
```tsx
className="
  bg-white/80
  backdrop-blur-sm
  rounded-xl
  p-fluid-md
  border border-white/50
  shadow-lg hover:shadow-xl
  transition-all duration-300
"
```

### Interactive Pattern
```tsx
className="
  group
  cursor-pointer
  transform hover:scale-105
  transition-transform duration-300
  focus:outline-none focus:ring-4 focus:ring-pink-200
"
```

### Media Pattern
```tsx
className="
  aspect-square
  overflow-hidden
  rounded-lg
  bg-gray-100
"
```

---

## WordPress Block Alignment

| Ash Shaw Block | WordPress Block | Purpose |
|---------------|-----------------|---------|
| `PortfolioCard` | `core/post-template` item | Portfolio entry card |
| `BlogCard` | `core/post-template` item | Blog post card |
| `ImageGallery` | `core/gallery` | Image grid |
| `CategoryFilter` | `core/query` filters | Content filtering |
| `Pagination` | `core/query-pagination` | Page navigation |
| `SearchBar` | `core/search` | Search input |

---

## Best Practices

### 1. Self-Contained Blocks
```tsx
// ✅ Block includes all necessary styling
export function PortfolioCard({ entry }: Props) {
  return (
    <article className="bg-white rounded-xl p-fluid-md shadow-lg">
      {/* Complete block implementation */}
    </article>
  );
}
```

### 2. Composable Blocks
```tsx
// ✅ Blocks can contain other blocks
export function BlogSection() {
  return (
    <section>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
      <Pagination {...paginationProps} />
    </section>
  );
}
```

### 3. Reusable with Variants
```tsx
// ✅ Block accepts variants via props
<PortfolioCard 
  entry={entry}
  layout="horizontal"    // Layout variant
  size="lg"              // Size variant
  featured={true}        // Featured styling
/>
```

---

## Block Guidelines

For detailed implementation of each block type, see the specific guideline files:

### Content Blocks
- **[PortfolioCard.md](./blocks/PortfolioCard.md)** - Portfolio entry display card
- **[BlogCard.md](./blocks/BlogCard.md)** - Blog post preview card
- **[SectionCard.md](./blocks/SectionCard.md)** - Generic content card
- **[TestimonialCard.md](./blocks/TestimonialCard.md)** - Client testimonial

### Media Blocks
- **[ImageGallery.md](./blocks/ImageGallery.md)** - Multi-image grid display
- **[Lightbox.md](./blocks/Lightbox.md)** - Full-screen image viewer

### Interactive Blocks
- **[CategoryFilter.md](./blocks/CategoryFilter.md)** - Content filtering controls
- **[ShareComponent.md](./blocks/ShareComponent.md)** - Social sharing buttons
- **[Pagination.md](./blocks/Pagination.md)** - Page navigation controls
- **[SearchBar.md](./blocks/SearchBar.md)** - Content search input

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines
- **[overview-sections.md](./overview-sections.md)** - Section patterns
- **[overview-patterns.md](./overview-patterns.md)** - Design patterns
- **[overview-components.md](./overview-components.md)** - Component library

---

**Last Updated:** January 2025  
**Version:** 4.0.0