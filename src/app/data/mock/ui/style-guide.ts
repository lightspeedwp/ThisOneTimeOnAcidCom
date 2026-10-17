/**
 * @fileoverview Style Guide page mock data
 * Single source of truth for all style guide content
 *
 * @module data/mock/ui/style-guide
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

export const styleGuideContent = {
  hero: {
    title: "Style Guide",
    subtitle: "Neon vs Atomic Black Design System",
    description:
      "A comprehensive reference of every design token, component, and icon used across the Ash Shaw Makeup Portfolio. This living document ensures visual consistency and brand integrity.",
  },

  sections: {
    branding: {
      title: "Branding",
      description:
        "Core brand assets including the logo, site icon, and brand identity elements.",
    },
    colors: {
      title: "Colour Palette",
      description:
        "The Neon vs Atomic Black palette features 8 high-saturation neon colours with WCAG-compliant accessible text variants for light mode.",
    },
    gradients: {
      title: "Gradients",
      description:
        "Four signature gradient presets that define the brand's visual energy.",
    },
    typography: {
      title: "Typography",
      description:
        "Three font families power the typographic hierarchy with fluid responsive sizing.",
    },
    buttons: {
      title: "Buttons",
      description:
        "All button variants follow the neon ghost-button pill styling with WCAG-compliant focus states.",
    },
    icons: {
      title: "Icon Library",
      description:
        "Every Phosphor icon used across the site, organised by functional category.",
    },
    customIcons: {
      title: "Custom Brand Icons",
      description:
        "Purpose-built animated SVG icons representing core brand values with sophisticated gradients.",
    },
    spacing: {
      title: "Spacing Tokens",
      description:
        "Fluid spacing system using CSS clamp() for seamless responsive scaling.",
    },
    borders: {
      title: "Border Radius",
      description:
        "Consistent rounding tokens from subtle cards to fully rounded pills.",
    },
    shadows: {
      title: "Shadows",
      description:
        "Neon glow shadows and card elevation shadows for depth and emphasis.",
    },
    animations: {
      title: "Animations",
      description:
        "All 26 keyframe animations used across the site — neon effects, utility transitions, loading states, and UI interactions. Toggle each to preview.",
    },
    chips: {
      title: "Chips & Badges",
      description:
        "Filter chips, category badges, and tag pills in every variant used across archive pages and content cards.",
    },
    socialLinks: {
      title: "Social Links",
      description:
        "Platform-authentic social media icons rendered in three variant styles.",
    },
    cards: {
      title: "Card Variants",
      description:
        "Content cards used across Blog, Portfolio, Videos, and Podcasts — each with hover lift, neon glow, and dark mode support.",
    },
    forms: {
      title: "Form Elements",
      description:
        "Inputs, textareas, selects, and checkboxes styled with neon focus rings and consistent BEM architecture.",
    },
    archiveFilters: {
      title: "Archive Filters",
      description:
        "Interactive filter bar used across Blog, Portfolio, Videos, and Podcasts archive pages. Supports multi-select categories, sort options, active filter pills, and result count display.",
    },
    themeComparison: {
      title: "Dark / Light Mode",
      description:
        "Side-by-side comparison of key elements in both light and dark themes. The Neon vs Atomic Black system uses high-contrast neon colours on dark backgrounds and accessible text variants on light backgrounds.",
    },
  },
};

/** Neon colour swatches for the palette section */
export const neonColorSwatches = [
  {
    name: "Neon Green",
    token: "--wp--preset--color--neon-green",
    hex: "#39FF14",
    textClass: "text-neon-green",
    contrastOnWhite: { ratio: "1.4:1", level: "Fail" },
    contrastOnBlack: { ratio: "14.5:1", level: "AAA" },
  },
  {
    name: "Neon Pink",
    token: "--wp--preset--color--neon-pink",
    hex: "#FF10F0",
    textClass: "text-neon-pink",
    contrastOnWhite: { ratio: "3.2:1", level: "AA Large" },
    contrastOnBlack: { ratio: "6.2:1", level: "AA" },
  },
  {
    name: "Neon Blue",
    token: "--wp--preset--color--neon-blue",
    hex: "#1F51FF",
    textClass: "text-neon-blue",
    contrastOnWhite: { ratio: "5.5:1", level: "AA" },
    contrastOnBlack: { ratio: "3.8:1", level: "AA Large" },
  },
  {
    name: "Neon Yellow",
    token: "--wp--preset--color--neon-yellow",
    hex: "#FFFF00",
    textClass: "text-neon-yellow",
    contrastOnWhite: { ratio: "1.1:1", level: "Fail" },
    contrastOnBlack: { ratio: "19.6:1", level: "AAA" },
  },
  {
    name: "Neon Orange",
    token: "--wp--preset--color--neon-orange",
    hex: "#FF5F1F",
    textClass: "text-neon-orange",
    contrastOnWhite: { ratio: "2.6:1", level: "Fail" },
    contrastOnBlack: { ratio: "7.8:1", level: "AAA" },
  },
  {
    name: "Neon Purple",
    token: "--wp--preset--color--neon-purple",
    hex: "#BE00FE",
    textClass: "text-neon-purple",
    contrastOnWhite: { ratio: "4.2:1", level: "AA Large" },
    contrastOnBlack: { ratio: "5.0:1", level: "AA Large" },
  },
  {
    name: "Neon Cyan",
    token: "--wp--preset--color--neon-cyan",
    hex: "#00F7FF",
    textClass: "text-neon-cyan",
    contrastOnWhite: { ratio: "1.3:1", level: "Fail" },
    contrastOnBlack: { ratio: "15.8:1", level: "AAA" },
  },
  {
    name: "Neon Red",
    token: "--wp--preset--color--neon-red",
    hex: "#FF3131",
    textClass: "text-neon-red",
    contrastOnWhite: { ratio: "3.9:1", level: "AA Large" },
    contrastOnBlack: { ratio: "5.4:1", level: "AA" },
  },
];

