# Animation & Movement Audit Prompt

**Version:** 1.0.0  
**Created:** March 12, 2026  
**Type:** Single-phase audit  
**Estimated Duration:** 2-3 hours

---

## 🎯 Objective

Conduct a comprehensive audit of the Nova News website to:
1. Analyze current animation usage across all pages
2. Identify opportunities for strategic movement that enhances UX
3. Propose a themed animation strategy aligned with the 80s neon CLI aesthetic
4. Create actionable recommendations for implementing purposeful movement
5. Ensure all animations respect accessibility standards

---

## 📋 Prerequisites

Before running this audit, read:
- ✅ **[/guidelines/design-tokens/animations.md](../guidelines/design-tokens/animations.md)** - Complete animation system documentation
- ✅ **[/guidelines/design-tokens/neon-colors.md](../guidelines/design-tokens/neon-colors.md)** - Neon color system
- ✅ **[/guidelines/prefers-reduced-motion.md](../guidelines/prefers-reduced-motion.md)** - Accessibility guidelines

---

## 🔍 Audit Scope

### Pages to Audit (15 total)

**Book Site Pages (11):**
1. `/` - Home (Book landing)
2. `/the-book` - The Book details
3. `/read-the-draft` - Draft preview
4. `/about-ash` - Author bio
5. `/waitlist` - Email signup
6. `/journal` - Blog/updates
7. `/events` - Events calendar
8. `/speaking` - Speaking engagements
9. `/contact` - Contact form
10. `/thank-you` - Confirmation page
11. `/media` - Press kit

**Utility Pages (4):**
12. `/draft-viewer` - Interactive reader
13. `/ebook` - Full ebook reader
14. `/sitemap` - Site index
15. `/style-guide` - Design system docs

### Components to Audit

**Layout Components:**
- Header (navigation)
- Footer
- Mobile menu
- Theme toggle

**UI Components:**
- Buttons (primary, secondary)
- Forms (inputs, textareas, labels)
- Cards (all variants)
- Links
- Tags/badges
- Modals/overlays

**Content Components:**
- Hero sections
- Book cover displays
- Blog post cards
- Event cards
- Testimonials
- Call-to-action blocks

---

## 📊 Analysis Framework

### 1. Current State Analysis

For each page, document:

#### A. Existing Animations
```markdown
**Page:** /page-name

**Current Animations:**
- [ ] Hero section entrance
- [ ] Scroll-triggered reveals
- [ ] Hover states (buttons, cards, links)
- [ ] Loading states
- [ ] Transitions (page load, route changes)
- [ ] Interactive elements (forms, toggles)
- [ ] Decorative animations (neon glow, gradients)

**Animation Inventory:**
| Element | Animation Type | Duration | Trigger | Performance Impact |
|---------|---------------|----------|---------|-------------------|
| Hero title | Fade in | 0.5s | Page load | Low |
| CTA button | Glow pulse | 2s loop | Continuous | Medium |
| Cards | Hover lift | 0.3s | Hover | Low |
```

#### B. Missing Opportunities
```markdown
**Potential Animation Additions:**
- [ ] Page load sequence (staggered reveals)
- [ ] Scroll-triggered section reveals
- [ ] Micro-interactions on form fields
- [ ] Success/error state animations
- [ ] Image loading transitions
- [ ] Navigation feedback
- [ ] Empty state animations
```

#### C. Performance Concerns
```markdown
**Performance Issues:**
- [ ] Too many simultaneous animations
- [ ] Animating non-GPU properties (width, height, margin)
- [ ] Missing will-change hints
- [ ] Excessive box-shadow animations
- [ ] Layout thrashing from repeated reflows
```

#### D. Accessibility Compliance
```markdown
**Accessibility Checks:**
- [ ] Respects prefers-reduced-motion
- [ ] Keyboard focus remains visible during animations
- [ ] Loading states announced to screen readers
- [ ] Animation doesn't interfere with reading
- [ ] Disabled users can skip animations
```

---

### 2. Movement Theming Strategy

Propose a themed approach to movement that aligns with **Nova News' 80s neon CLI aesthetic**:

#### Brand-Aligned Movement Principles

