# Mobile Button Guidelines

Mobile-specific button patterns including sizing, padding, width behavior, and spacing.

## Purpose

Define button standards for mobile devices with:
- 100% width behavior on mobile
- Touch-friendly sizing (minimum 44px height)
- Responsive padding and text sizing
- Multi-button spacing patterns
- Primary vs secondary button styling
- Accessibility compliance

---

## Core Button Principles

### 1. Mobile-First Width Behavior

Buttons should be **100% width on mobile** within container padding, then switch to auto/content width on larger screens.

```tsx
// ✅ CORRECT - Full width on mobile, auto on desktop
<button className="w-full sm:w-auto">
  Explore Portfolio
</button>

// ❌ WRONG - Fixed width on mobile
<button className="w-48">
  Explore Portfolio
</button>
```

### 2. Minimum Touch Target: 44x44px

All buttons must meet minimum touch target size per Apple HIG and WCAG guidelines.

```tsx
<button className="min-h-[44px] px-6 py-3">
  {/* Ensures 44px minimum height */}
</button>
```

---

## Button Sizing & Padding

### Standard Button Sizes

```css
/* Small Button */
.btn-small {
  padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem);
  /* Vertical: 8px → 12px, Horizontal: 16px → 24px */
  min-height: 44px;
  font-size: clamp(0.875rem, 2vw, 1rem);  /* 14px → 16px */
}

/* Medium Button (Standard) */
.btn-medium {
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
  /* Vertical: 12px → 16px, Horizontal: 24px → 32px */
  min-height: 44px;
  font-size: clamp(1rem, 2.5vw, 1.125rem);  /* 16px → 18px */
}

/* Large Button */
.btn-large {
  padding: clamp(1rem, 2.5vw, 1.25rem) clamp(2rem, 5vw, 2.5rem);
  /* Vertical: 16px → 20px, Horizontal: 32px → 40px */
  min-height: 48px;
  font-size: clamp(1.125rem, 3vw, 1.25rem);  /* 18px → 20px */
}
```

### Tailwind Implementation

```tsx
// Small Button
<button className="
  w-full sm:w-auto
  px-4 py-2 sm:px-5 sm:py-2.5
  min-h-[44px]
  text-sm sm:text-base
  font-body font-medium
">
  Small Action
</button>

// Medium Button (Standard)
<button className="
  w-full sm:w-auto
  px-6 py-3 sm:px-8 sm:py-4
  min-h-[44px]
  text-base sm:text-lg
  font-body font-medium
">
  Standard Action
</button>

// Large Button
<button className="
  w-full sm:w-auto
  px-8 py-4 sm:px-10 sm:py-5
  min-h-[48px]
  text-lg sm:text-xl
  font-body font-medium
">
  Primary CTA
</button>
```

### Button Padding Breakdown

| Size | Mobile Padding (H x V) | Desktop Padding (H x V) | Min Height | Font Size |
|------|----------------------|------------------------|------------|-----------|
| **Small** | 16px x 8px | 20px x 10px | 44px | 14px → 16px |
| **Medium** | 24px x 12px | 32px x 16px | 44px | 16px → 18px |
| **Large** | 32px x 16px | 40px x 20px | 48px | 18px → 20px |

---

## Button Width Patterns

### Full Width on Mobile

```tsx
// Single button - Full width on mobile
<button className="w-full sm:w-auto px-button py-button">
  Explore Portfolio
</button>

// Multiple buttons - Stack on mobile, inline on desktop
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <button className="w-full sm:w-auto px-6 py-3">
    Primary Action
  </button>
  <button className="w-full sm:w-auto px-6 py-3">
    Secondary Action
  </button>
</div>
```

### Fixed Width Buttons (Use Sparingly)

```tsx
// Icon-only buttons - Fixed square
<button className="w-12 h-12 flex items-center justify-center">
  <X className="w-5 h-5" />
</button>

// Small action buttons
<button className="w-auto px-4 py-2 text-sm">
  Cancel
</button>
```

