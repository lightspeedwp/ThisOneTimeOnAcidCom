title: "Ash Shaw Makeup Portfolio – Design & Development Guidelines"
filename: "/guidelines/Guidelines.md"
created: "2025-11-01"
modified: "2026-03-12"
version: "8.4.0"
---

# 🎨 Ash Shaw Makeup Portfolio – Design & Development Guidelines

This document defines the core design, development, and technical guidelines for building and maintaining the Ash Shaw Makeup Portfolio in **Figma Make**. It serves as the entry point to a comprehensive design system with detailed documentation organized in separate files.

**Version:** 8.4.0
**Last Updated:** March 12, 2026
**Last Reviewed:** March 12, 2026

## 🚨 CRITICAL: Project Workflow & File Organization (MUST READ FIRST)

### 🤖 Default AI Workflow (MUST FOLLOW)

**When asked to write a prompt, audit, or review, ALWAYS follow this sequence:**

1. **Create a prompt** in `/prompts/` — defines the audit scope, steps, and references to relevant guidelines.
2. **Run the audit** described in the prompt against the codebase and guidelines.
3. **Save findings** to a report file in `/reports/{topic}/` — only after the full audit is complete.
4. **Create a task list** in `/tasks/` — only once the report is finalized, extract actionable items into a checklist.

**This is the assumed default.** You do not need to be told each step explicitly. When told to "write a prompt" or "audit X", execute the full 4-step workflow above.

**Multi-audit orchestrators:** When an audit covers multiple areas, create a master/orchestrator prompt in `/prompts/{topic}/orchestrator.md` with individual sub-prompts. Each sub-audit gets its own report in `/reports/{topic}/`. All tasks are consolidated into one task list per orchestrator in `/tasks/`.

**Reusability:** All prompts should be written as reusable templates that can be re-run for ongoing maintenance.

### 🚫 Root Directory Restrictions (CRITICAL)

**Only the following `.md` files are allowed in the project root (`/`):**
- `README.md` — Project overview
- `CHANGELOG.md` — Release history (protected file — see **[changelog.md](./changelog.md)**)
- `Attributions.md` — System-protected file (cannot be moved or deleted)

**All other `.md` files MUST be placed in the appropriate folder:**

| Content Type | Required Location |
|---|---|
| Project documentation, quick references, guides | `/docs/` |
| Design & development guidelines | `/guidelines/` |
| AI prompt files | `/prompts/` |
| Audit reports & analysis | `/reports/{topic}/` |
| Task lists & checklists | `/tasks/` |

**Script files:** All `.sh` script files MUST be placed in `/scripts/`. Never create `.sh` files in the project root.

**Enforcement:** If you need to create a new `.md` file, determine its purpose and place it in the correct folder above. When in doubt, use `/docs/` for general documentation.

### 📁 Mandatory Folder Conventions

The project uses three dedicated workflow folders. **All AI-generated and human-authored workflow artifacts MUST be stored in these folders.** Never place prompts, reports, or task lists anywhere else (e.g., never in root, never in `/guidelines/`).

| Folder | Purpose | Naming Convention |
|---|---|---|
| `/prompts/` | All prompt files for AI-assisted tasks | `{topic}.md` or subfolder `{topic}/` with `orchestrator.md` |
| `/reports/` | All audit findings, analysis results, reports | Subfolder per audit: `/reports/{audit-name}/` |
| `/tasks/` | All task lists and checklists | `task-list.md` is the master general-purpose task list |
| `/docs/` | General project documentation, quick references, attributions | Descriptive filenames (e.g., `Attributions.md`, `quick-reference.md`) |
| `/scripts/` | All build, utility, and automation scripts (`.ts`, `.sh`, `.js`) | Descriptive filenames (e.g., `verify-build.ts`, `deploy.sh`) |

**Rules:**

1. **Prompts:** Always create new prompt files in `/prompts/`. For multi-step workflows, create a subfolder with a master `orchestrator.md` and child prompt files.
2. **Reports:** Always write reports to `/reports/`, inside a suitable subfolder (e.g., `/reports/root-cleanup/`, `/reports/css-audit/`). One subfolder per audit or topic.
3. **Tasks:** Always create task lists in `/tasks/`. The file `/tasks/task-list.md` is the **all-purpose general task list** — it must never be deleted. One task list per orchestrator prompt, stored in the root of `/tasks/`.
4. **Lifecycle:** Archive completed tasks for later reference. Delete any report older than a few days. Regularly review all folders for unused and orphaned files.
5. **Cross-referencing:** When referencing guidelines from prompts/reports/tasks, always link to the specific guideline file (e.g., `[BEM Architecture](../guidelines/css-architecture.md)`).
6. **Never delete** `/tasks/task-list.md` — it is the persistent master checklist.
7. **Docs:** The `/docs/` folder is the designated home for all general-purpose project documentation, quick references, guides, and relocated documentation files (e.g., CMS field mappings, architecture overviews). Any `.md` file that does not belong in `/guidelines/`, `/prompts/`, `/reports/`, or `/tasks/` should go in `/docs/`.

