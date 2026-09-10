/**
 * @fileoverview Unified Content Hooks Facade
 * 
 * Provides centralized data access that switches between Mock Data and WordPress API
 * based on the USE_WORDPRESS constant.
 * 
 * BUNDLER SAFETY: No optional chaining (?.), nullish coalescing (??), 
 * arrow functions, or destructuring in callbacks.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.3.0 - WordPress Mode Enabled + Production Endpoint
 */

import { useState, useEffect } from 'react';
import { 
  useBlogPosts as useMockBlogPosts, 
  useBlogPost as useMockBlogPost,
  usePortfolioSections as useMockPortfolioSections
} from './useMockData';

import {
  useBlogPosts as useWPBlogPosts,
  useBlogPost as useWPBlogPost,
  usePortfolioSections as useWPPortfolioSections,
  usePortfolioEntries as useWPPortfolioEntries
} from './useWordPress';

import { 
  getPortfolioByCategory, 
  UnifiedPortfolioEntry
} from '../utils/portfolioService';

import { grab, arrayGet, setProp } from '../lib/router';

// WordPress mode toggle (Production Ready)
var USE_WORDPRESS = true;

// -----------------------------------------------------------------------------
// Blog Hooks
// -----------------------------------------------------------------------------

export function useBlogPosts(options?: any) {
  // If WP is enabled, use WP hook
  if (USE_WORDPRESS) {
    var wpResult = useWPBlogPosts(options);
    var wpData = grab(wpResult, 'data');
    var wpLoading = grab(wpResult, 'loading');
    var wpError = grab(wpResult, 'error');
    var wpRefresh = grab(wpResult, 'refresh');
    
    var defaultData = {};
    setProp(defaultData, 'posts', []);
    var defPagination = {};
    setProp(defPagination, 'currentPage', 1);
    setProp(defPagination, 'totalPages', 1);
    setProp(defPagination, 'totalPosts', 0);
    setProp(defPagination, 'hasNext', false);
    setProp(defPagination, 'hasPrevious', false);
    setProp(defPagination, 'perPage', 10);
    setProp(defaultData, 'pagination', defPagination);

    var result = {};
    setProp(result, 'data', wpData || defaultData);
    setProp(result, 'loading', wpLoading);
    setProp(result, 'isLoading', wpLoading);
    setProp(result, 'error', wpError);
    setProp(result, 'refresh', wpRefresh);
    return result as any;
  }
  
  // Otherwise use mock hook
  return useMockBlogPosts(options);
}

export function useBlogPost(slug: string) {
  if (USE_WORDPRESS) {
    var wpResult = useWPBlogPost(slug);
    var result = {};
    setProp(result, 'data', grab(wpResult, 'data'));
    setProp(result, 'loading', grab(wpResult, 'loading'));
    setProp(result, 'isLoading', grab(wpResult, 'loading'));
    setProp(result, 'error', grab(wpResult, 'error'));
    setProp(result, 'refresh', grab(wpResult, 'refresh'));
    return result as any;
  }
  return useMockBlogPost(slug);
}

// -----------------------------------------------------------------------------
// Portfolio Hooks
// -----------------------------------------------------------------------------

/**
 * Hook for portfolio sections (grouped)
 */
export function usePortfolioSections() {
  if (USE_WORDPRESS) {
    var wpResult = useWPPortfolioSections();
    var result = {};
    setProp(result, 'data', grab(wpResult, 'data') || []);
    setProp(result, 'loading', grab(wpResult, 'loading'));
    setProp(result, 'isLoading', grab(wpResult, 'loading'));
    setProp(result, 'error', grab(wpResult, 'error'));
    setProp(result, 'refresh', grab(wpResult, 'refresh'));
    return result as any;
  }
  return useMockPortfolioSections();
}

/**
 * Hook for featured portfolio entries (homepage)
 */
export function useFeaturedPortfolioEntries(limit: number = 6) {
  var options = {};
  setProp(options, 'featuredOnly', true);
  setProp(options, 'limit', limit);
  return usePortfolioEntries(options);
}

/**
 * Hook for portfolio entries (flat list)
 * 
 * In Mock mode: Simulates async behavior using synchronous utility
 * In WP mode: Uses real async hook
 */
export function usePortfolioEntries(options?: {
  category?: string;
  featuredOnly?: boolean;
  limit?: number;
  page?: number;
}) {
  // WP Mode
  if (USE_WORDPRESS) {
    return useWPPortfolioEntries(options);
  }

  // Mock Mode (Simulate Async)
  var contentDataInit: any = null;
  var dataState = useState(contentDataInit);
  var data = dataState[0];
  var setData = dataState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function() {
    setLoading(true);
    // Simulate network delay
    var timer = setTimeout(function() {
      var optPage = options ? grab(options, 'page') : undefined;
      var optLimit = options ? grab(options, 'limit') : undefined;
      var optCategory = options ? grab(options, 'category') : undefined;
      var optFeaturedOnly = options ? grab(options, 'featuredOnly') : undefined;
      var page = optPage || 1;
      var limit = optLimit || 10;
      
      var allEntries = getPortfolioByCategory(
        optCategory || 'all',
        optFeaturedOnly || false
      );
      
      var totalEntries = allEntries.length;
      var totalPages = Math.ceil(totalEntries / limit);
      var startIndex = (page - 1) * limit;
      var paginatedEntries = allEntries.slice(startIndex, startIndex + limit);
      
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
      
      setData(resultData);
      setLoading(false);
    }, 300); // 300ms delay
    
    return function() { clearTimeout(timer); };
  }, [
    options ? grab(options, 'category') : undefined,
    options ? grab(options, 'page') : undefined,
    options ? grab(options, 'limit') : undefined,
    options ? grab(options, 'featuredOnly') : undefined
  ]);

  var result = {};
  setProp(result, 'data', data);
  setProp(result, 'loading', loading);
  setProp(result, 'error', null);
  setProp(result, 'refresh', function() {});
  return result as any;
}

// -----------------------------------------------------------------------------
// Legacy Hook Re-exports (for backward compatibility)
// -----------------------------------------------------------------------------

export { useHomepageContent, useAboutPageContent } from './useMockData';