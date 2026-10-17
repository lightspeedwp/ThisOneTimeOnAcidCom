# Interaction Modes Responsive Guidelines

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Part of:** Ash Shaw Makeup Portfolio Design System

## Overview

This document defines how user interactions adapt across different devices and input methods (touch, mouse, keyboard), ensuring optimal user experience for mobile, tablet, and desktop users.

## Table of Contents

1. [Input Method Detection](#input-method-detection)
2. [Touch Interactions](#touch-interactions)
3. [Mouse Interactions](#mouse-interactions)
4. [Keyboard Interactions](#keyboard-interactions)
5. [Hover States](#hover-states)
6. [Focus Management](#focus-management)
7. [Gesture Support](#gesture-support)
8. [Implementation Patterns](#implementation-patterns)

---

## Input Method Detection

### CSS Media Queries for Input

```css
/* Detect touch-capable devices */
@media (hover: none) and (pointer: coarse) {
  /* Touch-optimized styles */
  .interactive-element {
    /* Larger touch targets */
    min-height: 48px;
    min-width: 48px;
  }
}

/* Detect mouse/trackpad devices */
@media (hover: hover) and (pointer: fine) {
  /* Mouse-optimized styles */
  .interactive-element:hover {
    /* Hover effects */
    transform: scale(1.05);
  }
}

/* Detect stylus or imprecise input */
@media (pointer: coarse) {
  /* Larger targets, simplified interactions */
  .button {
    padding: 1rem;
  }
}
```

### JavaScript Input Detection

```typescript
// Detect primary input method
const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

// Detect if device has hover capability
const hasHoverCapability = () => {
  return window.matchMedia('(hover: hover)').matches;
};

// Use in React component
export function AdaptiveButton() {
  const [inputMethod, setInputMethod] = React.useState<'touch' | 'mouse'>('mouse');
  
  React.useEffect(() => {
    setInputMethod(isTouchDevice() ? 'touch' : 'mouse');
  }, []);
  
  return (
    <button 
      className={inputMethod === 'touch' ? 'touch-optimized' : 'mouse-optimized'}
    >
      Click me
    </button>
  );
}
```

---

## Touch Interactions

### Touch Target Sizing

**Minimum Requirements:**
- **WCAG 2.1:** 44x44px minimum
- **Recommended:** 48x48px for enhanced usability
- **iOS Guidelines:** 44x44pt (88x88px on Retina)
- **Android Material:** 48x48dp

```css
/* Standard touch target */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 0.75rem;           /* 12px */
}

/* Enhanced touch target */
.touch-target-enhanced {
  min-width: 48px;
  min-height: 48px;
  padding: 1rem;              /* 16px */
}

/* Touch spacing between targets */
.touch-group {
  gap: 0.75rem;               /* 12px minimum */
}
```

### Touch-Specific Interactions

```tsx
/**
 * Touch-optimized button component
 */
export function TouchButton({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode; 
  onClick: () => void;
}) {
  const [isPressed, setIsPressed] = React.useState(false);
  
  return (
    <button
      className={`
        min-h-[48px] min-w-[48px]
        px-button py-button
        bg-gradient-pink-purple-blue
        text-white rounded-lg
        transition-transform duration-150
        ${isPressed ? 'scale-95' : 'scale-100'}
        active:scale-95
      `}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Touch Gestures

```typescript
/**
 * Swipe gesture detection for mobile galleries
 */
export function useSwipeGesture(onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  
  const minSwipeDistance = 50; // Minimum distance for swipe
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };
  
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
}

// Usage in Gallery component
export function MobileGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const swipeHandlers = useSwipeGesture(
    () => setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1)), // Swipe left
    () => setCurrentIndex((prev) => Math.max(prev - 1, 0))                  // Swipe right
  );
  
  return (
    <div {...swipeHandlers} className="relative overflow-hidden">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
    </div>
  );
}
```

### Touch Feedback

```css
/* Visual feedback for touch */
.touch-feedback {
  /* Active state visible feedback */
  &:active {
    transform: scale(0.95);
    opacity: 0.9;
  }
  
  /* Disable hover effects on touch devices */
  @media (hover: none) {
    &:hover {
      /* No hover effects */
      transform: none;
    }
  }
}

/* Ripple effect for touch feedback */
.touch-ripple {
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::after {
    width: 300px;
    height: 300px;
  }
}
```

---

## Mouse Interactions

### Hover States

**Purpose:** Provide visual feedback for precise pointer input

```css
/* Standard hover effect */
.hover-effect {
  transition: all 0.3s ease;
  
  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }
}

/* Card hover with scale */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  @media (hover: hover) {
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
  }
}

/* Button hover with gradient shift */
.button-hover {
  background: linear-gradient(135deg, #ff6b9d 0%, #c239b3 50%, #4facfe 100%);
  transition: filter 0.3s ease, transform 0.2s ease;
  
  @media (hover: hover) {
    &:hover {
      filter: brightness(1.1);
      transform: scale(1.05);
    }
  }
}
```

### Cursor Styles

```css
/* Interactive cursors */
.cursor-pointer {
  cursor: pointer;
}

.cursor-grab {
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
}

.cursor-zoom {
  cursor: zoom-in;
  
  &.zoomed {
    cursor: zoom-out;
  }
}

/* Custom cursor for specific interactions */
.cursor-custom {
  cursor: url('/cursors/custom.svg'), pointer;
}
```

### Mouse-Specific Components

```tsx
/**
 * Image hover with zoom preview (desktop only)
 */
export function ImageHoverZoom({ src, alt }: { src: string; alt: string }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };
  
  return (
    <div
      className="relative overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="transition-transform duration-300"
        style={{
          transform: isHovered 
            ? `scale(1.5) translate(-${mousePosition.x}%, -${mousePosition.y}%)` 
            : 'scale(1)'
        }}
      />
    </div>
  );
}
```

---

## Keyboard Interactions

### Focus States

**Purpose:** Clear visual indicators for keyboard navigation

```css
/* Standard focus ring */
.focus-ring {
  outline: none;
  transition: box-shadow 0.2s ease;
  
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.3);
    outline: 2px solid #ff6b9d;
    outline-offset: 2px;
  }
}

