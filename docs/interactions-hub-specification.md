# Interactions Hub Specification

**Version:** 1.0.0  
**Date:** March 7, 2026  
**Status:** Planning  
**Category:** Dev Tools Enhancement

---

## 🎯 Overview

The **Interactions Hub** is a comprehensive documentation and demonstration system for all animations, transitions, and interactive patterns used throughout the Ash Shaw Makeup Portfolio. It will serve as both a developer reference and a live demonstration playground for the site's 26+ animation system.

---

## 📋 Scope

### What's Included

- **26 Keyframe Animations** (documented in `/guidelines/design-tokens/animations.md`)
- **Hover Effects** (buttons, cards, links, images)
- **Focus States** (keyboard navigation patterns)
- **Click Animations** (button presses, state changes)
- **Scroll-Triggered Effects** (fade-in, parallax, reveal)
- **Page Transitions** (route changes, modal open/close)
- **Loading States** (spinners, skeletons, progressive loading)
- **Microinteractions** (icon animations, tooltips, badges)

### What's NOT Included

- Static design tokens (covered in existing dev tools)
- Component API documentation (covered in `/dev-tools/api`)
- Layout patterns (covered in grid labs)

---

## 🗂️ Hub Structure

### Main Hub Page

**Route:** `/dev-tools/interactions`  
**Component:** `InteractionsHubPage.tsx`

**Content:**
- Hero section with animated demo showcase
- Stats bar (26 animations, X categories, accessibility features)
- Grid of interaction categories with live previews
- Quick links to most popular interactions
- Implementation checklist (how to add new animations)

### Category Pages

#### 1. Neon Effects (`/dev-tools/interactions/neon-effects`)

**Animations:**
- Neon Pulse (green, pink, blue, cyan, purple, orange, yellow, red)
- Neon Glow Background (Hyperpop gradient shift)
- Neon Border Pulse
- Neon Text Glow
- Neon Shadow Expansion

**Demo:**
- Live buttons with each neon color variant
- Adjustable pulse speed slider
- Toggle animation on/off
- Copy CSS code button

**Implementation Guide:**
```css
.animate-neon-pulse-pink {
  --glow-color: var(--wp--preset--color--neon-pink);
  animation: neonPulse 2s infinite alternate;
  will-change: box-shadow;
}
```

**Used On Site:**
- Homepage hero CTA buttons
- Portfolio featured cards
- Dev tools category badges
- Sticker gallery hover states

---

#### 2. Scroll Animations (`/dev-tools/interactions/scroll-animations`)

**Animations:**
- Float animation (scroll down arrow)
- Bounce animation (notification badges)
- Fade-in on scroll (content reveals)
- Slide-in from sides (cards, panels)
- Parallax scrolling (hero backgrounds)

**Demo:**
- Scrollable container with triggered animations
- Intersection Observer visualization
- Threshold adjustment controls

**Implementation Guide:**
```tsx
// Using Intersection Observer
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(elementRef.current);
}, []);
```

**Used On Site:**
- Blog post card reveals
- Portfolio grid items
- About page timeline entries
- Homepage scroll down arrow

---

#### 3. Hover Effects (`/dev-tools/interactions/hover-effects`)

**Animations:**
- Card lift (transform: translateY)
- Image zoom (scale transform)
- Neon border highlight
- Shadow expansion
- Text gradient shift
- Icon rotation

**Demo:**
- Grid of cards with different hover styles
- Before/after comparison
- Transition duration slider

**Implementation Guide:**
```css
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

**Used On Site:**
- Portfolio cards
- Blog post cards
- Video thumbnails
- Dev tools cards
- Sticker gallery items

---

#### 4. Focus States (`/dev-tools/interactions/focus-states`)

**Patterns:**
- Neon pink focus rings (3px solid + glow)
- Keyboard navigation indicators
- Skip links (visible on focus)
- Form input focus
- Button focus states

**Demo:**
- Interactive keyboard navigation demo
- Tab through elements showcase
- Focus trap demonstration

**Implementation Guide:**
```css
.btn:focus-visible {
  outline: 3px solid var(--wp--preset--color--neon-pink);
  outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(255, 0, 127, 0.2);
}
```

**Used On Site:**
- All buttons site-wide
- Navigation links
- Form inputs
- Card links
- Dev tools interactive elements

---

#### 5. Loading States (`/dev-tools/interactions/loading-states`)

**Animations:**
- Spin animation (loading spinners)
- Skeleton screens
- Progressive image loading
- Shimmer effect
- Pulse loading indicators

**Demo:**
- Loading button states
- Image lazy loading simulation
- Skeleton screen examples

**Implementation Guide:**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1s linear infinite;
  will-change: transform;
}
```

**Used On Site:**
- Form submission buttons
- Image placeholders
- Lazy-loaded content
- Search results loading

---