**80s Neon Aesthetic Characteristics:**
- Retro terminal/command-line vibes
- Glowing neon pink (#FF10F0) and yellow (#F4FF3C) accents
- Atomic black (#0F0F0F) backgrounds
- Digital, pixelated, sci-fi feel
- High contrast, vibrant energy

**Proposed Movement Themes:**

1. **"Terminal Boot Sequence"** - Page load animations
   - Typewriter text reveals
   - Line-by-line content appearance
   - Flickering neon glow on load
   - Scan line effects

2. **"Neon Sign Flicker"** - Attention-grabbing moments
   - CTAs with subtle neon pulse
   - Important announcements with glow
   - "ON AIR" style indicators
   - Buzzing neon tube effects

3. **"Digital Glitch"** - Playful micro-interactions
   - Button press with RGB split
   - Hover distortion effects
   - Scan line sweeps
   - Chromatic aberration

4. **"Holographic Reveal"** - Content entrance
   - Slide in with neon trail
   - Fade in with glow expansion
   - Scale in with color shift
   - Grid materialisation

5. **"Cursor Trail"** - Navigation feedback
   - Mouse follow effects (desktop)
   - Tap ripples (mobile)
   - Focus glow expansion
   - Breadcrumb trail animations

---

### 3. Page-Specific Recommendations

For each page, provide specific animation recommendations:

```markdown
### Page: /the-book

**Priority Level:** High (key conversion page)

**Recommended Animations:**

1. **Hero Section:**
   - Book cover: Gentle float animation (3s ease-in-out infinite)
   - Title: Typewriter reveal on load (0.05s per character)
   - Subtitle: Fade in with slide up (0.5s delay)
   - CTA button: Neon pink pulse on hover (2s infinite alternate)

2. **Features Section:**
   - Feature cards: Staggered slide-in on scroll (0.1s delay each)
   - Icons: Scale in with bounce (0.3s spring easing)
   - Hover state: Lift + glow (0.3s ease-out)

3. **Testimonials:**
   - Quote cards: Horizontal scroll with momentum
   - Author images: Neon border glow on hover
   - Navigation: Arrow pulse hint

4. **Footer CTA:**
   - Background: Subtle gradient shift (15s infinite)
   - CTA button: Extra-large neon pulse (3s infinite)

**Performance Considerations:**
- Maximum 3 simultaneous animations
- Use transform + opacity only
- Add will-change to floating book cover

**Accessibility:**
- Disable all decorative animations with prefers-reduced-motion
- Keep CTA hover state (scale only, no glow)
- Ensure typewriter effect can be skipped
```

---

### 4. Component Library Additions

Identify new reusable animation components needed:

```markdown
## New Animation Components

### 1. TypewriterText Component
**Purpose:** Terminal-style text reveal
**Usage:** Hero titles, important announcements
**Props:**
- text: string
- speed: number (ms per character)
- delay: number (ms before start)
- cursor: boolean (show blinking cursor)

### 2. NeonPulseWrapper Component
**Purpose:** Wraps any element with neon glow pulse
**Usage:** CTAs, featured content, live indicators
**Props:**
- color: 'pink' | 'yellow' | 'violet'
- intensity: 'low' | 'medium' | 'high'
- speed: number (duration in seconds)

### 3. ScrollReveal Component
**Purpose:** Reveals children when scrolled into view
**Usage:** Section content, cards, images
**Props:**
- animation: 'fade' | 'slide-up' | 'slide-left' | 'scale'
- delay: number
- stagger: boolean

### 4. GlitchHover Component
**Purpose:** RGB split glitch effect on hover
**Usage:** Interactive elements, playful moments
**Props:**
- intensity: number (px offset)
- duration: number (ms)

### 5. ScanLineOverlay Component
**Purpose:** Animated scan lines across element
**Usage:** Hero sections, featured content
**Props:**
- speed: number (duration in seconds)
- opacity: number (0-1)
- color: string
```

---

## 🎨 Themed Animation Patterns

### Pattern 1: Terminal Boot Sequence (Page Load)

```css
/* Scan line sweep across page */
@keyframes scanLine {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

/* Typewriter text reveal */
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

/* Blinking cursor */
@keyframes cursorBlink {
  0%, 49% { border-right-color: var(--wp--preset--color--neon-pink); }
  50%, 100% { border-right-color: transparent; }
}
```

**Usage:**
```tsx
<h1 className="terminal-text">
  Nova News: This One Time on Acid
</h1>
```

---

### Pattern 2: Neon Tube Flicker

```css
/* Random flicker effect */
@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 
      0 0 10px var(--wp--preset--color--neon-pink),
      0 0 20px var(--wp--preset--color--neon-pink),
      0 0 30px var(--wp--preset--color--neon-pink);
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}
```

**Usage:**
```tsx
<span className="neon-flicker">LIVE NOW</span>
```

---

### Pattern 3: Holographic Shimmer

```css
/* Holographic color shift */
@keyframes holographicShimmer {
  0% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% { 
    background-position: 100% 50%;
    filter: hue-rotate(20deg);
  }
  100% { 
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
}
```

**Usage:**
```tsx
<div className="holographic-card">
  Premium content
</div>
```

---

### Pattern 4: RGB Split Glitch

```css
/* Chromatic aberration effect */
@keyframes rgbSplit {
  0% {
    text-shadow: 
      -2px 0 0 rgba(255, 0, 0, 0.8),
      2px 0 0 rgba(0, 255, 255, 0.8);
  }
  50% {
    text-shadow: 
      2px 0 0 rgba(255, 0, 0, 0.8),
      -2px 0 0 rgba(0, 255, 255, 0.8);
  }
  100% {
    text-shadow: 
      -2px 0 0 rgba(255, 0, 0, 0.8),
      2px 0 0 rgba(0, 255, 255, 0.8);
  }
}
```

**Usage:**
```tsx
<button 
  className="glitch-button"
  onMouseEnter={triggerGlitch}
>
  Enter the Matrix
</button>
```

---

### Pattern 5: Grid Materialisation

```css
/* Grid fade-in effect */
@keyframes gridMaterialise {
  0% {
    opacity: 0;
    transform: scale(0.8);
    clip-path: polygon(
      0% 0%, 0% 0%, 
      0% 100%, 0% 100%
    );
  }
  100% {
    opacity: 1;
    transform: scale(1);
    clip-path: polygon(
      0% 0%, 100% 0%, 
      100% 100%, 0% 100%
    );
  }
}
```

**Usage:**
```tsx
<div className="grid-reveal">
  <img src="/book-cover.jpg" alt="Book cover" />
</div>
```

---

## 📝 Deliverables

### Report Structure

Create a report at `/reports/animation-movement-audit/audit-report.md` with:

1. **Executive Summary**
   - Current animation state overview
   - Key findings
   - Priority recommendations
   - Estimated implementation effort

2. **Page-by-Page Analysis** (15 pages)
   - Current animations inventory
   - Missing opportunities
   - Performance concerns
   - Accessibility compliance
   - Specific recommendations

3. **Themed Animation Strategy**
   - 5 themed movement patterns
   - Brand alignment analysis
   - Implementation examples
   - CSS code snippets

4. **Component Library Proposals**
   - 5+ new animation components
   - Props and usage examples
   - Performance considerations

5. **Implementation Roadmap**
   - Phase 1: Critical fixes (performance, accessibility)
   - Phase 2: High-priority additions (homepage, book page)
   - Phase 3: Component library (reusable animations)
   - Phase 4: Delight moments (micro-interactions, Easter eggs)

6. **Performance Budget**
   - Recommended limits per page type
   - Monitoring strategy
   - Testing checklist

7. **Accessibility Compliance**
   - Prefers-reduced-motion implementation status
   - Required fixes
   - Testing protocol

---

## ✅ Success Criteria

The audit is complete when:

- [ ] All 15 pages analyzed for current animations
- [ ] Missing opportunities identified for each page
- [ ] 5 themed animation patterns documented with code
- [ ] 5+ new animation components proposed
- [ ] Performance concerns identified and solutions proposed
- [ ] Accessibility compliance verified
- [ ] Implementation roadmap created with effort estimates
- [ ] Report saved to `/reports/animation-movement-audit/audit-report.md`
- [ ] Task list extracted to `/tasks/animation-movement-tasks.md`

---

## 🔗 Related Guidelines

- **[/guidelines/design-tokens/animations.md](../guidelines/design-tokens/animations.md)** - Animation system
- **[/guidelines/design-tokens/neon-colors.md](../guidelines/design-tokens/neon-colors.md)** - Color system
- **[/guidelines/prefers-reduced-motion.md](../guidelines/prefers-reduced-motion.md)** - Accessibility
- **[/guidelines/nova-news-dark-mode.md](../guidelines/nova-news-dark-mode.md)** - Dark mode theming

---

**Audit Date:** [To be filled]  
**Conducted By:** [To be filled]  
**Estimated Duration:** 2-3 hours
