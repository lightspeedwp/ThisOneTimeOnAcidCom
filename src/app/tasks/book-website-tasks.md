# Book Website Build Tasks

**Created:** March 9, 2026
**Scope:** Build the "This one time on acid..." book website as requested in `/prompts/book-website.md`.

## Phase 1: Architecture & Scaffolding (Completed)
- [x] Create centralized data file `data/mock/book-site.ts` with navigation structure.
- [x] Create placeholder components for all 11 required pages.
- [x] Update `routes.ts` with the new book site routes (replacing or repurposing main routes).
- [x] Update `Header.tsx` to use the new top navigation and "Unlock the Draft" CTA.
- [x] Update `Footer.tsx` to use the new 3-column footer navigation and mini-signup prompt.

## Phase 2: Core Funnel Development (Completed)
- [x] Build Home Page (`/`):
  - [x] Hero with email capture and eyebrow/audience copy
  - [x] "What this book is" section
  - [x] "Why care" section
  - [x] "What readers will get" 4-card grid
  - [x] "Why Ash" author proof strip
  - [x] Draft teaser / locked preview module
  - [x] Events + media ecosystem teaser
  - [x] Journal preview (3 cards)
  - [x] Speaking/workshops teaser
  - [x] Final CTA band
- [x] Build Read the Draft Page (`/read-the-draft`):
  - [x] Pre-signup state (teaser copy + locked preview)
  - [x] Email form logic (simulate state B)
- [x] Build Thank You / Draft Unlocked Page (`/thank-you`)
- [x] Build Waitlist Page (`/waitlist`)

## Phase 3: Book & Author Deep Dive (Completed)
- [x] Build The Book Page (`/the-book`):
  - [x] Long synopsis and thematic grid
  - [x] Audience bullet points
  - [x] Future formats explanation
- [x] Build About Ash Page (`/about-ash`):
  - [x] Biography focusing on the overlap of subculture/entrepreneurship
  - [x] Visual timeline / proof grid

## Phase 4: Supporting Ecosystem (Completed)
- [x] Build Journal Page (`/journal`):
  - [x] Filterable grid for Essays, Videos, Podcasts, Field Notes
- [x] Build Events Page (`/events`)
- [x] Build Speaking & Workshops Page (`/speaking`)
- [x] Build Contact Page (`/contact`):
  - [x] Contact pathway cards
  - [x] Inquiry form
- [x] Build Media / Press Page (`/media`)

## Phase 5: Design Polish & Typography (Completed)
- [x] Apply dark editorial system (Atomic black `#0B0B10`, Neon pink `#FF3AAE`, Neon yellow `#F4FF3C`).
- [x] Add subtle SVG grain/glow effects (no heavy particles).
- [x] Ensure BEM architecture and responsive breakpoints.
- [x] Configure SEO meta tags for all new pages using `/data/mock/seo.ts`.
