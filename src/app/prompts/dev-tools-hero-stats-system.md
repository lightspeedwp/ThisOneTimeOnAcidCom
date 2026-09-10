# Dev Tools Hero & Stats System Implementation Prompt

**Prompt Type:** Feature Implementation & Architecture Design  
**Category:** Developer Tools Enhancement  
**Complexity:** Very High (WebGL 3D, Dedicated Layout System, Search)  
**Version:** 2.0.0  
**Created:** March 7, 2026
**Updated:** March 7, 2026 (Added dedicated dev tools layout system)

---

## 📋 Objective

Design and implement a complete, isolated layout system for the dev tools section featuring:

### Core Hero & Stats System
1. **Left-aligned hero content** with dynamic typography and neon accents
2. **WebGL 3D custom SVG moving graphic** on the right side
3. **Data-driven configuration** for content, fonts, styles, colors, and Phosphor icons
4. **Universal stats bar** below the hero showing page-specific metrics
5. **Automated stats gathering** with reusable audit functions

### Dedicated Dev Tools Layout System (NEW)
6. **Separate dev tools header** with search functionality and burger menu
7. **Dev tools-specific breadcrumbs** with unique styling
8. **Dev tools-specific footer** with tool links and metadata
9. **Full-screen menu** triggered from burger menu icon
10. **Dev tools search** with real-time filtering across all tools
11. **Dedicated layout component** wrapping all dev tools pages

---

## 🎯 Success Criteria

### Hero & Stats System
- [ ] Single `<DevToolsHero>` component powers all 33+ dev tools pages
- [ ] WebGL 3D graphic system with custom SVG support and animation presets
- [ ] Centralized hero configuration data file (`/data/mock/ui/dev-tools-heroes.ts`)
- [ ] Centralized stats configuration data file (`/data/mock/ui/dev-tools-stats.ts`)
- [ ] Universal `<StatsBar>` component with metric card system
- [ ] Reusable stats gathering functions in `/utils/statsGathering.ts`

### Dev Tools Layout System (NEW)
- [ ] Dedicated `<DevToolsLayout>` component wraps all dev tools pages
- [ ] `<DevToolsHeader>` with search bar and burger menu
- [ ] `<DevToolsBreadcrumbs>` with dev tools-specific styling
- [ ] `<DevToolsFooter>` with quick links to all tools
- [ ] `<DevToolsMenu>` full-screen overlay menu
- [ ] `<DevToolsSearch>` real-time search across all 33 tools
- [ ] Router updated to use nested dev tools layout
- [ ] Navigation data file for dev tools menu structure

### Quality Standards
- [ ] Full BEM CSS architecture (no Tailwind)
- [ ] WCAG 2.1 AA compliant with reduced motion support
- [ ] Zero bundler syntax violations (no optional chaining, nullish coalescing, etc.)
- [ ] Mobile-first responsive design
- [ ] Keyboard navigation support
- [ ] Focus management for full-screen menu

---

## 📐 Step 1: Audit Current Hero Implementations

### 1.1 Scan All Dev Tools Pages

**Files to audit:**
```
/components/pages/dev-tools/*.tsx (33 files)
```

**Data to collect:**
- Current hero HTML structure and BEM classes
- Content patterns (badge, title, subtitle/description)
- Icon usage (which pages use icons, which Phosphor icons)
- Layout variations (centered vs left-aligned)
- Special features (breadcrumbs, tabs, filters)

**Output:** Create report at `/reports/dev-tools-hero-audit/current-hero-patterns.md`

### 1.2 Identify Common Patterns

Extract:
- Shared content structure (badge → title → description)
- Typography scale (title sizes, subtitle sizes)
- Color usage (gradient titles, neon accents)
- Spacing patterns (margins, padding)
- Responsive behavior

**Output:** Add findings to report under "Common Patterns" section

### 1.3 Identify Unique Requirements

Document edge cases:
- Pages with tabs below hero (BlogSpecimensPage, ContentCardSpecimensPage)
- Pages with filters (PortfolioSpecimensPage)
- Pages with breadcrumbs above hero (all sub-pages)
- Pages with custom badges or status indicators

**Output:** Add findings to report under "Edge Cases & Special Requirements" section

---

## 📐 Step 2: Design Hero Component Architecture

### 2.1 Hero Configuration Data Structure

**Create:** `/data/mock/ui/dev-tools-heroes.ts`

