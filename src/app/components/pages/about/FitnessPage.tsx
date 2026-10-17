/**
 * @fileoverview Fitness — The Moving Body
 * How physical movement connects to Ash's creative output, mental health,
 * and ADHD regulation. Cycling, dance, yoga, running, triathlon, Muay Thai.
 *
 * Neon accent: Orange
 * Phase 7 Enrichment — Koh Phangan training base, intersection model
 *
 * @component FitnessPage
 * @version 3.0.0
 */

import React, { useEffect } from 'react';
import { fitnessPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { PullQuote } from '../../ui/PullQuote';
import { StatCard } from '../../ui/StatCard';
import { ContentSection } from '../../sections/ContentSection';
import { getTimelineByCategory, toTimelineEvents } from '../../../data/mock/timeline';
import { Timeline } from '../../ui/Timeline';
import '../../../../styles/blocks/about-subpage.css';

export function FitnessPage() {
  useEffect(function () {
    setSEO(pageSEO.fitness);
  }, []);

  var data = fitnessPageData;
  var fitnessMilestones = toTimelineEvents(getTimelineByCategory('fitness'));

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--fitness bg-atomic-noise"
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

      {/* ── Pull Quote (Phase 3) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <PullQuote
              quote={data.pullQuote}
              variant="center"
              neonColor="orange"
            />
          </div>

          {/* ── Stats Grid ── */}
          <StatCard
            items={data.stats}
            ariaLabel="Fitness stats"
          />
        </div>
      </div>

      {/* ── Sports Grid ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container about-subpage__destinations" aria-label="Sport disciplines">
          {data.sports.map(function (sport) {
            return (
              <article key={sport.id} className="about-subpage__destination">
                <div className="about-subpage__destination-name">
                  {sport.name}
                </div>
                <span className="about-subpage__destination-region">
                  {'Since ' + sport.since}
                </span>
                <p className="about-subpage__destination-desc">
                  {sport.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Koh Phangan Training Base (from ebook Ch9) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up">
            <ContentSection
              id={data.kohPhanganTraining.id}
              title={data.kohPhanganTraining.title}
              variant="callout"
              colorAccent="orange"
            >
              {data.kohPhanganTraining.paragraphs.map(function (p, i) {
                return (
                  <p
                    key={'kp-p-' + i}
                    className="about-subpage__section-text"
                  >
                    {p}
                  </p>
                );
              })}
            </ContentSection>
          </div>

          {/* ── Intersection Model (from ebook Ch15) ── */}
          <div className="entrance-fade-up entrance-fade-up--delay-1">
            <ContentSection
              id={data.intersectionModel.id}
              title={data.intersectionModel.title}
              variant="default"
              colorAccent="orange"
            >
              <p className="about-subpage__section-text">
                {data.intersectionModel.intro}
              </p>

              <div
                role="list"
                aria-label="How each discipline feeds the next"
              >
                {data.intersectionModel.connections.map(function (conn) {
                  return (
                    <div
                      key={conn.id}
                      className="about-subpage__section"
                      role="listitem"
                    >
                      <h3 className="about-subpage__section-subtitle">
                        {conn.from + ' \u2192 ' + conn.to}
                      </h3>
                      <p className="about-subpage__section-text">
                        {conn.connection}
                      </p>
                    </div>
                  );
                })}
              </div>

              <PullQuote
                quote={data.intersectionModel.closing}
                variant="center"
                neonColor="orange"
              />
            </ContentSection>
          </div>
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
                colorAccent="orange"
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

      {/* ── Timeline (Phase 3 ContentSection) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          <div className="entrance-fade-up entrance-fade-up--delay-7">
            <ContentSection
              id="fitness-milestones"
              title="Fitness Milestones"
              variant="default"
              colorAccent="orange"
            >
              <Timeline
                events={fitnessMilestones}
                colorAccent="orange"
              />
            </ContentSection>
          </div>
        </div>
      </div>
    </main>
  );
}