### 🛡️ Bundler Compatibility Rules (Figma Make)

The Figma Make bundler has known syntax incompatibilities. **All code MUST follow these workarounds:**

| Forbidden Syntax | Required Workaround |
|---|---|
| Optional chaining (`?.`) | Explicit null checks (`if (x != null)`) |
| Nullish coalescing (`??`) | Explicit if/else with null checks |
| `import.meta.env` | Completely removed — proven unreliable |
| Nested ternaries | Convert to if/else blocks |
| `for...of` loops | Classic `for (var i = 0; i < arr.length; i++)` |
| Object literals in JSX | Property-by-property assignment via `setProp()` helper |
| Bracket notation (outside helpers) | Use `grab()` or `arrayGet()` helpers only |
| `new Set<>()` generics in `.tsx` | Use `new Set()` without generic, or cast separately |
| Arrow callbacks in certain contexts | Named function expressions |
| `break` in loops inside closures | Use `i = length` pattern to exit loop |
| Dot notation in certain contexts | Use `grab()` helper via `Object.entries()` |
| `var` declarations | Preferred over `let`/`const` in router/lib code for safety |
| `@import url()` in CSS files | Direct JS imports of each sub-file from TSX components |
| Data URIs in CSS `url()` | External file or disable feature (comment out) |

**Helper functions** (defined in `/lib/router.tsx`):
- `grab(obj, key)` — Safe property read via `Object.entries()` iteration
- `arrayGet(arr, index)` — Safe array access
- `setProp(obj, key, value)` — Safe property write via `Object.defineProperty`
- `buildContextValue()` — Object construction with `Object.entries()` and explicit if/else

**Critical rule:** Do NOT replace any existing images, logos, or `figma:asset/` imports with Unsplash or placeholder images.

### 🖼️ Image Protection Rule

**NEVER replace existing images.** All current `figma:asset/` imports, logo files, and existing image references are protected. When adding new images, use `ImageWithFallback` from `/components/figma/ImageWithFallback.tsx` (which must not be modified — it is a protected file).

### 🚫 Supabase non-usage policy

**Supabase is NOT used on this project.** This is a static personal art portfolio with no backend database requirements.

- The `/utils/supabase/` folder is a **system-protected deployment artifact** — it cannot be deleted, but it is never imported or used by any application code
- Never suggest, connect, or implement Supabase functionality
- If the `supabase_connect` tool is offered, always dismiss it
- All data is served from centralised mock data files in `/data/mock/`

### 📋 Task list management conventions

**All-purpose task list:** `/tasks/task-list.md` is the master general-purpose checklist. Simple one- or two-checkbox tasks go here. This file must **NEVER** be deleted.

**Dedicated task lists:** Full audits and multi-step prompts get their own task list (e.g., `/tasks/project-stability-audit-tasks.md`). One task list per orchestrator prompt.

**Master task list tracker:** `/tasks/master-task-list.md` tracks all active and archived task lists. It does NOT contain actual tasks — only references with links to task lists and their related reports. Update it whenever a task list is created, completed, or archived.

**Task list archiving process:**
1. When ALL tasks in a task list are marked complete, move the entry in `master-task-list.md` from "Active" to "Completed (pending archive)"
2. After 30 days in "Completed", move the file to `/tasks/archived/` and update `master-task-list.md`
3. Only delete from `/tasks/archived/` — never delete active or recently completed task lists

**Report archiving process:**
1. When a report's associated task list is 100% complete, move the report folder from `/reports/{topic}/` to `/reports/archived/{topic}/`
2. Reports in `/reports/archived/` can be deleted after 7 days
3. Only delete from `/reports/archived/` — never delete active reports

**Prompt folder protection:** Never delete files in `/prompts/` unless expressly stated by the user.

### 🛑 Content Folder Protection Rule (HISTORICAL — FOLDER DELETED)