```typescript
export interface DevToolHeroConfig {
  id: string; // Matches page route segment
  badge: string;
  badgeColor?: 'pink' | 'cyan' | 'green' | 'purple' | 'orange' | 'yellow';
  title: string;
  titleGradient?: 'cyberpunk' | 'toxic-lime' | 'solar-flare' | 'hyperpop' | 'default';
  description: string;
  icon?: string; // Phosphor icon name
  iconWeight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  iconColor?: string; // Custom CSS color or token reference
  
  // WebGL 3D Graphic Configuration
  graphic: {
    type: 'svg-morph' | 'particle-system' | 'geometric-rotation' | 'neon-flow' | 'grid-wave';
    svgPath?: string; // Path to SVG file in /imports/ or inline SVG code
    primaryColor: string; // Neon color token
    secondaryColor: string;
    animationSpeed: 'slow' | 'medium' | 'fast';
    complexity: 'low' | 'medium' | 'high'; // Number of particles/vertices
    interactivity: boolean; // Mouse hover effects
  };
  
  // Layout Options
  layout?: {
    contentWidth?: 'narrow' | 'medium' | 'wide'; // Left column width
    verticalAlign?: 'top' | 'center' | 'bottom';
  };
}

export const devToolsHeroConfigs: Record<string, DevToolHeroConfig> = {
  'tokens': { /* ... */ },
  'icons': { /* ... */ },
  'content-specimens': { /* ... */ },
  // ... all 33+ dev tools pages
};
```

**Design decisions to document:**
- Should graphic type auto-select based on page category?
- Default graphic for pages without custom config?
- Fallback behavior if WebGL not supported?

### 2.2 WebGL 3D Graphic System Architecture

**Create:** `/components/dev-tools/WebGLHeroGraphic.tsx`

**Requirements:**
- Accept configuration from hero data
- Load and parse SVG paths
- Render 3D scene using WebGL (canvas element)
- Support 5+ animation presets:
  1. **SVG Morph** — SVG path morphs between shapes
  2. **Particle System** — Points following SVG outline with physics
  3. **Geometric Rotation** — 3D geometric shapes rotating (cube, sphere, torus)
  4. **Neon Flow** — Flowing energy lines based on SVG curves
  5. **Grid Wave** — Undulating grid surface with neon wireframe
- Mouse interactivity (tilt, parallax, attract/repel particles)
- Reduced motion fallback (static SVG with subtle glow)
- Performance budget: maintain 60fps on mid-range devices

**Libraries to consider:**
- Three.js (if available in Figma Make)
- Raw WebGL with custom shaders
- Canvas 2D fallback for older browsers

**CSS integration:**
- Neon color tokens for colors
- Respect `prefers-reduced-motion`
- Responsive sizing (scale down on mobile)

### 2.3 Universal Hero Component Design

**Create:** `/components/dev-tools/DevToolsHero.tsx`

```typescript
interface DevToolsHeroProps {
  configId: string; // Key from devToolsHeroConfigs
  customContent?: {
    badge?: string;
    title?: string;
    description?: string;
  }; // Override config if needed
}

export function DevToolsHero(props: DevToolsHeroProps) {
  // Load config from data file
  // Merge with custom overrides
  // Render left-aligned content
  // Render WebGL graphic on right
  // Handle responsive layout
  // Manage reduced motion
}
```

**BEM structure:**
```
.dev-tools-hero
  .dev-tools-hero__container (max-width wrapper)
    .dev-tools-hero__content (left column)
      .dev-tools-hero__badge
      .dev-tools-hero__icon (optional)
      .dev-tools-hero__title
      .dev-tools-hero__description
    .dev-tools-hero__graphic (right column)
      canvas.dev-tools-hero__canvas
```

**CSS file:** `/styles/blocks/dev-tools-hero.css`

**Responsive behavior:**
- Desktop (>1024px): Two-column split (60/40 or 50/50)
- Tablet (768-1024px): Two-column split (70/30)
- Mobile (<768px): Stack vertically, graphic at reduced height

---

## 📐 Step 3: Design Stats Bar System

### 3.1 Stats Configuration Data Structure

**Create:** `/data/mock/ui/dev-tools-stats.ts`

