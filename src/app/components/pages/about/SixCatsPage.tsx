/**
 * @fileoverview Six Cats Club — Craft Cannabis, Consciously Cultivated
 *
 * Ash Shaw's cannabis club in Cape Town: nearly 20 years of growing
 * experience, a proprietary grading system, sustainable cultivation,
 * and the rescue cats who became the brand's soul.
 *
 * Phase 5 Polish — Accordion for grading, ContentSection for body,
 * bundler-safe syntax (no arrow functions, template literals, const, destructuring)
 *
 * @component SixCatsPage
 * @version 2.0.0
 */

import React, { useEffect, useState } from 'react';
import { sixCatsPageData } from '../../../data/mock/pages/six-cats';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { Accordion } from '../../ui/Accordion';
import { ContentSection } from '../../sections/ContentSection';
import {
  Leaf,
  Sparkle,
  Lightning,
  Clock,
  Scissors,
  Star,
  Heart,
  CaretDown,
  CaretUp,
  Stack,
  ArrowsClockwise,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import '../../../../styles/blocks/about-subpage.css';
import '../../../../styles/blocks/six-cats-page.css';

/**
 * Resolve cultivation icon by method id
 */
function getCultivationIcon(id) {
  if (id === 'living-soil') return Leaf;
  if (id === 'rainwater') return Sparkle;
  if (id === 'companion-planting') return Lightning;
  if (id === 'worm-tea') return Clock;
  return Leaf;
}

/**
 * Resolve harvest icon by phase id
 */
function getHarvestIcon(id) {
  if (id === 'flushing') return Sparkle;
  if (id === 'drying') return Scissors;
  if (id === 'dry-trimming') return Star;
  if (id === 'curing') return Heart;
  return Clock;
}

/**
 * Build accordion items from grading system data
 */
function buildGradeAccordion() {
  var grades = sixCatsPageData.grades;
  var items = [];
  for (var i = 0; i < grades.length; i++) {
    var grade = grades[i];
    items.push({
      id: grade.id,
      title: grade.grade + ' — ' + grade.name + ': ' + grade.tagline,
      content: React.createElement(
        'p',
        { className: 'six-cats-page__grade-desc' },
        grade.description
      ),
    });
  }
  return items;
}

/**
 * Filter cats by status
 */
function filterCats(status) {
  var cats = sixCatsPageData.cats;
  var result = [];
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].status === status) {
      result.push(cats[i]);
    }
  }
  return result;
}

