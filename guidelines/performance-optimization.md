# Performance Optimization Guide

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Purpose:** Complete performance optimization implementation guide

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Code Splitting & Lazy Loading](#code-splitting--lazy-loading)
3. [Image Optimization](#image-optimization)
4. [Bundle Optimization](#bundle-optimization)
5. [Core Web Vitals](#core-web-vitals)
6. [Resource Hints](#resource-hints)
7. [Performance Monitoring](#performance-monitoring)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

### Performance Goals

**Lighthouse Score Targets:**
- ✅ Performance: 95+
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

**Core Web Vitals Targets:**
- ✅ LCP (Largest Contentful Paint): < 2.5s
- ✅ FID (First Input Delay): < 100ms
- ✅ CLS (Cumulative Layout Shift): < 0.1
- ✅ FCP (First Contentful Paint): < 1.8s
- ✅ TTFB (Time to First Byte): < 800ms

### Optimization Features Implemented

1. **Code Splitting**
   - React.lazy() with Suspense boundaries
   - Route-based code splitting
   - Component-level lazy loading
   - Vendor chunk optimization

2. **Image Optimization**
   - Native lazy loading
   - Intersection Observer fallback
   - Progressive image loading with blur-up
   - WebP format detection
   - Responsive image sizes

3. **Bundle Optimization**
   - Manual chunking strategy
   - Tree-shaking optimization
   - Minification with Terser
   - CSS code splitting
   - Asset optimization

4. **Core Web Vitals Monitoring**
   - Real-time metrics tracking
   - Performance analytics integration
   - Custom metric reporting
   - Memory usage monitoring

---

## 🔀 Code Splitting & Lazy Loading

### Route-Based Code Splitting

**Implemented in:** `/App.tsx`

```tsx
import { lazyLoad, LazyLoadWrapper } from './components/ui/LazyLoad';

// Lazy load page components
const HomePage = lazyLoad(() => import('./components/pages/HomePage'));
const AboutPage = lazyLoad(() => import('./components/pages/AboutPage'));
const BlogPage = lazyLoad(() => import('./components/pages/blog/BlogPage'));
const PortfolioPage = lazyLoad(() => import('./components/pages/portfolio/PortfolioMainPage'));

function App() {
  return (
    <LazyLoadWrapper fallback={<LoadingSpinner />}>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'portfolio' && <PortfolioPage />}
    </LazyLoadWrapper>
  );
}
```

### Component-Level Lazy Loading

```tsx
import { lazyLoad } from './components/ui/LazyLoad';

// Lazy load heavy components
const PortfolioLightbox = lazyLoad(() => import('./components/ui/PortfolioLightbox'));
const ContactForm = lazyLoad(() => import('./components/common/ContactForm'));

// Use with Suspense
<Suspense fallback={<LoadingSkeleton />}>
  <PortfolioLightbox {...props} />
</Suspense>
```

### Prefetching Components

```tsx
import { prefetchComponent, useRoutePrefetch } from './components/ui/LazyLoad';

// Prefetch on hover
<button 
  onMouseEnter={() => prefetchComponent(() => import('./BlogPage'))}
  onClick={() => navigate('blog')}
>
  Go to Blog
</button>

// Or use the hook
function Navigation() {
  const { handleLinkHover } = useRoutePrefetch({
    'blog': () => import('./pages/BlogPage'),
    'portfolio': () => import('./pages/PortfolioPage'),
  });

  return (
    <nav>
      <a 
        href="/blog" 
        onMouseEnter={() => handleLinkHover('blog')}
      >
        Blog
      </a>
    </nav>
  );
}
```

### Retry Mechanism

The `lazyLoad` function includes automatic retry with exponential backoff:

```tsx
// Retry up to 3 times with 1 second delay
const Component = lazyLoad(
  () => import('./Component'),
  3,    // retries
  1000  // delay in ms
);
```

---

## 🖼️ Image Optimization

### OptimizedImage Component

**Location:** `/components/ui/OptimizedImage.tsx`

**Features:**
- Native lazy loading with Intersection Observer fallback
- Progressive loading with blur-up effect
- Automatic WebP detection
- Error handling with fallback images
- Aspect ratio preservation (prevents CLS)

**Basic Usage:**

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={false}
/>
```

**With Progressive Loading:**

```tsx
<OptimizedImage
  src="/images/portfolio/image.jpg"
  alt="Portfolio image"
  width={1200}
  height={1600}
  blurDataURL="data:image/svg+xml;base64,..."
  fallbackSrc="/images/placeholder.jpg"
  onLoad={() => console.log('Image loaded')}
/>
```

**Priority Loading (Above-Fold):**

```tsx
// For hero images and above-fold content
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero"
  priority={true}  // Disables lazy loading
  width={1920}
  height={1080}
/>
```

### Image Preloading

```tsx
import { useImagePreload } from '@/components/ui/OptimizedImage';

function HeroSection() {
  // Preload critical images
  useImagePreload([
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.jpg',
  ]);

  return <div>Hero content</div>;
}
```

### Blur Data URL Generation

```tsx
import { generateBlurDataURL } from '@/components/ui/OptimizedImage';

// Generate placeholder SVG
const blurURL = generateBlurDataURL(10, 10);

<OptimizedImage
  src="/images/photo.jpg"
  alt="Photo"
  blurDataURL={blurURL}
/>
```

---

## 📦 Bundle Optimization

### Vite Configuration

**Location:** `/vite.config.ts`

**Manual Chunking Strategy:**

```typescript
manualChunks: {
  // Vendor chunks
  'vendor-react': ['react', 'react-dom'],
  'vendor-icons': ['lucide-react'],
  
  // Feature chunks
  'pages-blog': [
    './components/pages/blog/BlogPage.tsx',
    './components/pages/blog/BlogPostPage.tsx'
  ],
  'pages-portfolio': [
    './components/pages/portfolio/PortfolioPage.tsx',
    './components/pages/portfolio/PortfolioMainPage.tsx',
  ],
  'ui-components': [
    './components/ui/PortfolioCard.tsx',
    './components/ui/PortfolioLightbox.tsx',
  ],
}
```

### Asset Optimization

**Automatic asset organization:**
- Images: `assets/images/[name]-[hash][extname]`
- Fonts: `assets/fonts/[name]-[hash][extname]`
- CSS: `assets/css/[name]-[hash].css`
- JS: `assets/js/[name]-[hash].js`

### Minification Settings

```typescript
minify: 'terser',
terserOptions: {
  compress: {
    drop_console: true,      // Remove console.log in production
    drop_debugger: true,     // Remove debugger statements
    pure_funcs: ['console.info', 'console.debug'],
  },
  format: {
    comments: false,         // Remove all comments
  },
}
```

### CSS Code Splitting

```typescript
cssCodeSplit: true,  // Split CSS by route
```

### Asset Inlining

```typescript
assetsInlineLimit: 8192,  // Inline assets < 8KB as base64
```

---

## 📊 Core Web Vitals

### Web Vitals Tracking

**Location:** `/utils/webVitals.ts`

**Initialize tracking in App.tsx:**

```tsx
import { initWebVitals } from '@/utils/webVitals';

function App() {
  useEffect(() => {
    initWebVitals();
  }, []);

  return <div>App content</div>;
}
```

**Or use the hook:**

```tsx
import { useWebVitals } from '@/utils/webVitals';

function App() {
  useWebVitals();
  return <div>App content</div>;
}
```

### Custom Metric Reporting

**Override the report function:**

```tsx
import { reportWebVital } from '@/utils/webVitals';

// Send to Google Analytics
export function reportWebVital(metric) {
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
```

### Performance Snapshot

```tsx
import { getPerformanceSnapshot } from '@/utils/webVitals';

// Get current performance metrics
const metrics = getPerformanceSnapshot();
console.log('Performance:', metrics);

// Output:
// {
//   domContentLoaded: 234,
//   loadComplete: 456,
//   firstPaint: 123,
//   firstContentfulPaint: 234,
//   totalResources: 45,
//   memory: { usedJSHeapSize: 12345678, ... }
// }
```

### Custom Performance Monitoring

```tsx
import { performanceMonitor } from '@/utils/webVitals';

// Mark start
performanceMonitor.mark('component-render-start');

// ... component rendering ...

// Measure duration
const duration = performanceMonitor.measure(
  'component-render',
  'component-render-start'
);

console.log(`Component rendered in ${duration}ms`);

// Get elapsed time
const elapsed = performanceMonitor.getElapsed('component-render-start');
```

---

## 🔗 Resource Hints

### Preloading Critical Resources

**Location:** `/utils/performance.ts`

```tsx
import { 
  preloadResource, 
  prefetchResource, 
  preconnectOrigin,
  dnsPrefetch 
} from '@/utils/performance';

// Preload critical images (high priority)
preloadResource('/images/hero.jpg', 'image');

// Preload fonts
preloadResource('/fonts/inter.woff2', 'font', 'font/woff2');

// Prefetch next page resources (low priority)
prefetchResource('/pages/about.js');

// Preconnect to third-party origins
preconnectOrigin('https://fonts.googleapis.com', true);
preconnectOrigin('https://images.ctfassets.net', true);

// DNS prefetch for later use
dnsPrefetch('https://www.google-analytics.com');
```

### In index.html

```html
<head>
  <!-- Preconnect to CDNs -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://images.ctfassets.net" crossorigin>
  
  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- DNS prefetch for analytics -->
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
</head>
```

---

## ⚡ Performance Utilities

### Debouncing

```tsx
import { debounce } from '@/utils/performance';

// Debounce search input
const handleSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

<input onChange={(e) => handleSearch(e.target.value)} />
```

### Throttling

```tsx
import { throttle } from '@/utils/performance';

// Throttle scroll events
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);
```

### Idle Callback

```tsx
import { requestIdleCallbackPolyfill } from '@/utils/performance';

// Execute during idle time
const cancel = requestIdleCallbackPolyfill(() => {
  performNonCriticalTask();
}, { timeout: 2000 });

// Cancel if needed
cancel();
```

### Intersection Observer

```tsx
import { createIntersectionObserver } from '@/utils/performance';

const observer = createIntersectionObserver(
  (entry) => {
    console.log('Element is visible:', entry.target);
  },
  { rootMargin: '100px' }
);

observer.observe(element);
```

### Network-Aware Loading

```tsx
import { shouldReduceData, getNetworkInfo } from '@/utils/performance';

function Component() {
  const reduceData = shouldReduceData();
  
  return (
    <div>
      {reduceData ? (
        <img src="/images/low-res.jpg" alt="Low res" />
      ) : (
        <img src="/images/high-res.jpg" alt="High res" />
      )}
    </div>
  );
}

// Get connection info
const networkInfo = getNetworkInfo();
console.log('Network type:', networkInfo.effectiveType); // '4g', '3g', etc.
console.log('Save data mode:', networkInfo.saveData); // true/false
```

### DOM Batching

```tsx
import { domBatcher } from '@/utils/performance';

// Batch DOM operations to prevent layout thrashing
domBatcher.read(() => {
  const height = element.offsetHeight; // Read
  console.log(height);
});

domBatcher.write(() => {
  element.style.height = '100px'; // Write
});
```

---

## ✅ Best Practices

### 1. **Above-Fold Content**

```tsx
// Use priority loading for above-fold images
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero"
  priority={true}
  width={1920}
  height={1080}
/>

// Preload critical resources
preloadResource('/images/hero.jpg', 'image');
```

### 2. **Code Splitting**

```tsx
// Split by route
const HomePage = lazyLoad(() => import('./pages/HomePage'));
const BlogPage = lazyLoad(() => import('./pages/BlogPage'));

// Split heavy components
const Lightbox = lazyLoad(() => import('./components/Lightbox'));
```

### 3. **Image Optimization**

```tsx
// Always specify dimensions (prevents CLS)
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>

// Use progressive loading for large images
<OptimizedImage
  src="/large-image.jpg"
  alt="Large image"
  blurDataURL="data:image/svg+xml..."
/>
```

### 4. **Event Handlers**

```tsx
// Debounce expensive operations
const handleSearch = debounce(performSearch, 300);

// Throttle scroll/resize handlers
const handleScroll = throttle(updatePosition, 100);
```

### 5. **Memory Management**

```tsx
useEffect(() => {
  const handleResize = () => updateSize();
  window.addEventListener('resize', handleResize);
  
  // Clean up!
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

### 6. **Lazy Load Below-Fold**

```tsx
// Lazy load everything below the fold
<OptimizedImage
  src="/below-fold.jpg"
  alt="Below fold image"
  loading="lazy"
  priority={false}
/>
```

---

## 🐛 Troubleshooting

### Issue: Large Bundle Size

**Solution:**
1. Check bundle analyzer: `npm run build -- --analyze`
2. Review manual chunks in `vite.config.ts`
3. Ensure tree-shaking is working (check imports)
4. Lazy load heavy components

### Issue: Slow Initial Load

**Solution:**
1. Preload critical resources
2. Use priority loading for hero images
3. Inline critical CSS
4. Minimize above-fold JavaScript

### Issue: Poor LCP Score

**Solution:**
1. Optimize largest image
2. Use priority loading for LCP element
3. Preconnect to image CDN
4. Reduce render-blocking resources

### Issue: High CLS Score

**Solution:**
1. Always specify image dimensions
2. Reserve space for ads/embeds
3. Avoid inserting content above existing content
4. Use CSS `aspect-ratio` or padding-bottom trick

### Issue: Images Not Lazy Loading

**Solution:**
1. Check `loading="lazy"` attribute
2. Verify Intersection Observer polyfill
3. Ensure images are below fold
4. Check browser support

---

## 📈 Performance Checklist

### Build Time
- [ ] Configured manual chunking
- [ ] Enabled CSS code splitting
- [ ] Set up Terser minification
- [ ] Optimized asset organization
- [ ] Added source maps for debugging

### Runtime
- [ ] Implemented lazy loading for routes
- [ ] Added lazy loading for components
- [ ] Optimized images with OptimizedImage component
- [ ] Set up Core Web Vitals tracking
- [ ] Added resource hints (preload/prefetch)

### Monitoring
- [ ] Integrated Web Vitals tracking
- [ ] Set up analytics reporting
- [ ] Added performance markers
- [ ] Configured error tracking
- [ ] Set up real user monitoring (RUM)

### Testing
- [ ] Run Lighthouse audits
- [ ] Test on slow connections
- [ ] Verify mobile performance
- [ ] Check memory usage
- [ ] Test lazy loading behavior

---

## 📚 Additional Resources

### Internal Documentation
- [Guidelines.md](./Guidelines.md) - Main project guidelines
- [contentful-integration.md](./contentful-integration.md) - CMS integration
- [Data System Documentation](../data/README.md) - Mock data system

### External Resources
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [React Performance](https://react.dev/learn/render-and-commit)

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained by:** Ash Shaw Portfolio Team

For implementation support, see the utilities in `/utils/performance.ts` and `/utils/webVitals.ts`.