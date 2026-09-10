/**
 * @fileoverview Homepage UI data
 * @module data/mock/ui/home
 */

export const homeUI = {
  loading: {
    toast: "Updating content...",
    ariaLabel: "Loading homepage content"
  },
  error: {
    title: "Content Temporarily Unavailable",
    message: "There was an issue loading the homepage content. Please try again.",
    retry: "Try Again",
    refresh: "Refresh Page"
  },
  sections: {
    blogPreview: {
      title: "Psytrance & Makeup Blog",
      description: "Discover tutorials, behind-the-scenes stories, and creative inspiration from the world of global psytrance and UV makeup artistry.",
      error: "Unable to load blog posts at the moment.",
      visitBlog: "Visit Blog Page",
      viewAll: "View All Blog Posts",
      ctaAriaLabel: "View all blog posts"
    },
    featured: {
      title: "Featured Psytrance Work",
      description: "Experience the electric artistry and explosive passion behind each creation — from vibrant festival face art to high-voltage UV-reactive designs that amplify the energy of the trance floor.",
      empty: "No featured work available",
      cta: "View Full Portfolio",
      ctaAriaLabel: "Navigate to full portfolio page to view all makeup artistry work"
    },
    uvMakeup: {
      title: "UV Makeup Art",
      description: "Electrifying UV-reactive makeup designs that pulse under blacklight, engineered for festivals, underground raves, and neon nightlife.",
      cta: "See More UV Makeup",
      ctaAriaLabel: "Navigate to Portfolio page to view UV makeup gallery"
    },
    testimonials: {
      title: "Love from the Trance Floor",
      description: "Real vibes from dancers and friends I've painted at festivals, parties, and underground raves across the globe.",
      navAriaLabelPrev: "Previous testimonial",
      navAriaLabelNext: "Next testimonial",
      dotAriaLabel: "Go to slide"
    }
  }
};
