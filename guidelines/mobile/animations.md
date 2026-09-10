# Mobile Animation Guidelines

Animation rules and best practices for mobile devices, covering CSS vs JavaScript animations, performance optimization, and accessibility.

## Purpose

Define animation standards with:
- CSS vs JavaScript animation decision criteria
- Performance-optimized animation patterns
- Mobile-friendly timing and easing
- Reduced motion support
- Battery-conscious animations
- Touch interaction animations

---

## CSS vs JavaScript Animations

### When to Use CSS Animations

**✅ Use CSS for:**
- Simple transitions (hover, focus, active states)
- Enter/exit animations (fade in/out, slide in/out)
- Loading spinners and pulse effects
- Scroll-triggered animations (via intersection observer + CSS classes)
- Transform-based animations (translate, rotate, scale)
- Infinite looping animations

**Why CSS?**
- GPU-accelerated (runs on compositor thread)
- Better performance on mobile
- Runs even when JavaScript is blocked
- Simpler to maintain

```css
/* ✅ CORRECT - CSS for simple transitions */
.button {
  transition: all 300ms ease-out;
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* ✅ CORRECT - CSS for fade-in */
.fade-in {
  animation: fadeIn 500ms ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### When to Use JavaScript Animations

**✅ Use JavaScript for:**
- Complex multi-step sequences
- Physics-based animations (spring, momentum)
- Scroll-linked parallax effects
- Gesture-driven animations (drag, swipe)
- Animations that need precise control or dynamic values
- Coordinated animations across multiple elements

**Why JavaScript?**
- Full control over timing and sequencing
- Dynamic values based on user input
- Can respond to events mid-animation
- Better for complex orchestration

```tsx
// ✅ CORRECT - CSS classes for complex sequences (never use motion/react)
<div className="animate-slide-up">
  Content
</div>
```

```css
/* Define in /styles/globals.css */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Performance Rules

### 1. Animate Only Transform and Opacity

These properties are GPU-accelerated and don't trigger layout or paint.

```css
/* ✅ CORRECT - GPU-accelerated properties */
.element {
  transition: transform 300ms ease-out, opacity 300ms ease-out;
}

.element:hover {
  transform: translateY(-4px);
  opacity: 0.8;
}

/* ❌ WRONG - Triggers layout recalculation */
.element:hover {
  top: -4px;        /* Triggers layout */
  margin-left: 10px; /* Triggers layout */
  width: 200px;      /* Triggers layout + paint */
}
```

### 2. Use will-change Sparingly

```css
/* ✅ CORRECT - Apply only when needed */
.element:hover {
  will-change: transform;
}

.element {
  transition: transform 300ms ease-out;
}

/* Remove after animation */
.element:not(:hover) {
  will-change: auto;
}

/* ❌ WRONG - Always applied, wastes GPU memory */
.element {
  will-change: transform, opacity;  /* Don't set permanently */
}
```

### 3. Limit Concurrent Animations

```css
/* ✅ CORRECT - Stagger via CSS animation-delay, limit to first 6 */
.stagger-item {
  opacity: 0;
  animation: fade-in-up 0.4s ease-out forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.2s; }
.stagger-item:nth-child(4) { animation-delay: 0.3s; }
.stagger-item:nth-child(5) { animation-delay: 0.4s; }
.stagger-item:nth-child(6) { animation-delay: 0.5s; }
.stagger-item:nth-child(n+7) { animation-delay: 0s; opacity: 1; }
```

---

## Mobile-Optimized Timing

### Animation Duration Standards

```css
/* Micro-interactions */
--duration-instant: 100ms;   /* Checkbox checks, radio selects */
--duration-quick: 200ms;     /* Hover effects, focus rings */
--duration-normal: 300ms;    /* Standard transitions, button effects */
--duration-slow: 500ms;      /* Slide-ins, fade-ins, page transitions */
--duration-slower: 700ms;    /* Complex animations, modals */
```

**Mobile Adjustments:**
```css
/* Slightly faster on mobile for better responsiveness */
@media (max-width: 640px) {
  --duration-normal: 250ms;  /* 300ms → 250ms */
  --duration-slow: 400ms;    /* 500ms → 400ms */
  --duration-slower: 600ms;  /* 700ms → 600ms */
}
```

### Easing Functions

```css
/* Standard easing curves */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom curves */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);

/* Use ease-out for most UI animations */
.button {
  transition: transform 300ms var(--ease-out);
}
```

---

## Common Animation Patterns

### 1. Hover Effects (CSS)

```css
/* Button hover - scale + shadow */
.button {
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Card hover - lift + shadow */
.card {
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

/* Image zoom on hover */
.image-container {
  overflow: hidden;
}

.image {
  transition: transform 500ms ease-out;
}

.image-container:hover .image {
  transform: scale(1.1);
}
```

### 2. Fade In (CSS)

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 500ms ease-out forwards;
}

/* With slide up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 500ms ease-out forwards;
}
```

**React Implementation:**
```tsx
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  setIsVisible(true);
}, []);

<div className={`transition-all duration-500 ${
  isVisible 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-4'
}`}>
  Content
</div>
```

### 3. Slide In (CSS)

```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-in-right {
  animation: slideInRight 400ms ease-out forwards;
}

/* Mobile menu slide-in */
.mobile-menu {
  transform: translateX(-100%);
  transition: transform 300ms ease-out;
}

.mobile-menu.open {
  transform: translateX(0);
}
```

### 4. Loading Spinner (CSS)

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

### 5. Stagger Animation (CSS)

> **Note:** This project uses pure CSS animations (never `motion/react`).

```css
/* Stagger children with CSS animation-delay */
.stagger-container > * {
  opacity: 0;
  animation: stagger-fade-in 0.4s ease-out forwards;
}

