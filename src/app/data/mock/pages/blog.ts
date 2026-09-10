/**
 * @fileoverview Blog page content data
 * 
 * @module data/mock/pages/blog
 */

export const blogPageContent = {
  seo: {
    title: "Insights | Ash Shaw",
    description: "Explore tutorials, behind-the-scenes insights, and creative inspiration from the world of festival and UV makeup artistry."
  },
  hero: {
    title: "The Makeup Journal",
    subtitle: "Stories, Tips & Inspiration",
    description: "Dive into the world of festival makeup, behind-the-scenes stories, and expert tips for creating your own vibrant looks."
  },
  sidebar: {
    categoriesTitle: "Categories",
    tagsTitle: "Popular Tags",
    searchPlaceholder: "Search posts..."
  },
  newsletter: {
    title: "Stay Inspired",
    description: "Subscribe to get the latest looks and tutorials delivered to your inbox.",
    placeholder: "Your email address",
    buttonText: "Subscribe"
  }
};

/**
 * Author bio data for the blog post author section.
 * Social icon components (Camera, ExternalLink) are assigned in the component
 * because they are code concerns, not content concerns.
 */
export const authorBio = {
  name: 'Ash Shaw',
  bio: "Ash Shaw is a visionary makeup artist known for his vibrant, neon-infused designs and 'Atomic Black' aesthetic. With a passion for festival culture and UV artistry, he transforms faces into living canvases of colour and energy.",
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/feedmymedia' },
    { name: 'Facebook', url: 'https://www.facebook.com/ash.shaw/' },
  ],
};