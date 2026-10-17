/**
 * @fileoverview Music Identity Page
 *
 * @component MusicPage
 * @version 3.0.0
 */

import React, { useEffect } from 'react';
import { musicPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { PullQuote } from '../../ui/PullQuote';
import { ContentSection } from '../../sections/ContentSection';
import { SpotifyLogo, SoundcloudLogo, Playlist, Record, MusicNotes, PlayCircle } from '@phosphor-icons/react';
import '../../../../styles/blocks/about-subpage.css';
import '../../../../styles/blocks/music-page.css';

export function MusicPage() {
  useEffect(function () {
    setSEO(pageSEO.music);
  }, []);

  var data = musicPageData;

  function renderArtistCard(artist, idx) {
    return React.createElement('div', {
      key: artist.id,
      className: 'music-list-item music-list-item--artist entrance-fade-up entrance-fade-up--delay-' + (idx % 5 + 1)
    }, 
      React.createElement('span', { className: 'music-list-item__icon' }, 
        React.createElement(Record, { size: 16, weight: 'duotone', color: 'currentColor' })
      ),
      artist.name
    );
  }

  function renderSpotifyGroup(group, idx) {
    return React.createElement('section', {
      key: group.id,
      className: 'music-group-section entrance-fade-up entrance-fade-up--delay-' + (idx % 3 + 1)
    },
      React.createElement('div', { className: 'music-group-header' },
        React.createElement('h3', { className: 'music-group-title text-gradient-toxic-lime' }, 
          React.createElement(SpotifyLogo, { size: 32, weight: 'fill', color: '#1ED760' }),
          group.title
        ),
        React.createElement('p', { className: 'music-group-desc mt-2' }, group.description)
      ),
      React.createElement('div', { className: 'music-grid music-grid--artists' },
        group.artists.map(renderArtistCard)
      )
    );
  }

  function renderSoundcloudGroup(group, idx) {
    return React.createElement('article', {
      key: group.id,
      className: 'music-card music-card--soundcloud entrance-fade-up entrance-fade-up--delay-' + (idx % 3 + 1)
    },
      React.createElement('div', { className: 'music-card__header mb-4' },
        React.createElement('h4', { className: 'music-card__title flex items-center gap-2 relative z-10' }, 
          React.createElement(SoundcloudLogo, { size: 28, weight: 'fill', color: '#FF5500' }),
          group.title
        ),
        React.createElement('p', { className: 'music-card__subtitle relative z-10 mt-1' }, group.description)
      ),
      React.createElement('div', { className: 'music-list relative z-10 mt-auto pt-4 border-t border-white/5' },
        group.items.map(function(item, i) {
          return React.createElement('div', { key: i, className: 'music-list-item music-list-item--small' },
            React.createElement('span', { className: 'music-list-item__bullet' }, '>'),
            item
          );
        })
      )
    );
  }

  function renderDailyMix(mix, idx) {
    return React.createElement('article', {
      key: mix.id,
      className: 'music-card music-card--spotify entrance-fade-up entrance-fade-up--delay-' + (idx % 5 + 1)
    },
      React.createElement('div', { className: 'music-card__overlay-icon' },
        React.createElement(PlayCircle, { size: 48, weight: 'fill', color: 'var(--spotify-accent)' })
      ),
      React.createElement('h4', { className: 'music-card__title flex items-center gap-2 relative z-10' },
        React.createElement(Playlist, { size: 24, weight: 'duotone', color: 'var(--neon-pink)' }),
        mix.title
      ),
      React.createElement('p', { className: 'music-card__subtitle relative z-10' }, mix.artists)
    );
  }

  function renderSection(section, idx) {
    var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';
    return React.createElement('div', { key: section.id, className: 'entrance-fade-up' + delayClass },
      React.createElement(ContentSection, {
        id: section.id,
        title: section.title,
        variant: 'default',
        colorAccent: 'blue'
      },
        section.paragraphs.map(function (p, i) {
          return React.createElement('p', {
            key: section.id + '-p-' + i,
            className: 'about-subpage__section-text'
          }, p);
        })
      )
    );
  }

  var musicStats = {
    pageId: 'music',
    stats: [
      { id: 'bpm', label: 'Heartbeat', value: '140', unit: ' BPM', icon: 'Lightning', description: 'Psytrance tempo' },
      { id: 'artists', label: 'Curated Artists', value: data.spotifyGroups.reduce(function(acc, g) { return acc + g.artists.length; }, 0), icon: 'Palette', description: 'Across 4 genres' },
      { id: 'mixes', label: 'Daily Mixes', value: data.dailyMixes.length, icon: 'Target', description: 'Heavy rotation' },
      { id: 'soundcloud', label: 'Underground Sets', value: data.soundcloudGroups.reduce(function(acc, g) { return acc + g.items.length; }, 0), icon: 'Cloud', description: 'Berlin & Festivals' }
    ]
  };

  return React.createElement('main', {
    id: 'main-content',
    role: 'main',
    tabIndex: -1,
    className: 'about-subpage about-subpage--music bg-atomic-noise music-page'
  },
    React.createElement('header', { className: 'music-hero px-horizontal-section' },
      React.createElement('div', { className: 'music-hero__container' },
        React.createElement('div', { className: 'music-hero__left' },
          React.createElement('div', { className: 'music-hero__breadcrumbs' },
            React.createElement(Breadcrumbs, { items: data.breadcrumbs })
          ),
          React.createElement('span', { className: 'about-subpage__hero-badge' },
            React.createElement(MusicNotes, { size: 16, weight: 'bold' }),
            data.hero.badge
          ),
          React.createElement('h1', { className: 'text-hero-h1 text-gradient-pink-purple-blue mb-6' }, data.hero.title),
          React.createElement('p', { className: 'about-subpage__hero-desc text-body-p mb-8' }, data.hero.description),
          React.createElement('div', { className: 'music-cta-group' },
            React.createElement('a', { 
              href: data.spotifyProfileUrl, 
              target: '_blank', 
              rel: 'noopener noreferrer',
              className: 'music-btn music-btn--spotify'
            },
              React.createElement(SpotifyLogo, { size: 24, weight: 'fill' }),
              'Listen on Spotify'
            ),
            React.createElement('a', { 
              href: data.soundcloudProfileUrl, 
              target: '_blank', 
              rel: 'noopener noreferrer',
              className: 'music-btn music-btn--soundcloud'
            },
              React.createElement(SoundcloudLogo, { size: 24, weight: 'fill' }),
              'Listen on SoundCloud'
            )
          )
        ),
        React.createElement('div', { className: 'music-hero__right' },
          React.createElement('div', { className: 'music-hero__3d-graphic' },
            React.createElement('svg', { 
              viewBox: "0 0 400 400", 
              className: "music-hero__visualizer",
              xmlns: "http://www.w3.org/2000/svg"
            },
              React.createElement('defs', null,
                React.createElement('linearGradient', { id: 'eq-grad-1', x1: '0', y1: '1', x2: '0', y2: '0' },
                  React.createElement('stop', { offset: '0%', stopColor: 'rgba(0, 247, 255, 0.1)' }),
                  React.createElement('stop', { offset: '50%', stopColor: 'rgba(190, 0, 254, 0.8)' }),
                  React.createElement('stop', { offset: '100%', stopColor: '#FF10F0' })
                ),
                React.createElement('linearGradient', { id: 'eq-grad-2', x1: '0', y1: '1', x2: '0', y2: '0' },
                  React.createElement('stop', { offset: '0%', stopColor: 'rgba(0, 68, 255, 0.1)' }),
                  React.createElement('stop', { offset: '60%', stopColor: '#00F7FF' }),
                  React.createElement('stop', { offset: '100%', stopColor: '#39FF14' })
                )
              ),
              React.createElement('g', { className: 'music-hero__grid-plane' },
                [0,1,2,3,4,5,6,7].map(function(i) {
                  return React.createElement('path', {
                    key: 'grid-h-' + i,
                    d: 'M 0,' + (i * 50) + ' L 400,' + (i * 50),
                    stroke: 'rgba(0, 247, 255, 0.1)',
                    strokeWidth: '1'
                  });
                }),
                [0,1,2,3,4,5,6,7].map(function(i) {
                  return React.createElement('path', {
                    key: 'grid-v-' + i,
                    d: 'M ' + (i * 50) + ',0 L ' + (i * 50) + ',400',
                    stroke: 'rgba(190, 0, 254, 0.1)',
                    strokeWidth: '1'
                  });
                })
              ),
              React.createElement('g', { className: 'music-hero__eq-bars' },
                [0,1,2,3,4,5,6,7].map(function(i) {
                  var height = 50 + Math.random() * 200;
                  return React.createElement('rect', {
                    key: 'eq-bar-' + i,
                    x: 40 + i * 40,
                    y: 350 - height,
                    width: 24,
                    height: height,
                    fill: i % 2 === 0 ? 'url(#eq-grad-1)' : 'url(#eq-grad-2)',
                    rx: 4,
                    className: 'eq-bar eq-bar--delay-' + i
                  });
                })
              )
            )
          )
        )
      )
    ),

    React.createElement('div', { className: 'about-subpage__body section-spacing px-horizontal-section' },
      React.createElement('div', { className: 'section-container' },
        React.createElement('div', { className: 'entrance-fade-up' },
          React.createElement(PullQuote, {
            quote: data.pullQuote,
            variant: 'center',
            neonColor: 'blue'
          })
        )
      )
    ),

    React.createElement('div', { className: 'about-subpage__body section-spacing px-horizontal-section mt-8' },
      React.createElement('div', { className: 'section-container' },
        React.createElement('h2', { className: 'text-section-h2 mb-12 text-gradient-toxic-lime flex items-center gap-4 border-b border-white/10 pb-4' },
          React.createElement(SpotifyLogo, { size: 48, weight: 'fill', color: '#1ED760' }),
          'Spotify Favourites'
        ),
        data.spotifyGroups.map(renderSpotifyGroup)
      )
    ),

    React.createElement('div', { className: 'about-subpage__body section-spacing px-horizontal-section bg-surface-elevated border-y border-white/5' },
      React.createElement('div', { className: 'section-container py-16' },
        React.createElement('h3', { className: 'text-section-h3 mb-10 text-gradient-solar-flare flex items-center gap-3' },
          React.createElement(Record, { size: 40, weight: 'duotone', color: 'var(--neon-orange)' }),
          'Heavy Rotation: Daily Mixes'
        ),
        React.createElement('div', { className: 'music-grid' },
          data.dailyMixes.map(renderDailyMix)
        )
      )
    ),

    React.createElement('div', { className: 'about-subpage__body section-spacing px-horizontal-section' },
      React.createElement('div', { className: 'section-container' },
        React.createElement('h2', { className: 'text-section-h2 mb-12 flex items-center gap-4 border-b border-white/10 pb-4' },
          React.createElement(SoundcloudLogo, { size: 48, weight: 'fill', className: 'text-soundcloud' }),
          React.createElement('span', { className: 'text-soundcloud' }, 'Underground Discoveries')
        ),
        React.createElement('div', { className: 'music-grid' },
          data.soundcloudGroups.map(renderSoundcloudGroup)
        )
      )
    ),

    React.createElement('div', { className: 'about-subpage__body section-spacing px-horizontal-section' },
      React.createElement('div', { className: 'section-container' },
        data.sections.map(renderSection)
      )
    )
  );
}