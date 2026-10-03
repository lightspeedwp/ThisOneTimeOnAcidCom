---
title: "WordPress Migration Plan"
filename: "/docs/wordpress-migration-plan.md"
created: "2026-03-11"
modified: "2026-03-11"
version: "1.0.0"
status: "Active"
---

# WordPress Migration Plan

**Project:** Ash Shaw Makeup Portfolio  
**Migration Type:** React SPA → WordPress Block Theme (Headless Optional)  
**Timeline:** 16 weeks (4 phases)  
**Status:** Planning  
**Created:** March 11, 2026

---

## Executive Summary

This document outlines the migration path from the current React SPA to a WordPress block theme, leveraging existing BEM CSS architecture and semantic component structure. The codebase is **78% aligned** with WordPress conventions, making migration straightforward.

**Key Advantages:**
- ✅ Strict BEM CSS architecture (100% compatible)
- ✅ Semantic component naming (maps directly to WordPress blocks)
- ✅ Centralized mock data system (easily converts to WordPress APIs)
- ✅ No Tailwind utilities (avoids conflict with WordPress editor styles)
- ✅ Comprehensive design token system (maps to theme.json)

**Migration Strategy:** Incremental, starting with content management while keeping React frontend, then optionally migrating to full WordPress block theme.

---

## Migration Approaches

### Approach A: Headless WordPress (Recommended)

**Keep React frontend, add WordPress backend**

**Pros:**
- Minimal code changes
- Leverage existing React components
- Keep advanced animations and interactions
- PWA features remain intact
- Gradual migration path

**Cons:**
- Two systems to maintain
- Hosting complexity
- API latency considerations

**Timeline:** 8-10 weeks

### Approach B: Full Block Theme Migration

**Replace React with WordPress block theme**

**Pros:**
- Single system to maintain
- WordPress editor for all content
- Community plugins and themes
- Standard WordPress hosting

**Cons:**
- Complete rebuild of components
- Loss of some React-specific features
- Complex animations harder to implement
- Longer migration timeline

**Timeline:** 14-16 weeks

### Recommended: Hybrid Approach

**Start headless, evaluate full migration later**

1. **Phase 1:** Keep React, connect WordPress API (content only)
2. **Phase 2:** Migrate static pages to WordPress templates
3. **Phase 3:** Convert components to custom blocks
4. **Phase 4:** Full block theme (optional, based on Phase 1-3 results)

---

## Phase 1: Content Management Setup (Weeks 1-4)

### Goal
Set up WordPress as headless CMS, keep React frontend unchanged.

### Tasks

#### Week 1: WordPress Installation & Configuration
- [ ] Install WordPress 6.5+ on hosting
- [ ] Install WPGraphQL plugin
- [ ] Install ACF Pro (Advanced Custom Fields)
- [ ] Configure permalink structure
- [ ] Set up staging environment

#### Week 2: Custom Post Types & Fields
- [ ] Create Portfolio CPT with ACF fields:
  - Title, description, featured image
  - Gallery (repeater field)
  - Category, tags, year
  - UV makeup checkbox
- [ ] Create Blog Posts (built-in post type)
  - Categories, tags
  - Featured image
  - Excerpt, content
- [ ] Create Video CPT with ACF fields:
  - Title, description, thumbnail
  - YouTube/Vimeo URL
  - Category, tags, publish date
- [ ] Create Podcast CPT with ACF fields:
  - Title, description, cover image
  - Audio file URL
  - Episode number, season, duration
- [ ] Create Stickers CPT (optional - could be ACF gallery)
  - Sticker graphics
  - Labels, categories

#### Week 3: Content Migration
- [ ] Migrate portfolio entries from `/data/mock/portfolio/`
- [ ] Migrate blog posts from `/data/mock/blog/`
- [ ] Migrate videos from `/data/mock/videos.ts`
- [ ] Migrate podcasts from `/data/mock/podcasts.ts`
- [ ] Migrate stickers from `/data/mock/images/sticker-graphics.ts`

