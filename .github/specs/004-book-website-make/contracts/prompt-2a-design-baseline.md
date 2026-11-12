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

**Colors (Light Theme)**:
1. Primary: #1a1a1a (charcoal)
2. Secondary: #ffffff (white)
3. Accent: #e8d4b8 (tan)
4. Success: #2d5016 (green)
5. Warning: #b8860b (gold)
6. Error: #8b0000 (maroon)
7. Neutral-light: #f5f5f5 (light gray)
8. Neutral-dark: #666666 (dark gray)
9. Border: #cccccc (medium gray)

**Colors (Dark Theme)**:
1. Primary: #ffffff (white)
2. Secondary: #1a1a1a (charcoal)
3. Accent: #d4a574 (tan variant)
4. Success: #90ee90 (light green)
5. Warning: #ffd700 (gold variant)
6. Error: #ff6b6b (light red)
7. Neutral-light: #333333 (dark gray)
8. Neutral-dark: #cccccc (light gray)
9. Border: #444444 (medium gray variant)

**Components**:
- Button (primary, secondary, disabled states)
- Card (default, hover, active states)
- Navigation (visible items, responsive)
- Form Input (default, focused, error states)
- Reader Access Form (email entry, code entry)

### Exact Changes

**Export Format**: CSS variables file (tokens.css) or design-token JSON

**Variables to Export**:
- `--font-heading: 'Space Grotesk'`
- `--font-body: 'Inter'`
- `--color-primary-light: #1a1a1a`
- `--color-primary-dark: #ffffff`
- [9 colors × 2 themes = 18 color variables]
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