```typescript
export interface StatMetric {
  id: string;
  label: string;
  value: string | number; // Can be computed dynamically
  icon?: string; // Phosphor icon name
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string; // e.g., "+12% from last week"
  color?: 'green' | 'pink' | 'cyan' | 'orange' | 'purple' | 'yellow';
  tooltip?: string; // Extended description
}

export interface StatsBarConfig {
  pageId: string; // Matches route segment
  metrics: StatMetric[];
  gatherFunction?: string; // Name of function in statsGathering.ts
  refreshInterval?: number; // Auto-refresh stats every N ms (optional)
}

export const devToolsStatsConfigs: Record<string, StatsBarConfig> = {
  'tokens': {
    pageId: 'tokens',
    gatherFunction: 'gatherTokenStats',
    metrics: [
      {
        id: 'total-tokens',
        label: 'Total tokens',
        value: 0, // Computed by gatherTokenStats()
        icon: 'Hash',
        color: 'cyan',
      },
      {
        id: 'color-tokens',
        label: 'Color tokens',
        value: 0,
        icon: 'Palette',
        color: 'pink',
      },
      // ... more metrics
    ],
  },
  'icons': {
    pageId: 'icons',
    gatherFunction: 'gatherIconStats',
    metrics: [
      {
        id: 'total-icons',
        label: 'Total icons',
        value: 0,
        icon: 'IconsThree',
        color: 'green',
      },
      {
        id: 'migrated-icons',
        label: 'Migrated to Phosphor',
        value: 0,
        icon: 'CheckCircle',
        color: 'cyan',
        trend: 'up',
        trendValue: '100%',
      },
    ],
  },
  // ... all 33+ dev tools pages
};
```

### 3.2 Stats Gathering Functions Architecture

**Create:** `/utils/statsGathering.ts`

```typescript
/**
 * Stats Gathering Utilities
 * Reusable functions to audit codebase and compute page-specific metrics
 */

export interface GatheredStats {
  [key: string]: string | number;
}

/**
 * Base function to count files matching a pattern
 */
export function countFiles(pattern: string): number {
  // Implementation depends on available file system APIs
  // May need to use static counts if dynamic scanning not available
}

/**
 * Count CSS custom properties (design tokens)
 */
export function gatherTokenStats(): GatheredStats {
  // Parse /styles/globals.css
  // Count --wp--preset--color--* tokens
  // Count --wp--preset--font-size--* tokens
  // Count --wp--preset--spacing--* tokens
  // Count --wp--preset--shadow--* tokens
  // Count --wp--preset--radius--* tokens
  return {
    totalTokens: 0,
    colorTokens: 0,
    fontSizeTokens: 0,
    spacingTokens: 0,
    shadowTokens: 0,
    radiusTokens: 0,
  };
}

/**
 * Count Phosphor icons in use
 */
export function gatherIconStats(): GatheredStats {
  // Parse /data/mock/ui/phosphor-icons.ts
  // Count total entries
  // Count migrated: true
  // Count by weight variant
  return {
    totalIcons: 0,
    migratedIcons: 0,
    uniqueWeights: 0,
  };
}

/**
 * Count components
 */
export function gatherComponentStats(): GatheredStats {
  // Count files in /components/
  // Count by category (common, pages, ui, sections)
  return {
    totalComponents: 0,
    commonComponents: 0,
    pageComponents: 0,
    uiComponents: 0,
  };
}

/**
 * Gather accessibility metrics
 */
export function gatherAccessibilityStats(): GatheredStats {
  // Count ARIA labels in codebase
  // Count focus management implementations
  // Count reduced motion implementations
  return {
    ariaLabels: 0,
    focusManagement: 0,
    reducedMotion: 0,
  };
}

/**
 * Gather performance metrics
 */
export function gatherPerformanceStats(): GatheredStats {
  // Use Performance API
  // Measure DOM size
  // Measure resource loading
  return {
    domElements: document.querySelectorAll('*').length,
    totalResources: performance.getEntriesByType('resource').length,
    renderTime: 0,
  };
}

// ... more gathering functions for each page type
```

**Static vs Dynamic Stats:**
- **Static:** Counts that don't change (total tokens defined in CSS)
- **Dynamic:** Counts that change per session (DOM elements, active resources)
- **Precomputed:** Run build-time script to populate static values

### 3.3 Universal Stats Bar Component

**Create:** `/components/dev-tools/StatsBar.tsx`

```typescript
interface StatsBarProps {
  configId: string; // Key from devToolsStatsConfigs
  liveRefresh?: boolean; // Enable auto-refresh
}

export function StatsBar(props: StatsBarProps) {
  // Load config from data file
  // Run gather function if specified
  // Render metric cards in horizontal scroll
  // Update values if liveRefresh enabled
}
```

**BEM structure:**
```
.stats-bar
  .stats-bar__container
    .stats-bar__grid
      .stat-card
        .stat-card__icon
        .stat-card__value
        .stat-card__label
        .stat-card__trend (optional)
```

**CSS file:** `/styles/blocks/stats-bar.css`

