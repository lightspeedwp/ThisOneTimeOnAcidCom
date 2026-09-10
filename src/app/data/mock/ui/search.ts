/**
 * @fileoverview Search UI strings
 * @module data/mock/ui/search
 * @version 2.0.0 — tabbed content types, suggestions
 */

export const searchUI = {
  placeholder: 'Search everything...',
  ariaLabel: 'Search all content',
  keyboardHint: 'Ctrl+K',
  clearLabel: 'Clear search',
  resultsLabel: 'Number of results:',
  noResults: {
    title: 'No results found',
    message: 'Try different keywords or browse the categories below.',
  },
  filterLabels: {
    contentType: 'Content Type',
    sortBy: 'Sort By',
    category: 'Category',
    clearAll: 'Clear All',
    showResults: 'Show Results',
    filters: 'Filters',
  },
  sortOptions: [
    { value: 'relevance', label: 'Relevance' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Popular' },
    { value: 'featured', label: 'Featured' },
    { value: 'alphabetical', label: 'A-Z' },
  ],
  contentTypes: [
    { value: 'page', label: 'Pages' },
    { value: 'blog', label: 'Posts' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'video', label: 'Videos' },
    { value: 'podcast', label: 'Podcasts' },
    { value: 'event', label: 'Events' },
    { value: 'faq', label: 'FAQs' },
  ],
  /** Tab labels for tabbed content type view */
  tabAll: 'All',
  /** Suggested search terms shown when input is empty */
  suggestions: [
    'neon',
    'festival',
    'UV makeup',
    'Berlin',
    'face paint',
    'editorial',
    'glitter',
    'tutorial',
  ],
  suggestionsLabel: 'Try searching for:',
};