# Figma Make Prompt 2A: Design System Baseline Export — Execution Guide

**Status**: ✅ UNBLOCKED & READY TO EXECUTE  
**Scope**: Export design system baseline as CSS variables or design tokens  
**Approval Gate**: Gates 1, 2 ✅ COMPLETE  
**Dependencies**: None (can execute independently)

---

## Executive Summary

Export the approved design system baseline into a machine-readable format (CSS variables or JSON tokens) that development teams can import directly into the codebase.

**Deliverable**: A single tokens file (`.css` or `.json`) containing:
- Typography specifications (Space Grotesk headings, Inter body/UI)
- 18 color variables (9 colors × 2 themes: light + dark)
- Component style definitions (Button, Card, Navigation, Form)

**Outcome**: Build tools can import this file directly without hardcoding color/typography values.

---

## The Work

### 1. Extract Typography

**Approved Typography**:

| Category | Font | Weights | Sizes | Usage |
|----------|------|---------|-------|-------|
| Headings | Space Grotesk | 600, 700 | 24px, 32px, 40px, 48px | H1–H4 tags |
| Body | Inter | 400, 500 | 14px, 16px, 18px | Paragraphs, body text |
| UI | Inter | 500, 600 | 12px, 14px, 16px | Labels, buttons, form text |

**Export as CSS Variables**:
```css
/* Typography */
--font-heading: 'Space Grotesk';
--font-body: 'Inter';
--font-ui: 'Inter';

--font-heading-weights: 600, 700;
--font-body-weights: 400, 500;
--font-ui-weights: 500, 600;

--font-heading-sizes: 24px, 32px, 40px, 48px;
--font-body-sizes: 14px, 16px, 18px;
--font-ui-sizes: 12px, 14px, 16px;
```text

### 2. Extract Colors (Light Theme)

| # | Name | Color | Hex | Usage |
|---|------|-------|-----|-------|
| 1 | Primary | Charcoal | #1a1a1a | Text, foreground |
| 2 | Secondary | White | #ffffff | Background, contrast |
| 3 | Accent | Tan | #e8d4b8 | Highlights, CTAs |
| 4 | Success | Green | #2d5016 | Success states |
| 5 | Warning | Gold | #b8860b | Warnings, alerts |
| 6 | Error | Maroon | #8b0000 | Error states |
| 7 | Neutral-light | Light Gray | #f5f5f5 | Light backgrounds |
| 8 | Neutral-dark | Dark Gray | #666666 | Secondary text |
| 9 | Border | Medium Gray | #cccccc | Borders, dividers |

**Export as CSS Variables**:
```css
/* Light Theme */
--color-primary-light: #1a1a1a;
--color-secondary-light: #ffffff;
--color-accent-light: #e8d4b8;
--color-success-light: #2d5016;
--color-warning-light: #b8860b;
--color-error-light: #8b0000;
--color-neutral-light-light: #f5f5f5;
--color-neutral-dark-light: #666666;
--color-border-light: #cccccc;
```text

### 3. Extract Colors (Dark Theme)

| # | Name | Color | Hex | Usage |
|---|------|-------|-----|-------|
| 1 | Primary | White | #ffffff | Text, foreground |
| 2 | Secondary | Charcoal | #1a1a1a | Background, contrast |
| 3 | Accent | Tan Variant | #d4a574 | Highlights, CTAs |
| 4 | Success | Light Green | #90ee90 | Success states |
| 5 | Warning | Gold Variant | #ffd700 | Warnings, alerts |
| 6 | Error | Light Red | #ff6b6b | Error states |
| 7 | Neutral-light | Dark Gray | #333333 | Light backgrounds |
| 8 | Neutral-dark | Light Gray | #cccccc | Secondary text |
| 9 | Border | Medium Gray Variant | #444444 | Borders, dividers |

**Export as CSS Variables**:
```css
/* Dark Theme */
--color-primary-dark: #ffffff;
--color-secondary-dark: #1a1a1a;
--color-accent-dark: #d4a574;
--color-success-dark: #90ee90;
--color-warning-dark: #ffd700;
--color-error-dark: #ff6b6b;
--color-neutral-light-dark: #333333;
--color-neutral-dark-dark: #cccccc;
--color-border-dark: #444444;
```text

### 4. Extract Component Styles

**Button Component**:
```css
--button-bg-primary: var(--color-primary-light);
--button-text-primary: var(--color-secondary-light);
--button-bg-secondary: var(--color-secondary-light);
--button-text-secondary: var(--color-primary-light);
--button-bg-disabled: var(--color-neutral-light-light);
--button-text-disabled: var(--color-neutral-dark-light);
--button-border-radius: 4px;
--button-padding: 12px 24px;
```text

**Card Component**:
```css
--card-bg: var(--color-secondary-light);
--card-border: 1px solid var(--color-border-light);
--card-border-radius: 8px;
--card-padding: 16px;
--card-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```text

**Navigation Component**:
```css
--nav-link-color: var(--color-primary-light);
--nav-link-color-hover: var(--color-accent-light);
--nav-link-color-active: var(--color-accent-light);
--nav-link-font: var(--font-ui);
--nav-link-font-weight: 500;
```text

**Form Input Component**:
```css
--form-input-bg: var(--color-secondary-light);
--form-input-border: 1px solid var(--color-border-light);
--form-input-border-focused: 2px solid var(--color-accent-light);
--form-input-border-error: 2px solid var(--color-error-light);
--form-input-padding: 8px 12px;
--form-input-border-radius: 4px;
```text

---

## Acceptance Criteria

All of these must be true when complete:

✅ **CR-2A.1**: Exported tokens match EXACTLY approved baseline values (no drift)
- No approximations or "close enough" colors
- Every value matches the specification above

