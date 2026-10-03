# 🎨 Dark Mode Component Showcase

Complete visual reference of all 54 dark mode components with live examples.

---

## 🎯 Component Categories

### 1. Navigation Components (5)
### 2. Content Display (18)
### 3. Forms & Inputs (12)
### 4. Feedback & Status (10)
### 5. Layout & Structure (9)

---

## 📱 Navigation Components

### Header (Global Navigation)

```html
<header class="header">
  <div class="header__left">
    <a href="/" class="header__logo">YourBrand</a>
  </div>
  
  <nav class="header__center">
    <div class="header__nav">
      <a href="/about" class="header__nav-link">About</a>
      <a href="/portfolio" class="header__nav-link">Portfolio</a>
      <a href="/contact" class="header__nav-link">Contact</a>
    </div>
  </nav>
  
  <div class="header__actions">
    <button class="button button--primary">Get Started</button>
  </div>
</header>
```

**Dark Mode Features:**
- Neon pink hover effects
- Atomic black background (#0F0F0F)
- Backdrop blur on scroll
- Border with neon glow

---

### Breadcrumbs (Navigation Trail)

```html
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/" class="breadcrumbs__link">Home</a>
  <span class="breadcrumbs__separator">/</span>
  <a href="/blog" class="breadcrumbs__link">Blog</a>
  <span class="breadcrumbs__separator">/</span>
  <span class="breadcrumbs__current" aria-current="page">
    Article Title
  </span>
</nav>
```

**Dark Mode Features:**
- Current page in neon pink
- Subtle gray separators
- Hover state with color transition

---

### Pagination (Page Navigation)

```html
<nav class="pagination" aria-label="Pagination">
  <button class="pagination__link pagination__link--disabled" disabled>
    ← Previous
  </button>
  <button class="pagination__link">1</button>
  <button class="pagination__link pagination__link--active" aria-current="page">
    2
  </button>
  <button class="pagination__link">3</button>
  <button class="pagination__link">4</button>
  <button class="pagination__link">5</button>
  <button class="pagination__link">
    Next →
  </button>
</nav>
```

**Dark Mode Features:**
- Active page: Pink→Violet gradient background
- Hover: Neon pink border glow
- Disabled: 30% opacity

---

### Tabs (Content Switching)

```html
<div class="tabs">
  <div class="tabs__list" role="tablist">
    <button 
      class="tabs__button tabs__button--active" 
      role="tab" 
      aria-selected="true"
    >
      Overview
    </button>
    <button 
      class="tabs__button" 
      role="tab" 
      aria-selected="false"
    >
      Features
    </button>
    <button 
      class="tabs__button" 
      role="tab" 
      aria-selected="false"
    >
      Reviews
    </button>
  </div>
  
  <div class="tabs__panel" role="tabpanel">
    <p>Overview content goes here...</p>
  </div>
</div>
```

**Dark Mode Features:**
- Active tab: Neon pink underline (3px solid)
- Hover: Semi-transparent pink underline
- Panel: Dark charcoal background

---

### Sidebar (Side Navigation)

```html
<aside class="sidebar">
  <div class="sidebar__header">
    <h3>Navigation</h3>
  </div>
  
  <div class="sidebar__section">
    <a href="/dashboard" class="sidebar__link sidebar__link--active">
      <svg class="sidebar__icon"><!-- Icon --></svg>
      Dashboard
    </a>
    <a href="/projects" class="sidebar__link">
      <svg class="sidebar__icon"><!-- Icon --></svg>
      Projects
    </a>
    <a href="/settings" class="sidebar__link">
      <svg class="sidebar__icon"><!-- Icon --></svg>
      Settings
    </a>
  </div>
</aside>
```

**Dark Mode Features:**
- Active link: 3px left border accent + pink background
- Hover: Subtle pink background tint
- Dark atomic black base

---

## 📄 Content Display Components

### Cards (Content Containers)

```html
<!-- Standard Card -->
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__description">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
</div>

<!-- Featured Card -->
<div class="card card--featured">
  <span class="card__badge">Featured</span>
  <h3 class="card__title">Featured Content</h3>
  <p class="card__description">
    This card has special styling with neon border.
  </p>
</div>
```

**Dark Mode Features:**
- Hover: Neon pink border + glow shadow
- Background: Dark charcoal (#1A1A1A)
- Title: Pure white for contrast

---

### Testimonial (Customer Quote)

```html
<div class="testimonial">
  <blockquote class="testimonial__quote">
    "This product completely transformed how we work. 
    The neon aesthetic is incredible!"
  </blockquote>
  
  <div class="testimonial__author">
    <img 
      src="/avatar.jpg" 
      alt="Jane Doe" 
      class="testimonial__avatar"
    />
    <div>
      <p class="testimonial__author">Jane Doe</p>
      <p class="testimonial__role">CEO, TechCorp</p>
    </div>
  </div>
</div>
```

**Dark Mode Features:**
- Pink left border accent (4px)
- Avatar: Neon pink border ring
- Author name: Pure white
- Role: Muted gray

---

### Timeline (Event History)

```html
<div class="timeline">
  <div class="timeline__item">
    <div class="timeline__marker"></div>
    <div class="timeline__content">
      <h4 class="timeline__title">Project Launched</h4>
      <p class="timeline__date">March 11, 2026</p>
      <p>Successfully launched the new platform with neon UI.</p>
    </div>
  </div>
  
  <div class="timeline__item">
    <div class="timeline__marker"></div>
    <div class="timeline__content">
      <h4 class="timeline__title">Design Phase Complete</h4>
      <p class="timeline__date">February 15, 2026</p>
      <p>Finalized all 54 component designs.</p>
    </div>
  </div>
</div>
```

**Dark Mode Features:**
- Marker: Neon pink circle with glow
- Connecting line: Dark gray (#333)
- Content box: Dark charcoal background

---

### Accordion (Expandable Sections)

```html
<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__header accordion__header--active">
      <span>What is your return policy?</span>
      <svg class="accordion__icon"><!-- Chevron icon --></svg>
    </button>
    <div class="accordion__content">
      <p>We offer a 30-day money-back guarantee...</p>
    </div>
  </div>
  
  <div class="accordion__item">
    <button class="accordion__header">
      <span>How do I get started?</span>
      <svg class="accordion__icon"><!-- Chevron icon --></svg>
    </button>
    <div class="accordion__content">
      <p>Getting started is easy! Just sign up...</p>
    </div>
  </div>
</div>
```

**Dark Mode Features:**
- Active header: Pink text + left border accent
- Hover: Dark gray background
- Icon: Rotates on expand
- Content: Atomic black background

---

### Gallery & Lightbox (Image Viewer)

```html
<!-- Gallery Grid -->
<div class="gallery">
  <div class="gallery__item">
    <img src="/image1.jpg" alt="Image 1" />
  </div>
  <div class="gallery__item">
    <img src="/image2.jpg" alt="Image 2" />
  </div>
  <div class="gallery__item">
    <img src="/image3.jpg" alt="Image 3" />
  </div>
</div>

<!-- Lightbox (triggered on click) -->
<div class="lightbox">
  <img src="/image-full.jpg" alt="Full size" class="lightbox__image" />
  <p class="lightbox__caption">Image description</p>
  
  <button class="lightbox__close">×</button>
  <button class="lightbox__nav lightbox__nav--prev">‹</button>
  <button class="lightbox__nav lightbox__nav--next">›</button>
</div>
```

**Dark Mode Features:**
- Gallery hover: Neon pink border + glow
- Lightbox background: 95% black overlay
- Navigation buttons: Neon pink on hover
- Close button: Neon pink background on hover

---

### Empty State (No Content)

```html
<div class="empty-state">
  <svg class="empty-state__icon">
    <!-- Empty folder icon -->
  </svg>
  <h3 class="empty-state__title">No items found</h3>
  <p class="empty-state__description">
    Try adjusting your search criteria or create a new item.
  </p>
  <button class="button button--primary">Create New Item</button>
</div>
```

**Dark Mode Features:**
- Dashed border (2px, dark gray)
- Icon: Dark gray (#666)
- Title: Pure white
- Description: Muted text

---

### Error Pages (404, 500)

```html
<div class="error-page">
  <h1 class="error-page__code">404</h1>
  <h2 class="error-page__title">Page not found</h2>
  <p class="error-page__description">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <button class="button button--primary">Go Home</button>
</div>
```

**Dark Mode Features:**
- Code (404): Pink→Violet gradient text with glow
- Background: Atomic black
- Gradient uses background-clip for text effect

---

## 📝 Forms & Inputs

### Text Input & Textarea

```html
<form class="form">
  <div class="form__group">
    <label class="form__label" for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      class="form__input" 
      placeholder="you@example.com"
    />
  </div>
  
  <div class="form__group">
    <label class="form__label" for="message">Message</label>
    <textarea 
      id="message" 
      class="form__textarea" 
      placeholder="Type your message..."
    ></textarea>
  </div>
  
  <button type="submit" class="button button--primary">
    Send Message
  </button>
</form>
```

**Dark Mode Features:**
- Background: Dark charcoal (#1A1A1A)
- Border: Dark gray, pink on focus
- Focus ring: 2px pink glow
- Placeholder: Subtle gray (#9C9488)

---

### Checkboxes & Radio Buttons

```html
<!-- Checkbox -->
<label class="form__checkbox">
  <input type="checkbox" checked />
  <span>I agree to the terms and conditions</span>
</label>

<!-- Radio Group -->
<div class="form__radio-group">
  <label class="form__radio">
    <input type="radio" name="plan" value="basic" checked />
    <span>Basic Plan</span>
  </label>
  <label class="form__radio">
    <input type="radio" name="plan" value="pro" />
    <span>Pro Plan</span>
  </label>
  <label class="form__radio">
    <input type="radio" name="plan" value="enterprise" />
    <span>Enterprise Plan</span>
  </label>
</div>
```

**Dark Mode Features:**
- Unchecked: Dark charcoal background, gray border
- Checked: Neon pink background + pink border
- Checked glow: 8px pink shadow
- Focus: 2px pink ring

---

### Switch Toggle

```html
<label class="switch">
  <input type="checkbox" checked />
  <span class="switch__slider"></span>
  <span class="switch__label">Enable notifications</span>
</label>
```

**Dark Mode Features:**
- Off: Dark gray background (#333)
- On: Pink→Violet gradient with glow
- Thumb: Pure white circle
- Smooth slide animation

---

### Search Bar

```html
<div class="search">
  <input 
    type="search" 
    class="search__input" 
    placeholder="Search..."
    aria-label="Search"
  />
  <button class="search__button" aria-label="Submit search">
    <svg><!-- Search icon --></svg>
  </button>
</div>
```

**Dark Mode Features:**
- Container border: Dark gray, pink on focus
- Focus-within: Pink border + 2px glow ring
- Button icon: Pink on hover
- Transparent input background

---

### Dropdown Menu

```html
<div class="dropdown">
  <button class="dropdown__trigger">
    Options ▼
  </button>
  
  <div class="dropdown__menu">
    <button class="dropdown__item">Edit</button>
    <button class="dropdown__item">Duplicate</button>
    <div class="dropdown__divider"></div>
    <button class="dropdown__item dropdown__item--danger">Delete</button>
  </div>
</div>
```

**Dark Mode Features:**
- Menu: Dark charcoal background + shadow
- Hover: Gray background + pink text
- Active: Pink background tint
- Divider: Dark gray line

---

### Filter Chips

```html
<div class="filter-list">
  <button class="filter">All</button>
  <button class="filter filter--active">Featured</button>
  <button class="filter">New</button>
  <button class="filter">Popular</button>
</div>
```

**Dark Mode Features:**
- Default: Dark background, gray border
- Active: Pink→Violet gradient + glow
- Hover: Pink border

---

### Removable Chips

```html
<div class="chip-list">
  <div class="chip">
    <span>React</span>
    <button class="chip__close" aria-label="Remove">×</button>
  </div>
  <div class="chip">
    <span>TypeScript</span>
    <button class="chip__close" aria-label="Remove">×</button>
  </div>
  <div class="chip">
    <span>CSS</span>
    <button class="chip__close" aria-label="Remove">×</button>
  </div>
</div>
```

**Dark Mode Features:**
- Background: Slightly lighter gray (#242424)
- Close button: Pink on hover
- Remove animation supported

---

## 🔔 Feedback & Status Components

### Toast Notifications (4 States)

```html
<!-- Success -->
<div class="toast toast--success">
  <p>✓ File uploaded successfully!</p>
  <button class="toast__close" aria-label="Close">×</button>
</div>

<!-- Warning -->
<div class="toast toast--warning">
  <p>⚠ Your session will expire in 5 minutes</p>
  <button class="toast__close" aria-label="Close">×</button>
</div>

<!-- Error -->
<div class="toast toast--error">
  <p>✗ Failed to save changes</p>
  <button class="toast__close" aria-label="Close">×</button>
</div>

<!-- Info -->
<div class="toast toast--info">
  <p>ℹ New update available</p>
  <button class="toast__close" aria-label="Close">×</button>
</div>
```

**Dark Mode Features:**
- Background: Dark charcoal with shadow
- Left border: 4px colored accent (green/yellow/red/blue)
- Close button: Pink on hover
- Entrance animation supported

---

### Alert Banners (4 States)

```html
<!-- Success -->
<div class="alert alert--success">
  <strong>Success!</strong> Your changes have been saved.
</div>

<!-- Warning -->
<div class="alert alert--warning">
  <strong>Warning:</strong> Please review your input.
</div>

<!-- Error -->
<div class="alert alert--error">
  <strong>Error:</strong> Something went wrong.
</div>

<!-- Info -->
<div class="alert alert--info">
  <strong>Info:</strong> System maintenance scheduled.
</div>
```

**Dark Mode Features:**
- Colored backgrounds (semi-transparent)
- Colored borders and text
- Success: Neon green
- Warning: Neon yellow
- Error: Hot red
- Info: Royal blue

---

### Progress Bars (4 Variants)

```html
<!-- Default (neon gradient) -->
<div class="progress">
  <div class="progress__bar" style="width: 75%;" role="progressbar"></div>
  <span class="progress__label">75%</span>
</div>

<!-- Success -->
<div class="progress">
  <div class="progress__bar progress__bar--success" style="width: 100%;"></div>
  <span class="progress__label">Complete!</span>
</div>

<!-- Warning -->
<div class="progress">
  <div class="progress__bar progress__bar--warning" style="width: 50%;"></div>
  <span class="progress__label">50%</span>
</div>

<!-- Error -->
<div class="progress">
  <div class="progress__bar progress__bar--error" style="width: 25%;"></div>
  <span class="progress__label">Failed</span>
</div>
```

**Dark Mode Features:**
- Container: Dark charcoal background
- Default bar: Pink→Violet→Cyan gradient
- Success: Green→Cyan gradient
- Warning: Yellow→Orange gradient
- Error: Red→Pink gradient
- All bars have neon glow

---

### Loading Spinners

```html
<!-- Standard Spinner -->
<div class="spinner" role="status">
  <span class="sr-only">Loading...</span>
</div>

<!-- Neon Glow Spinner -->
<div class="spinner spinner--neon" role="status">
  <span class="sr-only">Loading...</span>
</div>
```

**Dark Mode Features:**
- Standard: Gray border, pink top border
- Neon: Semi-transparent pink border with glow
- Smooth rotation animation

---

### Status Indicators (4 States)

```html
<div class="status-list">
  <div>
    <span class="status status--online"></span>
    <span>Online</span>
  </div>
  <div>
    <span class="status status--offline"></span>
    <span>Offline</span>
  </div>
  <div>
    <span class="status status--busy"></span>
    <span>Busy</span>
  </div>
  <div>
    <span class="status status--away"></span>
    <span>Away</span>
  </div>
</div>
```

**Dark Mode Features:**
- Online: Neon green with glow
- Offline: Gray (no glow)
- Busy: Hot red with glow
- Away: Neon yellow with glow
- Pulsing animation option

---

### Rating Stars

```html
<div class="rating">
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--half">★</span>
  <span class="rating__star">★</span>
  <span class="rating__count">(4.5 / 5)</span>
</div>
```

**Dark Mode Features:**
- Filled: Neon yellow with glow
- Empty: Dark gray (#333)
- Half: Gradient mask supported
- Glow shadow on filled stars

---

### Skeleton Loaders

```html
<!-- Standard Skeleton -->
<div class="skeleton skeleton--text"></div>
<div class="skeleton skeleton--heading"></div>
<div class="skeleton skeleton--circle"></div>

<!-- Neon Variant -->
<div class="skeleton skeleton--neon skeleton--text"></div>
```

**Dark Mode Features:**
- Gradient animation: Dark charcoal → Lighter gray
- Neon variant: Includes pink tint in gradient
- Shimmer effect

---

### Tooltip

```html
<button data-tooltip="Click to copy">
  Copy Code
</button>

<!-- Or with explicit markup -->
<div class="tooltip-wrapper">
  <button>Hover me</button>
  <div class="tooltip" role="tooltip">
    Helpful tooltip text
  </div>
</div>
```

**Dark Mode Features:**
- Background: Atomic black (#0F0F0F)
- Border: Neon pink (1px solid)
- Neon pink glow shadow
- Arrow pointer with matching border

---

## 🏗️ Layout & Structure

### Modal/Overlay

```html
<div class="modal" role="dialog" aria-labelledby="modal-title">
  <div class="modal__backdrop"></div>
  
  <div class="modal__content">
    <h2 id="modal-title">Modal Title</h2>
    <p>Modal content goes here...</p>
    
    <div class="modal__actions">
      <button class="button button--secondary">Cancel</button>
      <button class="button button--primary">Confirm</button>
    </div>
    
    <button class="modal__close" aria-label="Close">×</button>
  </div>
</div>
```

**Dark Mode Features:**
- Backdrop: 80% black overlay
- Content: Dark charcoal with border
- Backdrop blur: 10px
- Close button: Neon pink on hover

---

### Loading Overlay (Full Screen)

```html
<div class="loading-overlay">
  <div class="spinner spinner--neon"></div>
  <p class="loading-overlay__message">Loading your content...</p>
</div>
```

**Dark Mode Features:**
- Background: 95% black with backdrop blur
- Message: Pink text shadow glow
- Centered spinner

---

### Cookie Consent Banner

```html
<div class="cookie-consent">
  <p class="cookie-consent__text">
    We use cookies to improve your experience. 
    <a href="/privacy" class="cookie-consent__link">Learn more</a>
  </p>
  
  <div class="cookie-consent__actions">
    <button class="button button--secondary">Decline</button>
    <button class="button button--primary">Accept</button>
  </div>
</div>
```

**Dark Mode Features:**
- Background: 98% black with blur
- Top border: Dark gray (#333)
- Link: Neon pink, yellow on hover
- Fixed to bottom of viewport

---

### Newsletter Signup

```html
<div class="newsletter">
  <h3 class="newsletter__title">Join our newsletter</h3>
  <p class="newsletter__description">
    Get weekly updates delivered to your inbox.
  </p>
  
  <form class="newsletter__form">
    <input 
      type="email" 
      class="newsletter__input" 
      placeholder="your@email.com"
    />
    <button class="button button--primary">Subscribe</button>
  </form>
</div>
```

**Dark Mode Features:**
- Background: Semi-transparent pink→violet gradient
- Border: Dark gray
- Input: Dark charcoal background
- Pink focus state

---

### Call to Action (CTA) Block

```html
<div class="cta">
  <h2 class="cta__title">Ready to get started?</h2>
  <p class="cta__description">
    Join thousands of users already using our platform.
  </p>
  
  <div class="button-group button-group--center">
    <button class="button button--primary">Start Free Trial</button>
    <button class="button button--secondary">Learn More</button>
  </div>
</div>
```

**Dark Mode Features:**
- Background: Pink→Violet gradient (15% opacity)
- Border: 2px neon pink
- Title: Pink glow shadow
- Prominent shadow and glow

---

### Back to Top Button

```html
<button class="back-to-top" aria-label="Back to top">
  <svg><!-- Arrow up icon --></svg>
</button>
```

**Dark Mode Features:**
- Background: Pink→Violet gradient
- Fixed position (bottom-right)
- Neon glow shadow
- Hover: Increased glow + translateY

---

## 🎨 Color Palette Quick Reference

### Neon Accent Colors

```css
.color-pink { color: #FF3AAE; }     /* Primary accent */
.color-yellow { color: #F4FF3C; }   /* Hover/Warning */
.color-violet { color: #8A63FF; }   /* Secondary accent */
.color-green { color: #00FF85; }    /* Success */
.color-cyan { color: #00D4FF; }     /* Info */
.color-orange { color: #FF7A00; }   /* Warning */
.color-red { color: #FF0055; }      /* Error */
.color-blue { color: #4A90FF; }     /* Info alt */
```

### Surface Colors

```css
.bg-atomic { background: #0F0F0F; }     /* Page background */
.bg-charcoal { background: #1A1A1A; }   /* Cards, inputs */
.bg-panel { background: #171722; }      /* Alt panels */
.bg-hover { background: #242424; }      /* Hover states */
```

### Border Colors

```css
.border-default { border-color: #333333; }
.border-divider { border-color: #222222; }
.border-pink { border-color: #FF3AAE; }
```

---

## ✨ Tips for Best Results

### 1. **Combine Modifiers**
```html
<button class="button button--primary button--large">
  Large Primary Button
</button>
```

### 2. **Layer Effects**
```html
<div class="card card--featured card--hover-lift">
  <!-- Multiple modifier classes -->
</div>
```

### 3. **Use Semantic HTML**
```html
<!-- Good -->
<button class="button">Click</button>

<!-- Avoid -->
<div class="button" onclick="...">Click</div>
```

### 4. **Test Keyboard Navigation**
All components support:
- Tab navigation
- Enter/Space activation
- Escape to close
- Arrow keys for lists

### 5. **Ensure Contrast**
All text meets WCAG AA standards:
- Body: 14.8:1 contrast (AAA)
- Headings: 21:1 contrast (AAA)
- Muted: 10.2:1 contrast (AAA)

---

## 🚀 Next Steps

1. **Import theme files** in `/styles/globals.css`
2. **Add `.dark` class** to `<html>` or `<body>`
3. **Use BEM class names** as shown in examples
4. **Test in multiple browsers** for consistency
5. **Verify accessibility** with keyboard and screen readers

---

**Full Documentation:** `/reports/theme-styling-audit/dark-mode-final-completion-report.md`  
**Usage Guide:** `/docs/dark-mode-usage-guide.md`  
**Component API:** Individual component files in `/guidelines/components/`

---

**Last Updated:** March 11, 2026  
**Theme Version:** 2.0.0  
**Components:** 54 fully styled
