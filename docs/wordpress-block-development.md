---
title: "WordPress Block Development Guide"
filename: "/docs/wordpress-block-development.md"
created: "2026-03-12"
modified: "2026-03-12"
version: "1.0.0"
related_docs:
  - "/docs/wordpress-fse-guide.md"
  - "/docs/wordpress-block-patterns.md"
  - "/docs/wordpress-block-mapping.md"
  - "/docs/component-composition-guide.md"
---

# WordPress Block Development Guide

**Created:** March 12, 2026  
**Last Updated:** March 12, 2026  
**Status:** Active

---

## Overview

This guide demonstrates how to convert React components from the Nova News application into custom WordPress blocks. It covers block registration, development workflow, and best practices for maintaining consistency between the React app and WordPress theme.

**Key Concept:** WordPress blocks are React components that integrate with the Gutenberg editor. Our existing React components can be adapted with minimal changes.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Block Development Tools](#block-development-tools)
3. [Block Anatomy](#block-anatomy)
4. [Converting React Components to Blocks](#converting-react-components-to-blocks)
5. [Block Registration](#block-registration)
6. [Block Attributes & Props](#block-attributes--props)
7. [Block Controls & Inspector](#block-controls--inspector)
8. [Dynamic Blocks](#dynamic-blocks)
9. [Block Patterns](#block-patterns)
10. [Testing & Debugging](#testing--debugging)
11. [Build Process](#build-process)
12. [Best Practices](#best-practices)

---

## Prerequisites

### Required Knowledge

- React fundamentals (components, props, state)
- WordPress basics (posts, pages, templates)
- JavaScript ES6+ syntax
- CSS (preferably BEM methodology)

### Development Environment

```bash
# Node.js 18+ and npm
node --version  # v18.0.0 or higher
npm --version   # 8.0.0 or higher

# WordPress 6.0+ locally
# Recommended: Local by Flywheel, or MAMP/XAMPP
```

---

## Block Development Tools

### 1. @wordpress/create-block

The official WordPress CLI tool for scaffolding custom blocks.

**Installation:**

```bash
npm install -g @wordpress/create-block
```

**Create a New Block:**

```bash
# Navigate to your theme directory
cd wp-content/themes/nova-news-theme/

# Create a new block
npx @wordpress/create-block theme-switcher

# This creates:
# /blocks/theme-switcher/
#   ├── block.json          # Block metadata
#   ├── src/
#   │   ├── index.js        # Block registration
#   │   ├── edit.js         # Editor component
#   │   ├── save.js         # Frontend component
#   │   ├── editor.scss     # Editor styles
#   │   └── style.scss      # Frontend styles
#   └── package.json        # Dependencies
```

### 2. @wordpress/scripts

Build tools for compiling blocks (uses webpack under the hood).

**Package.json Scripts:**

```json
{
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "lint:js": "wp-scripts lint-js"
  }
}
```

**Commands:**

```bash
# Development mode (watch for changes)
npm start

# Production build
npm run build

# Lint JavaScript
npm run lint:js
```

### 3. WordPress Block Editor Components

```jsx
import { 
  InspectorControls,    // Sidebar controls
  InnerBlocks,          // Nested blocks
  RichText,             // Editable text
  MediaUpload,          // Media library
  useBlockProps,        // Block wrapper attributes
  ColorPalette,         // Color picker
  PanelColorSettings    // Color controls panel
} from '@wordpress/block-editor';

import { 
  PanelBody,            // Collapsible panel
  TextControl,          // Text input
  ToggleControl,        // Checkbox toggle
  SelectControl,        // Dropdown select
  RangeControl          // Slider input
} from '@wordpress/components';
```

---

## Block Anatomy

### block.json (Block Metadata)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,
  "name": "custom/theme-switcher",
  "title": "Theme Switcher",
  "category": "widgets",
  "icon": "admin-appearance",
  "description": "Toggle between light and dark themes",
  "keywords": ["theme", "dark mode", "toggle"],
  "version": "1.0.0",
  "textdomain": "nova-news",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css",
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": true
    },
    "spacing": {
      "margin": true,
      "padding": true
    }
  },
  "attributes": {
    "defaultTheme": {
      "type": "string",
      "default": "dark"
    },
    "showLabel": {
      "type": "boolean",
      "default": true
    }
  },
  "example": {
    "attributes": {
      "defaultTheme": "dark",
      "showLabel": true
    }
  }
}
```

### index.js (Block Registration)

```jsx
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save,
});
```

### edit.js (Editor Component)

```jsx
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { defaultTheme, showLabel } = attributes;
  const blockProps = useBlockProps({
    className: 'theme-switcher',
  });
  
  return (
    <>
      {/* Sidebar Controls */}
      <InspectorControls>
        <PanelBody title="Settings">
          <SelectControl
            label="Default Theme"
            value={defaultTheme}
            options={[
              { label: 'Dark', value: 'dark' },
              { label: 'Light', value: 'light' },
            ]}
            onChange={(value) => setAttributes({ defaultTheme: value })}
          />
          <ToggleControl
            label="Show Label"
            checked={showLabel}
            onChange={(value) => setAttributes({ showLabel: value })}
          />
        </PanelBody>
      </InspectorControls>
      
      {/* Block Content */}
      <div {...blockProps}>
        <button className="theme-switcher__btn">
          {showLabel && <span>Toggle Theme</span>}
          <span className="theme-switcher__icon">☀️/🌙</span>
        </button>
      </div>
    </>
  );
}
```

### save.js (Frontend Output)

```jsx
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { defaultTheme, showLabel } = attributes;
  const blockProps = useBlockProps.save({
    className: 'theme-switcher',
    'data-default-theme': defaultTheme,
  });
  
  return (
    <div {...blockProps}>
      <button className="theme-switcher__btn">
        {showLabel && <span>Toggle Theme</span>}
        <span className="theme-switcher__icon">☀️/🌙</span>
      </button>
    </div>
  );
}
```

---

## Converting React Components to Blocks

### Example 1: ThemeSwitcher Component

**Original React Component:**

```tsx
// /components/common/ThemeSwitcher.tsx
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  return (
    <button 
      className="theme-switcher__btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <span className="theme-switcher__icon">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}
```

**Converted WordPress Block:**

```jsx
// /blocks/theme-switcher/src/edit.js
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps({
    className: 'theme-switcher',
  });
  
  return (
    <div {...blockProps}>
      <button className="theme-switcher__btn" disabled>
        <span className="theme-switcher__icon">☀️/🌙</span>
        <span style={{ fontSize: '12px', marginLeft: '8px' }}>
          (Interactive in frontend)
        </span>
      </button>
    </div>
  );
}

// /blocks/theme-switcher/src/save.js
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({
    className: 'theme-switcher',
  });
  
  return (
    <div {...blockProps}>
      <button className="theme-switcher__btn">
        <span className="theme-switcher__icon"></span>
      </button>
    </div>
  );
}

// /blocks/theme-switcher/src/frontend.js
// This file runs on the actual website (not in the editor)
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.theme-switcher__btn');
  
  buttons.forEach(button => {
    const icon = button.querySelector('.theme-switcher__icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    // Toggle on click
    button.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  });
});
```

**Key Changes:**

1. **Separated editor and frontend logic** - Editor shows placeholder, frontend has interactivity
2. **Used vanilla JavaScript for frontend** - No React on the actual website (smaller bundle)
3. **Maintained BEM classes** - Same CSS works for both React and WordPress versions

---

### Example 2: Breadcrumbs Component

**Original React Component:**

```tsx
// /components/ui/Breadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs__item">
            {item.href ? (
              <a href={item.href} className="breadcrumbs__link">
                {item.label}
              </a>
            ) : (
              <span className="breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

**Converted WordPress Block (Dynamic PHP Rendering):**

```json
// /blocks/breadcrumbs/block.json
{
  "apiVersion": 2,
  "name": "custom/breadcrumbs",
  "title": "Breadcrumbs",
  "category": "widgets",
  "description": "Displays breadcrumb navigation",
  "supports": {
    "html": false
  },
  "attributes": {},
  "textdomain": "nova-news"
}
```

```jsx
// /blocks/breadcrumbs/src/edit.js
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps();
  
  // Preview in editor
  return (
    <nav {...blockProps} className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="#" className="breadcrumbs__link">Home</a>
        </li>
        <li className="breadcrumbs__item">
          <a href="#" className="breadcrumbs__link">Blog</a>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__current" aria-current="page">
            Current Page
          </span>
        </li>
      </ol>
    </nav>
  );
}
```

```jsx
// /blocks/breadcrumbs/src/index.js
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType('custom/breadcrumbs', {
  edit: Edit,
  // Dynamic block - rendered via PHP
  save: () => null,
});
```

```php
<?php
// /blocks/breadcrumbs/render.php
/**
 * Render callback for Breadcrumbs block
 */
function nova_news_render_breadcrumbs() {
  if (is_front_page()) {
    return ''; // No breadcrumbs on homepage
  }
  
  $items = array();
  
  // Home link
  $items[] = array(
    'label' => 'Home',
    'url' => home_url('/')
  );
  
  // Add parent pages if exists
  if (is_page() && $post->post_parent) {
    $ancestors = array_reverse(get_post_ancestors($post->ID));
    foreach ($ancestors as $ancestor) {
      $items[] = array(
        'label' => get_the_title($ancestor),
        'url' => get_permalink($ancestor)
      );
    }
  }
  
  // Add category for single posts
  if (is_single() && !is_singular('page')) {
    $category = get_the_category();
    if ($category) {
      $items[] = array(
        'label' => $category[0]->name,
        'url' => get_category_link($category[0]->term_id)
      );
    }
  }
  
  // Current page
  $items[] = array(
    'label' => get_the_title(),
    'url' => null
  );
  
  // Render
  ob_start();
  ?>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs__list">
      <?php foreach ($items as $item): ?>
        <li class="breadcrumbs__item">
          <?php if ($item['url']): ?>
            <a href="<?php echo esc_url($item['url']); ?>" class="breadcrumbs__link">
              <?php echo esc_html($item['label']); ?>
            </a>
          <?php else: ?>
            <span class="breadcrumbs__current" aria-current="page">
              <?php echo esc_html($item['label']); ?>
            </span>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ol>
  </nav>
  <?php
  return ob_get_clean();
}

// Register dynamic block
register_block_type(__DIR__ . '/build', array(
  'render_callback' => 'nova_news_render_breadcrumbs'
));
```

**Key Concept:** Dynamic blocks use PHP to render content based on WordPress context (current page, post, etc.)

---

### Example 3: Portfolio Card Component

**Original React Component:**

```tsx
// /components/ui/PortfolioCard.tsx
interface PortfolioCardProps {
  title: string;
  image: string;
  category: string;
  url: string;
}

export function PortfolioCard({ title, image, category, url }: PortfolioCardProps) {
  return (
    <article className="portfolio-card">
      <a href={url} className="portfolio-card__link">
        <div className="portfolio-card__image-wrapper">
          <img 
            src={image} 
            alt={title}
            className="portfolio-card__image"
          />
        </div>
        <div className="portfolio-card__content">
          <span className="portfolio-card__category">{category}</span>
          <h3 className="portfolio-card__title">{title}</h3>
        </div>
      </a>
    </article>
  );
}
```

**Converted WordPress Block:**

```json
// /blocks/portfolio-card/block.json
{
  "apiVersion": 2,
  "name": "custom/portfolio-card",
  "title": "Portfolio Card",
  "category": "design",
  "description": "Display a portfolio item card",
  "attributes": {
    "title": {
      "type": "string",
      "default": "Portfolio Item"
    },
    "imageUrl": {
      "type": "string",
      "default": ""
    },
    "imageId": {
      "type": "number"
    },
    "category": {
      "type": "string",
      "default": "Uncategorized"
    },
    "url": {
      "type": "string",
      "default": "#"
    }
  },
  "supports": {
    "html": false
  }
}
```

```jsx
// /blocks/portfolio-card/src/edit.js
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { title, imageUrl, imageId, category, url } = attributes;
  const blockProps = useBlockProps({
    className: 'portfolio-card',
  });
  
  return (
    <>
      <InspectorControls>
        <PanelBody title="Card Settings">
          <TextControl
            label="Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <TextControl
            label="Category"
            value={category}
            onChange={(value) => setAttributes({ category: value })}
          />
          <TextControl
            label="URL"
            value={url}
            onChange={(value) => setAttributes({ url: value })}
          />
          
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => {
                setAttributes({
                  imageUrl: media.url,
                  imageId: media.id,
                });
              }}
              allowedTypes={['image']}
              value={imageId}
              render={({ open }) => (
                <Button onClick={open} variant="secondary">
                  {imageUrl ? 'Change Image' : 'Select Image'}
                </Button>
              )}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>
      
      <article {...blockProps}>
        <div className="portfolio-card__image-wrapper">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="portfolio-card__image"
            />
          ) : (
            <div className="portfolio-card__placeholder">
              No image selected
            </div>
          )}
        </div>
        <div className="portfolio-card__content">
          <span className="portfolio-card__category">{category}</span>
          <h3 className="portfolio-card__title">{title}</h3>
        </div>
      </article>
    </>
  );
}
```

```jsx
// /blocks/portfolio-card/src/save.js
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title, imageUrl, category, url } = attributes;
  const blockProps = useBlockProps.save({
    className: 'portfolio-card',
  });
  
  return (
    <article {...blockProps}>
      <a href={url} className="portfolio-card__link">
        <div className="portfolio-card__image-wrapper">
          <img 
            src={imageUrl} 
            alt={title}
            className="portfolio-card__image"
          />
        </div>
        <div className="portfolio-card__content">
          <span className="portfolio-card__category">{category}</span>
          <h3 className="portfolio-card__title">{title}</h3>
        </div>
      </a>
    </article>
  );
}
```

---

## Block Registration

### Method 1: functions.php (Centralized)

```php
<?php
// /functions.php

function nova_news_register_blocks() {
  // Auto-register all blocks in /blocks directory
  $blocks = array(
    'theme-switcher',
    'breadcrumbs',
    'portfolio-card',
    'video-card',
  );
  
  foreach ($blocks as $block) {
    register_block_type(__DIR__ . '/blocks/' . $block . '/build');
  }
}
add_action('init', 'nova_news_register_blocks');
```

### Method 2: plugin.php (Plugin Approach)

```php
<?php
/**
 * Plugin Name: Nova News Blocks
 * Description: Custom blocks for Nova News theme
 * Version: 1.0.0
 */

function nova_news_blocks_register() {
  register_block_type(__DIR__ . '/blocks/theme-switcher/build');
  register_block_type(__DIR__ . '/blocks/breadcrumbs/build');
  register_block_type(__DIR__ . '/blocks/portfolio-card/build');
}
add_action('init', 'nova_news_blocks_register');
```

---

## Block Attributes & Props

Attributes define editable properties for your block.

### Attribute Types

```json
{
  "attributes": {
    "textAttribute": {
      "type": "string",
      "default": "Default text"
    },
    "numberAttribute": {
      "type": "number",
      "default": 42
    },
    "booleanAttribute": {
      "type": "boolean",
      "default": true
    },
    "arrayAttribute": {
      "type": "array",
      "default": ["item1", "item2"]
    },
    "objectAttribute": {
      "type": "object",
      "default": { "key": "value" }
    }
  }
}
```

### Using Attributes in Components

```jsx
export default function Edit({ attributes, setAttributes }) {
  const { title, showSubtitle, columns } = attributes;
  
  // Update single attribute
  setAttributes({ title: 'New Title' });
  
  // Update multiple attributes
  setAttributes({
    title: 'New Title',
    showSubtitle: false,
  });
  
  return (
    <div>
      <h2>{title}</h2>
      {showSubtitle && <p>Subtitle</p>}
      <div style={{ columns }}>Content</div>
    </div>
  );
}
```

---

## Block Controls & Inspector

### InspectorControls (Sidebar)

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  return (
    <>
      <InspectorControls>
        <PanelBody title="Text Settings">
          <TextControl
            label="Heading"
            value={attributes.heading}
            onChange={(value) => setAttributes({ heading: value })}
          />
        </PanelBody>
        
        <PanelBody title="Display Settings" initialOpen={false}>
          <ToggleControl
            label="Show Featured Badge"
            checked={attributes.showBadge}
            onChange={(value) => setAttributes({ showBadge: value })}
          />
          
          <SelectControl
            label="Layout"
            value={attributes.layout}
            options={[
              { label: 'Grid', value: 'grid' },
              { label: 'List', value: 'list' },
            ]}
            onChange={(value) => setAttributes({ layout: value })}
          />
          
          <RangeControl
            label="Columns"
            value={attributes.columns}
            onChange={(value) => setAttributes({ columns: value })}
            min={1}
            max={4}
          />
        </PanelBody>
      </InspectorControls>
      
      {/* Block content */}
    </>
  );
}
```

### BlockControls (Toolbar)

```jsx
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="align-left"
            label="Align Left"
            isActive={attributes.alignment === 'left'}
            onClick={() => setAttributes({ alignment: 'left' })}
          />
          <ToolbarButton
            icon="align-center"
            label="Align Center"
            isActive={attributes.alignment === 'center'}
            onClick={() => setAttributes({ alignment: 'center' })}
          />
        </ToolbarGroup>
      </BlockControls>
      
      {/* Block content */}
    </>
  );
}
```

---

## Dynamic Blocks

Dynamic blocks render via PHP on the server (like breadcrumbs example above).

### When to Use Dynamic Blocks

- Content depends on WordPress context (current post, user, etc.)
- Data fetched from database
- SEO-critical content that must be server-rendered
- Real-time data (recent posts, user count, etc.)

### Example: Recent Posts Block

```jsx
// /blocks/recent-posts/src/edit.js
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
  const { postsToShow } = attributes;
  
  // Fetch posts in editor
  const posts = useSelect((select) => {
    return select('core').getEntityRecords('postType', 'post', {
      per_page: postsToShow,
      _embed: true,
    });
  }, [postsToShow]);
  
  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings">
          <RangeControl
            label="Number of Posts"
            value={postsToShow}
            onChange={(value) => setAttributes({ postsToShow: value })}
            min={1}
            max={10}
          />
        </PanelBody>
      </InspectorControls>
      
      <div {...useBlockProps()}>
        <h3>Recent Posts ({postsToShow})</h3>
        {!posts ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title.rendered}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
```

```jsx
// /blocks/recent-posts/src/index.js
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';

registerBlockType('custom/recent-posts', {
  edit: Edit,
  save: () => null, // Dynamic block
});
```

```php
<?php
// /blocks/recent-posts/render.php
function nova_news_render_recent_posts($attributes) {
  $posts_to_show = isset($attributes['postsToShow']) ? $attributes['postsToShow'] : 5;
  
  $recent_posts = wp_get_recent_posts(array(
    'numberposts' => $posts_to_show,
    'post_status' => 'publish',
  ));
  
  if (empty($recent_posts)) {
    return '<p>No posts found</p>';
  }
  
  ob_start();
  ?>
  <div class="recent-posts">
    <h3>Recent Posts</h3>
    <ul class="recent-posts__list">
      <?php foreach ($recent_posts as $post): ?>
        <li class="recent-posts__item">
          <a href="<?php echo get_permalink($post['ID']); ?>">
            <?php echo esc_html($post['post_title']); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
  <?php
  return ob_get_clean();
}

register_block_type(__DIR__ . '/build', array(
  'render_callback' => 'nova_news_render_recent_posts',
));
```

---

## Block Patterns

Block patterns are pre-configured collections of blocks.

### Creating a Pattern

```php
<?php
// /patterns/hero-section.php

/**
 * Title: Hero Section
 * Slug: nova-news/hero-section
 * Categories: featured
 * Description: Large hero section with title, subtitle, and CTA
 */
?>

<!-- wp:group {"className":"hero hero--dark","layout":{"type":"constrained"}} -->
<div class="wp-block-group hero hero--dark">
  
  <!-- wp:heading {"level":1,"className":"hero__title text-gradient-cyberpunk"} -->
  <h1 class="hero__title text-gradient-cyberpunk">Welcome to Nova News</h1>
  <!-- /wp:heading -->
  
  <!-- wp:paragraph {"className":"hero__subtitle"} -->
  <p class="hero__subtitle">A retro 80s neon CLI aesthetic book platform</p>
  <!-- /wp:paragraph -->
  
  <!-- wp:buttons {"className":"hero__cta-group"} -->
  <div class="wp-block-buttons hero__cta-group">
    <!-- wp:button {"className":"btn btn--primary"} -->
    <div class="wp-block-button"><a class="wp-block-button__link btn btn--primary">Read the draft</a></div>
    <!-- /wp:button -->
  </div>
  <!-- /wp:buttons -->
  
</div>
<!-- /wp:group -->
```

### Registering Patterns

```php
<?php
// /functions.php

function nova_news_register_block_patterns() {
  register_block_pattern_category('nova-news', array(
    'label' => __('Nova News', 'nova-news'),
  ));
  
  register_block_pattern(
    'nova-news/hero-section',
    array(
      'title' => __('Hero Section', 'nova-news'),
      'description' => __('Large hero section with title and CTA', 'nova-news'),
      'categories' => array('nova-news', 'featured'),
      'content' => file_get_contents(__DIR__ . '/patterns/hero-section.php'),
    )
  );
}
add_action('init', 'nova_news_register_block_patterns');
```

---

## Testing & Debugging

### 1. React DevTools

Install the React Developer Tools browser extension to inspect block components.

### 2. Console Logging

```jsx
export default function Edit({ attributes }) {
  console.log('Block attributes:', attributes);
  
  return <div>Block content</div>;
}
```

### 3. WP_DEBUG

Enable WordPress debugging in `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check errors in `/wp-content/debug.log`.

---

## Build Process

### Development Workflow

```bash
# 1. Navigate to theme directory
cd wp-content/themes/nova-news-theme/

# 2. Install dependencies
npm install

# 3. Start development server (watches for changes)
npm start

# 4. Make changes to blocks in /blocks/**/src/
# Files automatically recompile on save

# 5. Refresh WordPress editor to see changes
```

### Production Build

```bash
# Build all blocks for production
npm run build

# Output: /blocks/**/build/
# - index.js (minified)
# - index.css (compiled CSS)
# - block.json (copied)
```

### Custom Build Script

```json
{
  "scripts": {
    "build": "wp-scripts build blocks/**/src/index.js --output-path=blocks",
    "start": "wp-scripts start blocks/**/src/index.js --output-path=blocks",
    "build:theme": "npm run build && npm run build:css",
    "build:css": "postcss styles/**/*.css -d assets/css"
  }
}
```

---

## Best Practices

### 1. Use BEM Class Names

Maintain consistency with your React components:

```jsx
// ✅ GOOD
<div className="portfolio-card">
  <h3 className="portfolio-card__title">Title</h3>
</div>

// ❌ BAD
<div className="card">
  <h3 className="title">Title</h3>
</div>
```

### 2. Share CSS Between React and WordPress

```css
/* /styles/blocks/portfolio-card.css */
/* This file is used by BOTH React and WordPress */

.portfolio-card {
  background: var(--color-atomic-black);
  border: 2px solid var(--color-neon-pink);
  padding: var(--spacing-md);
}

.portfolio-card__title {
  font-size: var(--font-size-lg);
  color: var(--color-neon-pink);
}
```

Import in both contexts:

```jsx
// React: /components/ui/PortfolioCard.tsx
import '../../styles/blocks/portfolio-card.css';

// WordPress: /blocks/portfolio-card/src/style.scss
@import '../../../styles/blocks/portfolio-card.css';
```

### 3. Use useBlockProps Consistently

```jsx
// ✅ GOOD
export default function Edit() {
  const blockProps = useBlockProps({
    className: 'my-block',
  });
  
  return <div {...blockProps}>Content</div>;
}

// ❌ BAD
export default function Edit() {
  return <div className="my-block">Content</div>;
}
```

### 4. Provide Block Examples

```json
{
  "example": {
    "attributes": {
      "title": "Example Title",
      "showSubtitle": true
    }
  }
}
```

This creates a preview in the block inserter.

### 5. Test Keyboard Accessibility

```jsx
<button
  className="theme-switcher__btn"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  aria-label="Toggle theme"
>
  Toggle
</button>
```

---

## Summary

This guide covered:

1. ✅ Block development tools (`@wordpress/create-block`, `@wordpress/scripts`)
2. ✅ Block anatomy (`block.json`, `edit.js`, `save.js`)
3. ✅ Converting React components to WordPress blocks
4. ✅ Block registration in `functions.php`
5. ✅ Attributes and props
6. ✅ InspectorControls and BlockControls
7. ✅ Dynamic blocks with PHP rendering
8. ✅ Block patterns
9. ✅ Testing and debugging
10. ✅ Build process and best practices

**Next Steps:**

1. Convert 1-2 simple React components to blocks (start with ThemeSwitcher)
2. Test in WordPress Site Editor
3. Gradually migrate all custom components
4. Create block patterns for common layouts

**Related Guides:**

- [WordPress FSE Guide](./wordpress-fse-guide.md)
- [WordPress Block Patterns](./wordpress-block-patterns.md)
- [Component Composition Guide](./component-composition-guide.md)

---

**Last Updated:** March 12, 2026  
**Maintained By:** Development Team
