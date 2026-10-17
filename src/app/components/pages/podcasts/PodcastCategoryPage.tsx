/**
 * @fileoverview Podcast category archive page
 * Displays podcast episodes filtered by category with ArchiveFilters
 *
 * @component PodcastCategoryPage
 * @version 2.0.0 — Refactored to use shared TaxonomyArchiveLayout component
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Calendar, Clock, Microphone, PlayCircle } from '@phosphor-icons/react';
import { podcastEpisodes } from '../../../data/mock/podcasts/episodes';
import { podcastCategories } from '../../../data/mock/podcasts/categories';
import { podcastsUI } from '../../../data/mock/ui/podcasts';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { formatDate } from '../../../utils/formatDate';
import { getPodcastCategoryCount } from '../../../utils/contentCounts';
import { setSEO } from '../../../utils/seo';
import { podcastCategorySEO } from '../../../data/mock/seo';
import { podcastCategoryBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import { TaxonomyArchiveLayout } from '../shared/TaxonomyArchiveLayout';
import '../../../../styles/blocks/podcasts-page.css';

var SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'featured', label: 'Featured' },
];

export function PodcastCategoryPage() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();

  var category = podcastCategories.find(function (c) { return c.slug === slug; });
  var activeCategoriesInit: string[] = slug ? [slug] : [];
  var stateCategories = useState(activeCategoriesInit);
  var activeCategories = stateCategories[0];
  var setActiveCategories = stateCategories[1];
  var stateSort = useState('recent');
  var sortBy = stateSort[0];
  var setSortBy = stateSort[1];

  useEffect(function () {
    setActiveCategories(slug ? [slug] : []);
  }, [slug]);

  var categories = useMemo(
    function () {
      return podcastCategories.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: getPodcastCategoryCount(c.name),
        };
      });
    },
    [],
  );

  var filteredEpisodes = useMemo(function () {
    var eps = [];
    for (var i = 0; i < podcastEpisodes.length; i++) {
      eps.push(podcastEpisodes[i]);
    }

    if (activeCategories.length > 0) {
      var activeCat = podcastCategories.find(
        function (c) { return c.slug === activeCategories[0]; }
      );
      if (activeCat) {
        eps = eps.filter(
          function (ep) { return ep.category.toLowerCase() === activeCat.name.toLowerCase(); }
        );
      }
    }

    switch (sortBy) {
      case 'recent':
        eps.sort(
          function (a, b) {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
        );
        break;
      case 'alphabetical':
        eps.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'featured':
        eps.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
        break;
    }

    return eps;
  }, [activeCategories, sortBy]);

  useEffect(function () {
    if (category) {
      setSEO(podcastCategorySEO(category.name));
      var epCount = filteredEpisodes ? filteredEpisodes.length : 0;
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        category.name + ' | Podcasts',
        podcastCategorySEO(category.name).description,
        '/podcasts/category/' + slug,
        epCount,
      ));
    }
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [category, slug, filteredEpisodes]);

  var handleCategoryToggle = useCallback(
    function (catSlug: string) {
      var isActive = activeCategories.indexOf(catSlug) !== -1;
      var newCategories = isActive 
        ? activeCategories.filter(function (s) { return s !== catSlug; }) 
        : [catSlug];

      setActiveCategories(newCategories);

      if (newCategories.length === 0) {
        navigate('/podcasts');
      } else {
        navigate('/podcasts/category/' + catSlug);
      }
    },
    [navigate, activeCategories],
  );

  var renderPodcastCard = useCallback(
    function (ep: any) {
      return (
        <article
          key={ep.id}
          className="podcast-card"
          onClick={function () { navigate('/podcast/' + ep.slug); }}
          role="button"
          tabIndex={0}
          onKeyDown={function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/podcast/' + ep.slug);
            }
          }}
          aria-label={ep.title + ' \u2014 Episode ' + ep.episodeNumber}
        >
          <div className="podcast-card__image-wrap">
            <OptimizedImage
              src={ep.coverImage.src}
              alt={ep.coverImage.alt}
              className="podcast-card__image"
              preset="content"
            />
            <div className="podcast-card__play-overlay" aria-hidden="true">
              <PlayCircle className="podcast-card__play-icon" />
            </div>
            <span className="podcast-card__episode-badge">
              EP {ep.episodeNumber}
            </span>
          </div>

          <div className="podcast-card__body">
            <h2 className="podcast-card__title">{ep.title}</h2>
            <p className="podcast-card__excerpt">{ep.description}</p>
            <div className="podcast-card__meta">
              <span className="podcast-card__category-chip">
                {ep.category}
              </span>
              <time dateTime={ep.publishedAt}>
                <Calendar className="icon-xs" aria-hidden="true" />{' '}
                {formatDate(ep.publishedAt)}
              </time>
              <span>
                <Clock className="icon-xs" aria-hidden="true" />{' '}
                {ep.duration}
              </span>
            </div>
          </div>
        </article>
      );
    },
    [navigate],
  );

  return (
    <TaxonomyArchiveLayout
      contentType="podcast"
      items={filteredEpisodes}
      renderCard={renderPodcastCard}
      breadcrumbs={podcastCategoryBreadcrumbs(category ? category.name : 'Category')}
      title={category ? category.name : 'Podcasts'}
      description={category && category.description ? category.description : undefined}
      showFilters={true}
      filterConfig={{
        categories: categories,
        activeCategories: activeCategories,
        sortBy: sortBy,
        sortOptions: SORT_OPTIONS,
        resultCount: filteredEpisodes.length,
        onCategoryToggle: handleCategoryToggle,
        onSortChange: setSortBy,
        onClearAll: function () {
          setActiveCategories([]);
          navigate('/podcasts');
        },
      }}
      emptyState={{
        title: podcastsUI.archive.emptyState,
        message: '',
        icon: <Microphone className="icon-xl" aria-hidden="true" />,
      }}
      faqPageId="podcasts"
      mainClassName="podcasts-archive bg-atomic-noise"
      headerClassName="podcasts-archive__header section-spacing px-horizontal-section"
      contentClassName="podcasts-archive-content section-spacing px-horizontal-section"
      gridClassName="podcasts-archive__grid"
    />
  );
}
