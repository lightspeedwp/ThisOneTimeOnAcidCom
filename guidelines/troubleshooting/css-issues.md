# CSS Issues Troubleshooting

**Version:** 1.0.0  
**Last Updated:** January 2025

Common CSS styling issues and their solutions for the Ash Shaw Makeup Portfolio.

## 📋 Table of Contents

1. [Light/Dark Mode Issues](#lightdark-mode-issues)
2. [Spacing Issues](#spacing-issues)
3. [Typography Issues](#typography-issues)
4. [Responsive Issues](#responsive-issues)
5. [Known Issues](#known-issues)

---

## Light/Dark Mode Issues

### Issue 1: `.bg-card:hover` Forces Black Background in Light Mode

**Status:** 🐛 **KNOWN ISSUE** - Fix pending in v4.1.1

**Problem:**  
Cards with the `.bg-card` class turn completely black on hover in light mode, making them unreadable. This breaks the user experience and accessibility.

**Root Cause:**  
The global CSS file (`/styles/globals.css`) around line 2375 has an incorrect hover state that applies black background to both light and dark modes:

```css
/* ❌ CURRENT - BROKEN */
.bg-card:hover {
  background-color: #000000;  /* Forces black in light mode - WRONG! */
}

.dark .bg-card:hover {
  background-color: #000000;  /* Correct for dark mode */
}
```

**Affected Components:**
- `SliderCard.tsx` - Homepage featured portfolio section
- `PortfolioCard.tsx` - Portfolio gallery page
- Any custom component using `.bg-card` class

**Solution:**  
Update `/styles/globals.css` at lines 2375-2377 to use light gray hover in light mode:

```css
/* ✅ CORRECT - FIXED */
.bg-card:hover {
  background-color: #f9fafb;  /* gray-50 - very light gray for light mode */
}

.dark .bg-card:hover {
  background-color: #000000;  /* Keep black for dark mode */
}
```

**Testing After Fix:**
1. Open homepage in light mode
2. Hover over featured portfolio cards
3. Verify cards show light gray hover state (not black)
4. Switch to dark mode
5. Verify cards show black hover state

**Alternative Workaround (Temporary):**  
If you can't update globals.css immediately, override in component:

```tsx
// Temporary workaround in component
<div className="bg-card hover:bg-gray-50 dark:hover:bg-black">
  Card content
</div>
```

---

### Issue 2: Missing Dark Mode Classes

**Problem:**  
Component doesn't change appearance when theme switches to dark mode.

**Root Cause:**  
Component is missing `dark:` prefixed Tailwind classes.

**Solution:**
```tsx
// ❌ WRONG - Missing dark mode
<div className="bg-white text-gray-800">
  Content
</div>

// ✅ CORRECT - Both themes supported
<div className="bg-white dark:bg-purple-900 text-gray-800 dark:text-purple-100">
  Content
</div>
```

**Checklist for Dark Mode:**
- [ ] Background colors have `dark:` variants
- [ ] Text colors have `dark:` variants  
- [ ] Border colors have `dark:` variants
- [ ] Hover states work in both modes
- [ ] Focus states visible in both modes

---

### Issue 3: Low Contrast in Dark Mode

**Problem:**  
Text is hard to read against dark purple backgrounds.

**Root Cause:**  
Using mid-tone purple colors that don't have enough contrast.

**Solution:**
```tsx
// ❌ WRONG - Insufficient contrast (fails WCAG)
<p className="text-purple-500 dark:text-purple-500">
  Hard to read text
</p>

// ✅ CORRECT - High contrast (passes WCAG AA)
<p className="text-gray-700 dark:text-purple-100">
  Readable text
</p>
```

**Recommended Dark Mode Text Colors:**
- **Headings:** `dark:text-purple-100` (high contrast)
- **Body text:** `dark:text-purple-100` or `dark:text-white`
- **Secondary text:** `dark:text-purple-300`
- **Muted text:** `dark:text-purple-400`

**Testing Contrast:**
1. Use Chrome DevTools Lighthouse
2. Check for WCAG 2.1 AA compliance (4.5:1 minimum)
3. Test with actual users in both modes

---

## Spacing Issues

### Issue 4: Inconsistent Section Padding

**Problem:**  
Sections have different vertical padding, creating visual inconsistency.

**Root Cause:**  
Not using standardized spacing classes from globals.css.

**Solution:**  
Use standardized section padding classes:

```tsx
// ❌ WRONG - Arbitrary padding
<section className="py-12 md:py-16 lg:py-20">
  Content
</section>

// ✅ CORRECT - Standardized spacing
<section className="py-section-md">
  Content
</section>
```

**Available Section Padding Classes:**
- `.py-section-xs` - 16px top/bottom
- `.py-section-sm` - Fluid 16px → 32px (halved VH/VW)
- `.py-section-md` - Fluid 24px → 48px (halved VH/VW)
- `.py-section-md-plus` - Fluid 27.6px → 55.2px (15% more than md)
- `.py-section-lg` - Fluid 32px → 64px (halved VH/VW)

**When to Use Each:**
- **xs**: Tight sections (FAQ accordions)
- **sm**: Compact sections (newsletter signup)
- **md**: Standard sections (about, portfolio)
- **md-plus**: Emphasized sections (hero variants)
- **lg**: Major sections (homepage hero)

---

### Issue 5: Card Padding Too Large/Small

**Problem:**  
Card content feels cramped or too spaced out.

**Root Cause:**  
Using wrong padding scale or not using responsive classes.

**Solution:**

```tsx
// ❌ WRONG - Fixed padding
<div className="p-4">
  Content
</div>

// ✅ CORRECT - Responsive fluid padding
<div className="p-card-responsive">
  Content
</div>

// ✅ OR - Use fluid scale
<div className="p-fluid-md">
  Content
</div>
```

**Card Padding Scale:**
- `.p-fluid-xs` - Very tight cards
- `.p-fluid-sm` - Compact cards
- `.p-fluid-md` - Standard cards (default)
- `.p-fluid-lg` - Spacious cards
- `.p-card-responsive` - Automatically adjusts by viewport

---

## Typography Issues

### Issue 6: Text Not Scaling Properly

**Problem:**  
Text looks too small on mobile or too large on desktop.

**Root Cause:**  
Using fixed font sizes instead of fluid typography classes.

**Solution:**

```tsx
// ❌ WRONG - Fixed sizes
<h1 className="text-4xl">
  Title
</h1>

// ✅ CORRECT - Fluid scaling
<h1 className="text-hero-h1">
  Title
</h1>
```

**Fluid Typography Classes:**
- `.text-hero-h1` - clamp(2.25rem, 6vw, 7.5rem) - Main hero titles
- `.text-section-h2` - clamp(1.5rem, 4vw, 3rem) - Section headings
- `.text-section-h3` - clamp(1.25rem, 3vw, 2rem) - Sub-headings
- `.text-body-guideline` - clamp(1rem, 1.5vw, 1.25rem) - Body text

**When to Use:**
- Always use fluid classes for headings
- Use fluid classes for body text in hero/large sections
- Can use fixed sizes for small UI elements (buttons, labels)

---

### Issue 7: Font Family Not Applied

**Problem:**  
Component shows default system font instead of brand fonts.

**Root Cause:**  
Missing font family class.

**Solution:**

```tsx
// ❌ WRONG - No font family
<h2>
  Heading
</h2>

// ✅ CORRECT - Explicit font family
<h2 className="font-heading">
  Heading
</h2>
```

**Font Family Classes:**
- `.font-title` - Righteous (main hero titles only)
- `.font-heading` - Playfair Display (elegant serif for headings)
- `.font-body` - Inter (clean sans-serif for body text)

---

## Responsive Issues

### Issue 8: Layout Breaks on Mobile

**Problem:**  
Desktop layout doesn't adapt properly to mobile screens.

**Root Cause:**  
Using fixed widths or not mobile-first approach.

**Solution:**

```tsx
// ❌ WRONG - Desktop-first
<div className="flex gap-8 w-full">
  <div className="w-1/3">Sidebar</div>
  <div className="w-2/3">Content</div>
</div>

// ✅ CORRECT - Mobile-first responsive
<div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
  <div className="w-full lg:w-1/3">Sidebar</div>
  <div className="w-full lg:w-2/3">Content</div>
</div>
```

**Responsive Patterns:**
1. Start with mobile layout (single column)
2. Add breakpoint prefixes for larger screens (sm:, md:, lg:, xl:)
3. Use `flex-col` on mobile, `flex-row` on desktop
4. Make images/containers `w-full` by default

---

### Issue 9: Images Overflow Container

**Problem:**  
Images break out of their containers on small screens.

**Root Cause:**  
Missing responsive image classes.

**Solution:**

```tsx
// ❌ WRONG - No responsive sizing
<img src={url} alt={alt} />

// ✅ CORRECT - Responsive image
<img 
  src={url} 
  alt={alt}
  className="w-full h-auto object-cover rounded-lg"
/>
```

**Image Responsive Classes:**
- `w-full` - Fill container width
- `h-auto` - Maintain aspect ratio
- `object-cover` - Fill area (may crop)
- `object-contain` - Show full image (may letterbox)
- `max-w-full` - Prevent overflow

---

## Known Issues

### Current Known Issues (v4.1.0)

| Issue | Component | Status | Fix Version |
|-------|-----------|--------|-------------|
| `.bg-card:hover` black in light mode | SliderCard, PortfolioCard | 🐛 Known | v4.1.1 |
| Hero media container max-width constraint | HeroLayout | 🔄 In Progress | TBD |

### Reporting New Issues

If you discover a CSS issue:

1. **Check this document first** - Issue may already be documented
2. **Check globals.css** - May be global style conflict
3. **Document the issue:**
   - Component affected
   - Expected behavior
   - Actual behavior
   - Code snippet
   - Screenshots (light & dark mode)
4. **Add to guidelines** - Update this file with solution

---

## Best Practices

### ✅ DO

1. **Use global CSS classes first**
   ```tsx
   <div className="bg-card p-card-responsive rounded-card-default">
   ```

2. **Always include dark mode variants**
   ```tsx
   <div className="bg-white dark:bg-purple-900">
   ```

3. **Use fluid typography for scalability**
   ```tsx
   <h1 className="text-hero-h1">
   ```

4. **Test in both light and dark modes**
   - Visual check
   - Contrast check
   - Hover states

5. **Use semantic spacing classes**
   ```tsx
   <section className="py-section-md">
   ```

### ❌ DON'T

1. **Don't use inline styles**
   ```tsx
   // ❌ BAD
   <div style={{ padding: '16px' }}>
   ```

2. **Don't use arbitrary values**
   ```tsx
   // ❌ BAD
   <div className="p-[23px]">
   ```

3. **Don't skip dark mode classes**
   ```tsx
   // ❌ BAD
   <div className="bg-white text-gray-800">
   ```

4. **Don't hardcode colors**
   ```tsx
   // ❌ BAD
   <div className="bg-[#f5f5f5]">
   ```

5. **Don't mix utility classes with globals inconsistently**
   ```tsx
   // ⚠️ AVOID - Pick one approach per component
   <div className="bg-card p-4">  // Mixed
   ```

---

## Quick Reference

### Debug Checklist

When CSS isn't working as expected:

- [ ] Is dark mode variant included? (`.dark:`)
- [ ] Is the global CSS class spelled correctly?
- [ ] Is there a conflicting inline style?
- [ ] Is component importing globals.css?
- [ ] Is Tailwind config including the file?
- [ ] Are there browser console errors?
- [ ] Does it work in incognito/private mode?
- [ ] Have you cleared cache and rebuilt?

### Useful Dev Tools

1. **Chrome DevTools**
   - Inspect Element → Computed Styles
   - Check which styles are being applied
   - Identify conflicting rules

2. **Lighthouse Audit**
   - Performance issues
   - Accessibility (contrast ratios)
   - Best practices

3. **Responsive Design Mode**
   - Test all breakpoints (320px - 2560px)
   - Check landscape/portrait orientations

---

**Related Documentation:**
- [Guidelines.md](../Guidelines.md) - Main guidelines
- [dark-mode-implementation.md](../dark-mode-implementation.md) - Dark mode guide
- [design-tokens/spacing.md](../design-tokens/spacing.md) - Spacing system
- [design-tokens/colors.md](../design-tokens/colors.md) - Color palette
- [design-tokens/typography.md](../design-tokens/typography.md) - Typography scale

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained by:** Ash Shaw Portfolio Team
