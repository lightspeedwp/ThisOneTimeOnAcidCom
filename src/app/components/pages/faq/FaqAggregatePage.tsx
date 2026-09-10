/**
 * @fileoverview FAQ Aggregate Page
 * Collects all FAQs from every page-specific group and global defaults
 * into a single searchable, filterable, categorised view.
 *
 * @component FaqAggregatePage
 * @version 2.0.0 - Replaced motion/react with CSS grid-row animation (async_hooks fix)
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MagnifyingGlass, Plus, Minus, Question } from '@phosphor-icons/react';
import { faqData, pageFaqGroups } from '../../../data/mock/sections/faq';
import type { FaqItem } from '../../../data/mock/sections/faq';
import { faqPageUI } from '../../../data/mock/ui/faq';
import { getRandomSticker } from '../../../data/mock/images/sticker-graphics';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { Breadcrumbs } from '../../ui/Breadcrumbs';
import '../../../../styles/blocks/faq.css';
import '../../../../styles/blocks/faq-page.css';

import { setSEO } from '../../../utils/seo';
import { pageSEO } from '../../../data/mock/seo';

import { faqBreadcrumbs } from "../../../data/mock/ui/breadcrumbs";

interface CategorisedFaq {
  item: FaqItem;
  category: string;
  categoryId: string;
}

/** Labels for each page/category group */
const CATEGORY_LABELS: Record<string, string> = {
  global: 'General',
  home: 'Home',
  about: 'About',
  portfolio: 'Portfolio',
  blog: 'Blog',
  videos: 'Videos',
  podcasts: 'Podcasts',
  contact: 'Contact',
  stickers: 'Stickers',
  ebook: 'Ebook',
  events: 'Events',
  feedback: 'Feedback',
  history: 'History',
};

export function FaqAggregatePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIds, setOpenIds] = useState(new Set());

  useEffect(() => {
    setSEO(pageSEO.faq);
  }, []);

  const sticker = useMemo(() => getRandomSticker('faq-aggregate'), []);

  /** Flatten all FAQ groups into a single tagged list */
  const allFaqs: CategorisedFaq[] = useMemo(() => {
    const result: CategorisedFaq[] = [];

    // Global FAQs
    faqData.forEach(item => {
      result.push({
        item,
        category: CATEGORY_LABELS.global,
        categoryId: 'global',
      });
    });

    // Page-specific groups
    pageFaqGroups.forEach(group => {
      group.faqs.forEach(item => {
        result.push({
          item,
          category: CATEGORY_LABELS[group.pageId] || group.pageId,
          categoryId: group.pageId,
        });
      });
    });

    return result;
  }, []);

  /** Unique category list */
  const categories = useMemo(() => {
    const cats = new Set(allFaqs.map(f => f.categoryId));
    return Array.from(cats).map(id => ({
      id,
      name: CATEGORY_LABELS[id] || id,
      count: allFaqs.filter(f => f.categoryId === id).length,
    }));
  }, [allFaqs]);

  /** Filtered + searched FAQs */
  const filteredFaqs = useMemo(() => {
    let result = allFaqs;

    if (activeCategory !== 'all') {
      result = result.filter(f => f.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(f =>
        f.item.question.toLowerCase().includes(q) ||
        f.item.answer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allFaqs, activeCategory, searchQuery]);

  const toggleFaq = useCallback((id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /** Group filtered FAQs by category for display */
  const groupedFaqs = useMemo(() => {
    const groups: Record<string, CategorisedFaq[]> = {};
    filteredFaqs.forEach(faq => {
      if (!groups[faq.categoryId]) {
        groups[faq.categoryId] = [];
      }
      groups[faq.categoryId].push(faq);
    });
    return Object.entries(groups).map(([catId, faqs]) => ({
      categoryId: catId,
      categoryName: CATEGORY_LABELS[catId] || catId,
      faqs,
    }));
  }, [filteredFaqs]);

  return (
    <main id="main-content" role="main" tabIndex={-1} className="faq-aggregate bg-atomic-noise">
      {/* Header */}
      <div className="faq-aggregate__header section-spacing px-horizontal-section">
        <div className="faq-aggregate__header-content section-container">
          <Breadcrumbs items={faqBreadcrumbs} centered />
          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {faqPageUI.title}
          </h1>
          <p className="neon-text-gradient neon-text-gradient--blue faq-aggregate__subtitle">
            {faqPageUI.subtitle}
          </p>
        </div>
      </div>

      <div className="faq-aggregate-content section-spacing px-horizontal-section">
        <div className="container-7xl section-container">
          {/* Search + filters row */}
          <div className="faq-aggregate__controls section-container">
          {/* Search */}
          <div className="faq-aggregate__search" role="search">
            <MagnifyingGlass className="faq-aggregate__search-icon" aria-hidden="true" />
            <input
              type="text"
              className="faq-aggregate__search-input"
              placeholder={faqPageUI.searchPlaceholder}
              aria-label={faqPageUI.searchAriaLabel}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category chips */}
          <div className="faq-aggregate__categories">
            <button
              className={`faq-aggregate__chip ${activeCategory === 'all' ? 'faq-aggregate__chip--active' : ''}`}
              onClick={() => setActiveCategory('all')}
              aria-pressed={activeCategory === 'all'}
            >
              {faqPageUI.allCategoriesLabel}
              <span className="faq-aggregate__chip-count">{allFaqs.length}</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`faq-aggregate__chip ${activeCategory === cat.id ? 'faq-aggregate__chip--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.name}
                <span className="faq-aggregate__chip-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="faq-aggregate__count" aria-live="polite">
            {faqPageUI.resultCount(filteredFaqs.length)}
          </p>
        </div>

        {/* FAQ groups */}
        {filteredFaqs.length > 0 ? (
          <div className="faq-aggregate__groups">
            {groupedFaqs.map(group => (
              <section
                key={group.categoryId}
                className="faq-aggregate__group"
                aria-labelledby={`faq-group-${group.categoryId}`}
              >
                <h2
                  className="faq-aggregate__group-title"
                  id={`faq-group-${group.categoryId}`}
                >
                  {group.categoryName}
                </h2>
                <div className="faq-aggregate__list">
                  {group.faqs.map(({ item }) => {
                    const isOpen = openIds.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
                      >
                        <button
                          onClick={() => toggleFaq(item.id)}
                          className="faq-button"
                          aria-expanded={isOpen}
                        >
                          <span className="faq-button__text">{item.question}</span>
                          <div className={`faq-button__icon${isOpen ? ' faq-button__icon--open' : ''}`}>
                            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                          </div>
                        </button>
                        <div className={`faq-answer-wrapper${isOpen ? ' faq-answer-wrapper--open' : ''}`}>
                          <div className="faq-answer">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="faq-aggregate__empty">
            <Question className="faq-aggregate__empty-icon" aria-hidden="true" />
            <p className="faq-aggregate__empty-text">{faqPageUI.noResults}</p>
          </div>
        )}

        {/* Decorative sticker */}
        <div className="faq-aggregate__sticker" aria-hidden="true">
          <OptimizedImage
            src={sticker.src}
            alt=""
            preset="sticker"
            className="faq-aggregate__sticker-image"
          />
        </div>
      </div>
      </div>
    </main>
  );
}