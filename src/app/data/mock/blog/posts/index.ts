/**
 * @fileoverview Blog posts category filters and exports
 * Provides category-specific post arrays for route-level code splitting
 * while maintaining backward compatibility with existing imports
 * 
 * @module data/mock/blog/posts
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import { BlogPost } from '../../../types';
import { blogPosts as allBlogPosts } from './';

/**
 * Filter posts by category
 * Bundler-safe implementation using classic for loops and explicit conditionals
 */

/**
 * Travel Posts (11 posts)
 * Adventures from Cape Town to Berlin, Thailand, festivals, and beyond
 */
export var travelPosts: BlogPost[] = (function() {
  var result: BlogPost[] = [];
  var i;
  for (i = 0; i < allBlogPosts.length; i = i + 1) {
    if (allBlogPosts[i].category === 'Travel') {
      result[result.length] = allBlogPosts[i];
    }
  }
  return result;
})();

/**
 * Education Posts (10 posts)
 * Learning experiences, skill development, and knowledge sharing
 */
export var educationPosts: BlogPost[] = (function() {
  var result: BlogPost[] = [];
  var i;
  for (i = 0; i < allBlogPosts.length; i = i + 1) {
    if (allBlogPosts[i].category === 'Education') {
      result[result.length] = allBlogPosts[i];
    }
  }
  return result;
})();

/**
 * Insights Posts (10 posts)
 * Personal reflections, life lessons, and deeper explorations
 */
export var insightsPosts: BlogPost[] = (function() {
  var result: BlogPost[] = [];
  var i;
  for (i = 0; i < allBlogPosts.length; i = i + 1) {
    if (allBlogPosts[i].category === 'Insights') {
      result[result.length] = allBlogPosts[i];
    }
  }
  return result;
})();

/**
 * Tutorials Posts (3 posts)
 * How-to guides, makeup tutorials, and practical tips
 * Includes: Tutorials, Makeup Tips, Festival Tips categories
 */
export var tutorialsPosts: BlogPost[] = (function() {
  var result: BlogPost[] = [];
  var tutorialCategories = ['Tutorials', 'Makeup Tips', 'Festival Tips'];
  var i;
  var j;
  var isMatch;
  
  for (i = 0; i < allBlogPosts.length; i = i + 1) {
    isMatch = false;
    for (j = 0; j < tutorialCategories.length; j = j + 1) {
      if (allBlogPosts[i].category === tutorialCategories[j]) {
        isMatch = true;
        j = tutorialCategories.length; // Exit inner loop using assignment pattern
      }
    }
    if (isMatch) {
      result[result.length] = allBlogPosts[i];
    }
  }
  return result;
})();

/**
 * Festival Posts (2 posts)
 * Festival culture, sustainability, and event experiences
 * Includes: Festival, Sustainability categories
 */
export var festivalPosts: BlogPost[] = (function() {
  var result: BlogPost[] = [];
  var festivalCategories = ['Festival', 'Sustainability'];
  var i;
  var j;
  var isMatch;
  
  for (i = 0; i < allBlogPosts.length; i = i + 1) {
    isMatch = false;
    for (j = 0; j < festivalCategories.length; j = j + 1) {
      if (allBlogPosts[i].category === festivalCategories[j]) {
        isMatch = true;
        j = festivalCategories.length; // Exit inner loop using assignment pattern
      }
    }
    if (isMatch) {
      result[result.length] = allBlogPosts[i];
    }
  }
  return result;
})();

/**
 * All Blog Posts (35 posts)
 * Re-export the complete blog posts array for backward compatibility
 */
export { blogPosts } from './';
