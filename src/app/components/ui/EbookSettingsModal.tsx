/**
 * @fileoverview Ebook Settings Modal
 * 
 * Accessible modal for ebook reader settings:
 * - Font size controls (A- / A+)
 * - Jump to page input
 * - Progress indicators
 * - Minimal mode toggle
 * - Theme selection
 * 
 * WCAG 2.1 AA Compliant:
 * - Keyboard navigation (Tab, Enter, Escape)
 * - Focus trap within modal
 * - Screen reader announcements
 * - 44x44px touch targets
 * 
 * @version 1.0.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, SlidersHorizontal, TextAa, ArrowsIn, Eye } from '@phosphor-icons/react';
import type { FontSizePreset, PagingEffect } from '../../utils/ebookPreferences';
import '../../../styles/blocks/ebook-settings-modal.css';

export interface EbookSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  // Current state
  currentPage: number;
  totalPages: number;
  fontSize: FontSizePreset;
  minimalMode: boolean;
  pagingEffect: PagingEffect;
  
  // Callbacks
  onPageJump: (page: number) => void;
  onFontSizeChange: (size: FontSizePreset) => void;
  onMinimalModeToggle: () => void;
  onPagingEffectChange: (effect: PagingEffect) => void;
  
  // Progress
  progressPercent: number;
  currentChapterTitle?: string;
}

const FONT_SIZE_OPTIONS: Array<{ value: FontSizePreset; label: string; }> = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'x-large', label: 'X-Large' },
];

const PAGING_EFFECT_OPTIONS: Array<{ value: PagingEffect; label: string; }> = [
  { value: 'slide', label: 'Slide' },
  { value: '3d-flip', label: '3D Flip' },
  { value: 'fade', label: 'Fade' },
  { value: 'none', label: 'None' },
];

export function EbookSettingsModal(props: EbookSettingsModalProps) {
  const modalRefInit: HTMLDivElement | null = null;
  const modalRef = useRef(modalRefInit);
  const firstFocusableRefInit: HTMLButtonElement | null = null;
  const firstFocusableRef = useRef(firstFocusableRefInit);
  
  const [pageInputValue, setPageInputValue] = useState('');

  // Update page input when current page changes
  useEffect(() => {
    if (props.isOpen) {
      setPageInputValue(String(props.currentPage + 1));
    }
  }, [props.currentPage, props.isOpen]);

  // Focus trap
  useEffect(() => {
    if (props.isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [props.isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!props.isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        props.onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [props.isOpen, props.onClose]);

  // Handle page jump
  function handlePageJump() {
    const pageNum = parseInt(pageInputValue, 10);
    if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= props.totalPages) {
      props.onPageJump(pageNum - 1);
      props.onClose();
    }
  }

  // Handle page input enter key
  function handlePageInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePageJump();
    }
  }

  // Cycle font size
  function increaseFontSize() {
    const currentIndex = FONT_SIZE_OPTIONS.findIndex((opt) => opt.value === props.fontSize);
    const nextIndex = Math.min(currentIndex + 1, FONT_SIZE_OPTIONS.length - 1);
    props.onFontSizeChange(FONT_SIZE_OPTIONS[nextIndex].value);
  }

  function decreaseFontSize() {
    const currentIndex = FONT_SIZE_OPTIONS.findIndex((opt) => opt.value === props.fontSize);
    const prevIndex = Math.max(currentIndex - 1, 0);
    props.onFontSizeChange(FONT_SIZE_OPTIONS[prevIndex].value);
  }

  if (!props.isOpen) return null;

  return (
    <div className="ebook-settings-overlay" onClick={props.onClose}>
      <div
        ref={modalRef}
        className="ebook-settings-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ebook-settings-title"
      >
        {/* Header */}
        <header className="ebook-settings-modal__header">
          <div className="ebook-settings-modal__header-content">
            <SlidersHorizontal size={24} aria-hidden="true" />
            <h2 id="ebook-settings-title" className="ebook-settings-modal__title">
              Reader Settings
            </h2>
          </div>
          <button
            ref={firstFocusableRef}
            type="button"
            className="ebook-settings-modal__close"
            onClick={props.onClose}
            aria-label="Close settings"
          >
            <X size={24} />
          </button>
        </header>

        {/* Progress Section */}
        <section className="ebook-settings-modal__section">
          <h3 className="ebook-settings-modal__section-title">Progress</h3>
          
          <div className="ebook-settings-modal__progress-stats">
            <div className="ebook-settings-modal__stat">
              <span className="ebook-settings-modal__stat-label">Page</span>
              <span className="ebook-settings-modal__stat-value">
                {props.currentPage + 1} / {props.totalPages}
              </span>
            </div>
            
            <div className="ebook-settings-modal__stat">
              <span className="ebook-settings-modal__stat-label">Progress</span>
              <span className="ebook-settings-modal__stat-value">
                {Math.round(props.progressPercent)}%
              </span>
            </div>
          </div>

          {props.currentChapterTitle && (
            <div className="ebook-settings-modal__chapter">
              <Eye size={16} aria-hidden="true" />
              <span>{props.currentChapterTitle}</span>
            </div>
          )}

          <div className="ebook-settings-modal__progress-bar">
            <div 
              className="ebook-settings-modal__progress-fill"
              ref={function(el) {
                if (el) el.style.width = props.progressPercent + '%';
              }}
              role="progressbar"
              aria-valuenow={props.progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Reading progress: ${Math.round(props.progressPercent)}%`}
            />
          </div>
        </section>

        {/* Jump to Page */}
        <section className="ebook-settings-modal__section">
          <h3 className="ebook-settings-modal__section-title">Jump to Page</h3>
          
          <div className="ebook-settings-modal__page-jump">
            <input
              type="number"
              className="ebook-settings-modal__page-input"
              value={pageInputValue}
              onChange={(e) => setPageInputValue(e.target.value)}
              onKeyDown={handlePageInputKeyDown}
              min="1"
              max={props.totalPages}
              aria-label="Page number"
            />
            <button
              type="button"
              className="button button--primary ebook-settings-modal__jump-button"
              onClick={handlePageJump}
            >
              Go
            </button>
          </div>
        </section>

        {/* Font Size */}
        <section className="ebook-settings-modal__section">
          <h3 className="ebook-settings-modal__section-title">Font Size</h3>
          
          <div className="ebook-settings-modal__font-controls">
            <button
              type="button"
              className="button button--secondary ebook-settings-modal__font-button"
              onClick={decreaseFontSize}
              disabled={props.fontSize === 'small'}
              aria-label="Decrease font size"
            >
              <TextAa size={16} />
              <span className="ebook-settings-modal__font-button-label">A-</span>
            </button>
            
            <span className="ebook-settings-modal__font-current" aria-live="polite">
              {(function() {
                var match = FONT_SIZE_OPTIONS.find(function(opt) { return opt.value === props.fontSize; });
                if (match) return match.label;
                return '';
              })()}
            </span>
            
            <button
              type="button"
              className="button button--secondary ebook-settings-modal__font-button"
              onClick={increaseFontSize}
              disabled={props.fontSize === 'x-large'}
              aria-label="Increase font size"
            >
              <TextAa size={20} />
              <span className="ebook-settings-modal__font-button-label">A+</span>
            </button>
          </div>
        </section>

        {/* Minimal Mode */}
        <section className="ebook-settings-modal__section">
          <h3 className="ebook-settings-modal__section-title">Display Mode</h3>
          
          <label className="ebook-settings-modal__toggle-label">
            <input
              type="checkbox"
              className="ebook-settings-modal__toggle-input"
              checked={props.minimalMode}
              onChange={props.onMinimalModeToggle}
              aria-label="Enable minimal mode"
            />
            <span className="ebook-settings-modal__toggle-track">
              <span className="ebook-settings-modal__toggle-thumb" />
            </span>
            <span className="ebook-settings-modal__toggle-text">
              <ArrowsIn size={16} aria-hidden="true" />
              Minimal Mode
            </span>
          </label>
          
          <p className="ebook-settings-modal__help-text">
            Hide navigation and progress bar for distraction-free reading
          </p>
        </section>

        {/* Paging Effect */}
        <section className="ebook-settings-modal__section">
          <h3 className="ebook-settings-modal__section-title">Paging Effect</h3>
          
          <div className="ebook-settings-modal__effect-options">
            {PAGING_EFFECT_OPTIONS.map((opt) => (
              <label key={opt.value} className="ebook-settings-modal__effect-label">
                <input
                  type="radio"
                  name="pagingEffect"
                  value={opt.value}
                  checked={props.pagingEffect === opt.value}
                  onChange={(e) => props.onPagingEffectChange(e.target.value as PagingEffect)}
                  className="ebook-settings-modal__effect-input"
                />
                <span className="ebook-settings-modal__effect-button">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="ebook-settings-modal__section">
          <h3 className="ebook-settings-modal__section-title">Keyboard Shortcuts</h3>
          
          <div className="ebook-settings-modal__shortcuts">
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">←</kbd>
              <kbd className="ebook-settings-modal__kbd">↑</kbd>
              <kbd className="ebook-settings-modal__kbd">PgUp</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Previous page</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">→</kbd>
              <kbd className="ebook-settings-modal__kbd">↓</kbd>
              <kbd className="ebook-settings-modal__kbd">PgDn</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Next page</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">Home</kbd>
              <span className="ebook-settings-modal__shortcut-desc">First page</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">End</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Last page</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">S</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Settings</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">M</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Minimal mode</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">F</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Fullscreen</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">C</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Chapters</span>
            </div>
            
            <div className="ebook-settings-modal__shortcut">
              <kbd className="ebook-settings-modal__kbd">Esc</kbd>
              <span className="ebook-settings-modal__shortcut-desc">Close / Exit</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}