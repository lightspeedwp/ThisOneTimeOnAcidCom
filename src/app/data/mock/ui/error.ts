/**
 * @fileoverview Error UI data
 * @module data/mock/ui/error
 */

export const errorMessages = {
  default: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
  },
  browserExtension: {
    title: 'Browser extension interference',
    message: 'A browser extension may be interfering with the page. This is a common issue with ad blockers or privacy extensions.',
    suggestions: [
      'Try disabling browser extensions temporarily',
      'Use an incognito/private browsing window',
      'Refresh the page and try again',
      'The page should still function normally',
    ]
  },
  timeout: {
    title: 'Request timeout',
    message: 'The request took too long to complete. This might be due to a slow connection or server issues.',
    suggestions: [
      'Check your internet connection',
      'Try refreshing the page',
      'Wait a moment and try again',
    ]
  },
  network: {
    title: 'Network error',
    message: 'Unable to connect to the server. Please check your internet connection.',
    suggestions: [
      'Check your internet connection',
      'Try refreshing the page',
      'Check if other websites are working',
    ]
  },
  content: {
    title: 'Content loading error',
    message: 'Unable to load content from the content management system. The site will use static content instead.',
    suggestions: [
      'The page should still function with static content',
      'Try refreshing to reconnect to the CMS',
      'Content may be temporarily unavailable',
    ]
  },
  actions: {
    retry: 'Try Again',
    reload: 'Reload Page',
    debug: 'Debug Information (Development Only)'
  }
};

/**
 * Empty-state / "no results" messages used across archive, tag, and
 * category pages.  Keyed by content type.
 */
export const emptyStateMessages = {
  blog: {
    title: 'No posts found',
    message: 'Try adjusting your search or filters',
    categoryMessage: 'No posts in this category yet.',
    tagMessage: 'No posts with this tag yet.',
  },
  portfolio: {
    title: 'No entries found',
    message: 'No portfolio entries match the current filters.',
    categoryMessage: 'No entries in this category yet.',
    tagMessage: 'No entries with this tag yet.',
  },
  videos: {
    title: 'No videos found',
    message: 'No videos match the current filters.',
    categoryMessage: 'No videos in this category yet.',
    tagMessage: 'No videos with this tag yet.',
  },
  podcasts: {
    title: 'No episodes found',
    message: 'No episodes match the current filters.',
    categoryMessage: 'No episodes in this category yet.',
    tagMessage: 'No episodes with this tag yet.',
  },
  events: {
    title: 'No events found',
    message: 'No events match the current filters.',
    categoryMessage: 'No events in this category yet.',
    tagMessage: 'No events with this tag yet.',
  },
  search: {
    title: 'No results found',
    message: 'Try a different search term or browse our content.',
  },
};

/**
 * 404 Not Found page UI strings.
 */
export const notFoundUI = {
  code: '404',
  title: 'Page not found',
  description:
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let\u2019s get you back to the neon revelations.',
  actions: {
    home: 'Back to Home',
    back: 'Go Back',
  },
  aria: {
    homeButton: 'Return to homepage',
    backButton: 'Go back to previous page',
  },
};