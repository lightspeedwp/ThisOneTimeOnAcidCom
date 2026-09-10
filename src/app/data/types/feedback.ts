/**
 * @fileoverview Feedback (testimonial) type definitions
 * Mirrors the feedback data structure used in portfolio testimonials
 *
 * @module data/types/feedback
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

/**
 * A single feedback/testimonial entry
 * Tagged with portfolio categories and tags so testimonials
 * can appear dynamically on relevant portfolio pages.
 */
export interface FeedbackItem {
  id: string;
  name: string;
  location: string;
  /** Portfolio category slug this feedback relates to */
  categorySlug: string;
  /** Portfolio tag slugs this feedback relates to */
  tags: string[];
  quote: string;
  /** Star rating 1-5 */
  rating: number;
  /** ISO date string */
  date: string;
  /** Optional event or festival name */
  event?: string;
  /** Whether to feature prominently */
  featured: boolean;
}
