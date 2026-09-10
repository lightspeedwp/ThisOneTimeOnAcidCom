/**
 * @fileoverview Color palette types and re-exports
 * 
 * All palette data has been moved to modular files:
 * - /data/mock/color-palettes/data.ts — All 33 palettes
 * - /data/mock/color-palettes/index.ts — Category filters (core, monochrome, complementary, systems, thematic)
 * 
 * This file exports TypeScript interfaces and re-exports palette data for backward compatibility.
 * 
 * @module data/mock/color-palettes
 * @version 2.0.0 (modular split)
 */

/**
 * Single color within a palette
 */
export interface ColorPaletteColor {
  name: string;
  hex: string;
  /** Optional description or usage context */
  description?: string;
}

/**
 * Complete color palette with metadata
 */
export interface ColorPalette {
  id: string;
  name: string;
  description?: string;
  colors: ColorPaletteColor[];
  /** Tags for filtering/searching */
  tags?: string[];
  /** Interface design inspiration ideas (1-3 per palette) */
  interfaceIdeas?: string[];
}

/**
 * All Color Palettes (re-exported from modular structure)
 */
export { colorPalettes } from './color-palettes/index';

/**
 * Category-filtered palette exports (for optimized imports)
 */
export {
  coreAndGradients,
  monochromeSpectrums,
  complementaryPairs,
  systemPalettes,
  thematicPalettes,
} from './color-palettes/index';
