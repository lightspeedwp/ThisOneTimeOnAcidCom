/**
 * @fileoverview Blog UI data
 * @module data/mock/ui/blog
 */

export const blogUI = {
  listing: {
    header: {
      title: "Makeup Artistry Blog",
      description: "My story of dance and makeup art. Sharing inspirations, techniques, and the creative adventures that shape my work."
    }
  },
  post: {
    notFound: {
      title: "Blog Post Not Found",
      message: (slug: string) => `The blog post "${slug}" could not be found. It may have been moved or deleted.`,
      errorMessage: (error: string) => `Error loading blog post: ${error}`,
      backButton: "Back to Blog",
      viewAllButton: "View All Blog Posts"
    },
    navigation: {
      backToBlog: "Back to Blog"
    },
    meta: {
      article: "Article",
      readTime: (min: number) => `${min} min read`
    },
    sections: {
      tags: {
        title: "Tagged Topics",
        noTags: "No tags assigned to this article."
      },
      share: {
        title: "Share This Article"
      },
      author: {
        title: "About the Author"
      },
      related: {
        title: "Explore More Articles",
        description: "Discover more makeup artistry insights, tutorials, and behind-the-scenes content.",
        viewAllButton: "View All Articles"
      }
    }
  }
};
