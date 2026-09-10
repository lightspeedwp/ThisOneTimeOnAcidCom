# 🎨 Nova News - This One Time on Acid

**A Retro 80s CLI Memoir with Neon Terminal Aesthetics**

> **Status:** ✅ **ANIMATION PHASE 1 COMPLETE** - Terminal boot system deployed  
> **Version:** v8.4.0 | **Animation System:** v1.0.0 | **Updated:** March 12, 2026  
> **See:** [Guidelines](./guidelines/Guidelines.md) | [Animation Report](/docs/animation-implementation-report-march-2026.md)

## 🌟 Overview

This is a high-performance React application built with **Vite**, **TypeScript**, and **Tailwind CSS**. It features a unique **"Neon vs Atomic Black"** design system with a comprehensive **retro terminal boot animation system**, and maintains 100% WCAG 2.1 AAA accessibility compliance.

**Current Architecture:**
- **Frontend:** React 18 SPA (Single Page Application)
- **Styling:** Strict BEM CSS Architecture (zero Tailwind utilities)
- **Animations:** 26 @keyframes animations with terminal boot sequences
- **Data Source:** Centralized Mock Data (single source of truth)
- **State:** React Context + Hooks
- **Testing:** Build Verification Scripts

## 🎬 Animation System

**Phase 1 Complete (March 2026)** - 6 core animation types across 5 pages:

### Core Animations

1. **Terminal Boot Sequence** - 0.8s typewriter-style page entrance
2. **Auto-Stagger System** - Cascading fade-in with 0.1s delays (title → subtitle → description → CTA)
3. **Neon Pulse CTAs** - 2s breathing glow that speeds to 1s on hover
4. **Holographic Shimmer** - 4s rainbow gradient sweep (pink → purple → cyan → yellow)
5. **Floating Media** - 4s gentle vertical float with neon glow
6. **Page Headers** - Unified animation system for archive pages

### Pages Enhanced

- **HomePage** (v1.7.0) - Full terminal boot + auto-stagger + floating media + neon pulse
- **AboutPage** (v1.5.0) - All HomePage animations + holographic rainbow title
- **PortfolioPage** (v1.7.0) - Header boot → filters → grid stagger
- **BlogPage** (v1.5.0) - Header boot → filters stagger
- **ContactPage** (v1.4.0) - Header boot → form grid stagger

### Dev Tools

Visit **`/dev/animations`** for an interactive showcase with:
- 6 live animation demos
- Code implementation examples
- Stats dashboard (26 animations, 5 pages, 100% WCAG AAA)
- Responsive testing tools

**Accessibility:** 100% WCAG AAA compliant with full `prefers-reduced-motion` support  
**Performance:** CSS-only (60fps, zero JavaScript overhead, +0.6KB minified)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and configure as needed.
```bash
cp .env.example .env
```

### 3. Verify Build
Run the verification script to check environment variables, links, and assets.
```bash
npx ts-node scripts/verify-build.ts
```

### 4. Run Development Server
```bash
npm run dev
```
Access the app at `http://localhost:5173`.

## 📚 Documentation

### Essential Reading (Start Here)
*   **[Guidelines.md](./guidelines/Guidelines.md)** - Complete design & development guidelines (v8.4.0)
*   **[Animation Report](./docs/animation-implementation-report-march-2026.md)** - Phase 1 completion report
*   **[Overview Components](./guidelines/overview-components.md)** - Component architecture
*   **[Neon Colors](./guidelines/design-tokens/neon-colors.md)** - Design system with 33 palettes
*   **[Animations](./guidelines/design-tokens/animations.md)** - Complete animation library

### Architecture Documentation
*   **[BEM CSS Architecture](./guidelines/css-architecture.md)** - Strict BEM naming conventions
*   **[Dark Mode Implementation](./guidelines/dark-mode-implementation.md)** - Theme system guide
*   **[Component Dark Mode](./guidelines/component-dark-mode.md)** - Component-specific patterns
*   **[Reduced Motion Standards](./guidelines/prefers-reduced-motion.md)** - Accessibility guide

### Data System
*   **[Data System README](./data/README.md)** - Centralized mock data documentation
*   **[CMS Field Mapping](./docs/cms-field-mapping.md)** - WordPress CPT/ACF reference

## 🛠️ Developer Tools

The application includes built-in dev tools for inspecting the design system.

### Available Routes

| Route | Purpose |
|-------|---------|
| **`/style-guide`** | Design tokens, typography, colors, icon library |
| **`/dev/animations`** | Interactive animation showcase with live demos |
| **`/sitemap`** | Complete site navigation map |

## 📦 Project Structure

