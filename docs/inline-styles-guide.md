---
title: "Inline Styles Guide"
filename: "/docs/inline-styles-guide.md"
created: "2026-03-12"
modified: "2026-03-12"
version: "1.0.0"
related_guidelines: "/guidelines/Guidelines.md"
---

# Inline Styles Guide

**Created:** March 12, 2026  
**Last Updated:** March 12, 2026  
**Status:** Active

---

## Overview

This guide documents when to use inline styles vs BEM classes, and specific workarounds needed due to ES5 TypeScript constraints in the Figma Make bundler environment.

**General Rule:** This project follows a **strict BEM (Block Element Modifier)** architecture. Inline styles are **STRICTLY FORBIDDEN** in 99% of cases.

---

## 🚫 Default Position: NO INLINE STYLES

**Priority Order for Styling:**

1. **✅ ONLY CHOICE:** Use BEM classes defined in `/styles/globals.css`
2. **🚫 NEVER:** Use Tailwind utilities
3. **🚫 NEVER:** Use inline styles (with rare exceptions below)

```tsx
// ✅ CORRECT - Semantic BEM Classes
<div className="card card--featured">
  <h2 className="card__title">Title</h2>
</div>

// ❌ WRONG - Inline styles
<div style={{ padding: '16px', backgroundColor: '#0F0F0F' }}>
  Content
</div>
```

---

## ⚠️ Rare Exceptions: When Inline Styles ARE Allowed

### 1. Dynamic User-Generated Values

**When:** CSS custom properties or BEM classes cannot represent the value because it's computed at runtime from user input or external data.

**Example:** Background image from user upload or CMS

```tsx
// ✅ ALLOWED - Dynamic background from CMS
<div 
  className="hero hero--dynamic"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  <h1 className="hero__title">{title}</h1>
</div>
```

**Better Alternative:** Use CSS custom properties

```tsx
// ✅ PREFERRED - CSS custom property
<div 
  className="hero hero--dynamic"
  style={{ '--hero-bg': `url(${heroImage})` } as React.CSSProperties}
>
  <h1 className="hero__title">{title}</h1>
</div>
```

```css
/* In /styles/blocks/hero.css */
.hero--dynamic {
  background-image: var(--hero-bg);
  background-size: cover;
  background-position: center;
}
```

---

### 2. Animation Delays (Staggered Animations)

**When:** Auto-cascading staggered animations where delay is calculated per element.

**Example:** HeroLayout auto-stagger system

```tsx
// ✅ ALLOWED - Calculated animation delay
<div 
  className="hero__subtitle animate-stagger-fade-in"
  style={{ animationDelay: `${index * 100}ms` }}
>
  {subtitle}
</div>
```

**Implementation:** This pattern is used in `/components/sections/HeroLayout.tsx` for terminal boot animations.

**Why inline?** Each element needs a unique delay based on its position in the DOM. Creating 20+ BEM modifier classes (`.hero__subtitle--delay-0`, `.hero__subtitle--delay-1`, etc.) is impractical.

---

### 3. ES5 Bundler Workarounds (Figma Make Constraints)

**When:** The Figma Make bundler has specific syntax incompatibilities that require inline styles as a workaround.

#### Forbidden Syntax → Required Workaround Table

| Forbidden Syntax | Required Workaround | Example |
|---|---|---|
| Optional chaining (`?.`) | Explicit null checks | `if (obj != null) { obj.prop }` |
| Nullish coalescing (`??`) | Explicit if/else | `value != null ? value : default` |
| `import.meta.env` | Completely removed | Never use environment variables in bundler |
| Nested ternaries | if/else blocks | Convert to multi-line conditionals |
| `for...of` loops | Classic for loops | `for (var i = 0; i < arr.length; i++)` |
| Object literals in JSX | Property-by-property assignment | Use `setProp()` helper |
| Bracket notation | `grab()` or `arrayGet()` helpers | See `/lib/router.tsx` |
| `new Set<>()` generics in `.tsx` | Use without generic | `new Set()` (cast separately if needed) |
| Arrow callbacks (certain contexts) | Named function expressions | `function handleClick() { }` |
| `break` in loops inside closures | `i = length` pattern | Exit loop without break keyword |