**Features:**
- Horizontal scroll on mobile
- Grid layout on desktop (4 columns)
- Neon accent colors per metric
- Icon from Phosphor library
- Trend indicators (up/down arrows)
- Tooltip on hover (extended description)
- Skeleton loading state while computing

---

## 📐 Step 4: Design Dev Tools Layout System

### 4.1 Dev Tools Layout Component

**Create:** `/components/dev-tools/DevToolsLayout.tsx`

```typescript
interface DevToolsLayoutProps {
  children: React.ReactNode;
}

export function DevToolsLayout(props: DevToolsLayoutProps) {
  // Render header, breadcrumbs, content, footer
  // Manage full-screen menu state
  // Handle search functionality
}
```

**BEM structure:**
```
.dev-tools-layout
  .dev-tools-layout__header
    .dev-tools-header__search
    .dev-tools-header__burger
  .dev-tools-layout__breadcrumbs
  .dev-tools-layout__content
    .dev-tools-content__hero
    .dev-tools-content__stats
    .dev-tools-content__main
  .dev-tools-layout__footer
  .dev-tools-layout__menu
    .dev-tools-menu__overlay
    .dev-tools-menu__list
      .dev-tools-menu__item
```

**CSS file:** `/styles/blocks/dev-tools-layout.css`

**Features:**
- Separate header with search bar and burger menu
- Dev tools-specific breadcrumbs with unique styling
- Dev tools-specific footer with tool links and metadata
- Full-screen menu triggered from burger menu icon
- Dev tools search with real-time filtering across all tools
- Router updated to use nested dev tools layout
- Navigation data file for dev tools menu structure

### 4.2 Dev Tools Header Component

**Create:** `/components/dev-tools/DevToolsHeader.tsx`

```typescript
interface DevToolsHeaderProps {
  onMenuToggle: () => void;
  onSearch: (query: string) => void;
  menuOpen: boolean;
}

export function DevToolsHeader(props: DevToolsHeaderProps) {
  // Render logo, search input, burger menu button
  // Handle search input changes
  // Emit menu toggle events
}
```

**BEM structure:**
```
.dev-tools-header
  .dev-tools-header__container
    .dev-tools-header__logo
      .dev-tools-logo__icon
      .dev-tools-logo__text
    .dev-tools-header__search
      .dev-tools-search__input
      .dev-tools-search__icon
      .dev-tools-search__clear (when query active)
    .dev-tools-header__burger
      .dev-tools-burger__line (3 lines for hamburger icon)
```

**CSS file:** `/styles/blocks/dev-tools-header.css`

**Features:**
- Dev tools logo/wordmark (unique to dev tools section)
- Search input with real-time filtering
- Clear button (X) to reset search
- Burger menu button with animated hamburger icon
- Sticky header behavior (scroll down = hide, scroll up = show)
- Keyboard shortcuts (Cmd+K or Ctrl+K to focus search)
- Search icon (Phosphor MagnifyingGlass)

**Responsive behavior:**
- Desktop (>768px): Full search bar visible, burger menu hidden
- Mobile (<768px): Search input collapses to icon, burger menu visible

### 4.3 Dev Tools Breadcrumbs Component

**Create:** `/components/dev-tools/DevToolsBreadcrumbs.tsx`

```typescript
interface DevToolsBreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string; // Last item has no href
  }>;
}

export function DevToolsBreadcrumbs(props: DevToolsBreadcrumbsProps) {
  // Render breadcrumb trail with dev tools styling
  // Support up to 4 levels
  // Inject Schema.org BreadcrumbList JSON-LD
}
```

**BEM structure:**
```
.dev-tools-breadcrumbs
  .dev-tools-breadcrumbs__list
    .dev-tools-breadcrumbs__item
      .dev-tools-breadcrumbs__link
      .dev-tools-breadcrumbs__separator (chevron icon)
    .dev-tools-breadcrumbs__item--current
```

**CSS file:** `/styles/blocks/dev-tools-breadcrumbs.css`

**Differences from main site breadcrumbs:**
- Neon cyan separator chevrons (vs main site gray)
- Smaller font size (0.875rem vs 1rem)
- Compact spacing (8px gaps vs 12px)
- Dark background with low opacity border
- Hover effects with neon pink glow

**Responsive behavior:**
- Desktop: Full breadcrumb trail
- Mobile: Truncate middle items, show only first and last

### 4.4 Dev Tools Footer Component

**Create:** `/components/dev-tools/DevToolsFooter.tsx`

```typescript
export function DevToolsFooter() {
  // Render footer with tool categories and quick links
  // Display metadata (last build date, total tools, version)
}
```