export function SixCatsPage() {
  var showMemorialState = useState(false);
  var showMemorial = showMemorialState[0];
  var setShowMemorial = showMemorialState[1];

  useEffect(function () {
    setSEO(pageSEO.sixCats);
  }, []);

  var data = sixCatsPageData;
  var hero = data.hero;
  var breadcrumbs = data.breadcrumbs;
  var website = data.website;
  var vision = data.vision;
  var mission = data.mission;
  var originStory = data.originStory;
  var philosophy = data.philosophy;
  var values = data.values;
  var cultivation = data.cultivation;
  var harvest = data.harvest;
  var packaging = data.packaging;
  var sections = data.sections;
  var a11y = data.a11y;

  var livingCats = filterCats('alive');
  var memorialCats = filterCats('memorial');
  var gradeAccordionItems = buildGradeAccordion();

  function handleToggleMemorial() {
    setShowMemorial(!showMemorial);
  }

  return (
    <main
      id="main-content"
      role="main"
      tabIndex={-1}
      className="about-subpage about-subpage--six-cats six-cats-page bg-atomic-noise"
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

          <a
            className="six-cats-page__website-link"
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowSquareOut
              className="six-cats-page__link-icon"
              aria-hidden="true"
            />
            {website.url}
          </a>
        </div>
      </header>

      {/* ── Vision & Mission ── */}
      <section
        className="six-cats-page__vision-mission section-spacing px-horizontal-section"
        aria-label={a11y.visionMissionLabel}
      >
        <div className="section-container six-cats-page__vm-card">
          <h2 className="six-cats-page__vm-heading">
            {website.name} &mdash; {website.tagline}
          </h2>
          <div className="six-cats-page__vm-pair">
            <div className="six-cats-page__vm-block">
              <span className="six-cats-page__vm-label">Vision</span>
              <p className="six-cats-page__vm-text">{vision}</p>
            </div>
            <div className="six-cats-page__vm-block">
              <span className="six-cats-page__vm-label">Mission</span>
              <p className="six-cats-page__vm-text">{mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Origin Story (from ebook Ch10) ── */}
      <section
        className="six-cats-page__origin-story section-spacing px-horizontal-section"
        aria-label={a11y.originStoryLabel}
      >
        <div className="section-container about-subpage__body">
          <div className="entrance-fade-up">
            <ContentSection
              id={originStory.id}
              title={originStory.title}
              variant="default"
              colorAccent="green"
            >
              {originStory.paragraphs.map(function (p, i) {
                return (
                  <p
                    key={'origin-p-' + i}
                    className="about-subpage__section-text"
                  >
                    {p}
                  </p>
                );
              })}
            </ContentSection>
          </div>
        </div>
      </section>

      {/* ── Body Sections (Phase 3 ContentSection) ── */}
      <div className="about-subpage__body section-spacing px-horizontal-section">
        <div className="section-container">
          {sections.map(function (section, idx) {
          var delayClass = idx < 6 ? ' entrance-fade-up--delay-' + (idx + 1) : '';

          return (
            <div key={section.id} className={'entrance-fade-up' + delayClass}>
              <ContentSection
                id={section.id}
                title={section.title}
                variant="default"
                colorAccent="green"
              >
                {section.paragraphs.map(function (p, i) {
                  return (
                    <p
                      key={section.id + '-p-' + i}
                      className="about-subpage__section-text"
                    >
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

      {/* ── Philosophy (from ebook Ch10) ── */}
      <section
        className="six-cats-page__philosophy section-spacing px-horizontal-section"
        aria-label={a11y.philosophyLabel}
      >
        <div className="section-container about-subpage__body">
          <div className="entrance-fade-up">
            <ContentSection
              id={philosophy.id}
              title={philosophy.title}
              variant="default"
              colorAccent="green"
            >
              {philosophy.paragraphs.map(function (p, i) {
                return (
                  <p
                    key={'philosophy-p-' + i}
                    className="about-subpage__section-text"
                  >
                    {p}
                  </p>
                );
              })}
            </ContentSection>
          </div>
        </div>
      </section>

      {/* ── The Cats ── */}
      <section className="six-cats-page__cats section-spacing px-horizontal-section" aria-label={a11y.catsListLabel}>
        <div className="section-container">
          <h2 className="six-cats-page__section-heading">
            <Stack className="six-cats-page__heading-icon" aria-hidden="true" />
            The Current Pack
          </h2>
          <div className="six-cats-page__cats-grid" role="list">
            {livingCats.map(function (cat) {
              return (
                <article
                  key={cat.id}
                  className="six-cats-page__cat-card"
                  role="listitem"
                >
                  <div className="six-cats-page__cat-header">
                    <h3 className="six-cats-page__cat-name">{cat.name}</h3>
                    <span className="six-cats-page__cat-nickname">
                      {cat.nickname}
                    </span>
                  </div>
                  <span className="six-cats-page__cat-role">{cat.role}</span>
                  <p className="six-cats-page__cat-bio">{cat.bio}</p>
                </article>
              );
            })}
          </div>

          {/* ── Memorial ── */}
          <div className="six-cats-page__memorial">
            <button
              type="button"
              className="six-cats-page__memorial-toggle"
              onClick={handleToggleMemorial}
              aria-expanded={showMemorial}
              aria-controls="memorial-section"
            >
              <Heart
                className="six-cats-page__memorial-icon"
                aria-hidden="true"
              />
              In Memoriam
              {showMemorial ? (
                <CaretUp
                  className="six-cats-page__chevron"
                  aria-hidden="true"
                />
              ) : (
                <CaretDown
                  className="six-cats-page__chevron"
                  aria-hidden="true"
                />
              )}
            </button>

            {showMemorial && (
              <div
                id="memorial-section"
                className="six-cats-page__cats-grid six-cats-page__cats-grid--memorial"
                role="list"
                aria-label={a11y.memorialLabel}
              >
                {memorialCats.map(function (cat) {
                  return (
                    <article
                      key={cat.id}
                      className="six-cats-page__cat-card six-cats-page__cat-card--memorial"
                      role="listitem"
                    >
                      <div className="six-cats-page__cat-header">
                        <h3 className="six-cats-page__cat-name">{cat.name}</h3>
                        <span className="six-cats-page__cat-nickname">
                          {cat.nickname}
                        </span>
                      </div>
                      <span className="six-cats-page__cat-role">{cat.role}</span>
                      {cat.datePassed && (
                        <time className="six-cats-page__cat-date">
                          {cat.datePassed}
                        </time>
                      )}
                      <p className="six-cats-page__cat-bio">{cat.bio}</p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Grading System (Phase 3 Accordion) ── */}
      <section className="six-cats-page__grades section-spacing px-horizontal-section" aria-label={a11y.gradesLabel}>
        <div className="section-container about-subpage__body">
          <div className="entrance-fade-up">
            <ContentSection
              id="grading-system"
              title="Grading System"
              variant="default"
              colorAccent="green"
            >
              <Accordion
                items={gradeAccordionItems}
                allowMultiple={false}
              />
            </ContentSection>
          </div>
        </div>
      </section>

      {/* ── Cultivation ── */}
      <section
        className="six-cats-page__cultivation section-spacing px-horizontal-section"
        aria-label={a11y.cultivationLabel}
      >
        <div className="section-container">
          <h2 className="six-cats-page__section-heading">
            <Leaf className="six-cats-page__heading-icon" aria-hidden="true" />
            Cultivation
          </h2>
          <div className="six-cats-page__cultivation-grid" role="list">
            {cultivation.map(function (method) {
              var IconComp = getCultivationIcon(method.id);
              return (
                <article
                  key={method.id}
                  className="six-cats-page__cultivation-card"
                  role="listitem"
                >
                  <IconComp
                    className="six-cats-page__cultivation-icon"
                    aria-hidden="true"
                  />
                  <h3 className="six-cats-page__cultivation-title">
                    {method.title}
                  </h3>
                  <p className="six-cats-page__cultivation-desc">
                    {method.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Harvest ── */}
      <section className="six-cats-page__harvest section-spacing px-horizontal-section" aria-label={a11y.harvestLabel}>
        <div className="section-container">
          <h2 className="six-cats-page__section-heading">
            <Scissors className="six-cats-page__heading-icon" aria-hidden="true" />
            Harvest Phases
          </h2>
          <div className="six-cats-page__harvest-timeline" role="list">
            {harvest.map(function (phase, idx) {
              var IconComp = getHarvestIcon(phase.id);
              return (
                <article
                  key={phase.id}
                  className="six-cats-page__harvest-phase"
                  role="listitem"
                >
                  <div className="six-cats-page__harvest-marker">
                    <span className="six-cats-page__harvest-number">
                      {idx + 1}
                    </span>
                    <IconComp
                      className="six-cats-page__harvest-icon"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="six-cats-page__harvest-body">
                    <h3 className="six-cats-page__harvest-title">
                      {phase.title}
                    </h3>
                    {phase.paragraphs.map(function (p, i) {
                      return (
                        <p
                          key={phase.id + '-p-' + i}
                          className="six-cats-page__harvest-text"
                        >
                          {p}
                        </p>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Packaging ── */}
      <section
        className="six-cats-page__packaging section-spacing px-horizontal-section"
        aria-label={a11y.packagingLabel}
      >
        <div className="section-container">
          <h2 className="six-cats-page__section-heading">
            <Stack className="six-cats-page__heading-icon" aria-hidden="true" />
            Packaging &amp; Sustainability
          </h2>
          <div className="six-cats-page__packaging-grid">
            {packaging.map(function (pkg) {
              var PkgIcon = pkg.id === 'glass' ? ArrowsClockwise : Leaf;
              return (
                <article key={pkg.id} className="six-cats-page__packaging-card">
                  <PkgIcon
                    className="six-cats-page__packaging-icon"
                    aria-hidden="true"
                  />
                  <h3 className="six-cats-page__packaging-title">{pkg.title}</h3>
                  {pkg.paragraphs.map(function (p, i) {
                    return (
                      <p
                        key={pkg.id + '-p-' + i}
                        className="six-cats-page__packaging-text"
                      >
                        {p}
                      </p>
                    );
                  })}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="six-cats-page__values section-spacing px-horizontal-section" aria-label={a11y.valuesLabel}>
        <div className="section-container">
          <h2 className="six-cats-page__section-heading">
            Our Values
          </h2>
          <div className="six-cats-page__values-grid" role="list">
            {values.map(function (value) {
              return (
                <article
                  key={value.id}
                  className="six-cats-page__value-card"
                  role="listitem"
                >
                  <h3 className="six-cats-page__value-title">{value.title}</h3>
                  <p className="six-cats-page__value-desc">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}