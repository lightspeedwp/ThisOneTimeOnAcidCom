/**
 * @fileoverview Custom hook for ebook state management using useReducer
 * 
 * Centralizes all ebook reader state (page navigation, animations, settings,
 * drawer state) into a single reducer for better maintainability and
 * predictable state updates.
 * 
 * @version 1.0.0
 */

import { useReducer, useEffect, useCallback } from 'react';
import {
  readSavedPage,
  savePage,
  readFontSize,
  saveFontSize,
  readMinimalMode,
  saveMinimalMode,
  readPagingEffect,
  savePagingEffect,
  FONT_SIZE_SCALE,
} from '../utils/ebookPreferences';
import type { FontSizePreset, PagingEffect } from '../utils/ebookPreferences';

/**
 * Ebook reader state
 */
export interface EbookState {
  currentPage: number;
  flipState: 'idle' | 'forward' | 'backward' | 'fade';
  isAnimating: boolean;
  drawerOpen: boolean;
  collapsedGroups: Record<string, boolean>;
  settingsOpen: boolean;
  fontSize: FontSizePreset;
  minimalMode: boolean;
  pagingEffect: PagingEffect;
}

/**
 * Ebook state actions
 */
export type EbookAction =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_FLIP_STATE'; payload: 'idle' | 'forward' | 'backward' | 'fade' }
  | { type: 'SET_ANIMATING'; payload: boolean }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'SET_DRAWER'; payload: boolean }
  | { type: 'TOGGLE_DRAWER_GROUP'; payload: string }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'SET_SETTINGS'; payload: boolean }
  | { type: 'SET_FONT_SIZE'; payload: FontSizePreset }
  | { type: 'TOGGLE_MINIMAL_MODE' }
  | { type: 'SET_MINIMAL_MODE'; payload: boolean }
  | { type: 'SET_PAGING_EFFECT'; payload: PagingEffect };

/**
 * Ebook state reducer
 */
function ebookReducer(state: EbookState, action: EbookAction): EbookState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_FLIP_STATE':
      return { ...state, flipState: action.payload };
    
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.payload };
    
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen };
    
    case 'SET_DRAWER':
      return { ...state, drawerOpen: action.payload };
    
    case 'TOGGLE_DRAWER_GROUP':
      var groupId = action.payload;
      var nextGroups: Record<string, boolean> = {};
      var keys = Object.keys(state.collapsedGroups);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key === groupId) {
          nextGroups[key] = !state.collapsedGroups[key];
        } else {
          nextGroups[key] = state.collapsedGroups[key];
        }
      }
      return { ...state, collapsedGroups: nextGroups };
    
    case 'TOGGLE_SETTINGS':
      return { ...state, settingsOpen: !state.settingsOpen };
    
    case 'SET_SETTINGS':
      return { ...state, settingsOpen: action.payload };
    
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    
    case 'TOGGLE_MINIMAL_MODE':
      return { ...state, minimalMode: !state.minimalMode };
    
    case 'SET_MINIMAL_MODE':
      return { ...state, minimalMode: action.payload };
    
    case 'SET_PAGING_EFFECT':
      return { ...state, pagingEffect: action.payload };
    
    default:
      return state;
  }
}

/**
 * Hook options
 */
interface UseEbookStateOptions {
  totalPages: number;
  drawerGroups: Array<{ id: string; collapsible: boolean }>;
  mainRef: React.RefObject<HTMLElement>;
}

/**
 * Custom hook for ebook state management
 * 
 * @param options - Configuration object
 * @returns State and dispatch actions
 * 
 * @example
 * ```tsx
 * const {
 *   state,
 *   setPage,
 *   setFlipState,
 *   toggleDrawer,
 *   toggleSettings,
 *   setFontSize,
 *   toggleMinimalMode,
 *   setPagingEffect,
 * } = useEbookState({
 *   totalPages: 82,
 *   drawerGroups: [...],
 *   mainRef,
 * });
 * ```
 */
