# Mobile Image Optimization Guidelines

Mobile-specific image optimization strategies for fast loading and optimal display on small screens.

## Purpose

Optimize images for mobile devices with:
- Responsive image sizing
- Lazy loading for performance
- Proper aspect ratios
- Hero image optimization
- Touch-friendly galleries
- Bandwidth-conscious loading
- WebP format support

---

## Core Principles

### 1. Serve Appropriately Sized Images

```tsx
// ❌ WRONG - Loading full desktop image on mobile
<img 
  src="/portfolio/festival-makeup-4k.jpg"  /* 3840x2160, 8MB */
  alt="Festival makeup"
/>

// ✅ CORRECT - Responsive image sources
<img 
  srcSet="
    /portfolio/festival-makeup-400w.webp 400w,
    /portfolio/festival-makeup-800w.webp 800w,
    /portfolio/festival-makeup-1200w.webp 1200w,
    /portfolio/festival-makeup-1600w.webp 1600w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="/portfolio/festival-makeup-800w.webp"
  alt="Festival makeup with UV accents"
/>
```

---

## Responsive Image Sizing

### Using srcset and sizes

```tsx
// Portfolio Card Image
<img 
  srcSet="
    /images/makeup-small.webp 400w,
    /images/makeup-medium.webp 800w,
    /images/makeup-large.webp 1200w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 768px) 50vw,
    33vw
  "
  src="/images/makeup-medium.webp"
  alt="Festival makeup look"
  className="w-full h-full object-cover"
/>

// Hero Image
<img 
  srcSet="
    /images/hero-mobile.webp 640w,
    /images/hero-tablet.webp 1024w,
    /images/hero-desktop.webp 1920w
  "
  sizes="100vw"
  src="/images/hero-tablet.webp"
  alt="Ash Shaw makeup artist hero"
  className="w-full h-auto"
/>
```

### Picture Element for Art Direction

```tsx
// Different images for mobile vs desktop
<picture>
  {/* Mobile: Portrait orientation */}
  <source 
    media="(max-width: 640px)"
    srcSet="/images/portrait-mobile.webp"
  />
  
  {/* Tablet: Square crop */}
  <source 
    media="(max-width: 1024px)"
    srcSet="/images/square-tablet.webp"
  />
  
  {/* Desktop: Landscape */}
  <img 
    src="/images/landscape-desktop.webp"
    alt="Festival makeup portfolio"
    className="w-full h-auto"
  />
</picture>
```

---

## Lazy Loading

### Native Lazy Loading

```tsx
// Basic lazy loading
<img 
  src="/portfolio/makeup-look.webp"
  alt="Editorial makeup"
  loading="lazy"
  className="w-full h-auto"
/>

// Eager loading for above-the-fold images
<img 
  src="/hero-image.webp"
  alt="Hero image"
  loading="eager"
  className="w-full h-auto"
/>
```

### Implementation Patterns

```tsx
// Portfolio Gallery - Lazy load all images
function PortfolioGallery({ entries }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {entries.map((entry, index) => (
        <div key={entry.id} className="aspect-square overflow-hidden rounded-lg">
          <img 
            src={entry.image}
            alt={entry.title}
            loading={index < 6 ? 'eager' : 'lazy'}  /* First 6 eager */
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

// Blog Post - Lazy load in-content images
function BlogPost({ post }: Props) {
  return (
    <article className="prose max-w-none">
      <img 
        src={post.featuredImage}
        alt={post.title}
        loading="eager"  /* Featured image loads immediately */
        className="w-full rounded-2xl mb-8"
      />
      
      <div className="content">
        {/* All other images lazy load */}
        <img 
          src={post.contentImage}
          alt="Step 1"
          loading="lazy"
        />
      </div>
    </article>
  );
}
```

---

## Aspect Ratios

### Consistent Aspect Ratios

```tsx
// Portfolio Grid - Square
<div className="aspect-square overflow-hidden rounded-lg">
  <img 
    src={image}
    alt={alt}
    className="w-full h-full object-cover"
  />
</div>

// Blog Card - 16:9
<div className="aspect-[16/9] overflow-hidden rounded-lg">
  <img 
    src={image}
    alt={alt}
    className="w-full h-full object-cover"
  />
</div>

// Portrait - 4:5 (Instagram style)
<div className="aspect-[4/5] overflow-hidden rounded-lg">
  <img 
    src={image}
    alt={alt}
    className="w-full h-full object-cover"
  />
</div>

// Wide - 21:9 (Cinematic)
<div className="aspect-[21/9] overflow-hidden rounded-lg">
  <img 
    src={image}
    alt={alt}
    className="w-full h-full object-cover"
  />
</div>
```

### Preventing Layout Shift

