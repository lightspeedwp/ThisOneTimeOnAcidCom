/**
 * Image Manifest Utility
 * 
 * Resolves pre-optimized image paths from the build-time manifest.
 * Used by OptimizedImage to skip runtime Canvas processing when possible.
 */

// This would be imported from a generated JSON file in a real build
// import manifest from './imageManifest.json';

interface OptimizedAsset {
  path: string;
  width: number;
  height?: number;
  size?: number;
  srcSet?: string; // Optional srcSet string
}

interface Manifest {
  [originalSrc: string]: {
    [preset: string]: OptimizedAsset;
  };
}

// Mock manifest - in production this would be populated by the build script
const manifest: Manifest = {};

/**
 * lookupOptimizedAsset
 * 
 * Checks if a pre-optimized version exists for the given src and preset.
 */
export function lookupOptimizedAsset(src: string, preset: string): OptimizedAsset | null {
  // Extract ID from figma:asset path if possible
  // Format: figma:asset/ID.png
  const id = src.replace('figma:asset/', '').split('.')[0];
  
  if (manifest[id] && manifest[id][preset]) {
    return manifest[id][preset];
  }
  
  return null;
}

/**
 * Register manual overrides (useful for testing or manual optimization)
 */
export function registerOptimizedAsset(id: string, preset: string, asset: OptimizedAsset) {
  if (!manifest[id]) {
    manifest[id] = {};
  }
  manifest[id][preset] = asset;
}
