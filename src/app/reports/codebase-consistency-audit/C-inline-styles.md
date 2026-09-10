# Sub-audit C — Inline Styles in TSX Components

**Date:** 2026-06-19
**Severity breakdown:** 🟠 High: 1 file | 🟡 Medium: 4 files | ✅ Accepted: 6 files

---

## Summary

37 TSX files contain `style={{`. After classifying each, the majority fall into accepted categories (CSS custom property injection for animations, and dev-tool demo components). However, one dev-tool file (`PaletteDemoModal.tsx`) is a significant outlier with 40+ inline style blocks that should have BEM class equivalents. Several production components use inline styles for dynamic colour values with no CSS-variable-based alternative.

---

## Violations

### C-01 — `PaletteDemoModal.tsx` — 40+ inline styles 🟠 High

**File:** `src/app/components/ui/PaletteDemoModal.tsx`

This component has approximately 40 inline style blocks including complete layout, colour, spacing, and typography styles:

- `style={{ backgroundColor: atomicBlack, padding: '2rem', borderRadius: '8px' }}`
- `style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}`
- `style={{ color: '#FFFFFF', opacity: 0.7, fontSize: '0.875rem', ... }}`

This component renders inside the dev-tools palette demo modal. While dev-tool context is an accepted exception for *live hex colour demos* (showing raw colour values), **structural layout and typography** should still use BEM classes.

**Classification:** Partially accepted (colour swatches showing raw hex = acceptable), but layout/grid/spacing/typography inline styles = violation.

**Recommended fix:** Extract `demo-dashboard`, `demo-dashboard__grid`, `demo-hero`, `demo-button-group`, `demo-nav`, `demo-notification`, and `demo-spinner` into `palette-demo-modal.css`. Keep only the dynamic `color: color.hex` inline styles for the live colour preview swatches.

---

### C-02 — `TimelinePage.tsx` — Dynamic colour injection 🟡 Medium

**File:** `src/app/components/pages/about/TimelinePage.tsx`

Lines 140, 143, 165, 193, 199:

```tsx
style={{ borderColor: accentColor }}
style={{ color: accentColor }}
style={{ backgroundColor: catMeta.neonColour }}
style={{ color: cat.neonColour }}
style={{ backgroundColor: cat.neonColour }}
```

These use runtime colour values from mock data (`neonColour` field on category objects).

**Classification:** Partial violation. The pattern is valid but can be replaced with CSS custom property injection:

```tsx
// Instead of:
style={{ backgroundColor: cat.neonColour }}

// Use:
style={{ '--cat-accent': cat.neonColour } as React.CSSProperties}
// Then in CSS: background-color: var(--cat-accent);
```

This keeps colour values dynamic while removing the inline style from the actual property list. Matches the accepted pattern used in `PortfolioMegaMenu.tsx`.

---

### C-03 — `HistoryPage.tsx` — Dynamic colour 🟡 Medium

**File:** `src/app/components/pages/about/HistoryPage.tsx:134`

```tsx
style={{ background: catHex }}
```

Same issue as C-02. Replace with CSS custom property injection:

```tsx
style={{ '--cat-hex': catHex } as React.CSSProperties}
```

---

### C-04 — `PressKitPage.tsx` — Unknown inline style 🟡 Medium

**File:** `src/app/components/pages/press/PressKitPage.tsx:38`

Needs inspection to classify. If it is a layout or colour value, it is a violation.

---

### C-05 — `WhySection.tsx` — Unknown inline style 🟡 Medium

**File:** `src/app/components/sections/WhySection.tsx:152`

Needs inspection to classify. If it is a layout or colour value, it is a violation.

---

## Accepted Exceptions (no action required)

| File | Lines | Pattern | Rationale |
|---|---|---|---|
| `PortfolioMegaMenu.tsx` | 117,153,161,203,211 | `--col-index`, `--item-index` CSS var injection | Animation stagger — accepted pattern |
| `BlogMegaMenu.tsx` | 118,155,163,204,212 | `--col-index`, `--item-index` CSS var injection | Animation stagger — accepted pattern |
| `AboutDropdown.tsx` | 170 | `--node-index` CSS var injection | Animation stagger — accepted pattern |
| `BlogPostPage.tsx` | 243 | `width: readingProgress + '%'` | Dynamic progress bar — no CSS alternative for live % value |
| `PodcastDetailPage.tsx` | 177 | `width: isPlaying ? '35%' : '0%'` | Dynamic progress indicator — same as above |
| `PortfolioCard.tsx` | 194 | `backgroundImage: url(...)` | Dynamic image URL — CSS cannot handle runtime URLs |
| `ResponsiveGridSlider.tsx` | 183,191 | `flex: 0 0 ${100/slidesPerView}%` | Dynamic layout calculation — no CSS alternative |
| `PaletteDemoModal.tsx` | colour swatches only | `color: color.hex` on swatch elements | Live hex colour demo — dev-tool context |
| `FestivalLandingPage.tsx` | 21 | Needs inspection | Provisionally accepted pending review |
