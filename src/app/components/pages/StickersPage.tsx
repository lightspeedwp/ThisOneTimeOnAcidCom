/**
 * @fileoverview Stickers gallery page for Ash Shaw Makeup Portfolio
 *
 * Displays every sticker graphic in a responsive Polaroid-framed grid with:
 * - Search-by-label filtering
 * - Theme category chips (Spirals, Galaxy, Psychedelic, Rainbow)
 * - "Surprise Me" random sticker button with scroll + glow highlight
 * - Lightbox with prev/next navigation and keyboard support
 *
 * All content pulled from centralised mock data — no hardcoded strings.
 *
 * @component StickersPage
 * @version 2.1.0 — Extracted StickerLightbox to /components/ui/StickerLightbox.tsx
 */

import React, { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { MagnifyingGlass, Shuffle } from '@phosphor-icons/react';
import { stickerGraphics } from '../../data/mock/images/sticker-graphics';
import type { StickerGraphic } from '../../data/mock/images/sticker-graphics';
import {
  stickersPageUI,
  stickerThemes,
  stickerThemeMap,
} from '../../data/mock/ui/stickers';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { OptimizedImage } from '../ui/OptimizedImage';
import { StickerLightbox } from '../ui/StickerLightbox';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import '../../../styles/blocks/stickers-page.css';

import { setSEO } from '../../utils/seo';
import { pageSEO } from '../../data/mock/seo';

/* ─────────────────────────────────────────────
   Polaroid Card (memoised for large grids)
   ───────────────────────────────────────────── */

interface PolaroidProps {
  sticker: StickerGraphic;
  index: number;
  highlighted: boolean;
  onClick: (index: number) => void;
}

const PolaroidCard = memo(function PolaroidCard({
  sticker,
  index,
  highlighted,
  onClick,
}: PolaroidProps) {
  const cardClass = highlighted
    ? 'polaroid polaroid--highlighted'
    : 'polaroid';

  return (
    <button
      type="button"
      className={cardClass}
      onClick={() => onClick(index)}
      aria-label={`View ${sticker.label} sticker`}
      data-sticker-id={sticker.id}
    >
      <div className="polaroid__image-frame">
        <OptimizedImage
          src={sticker.src}
          alt={sticker.alt}
          preset="thumbnail"
          className="polaroid__image"
          loading="lazy"
        />
      </div>
      <span className="polaroid__label">{sticker.label}</span>
    </button>
  );
});

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */

export function StickersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState('all');
  const highlightedIdInit: string | null = null;
  const [highlightedId, setHighlightedId] = useState(highlightedIdInit);
  const lightboxIndexInit: number | null = null;
  const [lightboxIndex, setLightboxIndex] = useState(lightboxIndexInit);
  const gridRefInit: HTMLDivElement | null = null;
  const gridRef = useRef(gridRefInit);
  // Bundler-safe: use number | null instead of ReturnType<typeof setTimeout> nested generic
  const highlightTimerRef = useRef(null as number | null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setSEO(pageSEO.stickers);
  }, []);

  /* Clear highlight timer on unmount */
  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  /* ── Filtered stickers ── */
  const filtered = useMemo(() => {
    let result = [...stickerGraphics];

    if (activeTheme !== 'all') {
      result = result.filter(
        (s) => stickerThemeMap[s.id] === activeTheme,
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.alt.toLowerCase().includes(q),
      );
    }

    return result;
  }, [activeTheme, searchQuery]);

  /* ── Theme counts ── */
  const themeCounts = useMemo(() => {
    // If searching, counts reflect search-filtered results
    const searchFiltered = searchQuery.trim()
      ? stickerGraphics.filter((s) => {
          const q = searchQuery.toLowerCase();
          return (
            s.label.toLowerCase().includes(q) ||
            s.alt.toLowerCase().includes(q)
          );
        })
      : stickerGraphics;

    const counts: Record<string, number> = { all: searchFiltered.length };
    for (var ti = 0; ti < stickerThemes.length; ti++) {
      var theme = stickerThemes[ti];
      if (theme.id === 'all') {
        ti = ti; // skip — equivalent of continue
      } else {
        counts[theme.id] = searchFiltered.filter(
          (s) => stickerThemeMap[s.id] === theme.id,
        ).length;
      }
    }
    return counts;
  }, [searchQuery]);

  /* ── Lightbox handlers ── */
  const openLightbox = useCallback(
    (filteredIndex: number) => {
      // Map filtered index back to source array index for lightbox
      const sticker = filtered[filteredIndex];
      const sourceIndex = stickerGraphics.findIndex(
        (s) => s.id === sticker.id,
      );
      setLightboxIndex(sourceIndex >= 0 ? sourceIndex : filteredIndex);
    },
    [filtered],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : prev === 0
          ? stickerGraphics.length - 1
          : prev - 1,
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : prev === stickerGraphics.length - 1
          ? 0
          : prev + 1,
    );
  }, []);

  /* ── Random sticker ── */
  const handleRandom = useCallback(() => {
    if (filtered.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filtered.length);
    const sticker = filtered[randomIndex];

    // Clear any existing highlight
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }
    setHighlightedId(sticker.id);

    // Scroll to the card
    if (gridRef.current) {
      const card = gridRef.current.querySelector(
        `[data-sticker-id="${sticker.id}"]`,
      );
      if (card) {
        card.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' });
      }
    }

    // Clear highlight after animation completes
    highlightTimerRef.current = setTimeout(() => {
      setHighlightedId(null);
    }, 2200);
  }, [filtered, prefersReduced]);

  /* ── Search handler ── */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [],
  );

  /* ── Theme chip handler ── */
  const handleThemeClick = useCallback((themeId: string) => {
    setActiveTheme(themeId);
  }, []);

  return (
    <article className="stickers-page bg-atomic-noise" aria-label={stickersPageUI.hero.title}>
      {/* ── Hero ── */}
      <header className="stickers-page__hero">
        <div className="stickers-page__hero-content">
          <Breadcrumbs items={stickersPageUI.breadcrumbs} centered />

          <span className="stickers-page__hero-badge">
            {stickersPageUI.hero.badge}
          </span>

          <h1 className="text-hero-h1 text-gradient-pink-purple-blue">
            {stickersPageUI.hero.title}
          </h1>

          <p className="stickers-page__hero-desc neon-text-gradient neon-text-gradient--orange">
            {stickersPageUI.hero.description}
          </p>
        </div>
      </header>

      {/* ── Controls ── */}
      <div className="stickers-page__controls">
        {/* Search + Random */}
        <div className="stickers-page__search-row">
          <div className="stickers-page__search">
            <MagnifyingGlass
              className="stickers-page__search-icon"
              aria-hidden="true"
            />
            <input
              type="search"
              className="stickers-page__search-input"
              placeholder={stickersPageUI.controls.searchPlaceholder}
              aria-label={stickersPageUI.controls.searchAriaLabel}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button
            type="button"
            className="stickers-page__random-btn"
            onClick={handleRandom}
            aria-label={stickersPageUI.controls.randomAriaLabel}
          >
            <Shuffle className="stickers-page__random-icon" aria-hidden="true" />
            {stickersPageUI.controls.randomButton}
          </button>
        </div>

        {/* Theme Chips */}
        <div className="stickers-page__themes" role="group" aria-label={stickersPageUI.controls.themesLabel}>
          <span className="stickers-page__themes-label">
            {stickersPageUI.controls.themesLabel}
          </span>
          {stickerThemes.map((theme) => {
            const isActive = activeTheme === theme.id;
            const chipClass = isActive
              ? 'stickers-page__chip stickers-page__chip--active'
              : 'stickers-page__chip';
            return (
              <button
                key={theme.id}
                type="button"
                className={chipClass}
                onClick={() => handleThemeClick(theme.id)}
                aria-pressed={isActive}
              >
                {theme.label}
                <span className="stickers-page__chip-count">
                  {themeCounts[theme.id] ? themeCounts[theme.id] : 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Gallery ── */}
      <div className="stickers-page__body">
        <p className="stickers-page__count">
          <span className="stickers-page__count-number">
            {filtered.length}
          </span>{' '}
          {stickersPageUI.gallery.countSuffix}
        </p>

        {filtered.length > 0 ? (
          <div className="stickers-page__grid" ref={gridRef}>
            {filtered.map((sticker, i) => (
              <PolaroidCard
                key={sticker.id}
                sticker={sticker}
                index={i}
                highlighted={highlightedId === sticker.id}
                onClick={openLightbox}
              />
            ))}
          </div>
        ) : (
          <p className="stickers-page__empty">
            {stickersPageUI.gallery.noResults}
          </p>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <StickerLightbox
          stickers={stickerGraphics}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </article>
  );
}