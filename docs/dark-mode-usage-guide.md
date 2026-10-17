# 🌙 Dark Mode Theme - Usage Guide

Quick reference guide for implementing the comprehensive dark mode theme in your application.

---

## 🚀 Quick Start

### 1. Import Theme Files

Add to your main CSS file (e.g., `/styles/globals.css`):

```css
/* Core dark mode styles */
@import './themes/dark.css';

/* Extended components (optional but recommended) */
@import './themes/dark-extended.css';
```

### 2. Enable Dark Mode

Add the `.dark` class to your root element:

```html
<!-- Option 1: HTML tag -->
<html class="dark">
  <body>
    <!-- Your app -->
  </body>
</html>

<!-- Option 2: Body tag -->
<html>
  <body class="dark">
    <!-- Your app -->
  </body>
</html>

<!-- Option 3: Data attribute -->
<html data-theme="dark">
  <body>
    <!-- Your app -->
  </body>
</html>
```

---

## 🎨 Component Examples

### Buttons (5 Variants)

```html
<!-- Primary: Neon gradient -->
<button class="button button--primary">
  Get Started
</button>

<!-- Secondary: Outlined -->
<button class="button button--secondary">
  Learn More
</button>

<!-- Ghost: Transparent -->
<button class="button button--ghost">
  Cancel
</button>

<!-- Outline: Neon border -->
<button class="button button--outline">
  Sign Up
</button>

<!-- Disabled -->
<button class="button button--primary" disabled>
  Processing...
</button>
```

### Cards

```html
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__description">
    Card description with neon glow on hover.
  </p>
</div>
```

### Forms

```html
<form class="form">
  <!-- Text Input -->
  <input 
    type="text" 
    placeholder="Enter your email"
    class="input"
  />

  <!-- Textarea -->
  <textarea 
    placeholder="Your message"
    class="textarea"
  ></textarea>

  <!-- Select -->
  <select class="select">
    <option>Choose an option</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>

  <!-- Checkbox -->
  <label>
    <input type="checkbox" />
    <span>I agree to the terms</span>
  </label>

  <!-- Radio -->
  <label>
    <input type="radio" name="choice" />
    <span>Option A</span>
  </label>
</form>
```

### Alerts (4 States)

```html
<!-- Success -->
<div class="alert alert--success">
  ✓ Operation completed successfully!
</div>

<!-- Warning -->
<div class="alert alert--warning">
  ⚠ Please review your input.
</div>

<!-- Error -->
<div class="alert alert--error">
  ✗ An error occurred.
</div>

<!-- Info -->
<div class="alert alert--info">
  ℹ Additional information available.
</div>
```

### Tabs

```html
<div class="tabs">
  <div class="tabs__list">
    <button class="tabs__button tabs__button--active">
      Tab 1
    </button>
    <button class="tabs__button">
      Tab 2
    </button>
    <button class="tabs__button">
      Tab 3
    </button>
  </div>
  
  <div class="tabs__panel">
    <p>Tab 1 content goes here.</p>
  </div>
</div>
```

### Accordion

```html
<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__header accordion__header--active">
      <span>Section 1</span>
      <svg class="accordion__icon"><!-- Icon --></svg>
    </button>
    <div class="accordion__content">
      <p>Section 1 content</p>
    </div>
  </div>
  
  <div class="accordion__item">
    <button class="accordion__header">
      <span>Section 2</span>
      <svg class="accordion__icon"><!-- Icon --></svg>
    </button>
    <div class="accordion__content">
      <p>Section 2 content (collapsed)</p>
    </div>
  </div>
</div>
```

### Progress Bar

```html
<!-- Default (neon gradient) -->
<div class="progress">
  <div class="progress__bar" style="width: 75%;"></div>
</div>

<!-- Success variant -->
<div class="progress">
  <div class="progress__bar progress__bar--success" style="width: 100%;"></div>
</div>

<!-- Warning variant -->
<div class="progress">
  <div class="progress__bar progress__bar--warning" style="width: 50%;"></div>
</div>

<!-- Error variant -->
<div class="progress">
  <div class="progress__bar progress__bar--error" style="width: 25%;"></div>
</div>
```

