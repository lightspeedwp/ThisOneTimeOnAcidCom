/**
 * @fileoverview Main barrel export for all mock data
 * Central access point for importing mock data throughout the application
 * 
 * @module data/mock
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 * 
 * @example
 * // Import specific data
 * import { homepageHero, whyReasons, socialLinks } from '@/data/mock';
 * 
 * // Import from specific category
 * import { homepageHero } from '@/data/mock/pages/home';
 * import { socialLinks } from '@/data/mock/ui/social-links';
 * import { blogPosts } from '@/data/mock/blog';
 */

// UI Elements
export * from './ui';

// Images
export * from './images';

// Page Content
export * from './pages';

// Portfolio Data
export * from './portfolio';

// Blog Data
export * from './blog';

// Testimonials Data
export * from './testimonials';

// Section Data
export * from './sections';

// Video Data
export * from './videos';

// Podcast Data
export * from './podcasts';

// Event Data
export * from './events';

// Timeline Data
export * from './timeline';

// Re-export types for convenience
export * from '../types';