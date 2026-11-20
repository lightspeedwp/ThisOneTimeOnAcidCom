# Figma Make Prompt 2A: Design System Baseline Export

**Status**: ✅ UNBLOCKED  
**Priority**: P1  
**Prompt ID**: 2A  
**Type**: design-baseline

---

## Specification

### Goal

Export design-system baseline (approved typography, colors, component styles) as CSS variables or design-token file, matching exact approved values from design baseline.

### Design Baseline (Approved)

**Typography**:
- Headings: Space Grotesk (weights: 600, 700; sizes: 24px, 32px, 40px, 48px)
- Body: Inter (weights: 400, 500; sizes: 14px, 16px, 18px)
- UI: Inter (weights: 500, 600; sizes: 12px, 14px, 16px)

**Colors (Approved Baseline — Design Brief v1.1.2)**:

Dark-first palette with preserved light support:

1. Deepest Dark: #0B0B10 (primary dark background)
2. Dark Purple-Black: #12121A (secondary dark background)
3. Lighter Dark: #171722 (tertiary dark background)
4. Warm Cream: #F6F2EB (primary light background / dark theme text)
5. Warm Tan: #CFC7BB (secondary light / neutral warm)
6. Warm Brown: #9C9488 (tertiary light / warm neutral)
7. Hot Pink Accent: #FF3AAE (interactive accent, both themes)
8. Electric Yellow Accent: #F4FF3C (highlight accent, both themes)
9. Purple Accent: #8A63FF (tertiary accent, both themes)

**Dark Theme Mapping**:
- Primary (text): #F6F2EB (warm cream on #0B0B10)
- Primary (background): #0B0B10
- Secondary (text): #CFC7BB (warm tan)
- Secondary (background): #12121A
- Accents: #FF3AAE, #F4FF3C, #8A63FF

**Light Theme Mapping** (⏳ pending approval):
- Existing light support, theme switching and saved-light preferences are preserved.
- Light-theme semantic role assignments are **not approved**. The design register records light design as unresolved (`references/05-design-reader-decision-register.md`, Theme scope), so no light role mapping is specified here.
- Approved palette values above remain unchanged; approval of the palette does not approve a light-theme mapping.

**Components**:
- Button (primary, secondary, disabled states)
- Card (default, hover, active states)
- Navigation (visible items, responsive)
- Form Input (default, focused, error states)
- Reader Access Form (email entry, code entry)

### Exact Changes

**Export Format**: CSS variables file (tokens.css) or design-token JSON

**Variables to Export** (Approved Baseline):
- `--font-heading: 'Space Grotesk'`
- `--font-body: 'Inter'`
- Shared palette primitives (nine approved values, defined once):
- `--color-deepest-dark: #0B0B10`
- `--color-dark-purple: #12121A`
- `--color-lighter-dark: #171722`
- `--color-warm-cream: #F6F2EB`
- `--color-warm-tan: #CFC7BB`
- `--color-warm-brown: #9C9488`
- `--color-accent-pink: #FF3AAE`
- `--color-accent-yellow: #F4FF3C`
- `--color-accent-purple: #8A63FF`
- Theme-specific colour variables (18 in total, nine per theme), each referencing a shared primitive:
  - Dark theme (nine): `--color-primary-text-dark`, `--color-primary-bg-dark`, `--color-secondary-text-dark`, `--color-secondary-bg-dark`, `--color-tertiary-text-dark`, `--color-panel-dark`, `--color-accent-pink-dark`, `--color-accent-yellow-dark`, `--color-accent-purple-dark`, mapped to the approved dark roles in the design register
  - Light theme (nine): the same nine role names with a `-light` suffix, preserving the existing light-support values; their role mapping is **pending approval** and must be flagged as such in the export
- Component-specific variables:
  - Button: `--button-bg-primary`, `--button-text-primary`, `--button-bg-secondary`, `--button-text-secondary`, `--button-bg-disabled`, `--button-text-disabled`
  - Card: `--card-bg`, `--card-border`, `--card-shadow`
  - Navigation: `--nav-link-color`, `--nav-link-color-hover`, `--nav-link-color-active`, `--nav-underline-active`
  - Form Input: `--form-input-bg`, `--form-input-border`, `--form-input-border-focused`, `--form-input-text`, `--form-input-error-border`, `--form-input-error-text`, `--form-input-placeholder`

### Figma Make Instructions (Deprecated)

1. Locate approved design components in Figma (Button, Card, Navigation, Form)
2. Extract typography values (Space Grotesk and Inter specifications)
3. Extract color values for light and dark themes
4. Generate CSS variable file with clear naming: `--{component}-{property}-{state}`
5. Export both formats: a CSS custom-properties file (`.css`) and a JSON design-tokens file (`.json`), with matching values
6. Include comment header documenting baseline version and approval date

