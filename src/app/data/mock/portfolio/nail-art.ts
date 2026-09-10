/**
 * @fileoverview Nail art portfolio
 * Creative nail designs and fusion nail artistry
 * 
 * @module data/mock/portfolio/nail-art
 * @author Ash Shaw Portfolio Team
 * @version 3.0.0 - Content Expansion Phase 8: Portfolio Polish (text enrichment)
 */

import { PortfolioEntry } from '../../types';

// Import Figma assets
import rainbowFusionImg from 'figma:asset/7c570c5291977a816c8152a098cd6693cff22dbd.png';
import galaxyNailsImg from 'figma:asset/1ec0ba217cad06e2cff662a25a050b0401d1092a.png';
import gradientDreamsImg from 'figma:asset/deb2b4ab4cb25c5e47b960708fce6ea552ee6039.png';

/**
 * Nail Art Portfolio
 * Creative nail designs and sticker art
 * 
 * @constant {PortfolioEntry[]}
 */
export const nailArtWork: PortfolioEntry[] = [
  {
    id: 'rainbow-fusion',
    slug: 'rainbow-fusion-nails',
    title: 'Rainbow fusion',
    category: 'Nail Art',
    subcategory: 'Sticker Art Collection',
    date: '2025-01-10',
    images: [
      {
        src: rainbowFusionImg,
        alt: 'Rainbow Fusion nail art with colorful sticker art and holographic details',
        title: 'Rainbow fusion',
        caption: 'Full set',
        description: 'Vibrant multi-color rainbow design using creative sticker art techniques',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    description: 'Vibrant multi-color rainbow design using creative sticker art techniques with holographic accents. This piece explores the intersection of traditional nail art and contemporary sticker application—layering different textures, finishes, and colors to create depth and visual complexity. Each nail becomes a miniature canvas, telling its own story while contributing to the larger rainbow narrative across all ten fingers. The holographic accents catch light from unexpected angles, creating prismatic effects that shift with hand movement.',
    excerpt: 'Vibrant rainbow sticker art with holographic accents—ten miniature canvases creating one unified spectrum',
    tags: ['Nail Art', 'Rainbow', 'Fusion', 'Stickers', 'Colorful', 'Holographic', 'Layering', 'Texture', 'Prismatic', 'Miniature Canvas'],
    featured: true,
    order: 1
  },
  {
    id: 'galaxy-nails',
    slug: 'galaxy-nails',
    title: 'Galaxy nails',
    category: 'Nail Art',
    subcategory: 'Fusion Nails',
    date: '2025-02-14',
    images: [
      {
        src: galaxyNailsImg,
        alt: 'Galaxy Nails with iridescent blues and greens with cosmic shimmer',
        title: 'Galaxy nails',
        caption: 'Galaxy effect',
        description: 'Cosmic-inspired design with iridescent finish and beautiful shimmer effects',
        position: 'center',
        aspectRatio: '3:4'
      }
    ],
    description: 'Iridescent blues and greens with cosmic shimmer. Cosmic-inspired design with iridescent finish and beautiful shimmer effects that evoke the mystery of deep space and distant nebulae. The technique involves layering translucent colors to create depth—mimicking the way we see through layers of gas and stardust when looking at astronomical photography. Each nail captures a different moment in cosmic time, from the birth of stars to the quiet darkness between galaxies.',
    excerpt: 'Cosmic galaxy-inspired shimmer with iridescent layers—capturing the mystery of nebulae and deep space',
    tags: ['Nail Art', 'Galaxy', 'Iridescent', 'Cosmic', 'Shimmer', 'Space', 'Nebula', 'Layers', 'Translucent', 'Astronomy', 'Mystery'],
    featured: true,
    order: 2
  },
  {
    id: 'gradient-dreams',
    slug: 'gradient-dreams-nails',
    title: 'Gradient dreams',
    category: 'Nail Art',
    subcategory: 'Fusion Nails',
    date: '2025-03-08',
    images: [
      {
        src: gradientDreamsImg,
        alt: 'Gradient Dreams nail art with purple to green ombre and metallic finish',
        title: 'Gradient dreams',
        caption: 'Ombre effect',
        description: 'Smooth color transition with metallic topcoat showing beautiful color shifts',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    description: 'Purple to green ombre with metallic finish. Smooth color transition with metallic topcoat showing beautiful color shifts in different lighting conditions—from warm indoor glow to cool outdoor daylight. The gradient technique requires patience and precision: building up layers gradually to achieve seamless transition without harsh lines. The metallic finish adds another dimension, reflecting and refracting light while simultaneously enhancing the underlying color journey from deep violet to vibrant emerald.',
    excerpt: 'Purple to green ombre gradient with metallic finish—seamless color journey enhanced by light-refracting layers',
    tags: ['Nail Art', 'Gradient', 'Ombre', 'Metallic', 'Color Shift', 'Purple', 'Green', 'Smooth Transition', 'Precision', 'Light Play', 'Layering'],
    featured: true,
    order: 3
  }
];