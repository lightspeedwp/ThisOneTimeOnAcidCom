import { defineConfig } from 'vite';

// Storybook must not discover or merge the application Vite configuration.
// The builder supplies its React plugin; this file intentionally contains no
// Sentry, Netlify, Tailwind or application-entry plugins.
export default defineConfig({});
