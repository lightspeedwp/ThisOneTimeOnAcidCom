/**
 * @fileoverview Video category archive page
 * Displays videos filtered by category with ArchiveFilters
 *
 * @component VideoCategoryPage
 * @version 2.0.0 — Refactored to use shared TaxonomyArchiveLayout component
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Play } from '@phosphor-icons/react';
import { videos, videoCategories } from '../../../data/mock/videos';
import { videosUI } from '../../../data/mock/ui/videos';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { formatDate } from '../../../utils/formatDate';
import { getVideoCategoryCount } from '../../../utils/contentCounts';
import { setSEO } from '../../../utils/seo';
import { videoCategorySEO } from '../../../data/mock/seo';
import { videoCategoryBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import { TaxonomyArchiveLayout } from '../shared/TaxonomyArchiveLayout';
import '../../../../styles/blocks/videos-page.css';

// Import the video thumbnail image
import videoThumbnail from 'figma:asset/f0c4301e83be5c7dcfa724f611ca2ffcca9bf032.png';

var videoThumbnails: Record<string, string> = {
  'vid-1': videoThumbnail,
};

var SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'featured', label: 'Featured' },
];

export function VideoCategoryPage() {
  var params = useParams();
  var slug = params.slug;
  var navigate = useNavigate();

  var category = videoCategories.find(function (c) { return c.slug === slug; });
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
      return videoCategories.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: getVideoCategoryCount(c.name),
        };
      }).filter(function (c) { return c.count > 0; });
    },
    [],
  );

  var filteredVideos = useMemo(function () {
    var vids = [];
    for (var i = 0; i < videos.length; i++) {
      vids.push(videos[i]);
    }

    if (activeCategories.length > 0) {
      var activeCat = videoCategories.find(
        function (c) { return c.slug === activeCategories[0]; }
      );
      if (activeCat) {
        vids = vids.filter(
          function (v) { return v.category.toLowerCase() === activeCat.name.toLowerCase(); }
        );
      }
    }

    switch (sortBy) {
      case 'recent':
        vids.sort(
          function (a, b) {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
        );
        break;
      case 'alphabetical':
        vids.sort(function (a, b) { return a.title.localeCompare(b.title); });
        break;
      case 'featured':
        vids.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
        break;
    }

    return vids;
  }, [activeCategories, sortBy]);

  useEffect(function () {
    if (category) {
      setSEO(videoCategorySEO(category.name));
      var vidCount = filteredVideos ? filteredVideos.length : 0;
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        category.name + ' | Videos',
        videoCategorySEO(category.name).description,
        '/videos/category/' + slug,
        vidCount,
      ));
    }
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [category, slug, filteredVideos]);

  var handleCategoryToggle = useCallback(
    function (catSlug: string) {
      var isActive = activeCategories.indexOf(catSlug) !== -1;
      var newCategories = isActive 
        ? activeCategories.filter(function (s) { return s !== catSlug; }) 
        : [catSlug];

      setActiveCategories(newCategories);

      if (newCategories.length === 0) {
        navigate('/videos');
      } else {
        navigate('/videos/category/' + catSlug);
      }
    },
    [navigate, activeCategories],
  );

  var renderVideoCard = useCallback(
    function (video: any) {
      return (
        <article
          key={video.id}
          className="video-card"
          onClick={function () { navigate('/video/' + video.slug); }}
          role="button"
          tabIndex={0}
          onKeyDown={function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/video/' + video.slug);
            }
          }}
          aria-label={'Play video: ' + video.title}
        >
          <div className="video-card__thumbnail-container">
            <OptimizedImage
              src={videoThumbnails[video.id] ? videoThumbnails[video.id] : video.thumbnailUrl}
              alt={video.title}
              className="video-card__thumbnail"
              preset="thumbnail"
            />
            <div className="video-card__play-button">
              <Play className="video-card__play-icon" />
            </div>
            <div className="video-card__duration">{video.duration}</div>
          </div>
          <div className="video-card__content">
            <h3 className="video-card__title">{video.title}</h3>
            <div className="video-card__meta">
              <span>{video.category}</span>
              <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
            </div>
            <p className="video-card__description">{video.description}</p>
          </div>
        </article>
      );
    },
    [navigate],
  );

  return (
    <TaxonomyArchiveLayout
      contentType="video"
      items={filteredVideos}
      renderCard={renderVideoCard}
      breadcrumbs={videoCategoryBreadcrumbs(category ? category.name : 'Category')}
      title={category ? category.name : 'Videos'}
      description={category && category.description ? category.description : undefined}
      showFilters={true}
      filterConfig={{
        categories: categories,
        activeCategories: activeCategories,
        sortBy: sortBy,
        sortOptions: SORT_OPTIONS,
        resultCount: filteredVideos.length,
        onCategoryToggle: handleCategoryToggle,
        onSortChange: setSortBy,
        onClearAll: function () {
          setActiveCategories([]);
          navigate('/videos');
        },
      }}
      emptyState={{
        title: videosUI.archive.emptyState,
        message: '',
        icon: <Play className="icon-xl" aria-hidden="true" />,
      }}
      faqPageId="videos"
      mainClassName="videos-page bg-atomic-noise"
      headerClassName="videos-header section-spacing px-horizontal-section"
      contentClassName="videos-content-section section-spacing px-horizontal-section"
      gridClassName="videos-grid"
    />
  );
}
