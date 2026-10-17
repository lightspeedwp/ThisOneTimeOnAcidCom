# Animation System

**Version:** 2.0.0  
**Last Updated:** March 12, 2026  
**Design System:** Neon vs Atomic Black

---

## 🎬 Overview

The Ash Shaw Makeup Portfolio uses a comprehensive animation system with 26 keyframe animations across the application. Animations enhance user experience, provide visual feedback, and create energy that reflects the vibrant makeup artistry brand.

**Animation Philosophy:**
- **Purposeful:** Every animation serves a function
- **Performant:** Hardware-accelerated transforms and opacity
- **Accessible:** Respects `prefers-reduced-motion`
- **Branded:** Neon glow effects and smooth transitions
- **Hierarchical:** Animation intensity matches content importance

---

## 🎯 Strategic Animation Guidelines

### When to Use Animation

**✅ DO use animation for:**
- **User feedback** - Button clicks, form submissions, loading states
- **Attention direction** - Scroll indicators, CTAs, important announcements
- **Content revelation** - Page load sequences, section reveals on scroll
- **State changes** - Menu open/close, modal appearance, theme toggle
- **Wayfinding** - Hover states on links and cards, focus indicators
- **Delight moments** - Easter eggs, playful micro-interactions
- **Brand expression** - Neon glow effects, gradient shifts, pulsing accents

**❌ DON'T use animation for:**
- **Pure decoration** - Animation without purpose creates noise
- **Content that needs immediate attention** - Error messages, warnings
- **Frequently repeated actions** - Basic navigation, repeated form fields
- **Long-form reading content** - Body text, articles, blog posts
- **Critical UI elements** - Primary navigation, essential CTAs (subtle hover only)

### Animation Hierarchy

**Level 1: Subtle (0.15-0.3s) - High Frequency**
- Link hover states
- Button hover/focus
- Form input focus
- Card hover lift
- Icon state changes

**Level 2: Moderate (0.3-0.6s) - Medium Frequency**
- Page section reveals
- Modal open/close
- Dropdown menus
- Tab switching
- Image loading states

**Level 3: Pronounced (0.6-1.2s) - Low Frequency**
- Page transitions
- Hero section entrance
- Mobile menu slide
- Lightbox gallery
- Success/error notifications

**Level 4: Extended (1.2s+) - Very Low Frequency**
- Background gradients (15s loop)
- Ambient effects (neon pulse)
- Loading spinners (infinite)
- Decorative elements only

### Performance Budget

**Maximum Concurrent Animations:**
- **Desktop:** 5-7 simultaneous animations
- **Tablet:** 3-5 simultaneous animations
- **Mobile:** 2-3 simultaneous animations

**Prohibited Properties to Animate:**
- ❌ `width`, `height` (use `scale` instead)
- ❌ `top`, `left`, `bottom`, `right` (use `transform: translate` instead)
- ❌ `margin`, `padding` (causes layout thrashing)
- ❌ `border-width` (use `box-shadow` or `outline` instead)

**Allowed Properties (Hardware Accelerated):**
- ✅ `opacity`
- ✅ `transform` (translate, scale, rotate)
- ✅ `filter` (blur, brightness - use sparingly)
- ✅ `box-shadow` (for neon glow effects)
- ✅ `background-position` (for gradient shifts)

### Easing Functions Guide

```css
/* Natural Movement - Use for most animations */
ease-out          /* Fast start, slow end - UI feedback */
ease-in-out       /* Smooth both ends - page transitions */

/* Bouncy/Playful - Use sparingly for delight moments */
cubic-bezier(0.68, -0.55, 0.265, 1.55)  /* Bounce */

/* Smooth/Professional - Use for brand moments */
cubic-bezier(0.4, 0, 0.2, 1)  /* Material Design standard */

/* Sharp/Snappy - Use for quick interactions */
ease-in           /* Slow start, fast end - dismissals */
cubic-bezier(0.4, 0, 1, 1)  /* Accelerate */
```

### Theming Animations

