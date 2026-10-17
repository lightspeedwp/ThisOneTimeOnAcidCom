/**
 * @fileoverview Utility functions for className manipulation and styling
 * Provides a cn (className) utility function for combining and deduplicating
 * CSS classes using a zero-dependency inline implementation.
 * 
 * Replaces the external `clsx` package to eliminate a potential esm.sh
 * resolution issue that may have caused the async_hooks runtime error.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.1.0
 */

/** Supported class value types (compatible with clsx API) */
type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, unknown>;

/**
 * Inline clsx-compatible implementation.
 * Recursively resolves strings, objects, and arrays into a flat class list.
 */
function toClassString(val: ClassValue): string {
  if (!val && val !== 0) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    let result = '';
    for (let i = 0; i < val.length; i++) {
      const resolved = toClassString(val[i]);
      if (resolved) {
        if (result) result += ' ';
        result += resolved;
      }
    }
    return result;
  }
  if (typeof val === 'object') {
    let result = '';
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key) && val[key]) {
        if (result) result += ' ';
        result += key;
      }
    }
    return result;
  }
  return '';
}

/**
 * Utility function to combine and deduplicate CSS class names
 * 
 * Zero-dependency replacement for clsx. Combines multiple class values.
 * 
 * @param {...ClassValue[]} inputs - Variable number of class values to combine
 *   Can include strings, objects, arrays, and conditional classes
 * 
 * @returns {string} Merged className string
 * 
 * @example
 * // Basic usage with strings
 * cn('card', 'card--featured')
 * // Returns: "card card--featured"
 * 
 * @example
 * // Conditional classes (BEM modifiers)
 * cn('pagination__link', isActive && 'pagination__link--active', className)
 * 
 * @example
 * // Object syntax
 * cn('base-class', { 'active-class': isActive, 'disabled-class': isDisabled })
 * 
 * @performance
 * - Efficient class string construction
 * - No external dependencies
 * - Minimal runtime overhead
 */
export function cn(...inputs: ClassValue[]): string {
  return toClassString(inputs);
}
