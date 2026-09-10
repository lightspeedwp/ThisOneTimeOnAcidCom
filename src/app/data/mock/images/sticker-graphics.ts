/**
 * @fileoverview Sticker graphics data
 * Neon spiral/swirl graphics used as decorative elements
 * throughout the site (FAQ sections, empty states, etc.)
 *
 * @module data/mock/images/sticker-graphics
 * @version 8.0.0 - Added 13 new designs (sacred geometry, typography, neurodivergent, cycling, branding, Berlin, abstract)
 */

import stickerNeonSpiral from 'figma:asset/d3c29f089898fc451873371bcd41ade68c350411.png';
import stickerNeonVortex from 'figma:asset/ac73f3ba326b1cc61ce5148d7149960fa38c04ff.png';
import stickerCosmicEye from 'figma:asset/b7d9d7618ce02a21f909162ff86c3a02b944d982.png';
import stickerRainbowEye from 'figma:asset/c285a3307ef83e72ea05a995006e9a91cff04ecb.png';
import stickerGalaxyEyeDark from 'figma:asset/a3ff6861e08c46c3f53db108c18bf00f4dbb9958.png';
import stickerGalaxyEyeWave from 'figma:asset/ac03efc4e039fdaefbb30518323e2c68b4dad75f.png';
import stickerGalaxyEyeNeon from 'figma:asset/a59452b4a7623664d2bb471dda9573f2ff124510.png';
import stickerPsychedelicEye from 'figma:asset/3f4571770a4dfe7b87967ba18571e396b485c134.png';
import stickerUfoBreakfastEye from 'figma:asset/71428a4281ded92c596f8482bfc5f4f6c582be4f.png';
import stickerMushroomEye from 'figma:asset/e324dd2108aca23e468d101d18ad9f36227ecb24.png';
import stickerStarburstEye from 'figma:asset/9b30f18a5d667c6fb587a0835061f8c6665b02a0.png';
import stickerNeonSwirlEye from 'figma:asset/15cb1d54a3f2762edc5b82bfdcb272f950a764ce.png';
import stickerFractalEye from 'figma:asset/75e1bf4dac27bde05698ebec24ea1163d955794e.png';
import stickerPrismBurstEye from 'figma:asset/8907346263e2430d129cbb5a32b9909e5a3b8213.png';
import stickerStarfieldEye from 'figma:asset/c014c0ecba1501c870224d37c58f2b6e47f76ed0.png';
import stickerNeonWaveEye from 'figma:asset/4b6328b843a4a51e9a075b82c8c73fbe4b42f215.png';
import stickerAlienTrio from 'figma:asset/39eb8a562689f3a80dae8e93c87865781d23689f.png';
import stickerHalftoneEye from 'figma:asset/63ed7ef30e2ed2157c64997c1155cea83b13aec5.png';
import stickerMosaicEye from 'figma:asset/e8a07104860f015b916acaeb232a61777de2fedd.png';
import stickerAuroraVortexEye from 'figma:asset/e4ad6bb52b7e38d46cd2b7a75acf7ceab5e7874b.png';
import stickerImagineEye from 'figma:asset/1224e4c38d6535426ae19e8b73f8250863737d2a.png';
import stickerPaintDreamsEye from 'figma:asset/2cbb530ae9ca33032228346034623a7f83317bfc.png';
import stickerGeoPatternEye from 'figma:asset/84111c7a5216921c0e52a6f591197fbeac334288.png';
import stickerRainbowFlowEye from 'figma:asset/8ff60225169337b591efe035bc54d425662d7569.png';
import stickerCreateUniverseEye from 'figma:asset/c8d5d607f61330c5485683e00ba8bcf77a6df568.png';
import stickerAbstractBlocksEye from 'figma:asset/5c6da7d9c00527f5021ee1e01619d56ac61c94a0.png';
import stickerMakeupArtist from 'figma:asset/6095d8818a83e64a063161f9df091d561fde7105.png';

export interface StickerGraphic {
  id: string;
  src: string;
  alt: string;
  label: string;
}

/**
 * Collection of neon sticker graphics
 * Add more stickers here as they become available
 */
