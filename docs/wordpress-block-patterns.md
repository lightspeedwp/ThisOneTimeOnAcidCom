---
title: "WordPress Block Patterns Documentation"
filename: "/docs/wordpress-block-patterns.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
related: "/docs/wordpress-migration-plan.md"
---

# WordPress Block Patterns Documentation

**Project:** Ash Shaw Makeup Portfolio  
**Purpose:** Document React component mappings to WordPress block patterns  
**Created:** March 11, 2026  
**Status:** Planning

---

## Overview

This document maps existing React components to WordPress block patterns. Each pattern includes the block structure, required attributes, and implementation notes.

**Block Pattern Categories:**
1. Hero Sections
2. Content Layouts
3. Archive/Grid Patterns
4. Call-to-Action Sections
5. Navigation Patterns

---

## 1. Hero Section Patterns

### Hero - Default

**React Component:** `/components/ui/Hero.tsx`

**WordPress Blocks:** Group + Cover

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"hero section section--dark"} -->
<div class="wp-block-group alignfull hero section section--dark">
  
  <!-- wp:cover {"url":"hero-image.jpg","dimRatio":50,"overlayColor":"atomic-black","minHeight":600,"className":"hero__background"} -->
  <div class="wp-block-cover hero__background" style="min-height:600px">
    <span aria-hidden="true" class="wp-block-cover__background has-atomic-black-background-color has-background-dim"></span>
    <img class="wp-block-cover__image-background" alt="" src="hero-image.jpg" data-object-fit="cover"/>
    
    <div class="wp-block-cover__inner-container">
      <!-- wp:heading {"textAlign":"center","level":1,"className":"hero__title"} -->
      <h1 class="wp-block-heading has-text-align-center hero__title">Welcome to My Portfolio</h1>
      <!-- /wp:heading -->
      
      <!-- wp:paragraph {"align":"center","className":"hero__subtitle"} -->
      <p class="has-text-align-center hero__subtitle">Makeup artist, educator, and creative visionary</p>
      <!-- /wp:paragraph -->
      
      <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
      <div class="wp-block-buttons">
        <!-- wp:button {"className":"hero__cta"} -->
        <div class="wp-block-button hero__cta"><a class="wp-block-button__link wp-element-button" href="/portfolio">View Portfolio</a></div>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
  </div>
  <!-- /wp:cover -->
  
</div>
<!-- /wp:group -->
```

**Custom Fields (ACF):**
- `hero_title` (Text)
- `hero_subtitle` (Textarea)
- `hero_background_image` (Image)
- `hero_cta_text` (Text)
- `hero_cta_link` (Link)

**CSS Classes Used:**
- `.hero` - Main container
- `.hero__title` - Title styling
- `.hero__subtitle` - Subtitle styling
- `.hero__cta` - CTA button

**Complexity:** Low  
**Migration Notes:** Direct mapping, no custom block needed

---

## 2. Portfolio Grid Pattern

### Portfolio Grid - Masonry Layout

**React Component:** `/components/pages/PortfolioPage.tsx` (grid section)

**WordPress Blocks:** Query Loop + Custom Portfolio Card Block

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"portfolio-grid section"} -->
<div class="wp-block-group alignfull portfolio-grid section">
  
  <!-- wp:query {"queryId":1,"query":{"postType":"portfolio","perPage":12,"order":"desc","orderBy":"date"},"displayLayout":{"type":"grid","columns":3}} -->
  <div class="wp-block-query">
    
    <!-- wp:post-template {"className":"portfolio-grid__container"} -->
    
      <!-- wp:ash-shaw/portfolio-card /-->
      
    <!-- /wp:post-template -->
    
    <!-- wp:query-pagination {"paginationArrow":"arrow","className":"archive-pagination"} -->
      <!-- wp:query-pagination-previous /-->
      <!-- wp:query-pagination-numbers /-->
      <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->
    
    <!-- wp:query-no-results -->
      <!-- wp:paragraph -->
      <p>No portfolio entries found.</p>
      <!-- /wp:paragraph -->
    <!-- /wp:query-no-results -->
    
  </div>
  <!-- /wp:query -->
  
</div>
<!-- /wp:group -->
```

**Custom Block Required:** `ash-shaw/portfolio-card`

**Block Attributes:**
```json
{
  "showCategory": {
    "type": "boolean",
    "default": true
  },
  "showYear": {
    "type": "boolean",
    "default": true
  },
  "enableLightbox": {
    "type": "boolean",
    "default": true
  },
  "imageSize": {
    "type": "string",
    "default": "large"
  }
}
```

**CSS Classes Used:**
- `.portfolio-grid` - Grid container
- `.portfolio-card` - Individual card
- `.portfolio-card__image` - Card image
- `.portfolio-card__title` - Card title
- `.portfolio-card__category` - Category label

