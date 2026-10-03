---
title: "WordPress Block Mapping"
filename: "/docs/wordpress-block-mapping.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
related: "/docs/wordpress-migration-plan.md, /docs/wordpress-block-patterns.md"
---

# WordPress Block Mapping

**Project:** Ash Shaw Makeup Portfolio  
**Purpose:** Map React components to WordPress blocks and identify custom block needs  
**Created:** March 11, 2026  
**Status:** Planning

---

## Overview

This document provides a comprehensive mapping of all React components to their WordPress block equivalents. It identifies which components can use native WordPress blocks and which require custom block development.

**Mapping Categories:**
- ✅ Native Blocks (WordPress core)
- 🔧 Custom Blocks Required
- 🔌 Third-party Plugin Blocks
- ⚡ Dynamic Blocks (PHP-rendered)

---

## Component Mapping Table

| React Component | WordPress Block | Type | Complexity | Priority |
|-----------------|-----------------|------|------------|----------|
| **Layout Components** |
| `Header.tsx` | Navigation Block + Custom Header | 🔧 Custom | High | P1 |
| `Footer.tsx` | Template Part (footer.html) | ✅ Native | Low | P1 |
| `MobileMenu.tsx` | Navigation Block (responsive) | ✅ Native | Medium | P1 |
| `RootLayout.tsx` | Site Template | ✅ Native | Low | P1 |
| **Hero & Headers** |
| `Hero.tsx` | Group + Cover | ✅ Native | Low | P1 |
| **Portfolio Components** |
| `PortfolioCard.tsx` | Custom `portfolio-card` block | 🔧 Custom | Medium | P1 |
| `PortfolioImage.tsx` | Image Block (extended) | ✅ Native | Low | P2 |
| `EnhancedLightbox.tsx` | Custom `lightbox` block | 🔧 Custom | High | P1 |
| `ImageGallery.tsx` | Gallery Block (extended) | ✅ Native | Low | P2 |
| **Blog Components** |
| BlogPage Grid | Query Loop + Post Template | ✅ Native | Low | P1 |
| BlogPostPage | Post Content Template | ✅ Native | Low | P1 |
| SearchInput | Search Block (extended) | ✅ Native | Low | P2 |
| **Video Components** |
| `VideoPlayer.tsx` | Custom `video-card` block | 🔧 Custom | Medium | P1 |
| `VideoModal.tsx` | Custom `video-modal` block | 🔧 Custom | High | P2 |
| VideosPage Grid | Query Loop + Custom Block | 🔧 Custom | Medium | P1 |
| **UI Components** |
| `Breadcrumbs.tsx` | Custom `breadcrumbs` block | 🔧 Custom | Medium | P1 |
| `Button.tsx` | Button Block | ✅ Native | Low | P1 |
| `Card.tsx` | Group Block | ✅ Native | Low | P1 |
| `Accordion.tsx` | Details Block or Custom | 🔧 Custom | Medium | P2 |
| `ShareComponent.tsx` | Custom `share-buttons` block | 🔧 Custom | Low | P3 |
| `ScrollToTop.tsx` | Custom block (client-side JS) | 🔧 Custom | Low | P3 |
| `ScrollDownArrow.tsx` | Custom block (client-side JS) | 🔧 Custom | Low | P3 |
| **Navigation** |
| `PortfolioMegaMenu.tsx` | Custom `mega-menu-portfolio` block | 🔧 Custom | High | P2 |
| `BlogMegaMenu.tsx` | Custom `mega-menu-blog` block | 🔧 Custom | High | P2 |
| `AboutDropdown.tsx` | Navigation Submenu Block | ✅ Native | Medium | P2 |
| **Sections** |
| `FaqSection.tsx` | Custom `faq-accordion` block | 🔧 Custom | Medium | P1 |
| CTA Sections | Group + Buttons | ✅ Native | Low | P1 |
| **Filters & Archives** |
| `ArchiveFilters.tsx` | Custom `archive-filters` block | 🔧 Custom | High | P2 |
| **Theme & Utilities** |
| `ThemeSwitcher.tsx` | Custom block (client-side JS) | 🔧 Custom | Low | P3 |
| `PWAInstallPrompt.tsx` | Custom block (client-side JS) | 🔧 Custom | Low | P3 |
| `OfflineIndicator.tsx` | Custom block (client-side JS) | 🔧 Custom | Low | P3 |

---

## Custom Blocks Required

### Priority 1 (Essential - Weeks 1-4)

#### 1. Portfolio Card Block

**Name:** `ash-shaw/portfolio-card`  
**React Component:** `/components/ui/PortfolioCard.tsx`  
**Purpose:** Display portfolio entry with image, title, category, lightbox

**Attributes:**
```json
{
  "showCategory": { "type": "boolean", "default": true },
  "showYear": { "type": "boolean", "default": true },
  "enableLightbox": { "type": "boolean", "default": true },
  "imageSize": { "type": "string", "default": "large" }
}
```

