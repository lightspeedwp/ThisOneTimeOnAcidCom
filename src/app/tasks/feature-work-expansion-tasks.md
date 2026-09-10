# Feature Work Expansion Tasks (Sub-audits 06–10)

**Source:** [/prompts/feature-work/orchestrator.md](../prompts/feature-work/orchestrator.md)
**Report:** [/reports/feature-work/06-10-expansion-plan.md](../reports/feature-work/06-10-expansion-plan.md)
**Status:** 🟡 Active
**Date:** March 8, 2026

## 1. Style Guide Expansion (Sub-audit 06)
- [ ] Create `/components/pages/dev-tools/ContentSpecimensPage.tsx`
- [ ] Build `<TabbedSpecimenViewer />` component for rich text testing
- [ ] Create specialized FAQ components for each content type
- [ ] Build full-page layout Template Browser (miniature layout previews)
- [ ] Add route `/dev-tools/content-specimens` to router and sitemap
- [ ] Update `/styles/blocks/content-specimens.css` ensuring light/dark mode compliance

## 2. About Sub-Pages Enrichment (Sub-audit 07)
- [ ] Extract WebGL 3D component into reusable `<AnimatedWebGL3D />`
- [ ] Add `color`, `speed`, `shape` variables to WebGL component
- [ ] Create `/components/pages/dev-tools/WebGLGraphicsPage.tsx` dev tools hub
- [ ] Add CSS for `.layout--parallax`, `.layout--split-screen`, `.layout--full-bleed`
- [ ] Phase 1 Rollout: Update layout for 4 flagship pages (Berlin, Six Cats, Cycling, Travel)
- [ ] Phase 2 Rollout: Update layout for professional pages (LightSpeed, Book, Portfolio)
- [ ] Phase 3 Rollout: Update layout for personal pages (Adhd, Music, Fitness)
- [ ] Add signature neon hovers/glows to links, borders, and pull quotes per sub-page

## 3. Motion Playground & Advanced Interactions (Sub-audit 08)
- [ ] Create `/components/pages/dev-tools/MotionPlaygroundPage.tsx`
- [ ] Implement range sliders for `--animation-duration`, `--animation-delay`, `--animation-easing`
- [ ] Ensure live preview window updates CSS variables dynamically (bundler-safe)
- [ ] Build hover, focus, and page transition specimens
- [ ] Build basic drag interaction specimen
- [ ] Build scroll-triggered parallax specimen

## 4. Neon Rainbow System & Legend (Sub-audit 09)
- [ ] Create `/components/pages/dev-tools/NeonRainbowPage.tsx`
- [ ] Document 1:1 mapping of content types / sections to signature colors
- [ ] Expand CSS system to support `--page-neon` inheritance
- [ ] Implement neon tinting for section dividers, scroll-to-top, and card hovers
- [ ] Implement 5-10 new tint targets (selection text, scrollbar, form focus rings)

## 5. Journey Sidebar Enhancement (Sub-audit 10) ✅ COMPLETE — September 10, 2026
- [x] Add `.chapter-nav--sticky` modifier to `/styles/blocks/chapter-nav.css`
- [x] Implement `position: sticky; top: calc(var(--header-height, 4rem) + 2rem)` in modifier
- [x] Added `stickyClass` prop to `ChapterNav` component; desktop sidebar in `AboutPage.tsx` passes `"chapter-nav--sticky"`
- [x] Sticky only activates via opt-in `chapter-nav--sticky` modifier — base `.chapter-nav` is not sticky
- [x] Mobile/tablet: no sticky (modifier only applies at `min-width: 1024px`); overflow-y + scrollbar for long nav lists
