/**
 * @fileoverview WordPress Data Hooks (Headless Mode) with Mock Fallback
 * Replacement for useContentful.ts when migrating to Headless WordPress.
 * 
 * FALLBACK STRATEGY: When the WP API is unreachable (e.g. CORS, network sandbox,
 * DNS failure), all hooks gracefully degrade to mock data instead of surfacing
 * "Failed to fetch" errors to the UI.
 * 
 * BUNDLER SAFETY: No optional chaining (?.), nullish coalescing (??), 
 * arrow functions, or destructuring in callbacks.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.5.0 - useBlogPost refresh() now functional (refreshCount + cache clear)
 */

import { useState, useEffect, useRef } from 'react';
import { BlogPost, PortfolioEntry } from '../data/types';
import { grab, arrayGet, setProp } from '../lib/router';
import { mapCategory } from '../utils/portfolioService';

/* ── Mock data imports for fallback ── */
import { blogPosts as mockBlogPosts } from '../data/mock/blog/posts';
import { allPortfolioWork as mockPortfolioWork, portfolioSections as mockPortfolioSections } from '../data/mock/portfolio';

// Production WordPress Endpoint
// MIGRATION NOTE: This is the live production URL for ashshaw.makeup.
// In the Figma Make sandbox, the WP API is unreachable (CORS/network sandbox),
// so the wpUnreachable flag will activate after the first failed fetch and all
// subsequent calls will silently serve mock data from /data/mock/.
var WP_API_URL = 'https://ashshaw.makeup/wp-json/wp/v2';

// Fetch timeout in ms — prevents indefinite hangs in sandboxed environments
var FETCH_TIMEOUT_MS = 8000;

/**
 * Track whether WP API has been confirmed unreachable this session.
 * Once set to true, all subsequent hooks skip the fetch entirely and
 * serve mock data immediately, avoiding repeated timeout waits.
 */
var wpUnreachable = false;

// ---------------------------------------------------------------------------
// localStorage Cache Layer
// ---------------------------------------------------------------------------

/** Cache key prefix to namespace WP API cache entries */
var WP_CACHE_PREFIX = 'wp_cache_';

/** Default cache TTL in milliseconds (30 minutes) */
var WP_CACHE_TTL_MS = 30 * 60 * 1000;

/**
 * Build a deterministic cache key from an endpoint string.
 * Includes the prefix so WP cache entries are easy to identify.
 */
function buildCacheKey(endpoint: string): string {
  return WP_CACHE_PREFIX + endpoint;
}

/**
 * Attempt to read a cached response from localStorage.
 * Returns the parsed data if found and not expired, otherwise null.
 * Wrapped in try/catch for quota errors, private browsing, etc.
 */