**Dependencies:**
- ACF Fields: `featured_image`, `gallery`, `category`, `year`
- Lightbox integration

**Estimated Hours:** 16-20

---

#### 2. Video Card Block

**Name:** `ash-shaw/video-card`  
**React Component:** `/components/pages/videos/VideosPage.tsx` (video card logic)  
**Purpose:** Display video with thumbnail, duration, play button, modal integration

**Attributes:**
```json
{
  "showDuration": { "type": "boolean", "default": true },
  "showCategory": { "type": "boolean", "default": true },
  "enableModal": { "type": "boolean", "default": true },
  "videoSource": { "type": "string", "enum": ["youtube", "vimeo", "self-hosted"] }
}
```

**Dependencies:**
- ACF Fields: `video_url`, `video_duration`, `video_thumbnail`
- Modal player integration

**Estimated Hours:** 20-24

---

#### 3. Breadcrumbs Block

**Name:** `ash-shaw/breadcrumbs`  
**React Component:** `/components/ui/Breadcrumbs.tsx`  
**Purpose:** Display breadcrumb navigation with Schema.org structured data

**Attributes:**
```json
{
  "showHome": { "type": "boolean", "default": true },
  "separator": { "type": "string", "default": ">" },
  "includeSchema": { "type": "boolean", "default": true }
}
```

**Dependencies:**
- Schema.org BreadcrumbList JSON-LD
- Dynamic breadcrumb generation from page hierarchy

**Estimated Hours:** 12-16

---

#### 4. FAQ Accordion Block

**Name:** `ash-shaw/faq-accordion`  
**React Component:** `/components/sections/FaqSection.tsx`  
**Purpose:** Display FAQ items with accordion UI and Schema.org FAQPage

**Attributes:**
```json
{
  "faqPageId": { "type": "string", "default": "general" },
  "includeSchema": { "type": "boolean", "default": true },
  "defaultExpanded": { "type": "boolean", "default": false }
}
```

**Dependencies:**
- FAQ CPT or ACF repeater field
- Schema.org FAQPage JSON-LD

**Estimated Hours:** 16-20

---

### Priority 2 (Enhanced Features - Weeks 5-8)

#### 5. Mega Menu Portfolio Block

**Name:** `ash-shaw/mega-menu-portfolio`  
**React Component:** `/components/common/PortfolioMegaMenu.tsx`  
**Purpose:** Dropdown mega menu showing featured portfolio items + categories

**Attributes:**
```json
{
  "featuredCount": { "type": "number", "default": 3 },
  "showCategories": { "type": "boolean", "default": true },
  "columns": { "type": "number", "default": 3 }
}
```

**Dependencies:**
- Portfolio CPT query
- Complex hover/click interactions

**Estimated Hours:** 24-32

---

#### 6. Mega Menu Blog Block

**Name:** `ash-shaw/mega-menu-blog`  
**React Component:** `/components/common/BlogMegaMenu.tsx`  
**Purpose:** Dropdown mega menu showing recent blog posts + categories

**Attributes:**
```json
{
  "recentCount": { "type": "number", "default": 3 },
  "showCategories": { "type": "boolean", "default": true },
  "columns": { "type": "number", "default": 3 }
}
```

**Dependencies:**
- Post query
- Complex hover/click interactions

**Estimated Hours:** 24-32

---

#### 7. Archive Filters Block

**Name:** `ash-shaw/archive-filters`  
**React Component:** `/components/ui/ArchiveFilters.tsx`  
**Purpose:** Category/tag filtering + sorting for archives

**Attributes:**
```json
{
  "contentType": { "type": "string", "enum": ["portfolio", "blog", "video"] },
  "enableSearch": { "type": "boolean", "default": true },
  "enableSort": { "type": "boolean", "default": true }
}
```

**Dependencies:**
- JavaScript filtering logic
- Query integration

**Estimated Hours:** 20-24

---

#### 8. Lightbox Block

**Name:** `ash-shaw/lightbox`  
**React Component:** `/components/ui/EnhancedLightbox.tsx`  
**Purpose:** Fullscreen image viewer with prev/next navigation

**Attributes:**
```json
{
  "enableKeyboard": { "type": "boolean", "default": true },
  "enableZoom": { "type": "boolean", "default": true },
  "showThumbnails": { "type": "boolean", "default": false }
}
```

**Dependencies:**
- JavaScript lightbox logic
- Touch gesture support

**Estimated Hours:** 24-28

---

#### 9. Video Modal Block

**Name:** `ash-shaw/video-modal`  
**React Component:** `/components/pages/videos/VideoModal.tsx`  
**Purpose:** Modal player for YouTube/Vimeo videos

