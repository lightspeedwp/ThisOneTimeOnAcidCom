# Design system expansion — task list

**Created:** March 8, 2026
**Orchestrator:** `/prompts/feature-work/orchestrator.md` (Sub-audit 5)
**Prompt:** `/prompts/feature-work/05-design-system-expansion.md` + ADDENDUM
**Report:** `/reports/feature-work/05-design-system-expansion-answers.md`
**Status:** NOT STARTED — all 15 audit questions answered, ready for implementation

---

## Phase 1: Foundation & architecture (sessions 1-3)

### Theme engine
- [x] Create ThemeProvider component with React Context + `useTheme()` hook
- [x] Create CSS variable sheets for Dark theme (`[data-theme="dark"]`)
- [x] Create CSS variable sheets for Brutalist theme (`[data-theme="brutalist"]`)
- [x] Create ThemeSwitcher segmented slider component (replaces binary toggle)
- [x] Add FOUC prevention script to `index.html` `<head>`
- [x] Create `usePerformanceGuard()` hook for mobile detection
- [x] Wire ThemeProvider into App.tsx root
- [x] Wire ThemeSwitcher into Header (replace existing toggle)

### Block library infrastructure
- [x] Create Global Block Library landing page (`/dev-tools/block-library`)
- [x] Create Patterns Library landing page (`/dev-tools/patterns`)
- [x] Create BlockLabTemplate shared component
- [x] Create VariationCard component
- [x] Create CodeExporter component (CSS + React export)
- [x] Create PostTypeFilter component
- [x] Create ContextPreview component
- [x] Create PropertyControl component (sliders, toggles, colour pickers)
- [x] Create post-type-mappings data file (`/data/mock/design-system/post-type-mappings.ts`)

### New dev tools pages
- [x] Create Google Fonts dev tools page (`/dev-tools/google-fonts`)
- [x] Create Audio concepts dev tools page (`/dev-tools/audio-concepts`)

### Routing & navigation
- [x] Add block library routes to router
- [x] Add patterns routes to router
- [x] Add Google Fonts + Audio Concepts routes
- [x] Update DevToolsPage hub navigation with "Design System" category
- [x] Update sitemap

### CSS architecture
- [x] Create `/styles/blocks/global-block-library.css`
- [x] Create `/styles/blocks/block-lab-template.css`
- [x] Create `/styles/blocks/theme-switcher.css`
- [x] Create `/styles/blocks/code-exporter.css`
- [x] Create `/styles/patterns/patterns-library.css`

---

## Phase 2: Core Blocks A (sessions 4-9)

### Paragraph block (20 variations)
- [ ] Create paragraph-variations data file
- [ ] Create ParagraphBlockLabPage component
- [ ] Create `/styles/blocks/paragraph-variations.css` (20 styles)
- [ ] Wire route `/dev-tools/block-library/paragraph`
- [ ] Verify prefers-reduced-motion for all animated variations

### Heading block (25 variations)
- [ ] Create heading-variations data file
- [ ] Create HeadingBlockLabPage component
- [ ] Create `/styles/blocks/heading-variations.css` (25 styles)
- [ ] Wire route `/dev-tools/block-library/heading`
- [ ] Verify prefers-reduced-motion for all animated variations

### Button block (20 variations)
- [ ] Create button-variations data file
- [ ] Create ButtonBlockLabPage component
- [ ] Create `/styles/blocks/button-variations.css` (20 styles)
- [ ] Wire route `/dev-tools/block-library/button`
- [ ] Verify prefers-reduced-motion for all animated variations

### List block (10 variations)
- [ ] Create list-variations data file
- [ ] Create ListBlockLabPage component
- [ ] Create `/styles/blocks/list-variations.css` (10 styles)
- [ ] Wire route `/dev-tools/block-library/list`

---

## Phase 3: Core Blocks B (sessions 10-17)

### Divider block (10 variations)
- [ ] Create divider-variations data + component + CSS + route

### Forms block (5 themes)
- [ ] Create form-variations data + component + CSS + route

