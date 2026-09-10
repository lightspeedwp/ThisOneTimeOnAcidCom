/**
 * @fileoverview UV/blacklight makeup portfolio
 * Neon and glow-in-the-dark makeup for club and rave environments
 * 
 * @module data/mock/portfolio/uv-makeup
 * @author Ash Shaw Portfolio Team
 * @version 4.0.0 - Content Expansion Phase 8: Portfolio Polish (text enrichment)
 */

import { PortfolioEntry } from '../../types';

// Import Figma assets
import rainbowLightningImg from 'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png';
import electricBlueImg from 'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png';

/**
 * UV Makeup Portfolio
 * Neon, blacklight, and glow-in-the-dark work
 * 
 * @constant {PortfolioEntry[]}
 */
export const uvMakeupWork: PortfolioEntry[] = [
  {
    id: 'rainbow-lightning',
    slug: 'rainbow-lightning',
    title: 'Rainbow lightning',
    category: 'UV Makeup',
    status: 'published',
    date: '2024-11-02',
    images: [
      {
        src: rainbowLightningImg,
        alt: 'Rainbow Lightning - UV dots under eyes with rainbow body paint',
        title: 'Rainbow lightning',
        caption: 'Rainbow dots',
        description: 'Redhead with UV dots under eyes and rainbow body paint',
        position: 'center',
        aspectRatio: '3:4'
      }
    ],
    location: 'Psytrance Festival',
    description: 'Vibrant UV dots and rainbow body paint creating electric energy for the main stage. The precision dot work creates a constellation effect under blacklight—each carefully placed point becomes a star in its own galaxy. The rainbow body paint flows like liquid light across the skin, responding to every movement with chromatic shifts. This piece embodies the pure joy of neon artistry: bold, unapologetic, and designed to transform under UV illumination into something otherworldly.',
    excerpt: 'Electric rainbow UV art with precision dot constellation work—designed to transform under blacklight into pure liquid light',
    tags: ['UV', 'Rainbow', 'Neon', 'Electric', 'Psytrance', 'Blacklight', 'Dots', 'Body Paint', 'Precision', 'Constellation', 'Main Stage'],
    featured: false,
    order: 2
  },
  {
    id: 'electric-blue',
    slug: 'electric-blue',
    title: 'Electric blue',
    category: 'UV Makeup',
    status: 'published',
    date: '2024-11-15',
    images: [
      {
        src: electricBlueImg,
        alt: 'Electric Blue - rainbow UV face paint with jellyfish ear accessory',
        title: 'Electric blue',
        caption: 'Rainbow UV',
        description: 'Man with rainbow UV face paint and jellyfish ear accessory',
        position: 'center',
        aspectRatio: '4:3'
      }
    ],
    location: 'Berlin Underground',
    description: 'Bold rainbow UV face paint with unique jellyfish accessories, designed for the deep techno bunker. Berlin\'s underground rave scene demands makeup that can survive hours of intense dancing in humid, dark spaces. The rainbow patterns create visual interest without overwhelming—just enough color to catch the sporadic UV pulses while maintaining that industrial edge. The jellyfish accessory adds a playful marine element, bringing organic movement into the mechanical rave environment.',
    excerpt: 'Playful rainbow UV patterns with jellyfish accessories—built for Berlin\'s intense underground techno bunkers',
    tags: ['UV', 'Rainbow', 'Creative', 'Techno', 'Bold', 'Berlin', 'Underground', 'Bunker', 'Jellyfish', 'Accessories', 'Industrial', 'Rave'],
    featured: false,
    order: 3
  }
];