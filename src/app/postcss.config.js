/**
 * PostCSS Configuration
 *
 * PostCSS processes CSS with JavaScript plugins.
 * Currently configured with autoprefixer only for cross-browser vendor prefix support.
 *
 * Architecture notes:
 * - Tailwind CSS V4 is processed via the Vite plugin (vite.config.ts), NOT here.
 *   Do not add a `tailwindcss` entry to this plugins object.
 * - All site styling uses semantic BEM classes defined in /styles/globals.css and
 *   /styles/blocks/*.css — no Tailwind utility classes are used in components.
 * - autoprefixer handles final vendor-prefix output (e.g. -webkit-*, -moz-*).
 */
export default {
  plugins: {
    autoprefixer: {}, // Adds vendor prefixes for cross-browser compatibility
  },
};