/* Dark mode focus */
.dark .focus-ring:focus-visible {
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
  outline-color: #8b5cf6;
}

/* Button focus */
.button-focus {
  &:focus-visible {
    box-shadow: 
      0 0 0 3px rgba(255, 255, 255, 1),
      0 0 0 6px rgba(255, 107, 157, 0.5);
  }
}

/* Input focus */
.input-focus {
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: #ff6b9d;
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
  }
}
```

### Keyboard Navigation

```tsx
/**
 * Keyboard-accessible modal dialog
 */
export function KeyboardModal({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!isOpen) return;
    
    // Focus trap
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
    
    // Set initial focus
    firstElement?.focus();
    
    // Handle Tab key
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-purple-900 rounded-xl p-fluid-lg max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          className="mt-fluid-md px-button py-button bg-gray-200 dark:bg-purple-800 rounded-lg focus-ring"
        >
          Close (Esc)
        </button>
      </div>
    </div>
  );
}
```

### Keyboard Shortcuts

```tsx
/**
 * Global keyboard shortcuts hook
 */
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Build shortcut key (e.g., "ctrl+k", "shift+?")
      const key = [
        e.ctrlKey && 'ctrl',
        e.shiftKey && 'shift',
        e.altKey && 'alt',
        e.metaKey && 'meta',
        e.key.toLowerCase()
      ]
        .filter(Boolean)
        .join('+');
      
      const handler = shortcuts[key];
      if (handler) {
        e.preventDefault();
        handler();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Usage example
export function App() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  
  useKeyboardShortcuts({
    'ctrl+k': () => setSearchOpen(true),
    'meta+k': () => setSearchOpen(true), // Mac
    'escape': () => setSearchOpen(false),
    'shift+?': () => console.log('Show keyboard shortcuts help')
  });
  
  return (
    <div>
      {/* App content */}
    </div>
  );
}
```

---

## Hover States

### Conditional Hover Effects

**Purpose:** Only apply hover effects on devices with hover capability

```css
/* Base state - no hover */
.conditional-hover {
  transition: all 0.3s ease;
}

/* Hover only on capable devices */
@media (hover: hover) {
  .conditional-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
}

/* Touch devices - use active state instead */
@media (hover: none) {
  .conditional-hover:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}
```

### Component-Specific Hover

```tsx
/**
 * Portfolio card with conditional hover
 */
export function PortfolioCard({ 
  title, 
  image, 
  onClick 
}: { 
  title: string; 
  image: string; 
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="
        group relative overflow-hidden rounded-xl cursor-pointer
        transition-all duration-300
        hover:shadow-xl
        active:scale-98
      "
    >
      {/* Image with overlay */}
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover overlay - only on hover-capable devices */}
        <div className="
          absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          hidden md:flex items-end
        ">
          <p className="text-white font-heading text-fluid-lg p-fluid-md">
            {title}
          </p>
        </div>
      </div>
      
      {/* Mobile: Always show title */}
      <div className="md:hidden p-fluid-md bg-white dark:bg-purple-900">
        <h3 className="font-heading text-fluid-lg">{title}</h3>
      </div>
    </article>
  );
}
```

---

## Focus Management

### Focus Trap Pattern

```tsx
/**
 * Focus trap utility for modals and overlays
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isActive: boolean) {
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableSelectors = 
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors)
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Set initial focus
    firstFocusable?.focus();
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (focusableElements.length === 1) {
        e.preventDefault();
        return;
      }
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleTab);
    
    return () => {
      container.removeEventListener('keydown', handleTab);
    };
  }, [containerRef, isActive]);
}
```

### Focus Restoration

```tsx
/**
 * Restore focus when modal closes
 */
