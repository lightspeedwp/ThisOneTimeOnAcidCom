/**
 * @fileoverview Featured portfolio work for homepage
 * Curated selection of best work across all categories
 * 
 * @module data/mock/portfolio/featured
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Content Expansion Phase 8: Portfolio Polish (text enrichment)
 */

import { PortfolioEntry } from '../../types';

// Import Figma assets
import festivalEyeArt from 'figma:asset/f4a28f747d49fc9d37311b17f513b62e2b95a73e.png';
import rainbowHeart from 'figma:asset/378acbf4a7518ca6c40b44540bd7a121a91375fe.png';
import vibrantFaceArt from 'figma:asset/e82a7d901c5a28bf9313c7535228e647eaf06b75.png';

/**
 * Featured Portfolio Work
 * Standout pieces showcased on the homepage
 * 
 * @constant {PortfolioEntry[]}
 */
export const featuredWork: PortfolioEntry[] = [
  {
    id: 'festival-eye-art',
    slug: 'festival-eye-art',
    title: 'Psytrance eye art',
    category: 'Festival Makeup',
    images: [
      {
        src: festivalEyeArt,
        alt: 'Close-up artistic eye makeup with vibrant purple stripe, red metallic lashes and colorful crystal gems',
        title: 'Psytrance eye art - main',
        caption: 'Festival eye art',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Koh Phangan, Thailand',
    event: 'Psytrance Jungle Festival',
    date: '2024-10-15',
    description: 'Intricate eye makeup featuring a bold purple stripe design, metallic red lashes, and decorative crystal gems. Created during a full moon gathering in the jungle, this piece captures the essence of tropical psytrance culture where art, music, and nature converge under the starlit sky. The design was built to catch the light on the dancefloor—each movement creating new reflections and prismatic effects as the crystals shifted with the beat.',
    excerpt: 'Bold festival eye art with purple stripes and metallic red lashes, built for the tropical dancefloor',
    tags: ['Eye Art', 'Psytrance', 'Gems', 'Colorful', 'Creative', 'Koh Phangan', 'Thailand', 'Jungle Festival', 'Crystal Accents', 'Tropical'],
    featured: true,
    order: 1
  },
  {
    id: 'rainbow-heart-love',
    slug: 'rainbow-heart-love',
    title: 'Rainbow heart love',
    category: 'Body Art',
    images: [
      {
        src: rainbowHeart,
        alt: 'Joyful festival participant with rainbow heart body paint on chest, smiling radiantly in colorful festival environment',
        title: 'Rainbow heart love - main',
        caption: 'Rainbow heart love',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Thailand',
    event: 'Full Moon Psytrance',
    date: '2024-09-20',
    description: 'Beautiful expression of festival joy and connection with rainbow heart body art, capturing the loving and inclusive spirit of the global trance community. This piece emerged spontaneously during a full moon party on the beach—the kind of magical moment where the makeup becomes a vessel for emotion rather than just decoration. The rainbow symbolizes diversity, acceptance, and unity—core values of the psytrance culture that brings people together from every corner of the planet.',
    excerpt: 'Rainbow heart body art celebrating festival love, unity, and the inclusive spirit of the global trance community',
    tags: ['Body Art', 'Rainbow', 'Festival', 'Love', 'Community', 'Thailand', 'Full Moon', 'Heart', 'Unity', 'Connection', 'Beach Party'],
    featured: true,
    order: 2
  },
  {
    id: 'vibrant-face-art',
    slug: 'vibrant-face-art',
    title: 'Neon tribal geometry',
    category: 'Festival Makeup',
    images: [
      {
        src: vibrantFaceArt,
        alt: 'Portrait of person with blonde hair and colorful face paint featuring blue and pink stripes in outdoor festival setting',
        title: 'Neon tribal geometry - main',
        caption: 'Vibrant face art',
        position: 'center',
        aspectRatio: '3:4'
      }
    ],
    location: 'Outdoor Festival',
    event: 'Open Air Festival',
    date: '2024-08-12',
    description: 'Striking portrait showcasing colorful face paint with blue and pink geometric stripes. A modern take on tribal markings for the electronic music generation—honoring ancient traditions of ceremonial body art while recontextualizing them for contemporary festival culture. The bold lines are intentionally asymmetric, creating dynamic visual movement that mirrors the energy of the music. Each stripe was hand-painted with precision, building a bridge between ancient ritual and modern rave.',
    excerpt: 'Geometric face paint with blue and pink stripes—tribal markings reimagined for the electronic music generation',
    tags: ['Face Paint', 'Geometric', 'Psytrance', 'Colorful', 'Bold', 'Tribal', 'Modern', 'Outdoor Festival', 'Asymmetric', 'Ceremonial'],
    featured: true,
    order: 3
  }
];