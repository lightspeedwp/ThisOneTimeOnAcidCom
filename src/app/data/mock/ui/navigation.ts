/**
 * @fileoverview Navigation UI data
 * @module data/mock/ui/navigation
 */

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { House, User, Image, Play, BookOpen, Envelope, Calendar } from "@phosphor-icons/react";

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: PhosphorIcon;
  neonColor: string;
}

export const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", path: "/", icon: House, neonColor: "green" },
  { id: "about", label: "About", path: "/about/journey", icon: User, neonColor: "pink" },
  { id: "portfolio", label: "Portfolio", path: "/portfolio", icon: Image, neonColor: "purple" },
  { id: "videos", label: "Videos", path: "/videos", icon: Play, neonColor: "yellow" },
  { id: "events", label: "Events", path: "/events", icon: Calendar, neonColor: "red" },
  { id: "blog", label: "Blog", path: "/blog", icon: BookOpen, neonColor: "cyan" },
  { id: "contact", label: "Contact", path: "/contact", icon: Envelope, neonColor: "orange" },
];

/** Subset shown in the Header and MobileMenu (Videos & Events live in the Footer) */
const FOOTER_ONLY_IDS = new Set(["videos", "events"]);
export const headerNavigationItems: NavigationItem[] = navigationItems.filter(
  (item) => !FOOTER_ONLY_IDS.has(item.id)
);

export const pageTitles: Record<string, string> = {
  home: "Home",
  about: "About Ash Shaw",
  history: "History — Ash Shaw's journey",
  portfolio: "Portfolio - Makeup artistry work",
  "portfolio-detail": "Portfolio detail",
  "portfolio-category": "Portfolio category",
  "portfolio-tag": "Portfolio tag",
  videos: "Videos - Tutorials & showcases",
  "video-detail": "Video detail",
  events: "Events — Festivals & creative gatherings",
  "event-detail": "Event detail",
  "event-category": "Event category",
  "event-tag": "Event tag",
  blog: "Blog - Makeup artistry insights",
  "blog-post": "Blog post",
  "blog-category": "Blog category",
  "blog-tag": "Blog tag",
  contact: "Contact - Get in touch",
  podcasts: "Podcasts - Neon vs Atomic Black",
  "podcast-detail": "Podcast episode",
  search: "Search",
  terms: "Terms and conditions",
  privacy: "Privacy policy",
  sitemap: "Sitemap - Site index",
  "style-guide": "Style guide - Design system",
  stickers: "Sticker designs — Art prints",
  accessibility: "Accessibility statement",
  press: "Press & media kit",
  toolkit: "The toolkit - Gear & pigments",
  "next-festival": "Next festival countdown",
  manifesto: "The manifesto - Neon vs Atomic Black",
  "dev-tools": "Developer tools",
  "dev-tools-typography": "Typography specimens",
  "dev-tools-spacing": "Spacing scale",
  "dev-tools-shadows": "Shadow & glow scale",
  "dev-tools-radius": "Border radius specimens",
  "dev-tools-buttons": "Button variants",
  "dev-tools-cards": "Card interactions",
  "dev-tools-neon": "Neon animations",
  "dev-tools-tokens": "Design tokens reference",
  "dev-tools-icons": "Icon library",
  "dev-tools-api": "Component API reference",
  "dev-tools-playground": "Design system playground",
  "dev-tools-code-quality": "Code quality dashboard",
  "dev-tools-deployment": "Deployment readiness",
  "dev-tools-analytics": "Analytics dashboard",
  "dev-tools-accessibility": "Accessibility tester",
  "dev-tools-performance": "Performance tester",
};