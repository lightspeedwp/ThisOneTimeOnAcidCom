# Light Mode Selector Audit - Complete Findings

**Date:** March 20, 2026  
**File:** `/styles/themes/light.css`  
**Total Lines:** 593  
**Critical Issues Found:** 74 instances of `body:not(.dark)` causing dark mode conflicts

---

## Summary

ALL `body:not(.dark)` selectors in light.css are causing light mode styles to leak into dark mode because:

1. ThemeProvider adds `.dark` to `<html>`, NOT `<body>`
2. CSS selector lists use OR logic
3. Therefore `body:not(.dark)` ALWAYS matches (body never has `.dark` class)

---

## Instances Found

### Line 3: Variable Block
```css
:root:not(.dark), body:not(.dark) {
  /* All CSS variables */
}
```
**Impact:** HIGH - CSS variables leaking into dark mode
**Fix:** Remove `body:not(.dark)`, keep only `:root:not(.dark)`

### Lines 139-593: Component Selectors (73 instances)

Every component selector follows this broken pattern:
```css
:root:not(.dark) .component,
body:not(.dark) .component {
  /* styles */
}
```

**Components Affected:**
- Header (lines 139-162)
- Mobile Menu (lines 168-185)
- Buttons (lines 191-260)
- Focus Indicators (lines 266-270)
- Form Elements (lines 276-320)
- Cards (lines 326-350)
- Links (lines 356-372)
- Footer (lines 378-399)
- Code Blocks (lines 405-426)
- Tables (lines 432-458)
- Blockquotes (lines 464-469)
- Scrollbar (lines 475-495)
- Selection (lines 501-505)
- Modals & Overlays (lines 511-523)
- Badges & Tags (lines 529-554)
- Alerts & Notifications (lines 560-593)

---

## Fix Strategy

### Option 1: Automated Find/Replace (RISKY)
Use regex to remove all `body:not(.dark)` lines:
- Risk: Could break multiline selectors
- Time: Fast
- Accuracy: Medium

### Option 2: Manual Section-by-Section Rewrite (SAFE)
Rewrite each section removing `body:not(.dark)`:
- Risk: Low
- Time: Moderate
- Accuracy: High

### Option 3: Complete File Regeneration (SAFEST)
Regenerate the entire file with correct selectors:
- Risk: None (can diff against original)
- Time: Moderate
- Accuracy: Perfect

---

## Recommended Fix Pattern

### Before (WRONG):
```css
:root:not(.dark) .header,
body:not(.dark) .header {
  background: pink;
}
```

### After (CORRECT):
```css
:root:not(.dark) .header {
  background: pink;
}
```

---

## Testing Requirements

After fix, verify:

1. **Dark Mode:**
   - Background: #0F0F0F (atomic black) ✓
   - Text: #F6F2EB (warm white) ✓
   - Neon Pink: #FF3AAE (full brightness) ✓
   - Neon Yellow: #F4FF3C (full brightness) ✓

2. **Light Mode:**
   - Background: Pink/cyan gradient ✓
   - Text: #2A1A2A (deep charcoal) ✓
   - Neon Pink: #E0007A (accessible darkened) ✓
   - Neon Yellow: #A08800 (accessible darkened) ✓

3. **Theme Switching:**
   - No flash of unstyled content ✓
   - Instant theme change ✓
   - LocalStorage persistence ✓

---

## Implementation Status

- [ ] Fix line 3: Variable block selector
- [ ] Fix lines 139-162: Header
- [ ] Fix lines 168-185: Mobile Menu
- [ ] Fix lines 191-260: Buttons
- [ ] Fix lines 266-270: Focus Indicators
- [ ] Fix lines 276-320: Form Elements
- [ ] Fix lines 326-350: Cards
- [ ] Fix lines 356-372: Links
- [ ] Fix lines 378-399: Footer
- [ ] Fix lines 405-426: Code Blocks
- [ ] Fix lines 432-458: Tables
- [ ] Fix lines 464-469: Blockquotes
- [ ] Fix lines 475-495: Scrollbar
- [ ] Fix lines 501-505: Selection
- [ ] Fix lines 511-523: Modals & Overlays
- [ ] Fix lines 529-554: Badges & Tags
- [ ] Fix lines 560-593: Alerts & Notifications
- [ ] Test dark mode verification
- [ ] Test light mode verification
- [ ] Test theme switching

---

## Next Steps

1. Choose fix strategy (recommend Option 3: Complete regeneration)
2. Create backup of current light.css
3. Implement fixes
4. Run comprehensive testing
5. Document changes in changelog
6. Update guidelines with correct selector patterns