export function useEbookState(options: UseEbookStateOptions) {
  var totalPages = options.totalPages;
  var drawerGroups = options.drawerGroups;
  var mainRef = options.mainRef;

  /* ── Initialize collapsed groups ── */
  var initialCollapsedGroups: Record<string, boolean> = {};
  for (var i = 0; i < drawerGroups.length; i++) {
    if (drawerGroups[i].collapsible) {
      initialCollapsedGroups[drawerGroups[i].id] = true;
    }
  }

  /* ── Initial state ── */
  var initialState: EbookState = {
    currentPage: readSavedPage(totalPages - 1),
    flipState: 'idle',
    isAnimating: false,
    drawerOpen: false,
    collapsedGroups: initialCollapsedGroups,
    settingsOpen: false,
    fontSize: readFontSize(),
    minimalMode: readMinimalMode(),
    pagingEffect: readPagingEffect(),
  };

  var reducerResult = useReducer(ebookReducer, initialState);
  var state = reducerResult[0];
  var dispatch = reducerResult[1];

  /* ── Persist current page ── */
  useEffect(function () {
    savePage(state.currentPage);
  }, [state.currentPage]);

  /* ── Persist and apply font size ── */
  useEffect(function () {
    var scale = FONT_SIZE_SCALE[state.fontSize];
    if (mainRef.current) {
      mainRef.current.style.setProperty('--ebook-font-scale', String(scale));
    }
    saveFontSize(state.fontSize);
  }, [state.fontSize, mainRef]);

  /* ── Persist minimal mode ── */
  useEffect(function () {
    saveMinimalMode(state.minimalMode);
  }, [state.minimalMode]);

  /* ── Persist paging effect ── */
  useEffect(function () {
    savePagingEffect(state.pagingEffect);
  }, [state.pagingEffect]);

  /* ── Action creators ── */
  var setPage = useCallback(function (page: number) {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  var setFlipState = useCallback(function (flipState: 'idle' | 'forward' | 'backward' | 'fade') {
    dispatch({ type: 'SET_FLIP_STATE', payload: flipState });
  }, []);

  var setAnimating = useCallback(function (animating: boolean) {
    dispatch({ type: 'SET_ANIMATING', payload: animating });
  }, []);

  var toggleDrawer = useCallback(function () {
    dispatch({ type: 'TOGGLE_DRAWER' });
  }, []);

  var setDrawer = useCallback(function (open: boolean) {
    dispatch({ type: 'SET_DRAWER', payload: open });
  }, []);

  var toggleDrawerGroup = useCallback(function (groupId: string) {
    dispatch({ type: 'TOGGLE_DRAWER_GROUP', payload: groupId });
  }, []);

  var toggleSettings = useCallback(function () {
    dispatch({ type: 'TOGGLE_SETTINGS' });
  }, []);

  var setSettings = useCallback(function (open: boolean) {
    dispatch({ type: 'SET_SETTINGS', payload: open });
  }, []);

  var setFontSize = useCallback(function (size: FontSizePreset) {
    dispatch({ type: 'SET_FONT_SIZE', payload: size });
  }, []);

  var toggleMinimalMode = useCallback(function () {
    dispatch({ type: 'TOGGLE_MINIMAL_MODE' });
  }, []);

  var setMinimalMode = useCallback(function (mode: boolean) {
    dispatch({ type: 'SET_MINIMAL_MODE', payload: mode });
  }, []);

  var setPagingEffect = useCallback(function (effect: PagingEffect) {
    dispatch({ type: 'SET_PAGING_EFFECT', payload: effect });
  }, []);

  return {
    state: state,
    setPage: setPage,
    setFlipState: setFlipState,
    setAnimating: setAnimating,
    toggleDrawer: toggleDrawer,
    setDrawer: setDrawer,
    toggleDrawerGroup: toggleDrawerGroup,
    toggleSettings: toggleSettings,
    setSettings: setSettings,
    setFontSize: setFontSize,
    toggleMinimalMode: toggleMinimalMode,
    setMinimalMode: setMinimalMode,
    setPagingEffect: setPagingEffect,
  };
}
