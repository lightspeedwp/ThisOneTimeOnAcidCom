/**
 * @fileoverview Thailand portfolio collection
 * Captures tropical festival experiences and Southeast Asian travel
 * 
 * @module data/mock/portfolio/thailand
 * @author Ash Shaw Portfolio Team
 * @version 4.0.0 - Content Expansion Phase 8: Portfolio Polish (text enrichment)
 */

import { PortfolioEntry } from '../../types';

// Import Figma assets
import lostParadiseImg from 'figma:asset/e7ee10c85c112ab4acfc9e54087974a5faae5966.png';
import edenParadiseImg from 'figma:asset/3c496f3b8a5671dd00830f80a9a061ddf687e849.png';
import edenShishiImg from 'figma:asset/2d37a7cd55fe518f7eb8124fa25a2382be67f948.png';
import jungleFestival1 from 'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png';
import jungleFestival2 from 'figma:asset/1cd08d3825ac7cc423a4672f8ed279139fc99d0a.png';
import jungleFestival3 from 'figma:asset/3eb83eb2d4eb493b80283c1b75770d8893b2fc6a.png';

/**
 * Thailand Portfolio Work
 * Makeup artistry during travels through Thailand
 * 
 * @constant {PortfolioEntry[]}
 */
export const thailandWork: PortfolioEntry[] = [
  {
    id: 'lost-paradise',
    slug: 'lost-paradise-thailand',
    title: 'Lost paradise',
    category: 'Festival Makeup',
    subcategory: 'Thailand Adventures',
    date: '2024-09-12',
    images: [
      {
        src: lostParadiseImg,
        alt: 'Lost paradise - makeup artistry in Thailand with friend Gabi',
        title: 'Lost paradise - main',
        caption: 'Lost paradise',
        description: 'Tropical festival makeup celebrating friendship',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Thailand',
    event: 'Lost Paradise',
    description: 'My dear friend Gabi and sista from another mista! This piece captures the essence of festival sisterhood—those connections that transcend borders and languages, united by music, art, and shared experience. We met on the dancefloor under the jungle canopy, and within hours, we were family. The makeup became a ritual of bonding, transforming strangers into siblings through color and creativity.',
    excerpt: 'Festival makeup celebrating sisterhood, friendship, and the magic of tropical connection in Thailand',
    tags: ['Thailand', 'Festival', 'Friendship', 'Lost Paradise', 'Sisterhood', 'Connection', 'Jungle', 'Community', 'Tropical'],
    featured: false,
    order: 1
  },
  {
    id: 'eden-paradise',
    slug: 'eden-paradise-thailand',
    title: 'Eden paradise',
    category: 'Festival Makeup',
    subcategory: 'Thailand Adventures',
    date: '2024-09-18',
    images: [
      {
        src: edenParadiseImg,
        alt: 'Eden paradise - beautiful party makeup in Thailand',
        title: 'Eden paradise - main',
        caption: 'Party look',
        description: 'Beautiful party person who kindly let me do her makeup',
        position: 'center',
        aspectRatio: '3:4'
      }
    ],
    location: 'Thailand',
    event: 'Eden Paradise',
    description: 'Beautiful party person who kindly let me do her makeup. These moments of trust are what make festival makeup so special—a complete stranger sitting down and allowing you to transform their face for the night ahead. The collaboration between artist and canvas creates something neither could achieve alone. This piece embodied the generous, open-hearted spirit of the Thai party scene.',
    excerpt: 'Vibrant party makeup created through trust and collaboration at Eden Paradise in Thailand',
    tags: ['Thailand', 'Party', 'Eden Paradise', 'Festival', 'Collaboration', 'Trust', 'Transformation', 'Tropical', 'Generous Spirit'],
    featured: false,
    order: 2
  },
  {
    id: 'eden-paradise-shishi',
    slug: 'eden-paradise-shishi-thailand',
    title: 'Eden paradise - Shishi',
    category: 'Festival Makeup',
    subcategory: 'Thailand Adventures',
    date: '2024-09-19',
    images: [
      {
        src: edenShishiImg,
        alt: 'Eden paradise - Shishi with radiant makeup in Thailand',
        title: 'Radiant smile',
        caption: 'Radiant smile',
        description: 'Beautiful Shishi smiling radiance and shining bright',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Thailand',
    event: 'Eden Paradise',
    description: 'Beautiful Shishi smiling radiance and shining bright. That smile says everything—the joy, the freedom, the pure unfiltered happiness that comes from being fully present on the dancefloor. The makeup amplifies what was already there: her natural light, her infectious energy, her ability to make everyone around her feel welcome. This is what festival culture is meant to be—pure celebration.',
    excerpt: 'Radiant festival makeup amplifying natural joy, energy, and the spirit of pure celebration',
    tags: ['Thailand', 'Eden Paradise', 'Radiant', 'Joy', 'Festival', 'Happiness', 'Energy', 'Celebration', 'Presence', 'Smile'],
    featured: false,
    order: 3
  },
  {
    id: 'jungle-festival-koh-phangan',
    slug: 'jungle-festival-koh-phangan',
    title: 'Jungle festival magic',
    category: 'Festival Makeup',
    subcategory: 'Thailand Adventures',
    date: '2024-09-26',
    images: [
      {
        src: jungleFestival1,
        alt: 'Jungle festival magic - Koh Phangan makeup art',
        title: 'Jungle festival magic',
        caption: 'Jungle vibes',
        description: 'Tropical UV artistry in the heart of Thailand\'s jungle paradise',
        position: 'center',
        aspectRatio: '16:9'
      },
      {
        src: jungleFestival2,
        alt: 'Jungle festival magic - Alternative angle',
        title: 'Jungle energy',
        caption: 'Wild energy',
        description: 'Capturing the wild energy and natural beauty',
        position: 'right',
        aspectRatio: '4:3'
      },
      {
        src: jungleFestival3,
        alt: 'Jungle festival magic - Detail shot',
        title: 'Jungle details',
        caption: 'Festival details',
        description: 'Intricate details of jungle-inspired makeup',
        position: 'left',
        aspectRatio: '3:4'
      }
    ],
    location: 'Koh Phangan, Thailand',
    event: 'Jungle Festival',
    description: 'Tropical UV artistry in the heart of Thailand\'s jungle paradise, blending neon glow with natural island energy. Koh Phangan has a unique magic—the humidity makes the paint glow differently, the jungle sounds create a natural rhythm, and the tropical night sky becomes part of the canvas. This series captures that intersection where nature and technology, ancient and modern, organic and synthetic all merge into something entirely new.',
    excerpt: 'Wild jungle festival energy with UV artistry—where tropical nature meets neon technology in Thailand\'s paradise',
    tags: ['Koh Phangan', 'Jungle', 'UV', 'Festival', 'Thailand', 'Tropical', 'Nature', 'Technology', 'Island', 'Paradise', 'Neon', 'Humidity'],
    featured: true,
    order: 4
  },
  {
    id: 'chiang-mai-mountain-temple',
    slug: 'chiang-mai-mountain-temple',
    title: 'Chiang Mai mountain temple',
    category: 'Festival Makeup',
    subcategory: 'Thailand Adventures',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1708885820142-f48f4c3fc1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlhbmclMjBtYWklMjB0ZW1wbGUlMjB0aGFpbGFuZCUyMG1ha2V1cCUyMGFydCUyMG1vdW50YWlufGVufDF8fHx8MTc3MjU0NzgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Hot pink and pure yellow temple-inspired design incorporating Thai cultural motifs with respectful artistic interpretation',
        title: 'Chiang Mai mountain temple - main',
        caption: 'Thai temple fusion',
        position: 'center',
        aspectRatio: '4:3',
        description: 'Hot pink and pure yellow design inspired by northern Thai temple architecture'
      }
    ],
    location: 'Chiang Mai, Thailand',
    event: 'Mountain Temple Gathering',
    date: '2024-11-22',
    description: 'Hot pink and pure yellow temple-inspired design created during a northern Thailand psytrance gathering in the mountains. The piece incorporated Thai cultural motifs with respect and artistic interpretation. Northern Thailand\'s temple architecture and mountain energy demanded a design that honored both tradition and transformation. The color choices reference traditional Thai temple decorations—the gold leaf and magenta hues found in ancient murals—while the geometric execution brings them into contemporary context. This is cultural appreciation, not appropriation: learning from, honoring, and celebrating without claiming ownership.',
    excerpt: 'Thai temple motifs for northern mountain psytrance gathering—honoring tradition through contemporary transformation',
    tags: ['Chiang Mai', 'Thailand', 'Temple', 'Cultural Fusion', 'Mountains', 'Tradition', 'Transformation', 'Respect', 'Architecture', 'Heritage', 'Northern Thailand', 'Psytrance'],
    featured: false,
    order: 5
  }
];