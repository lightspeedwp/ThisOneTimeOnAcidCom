---
title: "WordPress ACF Integration Guide"
filename: "/docs/wordpress-acf-integration.md"
created: "2026-03-12"
modified: "2026-03-12"
version: "1.0.0"
related_docs:

- "/docs/wordpress-fse-guide.md"
- "/docs/wordpress-block-development.md"
- "/docs/wordpress-migration-plan.md"
- "/docs/cms-field-mapping.md"
---

# WordPress ACF Integration Guide

**Created:** March 12, 2026
**Last Updated:** March 12, 2026
**Status:** Active

---

## Overview

This guide documents how to integrate Advanced Custom Fields (ACF) with the Nova
News WordPress theme. It covers custom post types (CPTs), field groups, and
template integration for portfolio entries, blog posts, videos, and podcasts.

**Prerequisites:**

- WordPress 6.0+
- Advanced Custom Fields Pro plugin
- Understanding of WordPress custom post types
- Familiarity with Nova News data structure

---

## Table of Contents

1. [What is ACF?](#what-is-acf)

1. [Custom Post Types](#custom-post-types)

1. [Field Groups](#field-groups)

1. [Template Integration](#template-integration)

1. [REST API Integration](#rest-api-integration)

1. [Migration from Mock Data](#migration-from-mock-data)

1. [Best Practices](#best-practices)

---

## What is ACF

**Advanced Custom Fields (ACF)** is a WordPress plugin that allows you to add
custom fields to posts, pages, and custom post types.

### Why Use ACF

- **Visual Field Builder** - No code required for basic field creation
- **30+ Field Types** - Text, WYSIWYG, Image, Gallery, Relationship, etc.
- **Flexible Content** - Create repeatable layouts
- **REST API Support** - Expose fields to headless applications
- **Location Rules** - Show fields only where needed

### ACF Pro vs Free

| Feature | ACF Free | ACF Pro |
|---|---|---|
| Basic Fields | ✅ | ✅ |
| Repeater Fields | ❌ | ✅ |
| Flexible Content | ❌ | ✅ |
| Gallery Field | ❌ | ✅ |
| Clone Field | ❌ | ✅ |
| ACF Blocks | ❌ | ✅ |
| Options Pages | ❌ | ✅ |

**Recommendation:** Use ACF Pro for Nova News (requires Repeater and Gallery
fields).

---

## Custom Post Types

### 1. Portfolio CPT

Register a custom post type for portfolio entries.

**File:** `/inc/post-types.php`

```php
<?php
/**

 * Register Portfolio Custom Post Type
 */
function nova*news*register*portfolio*cpt() {
  $labels = array(
    'name'                  => 'Portfolio',
    'singular_name'         => 'Portfolio Entry',
    'menu_name'             => 'Portfolio',
    'add_new'               => 'Add New',
    'add*new*item'          => 'Add New Portfolio Entry',
    'edit_item'             => 'Edit Portfolio Entry',
    'new_item'              => 'New Portfolio Entry',
    'view_item'             => 'View Portfolio Entry',
    'search_items'          => 'Search Portfolio',
    'not_found'             => 'No portfolio entries found',
    'not*found*in_trash'    => 'No portfolio entries found in Trash',
  );

  $args = array(
    'labels'                => $labels,
    'public'                => true,
    'has_archive'           => true,
    'rewrite'               => array('slug' => 'portfolio'),
    'menu_icon'             => 'dashicons-images-alt2',
    'supports'              => array('title', 'editor', 'thumbnail', 'excerpt'),
    'show*in*rest'          => true, // Enable Gutenberg + REST API
    'taxonomies'            => array('portfolio_category'),
  );

  register*post*type('portfolio', $args);
}
add*action('init', 'nova*news*register*portfolio_cpt');

/**

 * Register Portfolio Category Taxonomy
 */
function nova*news*register*portfolio*taxonomy() {
  $labels = array(
    'name'              => 'Portfolio Categories',
    'singular_name'     => 'Portfolio Category',
    'search_items'      => 'Search Categories',
    'all_items'         => 'All Categories',
    'edit_item'         => 'Edit Category',
    'update_item'       => 'Update Category',
    'add*new*item'      => 'Add New Category',
    'new*item*name'     => 'New Category Name',
    'menu_name'         => 'Categories',
  );

  $args = array(
    'hierarchical'      => true,
    'labels'            => $labels,
    'show_ui'           => true,
    'show*in*rest'      => true,
    'rewrite'           => array('slug' => 'portfolio-category'),
  );

  register*taxonomy('portfolio*category', array('portfolio'), $args);
}
add*action('init', 'nova*news*register*portfolio_taxonomy');

```text

### 2. Video CPT

```php
/**

 * Register Video Custom Post Type
 */
function nova*news*register*video*cpt() {
  $labels = array(
    'name'                  => 'Videos',
    'singular_name'         => 'Video',
    'menu_name'             => 'Videos',
    'add*new*item'          => 'Add New Video',
  );

  $args = array(
    'labels'                => $labels,
    'public'                => true,
    'has_archive'           => true,
    'rewrite'               => array('slug' => 'videos'),
    'menu_icon'             => 'dashicons-video-alt3',
    'supports'              => array('title', 'editor', 'thumbnail'),
    'show*in*rest'          => true,
    'taxonomies'            => array('video*category', 'video*tag'),
  );

  register*post*type('video', $args);
}
add*action('init', 'nova*news*register*video_cpt');

```text

### 3. Podcast CPT

```php
/**

 * Register Podcast Custom Post Type
 */
function nova*news*register*podcast*cpt() {
  $labels = array(
    'name'                  => 'Podcasts',
    'singular_name'         => 'Podcast Episode',
    'menu_name'             => 'Podcasts',
    'add*new*item'          => 'Add New Episode',
  );

  $args = array(
    'labels'                => $labels,
    'public'                => true,
    'has_archive'           => true,
    'rewrite'               => array('slug' => 'podcasts'),
    'menu_icon'             => 'dashicons-microphone',
    'supports'              => array('title', 'editor', 'thumbnail'),
    'show*in*rest'          => true,
    'taxonomies'            => array('podcast_series'),
  );

  register*post*type('podcast', $args);
}
add*action('init', 'nova*news*register*podcast_cpt');

```text

---

## Field Groups

### 1. Portfolio Entry Fields

**Mapping:** See [CMS Field Mapping](../docs/cms-field-mapping.md) for complete
reference.

## ACF Field Group Setup

```php
<?php
/**

 * ACF Field Group: Portfolio Entry
 *
 * File: /inc/acf-fields.php
 * Register via PHP (recommended for version control)
 */

if (function*exists('acf*add*local*field_group')) {
  acf*add*local*field*group(array(
    'key' => 'group*portfolio*entry',
    'title' => 'Portfolio Entry Details',
    'fields' => array(

      // Featured Flag
      array(
        'key' => 'field*portfolio*featured',
        'label' => 'Featured',
        'name' => 'featured',
        'type' => 'true_false',
        'default_value' => 0,
        'ui' => 1,
      ),

      // Main Image
      array(
        'key' => 'field*portfolio*image',
        'label' => 'Main Image',
        'name' => 'main_image',
        'type' => 'image',
        'required' => 1,
        'return_format' => 'array',
        'preview_size' => 'medium',
      ),

      // Image Gallery
      array(
        'key' => 'field*portfolio*gallery',
        'label' => 'Image Gallery',
        'name' => 'image_gallery',
        'type' => 'gallery',
        'return_format' => 'array',
        'min' => 3,
        'max' => 20,
      ),

      // Location
      array(
        'key' => 'field*portfolio*location',
        'label' => 'Location',
        'name' => 'location',
        'type' => 'text',
        'placeholder' => 'e.g., Cape Town, Berlin',
      ),

      // Event Name
      array(
        'key' => 'field*portfolio*event',
        'label' => 'Event Name',
        'name' => 'event_name',
        'type' => 'text',
        'placeholder' => 'e.g., Origin Festival 2025',
      ),

      // Client/Subject
      array(
        'key' => 'field*portfolio*client',
        'label' => 'Client/Subject',
        'name' => 'client',
        'type' => 'text',
      ),

      // Date
      array(
        'key' => 'field*portfolio*date',
        'label' => 'Shoot Date',
        'name' => 'shoot_date',
        'type' => 'date_picker',
        'display_format' => 'F j, Y',
        'return_format' => 'Y-m-d',
      ),

      // Techniques/Products
      array(
        'key' => 'field*portfolio*techniques',
        'label' => 'Techniques/Products',
        'name' => 'techniques',
        'type' => 'textarea',
        'rows' => 4,
        'placeholder' => 'e.g., UV reactive paint, glitter',
      ),

      // Social Proof
      array(
        'key' => 'field*portfolio*social_proof',
        'label' => 'Social Proof',
        'name' => 'social_proof',
        'type' => 'group',
        'sub_fields' => array(
          array(
            'key' => 'field*social*likes',
            'label' => 'Likes',
            'name' => 'likes',
            'type' => 'number',
            'default_value' => 0,
          ),
          array(
            'key' => 'field*social*comments',
            'label' => 'Comments',
            'name' => 'comments',
            'type' => 'number',
            'default_value' => 0,
          ),
          array(
            'key' => 'field*social*shares',
            'label' => 'Shares',
            'name' => 'shares',
            'type' => 'number',
            'default_value' => 0,
          ),
        ),
      ),

      // Related Links
      array(
        'key' => 'field*portfolio*links',
        'label' => 'Related Links',
        'name' => 'related_links',
        'type' => 'repeater',
        'layout' => 'table',
        'button_label' => 'Add Link',
        'sub_fields' => array(
          array(
            'key' => 'field*link*text',
            'label' => 'Link Text',
            'name' => 'text',
            'type' => 'text',
          ),
          array(
            'key' => 'field*link*url',
            'label' => 'URL',
            'name' => 'url',
            'type' => 'url',
          ),
        ),
      ),

    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'portfolio',
        ),
      ),
    ),
  ));
}

```text

### 2. Video Entry Fields

```php
acf*add*local*field*group(array(
  'key' => 'group*video*entry',
  'title' => 'Video Details',
  'fields' => array(

    // YouTube/Vimeo URL
    array(
      'key' => 'field*video*url',
      'label' => 'Video URL',
      'name' => 'video_url',
      'type' => 'url',
      'required' => 1,
      'placeholder' => 'https://www.youtube.com/watch?v=...',
    ),

    // Video Type (YouTube/Vimeo/Self-hosted)
    array(
      'key' => 'field*video*type',
      'label' => 'Video Type',
      'name' => 'video_type',
      'type' => 'select',
      'choices' => array(
        'youtube' => 'YouTube',
        'vimeo' => 'Vimeo',
        'self' => 'Self-hosted',
      ),
      'default_value' => 'youtube',
    ),

    // Duration (mm:ss)
    array(
      'key' => 'field*video*duration',
      'label' => 'Duration',
      'name' => 'duration',
      'type' => 'text',
      'placeholder' => 'e.g., 5:32',
    ),

    // View Count
    array(
      'key' => 'field*video*views',
      'label' => 'View Count',
      'name' => 'view_count',
      'type' => 'number',
      'default_value' => 0,
    ),

    // Featured
    array(
      'key' => 'field*video*featured',
      'label' => 'Featured Video',
      'name' => 'featured',
      'type' => 'true_false',
    ),

  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'video',
      ),
    ),
  ),
));

```text

### 3. Podcast Episode Fields

```php
acf*add*local*field*group(array(
  'key' => 'group*podcast*episode',
  'title' => 'Podcast Episode Details',
  'fields' => array(

    // Episode Number
    array(
      'key' => 'field*podcast*episode_number',
      'label' => 'Episode Number',
      'name' => 'episode_number',
      'type' => 'number',
      'required' => 1,
    ),

    // Audio File
    array(
      'key' => 'field*podcast*audio',
      'label' => 'Audio File',
      'name' => 'audio_file',
      'type' => 'file',
      'return_format' => 'array',
      'mime_types' => 'mp3,m4a',
    ),

    // Duration
    array(
      'key' => 'field*podcast*duration',
      'label' => 'Duration',
      'name' => 'duration',
      'type' => 'text',
      'placeholder' => 'e.g., 45:30',
    ),

    // Publish Date
    array(
      'key' => 'field*podcast*date',
      'label' => 'Publish Date',
      'name' => 'publish_date',
      'type' => 'date_picker',
      'display_format' => 'F j, Y',
      'return_format' => 'Y-m-d',
    ),

    // Guests (Repeater)
    array(
      'key' => 'field*podcast*guests',
      'label' => 'Guests',
      'name' => 'guests',
      'type' => 'repeater',
      'layout' => 'table',
      'button_label' => 'Add Guest',
      'sub_fields' => array(
        array(
          'key' => 'field*guest*name',
          'label' => 'Name',
          'name' => 'name',
          'type' => 'text',
        ),
        array(
          'key' => 'field*guest*bio',
          'label' => 'Bio',
          'name' => 'bio',
          'type' => 'textarea',
          'rows' => 2,
        ),
      ),
    ),

    // Show Notes
    array(
      'key' => 'field*podcast*notes',
      'label' => 'Show Notes',
      'name' => 'show_notes',
      'type' => 'wysiwyg',
      'tabs' => 'all',
      'toolbar' => 'full',
    ),

  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'podcast',
      ),
    ),
  ),
));

```text

### 4. Blog Post Extensions

Extend default WordPress posts with additional fields.

```php
acf*add*local*field*group(array(
  'key' => 'group*blog*post',
  'title' => 'Blog Post Extensions',
  'fields' => array(

    // Reading Time
    array(
      'key' => 'field*blog*reading_time',
      'label' => 'Reading Time',
      'name' => 'reading_time',
      'type' => 'text',
      'placeholder' => 'e.g., 5 min read',
      'instructions' => 'Auto-calculated on save (optional override)',
    ),

    // Featured
    array(
      'key' => 'field*blog*featured',
      'label' => 'Featured Post',
      'name' => 'featured',
      'type' => 'true_false',
    ),

    // Custom Excerpt
    array(
      'key' => 'field*blog*custom_excerpt',
      'label' => 'Custom Excerpt',
      'name' => 'custom_excerpt',
      'type' => 'textarea',
      'rows' => 3,
      'instructions' => 'Leave blank to use default excerpt',
    ),

    // Social Share Image
    array(
      'key' => 'field*blog*og_image',
      'label' => 'Social Share Image',
      'name' => 'og_image',
      'type' => 'image',
      'return_format' => 'array',
      'instructions' => 'Recommended: 1200x630px',
    ),

  ),
  'location' => array(
    array(
      array(
        'param' => 'post_type',
        'operator' => '==',
        'value' => 'post',
      ),
    ),
  ),
));

```text

---

## Template Integration

### Displaying ACF Fields in Templates

#### Method 1: The Loop (Single Template)

```php
<?php
// /templates/single-portfolio.html
// Note: This is FSE HTML, but shows where PHP would go

get_header();

while (have*posts()) : the*post();

  // Get ACF fields
  $featured = get_field('featured');
  $main*image = get*field('main_image');
  $gallery = get*field('image*gallery');
  $location = get_field('location');
  $event*name = get*field('event_name');
  $techniques = get_field('techniques');
  $social*proof = get*field('social_proof');

  ?>
  <article class="portfolio-entry">

    <!-- Hero Image -->
    <?php if ($main_image): ?>
      <div class="portfolio-entry__hero">
        <img
          src="<?php echo esc*url($main*image['sizes']['large']); ?>"
          alt="<?php echo esc*attr($main*image['alt']); ?>"
          class="portfolio-entry__hero-image"
        />
      </div>
    <?php endif; ?>

    <!-- Title -->
    <h1 class="portfolio-entry__title">
      <?php the_title(); ?>
    </h1>

    <!-- Meta Info -->
    <div class="portfolio-entry__meta">
      <?php if ($location): ?>
        <span class="meta__location">
          <svg><!-- Location icon --></svg>
          <?php echo esc_html($location); ?>
        </span>
      <?php endif; ?>

      <?php if ($event_name): ?>
        <span class="meta__event">
          <?php echo esc*html($event*name); ?>
        </span>
      <?php endif; ?>
    </div>

    <!-- Content -->
    <div class="portfolio-entry__content">
      <?php the_content(); ?>
    </div>

    <!-- Gallery -->
    <?php if ($gallery): ?>
      <div class="portfolio-entry__gallery">
        <?php foreach ($gallery as $image): ?>
          <img
            src="<?php echo esc_url($image['sizes']['medium']); ?>"
            alt="<?php echo esc_attr($image['alt']); ?>"
            class="gallery__image"
          />
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <!-- Social Proof -->
    <?php if ($social_proof): ?>
      <div class="portfolio-entry__social-proof">
        <span class="social-stat">
          <svg><!-- Heart icon --></svg>
          <?php echo number*format($social*proof['likes']); ?> likes
        </span>
        <span class="social-stat">
          <svg><!-- Comment icon --></svg>
          <?php echo number*format($social*proof['comments']); ?> comments
        </span>
      </div>
    <?php endif; ?>

  </article>
  <?php

endwhile;

get_footer();
?>

```text

#### Method 2: REST API (Headless)

## Expose ACF fields to REST API

```php
<?php
/**

 * Add ACF fields to REST API response
 * File: /inc/acf-rest-api.php
 */

// Register ACF fields to REST API
add*action('rest*api_init', function() {

  // Portfolio fields
  register*rest*field('portfolio', 'acf_fields', array(
    'get_callback' => function($object) {
      return array(
        'featured' => get_field('featured', $object['id']),
        'main*image' => get*field('main_image', $object['id']),
        'gallery' => get*field('image*gallery', $object['id']),
        'location' => get_field('location', $object['id']),
        'event*name' => get*field('event_name', $object['id']),
        'client' => get_field('client', $object['id']),
        'shoot*date' => get*field('shoot_date', $object['id']),
        'techniques' => get_field('techniques', $object['id']),
        'social*proof' => get*field('social_proof', $object['id']),
        'related*links' => get*field('related_links', $object['id']),
      );
    },
    'schema' => null,
  ));

  // Video fields
  register*rest*field('video', 'acf_fields', array(
    'get_callback' => function($object) {
      return array(
        'video*url' => get*field('video_url', $object['id']),
        'video*type' => get*field('video_type', $object['id']),
        'duration' => get_field('duration', $object['id']),
        'view*count' => get*field('view_count', $object['id']),
        'featured' => get_field('featured', $object['id']),
      );
    },
  ));

});

```text

**Fetch in React:**

```tsx
// /services/wordpressService.ts

interface PortfolioEntry {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf_fields: {
    featured: boolean;
    main_image: {
      url: string;
      alt: string;
      sizes: {
        thumbnail: string;
        medium: string;
        large: string;
      };
    };
    gallery: Array<{
      url: string;
      alt: string;
    }>;
    location: string;
    event_name: string;
    social_proof: {
      likes: number;
      comments: number;
      shares: number;
    };
  };
}

export async function fetchPortfolioEntries(): Promise<PortfolioEntry[]> {
  const response = await fetch(
    'https://your-site.com/wp-json/wp/v2/portfolio?_embed'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio entries');
  }

  return response.json();
}

```text

---

## REST API Integration

### Enable ACF REST API

**Option 1: Field Group Settings (GUI)**

In ACF Field Group editor:

1. Open field group

1. Scroll to "Settings"

1. Enable "Show in REST API"

**Option 2: PHP Code**

```php
acf*add*local*field*group(array(
  'key' => 'group*portfolio*entry',
  'title' => 'Portfolio Entry Details',
  'show*in*rest' => 1, // Enable REST API
  'fields' => array(
    // ... fields
  ),
));

```text

### Custom REST Endpoints

Create custom endpoints for complex queries:

```php
<?php
/**

 * Custom REST API endpoints
 * File: /inc/rest-api.php
 */

add*action('rest*api_init', function() {

  // Featured portfolio entries
  register*rest*route('nova-news/v1', '/portfolio/featured', array(
    'methods' => 'GET',
    'callback' => 'nova*news*get*featured*portfolio',
    'permission*callback' => '**return*true',
  ));

  // Portfolio by category
  register*rest*route('nova-news/v1', '/portfolio/category/(?P<slug>[a-zA-Z0-9-]+)', array(
    'methods' => 'GET',
    'callback' => 'nova*news*get*portfolio*by_category',
    'permission*callback' => '**return*true',
  ));

});

function nova*news*get*featured*portfolio($request) {
  $args = array(
    'post_type' => 'portfolio',
    'posts*per*page' => 6,
    'meta_query' => array(
      array(
        'key' => 'featured',
        'value' => '1',
        'compare' => '=',
      ),
    ),
  );

  $query = new WP_Query($args);
  $posts = array();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      $posts[] = array(
        'id' => get*the*ID(),
        'title' => get*the*title(),
        'slug' => get*post*field('post*name', get*the_ID()),
        'excerpt' => get*the*excerpt(),
        'featured*image' => get*the*post*thumbnail*url(get*the_ID(), 'large'),
        'acf*fields' => get*fields(get*the*ID()),
      );
    }
    wp*reset*postdata();
  }

  return rest*ensure*response($posts);
}

function nova*news*get*portfolio*by_category($request) {
  $slug = $request['slug'];

  $args = array(
    'post_type' => 'portfolio',
    'posts*per*page' => -1,
    'tax_query' => array(
      array(
        'taxonomy' => 'portfolio_category',
        'field' => 'slug',
        'terms' => $slug,
      ),
    ),
  );

  $query = new WP_Query($args);
  $posts = array();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      $posts[] = array(
        'id' => get*the*ID(),
        'title' => get*the*title(),
        'acf*fields' => get*fields(get*the*ID()),
      );
    }
    wp*reset*postdata();
  }

  return rest*ensure*response($posts);
}

```text

---

## Migration from Mock Data

### Step 1: Export Mock Data

Create a script to export existing mock data to WordPress import format.

```php
<?php
/**

 * Export mock data to WordPress XML format
 * File: /scripts/export-mock-data.php
 */

require*once **DIR*_ . '/../vendor/autoload.php';

// Read mock data
$portfolioData = json*decode(file*get*contents(**DIR*_ .
'/../data/mock/portfolio/portfolio-data.json'), true);

// Generate WordPress XML
$xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><rss
version="2.0"></rss>');
$channel = $xml->addChild('channel');

foreach ($portfolioData as $entry) {
  $item = $channel->addChild('item');
  $item->addChild('title', htmlspecialchars($entry['title']));
  $item->addChild('content:encoded', htmlspecialchars($entry['description']), 'http://purl.org/rss/1.0/modules/content/');
  $item->addChild('wp:post_type', 'portfolio', 'http://wordpress.org/export/1.2/');

  // Add ACF fields
$postmeta = $item->addChild('wp:postmeta', '',
'http://wordpress.org/export/1.2/');
  $postmeta->addChild('wp:meta_key', 'featured');
  $postmeta->addChild('wp:meta_value', $entry['featured'] ? '1' : '0');

  // Add more fields...
}

// Save XML
file*put*contents(_*DIR*_ . '/../export/portfolio-import.xml', $xml->asXML());

echo "Export complete!\n";

```text

### Step 2: Import via WP-CLI

```bash

# Import posts

wp import portfolio-import.xml --authors=create

# Import media

wp media import images/*.jpg --post_id=123

# Set featured images

wp post meta update 123 *thumbnail*id 456

```text

### Step 3: Verify Import

```bash

# Check post count

wp post list --post_type=portfolio

# Check ACF fields

wp acf get-field featured 123

```text

---

## Best Practices

### 1. Use PHP Registration for Version Control

Register field groups via PHP instead of GUI to track changes in Git.

## Export Field Group

In ACF GUI:

1. Field Groups → Select group

1. Tools → Export as PHP

1. Copy code to `/inc/acf-fields.php`

### 2. Namespace Field Keys

```php
// ✅ GOOD - Namespaced keys
'key' => 'field*portfolio*featured',

// ❌ BAD - Generic keys
'key' => 'field_featured',

```text

### 3. Set Return Formats

```php
// Image field
'return_format' => 'array', // Returns full image data

// Gallery field
'return_format' => 'array', // Returns array of image arrays

// Relationship field
'return*format' => 'object', // Returns WP*Post objects

```text

### 4. Validate Required Fields

```php
array(
  'key' => 'field*portfolio*image',
  'label' => 'Main Image',
  'name' => 'main_image',
  'type' => 'image',
  'required' => 1, // Enforce required
),

```text

### 5. Use Conditional Logic

```php
array(
  'key' => 'field*video*type',
  'name' => 'video_type',
  'type' => 'select',
  'choices' => array(
    'youtube' => 'YouTube',
    'vimeo' => 'Vimeo',
    'self' => 'Self-hosted',
  ),
),
array(
  'key' => 'field*video*file',
  'name' => 'video_file',
  'type' => 'file',
  'conditional_logic' => array(
    array(
      array(
        'field' => 'field*video*type',
        'operator' => '==',
        'value' => 'self',
      ),
    ),
  ),
),

```text

### 6. Sanitize Output

```php
// Text fields
echo esc*html(get*field('location'));

// URLs
echo esc*url(get*field('video_url'));

// HTML content
echo wp*kses*post(get_field('description'));

```text

---

## Summary

This guide covered:

1. ✅ Custom post type registration (Portfolio, Video, Podcast)

1. ✅ ACF field group setup for all CPTs

1. ✅ Template integration (PHP and REST API)

1. ✅ Custom REST endpoints for complex queries

1. ✅ Migration from mock data to WordPress

1. ✅ Best practices for ACF development

**Next Steps:**

1. Install ACF Pro plugin

1. Register custom post types

1. Create field groups via PHP

1. Test REST API endpoints

1. Migrate mock data

**Related Guides:**

- [CMS Field Mapping](../docs/cms-field-mapping.md)
- [WordPress FSE Guide](./wordpress-fse-guide.md)
- [WordPress Migration Plan](./wordpress-migration-plan.md)

---

**Last Updated:** March 12, 2026
**Maintained By:** Development Team
