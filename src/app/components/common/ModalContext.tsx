/**
 * @fileoverview Modal State Management Context for Ash Shaw Portfolio
 * 
 * Provides global state management for modal components (lightboxes, dialogs, etc.)
 * to prevent overlapping UI elements like scroll-to-top buttons appearing over modals.
 * 
 * Features:
 * - Global modal state tracking across the application
 * - Component registration system for different modal types
 * - Hook for consuming modal state in components
 * - Automatic cleanup and state management
 * - TypeScript support with proper type safety
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial implementation for lightbox management
 * @lastModified 2025-01-29
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

/**
 * Modal type identifiers for different modal components
 */
type ModalType = 'lightbox' | 'dialog' | 'drawer' | 'alert' | 'contact-form' | 'dropdown';

/**
 * Modal state interface
 */
interface ModalState {
  /** Unique identifier for the modal instance */
  id: string;
  /** Type of modal (lightbox, dialog, etc.) */
  type: ModalType;
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Optional additional data for the modal */
  data?: any;
}

/**
 * Modal context interface
 */
interface ModalContextValue {
  /** Array of currently registered modals */
  modals: ModalState[];
  /** Whether any modal is currently open */
  hasOpenModals: boolean;
  /** Register a new modal with the context */
  registerModal: (id: string, type: ModalType, data?: any) => void;
  /** Update modal open/close state */
  updateModal: (id: string, isOpen: boolean, data?: any) => void;
  /** Unregister a modal from the context */
  unregisterModal: (id: string) => void;
  /** Get specific modal state by ID */
  getModal: (id: string) => ModalState | undefined;
  /** Check if any modal of specific type is open */
  hasModalOfType: (type: ModalType) => boolean;
}

/**
 * Modal context with default values
 */
var modalContextDefault: ModalContextValue = {
  modals: [],
  hasOpenModals: false,
  registerModal: function() {},
  updateModal: function() {},
  unregisterModal: function() {},
  getModal: function() { return undefined; },
  hasModalOfType: function() { return false; },
};
var ModalContext = (window as any).__AshShawModalContext;
if (!ModalContext) {
  ModalContext = createContext(modalContextDefault);
  (window as any).__AshShawModalContext = ModalContext;
}

/**
 * Props for ModalProvider component
 */
interface ModalProviderProps {
  /** Child components that will have access to modal context */
  children: ReactNode;
}

export function ModalProvider(props: ModalProviderProps) {
  var children = props.children;
  var modalsInit: ModalState[] = [];
  var modalsState = useState(modalsInit);
  var modals = modalsState[0];
  var setModals = modalsState[1];

  var registerModal = useCallback(function(id: string, type: ModalType, data?: any) {
    setModals(function(prev) {
      var existingIndex = -1;
      for (var i = 0; i < prev.length; i++) {
        if (prev[i].id === id) {
          existingIndex = i;
          break;
        }
      }
      
      var updated = prev.slice();
      if (existingIndex !== -1) {
        updated[existingIndex] = { id: id, type: type, isOpen: false, data: data };
        return updated;
      }
      
      updated.push({ id: id, type: type, isOpen: false, data: data });
      return updated;
    });
  }, []);

  var updateModal = useCallback(function(id: string, isOpen: boolean, data?: any) {
    setModals(function(prev) {
      var index = -1;
      for (var i = 0; i < prev.length; i++) {
        if (prev[i].id === id) {
          index = i;
          break;
        }
      }
      
      if (index === -1) {
        return prev;
      }
      
      var updated = prev.slice();
      var currentItem = updated[index];
      var newItem: any = {};
      for (var key in currentItem) {
        if (Object.prototype.hasOwnProperty.call(currentItem, key)) {
          newItem[key] = currentItem[key as keyof ModalState];
        }
      }
      newItem.isOpen = isOpen;
      if (data !== undefined) {
        newItem.data = data;
      }
      
      updated[index] = newItem as ModalState;
      return updated;
    });
  }, []);

  var unregisterModal = useCallback(function(id: string) {
    setModals(function(prev) {
      var filtered = [];
      for (var i = 0; i < prev.length; i++) {
        if (prev[i].id !== id) {
          filtered.push(prev[i]);
        }
      }
      return filtered;
    });
  }, []);

  var getModal = useCallback(function(id: string) {
    for (var i = 0; i < modals.length; i++) {
      if (modals[i].id === id) return modals[i];
    }
    return undefined;
  }, [modals]);

  var hasModalOfType = useCallback(function(type: ModalType) {
    for (var i = 0; i < modals.length; i++) {
      if (modals[i].type === type && modals[i].isOpen) return true;
    }
    return false;
  }, [modals]);

  var hasOpenModals = false;
  for (var j = 0; j < modals.length; j++) {
    if (modals[j].isOpen) {
      hasOpenModals = true;
      break;
    }
  }

  var contextValue: ModalContextValue = {
    modals: modals,
    hasOpenModals: hasOpenModals,
    registerModal: registerModal,
    updateModal: updateModal,
    unregisterModal: unregisterModal,
    getModal: getModal,
    hasModalOfType: hasModalOfType,
  };

  return React.createElement(ModalContext.Provider, { value: contextValue }, children);
}

export function useModal(): ModalContextValue {
  var context = useContext(ModalContext);
  
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  
  return context;
}

export type { ModalType, ModalState, ModalContextValue };