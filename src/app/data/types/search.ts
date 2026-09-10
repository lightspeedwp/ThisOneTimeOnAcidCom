/**
 * @fileoverview Search type definitions
 * @module data/types/search
 */

export interface SearchResult {
  id: string;
  type: 'blog' | 'portfolio' | 'video' | 'podcast' | 'page' | 'event' | 'faq';
  title: string;
  excerpt: string;
  url: string;
  image?: string;
  category?: string;
  tags?: string[];
  date?: string;
  relevanceScore: number;
}

export interface SearchFilters {
  type?: string;
  category?: string;
  sortBy: 'relevance' | 'recent' | 'popular' | 'featured' | 'alphabetical';
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  totalCount: number;
  loading: boolean;
}