> ⚠️ **Status update (Feb 25, 2026):** The `/content/` folder was deleted during the comprehensive codebase cleanup audit (Audit 2). The 25 files it contained were confirmed as having zero code imports and were removed as orphaned reference material. The folder no longer exists in the repository.

**If re-creating reference content** in the future, use a `/content/` subfolder and treat it as protected personal reference material — never import from it in code, and never flag it as "orphaned" in audits.

**Historical protected structure (now deleted):**
```
/content/          ← DELETED Feb 25, 2026
├── about/          # Personal about page notes (six-cats.md)
├── book/           # Book content (this-one-time.md)
├── lightspeed/     # Lightspeed agency content (5 files)
├── personal/       # Personal bios, notes, research (12 files)
└── social-profiles/ # Social media strategy & profiles (5 files)
```

---

## 📋 Major Update (v5.3.0) - Personal Art Project

**🚫 NOT FOR PROFIT - PERSONAL ART PROJECT**

This website is strictly a **personal art portfolio**.
- **NO Monetization:** There are no shop, e-commerce, or payment features.
- **NO Services/Booking:** This is not a business site. No "Book Now" or pricing information.
- **NO Commercial Intent:** The project exists solely to showcase artistic work and tutorials.

**✅ PERSONAL IDENTITY & CONTENT SCOPE**
- **Pronouns:** Strict **He/Him** usage. Ash is male. (e.g., "guy with the bike", "he created").
- **Locations:** Focus strictly on **Cape Town (home base in Woodstock, South Africa)**, **Berlin (May seasonal visits)**, **Thailand (Koh Phangan training base, Sep-Nov)**, and **International Festivals**.
- **Yearly Cycle:** Ash follows an annual creative cycle: based in Cape Town, travels to Berlin each May for techno season, returns to South Africa in August-September (bicycle swap), relocates to Koh Phangan, Thailand (Sep-Nov) for Muay Thai training, triathlon, and remote work, then returns to Cape Town in November for South African summer festival season. This cycle fuels his creative inspiration and energy.
- **Excluded Content:** NO weddings, NO corporate events, NO bridal makeup.

**Migration Impact:**
- Removed all "Shop" and "Services" pages.
- Removed pricing, booking forms, and "Add to Cart" functionality.
- Focus is entirely on Portfolio (Gallery), Videos (Showcase), and Blog (Insights).

## 📚 How to Use These Guidelines

This project has a comprehensive design system with guidelines organized across multiple files. **Always follow this reading order:**

### Step 0: Understand Workflow Standards (NEW - REQUIRED)
Read the workflow documentation to understand how prompts, reports, and tasks are created:
- **[Prompt Creation Guidelines](./prompt-creation-guidelines.md)** - How to write audit prompts and orchestrators
- **[Report Creation Guidelines](./report-creation-guidelines.md)** - How to structure and save audit reports

### Step 1: Read Overview Files (REQUIRED)
Read ALL overview files in this directory:
- **[overview-components.md](./overview-components.md)** - Component system and React architecture diagram
- **[overview-icons.md](./overview-icons.md)** - Icon system and verification process
- **[overview-sections.md](./overview-sections.md)** - Section patterns (WordPress block theme aligned)
- **[overview-blocks.md](./overview-blocks.md)** - Block patterns and content units
- **[overview-patterns.md](./overview-patterns.md)** - Design patterns and compositions
- **[overview-parts.md](./overview-parts.md)** - Template parts (Header, Footer, etc.)
- **[overview-templates.md](./overview-templates.md)** - Page templates and layouts
- **[Data System Documentation](../data/README.md)** - Mock data system and usage (IMPORTANT!)
- **[CMS Field Mapping](../docs/cms-field-mapping.md)** - WordPress CPT/ACF field mapping reference
- **[pwa-implementation.md](./pwa-implementation.md)** - Progressive Web App features and offline support

### Step 2: Read Design Tokens (REQUIRED)
Read ALL files in the `design-tokens/` folder. Do NOT skip this step:
- **[neon-colors.md](./design-tokens/neon-colors.md)** - 🆕 Neon vs Atomic Black color system (PRIMARY)
- **[animations.md](./design-tokens/animations.md)** - 🆕 Complete animation system with 26 keyframes
- **[colors.md](./design-tokens/colors.md)** - Legacy color documentation (reference only)
- **[typography.md](./design-tokens/typography.md)** - Typography scale and hierarchy
- **[spacing.md](./design-tokens/spacing.md)** - Spacing system and responsive patterns
- **[accessibility-report-feb-2025.md](./accessibility-report-feb-2025.md)** - 🆕 WCAG AA compliance report
- **[prefers-reduced-motion.md](./prefers-reduced-motion.md)** - 🆕 Reduced motion coding standards & accessibility guide