#### Week 4: API Integration (React)
- [ ] Create WordPress API service (`/utils/wordpressService.ts`)
- [ ] Replace mock data imports with API calls
- [ ] Add loading states and error handling
- [ ] Test all pages with WordPress data
- [ ] Update environment variables (`VITE_WORDPRESS_URL`)

**Deliverable:** React frontend consuming WordPress API

---

## Phase 2: Theme Structure & Styling (Weeks 5-8)

### Goal
Create WordPress block theme structure, export design tokens to theme.json.

### Tasks

#### Week 5: Theme.json Setup
- [ ] Export theme.json (see `/docs/theme.json`)
- [ ] Map CSS custom properties to WordPress presets
- [ ] Configure color palette (8 neon colors + atomic black)
- [ ] Configure typography scale (6 font sizes, fluid)
- [ ] Configure spacing presets (8 sizes)
- [ ] Configure layout settings (contentSize, wideSize)

#### Week 6: Template Parts
- [ ] Create header template part
  - Site logo, navigation, theme switcher
  - Mobile menu
- [ ] Create footer template part
  - Footer links, social icons, copyright
- [ ] Create sidebar template part (if needed)

#### Week 7: Page Templates
- [ ] Create homepage template
- [ ] Create portfolio archive template
- [ ] Create single portfolio template
- [ ] Create blog archive template
- [ ] Create single blog post template
- [ ] Create videos archive template
- [ ] Create podcasts archive template
- [ ] Create about page template
- [ ] Create 404 template

#### Week 8: CSS Migration
- [ ] Copy `/styles/globals.css` to theme
- [ ] Copy all BEM CSS files to theme
- [ ] Test CSS in WordPress editor
- [ ] Add editor-specific styles (`editor-style.css`)
- [ ] Verify responsive design

**Deliverable:** WordPress block theme with full design system

---

## Phase 3: Custom Block Development (Weeks 9-12)

### Goal
Convert React components to custom WordPress blocks.

### Priority Blocks

#### Week 9: Essential Blocks
- [ ] Portfolio Card block
  - Grid layout options
  - Lightbox integration
  - Category filtering
- [ ] Video Card block
  - Thumbnail, title, description
  - Modal player
  - Category/tag support
- [ ] Breadcrumbs block
  - Schema.org BreadcrumbList
  - Auto-generate from page hierarchy

#### Week 10: Layout Blocks
- [ ] Hero Section block
  - Background image/gradient
  - Title, subtitle, CTA
  - Responsive variants
- [ ] CTA Section block
  - Heading, description
  - Button(s)
  - Background options
- [ ] Testimonial Slider block
  - Quote cards
  - Navigation arrows
  - Auto-play option

#### Week 11: Archive Blocks
- [ ] Portfolio Grid block
  - Query loop integration
  - Filter controls
  - Layout switcher (grid/list)
- [ ] Blog Grid block
  - Query loop integration
  - Category filters
  - Pagination
- [ ] Video Grid block
  - Query loop integration
  - Category filters

#### Week 12: Advanced Blocks
- [ ] Mega Menu blocks (Portfolio, Blog)
  - Featured items
  - Category lists
  - Custom styling
- [ ] FAQ Section block
  - Schema.org FAQPage
  - Accordion UI
- [ ] Stickers Gallery block
  - Polaroid cards
  - Lightbox viewer
  - Theme filters

**Deliverable:** Custom block library for all major components

---

## Phase 4: Migration & Launch (Weeks 13-16)

### Goal
Complete migration, testing, and launch.

### Tasks

#### Week 13: Data Validation
- [ ] Verify all portfolio entries migrated correctly
- [ ] Verify all blog posts migrated correctly
- [ ] Verify all videos migrated correctly
- [ ] Verify all podcasts migrated correctly
- [ ] Check image optimization
- [ ] Test search functionality
- [ ] Test filtering and sorting

#### Week 14: SEO & Performance
- [ ] Install Yoast SEO or Rank Math
- [ ] Configure SEO settings
- [ ] Set up XML sitemap
- [ ] Verify Schema.org structured data
- [ ] Test page load speed (Lighthouse)
- [ ] Optimize images (WebP, lazy loading)
- [ ] Configure caching (WP Rocket or similar)

