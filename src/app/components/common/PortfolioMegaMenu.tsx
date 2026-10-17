/**
 * @fileoverview Portfolio Mega Menu — three-column dropdown for the Portfolio nav link
 *
 * Columns:
 * 1. Featured Card — the single most-recent featured portfolio entry with image
 * 2. Recent Work — 5 most recent entries (excluding the featured card)
 * 3. Categories — portfolio categories with neon rainbow accent dots + counts
 *
 * Animation: "Neon Grid Reveal" — staggered slide-in from the left with pulsing
 * neon glow on each cell. Pure CSS keyframes (no motion/react).
 *
 * @component PortfolioMegaMenu
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useCallback, useRef, useEffect } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowRight } from '@phosphor-icons/react';
import { allPortfolioWork } from '../../data/mock/portfolio';
import { PORTFOLIO_CATEGORIES } from '../../utils/portfolioService';
import { getPortfolioCategoryCount } from '../../utils/contentCounts';
import { formatDate } from '../../utils/formatDate';
import '../../../styles/blocks/mega-menu.css';

/** Neon rainbow colours cycled across category dots */
const NEON_COLORS = [
  'var(--wp--preset--color--neon-green)',
  'var(--wp--preset--color--neon-blue)',
  'var(--wp--preset--color--neon-pink)',
  'var(--wp--preset--color--neon-orange)',
  'var(--wp--preset--color--neon-purple)',
  'var(--wp--preset--color--neon-cyan)',
  'var(--wp--preset--color--neon-yellow)',
  'var(--wp--preset--color--neon-red)',
];

interface PortfolioMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function PortfolioMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: PortfolioMegaMenuProps) {
  const navigate = useNavigate();
  const menuRefInit: HTMLDivElement | null = null;
  const menuRef = useRef(menuRefInit);

  /** Sort all work by date descending */
  const sortedWork = [...allPortfolioWork].sort(
    (a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime(),
  );

  /** The single most-recent featured entry */
  const featuredEntry = sortedWork.find((w) => w.featured) || sortedWork[0];
  const featuredId = featuredEntry ? featuredEntry.id : null;

  /** 5 recent entries excluding the featured one */
  const recentEntries = sortedWork
    .filter((w) => w.id !== featuredId)
    .slice(0, 5);

  /** Active categories (with at least one entry, excluding "All Work") */
  const activeCategories = PORTFOLIO_CATEGORIES.filter(
    (cat) => cat.id !== 'all' && getPortfolioCategoryCount(cat.id) > 0,
  );

  const go = useCallback(
    (path: string) => {
      onClose();
      navigate(path);
    },
    [navigate, onClose],
  );

  /** Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  /** Focus first interactive element on open */
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const first = menuRef.current.querySelector(
        '.mega-menu__featured-btn, .mega-menu__recent-link, .mega-menu__cat-link',
      ) as HTMLButtonElement | null;
      if (first) first.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="mega-menu mega-menu--portfolio"
      role="menu"
      aria-label="Portfolio mega menu"
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={menuRef}
    >
      {/* Decorative top rainbow bar */}
      <div className="mega-menu__rainbow" aria-hidden="true" />

      <div className="mega-menu__grid mega-menu__grid--three">
        {/* ── Column 1: Featured Card ── */}
        <div
          className="mega-menu__col mega-menu__col--featured"
          style={{ '--col-index': 0 } as React.CSSProperties}
        >
          <h3 className="mega-menu__col-heading">Featured Work</h3>
          {featuredEntry && (
            <button
              type="button"
              className="mega-menu__featured-btn"
              role="menuitem"
              onClick={() => go(`/portfolio/${featuredEntry.slug}`)}
            >
              {featuredEntry.images && featuredEntry.images[0] ? (
                <div className="mega-menu__featured-img-wrap">
                  <img
                    src={featuredEntry.images[0].src}
                    alt={featuredEntry.images[0].alt}
                    className="mega-menu__featured-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="mega-menu__featured-overlay" aria-hidden="true" />
                </div>
              ) : null}
              <div className="mega-menu__featured-body">
                <span className="mega-menu__featured-cat">{featuredEntry.category}</span>
                <span className="mega-menu__featured-title">{featuredEntry.title}</span>
                {featuredEntry.location && (
                  <span className="mega-menu__featured-meta">{featuredEntry.location}</span>
                )}
              </div>
            </button>
          )}
        </div>

        {/* ── Column 2: Recent Work ── */}
        <div
          className="mega-menu__col mega-menu__col--recent"
          style={{ '--col-index': 1 } as React.CSSProperties}
        >
          <h3 className="mega-menu__col-heading">Recent Work</h3>
          <ul className="mega-menu__recent-list">
            {recentEntries.map((entry, idx) => (
              <li
                key={entry.id}
                className="mega-menu__recent-item"
                style={{ '--item-index': idx } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="mega-menu__recent-link"
                  role="menuitem"
                  onClick={() => go(`/portfolio/${entry.slug}`)}
                >
                  {entry.images && entry.images[0] ? (
                    <img
                      src={entry.images[0].src}
                      alt={entry.images[0].alt}
                      className="mega-menu__recent-thumb"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <div className="mega-menu__recent-text">
                    <span className="mega-menu__recent-title">{entry.title}</span>
                    <span className="mega-menu__recent-meta">
                      {entry.category}
                      {entry.date ? ` · ${formatDate(entry.date)}` : ''}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mega-menu__view-all"
            role="menuitem"
            onClick={() => go('/portfolio')}
          >
            View All Work
            <ArrowRight className="mega-menu__view-all-icon" aria-hidden="true" />
          </button>
        </div>

        {/* ── Column 3: Categories ── */}
        <div
          className="mega-menu__col mega-menu__col--categories"
          style={{ '--col-index': 2 } as React.CSSProperties}
        >
          <h3 className="mega-menu__col-heading">Categories</h3>
          <ul className="mega-menu__cat-list">
            {activeCategories.map((cat, idx) => (
              <li
                key={cat.id}
                className="mega-menu__cat-item"
                style={{
                  '--item-index': idx,
                  '--neon-accent': NEON_COLORS[idx % NEON_COLORS.length],
                } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="mega-menu__cat-link"
                  role="menuitem"
                  onClick={() => go(`/portfolio/category/${cat.slug}`)}
                >
                  <span className="mega-menu__cat-dot" aria-hidden="true" />
                  <span className="mega-menu__cat-name">{cat.name}</span>
                  <span className="mega-menu__cat-count">
                    {getPortfolioCategoryCount(cat.id)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}