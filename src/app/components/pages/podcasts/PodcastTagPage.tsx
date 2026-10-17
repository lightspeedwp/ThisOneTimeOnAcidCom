/**
 * @fileoverview Podcast tag archive page
 * Displays podcast episodes filtered by tag, following the blog/portfolio pattern
 *
 * @component PodcastTagPage
 * @version 1.0.0
 */

import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from '../../../lib/router';
import { Calendar, Clock, Microphone, PlayCircle, Tag } from '@phosphor-icons/react';
import { podcastEpisodes } from '../../../data/mock/podcasts/episodes';
import { findPodcastTagBySlug } from '../../../data/mock/podcasts/tags';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { FaqSection } from '../../sections/FaqSection';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { formatDate } from '../../../utils/formatDate';
import { setSEO } from '../../../utils/seo';
import { podcastTagSEO } from '../../../data/mock/seo';
import { podcastTagBreadcrumbs } from '../../../data/mock/ui/breadcrumbs';
import { emptyStateMessages } from '../../../data/mock/ui/error';
import {
  injectSchema,
  removeSchema,
  SCHEMA_IDS,
  buildCollectionSchema,
} from '../../../utils/schemaService';
import '../../../../styles/blocks/podcasts-page.css';
import '../../../../styles/blocks/archive-filters.css';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetical', label: 'A-Z' },
  { value: 'featured', label: 'Featured' },
];

export function PodcastTagPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('recent');

  const tag = findPodcastTagBySlug(slug ? slug : '');

  useEffect(() => {
    if (tag) {
      setSEO(podcastTagSEO(tag.name));
      const epCount = filteredEpisodes ? filteredEpisodes.length : 0;
      injectSchema(SCHEMA_IDS.collection, buildCollectionSchema(
        `${tag.name} | Podcasts`,
        podcastTagSEO(tag.name).description,
        `/podcasts/tag/${slug}`,
        epCount,
      ));
    }
    return () => {
      removeSchema(SCHEMA_IDS.collection);
    };
  }, [tag, slug]);

  const filteredEpisodes = useMemo(function () {
    if (!slug) return [];
    const tagName = tag ? tag.name : slug.replace(/-/g, ' ');
    let eps = podcastEpisodes.filter(function (ep) {
      const epTags = ep.tags ? ep.tags : [];
      return epTags.some(function (t) { return t.toLowerCase() === tagName.toLowerCase(); });
    });

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
  }, [slug, tag, sortBy]);

  /** Related tags from the matching episodes */
  const relatedTags = useMemo(function () {
    const tagSet = new Set();
    const currentTagName = tag ? tag.name : '';
    filteredEpisodes.forEach(function (ep) {
      const epTags = ep.tags ? ep.tags : [];
      epTags.forEach(function (t) {
        if (t.toLowerCase() !== currentTagName.toLowerCase()) {
          tagSet.add(t);
        }
      });
    });
    return Array.from(tagSet).slice(0, 8);
  }, [filteredEpisodes, tag]);

  return (
    <main id="main-content" role="main" tabIndex={-1} className="podcasts-archive bg-atomic-noise">
      {/* Header */}
      <div className="podcasts-archive__header section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          <Breadcrumbs items={podcastTagBreadcrumbs(tag ? tag.name : (slug ? slug : ''))} centered />
          <Tag className="icon-xl" aria-hidden="true" />
          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {tag ? tag.name : slug}
          </h1>
          {tag && tag.description && (
            <p className="text-body-guideline">{tag.description}</p>
          )}
          <p className="podcasts-archive__count">
            {filteredEpisodes.length} episode{filteredEpisodes.length === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      <div className="podcasts-archive-content section-spacing px-horizontal-section">
        <div className="container-wide section-container">
          {/* Sort pills */}
        <div className="archive-filters__sort">
          {SORT_OPTIONS.map(function (opt) {
            return (
              <button
                type="button"
                key={opt.value}
                className={'archive-filters__chip ' + (sortBy === opt.value ? 'archive-filters__chip--active' : '')}
                onClick={function () { setSortBy(opt.value); }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Related tags */}
        {relatedTags.length > 0 && (
          <div className="archive-filters__categories">
            {relatedTags.map(function (rt) {
              return (
                <button
                  type="button"
                  key={rt}
                  className="archive-filters__chip"
                  onClick={function () {
                    navigate(
                      '/podcasts/tag/' + rt.toLowerCase().replace(/\s+/g, '-')
                    );
                  }}
                >
                  {rt}
                </button>
              );
            })}
          </div>
        )}

        {/* Episode Grid */}
        {filteredEpisodes.length > 0 ? (
          <div className="podcasts-archive__grid">
            {filteredEpisodes.map(function (ep) {
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
            })}
          </div>
        ) : (
          <div className="error-card">
            <Microphone className="icon-xl" aria-hidden="true" />
            <h3 className="error-title">{emptyStateMessages.podcasts.title}</h3>
            <p className="error-message">
              {emptyStateMessages.podcasts.tagMessage}
            </p>
          </div>
        )}
      </div>
      </div>

      <FaqSection pageId="podcasts" />
    </main>
  );
}