/**
 * @fileoverview Main entry point for the Ash Shaw Makeup Portfolio application
 * Bootstraps React app with proper error handling and performance monitoring
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.2.0 - Bundler-safe: guarded import.meta.env access
 */

import { initializeExtensionErrorSuppression } from './utils/extensionErrorSuppressor';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../styles/globals.css';
import '../styles/blocks/pwa-install-prompt.css';
import '../styles/blocks/offline-indicator.css';
import { SafetyWrapper } from './components/common/SafetyWrapper';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { registerServiceWorker } from './utils/pwaService';

// import.meta.env access completely removed — proven unreliable in this bundler

// Initialize aggressive extension error suppression immediately
initializeExtensionErrorSuppression();

// Ensure we have a root element
var rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

// Create React root and render the application
var root = ReactDOM.createRoot(rootElement);

root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      SafetyWrapper,
      null,
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(App, null)
      )
    )
  )
);

// Register PWA service worker for offline functionality
var hasServiceWorker = 'serviceWorker' in navigator;
if (hasServiceWorker) {
  window.addEventListener('load', function onWindowLoad() {
    registerServiceWorker().catch(function onRegisterError() {
      // Dev logging removed — import.meta.env.DEV crashes this bundler
    });
  });
}