# Animation Quick Reference

**Version:** 1.0.0  
**Created:** March 12, 2026  
**Updated:** March 12, 2026

---

## 📖 Overview

Quick reference guide for implementing animations on the Nova News website. This document provides instant access to the most commonly used animation patterns and components from the comprehensive animation system.

**Full Documentation:**
- **[Animation Guidelines](/guidelines/design-tokens/animations.md)** - Complete animation system
- **[Audit Report](/reports/animation-movement-audit/audit-report.md)** - Detailed analysis and recommendations
- **[Task List](/tasks/animation-movement-tasks.md)** - Implementation roadmap (65 tasks)

---

## 🎯 80s Neon CLI Theme - 5 Core Patterns

### 1. Terminal Boot Sequence
**Use for:** Page loads, section reveals

```css
@keyframes terminalBoot {
  0% {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
}

.hero--animated {
  animation: terminalBoot 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Usage:**
```tsx
<section className="hero section hero--animated">
  {/* Content */}
</section>
```

---

### 2. Neon Sign Flicker
**Use for:** CTAs, "LIVE NOW" indicators, attention moments

```css
@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 
      0 0 10px var(--wp--preset--color--neon-pink),
      0 0 20px var(--wp--preset--color--neon-pink),
      0 0 30px var(--wp--preset--color--neon-pink);
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.7;
  }
}

.neon-flicker {
  animation: neonFlicker 4s linear infinite;
}
```

**Usage:**
```tsx
<span className="badge neon-flicker">LIVE NOW</span>
```

---

### 3. Digital Glitch
**Use for:** Hover effects, playful interactions, error pages

```css
@keyframes rgbSplit {
  0%, 100% {
    text-shadow: 
      -2px 0 0 rgba(255, 0, 0, 0.7),
      2px 0 0 rgba(0, 255, 255, 0.7);
  }
  33% {
    text-shadow: 
      2px 1px 0 rgba(255, 0, 0, 0.7),
      -2px -1px 0 rgba(0, 255, 255, 0.7);
  }
  66% {
    text-shadow: 
      -1px -1px 0 rgba(255, 0, 0, 0.7),
      1px 1px 0 rgba(0, 255, 255, 0.7);
  }
}

.glitch-on-hover:hover {
  animation: rgbSplit 0.3s ease-in-out;
}
```

**Usage:**
```tsx
<h2 className="heading glitch-on-hover">Hover me</h2>
```

---

### 4. Holographic Reveal
**Use for:** Content entrance on scroll, special moments

```css
@keyframes holographicReveal {
  0% {
    opacity: 0;
    filter: hue-rotate(0deg) blur(10px);
    transform: translateY(30px) scale(0.9);
  }
  50% {
    filter: hue-rotate(90deg) blur(5px);
  }
  100% {
    opacity: 1;
    filter: hue-rotate(0deg) blur(0px);
    transform: translateY(0) scale(1);
  }
}

