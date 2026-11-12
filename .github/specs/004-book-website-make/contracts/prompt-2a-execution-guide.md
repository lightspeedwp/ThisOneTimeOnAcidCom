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
| ---------- | ------ | --------- | ------- | ------- |
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
```

### 2. Extract Colors (Light Theme — Approved Baseline)

| # | Name | Color | Hex | Usage |
| --- | ------ | ------- | ----- | ------- |
| 1 | Primary (Text) | Deepest Dark | #0B0B10 | Text, foreground |
| 2 | Primary (Background) | Warm Cream | #F6F2EB | Background, contrast |
| 3 | Secondary (Text) | Warm Brown | #9C9488 | Secondary text |
| 4 | Secondary (Background) | Warm Tan | #CFC7BB | Secondary background |
| 5 | Accent | Hot Pink | #FF3AAE | Highlights, CTAs |
| 6 | Accent | Electric Yellow | #F4FF3C | Highlights, labels |
| 7 | Accent | Purple | #8A63FF | Tertiary accents |
| 8 | Dark Support | Dark Purple-Black | #12121A | Elevated surfaces |
| 9 | Dark Support | Lighter Dark | #171722 | Alternative dark |

**Export as CSS Variables** (Approved Baseline):
```css
/* Light Theme */
--color-primary-text-light: #0B0B10;
--color-primary-bg-light: #F6F2EB;
--color-secondary-text-light: #9C9488;
--color-secondary-bg-light: #CFC7BB;
--color-accent-pink: #FF3AAE;
--color-accent-yellow: #F4FF3C;
--color-accent-purple: #8A63FF;
--color-dark-support-1: #12121A;
--color-dark-support-2: #171722;
```

### 3. Extract Colors (Dark Theme — Approved Baseline)

| # | Name | Color | Hex | Usage |
| --- | ------ | ------- | ----- | ------- |
| 1 | Primary (Text) | Warm Cream | #F6F2EB | Text, foreground |
| 2 | Primary (Background) | Deepest Dark | #0B0B10 | Background, contrast |
| 3 | Secondary (Text) | Warm Tan | #CFC7BB | Secondary text |
| 4 | Secondary (Background) | Dark Purple-Black | #12121A | Secondary background |
| 5 | Accent | Hot Pink | #FF3AAE | Highlights, CTAs |
| 6 | Accent | Electric Yellow | #F4FF3C | Highlights, labels |
| 7 | Accent | Purple | #8A63FF | Tertiary accents |
| 8 | Light Support | Warm Brown | #9C9488 | Tertiary text |
| 9 | Light Support | Lighter Dark | #171722 | Alternative dark background |

**Export as CSS Variables** (Approved Baseline):
```css
/* Dark Theme */
--color-primary-text-dark: #F6F2EB;
--color-primary-bg-dark: #0B0B10;
--color-secondary-text-dark: #CFC7BB;
--color-secondary-bg-dark: #12121A;
--color-accent-pink: #FF3AAE;
--color-accent-yellow: #F4FF3C;
--color-accent-purple: #8A63FF;
--color-light-support-1: #9C9488;
--color-light-support-2: #171722;
```

### 4. Extract Component Styles

**Button Component** (Approved Baseline):
```css
/* Light Theme */
--button-bg-primary-light: var(--color-accent-pink);
--button-text-primary-light: #ffffff;
--button-bg-secondary-light: var(--color-secondary-bg-light);
--button-text-secondary-light: var(--color-primary-text-light);
--button-border-radius: 8px;
--button-padding: 12px 24px;

/* Dark Theme */
--button-bg-primary-dark: var(--color-accent-pink);
--button-text-primary-dark: #ffffff;
--button-bg-secondary-dark: var(--color-secondary-bg-dark);
--button-text-secondary-dark: var(--color-primary-text-dark);
--button-bg-disabled: #9C9488;
--button-text-disabled: #CFC7BB;
```

**Card Component** (Approved Baseline):
```css
/* Light Theme */
--card-bg-light: var(--color-primary-bg-light);
--card-border-light: 1px solid var(--color-secondary-bg-light);
--card-border-radius: 8px;
--card-padding: 16px;
--card-shadow: 0 2px 8px rgba(11, 11, 16, 0.1);

/* Dark Theme */
--card-bg-dark: var(--color-secondary-bg-dark);
--card-border-dark: 1px solid var(--color-dark-support-2);
--card-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
--card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
```

**Navigation Component** (Approved Baseline):
```css
/* Light Theme */
--nav-link-color-light: var(--color-primary-text-light);
--nav-link-color-hover-light: var(--color-accent-pink);
--nav-link-color-active-light: var(--color-accent-pink);
--nav-link-font: var(--font-ui);
--nav-link-font-weight: 500;

/* Dark Theme */
--nav-link-color-dark: var(--color-primary-text-dark);
--nav-link-color-hover-dark: var(--color-accent-pink);
--nav-link-color-active-dark: var(--color-accent-pink);
--nav-underline-active: 2px solid var(--color-accent-pink);
```

**Form Input Component** (Approved Baseline):
```css
/* Light Theme */
--form-input-bg-light: var(--color-primary-bg-light);
--form-input-border-light: 1px solid var(--color-secondary-bg-light);
--form-input-border-focused-light: 2px solid var(--color-accent-pink);
--form-input-text-light: var(--color-primary-text-light);
--form-input-padding: 12px;
--form-input-border-radius: 6px;

