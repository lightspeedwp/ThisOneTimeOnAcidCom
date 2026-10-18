/**
 * PostCSS Configuration
 *
 * PostCSS processes CSS with JavaScript plugins.
 * Currently configured with autoprefixer only for cross-browser vendor prefix support.
 *
 * Architecture notes:
 * - All site styling uses semantic BEM classes defined in /styles/globals.css and
 *   /styles/blocks/*.css (Decision STYLE-001: Enforce BEM-only)
 * - Tailwind CSS has been removed from the project in favor of strict BEM architecture
 * - autoprefixer handles final vendor-prefix output (e.g. -webkit-*, -moz-*)
 */
export default {
  plugins: {
    autoprefixer: {}, // Adds vendor prefixes for cross-browser compatibility
  },
};