#### Week 15: Testing & QA
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS, Android)
- [ ] Tablet testing
- [ ] Accessibility testing (WCAG 2.1 AA)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Form submission testing (contact, feedback)
- [ ] 404 error pages
- [ ] Search functionality

#### Week 16: Launch & Monitoring
- [ ] Backup current React site
- [ ] Deploy WordPress site to production
- [ ] Configure DNS/domain settings
- [ ] Set up SSL certificate
- [ ] Configure CDN (Cloudflare)
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Create admin documentation
- [ ] Train content editors

**Deliverable:** Live WordPress site

---

## Technical Considerations

### Custom Blocks Development

All custom blocks should be built using:
- **@wordpress/scripts** - Build tooling
- **@wordpress/block-editor** - Block editor components
- **@wordpress/components** - UI components
- **React** - Component framework (WordPress uses React!)

**Example block structure:**
```
/blocks/
├── portfolio-card/
│   ├── block.json
│   ├── edit.js (React component for editor)
│   ├── save.js (React component for frontend)
│   ├── style.scss (imported from existing BEM CSS)
│   └── editor.scss
├── video-card/
├── hero-section/
└── ...
```

### API Strategy (Headless Approach)

**WPGraphQL queries for each data type:**

```graphql
# Portfolio entries
query PortfolioEntries {
  portfolioEntries {
    nodes {
      id
      title
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      portfolioFields {
        category
        year
        uvMakeup
        gallery {
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
}
```

### CSS Integration

**All existing CSS is 100% compatible:**
- BEM classes remain unchanged
- Custom properties work in WordPress
- Responsive breakpoints preserved
- Animation keyframes preserved

**Only change needed:** Import CSS into WordPress theme

```php
// functions.php
function ash_shaw_enqueue_styles() {
  wp_enqueue_style(
    'ash-shaw-globals',
    get_template_directory_uri() . '/styles/globals.css',
    [],
    '1.0.0'
  );
}
add_action('wp_enqueue_scripts', 'ash_shaw_enqueue_styles');
```

---

## Component → Block Mapping

### Direct Mappings (Low Complexity)

| React Component | WordPress Block | Notes |
|-----------------|-----------------|-------|
| Hero | Group + Cover | Native blocks |
| Footer | Template Part (footer) | Native feature |
| CTA Section | Group + Buttons | Native blocks |
| Breadcrumbs | Custom block | Need Schema.org support |

### Custom Block Required (Medium Complexity)

| React Component | WordPress Block | Why Custom Needed |
|-----------------|-----------------|-------------------|
| PortfolioCard | Custom block | Lightbox integration |
| VideoCard | Custom block | Modal player |
| PodcastPlayer | Custom block | Audio player UI |
| StickerGallery | Custom block | Polaroid cards + lightbox |
| TestimonialSlider | Custom block | Slider logic |

### Complex Conversions (High Complexity)

| React Component | WordPress Block | Challenge |
|-----------------|-----------------|-----------|
| MegaMenu | Navigation block | Complex interactions |
| EbookReader | Custom block or iframe | Touch gestures, fullscreen |
| LayoutSwitcher | Custom block | Grid/list toggle state |

---

## Data Migration Strategy

### Portfolio Entries

**From:** `/data/mock/portfolio/portfolio-entries.ts`  
**To:** WordPress Portfolio CPT

**Mapping:**
```typescript
// React mock data
{
  id: 'portfolio-1',
  title: 'UV Festival Makeup',
  description: '...',
  images: ['img1.jpg', 'img2.jpg'],
  category: 'Festival',
  year: 2024,
  featured: true
}

// WordPress ACF fields
Portfolio Entry (CPT)
├── Title (native)
├── Description (native excerpt)
├── Featured Image (native)
├── Gallery (ACF repeater)
│   └── image (ACF image)
├── Category (custom taxonomy)
├── Year (ACF number)
└── Featured (ACF true/false)
```

### Blog Posts

**From:** `/data/mock/blog/blog-posts.ts`  
**To:** WordPress Posts (built-in)

### Videos

**From:** `/data/mock/videos.ts`  
**To:** WordPress Video CPT

