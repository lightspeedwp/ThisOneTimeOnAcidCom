/**
 * @fileoverview Hero section images for all pages
 * Curated image collections for homepage, about, and portfolio hero sections
 * 
 * NOTE: This file replaces HOMEPAGE_HERO_IMAGES, ABOUT_HERO_IMAGES, and PORTFOLIO_HERO_IMAGES from Constants.ts
 * ClassName properties have been removed - positioning is now handled by components
 * 
 * @module data/mock/images/hero-images
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

import { HeroImage } from '../../types';

// Import Figma assets (homepage hero)
import heroImage1 from 'figma:asset/f4a28f747d49fc9d37311b17f513b62e2b95a73e.png';
import heroImage2 from 'figma:asset/378acbf4a7518ca6c40b44540bd7a121a91375fe.png';
import heroImage3 from 'figma:asset/e82a7d901c5a28bf9313c7535228e647eaf06b75.png';

/**
 * Homepage Hero Section Images
 * Curated mosaic of 3 images showcasing festival makeup artistry
 * 
 * @constant {HeroImage[]}
 */
export const homepageHeroImages: HeroImage[] = [
  {
    src: heroImage1,
    alt: 'Close-up artistic eye makeup with vibrant purple stripe, red metallic lashes and colorful crystal gems',
    caption: 'Festival eye art',
    description: 'Intricate eye makeup featuring a bold purple stripe design, metallic red lashes, and decorative crystal gems showcasing precision and creativity in festival artistry',
    position: 'left',
    aspectRatio: '4:3'
  },
  {
    src: heroImage2,
    alt: 'Joyful festival participant with rainbow heart body paint on chest, smiling radiantly in colorful festival environment',
    caption: 'Rainbow heart love',
    description: 'Beautiful expression of festival joy and connection with rainbow heart body art, capturing the loving and inclusive spirit of festival culture and community celebration',
    position: 'right',
    aspectRatio: '4:3'
  },
  {
    src: heroImage3,
    alt: 'Portrait of person with blonde hair and colorful face paint featuring blue and pink stripes in outdoor festival setting',
    caption: 'Vibrant face art',
    description: 'Striking portrait showcasing colorful face paint with blue and pink geometric stripes, demonstrating bold artistic expression and the transformative power of festival makeup',
    position: 'bottom',
    aspectRatio: '3:4'
  }
];

/**
 * About Page Hero Images
 * Images representing Ash's journey and artistic evolution
 * 
 * @constant {HeroImage[]}
 */
export const aboutHeroImages: HeroImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1729599102515-710a4dd83637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMHBvcnRyYWl0JTIwY3JlYXRpdmUlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTc2NjQ0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Artistic makeup portrait with creative festival styling showcasing artistic evolution',
    caption: 'Creative evolution',
    description: 'A portrait that captures the artistic journey and creative evolution that defines Ash Shaw\'s makeup artistry approach',
    position: 'left',
    aspectRatio: '4:3'
  },
  {
    src: 'https://images.unsplash.com/photo-1576135711730-51049b41de78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBtYWtldXAlMjBhcnQlMjBjb2xvcmZ1bCUyMGZhY2UlMjBwYWludHxlbnwxfHx8fDE3NTc2NjQ0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Beautiful artistic makeup with colorful face paint representing creative self-expression',
    caption: 'Self expression',
    description: 'Colorful artistic makeup that embodies the spirit of creative self-expression and the joy of transformation through makeup artistry',
    position: 'right',
    aspectRatio: '3:4'
  },
  {
    src: 'https://images.unsplash.com/photo-1631881068324-b216d0d2a3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGV5ZSUyMG1ha2V1cCUyMGFydCUyMG5lb24lMjBjb2xvcnN8ZW58MXx8fHwxNzcyNTYxMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Creative eye makeup art with vibrant neon colors showcasing technical mastery',
    caption: 'Technical mastery',
    description: 'Intricate eye makeup art with neon colors demonstrating the technical mastery and precision that defines Ash\'s makeup artistry',
    position: 'bottom',
    aspectRatio: '16:9'
  }
];

/**
 * Portfolio Page Hero Images
 * Portfolio showcase highlighting diverse makeup styles
 * 
 * @constant {HeroImage[]}
 */
export const portfolioHeroImages: HeroImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBwb3J0Zm9saW8lMjBjcmVhdGl2ZSUyMHdvcmt8ZW58MXx8fHwxNzU3NjY0NDgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Creative portfolio work showcasing artistic styling and festival makeup',
    caption: 'Portfolio excellence',
    description: 'Portfolio work that demonstrates the range and excellence of Ash Shaw\'s makeup artistry across different styles and occasions',
    position: 'left',
    aspectRatio: '16:9'
  },
  {
    src: 'https://images.unsplash.com/photo-1713857973896-1d04d1e3e1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMHJhaW5ib3clMjBhcnRpc3RpY3xlbnwxfHx8fDE3NTc2NjQ0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Festival face paint with rainbow artistic design representing diverse portfolio offerings',
    caption: 'Festival artistry',
    description: 'Vibrant festival face painting with rainbow artistic elements that showcase the diverse and colorful portfolio of makeup styles and techniques',
    position: 'right',
    aspectRatio: '4:3'
  },
  {
    src: 'https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZ2xvd3xlbnwxfHx8fDE3NTc2NjQ0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'UV reactive makeup glowing under blacklight showcasing specialized portfolio techniques',
    caption: 'UV specialization',
    description: 'Specialized UV reactive makeup that glows under blacklight, demonstrating advanced techniques and specialized skills in the makeup portfolio',
    position: 'bottom',
    aspectRatio: '3:4'
  }
];

// Legacy exports for backward compatibility (will be deprecated)
export const HOMEPAGE_HERO_IMAGES = homepageHeroImages;
export const ABOUT_HERO_IMAGES = aboutHeroImages;
export const PORTFOLIO_HERO_IMAGES = portfolioHeroImages;