/** Neutral ramp swatches */
export const neutralSwatches = [
  { name: "Neutral 50", token: "--wp--preset--color--neutral-50", hex: "#f9fafb" },
  { name: "Neutral 100", token: "--wp--preset--color--neutral-100", hex: "#f3f4f6" },
  { name: "Neutral 200", token: "--wp--preset--color--neutral-200", hex: "#e5e7eb" },
  { name: "Neutral 300", token: "--wp--preset--color--neutral-300", hex: "#d1d5db" },
  { name: "Neutral 400", token: "--wp--preset--color--neutral-400", hex: "#9ca3af" },
  { name: "Neutral 500", token: "--wp--preset--color--neutral-500", hex: "#6b7280" },
  { name: "Neutral 600", token: "--wp--preset--color--neutral-600", hex: "#4b5563" },
  { name: "Neutral 700", token: "--wp--preset--color--neutral-700", hex: "#374151" },
  { name: "Neutral 800", token: "--wp--preset--color--neutral-800", hex: "#1f2937" },
  { name: "Neutral 900", token: "--wp--preset--color--neutral-900", hex: "#111827" },
  { name: "Atomic Black", token: "--wp--preset--color--atomic-black", hex: "#0F0F0F" },
];

/** Gradient presets */
export const gradientPresets = [
  {
    name: "Cyberpunk",
    token: "--wp--preset--gradient--cyberpunk",
    css: "linear-gradient(135deg, #FF10F0 0%, #1F51FF 100%)",
    description: "Pink to Blue",
  },
  {
    name: "Toxic Lime",
    token: "--wp--preset--gradient--toxic-lime",
    css: "linear-gradient(to right, #39FF14 0%, #12FFF7 100%)",
    description: "Green to Cyan",
  },
  {
    name: "Solar Flare",
    token: "--wp--preset--gradient--solar-flare",
    css: "linear-gradient(45deg, #FF5F1F 0%, #FFFF00 100%)",
    description: "Orange to Yellow",
  },
  {
    name: "Hyperpop",
    token: "--wp--preset--gradient--hyperpop",
    css: "linear-gradient(-45deg, #FF10F0, #1F51FF, #00F7FF, #39FF14)",
    description: "Animated Multi-colour",
  },
];

/** Typography scale entries */
export const typographyScale = [
  { label: "Hero H1", cssClass: "text-hero-h1", sample: "Ash Shaw", token: "--wp--preset--font-size--hero" },
  { label: "Section H2", cssClass: "text-section-h2", sample: "Section Heading", token: "--wp--preset--font-size--section" },
  { label: "Card H3", cssClass: "text-card-h3", sample: "Card Title", token: "--wp--preset--font-size--500" },
  { label: "Card H4", cssClass: "text-card-h4", sample: "Sub Heading", token: "--wp--preset--font-size--400" },
  { label: "Body", cssClass: "text-body-p", sample: "Body text used for paragraphs and general content throughout the site.", token: "--wp--preset--font-size--200" },
  { label: "Small", cssClass: "text-body-small-p", sample: "Small caption or metadata text.", token: "--wp--preset--font-size--100" },
];