export const stickerGraphics: StickerGraphic[] = [
  {
    id: 'neon-spiral',
    src: stickerNeonSpiral,
    alt: 'Neon rainbow spiral graphic',
    label: 'Neon spiral',
  },
  {
    id: 'neon-vortex',
    src: stickerNeonVortex,
    alt: 'Neon blue and pink vortex graphic',
    label: 'Neon vortex',
  },
  {
    id: 'cosmic-eye',
    src: stickerCosmicEye,
    alt: 'Cosmic rainbow eye with paintbrush, stars and neon swirls',
    label: 'Cosmic eye',
  },
  {
    id: 'rainbow-paintbrush-eye',
    src: stickerRainbowEye,
    alt: 'Rainbow paintbrush eye with galaxy iris, purple starfield clouds and sparkles',
    label: 'Rainbow paintbrush eye',
  },
  {
    id: 'galaxy-eye-dark',
    src: stickerGalaxyEyeDark,
    alt: 'Rainbow paintbrush eye with galaxy iris on dark geometric crystal background',
    label: 'Galaxy eye dark',
  },
  {
    id: 'galaxy-eye-wave',
    src: stickerGalaxyEyeWave,
    alt: 'Rainbow paintbrush eye with galaxy iris on vibrant colourful wave background',
    label: 'Galaxy eye wave',
  },
  {
    id: 'galaxy-eye-neon',
    src: stickerGalaxyEyeNeon,
    alt: 'Rainbow paintbrush eye with galaxy iris on neon green and yellow gradient',
    label: 'Galaxy eye neon',
  },
  {
    id: 'psychedelic-eye',
    src: stickerPsychedelicEye,
    alt: 'Psychedelic rainbow paintbrush eye surrounded by swirling neon patterns and mandala flowers',
    label: 'Psychedelic eye',
  },
  {
    id: 'ufo-breakfast-eye',
    src: stickerUfoBreakfastEye,
    alt: 'Rainbow paintbrush eye with UFOs beaming down breakfast foods, pancakes, coffee and cereal',
    label: 'UFO breakfast eye',
  },
  {
    id: 'mushroom-landscape-eye',
    src: stickerMushroomEye,
    alt: 'Rainbow paintbrush eye with neon green spiral, psychedelic mushroom landscape and cosmic planets',
    label: 'Mushroom landscape eye',
  },
  {
    id: 'starburst-eye',
    src: stickerStarburstEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on radiating neon starburst rays',
    label: 'Starburst eye',
  },
  {
    id: 'neon-swirl-eye',
    src: stickerNeonSwirlEye,
    alt: 'Rainbow paintbrush eye with galaxy iris surrounded by flowing neon light swirls',
    label: 'Neon swirl eye',
  },
  {
    id: 'fractal-eye',
    src: stickerFractalEye,
    alt: 'Rainbow paintbrush eye with deep blue galaxy iris on fractal spiral and sparkle background',
    label: 'Fractal eye',
  },
  {
    id: 'prism-burst-eye',
    src: stickerPrismBurstEye,
    alt: 'Rainbow paintbrush eye with warm-toned iris on prismatic neon light burst background',
    label: 'Prism burst eye',
  },
  {
    id: 'starfield-eye',
    src: stickerStarfieldEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on warm purple-to-orange gradient starfield',
    label: 'Starfield eye',
  },
  {
    id: 'neon-wave-eye',
    src: stickerNeonWaveEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on vibrant neon green, cyan, yellow and pink swirling wave background with sparkles',
    label: 'Neon wave eye',
  },
  {
    id: 'alien-trio',
    src: stickerAlienTrio,
    alt: 'Three neon alien characters with big eyes, glitter makeup and psychedelic UV-reactive patterns on deep blue cosmic background',
    label: 'Alien trio',
  },
  {
    id: 'halftone-eye',
    src: stickerHalftoneEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on retro halftone dot pattern background in pink, cyan and purple',
    label: 'Halftone eye',
  },
  {
    id: 'mosaic-eye',
    src: stickerMosaicEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on geometric mosaic puzzle piece background with sparkles',
    label: 'Mosaic eye',
  },
  {
    id: 'aurora-vortex-eye',
    src: stickerAuroraVortexEye,
    alt: 'Eye with rainbow-tinted iris and red lashes on swirling neon aurora vortex background in green, pink and blue',
    label: 'Aurora vortex eye',
  },
  {
    id: 'imagine-eye',
    src: stickerImagineEye,
    alt: 'Rainbow paintbrush eye with galaxy iris and retro text Imagine Your Reality on pastel rainbow wave background',
    label: 'Imagine eye',
  },
  {
    id: 'paint-dreams-eye',
    src: stickerPaintDreamsEye,
    alt: 'Rainbow paintbrush eye with galaxy iris and retro text Paint Your Dreams on pastel rainbow swirl background with sparkles',
    label: 'Paint your dreams eye',
  },
  {
    id: 'geo-pattern-eye',
    src: stickerGeoPatternEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on vibrant pink and yellow geometric circle and diamond repeating pattern',
    label: 'Geo pattern eye',
  },
  {
    id: 'rainbow-flow-eye',
    src: stickerRainbowFlowEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on bold neon cyan, yellow, green and pink flowing wave background with sparkles',
    label: 'Rainbow flow eye',
  },
  {
    id: 'create-universe-eye',
    src: stickerCreateUniverseEye,
    alt: 'Rainbow paintbrush eye with galaxy iris and retro text Create Your Universe on pastel rainbow swirl background with sparkles',
    label: 'Create your universe eye',
  },
  {
    id: 'abstract-blocks-eye',
    src: stickerAbstractBlocksEye,
    alt: 'Rainbow paintbrush eye with galaxy iris on abstract colourful geometric blocks, clouds and cosmic shapes background',
    label: 'Abstract blocks eye',
  },
  {
    id: 'makeup-artist',
    src: stickerMakeupArtist,
    alt: 'Ash Shaw makeup artist illustration',
    label: 'Makeup artist',
  },
  {
    id: 'flower-of-life',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=90&fit=crop',
    alt: 'Sacred geometry flower of life mandala in electric green and hot pink with fractal petal patterns',
    label: 'Flower of life mandala',
  },
  {
    id: 'metatrons-cube',
    src: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&q=90&fit=crop',
    alt: 'Metatron\'s cube sacred geometry in royal blue and aqua cyan with interconnected spheres',
    label: 'Metatron\'s cube',
  },
  {
    id: 'sri-yantra',
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=90&fit=crop',
    alt: 'Sri Yantra sacred geometry fractal triangles in pure yellow and blazing orange',
    label: 'Sri Yantra fractal',
  },
  {
    id: 'dance-until-sunrise',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=90&fit=crop',
    alt: 'Neon typography sticker saying Dance until sunrise in hot pink and violet purple gradient',
    label: 'Dance until sunrise',
  },
  {
    id: '138-bpm',
    src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=90&fit=crop',
    alt: '138 BPM neon typography with heartbeat waveform in electric green and hot red',
    label: '138 BPM heartbeat',
  },
  {
    id: 'good-vibes-only',
    src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=90&fit=crop',
    alt: 'Good vibes only neon wavy typography in aqua cyan and pure yellow with sunshine rays',
    label: 'Good vibes only',
  },
  {
    id: 'adhd-brain',
    src: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&q=90&fit=crop',
    alt: 'ADHD neurodivergent pride brain with lightning bolts and fire in blazing orange and hot red',
    label: 'ADHD brain on fire',
  },
  {
    id: 'wired-different',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=90&fit=crop',
    alt: 'Wired different neurodivergent circuit board brain in royal blue and violet purple',
    label: 'Wired different',
  },
  {
    id: 'gravel-bike',
    src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=90&fit=crop',
    alt: 'Gravel bike silhouette with mountain landscape in electric green and aqua cyan',
    label: 'Gravel bike adventure',
  },
  {
    id: 'two-wheels-dancefloor',
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=90&fit=crop',
    alt: 'Bicycle wheel vinyl record hybrid with text Two wheels to the dancefloor in hot pink and pure yellow',
    label: 'Two wheels to the dancefloor',
  },
  {
    id: 'six-cats',
    src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=90&fit=crop',
    alt: 'Six cat silhouettes in circle around cannabis leaf with garden vines in electric green and hot pink',
    label: 'Six Cats green garden',
  },
  {
    id: 'berlin-calling',
    src: 'https://images.unsplash.com/photo-1566404394190-cda8c6209208?w=400&q=90&fit=crop',
    alt: 'Berlin TV Tower silhouette with techno soundwaves in royal blue and blazing orange with text Berlin calling',
    label: 'Berlin calling',
  },
  {
    id: 'hypnotic-spiral',
    src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&q=90&fit=crop',
    alt: 'Hypnotic multi-color spiral in electric green hot pink aqua cyan and violet purple',
    label: 'Hypnotic spiral',
  },
];

