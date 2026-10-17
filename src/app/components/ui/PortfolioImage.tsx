/**
 * @fileoverview Portfolio Image Component for handling both regular URLs and Figma imports
 * 
 * Handles mixed image sources including:
 * - figma:asset/ URLs that need to be imported
 * - https:// URLs that can be used directly
 * - Provides fallback support and error handling
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Optional image optimisation via preset prop
 */

import React from 'react';
import { OptimizedImage } from './OptimizedImage';
import type { ImagePreset } from './OptimizedImage';

// Import the Jungle Festival images
import jungleImage1 from 'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png';
import jungleImage2 from 'figma:asset/1cd08d3825ac7cc423a4672f8ed279139fc99d0a.png';
import jungleImage3 from 'figma:asset/3eb83eb2d4eb493b80283c1b75770d8893b2fc6a.png';

// Import the Nation of Gondwana Festival images
import gondwanaImage1 from 'figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png';
import gondwanaImage2 from 'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png';
import gondwanaImage3 from 'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png';

// Import Origin Festival 2025 images
import originImage1 from 'figma:asset/e46fceb6809b8f1b7ef5c578d40578eadf301207.png';
import originImage2 from 'figma:asset/2678f2e48d60b8ccd6855469149ffc2cd8877e1c.png';
import originImage3 from 'figma:asset/04aa88bd7a81e3f14ceb68f980492bf374b041db.png';

// Import Thailand portfolio images
import thailandLostParadise from 'figma:asset/e7ee10c85c112ab4acfc9e54087974a5faae5966.png';
import thailandEdenParadise from 'figma:asset/3c496f3b8a5671dd00830f80a9a061ddf687e849.png';
import thailandEdenShishi from 'figma:asset/2d37a7cd55fe518f7eb8124fa25a2382be67f948.png';

// Import Nail Art portfolio images
import nailRainbowFusion from 'figma:asset/7c570c5291977a816c8152a098cd6693cff22dbd.png';
import nailGalaxy from 'figma:asset/1ec0ba217cad06e2cff662a25a050b0401d1092a.png';
import nailGradientDreams from 'figma:asset/deb2b4ab4cb25c5e47b960708fce6ea552ee6039.png';

// Import Shankra Festival (Swiss) images
import shankraConnection from 'figma:asset/d35493e2be08017199b3d1523d516a996ec97a5d.png';
import shankraAlpineBliss from 'figma:asset/e43f2a86f8b38d1777428264c8c9126d07a9ef75.png';
import shankraMountainRainbow from 'figma:asset/80d0d3af448e4969dc796d00e91c30d3648cd9c4.png';

// Import Reiserfieber (Swiss) images
import reiserfieberAlpineGlow from 'figma:asset/33024fb05609d4a4545be47508d2ad3595f143c4.png';
import reiserfieberMountainSpirit from 'figma:asset/280168cf45339af581c4065d1f6728ea2de6ff02.png';
import reiserfieberFestivalJoy from 'figma:asset/71597fc19386bc69fb2144851d752977dfd3693e.png';

/**
 * Map of figma:asset URLs to imported assets
 */
const FIGMA_ASSET_MAP: Record<string, string> = {
  // Jungle Festival Koh Phangan images
  'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png': jungleImage1,
  'figma:asset/1cd08d3825ac7cc423a4672f8ed279139fc99d0a.png': jungleImage2,
  'figma:asset/3eb83eb2d4eb493b80283c1b75770d8893b2fc6a.png': jungleImage3,
  
  // Nation of Gondwana Festival images
  'figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png': gondwanaImage1,
  'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png': gondwanaImage2,
  'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png': gondwanaImage3,

  // Origin Festival 2025 images
  'figma:asset/e46fceb6809b8f1b7ef5c578d40578eadf301207.png': originImage1,
  'figma:asset/2678f2e48d60b8ccd6855469149ffc2cd8877e1c.png': originImage2,
  'figma:asset/04aa88bd7a81e3f14ceb68f980492bf374b041db.png': originImage3,

  // Thailand portfolio images
  'figma:asset/e7ee10c85c112ab4acfc9e54087974a5faae5966.png': thailandLostParadise,
  'figma:asset/3c496f3b8a5671dd00830f80a9a061ddf687e849.png': thailandEdenParadise,
  'figma:asset/2d37a7cd55fe518f7eb8124fa25a2382be67f948.png': thailandEdenShishi,

  // Nail Art portfolio images
  'figma:asset/7c570c5291977a816c8152a098cd6693cff22dbd.png': nailRainbowFusion,
  'figma:asset/1ec0ba217cad06e2cff662a25a050b0401d1092a.png': nailGalaxy,
  'figma:asset/deb2b4ab4cb25c5e47b960708fce6ea552ee6039.png': nailGradientDreams,

  // Shankra Festival (Swiss) images
  'figma:asset/d35493e2be08017199b3d1523d516a996ec97a5d.png': shankraConnection,
  'figma:asset/e43f2a86f8b38d1777428264c8c9126d07a9ef75.png': shankraAlpineBliss,
  'figma:asset/80d0d3af448e4969dc796d00e91c30d3648cd9c4.png': shankraMountainRainbow,

  // Reiserfieber (Swiss) images
  'figma:asset/33024fb05609d4a4545be47508d2ad3595f143c4.png': reiserfieberAlpineGlow,
  'figma:asset/280168cf45339af581c4065d1f6728ea2de6ff02.png': reiserfieberMountainSpirit,
  'figma:asset/71597fc19386bc69fb2144851d752977dfd3693e.png': reiserfieberFestivalJoy,
};

