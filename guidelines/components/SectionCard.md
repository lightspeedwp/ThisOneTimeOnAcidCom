# SectionCard Component

**Version:** 5.0.0  
**Last Updated:** January 2025

SectionCard fully supports light and dark mode with theme-aware styling.

## Light/Dark Mode Support

### Light Mode Styling

**Default Appearance:**
```tsx
<SectionCard className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border-2 border-gray-200 dark:border-purple-700/50 shadow-lg transition-colors duration-300">
  <h2 className="text-gray-800 dark:text-purple-100 font-heading font-bold mb-fluid-md">
    Section Title
  </h2>
  <p className="text-gray-700 dark:text-purple-100 font-body">
    Content with proper contrast in light mode
  </p>
</SectionCard>
```

**Characteristics:**
- Background: `bg-white/80` - Clean white with 80% opacity
- Text: `text-gray-800` for headings, `text-gray-700` for body
- Borders: `border-gray-200` - Subtle gray borders
- Shadows: `shadow-lg` - Professional depth
- Professional, minimal aesthetic

### Dark Mode Styling

**Dark Mode Appearance:**
```tsx
<SectionCard className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border-2 border-gray-200 dark:border-purple-700/50 shadow-lg dark:shadow-purple-500/20 transition-colors duration-300">
  <h2 className="text-gray-800 dark:text-purple-100 font-heading font-bold mb-fluid-md">
    Section Title
  </h2>
  <p className="text-gray-700 dark:text-purple-100 font-body">
    Content with proper contrast in dark mode
  </p>
</SectionCard>
```

**Characteristics:**
- Background: `dark:bg-purple-900/50` - Rich purple with 50% opacity
- Text: `dark:text-purple-100` - High contrast lavender
- Borders: `dark:border-purple-700/50` - Purple-tinted borders
- Shadows: `dark:shadow-purple-500/20` - Glowing purple shadows
- Rich, elegant aesthetic

### Theme Transition

**Smooth Transitions:**
```tsx
<SectionCard className="bg-white/80 dark:bg-purple-900/50 transition-all duration-300">
  {/* Content transitions smoothly when theme changes */}
</SectionCard>
```

**Transition Properties:**
- Duration: `300ms` (smooth, not jarring)
- Properties: `background-color`, `border-color`, `color`, `box-shadow`
- No layout shift
- No flickering

### Color Patterns

**Background Colors:**
```css
/* Light Mode */
bg-white/80              /* Primary card background */
bg-white/60              /* Lighter glass effect */
bg-gray-50               /* Subtle alternative */

/* Dark Mode */
dark:bg-purple-900/50    /* Primary card background */
dark:bg-purple-900/40    /* Lighter variant */
dark:bg-purple-800/50    /* Darker variant */
```

**Text Colors:**
```css
/* Light Mode */
text-gray-800            /* Headings (7:1 contrast - AAA) */
text-gray-700            /* Body text (4.83:1 contrast - AA) */
text-gray-600            /* Secondary text */

/* Dark Mode */
dark:text-purple-100     /* Headings & body (12:1+ contrast - AAA+) */
dark:text-purple-200     /* Secondary text */
dark:text-purple-300     /* Tertiary text */
```

**Border Colors:**
```css
/* Light Mode */
border-gray-200          /* Subtle borders */
border-gray-300          /* Stronger borders */
border-white/50          /* Glass effect borders */

/* Dark Mode */
dark:border-purple-700/50    /* Primary borders */
dark:border-purple-800       /* Stronger borders */
dark:border-purple-700       /* Solid purple borders */
```

### Accessibility Compliance

**WCAG 2.1 AA Standards:**

**Light Mode:**
- Heading contrast: 7.02:1 (AAA ✅)
- Body text contrast: 4.83:1 (AA ✅)
- Interactive elements: 4.5:1+ (AA ✅)

**Dark Mode:**
- Heading contrast: 12.8:1 (AAA+ ✅)
- Body text contrast: 12.8:1 (AAA+ ✅)
- Interactive elements: 8:1+ (AAA ✅)

### Usage Examples

**Standard Card (Both Themes):**
```tsx
<SectionCard className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-purple-500/30 transition-all duration-300">
  <div className="flex items-center gap-4 mb-fluid-sm">
    <Sparkles className="w-8 h-8 text-pink-500 dark:text-pink-400" />
    <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 dark:text-purple-100">
      Feature Title
    </h3>
  </div>
  <p className="text-body-guideline font-body text-gray-700 dark:text-purple-100 leading-relaxed">
    Feature description with automatic theme adaptation
  </p>
</SectionCard>
```

