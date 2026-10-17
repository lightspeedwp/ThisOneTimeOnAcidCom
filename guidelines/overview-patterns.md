# Design Patterns Overview

**Version:** 4.0.0  
**Last Updated:** January 2025

Reusable design patterns and compositions for the Ash Shaw Portfolio.

## Purpose

Define higher-level patterns that combine components and blocks to solve common design problems:
- Repeatable solutions to recurring problems
- Composition guidelines
- Layout patterns
- Interaction patterns
- Data display patterns

---

## What Are Patterns?

**Patterns** are proven solutions to common design problems. They combine multiple components and blocks into cohesive, reusable structures.

### Pattern vs Block vs Component

```
Pattern (Solution)
├── Block (Content unit)
│   ├── Component (UI element)
│   └── Component
└── Block
    └── Component
```

**Examples:**
- **Pattern:** Hero with CTA - Hero image + heading + description + button group
- **Block:** Portfolio Card - Individual card displaying portfolio item  
- **Component:** Button - Single interactive element

---

## Pattern Categories

The Ash Shaw portfolio uses **12 primary patterns** organized by category. Each has detailed implementation guidelines.

### Layout Patterns

| Pattern | Purpose | Guideline File |
|---------|---------|---------------|
| **HeroWithCTA** | Hero section with call-to-action | [patterns/HeroWithCTA.md](./patterns/HeroWithCTA.md) |
| **TwoColumnSplit** | Side-by-side content layout | [patterns/TwoColumnSplit.md](./patterns/TwoColumnSplit.md) |
| **MasonryGallery** | Variable-height image grid | [patterns/MasonryGallery.md](./patterns/MasonryGallery.md) |

### Navigation Patterns

| Pattern | Purpose | Guideline File |
|---------|---------|---------------|
| **DesktopMobileNav** | Responsive navigation | [patterns/DesktopMobileNav.md](./patterns/DesktopMobileNav.md) |
| **StickyHeader** | Fixed header on scroll | [patterns/StickyHeader.md](./patterns/StickyHeader.md) |
| **Breadcrumbs** | Hierarchical navigation | [patterns/Breadcrumbs.md](./patterns/Breadcrumbs.md) |

### Content Patterns

| Pattern | Purpose | Guideline File |
|---------|---------|---------------|
| **CardGridWithFilters** | Filterable content grid | [patterns/CardGridWithFilters.md](./patterns/CardGridWithFilters.md) |
| **BlogPostLayout** | Article detail view | [patterns/BlogPostLayout.md](./patterns/BlogPostLayout.md) |
| **TimelineDisplay** | Chronological events | [patterns/TimelineDisplay.md](./patterns/TimelineDisplay.md) |

### Interaction Patterns

| Pattern | Purpose | Guideline File |
|---------|---------|---------------|
| **ModalLightbox** | Full-screen overlay | [patterns/ModalLightbox.md](./patterns/ModalLightbox.md) |
| **FormWithValidation** | Input with real-time validation | [patterns/FormWithValidation.md](./patterns/FormWithValidation.md) |
| **InfiniteScroll** | Lazy-load content | [patterns/InfiniteScroll.md](./patterns/InfiniteScroll.md) |

---

## Core Pattern Examples

### Hero with CTA Pattern

```tsx
<section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-fluid-3xl px-fluid-md">
  {/* Background decorations */}
  <div className="absolute inset-0 opacity-20">{/* Orbs */}</div>
  
  {/* Content */}
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="max-w-2xl">
      <p className="text-fluid-xl text-gradient-pink-purple-blue mb-fluid-xl">
        Eyebrow text
      </p>
      <h1 className="text-hero-h1 font-heading font-bold mb-fluid-xl">
        Main Heading
      </h1>
      <p className="text-body-guideline mb-fluid-xl">
        Description text
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-button py-button bg-gradient-pink-purple-blue">
          Primary Action
        </button>
        <button className="px-button py-button bg-gradient-blue-teal-green">
          Secondary Action
        </button>
      </div>
    </div>
  </div>
</section>
```

