/**
 * @fileoverview Gear Page component — expanded with professional kit structure,
 * brand recommendations, kit wisdom, and cross-link to resources page.
 *
 * BUNDLER SAFETY: No optional chaining, no destructuring, no template literals,
 * no arrow callbacks, var preferred.
 *
 * @component GearPage
 * @version 2.0.0
 */

import React from 'react';
import {
  PaintBrush, Image, Shield, Drop, Palette,
  Toolbox, FirstAid, Heartbeat, Lightning,
  Lightbulb, ArrowRight, Star, CaretRight,
} from '@phosphor-icons/react';
import { gearPageData } from '../../../data/mock/pages/gear';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import { setSEO } from '../../../utils/seo';
import { useNavigate } from '../../../lib/router';
import '../../../../styles/blocks/gear-page.css';

var IconMap: Record<string, React.ElementType> = {
  paints: Drop,
  foundation: Palette,
  colour: PaintBrush,
  brushes: PaintBrush,
  hygiene: FirstAid,
  prep: Heartbeat,
  tech: Image,
  survival: Shield,
};

export function GearPage() {
  var navigate = useNavigate();

  React.useEffect(function () {
    setSEO({
      title: 'The Toolkit | Ash Shaw Makeup',
      description: gearPageData.hero.description,
      image: '/images/og-gear.jpg'
    });
  }, []);

  function handleResourcesClick(e: React.MouseEvent) {
    e.preventDefault();
    navigate(gearPageData.resourcesCta.href);
  }

  /* ── Category cards ── */
  var categoryCards: React.ReactNode[] = [];
  for (var c = 0; c < gearPageData.categories.length; c = c + 1) {
    var category = gearPageData.categories[c];
    var Icon = IconMap[category.id];
    if (Icon == null) {
      Icon = Shield;
    }

    var itemElements: React.ReactNode[] = [];
    for (var i = 0; i < category.items.length; i = i + 1) {
      var item = category.items[i];
      itemElements.push(
        React.createElement('li', { key: i, className: 'gear-item' },
          React.createElement('div', { className: 'gear-item__content' },
            React.createElement('span', { className: 'gear-item__name' }, item.name),
            React.createElement('span', { className: 'gear-item__desc' }, item.desc)
          ),
          React.createElement('span', { className: 'gear-item__usage' }, item.usage)
        )
      );
    }

    categoryCards.push(
      React.createElement('section', { key: category.id, className: 'gear-category-card' },
        React.createElement('div', { className: 'gear-category-header' },
          React.createElement('div', { className: 'gear-category-icon' },
            React.createElement(Icon, { size: 28, weight: 'duotone' })
          ),
          React.createElement('h2', { className: 'text-section-h3 text-neon-cyan mb-fluid-xs' }, category.title),
          React.createElement('p', { className: 'text-body-sm text-neutral-400' }, category.description)
        ),
        React.createElement('ul', { className: 'gear-item-list' }, itemElements)
      )
    );
  }

  /* ── Brand cards ── */
  var brandCards: React.ReactNode[] = [];
  for (var b = 0; b < gearPageData.brands.length; b = b + 1) {
    var brand = gearPageData.brands[b];
    brandCards.push(
      React.createElement('div', { key: brand.id, className: 'gear-brand-card' },
        React.createElement('h3', { className: 'gear-brand-card__name' }, brand.name),
        React.createElement('p', { className: 'gear-brand-card__tagline' }, brand.tagline),
        React.createElement('p', { className: 'gear-brand-card__specialty' }, brand.specialty),
        React.createElement('div', { className: 'gear-brand-card__featured' },
          React.createElement(Star, { size: 14, weight: 'fill', className: 'gear-brand-card__star' }),
          brand.featured
        ),
        React.createElement('a', {
          className: 'gear-brand-card__link',
          href: brand.url,
          target: '_blank',
          rel: 'noopener noreferrer',
        }, 'Visit website \u2192')
      )
    );
  }

  /* ── Kit wisdom items ── */
  var wisdomItems: React.ReactNode[] = [];
  for (var w = 0; w < gearPageData.kitWisdom.length; w = w + 1) {
    wisdomItems.push(
      React.createElement('li', { key: w, className: 'gear-wisdom-item' },
        React.createElement(CaretRight, { size: 14, weight: 'bold', className: 'gear-wisdom-bullet' }),
        gearPageData.kitWisdom[w]
      )
    );
  }

  return React.createElement('main', {
    className: 'gear-page bg-atomic-noise',
  },
    /* ── Hero ── */
    React.createElement('header', {
      className: 'gear-page__hero',
      style: {
        backgroundImage: 'radial-gradient(circle at center, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 1) 80%), url(' + gearPageData.hero.image + ')',
      },
    },
      React.createElement('div', { className: 'container-xl text-center' },
        React.createElement(Breadcrumbs, {
          items: [{ label: 'Home', href: '/' }, { label: 'Toolkit' }],
          centered: true,
        }),
        React.createElement('h1', { className: 'text-hero-h1 text-gradient-cyberpunk mb-fluid-md' }, gearPageData.hero.title),
        React.createElement('p', { className: 'text-section-h2 text-neutral-300 mb-fluid-lg' }, gearPageData.hero.subtitle),
        React.createElement('p', { className: 'text-body-p text-neutral-400 max-w-2xl mx-auto' }, gearPageData.hero.description)
      )
    ),

    /* ── Categories grid ── */
    React.createElement('div', { className: 'container-xl gear-page__content' },
      React.createElement('div', { className: 'gear-grid' }, categoryCards)
    ),

    /* ── Brands section ── */
    React.createElement('section', { className: 'container-xl gear-page__brands' },
      React.createElement('h2', { className: 'gear-page__section-title text-section-h2 text-gradient-toxic-lime' }, 'Brands worth knowing'),
      React.createElement('p', { className: 'gear-page__section-desc text-neutral-400' },
        'From drugstore staples to professional-grade ranges, these brands have earned their place in the kit.'
      ),
      React.createElement('div', { className: 'gear-brands-grid' }, brandCards)
    ),

    /* ── Kit wisdom ── */
    React.createElement('section', { className: 'container-xl gear-page__wisdom' },
      React.createElement('h2', { className: 'gear-page__section-title text-section-h2 text-neon-cyan' }, 'Kit wisdom'),
      React.createElement('p', { className: 'gear-page__section-desc text-neutral-400' },
        'Lessons learned from hundreds of festival painting sessions.'
      ),
      React.createElement('ul', { className: 'gear-wisdom-list' }, wisdomItems)
    ),

    /* ── Resources CTA ── */
    React.createElement('section', { className: 'container-xl gear-page__cta' },
      React.createElement('a', {
        className: 'gear-cta-card',
        href: gearPageData.resourcesCta.href,
        onClick: handleResourcesClick,
      },
        React.createElement('div', { className: 'gear-cta-card__content' },
          React.createElement('h3', { className: 'gear-cta-card__title' }, gearPageData.resourcesCta.label),
          React.createElement('p', { className: 'gear-cta-card__description' }, gearPageData.resourcesCta.description)
        ),
        React.createElement('span', { className: 'gear-cta-card__arrow' },
          React.createElement(ArrowRight, { size: 24, weight: 'bold' })
        )
      )
    )
  );
}