### Step 2.5: Understand Light/Dark Mode System (REQUIRED)
Read the light/dark mode documentation for complete theme implementation:
- **[nova-news-dark-mode.md](./nova-news-dark-mode.md)** - 🆕 Quick reference for Nova News dark mode (START HERE!)
- **[dark-mode-lessons-learned.md](./dark-mode-lessons-learned.md)** - 🆕 CRITICAL: Lessons learned from implementation (read this to avoid 40+ hours of mistakes)
- **[dark-mode-implementation.md](./dark-mode-implementation.md)** - Complete dark mode implementation guide
- **[component-dark-mode.md](./component-dark-mode.md)** - Component-specific dark/light mode patterns

### Step 3: Understand Mock Data System (REQUIRED)
Read the mock data guidelines to understand centralized data management:
- **[Data System Documentation](../data/README.md)** - Complete guide to the mock data system

### Step 4: Read Component Guidelines BEFORE Using (REQUIRED)
BEFORE using ANY component, you MUST read its specific guideline file:
- Using Logo? → Read **[components/Logo.md](./components/Logo.md)** FIRST
- Using ScrollDownArrow? → Read **[components/ScrollDownArrow.md](./components/ScrollDownArrow.md)** FIRST
- Using ScrollToTop? → Read **[components/ScrollToTop.md](./components/ScrollToTop.md)** FIRST

### Step 5: Verify Icons Before Using (REQUIRED)
Before using ANY icon, check **[overview-icons.md](./overview-icons.md)** for the verification process. Never assume an icon exists.

---

## 🚨 CRITICAL STYLING RULE - STRICT BEM ARCHITECTURE

### ⛔ NO TAILWIND UTILITIES ALLOWED

**SYSTEMATIC MIGRATION COMPLETE:** This codebase has fully migrated to a strict **Semantic BEM (Block Element Modifier)** architecture. Tailwind utility classes are **STRICTLY FORBIDDEN**.

**Priority Order for Styling:**
1. **✅ ONLY CHOICE:** Use BEM classes defined in `/styles/globals.css` (e.g., `.portfolio-card__image--featured`, `.hero__title`)
2. **🚫 NEVER:** Use Tailwind utilities (e.g., `flex`, `p-4`, `text-center`)
3. **🚫 NEVER:** Use inline styles

```tsx
// ✅ CORRECT - Semantic BEM Classes
<div className="card card--featured">
  <h2 className="card__title">Title</h2>
</div>

// ❌ WRONG - Tailwind Utilities
<div className="flex items-center gap-4">
  <span className="text-gray-600">Text</span>
</div>

// ❌ WRONG - Inline styles
<div style={{ padding: '16px' }}>
  Content
</div>
```

### ⚠️ BEM Naming Convention

**All CSS classes must follow the BEM naming convention:**

- **Block:** `.block` (e.g., `.header`, `.card`, `.hero`)
- **Element:** `.block__element` (e.g., `.header__logo`, `.card__title`)
- **Modifier:** `.block--modifier` or `.block__element--modifier` (e.g., `.header--transparent`, `.card__title--large`)

### ⚠️ Data & Content Rules

**NO HARDCODED CONTENT:** All text, images, and configuration data must be imported from the `/data/mock` directory.

```tsx
// ✅ CORRECT - Imported Data
import { heroContent } from "@/data/mock";

<h1 className="hero__title">{heroContent.title}</h1>

// ❌ WRONG - Hardcoded String
<h1 className="hero__title">Welcome to my Portfolio</h1>
```

### 🚫 NO INLINE STYLES - CRITICAL RULE

**NEVER USE INLINE STYLES.** All styling must be done through CSS classes defined in `/styles/globals.css`.

### 🔤 SENTENCE CASE FOR ALL HEADINGS - CRITICAL RULE

**ALL headings, titles, and labels MUST use sentence case.** This applies everywhere: page titles, section headings, ebook chapter titles, TOC entries, navigation labels, card titles, hero text, breadcrumbs, and button labels.

**Sentence case** = Capitalise ONLY the first word and proper nouns (names, places, brand names).

