/**
 * @fileoverview Swiss mountain festival portfolio
 * Shankra Festival 2023 and Reiserfieber Switzerland
 * 
 * @module data/mock/portfolio/swiss-festivals
 * @author Ash Shaw Portfolio Team
 * @version 2.1.0 - Fixed figma:asset imports
 */

import { PortfolioEntry } from '../../types';

// Import Figma assets — Shankra
import festivalConnectionImg from 'figma:asset/d35493e2be08017199b3d1523d516a996ec97a5d.png';
import alpineBlissImg from 'figma:asset/e43f2a86f8b38d1777428264c8c9126d07a9ef75.png';
import mountainRainbowImg from 'figma:asset/80d0d3af448e4969dc796d00e91c30d3648cd9c4.png';

// Import Figma assets — Reiserfieber
import alpineGlowImg from 'figma:asset/33024fb05609d4a4545be47508d2ad3595f143c4.png';
import mountainSpiritImg from 'figma:asset/280168cf45339af581c4065d1f6728ea2de6ff02.png';
import festivalJoyImg from 'figma:asset/71597fc19386bc69fb2144851d752977dfd3693e.png';

/**
 * Shankra Festival 2023 Work
 * Swiss mountain festival in breathtaking alpine settings
 * 
 * @constant {PortfolioEntry[]}
 */
export const shankraWork: PortfolioEntry[] = [
  {
    id: 'festival-connection',
    slug: 'shankra-festival-connection',
    title: 'Festival connection',
    category: 'Festival Makeup',
    subcategory: 'Shankra Festival 2023',
    images: [
      {
        src: festivalConnectionImg,
        alt: 'Festival Connection - turquoise eye design at Shankra Festival 2023, Switzerland',
        title: 'Festival connection',
        caption: 'Turquoise eyes',
        description: 'Joyful festival moment with turquoise eye design and infectious energy',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Shankra Festival 2023, Switzerland',
    event: 'Shankra Festival',
    date: '2023-07-14',
    description: 'Joyful festival moment with turquoise eye design and infectious energy in the Swiss mountains.',
    excerpt: 'Turquoise eye design celebrating Swiss mountain festival energy',
    tags: ['Shankra', 'Switzerland', 'Alpine', 'Connection', 'Turquoise'],
    featured: false,
    order: 1
  },
  {
    id: 'alpine-bliss',
    slug: 'shankra-alpine-bliss',
    title: 'Alpine bliss',
    category: 'Festival Makeup',
    subcategory: 'Shankra Festival 2023',
    images: [
      {
        src: alpineBlissImg,
        alt: 'Alpine Bliss - golden face paint with turquoise accents at Shankra Festival 2023, Switzerland',
        title: 'Alpine bliss',
        caption: 'Golden serenity',
        description: 'Serene golden face paint with turquoise accents',
        position: 'center',
        aspectRatio: '3:4'
      }
    ],
    location: 'Shankra Festival 2023, Switzerland',
    event: 'Shankra Festival',
    date: '2023-07-15',
    description: 'Serene golden face paint with turquoise accents, capturing the peaceful mountain festival atmosphere.',
    excerpt: 'Golden serenity in Swiss alpine setting',
    tags: ['Shankra', 'Alpine', 'Golden', 'Peaceful', 'Switzerland'],
    featured: false,
    order: 2
  },
  {
    id: 'mountain-rainbow',
    slug: 'shankra-mountain-rainbow',
    title: 'Mountain rainbow',
    category: 'Festival Makeup',
    subcategory: 'Shankra Festival 2023',
    images: [
      {
        src: mountainRainbowImg,
        alt: 'Mountain Rainbow - vibrant rainbow face art at Shankra Festival 2023, Switzerland',
        title: 'Mountain rainbow',
        caption: 'Rainbow patterns',
        description: 'Vibrant rainbow face art with intricate patterns',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Shankra Festival 2023, Switzerland',
    event: 'Shankra Festival',
    date: '2023-07-16',
    description: 'Vibrant rainbow face art with intricate patterns celebrating the colorful spirit of Swiss festival culture.',
    excerpt: 'Rainbow patterns celebrating Swiss festival spirit',
    tags: ['Shankra', 'Rainbow', 'Colorful', 'Patterns', 'Switzerland'],
    featured: false,
    order: 3
  }
];

/**
 * Reiserfieber Switzerland Work
 * Mountain celebration at Swiss outdoor festival
 * 
 * @constant {PortfolioEntry[]}
 */
export const reiserfieberWork: PortfolioEntry[] = [
  {
    id: 'alpine-glow',
    slug: 'reiserfieber-alpine-glow',
    title: 'Alpine glow',
    category: 'Festival Makeup',
    subcategory: 'Reiserfieber Switzerland',
    images: [
      {
        src: alpineGlowImg,
        alt: 'Alpine Glow - turquoise and purple face art at Reiserfieber, Switzerland',
        title: 'Alpine glow',
        caption: 'Delicate glow',
        description: 'Delicate turquoise and purple face art with glitter accents',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Reiserfieber, Switzerland',
    event: 'Reiserfieber',
    date: '2023-08-25',
    description: 'Delicate turquoise and purple face art with glitter accents creating magical festival vibes in the Swiss mountains.',
    excerpt: 'Magical glitter accents in Swiss mountains',
    tags: ['Reiserfieber', 'Switzerland', 'Alpine', 'Glow', 'Glitter'],
    featured: false,
    order: 1
  },
  {
    id: 'mountain-spirit',
    slug: 'reiserfieber-mountain-spirit',
    title: 'Mountain spirit',
    category: 'Festival Makeup',
    subcategory: 'Reiserfieber Switzerland',
    images: [
      {
        src: mountainSpiritImg,
        alt: 'Mountain Spirit - rainbow face stripe at Reiserfieber, Switzerland',
        title: 'Mountain spirit',
        caption: 'Rainbow stripe',
        description: 'Bold rainbow face stripe with Swiss mountain energy',
        position: 'center',
        aspectRatio: '3:4'
      }
    ],
    location: 'Reiserfieber, Switzerland',
    event: 'Reiserfieber',
    date: '2023-08-26',
    description: 'Bold rainbow face stripe embodying the free spirit of Swiss mountain festivals.',
    excerpt: 'Bold rainbow stripe with mountain spirit',
    tags: ['Reiserfieber', 'Rainbow', 'Bold', 'Mountain', 'Swiss'],
    featured: false,
    order: 2
  },
  {
    id: 'festival-joy',
    slug: 'reiserfieber-festival-joy',
    title: 'Festival joy',
    category: 'Festival Makeup',
    subcategory: 'Reiserfieber Switzerland',
    images: [
      {
        src: festivalJoyImg,
        alt: 'Festival Joy - purple and turquoise eye design at Reiserfieber, Switzerland',
        title: 'Festival joy',
        caption: 'Joyful eyes',
        description: 'Joyful purple and turquoise eye design',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Reiserfieber, Switzerland',
    event: 'Reiserfieber',
    date: '2023-08-27',
    description: 'Joyful purple and turquoise eye design radiating positive festival energy.',
    excerpt: 'Joyful eye design with vibrant energy',
    tags: ['Reiserfieber', 'Joy', 'Purple', 'Turquoise', 'Eye Art'],
    featured: false,
    order: 3
  }
];

/**
 * All Swiss Festival Work Combined
 * 
 * @constant {PortfolioEntry[]}
 */
export const swissFestivalWork: PortfolioEntry[] = [
  ...shankraWork,
  ...reiserfieberWork
];