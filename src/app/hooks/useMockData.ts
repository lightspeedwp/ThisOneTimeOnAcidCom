/**
 * @fileoverview Mock Contentful hooks (CMS integration removed)
 * These hooks now return mock data from /data/mock instead of fetching from Contentful.
 * 
 * @module hooks/useContentful
 */

import { useState, useEffect } from 'react';
import { homepageHero } from '../data/mock/pages/home';
import { aboutHero } from '../data/mock/pages/about';
import { blogPosts } from '../data/mock/blog/posts';
import { allPortfolioWork, portfolioSections } from '../data/mock/portfolio';

/**
 * Hook for homepage content
 * Returns mock data immediately with simulated loading state
 */
export function useHomepageContent() {
  var initialData = null;
  var [data, setData] = useState(initialData);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);

  useEffect(function() {
    setLoading(true);
    
    // Simulate async delay
    var timer = setTimeout(function() {
      setData({
        hero: homepageHero,
        featuredPortfolio: allPortfolioWork.filter(function(item) {
          return item.featured === true;
        }).slice(0, 6),
        recentBlogPosts: blogPosts.slice(0, 3)
      });
      setLoading(false);
    }, 100);

    return function() {
      clearTimeout(timer);
    };
  }, []);

  function refresh() {
    setLoading(true);
    setData({
      hero: homepageHero,
      featuredPortfolio: allPortfolioWork.filter(function(item) {
        return item.featured === true;
      }).slice(0, 6),
      recentBlogPosts: blogPosts.slice(0, 3)
    });
    setLoading(false);
  }

  return {
    data: data,
    loading: loading,
    error: error,
    refresh: refresh
  };
}

/**
 * Hook for about page content
 * Returns mock data immediately with simulated loading state
 */
export function useAboutPageContent() {
  var initialData = null;
  var [data, setData] = useState(initialData);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);

  useEffect(function() {
    setLoading(true);
    
    // Simulate async delay
    var timer = setTimeout(function() {
      setData({
        hero: aboutHero
      });
      setLoading(false);
    }, 100);

    return function() {
      clearTimeout(timer);
    };
  }, []);

  function refresh() {
    setLoading(true);
    setData({
      hero: aboutHero
    });
    setLoading(false);
  }

  return {
    data: data,
    loading: loading,
    error: error,
    refresh: refresh
  };
}

/**
 * Hook for blog posts
 * Returns paginated mock blog posts
 */
export function useBlogPosts(options) {
  var initialData = null;
  var [data, setData] = useState(initialData);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);

  useEffect(function() {
    setLoading(true);
    
    var timer = setTimeout(function() {
      var page = options && options.page ? options.page : 1;
      var perPage = options && options.perPage ? options.perPage : 10;
      var category = options && options.category ? options.category : null;
      
      var filteredPosts = blogPosts;
      if (category) {
        filteredPosts = blogPosts.filter(function(post) {
          return post.category === category;
        });
      }
      
      var totalPosts = filteredPosts.length;
      var totalPages = Math.ceil(totalPosts / perPage);
      var startIndex = (page - 1) * perPage;
      var endIndex = startIndex + perPage;
      var paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      setData({
        posts: paginatedPosts,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalPosts: totalPosts,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          perPage: perPage
        }
      });
      setLoading(false);
    }, 100);

    return function() {
      clearTimeout(timer);
    };
  }, [options]);

  function refresh() {
    setLoading(true);
    // Trigger re-fetch by updating state
    setLoading(false);
  }

  return {
    data: data,
    loading: loading,
    error: error,
    refresh: refresh
  };
}

/**
 * Hook for single blog post by slug
 */
export function useBlogPost(slug) {
  var initialData = null;
  var [data, setData] = useState(initialData);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);

  useEffect(function() {
    setLoading(true);
    
    var timer = setTimeout(function() {
      var post = blogPosts.find(function(p) {
        return p.slug === slug;
      });
      
      if (post) {
        setData(post);
        setError(null);
      } else {
        setData(null);
        setError('Post not found');
      }
      setLoading(false);
    }, 100);

    return function() {
      clearTimeout(timer);
    };
  }, [slug]);

  function refresh() {
    setLoading(true);
    var post = blogPosts.find(function(p) {
      return p.slug === slug;
    });
    setData(post || null);
    setLoading(false);
  }

  return {
    data: data,
    loading: loading,
    error: error,
    refresh: refresh
  };
}

/**
 * Hook for portfolio sections
 */
export function usePortfolioSections() {
  var initialData = null;
  var [data, setData] = useState(initialData);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);

  useEffect(function() {
    setLoading(true);
    
    var timer = setTimeout(function() {
      setData(portfolioSections);
      setLoading(false);
    }, 100);

    return function() {
      clearTimeout(timer);
    };
  }, []);

  function refresh() {
    setLoading(true);
    setData(portfolioSections);
    setLoading(false);
  }

  return {
    data: data,
    loading: loading,
    error: error,
    refresh: refresh
  };
}
