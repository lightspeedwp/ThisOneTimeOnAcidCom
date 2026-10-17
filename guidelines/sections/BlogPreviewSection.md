# BlogPreviewSection

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The BlogPreviewSection is a **content teaser area** that displays recent blog posts. It combines:
- Latest blog post cards (typically 3)
- Featured images and excerpts
- Publication metadata (date, reading time, categories)
- Call-to-action to full blog page
- Responsive grid layout

---

## Section Structure

```tsx
<section className="[container-styles]">
  {/* Content Container */}
  <div className="[max-width-container]">
    {/* Section Header */}
    <div className="[header-styles]">
      <h2>{/* Section title */}</h2>
      <p>{/* Section description */}</p>
    </div>
    
    {/* Blog Grid */}
    <div className="[grid-layout]">
      {posts.slice(0, 3).map(post => (
        <BlogPostCard
          key={post.id}
          post={post}
          onReadMore={(slug) => setCurrentPage('blogpost', slug)}
        />
      ))}
    </div>
    
    {/* View All Button */}
    <div className="[button-container]">
      <button onClick={() => setCurrentPage('blog')}>
        View All Posts
      </button>
    </div>
  </div>
</section>
```

---

## Container Styles

### Section Container
```tsx
className="
  bg-white                                         // Clean white background
  py-section                                       // clamp(3rem, 6vw + 1rem, 8rem)
  px-fluid-md                                      // clamp(1rem, 0.6rem + 2vw, 2rem)
"
```

### Inner Container
```tsx
className="
  max-w-7xl                                        // 1280px max-width
  mx-auto                                          // Center horizontally
"
```

### Section Header
```tsx
className="
  text-center                                      // Center alignment
  mb-fluid-2xl                                     // clamp(3rem, 1.5rem + 7.5vw, 6rem)
"
```

### Grid Layout
```tsx
className="
  grid                                             // CSS Grid
  grid-cols-1                                      // Single column mobile
  md:grid-cols-2                                   // Two columns tablet
  lg:grid-cols-3                                   // Three columns desktop
  gap-fluid-lg                                     // clamp(1.5rem, 1rem + 2.5vw, 3rem)
  mb-fluid-xl                                      // Margin below grid
"
```

---

## Visual Elements

### 1. Section Header

#### Section Title (H2)
```tsx
<h2 className="
  text-section-h2                                  // clamp(1.5rem, 4vw, 3rem)
  font-heading                                     // Playfair Display
  font-bold 
  text-gray-800
  mb-fluid-md
">
  From the Blog
</h2>
```

#### Section Description
```tsx
<p className="
  text-body-guideline                              // clamp(1rem, 1.5vw, 1.25rem)
  text-gray-600 
  max-w-2xl                                        // 672px max-width
  mx-auto
">
  Insights, stories, and tips from my journey in makeup artistry, festivals, and creative exploration.
</p>
```

---

### 2. Blog Post Cards

Each card displays a blog post preview:

#### Card Container
```tsx
<article className="
  bg-white                                         // White background
  rounded-xl                                       // Rounded corners
  overflow-hidden                                  // Clip image
  border border-gray-200                           // Subtle border
  shadow-lg hover:shadow-2xl                       // Elevation on hover
  transition-all duration-300                      // Smooth transitions
  group                                            // For group-hover effects
  flex flex-col                                    // Vertical layout
  h-full                                           // Full height for grid
">
```

#### Featured Image
```tsx
<div className="
  relative                                         // Position context
  w-full                                           // Full width
  aspect-video                                     // 16:9 ratio
  overflow-hidden                                  // Clip overflow
  bg-gray-100                                      // Loading state color
">
  <ImageWithFallback
    src={post.featuredImage?.url}
    alt={post.featuredImage?.alt || post.title}
    className="
      w-full h-full 
      object-cover                                 // Cover container
      group-hover:scale-105                        // Zoom on hover
      transition-transform duration-500            // Smooth zoom
    "
  />
</div>
```

#### Card Content
```tsx
<div className="
  p-fluid-md                                       // clamp(1rem, 0.8rem + 1vw, 1.5rem)
  flex flex-col 
  flex-1                                           // Fill remaining space
  gap-fluid-sm                                     // Space between elements
">
```