### Auto Width with Min-Width

```tsx
// Ensures minimum width but can expand
<button className="w-full sm:w-auto sm:min-w-[120px] px-6 py-3">
  OK
</button>

// For icon + text buttons
<button className="w-full sm:w-auto sm:min-w-[160px] px-6 py-3 flex items-center justify-center gap-2">
  <Share className="w-5 h-5" />
  <span>Share</span>
</button>
```

---

## Multi-Button Spacing

### Button Groups (Side by Side)

#### Desktop: Horizontal, Mobile: Stacked

```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <button className="w-full sm:w-auto px-6 py-3">
    Primary Action
  </button>
  <button className="w-full sm:w-auto px-6 py-3">
    Secondary Action
  </button>
</div>
```

**Spacing Breakdown:**
- **Mobile (< 640px):** Vertical stack with 12px gap (gap-3)
- **Desktop (640px+):** Horizontal row with 16px gap (gap-4)

#### Desktop: Horizontal, Mobile: Horizontal (if space)

```tsx
// Two buttons can fit horizontally on mobile
<div className="flex gap-3 sm:gap-4">
  <button className="flex-1 sm:flex-none sm:w-auto px-4 py-3">
    Cancel
  </button>
  <button className="flex-1 sm:flex-none sm:w-auto px-4 py-3">
    Confirm
  </button>
</div>
```

**Usage:** Dialog actions, form submissions where both buttons should remain visible.

### Button Spacing Standards

```tsx
// Standard spacing between buttons
const BUTTON_SPACING = {
  mobile: '12px',    // gap-3
  desktop: '16px'    // gap-4
}

// Implementation
<div className="flex gap-3 sm:gap-4">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

### Three or More Buttons

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <button className="w-full sm:w-auto">Primary</button>
  <button className="w-full sm:w-auto">Secondary</button>
  <button className="w-full sm:w-auto">Tertiary</button>
</div>

// Or wrap if too many
<div className="flex flex-wrap gap-3 sm:gap-4">
  <button className="w-full sm:w-auto">Option 1</button>
  <button className="w-full sm:w-auto">Option 2</button>
  <button className="w-full sm:w-auto">Option 3</button>
  <button className="w-full sm:w-auto">Option 4</button>
</div>
```

---

## Button Text Sizing

### Mobile Text Sizes

```css
/* Small button text */
.btn-small-text {
  font-size: clamp(0.875rem, 2vw, 1rem);  /* 14px → 16px */
  line-height: 1.4;
}

/* Medium button text (standard) */
.btn-medium-text {
  font-size: clamp(1rem, 2.5vw, 1.125rem);  /* 16px → 18px */
  line-height: 1.5;
}

/* Large button text */
.btn-large-text {
  font-size: clamp(1.125rem, 3vw, 1.25rem);  /* 18px → 20px */
  line-height: 1.5;
}
```

### Tailwind Implementation

```tsx
// Small
<button className="text-sm sm:text-base">
  Small Action
</button>

// Medium (standard)
<button className="text-base sm:text-lg">
  Standard Action
</button>

// Large
<button className="text-lg sm:text-xl">
  Primary CTA
</button>

// Using fluid utility (if defined)
<button className="text-button-fluid">
  {/* Scales automatically */}
</button>
```

### Text Sizing Breakdown

| Button Size | Mobile Font | Desktop Font | Line Height |
|------------|-------------|--------------|-------------|
| **Small** | 14px | 16px | 1.4 |
| **Medium** | 16px | 18px | 1.5 |
| **Large** | 18px | 20px | 1.5 |

---

## Complete Button Examples

### Primary CTA Button

```tsx
<button className="
  w-full sm:w-auto
  justify-center text-center
  bg-gradient-pink-purple-blue
  hover:from-purple-700 hover:to-pink-700
  text-white
  px-6 py-3 sm:px-8 sm:py-4
  min-h-[44px]
  font-body font-medium
  text-base sm:text-lg
  transition-all duration-300
  rounded-lg
  shadow-lg hover:shadow-xl
  transform hover:scale-105
  focus:outline-none focus:ring-4 focus:ring-pink-200
">
  Explore Portfolio
</button>
```

