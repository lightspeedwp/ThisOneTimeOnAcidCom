# Mobile Performance Guidelines

Mobile-specific performance optimization strategies for fast, smooth experiences on all devices and networks.

## Purpose

Optimize mobile performance with:
- Fast initial page load
- Smooth animations and transitions
- Efficient JavaScript execution
- 3G network support
- Battery-conscious operations
- Memory optimization
- Core Web Vitals optimization

---

## Core Web Vitals Targets

### Mobile-Specific Targets

```
Largest Contentful Paint (LCP): < 2.5s
First Input Delay (FID): < 100ms
Cumulative Layout Shift (CLS): < 0.1
First Contentful Paint (FCP): < 1.8s
Time to Interactive (TTI): < 3.8s
```

---

## Image Optimization

### Responsive Images

```tsx
// ✅ Properly sized images for mobile
<img 
  srcSet="
    /makeup-400w.webp 400w,
    /makeup-800w.webp 800w,
    /makeup-1200w.webp 1200w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="/makeup-800w.webp"
  alt="Festival makeup"
  loading="lazy"
  decoding="async"
/>
```

### Image Format Strategy

```
Priority Order:
1. AVIF (best compression, ~50% smaller than JPEG)
2. WebP (good compression, ~30% smaller than JPEG)
3. JPEG/PNG (fallback)
```

```tsx
<picture>
  <source type="image/avif" srcSet="/image.avif" />
  <source type="image/webp" srcSet="/image.webp" />
  <img src="/image.jpg" alt="Fallback" />
</picture>
```

### Critical Images

```tsx
// Hero image - load immediately
<link 
  rel="preload"
  as="image"
  href="/hero-mobile.webp"
  media="(max-width: 640px)"
/>

<img 
  src="/hero-mobile.webp"
  alt="Hero"
  loading="eager"
  fetchpriority="high"
/>
```

---

## Animation Optimization

### Use Transform Instead of Position

```css
/* ❌ WRONG - Triggers layout recalculation */
.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { left: -100px; }
  to { left: 0; }
}

/* ✅ CORRECT - GPU accelerated */
.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}
```

### Throttle Scroll Animations

```tsx
import { useEffect, useState } from 'react';

function useThrottledScroll(delay: number = 100) {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollY(window.scrollY);
      }, delay);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [delay]);
  
  return scrollY;
}

// Usage
function Header() {
  const scrollY = useThrottledScroll(100);
  const isScrolled = scrollY > 50;
  
  return (
    <header className={`
      transition-all duration-300
      ${isScrolled ? 'bg-white/95 shadow-md' : 'bg-transparent'}
    `}>
      {/* Header content */}
    </header>
  );
}
```

### Reduce Motion for Accessibility

> **Note:** This project uses pure CSS animations (never `motion/react`).
> Reduced motion is handled entirely in CSS via `@media (prefers-reduced-motion: reduce)`.

```tsx
// React implementation — uses CSS classes, not motion/react
function AnimatedComponent() {
  return (
    <div className="animate-fade-in-up">
      Content
    </div>
  );
}
```

```css
/* CSS handles reduced motion automatically */
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none;
  }
}
```

---

## JavaScript Optimization

### Code Splitting

```tsx
// ❌ WRONG - Load everything upfront
import { Lightbox } from './components/Lightbox';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';

// ✅ CORRECT - Lazy load heavy components
const Lightbox = lazy(() => import('./components/Lightbox'));
const Modal = lazy(() => import('./components/Modal'));
const ContactForm = lazy(() => import('./components/ContactForm'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {showLightbox && <Lightbox />}
      {showModal && <Modal />}
    </Suspense>
  );
}
```

### Debounce Expensive Operations

```tsx
import { useMemo, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage - Search with debounce
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    if (debouncedSearch) {
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input 
      type="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Virtualize Long Lists

```tsx
// For long lists (100+ items), use virtualization
import { FixedSizeList } from 'react-window';

