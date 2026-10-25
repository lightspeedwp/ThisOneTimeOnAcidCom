# Accessibility Checklist & Standards (N002)

**Version:** 1.0.0  
**Status:** Canonical Reference  
**Last Updated:** 2026-10-25  
**WCAG Reference:** WCAG 2.2 Level AAA  
**Part of:** Ash Shaw Makeup Portfolio Design System

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

- [ ] All text has minimum 7:1 contrast ratio (WCAG AAA)
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
- Minimum 4.5:1 for large text (18px+ or 14px+ bold)

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

```tsx
// Focus trap for modals
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

Reference: `guidelines/prefers-reduced-motion.md` for comprehensive implementation guide.

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
- **Accessibility Audit Report:** `guidelines/_archive/accessibility-report-feb-2025.md` (Feb 2025 findings)

---

## Pre-Merge Verification

Before merging any feature:

- [ ] Automated accessibility tests pass (axe, Lighthouse)
- [ ] Manual keyboard navigation works end-to-end
- [ ] Screen reader announces page structure correctly
- [ ] Color contrast meets 7:1 ratio requirement
- [ ] No content flashes more than 3x/second
- [ ] Reduced motion preference is respected
- [ ] Focus indicators are visible and logical
- [ ] All images have meaningful alt text
- [ ] Forms have associated labels
- [ ] Error messages provide helpful suggestions

---

**Last Updated:** 2026-10-25  
**Maintained by:** Ash Shaw Portfolio Team  
**Canonical Reference:** Yes  
**Compliance Level:** WCAG 2.2 AAA

