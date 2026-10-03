# Sub-audit 5: Design system expansion — all answers received

**Created:** March 8, 2026
**Updated:** March 8, 2026 (ALL 15 questions answered + Theme Engine specification received)
**Status:** ALL 15/15 QUESTIONS ANSWERED — ready for implementation
**Prompt:** `/prompts/feature-work/05-design-system-expansion.md` + ADDENDUM
**Source:** `/imports/pending-questions.md` (user-provided answers + theme engine brief)

---

## All answers (15/15) — LOCKED IN

| # | Question | Answer | Implementation impact |
|---|---|---|---|
| 7 | Scope priority | AI decides: Phase 1 + Phase 2 first | Start with architecture + highest-frequency blocks (75 variations) |
| 8 | Visual direction | **Brutalist** primary aesthetic | Lean into monospace, hard borders, high-contrast, industrial forms |
| 9 | Font selection | Yes — new Google Fonts dev tools page | New route `/dev-tools/google-fonts` |
| 10 | Video integration | Embed from [Online Makeup Academy](https://www.youtube.com/@Onlinemakeupacademy). Key video: `GiaGSWcnPn0` | YouTube embeds for video mask variations |
| 11 | Theme priority | **Dark first** (site default), then Brutalist, then Neon, then Glassmorphism. Already have dark + light. | Build order locked. Phase 2 adds Neumorphism, Claymorphism, Retro, Skeuomorphism |
| 12 | Pricing patterns | **Skip** — personal art portfolio | Remove Phase 4.4. Scope drops by 5 patterns |
| 13 | Performance budget | **Strict 60fps desktop, 30fps mobile**. Max 3-5 concurrent animations. CSS transforms over layout triggers. Permissive in dev tools labs. | Use `will-change` sparingly; `transform`/`opacity` only for production |
| 14 | Export format | **CSS first**, React component second, JSON third. Skip Figma tokens. | CodeExporter prioritises CSS output |
| 15 | Countdown patterns | **Yes**, implement Phase 4.6 | 5 countdown patterns confirmed |
| 16 | Audio integration | **Simulated (visual-only)** — CSS waveform animation, no actual audio playback | TestimonialWaveform component with `scaleY` animation |
| 17 | Table complexity | **Yes** — full interactivity (sorting, filtering, pagination) | Tables are interactive specimens, not just visual |
| 18 | Code syntax highlighting | JS, TS, CSS, HTML, Python, **Shell Scripts** | Custom tokenizer for 6 languages |
| 19 | Countdown integration | **Both** real-time JS + static demonstrations | Each pattern needs live + frozen modes |
| 20 | Audio effects | **Dev tools page** explaining audio implementation concepts | New route `/dev-tools/audio-concepts` |
| 21 | Performance budget (animations) | **Option B "Balanced"** — 60fps desktop, 30fps mobile, max 5 concurrent, `transform`+`opacity` only | Performance guard hook for mobile detection |

---

## Theme engine specification (NEW — from user attachment)

### Overview

The current binary dark/light toggle will be replaced by a **multi-theme engine** with 8 themes across 2 phases:

### Phase 1 themes (priority build order)

| # | Theme | Key traits | CSS selector |
|---|---|---|---|
| 1 | **Dark** (default) | Deep blacks, luxury gold accent (#d4af37), Cormorant Garamond headings | `[data-theme="dark"]` |
| 2 | **Brutalist** | White bg, safety orange (#ff5c00), Archivo Black, 0px radius, 3px solid borders, hard shadow | `[data-theme="brutalist"]` |
| 3 | **Neon** | Deep space purple (#0d0221), electric cyan + magenta, Orbitron font, glow shadows | `[data-theme="neon"]` |
| 4 | **Glassmorphism** | Translucent bg, backdrop-filter blur(15px), 20px radius, Inter font, bouncy transitions | `[data-theme="glassmorphism"]` |

### Phase 2 themes (additional styles)

| # | Theme | Key traits | CSS selector |
|---|---|---|---|
| 5 | **Neumorphism** | #E0E5EC base, extruded soft shadows, periwinkle accent, no borders | `[data-theme="neumorphism"]` |
| 6 | **Claymorphism** | Bright pastels, 40px radius, puffy inner shadows, bouncy physics | `[data-theme="claymorphism"]` |
| 7 | **Retro/Win95** | Battleship grey (#C0C0C0), navy accent, inset/outset borders, 0s transitions | `[data-theme="retro"]` |
| 8 | **Skeuomorphic** | Dark walnut (#2c1e1a), brushed brass, Playfair Display, noise texture | `[data-theme="skeuomorphic"]` |

### Switcher UI

- **Type:** Segmented slider (capsule-shaped pill bar)
- **Replaces:** Current binary dark/light toggle in header
- **Animation:** Motion `layoutId` animated pill indicator (spring physics)
- **Icons:** Theme-specific icons per button
- **Persistence:** localStorage (`ash-theme` key)
- **FOUC prevention:** Blocking `<script>` in `<head>` reads localStorage before React hydration

### Key architectural decisions

- **CSS Variable architecture:** Semantic naming (`--bg-primary`, `--accent-primary`, `--shadow-main`, `--border-radius`, `--font-heading`, `--transition-speed`)
- **`data-theme` attribute:** Applied to `<html>` element via ThemeProvider
- **ThemeProvider:** React Context API with `useTheme()` hook
- **Performance guard:** `usePerformanceGuard()` hook detects mobile devices, strips expensive effects (backdrop-filter, complex shadows)
- **Mobile constraints:** Kill glassmorphism blur on mobile, simplify clay shadows, limit waveform animation iterations
- **Brutalist pro-tip:** Images set to `grayscale(100%)` idle, full color on hover
- **Glassmorphism requirement:** Needs background color blobs for blur effect to work

### Visual waveform (testimonials)

- CSS-only animation using `scaleY` transforms (GPU-composited)
- 12 bars with staggered `animationDelay`
- Theme-reactive via `var(--accent-primary)`
- Brutalist override: `border-radius: 0` + choppy `steps(2)` animation
- Performance: composite-layer-only, stays under 60fps budget

### Code export feature (Q14)

- `ExportCodeButton` component reads computed CSS variables from root
- Copies formatted `[data-theme="..."] { ... }` block to clipboard
- Priority: CSS > React > JSON

### Deployment checklist items

1. Root purge: Replace hardcoded hex values with `var()` references
2. Figma Make: Swap static SVGs for inline SVGs where variable penetration needed
3. Z-index audit: Switcher at z-index 9999
4. Safari blur test: `@supports` guard for backdrop-filter
5. Animation cap: Max 5 concurrent, verify via Chrome Paint Flashing
6. Zero-flash script in `<head>`
7. Contrast stress test: Brutalist + Neon readability verification

---

## Updated scope summary

| Item | Original | After all answers |
|---|---|---|
| Pricing patterns | 5 | **0** (skipped) |
| Countdown patterns | 5 (TBD) | **5** (confirmed, real-time + static) |
| Total pattern compositions | 35 | **30** |
| Total block variations | 200 | **195** |
| Theme count | 4 (Dark/Light/Neon/Brutalist) | **8** (+ Glassmorphism, Neumorphism, Claymorphism, Retro, Skeuomorphic) |
| New dev tools pages | 0 | **2** (Google Fonts + Audio Concepts) |
| Syntax languages | 5 | **6** (+Shell Scripts) |
| Table interactivity | Visual only | **Full** (sort/filter/paginate) |
| Switcher UI | Binary toggle | **Segmented slider** (capsule bar) |
| Audio | TBD | **Visual waveforms only** (simulated) |

---

## Implementation sequence (confirmed)

### Phase 1: Foundation & architecture (sessions 1-3)
- Global Block Library landing page (`/dev-tools/block-library`)
- Patterns Library landing page (`/dev-tools/patterns`)
- BlockLabTemplate shared component
- ThemeProvider + ThemeSwitcher (segmented slider replacing binary toggle)
- Dark + Brutalist CSS variable sheets
- PostTypeFilter, CodeExporter, PropertyControl components
- Google Fonts dev tools page (`/dev-tools/google-fonts`)
- Audio concepts dev tools page (`/dev-tools/audio-concepts`)
- FOUC prevention script in index.html
- Performance guard hook

### Phase 2: Core Blocks A (sessions 4-9)
- Paragraph Block Laboratory (20 variations)
- Heading Block Laboratory (25 variations)
- Button Block Laboratory (20 variations)
- List Block Laboratory (10 variations)

### Phase 3: Core Blocks B (sessions 10-17)
- Divider (10), Forms (5), Image (10), Navigation (10)
- Breadcrumbs (10), Gallery (10), Social Icons (5), Search (10)
- Table Block (10 with sorting/filtering/pagination)
- Code Block (10 with syntax highlighting for 6 languages)

### Phase 4: Pattern Compositions (sessions 18-22)
- Hero (10), CTA (10), Testimonials (5, with visual waveform), Countdown (5, real-time + static)
- ~~Pricing (5)~~ — SKIPPED

### Phase 5: Theme expansion + polish (sessions 23-28)
- Neon + Glassmorphism CSS variable sheets
- Phase 2 themes: Neumorphism, Claymorphism, Retro, Skeuomorphic
- Mobile performance optimisation (usePerformanceGuard, media queries)
- Full accessibility audit (WCAG 2.1 AA for all variations + all themes)
- Documentation generation
- Navigation integration
- Code export functionality polish

---

## Next steps

1. Create task list at `/tasks/design-system-expansion-tasks.md`
2. Update orchestrator status to "IN PROGRESS — Phase 1"
3. Begin Phase 1: Foundation & Architecture