**BEM structure:**
```
.dev-tools-footer
  .dev-tools-footer__container
    .dev-tools-footer__grid
      .dev-tools-footer__column
        .dev-tools-footer__column-title
        .dev-tools-footer__link-list
          .dev-tools-footer__link
    .dev-tools-footer__meta
      .dev-tools-footer__stat (3 inline stats)
```

**CSS file:** `/styles/blocks/dev-tools-footer.css`

**Content structure:**
- **Column 1:** Design Specimens (8 links)
- **Column 2:** Reference & Docs (7 links)
- **Column 3:** Testing & Quality (6 links)
- **Column 4:** Builders & Labs (6 links)
- **Meta bar:** Last build, Total tools count, System version

**Features:**
- 4-column grid on desktop, stacked on mobile
- Neon accent underlines on hover
- Meta stats bar with live data
- "Back to main site" link (prominent button)

### 4.5 Dev Tools Menu Component

**Create:** `/components/dev-tools/DevToolsMenu.tsx`

```typescript
interface DevToolsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export function DevToolsMenu(props: DevToolsMenuProps) {
  // Render full-screen menu overlay
  // Load navigation data from config file
  // Highlight current page
  // Manage focus trap when open
  // Handle keyboard navigation (Tab, Escape, Arrow keys)
}
```

**BEM structure:**
```
.dev-tools-menu
  .dev-tools-menu__overlay (full-screen backdrop)
  .dev-tools-menu__panel (right-side slide-in panel)
    .dev-tools-menu__header
      .dev-tools-menu__close-btn
    .dev-tools-menu__search (duplicate search input)
    .dev-tools-menu__nav
      .dev-tools-menu__category
        .dev-tools-menu__category-title
        .dev-tools-menu__category-list
          .dev-tools-menu__link
          .dev-tools-menu__link--active
```

**CSS file:** `/styles/blocks/dev-tools-menu.css`

**Features:**
- Full-screen overlay (dark backdrop with 80% opacity)
- Right-side panel (400px width, slides in from right)
- Close button (X icon, top-right corner)
- Duplicate search input at top of menu
- Categorized navigation (6 categories)
- Active page highlight (neon pink border)
- Smooth animations (slide-in, fade-in)
- Focus trap (Tab cycles within menu when open)
- Keyboard shortcuts (Escape to close, Arrow keys to navigate)
- Click outside to close

**Animation:**
- Open: Overlay fades in (0.2s), panel slides left (0.3s ease-out)
- Close: Panel slides right (0.2s ease-in), overlay fades out (0.2s)
- Reduced motion: Instant show/hide, no animations

**Responsive behavior:**
- Desktop (>768px): Panel 400px width
- Mobile (<768px): Panel full-width (with 40px left margin for gesture)

### 4.6 Dev Tools Search Component

**Create:** `/components/dev-tools/DevToolsSearch.tsx`

```typescript
interface DevToolsSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function DevToolsSearch(props: DevToolsSearchProps) {
  // Render search input with icon
  // Debounce search input (300ms)
  // Filter dev tools based on query
  // Show live search results dropdown
}
```

**BEM structure:**
```
.dev-tools-search
  .dev-tools-search__input-wrapper
    .dev-tools-search__icon (magnifying glass)
    .dev-tools-search__input
    .dev-tools-search__clear (X button when query active)
  .dev-tools-search__results (dropdown)
    .dev-tools-search__results-header
    .dev-tools-search__result
      .dev-tools-search__result-icon
      .dev-tools-search__result-title
      .dev-tools-search__result-category
```

**CSS file:** `/styles/blocks/dev-tools-search.css`

**Search functionality:**
- Real-time filtering across all 33 dev tools
- Search in: title, description, category name, badge text
- Debounced search (300ms delay after last keystroke)
- Live results dropdown (max 10 results)
- Keyboard navigation (Arrow keys, Enter to select, Escape to close)
- Fuzzy matching (tolerate typos)

**Search data:**
- Load all dev tools from `/data/mock/ui/dev-tools.ts`
- Index: title, description, category, badge, icon name
- Pre-compute search index on component mount

**Results dropdown:**
- Show category badge with color accent
- Display tool icon (Phosphor icon)
- Highlight matching text
- Show tool description (truncated to 60 chars)
- Max 10 results, show "X more results..." if more available

### 4.7 Dev Tools Navigation Data

**Create:** `/data/mock/ui/dev-tools-navigation.ts`