✅ **CR-2A.2**: Typography includes complete specifications
- Space Grotesk: weights 600, 700; sizes 24px, 32px, 40px, 48px
- Inter body: weights 400, 500; sizes 14px, 16px, 18px
- Inter UI: weights 500, 600; sizes 12px, 14px, 16px

✅ **CR-2A.3**: All 18 color variables exported
- 9 colors for light theme (Primary, Secondary, Accent, Success, Warning, Error, Neutral-light, Neutral-dark, Border)
- 9 colors for dark theme (same categories with dark variants)

✅ **CR-2A.4**: Unapproved candidates are NOT included
- ❌ R3 (Responsive Typography)
- ❌ T1 (Additional Typography)
- ❌ RT2 (Reader Typography Controls)
- ❌ C1 (Reader Continuity/Progress Tracking)

✅ **CR-2A.5**: Component styles exported
- Button (primary, secondary, disabled)
- Card (default, hover, active)
- Navigation (links, hover, active)
- Form Input (default, focused, error)

✅ **CR-2A.6**: File is valid and parseable
- If `.css`: Valid CSS syntax, no parsing errors
- If `.json`: Valid JSON, can be imported by build tools

---

## Step-by-Step Execution

### Phase 1: Locate Design Components in Figma

1. Open ThisOneTimeOnAcidCom Figma file
2. Find the approved components:
   - Button component(s)
   - Card component(s)
   - Navigation component
   - Form Input component(s)
3. Verify each component uses the approved baseline fonts and colors

### Phase 2: Extract Values

1. **From Button components**:
   - Note primary button background color: #1a1a1a (light theme)
   - Note primary button text color: #ffffff (light theme)
   - Note disabled state colors
   - Record all state variations

2. **From Card components**:
   - Note background color: #ffffff
   - Note border color: #cccccc
   - Note shadow/elevation

3. **From Navigation component**:
   - Note link color: #1a1a1a (default)
   - Note hover color: #e8d4b8 (accent)
   - Note active color: #e8d4b8 (accent)

4. **From Form Input component**:
   - Note input background: #ffffff
   - Note border color: #cccccc
   - Note focused border color
   - Note error state colors

5. **Typography throughout**:
   - Verify Space Grotesk usage in headings
   - Verify Inter usage in body and UI
   - Record exact font weights and sizes

### Phase 3: Generate Tokens File

**Option A: CSS Variables (.css)**
```css
/* Design System Baseline Tokens
 * Generated from Figma (Date: 2026-11-09)
 * Approved baseline version: Design System v1.0
 * Approval date: 2026-11-09
 */

/* Typography */
:root {
  --font-heading: 'Space Grotesk';
  --font-body: 'Inter';
  --font-ui: 'Inter';
  
  /* ... complete token list ... */
}

/* Light Theme */
@media (prefers-color-scheme: light) {
  :root {
    --color-primary: #1a1a1a;
    --color-secondary: #ffffff;
    /* ... all 9 light colors ... */
  }
}

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #ffffff;
    --color-secondary: #1a1a1a;
    /* ... all 9 dark colors ... */
  }
}
```text

**Option B: JSON Design Tokens (.json)**
```json
{
  "typography": {
    "heading": {
      "font": "Space Grotesk",
      "weights": [600, 700],
      "sizes": [24, 32, 40, 48]
    },
    "body": {
      "font": "Inter",
      "weights": [400, 500],
      "sizes": [14, 16, 18]
    },
    "ui": {
      "font": "Inter",
      "weights": [500, 600],
      "sizes": [12, 14, 16]
    }
  },
  "colors": {
    "light": {
      "primary": "#1a1a1a",
      "secondary": "#ffffff",
      /* ... all 9 colors ... */
    },
    "dark": {
      "primary": "#ffffff",
      "secondary": "#1a1a1a",
      /* ... all 9 colors ... */
    }
  },
  "components": {
    "button": { /* ... */ },
    "card": { /* ... */ },
    "navigation": { /* ... */ },
    "formInput": { /* ... */ }
  }
}
```text

### Phase 4: Validation

1. ✅ File generated and valid (CSS or JSON)
2. ✅ All typography values present and correct
3. ✅ All 18 color variables exported
4. ✅ All component styles included
5. ✅ No unapproved candidates included
6. ✅ File can be imported by build tools
7. ✅ No syntax errors or parsing issues

### Phase 5: Integration Check

1. Import tokens file into build system
2. Verify no conflicts with existing variables
3. Confirm build succeeds with imported tokens
4. Test that components render with token values

---

## Deliverables

When Prompt 2A execution is complete, provide:

1. **Tokens File** (`.css` or `.json`)
   - All typography specifications
   - All 18 color variables (light + dark)
   - All component style definitions
   - Valid syntax, parseable by build tools

2. **Validation Report**
   - Checklist confirming all 6 acceptance criteria met
   - File location and format
   - Build integration status

3. **Documentation**
   - Token naming convention used
   - Light/dark theme implementation method
   - Import instructions for development team

---

## Success Definition

✅ **Prompt 2A is complete when**:
- Tokens file generated (CSS or JSON format)
- All approved values extracted (typography + colors + components)
- All unapproved candidates explicitly excluded
- File is valid and can be imported by build tools
- All acceptance criteria (CR-2A.1 through CR-2A.6) verified
- Development team can import and use tokens directly

---

## Next Steps (After Prompt 2A)

Once Prompt 2A is complete:
- **Prompt 2B** can use exported baseline for navigation design
- **Prompt 3A** can use exported typography and colors for form design
- Prompts 1, 2B, and 3A can execute in parallel