```tsx
// ❌ WRONG - No dimensions, causes layout shift
<img src={image} alt={alt} />

// ✅ CORRECT - Explicit aspect ratio
<div className="aspect-[4/3] bg-gray-100">
  <img 
    src={image}
    alt={alt}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>

// With width/height attributes
<img 
  src={image}
  alt={alt}
  width={800}
  height={600}
  className="w-full h-auto"
  loading="lazy"
/>
```

---

## Hero Images

### Mobile Hero Optimization

```tsx
function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] overflow-hidden">
      {/* Background Image */}
      <picture>
        {/* Mobile: Smaller, optimized image */}
        <source 
          media="(max-width: 640px)"
          srcSet="
            /hero-mobile-400w.webp 400w,
            /hero-mobile-640w.webp 640w
          "
          sizes="100vw"
        />
        
        {/* Tablet */}
        <source 
          media="(max-width: 1024px)"
          srcSet="
            /hero-tablet-800w.webp 800w,
            /hero-tablet-1024w.webp 1024w
          "
          sizes="100vw"
        />
        
        {/* Desktop */}
        <img 
          src="/hero-desktop-1920w.webp"
          srcSet="
            /hero-desktop-1920w.webp 1920w,
            /hero-desktop-2560w.webp 2560w
          "
          sizes="100vw"
          alt="Ash Shaw makeup artistry"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
      </picture>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <h1 className="text-4xl md:text-6xl font-title font-bold text-white text-center">
          Ash Shaw
        </h1>
      </div>
    </section>
  );
}
```

### Performance Priority

```tsx
// High priority hero image
<img 
  src="/hero.webp"
  alt="Hero"
  loading="eager"
  fetchpriority="high"  /* Tells browser this is critical */
  className="w-full h-auto"
/>

// Preload critical hero image in <head>
<link 
  rel="preload"
  as="image"
  href="/hero-mobile.webp"
  media="(max-width: 640px)"
/>
```

---

## Touch-Friendly Galleries

### Mobile Gallery Patterns

```tsx
// Horizontal Scroll Gallery
function HorizontalGallery({ images }: Props) {
  return (
    <div className="overflow-x-auto -mx-6 px-6 py-4">
      <div className="flex gap-4 min-w-max">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="flex-shrink-0 w-64 aspect-square rounded-lg overflow-hidden"
          >
            <img 
              src={image.thumbnail}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Grid with Touch Targets
function TouchGallery({ images }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => openLightbox(index)}
          className="
            aspect-square overflow-hidden rounded-lg
            min-h-[120px] min-w-[120px]  /* Touch-friendly size */
            active:scale-95 transition-transform
          "
        >
          <img 
            src={image.thumbnail}
            alt={image.alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
```

---

## Image Formats

### WebP with Fallbacks

```tsx
// Modern browsers: WebP, Fallback: JPEG
<picture>
  <source 
    type="image/webp"
    srcSet="
      /makeup-400w.webp 400w,
      /makeup-800w.webp 800w
    "
  />
  <source 
    type="image/jpeg"
    srcSet="
      /makeup-400w.jpg 400w,
      /makeup-800w.jpg 800w
    "
  />
  <img 
    src="/makeup-800w.jpg"
    alt="Makeup look"
    loading="lazy"
  />
</picture>
```

### AVIF for Maximum Compression

```tsx
// Next-gen format with fallbacks
<picture>
  {/* AVIF - Best compression */}
  <source 
    type="image/avif"
    srcSet="/makeup-800w.avif"
  />
  
  {/* WebP - Good compression, wide support */}
  <source 
    type="image/webp"
    srcSet="/makeup-800w.webp"
  />
  
  {/* JPEG - Universal fallback */}
  <img 
    src="/makeup-800w.jpg"
    alt="Makeup look"
    loading="lazy"
  />
</picture>
```

---

## Placeholder Strategies

### Low-Quality Image Placeholder (LQIP)

```tsx
function ImageWithPlaceholder({ src, alt, placeholder }: Props) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative aspect-square">
      {/* Blurred placeholder */}
      <img 
        src={placeholder}  /* Tiny 20x20 image */
        alt=""
        aria-hidden="true"
        className={`
          absolute inset-0 w-full h-full object-cover blur-xl
          transition-opacity duration-300
          ${loaded ? 'opacity-0' : 'opacity-100'}
        `}
      />
      
      {/* Full image */}
      <img 
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-full object-cover
          transition-opacity duration-300
          ${loaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}
```

### Skeleton Loader

```tsx
function ImageSkeleton({ loaded }: { loaded: boolean }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img 
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
```

---

## Bandwidth Optimization

### Save Data API