```typescript
export interface DevToolsNavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  icon?: string; // Phosphor icon name
}

export interface DevToolsNavCategory {
  id: string;
  title: string;
  accent: 'green' | 'blue' | 'orange' | 'pink' | 'cyan' | 'purple';
  items: DevToolsNavItem[];
}

export const devToolsNavigation: DevToolsNavCategory[] = [
  {
    id: 'specimens',
    title: 'Design Specimens',
    accent: 'green',
    items: [
      {
        id: 'style-guide',
        label: 'Style Guide',
        href: '/dev-tools/style-guide',
        badge: 'Overview',
        icon: 'Palette',
      },
      {
        id: 'typography',
        label: 'Typography',
        href: '/dev-tools/typography',
        icon: 'Type',
      },
      // ... 6 more items
    ],
  },
  {
    id: 'reference',
    title: 'Reference & Documentation',
    accent: 'blue',
    items: [
      // ... 7 items
    ],
  },
  {
    id: 'builders',
    title: 'Builders & Playground',
    accent: 'orange',
    items: [
      // ... 3 items
    ],
  },
  {
    id: 'testing',
    title: 'Testing & Deployment',
    accent: 'pink',
    items: [
      // ... 6 items
    ],
  },
  {
    id: 'content-specimens',
    title: 'Content Specimens',
    accent: 'cyan',
    items: [
      // ... 10 items
    ],
  },
  {
    id: 'card-layout-lab',
    title: 'Card & Layout Lab',
    accent: 'purple',
    items: [
      // ... 4 items
    ],
  },
];
```

### 4.8 Router Updates for Dev Tools Layout

**Update:** `/routes.ts`

```typescript
import { DevToolsLayout } from './components/dev-tools/DevToolsLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout, // Main site layout
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'portfolio', Component: PortfolioMainPage },
      { path: 'blog', Component: BlogPage },
      // ... all main site pages
    ],
  },
  {
    path: '/dev-tools',
    Component: DevToolsLayout, // Separate dev tools layout
    children: [
      { index: true, Component: DevToolsPage }, // Dev tools hub
      { path: 'tokens', Component: DesignTokensRefPage },
      { path: 'icons', Component: IconLibraryPage },
      { path: 'typography', Component: TypographySpecimenPage },
      // ... all 33 dev tools pages
      { path: 'content-specimens', Component: ContentSpecimensHubPage },
      { path: 'content-specimens/overview', Component: ContentSpecimensPage },
      { path: 'content-specimens/rich-text', Component: RichTextSpecimensPage },
      { path: 'content-specimens/card-gallery', Component: ContentCardSpecimensPage },
      { path: 'content-specimens/page-layouts', Component: PageLayoutBrowserPage },
      // ... remaining dev tools pages
    ],
  },
]);
```

**Key changes:**
- Separate top-level route for `/dev-tools`
- All dev tools pages nested under `DevToolsLayout`
- Main site remains under `RootLayout`
- No shared layout between main site and dev tools

### 4.9 Breadcrumbs Reusability Strategy

**Problem:** Need different breadcrumb styles for main site vs dev tools

**Solution:** Create base `<Breadcrumbs>` component with variant prop

**Update:** `/components/ui/Breadcrumbs.tsx`

```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'main-site' | 'dev-tools'; // NEW
}

export function Breadcrumbs(props: BreadcrumbsProps) {
  var variant = grab(props, 'variant');
  var cssClass = variant === 'dev-tools' 
    ? 'breadcrumbs breadcrumbs--dev-tools'
    : 'breadcrumbs breadcrumbs--main-site';
  
  // Render breadcrumbs with appropriate CSS class
}
```

**CSS updates:**

`/styles/blocks/breadcrumbs.css` — Base styles + main site variant
`/styles/blocks/dev-tools-breadcrumbs.css` — Dev tools variant overrides

**Main site variant (`.breadcrumbs--main-site`):**
- Gray separator chevrons
- 1rem font size
- 12px gaps
- Light background

**Dev tools variant (`.breadcrumbs--dev-tools`):**
- Neon cyan separator chevrons
- 0.875rem font size
- 8px gaps
- Dark background with border
- Neon pink hover glow

**All templates updated:**
- Main site pages: `<Breadcrumbs variant="main-site" ... />`
- Dev tools pages: `<Breadcrumbs variant="dev-tools" ... />`

---

## 📐 Step 5: Implementation Plan

### Phase 1: Layout System Foundation (Tasks 1-10)

**Task 1:** Create dev tools navigation data
- File: `/data/mock/ui/dev-tools-navigation.ts`
- Define all 6 categories with 33 tools
- Add icons, badges, href values

**Task 2:** Create base breadcrumbs variant system
- Update: `/components/ui/Breadcrumbs.tsx`
- Add `variant` prop ('main-site' | 'dev-tools')
- Update CSS with variant classes

