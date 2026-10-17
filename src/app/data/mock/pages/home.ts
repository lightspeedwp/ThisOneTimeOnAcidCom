/**
 * @fileoverview Homepage content data
 * All static content for the homepage including hero, why section, and metadata
 * 
 * @module data/mock/pages/home
 * @author Ash Shaw Portfolio Team
 * @version 1.5.0
 */

import { PageContent, HeroContent, WhyReason } from '../../types';

/**
 * Homepage Hero Section Content
 * Main headline, description, and CTA for the homepage hero
 * 
 * @constant {HeroContent}
 */
export const homepageHero: HeroContent = {
  title: "Hi, I'm Ash Shaw",
  subtitle: "Makeup that shines with colour, energy, and connection.",
  description: "Makeup is my joy and my way of bringing people together. From festivals to the dance floor, I use colour and light to create looks that make people feel radiant, confident, and alive.",
  ctaText: "Explore UV Portfolio",
  ctaLink: "/portfolio"
};

/**
 * Why I Do Makeup - Core Reasons
 * Three philosophical pillars explaining Ash's passion for makeup artistry
 * 
 * @constant {WhyReason[]}
 */
export const whyReasons: WhyReason[] = [
  {
    id: 'spread-joy',
    icon: 'shine',
    title: 'Psytrance energy',
    description: 'My art is fueled by the music. I channel the high-energy vibrations of psytrance into neon designs that flow with your movement and glow under the UV lights.',
    order: 1
  },
  {
    id: 'brings-joy',
    icon: 'joy',
    title: 'Global connection',
    description: 'Traveling between Cape Town, Berlin, and Thailand, I connect with souls on dancefloors worldwide. Makeup is my language of connection in the global trance community.',
    order: 2
  },
  {
    id: 'keep-growing',
    icon: 'growth',
    title: 'Ambidextrous skill',
    description: 'Adapting to the chaos of festivals, I\'ve mastered ambidextrous application to work fast and precisely from any angle, ensuring you don\'t miss a beat.',
    order: 3
  }
];

export const whySectionContent = {
  title: "The Art of UV",
  subtitle: "Why I paint the dancefloor",
  ctaText: "Read my journey",
  ctaLink: "/about",
  ctaAriaLabel: "Navigate to About page to read full story",
  items: whyReasons
};

/**
 * Complete Homepage Content
 * All page-level content and metadata
 * 
 * @constant {PageContent}
 */
export const homepageContent: PageContent = {
  id: 'home',
  title: 'Ash Shaw - Global psytrance & UV makeup artist',
  metaDescription: 'Global psytrance and UV makeup artist based in Cape Town, Berlin, and Thailand. Creating neon festival looks and blacklight artistry for the trance community.',
  hero: homepageHero,
  sections: {
    why: whyReasons
  }
};