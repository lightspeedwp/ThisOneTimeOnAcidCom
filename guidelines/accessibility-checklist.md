# Accessibility Checklist & Standards (N002)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25  
**WCAG Reference:** WCAG 2.2 Level AAA  
**Part of:** This One Time On Acid Design System

---

## Overview

Actionable accessibility checklist for ensuring WCAG 2.2 AAA compliance across all portfolio site features. This document provides recipes, audit procedures, and interaction guidelines to support accessible user experiences for all visitors.

---

## Table of Contents

1. [Pre-Launch Checklist](#1-pre-launch-checklist)
2. [WCAG 2.2 AAA Compliance](#2-wcag-22-aaa-compliance)
3. [Interaction Guidelines](#3-interaction-guidelines)
4. [Audit Procedures](#4-audit-procedures)
5. [Common Issues & Fixes](#5-common-issues--fixes)
6. [Related Documentation](#6-related-documentation)

---

## 1. Pre-Launch Checklist

### Visual & Contrast

- [ ] Normal text has minimum 7:1 contrast ratio; large text has minimum 4.5:1 (WCAG AAA)
- [ ] Icons have minimum 7:1 contrast when used as solo controls
- [ ] Color is never the sole indicator of information
- [ ] Dark mode variants meet contrast requirements
- [ ] Text size is minimum 14px for body content
- [ ] Links are underlined or have other visual distinction beyond color

### Keyboard Navigation

- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and predictable
- [ ] Skip links provided for repetitive content
- [ ] Focus indicators are visible (minimum 3px outline)
- [ ] No keyboard traps present
- [ ] All form fields are accessible via Tab key

### Screen Reader Support

- [ ] Semantic HTML is used throughout
- [ ] All form inputs have associated labels
- [ ] Images have descriptive alt text (not "image" or empty)
- [ ] Icon-only buttons have aria-labels
- [ ] Interactive landmarks (main, nav, contentinfo) identified
- [ ] Headings have proper hierarchy (no skipped levels)

### Motion & Animation

- [ ] All animations respect `prefers-reduced-motion` setting
- [ ] No content flashes more than 3 times per second
- [ ] Auto-playing content can be paused/stopped
- [ ] Parallax effects disabled for users requesting reduced motion
- [ ] Page transitions don't cause disorientation

### Forms & Input

- [ ] All form fields have visible labels
- [ ] Error messages are clear and specific
- [ ] Required fields are marked visually AND programmatically
- [ ] Form validation provides helpful suggestions
- [ ] Multi-step forms have progress indicators

---

## 2. WCAG 2.2 AAA Compliance

### Accessibility Tiers

| Level | Target | Standard | Scope |
|-------|--------|----------|-------|
| **A** | Minimum | Basic accessibility | Not sufficient for this project |
| **AA** | Standard | Industry standard | Minimum baseline (not our target) |
| **AAA** | Enhanced | Strict compliance | **✓ Our Target Standard** |

### Key AAA Requirements

**Criterion 1.4.6 (Contrast Enhanced)**
- Minimum 7:1 contrast for normal text
- Minimum 4.5:1 for large text (18pt+ or 14pt+ bold)

**Criterion 1.4.8 (Visual Presentation)**
- Line spacing at least 1.5 × font size
- Paragraph spacing at least 1.5 × line spacing
- Text width no more than 80 characters per line
- Text is not fully justified

**Criterion 2.3.3 (Animation from Interactions)**
- Motion animation triggered by interaction can be disabled
- Essential animations cannot be disabled

**Criterion 3.3.5 (Help & Error Prevention)**
- Error prevention for reversible actions
- Error messages provide suggestions for correction
- Confirmation available before submission

---

## 3. Interaction Guidelines

### Keyboard Accessibility Recipes

#### Focus Management

**Incomplete example:** This snippet shows dialog markup only. Before use, implement Tab/Shift+Tab focus containment within the open dialog and restore focus to the previously focused element when it closes.

```tsx
// Dialog markup only; focus trapping and restoration are not implemented
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Action</h2>
  {/* Content goes here */}
  <button autoFocus>Cancel</button>
  <button onClick={handleConfirm}>Confirm</button>
</div>
```

#### Skip Links

```html
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
<main id="main-content">
  {/* Main content */}
</main>
```

### Screen Reader Annotations

#### Hidden Descriptive Text

```tsx
<button>
  Learn More
  <span className="sr-only"> about our mission</span>
</button>

// CSS
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

#### ARIA Live Regions

```tsx
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Reduced Motion Support

#### useReducedMotion Hook

Use the `useReducedMotion` hook to detect and respond to the user's motion preference:

```typescript
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{
        transition: prefersReducedMotion ? 'none' : 'transform 300ms ease-out',
        transform: 'translateY(0)',
      }}
    >
      Content
    </div>
  );
}
```

#### Live Preference Change Handling

Respond to real-time changes in the user's motion preference (OS settings changed mid-session):

```typescript
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}
```

**Key points:**
- Detect via `prefers-reduced-motion: reduce` media query
- Listen for changes using `addEventListener`, with `addListener` as a fallback
- Update component state when user changes OS settings
- Apply CSS transitions or skip animations based on preference

---

## 4. Audit Procedures

### Automated Testing (40% of issues)

Use browser tools to catch:
- Missing alt text on images
- Color contrast failures
- Missing form labels
- Heading hierarchy violations

**Tools:**
- axe DevTools
- Lighthouse Accessibility audit
- WAVE browser extension

### Manual Testing (60% of issues)

1. **Keyboard-Only Navigation**
   - Unplug mouse and navigate entire site
   - Verify all interactive elements are reachable
   - Check that focus indicators are visible

2. **Screen Reader Testing**
   - Use NVDA (Windows) or JAWS (any OS)
   - Test with Chrome, Firefox, and Safari
   - Verify meaningful page structure

3. **Visual Testing**
   - Enable high contrast mode in OS
   - Test with Windows High Contrast theme
   - Verify at 200% zoom level

4. **Motion Testing**
   - Enable "Reduce Motion" on your OS
   - Verify no unexpected motion occurs
   - Check animations still convey information

---

## 5. Common Issues & Fixes

| Issue | WCAG Criterion | Fix |
|-------|---|---|
| Missing alt text on images | 1.1.1 | Add descriptive alt text for meaningful images; use alt="" for decorative images |
| Insufficient color contrast | 1.4.6 | Increase text size or darken color; use contrasted text overlay on images |
| No visible focus indicator | 2.4.7 | Add `outline: 3px solid; outline-offset: 2px;` to `:focus-visible` |
| Form field without label | 1.3.1 | Use `<label for="input-id">` or aria-labelledby |
| Keyboard trap in modal | 2.1.2 | Manage focus with focus-trap library; trap Tab key within modal |
| Flashing content | 2.3.1 | Reduce animation speed; never flash more than 3x/second |

---

## 6. Related Documentation

- **Accessibility Recipes:** `guidelines/accessibility-recipes.md` (detailed WCAG patterns)
- **Interaction Accessibility:** `guidelines/interactions-accessibility.md` (keyboard & ARIA)
- **Prefers Reduced Motion:** `guidelines/prefers-reduced-motion.md` (motion handling)
- **Accessibility Audit Report:** [Archived report pointer](./_archive/accessibility-report-pointer.md), listed in the [archive index](./_archive/ARCHIVE-INDEX.md) (Feb 2025 findings)

---

## Pre-Merge Verification

Before merging any feature:

- [ ] Automated accessibility tests pass (axe, Lighthouse)
- [ ] Manual keyboard navigation works end-to-end
- [ ] Screen reader announces page structure correctly
- [ ] Text contrast meets 7:1 for normal text and 4.5:1 for large text
- [ ] No content flashes more than 3x/second
- [ ] Reduced motion preference is respected
- [ ] Focus indicators are visible and logical
- [ ] All images have meaningful alt text
- [ ] Forms have associated labels
- [ ] Error messages provide helpful suggestions

---

## Consolidated G-Document References

This N-document (N002) consolidates content from and maintains cross-references to the following G-documents per the guidelines refactor (Specification 003):

- **Guidelines Preserved (Type 2 Consolidation):** Old files consolidated here
  - `guidelines/interactions-accessibility.md` → content integrated; pointer maintained
  - `guidelines/prefers-reduced-motion.md` → content integrated; pointer maintained

All original files accessible as pointers to this canonical reference.

---

**Last Updated:** 2026-10-25  
**Maintained by:** This One Time On Acid Portfolio Team  
**Canonical Reference:** Yes  
**Compliance Level:** WCAG 2.2 AAA  
**N-Document ID:** N002 (Specification 003 - Guidelines Refactor)