**Task 3:** Create dev tools header
- File: `/components/dev-tools/DevToolsHeader.tsx`
- File: `/styles/blocks/dev-tools-header.css`
- Logo, search input, burger menu button
- Sticky header behavior

**Task 4:** Create dev tools footer
- File: `/components/dev-tools/DevToolsFooter.tsx`
- File: `/styles/blocks/dev-tools-footer.css`
- 4-column grid, meta stats bar
- Quick links to all tools

**Task 5:** Create dev tools menu
- File: `/components/dev-tools/DevToolsMenu.tsx`
- File: `/styles/blocks/dev-tools-menu.css`
- Full-screen overlay, slide-in panel
- Focus trap, keyboard navigation

**Task 6:** Create dev tools search
- File: `/components/dev-tools/DevToolsSearch.tsx`
- File: `/styles/blocks/dev-tools-search.css`
- Real-time filtering, results dropdown
- Fuzzy matching, keyboard navigation

**Task 7:** Create dev tools layout component
- File: `/components/dev-tools/DevToolsLayout.tsx`
- File: `/styles/blocks/dev-tools-layout.css`
- Wire header, breadcrumbs, content, footer
- Manage menu state, search functionality

**Task 8:** Update router for nested layout
- Update: `/routes.ts`
- Create separate `/dev-tools` route group
- Nest all 33 dev tools pages under `DevToolsLayout`

**Task 9:** Migrate 5 pilot pages to new layout
- Choose: Dev Tools Hub, Tokens, Icons, Typography, Components
- Remove breadcrumbs from page components (now in layout)
- Test navigation, search, menu

**Task 10:** Migrate remaining 28 dev tools pages
- Batch update all remaining pages
- Verify breadcrumbs render correctly
- Test search indexing

### Phase 2: Hero & Stats System (Tasks 11-20)

**Task 11:** Create hero configuration data file
- File: `/data/mock/ui/dev-tools-heroes.ts`
- Define configs for all 33 pages

**Task 12:** Create stats configuration data file
- File: `/data/mock/ui/dev-tools-stats.ts`
- Define configs for all 33 pages

**Task 13:** Create stats gathering utilities
- File: `/utils/statsGathering.ts`
- Implement 10+ gather functions

**Task 14:** Create universal stats bar component
- File: `/components/dev-tools/StatsBar.tsx`
- File: `/styles/blocks/stats-bar.css`

**Task 15:** Create WebGL graphic system (placeholder)
- File: `/components/dev-tools/WebGLHeroGraphic.tsx`

**Task 16:** Create universal hero component
- File: `/components/dev-tools/DevToolsHero.tsx`
- File: `/styles/blocks/dev-tools-hero.css`

**Task 17:** Add hero + stats to 5 pilot pages
- Replace existing hero markup
- Add `<StatsBar>` below hero

**Task 18:** Add hero + stats to remaining 28 pages
- Batch update all pages

**Task 19:** Verify breadcrumbs integration
- Ensure spacing between breadcrumbs and hero
- Test responsive behavior

**Task 20:** Test full layout system
- Navigation flow (main site ↔ dev tools)
- Search functionality
- Menu behavior
- Breadcrumb trails

### Phase 3: WebGL Graphics (Tasks 21-25)

**Task 21:** Implement SVG morph animation
**Task 22:** Implement particle system
**Task 23:** Implement geometric rotation
**Task 24:** Implement neon flow animation
**Task 25:** Implement grid wave animation

### Phase 4: Polish & Testing (Tasks 26-30)

**Task 26:** Add reduced motion fallbacks
**Task 27:** Performance optimization
**Task 28:** Add custom graphics per page (33 unique SVGs)
**Task 29:** Accessibility audit
**Task 30:** Cross-browser testing

---

## 📐 Step 5: Documentation & Maintenance

### 5.1 Create Usage Guide

**File:** `/docs/dev-tools-hero-system.md`

Contents:
- How to configure a new hero
- Available graphic types and when to use each
- How to add new stats metrics
- How to create custom gather functions
- Troubleshooting common issues

### 5.2 Create Graphic Design Guidelines

**File:** `/docs/dev-tools-graphics-guide.md`

Contents:
- SVG preparation (clean paths, optimize vertices)
- Color palette usage (which neon colors for which categories)
- Animation speed recommendations
- Performance budgets
- Accessibility considerations

### 5.3 Update Guidelines.md

Add section documenting:
- DevToolsHero component usage
- StatsBar component usage
- Hero configuration data structure
- Stats gathering architecture

---

