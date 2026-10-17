/**
 * @fileoverview Barrel export for all blog data
 * Central access point for blog posts, categories, and tags
 * 
 * @module data/mock/blog
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * 
 * @example
 * // Import blog posts
 * import { blogPosts, featuredPosts } from '@/data/mock/blog';
 * 
 * // Import categories
 * import { blogCategories } from '@/data/mock/blog';
 */

import { BlogPost } from '../../types';

// Import blog post sources
import { blogPosts as corePosts } from './posts';
import { timelineBlogPosts } from './posts-timeline';
import { phase8BlogPosts } from './posts-phase8';

// Export categories and tags
export * from './categories';
export * from './tags';

// Combine all blog posts from different sources
export var blogPosts: BlogPost[] = [
  ...corePosts,
  ...timelineBlogPosts,
  ...phase8BlogPosts
];

// Re-export individual sources
export { corePosts, timelineBlogPosts, phase8BlogPosts };

// Re-import for utility exports
import { blogCategories } from './categories';

/**
 * Featured Blog Posts
 * Posts marked as featured for homepage display
 * 
 * @constant {BlogPost[]}
 */
export const featuredPosts = blogPosts.filter(post => post.featured);

/**
 * Recent Blog Posts
 * Latest posts sorted by publication date
 * 
 * @constant {BlogPost[]}
 */
export const recentPosts = [...blogPosts]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 3);

/**
 * Get posts by category
 * 
 * @param {string} categorySlug - Category slug to filter by
 * @returns {BlogPost[]} Posts in the specified category
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
}

/**
 * Get posts by tag
 * 
 * @param {string} tag - Tag to filter by
 * @returns {BlogPost[]} Posts with the specified tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get post by slug
 * 
 * @param {string} slug - Post slug
 * @returns {BlogPost | undefined} Post with the specified slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

/**
 * Search posts
 * 
 * @param {string} query - Search query
 * @returns {BlogPost[]} Posts matching the search query
 */
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}