---

## Claude Execution

### Input Specification

Claude receives:
- Approved design baseline (typography, colors, components)
- Design Brief v1.1.2 reference
- Design register (5-design-reader-decision-register.md)
- Naming conventions for CSS variables
- Light/dark theme role mapping (approved for dark, pending for light)

### Output Specification

Claude produces **two files**:

#### 1. `design-tokens.css` (CSS Custom Properties)

```css
/* Design Baseline — Book Website
 * Version: v1.1.2
 * Generated: 2026-11-20
 * Approval: Gate 2 Sign-off
 */

:root {
  /* Typography */
  --font-heading: 'Space Grotesk';
  --font-heading-weight-600: 600;
  --font-heading-weight-700: 700;
  --font-heading-size-24: 24px;
  --font-heading-size-32: 32px;
  --font-heading-size-40: 40px;
  --font-heading-size-48: 48px;
  
  --font-body: 'Inter';
  --font-body-weight-400: 400;
  --font-body-weight-500: 500;
  --font-body-size-14: 14px;
  --font-body-size-16: 16px;
  --font-body-size-18: 18px;

  /* Shared Palette Primitives */
  --color-deepest-dark: #0B0B10;
  --color-dark-purple: #12121A;
  --color-lighter-dark: #171722;
  --color-warm-cream: #F6F2EB;
  --color-warm-tan: #CFC7BB;
  --color-warm-brown: #9C9488;
  --color-accent-pink: #FF3AAE;
  --color-accent-yellow: #F4FF3C;
  --color-accent-purple: #8A63FF;

  /* Dark Theme Variables (Approved) */
  --color-primary-text-dark: var(--color-warm-cream);
  --color-primary-bg-dark: var(--color-deepest-dark);
  --color-secondary-text-dark: var(--color-warm-tan);
  --color-secondary-bg-dark: var(--color-dark-purple);
  --color-accent-pink-dark: var(--color-accent-pink);
  --color-accent-yellow-dark: var(--color-accent-yellow);
  --color-accent-purple-dark: var(--color-accent-purple);

  /* Light Theme Variables (Pending Approval) */
  /* ⚠️ Light theme role mapping not approved; existing light support preserved */
  --color-primary-text-light: var(--color-deepest-dark);
  --color-primary-bg-light: var(--color-warm-cream);
  --color-secondary-text-light: var(--color-dark-purple);
  --color-secondary-bg-light: var(--color-warm-tan);
  --color-accent-pink-light: var(--color-accent-pink);
  --color-accent-yellow-light: var(--color-accent-yellow);
  --color-accent-purple-light: var(--color-accent-purple);

  /* Component Variables */
  --button-bg-primary: var(--color-accent-pink);
  --button-text-primary: var(--color-primary-bg-dark);
  --button-bg-secondary: var(--color-secondary-bg-dark);
  --button-text-secondary: var(--color-primary-text-dark);
  --button-bg-disabled: var(--color-lighter-dark);
  --button-text-disabled: var(--color-warm-brown);

  --card-bg: var(--color-secondary-bg-dark);
  --card-border: var(--color-lighter-dark);
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  --nav-link-color: var(--color-primary-text-dark);
  --nav-link-color-hover: var(--color-accent-pink);
  --nav-link-color-active: var(--color-accent-pink);
  --nav-underline-active: 2px solid var(--color-accent-pink);

  --form-input-bg: var(--color-darker-dark);
  --form-input-border: var(--color-lighter-dark);
  --form-input-border-focused: var(--color-accent-pink);
  --form-input-text: var(--color-primary-text-dark);
  --form-input-error-border: #FF6B6B;
  --form-input-error-text: #FF6B6B;
  --form-input-placeholder: var(--color-warm-brown);
}
```

#### 2. `design-tokens.json` (Design Token Format)