## 🎨 Design Specifications

### Hero Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  BREADCRUMBS                                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────┐  ┌──────────────────────────┐  │
│  │ [BADGE]                    │  │                          │  │
│  │                            │  │                          │  │
│  │ ⚡ [ICON]                  │  │      WebGL 3D            │  │
│  │                            │  │      Graphic             │  │
│  │ HERO TITLE                 │  │      Canvas              │  │
│  │ (gradient text)            │  │                          │  │
│  │                            │  │                          │  │
│  │ Description text that      │  │                          │  │
│  │ explains the page purpose  │  │                          │  │
│  │ in 1-2 sentences.          │  │                          │  │
│  │                            │  │                          │  │
│  └────────────────────────────┘  └──────────────────────────┘  │
│  60% width                       40% width                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Stats Bar Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│ │ 🎨       │ │ 📝       │ │ ⚡       │ │ 🎯       │            │
│ │ 142      │ │ 33       │ │ 24       │ │ 100%     │            │
│ │ Tokens   │ │ Pages    │ │ Tools    │ │ WCAG AA  │            │
│ │ ↑ +8     │ │          │ │          │ │          │            │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Key Technical Constraints

### Bundler Compatibility (CRITICAL)

**Forbidden syntax:**
- ❌ Optional chaining (`?.`)
- ❌ Nullish coalescing (`??`)
- ❌ Template literals in certain contexts
- ❌ `for...of` loops
- ❌ Object destructuring in function params
- ❌ Bracket notation (use `grab()` helper)

**Required patterns:**
- ✅ Explicit null checks: `if (value != null)`
- ✅ Use `grab(obj, key)` for property access
- ✅ Use `arrayGet(arr, index)` for array access
- ✅ Classic `for (var i = 0; i < arr.length; i++)` loops
- ✅ Named function expressions (avoid arrows in certain contexts)

### BEM Architecture (CRITICAL)

**All styling via semantic BEM classes:**
- ✅ `.dev-tools-hero__title`
- ✅ `.stat-card--trend-up`
- ✅ `.stats-bar__metric-icon`

**NO Tailwind utilities:**
- ❌ `flex items-center gap-4`
- ❌ `text-2xl font-bold`

### WebGL Considerations

**Graceful degradation:**
1. Try WebGL 2.0
2. Fallback to WebGL 1.0
3. Fallback to Canvas 2D
4. Fallback to static SVG

**Performance:**
- Target: 60fps on mid-range devices
- Max vertices: 5000 for "high" complexity
- Reduce quality on mobile automatically

---

## 📊 Success Metrics

- [ ] All 33 dev tools pages use `<DevToolsHero>` component
- [ ] All 33 dev tools pages have functional `<StatsBar>`
- [ ] WebGL graphics maintain 60fps
- [ ] Zero Tailwind classes in new components
- [ ] WCAG 2.1 AA compliance maintained
- [ ] Reduced motion fully supported
- [ ] No bundler syntax errors
- [ ] Mobile responsive (tested on 375px, 768px, 1440px)
- [ ] Stats gathering functions return accurate data
- [ ] Documentation complete and clear

---

## 📝 Report Template

**File:** `/reports/dev-tools-hero-stats/implementation-report.md`

### Section 1: Audit Findings
- Current hero patterns (with screenshots)
- Edge cases identified
- Common pain points

### Section 2: Architecture Design
- Hero config data structure (final)
- Stats config data structure (final)
- WebGL graphic system architecture
- Gather function architecture

### Section 3: Implementation Progress
- Phase 1: Foundation ✅ / ⏳ / ❌
- Phase 2: Hero Component ✅ / ⏳ / ❌
- Phase 3: WebGL Graphics ✅ / ⏳ / ❌
- Phase 4: Polish & Testing ✅ / ⏳ / ❌

### Section 4: Metrics & Performance
- FPS measurements per graphic type
- Bundle size impact
- Stats gathering performance
- Accessibility audit results

### Section 5: Known Issues & Future Work
- Browser compatibility notes
- Performance optimization opportunities
- Additional graphic types to implement
- Additional stats to gather

---

## 🚀 Next Steps

After prompt approval:

1. **Run audit** against all 33 dev tools pages
2. **Generate report** at `/reports/dev-tools-hero-stats/implementation-report.md`
3. **Design data structures** (get approval before implementation)
4. **Implement Phase 1** (foundation files)
5. **Migrate pilot pages** (5 pages)
6. **Iterate** based on feedback
7. **Complete migration** (all 33 pages)
8. **Implement WebGL graphics** (progressive enhancement)

---

**End of Prompt**