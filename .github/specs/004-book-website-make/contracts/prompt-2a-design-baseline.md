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

**Light Theme Mapping**:
- Primary (text): #0B0B10 (dark text)
- Primary (background): #F6F2EB (warm cream background)
- Secondary (text): #9C9488 (warm brown)
- Secondary (background): #CFC7BB (warm tan background)
- Accents: #FF3AAE, #F4FF3C, #8A63FF

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
- `--color-deepest-dark: #0B0B10`
- `--color-dark-purple: #12121A`
- `--color-lighter-dark: #171722`
- `--color-warm-cream: #F6F2EB`
- `--color-warm-tan: #CFC7BB`
- `--color-warm-brown: #9C9488`
- `--color-accent-pink: #FF3AAE`
- `--color-accent-yellow: #F4FF3C`
- `--color-accent-purple: #8A63FF`
- Component-specific variables (button-bg, card-border, etc.)

### Figma Make Instructions

1. Locate approved design components in Figma (Button, Card, Navigation, Form)
2. Extract typography values (Space Grotesk and Inter specifications)
3. Extract color values for light and dark themes
4. Generate CSS variable file with clear naming: `--{component}-{property}-{state}`
5. Export as `.css` or `.json` format (project-dependent)
6. Include comment header documenting baseline version and approval date

### Acceptance Criteria

✅ **CR-2A.1**: Exported tokens match exactly approved baseline values (no drift)

✅ **CR-2A.2**: Typography includes Space Grotesk (headings) and Inter (body/UI) with exact weights/sizes

✅ **CR-2A.3**: Colors: all 9 colors exported for light theme, all 9 for dark theme

✅ **CR-2A.4**: Unapproved candidates (R3, T1, RT2, C1) are NOT in exported tokens

✅ **CR-2A.5**: Component styles exported (Button, Card, Navigation, Form) with all states

✅ **CR-2A.6**: File is valid CSS or JSON (parseable by build tools)

### Unapproved Candidates (Explicitly NOT Included)

- R3 (Responsive Typography) — Unapproved ~
- T1 (Additional Typography) — Unapproved ~
- RT2 (Reader Typography Controls) — Unapproved ~
- C1 (Reader Continuity/Progress Tracking) — Unapproved ~

### Reference Documents

- Design Baseline: 04-design-brief.md (v1.1.2)
- Design Register: 05-design-reader-decision-register.md (v1.9.0)
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
- [ ] All 18 color variables exported (9 light + 9 dark)
- [ ] Unapproved candidates confirmed absent
- [ ] Component styles exported (Button, Card, Navigation, Form)
- [ ] Build succeeds with imported tokens (no syntax errors)
- [ ] All acceptance criteria (CR-2A.1 through CR-2A.6) met
