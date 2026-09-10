/**
 * @fileoverview Sitemap page content and tag descriptions
 * Centralised data for the visual sitemap/site index page
 *
 * @module data/mock/ui/sitemap
 * @author Ash Shaw Portfolio Team
 * @version 4.0.0 - Added content specimen dev tools and timeline page taglines
 */

/**
 * Taglines for all top-level pages shown in the Pages section of the sitemap.
 * Keyed by navigation id or page slug.
 */
export const pageTaglines: Record<string, string> = {
  home: "Where the neon journey begins",
  about: "The full story behind the artist",
  portfolio: "A gallery of glowing faces from dancefloors worldwide",
  videos: "Tutorials, time-lapses, and festival footage",
  events: "Festivals and creative gatherings across the globe",
  blog: "Insights from the dancefloor and the desk",
  contact: "Reach out for collaborations and creative conversations",
  faq: "Frequently asked questions about Ash and UV art",
  feedback: "What the community says about the neon experience",
  podcasts: "Raw conversations from the neon underground",
  search: "Find anything across the entire site",
  stickers: "Collectible art prints from the neon universe",
  "style-guide": "The design system powering the portfolio",
  press: "Official bios, photos, and brand assets for media use",
  toolkit: "The gear, pigments, and tech in Ash's festival bag",
  "next-festival": "Countdown to the next major event appearance",
  ebook: "The full-length creative memoir — read it free online",
  accessibility: "Our commitment to inclusive digital experiences",
  timeline: "Chronological milestones in Ash's career and projects",
  resources: "A beginner\u2019s guide to UV face painting and makeup artistry",
};

/**
 * Extra pages listed in the Pages section that aren't in the main navigation.
 * Each entry has an id, label, path, and icon name (Phosphor component string).
 */
export interface SitemapPageEntry {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export const sitemapExtraPages: SitemapPageEntry[] = [
  { id: "press", label: "Press kit", path: "/press", icon: "Newspaper" },
  { id: "toolkit", label: "The toolkit", path: "/toolkit", icon: "Wrench" },
  { id: "next-festival", label: "Next festival", path: "/next-festival", icon: "Calendar" },
  { id: "ebook", label: "Ebook", path: "/ebook", icon: "BookOpen" },
  { id: "accessibility", label: "Accessibility statement", path: "/about/accessibility", icon: "UserCircle" },
  { id: "faq", label: "FAQ", path: "/faq", icon: "HelpCircle" },
  { id: "feedback", label: "Feedback", path: "/feedback", icon: "MessageSquare" },
  { id: "podcasts", label: "Podcasts", path: "/podcasts", icon: "Mic" },
  { id: "search", label: "Search", path: "/search", icon: "Search" },
  { id: "stickers", label: "Sticker gallery", path: "/stickers", icon: "Sticker" },
  { id: "style-guide", label: "Style guide", path: "/style-guide", icon: "Palette" },
  { id: "timeline", label: "Timeline", path: "/timeline", icon: "Clock" },
];

/**
 * Legal pages listed in the Legal section of the sitemap.
 */
export const sitemapLegalPages: SitemapPageEntry[] = [
  { id: "terms", label: "Terms & conditions", path: "/terms", icon: "FileText" },
  { id: "privacy", label: "Privacy policy", path: "/privacy", icon: "FileText" },
  { id: "sitemap", label: "Sitemap", path: "/sitemap", icon: "Layers" },
];

/**
 * Hub entry for the Developer Tools section.
 * The remaining 23 tools are sourced from devToolsPageUI.tools.
 */
export const sitemapDevToolsHub: SitemapPageEntry = {
  id: "hub",
  label: "Developer tools hub",
  path: "/dev-tools",
  icon: "Wrench",
};

/**
 * Taglines for all developer tools shown in the Developer Tools section.
 * Keyed by tool id (last path segment).
 */
export const devToolTaglines: Record<string, string> = {
  hub: "Central hub for all design system inspection tools",
  "block-library": "Comprehensive catalog of all foundational WordPress blocks",
  patterns: "Pre-built WordPress block patterns and reusable sections",
  "google-fonts": "Performance-optimized variable font loading strategies",
  "audio-concepts": "Explorations for podcast and audio player interfaces",
  "style-guide": "Visual reference for every design token and pattern",
  typography: "Font scales, fluid sizing, and type specimens",
  spacing: "The spacing scale from 4px to 128px",
  shadows: "Shadow and neon glow effects at every elevation",
  radius: "Border radius from subtle rounding to full pill shapes",
  buttons: "Every button state, size, and variant in one view",
  cards: "Card layouts, hover states, and interaction patterns",
  neon: "All 26 neon keyframe animations in action",
  tokens: "Complete design token reference with copy-paste values",
  icons: "Browse and search the full Phosphor icon library",
  api: "Props, types, and usage for every component",
  playground: "Interactive sandbox for design system experiments",
  "code-quality": "Code health metrics, lint scores, and bundle analysis",
  deployment: "Pre-launch checklist and deployment readiness",
  analytics: "Content tracking and site usage insights",
  components: "Live showcase of every reusable UI component",
  snippets: "Generate copy-paste code for common patterns",
  docs: "Auto-generated documentation from component source",
  "visual-regression": "Pixel-level visual diff testing across themes",
  integration: "End-to-end integration test runner",
  stickers: "Design assets for the sticker art collection",
  accessibility: "WCAG AA compliance testing and audit tools",
  performance: "Lighthouse scores and performance benchmarks",
  "phosphor-icons": "Complete Phosphor icon reference with weight comparison",
  "rich-text-specimens": "Per-content-type typography and layout element reference",
  "content-cards": "5 card variants for every content type with neon accents",
  "page-layouts": "Wireframe previews of every page template with annotations",
};

/**
 * Taglines for legal pages shown in the Legal section.
 * Keyed by page slug.
 */
export const legalTaglines: Record<string, string> = {
  terms: "Usage guidelines for content and creative commons licensing",
  privacy: "How your data is handled — spoiler: we keep it minimal",
  sitemap: "You are here — the full map of every page and link",
};

export const sitemapContent = {
  title: "Sitemap",
  subtitle: "Everything on this site, all in one place.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Sitemap" },
  ],
  subsections: {
    aboutAsh: "About Ash",
  },
  sections: {
    pages: "Pages",
    portfolioCategories: "Portfolio categories",
    blogCategories: "Blog categories",
    blogPosts: "Blog posts",
    podcasts: "Podcasts",
    videos: "Videos",
    events: "Events",
    tags: "Tags",
    devTools: "Developer tools",
    legal: "Legal",
  },
};

