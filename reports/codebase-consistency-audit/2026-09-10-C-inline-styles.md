# Sub-audit C — Inline Styles in TSX

**Date:** 2026-09-10
**Prompt:** `src/app/prompts/codebase-consistency-audit/orchestrator.md`

---

## Findings

| ID | File:Line | Severity | Description |
|---|---|---|---|
| C-01 | `SectionCard.tsx:123` | 🟠 High | `style={{ borderColor: theme.accentGradient ? \`var(--wp--preset--color--${...})\` : undefined }}` — injecting a CSS var reference as a string literal into a style attribute. The correct approach is CSS var injection: `style={{ '--section-accent': tokenName } as React.CSSProperties}` consumed via `border-color: var(--section-accent)` in CSS. |
| C-02 | `FestivalLandingPage.tsx:21` | 🟡 Medium | `style={{ backgroundImage: \`radial-gradient(...), url('${festivalPageData.hero.image}')\` }}` — dynamic image URL combined with gradient overlay. This is an accepted pattern (no CSS alternative for data-driven URLs), BUT the gradient hardcodes `rgba(15, 15, 15, ...)` instead of using `--color-atomic-black`. |
| C-03 | `UVMakeupSection.tsx:235` | 🟡 Medium | `style={{ transform: \`translateX(calc(${currentSlideIndex} * -${100 / slidesPerView}%))\` }}` — computed slider transform. This is a CSS var injection candidate: inject `--slide-index` and `--slides-per-view` and compute in CSS. Follows the pattern already used in `WhySection.tsx`. |
| C-04 | `SliderCard.tsx:257` | ✅ Accepted | `style={{ backgroundImage: \`url('${optimizedImageUrl}')\` }}` — dynamic asset URL. No CSS alternative. |

---

## Previously Resolved (confirmed still passing)

| File | Pattern | Status |
|---|---|---|
| `PortfolioMegaMenu.tsx`, `BlogMegaMenu.tsx`, `AboutDropdown.tsx` | `--col-index`, `--item-index`, `--node-index` CSS var injection | ✅ Still correct |
| `BlogPostPage.tsx`, `PodcastDetailPage.tsx` | Progress bar `width` | ✅ Still correct |
| `PortfolioCard.tsx` | `backgroundImage` URL | ✅ Still correct |
| `ResponsiveGridSlider.tsx` | Computed flex basis | ✅ Still correct |
| `PaletteDemoModal.tsx` | Live colour swatch hex | ✅ Still correct |
| `PressKitPage.tsx:38` | Dynamic `backgroundImage` + gradient | ✅ Still accepted |
| `WhySection.tsx:152` | `--slide-index`, `--slides-per-view` CSS var injection | ✅ Still correct |
| `TimelinePage.tsx` | `--timeline-accent`, `--cat-neon` CSS var injection | ✅ Still correct |
| `HistoryPage.tsx` | `--cat-hex` CSS var injection | ✅ Still correct |

---

## Accepted Exceptions

| File | Pattern | Reason |
|---|---|---|
| `SliderCard.tsx:257` | `backgroundImage: url(...)` | Dynamic asset URL — no CSS alternative |
| `FestivalLandingPage.tsx:21` | `backgroundImage` + gradient | Dynamic URL + gradient — accepted; gradient rgba values are a medium priority improvement |
| All stagger/animation CSS var injections | `--col-index`, `--item-index` etc. | Correct CSS var injection pattern |
| `PaletteDemoModal.tsx` | Live colour values | Dev-tool context only |

---

## Recommended Actions

- **C-01:** In `SectionCard.tsx:123`, replace `style={{ borderColor: 'var(--wp--preset--color--...' }}` with `style={{ '--section-accent': theme.accentGradient ? \`var(--wp--preset--color--${theme.accentGradient.from})\` : 'transparent' } as React.CSSProperties}`. Add `border-color: var(--section-accent, transparent)` to `section-card.css`.
- **C-03:** In `UVMakeupSection.tsx:235`, adopt CSS var injection: `style={{ '--slide-index': currentSlideIndex, '--slides-per-view': slidesPerView } as React.CSSProperties}`. Move `transform` to `uv-makeup-section.css`: `.uv-makeup-section__track { transform: translateX(calc(var(--slide-index, 0) * -#{100 / var(--slides-per-view, 1)}%)) }` — or use a simpler calculated width approach.
- **C-02:** (Optional) In `FestivalLandingPage.tsx:21`, change `rgba(15, 15, 15, ...)` inside the gradient to use the CSS token `rgba(var(--wp--preset--color--atomic-black-rgb, 15, 15, 15), ...)` — or accept as-is since the static rgba is a safe approximation.
