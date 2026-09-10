# Nova News Dark Mode Implementation Guide

**Version:** 1.0.0  
**Project:** Nova News (Book Website)  
**Last Updated:** March 12, 2026

Quick reference guide for implementing and maintaining dark mode across the Nova News website with neon pink and yellow accents on atomic black backgrounds.

---

## 🎯 Quick Start

### Color System Summary

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| **Page Background** | `#FAFAFA` (Lighter Gray) | `#0F0F0F` (Atomic Black) |
| **Card/Panel Background** | `#FFFFFF` (White) | `rgba(15, 15, 15, 0.6)` |
| **Primary Text** | `#12121A` (Dark Charcoal) | `#F6F2EB` (Text Light) |
| **Secondary Text** | `#9C9488` (Text Fine) | `#CFC7BB` (Text Muted) |
| **Primary Accent** | `#FF10F0` (Neon Pink) | `#FF10F0` (Same - vibrant!) |
| **Secondary Accent** | `#F4FF3C` (Neon Yellow) | `#F4FF3C` (Same - vibrant!) |
| **Borders (Light)** | `rgba(0, 0, 0, 0.1)` | `rgba(255, 16, 240, 0.2)` |
| **Form Inputs** | `#FFFFFF` bg | `rgba(15, 15, 15, 0.8)` bg |
| **Links** | `#FF10F0` | `#FF10F0` (with enhanced glow) |

---

## 📁 File Structure

### Centralized Dark Mode CSS

**Location:** `/styles/blocks/book-dark-mode.css`

This single file contains ALL dark mode overrides for the entire site. It is imported last in `globals.css` to ensure proper cascade.

```css
/* /styles/globals.css - IMPORT ORDER MATTERS */

/* ... all component styles ... */

/* Dark Mode - MUST BE LAST */
@import './blocks/book-dark-mode.css';
```

---

## 🎨 Selector Pattern (CRITICAL)

**Always use BOTH `.dark` and `body.dark` selectors:**

```css
/* ✅ CORRECT - Catches all theme toggle scenarios */
.dark .component,
body.dark .component {
  background-color: var(--wp--preset--color--atomic-black);
  color: var(--wp--preset--color--text-light);
}

/* ❌ WRONG - Will fail in some scenarios */
.dark .component {
  background-color: var(--wp--preset--color--atomic-black);
}
```

**Why?** The theme toggle can apply `.dark` to either `<html>` or `<body>` depending on React re-renders. Using both selectors ensures consistent behavior.

---

## 🧱 Common Patterns

### 1. Page Backgrounds

```css
.dark .book-home-page,
.dark .the-book-page,
.dark .journal-page,
body.dark .book-home-page,
body.dark .the-book-page,
body.dark .journal-page {
  background-color: var(--wp--preset--color--atomic-black);
}
```

### 2. Typography

```css
/* Headings */
.dark h1,
.dark h2,
.dark h3,
.dark h4,
.dark h5,
.dark h6,
body.dark h1,
body.dark h2,
body.dark h3,
body.dark h4,
body.dark h5,
body.dark h6 {
  color: var(--wp--preset--color--text-light);
}

/* Body text */
.dark p,
.dark .text-body,
body.dark p,
body.dark .text-body {
  color: var(--wp--preset--color--text-light);
}

/* Muted text */
.dark .text-muted,
body.dark .text-muted {
  color: var(--wp--preset--color--text-muted);
}

/* Fine print */
.dark .text-fine,
body.dark .text-fine {
  color: var(--wp--preset--color--text-fine);
}
```

### 3. Buttons

```css
/* Primary button (neon pink) */
.dark .button--primary,
body.dark .button--primary {
  background: linear-gradient(135deg, #FF10F0 0%, #D4008C 100%);
  border-color: var(--wp--preset--color--neon-pink);
  color: white;
  box-shadow: 
    0 0 20px rgba(255, 16, 240, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark .button--primary:hover,
body.dark .button--primary:hover {
  box-shadow: 
    0 0 30px rgba(255, 16, 240, 0.6),
    0 6px 16px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

/* Secondary button (neon yellow outline) */
.dark .button--secondary,
body.dark .button--secondary {
  background: transparent;
  border: 2px solid var(--wp--preset--color--neon-yellow);
  color: var(--wp--preset--color--neon-yellow);
  box-shadow: 0 0 10px rgba(244, 255, 60, 0.3);
}

.dark .button--secondary:hover,
body.dark .button--secondary:hover {
  background: rgba(244, 255, 60, 0.1);
  box-shadow: 0 0 20px rgba(244, 255, 60, 0.5);
}
```

