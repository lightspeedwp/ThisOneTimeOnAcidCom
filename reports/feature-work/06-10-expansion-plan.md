# Feature Work Sub-audits 06-10: Expansion Planning Report

**Date:** March 8, 2026
**Scope:** Sub-audits 06 through 10 from the Feature Work Orchestrator

## Overview
This report outlines the implementation plan and codebase impact for the next phase of feature work based on user answers regarding style guides, about page layouts, WebGL graphics, animations, the neon system, and sidebar behaviors.

## Sub-audit 6: Style Guide Expansion (Content-Type Specimens)
**Current State:** Dev tools currently lack dedicated multi-tab rich text specimens mapped strictly to content types.
**Action Plan:**
1. Create `/components/pages/dev-tools/ContentSpecimensPage.tsx`.
2. Build a `<TabbedSpecimenViewer />` component to switch between content types (Blog, Video, Portfolio, Event, Podcast).
3. Ensure each tab applies the unique content-type neon colour to elements like blockquotes, links, and pull quotes.
4. Add specialized FAQ components (Schema.org compliant) for each type.
5. Create a visual Template Browser using miniaturized iframe/scaled views of page layouts.

## Sub-audit 7: About Sub-Pages Enrichment (WebGL & Layouts)
**Current State:** About sub-pages are mostly standard Hero -> Content configurations. WebGL graphics exist in `/about/music` but are not modular.
**Action Plan:**
1. Extract WebGL canvas logic from `/about/music` into a standalone, bundler-safe `<AnimatedWebGL3D />` component.
2. Build `/components/pages/dev-tools/WebGLGraphicsPage.tsx` to act as a playground/gallery.
3. Implement 3 new BEM layout patterns in `/styles/blocks/about-layouts.css`: `.layout--parallax`, `.layout--split-screen`, `.layout--full-bleed`.
4. Apply these new patterns systematically across all 21 about sub-pages in 3 phases (Phase 1: Flagship pages like Berlin, Six Cats, Cycling; Phase 2: Professional pages; Phase 3: Personal pages).

## Sub-audit 8: Motion Playground & Advanced Interactions
**Current State:** `AnimationSpecimenPage` exists with 26 keyframes but lacks interactive tweaking (duration/easing).
**Action Plan:**
1. Build `/components/pages/dev-tools/MotionPlaygroundPage.tsx`.
2. Add `<input type="range">` controls for `--animation-duration` and `--animation-easing`. Use `setProp` or direct `style` object manipulation (bundler-safe) to pass these as CSS variables to the preview window.
3. Implement dragging via raw mouse events (since arrow functions and complex react-dnd/resizable setups need strict bundler adaptations).
4. Build specimens for page transitions and scroll-triggered parallax using Intersection Observer closures.

## Sub-audit 9: Neon Rainbow System & Legend
**Current State:** Neon colours are used, but not mapped transparently in dev-tools, nor pushed deeply enough into components.
**Action Plan:**
1. Create `/components/pages/dev-tools/NeonRainbowPage.tsx` outlining the strict 1:1 mapping (e.g. Purple for Music, Green for Cycling).
2. Deepen CSS by passing `--page-neon-color` from the layout wrapper.
3. Apply tints to: `.section-divider`, `.card:hover`, `.icon-accent`, `.scroll-to-top`, `.form-input:focus`, `::selection`, `.scrollbar-thumb`, `.inline-code`, `.horizontal-rule`.

## Sub-audit 10: Journey Sidebar Enhancement
**Current State:** `ChapterNav` is used on `/about/journey/` but scrolls out of view.
**Action Plan:**
1. Update `/styles/blocks/chapter-nav.css` to add a modifier `.chapter-nav--sticky`.
2. Ensure `position: sticky` and `top: 100px` (or header height).
3. Apply exclusively within `AboutPage.tsx` (the journey page) and skip on `HiddenAboutPage.tsx` or other sub-pages.
4. Test responsiveness (ensure sticky unbinds on mobile/tablet if it overlaps content).

## Next Steps
All tasks have been populated into the master task list `/tasks/feature-work-expansion-tasks.md`.
