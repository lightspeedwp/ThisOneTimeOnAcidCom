/**
 * @fileoverview Podcast page — describes the Neon vs Atomic Black podcast
 *
 * Features show description, format overview, and episode previews.
 * Phase 5 Polish — ContentSection + Accordion for episodes, bundler-safe syntax
 *
 * @component PodcastPage
 * @version 2.0.0
 */

import React, { useEffect } from 'react';
import { Microphone, Headphones } from '@phosphor-icons/react';
import { podcastPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { ContentSection } from '../../sections/ContentSection';
import { Accordion } from '../../ui/Accordion';
import '../../../../styles/blocks/about-subpage.css';

/**
 * Build accordion items from episode previews
 */
function buildEpisodeAccordion() {
  var episodes = podcastPageData.episodes;
  var items = [];
  for (var i = 0; i < episodes.length; i++) {
    var ep = episodes[i];
    items.push({
      id: ep.id,
      title: 'EP ' + ep.number + ': ' + ep.title,
      content: React.createElement(
        'p',
        { className: 'about-subpage__chapter-teaser' },
        ep.description
      ),
    });
  }
  return items;
}

export function PodcastPage() {
  useEffect(function () {
    setSEO(pageSEO.podcast);
  }, []);

  var data = podcastPageData;
  var hero = data.hero;
  var breadcrumbs = data.breadcrumbs;
  var sections = data.sections;
  var episodeAccordionItems = buildEpisodeAccordion();

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--podcast bg-atomic-noise"
    >
      {/* ── Hero ── */}
      <header className="about-subpage__hero section-spacing px-horizontal-section">
        <div className="about-subpage__hero-content section-container">
          <Breadcrumbs items={breadcrumbs} centered />

          <span className="about-subpage__hero-badge">
            {hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {hero.title}
          </h1>

          <p className="about-subpage__hero-desc text-body-p">
            {hero.description}
          </p>
        </div>
      </header>

      {/* ── Show Info ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <section className="about-subpage__section">
            <h2 className="about-subpage__section-title">
              <Microphone className="about-subpage__inline-icon" aria-hidden="true" />
              {data.showName}
            </h2>
            <p className="about-subpage__section-text">{data.tagline}</p>
          </section>

          {/* ── Format ── */}
          <div className="entrance-fade-up">
            <ContentSection
              id="podcast-format"
              title="Format"
              variant="default"
              colorAccent="pink"
            >
              {data.format.map(function (line, i) {
                return (
                  <p key={'format-' + i} className="about-subpage__section-text">
                    {line}
                  </p>
                );
              })}
            </ContentSection>
          </div>

          {/* ── Body Sections (Phase 3 ContentSection) ── */}
          {sections.map(function (section, idx) {
            var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

            return (
              <div key={section.id} className={'entrance-fade-up' + delayClass}>
                <ContentSection
                  id={section.id}
                  title={section.title}
                  variant="default"
                  colorAccent="pink"
                >
                  {section.paragraphs.map(function (p, i) {
                    return (
                      <p key={section.id + '-p-' + i} className="about-subpage__section-text">
                        {p}
                      </p>
                    );
                  })}
                </ContentSection>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Episode Previews as Accordion (Phase 3) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up entrance-fade-up--delay-2">
            <ContentSection
              id="upcoming-episodes"
              title="Upcoming Episodes"
              variant="default"
              colorAccent="pink"
            >
              <Accordion
                items={episodeAccordionItems}
                allowMultiple={true}
              />
            </ContentSection>
          </div>
        </div>
      </div>
    </main>
  );
}