### 4. Forms

```css
/* Input fields */
.dark .form__input,
.dark .form__textarea,
body.dark .form__input,
body.dark .form__textarea {
  background-color: rgba(15, 15, 15, 0.8);
  border: 1px solid rgba(255, 16, 240, 0.3);
  color: var(--wp--preset--color--text-light);
}

/* Placeholder text */
.dark .form__input::placeholder,
.dark .form__textarea::placeholder,
body.dark .form__input::placeholder,
body.dark .form__textarea::placeholder {
  color: var(--wp--preset--color--text-muted);
  opacity: 0.6;
}

/* Focus state */
.dark .form__input:focus,
.dark .form__textarea:focus,
body.dark .form__input:focus,
body.dark .form__textarea:focus {
  border-color: var(--wp--preset--color--neon-pink);
  background-color: rgba(15, 15, 15, 0.9);
  box-shadow: 
    0 0 0 3px rgba(255, 16, 240, 0.2),
    0 0 20px rgba(255, 16, 240, 0.3);
}

/* Labels */
.dark .form__label,
body.dark .form__label {
  color: var(--wp--preset--color--text-light);
}
```

### 5. Cards

```css
.dark .card,
body.dark .card {
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(255, 16, 240, 0.2);
  backdrop-filter: blur(10px);
}

.dark .card:hover,
body.dark .card:hover {
  border-color: var(--wp--preset--color--neon-pink);
  box-shadow: 0 4px 16px rgba(255, 16, 240, 0.3);
  transform: translateY(-4px);
}

.dark .card__title,
body.dark .card__title {
  color: var(--wp--preset--color--text-light);
}

.dark .card__description,
body.dark .card__description {
  color: var(--wp--preset--color--text-muted);
}

/* Yellow outline variant */
.dark .card--outline-yellow,
body.dark .card--outline-yellow {
  border-color: var(--wp--preset--color--neon-yellow);
  box-shadow: 0 0 10px rgba(244, 255, 60, 0.2);
}

.dark .card--outline-yellow:hover,
body.dark .card--outline-yellow:hover {
  box-shadow: 0 0 20px rgba(244, 255, 60, 0.4);
}

/* Violet outline variant */
.dark .card--outline-violet,
body.dark .card--outline-violet {
  border-color: var(--wp--preset--color--uv-violet);
  box-shadow: 0 0 10px rgba(138, 99, 255, 0.2);
}

.dark .card--outline-violet:hover,
body.dark .card--outline-violet:hover {
  box-shadow: 0 0 20px rgba(138, 99, 255, 0.4);
}
```

### 6. Links

```css
.dark a,
body.dark a {
  color: var(--wp--preset--color--neon-pink);
}

.dark a:hover,
body.dark a:hover {
  color: var(--wp--preset--color--neon-pink);
  text-shadow: 0 0 10px rgba(255, 16, 240, 0.6);
}
```

### 7. Code Blocks

```css
.dark pre,
.dark code,
body.dark pre,
body.dark code {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 16, 240, 0.2);
  color: #00ff00; /* Terminal green for retro aesthetic */
}
```

### 8. Tags/Badges

```css
.dark .tag,
body.dark .tag {
  background: transparent;
  border: 1px solid var(--wp--preset--color--neon-pink);
  color: var(--wp--preset--color--neon-pink);
}

.dark .tag:hover,
body.dark .tag:hover {
  box-shadow: 0 0 10px rgba(255, 16, 240, 0.4);
}

.dark .tag--yellow,
body.dark .tag--yellow {
  border-color: var(--wp--preset--color--neon-yellow);
  color: var(--wp--preset--color--neon-yellow);
}

.dark .tag--yellow:hover,
body.dark .tag--yellow:hover {
  box-shadow: 0 0 10px rgba(244, 255, 60, 0.4);
}
```

### 9. Special: Book Cover Glow

```css
/* Keep vibrant glow in both light and dark mode */
.the-book-page__cover-wrapper,
.dark .the-book-page__cover-wrapper,
body.dark .the-book-page__cover-wrapper {
  border: 3px solid var(--wp--preset--color--neon-pink);
  box-shadow: 
    0 0 20px rgba(255, 16, 240, 0.6),
    0 0 40px rgba(255, 16, 240, 0.4),
    0 0 60px rgba(255, 16, 240, 0.2);
}
```