```
✅ CORRECT — Sentence case
"The dancefloor gave me everything"
"Neon revelations"
"Six Cats: the green garden"
"Twenty-three years"
"Berlin calling"
"Eighty-six hours"
"The artist's lifestyle"
"Koh Phangan Muay Thai crew"
"About the author"

❌ WRONG — Title Case / capitalised headings
"The Dancefloor Gave Me Everything"
"Neon Revelations"
"Six Cats: The Green Garden"
"Twenty-Three Years"
"Berlin Calling"
"Eighty-Six Hours"
"The Artist's Lifestyle"
"Koh Phangan Muay Thai Crew"
"About The Author"
```

**Proper nouns that stay capitalised:** Ash, Berlin, Cape Town, Koh Phangan, LightSpeed, WordPress, BarCamp, Six Cats (brand name), Aquarius/Aquarian, ADHD, Lucy (the cat or the experience), Origin (festival name), Solipse (festival), Vortex (festival), UV.

**This rule applies to all data files** in `/data/mock/`, all component JSX output, and all ebook content in `/data/mock/pages/ebook-pages.ts`. When expanding content, always write headings in sentence case.

---

## 1. 📁 Project Structure & Architecture

### File Organization (February 2026)

```
ash-shaw-makeup-portfolio/
├── 📄 App.tsx                         # Main application router
├── 📄 main.tsx                        # React entry point
├── 📄 index.html                      # HTML template
├──
├── 📁 components/
│   ├── 📁 common/                     # Shared components (Header, Footer, Logo)
│   ├── 📁 pages/                      # Page components (Home, About, Portfolio, Blog)
│   ├── 📁 sections/                   # Layout sections
│   ├── 📁 ui/                         # UI primitives
│   └── 📁 figma/                      # Figma integration utilities
│
├── 📁 content/                        # ⚠️ DELETED Feb 25, 2026 (orphaned reference files removed in cleanup audit)
│
├── 📁 data/                           # 🆕 Centralized mock data system
│   ├── 📁 mock/                       # Mock data (single source of truth)
│   │   ├── 📁 images/                 # Hero images
│   │   ├── 📁 pages/                  # Page content (home, about, portfolio)
│   │   ├── 📁 portfolio/              # Portfolio entries
│   │   ├── 📁 blog/                   # Blog data
│   │   └── 📁 ui/                     # UI elements
│   └── 📁 types/                      # TypeScript type definitions
│
├── 📁 styles/
│   └── 📄 globals.css                 # Tailwind V4 + brand system
│
├── 📁 utils/
│   ├── 📄 portfolioService.ts         # Portfolio data service
│   └── 📄 pwaService.ts               # Progressive Web App utilities
│
├── 📁 hooks/                          # React hooks (custom hooks)
│
├── 📁 guidelines/                     # THIS DIRECTORY
│   ├── 📄 Guidelines.md               # This file (start here)
│   ├── 📄 README.md                   # Documentation index
│   ├── 📄 overview-components.md      # Component system overview + React diagram
│   ├── 📄 overview-icons.md           # Icon system guide
│   ├── 📁 components/                 # Component-specific docs
│   ├── 📁 design-tokens/              # Design token specifications
│   ├── 📁 icons/                      # Icon category docs
│   ├── 📁 mobile/                     # Mobile-specific guidelines
│   ├── 📁 sections/                   # Section patterns
│   ├── 📁 blocks/                     # Block patterns
│   ├── 📁 patterns/                   # Design patterns
│   ├── 📁 parts/                      # Template parts
│   └── 📁 templates/                  # Page templates
│
├── 📁 prompts/                        # AI prompt files (orchestrators + sub-prompts)
├── 📁 reports/                        # Audit reports (subfolders per audit)
├── 📁 tasks/                          # Task lists (task-list.md = master checklist)
├── 📁 docs/                           # 🆕 General project documentation & quick references
│
├── 📁 public/                         # Static assets
└── 📁 Configuration Files             # Build and deployment configs
```

### Component Architecture Overview

See **[overview-components.md](./overview-components.md)** for complete component hierarchy and usage patterns.

**Key Application Structure:**
```typescript
App.tsx (Router + Global State)
├── Header (Navigation + Mobile Menu)
├── HomePage (Hero + Featured + Blog Preview)
├── AboutPage (Journey + Philosophy)
├── PortfolioPage (Gallery + Lightbox)
├── BlogPage (Search + Filtering + Pagination)
├── BlogPostPage (Rich Content + Sharing)
├── VideosPage (Video showcase)
├── PodcastsPage (Podcast archive)
├── SearchResultsPage (Global search)
├── FaqAggregatePage (FAQ system)
├── FeedbackPage (Testimonials)
├── StickersPage (Sticker art gallery)
└── Footer (Link to Contact Page + Social Links)
```

---

## 2. 🔗 Dependencies & Integrations