**Light Mode:**
- Softer, more subtle animations
- Reduce glow intensity by 40%
- Shorter durations (multiply by 0.8)
- Professional, clean feel

**Dark Mode:**
- More pronounced neon effects
- Full-brightness glow effects
- Standard durations
- Energetic, vibrant feel

```css
/* Example: Adaptive button glow */
.button--primary {
  transition: box-shadow 0.3s ease-out;
}

.button--primary:hover {
  box-shadow: 0 0 20px rgba(255, 16, 240, 0.4); /* Light mode - subtle */
}

.dark .button--primary:hover,
body.dark .button--primary:hover {
  box-shadow: 0 0 30px rgba(255, 16, 240, 0.8); /* Dark mode - intense */
}
```

---

## 📋 Table of Contents

1. [Global Animations](#global-animations)
2. [Component Animations](#component-animations)
3. [Neon Effects](#neon-effects)
4. [Loading States](#loading-states)
5. [Transition Patterns](#transition-patterns)
6. [Performance Guidelines](#performance-guidelines)
7. [Accessibility](#accessibility)

---

## 🌐 Global Animations

### 1. Gradient Shift (Hyperpop Background)

**Location:** `/styles/globals.css` (lines 441-445)

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-neon-glow-bg {
  background: var(--wp--preset--gradient--hyperpop);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  will-change: background-position;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Animated gradient background
<section className="animate-neon-glow-bg py-section">
  Dynamic section with animated multi-color gradient
</section>
```

**Performance:** Uses `background-position` animation with `will-change` hint for GPU acceleration.

---

### 2. Neon Pulse

**Location:** `/styles/globals.css` (lines 447-450)

```css
@keyframes neonPulse {
  from { box-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color); }
  to { box-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color); }
}

.animate-neon-pulse-green {
  --glow-color: var(--wp--preset--color--neon-green);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}

.animate-neon-pulse-pink {
  --glow-color: var(--wp--preset--color--neon-pink);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}

.animate-neon-pulse-blue {
  --glow-color: var(--wp--preset--color--neon-blue);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Pulsing neon button
<button className="btn btn--neon-primary animate-neon-pulse-pink">
  Live Now
</button>

// ✅ CORRECT - Notification indicator
<span className="notification-badge animate-neon-pulse-green">
  •
</span>
```

**Duration:** 2 seconds  
**Easing:** Infinite alternate (smooth ping-pong)  
**Performance:** Animates `box-shadow` (moderate GPU usage)

---

### 3. Float

**Location:** `/styles/globals.css` (lines 452-456)

```css
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
```

**Usage:**
```tsx
// Custom implementation - add class in component CSS
<div className="floating-element">
  Gently floating element
</div>
```

```css
/* In component CSS */
.floating-element {
  animation: float 3s ease-in-out infinite;
}
```

**Duration:** 3-6 seconds (customizable)  
**Easing:** `ease-in-out`  
**Performance:** Hardware-accelerated `transform`

---

## 🧩 Component Animations

### 4. Slide In (Mobile Menu, Modals)

**Locations:**
- `/styles/blocks/mobile-menu.css` (line 92)
- `/styles/blocks/home-page.css` (line 88)
- `/styles/blocks/contentful-admin.css` (line 131)

```css
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile Menu Implementation */
.mobile-menu__nav-item {
  animation: slideIn 0.4s ease-out forwards;
  animation-delay: calc(var(--item-index) * 0.05s);
}
```

**Usage:**
```tsx
// ✅ CORRECT - Staggered menu items
{menuItems.map((item, index) => (
  <div 
    key={item.id}
    className="mobile-menu__nav-item"
    style={{ '--item-index': index } as React.CSSProperties}
  >
    {item.label}
  </div>
))}
```

**Duration:** 0.4 seconds  
**Easing:** `ease-out`  
**Stagger:** 50ms per item

---

### 5. Bounce

**Locations:**
- `/styles/blocks/scroll-controls.css` (line 102)
- `/styles/blocks/countdown.css` (line 351)

```css
/* Scroll Down Arrow Bounce */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-12px); }
  60% { transform: translateY(-6px); }
}

/* Countdown Bounce (simpler) */
@keyframes bounce {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(5%); }
}
```

**Usage:**
```tsx
// ✅ CORRECT - Scroll indicator
<div className="scroll-down-arrow">
  <ChevronDown className="animate-bounce" />
</div>
```

**Duration:** 2 seconds  
**Easing:** Eased timing for natural bounce  
**Loop:** Infinite

---

### 6. Pulse (Loading, Skeleton States)

**Locations:**
- `/styles/blocks/blog-preview.css` (line 218)
- `/styles/blocks/about-page.css` (line 169)
- `/styles/blocks/data-display.css` (line 195)

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Skeleton Implementation */
.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Loading skeleton
<div className="skeleton skeleton--text">
  <div className="skeleton__line"></div>
  <div className="skeleton__line"></div>
</div>
```

**Duration:** 2 seconds  
**Easing:** `cubic-bezier(0.4, 0, 0.6, 1)` (smooth pulse)  
**Loop:** Infinite

---

### 7. Spin (Loading Indicators)

**Locations:**
- `/styles/blocks/countdown.css` (line 346)
- `/styles/blocks/home-page.css` (line 99)
- `/styles/blocks/skeleton.css` (line 62)
- `/styles/blocks/contact-form.css` (line 110)

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loading Spinner Implementation */
.spinner {
  animation: spin 1s linear infinite;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Loading spinner
<div className="loading-spinner">
  <Loader2 className="animate-spin" />
</div>
```

**Duration:** 1 second  
**Easing:** `linear` (constant speed)  
**Loop:** Infinite

---

### 8. Pulse Ring (Scroll to Top)

**Location:** `/styles/blocks/scroll-controls.css` (line 108)

```css
@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}

.scroll-to-top::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--wp--preset--color--neon-pink);
  border-radius: 50%;
  animation: pulse-ring 2s infinite;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Pulsing ring effect
<button className="scroll-to-top">
  <ArrowUp />
</button>
```

**Duration:** 2 seconds  
**Easing:** Default ease  
**Loop:** Infinite

---

### 9. Slide Up Fade

**Location:** `/styles/blocks/scroll-controls.css` (line 113)

```css
@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-to-top {
  opacity: 0;
  transform: translateY(10px);
  animation: slideUpFade 0.3s ease-out forwards;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Fade in from bottom
{showScrollTop && (
  <button className="scroll-to-top">
    <ArrowUp />
  </button>
)}
```

**Duration:** 0.3 seconds  
**Easing:** `ease-out`  
**Mode:** `forwards` (maintains end state)

---

### 10. Shine (Blog Post Hover)

**Location:** `/styles/blocks/blog-page.css` (line 322)

```css
@keyframes shine {
  100% {
    left: 150%;
  }
}

.blog-card__image::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 0.75s;
}
```

**Usage:**
```tsx
// Automatically applied on hover
<div className="blog-card">
  <div className="blog-card__image">
    {/* Shine effect on hover */}
  </div>
</div>
```

**Duration:** 0.75 seconds  
**Trigger:** On hover  
**Effect:** Glossy sweep across image

---

### 11. Accordion Animations

**Location:** `/styles/blocks/ui-components.css` (lines 607-615)

```css
@keyframes accordionDown {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordionUp {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}

.accordion-content {
  overflow: hidden;
}

.accordion-content[data-state="open"] {
  animation: accordionDown 0.2s ease-out;
}

.accordion-content[data-state="closed"] {
  animation: accordionUp 0.2s ease-out;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Radix UI Accordion
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Trigger>Click to expand</Accordion.Trigger>
    <Accordion.Content className="accordion-content">
      Smoothly animated content
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

**Duration:** 0.2 seconds  
**Easing:** `ease-out`  
**Library:** Radix UI

---

### 12. Collapsible Animations

**Location:** `/styles/blocks/misc-ui.css` (lines 454-462)

```css
@keyframes collapsible-down {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-collapsible-content-height); opacity: 1; }
}

@keyframes collapsible-up {
  from { height: var(--radix-collapsible-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
```

**Duration:** 0.2 seconds  
**Easing:** Default ease  
**Library:** Radix UI

---

### 13. Caret Blink (Input Cursor)

**Location:** `/styles/blocks/misc-ui.css` (line 537)

```css
@keyframes caret-blink {
  0%, 70%, 100% { opacity: 1; }
  20%, 50% { opacity: 0; }
}

.input-cursor {
  animation: caret-blink 1.2s ease-out infinite;
}
```

**Duration:** 1.2 seconds  
**Loop:** Infinite  
**Effect:** Typing cursor blink

---

### 14. Neon Pulse (Videos Page)

**Location:** `/styles/blocks/videos-page.css` (lines 56-59, 171-174)

```css
/* Purple Neon Pulse */
@keyframes neonPulsePurple {
  from { 
    box-shadow: 0 0 20px rgba(190, 0, 254, 0.3); 
    border-color: rgba(190, 0, 254, 0.5); 
  }
  to { 
    box-shadow: 0 0 40px rgba(190, 0, 254, 0.6); 
    border-color: var(--wp--preset--color--neon-purple); 
  }
}

/* Pink Neon Pulse */
@keyframes neonPulsePink {
  from { box-shadow: 0 0 10px var(--wp--preset--color--neon-pink); }
  to { box-shadow: 0 0 25px var(--wp--preset--color--neon-pink); }
}
```

**Usage:**
```tsx
// ✅ CORRECT - Video card with neon glow
<div className="video-card video-card--featured">
  Video content
</div>
```

```css
.video-card--featured {
  animation: neonPulsePurple 3s infinite alternate;
}
```

**Duration:** 1.5-3 seconds  
**Easing:** `infinite alternate`  
**Colors:** Purple, Pink

---

### 15. Fade In / Scale In (Videos Page)

**Location:** `/styles/blocks/videos-page.css` (lines 302-310)

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

**Usage:**
```tsx
// ✅ CORRECT - Modal entrance
<div className="video-modal">
  <div className="video-modal__content">
    Animated modal content
  </div>
</div>
```

```css
.video-modal {
  animation: fadeIn 0.3s ease;
}

.video-modal__content {
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Duration:** 0.3 seconds  
**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like)

---

### 16. Slide Up (Share Component)

**Location:** `/styles/blocks/share-component.css` (line 236)

```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.share-dropdown {
  animation: slideUp 0.2s ease-out;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Share dropdown
{isOpen && (
  <div className="share-dropdown">
    Share options
  </div>
)}
```

**Duration:** 0.2 seconds  
**Easing:** `ease-out`

---

### 17. Skeleton Pulse

**Location:** `/styles/blocks/skeleton.css` (line 12)

```css
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Usage:**
```tsx
// ✅ CORRECT - Loading skeleton
<div className="skeleton skeleton--card">
  <div className="skeleton__header"></div>
  <div className="skeleton__body"></div>
</div>
```

**Duration:** 2 seconds  
**Loop:** Infinite  
**Easing:** Smooth cubic bezier

---

### 18. Typeform Spin

**Location:** `/styles/components/typeform-embed.css` (line 66)

```css
@keyframes typeform-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.typeform-spinner {
  animation: typeform-spin 1s linear infinite;
}
```

**Duration:** 1 second  
**Loop:** Infinite  
**Position:** Centered with `translate(-50%, -50%)`

---

## ⚡ Neon Effects

### Glow Intensity Levels

```css
/* Small Glow */
box-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color);

/* Medium Glow */
box-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color);

/* Large Glow */
box-shadow: 0 0 15px var(--glow-color), 0 0 30px var(--glow-color);

/* Extra Large Glow */
box-shadow: 0 0 20px var(--glow-color), 0 0 40px var(--glow-color);
```

### Neon Color Variables

```css
--glow-color-green: var(--wp--preset--color--neon-green);
--glow-color-pink: var(--wp--preset--color--neon-pink);
--glow-color-blue: var(--wp--preset--color--neon-blue);
--glow-color-purple: var(--wp--preset--color--neon-purple);
```

---

## 🔄 Transition Patterns

### Standard Transitions

```css
/* Color Transitions */
transition: color 0.3s ease, background-color 0.3s ease;

/* Transform Transitions */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Shadow Transitions */
transition: box-shadow 0.3s ease;

/* All Properties */
transition: all 0.3s ease;
```

### Duration Guidelines

| Duration | Use Case |
|----------|----------|
| **0.15s** | Micro-interactions (hover, focus) |
| **0.2-0.3s** | Standard transitions (buttons, cards) |
| **0.4-0.5s** | Modal entrances, menu animations |
| **0.75-1s** | Page transitions, hero animations |
| **2-3s** | Ambient animations (pulse, float) |
| **15s** | Background gradient shifts |

### Easing Functions

```css
/* Standard Easings */
--wp--custom--ease--bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
ease-in-out   /* Smooth acceleration and deceleration */
ease-out      /* Fast start, slow end */
ease-in       /* Slow start, fast end */
linear        /* Constant speed */

/* Custom Cubic Beziers */
cubic-bezier(0.4, 0, 0.2, 1)    /* Material Design standard */
cubic-bezier(0.16, 1, 0.3, 1)   /* Spring-like bounce */
cubic-bezier(0.4, 0, 0.6, 1)    /* Smooth pulse */
```

---

## 🚀 Performance Guidelines

### Hardware-Accelerated Properties

**✅ Animate These (GPU-Accelerated):**
- `transform: translate()`, `scale()`, `rotate()`
- `opacity`
- `filter` (use sparingly)

**❌ Avoid Animating (CPU-Intensive):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `border-width`

### Will-Change Optimization

```css
/* Add will-change for complex animations */
.animate-neon-glow-bg {
  will-change: background-position;
}

.animate-neon-pulse-pink {
  will-change: box-shadow;
}

/* Remove will-change after animation completes */
.element.animation-complete {
  will-change: auto;
}
```

### Animation Budget

- **Maximum 3-5 simultaneous animations** per viewport
- **Limit neon pulse effects** to 2-3 elements maximum
- **Use `animation-delay`** for staggered effects instead of multiple keyframes

---

## ♿ Accessibility

### Prefers Reduced Motion

**All animations must respect user preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Implementation Pattern

```tsx
// ✅ CORRECT - Check for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<div className={prefersReducedMotion ? '' : 'animate-neon-pulse-pink'}>
  Content
</div>
```

### Testing Checklist

- [ ] All animations disabled with `prefers-reduced-motion`
- [ ] Page remains functional without animations
- [ ] Focus indicators still visible
- [ ] Loading states still communicate status

---

## 📖 Quick Reference

### Animation Duration Scale

```
0.15s - Micro (hover, focus)
0.2s  - Fast (dropdown, tooltip)
0.3s  - Standard (button, card)
0.4s  - Medium (modal open)
0.5s  - Slow (page transition)
0.75s - Shine effect
1s    - Spinner rotation
2s    - Pulse, bounce
3s    - Float, ambient
15s   - Gradient shift
```

### Common Patterns

```tsx
// Fade In
<div className="opacity-0 animate-fadeIn">Content</div>

// Slide In from Bottom
<div className="translate-y-4 opacity-0 animate-slideUp">Content</div>

// Bounce
<div className="animate-bounce">Arrow</div>

// Spin
<Loader2 className="animate-spin" />

// Neon Pulse
<button className="animate-neon-pulse-pink">CTA</button>

// Gradient Background
<section className="animate-neon-glow-bg">Hero</section>
```

---

## 🔗 Related Documentation

- **[neon-colors.md](./neon-colors.md)** - Neon color system
- **[colors.md](./colors.md)** - Color tokens
- **[Guidelines.md](../Guidelines.md)** - Main guidelines

---

**Last Updated:** March 12, 2026  
**Version:** 2.0.0  
**Maintained by:** Ash Shaw Portfolio Team