.stagger-container > *:nth-child(1) { animation-delay: 0s; }
.stagger-container > *:nth-child(2) { animation-delay: 0.1s; }
.stagger-container > *:nth-child(3) { animation-delay: 0.1s; }
.stagger-container > *:nth-child(4) { animation-delay: 0.2s; }
.stagger-container > *:nth-child(5) { animation-delay: 0.2s; }
.stagger-container > *:nth-child(6) { animation-delay: 0.3s; }

@keyframes stagger-fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

```tsx
<div className="stagger-container">
  {items.map((item, i) => (
    <div key={i}>{item.content}</div>
  ))}
</div>
```

### 6. Modal Enter/Exit (CSS)

> **Note:** This project uses pure CSS animations (never `motion/react`).

```css
/* Modal overlay */
.modal-overlay {
  animation: modal-fade-in 0.2s ease-out;
}

/* Modal content */
.modal-content {
  animation: modal-scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-scale-in {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
```

```tsx
{isOpen && (
  <>
    {/* Backdrop */}
    <div className="modal-overlay" />

    {/* Modal */}
    <div className="modal-content">
      <div className="modal-card">
        Modal content
      </div>
    </div>
  </>
)}
```

---

## Scroll-Triggered Animations

### Intersection Observer + CSS Classes

```tsx
import { useEffect, useRef, useState } from 'react';

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Animate once
        }
      },
      { threshold: 0.1, ...options }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return { ref, isInView };
}

// Usage
function AnimatedSection() {
  const { ref, isInView } = useInView();
  
  return (
    <div 
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isInView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
        }
      `}
    >
      Content fades in when scrolled into view
    </div>
  );
}
```

### Parallax Scroll (CSS + JavaScript)

> **Note:** This project uses pure CSS animations (never `motion/react`).
> Parallax is achieved via scroll event listeners + CSS transforms.

```tsx
function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      ref.current.style.transform = `translateY(${scrolled * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="parallax-layer">
      Parallax content
    </div>
  );
}
```

---

## Touch Interaction Animations

### Tap/Press Effects

```css
/* Active state on touch */
.button {
  transition: transform 100ms ease-out;
}

.button:active {
  transform: scale(0.95);
}

/* Touch ripple effect */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.ripple {
  animation: ripple 600ms ease-out;
}
```

### Swipe Gestures (JavaScript + Touch Events)

> **Note:** This project uses pure CSS animations and native Touch Events
> (never `motion/react`). Use `touchstart`/`touchmove`/`touchend` for swipe.

```tsx
function SwipeableCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;

    if (Math.abs(diff) > 100) {
      handleSwipe(diff > 0 ? 'right' : 'left');
    }
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="swipeable-card"
    >
      Swipe me!
    </div>
  );
}
```

---

## Reduced Motion Support

### Respect User Preferences

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### JavaScript Detection

```tsx
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  return prefersReducedMotion;
}

// Usage — toggle CSS animation class based on preference
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={prefersReducedMotion ? '' : 'animate-fade-in-up'}>
      Content
    </div>
  );
}
```

---

## Battery-Conscious Animations

### Pause on Background

```tsx
function usePauseWhenHidden() {
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return isPaused;
}

// Usage - Pause carousel when tab hidden
function Carousel() {
  const isPaused = usePauseWhenHidden();
  
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused]);
}
```

### Reduce Animations on Low Battery

```tsx
function useLowBattery() {
  const [isLowBattery, setIsLowBattery] = useState(false);
  
  useEffect(() => {
    (navigator as any).getBattery?.().then((battery: any) => {
      const checkBattery = () => {
        setIsLowBattery(battery.level < 0.2 && !battery.charging);
      };
      
      checkBattery();
      battery.addEventListener('levelchange', checkBattery);
      battery.addEventListener('chargingchange', checkBattery);
    });
  }, []);
  
  return isLowBattery;
}

// Usage
function AnimatedElement() {
  const isLowBattery = useLowBattery();
  
  // Disable animations on low battery
  return (
    <div className={isLowBattery ? '' : 'animate-float'}>
      {isLowBattery ? 'Static content' : 'Animated content'}
    </div>
  );
}
```

---

## Common Mistakes

### ❌ Mistake 1: Animating Layout Properties

```css
/* ❌ WRONG - Triggers layout recalculation */
.element:hover {
  left: 10px;
  width: 200px;
  height: 100px;
}
```

**Solution:**
```css
/* ✅ CORRECT - GPU-accelerated */
.element:hover {
  transform: translateX(10px) scale(1.1);
}
```

### ❌ Mistake 2: No Reduced Motion Support

```css
/* ❌ WRONG - Ignores user preferences */
.spinner {
  animation: spin 2s linear infinite;
}
```

**Solution:**
```css
/* ✅ CORRECT - Respects preferences */
.spinner {
  animation: spin 2s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
}
```

### ❌ Mistake 3: Too Many Simultaneous Animations

```css
/* ❌ WRONG - 100 elements animating at once */
.grid-item {
  animation: fade-in-up 0.4s ease-out;
}
```

**Solution:**
```css
/* ✅ CORRECT - Only first 10 items animate, rest appear instantly */
.grid-item {
  opacity: 1;
}

.grid-item:nth-child(-n+10) {
  opacity: 0;
  animation: fade-in-up 0.4s ease-out forwards;
}

.grid-item:nth-child(1) { animation-delay: 0s; }
.grid-item:nth-child(2) { animation-delay: 0.05s; }
.grid-item:nth-child(3) { animation-delay: 0.1s; }
/* ... up to 10th child */
```