### Core Dependencies
- **React 18+** - Concurrent features and modern hooks
- **Tailwind CSS V4** - Utility-first styling with custom design tokens
- **Phosphor Icons** - Primary icon library (`@phosphor-icons/react`) with 6 weight variants (migration from Lucide complete)
- **TypeScript** - Type safety and developer experience

### Deployment & Hosting
- **Netlify** - Production deployment, CDN, and hosting
- **Progressive Web App** - Installable, offline-capable application

### Key Features
- ✅ Variable Font System (73% fewer requests)
- ✅ Centralized Mock Data System (single source of truth)
- ✅ WordPress-Inspired Fluid Typography
- ✅ WCAG 2.1 AA Accessibility Compliance
- ✅ Advanced Blog System (search, filtering, pagination)
- ✅ Progressive Web App (installable, offline support, service worker)
- ✅ Global search system with ArchiveFilters
- ✅ FAQ system with Schema.org structured data
- ✅ Stickers Gallery (26 entries)
- ✅ **Terminal Boot Animation System** (retro CLI aesthetic with staggered fade-ins, neon pulse CTAs, holographic titles, floating media)

### Animation System Implementation
**Status:** ✅ Phase 1 Complete (March 2026)

The site features a comprehensive retro terminal boot animation system inspired by 80s CLI interfaces:

**Core Animation Types:**
1. **Terminal Boot Sequence** - 0.8s typewriter-style page entrance
2. **Staggered Fade-In** - Auto-cascading elements with 0.1s delays (title → subtitle → description → CTA)
3. **Neon Pulse CTA** - 2s breathing glow on buttons (speeds to 1s on hover)
4. **Holographic Rainbow Shimmer** - 4s gradient sweep across hero titles
5. **Floating Media** - 4s gentle vertical oscillation with neon glow
6. **Page Header Animations** - Unified system for portfolio/blog/contact page headers

**Implementation Files:**
- `/styles/blocks/animations.css` - Core @keyframes library (26 total animations)
- `/styles/blocks/hero.css` - Hero section animation utilities
- `/styles/blocks/page-header-animations.css` - Reusable page header system (120 lines)
- `/components/layouts/HeroLayout.tsx` - Auto-stagger animation orchestration
- `/components/pages/dev/AnimationShowcasePage.tsx` - Interactive dev tools showcase

**Pages with Animations:**
- HomePage (v1.7.0) - Full terminal boot + stagger + floating media + neon pulse CTAs
- AboutPage (v1.5.0) - Same as HomePage + holographic rainbow shimmer title
- PortfolioPage (v1.7.0) - Header boot → filters → grid stagger
- BlogPage (v1.5.0) - Header boot → filters stagger
- ContactPage (v1.4.0) - Header boot → form grid stagger
- AnimationShowcasePage (v1.0.0) - Interactive demos at `/dev/animations`

**Accessibility:**
- ✅ 100% WCAG AAA compliant with full `prefers-reduced-motion` support
- ✅ All animations disable gracefully for motion-sensitive users
- ✅ See **[prefers-reduced-motion.md](./prefers-reduced-motion.md)** for implementation standards

**Dev Tools:**
Visit `/dev/animations` for interactive showcase with live demos, code examples, and animation testing tools.

### SEO & Structured Data
- ✅ Centralised `setSEO()` utility (`/utils/seo.ts`) — single call sets title, description, OG, Twitter Card
- ✅ Centralised SEO data file (`/data/mock/seo.ts`) — all 46 page components wired
- ✅ Schema.org JSON-LD structured data (`/utils/schemaService.ts`) — WebSite, Person, BlogPosting, VideoObject, PodcastEpisode, VisualArtwork, ImageGallery, CollectionPage, BreadcrumbList, FAQPage
- ✅ Breadcrumbs component (`/components/ui/Breadcrumbs.tsx`) — single source, dedicated CSS, Schema.org BreadcrumbList JSON-LD

### All Planned Features Complete
All tasks from the v4.0.0 task list (Tasks 19–36) are now complete. The project is feature-complete.

---

## 3. 🎨 Brand Identity & Design System

### 🌟 Neon vs Atomic Black Visual Identity

**Design Philosophy:**
The Ash Shaw Makeup Portfolio uses a bold **Neon vs Atomic Black** design system that reflects the vibrant, energetic nature of makeup artistry.

