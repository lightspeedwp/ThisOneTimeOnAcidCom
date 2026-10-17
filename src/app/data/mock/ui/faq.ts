/**
 * @fileoverview FAQ page UI strings
 * @module data/mock/ui/faq
 * @version 1.0.0
 */

export const faqPageUI = {
  title: 'Frequently asked questions',
  subtitle: 'Everything you need to know about Ash\u2019s art, process, and this site \u2014 all in one place.',
  searchPlaceholder: 'Search questions\u2026',
  searchAriaLabel: 'Search FAQs',
  noResults: 'No matching questions found. Try a different search term.',
  allCategoriesLabel: 'All',
  resultCount: (count: number) => `${count} question${count !== 1 ? 's' : ''}`,
  seo: {
    title: 'FAQ | Ash Shaw',
    description: 'Find answers to common questions about Ash Shaw\u2019s neon and UV makeup artistry, festival work, and portfolio.',
  },
};