/**
 * @fileoverview Post Type Mappings for Design System Block Library
 * Defines context and thematic constraints for each post type.
 */

export var postTypeMappings = {
  blog: {
    id: 'blog',
    label: 'Blog Post',
    theme: 'dark',
    neonColor: 'neon-pink',
    neonHex: '#FF10F0',
    containerWidth: '800px',
    typography: {
      heading: 'Playfair Display',
      body: 'Inter'
    }
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio Entry',
    theme: 'dark',
    neonColor: 'neon-green',
    neonHex: '#39FF14',
    containerWidth: '100%',
    typography: {
      heading: 'Righteous',
      body: 'Inter'
    }
  },
  video: {
    id: 'video',
    label: 'Video Showcase',
    theme: 'dark',
    neonColor: 'neon-blue',
    neonHex: '#1F51FF',
    containerWidth: '1200px',
    typography: {
      heading: 'Playfair Display',
      body: 'Inter'
    }
  },
  podcast: {
    id: 'podcast',
    label: 'Podcast Episode',
    theme: 'dark',
    neonColor: 'neon-purple',
    neonHex: '#BE00FE',
    containerWidth: '800px',
    typography: {
      heading: 'Playfair Display',
      body: 'Inter'
    }
  },
  event: {
    id: 'event',
    label: 'Event Page',
    theme: 'brutalist',
    neonColor: 'neon-orange',
    neonHex: '#FF5F1F',
    containerWidth: '100%',
    typography: {
      heading: 'Righteous',
      body: 'monospace'
    }
  }
};