function readCache(endpoint: string): any {
  try {
    var key = buildCacheKey(endpoint);
    var raw = localStorage.getItem(key);
    if (raw == null) return null;

    var parsed = JSON.parse(raw);
    var timestamp = grab(parsed, 'timestamp');
    var data = grab(parsed, 'data');

    if (timestamp == null || data == null) return null;

    var age = Date.now() - timestamp;
    if (age > WP_CACHE_TTL_MS) {
      // Expired — remove stale entry
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (e) {
    return null;
  }
}

/**
 * Write a successful WP API response to localStorage cache.
 * Silently fails on quota errors or restricted storage.
 */
function writeCache(endpoint: string, data: any): void {
  try {
    var key = buildCacheKey(endpoint);
    var entry = {};
    setProp(entry, 'timestamp', Date.now());
    setProp(entry, 'data', data);
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (e) {
    // Silently ignore — storage may be full or restricted
  }
}

/**
 * Remove a specific cache entry (useful for forced refresh).
 */
function clearCacheEntry(endpoint: string): void {
  try {
    var key = buildCacheKey(endpoint);
    localStorage.removeItem(key);
  } catch (e) {
    // Silently ignore
  }
}

/**
 * Clear all WP API cache entries from localStorage.
 * Iterates keys and removes any that start with the WP_CACHE_PREFIX.
 */
function clearAllWPCache(): void {
  try {
    var keysToRemove: string[] = [];
    for (var i = 0; i < localStorage.length; i++) {
      var storageKey = localStorage.key(i);
      if (storageKey != null && storageKey.indexOf(WP_CACHE_PREFIX) === 0) {
        keysToRemove.push(storageKey);
      }
    }
    for (var j = 0; j < keysToRemove.length; j++) {
      localStorage.removeItem(arrayGet(keysToRemove, j));
    }
  } catch (e) {
    // Silently ignore
  }
}

// Export for external use (e.g. dev tools, manual cache clear)
export { clearAllWPCache };

/**
 * Get stats about the current WP cache (entry count, total size, oldest/newest timestamps).
 * Useful for dev tools / diagnostics.
 */
export function getWPCacheStats(): { entryCount: number; totalBytes: number; oldestAge: number; newestAge: number } {
  var stats = { entryCount: 0, totalBytes: 0, oldestAge: 0, newestAge: Infinity };
  try {
    var now = Date.now();
    for (var i = 0; i < localStorage.length; i++) {
      var storageKey = localStorage.key(i);
      if (storageKey != null && storageKey.indexOf(WP_CACHE_PREFIX) === 0) {
        var raw = localStorage.getItem(storageKey);
        if (raw != null) {
          stats.entryCount = stats.entryCount + 1;
          stats.totalBytes = stats.totalBytes + raw.length * 2; // rough UTF-16 estimate
          try {
            var parsed = JSON.parse(raw);
            var ts = grab(parsed, 'timestamp');
            if (ts != null) {
              var age = now - ts;
              if (age > stats.oldestAge) { stats.oldestAge = age; }
              if (age < stats.newestAge) { stats.newestAge = age; }
            }
          } catch (e) {
            // ignore parse errors
          }
        }
      }
    }
  } catch (e) {
    // Silently ignore
  }
  if (stats.newestAge === Infinity) { stats.newestAge = 0; }
  return stats;
}

/**
 * Generic fetcher for WP REST API with timeout + header support
 */
function fetchWP(endpoint: string): Promise<any> {
  var url = WP_API_URL + endpoint;

  return new Promise(function (resolve, reject) {
    var controller: AbortController | null = null;
    var timeoutId: ReturnType<typeof setTimeout> | null = null;

    // Use AbortController where available for clean cancellation
    if (typeof AbortController !== 'undefined') {
      controller = new AbortController();
    }

    var fetchOptions: RequestInit = {};
    if (controller) {
      setProp(fetchOptions, 'signal', controller.signal);
    }

    timeoutId = setTimeout(function () {
      if (controller) {
        controller.abort();
      }
      reject(new Error('WP API timeout after ' + FETCH_TIMEOUT_MS + 'ms'));
    }, FETCH_TIMEOUT_MS);

    fetch(url, fetchOptions)
      .then(function (res) {
        if (timeoutId) clearTimeout(timeoutId);
        if (!res.ok) {
          reject(new Error('WP API Error: ' + res.statusText));
          return;
        }

        var headers = grab(res, 'headers');
        var totalHeader = headers.get('X-WP-Total');
        var total = totalHeader ? parseInt(totalHeader, 10) : 0;

        var totalPagesHeader = headers.get('X-WP-TotalPages');
        var totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 0;

        res.json().then(function (json) {
          var result = {};
          setProp(result, 'json', json);
          setProp(result, 'total', total);
          setProp(result, 'totalPages', totalPages);
          resolve(result);
        });
      })
      .catch(function (err) {
        if (timeoutId) clearTimeout(timeoutId);
        reject(err);
      });
  });
}

// ---------------------------------------------------------------------------
// Mappers (WP → App types)
// ---------------------------------------------------------------------------

/**
 * Helper to map WP Post to BlogPost
 */
function mapPostToBlog(p: any): BlogPost {
  var embedded = grab(p, '_embedded') || {};
  var featuredMediaArray = grab(embedded, 'wp:featuredmedia');
  var featuredMedia = arrayGet(featuredMediaArray, 0);
  var wpTerms = grab(embedded, 'wp:term');
  var authorArray = grab(embedded, 'author');
  var authorData = arrayGet(authorArray, 0);
  var meta = grab(p, 'meta') || {};

  var featuredSrc = featuredMedia ? (grab(featuredMedia, 'source_url') || '') : '';
  var featuredAlt = featuredMedia ? (grab(featuredMedia, 'alt_text') || '') : '';
  var mediaDetails = featuredMedia ? (grab(featuredMedia, 'media_details') || {}) : {};

  var categoryGroup = arrayGet(wpTerms, 0);
  var categoryTerm = arrayGet(categoryGroup, 0);
  var categoryName = categoryTerm ? (grab(categoryTerm, 'name') || 'Uncategorized') : 'Uncategorized';

  var tagTerms = arrayGet(wpTerms, 1);
  var tags = [];
  if (tagTerms) {
    for (var i = 0; i < tagTerms.length; i++) {
      var term = arrayGet(tagTerms, i);
      tags.push(grab(term, 'name'));
    }
  }

  var authorName = authorData ? (grab(authorData, 'name') || 'Ash Shaw') : 'Ash Shaw';
  var avatarUrls = authorData ? (grab(authorData, 'avatar_urls') || {}) : {};
  var authorAvatar = grab(avatarUrls, '96') || '';
  var authorBio = authorData ? (grab(authorData, 'description') || '') : '';

  var readTimeStr = grab(meta, '_read_time') || '5';
  var isFeatured = grab(meta, '_featured') === '1';
  var faqsRaw = grab(meta, '_faqs');
  var faqs = [];
  if (faqsRaw) {
    try {
      faqs = JSON.parse(faqsRaw);
    } catch (e) {}
  }

  var hasFeaturedImage = featuredSrc.length > 0;

  var postTitle = grab(p, 'title');
  var postExcerpt = grab(p, 'excerpt');
  var postContent = grab(p, 'content');

  var blogPost = {} as BlogPost;
  setProp(blogPost, 'id', grab(p, 'id').toString());
  setProp(blogPost, 'slug', grab(p, 'slug'));
  setProp(blogPost, 'title', grab(postTitle, 'rendered'));
  setProp(blogPost, 'excerpt', grab(postExcerpt, 'rendered').replace(/<[^>]+>/g, ''));
  setProp(blogPost, 'content', grab(postContent, 'rendered'));
  setProp(blogPost, 'publishedAt', grab(p, 'date'));
  setProp(blogPost, 'updatedAt', grab(p, 'modified'));

  if (hasFeaturedImage) {
    var fImg = {};
    setProp(fImg, 'src', featuredSrc);
    setProp(fImg, 'alt', featuredAlt);
    setProp(fImg, 'width', grab(mediaDetails, 'width'));
    setProp(fImg, 'height', grab(mediaDetails, 'height'));
    setProp(blogPost, 'featuredImage', fImg);
  } else {
    setProp(blogPost, 'featuredImage', { src: '', alt: '' });
  }

  setProp(blogPost, 'category', categoryName);
  setProp(blogPost, 'tags', tags);

  var authorObj = {};
  setProp(authorObj, 'name', authorName);
  setProp(authorObj, 'avatar', authorAvatar);
  setProp(authorObj, 'bio', authorBio);
  setProp(blogPost, 'author', authorObj);

  setProp(blogPost, 'readTime', parseInt(readTimeStr, 10));
  setProp(blogPost, 'featured', isFeatured);
  setProp(blogPost, 'faqs', faqs);

  return blogPost;
}

/**
 * Helper to map WP Portfolio CPT to PortfolioEntry
 */
function mapPostToPortfolio(p: any): PortfolioEntry {
  var embedded = grab(p, '_embedded') || {};
  var meta = grab(p, 'meta') || {};
  var featuredMediaArray = grab(embedded, 'wp:featuredmedia');
  var featuredMedia = arrayGet(featuredMediaArray, 0);
  var wpTerms = grab(embedded, 'wp:term');

  var categoryGroup = arrayGet(wpTerms, 0);
  var categoryTerm = arrayGet(categoryGroup, 0);
  var wpCategoryName = categoryTerm ? (grab(categoryTerm, 'name') || 'Festival Makeup') : 'Festival Makeup';

  var tagTerms = arrayGet(wpTerms, 1);
  var tags = [];
  if (tagTerms) {
    for (var j = 0; j < tagTerms.length; j++) {
      var t = arrayGet(tagTerms, j);
      tags.push(grab(t, 'name'));
    }
  }

  // Use the central mapping logic from portfolioService
  var mappedCategoryName = mapCategory(wpCategoryName, tags);

  var images = [];
  try {
    var imagesRaw = grab(meta, '_images');
    if (imagesRaw) {
      images = JSON.parse(imagesRaw);
    } else if (featuredMedia) {
      var singleImg = {};
      setProp(singleImg, 'src', grab(featuredMedia, 'source_url') || '');
      setProp(singleImg, 'alt', grab(featuredMedia, 'alt_text') || '');
      setProp(singleImg, 'title', grab(grab(p, 'title'), 'rendered'));
      setProp(singleImg, 'position', 'center');
      setProp(singleImg, 'aspectRatio', '4:3');
      images = [singleImg];
    }
  } catch (e) {
    // Silently handle parse errors
  }

  var faqsRaw = grab(meta, '_faqs');
  var faqs = [];
  if (faqsRaw) {
    try {
      faqs = JSON.parse(faqsRaw);
    } catch (e) {}
  }

  var entry = {} as PortfolioEntry;
  setProp(entry, 'id', grab(p, 'id').toString());
  setProp(entry, 'slug', grab(p, 'slug'));
  setProp(entry, 'title', grab(grab(p, 'title'), 'rendered'));
  setProp(entry, 'description', grab(grab(p, 'content'), 'rendered'));
  setProp(entry, 'content', grab(grab(p, 'content'), 'rendered'));
  setProp(entry, 'excerpt', grab(grab(p, 'excerpt'), 'rendered').replace(/<[^>]+>/g, ''));
  setProp(entry, 'category', mappedCategoryName);
  setProp(entry, 'subcategory', grab(meta, '_subcategory') || '');
  setProp(entry, 'tags', tags);
  setProp(entry, 'images', images);
  setProp(entry, 'location', grab(meta, '_location') || '');
  setProp(entry, 'event', grab(meta, '_event') || '');
  setProp(entry, 'date', grab(p, 'date'));
  setProp(entry, 'featured', grab(meta, '_featured') === '1');
  setProp(entry, 'order', grab(p, 'menu_order') || 0);
  setProp(entry, 'faqs', faqs);

  return entry;
}

// ---------------------------------------------------------------------------
// Mock data fallback builders
// ---------------------------------------------------------------------------

/**
 * Build a mock blog posts response matching the WP hook shape
 */
function buildMockBlogResponse(options?: any) {
  var page = options ? (grab(options, 'page') || 1) : 1;
  var perPage = options ? (grab(options, 'limit') || 10) : 10;
  var searchQuery = options ? grab(options, 'searchQuery') : null;

  var filtered = mockBlogPosts.slice(0);

  if (searchQuery) {
    var query = searchQuery.toLowerCase();
    var searchFiltered = [];
    for (var s = 0; s < filtered.length; s++) {
      var sp = arrayGet(filtered, s);
      var spTitle = (grab(sp, 'title') || '').toLowerCase();
      var spExcerpt = (grab(sp, 'excerpt') || '').toLowerCase();
      if (spTitle.indexOf(query) !== -1 || spExcerpt.indexOf(query) !== -1) {
        searchFiltered.push(sp);
      }
    }
    filtered = searchFiltered;
  }

  var totalPosts = filtered.length;
  var totalPages = Math.ceil(totalPosts / perPage);
  var startIndex = (page - 1) * perPage;
  var paginatedPosts = filtered.slice(startIndex, startIndex + perPage);

  var resultData = {};
  setProp(resultData, 'posts', paginatedPosts);

  var pagination = {};
  setProp(pagination, 'currentPage', page);
  setProp(pagination, 'totalPages', totalPages);
  setProp(pagination, 'totalPosts', totalPosts);
  setProp(pagination, 'hasNext', page < totalPages);
  setProp(pagination, 'hasPrevious', page > 1);
  setProp(pagination, 'perPage', perPage);
  setProp(resultData, 'pagination', pagination);

  return resultData;
}

/**
 * Build a mock single blog post response
 */
function buildMockSingleBlogResponse(slug: string) {
  for (var i = 0; i < mockBlogPosts.length; i++) {
    var post = arrayGet(mockBlogPosts, i);
    if (grab(post, 'slug') === slug) {
      return post;
    }
  }
  return null;
}

/**
 * Build a mock portfolio sections response
 */
function buildMockPortfolioSectionsResponse() {
  return mockPortfolioSections;
}

/**
 * Build a mock portfolio entries response
 */
function buildMockPortfolioEntriesResponse(options?: any) {
  var page = options ? (grab(options, 'page') || 1) : 1;
  var limit = options ? (grab(options, 'limit') || 10) : 10;
  var featuredOnly = options ? grab(options, 'featuredOnly') : false;

  var entries = mockPortfolioWork.slice(0);

  if (featuredOnly) {
    var featFiltered = [];
    for (var f = 0; f < entries.length; f++) {
      var fe = arrayGet(entries, f);
      if (grab(fe, 'featured') === true) {
        featFiltered.push(fe);
      }
    }
    entries = featFiltered;
  }

  var totalEntries = entries.length;
  var totalPages = Math.ceil(totalEntries / limit);
  var startIndex = (page - 1) * limit;
  var paginatedEntries = entries.slice(startIndex, startIndex + limit);

  var resultData = {};
  setProp(resultData, 'entries', paginatedEntries);

  var pagination = {};
  setProp(pagination, 'currentPage', page);
  setProp(pagination, 'totalPages', totalPages);
  setProp(pagination, 'totalEntries', totalEntries);
  setProp(pagination, 'hasNext', page < totalPages);
  setProp(pagination, 'hasPrevious', page > 1);
  setProp(pagination, 'perPage', limit);
  setProp(resultData, 'pagination', pagination);

  return resultData;
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Hook for blog posts list
 * Falls back to mock data if WP API is unreachable.
 */
export function useBlogPosts(options?: {
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  searchQuery?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  var [data, setData] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var isMounted = useRef(true);
  var [refreshCount, setRefreshCount] = useState(0);

  var optPage = options ? grab(options, 'page') : undefined;
  var optLimit = options ? grab(options, 'limit') : undefined;
  var optCategory = options ? grab(options, 'category') : undefined;
  var optTags = options ? grab(options, 'tags') : undefined;
  var optSearch = options ? grab(options, 'searchQuery') : undefined;

  useEffect(function () {
    isMounted.current = true;
    return function () { isMounted.current = false; };
  }, []);

  useEffect(function () {
    setLoading(true);
    setError(null);

    var page = optPage || 1;
    var perPage = optLimit || 10;

    var query = '/posts?page=' + page + '&per_page=' + perPage + '&_embed';
    if (optSearch) {
      query += '&search=' + encodeURIComponent(optSearch);
    }

    // On manual refresh, skip cache
    if (refreshCount === 0) {
      // 1. Check localStorage cache first
      var cachedData = readCache(query);
      if (cachedData) {
        setData(cachedData as any);
        setLoading(false);
        return;
      }
    } else {
      // Clear the specific cache entry on refresh
      clearCacheEntry(query);
    }

    // 2. If WP already confirmed unreachable, skip fetch and serve mock
    if (wpUnreachable) {
      var mockResult = buildMockBlogResponse(options);
      setData(mockResult as any);
      setLoading(false);
      return;
    }

    // 3. Fetch from WP API
    fetchWP(query)
      .then(function (res) {
        if (!isMounted.current) return;
        var posts = grab(res, 'json');
        var total = grab(res, 'total');
        var totalPages = grab(res, 'totalPages');

        var mappedPosts = [];
        for (var i = 0; i < posts.length; i++) {
          mappedPosts.push(mapPostToBlog(arrayGet(posts, i)));
        }

        var resultData = {};
        setProp(resultData, 'posts', mappedPosts);

        var pagination = {};
        setProp(pagination, 'currentPage', page);
        setProp(pagination, 'totalPages', totalPages);
        setProp(pagination, 'totalPosts', total);
        setProp(pagination, 'hasNext', page < totalPages);
        setProp(pagination, 'hasPrevious', page > 1);
        setProp(pagination, 'perPage', perPage);
        setProp(resultData, 'pagination', pagination);

        // Write successful response to cache
        writeCache(query, resultData);

        setData(resultData as any);
        setLoading(false);
      })
      .catch(function () {
        if (!isMounted.current) return;
        // Mark WP as unreachable for the rest of the session
        wpUnreachable = true;
        // Serve mock data silently
        var mockResult = buildMockBlogResponse(options);
        setData(mockResult as any);
        setError(null);
        setLoading(false);
      });
  }, [optPage, optLimit, optCategory, optTags, optSearch, refreshCount]);

  /** Refresh: clear cache for this query and re-fetch */
  var refreshFn = function () {
    setRefreshCount(function (prev: number) { return prev + 1; });
  };

  var result = {};
  setProp(result, 'data', data);
  setProp(result, 'loading', loading);
  setProp(result, 'error', error);
  setProp(result, 'refresh', refreshFn);
  return result as any;
}

/**
 * Hook for single blog post
 * Falls back to mock data if WP API is unreachable.
 */
export function useBlogPost(slug: string) {
  var [data, setData] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var isMounted = useRef(true);
  var [refreshCount, setRefreshCount] = useState(0);

  useEffect(function () {
    isMounted.current = true;
    return function () { isMounted.current = false; };
  }, []);

  useEffect(function () {
    if (!slug) return;

    setLoading(true);
    setError(null);

    var query = '/posts?slug=' + slug + '&_embed';

    // On manual refresh, skip cache
    if (refreshCount === 0) {
      // 1. Check localStorage cache first
      var cachedData = readCache(query);
      if (cachedData) {
        setData(cachedData as any);
        setLoading(false);
        return;
      }
    } else {
      // Clear the specific cache entry on refresh
      clearCacheEntry(query);
    }

    // 2. If WP already confirmed unreachable, skip fetch and serve mock
    if (wpUnreachable) {
      var mockPost = buildMockSingleBlogResponse(slug);
      setData(mockPost as any);
      setLoading(false);
      return;
    }

    // 3. Fetch from WP API
    fetchWP(query)
      .then(function (res) {
        if (!isMounted.current) return;
        var posts = grab(res, 'json');
        var mappedPost = null;
        if (posts && posts.length > 0) {
          mappedPost = mapPostToBlog(arrayGet(posts, 0));
        }

        // Write the mapped result to cache
        if (mappedPost) {
          writeCache(query, mappedPost);
        }

        setData(mappedPost as any);
        setLoading(false);
      })
      .catch(function () {
        if (!isMounted.current) return;
        // Mark WP as unreachable for the rest of the session
        wpUnreachable = true;
        // Serve mock data silently
        var mockPost = buildMockSingleBlogResponse(slug);
        setData(mockPost as any);
        setError(null);
        setLoading(false);
      });
  }, [slug, refreshCount]);

  /** Refresh: clear cache for this slug and re-fetch */
  var refreshFn = function () {
    setRefreshCount(function (prev: number) { return prev + 1; });
  };

  var result = {};
  setProp(result, 'data', data);
  setProp(result, 'loading', loading);
  setProp(result, 'error', error);
  setProp(result, 'refresh', refreshFn);
  return result as any;
}

/**
 * Hook for portfolio sections (grouped)
 * Falls back to mock data if WP API is unreachable.
 */
export function usePortfolioSections() {
  var [data, setData] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var isMounted = useRef(true);
  var [refreshCount, setRefreshCount] = useState(0);

  useEffect(function () {
    isMounted.current = true;
    return function () { isMounted.current = false; };
  }, []);

  useEffect(function () {
    setLoading(true);
    setError(null);

    var query = '/portfolio?per_page=100&_embed';

    // On manual refresh, skip cache
    if (refreshCount === 0) {
      var cachedData = readCache(query);
      if (cachedData) {
        setData(cachedData as any);
        setLoading(false);
        return;
      }
    } else {
      clearCacheEntry(query);
    }

    // 2. If WP already confirmed unreachable, skip fetch and serve mock
    if (wpUnreachable) {
      setData(buildMockPortfolioSectionsResponse() as any);
      setLoading(false);
      return;
    }

    // 3. Fetch from WP API
    fetchWP(query)
      .then(function (res) {
        if (!isMounted.current) return;
        var posts = grab(res, 'json');
        var mappedEntries = [];
        for (var i = 0; i < posts.length; i++) {
          mappedEntries.push(mapPostToPortfolio(arrayGet(posts, i)));
        }

        var sectionsMap = new Map();

        for (var j = 0; j < mappedEntries.length; j++) {
          var entry = arrayGet(mappedEntries, j);
          var cat = grab(entry, 'category') || 'Other';
          if (!sectionsMap.has(cat)) {
            sectionsMap.set(cat, []);
          }
          var existing = sectionsMap.get(cat);
          if (existing) {
            existing.push(entry);
          }
        }

        var sections = Array.from(sectionsMap.entries()).map(function (item, index) {
          var key = arrayGet(item, 0);
          var entries = arrayGet(item, 1);
          var sec = {};
          setProp(sec, 'id', key.toLowerCase().replace(/\s+/g, '-'));
          setProp(sec, 'title', key);
          setProp(sec, 'description', 'Portfolio entries for ' + key);
          setProp(sec, 'entries', entries);
          setProp(sec, 'order', index);
          setProp(sec, 'decorativeColors', ['#ec4899', '#a855f7']);
          return sec;
        });

        // Write to cache
        writeCache(query, sections);

        setData(sections as any);
        setLoading(false);
      })
      .catch(function () {
        if (!isMounted.current) return;
        // Mark WP as unreachable for the rest of the session
        wpUnreachable = true;
        // Serve mock data silently
        setData(buildMockPortfolioSectionsResponse() as any);
        setError(null);
        setLoading(false);
      });
  }, [refreshCount]);

  /** Refresh: clear cache and re-fetch */
  var refreshFn = function () {
    setRefreshCount(function (prev: number) { return prev + 1; });
  };

  var result = {};
  setProp(result, 'data', data);
  setProp(result, 'loading', loading);
  setProp(result, 'error', error);
  setProp(result, 'refresh', refreshFn);
  return result as any;
}

/**
 * Hook for portfolio entries (flat list with filtering)
 * Falls back to mock data if WP API is unreachable.
 */
export function usePortfolioEntries(options?: {
  category?: string;
  featuredOnly?: boolean;
  limit?: number;
  page?: number;
}) {
  var [data, setData] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var isMounted = useRef(true);
  var [refreshCount, setRefreshCount] = useState(0);

  var optPage = options ? grab(options, 'page') : undefined;
  var optLimit = options ? grab(options, 'limit') : undefined;
  var optCategory = options ? grab(options, 'category') : undefined;
  var optFeaturedOnly = options ? grab(options, 'featuredOnly') : undefined;

  useEffect(function () {
    isMounted.current = true;
    return function () { isMounted.current = false; };
  }, []);

  useEffect(function () {
    setLoading(true);
    setError(null);

    var page = optPage || 1;
    var limit = optLimit || 10;

    var query = '/portfolio?per_page=' + limit + '&page=' + page + '&_embed';

    // On manual refresh, skip cache
    if (refreshCount === 0) {
      // 1. Check localStorage cache first
      var cachedData = readCache(query);
      if (cachedData) {
        setData(cachedData as any);
        setLoading(false);
        return;
      }
    } else {
      clearCacheEntry(query);
    }

    // 2. If WP already confirmed unreachable, skip fetch and serve mock
    if (wpUnreachable) {
      var mockResult = buildMockPortfolioEntriesResponse(options);
      setData(mockResult as any);
      setLoading(false);
      return;
    }

    // 3. Fetch from WP API
    fetchWP(query)
      .then(function (res) {
        if (!isMounted.current) return;
        var posts = grab(res, 'json');
        var total = grab(res, 'total');
        var totalPages = grab(res, 'totalPages');

        var entries = [];
        for (var i = 0; i < posts.length; i++) {
          entries.push(mapPostToPortfolio(arrayGet(posts, i)));
        }

        var resultData = {};
        setProp(resultData, 'entries', entries);

        var pagination = {};
        setProp(pagination, 'currentPage', page);
        setProp(pagination, 'totalPages', totalPages);
        setProp(pagination, 'totalEntries', total);
        setProp(pagination, 'hasNext', page < totalPages);
        setProp(pagination, 'hasPrevious', page > 1);
        setProp(pagination, 'perPage', limit);
        setProp(resultData, 'pagination', pagination);

        // Write to cache
        writeCache(query, resultData);

        setData(resultData as any);
        setLoading(false);
      })
      .catch(function () {
        if (!isMounted.current) return;
        // Mark WP as unreachable for the rest of the session
        wpUnreachable = true;
        // Serve mock data silently
        var mockResult = buildMockPortfolioEntriesResponse(options);
        setData(mockResult as any);
        setError(null);
        setLoading(false);
      });
  }, [optPage, optLimit, optCategory, optFeaturedOnly, refreshCount]);

  /** Refresh: clear cache and re-fetch */
  var refreshFn = function () {
    setRefreshCount(function (prev: number) { return prev + 1; });
  };

  var result = {};
  setProp(result, 'data', data);
  setProp(result, 'loading', loading);
  setProp(result, 'error', error);
  setProp(result, 'refresh', refreshFn);
  return result as any;
}