.holographic-reveal.in-view {
  animation: holographicReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

**Usage:**
```tsx
<section className="section holographic-reveal">
  {/* Content */}
</section>
```

---

### 5. Cursor Trail
**Use for:** Desktop interactivity (auto-disabled on mobile)

```tsx
// Desktop cursor trail
React.useEffect(function() {
  if (window.innerWidth < 1024) return;
  
  function handleMouseMove(e) {
    var trail = document.createElement('div');
    trail.className = 'cursor-trail-particle';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(function() {
      if (trail.parentNode) trail.parentNode.removeChild(trail);
    }, 600);
  }
  
  document.addEventListener('mousemove', handleMouseMove);
  return function() {
    document.removeEventListener('mousemove', handleMouseMove);
  };
}, []);
```

**CSS:**
```css
@keyframes cursorTrailFade {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.cursor-trail-particle {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--wp--preset--color--neon-pink);
  box-shadow: 0 0 10px rgba(255, 16, 240, 0.8);
  pointer-events: none;
  z-index: 9999;
  animation: cursorTrailFade 0.6s ease-out forwards;
}
```

---

## 🧩 Reusable Components (Coming in Phase 3)

### TypewriterText
**Purpose:** Terminal-style character-by-character text reveal

```tsx
import { TypewriterText } from '@/components/ui/TypewriterText';

<TypewriterText
  text="This one time on acid..."
  speed={80}
  delay={500}
  cursor={true}
/>
```

---

### NeonPulseWrapper
**Purpose:** Configurable neon glow pulse effect

```tsx
import { NeonPulseWrapper } from '@/components/ui/NeonPulseWrapper';

<NeonPulseWrapper color="pink" intensity="high" speed={3}>
  <button className="button">Click me</button>
</NeonPulseWrapper>
```

---

### ScrollReveal
**Purpose:** Viewport-triggered animations

```tsx
import { ScrollReveal } from '@/components/ui/ScrollReveal';

<ScrollReveal animation="slide-up" delay={200} threshold={0.2}>
  <div className="feature-card">Content</div>
</ScrollReveal>
```

---

### GlitchHover
**Purpose:** RGB split glitch effect on interaction

```tsx
import { GlitchHover } from '@/components/ui/GlitchHover';

<GlitchHover intensity={3} duration={400} trigger="hover">
  <h2>Glitch on Hover</h2>
</GlitchHover>
```

---

### ScanLineOverlay
**Purpose:** Retro scan line effect across screen

```tsx
import { ScanLineOverlay } from '@/components/ui/ScanLineOverlay';

<ScanLineOverlay
  speed={3}
  opacity={0.2}
  color="var(--wp--preset--color--neon-pink)"
  height={15}
/>
```

---

## 🎯 Most Common Use Cases

### 1. Hero Section Animation

```tsx
React.createElement(
  "section",
  { className: "hero section hero--animated" },
  React.createElement(
    "div",
    { className: "section__container hero__grid" },
    React.createElement(
      "div",
      { className: "hero__content hero__content--reveal" },
      React.createElement("h1", { 
        className: "heading-hero text-neon-pink typewriter-text"
      }, "This one time on acid..."),
      React.createElement("div", { 
        className: "hero__visual float-gentle" 
      }, /* Book cover */)
    )
  )
)
```

**CSS needed:**
- `.hero--animated` - Terminal boot sequence
- `.typewriter-text` - Character reveal
- `.float-gentle` - Gentle floating

---

### 2. CTA Button with Neon Pulse

```tsx
<button className="button button--primary button--neon-pulse">
  Unlock the Draft
</button>
```

**CSS:**
```css
@keyframes neonPulseCTA {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 16, 240, 0.4);
  }
  50% {
    box-shadow: 0 0 35px rgba(255, 16, 240, 0.7);
  }
}

.button--neon-pulse {
  animation: neonPulseCTA 2s ease-in-out infinite;
}

.button--neon-pulse:hover {
  animation: neonPulseCTA 1s ease-in-out infinite;
}
```

---

### 3. Form Input Focus Glow

```css
.form__input:focus {
  border-color: var(--wp--preset--color--neon-pink);
  box-shadow: 
    0 0 0 3px rgba(255, 16, 240, 0.2),
    0 0 20px rgba(255, 16, 240, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

### 4. Card Hover with Lift + Glow

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(255, 16, 240, 0.2);
}
```

---

### 5. Scroll-Triggered Stagger Reveals

```tsx
// React component
React.useEffect(function() {
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  var cards = document.querySelectorAll('.feature-card');
  cards.forEach(function(card) {
    observer.observe(card);
  });
  
  return function() {
    observer.disconnect();
  };
}, []);
```

**CSS:**
```css
@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  opacity: 0;
}

.feature-card.in-view {
  animation: cardReveal 0.6s ease-out forwards;
}

.feature-card:nth-child(1).in-view { animation-delay: 0.1s; }
.feature-card:nth-child(2).in-view { animation-delay: 0.2s; }
.feature-card:nth-child(3).in-view { animation-delay: 0.3s; }
```

---

## ♿ Accessibility - Prefers Reduced Motion

**ALWAYS include this for new animations:**

```css
@media (prefers-reduced-motion: reduce) {
  .typewriter-text,
  .float-gentle,
  .button--neon-pulse,
  .holographic-reveal,
  .neon-flicker {
    animation: none !important;
  }
  
  .typewriter-text {
    width: auto;
    border-right: none;
  }
  
  .feature-card {
    opacity: 1;
  }
}
```

---

## 📊 Performance Budget

| Page Type | Max Concurrent | Max Neon Pulses | Max Box-Shadows |
|-----------|---------------|-----------------|-----------------|
| Homepage | 7 | 2 | 5 |
| Content Pages | 5 | 1 | 4 |
| Utility Pages | 3 | 0 | 3 |
| Mobile (all) | 3 | 1 | 2 |

**GPU-Accelerated Properties (ALWAYS USE):**
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ✅ `filter` (use sparingly)

**CPU-Intensive Properties (NEVER ANIMATE):**
- ❌ `width`, `height`
- ❌ `top`, `left`, `right`, `bottom`
- ❌ `margin`, `padding`

---

## 🚀 Implementation Priority

### Phase 1 (Critical) - Week 1
1. Neon pulse CTA on all buttons
2. Hero section animations (homepage)
3. Form input focus glow
4. Success/error animations

### Phase 2 (High) - Week 2
1. The Book page animations
2. Draft viewer animations
3. About page timeline
4. Waitlist success animation

### Phase 3 (Medium) - Week 3
1. Build 5 reusable components
2. Document components
3. Add to style guide

### Phase 4 (Low) - Week 4
1. Cursor trail (desktop)
2. Terminal boot sequence
3. Easter eggs
4. Performance optimization

---

## 🔗 Related Resources

- **[Full Animation Guidelines](/guidelines/design-tokens/animations.md)** - Complete system documentation
- **[Audit Report](/reports/animation-movement-audit/audit-report.md)** - Detailed analysis (15 pages)
- **[Task List](/tasks/animation-movement-tasks.md)** - 65 tasks with time estimates
- **[Neon Color System](/guidelines/design-tokens/neon-colors.md)** - Color palette reference
- **[Reduced Motion Guide](/guidelines/prefers-reduced-motion.md)** - Accessibility standards

---

**Last Updated:** March 12, 2026  
**Version:** 1.0.0  
**Maintained by:** Nova News Development Team