export function useRestoreFocus(isOpen: boolean) {
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  
  React.useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      // Restore previous focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);
}

// Usage in modal
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  useFocusTrap(modalRef, isOpen);
  useRestoreFocus(isOpen);
  
  if (!isOpen) return null;
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
```

---

## Gesture Support

### Pinch to Zoom

```tsx
/**
 * Pinch-to-zoom for touch devices
 */
export function PinchZoomImage({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = React.useState(1);
  const [lastDistance, setLastDistance] = React.useState(0);
  
  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setLastDistance(getDistance(e.touches));
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches);
      const scaleFactor = currentDistance / lastDistance;
      setScale((prev) => Math.max(1, Math.min(prev * scaleFactor, 4)));
      setLastDistance(currentDistance);
    }
  };
  
  const handleTouchEnd = () => {
    setLastDistance(0);
  };
  
  return (
    <div
      className="overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={src}
        alt={alt}
        style={{ transform: `scale(${scale})` }}
        className="transition-transform duration-200"
      />
    </div>
  );
}
```

### Pull to Refresh

```tsx
/**
 * Pull-to-refresh gesture (mobile)
 */
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [startY, setStartY] = React.useState(0);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const threshold = 80; // Minimum pull distance to trigger refresh
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && !isRefreshing) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      
      if (distance > 0) {
        setPullDistance(Math.min(distance, threshold * 1.5));
      }
    }
  };
  
  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    setStartY(0);
  };
  
  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    pullDistance,
    isRefreshing
  };
}
```

---

## Implementation Patterns

### Adaptive Button Component

```tsx
/**
 * Button that adapts to input method
 */
export function AdaptiveButton({
  children,
  onClick,
  variant = 'primary'
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}) {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const baseClasses = `
    min-h-[44px] min-w-[44px]
    px-button py-button
    font-body font-medium text-button-fluid
    rounded-lg shadow-lg
    transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-opacity-50
  `;
  
  const variantClasses = variant === 'primary'
    ? 'bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white focus:ring-pink-200'
    : 'bg-white dark:bg-purple-800 text-gray-800 dark:text-purple-100 focus:ring-purple-300';
  
  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses}
        ${isPressed ? 'scale-95' : 'scale-100'}
        hover:shadow-xl hover:scale-105
        active:scale-95
      `}
      onClick={onClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
}
```

### Accessible Interactive Card

```tsx
/**
 * Interactive card with full accessibility support
 */
export function InteractiveCard({
  title,
  description,
  image,
  onClick
}: {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="
        group
        bg-white dark:bg-purple-900
        rounded-xl overflow-hidden
        cursor-pointer
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-purple-500
        active:scale-98
      "
      aria-label={`View ${title} details`}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt=""
          role="presentation"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-card-responsive">
        <h3 className="text-card-title font-heading font-semibold mb-fluid-sm text-gray-800 dark:text-purple-100">
          {title}
        </h3>
        <p className="text-body-guideline font-body text-gray-600 dark:text-purple-300">
          {description}
        </p>
      </div>
    </article>
  );
}
```

---

## Testing Checklist

### Input Method Testing

- [ ] **Touch devices:** All touch targets minimum 44x44px
- [ ] **Touch devices:** Hover effects disabled or replaced with touch feedback
- [ ] **Touch devices:** Gestures working (swipe, pinch, pull)
- [ ] **Mouse devices:** Hover states provide clear feedback
- [ ] **Mouse devices:** Cursor changes appropriately
- [ ] **Keyboard:** All interactive elements focusable
- [ ] **Keyboard:** Focus indicators clearly visible
- [ ] **Keyboard:** Shortcuts working correctly

### Accessibility Testing

- [ ] **Focus management:** Focus trap in modals working
- [ ] **Focus management:** Focus restoration after modal close
- [ ] **Keyboard navigation:** Logical tab order
- [ ] **Keyboard navigation:** All actions accessible via keyboard
- [ ] **Screen readers:** Interactive elements properly labeled
- [ ] **Screen readers:** State changes announced

### Cross-Device Testing

- [ ] **iOS Safari:** Touch interactions working
- [ ] **Android Chrome:** Touch interactions working  
- [ ] **Desktop Chrome:** Mouse/keyboard working
- [ ] **Desktop Safari:** Mouse/keyboard working
- [ ] **Desktop Firefox:** Mouse/keyboard working

---

## Related Documentation

- **[Accessibility Guidelines](../interactions-accessibility.md)** - Complete accessibility standards
- **[Breakpoints Guide](./breakpoints.md)** - Device breakpoint definitions
- **[Animation Guidelines](../design-tokens/animations.md)** - Animation and transition patterns

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Maintained by:** Ash Shaw Portfolio Team