/** Font families */
export const fontFamilies = [
  {
    name: "Righteous",
    usage: "Hero titles, brand name",
    cssClass: "font-title",
    token: "--wp--preset--font-family--brand-title",
    sample: "Ash Shaw Makeup Artist",
  },
  {
    name: "Playfair Display",
    usage: "Section headings, card titles",
    cssClass: "font-heading",
    token: "--wp--preset--font-family--brand-heading",
    sample: "Elegant Serif Headings",
  },
  {
    name: "Inter",
    usage: "Body text, UI elements, buttons",
    cssClass: "font-body",
    token: "--wp--preset--font-family--brand-body",
    sample: "Clean and readable body text for optimal user experience.",
  },
];

/** Button variants */
export const buttonVariants = [
  { label: "Neon Primary", classes: "btn btn--neon-primary", text: "Primary Action" },
  { label: "Neon Outline", classes: "btn btn--neon-outline", text: "Ghost Button" },
  { label: "Neon Secondary", classes: "btn btn--neon-secondary", text: "Secondary" },
  { label: "Default", classes: "btn btn--default", text: "Default" },
  { label: "Outline", classes: "btn btn--outline", text: "Outline" },
  { label: "Secondary", classes: "btn btn--secondary", text: "Secondary" },
  { label: "Ghost", classes: "btn btn--ghost", text: "Ghost" },
  { label: "Destructive", classes: "btn btn--destructive", text: "Destructive" },
  { label: "Link", classes: "btn btn--link", text: "Link Style" },
];

/** Button sizes */
export const buttonSizes = [
  { label: "Small", classes: "btn btn--neon-primary btn--sm", text: "Small" },
  { label: "Default", classes: "btn btn--neon-primary", text: "Default" },
  { label: "Large", classes: "btn btn--neon-primary btn--lg", text: "Large" },
  { label: "Icon", classes: "btn btn--neon-primary btn--icon", text: "+" },
];

/** Spacing tokens */
export const spacingTokens = [
  { name: "Fluid XS", token: "--wp--preset--spacing--fluid-xs", value: "clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)" },
  { name: "Fluid SM", token: "--wp--preset--spacing--fluid-sm", value: "clamp(0.75rem, 0.5rem + 1vw, 1.25rem)" },
  { name: "Fluid MD", token: "--wp--preset--spacing--fluid-md", value: "clamp(1rem, 0.6rem + 2vw, 2rem)" },
  { name: "Fluid LG", token: "--wp--preset--spacing--fluid-lg", value: "clamp(1.5rem, 1rem + 2.5vw, 3rem)" },
  { name: "Fluid XL", token: "--wp--preset--spacing--fluid-xl", value: "clamp(2rem, 1.2rem + 4vw, 4rem)" },
  { name: "Fluid 2XL", token: "--wp--preset--spacing--fluid-2xl", value: "clamp(3rem, 1.5rem + 7.5vw, 6rem)" },
  { name: "Section H", token: "--wp--preset--spacing--section-horizontal", value: "clamp(1.5rem, 1.35rem + 0.714vw, 2rem)" },
  { name: "Section V", token: "--wp--preset--spacing--section-vertical", value: "clamp(2rem, 0.5rem + 4vw, 5rem)" },
];

/** Border radius tokens */
export const borderRadiusTokens = [
  { name: "SM", token: "--wp--preset--border-radius--sm", value: "0.25rem" },
  { name: "MD", token: "--wp--preset--border-radius--md", value: "0.5rem" },
  { name: "LG", token: "--wp--preset--border-radius--lg", value: "1rem" },
  { name: "XL", token: "--wp--preset--border-radius--xl", value: "1.5rem" },
  { name: "2XL", token: "--wp--preset--border-radius--2xl", value: "2rem" },
  { name: "Full", token: "--wp--preset--border-radius--full", value: "9999px" },
];