```tsx
function ResponsiveImage({ highRes, lowRes, alt }: Props) {
  // Check if user has data saver enabled
  const saveData = navigator.connection?.saveData || false;
  
  return (
    <img 
      src={saveData ? lowRes : highRes}
      alt={alt}
      loading="lazy"
      className="w-full h-auto"
    />
  );
}
```

### Connection-Aware Loading

```tsx
function AdaptiveImage({ src, alt }: Props) {
  const [quality, setQuality] = useState('high');
  
  useEffect(() => {
    // Check connection type
    const connection = (navigator as any).connection;
    
    if (connection) {
      if (connection.effectiveType === '4g') {
        setQuality('high');
      } else if (connection.effectiveType === '3g') {
        setQuality('medium');
      } else {
        setQuality('low');
      }
    }
  }, []);
  
  const imageSrc = {
    high: `${src}-high.webp`,
    medium: `${src}-medium.webp`,
    low: `${src}-low.webp`
  };
  
  return (
    <img 
      src={imageSrc[quality]}
      alt={alt}
      loading="lazy"
    />
  );
}
```

---

## Common Patterns

### Portfolio Card Image

```tsx
function PortfolioCard({ entry }: Props) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg">
      {/* Featured Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          srcSet="
            ${entry.image}-400w.webp 400w,
            ${entry.image}-800w.webp 800w
          "
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={`${entry.image}-800w.webp`}
          alt={entry.title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold">
          {entry.title}
        </h3>
      </div>
    </article>
  );
}
```

### Blog Featured Image

```tsx
function BlogFeaturedImage({ post }: Props) {
  return (
    <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl mb-8">
      <picture>
        {/* Mobile: 16:9 crop */}
        <source 
          media="(max-width: 640px)"
          srcSet="
            ${post.image}-mobile-400w.webp 400w,
            ${post.image}-mobile-640w.webp 640w
          "
        />
        
        {/* Desktop: 21:9 wide crop */}
        <img 
          src={`${post.image}-desktop-1200w.webp`}
          srcSet="
            ${post.image}-desktop-1200w.webp 1200w,
            ${post.image}-desktop-1600w.webp 1600w
          "
          sizes="(max-width: 1024px) 100vw, 1200px"
          alt={post.title}
          loading="eager"
          className="w-full h-full object-cover"
        />
      </picture>
    </div>
  );
}
```

### Avatar Images

```tsx
function Avatar({ user }: Props) {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
      <img 
        src={`${user.avatar}?w=96&h=96`}  /* Request exact size */
        srcSet="
          ${user.avatar}?w=48&h=48 1x,
          ${user.avatar}?w=96&h=96 2x
        "
        alt={user.name}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
```

---

## Common Mistakes

### ❌ Mistake 1: No Lazy Loading

```tsx
// ❌ WRONG - All images load immediately
<img src="/large-image.jpg" alt="Portfolio" />
```

**Solution:**
```tsx
// ✅ CORRECT - Lazy load off-screen images
<img 
  src="/large-image.jpg" 
  alt="Portfolio"
  loading="lazy"
/>
```

### ❌ Mistake 2: Single Large Image

```tsx
// ❌ WRONG - 5MB desktop image on mobile
<img src="/desktop-4k.jpg" alt="Hero" />
```

**Solution:**
```tsx
// ✅ CORRECT - Responsive sources
<img 
  srcSet="
    /mobile-640w.webp 640w,
    /tablet-1024w.webp 1024w,
    /desktop-1920w.webp 1920w
  "
  sizes="100vw"
  src="/tablet-1024w.webp"
  alt="Hero"
/>
```

### ❌ Mistake 3: No Aspect Ratio

```tsx
// ❌ WRONG - Layout shift when image loads
<img src={image} alt={alt} className="w-full" />
```

**Solution:**
```tsx
// ✅ CORRECT - Reserved space prevents shift
<div className="aspect-square">
  <img 
    src={image}
    alt={alt}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

---

## Testing Checklist

### Mobile Image Testing

- [ ] Images load quickly on 3G connection
- [ ] No layout shift when images load (CLS < 0.1)
- [ ] Appropriate image sizes for mobile screens
- [ ] WebP format served to supporting browsers
- [ ] Hero images load first (fetchpriority="high")
- [ ] Below-fold images lazy load
- [ ] Images look sharp on retina displays (2x srcset)
- [ ] Touch targets on gallery images are 44x44px minimum

### Performance Metrics

Target metrics:
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total Image Weight:** < 500KB on initial load

---

## Related Documentation

- **[mobile/performance.md](./performance.md)** - Performance optimization
- **[mobile/typography.md](./typography.md)** - Mobile typography
- **[components/ImageGallery.md](../components/ImageGallery.md)** - Gallery component
- **[components/Lightbox.md](../components/Lightbox.md)** - Image viewer

---

**Last Updated:** January 2025  
**Version:** 3.2.0
