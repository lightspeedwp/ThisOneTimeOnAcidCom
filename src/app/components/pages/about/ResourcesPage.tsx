/**
 * @fileoverview Resources page — getting started guide for aspiring UV face painters.
 *
 * Route: /about/resources
 * Discoverable via: /about landing page, sitemap
 * Cross-references: Gear page (/toolkit), Portfolio, Videos
 *
 * BUNDLER SAFETY: No optional chaining, no destructuring, no template literals in
 * complex expressions, no arrow callbacks in React.createElement, var preferred.
 *
 * @component ResourcesPage
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import {
  Sparkle, PaintBrush, FirstAid, ArrowRight,
  Palette, Drop, Toolbox, Lightbulb,
  Warning, CaretRight, Star, Eye,
} from '@phosphor-icons/react';
import { resourcesPageData } from '../../../data/mock/pages/about-subpages';
import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { useNavigate } from '../../../lib/router';
import '../../../../styles/blocks/about-subpage.css';
import '../../../../styles/blocks/resources-page.css';

var KIT_ICONS: Record<string, React.ElementType> = {
  'cat-makeup': Palette,
  'cat-uv': Drop,
  'cat-tools': Toolbox,
  'cat-wisdom': Lightbulb,
};

export function ResourcesPage() {
  var navigate = useNavigate();

  useEffect(function () {
    var seo = pageSEO.resources;
    if (seo != null) {
      setSEO(seo);
    } else {
      setSEO({
        title: 'Resources | Getting started with UV makeup artistry',
        description: resourcesPageData.hero.description,
      });
    }
  }, []);

  var data = resourcesPageData;

  function handleCrossLinkClick(href: string) {
    return function (e: React.MouseEvent) {
      e.preventDefault();
      navigate(href);
    };
  }

  function renderTipCard(tip: typeof data.gettingStarted.tips[0], idx: number) {
    return React.createElement('div', {
      key: tip.id,
      className: 'resources-tip-card',
    },
      React.createElement('span', { className: 'resources-tip-card__number' }, idx + 1),
      React.createElement('h3', { className: 'resources-tip-card__title' }, tip.title),
      React.createElement('p', { className: 'resources-tip-card__description' }, tip.description)
    );
  }

  function renderKitCategory(cat: typeof data.essentialKit.categories[0]) {
    var IconComp = KIT_ICONS[cat.id];
    if (IconComp == null) {
      IconComp = PaintBrush;
    }

    var itemElements: React.ReactNode[] = [];
    for (var i = 0; i < cat.items.length; i = i + 1) {
      var item = cat.items[i];
      itemElements.push(
        React.createElement('li', { key: i, className: 'resources-kit-card__item' },
          React.createElement('span', { className: 'resources-kit-card__bullet' },
            React.createElement(CaretRight, { size: 12, weight: 'bold' })
          ),
          item
        )
      );
    }

    return React.createElement('div', {
      key: cat.id,
      className: 'resources-kit-card',
    },
      React.createElement('div', { className: 'resources-kit-card__icon' },
        React.createElement(IconComp, { size: 24, weight: 'duotone' })
      ),
      React.createElement('h3', { className: 'resources-kit-card__title' }, cat.title),
      React.createElement('p', { className: 'resources-kit-card__description' }, cat.description),
      React.createElement('ul', { className: 'resources-kit-card__list' }, itemElements)
    );
  }

  function renderBrandCard(brand: typeof data.recommendedBrands.brands[0]) {
    return React.createElement('div', {
      key: brand.id,
      className: 'resources-brand-card',
    },
      React.createElement('h3', { className: 'resources-brand-card__name' }, brand.name),
      React.createElement('p', { className: 'resources-brand-card__tagline' }, brand.tagline),
      React.createElement('p', { className: 'resources-brand-card__specialty' }, brand.specialty),
      React.createElement('div', { className: 'resources-brand-card__why' },
        React.createElement('span', { className: 'resources-brand-card__why-label' }, 'Why Ash recommends'),
        brand.whyAshLikes
      ),
      React.createElement('a', {
        className: 'resources-brand-card__link',
        href: brand.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }, 'Visit website \u2192')
    );
  }

  function renderPracticeTip(tip: typeof data.practiceGuide.tips[0], idx: number) {
    return React.createElement('div', {
      key: tip.id,
      className: 'resources-tip-card',
    },
      React.createElement('span', { className: 'resources-tip-card__number' }, idx + 1),
      React.createElement('h3', { className: 'resources-tip-card__title' }, tip.title),
      React.createElement('p', { className: 'resources-tip-card__description' }, tip.description)
    );
  }

  function renderSafetyItem(guideline: string, idx: number) {
    return React.createElement('li', {
      key: idx,
      className: 'resources-safety-item',
    },
      React.createElement('span', { className: 'resources-safety-icon' },
        React.createElement(Warning, { size: 18, weight: 'duotone' })
      ),
      guideline
    );
  }

  /* ── Intro paragraphs ── */
  var introParagraphs: React.ReactNode[] = [];
  for (var p = 0; p < data.intro.paragraphs.length; p = p + 1) {
    introParagraphs.push(
      React.createElement('p', { key: p, className: 'resources-intro__paragraph' }, data.intro.paragraphs[p])
    );
  }

  /* ── Tip cards ── */
  var tipCards: React.ReactNode[] = [];
  for (var t = 0; t < data.gettingStarted.tips.length; t = t + 1) {
    tipCards.push(renderTipCard(data.gettingStarted.tips[t], t));
  }

  /* ── Kit cards ── */
  var kitCards: React.ReactNode[] = [];
  for (var k = 0; k < data.essentialKit.categories.length; k = k + 1) {
    kitCards.push(renderKitCategory(data.essentialKit.categories[k]));
  }

  /* ── Brand cards ── */
  var brandCards: React.ReactNode[] = [];
  for (var b = 0; b < data.recommendedBrands.brands.length; b = b + 1) {
    brandCards.push(renderBrandCard(data.recommendedBrands.brands[b]));
  }

  /* ── Practice tips ── */
  var practiceTips: React.ReactNode[] = [];
  for (var pr = 0; pr < data.practiceGuide.tips.length; pr = pr + 1) {
    practiceTips.push(renderPracticeTip(data.practiceGuide.tips[pr], pr));
  }

  /* ── Safety items ── */
  var safetyItems: React.ReactNode[] = [];
  for (var s = 0; s < data.safetySection.guidelines.length; s = s + 1) {
    safetyItems.push(renderSafetyItem(data.safetySection.guidelines[s], s));
  }

  return React.createElement('main', {
    id: 'main-content',
    role: 'main',
    tabIndex: -1,
    className: 'resources-page bg-atomic-noise',
  },
    /* ── Hero ── */
    React.createElement('header', { className: 'resources-page__hero' },
      React.createElement('div', { className: 'container-xl text-center' },
        React.createElement(Breadcrumbs, {
          items: data.breadcrumbs,
          centered: true,
        }),
        React.createElement('span', { className: 'resources-page__hero-badge' }, data.hero.badge),
        React.createElement('h1', { className: 'text-hero-h1 text-gradient-toxic-lime mb-fluid-md' }, data.hero.title),
        React.createElement('p', { className: 'text-body-p text-neutral-400 max-w-2xl mx-auto' }, data.hero.description)
      )
    ),

    /* ── Pull quote ── */
    React.createElement('blockquote', { className: 'resources-page__pull-quote' }, data.pullQuote),

    /* ── Content ── */
    React.createElement('div', { className: 'resources-page__content' },

      /* ── Intro ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, data.intro.title),
        introParagraphs
      ),

      /* ── Getting started tips ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, data.gettingStarted.title),
        React.createElement('p', { className: 'resources-section__description' }, data.gettingStarted.description),
        React.createElement('div', { className: 'resources-tips-grid' }, tipCards)
      ),

      /* ── Essential kit ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, data.essentialKit.title),
        React.createElement('p', { className: 'resources-section__description' }, data.essentialKit.description),
        React.createElement('div', { className: 'resources-kit-grid' }, kitCards)
      ),

      /* ── Recommended brands ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, data.recommendedBrands.title),
        React.createElement('p', { className: 'resources-section__description' }, data.recommendedBrands.description),
        React.createElement('div', { className: 'resources-brands-grid' }, brandCards)
      ),

      /* ── Practice guide ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, data.practiceGuide.title),
        React.createElement('p', { className: 'resources-section__description' }, data.practiceGuide.description),
        React.createElement('div', { className: 'resources-tips-grid' }, practiceTips)
      ),

      /* ── Safety ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, data.safetySection.title),
        React.createElement('p', { className: 'resources-section__description' }, data.safetySection.description),
        React.createElement('ul', { className: 'resources-safety-list' }, safetyItems)
      ),

      /* ── Cross-links ── */
      React.createElement('section', { className: 'resources-section' },
        React.createElement('h2', { className: 'resources-section__title text-section-h2' }, 'Explore more'),
        React.createElement('div', { className: 'resources-cross-links' },
          React.createElement('a', {
            className: 'resources-cross-link',
            href: data.crossLinks.gear.href,
            onClick: handleCrossLinkClick(data.crossLinks.gear.href),
          },
            React.createElement('h3', { className: 'resources-cross-link__label' }, data.crossLinks.gear.label),
            React.createElement('p', { className: 'resources-cross-link__description' }, data.crossLinks.gear.description),
            React.createElement('span', { className: 'resources-cross-link__arrow' },
              React.createElement(ArrowRight, { size: 18, weight: 'bold' })
            )
          ),
          React.createElement('a', {
            className: 'resources-cross-link',
            href: data.crossLinks.portfolio.href,
            onClick: handleCrossLinkClick(data.crossLinks.portfolio.href),
          },
            React.createElement('h3', { className: 'resources-cross-link__label' }, data.crossLinks.portfolio.label),
            React.createElement('p', { className: 'resources-cross-link__description' }, data.crossLinks.portfolio.description),
            React.createElement('span', { className: 'resources-cross-link__arrow' },
              React.createElement(ArrowRight, { size: 18, weight: 'bold' })
            )
          ),
          React.createElement('a', {
            className: 'resources-cross-link',
            href: data.crossLinks.videos.href,
            onClick: handleCrossLinkClick(data.crossLinks.videos.href),
          },
            React.createElement('h3', { className: 'resources-cross-link__label' }, data.crossLinks.videos.label),
            React.createElement('p', { className: 'resources-cross-link__description' }, data.crossLinks.videos.description),
            React.createElement('span', { className: 'resources-cross-link__arrow' },
              React.createElement(ArrowRight, { size: 18, weight: 'bold' })
            )
          )
        )
      )
    )
  );
}
