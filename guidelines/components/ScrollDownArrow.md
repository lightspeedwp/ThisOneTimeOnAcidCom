# ScrollDownArrow Component

**Version:** 4.0.0  
**Last Updated:** January 2025

An animated scroll indicator that guides users to scroll down and see more content. Commonly used in hero sections to improve user experience and content discoverability.

## Purpose

Provide visual guidance for users to scroll down with:
- Smooth animated bounce effect
- Scroll-to-target functionality
- Responsive visibility (hidden after user scrolls)
- Accessibility compliance

---

## Usage

### Basic Usage

```tsx
import { ScrollDownArrow } from './components/ui/ScrollDownArrow';

<ScrollDownArrow targetId="featured-section" />
```

### In Hero Section

```tsx
import { HeroLayout } from './components/sections/HeroLayout';
import { ScrollDownArrow } from './components/ui/ScrollDownArrow';

function HeroSection() {
  return (
    <HeroLayout
      title="Hi, I'm Ash Shaw"
      subtitle="Makeup Artist & Creative"
    >
      <p className="text-body-guideline font-body text-center lg:text-left mb-fluid-lg">
        Makeup that shines with colour, energy, and connection.
      </p>
      
      <div className="flex justify-center lg:justify-start gap-4 mb-8">
        <button className="btn-primary">Explore Portfolio</button>
        <button className="btn-secondary">Read My Story</button>
      </div>
      
      {/* Scroll indicator at bottom of hero */}
      <ScrollDownArrow targetId="featured-section" />
    </HeroLayout>
  );
}
```

### Custom Styling

```tsx
<ScrollDownArrow 
  targetId="content"
  className="text-pink-500"
  arrowSize={32}
/>
```

---

## Props

```typescript
interface ScrollDownArrowProps {
  /**
   * ID of the target element to scroll to
   * @required
   * @example "featured-section"
   */
  targetId: string;
  
  /**
   * Additional CSS classes for customization
   * @default ""
   * @example "text-pink-500 opacity-80"
   */
  className?: string;
  
  /**
   * Size of the arrow icon in pixels
   * @default 24
   */
  arrowSize?: number;
  
  /**
   * Custom aria-label for accessibility
   * @default "Scroll down to see more content"
   */
  ariaLabel?: string;
  
  /**
   * Animation duration in seconds
   * @default 2
   */
  animationDuration?: number;
}
```

---

## Features

### Smooth Scroll Animation

```typescript
const scrollToTarget = () => {
  const targetElement = document.getElementById(targetId);
  
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};
```

### Bounce Animation

The arrow uses a continuous bounce animation to attract attention:

```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
```

### Auto-Hide on Scroll

```typescript
const [isVisible, setIsVisible] = useState(true);

useEffect(() => {
  const handleScroll = () => {
    // Hide arrow after user scrolls 100px
    setIsVisible(window.scrollY < 100);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## Styling

### Default Styling

```tsx
<ScrollDownArrow 
  targetId="content"
  className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
/>
```

### Brand Colors

```tsx
// Primary gradient color
<ScrollDownArrow 
  targetId="content"
  className="text-gradient-pink-purple-blue"
/>

// Secondary color
<ScrollDownArrow 
  targetId="content"
  className="text-purple-600 hover:text-pink-600"
/>
```

### With Background Circle

```tsx
<div className="flex justify-center">
  <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
    <ScrollDownArrow 
      targetId="content"
      arrowSize={20}
      className="text-pink-500"
    />
  </div>
</div>
```

### On Dark Backgrounds

```tsx
<ScrollDownArrow 
  targetId="content"
  className="text-white opacity-80 hover:opacity-100"
