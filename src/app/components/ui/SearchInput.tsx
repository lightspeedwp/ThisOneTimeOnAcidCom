/**
 * @fileoverview Standalone search input component with keyboard shortcuts
 *
 * Features:
 * - Expandable search field with neon glow on focus
 * - Ctrl+K / Cmd+K global keyboard shortcut to open
 * - Escape to close and clear
 * - Clear button when query is present
 * - Toggle button with dual open/submit behaviour
 * - Navigates to /search?q={query} on submit
 * - WCAG 2.1 AA: role="search", aria-label, keyboard accessible
 *
 * @component SearchInput
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0 - Extracted from Header.tsx
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from '../../lib/router';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import '../../../styles/blocks/search.css';

/**
 * Props interface for SearchInput component
 */
interface SearchInputProps {
  /** Additional BEM class names */
  className?: string;
  /** Controlled open state (lifted from parent) */
  isOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

/**
 * SearchInput - Expandable search field with global keyboard shortcut
 *
 * @accessibility
 * - role="search" on wrapper
 * - aria-label on input and buttons
 * - Ctrl+K / Cmd+K global shortcut
 * - Escape to close
 * - Full keyboard navigation
 */
export function SearchInput({ className = '', isOpen: controlledOpen, onOpenChange }: SearchInputProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRefInit: HTMLInputElement | null = null;
  const inputRef = useRef(inputRefInit);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  /** Determine whether we're controlled or uncontrolled */
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback((next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    if (onOpenChange) {
      onOpenChange(next);
    }
  }, [isControlled, onOpenChange]);

  /** Close and reset on route change (skip initial mount) */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setIsOpen(false);
    setQuery('');
  }, [location.pathname]);

  /** Auto-focus input when controlled open state becomes true */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const el = inputRef.current;
        if (el) { el.focus(); }
      }, 50);
    }
  }, [isOpen]);

  /** Submit search query — navigate to /search?q={query} */
  const handleSubmit = useCallback(() => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  }, [query, navigate]);

  /** Global keyboard shortcut: Ctrl+K / Cmd+K to open, Escape to close */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const hasModifier = e.ctrlKey || e.metaKey;
      const isKKey = e.key === 'k';
      if (hasModifier && isKKey) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          const el = inputRef.current;
          if (el) { el.focus(); }
        }, 50);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  /** Handle Enter to submit and Escape to close */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  /** Clear input and refocus */
  const handleClear = () => {
    setQuery('');
    const el = inputRef.current;
    if (el) { el.focus(); }
  };

  /** Toggle open/submit behaviour */
  const handleToggle = () => {
    if (isOpen && query.trim()) {
      handleSubmit();
    } else {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => {
          const el = inputRef.current;
          if (el) { el.focus(); }
        }, 50);
      }
    }
  };

  return (
    <div className={`search-input ${className}`} role="search" aria-label="Search all content">
      <input
        ref={inputRef}
        type="text"
        className={`search-input__field ${isOpen ? 'search-input__field--expanded' : ''}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        aria-label="Search all content"
        tabIndex={isOpen ? 0 : -1}
      />
      {isOpen && query && (
        <button
          type="button"
          className="search-input__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="icon-xs" />
        </button>
      )}
      <button
        type="button"
        className="search-input__toggle"
        onClick={handleToggle}
        aria-label={isOpen ? 'Submit search' : 'Open search'}
      >
        <MagnifyingGlass className="icon-sm" />
      </button>
    </div>
  );
}