# 🚨 CRITICAL: Dark Mode Accessibility Contrast Audit

**URGENT ISSUE IDENTIFIED:** Header navigation links have unreadable text in dark mode.

## Problem Statement

The header `.header__nav-link` uses `color: var(--wp--preset--color--neutral-300)` which resolves to `#383838` (dark gray) on a dark background of `#0F0F0F` - this is a **SEVERE WCAG FAILURE**.

**Reported Issue:** "The header is still white in dark mode, the text is not readable on the dark background."

## Audit Scope

1. **Check ALL dark mode text-on-background contrast ratios**
2. **Identify every element with insufficient contrast**
3. **Calculate actual contrast ratios using WCAG formula**
4. **Provide specific fixes with proper colors**

## WCAG Requirements

- **Normal text (16px):** Minimum 4.5:1 (AA), 7:1 (AAA)
- **Large text (18px+ or 14px+ bold):** Minimum 3:1 (AA), 4.5:1 (AAA)
- **Interactive elements:** Minimum 3:1 (AA)

## Files to Audit

1. `/styles/blocks/header.css` — CRITICAL FAILURE IDENTIFIED
2. `/styles/blocks/footer.css`
3. `/styles/themes/dark.css`
4. `/styles/themes/dark-extended.css`
5. ALL component CSS files in `/styles/blocks/`

## Contrast Calculation Formula

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)

Where:
L1 = relative luminance of lighter color
L2 = relative luminance of darker color

Relative Luminance:
For sRGB colors R/G/B in range 0-255:
1. Convert to 0-1 range: c = C/255
2. If c ≤ 0.03928: c = c/12.92
3. Else: c = ((c + 0.055)/1.055)^2.4
4. L = 0.2126*R + 0.7152*G + 0.0722*B
```

## Expected Failures (Based on Code Review)

### CRITICAL FAILURE #1: Header Nav Links (Dark Mode)

**Location:** `/styles/blocks/header.css` line 290-292

**Current Code:**
```css
.dark .header__nav-link {
  color: var(--wp--preset--color--neutral-300); /* #383838 */
}
```

**Colors:**
- Text: `#383838` (dark gray)
- Background: `#0F0F0F` (atomic black)

**Expected Contrast:** ~1.5:1 ❌ **SEVERE FAILURE** (needs 4.5:1)

**Required Fix:**
```css
.dark .header__nav-link {
  color: #F6F2EB; /* Cream - 14.8:1 contrast */
}
```

## Audit Checklist

For EACH component, check:

- [ ] Base text color on dark background
- [ ] Link text color on dark background
- [ ] Button text color on button background
- [ ] Placeholder text on input background
- [ ] Disabled state text colors
- [ ] Icon colors on backgrounds
- [ ] Border colors (must be 3:1 minimum)

## Report Structure

For each failure, document:

1. **Component name**
2. **CSS selector**
3. **Current colors** (text + background hex values)
4. **Actual contrast ratio** (calculated)
5. **Required contrast ratio** (4.5:1 for normal text)
6. **WCAG level failure** (AA or AAA)
7. **Recommended fix** (specific color with calculated ratio)

## Deliverables

1. **Full audit report** in `/reports/dark-mode-contrast-audit/`
2. **Task list** with all fixes in `/tasks/`
3. **Updated CSS files** with corrected colors

## Priority

🚨 **CRITICAL - DEPLOY BLOCKER**

This is a fundamental accessibility failure that affects usability for all users. Must be fixed immediately before any deployment.