**Complexity:** Medium  
**Migration Notes:** Requires custom `portfolio-card` block with lightbox integration

---

## 3. Blog Archive Pattern

### Blog Grid - Standard Layout

**React Component:** `/components/pages/BlogPage.tsx`

**WordPress Blocks:** Query Loop + Post Template (Native)

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"blog-archive section"} -->
<div class="wp-block-group alignfull blog-archive section">
  
  <!-- wp:query {"queryId":2,"query":{"postType":"post","perPage":9},"displayLayout":{"type":"grid","columns":3}} -->
  <div class="wp-block-query">
    
    <!-- wp:post-template {"className":"blog-grid"} -->
    
      <!-- wp:group {"className":"blog-card"} -->
      <div class="wp-block-group blog-card">
        
        <!-- wp:post-featured-image {"className":"blog-card__image"} /-->
        
        <!-- wp:post-title {"level":3,"className":"blog-card__title"} /-->
        
        <!-- wp:group {"className":"blog-card__meta"} -->
        <div class="wp-block-group blog-card__meta">
          <!-- wp:post-date /-->
          <!-- wp:post-terms {"term":"category"} /-->
        </div>
        <!-- /wp:group -->
        
        <!-- wp:post-excerpt {"className":"blog-card__excerpt"} /-->
        
        <!-- wp:read-more {"className":"blog-card__read-more"} /-->
        
      </div>
      <!-- /wp:group -->
      
    <!-- /wp:post-template -->
    
    <!-- wp:query-pagination {"className":"archive-pagination"} -->
      <!-- wp:query-pagination-previous /-->
      <!-- wp:query-pagination-numbers /-->
      <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->
    
  </div>
  <!-- /wp:query -->
  
</div>
<!-- /wp:group -->
```

**Custom Fields:** None (uses native post fields)

**CSS Classes Used:**
- `.blog-archive` - Archive container
- `.blog-grid` - Grid layout
- `.blog-card` - Individual post card
- `.blog-card__image` - Featured image
- `.blog-card__title` - Post title
- `.blog-card__meta` - Metadata container
- `.blog-card__excerpt` - Post excerpt
- `.blog-card__read-more` - Read more link

**Complexity:** Low  
**Migration Notes:** Uses native WordPress blocks, no custom blocks needed

---

## 4. Video Grid Pattern

### Videos Archive - Grid with Modal

**React Component:** `/components/pages/videos/VideosPage.tsx`

**WordPress Blocks:** Query Loop + Custom Video Card Block

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"videos-grid section"} -->
<div class="wp-block-group alignfull videos-grid section">
  
  <!-- wp:query {"queryId":3,"query":{"postType":"video","perPage":12},"displayLayout":{"type":"grid","columns":3}} -->
  <div class="wp-block-query">
    
    <!-- wp:post-template {"className":"videos-grid__container"} -->
    
      <!-- wp:ash-shaw/video-card /-->
      
    <!-- /wp:post-template -->
    
    <!-- wp:query-pagination {"className":"archive-pagination"} -->
      <!-- wp:query-pagination-previous /-->
      <!-- wp:query-pagination-numbers /-->
      <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->
    
  </div>
  <!-- /wp:query -->
  
</div>
<!-- /wp:group -->
```

**Custom Block Required:** `ash-shaw/video-card`

**Block Attributes:**
```json
{
  "showDuration": {
    "type": "boolean",
    "default": true
  },
  "showCategory": {
    "type": "boolean",
    "default": true
  },
  "enableModal": {
    "type": "boolean",
    "default": true
  },
  "videoSource": {
    "type": "string",
    "enum": ["youtube", "vimeo", "self-hosted"],
    "default": "youtube"
  }
}
```

**ACF Fields (Video CPT):**
- `video_url` (URL)
- `video_duration` (Text)
- `video_thumbnail` (Image)
- `video_source` (Select: YouTube/Vimeo/Self-hosted)

**CSS Classes Used:**
- `.videos-grid` - Grid container
- `.video-card` - Individual video card
- `.video-card__thumbnail` - Thumbnail image
- `.video-card__play-button` - Play button overlay
- `.video-card__duration` - Duration badge
- `.video-card__title` - Video title

**Complexity:** Medium  
**Migration Notes:** Requires custom block with modal player integration

---

## 5. CTA Section Pattern

### Call-to-Action - Centered

**React Component:** Various CTA sections

