# ScrollToTop Component

**Version:** 5.0.0
**Last Updated:** February 2026

A floating button that appears after scrolling down, allowing users to quickly return to the top of the page with smooth scrolling animation.

## Purpose

Improve user experience on long pages by:
- Providing quick navigation back to top
- Appearing only when needed (after scrolling threshold)
- Smooth scroll animation
- Fixed positioning for easy access
- Accessibility compliance

---

## Usage

### Global Implementation

**⚠️ AUTOMATICALLY INCLUDED:** This component is included globally in `RootLayout.tsx`. You do **NOT** need to add it to individual pages.

```tsx
// components/common/RootLayout.tsx
export function RootLayout() {
  return (
    <ModalProvider>
      <div className="app-layout">
        <ScrollToTop /> {/* Global instance */}
      </div>
    </ModalProvider>
  );
}
```

### Component Definition

File: `/components/ui/ScrollToTop.tsx`

```tsx
import { ScrollToTop } from '../ui/ScrollToTop';
```

---

## Props

```typescript
interface ScrollToTopProps {
  /**
   * Scroll position (in pixels) after which button appears
   * @default 20
   */
  showAfter?: number;
  
  /**
   * Additional CSS classes for customization
   * @default ""
   */
  className?: string;
}
```

---

## Features

### Show/Hide Based on Scroll

The component automatically monitors scroll position and toggles visibility.

### Smooth Scroll to Top

Uses `window.scrollTo({ top: 0, behavior: 'smooth' })` for a pleasant transition.

### Accessibility

- **Keyboard Support:** Enter/Space to activate
- **ARIA Labels:** "Scroll to top"
- **Focus Management:** Only focusable when visible
- **Reduced Motion:** Respects user preferences

---

## Related Documentation

- **[Guidelines.md](../Guidelines.md)** - Main guidelines
- **[overview-components.md](../overview-components.md)** - Component system
