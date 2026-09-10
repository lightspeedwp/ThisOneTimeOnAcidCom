# BlogCard Component

**Version:** 4.0.0  
**Last Updated:** January 2025

---

## Purpose

The BlogCard is a **content preview block** for blog posts. It combines:
- Featured image display
- Post title and excerpt
- Publication metadata (date, reading time, category)
- Read more call-to-action
- Hover effects and transitions

---

## Block Structure

```tsx
<article className="[card-container]">
  {/* Featured Image */}
  <div className="[image-wrapper]">
    <img src={post.featuredImage.url} alt={post.title} />
  </div>
  
  {/* Card Content */}
  <div className="[content-container]">
    {/* Metadata Row */}
    <div className="[metadata]">
      <time dateTime={post.publishedDate}>
        {formatDate(post.publishedDate)}
      </time>
      <span>{post.readingTime} min read</span>
    </div>
    
    {/* Category Badge */}
    <span className="[category-badge]">{post.category}</span>
    
    {/* Title */}
    <h3 className="[title]">{post.title}</h3>
    
    {/* Excerpt */}
    <p className="[excerpt]">{post.excerpt}</p>
    
    {/* Read More Button */}
    <button onClick={() => navigate(post.slug)}>
      Read More <ArrowRight />
    </button>
  </div>
</article>
```

---

## Container Styles

### Card Container
```tsx
className="
  group
  bg-white
  rounded-xl
  overflow-hidden
  border border-gray-200
  shadow-lg hover:shadow-2xl
  transition-all duration-300
  flex flex-col
  h-full
"
```

### Image Wrapper
```tsx
className="
  relative
  w-full
  aspect-video                                     // 16:9 ratio
  overflow-hidden
  bg-gray-100
"
```

### Image
```tsx
className="
  w-full h-full
  object-cover
  group-hover:scale-105                            // Zoom on hover
  transition-transform duration-500
"
```

---

## Visual Elements

### 1. Metadata Row

```tsx
<div className="
  flex flex-wrap items-center
  gap-3
  text-sm text-gray-500
">
  {/* Date */}
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

### 2. Category Badge

```tsx
<span className="
  inline-flex items-center gap-1
  px-3 py-1
  bg-gradient-pink-purple-blue
  text-white
  text-xs font-medium
  rounded-full
">
  <Tag className="w-3 h-3" />
  {post.category}
</span>
```

### 3. Title

```tsx
<h3 className="
  text-xl
  font-heading font-bold
  text-gray-800
  group-hover:text-gradient-pink-purple-blue
  transition-colors duration-300
  line-clamp-2
">
  {post.title}
</h3>
```

### 4. Excerpt

```tsx
<p className="
  text-base
  font-body
  text-gray-600
  leading-relaxed
  line-clamp-3
  flex-1
">
  {post.excerpt}
</p>
```

### 5. Read More Button

```tsx
<button
  onClick={() => handleReadMore(post.slug)}
  className="
    inline-flex items-center gap-2
    text-gradient-pink-purple-blue
    font-medium
    group-hover:gap-3
    transition-all duration-300
  "
>
  Read More
  <ArrowRight className="w-4 h-4" />
</button>
```

---

## Accessibility

### Semantic HTML
```tsx
<article>
  <time dateTime={isoDate}>{formattedDate}</time>
  <h3>{title}</h3>
  <p>{excerpt}</p>
</article>
```

### ARIA Labels
```tsx
<button
  aria-label={`Read more about ${post.title}`}
  onClick={handleReadMore}
>
  Read More
</button>
```

---

## Typography Scale

| Element | Size |
|---------|------|
| Metadata | 14px |
| Category | 12px |
| Title | 20px |
| Excerpt | 16px |

---

## Related Documentation

- **[overview-blocks.md](../overview-blocks.md)** - Block system
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Colors
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing

---

**Last Updated:** January 2025  
**Version:** 4.0.0