/** Shadow tokens */
export const shadowTokens = [
  { name: "SM", token: "--wp--preset--shadow--sm", description: "Subtle depth for inline elements" },
  { name: "MD", token: "--wp--preset--shadow--md", description: "Standard card/component elevation" },
  { name: "LG", token: "--wp--preset--shadow--lg", description: "Prominent elevation for modals" },
  { name: "XL", token: "--wp--preset--shadow--xl", description: "Hero-level depth" },
  { name: "Card", token: "--wp--preset--shadow--card", description: "Default card elevation" },
  { name: "Card Hover", token: "--wp--preset--shadow--card-hover", description: "Elevated card on hover" },
  { name: "Focus Ring", token: "--wp--preset--shadow--focus-ring", description: "Interactive focus indicator" },
  { name: "Focus Ring Strong", token: "--wp--preset--shadow--focus-ring-strong", description: "High-contrast focus ring" },
  { name: "Focus Ring Pink", token: "--wp--preset--shadow--focus-ring-pink", description: "Neon pink focus ring" },
  { name: "Neon SM", token: "--wp--preset--shadow--neon-sm", description: "Subtle neon glow" },
  { name: "Neon MD", token: "--wp--preset--shadow--neon-md", description: "Medium neon glow" },
  { name: "Neon LG", token: "--wp--preset--shadow--neon-lg", description: "Strong neon glow" },
  { name: "Neon Pink", token: "--wp--preset--shadow--neon-pink", description: "Hot pink neon glow" },
  { name: "Neon Purple", token: "--wp--preset--shadow--neon-purple", description: "Purple neon glow" },
  { name: "Neon Purple Hover", token: "--wp--preset--shadow--neon-purple-hover", description: "Nav button hover glow" },
  { name: "Neon Pink Dot", token: "--wp--preset--shadow--neon-pink-dot", description: "Carousel active dot glow" },
  { name: "Neon Blue", token: "--wp--preset--shadow--neon-blue", description: "Cyan neon glow" },
  { name: "Action Btn", token: "--wp--preset--shadow--action-btn", description: "Card action button base" },
  { name: "Action Btn Hover", token: "--wp--preset--shadow--action-btn-hover", description: "Card action button hover" },
  { name: "Action Btn Glow", token: "--wp--preset--shadow--action-btn-glow", description: "Card action button dark mode" },
];

/** Icon categories with their Phosphor icon names */
export const iconCategories = [
  {
    category: "Navigation",
    icons: ["Home", "User", "Image", "Play", "BookOpen", "Mail", "ArrowLeft", "ArrowRight", "ArrowUp", "ChevronLeft", "ChevronRight", "ChevronDown", "ExternalLink"],
  },
  {
    category: "Makeup & Art",
    icons: ["Palette", "Layers", "Fingerprint", "Paintbrush", "Droplets", "Sparkles", "PenTool"],
  },
  {
    category: "Content & Media",
    icons: ["Calendar", "Clock", "Tag", "Eye", "Heart", "BookOpen", "Newspaper", "FileText", "FolderOpen"],
  },
  {
    category: "Actions & UI",
    icons: ["X", "Plus", "Minus", "Check", "Copy", "Share2", "Link2", "Download", "LayoutGrid", "ZoomIn", "ZoomOut", "GripVertical", "Scale"],
  },
  {
    category: "Theme & Status",
    icons: ["Sun", "Moon", "Wifi", "WifiOff", "Zap", "Flashlight"],
  },
  {
    category: "Places & Concepts",
    icons: ["MapPin", "Compass", "Building2", "Music", "Brain", "Rocket", "Instagram", "Facebook", "MessageCircle"],
  },
];