/**
 * Get a sticker graphic by index (wraps around if index exceeds count)
 * Useful for assigning different stickers to different pages
 */
export function getStickerForPage(pageId: string): StickerGraphic {
  const pageMap: Record<string, number> = {
    home: 0,
    about: 1,
    portfolio: 2,
    blog: 3,
    videos: 4,
    podcasts: 5,
    contact: 6,
    faq: 7,
    feedback: 8,
    'style-guide': 9,
    sitemap: 10,
    search: 11,
    privacy: 12,
    terms: 13,
    archive: 14,
    stickers: 0,
  };

  // Content type mapping
  if (pageId.startsWith('blog')) return stickerGraphics[3]; // Rainbow Paintbrush Eye
  if (pageId.startsWith('portfolio')) return stickerGraphics[2]; // Cosmic Eye
  if (pageId.startsWith('video')) return stickerGraphics[4]; // Galaxy Eye Dark
  if (pageId.startsWith('podcast')) return stickerGraphics[5]; // Galaxy Eye Wave
  if (pageId.startsWith('event')) return stickerGraphics[10]; // Starburst Eye

  const index = pageMap[pageId] !== undefined ? pageMap[pageId] : 0;
  return stickerGraphics[index % stickerGraphics.length];
}

/**
 * Get a random sticker graphic from the collection.
 * Uses a seeded-style approach: pass a string key to get a deterministic
 * but varied result (consistent per key across renders, different across keys).
 * If no key is provided, returns a truly random sticker.
 */
export function getRandomSticker(seed?: string): StickerGraphic {
  if (!seed) {
    const randomIndex = Math.floor(Math.random() * stickerGraphics.length);
    return stickerGraphics[randomIndex];
  }

  // Simple hash from seed string for deterministic selection
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % stickerGraphics.length;
  return stickerGraphics[index];
}