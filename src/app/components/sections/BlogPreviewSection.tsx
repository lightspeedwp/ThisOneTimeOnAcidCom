/**
 * @fileoverview Blog preview section component for homepage
 * 
 * Displays the latest blog posts in a Responsive Hybrid Layout
 * Grid on Desktop, Slider on Tablet/Mobile
 * 
 * @author Ash Shaw Portfolio Team
 * @version 3.3.0 - Bundler-safe: no arrow functions, no destructuring
 */

import React, { useCallback, useMemo } from 'react';
import { ArrowRight, Calendar } from '@phosphor-icons/react';
import { useBlogPosts } from '../../hooks/useContent';
import { OptimizedImage } from '../ui/OptimizedImage';
import { ReadMoreButton } from '../ui/ReadMoreButton';
import { ResponsiveGridSlider } from '../ui/ResponsiveGridSlider';
import type { BlogPost } from '../../data/types/blog';
import { homeUI } from '../../data/mock/ui/home';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { formatDate } from '../../utils/formatDate';
import "../../../styles/blocks/column-layouts.css";
import "../../../styles/blocks/blog-preview.css";

interface BlogPreviewSectionProps {
  limit?: number;
  title?: string;
}

export function BlogPreviewSection(props: BlogPreviewSectionProps) {
  var limit = props.limit !== undefined ? props.limit : 6;
  var title = props.title;
  
  const setCurrentPage = useAppNavigate();
  
  /**
   * MEMOIZED HOOK OPTIONS - Fixes flickering issue by stabilizing the dependency
   * passed to useBlogPosts.
   */
  const blogOptions = useMemo(function() {
    return {
      limit: limit,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
      publishedOnly: true,
    };
  }, [limit]);

  const postsHook = useBlogPosts(blogOptions);
  const blogData = postsHook.data;
  const loading = postsHook.loading;
  const error = postsHook.error;

  const goToBlog = useCallback(function() {
    setCurrentPage('blog');
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Navigating to blog page';
    }
  }, [setCurrentPage]);

  const viewBlogPost = useCallback(function(slug: string) {
    // Bundler-safe: string concatenation instead of template literal
    var route = 'blog/' + slug;
    setCurrentPage(route, slug);
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Navigating to blog post: ' + slug.replace(/-/g, ' ');
    }
  }, [setCurrentPage]);

  const blogPosts = blogData ? blogData.posts : null;
  const posts = blogPosts ? blogPosts : [];

  const hasNoPosts = !blogPosts || blogPosts.length === 0;
  if (!loading && hasNoPosts) {
    return null;
  }

  /**
   * Named function expression for renderItem to avoid arrow functions in JSX.
   */
  const renderBlogItem = function(post: BlogPost) {
    return (
      <div className="blog-card-wrapper">
        <BlogPostCard 
          post={post} 
          onViewPost={viewBlogPost}
          formatDate={formatDate}
        />
      </div>
    );
  };

  /**
   * Named function expression for keyExtractor.
   */
  const getPostId = function(post: BlogPost) {
    return post.id;
  };

  return (
    <section id="blog-preview" className="blog-preview section-spacing px-horizontal-section">
      <div className="container-wide section-container">
        {/* Section header */}
        <div className="blog-preview__header">
          <h2 className="text-section-h2">
            {title ? title : homeUI.sections.blogPreview.title}
          </h2>
          <p className="text-body-guideline text-blog-description">
            {homeUI.sections.blogPreview.description}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="blog-preview__grid-loading">
            {[1, 2, 3].map(function(_, i) {
              return (
                <div key={i} className="blog-card blog-card--loading">
                  <div className="blog-card__loading-content">
                    <div className="skeleton-box skeleton-box--image"></div>
                    <div className="skeleton-box skeleton-box--title"></div>
                    <div className="skeleton-box skeleton-box--text"></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="blog-preview__error-container">
            <p className="text-body-p text-blog-error mb-fluid-sm">
              {homeUI.sections.blogPreview.error}
            </p>
            <button
              type="button"
              onClick={goToBlog}
              className="btn btn--neon-primary"
            >
              {homeUI.sections.blogPreview.visitBlog}
            </button>
          </div>
        )}

        {/* Blog posts content using ResponsiveGridSlider */}
        {!loading && !error && posts.length > 0 && (
          <ResponsiveGridSlider
            items={posts}
            keyExtractor={getPostId}
            desktopColumns={3}
            layoutMode="slider"
            renderItem={renderBlogItem}
            className="mb-fluid-xl"
          />
        )}
        
        {/* View all blog posts button */}
        {!loading && !error && (
          <div className="blog-preview__cta">
            <button
              type="button"
              onClick={goToBlog}
              className="btn btn--neon-secondary btn-gap"
              aria-label={homeUI.sections.blogPreview.ctaAriaLabel}
            >
              <span>{homeUI.sections.blogPreview.viewAll}</span>
              <ArrowRight className="icon-arrow" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  onViewPost: (slug: string) => void;
  formatDate: (date: string) => string;
}

function BlogPostCard(props: BlogPostCardProps) {
  var post = props.post;
  var onViewPost = props.onViewPost;
  var formatDate = props.formatDate;

  /**
   * Named function expression for onClick.
   */
  const handleCardClick = function() {
    onViewPost(post.slug);
  };

  /**
   * Named function expression for onKeyDown.
   */
  const handleCardKeyDown = function(e: React.KeyboardEvent) {
    var isActivationKey = e.key === 'Enter' || e.key === ' ';
    if (isActivationKey) {
      e.preventDefault();
      onViewPost(post.slug);
    }
  };

  /**
   * Named function expression for ReadMoreButton onClick.
   */
  const handleReadMoreClick = function(page: string, slug?: string) {
    if (slug) {
      onViewPost(slug);
    }
  };

  return (
    <article className="blog-card group">
      {/* Featured image */}
      {post.featuredImage && (
        <div 
          className="blog-card__image-container"
          onClick={handleCardClick}
          onKeyDown={handleCardKeyDown}
          tabIndex={0}
          role="button"
          aria-label={'View full blog post: ' + post.title}
        >
          <OptimizedImage
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            className="blog-card__image"
            preset="thumbnail"
          />
          {/* Category chip overlaid on image */}
          <span className="blog-card__category">
            {post.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="blog-card__content">
        {/* Title */}
        <h3 
          className="blog-card__title"
          onClick={handleCardClick}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="blog-card__excerpt">
          {post.excerpt}
        </p>

        {/* Footer with date and Read more */}
        <div className="blog-card__footer">
          <div className="blog-card__date">
            <Calendar className="icon-calendar" aria-hidden="true" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <ReadMoreButton  
            postTitle={post.title}
            postSlug={post.slug}
            postId={post.id}
            onClick={handleReadMoreClick}
            compact
          />
        </div>
      </div>
    </article>
  );
}