/** Animation previews — each maps to a @keyframes defined in globals.css */
export const animationPreviews = [
  {
    name: "Gradient Shift",
    keyframe: "gradientShift",
    duration: "6s",
    timing: "ease infinite",
    description: "Animated multi-colour gradient cycling (Hyperpop background)",
  },
  {
    name: "Neon Pulse",
    keyframe: "neonPulse",
    duration: "2s",
    timing: "ease-in-out infinite",
    description: "Green neon box-shadow fading in and out",
  },
  {
    name: "Neon Pulse Purple",
    keyframe: "neonPulsePurple",
    duration: "2s",
    timing: "ease-in-out infinite",
    description: "Purple neon glow pulsing — nav buttons, active chips",
  },
  {
    name: "Neon Pulse Pink",
    keyframe: "neonPulsePink",
    duration: "2s",
    timing: "ease-in-out infinite",
    description: "Hot pink neon glow pulsing — CTA highlights",
  },
  {
    name: "Float",
    keyframe: "float",
    duration: "3s",
    timing: "ease-in-out infinite",
    description: "Gentle vertical float used on decorative elements",
  },
  {
    name: "Bounce",
    keyframe: "bounce",
    duration: "1s",
    timing: "ease infinite",
    description: "Vertical bounce for scroll-down indicators",
  },
  {
    name: "Spin",
    keyframe: "spin",
    duration: "1s",
    timing: "linear infinite",
    description: "360° rotation — loading spinners",
  },
  {
    name: "Pulse",
    keyframe: "pulse",
    duration: "2s",
    timing: "cubic-bezier(0.4, 0, 0.6, 1) infinite",
    description: "Opacity pulse — skeleton loaders, attention draw",
  },
  {
    name: "Fade In",
    keyframe: "fadeIn",
    duration: "0.4s",
    timing: "ease-out forwards",
    description: "Opacity 0→1 entrance animation",
  },
  {
    name: "Slide Up",
    keyframe: "slideUp",
    duration: "0.4s",
    timing: "ease-out forwards",
    description: "Translate from below + fade in — card entrances",
  },
  {
    name: "Scale In",
    keyframe: "scaleIn",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Scale from 0.95→1 + fade — modal/lightbox entrances",
  },
  {
    name: "Skeleton Pulse",
    keyframe: "skeleton-pulse",
    duration: "1.5s",
    timing: "ease-in-out infinite",
    description: "Loading skeleton shimmer effect",
  },
  {
    name: "Slide In",
    keyframe: "slideIn",
    duration: "0.4s",
    timing: "ease-out forwards",
    description: "Slide up from below + fade — menus, notifications, panels",
  },
  {
    name: "Slide Up Fade",
    keyframe: "slideUpFade",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Vertical slide with fade — ScrollBackToTop entrance",
  },
  {
    name: "Pulse Ring",
    keyframe: "pulse-ring",
    duration: "1.5s",
    timing: "cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
    description: "Expanding ring that fades out — ScrollDownArrow indicator",
  },
  {
    name: "Accordion Down",
    keyframe: "accordionDown",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Height expand from 0 — FAQ accordion open",
  },
  {
    name: "Accordion Up",
    keyframe: "accordionUp",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Height collapse to 0 — FAQ accordion close",
  },
  {
    name: "Shine",
    keyframe: "shine",
    duration: "0.75s",
    timing: "ease-out forwards",
    description: "Diagonal light sweep across element — category badge hover",
  },
  {
    name: "Glitch",
    keyframe: "glitch",
    duration: "0.5s",
    timing: "steps(5, end) infinite",
    description: "Chromatic glitch distortion — 404 page title effect",
  },
  {
    name: "Count Pop",
    keyframe: "countPop",
    duration: "0.35s",
    timing: "ease-out forwards",
    description: "Scale bump 1.35→1 — animated result count update",
  },
  {
    name: "Slide In Right",
    keyframe: "slideInRight",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Horizontal slide from right — offline indicator toast",
  },
  {
    name: "Caret Blink",
    keyframe: "caret-blink",
    duration: "1.25s",
    timing: "ease-out infinite",
    description: "Blinking cursor — input focus indicator",
  },
  {
    name: "Neon Button Gradient",
    keyframe: "neon-btn-gradient-shift",
    duration: "4s",
    timing: "ease infinite",
    description: "Shifting gradient background — neon CTA buttons",
  },
  {
    name: "Typeform Spin",
    keyframe: "typeform-spin",
    duration: "1s",
    timing: "linear infinite",
    description: "Centred rotation — Typeform embed loading spinner",
  },
  {
    name: "Collapsible Down",
    keyframe: "collapsible-down",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Height expand with fade — collapsible panel open",
  },
  {
    name: "Collapsible Up",
    keyframe: "collapsible-up",
    duration: "0.3s",
    timing: "ease-out forwards",
    description: "Height collapse with fade — collapsible panel close",
  },
];