function PortfolioList({ entries }: Props) {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      <PortfolioCard entry={entries[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={entries.length}
      itemSize={300}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

## 3G Network Support

### Connection-Aware Loading

```tsx
function useNetworkStatus() {
  const [effectiveType, setEffectiveType] = useState('4g');
  
  useEffect(() => {
    const connection = (navigator as any).connection;
    
    if (connection) {
      setEffectiveType(connection.effectiveType);
      
      connection.addEventListener('change', () => {
        setEffectiveType(connection.effectiveType);
      });
    }
  }, []);
  
  return effectiveType;
}

// Usage
function AdaptiveContent() {
  const networkType = useNetworkStatus();
  const isSlowNetwork = ['slow-2g', '2g', '3g'].includes(networkType);
  
  return (
    <div>
      {isSlowNetwork ? (
        <LowResImage />
      ) : (
        <HighResImage />
      )}
    </div>
  );
}
```

### Save Data Mode

```tsx
function useSaveData() {
  return (navigator as any).connection?.saveData || false;
}

function ResponsiveMedia() {
  const saveData = useSaveData();
  
  if (saveData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          Video hidden to save data
        </p>
        <button className="text-pink-600 underline">
          Load video
        </button>
      </div>
    );
  }
  
  return <VideoPlayer />;
}
```

### Progressive Enhancement

```tsx
// Load basic content first, enhance later
function PortfolioPage() {
  const [enhanced, setEnhanced] = useState(false);
  
  useEffect(() => {
    // Wait for page to be interactive
    if (document.readyState === 'complete') {
      setEnhanced(true);
    } else {
      window.addEventListener('load', () => setEnhanced(true));
    }
  }, []);
  
  return (
    <div>
      {/* Core content always loads */}
      <BasicPortfolioGrid entries={entries} />
      
      {/* Enhanced features load after initial paint */}
      {enhanced && (
        <>
          <FilterControls />
          <LightboxGallery />
        </>
      )}
    </div>
  );
}
```

---

## Battery Optimization

### Reduce Animation on Low Battery

```tsx
function useBatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState(1);
  
  useEffect(() => {
    (navigator as any).getBattery?.().then((battery: any) => {
      setBatteryLevel(battery.level);
      
      battery.addEventListener('levelchange', () => {
        setBatteryLevel(battery.level);
      });
    });
  }, []);
  
  return batteryLevel;
}

function AnimatedComponent() {
  const batteryLevel = useBatteryStatus();
  const isLowBattery = batteryLevel < 0.2;
  
  return (
    <div className={isLowBattery ? '' : 'animate-float'}>
      Content
    </div>
  );
}
```

```css
/* Pure CSS float animation — disabled at low battery via JS class toggle */
.animate-float {
  animation: float 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-float { animation: none; }
}
```

### Pause Background Tasks

```tsx
function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return isVisible;
}

// Usage - Pause carousel when tab not visible
function Carousel({ images }: Props) {
  const isVisible = usePageVisibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;  // Don't auto-advance when hidden
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible, images.length]);
  
  return <CarouselView currentIndex={currentIndex} />;
}
```

---

## Memory Optimization

### Cleanup Event Listeners

```tsx
// ❌ WRONG - Memory leak
function Component() {
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Missing cleanup!
  }, []);
}

// ✅ CORRECT - Proper cleanup
function Component() {
  useEffect(() => {
    const handleResize = () => {
      // Handle resize
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
}
```

### Unload Large Objects

```tsx
function ImageGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Clear selected image when component unmounts
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);
  
  return (
    <div>
      {/* Gallery content */}
    </div>
  );
}
```

### Limit Concurrent Requests

```tsx
// Limit image loading to 3 concurrent requests
class ImageLoader {
  private queue: Array<() => Promise<void>> = [];
  private active = 0;
  private maxConcurrent = 3;
  
  async load(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const task = async () => {
        this.active++;
        
        const img = new Image();
        img.onload = () => {
          this.active--;
          this.processQueue();
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      };
      
      if (this.active < this.maxConcurrent) {
        task();
      } else {
        this.queue.push(task);
      }
    });
  }
  
  private processQueue() {
    if (this.queue.length > 0 && this.active < this.maxConcurrent) {
      const task = this.queue.shift();
      task?.();
    }
  }
}
```

---

## Resource Hints

### Preload Critical Assets

```html
<!-- In <head> -->
<!-- Preload hero image -->
<link 
  rel="preload"
  as="image"
  href="/hero-mobile.webp"
  media="(max-width: 640px)"
/>

<!-- Preload critical CSS -->
<link 
  rel="preload"
  as="style"
  href="/styles/critical.css"
/>

<!-- Preload font -->
<link 
  rel="preload"
  as="font"
  href="/fonts/inter-var.woff2"
  type="font/woff2"
  crossorigin
/>
```

### DNS Prefetch for External Resources

```html
<!-- Prefetch external domains -->
<link rel="dns-prefetch" href="https://images.contentful.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />

<!-- Preconnect for critical third parties -->
<link rel="preconnect" href="https://images.contentful.com" crossorigin />
```

---

## Performance Monitoring

### Custom Performance Marks

```tsx
function PortfolioPage() {
  useEffect(() => {
    // Mark when portfolio starts loading
    performance.mark('portfolio-load-start');
    
    fetchPortfolio().then(() => {
      // Mark when portfolio finishes loading
      performance.mark('portfolio-load-end');
      
      // Measure the duration
      performance.measure(
        'portfolio-load',
        'portfolio-load-start',
        'portfolio-load-end'
      );
      
      // Get the measurement
      const measure = performance.getEntriesByName('portfolio-load')[0];
      console.log(`Portfolio loaded in ${measure.duration}ms`);
    });
  }, []);
  
  return <PortfolioContent />;
}
```

### Web Vitals Reporting

```tsx
import { getCLS, getFID, getLCP } from 'web-vitals';

function reportWebVitals() {
  getCLS(console.log);  // Cumulative Layout Shift
  getFID(console.log);  // First Input Delay
  getLCP(console.log);  // Largest Contentful Paint
}

// Call on app initialization
reportWebVitals();
```

---

## Common Performance Patterns

### Optimized Portfolio Grid

```tsx
function OptimizedPortfolio({ entries }: Props) {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  
  // Only render current page
  const visibleEntries = entries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleEntries.map((entry, index) => (
          <PortfolioCard
            key={entry.id}
            entry={entry}
            loading={index < 3 ? 'eager' : 'lazy'}  /* First row eager */
          />
        ))}
      </div>
      
      <Pagination 
        currentPage={page}
        totalPages={Math.ceil(entries.length / ITEMS_PER_PAGE)}
        onPageChange={setPage}
      />
    </>
  );
}
```

### Optimized Blog Post

```tsx
function BlogPost({ post }: Props) {
  return (
    <article>
      {/* Featured image - high priority */}
      <img 
        src={post.featuredImage}
        alt={post.title}
        loading="eager"
        fetchpriority="high"
        className="w-full aspect-[16/9] object-cover rounded-2xl mb-8"
      />
      
      {/* Content */}
      <div className="prose max-w-none">
        {/* Lazy load content images */}
        <LazyLoadImages content={post.content} />
      </div>
      
      {/* Related posts - load below fold */}
      <Suspense fallback={<LoadingSpinner />}>
        <RelatedPosts category={post.category} />
      </Suspense>
    </article>
  );
}
```

---

## Testing Checklist

### Mobile Performance Testing

- [ ] Test on real devices (iPhone SE, Samsung Galaxy A series)
- [ ] Throttle to 3G network in DevTools
- [ ] Check Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Verify images are properly sized (not oversized)
- [ ] Check for memory leaks (DevTools Memory tab)
- [ ] Test with reduced motion preference enabled
- [ ] Verify animations are smooth (60fps)
- [ ] Test on low battery mode

### Performance Budgets

```
Initial Load (3G):
- HTML: < 50KB (compressed)
- CSS: < 50KB (compressed)
- JavaScript: < 150KB (compressed)
- Images: < 200KB
- Total: < 500KB

Target Metrics:
- Time to Interactive: < 3.8s
- First Contentful Paint: < 1.8s
- Speed Index: < 3.4s
```

---

## Tools

### Recommended Testing Tools

1. **Chrome DevTools**
   - Network throttling (3G simulation)
   - Performance profiling
   - Memory leak detection

2. **Lighthouse**
   - Mobile performance audits
   - Accessibility checks
   - Best practices validation

3. **WebPageTest**
   - Real device testing
   - Video comparison
   - Detailed waterfall charts

4. **Real Device Testing**
   - BrowserStack
   - Physical devices (iPhone SE, Android mid-range)

---

## Common Mistakes

### ❌ Mistake 1: No Lazy Loading

```tsx
// ❌ WRONG - All images load immediately
{entries.map(entry => (
  <img src={entry.image} alt={entry.title} />
))}
```

**Solution:**
```tsx
// ✅ CORRECT - Lazy load below-fold images
{entries.map((entry, index) => (
  <img 
    src={entry.image}
    alt={entry.title}
    loading={index < 3 ? 'eager' : 'lazy'}
  />
))}
```

### ❌ Mistake 2: Animating Expensive Properties

```tsx
// ❌ WRONG - Triggers repaints
<div style={{ left: position }}>Content</div>
```

**Solution:**
```tsx
// ✅ CORRECT - GPU accelerated
<div style={{ transform: `translateX(${position}px)` }}>
  Content
</div>
```

### ❌ Mistake 3: No Code Splitting

```tsx
// ❌ WRONG - Everything in main bundle
import { Lightbox } from './Lightbox';
import { Modal } from './Modal';
```

**Solution:**
```tsx
// ✅ CORRECT - Lazy load heavy components
const Lightbox = lazy(() => import('./Lightbox'));
const Modal = lazy(() => import('./Modal'));
```

---

## Related Documentation

- **[mobile/images.md](./images.md)** - Image optimization
- **[mobile/typography.md](./typography.md)** - Typography rules
- **[mobile/forms.md](./forms.md)** - Form patterns

---

**Last Updated:** January 2025  
**Version:** 3.2.0