```
/
├── components/           # React components (ES5 TypeScript, BEM CSS)
│   ├── common/           # Header, Footer, ThemeToggle
│   ├── layouts/          # HeroLayout (animation orchestrator)
│   ├── pages/            # Page components
│   │   ├── book-site/    # 11 book-focused pages
│   │   ├── about/        # About pages & ebook
│   │   └── dev/          # AnimationShowcasePage
│   └── ui/               # Reusable UI components
│
├── data/                 # Centralized mock data (single source of truth)
│   ├── mock/             # All content data
│   │   ├── pages/        # Page content
│   │   ├── portfolio/    # Portfolio entries
│   │   ├── blog/         # Blog posts
│   │   └── ui/           # UI elements
│   └── types/            # TypeScript type definitions
│
├── styles/               # BEM CSS architecture
│   ├── blocks/           # Component-specific CSS
│   │   ├── animations.css              # Core @keyframes library (26 animations)
│   │   ├── hero.css                    # Hero animation utilities
│   │   ├── page-header-animations.css  # Reusable page header system
│   │   └── animation-showcase.css      # Showcase page styles
│   └── globals.css       # Root design tokens + imports
│
├── guidelines/           # Comprehensive documentation
│   ├── Guidelines.md     # Master guidelines (v8.4.0)
│   ├── design-tokens/    # Color, typography, spacing, animations
│   └── components/       # Component-specific docs
│
├── docs/                 # Project documentation
│   └── animation-implementation-report-march-2026.md
│
├── prompts/              # AI audit prompts
├── reports/              # Audit reports (archived after completion)
└── tasks/                # Task lists & checklists
```

## 📊 Content Counts (v8.4.0)

| Content Type | Count | Notes |
|---|---|---|
| **Book Pages** | 15 | Home, The Book, Draft, About, Waitlist, Journal, Events, Speaking, Contact, Thank You, Media, Draft Viewer, Ebook, Sitemap, Style Guide |
| **Ebook Pages** | 82 | 20 chapters + 2 appendices |
| **Blog Posts** | 50 | Production-ready with rich storytelling |
| **Portfolio Entries** | 25 | Enhanced with 150-word descriptions, 10-11 tags each |
| **Videos** | 17 | 9 categories, 87 unique tags |
| **Podcast Episodes** | 4 | Full transcripts |
| **Events** | 4 | Origin, Organik, Gondwana, Vortex |
| **Sticker Designs** | 26 | UV reactive art gallery |
| **FAQ Entries** | 33 | Schema.org structured data |
| **Animations** | 26 | @keyframes library |
| **Dev Tools Pages** | 2 | Style Guide + Animation Showcase |

## 🎨 Design System Highlights

**Neon vs Atomic Black Visual Identity:**
- **8 Neon Colors:** Electric green, hot pink, royal blue, pure yellow, blazing orange, violet purple, aqua cyan, hot red
- **Atomic Black:** Deep #0F0F0F background for maximum neon contrast
- **4 Signature Gradients:** Cyberpunk (pink→blue), Toxic Lime (green→cyan), Solar Flare (orange→yellow), Hyperpop (multi-color)
- **26 Animations:** Neon pulse, gradient shift, float, bounce, terminal boot, holographic shimmer
- **33 Color Palettes:** Comprehensive interface color library
- **SVG Grain Noise:** Site-wide `feTurbulence` overlay on major sections

**Typography:**
- **Headings:** Playfair Display (elegant serif)
- **Body:** Inter (readable sans-serif)
- **Titles:** Righteous (retro display font)
- **Fluid Scale:** 16px-20px (body), 36px-120px (hero)

**Accessibility:**
- ✅ WCAG 2.1 AAA compliance
- ✅ Color contrast: 7:1+ in dark mode
- ✅ Full keyboard navigation
- ✅ Screen reader support
- ✅ `prefers-reduced-motion` for all animations
- ✅ Enhanced 3px neon pink focus indicators

## 🚧 Future Enhancements (Phase 2 - Optional)

**Animation System Phase 2** (~40-60 hours):
1. Scroll-triggered animations for section reveals
2. Parallax effects on hero media
3. Interactive hover states on portfolio cards
4. Animated page transitions (React Router integration)
5. Micro-interactions for form validation
6. Loading skeleton animations

## 📝 Recent Updates

**March 12, 2026 - Animation System Phase 1 Complete:**
- ✅ Terminal boot animation system (6 types across 5 pages)
- ✅ Interactive animation showcase at `/dev/animations`
- ✅ Style guide dark mode fixed (atomic black backgrounds)
- ✅ Guidelines updated to v8.4.0
- ✅ Complete animation implementation report

**See [CHANGELOG.md](./CHANGELOG.md) for full release history.**

---

**Maintained by:** Nova News Dev Team  
**Last Updated:** March 12, 2026  
**Project Status:** Production-Ready with Phase 1 Animations Complete