/** Chip and badge variant showcase items */
export const chipBadgeVariants = [
  {
    group: "Filter Chips",
    items: [
      { label: "All", classes: "archive-filters__chip archive-filters__chip--active", variant: "Active" },
      { label: "UV & Glow", classes: "archive-filters__chip", variant: "Inactive" },
      { label: "Editorial", classes: "archive-filters__chip", variant: "Hover Preview" },
    ],
  },
  {
    group: "Badges",
    items: [
      { label: "Featured", classes: "badge badge--default", variant: "Default" },
      { label: "Tutorial", classes: "badge badge--secondary", variant: "Secondary" },
      { label: "Removed", classes: "badge badge--destructive", variant: "Destructive" },
      { label: "Draft", classes: "badge badge--outline", variant: "Outline" },
    ],
  },
  {
    group: "Tag Pills",
    items: [
      { label: "neon-makeup", classes: "tag-badge", variant: "Default Tag" },
      { label: "berlin", classes: "tag-badge", variant: "Default Tag" },
      { label: "festival", classes: "tag-badge", variant: "Default Tag" },
      { label: "uv-reactive", classes: "tag-badge", variant: "Default Tag" },
    ],
  },
];

/** Card variant showcase data */
export const cardVariants = [
  {
    name: "Blog Card",
    cssBlock: "blog-card",
    description: "Used on the Blog archive page. Features thumbnail, category badge, title, excerpt, and metadata row.",
    usage: "BlogPage.tsx, BlogPreviewSection",
  },
  {
    name: "Portfolio Card",
    cssBlock: "portfolio-card",
    description: "Gallery card with full-bleed image, category overlay, and hover-reveal title bar.",
    usage: "PortfolioMainPage.tsx, PortfolioGrid",
  },
  {
    name: "Video Card",
    cssBlock: "video-card",
    description: "Thumbnail with play overlay, title, and duration/date metadata.",
    usage: "VideosPage.tsx",
  },
  {
    name: "Podcast Card",
    cssBlock: "podcast-card",
    description: "Episode card with cover art, title, duration badge, and description excerpt.",
    usage: "PodcastsPage.tsx",
  },
  {
    name: "Feedback Card",
    cssBlock: "portfolio-feedback__card",
    description: "Quote card with star rating, author name, and location metadata.",
    usage: "PortfolioDetailPage.tsx, FeedbackPage.tsx",
  },
  {
    name: "FAQ Card",
    cssBlock: "faq-item",
    description: "Accordion-style card with expand/collapse toggle and animated answer reveal.",
    usage: "FaqSection.tsx, FaqPage.tsx",
  },
];

/** Form element showcase data */
export const formElements = [
  {
    name: "Text Input",
    element: "input",
    type: "text",
    placeholder: "Enter your name…",
    description: "Standard single-line text input with neon focus ring.",
  },
  {
    name: "Email Input",
    element: "input",
    type: "email",
    placeholder: "hello@example.com",
    description: "Email field with built-in validation styling.",
  },
  {
    name: "Search Input",
    element: "input",
    type: "search",
    placeholder: "Search the portfolio…",
    description: "Search field used in the global search and archive filters.",
  },
  {
    name: "Textarea",
    element: "textarea",
    type: "textarea",
    placeholder: "Write your message…",
    description: "Multi-line text area for longer content input.",
  },
  {
    name: "Select",
    element: "select",
    type: "select",
    placeholder: "Choose a category",
    description: "Dropdown select used in archive sort and filter controls.",
    options: ["All Categories", "UV & Glow", "Editorial", "Festival", "Creative"],
  },
  {
    name: "Checkbox",
    element: "checkbox",
    type: "checkbox",
    placeholder: "Accept terms and conditions",
    description: "Checkbox with custom neon styling and accessible label.",
  },
];

/** Archive filters demo categories */
export const archiveFiltersDemoCategories = [
  { id: "all", name: "All Work", slug: "all", count: 42 },
  { id: "uv-glow", name: "UV & Glow", slug: "uv-glow", count: 12 },
  { id: "editorial", name: "Editorial", slug: "editorial", count: 8 },
  { id: "festival", name: "Festival", slug: "festival", count: 15 },
  { id: "creative", name: "Creative", slug: "creative", count: 7 },
];

/** Archive filters demo sort options */
export const archiveFiltersDemoSortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Popular" },
  { value: "featured", label: "Featured" },
  { value: "alphabetical", label: "A–Z" },
];

/** Theme comparison sample elements */
export const themeComparisonElements = [
  {
    id: "card",
    label: "Content Card",
    description: "Card with image placeholder, badge, title, and excerpt",
  },
  {
    id: "button-group",
    label: "Button Group",
    description: "Primary, outline, and ghost button variants",
  },
  {
    id: "chip-group",
    label: "Filter Chips",
    description: "Active, inactive, and hover state chips",
  },
  {
    id: "input",
    label: "Form Input",
    description: "Text input with placeholder styling",
  },
];