**Attributes:**
```json
{
  "videoSource": { "type": "string", "enum": ["youtube", "vimeo"] },
  "autoPlay": { "type": "boolean", "default": false }
}
```

**Dependencies:**
- YouTube/Vimeo iframe API
- Modal overlay logic

**Estimated Hours:** 16-20

---

### Priority 3 (Optional Enhancements - Weeks 9-12)

#### 10. Share Buttons Block

**Name:** `ash-shaw/share-buttons`  
**React Component:** `/components/ui/ShareComponent.tsx`  
**Purpose:** Social sharing buttons for posts

**Estimated Hours:** 8-12

---

#### 11. Theme Switcher Block

**Name:** `ash-shaw/theme-switcher`  
**React Component:** `/components/common/ThemeSwitcher.tsx`  
**Purpose:** Dark/light mode toggle button

**Estimated Hours:** 8-12

---

#### 12. Scroll to Top Block

**Name:** `ash-shaw/scroll-to-top`  
**React Component:** `/components/ui/ScrollToTop.tsx`  
**Purpose:** Floating button to scroll to page top

**Estimated Hours:** 6-8

---

## Native Block Mappings

### Fully Compatible (No Modifications Needed)

| React Component | WordPress Block | Notes |
|-----------------|-----------------|-------|
| Hero backgrounds | Cover Block | Direct replacement |
| CTA sections | Group + Buttons | Direct replacement |
| Blog cards | Query Loop + Post Template | Direct replacement |
| Footer links | Navigation Block | Direct replacement |
| Simple images | Image Block | Direct replacement |
| Paragraphs | Paragraph Block | Direct replacement |
| Headings | Heading Block | Direct replacement |

---

## Third-party Plugin Blocks

### Optional Plugins for Enhanced Functionality

| Feature | Plugin | Block Name | Cost |
|---------|--------|------------|------|
| Advanced sliders | Swiper Slider | `swiper/slider` | Free |
| Contact forms | Contact Form 7 | `contact-form-7/form` | Free |
| SEO optimization | Yoast SEO | Various schema blocks | Free |
| Analytics | MonsterInsights | `monsterinsights/popular-posts` | Freemium |

---

## Block Category Registration

**File:** `/inc/blocks.php`

```php
<?php
/**
 * Register custom block category for Ash Shaw blocks
 */
function ash_shaw_register_block_category( $categories ) {
  return array_merge(
    $categories,
    [
      [
        'slug'  => 'ash-shaw',
        'title' => 'Ash Shaw Portfolio',
        'icon'  => 'art',
      ],
    ]
  );
}
add_filter( 'block_categories_all', 'ash_shaw_register_block_category' );
```

---

## Development Workflow

### Step 1: Block Scaffolding
```bash
npx @wordpress/create-block ash-shaw-portfolio-card --namespace ash-shaw
```

### Step 2: Copy React Logic
- Extract component logic from React component
- Convert hooks to WordPress equivalents
- Adapt state management for WordPress editor

### Step 3: Register Block
```php
register_block_type( __DIR__ . '/blocks/portfolio-card' );
```

### Step 4: Add ACF Integration
```php
function ash_shaw_portfolio_card_render( $attributes ) {
  ob_start();
  get_template_part( 'blocks/portfolio-card/template', null, $attributes );
  return ob_get_clean();
}
```

---

## Conversion Checklist

### For Each Custom Block:

- [ ] Create block.json configuration
- [ ] Convert React component to WordPress block edit function
- [ ] Create PHP render callback (for dynamic blocks)
- [ ] Port CSS from `/styles/blocks/` to block stylesheet
- [ ] Add block attributes matching React props
- [ ] Test in block editor
- [ ] Test on frontend
- [ ] Add block pattern examples
- [ ] Document block usage

---

## Estimated Timeline

| Phase | Tasks | Hours | Weeks |
|-------|-------|-------|-------|
| **P1 Blocks** | 4 essential blocks | 64-80 | 2-3 |
| **P2 Blocks** | 5 enhanced blocks | 108-136 | 3-4 |
| **P3 Blocks** | 3 optional blocks | 22-32 | 1-2 |
| **Testing** | All blocks QA | 40-50 | 1-2 |
| **Documentation** | Block usage guides | 16-24 | 1 |
| **TOTAL** | 12 custom blocks | **250-322** | **8-12** |

---

## Success Metrics

### Block Quality Checklist:

- [ ] Works in block editor (drag/drop, settings panel)
- [ ] Renders correctly on frontend
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Schema.org structured data (where applicable)
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Documentation complete
- [ ] Examples in pattern library

---

## References

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Create Block Package](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/)
- [Dynamic Blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/)
- [ACF Blocks](https://www.advancedcustomfields.com/resources/blocks/)

---

**Document Status:** Active  
**Last Updated:** March 11, 2026  
**Next Review:** After first custom block complete  
**Owner:** Development Team
