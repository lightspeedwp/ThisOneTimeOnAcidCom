/**
 * @fileoverview Videos Page Component
 * 
 * Showcases makeup tutorials, behind-the-scenes, and showcase videos.
 * Features a neon/atomic aesthetic with a responsive grid layout.
 * Supports ?category= query param for pre-filtered views.
 *
 * @version 1.1.0 - Added category filtering via query params
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from '../../../lib/router';
import { videos, videoCategories } from '../../../data/mock/videos';
import { videosUI } from '../../../data/mock/ui/videos';
import { filtersUI } from '../../../data/mock/ui/filters';
import { Video } from '../../../data/types/videos';
import { VideoModal } from './VideoModal';
import { Play, ArrowRight } from '@phosphor-icons/react';
import "../../../../styles/blocks/videos-page.css";
import { OptimizedImage } from '../../ui/OptimizedImage';
import { ResponsiveGridSlider } from '../../ui/ResponsiveGridSlider';
import { ArchiveFilters } from '../../ui/ArchiveFilters';
import { FaqSection } from '../../sections/FaqSection';
import { formatDate } from '../../../utils/formatDate';
import { getVideoCategoryCount } from '../../../utils/contentCounts';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { useVideoFiltering } from '../../../hooks/useVideoFiltering';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';

// Import the video thumbnail image
import videoThumbnail from 'figma:asset/f0c4301e83be5c7dcfa724f611ca2ffcca9bf032.png';

// Map video IDs to their imported thumbnail images
const videoThumbnails: Record<string, string> = {
  'vid-1': videoThumbnail,
};

const SORT_OPTIONS = videosUI.archive.sortOptions;

export function VideosPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedVideoInit: Video | null = null;
  const [selectedVideo, setSelectedVideo] = useState(selectedVideoInit);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeCategoriesInit: string[] = [];
  const [activeCategories, setActiveCategories] = useState(activeCategoriesInit);
  const [sortBy, setSortBy] = useState('recent');

  /** Seed activeCategories from ?category= query param on mount */
  useEffect(function () {
    // Only set initial state if we are truly mounting/param changed,
    // though navigating to this page usually means empty state.
    const catParam = searchParams.get('category');
    if (catParam) {
      // If we support query params, we should navigate to the route.
      navigate('/videos/category/' + catParam, { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(function () {
    setSEO(pageSEO.videos);
    injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
      'Videos | Makeup Tutorials & Festival Art',
      pageSEO.videos.description,
      '/videos',
      videos.length,
    ));
    return function () {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, []);

  const categories = useMemo(
    function () {
      return videoCategories.map(function (c) {
        return {
          id: c.id,
          name: c.name,
          slug: c.slug,
          count: getVideoCategoryCount(c.name),
        };
      });
    },
    [],
  );

  const filteredVideos = useVideoFiltering({
    videos,
    activeCategories,
    sortBy,
    videoCategories,
  });

  const handleCategoryToggle = useCallback(function (slug) {
    navigate('/videos/category/' + slug);
  }, [navigate]);

  const handleVideoClick = function (video) {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = function () {
    setIsModalOpen(false);
    // Tiny delay to clear video after animation
    setTimeout(function () { setSelectedVideo(null); }, 300);
  };

  return (
    <main id="main-content" role="main" tabIndex={-1} className="videos-page bg-atomic-noise">
      <div className="videos-header section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {videosUI.archive.title}
          </h1>
          <p className="neon-text-gradient neon-text-gradient--yellow videos-header__description">
            {videosUI.archive.description}
          </p>
        </div>
      </div>

      <div className="videos-content-section section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          {/* Filters */}
          <ArchiveFilters
            contentType="video"
            categories={categories}
            activeCategories={activeCategories}
            sortBy={sortBy}
            sortOptions={SORT_OPTIONS}
            resultCount={filteredVideos.length}
            onCategoryToggle={handleCategoryToggle}
            onSortChange={setSortBy}
            onClearAll={function () {
              setActiveCategories([]);
              setSortBy('recent');
            }}
          />

          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <section className="videos-grid-section section-container">
            <ResponsiveGridSlider
              items={filteredVideos}
              keyExtractor={function (video) { return video.id; }}
              desktopColumns={3}
              renderItem={function (video) {
                return (
                  <div 
                    className="video-card"
                    onClick={function () { handleVideoClick(video); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={function (e) {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleVideoClick(video);
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
                      <div className="video-card__duration">
                        {video.duration}
                      </div>
                    </div>
                    <div className="video-card__content">
                      <h3 className="video-card__title">{video.title}</h3>
                      <div className="video-card__meta">
                        <span>{video.category}</span>
                        <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
                      </div>
                      <p className="video-card__description">{video.description}</p>
                      <button
                        type="button"
                        className="video-card__read-more"
                        onClick={function (e) {
                          e.stopPropagation();
                          navigate('/video/' + video.slug);
                        }}
                        aria-label={filtersUI.readFullPost + ': ' + video.title}
                      >
                        {filtersUI.readFullPost}
                        <ArrowRight className="icon-xs" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              }}
            />
          </section>
        ) : (
          <div className="error-card">
            <Play className="icon-xl" aria-hidden="true" />
            <h3 className="error-title">{videosUI.archive.emptyState}</h3>
          </div>
        )}
      </div>
      </div>

      <VideoModal 
        video={selectedVideo} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />

      <FaqSection pageId="videos" />
    </main>
  );
}