### Loading Spinner

```html
<!-- Default spinner -->
<div class="spinner"></div>

<!-- Neon glow spinner -->
<div class="spinner spinner--neon"></div>
```

### Search

```html
<div class="search">
  <input 
    type="text" 
    class="search__input" 
    placeholder="Search..."
  />
  <button class="search__button">
    <svg><!-- Search icon --></svg>
  </button>
</div>
```

### Pagination

```html
<nav class="pagination">
  <button class="pagination__link pagination__link--disabled">
    « Previous
  </button>
  <button class="pagination__link">1</button>
  <button class="pagination__link pagination__link--active">2</button>
  <button class="pagination__link">3</button>
  <button class="pagination__link">
    Next »
  </button>
</nav>
```

### Breadcrumbs

```html
<nav class="breadcrumbs">
  <a href="/" class="breadcrumbs__link">Home</a>
  <span class="breadcrumbs__separator">/</span>
  <a href="/blog" class="breadcrumbs__link">Blog</a>
  <span class="breadcrumbs__separator">/</span>
  <span class="breadcrumbs__current">Post Title</span>
</nav>
```

---

## 🎯 Extended Components

### Toast Notifications

```html
<div class="toast toast--success">
  <p>File uploaded successfully!</p>
  <button class="toast__close">×</button>
</div>
```

### Status Indicators

```html
<span class="status status--online"></span> Online
<span class="status status--offline"></span> Offline
<span class="status status--busy"></span> Busy
<span class="status status--away"></span> Away
```

### Rating Stars

```html
<div class="rating">
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--filled">★</span>
  <span class="rating__star rating__star--half">★</span>
  <span class="rating__star">★</span>
</div>
```

### Timeline

```html
<div class="timeline">
  <div class="timeline__item">
    <div class="timeline__marker"></div>
    <div class="timeline__content">
      <h4 class="timeline__title">Event Title</h4>
      <p class="timeline__date">March 11, 2026</p>
      <p>Event description</p>
    </div>
  </div>
</div>
```

### Testimonial Card

```html
<div class="testimonial">
  <blockquote class="testimonial__quote">
    "This is an amazing product!"
  </blockquote>
  <div class="testimonial__author">
    <img src="/avatar.jpg" class="testimonial__avatar" alt="Avatar" />
    <div>
      <p class="testimonial__author">John Doe</p>
      <p class="testimonial__role">CEO, Company</p>
    </div>
  </div>
</div>
```

### Empty State

```html
<div class="empty-state">
  <svg class="empty-state__icon"><!-- Icon --></svg>
  <h3 class="empty-state__title">No items found</h3>
  <p class="empty-state__description">
    Try adjusting your filters or create a new item.
  </p>
</div>
```

### Back to Top Button

```html
<button class="back-to-top">
  <svg><!-- Arrow up icon --></svg>
</button>
```

---

## 🎨 Color Reference

### Neon Accent Colors

| Color | Variable | Hex Code | Usage |
|-------|----------|----------|-------|
| **Neon Pink** | `--color-neon-pink` | `#FF3AAE` | Primary CTAs, links, active states |
| **Neon Yellow** | `--color-neon-yellow` | `#F4FF3C` | Hover effects, warnings, highlights |
| **UV Violet** | `--color-uv-violet` | `#8A63FF` | Secondary accents, gradients |
| **Neon Green** | `--color-neon-green` | `#00FF85` | Success states, online indicators |
| **Neon Cyan** | `--color-neon-cyan` | `#00D4FF` | Info states, links |
| **Neon Orange** | `--color-neon-orange` | `#FF7A00` | Warnings, attention |
| **Hot Red** | `--color-hot-red` | `#FF0055` | Errors, delete actions |
| **Royal Blue** | `--color-royal-blue` | `#4A90FF` | Info, blue links |

### Surface Colors