### Card Grid with Filters Pattern

```tsx
<section className="py-section px-fluid-md">
  <div className="max-w-7xl mx-auto">
    {/* Filter Bar */}
    <div className="flex flex-col md:flex-row gap-4 mb-fluid-xl">
      <CategoryFilter 
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
      />
    </div>
    
    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
      {filteredItems.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </div>
    
    {/* Pagination */}
    <BlogPagination 
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  </div>
</section>
```

### Modal/Lightbox Pattern

```tsx
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    />
    
    {/* Modal */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      <div className="bg-white rounded-2xl p-fluid-xl max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  </div>
)}
```

---

## WordPress Pattern Alignment

| Ash Shaw Pattern | WordPress Pattern | Purpose |
|-----------------|-------------------|---------|
| `HeroWithCTA` | Hero pattern | Landing area with CTA |
| `CardGridWithFilters` | Query Loop | Filterable content |
| `ModalLightbox` | Modal pattern | Overlay content |
| `BlogPostLayout` | Single post | Article layout |
| `FormWithValidation` | Contact form | User input |

---

## Best Practices

### 1. Reusability
```tsx
// ✅ Extract common patterns
export function FilteredGrid({ 
  items, 
  FilterComponent, 
  ItemComponent 
}: Props) {
  return (
    <section>
      <FilterComponent />
      <Grid>
        {items.map(item => <ItemComponent key={item.id} {...item} />)}
      </Grid>
    </section>
  );
}
```

### 2. Composition
```tsx
// ✅ Build complex patterns from simple components
<SectionPattern>
  <SectionHeader><Title /><Description /></SectionHeader>
  <SectionBody><Grid /></SectionBody>
  <SectionFooter><CTA /></SectionFooter>
</SectionPattern>
```

### 3. Accessibility
```tsx
// ✅ Patterns maintain accessibility
<NavigationPattern>
  <nav aria-label="Main navigation">
    <ul role="menubar">
      {items.map(item => (
        <li role="none" key={item.id}>
          <a role="menuitem">{item.label}</a>
        </li>
      ))}
    </ul>
  </nav>
</NavigationPattern>
```

---

## Pattern Guidelines

For detailed implementation of each pattern, see the specific guideline files:

### Layout Patterns
- **[HeroWithCTA.md](./patterns/HeroWithCTA.md)** - Hero section with call-to-action
- **[TwoColumnSplit.md](./patterns/TwoColumnSplit.md)** - Side-by-side content layout
- **[MasonryGallery.md](./patterns/MasonryGallery.md)** - Variable-height image grid

### Navigation Patterns
- **[DesktopMobileNav.md](./patterns/DesktopMobileNav.md)** - Responsive navigation
- **[StickyHeader.md](./patterns/StickyHeader.md)** - Fixed header on scroll
- **[Breadcrumbs.md](./patterns/Breadcrumbs.md)** - Hierarchical navigation

### Content Patterns
- **[CardGridWithFilters.md](./patterns/CardGridWithFilters.md)** - Filterable content grid
- **[BlogPostLayout.md](./patterns/BlogPostLayout.md)** - Article detail view
- **[TimelineDisplay.md](./patterns/TimelineDisplay.md)** - Chronological events

### Interaction Patterns
- **[ModalLightbox.md](./patterns/ModalLightbox.md)** - Full-screen overlay
- **[FormWithValidation.md](./patterns/FormWithValidation.md)** - Input validation
- **[InfiniteScroll.md](./patterns/InfiniteScroll.md)** - Lazy-load content

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines
- **[overview-sections.md](./overview-sections.md)** - Section patterns
- **[overview-blocks.md](./overview-blocks.md)** - Content blocks
- **[overview-components.md](./overview-components.md)** - UI components

---

**Last Updated:** January 2025  
**Version:** 4.0.0