**Core Elements:**
- **8 Neon Colors:** Electric green, hot pink, royal blue, pure yellow, blazing orange, violet purple, aqua cyan, hot red
- **Atomic Black:** Deep #0F0F0F background for maximum neon contrast
- **4 Signature Gradients:** Cyberpunk (pink→blue), Toxic Lime (green→cyan), Solar Flare (orange→yellow), Hyperpop (animated multi-color)
- **26 Animations:** Neon pulse, gradient shift, float, bounce, and more
- **Dual Theme:** Accessible text variants for light mode, full-brightness neon for dark mode
- **SVG Grain Noise Texture:** Site-wide `feTurbulence` noise overlay on all major sections via `::before` pseudo-elements
- **33 Color Palettes:** Comprehensive palette library for all interface contexts

**📖 Complete Documentation:**
- **[neon-colors.md](./design-tokens/neon-colors.md)** - Full neon color system with 33 curated palettes and interface inspiration
- **[animations.md](./design-tokens/animations.md)** - All 26 animations documented

### Responsive Breakpoints & Fluid Typography
(See [design-tokens/typography.md](./design-tokens/typography.md) and [design-tokens/spacing.md](./design-tokens/spacing.md) for full details)

**Fluid Width System (Updated v7.5.0):**
- Mobile Compact: >320px (1 column)
- Mobile: >480px (1-2 columns)
- Small: >600px (2 columns)
- Tablet Portrait: >768px (2-3 columns)
- Tablet Landscape: >1024px (3 columns)
- Wide: >1280px (3-4 columns)
- Desktop: >1440px (3-4 columns)
- **Desktop Wide: >1568px (4 columns optimized)**
- **Desktop Ultra-wide: >1768px (4-5 columns)**
- **Desktop XL: >1800px (5 columns optimized)** ← NEW v7.5.1
- **Full HD: >1920px (5-6 columns optimized)**

**Container Max Widths:**
- Content: 800px (reading width)
- Wide: 1440px (standard desktop)
- Desktop Wide: 1568px
- Ultra-wide: 1768px
- Desktop XL: 1800px ← NEW v7.5.1
- Full HD: 1920px
- Full: 100% (viewport)

**Fluid Typography:**
- H1: 36px → 120px (`.text-hero-h1`)
- H2: 24px → 48px (`.text-section-h2`)
- Body: 16px → 20px (`.text-body-p`)

---

## 4. ♿ Accessibility Standards

### WCAG 2.1 AA Compliance ✅

**Status:** 100% WCAG 2.1 Level AA Compliant

All components meet the following standards:
- **Color Contrast:** 4.5:1 minimum (body text), 7:1+ achieved in dark mode (AAA)
- **Reduced Motion:** Full `prefers-reduced-motion` support for all 26 animations
  - See **[prefers-reduced-motion.md](./prefers-reduced-motion.md)** for coding standards and implementation guide
- **Keyboard Navigation:** Full support (Tab, Enter, Space, Arrows, Escape)
- **Screen Readers:** Proper ARIA labels and semantic HTML
- **Focus Management:** Enhanced 3px neon pink focus indicators with glow effects

---

## 5. 📧 Backend Integrations

### Contact Page Integration (Typeform)
- **Solution:** Typeform embed integration
- **Features:** Professional inquiry form for collaborations (non-commercial).
- **Implementation:** `TypeformEmbed` component dynamically loads the form

### Content Management
- **Dual Mode Architecture** - Toggle between Mock Data and Headless WordPress via `VITE_USE_WORDPRESS`
- **Centralized Data Access** - All components use `useContent` hooks (facade pattern)
- **Type-safe** - Full TypeScript support for both Mock and WP data shapes
- **Single source of truth** - Content is managed externally (WP) or in `/data/mock/`


---

## 6. 🛠️ Component Implementation Standards

### TypeScript Requirements

Every component must include JSDoc comments describing purpose, props, and accessibility features.

### Export Standards
- **Named Exports:** All components (for tree-shaking)
- **Default Export:** Only App.tsx
- **Type Exports:** Separate export for shared interfaces

### Breadcrumbs (REQUIRED on all sub-pages)

**Single Source Component:** All breadcrumbs MUST use `/components/ui/Breadcrumbs.tsx`. Never create inline breadcrumb markup.

**CSS:** `/styles/blocks/breadcrumbs.css` (imported by the component itself — no need to import CSS separately).

**Pattern:** `Home > Section > Page Name`

```tsx
import { Breadcrumbs } from '../../ui/Breadcrumbs';

<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Developer Tools', href: '/dev-tools' },
  { label: 'Typography Specimens' },
]} />
```

