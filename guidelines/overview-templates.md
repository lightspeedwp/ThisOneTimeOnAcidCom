# Page Templates Overview

**Version:** 4.0.0  
**Last Updated:** January 2025

WordPress-aligned page templates for the Ash Shaw Portfolio.

## Purpose

Define page templates following WordPress conventions:
- Full page layouts
- Reusable template structure
- Consistent page architecture
- SEO-optimized markup
- Accessibility compliant

---

## What Are Templates?

**Templates** are full page layouts that combine parts, sections, patterns, blocks, and components into complete user experiences. They align with WordPress block theme templates.

### Template Hierarchy

```
Template (Full Page)
├── Part (Header)
│   └── Pattern (Navigation)
│       └── Component (NavLink)
├── Section (Hero)
│   └── Block (Hero Content)
│       └── Component (Button)
├── Section (Content)
│   └── Pattern (Grid)
│       └── Block (Card)
│           └── Component (Image)
└── Part (Footer)
    └── Block (Contact Form)
        └── Component (Input)
```

---

## React Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                     │
│                         (Main Application)                               │
│  • State Management (currentPage, blogPostSlug, portfolioId)            │
│  • Client-Side Routing Logic                                            │
│  • Error Boundary Wrapper                                               │
│  • Modal Provider Context                                               │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┬──────────────────┐
           │               │               │                  │
           ▼               ▼               ▼                  ▼
    ┌──────────┐    ┌──────────┐   ┌──────────┐      ┌──────────┐
    │  Header  │    │   Main   │   │  Footer  │      │  Global  │
    │  (Part)  │    │ Content  │   │  (Part)  │      │  Modals  │
    └────┬─────┘    └────┬─────┘   └────┬─────┘      └──────────┘
         │               │               │
         ▼               │               ▼
  ┌──────────┐           │        ┌──────────┐
  │   Logo   │           │        │ Contact  │
  │MobileMenu│           │        │   Form   │
  │  NavLink │           │        │  Social  │
  └──────────┘           │        │  Links   │
                         │        └──────────┘
         ┌───────────────┼───────────────┬──────────────────┐
         │               │               │                  │
         ▼               ▼               ▼                  ▼
  ┌──────────┐    ┌──────────┐   ┌──────────┐      ┌──────────┐
  │ HomePage │    │AboutPage │   │Portfolio │      │ BlogPage │
  │(Template)│    │(Template)│   │  Page    │      │(Template)│
  └────┬─────┘    └────┬─────┘   │(Template)│      └────┬─────┘
       │               │          └────┬─────┘           │
       │               │               │                 │
       ▼               ▼               ▼                 ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Sections   │ │  Sections   │ │  Sections   │ │  Sections   │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Hero      │ │ • Hero      │ │ • Gallery   │ │ • Search    │
│   Section   │ │   Section   │ │   Section   │ │   Bar       │
│ • Featured  │ │ • Why       │ │ • Filter    │ │ • Category  │
│   Section   │ │   Section   │ │   Bar       │ │   Filter    │
│ • Blog      │ │ • Timeline  │ │ • Portfolio │ │ • Blog      │
│   Preview   │ │   Section   │ │   Grid      │ │   Grid      │
│   Section   │ │ • CTA       │ │ • Lightbox  │ │ • Pagination│
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   Blocks    │ │   Blocks    │ │   Blocks    │ │   Blocks    │
│  (Cards)    │ │(Content+UI) │ │  (Cards)    │ │  (Cards)    │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Portfolio │ │ • Section   │ │ • Portfolio │ │ • Blog      │
│   Card      │ │   Card      │ │   Card      │ │   Card      │
│ • Slider    │ │ • Content   │ │ • Image     │ │ • Search    │
│   Card      │ │   Blocks    │ │   Block     │ │   Input     │
│ • Image     │ │ • Image     │ │ • Filter    │ │ • Tag       │
│   Gallery   │ │   Blocks    │ │   Buttons   │ │   Badge     │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │               │
       ▼               ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Components  │ │ Components  │ │ Components  │ │ Components  │
│ (UI Atoms)  │ │ (UI Atoms)  │ │ (UI Atoms)  │ │ (UI Atoms)  │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ • Button    │ │ • Button    │ │ • Button    │ │ • Input     │
│ • Image     │ │ • Text      │ │ • Image     │ │ • Button    │
│ • Badge     │ │ • Heading   │ │ • Badge     │ │ • Icon      │
│ • Icon      │ │ • Link      │ │ • Icon      │ │ • Badge     │
│ • ReadMore  │ │ • Scroll    │ │ • Lightbox  │ │ • Share     │
│   Button    │ │   DownArrow │ │   Modal     │ │   Component │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘

                    ┌─────────────────────┐
                    │  Utility Services   │
                    ├─────────────────────┤
                    │ • contentfulService │
                    │ • portfolioService  │
                    │ • emailService      │
                    │ • timeoutHandler    │
                    └─────────────────────┘
