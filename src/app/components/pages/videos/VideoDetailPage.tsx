/**
 * @fileoverview Single video detail page
 * Embeds the video player with metadata, rich markdown content, tags + sharing footer
 *
 * @component VideoDetailPage
 * @version 2.0.0 - Rich text styling + tags/share layout
 */

import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  Play,
  Tag,
  ShareNetwork,
} from '@phosphor-icons/react';
import { videos, videoCategories } from '../../../data/mock/videos';
import { videosUI } from '../../../data/mock/ui/videos';
import { ShareComponent } from '../../ui/ShareComponent';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { VideoPlayer } from '../../ui/VideoPlayer';
import { FaqSection } from '../../sections/FaqSection';
import { formatDate } from '../../../utils/formatDate';
import { markdownToHtml } from '../../../utils/simpleMarkdown';
import { setSEO } from '../../../utils/seo';
import { pageSEO, videoSEO } from '../../../data/mock/seo';
import { videoDetailBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildVideoSchema,
} from '../../../utils/schemaService';
import '../../../../styles/blocks/videos-page.css';
import '../../../../styles/blocks/podcasts-page.css';
import '../../../../styles/blocks/portfolio-detail-page.css';
import '../../../../styles/blocks/blog-article.css';

export function VideoDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const video = useMemo(
    function () { return videos.find(function (v) { return v.slug === slug; }); },
    [slug],
  );

  useEffect(function () {
    if (video) {
      setSEO(videoSEO(video.title, video.description));
      injectSchema(SCHEMA_IDS.video, buildVideoSchema(video));
    } else {
      setSEO(pageSEO.notFound);
    }
    return function () {
      removeSchema(SCHEMA_IDS.video);
    };
  }, [video]);

  useEffect(function () {
    window.scrollTo(0, 0);
  }, [slug]);

  /** Resolve category slug for the link */
  const categorySlug = useMemo(function () {
    if (!video) return '';
    const cat = videoCategories.find(
      function (c) { return c.name.toLowerCase() === video.category.toLowerCase(); }
    );
    const catSlug = cat ? cat.slug : video.category.toLowerCase().replace(/\s+/g, '-');
    return catSlug;
  }, [video]);

  /** Related videos (same category, excluding current) */
  const related = useMemo(function () {
    if (!video) return [];
    return videos
      .filter(function (v) { return v.id !== video.id && v.category === video.category; })
      .slice(0, 3);
  }, [video]);

  if (!video) {
    return (
      <main id="main-content" role="main" tabIndex={-1} className="videos-page bg-atomic-noise">
        <div className="videos-header section-spacing px-horizontal-section">
          <div className="container-wide section-container">
            <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
              Video Not Found
            </h1>
            <p className="text-body-guideline">
              This video could not be found.
            </p>
            <button
              type="button"
              className="podcast-detail__back"
              onClick={function () { navigate('/videos'); }}
            >
              <ArrowLeft className="icon-sm" />
              {videosUI.detail.backLabel}
            </button>
          </div>
        </div>
      </main>
    );
  }

  /** Parse markdown content once */
  const htmlContent = video.content ? markdownToHtml(video.content) : '';

  return (
    <main id="main-content" role="main" tabIndex={-1} className="videos-page bg-atomic-noise">
      {/* Header */}
      <div className="videos-header section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <Breadcrumbs items={videoDetailBreadcrumbs(video.title)} centered />
          <button
            type="button"
            className="podcast-detail__back"
            onClick={function () { navigate('/videos'); }}
          >
            <ArrowLeft className="icon-sm" />
            {videosUI.detail.backLabel}
          </button>
        </div>
      </div>

      {/* Video Player & Content */}
      <div className="video-detail-content section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <div className="video-detail__player-wrap">
            <VideoPlayer
              className="video-detail__player"
              src={video.videoUrl}
              title={video.title}
            />
          </div>

          {/* Meta */}
          <div className="video-detail__body">
            {/* Clickable Category */}
            <button
              type="button"
              className="video-detail__category-link"
              onClick={function () { navigate('/videos/category/' + categorySlug); }}
            >
              {video.category}
            </button>

            <h1 className="text-section-h2">{video.title}</h1>

            <div className="podcast-detail__meta">
              <span className="podcast-detail__meta-item">
                <Calendar className="icon-xs" aria-hidden="true" />
                {formatDate(video.publishedAt)}
              </span>
              <span className="podcast-detail__meta-item">
                <Clock className="icon-xs" aria-hidden="true" />
                {video.duration}
              </span>
              {video.views !== undefined ? (
                <span className="podcast-detail__meta-item">
                  <Eye className="icon-xs" aria-hidden="true" />
                  {video.views.toLocaleString()} views
                </span>
              ) : null}
              {video.likes !== undefined ? (
                <span className="podcast-detail__meta-item">
                  <Heart className="icon-xs" aria-hidden="true" />
                  {video.likes.toLocaleString()} likes
                </span>
              ) : null}
            </div>

            {/* Description */}
            <p className="text-body-guideline">{video.description}</p>

            {/* Long-form rich content */}
            {htmlContent ? (
              <section aria-labelledby="video-content-heading">
                <h2 id="video-content-heading" className="text-card-h3">
                  {videosUI.detail.showNotesLabel}
                </h2>
                <div
                  className="video-rich-text"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </section>
            ) : null}

            {/* ── Tags + Share Footer ── */}
            <section className="video-detail__footer">
              <div className="tags-share-container">

                {/* Tags Section */}
                <div className="tags-section">
                  <div className="section-label mb-fluid-sm">
                    <Tag className="icon-sm text-neon-purple" />
                    <span>Tags:</span>
                  </div>

                  {video.tags && video.tags.length > 0 ? (
                    <div className="tags-list">
                      {video.tags.map(function (tag) {
                        return (
                          <button
                            type="button"
                            key={tag}
                            onClick={function () {
                              navigate('/videos/tag/' + encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-')));
                            }}
                            className="tag-badge clickable"
                            aria-label={'View videos tagged ' + tag}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="no-tags-text">No tags available</p>
                  )}
                </div>

                {/* Share Section */}
                <div className="share-section">
                  <div className="section-label mb-fluid-sm">
                    <ShareNetwork className="icon-sm text-neon-purple" />
                    <span>Share this:</span>
                  </div>
                  <div className="share-buttons">
                    <ShareComponent
                      label=""
                      title={video.title}
                      description={video.description}
                      url={typeof window !== 'undefined' ? window.location.href : 'https://ashshaw.makeup/video/' + slug}
                      imageUrl={video.thumbnailUrl}
                      variant="inline"
                      align="left"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Per-item FAQs — shown only if the video has item-level FAQs */}
            {video.faqs && video.faqs.length > 0 ? (
              <FaqSection items={video.faqs} />
            ) : null}

            {/* Related */}
            {related.length > 0 ? (
              <section aria-labelledby="related-videos-heading">
                <h2 id="related-videos-heading" className="text-card-h3">
                  {videosUI.detail.relatedLabel}
                </h2>
                <div className="videos-grid">
                  {related.map(function (rv) {
                    return (
                      <article
                        key={rv.id}
                        className="video-card"
                        onClick={function () { navigate('/video/' + rv.slug); }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={function (e) {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate('/video/' + rv.slug);
                          }
                        }}
                      >
                        <div className="video-card__thumbnail-wrapper">
                          <div className="video-card__play-overlay" aria-hidden="true">
                            <Play className="video-card__play-icon" />
                          </div>
                        </div>
                        <div className="video-card__content">
                          <h3 className="video-card__title">{rv.title}</h3>
                          <p className="video-card__meta">
                            {formatDate(rv.publishedAt)} \u00b7 {rv.duration}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <FaqSection pageId="videos" />
    </main>
  );
}