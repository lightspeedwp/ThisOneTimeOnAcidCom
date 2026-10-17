# Responsive Layout Patterns

**Version:** 5.0.0  
**Last Updated:** January 2025  
**WordPress Block Theme Compatible:** ✅

Comprehensive responsive layout patterns showing how grid, flexbox, and container systems adapt across mobile, tablet, and desktop breakpoints.

---

## 📋 Table of Contents

1. [Grid Patterns](#grid-patterns)
2. [Flexbox Patterns](#flexbox-patterns)
3. [Container Patterns](#container-patterns)
4. [Hero Section Layouts](#hero-section-layouts)
5. [Gallery Layouts](#gallery-layouts)
6. [Blog/Content Layouts](#blogcontent-layouts)
7. [Sidebar Layouts](#sidebar-layouts)

---

## 🎯 Grid Patterns

### Pattern 1: Single to Multi-Column Grid

Progressive grid that scales from 1 column → 2 columns → 3 columns:

```css
/* Portfolio Grid */
.portfolio-grid {
  /* Mobile: 1 column */
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wp--preset--spacing--20);
  padding: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .portfolio-grid {
    /* Tablet: 2 columns */
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wp--preset--spacing--30);
    padding: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    /* Desktop: 3 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--40);
    padding: var(--wp--preset--spacing--60);
  }
}

@media (min-width: 1440px) {
  .portfolio-grid {
    /* XL Desktop: 4 columns */
    grid-template-columns: repeat(4, 1fr);
    gap: var(--wp--preset--spacing--50);
  }
}
```

**Visual Progression:**

```
Mobile (< 768px):
┌─────────────────┐
│   Portfolio 1   │
├─────────────────┤
│   Portfolio 2   │
├─────────────────┤
│   Portfolio 3   │
└─────────────────┘

Tablet (768px - 1023px):
┌─────────┬─────────┐
│  Port 1 │  Port 2 │
├─────────┼─────────┤
│  Port 3 │  Port 4 │
└─────────┴─────────┘

Desktop (1024px+):
┌─────┬─────┬─────┐
│ P 1 │ P 2 │ P 3 │
├─────┼─────┼─────┤
│ P 4 │ P 5 │ P 6 │
└─────┴─────┴─────┘
```

---

### Pattern 2: Auto-Fit Grid (Flexible Columns)

Grid that automatically fits items based on minimum width:

```css
/* Blog Post Grid - Auto-fitting */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--wp--preset--spacing--30);
  padding: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--wp--preset--spacing--40);
    padding: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: var(--wp--preset--spacing--50);
    padding: var(--wp--preset--spacing--60);
  }
}
```

**Benefits:**
- Automatically adjusts column count based on available space
- No explicit breakpoints for column changes
- Consistent minimum item width

---

### Pattern 3: Masonry Grid

Staggered grid layout (like Pinterest):

```css
/* Masonry Grid using CSS Grid */
.masonry-grid {
  /* Mobile: Single column */
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .masonry-grid {
    /* Tablet: 2 columns with dense packing */
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 10px;
    grid-auto-flow: dense;
    gap: var(--wp--preset--spacing--30);
  }
  
  .masonry-grid > * {
    /* Items span based on content height */
    grid-row: span var(--row-span, 10);
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    /* Desktop: 3 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--40);
  }
}
```

**Alternative using JavaScript library (react-responsive-masonry):**

```tsx
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

<ResponsiveMasonry
  columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3, 1440: 4 }}
>
  <Masonry gutter="var(--wp--preset--spacing--30)">
    {portfolioItems.map((item) => (
      <PortfolioCard key={item.id} {...item} />
    ))}
  </Masonry>
</ResponsiveMasonry>
```

---

## 📦 Flexbox Patterns

### Pattern 1: Stacked to Row

Converts from vertical stack to horizontal row:

```css
/* Feature Section */
.feature-section {
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--30);
  padding: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .feature-section {
    /* Tablet: Still stacked but more space */
    gap: var(--wp--preset--spacing--40);
    padding: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .feature-section {
    /* Desktop: Horizontal row */
    flex-direction: row;
    align-items: center;
    gap: var(--wp--preset--spacing--60);
    padding: var(--wp--preset--spacing--60);
  }
}
```

---

### Pattern 2: Wrapping Flex Items

Items wrap to new rows as needed:

```css
/* Tag List */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--wp--preset--spacing--10);
  padding: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .tag-list {
    gap: var(--wp--preset--spacing--20);
    padding: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .tag-list {
    gap: var(--wp--preset--spacing--30);
  }
}
```

---

### Pattern 3: Flex with Fixed Sidebar

Main content with fixed-width sidebar:

```css
/* Blog Layout with Sidebar */
.blog-layout {
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--40);
}

.blog-main {
  flex: 1;
}

.blog-sidebar {
  width: 100%;
}

@media (min-width: 1024px) {
  .blog-layout {
    /* Desktop: Side-by-side */
    flex-direction: row;
    gap: var(--wp--preset--spacing--60);
  }
  
  .blog-main {
    flex: 1;
    min-width: 0; /* Prevent flex item overflow */
  }
  
  .blog-sidebar {
    width: 320px;
    flex-shrink: 0;
  }
}
```

---

## 📐 Container Patterns

### Pattern 1: Full-Width to Constrained

```css
/* Section Container */
.section-container {
  /* Mobile: Full width with padding */
  width: 100%;
  padding-inline: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .section-container {
    /* Tablet: Constrained width */
    max-width: 720px;
    margin-inline: auto;
    padding-inline: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .section-container {
    /* Desktop: Wider constraint */
    max-width: 1280px;
    padding-inline: var(--wp--preset--spacing--60);
  }
}

@media (min-width: 1440px) {
  .section-container {
    /* XL Desktop: Maximum width */
    max-width: 1600px;
    padding-inline: var(--wp--preset--spacing--80);
  }
}
```

---

### Pattern 2: Breakout Container

Content that breaks out of main container:

```css
/* Main Container */
.main-container {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--wp--preset--spacing--20);
}

/* Full-Width Breakout */
.breakout-full {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

@media (min-width: 768px) {
  .main-container {
    padding-inline: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .main-container {
    padding-inline: var(--wp--preset--spacing--60);
  }
}
```

**Usage:**
```html
<div class="main-container">
  <p>Regular contained content</p>
  
  <div class="breakout-full">
    <img src="full-width-image.jpg" alt="Full width" />
  </div>
  
  <p>Back to contained content</p>
</div>
```

---

## 🎨 Hero Section Layouts

### Layout 1: Centered Hero

```css
/* Centered Hero */
.hero-centered {
  /* Mobile: Centered stack */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--wp--preset--spacing--40) var(--wp--preset--spacing--20);
  gap: var(--wp--preset--spacing--30);
}

.hero-centered .hero-content {
  max-width: 600px;
}

@media (min-width: 768px) {
  .hero-centered {
    padding: var(--wp--preset--spacing--60) var(--wp--preset--spacing--40);
    gap: var(--wp--preset--spacing--40);
  }
  
  .hero-centered .hero-content {
    max-width: 800px;
  }
}

@media (min-width: 1024px) {
  .hero-centered {
    padding: var(--wp--preset--spacing--80) var(--wp--preset--spacing--60);
    gap: var(--wp--preset--spacing--50);
  }
  
  .hero-centered .hero-content {
    max-width: 1000px;
  }
}
```

---

### Layout 2: Split Hero (Image + Text)

```css
/* Split Hero Layout */
.hero-split {
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--40);
  padding: var(--wp--preset--spacing--40) var(--wp--preset--spacing--20);
}

.hero-split .hero-text {
  order: 2; /* Text second on mobile */
}

.hero-split .hero-media {
  order: 1; /* Image first on mobile */
}

@media (min-width: 768px) {
  .hero-split {
    gap: var(--wp--preset--spacing--50);
    padding: var(--wp--preset--spacing--60) var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .hero-split {
    /* Desktop: Side-by-side */
    flex-direction: row;
    align-items: center;
    gap: var(--wp--preset--spacing--60);
    padding: var(--wp--preset--spacing--80) var(--wp--preset--spacing--60);
  }
  
  .hero-split .hero-text {
    order: 1; /* Text first on desktop */
    flex: 1;
  }
  
  .hero-split .hero-media {
    order: 2; /* Image second on desktop */
    flex: 1;
  }
}
```

---

### Layout 3: Full-Screen Hero

```css
/* Full-Screen Hero */
.hero-fullscreen {
  /* All devices: Full viewport height */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: var(--wp--preset--spacing--40) var(--wp--preset--spacing--20);
}

.hero-fullscreen .hero-content {
  max-width: 600px;
}

@media (min-width: 768px) {
  .hero-fullscreen {
    padding: var(--wp--preset--spacing--60) var(--wp--preset--spacing--40);
  }
  
  .hero-fullscreen .hero-content {
    max-width: 800px;
  }
}

@media (min-width: 1024px) {
  .hero-fullscreen .hero-content {
    max-width: 1000px;
  }
}
```

---

## 🖼️ Gallery Layouts

### Layout 1: Simple Gallery Grid

```css
/* Gallery Grid */
.gallery-grid {
  /* Mobile: 2 columns */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--wp--preset--spacing--10);
}

@media (min-width: 768px) {
  .gallery-grid {
    /* Tablet: 3 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--20);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    /* Desktop: 4 columns */
    grid-template-columns: repeat(4, 1fr);
    gap: var(--wp--preset--spacing--30);
  }
}

@media (min-width: 1440px) {
  .gallery-grid {
    /* XL Desktop: 5 columns */
    grid-template-columns: repeat(5, 1fr);
    gap: var(--wp--preset--spacing--40);
  }
}
```

---

### Layout 2: Featured Gallery (Hero + Grid)

```css
/* Featured Gallery Layout */
.gallery-featured {
  display: grid;
  gap: var(--wp--preset--spacing--20);
}

/* Mobile: All items same size */
.gallery-featured {
  grid-template-columns: 1fr;
}

/* Tablet: Featured item spans 2 rows */
@media (min-width: 768px) {
  .gallery-featured {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wp--preset--spacing--30);
  }
  
  .gallery-featured .featured-item {
    grid-row: span 2;
  }
}

/* Desktop: 3 columns with featured spanning */
@media (min-width: 1024px) {
  .gallery-featured {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--40);
  }
  
  .gallery-featured .featured-item {
    grid-column: span 2;
    grid-row: span 2;
  }
}
```

**Visual Layout:**

```
Desktop (1024px+):
┌─────────────┬─────┐
│             │  2  │
│  Featured   ├─────┤
│     1       │  3  │
├──────┬──────┼─────┤
│  4   │  5   │  6  │
└──────┴──────┴─────┘
```

---

## 📝 Blog/Content Layouts

### Layout 1: Blog Post List

```css
/* Blog Post List */
.blog-list {
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--40);
  padding: var(--wp--preset--spacing--20);
}

.blog-list .post-item {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .blog-list {
    gap: var(--wp--preset--spacing--50);
    padding: var(--wp--preset--spacing--40);
  }
  
  .blog-list .post-item {
    /* Tablet: Image + text side-by-side */
    flex-direction: row;
    gap: var(--wp--preset--spacing--30);
  }
  
  .blog-list .post-image {
    width: 300px;
    flex-shrink: 0;
  }
}

@media (min-width: 1024px) {
  .blog-list {
    gap: var(--wp--preset--spacing--60);
    padding: var(--wp--preset--spacing--60);
  }
  
  .blog-list .post-image {
    width: 400px;
  }
}
```

---

### Layout 2: Blog Grid with Cards

```css
/* Blog Grid */
.blog-grid {
  /* Mobile: 1 column */
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wp--preset--spacing--30);
  padding: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .blog-grid {
    /* Tablet: 2 columns */
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wp--preset--spacing--40);
    padding: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .blog-grid {
    /* Desktop: 3 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--50);
    padding: var(--wp--preset--spacing--60);
  }
}
```

---

## 🎯 Sidebar Layouts

### Layout 1: Main Content + Sidebar

```css
/* Content + Sidebar Layout */
.content-sidebar-layout {
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--40);
}

.content-main {
  order: 1;
}

.content-sidebar {
  order: 2;
}

@media (min-width: 1024px) {
  .content-sidebar-layout {
    /* Desktop: Side-by-side */
    flex-direction: row;
    gap: var(--wp--preset--spacing--60);
  }
  
  .content-main {
    flex: 1;
    min-width: 0;
  }
  
  .content-sidebar {
    width: 320px;
    flex-shrink: 0;
  }
}

@media (min-width: 1440px) {
  .content-sidebar {
    width: 400px;
  }
}
```

---

### Layout 2: Two Sidebars

```css
/* Content with Left and Right Sidebars */
.two-sidebar-layout {
  /* Mobile: Stacked */
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--40);
}

@media (min-width: 1024px) {
  .two-sidebar-layout {
    /* Desktop: Three columns */
    display: grid;
    grid-template-columns: 250px 1fr 250px;
    gap: var(--wp--preset--spacing--60);
  }
}

@media (min-width: 1440px) {
  .two-sidebar-layout {
    grid-template-columns: 300px 1fr 300px;
  }
}
```

---

## 📐 Sticky Layouts

### Pattern 1: Sticky Header

```css
/* Sticky Navigation */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  padding: var(--wp--preset--spacing--20);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .site-header {
    padding: var(--wp--preset--spacing--30);
  }
}

@media (min-width: 1024px) {
  .site-header {
    padding: var(--wp--preset--spacing--40);
  }
}
```

---

### Pattern 2: Sticky Sidebar

```css
/* Sticky Sidebar on Desktop */
.sidebar {
  /* Mobile: Not sticky */
  position: relative;
}

@media (min-width: 1024px) {
  .sidebar {
    /* Desktop: Sticky */
    position: sticky;
    top: 100px; /* Offset for header */
    align-self: start;
  }
}
```

---

## ✅ Layout Best Practices

### DO ✅

1. **Use mobile-first approach**
   ```css
   .component { /* Mobile styles */ }
   @media (min-width: 768px) { /* Tablet */ }
   @media (min-width: 1024px) { /* Desktop */ }
   ```

2. **Use WordPress spacing variables**
   ```css
   gap: var(--wp--preset--spacing--40);
   padding: var(--wp--preset--spacing--20);
   ```

3. **Maintain consistent gaps/gutters**
   ```css
   /* Mobile: 20px gap */
   gap: var(--wp--preset--spacing--20);
   
   /* Desktop: 40px gap */
   @media (min-width: 1024px) {
     gap: var(--wp--preset--spacing--40);
   }
   ```

4. **Use semantic HTML**
   ```html
   <section class="hero-section">
     <article class="blog-post">
       <aside class="sidebar">
   ```

### DON'T ❌

1. **Don't use fixed widths**
   ```css
   /* ❌ BAD */
   .container { width: 1200px; }
   
   /* ✅ GOOD */
   .container { max-width: 1280px; width: 100%; }
   ```

2. **Don't use arbitrary breakpoints**
   ```css
   /* ❌ BAD */
   @media (min-width: 642px) { }
   
   /* ✅ GOOD */
   @media (min-width: 768px) { }
   ```

3. **Don't forget min-width: 0 for flex items**
   ```css
   /* ❌ BAD - Text overflow */
   .flex-item { flex: 1; }
   
   /* ✅ GOOD - Prevents overflow */
   .flex-item { flex: 1; min-width: 0; }
   ```

---

**Version:** 5.0.0 (WordPress Layout Patterns)  
**Last Updated:** January 2025  
**Maintained By:** Ash Shaw Portfolio Team

**Related Documentation:**
- [Breakpoints System](./breakpoints-system.md) - Complete breakpoint reference
- [Spacing Adjustments](./spacing-adjustments.md) - Responsive spacing patterns
- [Typography Scaling](./typography-scaling.md) - Text scaling across devices
