---
title: "WordPress Full Site Editing (FSE) Integration Guide"
filename: "/docs/wordpress-fse-guide.md"
created: "2026-03-12"
modified: "2026-03-12"
version: "1.0.0"
related_docs: 
  - "/docs/wordpress-migration-plan.md"
  - "/docs/wordpress-block-patterns.md"
  - "/docs/wordpress-block-mapping.md"
  - "/docs/theme.json"
---

# WordPress Full Site Editing (FSE) Integration Guide

**Created:** March 12, 2026  
**Last Updated:** March 12, 2026  
**Status:** Active

---

## Overview

This guide documents how to integrate the Nova News React application with WordPress Full Site Editing (FSE). It covers block theme structure, template parts, and the migration path from the current static React build to a WordPress headless CMS.

**Prerequisites:**
- WordPress 6.0+ (FSE support)
- PHP 8.0+ (recommended)
- Node.js 18+ (for build process)
- Understanding of React component architecture
- Familiarity with WordPress blocks and templates

---

## Table of Contents

1. [What is Full Site Editing?](#what-is-full-site-editing)
2. [Block Theme Structure](#block-theme-structure)
3. [Template Parts](#template-parts)
4. [Template Hierarchy](#template-hierarchy)
5. [theme.json Integration](#themejson-integration)
6. [Custom Block Registration](#custom-block-registration)
7. [Migration Strategy](#migration-strategy)
8. [Development Workflow](#development-workflow)
9. [Deployment Process](#deployment-process)

---

## What is Full Site Editing?

**Full Site Editing (FSE)** is a WordPress feature introduced in WordPress 5.9 that allows users to edit all parts of a website using the block editor (Gutenberg).

### Key Features

- **Block-based templates** - Replace PHP templates with HTML templates using blocks
- **Template parts** - Reusable sections (Header, Footer, Sidebar)
- **Global styles** - theme.json defines all design tokens
- **No PHP required** - Templates are pure HTML with block markup
- **Visual editing** - Edit entire pages in the block editor

### FSE vs Classic Themes

| Feature | Classic Theme | FSE Block Theme |
|---|---|---|
| Templates | PHP files | HTML files with blocks |
| Styling | CSS + PHP | theme.json + CSS |
| Customization | Customizer API | Site Editor |
| Header/Footer | PHP code | Template parts (HTML) |
| Layout | Hard-coded | Block-based |

---

## Block Theme Structure

### Required File Structure

```
nova-news-theme/
├── 📄 style.css                    # Theme header (required)
├── 📄 theme.json                   # Design tokens & settings (required)
├── 📄 functions.php                # Theme setup & block registration
├── 📄 README.md                    # Theme documentation
│
├── 📁 templates/                   # Page templates (HTML)
│   ├── 📄 index.html               # Fallback template (required)
│   ├── 📄 front-page.html          # Homepage template
│   ├── 📄 single.html              # Single post template
│   ├── 📄 page.html                # Single page template
│   ├── 📄 archive.html             # Archive template
│   ├── 📄 404.html                 # Not found template
│   ├── 📄 single-portfolio.html    # Portfolio single
│   ├── 📄 archive-portfolio.html   # Portfolio archive
│   └── 📄 page-ebook.html          # Ebook reader template
│
├── 📁 parts/                       # Template parts (HTML)
│   ├── 📄 header.html              # Site header
│   ├── 📄 footer.html              # Site footer
│   ├── 📄 sidebar.html             # Sidebar (optional)
│   └── 📄 mobile-menu.html         # Mobile menu
│
├── 📁 patterns/                    # Block patterns (PHP)
│   ├── 📄 hero-section.php         # Hero pattern
│   ├── 📄 portfolio-grid.php       # Portfolio grid pattern
│   ├── 📄 cta-section.php          # CTA pattern
│   └── 📄 blog-archive.php         # Blog archive pattern
│
├── 📁 assets/                      # Static assets
│   ├── 📁 css/                     # Compiled CSS
│   ├── 📁 js/                      # Compiled JS
│   ├── 📁 images/                  # Theme images
│   └── 📁 fonts/                   # Web fonts
│
└── 📁 inc/                         # PHP includes
    ├── 📄 block-registration.php   # Custom block setup
    ├── 📄 post-types.php           # CPT registration
    └── 📄 acf-fields.php           # ACF field groups
```

### Minimum Required Files

For a FSE block theme to work, you need:

1. **style.css** - Theme metadata
2. **theme.json** - Design system settings
3. **templates/index.html** - Fallback template

---

## Template Parts

Template parts are reusable sections that can be included in multiple templates. They live in the `/parts/` folder.

### Header Template Part

**File:** `/parts/header.html`

```html
<!-- wp:group {"tagName":"header","className":"site-header","layout":{"type":"constrained"}} -->
<header class="wp-block-group site-header">
  
  <!-- wp:group {"className":"header__inner","layout":{"type":"flex","justifyContent":"space-between"}} -->
  <div class="wp-block-group header__inner">
    
    <!-- wp:site-logo {"width":120,"className":"header__logo"} /-->
    
    <!-- wp:navigation {"ref":1,"className":"header__nav","layout":{"type":"flex","justifyContent":"center"}} /-->
    
    <!-- wp:custom/theme-switcher {"className":"header__theme-toggle"} /-->
    
  </div>
  <!-- /wp:group -->
  
</header>
<!-- /wp:group -->
```

**Key Points:**
- Uses core WordPress blocks (`group`, `site-logo`, `navigation`)
- Custom blocks prefixed with `custom/` namespace
- BEM class names match React components
- Layout uses Flexbox via `layout` attribute

### Footer Template Part

**File:** `/parts/footer.html`

```html
<!-- wp:group {"tagName":"footer","className":"site-footer","layout":{"type":"constrained"}} -->
<footer class="wp-block-group site-footer">
  
  <!-- wp:group {"className":"footer__inner","layout":{"type":"default"}} -->
  <div class="wp-block-group footer__inner">
    
    <!-- wp:columns {"className":"footer__columns"} -->
    <div class="wp-block-columns footer__columns">
      
      <!-- wp:column -->
      <div class="wp-block-column">
        <h3 class="footer__title">About Nova News</h3>
        <!-- wp:paragraph -->
        <p>A retro 80s neon CLI aesthetic book platform.</p>
        <!-- /wp:paragraph -->
      </div>
      <!-- /wp:column -->
      
      <!-- wp:column -->
      <div class="wp-block-column">
        <h3 class="footer__title">Quick links</h3>
        <!-- wp:navigation {"ref":2,"className":"footer__nav"} /-->
      </div>
      <!-- /wp:column -->
      
    </div>
    <!-- /wp:columns -->
    
    <!-- wp:separator {"className":"footer__divider"} /-->
    
    <!-- wp:group {"className":"footer__bottom","layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group footer__bottom">
      <!-- wp:paragraph {"className":"footer__copy"} -->
      <p class="footer__copy">© 2026 Ash Shaw. All rights reserved.</p>
      <!-- /wp:paragraph -->
      
      <!-- wp:social-links {"className":"footer__social"} -->
      <ul class="wp-block-social-links footer__social">
        <!-- wp:social-link {"url":"https://instagram.com","service":"instagram"} /-->
        <!-- wp:social-link {"url":"https://twitter.com","service":"twitter"} /-->
      </ul>
      <!-- /wp:social-links -->
    </div>
    <!-- /wp:group -->
    
  </div>
  <!-- /wp:group -->
  
</footer>
<!-- /wp:group -->
```

### Mobile Menu Template Part

**File:** `/parts/mobile-menu.html`

```html
<!-- wp:group {"className":"mobile-menu","layout":{"type":"default"}} -->
<div class="wp-block-group mobile-menu">
  
  <!-- wp:navigation {"ref":3,"className":"mobile-menu__nav","orientation":"vertical"} /-->
  
  <!-- wp:custom/theme-switcher {"className":"mobile-menu__theme-toggle"} /-->
  
</div>
<!-- /wp:group -->
```

---

## Template Hierarchy

WordPress FSE follows a template hierarchy. Templates are matched in this order:

### Page Templates

1. **Front Page** (`front-page.html`) - Homepage
2. **Single Page** (`page-{slug}.html`) - Specific page by slug
3. **Page Template** (`page.html`) - All pages fallback
4. **Index** (`index.html`) - Final fallback

### Post Templates

1. **Single Post** (`single-post.html`) - Blog posts
2. **Single** (`single.html`) - All single posts fallback
3. **Index** (`index.html`) - Final fallback

### Custom Post Type Templates

1. **Single CPT** (`single-{post-type}.html`) - e.g., `single-portfolio.html`
2. **Archive CPT** (`archive-{post-type}.html`) - e.g., `archive-portfolio.html`
3. **Archive** (`archive.html`) - All archives fallback
4. **Index** (`index.html`) - Final fallback

### Example: Homepage Template

**File:** `/templates/front-page.html`

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","className":"page-content","layout":{"type":"constrained"}} -->
<main class="wp-block-group page-content">
  
  <!-- wp:pattern {"slug":"nova-news/hero-section"} /-->
  
  <!-- wp:pattern {"slug":"nova-news/featured-posts"} /-->
  
  <!-- wp:pattern {"slug":"nova-news/portfolio-grid"} /-->
  
  <!-- wp:pattern {"slug":"nova-news/cta-section"} /-->
  
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

**Key Concepts:**
- `wp:template-part` - Include header/footer
- `wp:pattern` - Include reusable block patterns
- `layout` attribute - Define container constraints

### Example: Single Post Template

**File:** `/templates/single.html`

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","className":"page-content","layout":{"type":"constrained"}} -->
<main class="wp-block-group page-content">
  
  <!-- wp:post-title {"level":1,"className":"article__title"} /-->
  
  <!-- wp:post-featured-image {"className":"article__hero-image"} /-->
  
  <!-- wp:post-content {"className":"article__content"} /-->
  
  <!-- wp:post-terms {"term":"category","className":"article__categories"} /-->
  
  <!-- wp:post-terms {"term":"post_tag","className":"article__tags"} /-->
  
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

---

## theme.json Integration

The `theme.json` file defines all design tokens and settings for your block theme.

**See:** [/docs/theme.json](./theme.json) for complete structure

### Key Sections

#### 1. Settings

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "atomic-black",
          "color": "#0F0F0F",
          "name": "Atomic black"
        },
        {
          "slug": "neon-pink",
          "color": "#FF10F0",
          "name": "Neon pink"
        }
      ]
    },
    "typography": {
      "fontFamilies": [
        {
          "slug": "heading",
          "fontFamily": "\"Righteous\", sans-serif",
          "name": "Heading"
        }
      ]
    }
  }
}
```

**Auto-generated CSS variables:**
- `--wp--preset--color--atomic-black: #0F0F0F;`
- `--wp--preset--color--neon-pink: #FF10F0;`
- `--wp--preset--font-family--heading: "Righteous", sans-serif;`

#### 2. Styles

```json
{
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--atomic-black)",
      "text": "var(--wp--preset--color--text-light)"
    },
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--body)",
      "fontSize": "var(--wp--preset--font-size--base)"
    }
  }
}
```

### CSS Variable Mapping

Our existing CSS custom properties need to be aliased to WordPress format:

| Current Variable | WordPress Preset Variable |
|---|---|
| `--color-atomic-black` | `--wp--preset--color--atomic-black` |
| `--color-neon-pink` | `--wp--preset--color--neon-pink` |
| `--font-heading` | `--wp--preset--font-family--heading` |
| `--spacing-lg` | `--wp--preset--spacing--large` |

**Implementation:** Completed in Modern React Migration audit (Task 24 ✅)

---

## Custom Block Registration

Custom blocks bridge React components to WordPress blocks.

### Block Registration (functions.php)

```php
<?php
/**
 * Nova News Block Theme
 * 
 * Functions and definitions
 */

// Register custom blocks
function nova_news_register_blocks() {
  // Theme Switcher block
  register_block_type( __DIR__ . '/blocks/theme-switcher' );
  
  // Portfolio Card block
  register_block_type( __DIR__ . '/blocks/portfolio-card' );
  
  // Video Card block
  register_block_type( __DIR__ . '/blocks/video-card' );
  
  // Breadcrumbs block
  register_block_type( __DIR__ . '/blocks/breadcrumbs' );
}
add_action( 'init', 'nova_news_register_blocks' );

// Enqueue block assets
function nova_news_enqueue_block_assets() {
  wp_enqueue_style(
    'nova-news-blocks',
    get_template_directory_uri() . '/assets/css/blocks.css',
    array(),
    '1.0.0'
  );
  
  wp_enqueue_script(
    'nova-news-blocks',
    get_template_directory_uri() . '/assets/js/blocks.js',
    array( 'wp-blocks', 'wp-element', 'wp-block-editor' ),
    '1.0.0',
    true
  );
}
add_action( 'enqueue_block_assets', 'nova_news_enqueue_block_assets' );
```

### Example: Theme Switcher Block

**File:** `/blocks/theme-switcher/block.json`

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,
  "name": "custom/theme-switcher",
  "title": "Theme Switcher",
  "category": "widgets",
  "icon": "admin-appearance",
  "description": "Toggle between light and dark themes",
  "supports": {
    "html": false
  },
  "textdomain": "nova-news",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css"
}
```

**File:** `/blocks/theme-switcher/index.js`

```jsx
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('custom/theme-switcher', {
  edit: () => {
    const blockProps = useBlockProps({
      className: 'theme-switcher',
    });
    
    return (
      <div {...blockProps}>
        <button className="theme-switcher__btn">
          Toggle Theme
        </button>
      </div>
    );
  },
  
  save: () => {
    return (
      <div className="theme-switcher">
        <button className="theme-switcher__btn">
          Toggle Theme
        </button>
      </div>
    );
  },
});
```

**File:** `/blocks/theme-switcher/style.css`

```css
/* Import from centralized BEM CSS */
@import '../../styles/blocks/theme-switcher.css';
```

---

## Migration Strategy

### Phase 1: Setup WordPress Environment

1. Install WordPress 6.0+
2. Create empty block theme structure
3. Copy `theme.json` from `/docs/theme.json`
4. Create minimal `templates/index.html`
5. Activate theme and test

### Phase 2: Convert Templates

1. Map React pages to WordPress templates:
   - `HomePage.tsx` → `front-page.html`
   - `AboutPage.tsx` → `page-about.html`
   - `PortfolioPage.tsx` → `archive-portfolio.html`
   - `BlogPage.tsx` → `archive.html`
   
2. Convert React components to template parts:
   - `Header.tsx` → `parts/header.html`
   - `Footer.tsx` → `parts/footer.html`
   - `MobileMenu.tsx` → `parts/mobile-menu.html`

3. Create block patterns for sections:
   - `HeroLayout.tsx` → `patterns/hero-section.php`
   - `PortfolioGrid.tsx` → `patterns/portfolio-grid.php`
   - `BlogArchive.tsx` → `patterns/blog-archive.php`

### Phase 3: Register Custom Blocks

1. Identify components that need custom blocks:
   - ThemeSwitcher → `custom/theme-switcher`
   - Breadcrumbs → `custom/breadcrumbs`
   - PortfolioCard → `custom/portfolio-card`
   - VideoCard → `custom/video-card`
   - Lightbox → `custom/lightbox`

2. Build blocks using `@wordpress/create-block` CLI
3. Register blocks in `functions.php`
4. Enqueue block scripts and styles

### Phase 4: Migrate Data

1. Convert mock data to WordPress CPTs:
   - `/data/mock/portfolio/` → Portfolio CPT
   - `/data/mock/blog/` → Posts
   - `/data/mock/pages/` → Pages
   
2. Import data via WP-CLI or custom import script
3. Map ACF fields to React component props
4. Test data rendering in templates

### Phase 5: Copy CSS & Assets

1. Copy `/styles/globals.css` → `assets/css/globals.css`
2. Copy all `/styles/blocks/*.css` → `assets/css/blocks/`
3. Copy fonts, images, SVGs to `assets/`
4. Enqueue assets in `functions.php`

---

## Development Workflow

### Local Development

```bash
# 1. Clone WordPress locally
git clone https://github.com/WordPress/WordPress.git wp-local

# 2. Create theme folder
cd wp-local/wp-content/themes/
mkdir nova-news-theme

# 3. Link React project (or copy files)
ln -s /path/to/nova-news/styles ./nova-news-theme/assets/css

# 4. Start local WordPress server
cd ../../..
php -S localhost:8888

# 5. Build React blocks
npm run build:blocks
```

### Build Process

```json
{
  "scripts": {
    "build:blocks": "wp-scripts build blocks/**/index.js",
    "build:theme": "npm run build:blocks && npm run build:css",
    "build:css": "postcss styles/**/*.css -d assets/css",
    "watch": "wp-scripts start"
  }
}
```

---

## Deployment Process

### 1. Build Production Assets

```bash
npm run build:theme
```

### 2. Create Theme ZIP

```bash
zip -r nova-news-theme.zip nova-news-theme/ -x "*.git*" "node_modules/*"
```

### 3. Upload to WordPress

- Upload ZIP via WordPress Admin → Appearance → Themes
- Or deploy via FTP/SFTP to `/wp-content/themes/`

### 4. Activate Theme

- WordPress Admin → Appearance → Themes → Activate "Nova News"

### 5. Import Demo Content

```bash
wp import demo-content.xml --authors=create
```

---

## Best Practices

### 1. Use Block Patterns Over Custom Blocks

**Prefer:**
```php
// patterns/hero-section.php
<?php
/**
 * Title: Hero Section
 * Slug: nova-news/hero-section
 * Categories: featured
 */
?>
<!-- wp:group {"className":"hero"} -->
<div class="wp-block-group hero">
  <!-- Block markup -->
</div>
<!-- /wp:group -->
```

**Over:**
```jsx
// Unnecessary custom block
registerBlockType('custom/hero', { ... });
```

**Why?** Block patterns are easier to maintain and don't require JavaScript compilation.

### 2. Keep BEM Classes Consistent

WordPress blocks use `wp-block-{name}` classes. Map them to your BEM structure:

```html
<!-- wp:group {"className":"hero hero--dark"} -->
<div class="wp-block-group hero hero--dark">
  <!-- Your BEM classes work here -->
</div>
```

### 3. Use CSS Custom Properties for Dynamic Styles

```css
.hero {
  background-color: var(--wp--preset--color--atomic-black);
  color: var(--wp--preset--color--text-light);
}
```

### 4. Test in Site Editor

- Use WordPress Site Editor to preview templates
- Test responsive breakpoints
- Verify block controls work correctly

---

## Troubleshooting

### Issue: Blocks Not Appearing

**Solution:** Check block registration in `functions.php`:

```php
add_action( 'init', 'nova_news_register_blocks' );
```

### Issue: Styles Not Loading

**Solution:** Enqueue stylesheets correctly:

```php
wp_enqueue_style(
  'nova-news-blocks',
  get_template_directory_uri() . '/assets/css/blocks.css',
  array(),
  filemtime( get_template_directory() . '/assets/css/blocks.css' )
);
```

### Issue: Template Not Rendering

**Solution:** Clear template cache:

```bash
wp cache flush
```

---

## Resources

### Official Documentation

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Full Site Editing Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
- [theme.json Reference](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
- [Block Patterns](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)

### Tools

- [@wordpress/create-block](https://www.npmjs.com/package/@wordpress/create-block) - Block scaffolding CLI
- [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts) - Build tools
- [WP-CLI](https://wp-cli.org/) - WordPress command line

### Related Guides

- [WordPress Migration Plan](./wordpress-migration-plan.md)
- [WordPress Block Patterns](./wordpress-block-patterns.md)
- [WordPress Block Mapping](./wordpress-block-mapping.md)
- [ACF Integration Guide](./wordpress-acf-integration.md)

---

## Summary

This guide provides a complete roadmap for migrating the Nova News React application to a WordPress FSE block theme. Key takeaways:

1. **Block themes** use HTML templates instead of PHP
2. **Template parts** (header/footer) are reusable across templates
3. **theme.json** defines all design tokens
4. **Custom blocks** bridge React components to WordPress
5. **Block patterns** are preferred over custom blocks when possible
6. **BEM classes** remain consistent across both React and WordPress

**Next Steps:**
1. Read [WordPress Migration Plan](./wordpress-migration-plan.md)
2. Review [theme.json](./theme.json) structure
3. Create custom blocks for complex components
4. Test templates in WordPress Site Editor

---

**Last Updated:** March 12, 2026  
**Maintained By:** Development Team