**Rules:**
- Never render `<Breadcrumbs>` more than once per page
- Last item has no `href` (renders as plain text with `aria-current="page"`)
- Schema.org BreadcrumbList JSON-LD is injected automatically

### SEO (REQUIRED on all pages)

**Single Source Utility:** All SEO meta tags MUST use `setSEO()` from `/utils/seo.ts`. Never set `document.title` directly.

```tsx
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';

useEffect(() => {
  setSEO(pageSEO.about);
}, []);
```

**Dynamic content pages** use helper functions: `blogPostSEO()`, `videoSEO()`, `podcastSEO()`, `portfolioEntrySEO()`, etc.

---

## 7. 🎯 Styling Requirements

### Must Use Explicit Design Token Classes

**Layout Components (Header, Footer, MobileMenu):**
- **Strictly Prohibited:** Hardcoded pixel values (e.g., `w-[300px]`, `top-[50px]`)
- **Required:** Use responsive design tokens or fluid utilities

### Typography Classes (REQUIRED)
See **[design-tokens/typography.md](./design-tokens/typography.md)** for complete scale.

```css
.font-heading          /* Playfair Display serif - elegant headings */
.font-body             /* Inter sans-serif - readable body text */
.font-title            /* Righteous - main hero titles */
```

### Color Classes (REQUIRED)
See **[design-tokens/colors.md](./design-tokens/colors.md)** for complete palette.

```css
.bg-gradient-pink-purple-blue    /* Primary CTA gradient */
.text-gradient-pink-purple-blue  /* Hero title gradients */
```

---

## 8. 📦 Mock Data System

### Overview

The project uses a comprehensive centralized mock data system that serves as the **Single source of truth** for all application content.

**📖 Complete Documentation:** See **[Data System Documentation](../data/README.md)** for comprehensive guide

### Data Organization

```
/data/
├── mock/                          # Centralized mock data
│   ├── images/                    # Hero images
│   ├── pages/                     # Page content
│   ├── portfolio/                 # Portfolio entries
│   ├── blog/                      # Blog posts
│   └── ui/                        # UI elements
```

---

## 9. 🔍 Quality Standards

### Pre-Deployment Checklist
- [ ] TypeScript: No compilation errors (`npm run type-check`)
- [ ] Build Verification: Run `npm run verify` (checks links & env)
- [ ] Lighthouse: 95+ performance, 100 accessibility
- [ ] Responsive: Mobile, tablet, desktop tested
- [ ] Accessibility: Keyboard navigation and screen reader tested
- [ ] Cross-Browser: Chrome, Firefox, Safari, Edge compatibility

---

## 10. 📖 Additional Documentation

### Protected Root Files
- **[CHANGELOG.md](../CHANGELOG.md)** - Release history following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format (protected — never delete, move, or rename)
- **[Changelog Guidelines](./changelog.md)** - Format rules, writing standards, and protection policies for the changelog

### Component-Specific Guidelines
Before using any component, read its specific guideline file:
- **[Logo](./components/Logo.md)** - Brand logo usage and responsive behavior
- **[ScrollDownArrow](./components/ScrollDownArrow.md)** - Animated scroll indicator
- **[ScrollToTop](./components/ScrollToTop.md)** - Floating scroll button
- **[LayoutSwitcher](./components/LayoutSwitcher.md)** - Grid/list view toggle

---

## 11. 🚀 Future Enhancements

### Current Foundation (Complete)
- ✅ CSS system with fluid typography and variable fonts
- ✅ Centralized mock data system with blog, portfolio, videos, podcasts
- ✅ Full accessibility compliance (WCAG 2.1 AA)
- ✅ PWA Implementation
- ✅ Global search system with ArchiveFilters
- ✅ FAQ system with Schema.org structured data
- ✅ Stickers Gallery (26 entries)

---

## 12. 🧹 Code Quality Standards

### Console Logging Policy

**Strict Rule:** No `console.log`, `console.warn`, or `console.error` calls are allowed in production code unless wrapped in a development environment check.

```tsx
if (import.meta.env.DEV) {
  console.log('🐞 Debug info:', data);
}
```

### Error Handling
- **Uncaught Promises:** All async operations must have `try/catch` blocks or `.catch()` handlers.
- **Global Errors:** The `ErrorBoundary` component handles React lifecycle errors.

---

**Last Updated:** February 2026
**Maintained by:** Ash Shaw Portfolio Team

**Need Help?**
- Component not working? → Check **[overview-components.md](./overview-components.md)**
- Styling issues? → Review **[design-tokens/](./design-tokens/)** files