/**
 * Props interface for PortfolioImage
 */
interface PortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  /** Optional optimisation preset — when set, the image is Canvas-optimised */
  preset?: ImagePreset;
}

/**
 * Portfolio Image component that handles both regular URLs and Figma asset imports.
 * Optionally applies runtime Canvas optimisation when a `preset` prop is provided.
 * 
 * @param props - Component properties
 * @returns Image element with proper source resolution
 */
export function PortfolioImage({ 
  src, 
  alt, 
  className = "", 
  style, 
  onLoad, 
  onError,
  preset,
}: PortfolioImageProps) {
  // Resolve the image source with comprehensive fallback handling
  const resolvedSrc = (() => {
    // If it's a figma:asset/ URL, try to resolve it
    if (src.startsWith('figma:asset/')) {
      const mapped = FIGMA_ASSET_MAP[src];
      if (mapped) {
        return mapped;
      } else {
        // Figma asset not found, provide a contextual fallback based on filename
        // In development we log this in the debug section below
        
        // Provide different fallbacks based on likely content type
        const altLower = alt.toLowerCase();
        const isNail = altLower.includes('nail');
        const isFusion = altLower.includes('fusion');
        const isUv = altLower.includes('uv');
        const isNeon = altLower.includes('neon');
        const isFestival = altLower.includes('festival');
        
        if (isNail || isFusion) {
          return 'https://images.unsplash.com/photo-1590926918555-c058b85940d6?w=800'; // Nail art fallback
        } else if (isUv || isNeon) {
          return 'https://images.unsplash.com/photo-1602494518965-195c6ec1c980?w=800'; // UV makeup fallback
        } else if (isFestival) {
          return 'https://images.unsplash.com/photo-1603300382284-72ddf4985216?w=800'; // Festival makeup fallback
        } else {
          return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'; // Default portfolio fallback
        }
      }
    }
    // Return the original URL for regular images
    return src;
  })();
  
  // Debug logging removed — import.meta.env.DEV crashes this bundler

  // When a preset is specified, delegate to OptimizedImage for Canvas optimisation
  if (preset) {
    return (
      <OptimizedImage
        src={resolvedSrc}
        alt={alt}
        className={className}
        preset={preset}
      />
    );
  }
  
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={onError}
    />
  );
}

/**
 * Hook to get resolved image URL for CSS background-image usage
 * 
 * @param src - Image source URL (can be figma:asset/ or regular URL)
 * @returns Resolved image URL for CSS usage
 */
export function usePortfolioImageUrl(src: string): string {
  // Resolve the image source with comprehensive fallback handling
  const resolvedSrc = (() => {
    // If it's a figma:asset/ URL, try to resolve it
    if (src.startsWith('figma:asset/')) {
      const mapped = FIGMA_ASSET_MAP[src];
      if (mapped) {
        return mapped;
      } else {
        // Figma asset not found, provide a contextual fallback
        // In development we log this in the debug section below
        
        // Provide different fallbacks based on likely content type (simple heuristics)
        const srcLower = src.toLowerCase();
        const hasNail = srcLower.includes('nail');
        const hasHash1 = srcLower.includes('9e303d');
        const hasHash2 = srcLower.includes('deb2b4');
        const hasHash3 = srcLower.includes('1ec0ba');
        const isNailCategory = hasNail || hasHash1 || hasHash2 || hasHash3;
        
        const hasUv = srcLower.includes('uv');
        const hasNeon = srcLower.includes('neon');
        const hasHash4 = srcLower.includes('3f84a6');
        const isUvCategory = hasUv || hasNeon || hasHash4;
        
        const hasFestival = srcLower.includes('festival');
        const hasHash5 = srcLower.includes('2fed1a');
        const hasHash6 = srcLower.includes('331df4');
        const isFestivalCategory = hasFestival || hasHash5 || hasHash6;
        
        if (isNailCategory) {
          return 'https://images.unsplash.com/photo-1590926918555-c058b85940d6?w=800'; // Nail art fallback
        } else if (isUvCategory) {
          return 'https://images.unsplash.com/photo-1602494518965-195c6ec1c980?w=800'; // UV makeup fallback
        } else if (isFestivalCategory) {
          return 'https://images.unsplash.com/photo-1603300382284-72ddf4985216?w=800'; // Festival makeup fallback
        } else {
          return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'; // Default portfolio fallback
        }
      }
    }
    // Return the original URL for regular images
    return src;
  })();
  
  // Debug logging removed — import.meta.env.DEV crashes this bundler
  
  return resolvedSrc;
}

export default PortfolioImage;