### Podcasts

**From:** `/data/mock/podcasts.ts`  
**To:** WordPress Podcast CPT

---

## Hosting Requirements

### WordPress Hosting Needs

- **PHP:** 8.1+
- **MySQL:** 8.0+
- **Disk Space:** 10GB+ (for media library)
- **RAM:** 2GB+ recommended
- **SSL:** Required

### Recommended Hosts

1. **WP Engine** - Premium managed WordPress
2. **Kinsta** - High-performance managed WordPress
3. **Cloudways** - Flexible cloud hosting
4. **SiteGround** - Budget-friendly option

### Headless Setup

- WordPress site: `wp.ashshaw.com`
- React frontend: `ashshaw.com` (existing)
- API: `wp.ashshaw.com/graphql` (WPGraphQL)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content migration errors | Medium | High | Automated scripts + manual verification |
| CSS conflicts in editor | Low | Medium | Test early, use editor-specific styles |
| Performance degradation | Low | Medium | Caching, CDN, image optimization |
| SEO ranking loss | Low | High | Maintain URLs, 301 redirects, structured data |
| Learning curve for editors | Medium | Low | Documentation, training sessions |
| Plugin conflicts | Medium | Medium | Test plugins in staging, minimal plugins |

---

## Success Metrics

### Week 4 (Phase 1 Complete)
- [ ] All portfolio entries in WordPress
- [ ] React frontend consuming WordPress API
- [ ] No broken images or links

### Week 8 (Phase 2 Complete)
- [ ] theme.json validated
- [ ] All templates created
- [ ] CSS working in editor

### Week 12 (Phase 3 Complete)
- [ ] 10+ custom blocks functional
- [ ] Editor can create portfolio pages
- [ ] Editor can create blog posts

### Week 16 (Phase 4 Complete)
- [ ] WordPress site live
- [ ] Lighthouse score 90+
- [ ] WCAG 2.1 AA compliance
- [ ] Zero console errors

---

## Rollback Plan

If migration fails or issues arise:

1. **Keep React site live** (current deployment on Netlify)
2. **WordPress runs in parallel** on separate subdomain
3. **DNS change only when fully validated**
4. **48-hour monitoring** before decommissioning React site
5. **Full backups** of both systems before any changes

---

## Maintenance Post-Migration

### Daily Tasks
- Monitor error logs
- Check uptime status

### Weekly Tasks
- Review content submissions
- Check site speed (Lighthouse)
- Update plugins (if any)

### Monthly Tasks
- WordPress core updates
- Security audit
- Database optimization
- Backup verification

---

## Estimated Costs

| Item | Cost (USD) | Frequency |
|------|-----------|-----------|
| WordPress Hosting | $25-100/mo | Monthly |
| ACF Pro License | $49/year | Annual |
| Premium Plugins (optional) | $0-200/year | Annual |
| Development Time (16 weeks) | N/A | One-time |
| **Total Year 1** | **$349-1,349** | - |

---

## Appendix: Key Files

### Migration Scripts (To Create)
- `/scripts/migrate-portfolio.ts` - Portfolio data → WordPress API
- `/scripts/migrate-blog.ts` - Blog data → WordPress API
- `/scripts/migrate-videos.ts` - Video data → WordPress API
- `/scripts/migrate-podcasts.ts` - Podcast data → WordPress API

### WordPress Theme Files
- `style.css` - Theme header
- `theme.json` - Design token export
- `functions.php` - Theme setup
- `templates/` - Block templates
- `parts/` - Template parts
- `blocks/` - Custom blocks

### API Services (React)
- `/utils/wordpressService.ts` - WPGraphQL client
- `/hooks/useWordPressData.ts` - Data fetching hook

---

## References

- [WordPress Block Theme Documentation](https://developer.wordpress.org/themes/block-themes/)
- [theme.json Specification](https://developer.wordpress.org/themes/advanced-topics/theme-json/)
- [WPGraphQL Documentation](https://www.wpgraphql.com/)
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)

---

**Document Status:** Draft  
**Last Updated:** March 11, 2026  
**Next Review:** After Phase 1 completion  
**Owner:** Development Team