/* Dark Theme */
--form-input-bg-dark: var(--color-primary-bg-dark);
--form-input-border-dark: 1px solid var(--color-secondary-bg-dark);
--form-input-border-focused-dark: 2px solid var(--color-accent-pink);
--form-input-text-dark: var(--color-primary-text-dark);
--form-input-error-border: 2px solid #FF6B6B;
--form-input-error-text: #FF6B6B;
--form-input-placeholder: #9C9488;
```

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

✅ **CR-2A.3**: All 18 color variables exported with proper reconciliation
- 9 colors for light theme: Primary text (#0B0B10), Primary bg (#F6F2EB), Secondary text (#9C9488), Secondary bg (#CFC7BB), Hot Pink (#FF3AAE), Electric Yellow (#F4FF3C), Purple (#8A63FF), Dark Support 1 (#12121A), Dark Support 2 (#171722)
- 9 colors for dark theme (same colors, swapped context per theme design)

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

### Phase 2: Extract Values (Approved Baseline)

1. **From Button components**:
   - Note primary button background color: #FF3AAE (hot pink accent)
   - Note primary button text color: #FFFFFF (white)
   - Note secondary button uses theme colors (#F6F2EB light / #0B0B10 dark)
   - Record all state variations

2. **From Card components**:
   - Note light theme background color: #F6F2EB
   - Note dark theme background color: #0B0B10 or #12121A
   - Note border color uses warm neutrals (#CFC7BB light / #12121A dark)
   - Note shadow/elevation

3. **From Navigation component**:
   - Note link color (light): #0B0B10 (default)
   - Note link color (dark): #F6F2EB (default)
   - Note hover color: #FF3AAE (hot pink accent, both themes)
   - Note active color: #FF3AAE (hot pink accent, both themes)

4. **From Form Input component**:
   - Note light theme background: #F6F2EB (warm cream)
   - Note dark theme background: #0B0B10 (deepest dark)
   - Note border colors use warm neutrals (#CFC7BB light / #12121A dark)
   - Note focused border: #FF3AAE (hot pink accent, both themes)

5. **Typography throughout**:
   - Verify Space Grotesk usage in headings (weights: 600, 700; sizes: 24px, 32px, 40px, 48px)
   - Verify Inter usage in body and UI (body weights: 400, 500; UI weights: 500, 600)
   - Record exact font weights and sizes

### Phase 3: Generate Tokens File

**Option A: CSS Variables (.css)** (Approved Baseline)
```css
/* Design System Baseline Tokens
 * Generated from Figma (Date: 2026-11-11)
 * Approved baseline version: Design Brief v1.1.2
 * Approval date: 2026-11-04 (Asia/Bangkok)
 * Approved palette: #0B0B10, #12121A, #171722, #F6F2EB, #CFC7BB, #9C9488, #FF3AAE, #F4FF3C, #8A63FF
 */

/* Shared/Universal Typography */
:root {
  --font-heading: 'Space Grotesk';
  --font-body: 'Inter';
  --font-ui: 'Inter';
  
  /* Typography Sizes (px) */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-h3: 24px;
  --font-size-h2: 32px;
  --font-size-h1: 40px;
  --font-size-hero: 48px;
  
  /* Typography Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Accents (same in both themes) */
  --color-accent-pink: #FF3AAE;
  --color-accent-yellow: #F4FF3C;
  --color-accent-purple: #8A63FF;
  
  /* Component States */
  --state-hover-opacity: 0.8;
  --state-active-opacity: 0.7;
  --state-disabled-opacity: 0.5;
  --state-focus-ring: 2px solid var(--color-accent-purple);
}

/* Light Theme */
@media (prefers-color-scheme: light) {
  :root {
    --color-primary-text: #0B0B10;
    --color-primary-bg: #F6F2EB;
    --color-secondary-text: #9C9488;
    --color-secondary-bg: #CFC7BB;
    --color-dark-support-1: #12121A;
    --color-dark-support-2: #171722;
  }
}

/* Dark Theme */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-text: #F6F2EB;
    --color-primary-bg: #0B0B10;
    --color-secondary-text: #CFC7BB;
    --color-secondary-bg: #12121A;
    --color-light-support-1: #9C9488;
    --color-light-support-2: #171722;
  }
}
```

**Option B: JSON Design Tokens (.json)** (Approved Baseline)
```json
{
  "meta": {
    "approvedDate": "2026-11-04",
    "approvedBy": "Ash",
    "approvedLocation": "Asia/Bangkok",
    "sourceDocument": "Design Brief v1.1.2"
  },
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
    "approvedPalette": ["#0B0B10", "#12121A", "#171722", "#F6F2EB", "#CFC7BB", "#9C9488", "#FF3AAE", "#F4FF3C", "#8A63FF"],
    "accents": {
      "pink": "#FF3AAE",
      "yellow": "#F4FF3C",
      "purple": "#8A63FF"
    },
    "light": {
      "primaryText": "#0B0B10",
      "primaryBg": "#F6F2EB",
      "secondaryText": "#9C9488",
      "secondaryBg": "#CFC7BB",
      "darkSupport1": "#12121A",
      "darkSupport2": "#171722"
    },
    "dark": {
      "primaryText": "#F6F2EB",
      "primaryBg": "#0B0B10",
      "secondaryText": "#CFC7BB",
      "secondaryBg": "#12121A",
      "lightSupport1": "#9C9488",
      "lightSupport2": "#171722"
    }
  },
  "components": {
    "button": { "approvedUse": "Hot pink #FF3AAE for primary actions" },
    "card": { "approvedUse": "Warm cream light / deepest dark for dark theme" },
    "navigation": { "approvedUse": "Hot pink #FF3AAE hover/active states" },
    "formInput": { "approvedUse": "Warm neutrals for borders, pink for focus" }
  }
}
```

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
