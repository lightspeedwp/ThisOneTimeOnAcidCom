# Feature work — orchestrator

**Created:** March 4, 2026
**Version:** 1.0.0
**Scope:** New pages, components, interactions, portfolio redesign, timeline expansion, new content pages
**Status:** Partially defined — some sub-audits await further input from Ash

---

## Overview

This orchestrator covers new feature development across the application. It is structured as sub-audits that can be executed independently. Some sub-audits are ready for execution; others are pending answers to questions (marked as PENDING).

---

## Critical rules

Same as all other prompts — see [Guidelines.md](../../guidelines/Guidelines.md). Key reminders:
- BEM-only styling, no Tailwind
- Bundler-safe syntax (var, no arrow callbacks, no destructuring, no optional chaining)
- All content from `/data/mock/` files
- Sentence case for all headings
- He/him pronouns
- Neon vs Atomic Black design system

---

## Sub-audits

### Sub-audit 1: Timeline expansion to about sub-pages
**Prompt:** [01-timeline-expansion.md](./01-timeline-expansion.md)
**Status:** ✅ COMPLETE — March 6, 2026

### Sub-audit 2: Portfolio card & layout redesign
**Prompt:** [02-portfolio-redesign.md](./02-portfolio-redesign.md)
**Status:** ✅ COMPLETE — March 6, 2026

### Sub-audit 3: Resources page (getting started guide)
**Prompt:** [03-recommended-page.md](./03-recommended-page.md)
**Status:** ✅ COMPLETE — March 8, 2026

### Sub-audit 4: Gear page expansion
**Prompt:** [04-gear-expansion.md](./04-gear-expansion.md)
**Status:** ✅ COMPLETE — March 8, 2026

### Sub-audit 5: Global Block Library & Design System Expansion
**Prompt:** [05-design-system-expansion.md](./05-design-system-expansion.md)
**Status:** READY FOR IMPLEMENTATION

### Sub-audit 6: Content-Type Style Guide Expansion
**Prompt:** [06-style-guide-expansion.md](./06-style-guide-expansion.md)
**Status:** PENDING EXECUTION

### Sub-audit 7: About Sub-Pages Enrichment (WebGL & Layouts)
**Prompt:** [07-about-subpage-enrichment.md](./07-about-subpage-enrichment.md)
**Status:** PENDING EXECUTION

### Sub-audit 8: Motion Playground & Advanced Interactions
**Prompt:** [08-motion-playground.md](./08-motion-playground.md)
**Status:** PENDING EXECUTION

### Sub-audit 9: Neon Rainbow System & Legend
**Prompt:** [09-neon-rainbow-system.md](./09-neon-rainbow-system.md)
**Status:** PENDING EXECUTION

### Sub-audit 10: Journey Sidebar Enhancement
**Prompt:** [10-journey-sidebar.md](./10-journey-sidebar.md)
**Status:** PENDING EXECUTION

---

## Execution sequence

```
1. Timeline expansion (Sub-audit 1) — ✅ COMPLETE
   ├── Add contextual timelines to existing about sub-pages
   ├── Enhance the Timeline component if needed
   ├── Keep master History page but make it interactive
   └── Update data files with categorised timeline events

2. Portfolio redesign (Sub-audit 2) — ✅ COMPLETE
    ├── 11 card shape specimens (dev tools page)
    ├── 10 card interaction specimens (dev tools page)
    ├── 6 grid layout specimens with pagination variants (dev tools page)
    ├── Detail template hub + 6 content-type sub-pages (3 templates each)
    └── New "Card & Layout Lab" dev tools category

3. Resources page (Sub-audit 3) — COMPLETE
   ├── /about/resources — getting started guide
   ├── 5 getting started tips, 4 kit categories, 5 brands
   ├── Cross-links to /toolkit, /portfolio, /videos
   └── Added to /about landing, sitemap, SEO

4. Gear page expansion (Sub-audit 4) — COMPLETE
   ├── Expanded from 4 to 8 kit categories
   ├── 5 recommended brands with URLs
   ├── Kit wisdom section (8 tips)
   └── CTA linking to /about/resources

5. Design System Expansion (Sub-audit 5) — READY FOR IMPLEMENTATION
   ├── 15/15 audit questions answered + Theme Engine specification received
   ├── 195 variations across 19 block types
   ├── 4 pattern compositions (pricing skipped)
   ├── 8 themes (Dark, Brutalist, Neon, Glassmorphism, Neumorphism, Claymorphism, Retro, Skeuomorphic), segmented slider switcher
   ├── 2 new dev tools pages (Google Fonts, Audio Concepts), visual waveforms, performance guards
   └── Estimated Effort: 25-28 implementation sessions

6. Style Guide Expansion (Sub-audit 6) — PENDING
   ├── Rich text specimens with tabs (light/dark modes)
   ├── FAQ sections per content type with tailored styling
   ├── Template browser presentation
   └── Live in new dev-tools special section

7. About Sub-Pages Enrichment (Sub-audit 7) — PENDING
   ├── Reusable WebGL 3D graphics component with customization variables
   ├── Dedicated WebGL Dev Tools page
   ├── Structural layout variety: parallax, card grids, split-screen, full-bleed images
   ├── Neon hovers & glows on links, borders, pull quotes, timeline nodes
   └── Apply uniquely to all 21 sub-pages in systematic phases

8. Motion Playground & Advanced Interactions (Sub-audit 8) — PENDING
   ├── Interactive Motion playground builder (tweak duration, easing, delay)
   ├── Transition specimens (hover, focus, page transitions)
   └── Interaction patterns (drag, scroll-triggered, parallax)

9. Neon Rainbow System & Legend (Sub-audit 9) — PENDING
   ├── Create `/dev-tools/neon-rainbow/` page mapping system and explaining implementation
   ├── Assign signature neon colour per sub-page
   └── Apply matching tints to section dividers, card borders, icon accents, scroll-to-top, etc.

10. Journey Sidebar Enhancement (Sub-audit 10) — PENDING
    └── Make the ChapterNav sidebar fixed/sticky specifically on `/about/journey/` page
```