/>
```

---

## Common Patterns

### Hero Section with Multiple CTAs

```tsx
import { ScrollDownArrow } from './components/ui/ScrollDownArrow';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue mb-fluid-md">
          Hi, I'm Ash Shaw
        </h1>
        
        <p className="text-body-guideline font-body text-gray-700 mb-fluid-lg">
          Makeup that shines with colour, energy, and connection.
        </p>
        
        <div className="flex justify-center gap-4 mb-12">
          <button className="btn-primary">Explore Portfolio</button>
          <button className="btn-secondary">Contact Me</button>
        </div>
      </div>
      
      {/* Positioned at bottom of hero */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollDownArrow targetId="featured-section" />
      </div>
    </section>
  );
}
```

### With Text Label

```tsx
<div className="flex flex-col items-center gap-2">
  <span className="text-fluid-sm font-body text-gray-600">
    Scroll to explore
  </span>
  <ScrollDownArrow targetId="content" />
</div>
```

### Responsive Visibility

```tsx
function HeroWithArrow() {
  return (
    <section className="min-h-screen relative">
      {/* Hero content */}
      
      {/* Show arrow on desktop only */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollDownArrow targetId="featured-section" />
      </div>
    </section>
  );
}
```

---

## Accessibility

### Keyboard Navigation

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToTarget();
  }
};

<div
  role="button"
  tabIndex={0}
  onClick={scrollToTarget}
  onKeyDown={handleKeyDown}
  aria-label="Scroll down to see more content"
  className="cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 rounded-full p-2"
>
  <ArrowDown className="w-6 h-6 animate-bounce" />
</div>
```

### Screen Reader Support

```tsx
// Proper ARIA labeling
<ScrollDownArrow 
  targetId="content"
  ariaLabel="Scroll down to view featured makeup portfolio"
/>

// With hidden text for screen readers
<button aria-label="Scroll to next section">
  <ScrollDownArrow targetId="content" />
  <span className="sr-only">Scroll down to see more</span>
</button>
```

### Reduced Motion Support

```tsx
// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<div className={prefersReducedMotion ? '' : 'animate-bounce'}>
  <ScrollDownArrow targetId="content" />
</div>
```

---

## Implementation Example

Complete implementation with all features:

```tsx
import React, { useState, useEffect } from 'react';
import { ArrowDown } from '@phosphor-icons/react';

interface ScrollDownArrowProps {
  targetId: string;
  className?: string;
  arrowSize?: number;
  ariaLabel?: string;
}

export function ScrollDownArrow({ 
  targetId, 
  className = '',
  arrowSize = 24,
  ariaLabel = 'Scroll down to see more content'
}: ScrollDownArrowProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to target
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTarget();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={scrollToTarget}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      className={`
        cursor-pointer
        focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 
        rounded-full p-2
        transition-all duration-300
        ${className}
      `}
    >
      <ArrowDown 
        size={arrowSize}
        className="animate-bounce"
      />
    </div>
  );
}
```

---

## Common Mistakes

### ❌ Mistake 1: Missing Target ID

```tsx
// ❌ WRONG - No target specified
<ScrollDownArrow />
```

**Solution:**
```tsx
// ✅ CORRECT - Specify target element
<ScrollDownArrow targetId="featured-section" />
```

### ❌ Mistake 2: Target Element Doesn't Exist

```tsx
// ❌ WRONG - Target ID doesn't match any element
<ScrollDownArrow targetId="nonexistent-section" />
```

**Solution:**
```tsx
// ✅ CORRECT - Ensure target element exists
<ScrollDownArrow targetId="featured-section" />

{/* Later in code */}
<section id="featured-section">
  {/* Content */}
</section>
```

### ❌ Mistake 3: No Accessibility Labels

```tsx
// ❌ WRONG - No screen reader support
<div onClick={scrollToTarget}>
  <ArrowDown />
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Proper accessibility
<ScrollDownArrow 
  targetId="content"
  ariaLabel="Scroll down to view featured content"
/>
```

---

## Related Components

- **[ScrollToTop](./ScrollToTop.md)** - Return to top of page
- **[HeroLayout](../sections/HeroLayout.tsx)** - Hero section wrapper
- **[HeroSection](../sections/HeroSection.tsx)** - Homepage hero

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[overview-icons.md](../overview-icons.md)** - Icon system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system

---

**Last Updated:** January 2025  
**Version:** 4.0.0