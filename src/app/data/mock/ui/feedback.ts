/**
 * @fileoverview Feedback (testimonials) page UI strings
 * @module data/mock/ui/feedback
 * @version 1.0.0
 */

export const feedbackPageUI = {
  title: 'Feedback',
  subtitle: 'What people say about the art, the experience, and the energy.',
  allCategoriesLabel: 'All',
  searchPlaceholder: 'Search feedback\u2026',
  noResults: 'No matching feedback found.',
  resultCount: (count: number) => `${count} piece${count !== 1 ? 's' : ''} of feedback`,
  seo: {
    title: 'Feedback | Ash Shaw',
    description: 'Read what festival-goers and collaborators say about Ash Shaw\u2019s neon and UV makeup artistry.',
  },
};