#### 6. Microinteractions (`/dev-tools/interactions/microinteractions`)

**Animations:**
- Icon bounce on click
- Tooltip fade-in
- Badge pulse (notification dot)
- Checkbox checkmark animation
- Toggle switch slide

**Demo:**
- Interactive button grid
- Click to trigger animations
- Speed/easing adjustment

**Implementation Guide:**
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.icon-bounce {
  animation: bounce 0.6s ease;
}
```

**Used On Site:**
- Social media icons
- Notification badges
- Form validation checkmarks
- Mobile menu toggle
- Scroll to top button

---

#### 7. Page Transitions (`/dev-tools/interactions/page-transitions`)

**Patterns:**
- Fade in/out between routes
- Slide transitions
- Modal open/close animations
- Drawer slide-in
- Toast notifications

**Demo:**
- Route transition simulator
- Modal animation playground
- Toast notification triggers

**Implementation Guide:**
```tsx
// Using Motion (Framer Motion)
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Page content
</motion.div>
```

**Used On Site:**
- Page route changes
- Modal dialogs
- Mobile menu
- Lightbox gallery
- PWA install prompt

---

#### 8. Gradient Animations (`/dev-tools/interactions/gradient-animations`)

**Animations:**
- Hyperpop gradient shift (4-color animated gradient)
- Gradient text animation
- Border gradient rotation
- Background gradient pulse

**Demo:**
- Live gradient editor
- Color stop adjustment
- Animation speed controls

**Implementation Guide:**
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-animated {
  background: var(--wp--preset--gradient--hyperpop);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}
```

**Used On Site:**
- Hero section backgrounds
- Featured portfolio cards
- Dev tools headers
- Call-to-action sections

---

## 🎨 Page Layout Pattern

Each interaction page follows this standard structure:

### 1. Hero Section
- Page title (sentence case)
- Brief description (1-2 sentences)
- Stats bar (X animations, accessibility status)
- Live demo preview (hero-specific animation)

### 2. Animation Grid
- Card-based layout (2-4 columns)
- Each card shows:
  - Animation name
  - Live demo
  - Play/pause toggle
  - Speed adjustment
  - Code snippet (collapsed)

### 3. Implementation Section
- CSS code blocks with syntax highlighting
- React/TypeScript examples where applicable
- Copy-to-clipboard functionality
- Accessibility notes

### 4. Usage Gallery
- "Where it's used on site" section
- Screenshots with hover states
- Links to live pages
- Component references

### 5. Accessibility Considerations
- Reduced motion variants
- Keyboard navigation impact
- Screen reader announcements
- Focus management

---

## 🧩 Component Architecture

### New Components to Create

1. **`InteractionsHubPage.tsx`** — Main hub landing page
2. **`NeonEffectsPage.tsx`** — Neon animations showcase
3. **`ScrollAnimationsPage.tsx`** — Scroll-triggered effects
4. **`HoverEffectsPage.tsx`** — Hover state patterns
5. **`FocusStatesPage.tsx`** — Keyboard focus patterns
6. **`LoadingStatesPage.tsx`** — Loading animations
7. **`MicrointeractionsPage.tsx`** — Small interactions
8. **`PageTransitionsPage.tsx`** — Route transitions
9. **`GradientAnimationsPage.tsx`** — Gradient effects

### Shared Components

1. **`AnimationDemo.tsx`** — Reusable demo container
   - Props: `animation`, `title`, `description`, `code`, `usedOn`
   - Features: Play/pause, speed control, code view toggle
   
2. **`CodeBlock.tsx`** — Syntax-highlighted code display
   - Props: `code`, `language`, `copyable`
   - Features: Copy button, line numbers, theme
   
3. **`InteractionCard.tsx`** — Category card for hub page
   - Props: `title`, `description`, `icon`, `count`, `link`, `preview`
   - Features: Hover animation, badge count, neon accent
   
4. **`UsageGallery.tsx`** — Shows where animation is used
   - Props: `screenshots[]`, `links[]`, `components[]`
   - Features: Image preview, component links

---

## 📊 Data Architecture

### New Data Files

1. **`/data/mock/ui/interactions-hub.ts`** — Hub page content

```typescript
export const interactionsHubContent = {
  hero: {
    title: 'Interactions hub',
    description: 'Explore all 26 animations and interactive patterns used throughout the portfolio.',
    stats: {
      totalAnimations: 26,
      categories: 8,
      accessibilityCompliant: true,
    },
  },
  categories: [
    {
      slug: 'neon-effects',
      title: 'Neon effects',
      description: 'Pulsing glow effects in 8 neon colors',
      icon: 'Sparkle',
      count: 5,
      color: 'neon-pink',
      previewAnimation: 'neonPulse',
    },
    // ... 7 more categories
  ],
};
```

2. **`/data/mock/ui/animations-catalog.ts`** — All animations with metadata

