# Ash Shaw Portfolio - Component Architecture & Taxonomy

**Version:** 4.0.0  
**Last Updated:** February 2026  
**Last Reviewed:** February 21, 2026
**Purpose:** Clarify component organization, file locations, and taxonomy

---

## 📚 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Taxonomy](#component-taxonomy)
3. [File Location Mapping](#file-location-mapping)
4. [Guidelines Organization](#guidelines-organization)
5. [Quick Reference](#quick-reference)

---

## Architecture Overview

### Component Organization Philosophy

The Ash Shaw portfolio follows a **WordPress block theme-inspired** architecture with components organized by their **purpose and role** rather than their technical implementation.

```
Conceptual Hierarchy (Documentation)          Physical Location (Code)
├── Templates (Page layouts)           →     /components/pages/
├── Parts (Global fragments)           →     /components/common/
├── Sections (Layout containers)       →     /components/sections/
├── Patterns (Compositional solutions) →     /components/* (various)
├── Blocks (Content units)             →     /components/ui/
└── Components (UI primitives)         →     /components/ui/, /components/common/
```

**Key Principle:** Documentation categories (templates, parts, sections, patterns, blocks) describe **what the component does**, while file locations describe **where it lives in the codebase**.

---

## Component Taxonomy

### 1. Templates (Page Layouts)

**Documentation:** `/guidelines/templates/`  
**Code Location:** `/components/pages/`

Full page layouts that combine parts, sections, patterns, and blocks.

| Template | Documentation File | Component File | Purpose |
|----------|-------------------|----------------|---------|
| HomePage | `templates/HomePage.md` | `/components/pages/HomePage.tsx` | Main landing page |
| AboutPage | `templates/AboutPage.md` | `/components/pages/AboutPage.tsx` | Biography page |
| BlogPage | `templates/BlogPage.md` | `/components/pages/BlogPage.tsx` | Blog archive |
| BlogPostPage | `templates/BlogPostPage.md` | `/components/pages/BlogPostPage.tsx` | Single blog post |
| PortfolioPage | `templates/PortfolioMainPage.md` | `/components/pages/PortfolioPage.tsx` | Portfolio archive |

---

### 2. Parts (Template Parts - Global Fragments)

**Documentation:** `/guidelines/parts/`  
**Code Location:** `/components/common/`

Reusable page fragments that appear across multiple pages.

| Part | Documentation File | Component File | Purpose |
|------|-------------------|----------------|---------|
| Header | `parts/Header.md` | `/components/common/Header.tsx` | Site navigation |
| Footer | `parts/Footer.md` | `/components/common/Footer.tsx` | Site-wide footer |
| MobileMenu | `parts/MobileMenu.md` | `/components/common/MobileMenu.tsx` | Mobile navigation |
| Logo | `components/Logo.md` | `/components/common/Logo.tsx` | Brand logo |
| ContactForm | `components/ContactForm.md` | `/components/common/ContactForm.tsx` | Contact form |
| SocialLinks | `components/SocialLinks.md` | `/components/common/SocialLinks.tsx` | Social media links |

**Note:** Parts are documented in both `/guidelines/parts/` (for global parts like Header/Footer) and `/guidelines/components/` (for shared components like Logo).

---

### 3. Sections (Layout Containers)

**Documentation:** `/guidelines/sections/`  
**Code Location:** `/components/sections/`

Top-level layout containers that organize page content into semantic blocks.

| Section | Documentation File | Component File | Purpose |
|---------|-------------------|----------------|---------|
| HeroSection | `sections/HeroSection.md` | `/components/sections/HeroSection.tsx` | Main hero area |
| FeaturedSection | `sections/FeaturedSection.md` | `/components/sections/FeaturedSection.tsx` | Portfolio showcase |
| WhySection | `sections/WhySection.md` | `/components/sections/WhySection.tsx` | Philosophy content |
| BlogPreviewSection | `sections/BlogPreviewSection.md` | `/components/sections/BlogPreviewSection.tsx` | Latest blog posts |
| ThreeColumnPortfolioSection | `sections/ThreeColumnPortfolioSection.md` | `/components/sections/ThreeColumnPortfolioSection.tsx` | Portfolio grid |
| FusionNailsSection | `sections/FusionNailsSection.md` | `/components/sections/FusionNailsSection.tsx` | Special project |

---

### 4. Patterns (Compositional Solutions)

**Documentation:** `/guidelines/patterns/`  
**Code Location:** Various (patterns are compositions, not single files)

Proven solutions to common design problems that combine multiple components.

| Pattern | Documentation File | Components Used | Purpose |
|---------|-------------------|-----------------|---------|
| CardGridWithFilters | `patterns/CardGridWithFilters.md` | CategoryFilter + Grid + Cards | Filterable content |
| HeroWithCTA | `patterns/HeroWithCTA.md` | HeroSection + Buttons | Landing hero |
| ModalLightbox | `patterns/ModalLightbox.md` | EnhancedLightbox | Image viewing |
| FormWithValidation | `patterns/FormWithValidation.md` | ContactForm + Validation | Form handling |
| DesktopMobileNav | `patterns/DesktopMobileNav.md` | Header + MobileMenu | Navigation |

**Note:** Patterns are **conceptual compositions**, not single component files.

---

### 5. Blocks (Content Units)

**Documentation:** `/guidelines/blocks/`  
**Code Location:** `/components/ui/` (primarily)

Self-contained content units that can be combined to build sections.

| Block | Documentation File | Component File | Purpose |
|-------|-------------------|----------------|---------|
| PortfolioCard | `blocks/PortfolioCard.md` | `/components/ui/PortfolioCard.tsx` | Portfolio entry |
| BlogCard | `blocks/BlogCard.md` | `/components/ui/BlogCard.tsx` | Blog post card |
| SectionCard | `blocks/SectionCard.md` | `/components/ui/SectionCard.tsx` | Generic card |
| Lightbox | `blocks/Lightbox.md` | `/components/ui/EnhancedLightbox.tsx` | Image viewer |
| Pagination | `blocks/Pagination.md` | `/components/ui/BlogPagination.tsx` | Page navigation |
| CategoryFilter | `components/CategoryFilter.md` | `/components/ui/CategoryFilter.tsx` | Content filtering |
| SearchBar | `components/SearchBar.md` | `/components/ui/SearchBar.tsx` | Search input |
| ShareComponent | `components/ShareComponent.md` | `/components/ui/ShareComponent.tsx` | Social sharing |

---

### 6. Components (UI Primitives)

**Documentation:** `/guidelines/components/`  
**Code Location:** `/components/ui/`, `/components/common/`

Basic UI elements and utilities.

| Component | Documentation File | Component File | Purpose |
|-----------|-------------------|----------------|---------|
| Logo | `components/Logo.md` | `/components/common/Logo.tsx` | Brand logo |
| ReadMoreButton | `components/ReadMoreButton.md` | `/components/ui/ReadMoreButton.tsx` | Read more link |
| ScrollDownArrow | `components/ScrollDownArrow.md` | `/components/ui/ScrollDownArrow.tsx` | Scroll indicator |
| ScrollBackToTop | `components/ScrollBackToTop.md` | `/components/ui/ScrollToTop.tsx` | Back to top button |
| LoadingSpinner | `components/LoadingSpinner.md` | `/components/ui/LoadingSpinner.tsx` | Loading state |
| Tag | `components/Tag.md` | `/components/ui/Tag.tsx` | Tag badge |
| Modal | `components/Modal.md` | `/components/ui/Modal.tsx` | Modal overlay |

---

## File Location Mapping

### Actual Component File Locations

```
/components/
├── admin/                              # CMS tools
├── common/                             # Global/shared components
│   ├── Header.tsx                      # Site navigation (Part)
│   ├── Footer.tsx                      # Site footer (Part)
│   ├── MobileMenu.tsx                  # Mobile navigation (Part)
│   ├── Logo.tsx                        # Brand logo (Component)
│   ├── ContactForm.tsx                 # Contact form (Component)
│   └── SocialLinks.tsx                 # Social links (Component)
├── figma/                              # Figma integration utilities
├── pages/                              # Page components (Templates)
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── BlogPage.tsx
│   ├── BlogPostPage.tsx
│   └── PortfolioPage.tsx
├── sections/                           # Layout sections
│   ├── HeroSection.tsx
│   ├── FeaturedSection.tsx
│   ├── WhySection.tsx
│   ├── BlogPreviewSection.tsx
│   ├── ThreeColumnPortfolioSection.tsx
│   └── FusionNailsSection.tsx
└── ui/                                 # UI components and blocks
    ├── BlogCard.tsx
    ├── BlogPagination.tsx
    ├── EnhancedLightbox.tsx
    ├── PortfolioCard.tsx
    ├── PortfolioImage.tsx
    ├── PortfolioLightbox.tsx
    ├── ReadMoreButton.tsx
    ├── ScrollDownArrow.tsx
    ├── ScrollToTop.tsx
    ├── SectionCard.tsx
    ├── ShareComponent.tsx
    ├── SliderCard.tsx
    ├── CategoryFilter.tsx
    ├── SearchBar.tsx
    └── [50+ shadcn/ui components]
```

---

## Guidelines Organization

### Documentation Structure

```
/guidelines/
├── Guidelines.md                       # Main entry point
├── README.md                          # Documentation index
├── ARCHITECTURE.md                    # This file
│
├── overview-components.md             # Component system overview
├── overview-icons.md                  # Icon system
├── overview-sections.md               # Section patterns
├── overview-blocks.md                 # Block patterns
├── overview-patterns.md               # Design patterns
├── overview-parts.md                  # Template parts
├── overview-templates.md              # Page templates
│
├── sections/                          # Section guidelines (10 files)
│   ├── HeroSection.md
│   ├── FeaturedSection.md
│   ├── WhySection.md
│   ├── BlogPreviewSection.md
│   └── ...
│
├── blocks/                            # Block guidelines (10 files)
│   ├── PortfolioCard.md
│   ├── BlogCard.md
│   ├── Lightbox.md
│   ├── Pagination.md
│   └── ...
│
├── patterns/                          # Pattern guidelines (12 files)
│   ├── CardGridWithFilters.md
│   ├── HeroWithCTA.md
│   ├── ModalLightbox.md
│   └── ...
│
├── parts/                             # Template part guidelines (7 files)
│   ├── Header.md
│   ├── Footer.md
│   ├── MobileMenu.md
│   └── ...
│
├── templates/                         # Template guidelines (7 files)
│   ├── HomePage.md
│   ├── AboutPage.md
│   ├── BlogPage.md
│   └── ...
│
└── components/                        # Component guidelines (24 files)
    ├── Logo.md
    ├── ContactForm.md
    ├── SocialLinks.md
    ├── ReadMoreButton.md
    └── ...
```

---

## Quick Reference

### Finding Component Documentation

**Question:** Where is the documentation for [Component]?

**Answer:** Use this decision tree:

```
1. Is it a full page?
   YES → Look in /guidelines/templates/
   
2. Is it in the header or footer?
   YES → Look in /guidelines/parts/
   
3. Is it a layout section?
   YES → Look in /guidelines/sections/
   
4. Is it a card or content unit?
   YES → Look in /guidelines/blocks/
   
5. Is it a compositional pattern?
   YES → Look in /guidelines/patterns/
   
6. Is it a small UI component?
   YES → Look in /guidelines/components/
```

### Finding Component Code

**Question:** Where is the actual [Component].tsx file?

**Answer:** Use this mapping:

```
Template (Page) → /components/pages/
Part (Header/Footer) → /components/common/
Section → /components/sections/
Block (Card/UI) → /components/ui/
Component (Utility) → /components/ui/ or /components/common/
```

---

## Common Confusions Resolved

### 1. Why is Logo documented in `components/` but referenced in `parts/`?

**Answer:** Logo is a **shared component** that appears in multiple parts (Header, Footer, MobileMenu). It's documented in `/guidelines/components/Logo.md` as a reusable component, and referenced from part guidelines.

**Pattern:**
```markdown
# In parts/Header.md
See [Logo component](../components/Logo.md) for complete documentation.

# In components/Logo.md
**Used In:** Header, Footer, MobileMenu (all parts)
```

---

### 2. Why is Lightbox in `blocks/` when it's in `/components/ui/`?

**Answer:** "Blocks" is a **conceptual category** describing what the component does (a content unit), not where it lives. The file location `/components/ui/` is the **physical location**.

**Mapping:**
- **Conceptual:** Block (content unit that displays images)
- **Documentation:** `/guidelines/blocks/Lightbox.md`
- **Code Location:** `/components/ui/EnhancedLightbox.tsx`

---

### 3. Why are some components documented twice?

**Answer:** Components used in specific contexts have **context-specific guidelines**:

**Example: Logo**
- **Primary:** `/guidelines/components/Logo.md` - Complete component documentation
- **Referenced in:** `parts/Header.md`, `parts/Footer.md`, `parts/MobileMenu.md`

**Example: ContactForm**
- **Primary:** `/guidelines/components/ContactForm.md` - Complete form documentation
- **Referenced in:** `parts/Footer.md` (usage within footer context)

---

### 4. Where are patterns if they're not single files?

**Answer:** Patterns are **compositions** documented as **solutions**, not files:

**Example: CardGridWithFilters**
- **Documentation:** `/guidelines/patterns/CardGridWithFilters.md`
- **Composition:** Uses CategoryFilter + Grid layout + BlogCard components
- **Code Location:** Implemented in BlogPage.tsx as a pattern, not a single component

---

## Component Naming Conventions

### Documentation File Names

```
# PascalCase with .md extension
Logo.md
ContactForm.md
HeroSection.md
CardGridWithFilters.md
```

### Component File Names

```
# PascalCase with .tsx extension
Logo.tsx
ContactForm.tsx
HeroSection.tsx
EnhancedLightbox.tsx  # May have descriptive prefix
```

### Documentation Title

```markdown
# [Component Name] Guidelines

Not:
# [Component Name] Component
# [Component Name] Documentation
```

---

## Cross-Reference Patterns

### Correct Cross-References

```markdown
# From sections/HeroSection.md
See [Logo component](../components/Logo.md) for logo usage.

# From blocks/PortfolioCard.md
Uses [Lightbox](./Lightbox.md) for image viewing.

# From parts/Header.md
Integrates [MobileMenu](./MobileMenu.md) for mobile navigation.
```

### Referencing Component Code

```markdown
# When referencing actual component files
**File:** `/components/sections/HeroSection.tsx`
**Import:** `import { HeroSection } from './components/sections/HeroSection';`
```

---

## WordPress Block Theme Alignment

### Conceptual Mapping

| WordPress | Ash Shaw | Code Location | Documentation |
|-----------|----------|---------------|---------------|
| `template` | Template | `/components/pages/` | `/guidelines/templates/` |
| `template-part` | Part | `/components/common/` | `/guidelines/parts/` |
| `core/group` | Section | `/components/sections/` | `/guidelines/sections/` |
| `core/pattern` | Pattern | Various | `/guidelines/patterns/` |
| `core/block` | Block | `/components/ui/` | `/guidelines/blocks/` |
| Component | Component | `/components/ui/`, `/components/common/` | `/guidelines/components/` |

---

## Best Practices

### 1. Documentation File Location

```
✅ CORRECT:
- Part documentation → /guidelines/parts/
- Shared component documentation → /guidelines/components/
- Block documentation → /guidelines/blocks/

❌ WRONG:
- Don't duplicate full documentation in multiple locations
- Don't create guidelines in /components/ folder (code folder)
```

### 2. Cross-Referencing

```markdown
✅ CORRECT:
See [Logo component](../components/Logo.md) for details.

❌ WRONG:
See [Logo component](../../components/common/Logo.tsx) for details.
```

### 3. File Path References

```markdown
✅ CORRECT:
**File:** `/components/common/Header.tsx`

❌ WRONG:
**File:** `src/components/common/Header.tsx` (no src/ prefix)
**File:** `/components/parts/Header.tsx` (wrong folder)
```

---

## Migration Guide

### If Documentation References Wrong Path

**Problem:** Guideline says component is in `/components/parts/` but it's actually in `/components/common/`

**Solution:**
1. Update the **File:** path in the guideline
2. Keep the **Documentation:** location the same
3. Add a note in ARCHITECTURE.md if needed

**Example Fix:**

```markdown
# Before (WRONG)
**File:** `/components/parts/Header.tsx`

# After (CORRECT)
**File:** `/components/common/Header.tsx`
**Documentation:** `/guidelines/parts/Header.md` ✓ (This is correct - it's a part conceptually)
```

---

## Summary

### Key Principles

1. **Conceptual vs Physical:** Documentation categories describe **purpose**, file locations describe **storage**
2. **Single Source of Truth:** Each component has ONE primary guideline file
3. **Cross-Reference:** Related guidelines reference each other, don't duplicate
4. **WordPress Alignment:** Use WordPress block theme terminology for clarity
5. **Consistent Structure:** All guidelines follow the same template

### Quick Lookup

| Looking for... | Documentation Location | Code Location |
|---------------|----------------------|---------------|
| Page layout | `/guidelines/templates/` | `/components/pages/` |
| Header/Footer | `/guidelines/parts/` | `/components/common/` |
| Layout section | `/guidelines/sections/` | `/components/sections/` |
| Content card | `/guidelines/blocks/` | `/components/ui/` |
| Design pattern | `/guidelines/patterns/` | Various (composition) |
| UI component | `/guidelines/components/` | `/components/ui/` or `/components/common/` |

---

**Last Updated:** February 2026  
**Version:** 4.0.0  
**Maintained by:** Ash Shaw Portfolio Team

For questions about component organization, refer to this document or the main [Guidelines.md](./Guidelines.md).