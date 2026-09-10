/**
 * @fileoverview Component Showcase mock data — live previews of all key UI components
 * @module data/mock/ui/component-showcase
 * @version 1.0.0
 */

import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs';

export interface ShowcaseEntry {
  id: string;
  name: string;
  category: 'common' | 'ui' | 'section';
  description: string;
}

export const componentShowcaseUI = {
  seo: { title: 'Component Showcase | Developer Tools | Ash Shaw' },
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Developer tools', href: '/dev-tools' },
    { label: 'Component showcase' },
  ] as BreadcrumbItem[],
  hero: {
    badge: 'Visual Preview',
    title: 'Component showcase',
    description:
      'Live previews of every reusable UI component in the design system. See components rendered in isolation with their default props.',
  },
  components: [
    { id: 'logo', name: 'Logo', category: 'common' as const, description: 'Brand logo in small, medium, and large sizes.' },
    { id: 'social-links', name: 'SocialLinks', category: 'common' as const, description: 'Social media icon row with hover glow.' },
    { id: 'theme-toggle', name: 'ThemeToggle', category: 'common' as const, description: 'Dark/light mode switch button.' },
    { id: 'breadcrumbs', name: 'Breadcrumbs', category: 'ui' as const, description: 'Navigation breadcrumbs with JSON-LD.' },
    { id: 'scroll-to-top', name: 'ScrollToTop', category: 'ui' as const, description: 'Floating scroll-to-top button.' },
    { id: 'read-more', name: 'ReadMoreButton', category: 'ui' as const, description: 'Animated CTA link with arrow.' },
    { id: 'share', name: 'ShareComponent', category: 'ui' as const, description: 'Share button group with copy link.' },
    { id: 'search-input', name: 'SearchInput', category: 'ui' as const, description: 'Expandable search input with neon glow.' },
    { id: 'portfolio-card', name: 'PortfolioCard', category: 'ui' as const, description: 'Portfolio item card with image and badges.' },
    { id: 'section-card', name: 'SectionCard', category: 'ui' as const, description: 'Generic section card for content blocks.' },
    { id: 'slider-card', name: 'SliderCard', category: 'ui' as const, description: 'Carousel-style featured card.' },
    { id: 'video-player', name: 'VideoPlayer', category: 'ui' as const, description: 'Video embed with responsive aspect ratio.' },
    { id: 'festival-countdown', name: 'FestivalCountdown', category: 'section' as const, description: 'Animated countdown timer to a festival.' },
    { id: 'testimonials', name: 'TestimonialsSection', category: 'section' as const, description: 'Rotating testimonials carousel.' },
  ] as ShowcaseEntry[],
};