**Interactive Card (Both Themes):**
```tsx
<SectionCard
  onClick={handleClick}
  className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl dark:hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-purple-500"
>
  <h3 className="text-gray-800 dark:text-purple-100 font-heading font-semibold mb-fluid-sm">
    Clickable Card
  </h3>
  <p className="text-gray-700 dark:text-purple-100 font-body">
    Hover for enhanced shadow effect in both themes
  </p>
</SectionCard>
```

**Loading State (Both Themes):**
```tsx
<SectionCard className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700/50 animate-pulse">
  <div className="space-y-4">
    <div className="h-6 bg-gray-200 dark:bg-purple-800/50 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 dark:bg-purple-800/50 rounded w-full"></div>
    <div className="h-4 bg-gray-200 dark:bg-purple-800/50 rounded w-5/6"></div>
  </div>
</SectionCard>
```

### Theme-Specific Variations

**Enhanced Dark Mode Glow:**
```tsx
<SectionCard className="bg-white/80 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-white/50 dark:border-purple-700 shadow-lg dark:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300">
  <h3 className="text-gray-800 dark:text-purple-100">Glowing Dark Mode Card</h3>
</SectionCard>
```

**Light Mode Subtle:**
```tsx
<SectionCard className="bg-gray-50 dark:bg-purple-900/50 backdrop-blur-sm rounded-xl p-fluid-md border border-gray-100 dark:border-purple-700/50 shadow-sm dark:shadow-lg transition-all duration-300">
  <h3 className="text-gray-800 dark:text-purple-100">Subtle Light Mode</h3>
</SectionCard>
```

### Testing Checklist

When implementing SectionCard with dark mode:

- [ ] Test card visibility in light mode
- [ ] Test card visibility in dark mode
- [ ] Verify text contrast in both themes (use browser DevTools)
- [ ] Test hover states in both themes
- [ ] Verify focus indicators in both themes
- [ ] Test theme transition (no flickering)
- [ ] Verify borders are visible in both themes
- [ ] Test on multiple screen sizes
- [ ] Verify touch targets on mobile (both themes)

### Related Documentation

- **[colors.md](../design-tokens/colors.md)** - Complete color palette for both themes
- **[dark-mode-implementation.md](../dark-mode-implementation.md)** - Full dark mode guide
- **[component-dark-mode.md](../component-dark-mode.md)** - Component-specific patterns

---

## Styling Variations

### Gradient Border

```tsx
<SectionCard className="border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-border">
  <div className="bg-white rounded-xl p-fluid-md">
    <h3>Featured Content</h3>
    <p>Content here</p>
  </div>
</SectionCard>
```

### Glass Morphism

```tsx
<SectionCard className="bg-white/60 backdrop-blur-lg border-white/80 shadow-2xl">
  <h3>Glass Effect Card</h3>
  <p>Enhanced transparency and blur</p>
</SectionCard>
```

### Minimal Style

```tsx
<SectionCard className="bg-transparent border-gray-200 shadow-none hover:bg-white/50">
  <h3>Minimal Card</h3>
  <p>Subtle appearance</p>
</SectionCard>
```

---

## Accessibility

### Semantic HTML

```tsx
<SectionCard>
  <article>
    <h3>Card Title</h3>
    <p>Card content</p>
  </article>
</SectionCard>
```

### Keyboard Navigation (for clickable cards)

```tsx
<SectionCard
  onClick={handleClick}
  className="focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Content
</SectionCard>
```

---

## Common Mistakes

### ❌ Mistake 1: Inconsistent Padding

```tsx
// ❌ WRONG - Custom padding breaks consistency
<div className="bg-white p-4">
  <h3>Card</h3>
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Use SectionCard with consistent padding
<SectionCard padding="md">
  <h3>Card</h3>
</SectionCard>
```

### ❌ Mistake 2: Missing Hover Effects

```tsx
// ❌ WRONG - Static card
<div className="bg-white shadow-lg">
  Content
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Hover animations
<SectionCard hoverable>
  Content
</SectionCard>
```

---

## Related Components

- **[PortfolioCard](./PortfolioCard.md)** - Portfolio-specific cards
- **[Header](./Header.md)** - Site navigation
- **[Footer](./Footer.md)** - Page footer

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
- **[FILE_STRUCTURE.md](../FILE_STRUCTURE.md)** - File organization
- **[design-tokens/spacing.md](../design-tokens/spacing.md)** - Spacing system
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Color system

---

**Last Updated:** January 2025  
**Version:** 5.0.0