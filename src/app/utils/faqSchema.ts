/**
 * @fileoverview FAQ Schema.org structured data generator
 *
 * Generates JSON-LD FAQPage schema for SEO from FaqItem arrays.
 * Injected into the document head and cleaned up on unmount.
 *
 * @module utils/faqSchema
 * @version 1.0.0
 */

import type { FaqItem } from '../data/mock/sections/faq';

const FAQ_SCHEMA_ID = 'faq-schema-jsonld';

/**
 * Build a FAQPage JSON-LD object from an array of FAQ items.
 */
export function buildFaqSchema(faqs: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Inject FAQ JSON-LD into the document head.
 * Returns a cleanup function that removes the script tag.
 */
export function injectFaqSchema(faqs: FaqItem[]): () => void {
  if (faqs.length === 0) return () => {};

  // Remove any existing FAQ schema first
  removeFaqSchema();

  const schema = buildFaqSchema(faqs);
  const script = document.createElement('script');
  script.id = FAQ_SCHEMA_ID;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => removeFaqSchema();
}

/**
 * Remove FAQ schema from the document head.
 */
export function removeFaqSchema(): void {
  const existing = document.getElementById(FAQ_SCHEMA_ID);
  if (existing) existing.remove();
}