#### Metadata Row
```tsx
<div className="
  flex flex-wrap items-center 
  gap-3 
  text-sm 
  text-gray-500
">
  {/* Publication Date */}
  <div className="flex items-center gap-1">
    <Calendar className="w-4 h-4" />
    <time dateTime={post.publishedDate}>
      {formatDate(post.publishedDate)}
    </time>
  </div>
  
  {/* Reading Time */}
  <div className="flex items-center gap-1">
    <Clock className="w-4 h-4" />
    <span>{post.readingTime} min read</span>
  </div>
</div>
```

#### Category Badge
```tsx
{post.category && (
  <span className="
    inline-flex items-center gap-1 
    px-3 py-1 
    bg-gradient-pink-purple-blue                   // Brand gradient
    text-white 
    text-xs 
    font-medium 
    rounded-full
  ">
    <Tag className="w-3 h-3" />
    {post.category}
  </span>
)}
```

#### Post Title
```tsx
<h3 className="
  text-xl                                          // 20px
  font-heading                                     // Playfair Display
  font-bold 
  text-gray-800 
  group-hover:text-gradient-pink-purple-blue       // Gradient on hover
  transition-colors duration-300
  line-clamp-2                                     // Limit to 2 lines
">
  {post.title}
</h3>
```

#### Post Excerpt
```tsx
<p className="
  text-base                                        // 16px
  font-body 
  text-gray-600 
  leading-relaxed 
  line-clamp-3                                     // Limit to 3 lines
  flex-1                                           // Fill space
">
  {post.excerpt}
</p>
```

#### Read More Button
```tsx
<ReadMoreButton
  onClick={() => setCurrentPage('blogpost', post.slug)}
  className="
    inline-flex items-center gap-2 
    text-gradient-pink-purple-blue 
    font-medium 
    group-hover:gap-3                              // Expand gap on hover
    transition-all duration-300
  "
>
  Read More
  <ArrowRight className="w-4 h-4" />
</ReadMoreButton>
```

---

### 3. View All Button

#### Button Container
```tsx
<div className="
  text-center                                      // Center button
  mt-fluid-xl                                      // Top margin
">
```

#### CTA Button
```tsx
<button
  onClick={() => setCurrentPage('blog')}
  className="
    w-full sm:w-auto                               // Full width mobile
    bg-gradient-pink-purple-blue                   // Brand gradient
    hover:from-purple-700 hover:to-pink-700        // Hover gradient shift
    text-white 
    px-button                                      // clamp(1.5rem, 1rem + 2.5vw, 3rem)
    py-button                                      // clamp(0.75rem, 0.5rem + 1.25vw, 1.5rem)
    font-body 
    font-medium 
    text-button-fluid                              // clamp(1rem, 0.9rem + 0.5vw, 1.25rem)
    transition-all duration-300 
    rounded-lg 
    shadow-lg hover:shadow-xl 
    transform hover:scale-105 
    focus:outline-none 
    focus:ring-4 focus:ring-pink-200
  "
>
  View All Posts
</button>
```

---

## Data Integration

### Blog Posts Hook

```tsx
import { useBlogPosts } from '../../hooks/useContent';

// Fetch latest blog posts
const { posts, loading, error } = useBlogPosts();

// Get first 3 posts
const latestPosts = posts.slice(0, 3);
```

### Blog Post Structure

```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    alt: string;
  };
  publishedDate: string;
  category?: string;
  tags?: string[];
  readingTime: number;
  author?: {
    name: string;
    image?: string;
  };
}
```

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column grid (`grid-cols-1`)
- Full-width cards
- Stack vertically
- Full-width CTA button

### Tablet (768px - 1024px)
- Two column grid (`md:grid-cols-2`)
- Cards maintain aspect ratio
- Third card spans full width (if 3 posts)
- Auto-width CTA button

### Desktop (1024px+)
- Three column grid (`lg:grid-cols-3`)
- All cards same width
- Maximum container width (1280px)
- Full hover effects active

---

## Interactive Features

### 1. Navigation

Navigate to blog post or blog page:

```tsx
// To specific blog post
const handleReadMore = (slug: string) => {
  setCurrentPage('blogpost', slug);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// To blog archive
const handleViewAll = () => {
  setCurrentPage('blog');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

### 2. Card Hover Effects

Cards have interactive states:
```css
hover:shadow-2xl             /* Enhanced shadow */
group-hover:scale-105        /* Image zoom */
group-hover:text-gradient    /* Title gradient */
group-hover:gap-3            /* Button gap expand */
```

### 3. Loading States

Handle loading and error states:

```tsx
{loading && (
  <div className="text-center py-12">
    <p className="text-gray-600">Loading latest posts...</p>
  </div>
)}

{error && (
  <div className="text-center py-12">
    <p className="text-red-600">Error loading posts</p>
  </div>
)}

{!loading && posts.length === 0 && (
  <div className="text-center py-12">
    <p className="text-gray-600">No blog posts available yet.</p>
  </div>
)}
```

---

## Accessibility

### Semantic HTML
```tsx
<section aria-labelledby="blog-preview-heading">
  <h2 id="blog-preview-heading">From the Blog</h2>
  <div className="grid">
    <article>                      {/* Each card is an article */}
      <h3>Post Title</h3>
      <time dateTime={isoDate}>{formattedDate}</time>
    </article>
  </div>
</section>
```

### ARIA Labels
```tsx
// Read more button
<button
  onClick={() => handleReadMore(post.slug)}
  aria-label={`Read more about ${post.title}`}
>
  Read More
</button>

// View all button
<button
  onClick={handleViewAll}
  aria-label="View all blog posts"
>
  View All Posts
</button>
```

### Keyboard Navigation
- Tab through cards
- Enter/Space to activate buttons
- Logical tab order maintained
- Focus indicators visible

---

## Typography Scale

| Element | Class | Size (Mobile → Desktop) |
|---------|-------|------------------------|
| Section Title | `text-section-h2` | 24px → 48px |
| Description | `text-body-guideline` | 16px → 20px |
| Post Title | `text-xl` | 20px |
| Post Excerpt | `text-base` | 16px |
| Metadata | `text-sm` | 14px |
| Button Text | `text-button-fluid` | 16px → 20px |

---

## Color Palette

### Background
```css
bg-white                           /* Section background */
```

### Text Colors
```css
text-gray-800                      /* Titles */
text-gray-600                      /* Excerpts */
text-gray-500                      /* Metadata */
text-white                         /* Button & badge text */
```

### Card Styling
```css
bg-white                           /* Card background */
border-gray-200                    /* Card border */
```

### Accents
```css
bg-gradient-pink-purple-blue       /* Category badge & button */
text-gradient-pink-purple-blue     /* Title on hover */
```

---

## Best Practices

### 1. Limit Posts
```tsx
// ✅ Show only latest 3 posts
const latestPosts = posts.slice(0, 3);
```

### 2. Handle Empty States
```tsx
// ✅ Provide feedback for all states
{loading && <LoadingState />}
{error && <ErrorState />}
{!loading && posts.length === 0 && <EmptyState />}
```

### 3. Responsive Images
```tsx
// ✅ Use aspect-ratio utilities
<div className="aspect-video">
  <ImageWithFallback ... />
</div>
```

### 4. Consistent Spacing
```tsx
// ✅ Use fluid spacing tokens
py-section                         // Section padding
gap-fluid-lg                       // Grid gap
p-fluid-md                         // Card padding
```

---

## WordPress Comparison

### WordPress `core/latest-posts` Block
```html
<!-- wp:latest-posts {"postsToShow":3} /-->
```

### Ash Shaw BlogPreviewSection
```tsx
<section className="bg-white py-section px-fluid-md">
  <div className="max-w-7xl mx-auto">
    <h2>From the Blog</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
      {posts.slice(0, 3).map(post => (
        <article key={post.id}>
          <img src={post.image} alt={post.title} />
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <button onClick={() => navigate(post.slug)}>Read More</button>
        </article>
      ))}
    </div>
  </div>
</section>
```

---

## Related Documentation

- **[overview-sections.md](../overview-sections.md)** - Section system overview
- **[BlogCard.md](../components/BlogCard.md)** - Card component details (BlogPostCard)
- **[ReadMoreButton.md](../components/ReadMoreButton.md)** - Read more button
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing tokens

---

**Last Updated:** January 2025  
**Version:** 4.0.0