**Helper Functions** (defined in `/lib/router.tsx`):

```tsx
// Safe property read via Object.entries() iteration
grab(obj, key)

// Safe array access
arrayGet(arr, index)

// Safe property write via Object.defineProperty
setProp(obj, key, value)

// Object construction with Object.entries() and explicit if/else
buildContextValue()
```

#### Example: Object Literal Workaround

```tsx
// ❌ FORBIDDEN - Object literal in JSX (breaks bundler)
<div style={{ padding: '16px', margin: '8px' }}>

// ✅ WORKAROUND - Property-by-property assignment
var styles = {};
setProp(styles, 'padding', '16px');
setProp(styles, 'margin', '8px');
<div style={styles}>
```

**Note:** This is only needed in router/lib code where bundler constraints are strictest. In regular component files, inline styles should still be avoided in favor of BEM classes.

---

### 4. Third-Party Library Requirements

**When:** A third-party library expects inline styles as props (e.g., React DnD, React Virtualized).

**Example:** react-window

```tsx
// ✅ ALLOWED - Library expects style object
<FixedSizeList
  itemSize={100}
  style={{ border: '1px solid var(--color-neon-pink)' }}
>
  {Row}
</FixedSizeList>
```

**Better Alternative:** Check if library accepts className prop instead

```tsx
// ✅ PREFERRED - Use className if supported
<FixedSizeList
  itemSize={100}
  className="virtual-list"
>
  {Row}
</FixedSizeList>
```

---

## 🎯 Decision Tree: Should I Use Inline Styles?

```
START
  |
  ├─ Is this a dynamic value from user input or CMS?
  |    └─ YES → Can it be a CSS custom property?
  |         ├─ YES → Use CSS custom property (PREFERRED)
  |         └─ NO → Inline style ALLOWED
  |
  ├─ Is this a calculated animation delay?
  |    └─ YES → Inline style ALLOWED (only for animationDelay)
  |
  ├─ Is this required by the Figma Make bundler constraints?
  |    └─ YES → Use setProp() helper + inline styles
  |
  ├─ Is this required by a third-party library?
  |    └─ YES → Check if className is supported
  |         ├─ YES → Use BEM class (PREFERRED)
  |         └─ NO → Inline style ALLOWED
  |
  └─ None of the above?
       └─ NO INLINE STYLES - Use BEM classes
```

---

## 🚨 Common Mistakes to Avoid

### ❌ MISTAKE 1: Using inline styles for static values

```tsx
// ❌ WRONG
<div style={{ padding: '2rem', backgroundColor: '#0F0F0F' }}>

// ✅ CORRECT
<div className="section section--dark">
```

### ❌ MISTAKE 2: Using inline styles for responsive design

```tsx
// ❌ WRONG
<div style={{ 
  width: window.innerWidth > 768 ? '1200px' : '100%' 
}}>

// ✅ CORRECT - Media queries in CSS
<div className="container container--wide">
```

```css
/* In /styles/blocks/container.css */
.container--wide {
  width: 100%;
}

@media (min-width: 768px) {
  .container--wide {
    width: 1200px;
  }
}
```

### ❌ MISTAKE 3: Using inline styles for hover states

```tsx
// ❌ WRONG
const [hovered, setHovered] = useState(false);

<button
  style={{ 
    backgroundColor: hovered ? '#FF10F0' : 'transparent' 
  }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>

// ✅ CORRECT - CSS pseudo-class
<button className="btn btn--outline">
```

```css
/* In /styles/blocks/button.css */
.btn--outline {
  background-color: transparent;
  border: 2px solid var(--color-neon-pink);
}

.btn--outline:hover {
  background-color: var(--color-neon-pink);
}
```

---

## 📚 Examples from Codebase

### Example 1: Footer Link Buttons (BEFORE/AFTER)

**BEFORE (Inline Styles - WRONG):**

```tsx
// ❌ OLD CODE - /components/common/Footer.tsx
<button
  onClick={handleCopyLink}
  style={{ 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer' 
  }}
>
  Copy link
</button>
```