---

## ✅ Testing Checklist

Before marking dark mode complete on any page:

- [ ] Visit page in light mode
- [ ] Click theme toggle in header
- [ ] **Background:** Verify page turns atomic black (`#0F0F0F`)
- [ ] **Text:** All headings and body text are light (`#F6F2EB`)
- [ ] **Buttons:** Pink gradient glows brighter on hover
- [ ] **Forms:** Dark backgrounds with pink borders, pink glow on focus
- [ ] **Cards:** Transparent dark backgrounds with pink borders
- [ ] **Links:** Neon pink with glow on hover
- [ ] **Images:** Still visible and properly contrasted
- [ ] Refresh page → dark mode persists (localStorage)
- [ ] Toggle back to light → everything reverts correctly
- [ ] Test on mobile (responsive breakpoints)

---

## 🚨 Common Mistakes to Avoid

### 1. Forgetting Double Selectors
```css
/* ❌ WRONG */
.dark .card { }

/* ✅ CORRECT */
.dark .card,
body.dark .card { }
```

### 2. Missing Hover States
```css
/* ❌ INCOMPLETE - Only base state */
.dark .button { }

/* ✅ COMPLETE - All states */
.dark .button,
body.dark .button { }

.dark .button:hover,
body.dark .button:hover { }

.dark .button:focus,
body.dark .button:focus { }
```

### 3. Forgetting Nested Elements
```css
/* ❌ WRONG - Only targets parent */
.dark .card { }

/* ✅ CORRECT - Targets all descendants */
.dark .card,
.dark .card h3,
.dark .card p,
.dark .card a,
body.dark .card,
body.dark .card h3,
body.dark .card p,
body.dark .card a { }
```

### 4. Hardcoding Colors Instead of Variables
```css
/* ❌ WRONG */
.dark .text { color: #F6F2EB; }

/* ✅ CORRECT */
.dark .text,
body.dark .text {
  color: var(--wp--preset--color--text-light);
}
```

---

## 🔄 Quick Reference: CSS Variables

```css
/* Background Colors */
--wp--preset--color--atomic-black: #0F0F0F;
--wp--preset--color--dark-charcoal: #12121A;
--wp--preset--color--dark-panel: #171722;
--wp--preset--color--light-gray: #F0F0F0;
--wp--preset--color--lighter-gray: #FAFAFA;

/* Neon Accent Colors */
--wp--preset--color--neon-pink: #FF10F0;
--wp--preset--color--neon-yellow: #F4FF3C;
--wp--preset--color--neon-magenta: #D4008C;
--wp--preset--color--uv-violet: #8A63FF;

/* Text Colors */
--wp--preset--color--text-light: #F6F2EB;
--wp--preset--color--text-muted: #CFC7BB;
--wp--preset--color--text-fine: #9C9488;
```

---

## 📊 Page Coverage Status

All pages have dark mode implemented:

- [x] `/` - Home
- [x] `/the-book` - The Book
- [x] `/read-the-draft` - Read the Draft
- [x] `/about-ash` - About Ash
- [x] `/waitlist` - Waitlist
- [x] `/journal` - Journal
- [x] `/events` - Events
- [x] `/speaking` - Speaking & Workshops
- [x] `/contact` - Contact
- [x] `/thank-you` - Thank You
- [x] `/media` - Media & Press
- [x] `/draft-viewer` - Draft Viewer
- [x] `/ebook` - Ebook Reader
- [x] `/sitemap` - Sitemap
- [x] `/style-guide` - Style Guide

---

## 🎯 Adding Dark Mode to a New Page

1. **No component changes needed** - The dark mode CSS is centralized
2. **Update `/styles/blocks/book-dark-mode.css`** with new page styles
3. **Follow the patterns above** (always double selectors)
4. **Test with checklist**
5. **Mark as complete** in this document

---

## 📚 Related Documentation

- **[dark-mode-lessons-learned.md](./dark-mode-lessons-learned.md)** - Detailed lessons from implementing dark mode (70+ hours of experience)
- **[design-tokens/neon-colors.md](./design-tokens/neon-colors.md)** - Complete neon color system reference
- **[/styles/blocks/book-dark-mode.css](../styles/blocks/book-dark-mode.css)** - Master dark mode CSS file

---

**Last Updated:** March 12, 2026  
**Maintained By:** Nova News Development Team
