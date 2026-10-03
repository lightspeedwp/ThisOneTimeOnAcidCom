# Architecture & Build Plan: Book Website

**Project:** *This one time on acid...* by Ash Shaw
**Date:** March 9, 2026
**Scope:** Complete frontend overhaul as requested in `/prompts/book-website.md`

## 1. Executive Summary

The prompt mandates a complete replacement of the standard "portfolio" site with a conversion-focused, book-first website for *This one time on acid...*. The site's primary goals are email signups to unlock the draft, establishing credibility, and preparing for future pre-orders.

We will build 11 core pages using a strictly typed, ES5/var-based React architecture in Figma Make, honoring the BEM CSS and "no optional chaining / JSX object literals" constraints.

## 2. Technical Architecture

- **Data Source:** Centralized `/data/mock/book-site.ts` for global navigation, footer data, and form strings.
- **Routing:** All new top-level routes mapped in `/routes.ts` (replacing the old portfolio routes to match the "Not a portfolio" constraint).
- **Styling:** Dark editorial design. Background `#0B0B10` with `#FF3AAE` (Neon Pink) and `#F4FF3C` (Neon Yellow) accents.
- **Form States:** We will build mock stateful components for the email gates and waitlist funnels, redirecting to the `/thank-you` page.

## 3. Implementation Phasing

1. **Phase 1: Scaffolding (Current)** - Generate the `book-site.ts` data file, stub out all 11 pages, and update `routes.ts`, `Header`, and `Footer`.
2. **Phase 2: Core Funnel** - Home, Read the Draft, Waitlist, and Thank You pages.
3. **Phase 3: Book & Author Deep Dive** - The Book and About Ash.
4. **Phase 4: Supporting Ecosystem** - Journal, Events, Speaking, Contact, and Media.
5. **Phase 5: Polish & Accessibility** - Apply final glow effects, ensure keyboard navigability, and wire up `setSEO` dynamically.

*See `/tasks/book-website-tasks.md` for the tracked checklist.*