**AFTER (BEM Classes - CORRECT):**

```tsx
// ✅ NEW CODE - /components/common/Footer.tsx
<button
  onClick={handleCopyLink}
  className="footer__copy-link"
>
  Copy link
</button>
```

```css
/* In /styles/blocks/footer.css */
.footer__copy-link {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--color-text-light);
  transition: color var(--transition-fast);
}

.footer__copy-link:hover {
  color: var(--color-neon-pink);
}
```

**Result:** Migration completed in Modern React Migration audit (Task 15 ✅)

---

### Example 2: HeroLayout Auto-Stagger (ALLOWED)

```tsx
// ✅ ALLOWED - /components/sections/HeroLayout.tsx
{autoStagger && (
  <div 
    className="hero__subtitle animate-stagger-fade-in"
    style={{ animationDelay: `${1 * 100}ms` }}
  >
    {subtitle}
  </div>
)}

{autoStagger && (
  <div 
    className="hero__description animate-stagger-fade-in"
    style={{ animationDelay: `${2 * 100}ms` }}
  >
    {description}
  </div>
)}
```

**Why allowed?** Each element needs a unique calculated delay. The animation class is still defined in BEM CSS - only the delay is inline.

---

### Example 3: Dynamic Background Image (PREFERRED METHOD)

```tsx
// ✅ PREFERRED - CSS custom property
import { heroImages } from '@/data/mock/images/hero-images';

<div 
  className="hero hero--dynamic"
  style={{ '--hero-bg': `url(${heroImages.home})` } as React.CSSProperties}
>
  <h1 className="hero__title">Welcome</h1>
</div>
```

```css
/* In /styles/blocks/hero.css */
.hero--dynamic {
  background-image: var(--hero-bg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

---

## 🔧 Refactoring Guidelines

### When You Find Inline Styles in Code

1. **Identify the reason** - Is it truly dynamic or just convenience?
2. **Check if static** - If the value never changes, create a BEM class
3. **Check if CSS custom property works** - Prefer this over inline styles
4. **Document if exception** - If it's a valid exception, add a comment

```tsx
// ✅ GOOD - Documented exception
<div 
  className="hero__media animate-float"
  // Inline style required: staggered animation delay (auto-calculated)
  style={{ animationDelay: `${index * 100}ms` }}
>
```

---

## 📖 Related Guidelines

- **[Guidelines.md](../guidelines/Guidelines.md)** - Main project guidelines (Section 7: BEM Architecture)
- **[tailwind-to-bem-mapping.md](../guidelines/tailwind-to-bem-mapping.md)** - Tailwind → BEM conversion guide
- **[bem-migration-success.md](./bem-migration-success.md)** - Case study of successful migration

---

## 📊 Summary Table

| Use Case | Inline Style? | Alternative | Example |
|---|---|---|---|
| Static padding/margin | ❌ NO | BEM class | `.section { padding: 2rem; }` |
| Static colors | ❌ NO | BEM class | `.card { background: var(--color-atomic-black); }` |
| Hover states | ❌ NO | CSS pseudo-class | `.btn:hover { }` |
| Responsive design | ❌ NO | Media queries | `@media (min-width: 768px) { }` |
| Dynamic CMS background | ✅ YES | CSS custom property (preferred) | `style={{ '--hero-bg': url }}` |
| Calculated animation delay | ✅ YES | Inline animationDelay | `style={{ animationDelay: '100ms' }}` |
| Third-party library props | ✅ YES (if no className) | Use className if available | Check library docs |
| ES5 bundler workarounds | ✅ YES (with helper) | Use setProp() helper | See `/lib/router.tsx` |

---

## ✅ Checklist for New Components

Before committing a new component:

- [ ] All static styles use BEM classes (no inline styles)
- [ ] No Tailwind utility classes (strict BEM only)
- [ ] Dynamic values use CSS custom properties where possible
- [ ] Inline styles are only used for valid exceptions (documented with comment)
- [ ] Animation delays are the only inline style property (if needed)
- [ ] No hardcoded colors/spacing (use CSS custom properties)

---

**Last Updated:** March 12, 2026  
**Maintained By:** Development Team