**WordPress Blocks:** Group + Buttons (Native)

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"cta-section section section--gradient"} -->
<div class="wp-block-group alignfull cta-section section section--gradient">
  
  <!-- wp:heading {"textAlign":"center","level":2,"className":"cta-section__title"} -->
  <h2 class="wp-block-heading has-text-align-center cta-section__title">Ready to collaborate?</h2>
  <!-- /wp:heading -->
  
  <!-- wp:paragraph {"align":"center","className":"cta-section__description"} -->
  <p class="has-text-align-center cta-section__description">Let's create something amazing together</p>
  <!-- /wp:paragraph -->
  
  <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
  <div class="wp-block-buttons">
    <!-- wp:button {"className":"cta-section__button"} -->
    <div class="wp-block-button cta-section__button"><a class="wp-block-button__link wp-element-button" href="/contact">Get in Touch</a></div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->
  
</div>
<!-- /wp:group -->
```

**Custom Fields:** None (uses block content)

**CSS Classes Used:**
- `.cta-section` - Section container
- `.cta-section__title` - Heading
- `.cta-section__description` - Description text
- `.cta-section__button` - CTA button

**Complexity:** Low  
**Migration Notes:** Direct mapping, no custom block needed

---

## 6. Breadcrumbs Pattern

### Breadcrumbs - Schema.org Compliant

**React Component:** `/components/ui/Breadcrumbs.tsx`

**WordPress Blocks:** Custom Breadcrumbs Block

**Block Structure:**
```html
<!-- wp:ash-shaw/breadcrumbs {"items":[{"label":"Home","href":"/"},{"label":"Portfolio","href":"/portfolio"},{"label":"Current Page"}]} /-->
```

**Custom Block Required:** `ash-shaw/breadcrumbs`

**Block Attributes:**
```json
{
  "items": {
    "type": "array",
    "default": []
  },
  "showHome": {
    "type": "boolean",
    "default": true
  },
  "separator": {
    "type": "string",
    "default": ">"
  },
  "includeSchema": {
    "type": "boolean",
    "default": true
  }
}
```

**CSS Classes Used:**
- `.breadcrumbs` - Container
- `.breadcrumbs__list` - List wrapper
- `.breadcrumbs__item` - Individual item
- `.breadcrumbs__link` - Clickable link
- `.breadcrumbs__separator` - Separator icon

**Complexity:** Medium  
**Migration Notes:** Requires custom block with Schema.org BreadcrumbList JSON-LD injection

---

## 7. Testimonial Slider Pattern

### Testimonials - Carousel

**React Component:** `/components/sections/TestimonialSlider.tsx` (if exists)

**WordPress Blocks:** Custom Testimonial Block or Third-party Slider

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"testimonials section"} -->
<div class="wp-block-group alignfull testimonials section">
  
  <!-- wp:heading {"textAlign":"center","level":2} -->
  <h2 class="wp-block-heading has-text-align-center">What clients say</h2>
  <!-- /wp:heading -->
  
  <!-- wp:ash-shaw/testimonial-slider /-->
  
</div>
<!-- /wp:group -->
```

**Custom Block Required:** `ash-shaw/testimonial-slider`

**Block Attributes:**
```json
{
  "autoPlay": {
    "type": "boolean",
    "default": true
  },
  "interval": {
    "type": "number",
    "default": 5000
  },
  "showNavigation": {
    "type": "boolean",
    "default": true
  },
  "testimonialIds": {
    "type": "array",
    "default": []
  }
}
```

**ACF Fields (Testimonial CPT):**
- `client_name` (Text)
- `client_photo` (Image)
- `testimonial_text` (Textarea)
- `client_title` (Text)
- `rating` (Number: 1-5)

**CSS Classes Used:**
- `.testimonials` - Section container
- `.testimonial-card` - Individual testimonial
- `.testimonial-card__quote` - Quote text
- `.testimonial-card__author` - Author name
- `.testimonial-card__photo` - Author photo

**Complexity:** High  
**Migration Notes:** Requires custom block with carousel/slider logic

---

## 8. FAQ Section Pattern

### FAQ - Accordion Style

**React Component:** `/components/sections/FaqSection.tsx`

**WordPress Blocks:** Custom FAQ Block or Native Details

**Block Structure:**
```html
<!-- wp:group {"align":"full","className":"faq-section section"} -->
<div class="wp-block-group alignfull faq-section section">
  
  <!-- wp:heading {"textAlign":"center","level":2} -->
  <h2 class="wp-block-heading has-text-align-center">Frequently asked questions</h2>
  <!-- /wp:heading -->
  
  <!-- wp:ash-shaw/faq-accordion /-->
  
</div>
<!-- /wp:group -->
```

**Custom Block Required:** `ash-shaw/faq-accordion`

**Block Attributes:**
```json
{
  "faqPageId": {
    "type": "string",
    "default": "general"
  },
  "includeSchema": {
    "type": "boolean",
    "default": true
  },
  "defaultExpanded": {
    "type": "boolean",
    "default": false
  }
}
```

