/**
 * @fileoverview Blog Mega Menu — three-column dropdown for the Blog nav link
 *
 * Columns:
 * 1. Featured Post — the single most-recent featured blog post with image
 * 2. Recent Posts — 5 most recent posts (excluding the featured post)
 * 3. Categories — blog categories with neon rainbow accent dots + counts
 *
 * Animation: "Neon Cascade Ripple" — items drop in from the top with a
 * spreading neon underline sweep. Pure CSS keyframes (no motion/react).
 *
 * @component BlogMegaMenu
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useCallback, useRef, useEffect } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowRight, Clock } from '@phosphor-icons/react';
import { blogPosts } from '../../data/mock/blog/posts';
import { blogCategories } from '../../data/mock/blog/categories';
import { getBlogCategoryCount } from '../../utils/contentCounts';
import { formatDate } from '../../utils/formatDate';
import '../../../styles/blocks/mega-menu.css';

/** Neon rainbow colours cycled across category dots */
const NEON_COLORS = [
  'var(--wp--preset--color--neon-pink)',
  'var(--wp--preset--color--neon-purple)',
  'var(--wp--preset--color--neon-orange)',
  'var(--wp--preset--color--neon-blue)',
  'var(--wp--preset--color--neon-cyan)',
  'var(--wp--preset--color--neon-green)',
  'var(--wp--preset--color--neon-yellow)',
  'var(--wp--preset--color--neon-red)',
];

interface BlogMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function BlogMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }: BlogMegaMenuProps) {
  const navigate = useNavigate();
  const menuRefInit: HTMLDivElement | null = null;
  const menuRef = useRef(menuRefInit);

  /** Sort posts by publishedAt descending */
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  /** The single most-recent featured post */
  const featuredPost = sortedPosts.find((p) => p.featured) || sortedPosts[0];
  const featuredId = featuredPost ? featuredPost.id : null;

  /** 5 recent posts excluding the featured one */
  const recentPosts = sortedPosts
    .filter((p) => p.id !== featuredId)
    .slice(0, 5);

  /** Active categories (with at least one post) */
  const activeCategories = blogCategories.filter(
    (cat) => getBlogCategoryCount(cat.name) > 0,
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
      className="mega-menu mega-menu--blog"
      role="menu"
      aria-label="Blog mega menu"
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={menuRef}
    >
      {/* Decorative top rainbow bar */}
      <div className="mega-menu__rainbow mega-menu__rainbow--blog" aria-hidden="true" />

      <div className="mega-menu__grid mega-menu__grid--three">
        {/* ── Column 1: Featured Post ── */}
        <div
          className="mega-menu__col mega-menu__col--featured"
          style={{ '--col-index': 0 } as React.CSSProperties}
        >
          <h3 className="mega-menu__col-heading">Featured Post</h3>
          {featuredPost && (
            <button
              type="button"
              className="mega-menu__featured-btn"
              role="menuitem"
              onClick={() => go(`/blog/${featuredPost.slug}`)}
            >
              {featuredPost.featuredImage && (
                <div className="mega-menu__featured-img-wrap">
                  <img
                    src={featuredPost.featuredImage.src}
                    alt={featuredPost.featuredImage.alt}
                    className="mega-menu__featured-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="mega-menu__featured-overlay mega-menu__featured-overlay--blog" aria-hidden="true" />
                </div>
              )}
              <div className="mega-menu__featured-body">
                <span className="mega-menu__featured-cat">{featuredPost.category}</span>
                <span className="mega-menu__featured-title">{featuredPost.title}</span>
                <span className="mega-menu__featured-meta">
                  <Clock className="mega-menu__meta-icon" aria-hidden="true" />
                  {featuredPost.readTime} min read · {formatDate(featuredPost.publishedAt)}
                </span>
              </div>
            </button>
          )}
        </div>

        {/* ── Column 2: Recent Posts ── */}
        <div
          className="mega-menu__col mega-menu__col--recent"
          style={{ '--col-index': 1 } as React.CSSProperties}
        >
          <h3 className="mega-menu__col-heading">Recent Posts</h3>
          <ul className="mega-menu__recent-list">
            {recentPosts.map((post, idx) => (
              <li
                key={post.id}
                className="mega-menu__recent-item mega-menu__recent-item--blog"
                style={{ '--item-index': idx } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="mega-menu__recent-link"
                  role="menuitem"
                  onClick={() => go(`/blog/${post.slug}`)}
                >
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage.src}
                      alt={post.featuredImage.alt}
                      className="mega-menu__recent-thumb"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="mega-menu__recent-text">
                    <span className="mega-menu__recent-title">{post.title}</span>
                    <span className="mega-menu__recent-meta">
                      {post.category} · {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mega-menu__view-all mega-menu__view-all--blog"
            role="menuitem"
            onClick={() => go('/blog')}
          >
            View All Posts
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
                className="mega-menu__cat-item mega-menu__cat-item--blog"
                style={{
                  '--item-index': idx,
                  '--neon-accent': NEON_COLORS[idx % NEON_COLORS.length],
                } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="mega-menu__cat-link"
                  role="menuitem"
                  onClick={() => go(`/blog/category/${cat.slug}`)}
                >
                  <span className="mega-menu__cat-dot" aria-hidden="true" />
                  <span className="mega-menu__cat-name">{cat.name}</span>
                  <span className="mega-menu__cat-count">
                    {getBlogCategoryCount(cat.name)}
                  </span>
                </button>
                {cat.description && (
                  <span className="mega-menu__cat-desc">{cat.description}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}