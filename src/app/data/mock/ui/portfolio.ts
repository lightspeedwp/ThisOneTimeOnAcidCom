/**
 * @fileoverview Portfolio UI data
 * @module data/mock/ui/portfolio
 */

export const portfolioUI = {
  detail: {
    notFound: {
      title: "Portfolio Entry Not Found",
      message: "The portfolio entry you're looking for doesn't exist or has been moved.",
      backButton: "Back to Portfolio"
    },
    navigation: {
      backToGallery: "Portfolio Gallery",
      viewGallery: "View Gallery",
      scrollDown: "Scroll down to view portfolio details and story"
    },
    sections: {
      story: {
        title: "The Story Behind the Art",
        extendedDescription: [
          "This artwork represents a unique moment in time, where creativity meets celebration and connection. Each brushstroke and color choice was carefully considered to enhance the natural beauty and express the vibrant energy of the moment.",
          "Working with UV-reactive paints and traditional makeup techniques, I create designs that transform under different lighting conditions, bringing an element of magic and surprise to festival environments. The goal is always to create art that not only looks stunning but also makes the wearer feel confident and radiant."
        ],
        quote: "Makeup is more than just art - it's a way to connect with people and create moments of joy and wonder."
      },
      gallery: {
        title: "Visual Gallery"
      },
      event: {
        title: "Event Details",
        infoTitle: "Event Information",
        tagsTitle: "Tags & Themes"
      },
      related: {
        title: "Related Work",
        readArticle: "Read Article"
      },
      feedback: {
        heading: "What people say"
      }
    },
    share: {
      label: "Share this work:"
    }
  },
  listing: {
    header: {
      title: "Portfolio",
      subtitle: "A journey through colour, creativity, and connection",
      description: "A visual journey through my adventures. From festival stages to Berlin nights, exploring connection and color in every look."
    },
    loading: {
      message: "Updating content..."
    },
    error: {
      title: "Unable to Load Portfolio",
      message: "There was an issue loading the portfolio content. Please try again.",
      retry: "Try Again",
      refresh: "Refresh Page"
    },
    empty: {
      title: "Portfolio Coming Soon",
      message: "Portfolio content is being prepared and will be available shortly. Check back soon to explore the latest makeup artistry work.",
      action: "Check for Updates"
    }
  },
  lightbox: {
    close: "Close lightbox",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    gallery: "Gallery",
    hide: "Hide",
    thumbnails: {
      show: "Show thumbnails",
      hide: "Hide thumbnails"
    },
    navigation: {
      next: "Next image",
      previous: "Previous image",
      hintDesktop: "Arrow keys or swipe",
      hintMobile: "Swipe",
      hintZoom: "Tap to zoom",
      hintKeyboard: "Press Z to zoom • Press T for gallery •",
      hintClose: "Press Esc to close"
    }
  }
};