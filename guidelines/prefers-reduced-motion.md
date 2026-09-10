# Prefers-Reduced-Motion: Coding Standards & Accessibility Guidelines

**Version:** 1.0.0
**Last Updated:** February 2026
**WCAG Reference:** 2.3.3 Animation from Interactions (Level AAA)
**Part of:** Ash Shaw Makeup Portfolio Design System

---

## Table of Contents

1. [Accessibility Significance](#1-accessibility-significance)
2. [CSS Usage & Syntax](#2-css-usage--syntax)
3. [JavaScript Detection](#3-javascript-detection)
4. [Project Implementation](#4-project-implementation)
5. [Component Authoring Rules](#5-component-authoring-rules)
6. [Testing Checklist](#6-testing-checklist)

---

## 1. Accessibility Significance

### Why This Matters

For many users, on-screen movement is more than a stylistic choice; it is a **health concern**. The `prefers-reduced-motion` CSS media feature detects whether a user has enabled an operating-system setting to minimise non-essential motion. Respecting this preference is a core accessibility requirement.

### Who Benefits

| User Group | Impact of Uncontrolled Motion |
|---|---|
| **Vestibular disorders** | Large-scale motion, parallax, and zooming can cause dizziness, nausea, and vertigo. |
| **Seizure / photosensitive epilepsy** | Rapid flashing or high-contrast movements can trigger photosensitive seizures. |
| **Cognitive conditions (ADHD, autism)** | Animations can be highly distracting, making it difficult to focus on content. |
| **Performance / battery** | Reducing motion benefits users on low-end devices or those conserving battery life. |

### WCAG Criteria

- **2.3.1 Three Flashes or Below Threshold (Level A)** -- Content must not flash more than three times per second.
- **2.3.3 Animation from Interactions (Level AAA)** -- Motion animation triggered by interaction can be disabled unless it is essential.
- **2.2.2 Pause, Stop, Hide (Level A)** -- Moving, blinking, or scrolling content must be pausable.

This project targets **WCAG 2.1 Level AA** compliance with **AAA enhancements** where feasible. Full `prefers-reduced-motion` support across all 26 keyframe animations and all component transitions is one such enhancement.

---

## 2. CSS Usage & Syntax

### Possible Values

| Value | Meaning |
|---|---|
| `reduce` | The user has indicated they prefer reduced or no motion. |
| `no-preference` | The user has not made a preference known (the default state). |

### System Settings That Trigger `reduce`

| Operating System | Setting Path |
|---|---|
| **macOS / iOS** | System Settings > Accessibility > Display > Reduce Motion |
| **Windows** | Settings > Accessibility > Visual Effects > Animation effects (off) |
| **Android** | Settings > Accessibility > Remove animations |
| **Linux (GTK)** | `gtk-enable-animations: false` |

---

### Approach 1: The "Reduce" Override (Remove Motion)

Define animations normally, then use the media query to remove or simplify them when the user prefers reduced motion. This is the **primary approach used in this project**.

```css
/* Standard animation */
.hero__background {
  animation: gradientShift 15s ease infinite;
}

/* Override for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero__background {
    animation: none;
  }
}
```

**When to use:** When the animation is the default experience and most users benefit from it.

---

### Approach 2: The "No-Preference" Opt-In (Progressive Enhancement)

Define the static state first and only add animations if the user has **not** requested reduced motion. This is a progressive enhancement strategy where stillness is the default.

```css
/* Static by default */
.hero__background {
  background: var(--wp--preset--gradient--hyperpop);
}

/* Only animate if user hasn't requested reduced motion */
@media (prefers-reduced-motion: no-preference) {
  .hero__background {
    animation: gradientShift 15s ease infinite;
  }
}
```

**When to use:** For heavy, decorative, or large-scale animations (parallax, auto-playing carousels, background shifts) where the static state is an equally valid experience.

---

### What to Remove vs. What to Keep

Not all motion is harmful. The goal is to remove **non-essential decorative** motion, not to strip the interface of all visual feedback.

```css
@media (prefers-reduced-motion: reduce) {
  /* REMOVE: Decorative, non-essential motion */
  .neon-pulse,
  .hero__parallax,
  .background-orb {
    animation: none !important;
    will-change: auto;                        /* Free GPU memory */
  }

  /* SIMPLIFY: Replace motion with instant state change */
  .card:hover {
    transform: none;                          /* Remove hover lift */
    /* Keep color/opacity feedback: */
    filter: brightness(1.05);
  }

  /* KEEP (but simplify): Essential state feedback */
  button,
  a,
  [role="button"] {
    transition: background-color 0.01ms,
                color 0.01ms,
                opacity 0.01ms !important;    /* Near-instant */
  }

  /* KEEP: Loading spinners (essential for UX clarity) */
  /* But consider replacing with a static "Loading..." label */
}
```

#### Decision Matrix

| Animation Type | Action Under `reduce` | Reason |
|---|---|---|
| Neon pulse / glow cycles | **Remove** (`animation: none`) | Purely decorative |
| Parallax scrolling | **Remove** | Strong vestibular trigger |
| Background gradient shifts | **Remove** | Decorative, CPU-intensive |
| Hover scale / translate | **Remove** or replace with opacity/color | Decorative enhancement |
| Page transitions / slide-ins | **Remove** or replace with fade | Non-essential reveal |
| Accordion open/close | **Simplify** (instant expand) | State change is essential; motion is not |
| Focus outline ring | **Keep** | Essential accessibility indicator |
| Loading spinner | **Keep** (or replace with static text) | Essential feedback |
| Scroll-to-top smooth scroll | **Replace** with `scroll-behavior: auto` | The destination matters, not the journey |

---

## 3. JavaScript Detection

### The `useReducedMotion` Hook

For React components that perform **JavaScript-driven animation** (requestAnimationFrame, timers, Motion library, canvas), CSS media queries alone are insufficient. Use `window.matchMedia()` to detect the preference at runtime and react to live changes.

```tsx
// /hooks/useReducedMotion.ts

import { useState, useEffect } from 'react';

/**
 * Detects the user's `prefers-reduced-motion` OS setting.
 *
 * Returns `true` when the user prefers reduced motion.
 * Listens for live changes (e.g. user toggles the setting while the app is open).
 *
 * @returns {boolean} Whether reduced motion is preferred
 *
 * @example
 * const prefersReduced = useReducedMotion();
 * // Skip JS animation when true
 * if (!prefersReduced) {
 *   requestAnimationFrame(animate);
 * }
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;       // SSR-safe
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

### One-Shot Check (Non-Reactive)

For fire-and-forget checks inside `useEffect` or event handlers where you do not need to react to live changes:

```tsx
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  // Skip animation; apply final state immediately
  element.style.opacity = '1';
} else {
  // Run animation
  requestAnimationFrame(fadeIn);
}
```

This pattern is already used in the project's `useAnimatedCount` hook (`/hooks/useAnimatedCount.ts`).

### Usage with the Motion Library

When using the Motion library (`motion/react`), wrap animated components with the reduced-motion check:

```tsx
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
```

> **Note:** Motion (Framer Motion) has a built-in `useReducedMotion()` hook. However, using our own hook keeps the dependency minimal and the behaviour consistent across the codebase.

### Usage with `scrollTo` / Smooth Scrolling

```tsx
const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.scrollTo({
  top: 0,
  behavior: prefersReduced ? 'auto' : 'smooth',
});
```

This pattern is already used in the project's `ScrollToTop` component.

---

## 4. Project Implementation

### Global Reduced-Motion Override

The project applies a **blanket reduced-motion override** in `/styles/globals.css`:

```css
/* /styles/globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  /* Named keyframes nullified */
  @keyframes spin,
  @keyframes pulse,
  @keyframes bounce,
  @keyframes float,
  @keyframes fadeIn,
  @keyframes slideIn,
  @keyframes slideUp,
  /* ... all 26 keyframes ... */
  @keyframes typeform-spin {
    /* Empty to prevent animation execution */
  }
}
```

This acts as a **safety net** ensuring no animation leaks through, even if a component author forgets to add their own `@media` block.

### Per-Block CSS Overrides

Individual block CSS files add **targeted overrides** for component-specific transitions and transforms that the global rule does not cover (e.g. `transition`, `transform`, `will-change`):

| Block CSS File | What It Disables |
|---|---|
| `/styles/blocks/header.css` | Sticky-header slide transitions |
| `/styles/blocks/footer.css` | Background orb floating animation |
| `/styles/blocks/button.css` | Gradient sweep on `.btn--neon-primary::before` |
| `/styles/blocks/faq.css` | Sticker hover transforms, accordion expand/collapse |
| `/styles/blocks/about-page.css` | Skill-item hover transforms |
| `/styles/blocks/pwa-install-prompt.css` | Prompt slide-in and overlay fade |
| `/styles/blocks/offline-indicator.css` | Pulse animation |
| `/styles/blocks/search.css` | Tab bounce, card hover, sub-filter transitions |
| `/styles/blocks/sitemap-page.css` | Rainbow glow orb |
| `/styles/blocks/archive-filters.css` | Result count animation |
| `/styles/blocks/style-guide-page.css` | Animated gradient preview |

### JavaScript Hooks

| File | Technique |
|---|---|
| `/hooks/useAnimatedCount.ts` | One-shot `matchMedia` check; skips RAF counter |
| `/hooks/useKeyboardTrap.ts` | Documents `prefers-reduced-motion` awareness |
| `/components/ui/ScrollToTop.tsx` | Switches `smooth` to `auto` scroll behaviour |

---

## 5. Component Authoring Rules

### Rule 1: Every New Animation Gets a Reduced-Motion Override

When adding any `animation` or `transition` to a block CSS file, you **must** add a corresponding `@media (prefers-reduced-motion: reduce)` block in the same file.

```css
/* NEW animation */
.my-component__icon {
  animation: float 3s ease-in-out infinite;
  transition: transform 300ms ease;
}

/* REQUIRED reduced-motion override in the same file */
@media (prefers-reduced-motion: reduce) {
  .my-component__icon {
    animation: none;
    transition: none;
    will-change: auto;
  }
}
```

### Rule 2: Free GPU Resources

When removing an animation, also reset `will-change` to `auto` to release composited layers:

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    will-change: auto;   /* Free GPU memory */
  }
}
```

### Rule 3: JavaScript Animations Must Check the Preference

Any component using `requestAnimationFrame`, `setInterval`-based animation, canvas drawing loops, or the Motion library **must** check `prefers-reduced-motion` before starting the animation. Use either:

- The `useReducedMotion()` hook (reactive, listens for live changes), or
- A one-shot `window.matchMedia(...)` check (for `useEffect` / event handler contexts)

```tsx
// CORRECT
const prefersReduced = useReducedMotion();
if (!prefersReduced) {
  startAnimation();
}

// WRONG -- no reduced-motion check
useEffect(() => {
  startAnimation(); // Runs for ALL users regardless of preference
}, []);
```

### Rule 4: Never Remove Essential Feedback

Focus indicators, loading states, and error/success state changes must remain visible. Replace motion-based feedback with instant state changes (opacity, color) rather than removing feedback entirely.

```css
@media (prefers-reduced-motion: reduce) {
  /* WRONG: Removes all visual feedback */
  .btn:hover,
  .btn:focus-visible {
    /* nothing */
  }

  /* CORRECT: Keeps feedback, removes motion */
  .btn:hover {
    transform: none;           /* Remove lift */
    filter: brightness(1.1);   /* Keep brightness feedback */
  }

  .btn:focus-visible {
    outline: 3px solid var(--neon-pink);  /* Focus ring always visible */
  }
}
```

### Rule 5: Replace `scroll-behavior: smooth` with `auto`

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
}
```

In JavaScript, always check before using smooth scrolling:

```tsx
element.scrollIntoView({
  behavior: prefersReduced ? 'auto' : 'smooth',
});
```

### Rule 6: Prefer `no-preference` for Heavy Decorative Motion

For large-scale background animations, parallax effects, or auto-playing carousels, use the opt-in pattern so the animation is only added for users who have **not** requested reduced motion:

```css
/* Static default */
.hero__parallax-layer {
  position: fixed;
}

/* Only add parallax for users without a motion preference */
@media (prefers-reduced-motion: no-preference) {
  .hero__parallax-layer {
    will-change: transform;
    /* parallax JS will apply transforms */
  }
}
```

---

## 6. Testing Checklist

### How to Enable Reduced Motion for Testing

| Platform | Steps |
|---|---|
| **macOS** | System Settings > Accessibility > Display > Reduce Motion (toggle on) |
| **iOS** | Settings > Accessibility > Motion > Reduce Motion (toggle on) |
| **Windows** | Settings > Accessibility > Visual Effects > Animation effects (toggle off) |
| **Android** | Settings > Accessibility > Remove animations (toggle on) |
| **Chrome DevTools** | Rendering tab > Emulate CSS media feature `prefers-reduced-motion: reduce` |
| **Firefox DevTools** | Accessibility tab > Simulate > `prefers-reduced-motion: reduce` |

### Pre-Merge Verification

Before merging any component that includes animation or transition:

- [ ] **CSS override exists:** Every `animation` / `transition` property has a `@media (prefers-reduced-motion: reduce)` counterpart in the same block CSS file
- [ ] **JS animations checked:** Any `requestAnimationFrame`, timer-based, or Motion library animation checks the preference before starting
- [ ] **`will-change` reset:** GPU-promoted elements reset to `will-change: auto` under `reduce`
- [ ] **Smooth scroll disabled:** `scroll-behavior: smooth` and JS `.scrollTo({ behavior: 'smooth' })` respect the preference
- [ ] **Essential feedback preserved:** Focus rings, loading indicators, and state changes remain visible
- [ ] **No flashing content:** Content never flashes more than 3 times per second (WCAG 2.3.1)
- [ ] **Visual test passed:** Enable "Reduce Motion" on your OS (or use DevTools emulation), navigate the full page, and confirm no unexpected motion occurs
- [ ] **Live toggle test:** Change the OS setting while the page is open; JS-driven animations should respond immediately (if using the reactive `useReducedMotion` hook)

---

## Related Documentation

- **[animations.md](./design-tokens/animations.md)** -- Complete animation system (26 keyframes)
- **[accessibility-report-feb-2025.md](./accessibility-report-feb-2025.md)** -- WCAG AA compliance report
- **[interactions-accessibility.md](./interactions-accessibility.md)** -- Keyboard, screen reader, and ARIA guidelines
- **[css-architecture.md](./css-architecture.md)** -- BEM architecture and block CSS file rules

---

**Last Updated:** February 2026
**Maintained by:** Ash Shaw Portfolio Team
