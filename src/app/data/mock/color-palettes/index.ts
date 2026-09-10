/**
 * @fileoverview Color palettes category filters and exports
 * Provides category-specific palette arrays for route-level code splitting
 * while maintaining backward compatibility with existing imports
 * 
 * @module data/mock/color-palettes
 * @version 1.0.0
 */

import { ColorPalette } from './';
import { colorPalettesData as allPalettes } from './data';

/**
 * Brand Core & Signature Gradients (6 palettes)
 * Ash Shaw's primary brand colors and signature gradient combinations
 */
export var coreAndGradients: ColorPalette[] = (function() {
  var result: ColorPalette[] = [];
  var coreIds = [
    'ash-shaw-core',
    'cyberpunk-gradient',
    'toxic-lime-gradient',
    'solar-flare-gradient',
    'hyperpop-animated',
    'neon-core'
  ];
  var i;
  var j;
  var isMatch;
  
  for (i = 0; i < allPalettes.length; i = i + 1) {
    isMatch = false;
    for (j = 0; j < coreIds.length; j = j + 1) {
      if (allPalettes[i].id === coreIds[j]) {
        isMatch = true;
        j = coreIds.length; // Exit loop
      }
    }
    if (isMatch) {
      result[result.length] = allPalettes[i];
    }
  }
  return result;
})();

/**
 * Monochrome Spectrums (2 palettes)
 * Pink and blue 5-shade progressions
 */
export var monochromeSpectrums: ColorPalette[] = (function() {
  var result: ColorPalette[] = [];
  var monoIds = ['monochrome-pink', 'monochrome-blue'];
  var i;
  var j;
  var isMatch;
  
  for (i = 0; i < allPalettes.length; i = i + 1) {
    isMatch = false;
    for (j = 0; j < monoIds.length; j = j + 1) {
      if (allPalettes[i].id === monoIds[j]) {
        isMatch = true;
        j = monoIds.length; // Exit loop
      }
    }
    if (isMatch) {
      result[result.length] = allPalettes[i];
    }
  }
  return result;
})();

/**
 * Complementary Pairs (2 palettes)
 * Orange/Blue and Pink/Green high-contrast combinations
 */
export var complementaryPairs: ColorPalette[] = (function() {
  var result: ColorPalette[] = [];
  var compIds = ['complementary-orange-blue', 'complementary-pink-green'];
  var i;
  var j;
  var isMatch;
  
  for (i = 0; i < allPalettes.length; i = i + 1) {
    isMatch = false;
    for (j = 0; j < compIds.length; j = j + 1) {
      if (allPalettes[i].id === compIds[j]) {
        isMatch = true;
        j = compIds.length; // Exit loop
      }
    }
    if (isMatch) {
      result[result.length] = allPalettes[i];
    }
  }
  return result;
})();

/**
 * Temperature & Background Systems (4 palettes)
 * Warm sunset, cool ocean, checkerboard, and aurora mesh
 */
export var systemPalettes: ColorPalette[] = (function() {
  var result: ColorPalette[] = [];
  var sysIds = [
    'warm-neon-sunset',
    'cool-neon-ocean',
    'contrast-checkerboard',
    'aurora-mesh'
  ];
  var i;
  var j;
  var isMatch;
  
  for (i = 0; i < allPalettes.length; i = i + 1) {
    isMatch = false;
    for (j = 0; j < sysIds.length; j = j + 1) {
      if (allPalettes[i].id === sysIds[j]) {
        isMatch = true;
        j = sysIds.length; // Exit loop
      }
    }
    if (isMatch) {
      result[result.length] = allPalettes[i];
    }
  }
  return result;
})();

/**
 * Thematic & Image-Inspired (19 palettes)
 * All remaining palettes (cyberpunk, festival, rainbow, psychedelic, etc.)
 */
export var thematicPalettes: ColorPalette[] = (function() {
  var result: ColorPalette[] = [];
  var excludeIds = [
    // Core & gradients
    'ash-shaw-core',
    'cyberpunk-gradient',
    'toxic-lime-gradient',
    'solar-flare-gradient',
    'hyperpop-animated',
    'neon-core',
    // Monochrome
    'monochrome-pink',
    'monochrome-blue',
    // Complementary
    'complementary-orange-blue',
    'complementary-pink-green',
    // Systems
    'warm-neon-sunset',
    'cool-neon-ocean',
    'contrast-checkerboard',
    'aurora-mesh'
  ];
  var i;
  var j;
  var isExcluded;
  
  for (i = 0; i < allPalettes.length; i = i + 1) {
    isExcluded = false;
    for (j = 0; j < excludeIds.length; j = j + 1) {
      if (allPalettes[i].id === excludeIds[j]) {
        isExcluded = true;
        j = excludeIds.length; // Exit loop
      }
    }
    if (!isExcluded) {
      result[result.length] = allPalettes[i];
    }
  }
  return result;
})();

/**
 * All Color Palettes (33 total)
 * Re-export the complete palette array for backward compatibility
 */
export { colorPalettesData as colorPalettes } from './data';
