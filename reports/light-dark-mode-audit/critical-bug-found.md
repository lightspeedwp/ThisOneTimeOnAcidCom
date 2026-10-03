# Critical CSS Selector Bug - Light/Dark Mode Conflict

**Date:** March 20, 2026  
**Severity:** CRITICAL  
**Status:** PARTIALLY FIXED

---

## Root Cause Identified

### The Bug

Light.css was using **TWO selector patterns**:
1. `:root:not(.dark)` - Correctly targets when HTML doesn't have `.dark` class ✓
2. `body:not(.dark)` - INCORRECTLY matches even when dark mode is active ✗

### Why It Broke Dark Mode

The ThemeProvider adds `.dark` class to `document.documentElement` (the `<html>` tag):

```tsx
document.documentElement.classList.add('dark'); // Adds to <html>, NOT <body>
```

This means:
- In dark mode: `<html class="dark">` exists
- In dark mode: `<body>` has NO `.dark` class

Therefore:
- `:root:not(.dark)` → Does NOT match (correct) ✓
- `body:not(.dark)` → STILL MATCHES (wrong!) ✗

### The Result

Light mode CSS was applying OVER dark mode because `body:not(.dark)` matched even when `<html class="dark">` was present.

---

## Files Affected

| File | Issue | Fix Status |
|------|-------|------------|
| `/styles/themes/light.css` | Used `body:not(.dark)` selectors | ✅ PARTIALLY FIXED |
| `/components/common/ThemeProvider.tsx` | Correct - no changes needed | ✅ OK |
| `/styles/themes/dark.css` | Correct - no issues | ✅ OK |

---

## Fix Implementation

### ❌ WRONG Pattern (Before):
```css
/* This applies in BOTH light and dark mode! */
body:not(.dark) {
  background: #FFFBFE; /* Wrong! */
}
```

### ✅ CORRECT Pattern (After):
```css
/* This ONLY applies in light mode */
:root:not(.dark) body {
  background: #FFFBFE; /* Correct! */
}
```

---

## Changes Made

### Fixed:
- [x] Line 124-128: `body:not(.dark)` → `:root:not(.dark) body` for body background
- [x] Line 131-133: `body:not(.dark)::before` → `:root:not(.dark) body::before` for grain noise

### Still Need to Remove:
Every remaining instance of `body:not(.dark)` as a standalone selector needs review.

**Safe Pattern**: `body:not(.dark)` can appear as part of a compound selector:
```css
:root:not(.dark) .header,
body:not(.dark) .header {  /* This is OK because it's paired with :root:not(.dark) */
}
```

**Unsafe Pattern**: `body:not(.dark)` as primary selector:
```css
body:not(.dark) {  /* This is WRONG - will match in dark mode! */
}
```

---

## Verification Needed

Test the following:

1. **Fresh load (no localStorage)**:
   - Should show dark mode (#0F0F0F background)
   - Should NOT show pink gradient

2. **Switch to light mode**:
   - Should show pink gradient background
   - Text should change to deep charcoal (#2A1A2A)

3. **Switch back to dark mode**:
   - Background should return to #0F0F0F
   - Neon colors should be full brightness

4. **Inspect HTML in dark mode**:
   ```html
   <html class="dark" data-theme="dark">
   <body>  <!-- NO .dark class here -->
   ```

---

## Next Steps

1. ✅ Fixed critical body background selectors
2. ⚠️ Review ALL remaining selectors in light.css
3. ⚠️ Test theme switching in browser
4. ⚠️ Verify no CSS specificity wars remain
5. ⚠️ Document final selector patterns in guidelines

---

## Lesson Learned

When using CSS `:not()` pseudo-class with theme switching:

- **ALWAYS** check which element has the class
- ThemeProvider adds `.dark` to `<html>`, not `<body>`
- Therefore ONLY use `:root:not(.dark)` selectors
- NEVER use `body:not(.dark)` as a primary selector

**Correct Specificity Pattern**:
```css
/* Variables */
:root:not(.dark) {
  --color-bg: #FFFFFF;
}

/* Body styles */
:root:not(.dark) body {
  background: var(--color-bg);
}

/* Component styles */
:root:not(.dark) .component {
  color: #000000;
}
```
