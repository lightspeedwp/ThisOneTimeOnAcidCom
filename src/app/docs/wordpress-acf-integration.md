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

This guide documents how to integrate Advanced Custom Fields (ACF) with the Nova News WordPress theme. It covers custom post types (CPTs), field groups, and template integration for portfolio entries, blog posts, videos, and podcasts.

**Prerequisites:**
- WordPress 6.0+
- Advanced Custom Fields Pro plugin
- Understanding of WordPress custom post types
- Familiarity with Nova News data structure

---

## Table of Contents

1. [What is ACF?](#what-is-acf)
2. [Custom Post Types](#custom-post-types)
3. [Field Groups](#field-groups)
4. [Template Integration](#template-integration)
5. [REST API Integration](#rest-api-integration)
6. [Migration from Mock Data](#migration-from-mock-data)
7. [Best Practices](#best-practices)

---

## What is ACF?

**Advanced Custom Fields (ACF)** is a WordPress plugin that allows you to add custom fields to posts, pages, and custom post types.

### Why Use ACF?

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

**Recommendation:** Use ACF Pro for Nova News (requires Repeater and Gallery fields).

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
function nova_news_register_portfolio_cpt() {
  $labels = array(
    'name'                  => 'Portfolio',
    'singular_name'         => 'Portfolio Entry',
    'menu_name'             => 'Portfolio',
    'add_new'               => 'Add New',
    'add_new_item'          => 'Add New Portfolio Entry',
    'edit_item'             => 'Edit Portfolio Entry',
    'new_item'              => 'New Portfolio Entry',
    'view_item'             => 'View Portfolio Entry',
    'search_items'          => 'Search Portfolio',
    'not_found'             => 'No portfolio entries found',
    'not_found_in_trash'    => 'No portfolio entries found in Trash',
  );

  $args = array(
    'labels'                => $labels,
    'public'                => true,
    'has_archive'           => true,
    'rewrite'               => array('slug' => 'portfolio'),
    'menu_icon'             => 'dashicons-images-alt2',
    'supports'              => array('title', 'editor', 'thumbnail', 'excerpt'),
    'show_in_rest'          => true, // Enable Gutenberg + REST API
    'taxonomies'            => array('portfolio_category'),
  );

  register_post_type('portfolio', $args);
}
add_action('init', 'nova_news_register_portfolio_cpt');

/**
 * Register Portfolio Category Taxonomy
 */
function nova_news_register_portfolio_taxonomy() {
  $labels = array(
    'name'              => 'Portfolio Categories',
    'singular_name'     => 'Portfolio Category',
    'search_items'      => 'Search Categories',
    'all_items'         => 'All Categories',
    'edit_item'         => 'Edit Category',
    'update_item'       => 'Update Category',
    'add_new_item'      => 'Add New Category',
    'new_item_name'     => 'New Category Name',
    'menu_name'         => 'Categories',
  );

  $args = array(
    'hierarchical'      => true,
    'labels'            => $labels,
    'show_ui'           => true,
    'show_in_rest'      => true,
    'rewrite'           => array('slug' => 'portfolio-category'),
  );

  register_taxonomy('portfolio_category', array('portfolio'), $args);
}
add_action('init', 'nova_news_register_portfolio_taxonomy');
```

### 2. Video CPT

```php
/**
 * Register Video Custom Post Type
 */
function nova_news_register_video_cpt() {
  $labels = array(
    'name'                  => 'Videos',
    'singular_name'         => 'Video',
    'menu_name'             => 'Videos',
    'add_new_item'          => 'Add New Video',
  );

  $args = array(
    'labels'                => $labels,
    'public'                => true,
    'has_archive'           => true,
    'rewrite'               => array('slug' => 'videos'),
    'menu_icon'             => 'dashicons-video-alt3',
    'supports'              => array('title', 'editor', 'thumbnail'),
    'show_in_rest'          => true,
    'taxonomies'            => array('video_category', 'video_tag'),
  );

  register_post_type('video', $args);
}
add_action('init', 'nova_news_register_video_cpt');
```

### 3. Podcast CPT

```php
/**
 * Register Podcast Custom Post Type
 */
function nova_news_register_podcast_cpt() {
  $labels = array(
    'name'                  => 'Podcasts',
    'singular_name'         => 'Podcast Episode',
    'menu_name'             => 'Podcasts',
    'add_new_item'          => 'Add New Episode',
  );

  $args = array(
    'labels'                => $labels,
    'public'                => true,
    'has_archive'           => true,
    'rewrite'               => array('slug' => 'podcasts'),
    'menu_icon'             => 'dashicons-microphone',
    'supports'              => array('title', 'editor', 'thumbnail'),
    'show_in_rest'          => true,
    'taxonomies'            => array('podcast_series'),
  );

  register_post_type('podcast', $args);
}
add_action('init', 'nova_news_register_podcast_cpt');
```

---

## Field Groups

### 1. Portfolio Entry Fields

**Mapping:** See [CMS Field Mapping](../docs/cms-field-mapping.md) for complete reference.

**ACF Field Group Setup:**

```php
<?php
/**
 * ACF Field Group: Portfolio Entry
 * 
 * File: /inc/acf-fields.php
 * Register via PHP (recommended for version control)
 */

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group(array(
    'key' => 'group_portfolio_entry',
    'title' => 'Portfolio Entry Details',
    'fields' => array(
      
      // Featured Flag
      array(
        'key' => 'field_portfolio_featured',
        'label' => 'Featured',
        'name' => 'featured',
        'type' => 'true_false',
        'default_value' => 0,
        'ui' => 1,
      ),
      
      // Main Image
      array(
        'key' => 'field_portfolio_image',
        'label' => 'Main Image',
        'name' => 'main_image',
        'type' => 'image',
        'required' => 1,
        'return_format' => 'array',
        'preview_size' => 'medium',
      ),
      
      // Image Gallery
      array(
        'key' => 'field_portfolio_gallery',
        'label' => 'Image Gallery',
        'name' => 'image_gallery',
        'type' => 'gallery',
        'return_format' => 'array',
        'min' => 3,
        'max' => 20,
      ),
      
      // Location
      array(
        'key' => 'field_portfolio_location',
        'label' => 'Location',
        'name' => 'location',
        'type' => 'text',
        'placeholder' => 'e.g., Cape Town, Berlin',
      ),
      
      // Event Name
      array(
        'key' => 'field_portfolio_event',
        'label' => 'Event Name',
        'name' => 'event_name',
        'type' => 'text',
        'placeholder' => 'e.g., Origin Festival 2025',
      ),
      
      // Client/Subject
      array(
        'key' => 'field_portfolio_client',
        'label' => 'Client/Subject',
        'name' => 'client',
        'type' => 'text',
      ),
      
      // Date
      array(
        'key' => 'field_portfolio_date',
        'label' => 'Shoot Date',
        'name' => 'shoot_date',
        'type' => 'date_picker',
        'display_format' => 'F j, Y',
        'return_format' => 'Y-m-d',
      ),
      
      // Techniques/Products
      array(
        'key' => 'field_portfolio_techniques',
        'label' => 'Techniques/Products',
        'name' => 'techniques',
        'type' => 'textarea',
        'rows' => 4,
        'placeholder' => 'e.g., UV reactive paint, glitter',
      ),
      
      // Social Proof
      array(
        'key' => 'field_portfolio_social_proof',
        'label' => 'Social Proof',
        'name' => 'social_proof',
        'type' => 'group',
        'sub_fields' => array(
          array(
            'key' => 'field_social_likes',
            'label' => 'Likes',
            'name' => 'likes',
            'type' => 'number',
            'default_value' => 0,
          ),
          array(
            'key' => 'field_social_comments',
            'label' => 'Comments',
            'name' => 'comments',
            'type' => 'number',
            'default_value' => 0,
          ),
          array(
            'key' => 'field_social_shares',
            'label' => 'Shares',
            'name' => 'shares',
            'type' => 'number',
            'default_value' => 0,
          ),
        ),
      ),
      
      // Related Links
      array(
        'key' => 'field_portfolio_links',
        'label' => 'Related Links',
        'name' => 'related_links',
        'type' => 'repeater',
        'layout' => 'table',
        'button_label' => 'Add Link',
        'sub_fields' => array(
          array(
            'key' => 'field_link_text',
            'label' => 'Link Text',
            'name' => 'text',
            'type' => 'text',
          ),
          array(
            'key' => 'field_link_url',
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
```

### 2. Video Entry Fields

```php
acf_add_local_field_group(array(
  'key' => 'group_video_entry',
  'title' => 'Video Details',
  'fields' => array(
    
    // YouTube/Vimeo URL
    array(
      'key' => 'field_video_url',
      'label' => 'Video URL',
      'name' => 'video_url',
      'type' => 'url',
      'required' => 1,
      'placeholder' => 'https://www.youtube.com/watch?v=...',
    ),
    
    // Video Type (YouTube/Vimeo/Self-hosted)
    array(
      'key' => 'field_video_type',
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
      'key' => 'field_video_duration',
      'label' => 'Duration',
      'name' => 'duration',
      'type' => 'text',
      'placeholder' => 'e.g., 5:32',
    ),
    
    // View Count
    array(
      'key' => 'field_video_views',
      'label' => 'View Count',
      'name' => 'view_count',
      'type' => 'number',
      'default_value' => 0,
    ),
    
    // Featured
    array(
      'key' => 'field_video_featured',
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
```

### 3. Podcast Episode Fields

```php
acf_add_local_field_group(array(
  'key' => 'group_podcast_episode',
  'title' => 'Podcast Episode Details',
  'fields' => array(
    
    // Episode Number
    array(
      'key' => 'field_podcast_episode_number',
      'label' => 'Episode Number',
      'name' => 'episode_number',
      'type' => 'number',
      'required' => 1,
    ),
    
    // Audio File
    array(
      'key' => 'field_podcast_audio',
      'label' => 'Audio File',
      'name' => 'audio_file',
      'type' => 'file',
      'return_format' => 'array',
      'mime_types' => 'mp3,m4a',
    ),
    
    // Duration
    array(
      'key' => 'field_podcast_duration',
      'label' => 'Duration',
      'name' => 'duration',
      'type' => 'text',
      'placeholder' => 'e.g., 45:30',
    ),
    
    // Publish Date
    array(
      'key' => 'field_podcast_date',
      'label' => 'Publish Date',
      'name' => 'publish_date',
      'type' => 'date_picker',
      'display_format' => 'F j, Y',
      'return_format' => 'Y-m-d',
    ),
    
    // Guests (Repeater)
    array(
      'key' => 'field_podcast_guests',
      'label' => 'Guests',
      'name' => 'guests',
      'type' => 'repeater',
      'layout' => 'table',
      'button_label' => 'Add Guest',
      'sub_fields' => array(
        array(
          'key' => 'field_guest_name',
          'label' => 'Name',
          'name' => 'name',
          'type' => 'text',
        ),
        array(
          'key' => 'field_guest_bio',
          'label' => 'Bio',
          'name' => 'bio',
          'type' => 'textarea',
          'rows' => 2,
        ),
      ),
    ),
    
    // Show Notes
    array(
      'key' => 'field_podcast_notes',
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
```

### 4. Blog Post Extensions

Extend default WordPress posts with additional fields.

```php
acf_add_local_field_group(array(
  'key' => 'group_blog_post',
  'title' => 'Blog Post Extensions',
  'fields' => array(
    
    // Reading Time
    array(
      'key' => 'field_blog_reading_time',
      'label' => 'Reading Time',
      'name' => 'reading_time',
      'type' => 'text',
      'placeholder' => 'e.g., 5 min read',
      'instructions' => 'Auto-calculated on save (optional override)',
    ),
    
    // Featured
    array(
      'key' => 'field_blog_featured',
      'label' => 'Featured Post',
      'name' => 'featured',
      'type' => 'true_false',
    ),
    
    // Custom Excerpt
    array(
      'key' => 'field_blog_custom_excerpt',
      'label' => 'Custom Excerpt',
      'name' => 'custom_excerpt',
      'type' => 'textarea',
      'rows' => 3,
      'instructions' => 'Leave blank to use default excerpt',
    ),
    
    // Social Share Image
    array(
      'key' => 'field_blog_og_image',
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
```

---

## Template Integration

### Displaying ACF Fields in Templates

#### Method 1: The Loop (Single Template)

```php
<?php
// /templates/single-portfolio.html
// Note: This is FSE HTML, but shows where PHP would go

get_header();

while (have_posts()) : the_post();
  
  // Get ACF fields
  $featured = get_field('featured');
  $main_image = get_field('main_image');
  $gallery = get_field('image_gallery');
  $location = get_field('location');
  $event_name = get_field('event_name');
  $techniques = get_field('techniques');
  $social_proof = get_field('social_proof');
  
  ?>
  <article class="portfolio-entry">
    
    <!-- Hero Image -->
    <?php if ($main_image): ?>
      <div class="portfolio-entry__hero">
        <img 
          src="<?php echo esc_url($main_image['sizes']['large']); ?>" 
          alt="<?php echo esc_attr($main_image['alt']); ?>"
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
          <?php echo esc_html($event_name); ?>
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
          <?php echo number_format($social_proof['likes']); ?> likes
        </span>
        <span class="social-stat">
          <svg><!-- Comment icon --></svg>
          <?php echo number_format($social_proof['comments']); ?> comments
        </span>
      </div>
    <?php endif; ?>
    
  </article>
  <?php
  
endwhile;

get_footer();
?>
```

#### Method 2: REST API (Headless)

**Expose ACF fields to REST API:**

```php
<?php
/**
 * Add ACF fields to REST API response
 * File: /inc/acf-rest-api.php
 */

// Register ACF fields to REST API
add_action('rest_api_init', function() {
  
  // Portfolio fields
  register_rest_field('portfolio', 'acf_fields', array(
    'get_callback' => function($object) {
      return array(
        'featured' => get_field('featured', $object['id']),
        'main_image' => get_field('main_image', $object['id']),
        'gallery' => get_field('image_gallery', $object['id']),
        'location' => get_field('location', $object['id']),
        'event_name' => get_field('event_name', $object['id']),
        'client' => get_field('client', $object['id']),
        'shoot_date' => get_field('shoot_date', $object['id']),
        'techniques' => get_field('techniques', $object['id']),
        'social_proof' => get_field('social_proof', $object['id']),
        'related_links' => get_field('related_links', $object['id']),
      );
    },
    'schema' => null,
  ));
  
  // Video fields
  register_rest_field('video', 'acf_fields', array(
    'get_callback' => function($object) {
      return array(
        'video_url' => get_field('video_url', $object['id']),
        'video_type' => get_field('video_type', $object['id']),
        'duration' => get_field('duration', $object['id']),
        'view_count' => get_field('view_count', $object['id']),
        'featured' => get_field('featured', $object['id']),
      );
    },
  ));
  
});
```

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
```

---

## REST API Integration

### Enable ACF REST API

**Option 1: Field Group Settings (GUI)**

In ACF Field Group editor:
1. Open field group
2. Scroll to "Settings"
3. Enable "Show in REST API"

**Option 2: PHP Code**

```php
acf_add_local_field_group(array(
  'key' => 'group_portfolio_entry',
  'title' => 'Portfolio Entry Details',
  'show_in_rest' => 1, // Enable REST API
  'fields' => array(
    // ... fields
  ),
));
```

### Custom REST Endpoints

Create custom endpoints for complex queries:

```php
<?php
/**
 * Custom REST API endpoints
 * File: /inc/rest-api.php
 */

add_action('rest_api_init', function() {
  
  // Featured portfolio entries
  register_rest_route('nova-news/v1', '/portfolio/featured', array(
    'methods' => 'GET',
    'callback' => 'nova_news_get_featured_portfolio',
    'permission_callback' => '__return_true',
  ));
  
  // Portfolio by category
  register_rest_route('nova-news/v1', '/portfolio/category/(?P<slug>[a-zA-Z0-9-]+)', array(
    'methods' => 'GET',
    'callback' => 'nova_news_get_portfolio_by_category',
    'permission_callback' => '__return_true',
  ));
  
});

function nova_news_get_featured_portfolio($request) {
  $args = array(
    'post_type' => 'portfolio',
    'posts_per_page' => 6,
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
        'id' => get_the_ID(),
        'title' => get_the_title(),
        'slug' => get_post_field('post_name', get_the_ID()),
        'excerpt' => get_the_excerpt(),
        'featured_image' => get_the_post_thumbnail_url(get_the_ID(), 'large'),
        'acf_fields' => get_fields(get_the_ID()),
      );
    }
    wp_reset_postdata();
  }
  
  return rest_ensure_response($posts);
}

function nova_news_get_portfolio_by_category($request) {
  $slug = $request['slug'];
  
  $args = array(
    'post_type' => 'portfolio',
    'posts_per_page' => -1,
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
        'id' => get_the_ID(),
        'title' => get_the_title(),
        'acf_fields' => get_fields(get_the_ID()),
      );
    }
    wp_reset_postdata();
  }
  
  return rest_ensure_response($posts);
}
```

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

require_once __DIR__ . '/../vendor/autoload.php';

// Read mock data
$portfolioData = json_decode(file_get_contents(__DIR__ . '/../data/mock/portfolio/portfolio-data.json'), true);

// Generate WordPress XML
$xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"></rss>');
$channel = $xml->addChild('channel');

foreach ($portfolioData as $entry) {
  $item = $channel->addChild('item');
  $item->addChild('title', htmlspecialchars($entry['title']));
  $item->addChild('content:encoded', htmlspecialchars($entry['description']), 'http://purl.org/rss/1.0/modules/content/');
  $item->addChild('wp:post_type', 'portfolio', 'http://wordpress.org/export/1.2/');
  
  // Add ACF fields
  $postmeta = $item->addChild('wp:postmeta', '', 'http://wordpress.org/export/1.2/');
  $postmeta->addChild('wp:meta_key', 'featured');
  $postmeta->addChild('wp:meta_value', $entry['featured'] ? '1' : '0');
  
  // Add more fields...
}

// Save XML
file_put_contents(__DIR__ . '/../export/portfolio-import.xml', $xml->asXML());

echo "Export complete!\n";
```

### Step 2: Import via WP-CLI

```bash
# Import posts
wp import portfolio-import.xml --authors=create

# Import media
wp media import images/*.jpg --post_id=123

# Set featured images
wp post meta update 123 _thumbnail_id 456
```

### Step 3: Verify Import

```bash
# Check post count
wp post list --post_type=portfolio

# Check ACF fields
wp acf get-field featured 123
```

---

## Best Practices

### 1. Use PHP Registration for Version Control

Register field groups via PHP instead of GUI to track changes in Git.

**Export Field Group:**

In ACF GUI:
1. Field Groups → Select group
2. Tools → Export as PHP
3. Copy code to `/inc/acf-fields.php`

### 2. Namespace Field Keys

```php
// ✅ GOOD - Namespaced keys
'key' => 'field_portfolio_featured',

// ❌ BAD - Generic keys
'key' => 'field_featured',
```

### 3. Set Return Formats

```php
// Image field
'return_format' => 'array', // Returns full image data

// Gallery field
'return_format' => 'array', // Returns array of image arrays

// Relationship field
'return_format' => 'object', // Returns WP_Post objects
```

### 4. Validate Required Fields

```php
array(
  'key' => 'field_portfolio_image',
  'label' => 'Main Image',
  'name' => 'main_image',
  'type' => 'image',
  'required' => 1, // Enforce required
),
```

### 5. Use Conditional Logic

```php
array(
  'key' => 'field_video_type',
  'name' => 'video_type',
  'type' => 'select',
  'choices' => array(
    'youtube' => 'YouTube',
    'vimeo' => 'Vimeo',
    'self' => 'Self-hosted',
  ),
),
array(
  'key' => 'field_video_file',
  'name' => 'video_file',
  'type' => 'file',
  'conditional_logic' => array(
    array(
      array(
        'field' => 'field_video_type',
        'operator' => '==',
        'value' => 'self',
      ),
    ),
  ),
),
```

### 6. Sanitize Output

```php
// Text fields
echo esc_html(get_field('location'));

// URLs
echo esc_url(get_field('video_url'));

// HTML content
echo wp_kses_post(get_field('description'));
```

---

## Summary

This guide covered:

1. ✅ Custom post type registration (Portfolio, Video, Podcast)
2. ✅ ACF field group setup for all CPTs
3. ✅ Template integration (PHP and REST API)
4. ✅ Custom REST endpoints for complex queries
5. ✅ Migration from mock data to WordPress
6. ✅ Best practices for ACF development

**Next Steps:**

1. Install ACF Pro plugin
2. Register custom post types
3. Create field groups via PHP
4. Test REST API endpoints
5. Migrate mock data

**Related Guides:**

- [CMS Field Mapping](../docs/cms-field-mapping.md)
- [WordPress FSE Guide](./wordpress-fse-guide.md)
- [WordPress Migration Plan](./wordpress-migration-plan.md)

---

**Last Updated:** March 12, 2026  
**Maintained By:** Development Team