**Breakdown:**
- **Width:** Full on mobile, auto on desktop
- **Padding:** 24px x 12px mobile, 32px x 16px desktop
- **Min Height:** 44px (touch-friendly)
- **Text:** 16px mobile, 18px desktop
- **Gradient:** Pink-purple-blue brand colors

### Secondary Button

```tsx
<button className="
  w-full sm:w-auto
  justify-center text-center
  bg-gradient-blue-teal-green
  hover:from-blue-700 hover:to-teal-700
  text-white
  px-6 py-3 sm:px-8 sm:py-4
  min-h-[44px]
  font-body font-medium
  text-base sm:text-lg
  transition-all duration-300
  rounded-lg
  shadow-lg hover:shadow-xl
  transform hover:scale-105
  focus:outline-none focus:ring-4 focus:ring-teal-200
">
  Learn More
</button>
```

### Outline Button

```tsx
<button className="
  w-full sm:w-auto
  justify-center text-center
  bg-transparent
  border-2 border-pink-500
  text-pink-600 hover:text-white
  hover:bg-pink-500
  px-6 py-3 sm:px-8 sm:py-4
  min-h-[44px]
  font-body font-medium
  text-base sm:text-lg
  transition-all duration-300
  rounded-lg
  focus:outline-none focus:ring-4 focus:ring-pink-200
">
  Contact Me
</button>
```

### Icon Button

```tsx
// Icon only - Square
<button className="
  w-12 h-12
  flex items-center justify-center
  bg-white/80 backdrop-blur-sm
  rounded-full
  shadow-lg hover:shadow-xl
  transition-all duration-300
  focus:outline-none focus:ring-4 focus:ring-pink-200
">
  <X className="w-5 h-5 text-gray-700" />
</button>

// Icon + Text
<button className="
  w-full sm:w-auto
  px-6 py-3
  min-h-[44px]
  flex items-center justify-center gap-2
  bg-gradient-pink-purple-blue
  text-white
  font-body font-medium
  text-base
  rounded-lg
  shadow-lg hover:shadow-xl
">
  <Share className="w-5 h-5" />
  <span>Share</span>
</button>
```

### Loading Button

```tsx
<button 
  disabled
  className="
    w-full sm:w-auto
    px-6 py-3
    min-h-[44px]
    flex items-center justify-center gap-2
    bg-gray-400 cursor-not-allowed
    text-white
    font-body font-medium
    text-base
    rounded-lg
  "
>
  <Loader className="w-5 h-5 animate-spin" />
  <span>Loading...</span>
</button>
```

---

## Button Group Patterns

### Hero Section (Two CTAs)

```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8">
  <button className="
    w-full sm:w-auto
    bg-gradient-pink-purple-blue
    text-white
    px-8 py-4
    min-h-[48px]
    text-lg
    font-body font-medium
    rounded-lg shadow-lg
  ">
    Explore Portfolio
  </button>
  
  <button className="
    w-full sm:w-auto
    bg-gradient-blue-teal-green
    text-white
    px-8 py-4
    min-h-[48px]
    text-lg
    font-body font-medium
    rounded-lg shadow-lg
  ">
    Get In Touch
  </button>
</div>
```

### Form Actions (Cancel + Submit)

```tsx
<div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end">
  <button 
    type="button"
    className="
      w-full sm:w-auto
      px-6 py-3
      min-h-[44px]
      bg-gray-200 hover:bg-gray-300
      text-gray-800
      font-body font-medium
      text-base
      rounded-lg
    "
  >
    Cancel
  </button>
  
  <button 
    type="submit"
    className="
      w-full sm:w-auto
      px-6 py-3
      min-h-[44px]
      bg-gradient-pink-purple-blue
      text-white
      font-body font-medium
      text-base
      rounded-lg shadow-lg
    "
  >
    Submit
  </button>
</div>
```