```json
{
  "metadata": {
    "version": "v1.1.2",
    "generated": "2026-11-20",
    "approval": "Gate 2 Sign-off",
    "lightThemeApproval": "pending"
  },
  "typography": {
    "heading": {
      "family": "Space Grotesk",
      "weights": { "600": 600, "700": 700 },
      "sizes": { "24": "24px", "32": "32px", "40": "40px", "48": "48px" }
    },
    "body": {
      "family": "Inter",
      "weights": { "400": 400, "500": 500 },
      "sizes": { "14": "14px", "16": "16px", "18": "18px" }
    }
  },
  "colors": {
    "primitives": {
      "deepest_dark": "#0B0B10",
      "dark_purple": "#12121A",
      "lighter_dark": "#171722",
      "warm_cream": "#F6F2EB",
      "warm_tan": "#CFC7BB",
      "warm_brown": "#9C9488",
      "accent_pink": "#FF3AAE",
      "accent_yellow": "#F4FF3C",
      "accent_purple": "#8A63FF"
    },
    "themes": {
      "dark": {
        "primary_text": "#F6F2EB",
        "primary_bg": "#0B0B10",
        "secondary_text": "#CFC7BB",
        "secondary_bg": "#12121A",
        "accent_pink": "#FF3AAE",
        "accent_yellow": "#F4FF3C",
        "accent_purple": "#8A63FF"
      },
      "light": {
        "approval": "pending",
        "primary_text": "#0B0B10",
        "primary_bg": "#F6F2EB",
        "secondary_text": "#12121A",
        "secondary_bg": "#CFC7BB",
        "accent_pink": "#FF3AAE",
        "accent_yellow": "#F4FF3C",
        "accent_purple": "#8A63FF"
      }
    }
  },
  "components": {
    "button": { "primary_bg": "#FF3AAE", "primary_text": "#0B0B10" },
    "card": { "bg": "#12121A", "border": "#171722" },
    "navigation": { "link_hover": "#FF3AAE", "link_active": "#FF3AAE" },
    "form": { "bg": "#171722", "border": "#171722", "focused_border": "#FF3AAE" }
  }
}
```

### Validation Criteria

✅ CSS file is valid and parses correctly  
✅ JSON file is valid and parses correctly  
✅ All 9 shared palette primitives present  
✅ 9 dark-theme variables (approved) with exact hex values  
✅ 9 light-theme variables (flagged as pending approval)  
✅ All component variables exported (Button, Card, Navigation, Form)  
✅ Typography values match baseline (Space Grotesk headings, Inter body)  
✅ Unapproved candidates (R3, T1, RT2, C1) NOT present  
✅ Acceptance criteria CR-2A.1 through CR-2A.6 explicitly addressed  

### Acceptance Criteria

✅ **CR-2A.1**: Exported tokens match exactly approved baseline values (no drift)

✅ **CR-2A.2**: Typography includes Space Grotesk (headings) and Inter (body/UI) with exact weights/sizes

✅ **CR-2A.3**: Colours: nine shared palette primitives, plus nine theme-specific variables for the dark theme (approved roles) and nine for the light theme (existing light support, mapping pending approval) — 18 theme-specific variables in total

✅ **CR-2A.4**: Unapproved candidates (R3, T1, RT2, C1) are NOT in exported tokens

✅ **CR-2A.5**: Component styles exported (Button, Card, Navigation, Form) with all states
- Button: primary (light/dark), secondary (light/dark), disabled
- Card: default, hover shadow variants
- Navigation: link default, hover, active, underline indicator
- Form Input: default, focused (border color change), error state, placeholder text

✅ **CR-2A.6**: Both files are valid — the CSS file and the JSON file each parse with build tools, and their values match

### Error Handling

**If export fails or values conflict**:
- ❌ **Missing component**: Verify component exists in Figma file; regenerate
- ❌ **Colour mismatch**: Check against Design Brief v1.1.2; flag discrepancy with ⚠️ notation
- ❌ **Invalid token format**: Verify CSS variable naming follows `--{category}-{name}` pattern
- ❌ **JSON syntax error**: Validate JSON structure before delivery; fix and re-export
- ❌ **Missing theme variant**: Ensure both light and dark theme variables present (or flag as pending)
- **Resolution**: Document error with notation, re-verify baseline, regenerate and re-export

### Unapproved Candidates (Explicitly NOT Included)

- R3 (Responsive Typography) — Unapproved ~
- T1 (Additional Typography) — Unapproved ~
- RT2 (Reader Typography Controls) — Unapproved ~
- C1 (Reader Continuity/Progress Tracking) — Unapproved ~

### Reference Documents

- Design Baseline: `.github/specs/004-book-website-make/references/04-design-brief.md` (v1.1.2)
- Design Register: `.github/specs/004-book-website-make/references/05-design-reader-decision-register.md` (v1.9.0)
- Candidates documented but not approved

### Dependencies

- None (Prompt 2A can execute independently)

### Next Prompts

- Prompt 2B (Navigation Design) — Uses exported baseline
- Prompt 3A (Reader Access Copy & Forms) — Uses exported typography and colors

---

## Validation Checklist

- [ ] CSS/JSON file generated and valid
- [ ] All typography values correct (Space Grotesk headings, Inter body/UI)
- [ ] Nine shared palette primitives plus all 18 theme-specific colour variables exported (9 light + 9 dark); light mapping flagged as pending approval
- [ ] Unapproved candidates confirmed absent
- [ ] Component styles exported (Button, Card, Navigation, Form)
- [ ] Build succeeds with imported tokens (no syntax errors)
- [ ] All acceptance criteria (CR-2A.1 through CR-2A.6) met