```typescript
export const animationsCatalog = [
  {
    id: 'neon-pulse-pink',
    name: 'Neon pulse (pink)',
    category: 'neon-effects',
    keyframe: 'neonPulse',
    duration: '2s',
    easing: 'infinite alternate',
    reducedMotion: 'paused',
    cssClass: '.animate-neon-pulse-pink',
    usedOn: [
      { page: 'Homepage', component: 'HeroCTA', screenshot: '/screenshots/hero-cta.png' },
      { page: 'Portfolio', component: 'FeaturedCard', screenshot: '/screenshots/portfolio-featured.png' },
    ],
    code: {
      css: `@keyframes neonPulse { ... }`,
      usage: `.btn { animation: neonPulse 2s infinite alternate; }`,
    },
  },
  // ... 25 more animations
];
```

---

## 🚀 Implementation Phases

### Phase 1: Hub + Neon Effects (Week 1)
- [ ] Create `InteractionsHubPage` component
- [ ] Create `NeonEffectsPage` component
- [ ] Build `AnimationDemo` shared component
- [ ] Create `interactions-hub.ts` data file
- [ ] Create `animations-catalog.ts` data file
- [ ] Add routes to `/routes.ts`
- [ ] Add to dev tools footer navigation

### Phase 2: Scroll + Hover Effects (Week 2)
- [ ] Create `ScrollAnimationsPage`
- [ ] Create `HoverEffectsPage`
- [ ] Document all scroll-triggered patterns
- [ ] Document all hover state patterns
- [ ] Create usage galleries

### Phase 3: Focus + Loading States (Week 3)
- [ ] Create `FocusStatesPage`
- [ ] Create `LoadingStatesPage`
- [ ] Document WCAG 2.1 AA focus patterns
- [ ] Document all loading indicators
- [ ] Add keyboard navigation demos

### Phase 4: Micro + Transitions + Gradients (Week 4)
- [ ] Create `MicrointeractionsPage`
- [ ] Create `PageTransitionsPage`
- [ ] Create `GradientAnimationsPage`
- [ ] Complete usage galleries for all pages
- [ ] Add accessibility testing notes

---

## 🎯 Success Criteria

### Developer Experience
- ✅ All 26 animations documented with live demos
- ✅ Copy-paste code snippets for every pattern
- ✅ Clear usage examples with screenshots
- ✅ Accessibility guidance for each interaction

### Design System Consistency
- ✅ Standardized animation naming (kebab-case)
- ✅ Consistent duration/easing values
- ✅ Reduced motion variants for all animations
- ✅ Performance guidelines (will-change, GPU acceleration)

### User Experience
- ✅ Interactive demos (play/pause, speed adjustment)
- ✅ Mobile-responsive interaction cards
- ✅ Search/filter by category or name
- ✅ Related animations suggestions

---

## 🔗 Integration with Existing Dev Tools

### Navigation Updates

**Add to Dev Tools Footer** (`/data/mock/ui/dev-tools-navigation.ts`):

```typescript
{
  category: 'Interactive',
  color: 'purple',
  tools: [
    // ... existing tools
    {
      name: 'Interactions Hub',
      slug: 'interactions',
      icon: 'Lightning',
      description: 'Animation system documentation',
    },
    {
      name: 'Neon Effects',
      slug: 'interactions/neon-effects',
      icon: 'Sparkle',
      description: 'Pulsing glow animations',
    },
    // ... 7 more interaction pages
  ],
},
```

### Sitemap Updates

Add new section to `/components/pages/SitemapPage.tsx`:

```tsx
<div className="sitemap-page__category">
  <h3 className="sitemap-page__category-title">Interactions</h3>
  <ul className="sitemap-page__link-list">
    <li><Link to="/dev-tools/interactions">Interactions Hub</Link></li>
    <li><Link to="/dev-tools/interactions/neon-effects">Neon Effects</Link></li>
    {/* ... 7 more */}
  </ul>
</div>
```

---

## 📈 Expected Impact

### For Developers
- **50% faster** animation implementation (copy-paste snippets)
- **100% coverage** of all site interactions documented
- **Zero guesswork** on where animations are used
- **Accessibility built-in** (reduced motion variants)

### For Design System
- **Single source of truth** for all animations
- **Easier maintenance** (visual regression testing)
- **Consistent patterns** across all pages
- **Documentation debt eliminated**

---

## 🎬 Next Steps

1. **Review this specification** — Confirm scope and structure
2. **Create Phase 1 task list** — Hub + Neon Effects
3. **Design hero layout pattern** — Left-aligned with WebGL graphics
4. **Implement InteractionsHubPage** — Main landing page
5. **Build NeonEffectsPage** — First category page
6. **Iterate and expand** — Add remaining 7 categories

---

**Ready to build the most comprehensive animation documentation system for the portfolio!** 🚀