**Note:** `flex-col-reverse` ensures Submit appears above Cancel on mobile (more prominent).

### Modal Actions

```tsx
<div className="flex gap-3 sm:gap-4 border-t pt-4">
  <button className="flex-1 sm:flex-none sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-lg">
    Cancel
  </button>
  <button className="flex-1 sm:flex-none sm:w-auto px-6 py-3 bg-pink-600 text-white rounded-lg">
    Confirm
  </button>
</div>
```

### Floating Action Button (FAB)

```tsx
<button className="
  fixed bottom-6 right-6
  w-14 h-14
  bg-gradient-pink-purple-blue
  text-white
  rounded-full
  shadow-2xl
  flex items-center justify-center
  z-50
  transition-all duration-300
  hover:scale-110
  focus:outline-none focus:ring-4 focus:ring-pink-200
">
  <Plus className="w-6 h-6" />
</button>
```

---

## Container Padding Context

Buttons respect container padding - they expand to 100% of the **available width** within padding, not 100vw.

```tsx
// ✅ CORRECT - Button respects container padding
<section className="px-4 sm:px-6 md:px-8">
  <div className="max-w-7xl mx-auto">
    <button className="w-full sm:w-auto px-6 py-3">
      {/* Full width minus container padding (16px each side) */}
      Explore Portfolio
    </button>
  </div>
</section>

// ❌ WRONG - Button extends beyond container
<section>
  <button className="w-screen px-6 py-3">
    {/* Extends full viewport, ignores padding */}
    Explore Portfolio
  </button>
</section>
```

---

## Common Mistakes

### ❌ Mistake 1: Fixed Width on Mobile

```tsx
// ❌ WRONG
<button className="w-48 px-6 py-3">
  Too narrow on mobile
</button>
```

**Solution:**
```tsx
// ✅ CORRECT
<button className="w-full sm:w-auto px-6 py-3">
  Full width on mobile, auto on desktop
</button>
```

### ❌ Mistake 2: Too Small Touch Target

```tsx
// ❌ WRONG - 32px height
<button className="px-4 py-2 text-sm">
  Too small
</button>
```

**Solution:**
```tsx
// ✅ CORRECT - 44px minimum
<button className="px-4 py-3 min-h-[44px] text-sm">
  Touch-friendly
</button>
```

### ❌ Mistake 3: No Gap Between Buttons

```tsx
// ❌ WRONG - Buttons touching
<div className="flex">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Proper spacing
<div className="flex gap-3 sm:gap-4">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

### ❌ Mistake 4: Horizontal Buttons on Small Mobile

```tsx
// ❌ WRONG - Cramped on small screens
<div className="flex gap-2">
  <button className="flex-1">Very Long Action Name</button>
  <button className="flex-1">Another Long Name</button>
</div>
```

**Solution:**
```tsx
// ✅ CORRECT - Stack on mobile
<div className="flex flex-col sm:flex-row gap-3">
  <button className="w-full sm:w-auto">Very Long Action Name</button>
  <button className="w-full sm:w-auto">Another Long Name</button>
</div>
```

---

## Accessibility Requirements

### Keyboard Navigation

```tsx
<button
  className="..."
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
  Action
</button>
```

### Focus Indicators

```tsx
<button className="
  ...
  focus:outline-none 
  focus:ring-4 
  focus:ring-pink-200 
  focus:ring-opacity-50
">
  Accessible Button
</button>
```

### ARIA Labels

```tsx
// Icon-only button
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>

// Loading state
<button aria-busy="true" disabled>
  <Loader className="animate-spin" />
  Loading...
</button>
```

---

## Related Documentation

- **[mobile/spacing.md](./spacing.md)** - Spacing system
- **[mobile/typography.md](./typography.md)** - Text sizing
- **[design-tokens/colors.md](../design-tokens/colors.md)** - Button colors

---

**Last Updated:** January 2025  
**Version:** 3.2.0
