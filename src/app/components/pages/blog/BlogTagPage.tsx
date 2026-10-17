/**
 * @fileoverview Blog tag archive page
 * Displays blog posts filtered by tag
 *
 * @component BlogTagPage
 * @version 2.0.0 — Refactored to use shared TaxonomyArchiveLayout component
 */

import React, { useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Calendar, Clock, BookOpen } from '@phosphor-icons/react';
import { blogPosts } from '../../../data/mock/blog/posts';
import { findBlogTagBySlug } from '../../../data/mock/blog/tags';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { formatDate } from '../../../utils/formatDate';
import { setSEO } from '../../../utils/seo';
import { blogTagSEO } from '../../../data/mock/seo';
import { blogTagBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import { emptyStateMessages } from '../../../data/mock/ui/error';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import { TaxonomyArchiveLayout } from '../shared/TaxonomyArchiveLayout';
import '../../../../styles/blocks/blog-list.css';
import '../../../../styles/blocks/archive-filters.css';

export function BlogTagPage() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();

  var slugValue = slug ? slug : '';
  var tag = findBlogTagBySlug(slugValue);
  var tagName = tag ? tag.name : '';
  var tagDesc = tag ? tag.description : '';

  var filteredPosts = useMemo(function () {
    if (!slug) return [];
    var resolvedTagName = tagName ? tagName : slug.replace(/-/g, ' ');
    return blogPosts
      .filter(function (post) {
        var postTags = post.tags ? post.tags : [];
        return postTags.some(function (t) { return t.toLowerCase() === resolvedTagName.toLowerCase(); });
      })
      .sort(function (a, b) { return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(); });
  }, [slug, tag]);

  useEffect(function () {
    if (tag) {
      setSEO(blogTagSEO(tag.name));
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        tag.name + ' | Insights',
        blogTagSEO(tag.name).description,
        '/blog/tag/' + slug,
        filteredPosts.length,
      ));
    }
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [tag, slug, filteredPosts]);

  var renderBlogCard = useCallback(
    function (post: any) {
      return (
        <article
          key={post.id}
          className="blog-card"
          onClick={function () { navigate('/blog/' + post.slug); }}
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
            <div className="blog-card__category">{post.category}</div>
          </div>
          <div className="blog-card__content">
            <h2 className="blog-card__title">{post.title}</h2>
            <p className="blog-card__excerpt">{post.excerpt}</p>
            <div className="blog-card__footer">
              <div className="blog-card__date">
                <Calendar className="icon-xs" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
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
    },
    [navigate],
  );

  var breadcrumbLabel = tagName ? tagName : slugValue;

  return (
    <TaxonomyArchiveLayout
      contentType="blog"
      items={filteredPosts}
      renderCard={renderBlogCard}
      breadcrumbs={blogTagBreadcrumbs(breadcrumbLabel)}
      title={'Tag: ' + (tagName ? tagName : slug)}
      description={tagDesc ? tagDesc : undefined}
      showFilters={false}
      showResultCount={true}
      emptyState={{
        title: emptyStateMessages.blog.title,
        message: emptyStateMessages.blog.tagMessage,
      }}
      faqPageId="blog"
      mainClassName="blog-list-view bg-atomic-noise"
      headerClassName="blog-list-header section-spacing px-horizontal-section"
      contentClassName="blog-list-content section-spacing px-horizontal-section"
      gridClassName="blog-preview__grid"
    />
  );
}
