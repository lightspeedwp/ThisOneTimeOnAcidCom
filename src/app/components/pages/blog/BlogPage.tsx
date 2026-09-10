/**
 * @fileoverview Blog page component for Ash Shaw Makeup Portfolio
 * 
 * Comprehensive blog listing with Contentful CMS integration.
 * Features advanced filtering, pagination, search, and responsive design following
 * the complete brand guidelines and accessibility standards.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.4.0 - Semantic BEM Refactor & Simplified Logic
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useBlogPosts } from '../../../hooks/useContent';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { Calendar, Clock, BookOpen } from '@phosphor-icons/react';
import { FaqSection } from '../../sections/FaqSection';
import { ArchiveFilters } from '../../ui/ArchiveFilters';
import { blogUI } from '../../../data/mock/ui/blog';
import { blogPageContent } from '../../../data/mock/pages/blog';
import { blogCategories } from '../../../data/mock/blog/categories';
import { emptyStateMessages } from '../../../data/mock/ui/error';
import { useAppNavigate } from '../../../hooks/useAppNavigate';
import { useSearchParams } from '../../../lib/router';
import { formatDate } from '../../../utils/formatDate';
import { getBlogCategoryCount } from '../../../utils/contentCounts';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import "../../../../styles/blocks/blog-page.css";
import "../../../../styles/blocks/blog-list.css";
import "../../../../styles/blocks/page-header-animations.css";
import "../../../../styles/animations.css";

interface BlogPageProps {
  initialCategory?: string;
}

interface BlogPageState {
  page: number;
  category?: string;
  tags: string[];
  searchQuery: string;
  limit: number;
}

export function BlogPage(props: BlogPageProps) {
  const propCategory = props.initialCategory;
  const setCurrentPage = useAppNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = propCategory || searchParams.get('category') || undefined;
  const prefersReduced = useReducedMotion();

  const blogStateInit: BlogPageState = {
    page: 1,
    category: initialCategory,
    tags: [],
    searchQuery: '',
    limit: 6,
  };
  const [blogState, setBlogState] = useState(blogStateInit);

  const activeCategoriesInit: string[] = initialCategory ? [initialCategory] : [];
  const [activeCategories, setActiveCategories] = useState(activeCategoriesInit);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(function () {
    if (initialCategory && initialCategory !== blogState.category) {
      setBlogState(function (prev) {
        return {
          page: 1,
          category: initialCategory,
          tags: prev.tags,
          searchQuery: prev.searchQuery,
          limit: prev.limit
        };
      });
      setActiveCategories(initialCategory ? [initialCategory] : []);
    }
  }, [initialCategory]);

  const blogFilterCategories = useMemo(function () {
    return blogCategories.map(function (c) {
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        count: getBlogCategoryCount(c.name),
      };
    });
  }, []);

  const BLOG_SORT_OPTIONS = useMemo(function () {
    return [
      { value: 'recent', label: 'Most Recent' },
      { value: 'alphabetical', label: 'A-Z' },
      { value: 'featured', label: 'Featured' },
    ];
  }, []);

  const handleBlogCategoryToggle = useCallback(function (slug) {
    setActiveCategories(function (prev) {
      return prev.indexOf(slug) !== -1 ? prev.filter(function (s) { return s !== slug; }) : [slug];
    });
  }, []);

  const [debouncedSearch, setDebouncedSearch] = useState(blogState.searchQuery);

  /** 
   * MEMOIZED HOOK OPTIONS - Fixes the flickering issue by stabilizing the dependency
   * passed to useBlogPosts.
   */
  const blogPostsOptions = useMemo(function () {
    return {
      category: blogState.category,
      tags: blogState.tags.length > 0 ? blogState.tags : undefined,
      page: blogState.page,
      limit: blogState.limit,
      sortBy: sortBy === 'recent' ? 'publishedAt' : 'title',
      sortOrder: 'desc',
      publishedOnly: true,
      autoRefresh: true,
      refreshInterval: 600000,
    };
  }, [blogState.category, blogState.tags, blogState.page, blogState.limit, sortBy]);

  const postsHook = useBlogPosts(blogPostsOptions);
  const blogData = postsHook.data;
  const postsLoading = postsHook.loading;
  const refreshPosts = postsHook.refresh;

  useEffect(function () {
    const timer = setTimeout(function () {
      setDebouncedSearch(blogState.searchQuery);
    }, 300);

    return function () { clearTimeout(timer); };
  }, [blogState.searchQuery]);

  const filteredPosts = useMemo(function () {
    const blogPosts = blogData ? blogData.posts : [];
    let posts = [];
    if (blogPosts) {
      for (var i = 0; i < blogPosts.length; i++) {
        posts.push(blogPosts[i]);
      }
    }

    // Filter by search query
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      posts = posts.filter(function (post) {
        return post.title.toLowerCase().indexOf(query) !== -1 ||
          post.excerpt.toLowerCase().indexOf(query) !== -1 ||
          post.tags.some(function (tag) { return tag.toLowerCase().indexOf(query) !== -1; }) ||
          post.category.toLowerCase().indexOf(query) !== -1;
      });
    }

    // Filter by active categories from ArchiveFilters
    if (activeCategories.length > 0) {
      posts = posts.filter(function (post) {
        const postCatSlug = post.category
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
        return activeCategories.some(function (slug) {
          return postCatSlug.indexOf(slug) !== -1 || post.category.toLowerCase().indexOf(slug) !== -1;
        });
      });
    }

    // Sort by sortBy option
    switch (sortBy) {
      case 'alphabetical':
        posts = posts.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'featured':
        posts = posts.sort(function (a, b) {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        break;
      case 'recent':
      default:
        posts = posts.sort(function (a, b) {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        break;
    }

    return posts;
  }, [blogData, debouncedSearch, activeCategories, sortBy]);

  const updateBlogState = useCallback(function (updates) {
    setBlogState(function (prev) {
      var next = {
        page: prev.page,
        category: prev.category,
        tags: prev.tags,
        searchQuery: prev.searchQuery,
        limit: prev.limit
      };
      var keys = Object.keys(updates);
      for (var k = 0; k < keys.length; k++) {
        next[keys[k]] = updates[keys[k]];
      }
      if (updates.category !== undefined || updates.tags !== undefined || updates.searchQuery !== undefined) {
        next.page = 1;
      }
      return next;
    });
  }, []);

  const viewBlogPost = useCallback(function (slug) {
    // Explicitly navigate to the blog post page route
    // This triggers App.tsx to update the URL and switch components
    setCurrentPage('blog-post', slug);
    
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Navigating to blog post: ' + slug;
    }
  }, [setCurrentPage]);

  const goToPage = useCallback(function (page) {
    if (page === blogState.page) return;
    
    updateBlogState({ page: page });
    
    setTimeout(function () {
      const scrollBehavior = prefersReduced ? 'auto' : 'smooth';
      const blogHeader = document.querySelector('[data-blog-header]');
      if (blogHeader) {
        blogHeader.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: scrollBehavior });
      }
    }, 100);
    
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Loading page ' + page + ' of blog posts';
    }
  }, [updateBlogState, blogState.page, prefersReduced]);

  useEffect(function () {
    const handleKeyDown = function (event) {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case 'f':
        case 'F':
          event.preventDefault();
          const searchInput = document.querySelector('input[type="text"]');
          if (searchInput) {
            searchInput.focus();
          }
          break;
        case 'h':
        case 'H':
          event.preventDefault();
          setCurrentPage('home');
          break;
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const pag = blogData ? blogData.pagination : null;
            const hasPrev = pag ? pag.hasPrevious : false;
            if (hasPrev) {
              goToPage(blogState.page - 1);
            }
          }
          break;
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const pag2 = blogData ? blogData.pagination : null;
            const hasNxt = pag2 ? pag2.hasNext : false;
            if (hasNxt) {
              goToPage(blogState.page + 1);
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return function () { document.removeEventListener('keydown', handleKeyDown); };
  }, [setCurrentPage, goToPage, blogState.page, blogData]);

  useEffect(function () {
    setSEO(pageSEO.blog);
    const paginationData = blogData ? blogData.pagination : null;
    const totalItems = paginationData ? (paginationData.total || 0) : 0;
    injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
      'Insights | Makeup Tips, Festival Guides & Tutorials',
      pageSEO.blog.description,
      '/blog',
      totalItems,
    ));
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [blogData]);

  return (
    <main id="main-content" role="main" tabIndex={-1} className="blog-list-view bg-atomic-noise">
      <div 
        className="blog-list-header section-spacing px-horizontal-section page-header--animated" 
        data-blog-header
      >
        <div className="container-wide section-container">
          <div className="blog-list-header__content">
            <h1 className="text-hero-h1 text-gradient-pink-purple-blue mb-fluid-md page-header__title--fade-in">
              {blogUI.listing.header.title}
            </h1>
            <p className="neon-text-gradient neon-text-gradient--cyan page-header__subtitle--fade-in">
              {blogUI.listing.header.description}
            </p>
          </div>
        </div>
      </div>

      <div className="blog-list-content section-spacing px-horizontal-section page-filters--fade-in">
        <div className="container-wide section-container">
          {/* Archive Filters */}
          <ArchiveFilters
            contentType="blog"
            categories={blogFilterCategories}
            activeCategories={activeCategories}
            sortBy={sortBy}
            sortOptions={BLOG_SORT_OPTIONS}
            resultCount={filteredPosts.length}
            onCategoryToggle={handleBlogCategoryToggle}
            onSortChange={setSortBy}
            onClearAll={function () {
              setActiveCategories([]);
              setSortBy('recent');
            }}
          />

          {postsLoading ? (
            <div className="blog-preview__grid">
              {[1, 2, 3, 4, 5, 6].map(function (i) {
                return (
                  <div key={i} className="blog-card-skeleton">
                    <div className="blog-card-skeleton__image" />
                    <div className="blog-card-skeleton__content">
                      <div className="blog-card-skeleton__text blog-card-skeleton__text--h-sm blog-card-skeleton__text--w-25" />
                      <div className="blog-card-skeleton__text blog-card-skeleton__text--h-md blog-card-skeleton__text--w-75" />
                      <div className="blog-card-skeleton__text blog-card-skeleton__text--h-sm blog-card-skeleton__text--full" />
                      <div className="blog-card-skeleton__text blog-card-skeleton__text--h-sm blog-card-skeleton__text--w-66" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="blog-preview__grid">
              {filteredPosts.map(function (post) {
                return (
                  <article 
                    key={post.id} 
                    className="blog-card"
                    onClick={function () { viewBlogPost(post.slug); }}
                  >
                    <div className="blog-card__image-container">
                      {post.featuredImage ? (
                        <OptimizedImage
                          src={post.featuredImage.src}
                          alt={post.featuredImage.alt}
                          className="blog-card__image"
                          preset="thumbnail"
                        />
                      ) : (
                        <div className="blog-card__placeholder">
                          <BookOpen className="blog-card__placeholder-icon" />
                        </div>
                      )}
                      <div className="blog-card__category">
                        {post.category}
                      </div>
                    </div>
                    
                    <div className="blog-card__content">
                      <h2 className="blog-card__title">
                        {post.title}
                      </h2>
                      
                      <p className="blog-card__excerpt">
                        {post.excerpt}
                      </p>
                      
                      <div className="blog-card__footer">
                        <div className="blog-card__date">
                          <Calendar className="icon-xs" />
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                          </time>
                        </div>
                        
                        {post.readTime ? (
                          <div className="blog-card__date">
                            <Clock className="icon-xs" />
                            <span>{post.readTime} min</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="error-card">
              <h3 className="error-title">{emptyStateMessages.blog.title}</h3>
              <p className="error-message">{emptyStateMessages.blog.message}</p>
            </div>
          )}
          
          {/* Pagination */}
          {blogData && blogData.pagination ? (
             <div className="pagination-container">
               <button
                 type="button"
                 className="pagination-btn"
                 onClick={function () { goToPage(blogState.page - 1); }}
                 disabled={!blogData.pagination.hasPrevious}
                 aria-label="Previous page"
               >
                 {'<'}
               </button>
               
               <div className="pagination-numbers">
                 {Array.from({ length: blogData.pagination.totalPages }, function (_, i) { return i + 1; }).map(function (pageNum) {
                   return (
                     <button
                       type="button"
                       key={pageNum}
                       onClick={function () { goToPage(pageNum); }}
                       className={'pagination-btn ' + (blogState.page === pageNum ? 'pagination-btn--active' : '')}
                       aria-label={'Go to page ' + pageNum}
                       aria-current={blogState.page === pageNum ? 'page' : undefined}
                     >
                       {pageNum}
                     </button>
                   );
                 })}
               </div>
               
               <button
                 type="button"
                 className="pagination-btn"
                 onClick={function () { goToPage(blogState.page + 1); }}
                 disabled={!blogData.pagination.hasNext}
                 aria-label="Next page"
               >
                 {'>'}
               </button>
             </div>
          ) : null}
        </div>
      </div>

      <FaqSection pageId="blog" />
    </main>
  );
}