/**
 * Tag descriptions — short descriptions displayed under each tag title
 * on the sitemap page and on tag archive pages.
 * Only tags that are actually used in blog posts are listed.
 */
export interface TagDescriptor {
  name: string;
  slug: string;
  description: string;
}

export const tagDescriptors: TagDescriptor[] = [
  // Makeup Types
  {
    name: "UV Makeup",
    slug: "uv-makeup",
    description:
      "Fluorescent pigments that glow under blacklight for maximum dancefloor impact.",
  },
  {
    name: "Blacklight",
    slug: "blacklight",
    description:
      "Techniques and products optimised for UV-reactive environments.",
  },
  {
    name: "Neon",
    slug: "neon",
    description:
      "High-saturation neon colours that pop in daylight and glow at night.",
  },

  // Techniques
  {
    name: "Tutorial",
    slug: "tutorial",
    description:
      "Step-by-step walkthroughs for recreating specific looks at home.",
  },
  {
    name: "Tips",
    slug: "tips",
    description: "Quick, actionable advice for improving your makeup game.",
  },
  {
    name: "Makeup Tips",
    slug: "makeup-tips",
    description:
      "Expert makeup tips and product recommendations for all skill levels.",
  },

  // Products & Tools
  {
    name: "Long-Lasting",
    slug: "long-lasting",
    description:
      "Techniques for making looks survive 12+ hour festival sessions.",
  },
  {
    name: "Eco-Friendly",
    slug: "eco-friendly",
    description:
      "Sustainable products and practices, including biodegradable glitter.",
  },
  {
    name: "Sustainability",
    slug: "sustainability",
    description:
      "Eco-conscious approaches to makeup artistry and festival culture.",
  },

  // Events & Locations
  {
    name: "Festival",
    slug: "festival",
    description:
      "Content related to music festivals, psytrance gatherings, and raves.",
  },
  {
    name: "Psytrance",
    slug: "psytrance",
    description:
      "Psytrance festival culture, music, and the community that inspires the art.",
  },
  {
    name: "Rave",
    slug: "rave",
    description:
      "Underground and electronic music events from Berlin to global scenes.",
  },
  {
    name: "Berlin",
    slug: "berlin",
    description:
      "Art, culture, and club life in Ash's home city of Berlin.",
  },
  {
    name: "Thailand",
    slug: "thailand",
    description:
      "Festival season in Koh Phangan, jungle parties, and tropical artistry.",
  },
  {
    name: "Origin Festival",
    slug: "origin-festival",
    description:
      "Cape Town's beloved psytrance gathering in the Western Cape mountains.",
  },
  {
    name: "Travel",
    slug: "travel",
    description:
      "Adventures, cycling journeys, and global festival-hopping stories.",
  },
  {
    name: "Tropical",
    slug: "tropical",
    description:
      "Sun-drenched festival scenes and tropical makeup inspiration.",
  },

  // Activities
  {
    name: "Cycling",
    slug: "cycling",
    description:
      "Adventure cycling journeys to festivals and beyond.",
  },
  {
    name: "Adventure",
    slug: "adventure",
    description:
      "Epic journeys, outdoor challenges, and festival pilgrimages.",
  },

  // Concepts
  {
    name: "Color Theory",
    slug: "color-theory",
    description:
      "The science of complementary, analogous, and triadic colour harmony.",
  },
  {
    name: "Education",
    slug: "education",
    description:
      "Theory, workshops, and learning resources for aspiring artists.",
  },
  {
    name: "Artistry",
    slug: "artistry",
    description:
      "The craft and creative process behind standout makeup looks.",
  },

  // Specific Elements
  {
    name: "Glitter",
    slug: "glitter",
    description:
      "Biodegradable glitter application, types, and eco-conscious sparkle.",
  },
  {
    name: "Green",
    slug: "green",
    description:
      "Environmentally responsible products and green beauty practices.",
  },

  // Essentials
  {
    name: "Packing List",
    slug: "packing-list",
    description:
      "Curated kit lists for travelling light to festivals and events.",
  },
  {
    name: "Essentials",
    slug: "essentials",
    description:
      "Must-have products and tools for any makeup artist's kit.",
  },

  // Personal
  {
    name: "Birthday",
    slug: "birthday",
    description:
      "Birthday celebrations, personal milestones, and festive memories.",
  },
  {
    name: "Survival",
    slug: "survival",
    description:
      "Tips for surviving multi-day festivals in comfort and style.",
  },
  {
    name: "Experience",
    slug: "experience",
    description:
      "Personal stories and reflections from festival adventures.",
  },
];