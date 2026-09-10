/**
 * @fileoverview Travels page — Ash's nomadic festival circuit
 *
 * Phase 5 Polish — ContentSection for body, bundler-safe syntax
 *
 * @component TravelsPage
 * @version 2.0.0
 */

import React, { useEffect } from 'react';
import { MapPin } from '@phosphor-icons/react';
import { travelsPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { ContentSection } from '../../sections/ContentSection';
import '../../../../styles/blocks/about-subpage.css';

export function TravelsPage() {
  useEffect(function () {
    setSEO(pageSEO.travels);
  }, []);

  var data = travelsPageData;

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--travels bg-atomic-noise"
    >
      {/* ── Hero ── */}
      <header className="about-subpage__hero section-spacing px-horizontal-section">
        <div className="about-subpage__hero-content section-container">
          <Breadcrumbs items={data.breadcrumbs} centered />

          <span className="about-subpage__hero-badge">
            {data.hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {data.hero.title}
          </h1>

          <p className="about-subpage__hero-desc text-body-p">
            {data.hero.description}
          </p>
        </div>
      </header>

      {/* ── Destinations Grid ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container about-subpage__destinations" aria-label="Destinations">
          {data.destinations.map(function (dest) {
          return (
            <article key={dest.id} className="about-subpage__destination">
              <h2 className="about-subpage__destination-name">
                <MapPin
                  className="about-subpage__destination-icon"
                  aria-hidden="true"
                />
                {dest.name}
              </h2>
              <span className="about-subpage__destination-region">{dest.region}</span>
              <p className="about-subpage__destination-desc">{dest.description}</p>
            </article>
          );
        })}
        </div>
      </div>

      {/* ── Sections (Phase 3 ContentSection) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          {data.sections.map(function (section, idx) {
          var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

          return (
            <div key={section.id} className={'entrance-fade-up' + delayClass}>
              <ContentSection
                id={section.id}
                title={section.title}
                variant="default"
                colorAccent="red"
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
    </main>
  );
}