### Image block (10 variations)
- [ ] Create image-variations data + component + CSS + route

### Navigation block (10 variations)
- [ ] Create navigation-variations data + component + CSS + route

### Breadcrumbs block (10 variations)
- [ ] Create breadcrumb-variations data + component + CSS + route

### Gallery block (10 variations)
- [ ] Create gallery-variations data + component + CSS + route

### Social Icons block (5 variations)
- [ ] Create social-icon-variations data + component + CSS + route

### Search block (10 variations)
- [ ] Create search-variations data + component + CSS + route

### Table block (10 variations — ADDENDUM)
- [ ] Create table-variations data + component + CSS + route
- [ ] Implement sorting functionality
- [ ] Implement filtering functionality
- [ ] Implement pagination functionality

### Code block (10 variations — ADDENDUM)
- [ ] Create code-variations data + component + CSS + route
- [ ] Implement custom syntax tokeniser for 6 languages (JS, TS, CSS, HTML, Python, Shell)

---

## Phase 4: Pattern Compositions (sessions 18-22)

### Hero patterns (10)
- [ ] Create hero-patterns data + component + CSS + route

### CTA patterns (10)
- [ ] Create cta-patterns data + component + CSS + route

### Testimonial patterns (5)
- [ ] Create testimonial-patterns data + component + CSS + route
- [ ] Implement TestimonialWaveform visual-only component (CSS scaleY animation)

### Countdown patterns (5)
- [ ] Create countdown-patterns data + component + CSS + route
- [ ] Implement real-time JavaScript countdown mode
- [ ] Implement static/frozen demonstration mode

### ~~Pricing patterns (5)~~ — SKIPPED (personal art portfolio)

---

## Phase 5: Theme expansion + polish (sessions 23-28)

### Additional theme CSS variable sheets
- [ ] Create Neon theme CSS variables
- [ ] Create Glassmorphism theme CSS variables
- [ ] Create Neumorphism theme CSS variables (Phase 2 theme)
- [ ] Create Claymorphism theme CSS variables (Phase 2 theme)
- [ ] Create Retro/Win95 theme CSS variables (Phase 2 theme)
- [ ] Create Skeuomorphic theme CSS variables (Phase 2 theme)
- [ ] Update ThemeSwitcher to include all 8 themes

### Mobile performance
- [ ] Add mobile media query constraints (kill blur, simplify shadows)
- [ ] Limit waveform animation iterations on mobile
- [ ] Verify 30fps target on mid-range mobile devices

### Accessibility audit
- [ ] WCAG 2.1 AA colour contrast for all variations in all themes
- [ ] prefers-reduced-motion fallbacks for all 195+ variations
- [ ] Keyboard navigation for all interactive elements
- [ ] Screen reader compatibility for all lab pages
- [ ] Focus indicators (3px neon pink glow) on all interactive elements

### Documentation
- [ ] Create 14 block variation guideline files in `/guidelines/blocks/`
- [ ] Create 4 pattern guideline files in `/guidelines/patterns/`
- [ ] Strategic use case explainers per variation
- [ ] Theme compatibility matrix
- [ ] Performance optimisation notes

### Integration & polish
- [ ] Code export: CSS copy-to-clipboard for all variations
- [ ] Code export: React component export for all variations
- [ ] Code export: JSON token export
- [ ] Master JSON configuration file for all 8 themes
- [ ] Final navigation integration (hub cards, breadcrumbs, SEO)
- [ ] Deployment checklist verification (root purge, SVG audit, z-index, Safari blur, FOUC)

---

## Summary

| Phase | Items | Variations |
|---|---|---|
| Phase 1: Foundation | 28 tasks | 0 (infrastructure) |
| Phase 2: Core Blocks A | 20 tasks | 75 variations |
| Phase 3: Core Blocks B | 14 tasks | 90 variations |
| Phase 4: Patterns | 8 tasks | 30 variations |
| Phase 5: Polish | 20 tasks | 0 (theme expansion + QA) |
| **Total** | **90 tasks** | **195 variations** |