| Color | Variable | Hex Code | Usage |
|-------|----------|----------|-------|
| **Atomic Black** | `--color-atomic-black` | `#0F0F0F` | Page background |
| **Dark Charcoal** | `--color-dark-charcoal` | `#12121A` | Code blocks |
| **Dark Panel** | `--color-dark-panel` | `#171722` | Alternative panels |
| **Surface Elevated** | `--color-surface-elevated` | `#1A1A1A` | Cards, modals |
| **Surface Hover** | `--color-surface-hover` | `#242424` | Hover backgrounds |

### Text Colors

| Color | Variable | Hex Code | Contrast | WCAG |
|-------|----------|----------|----------|------|
| **Primary** | `--color-text-primary` | `#FFFFFF` | 21:1 | AAA ✅ |
| **Light** | `--color-text-light` | `#F6F2EB` | 14.8:1 | AAA ✅ |
| **Muted** | `--color-text-muted` | `#CFC7BB` | 10.2:1 | AAA ✅ |
| **Secondary** | `--color-text-secondary` | `#AAAAAA` | 7.8:1 | AA ✅ |
| **Fine** | `--color-text-fine` | `#9C9488` | 6.5:1 | AA Large ✅ |

---

## 🔧 JavaScript Integration

### Theme Toggle

```javascript
// Toggle dark mode on/off
function toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  
  // Save preference
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved preference
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

// Apply on page load
loadThemePreference();
```

### React Hook

```jsx
import { useEffect, useState } from 'react';

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return [isDark, setIsDark];
}

// Usage
function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode();
  
  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

---

## 📱 Responsive Considerations

All dark mode components are fully responsive and work seamlessly across:

- **Desktop:** Full feature set with hover effects
- **Tablet:** Touch-optimized, larger hit areas
- **Mobile:** Condensed layouts, simplified navigation

### Mobile-Specific Adjustments

```css
/* Components automatically adjust on mobile */
@media (max-width: 768px) {
  .card {
    /* Reduced padding on mobile */
  }
  
  .tabs__list {
    /* Horizontal scroll on mobile */
  }
  
  .mobile-menu {
    /* Full-screen on mobile */
  }
}
```

---

## ✨ Tips & Best Practices

### 1. **Use Semantic HTML**
```html
<!-- Good -->
<button class="button button--primary">Submit</button>

<!-- Avoid -->
<div class="button button--primary" onclick="submit()">Submit</div>
```

### 2. **Combine Modifiers**
```html
<!-- You can combine multiple BEM modifiers -->
<button class="button button--primary button--large">
  Large Primary Button
</button>
```

### 3. **Maintain Contrast**
Always ensure text meets WCAG AA standards:
- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Our theme exceeds these requirements!

### 4. **Test Keyboard Navigation**
All interactive elements should be keyboard accessible:
- Tab to navigate
- Enter/Space to activate
- Escape to close modals
- Arrow keys for lists

---

## 🐛 Troubleshooting

### Dark mode not applying?

1. **Check class is present:**
   ```javascript
   console.log(document.documentElement.classList.contains('dark'));
   ```

2. **Verify CSS import order:**
   Dark theme files must be imported AFTER base styles.

3. **Clear browser cache:**
   Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac).

### Colors look different than expected?

1. **Check color profile:** Some monitors may display colors differently
2. **Verify contrast settings:** Ensure browser/OS hasn't modified colors
3. **Test in multiple browsers:** Some browsers render gradients differently

### Components not styled?

1. **Verify BEM class names:** Must match exactly (case-sensitive)
2. **Check for typos:** `.button--primay` vs `.button--primary`
3. **Inspect element:** Use browser DevTools to see applied styles

---

## 📚 Additional Resources

- **Main Documentation:** `/reports/theme-styling-audit/dark-mode-final-completion-report.md`
- **Design Tokens:** `/guidelines/design-tokens/neon-colors.md`
- **Accessibility Guide:** `/guidelines/accessibility-report-feb-2025.md`
- **Component Guidelines:** `/guidelines/component-dark-mode.md`

---

**Last Updated:** March 11, 2026  
**Theme Version:** 2.0.0