**ACF Fields (FAQ CPT):**
- `question` (Text)
- `answer` (Wysiwyg)
- `category` (Taxonomy)

**CSS Classes Used:**
- `.faq-section` - Container
- `.accordion` - Accordion wrapper
- `.accordion__item` - Individual FAQ
- `.accordion__question` - Question button
- `.accordion__answer` - Answer content

**Complexity:** Medium  
**Migration Notes:** Requires custom block with Schema.org FAQPage JSON-LD

---

## 9. Mega Menu Pattern

### Portfolio Mega Menu

**React Component:** `/components/common/PortfolioMegaMenu.tsx`

**WordPress Blocks:** Navigation Block + Custom Mega Menu Block

**Block Structure:**
```html
<!-- wp:navigation {"className":"mega-menu"} -->
  
  <!-- wp:navigation-link {"label":"Portfolio","url":"/portfolio"} -->
    
    <!-- wp:ash-shaw/mega-menu-portfolio /-->
    
  <!-- /wp:navigation-link -->
  
<!-- /wp:navigation -->
```

**Custom Block Required:** `ash-shaw/mega-menu-portfolio`

**Block Attributes:**
```json
{
  "featuredCount": {
    "type": "number",
    "default": 3
  },
  "showCategories": {
    "type": "boolean",
    "default": true
  },
  "columns": {
    "type": "number",
    "default": 3
  }
}
```

**CSS Classes Used:**
- `.mega-menu` - Menu container
- `.mega-menu__panel` - Dropdown panel
- `.mega-menu__featured` - Featured items section
- `.mega-menu__categories` - Category list section

**Complexity:** High  
**Migration Notes:** Complex interactions, requires custom JavaScript for dropdown behavior

---

## Pattern Implementation Priority

### Phase 1: Essential Patterns (Weeks 1-2)
1. ✅ Hero Section - Direct mapping
2. ✅ Blog Archive - Native blocks
3. ✅ CTA Section - Direct mapping

### Phase 2: Custom Blocks (Weeks 3-6)
4. Portfolio Card block
5. Video Card block
6. Breadcrumbs block
7. FAQ Accordion block

### Phase 3: Complex Patterns (Weeks 7-10)
8. Testimonial Slider block
9. Mega Menu blocks
10. Advanced filtering/search patterns

---

## Block Registration Example

### Portfolio Card Block

**File:** `/blocks/portfolio-card/block.json`

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "ash-shaw/portfolio-card",
  "title": "Portfolio Card",
  "category": "ash-shaw",
  "icon": "images-alt2",
  "description": "Display a portfolio entry with image, title, and category",
  "keywords": ["portfolio", "gallery", "image"],
  "version": "1.0.0",
  "textdomain": "ash-shaw-portfolio",
  "attributes": {
    "showCategory": {
      "type": "boolean",
      "default": true
    },
    "showYear": {
      "type": "boolean",
      "default": true
    },
    "enableLightbox": {
      "type": "boolean",
      "default": true
    }
  },
  "supports": {
    "html": false,
    "align": false
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css"
}
```

**File:** `/blocks/portfolio-card/index.js`

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

registerBlockType('ash-shaw/portfolio-card', {
  edit: ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    
    return (
      <div {...blockProps}>
        <ToggleControl
          label="Show Category"
          checked={attributes.showCategory}
          onChange={(value) => setAttributes({ showCategory: value })}
        />
        <ToggleControl
          label="Show Year"
          checked={attributes.showYear}
          onChange={(value) => setAttributes({ showYear: value })}
        />
        <ToggleControl
          label="Enable Lightbox"
          checked={attributes.enableLightbox}
          onChange={(value) => setAttributes({ enableLightbox: value })}
        />
        <p>Portfolio Card (Content from current post in loop)</p>
      </div>
    );
  },
  save: () => null, // Dynamic block rendered via PHP
});
```

---

## Migration Checklist

- [ ] Document all block patterns
- [ ] Create custom block library plan
- [ ] Test block editor compatibility with existing CSS
- [ ] Create block pattern JSON files
- [ ] Register custom block category
- [ ] Build portfolio-card block
- [ ] Build video-card block
- [ ] Build breadcrumbs block
- [ ] Build faq-accordion block
- [ ] Test all patterns in Gutenberg editor
- [ ] Verify Schema.org structured data
- [ ] Accessibility testing (keyboard navigation, screen readers)

---

## References

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block Patterns Documentation](https://developer.wordpress.org/themes/features/block-patterns/)
- [Query Loop Block](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/#query-loop)
- [Custom Block Tutorial](https://developer.wordpress.org/block-editor/getting-started/tutorial/)

---

**Document Status:** Active  
**Last Updated:** March 11, 2026  
**Next Review:** After Phase 1 block development  
**Owner:** Development Team