```

### Diagram Legend

- **App.tsx** - Root application with routing and global state
- **Parts** - Global template parts (Header, Footer)
- **Templates** - Full page layouts
- **Sections** - Layout containers for content
- **Blocks** - Content units and cards
- **Components** - Primitive UI elements
- **Services** - Data and utility services

---

## Template Categories

The Ash Shaw portfolio uses **7 page templates** organized by category. Each has detailed implementation guidelines.

### Marketing Pages

| Template | Purpose | Guideline File |
|----------|---------|---------------|
| **HomePage** | Main landing page | [templates/HomePage.md](./templates/HomePage.md) |
| **AboutPage** | Biography and philosophy | [templates/AboutPage.md](./templates/AboutPage.md) |

### Content Pages

| Template | Purpose | Guideline File |
|----------|---------|---------------|
| **PortfolioMainPage** | Portfolio archive grid | [templates/PortfolioMainPage.md](./templates/PortfolioMainPage.md) |
| **PortfolioDetailPage** | Single portfolio entry | [templates/PortfolioDetailPage.md](./templates/PortfolioDetailPage.md) |
| **BlogPage** | Blog archive with filters | [templates/BlogPage.md](./templates/BlogPage.md) |
| **BlogPostPage** | Single blog post | [templates/BlogPostPage.md](./templates/BlogPostPage.md) |

### Utility Pages

| Template | Purpose | Guideline File |
|----------|---------|---------------|
| **404Page** | Error page | [templates/404Page.md](./templates/404Page.md) |

---

## Standard Template Structure

```tsx
export function PageTemplate({ setCurrentPage }: Props) {
  return (
    <main id="main-content" role="main" className="min-h-screen">
      {/* Page-specific sections */}
      <Section1 />
      <Section2 />
      <Section3 />
      
      {/* Global footer */}
      <Footer setCurrentPage={setCurrentPage} />
      
      {/* Utility components */}
      <ScrollToTop />
    </main>
  );
}
```

---

## WordPress Template Alignment

| Ash Shaw Template | WordPress Template | Purpose |
|------------------|-------------------|---------|
| `HomePage.tsx` | `front-page.html` | Home/landing page |
| `AboutPage.tsx` | `page-about.html` | About page |
| `PortfolioMainPage.tsx` | `archive-portfolio.html` | Portfolio archive |
| `PortfolioDetailPage.tsx` | `single-portfolio.html` | Single portfolio |
| `BlogPage.tsx` | `home.html` or `archive.html` | Blog archive |
| `BlogPostPage.tsx` | `single.html` | Single blog post |
| `404Page.tsx` | `404.html` | Error page |

---

## Best Practices

### 1. Consistent Structure
```tsx
// ✅ All templates follow same pattern
<main id="main-content" role="main" className="min-h-screen">
  <Section1 />
  <Section2 />
  <Footer />
</main>
```

### 2. Semantic HTML
```tsx
// ✅ Proper semantic elements
<main>        {/* Main content */}
  <article>   {/* Blog post */}
  <section>   {/* Content section */}
  <aside>     {/* Sidebar */}
</main>
```

### 3. Accessibility
```tsx
// ✅ Proper ARIA and focus management
<main 
  id="main-content"
  role="main"
  tabIndex={-1}
>
```

---

## Template Guidelines

For detailed implementation of each template, see the specific guideline files:

### Marketing Pages
- **[HomePage.md](./templates/HomePage.md)** - Main landing page with hero and featured work
- **[AboutPage.md](./templates/AboutPage.md)** - Biography, philosophy, and journey

### Content Pages
- **[PortfolioMainPage.md](./templates/PortfolioMainPage.md)** - Portfolio archive grid with filters
- **[PortfolioDetailPage.md](./templates/PortfolioDetailPage.md)** - Single portfolio entry detail
- **[BlogPage.md](./templates/BlogPage.md)** - Blog archive with search and filters
- **[BlogPostPage.md](./templates/BlogPostPage.md)** - Single blog post detail view

### Utility Pages
- **[404Page.md](./templates/404Page.md)** - Error page not found

---

## Related Documentation

- **[Guidelines.md](./Guidelines.md)** - Main guidelines
- **[overview-sections.md](./overview-sections.md)** - Section patterns
- **[overview-parts.md](./overview-parts.md)** - Template parts
- **[overview-patterns.md](./overview-patterns.md)** - Design patterns

---

**Last Updated:** January 2025  
**Version:** 4.0.0