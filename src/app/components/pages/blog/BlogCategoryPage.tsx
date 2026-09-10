/**
 * @fileoverview Blog category archive page
 * Displays blog posts filtered by category with ArchiveFilters
 *
 * @component BlogCategoryPage
 * @version 2.0.0 — Refactored to use shared TaxonomyArchiveLayout component
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Calendar, Clock, BookOpen } from '@phosphor-icons/react';
import { blogPosts } from '../../../data/mock/blog/posts';
import { blogCategories } from '../../../data/mock/blog/categories';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { formatDate } from '../../../utils/formatDate';
import { getBlogCategoryCount } from '../../../utils/contentCounts';
import { setSEO } from '../../../utils/seo';
import { blogCategorySEO } from '../../../data/mock/seo';
import { blogCategoryBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import { emptyStateMessages } from '../../../data/mock/ui/error';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import { TaxonomyArchiveLayout } from '../shared/TaxonomyArchiveLayout';
import '../../../../styles/blocks/blog-list.css';

var SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'featured', label: 'Featured' },
];

export function BlogCategoryPage() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();

  var category = blogCategories.find(function (c) { return c.slug === slug; });
  var activeCategoriesInit: string[] = slug ? [slug] : [];
  var stateCategories = useState(activeCategoriesInit);
  var activeCategories = stateCategories[0];
  var setActiveCategories = stateCategories[1];
  var stateSort = useState('recent');
  var sortBy = stateSort[0];
  var setSortBy = stateSort[1];

  var categories = useMemo(
    function () {
      return blogCategories.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: getBlogCategoryCount(c.name),
        };
      }).filter(function (c) { return c.count > 0; });
    },
    [],
  );

  var filteredPosts = useMemo(function () {
    var posts = blogPosts.filter(function (post) {
      if (activeCategories.length === 0) return true;
      var cat = blogCategories.find(function (c) { return c.slug === activeCategories[0]; });
      var postCat = post.category;
      return cat ? (postCat ? postCat.toLowerCase() === cat.name.toLowerCase() : false) : true;
    });

    switch (sortBy) {
      case 'recent':
        posts.sort(function (a, b) { return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(); });
        break;
      case 'alphabetical':
        posts.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'featured':
        posts.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
        break;
    }
    return posts;
  }, [activeCategories, sortBy]);

  useEffect(function () {
    if (category) {
      setSEO(blogCategorySEO(category.name));
      var postCount = filteredPosts ? filteredPosts.length : 0;
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        category.name + ' | Insights',
        blogCategorySEO(category.name).description,
        '/blog/category/' + slug,
        postCount,
      ));
    }
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [category, slug, filteredPosts]);

  useEffect(function () {
    setActiveCategories(slug ? [slug] : []);
  }, [slug]);

  var handleCategoryToggle = useCallback(
    function (catSlug: string) {
      var isActive = activeCategories.indexOf(catSlug) !== -1;
      var newCategories = isActive
        ? activeCategories.filter(function (s) { return s !== catSlug; })
        : [catSlug];

      setActiveCategories(newCategories);

      if (newCategories.length === 0) {
        navigate('/blog');
      } else {
        navigate('/blog/category/' + catSlug);
      }
    },
    [navigate, activeCategories],
  );

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

  return (
    <TaxonomyArchiveLayout
      contentType="blog"
      items={filteredPosts}
      renderCard={renderBlogCard}
      breadcrumbs={blogCategoryBreadcrumbs(category ? category.name : 'Category')}
      title={category ? category.name : 'Blog Category'}
      description={category && category.description ? category.description : undefined}
      showFilters={true}
      filterConfig={{
        categories: categories,
        activeCategories: activeCategories,
        sortBy: sortBy,
        sortOptions: SORT_OPTIONS,
        resultCount: filteredPosts.length,
        onCategoryToggle: handleCategoryToggle,
        onSortChange: setSortBy,
        onClearAll: function () { setActiveCategories([]); navigate('/blog'); },
      }}
      emptyState={{
        title: emptyStateMessages.blog.title,
        message: emptyStateMessages.blog.categoryMessage,
      }}
      faqPageId="blog"
      mainClassName="blog-list-view bg-atomic-noise"
      headerClassName="blog-list-header section-spacing px-horizontal-section"
      contentClassName="blog-list-content section-spacing px-horizontal-section"
      gridClassName="blog-preview__grid"
    />
  );
}
