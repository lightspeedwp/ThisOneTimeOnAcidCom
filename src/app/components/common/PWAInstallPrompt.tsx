/**
 * PWA Install Prompt Component
 * 
 * Displays a prompt for users to install the Progressive Web App
 * Follows strict BEM architecture and neon design system
 * 
 * @component
 * @accessibility
 * - Keyboard navigation (Enter/Space to install, Escape to dismiss)
 * - Screen reader announcements
 * - Focus management
 * - Reduced motion support
 */

import { useState, useEffect } from 'react';
import { X, DownloadSimple } from '@phosphor-icons/react';
import { isStandalone } from '../../utils/pwaService';

interface PWAInstallPromptProps {
  /** Optional CSS class for additional styling */
  className?: string;
}

export function PWAInstallPrompt({ className = '' }: PWAInstallPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const deferredPromptInit: any = null;
  const [deferredPrompt, setDeferredPrompt] = useState(deferredPromptInit);

  useEffect(() => {
    // Don't show if already installed
    if (isStandalone()) {
      return;
    }

    // Check if user has previously dismissed the prompt
    const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (isDismissed) {
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 10 seconds on the site
      setTimeout(() => {
        setShowPrompt(true);
      }, 10000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user's response
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        // Dev logging removed — import.meta.env.DEV crashes this bundler
      } else {
        // Dev logging removed — import.meta.env.DEV crashes this bundler
      }

      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      // Suppress PWA install prompt errors (user may have dismissed or browser blocked)
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: 'install' | 'dismiss') => {
    const isActivationKey = e.key === 'Enter' || e.key === ' ';
    if (isActivationKey) {
      e.preventDefault();
      action === 'install' ? handleInstall() : handleDismiss();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleDismiss();
    }
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className={`pwa-install-prompt ${className}`} role="dialog" aria-labelledby="pwa-prompt-title" aria-modal="true">
      <div className="pwa-install-prompt__overlay" onClick={handleDismiss}></div>
      
      <div className="pwa-install-prompt__container">
        {/* Close Button */}
        <button
          type="button"
          className="pwa-install-prompt__close"
          onClick={handleDismiss}
          onKeyDown={(e) => handleKeyDown(e, 'dismiss')}
          aria-label="Dismiss installation prompt"
        >
          <X className="pwa-install-prompt__close-icon" />
        </button>

        {/* Icon */}
        <div className="pwa-install-prompt__icon" aria-hidden="true">
          <DownloadSimple />
        </div>

        {/* Title */}
        <h3 id="pwa-prompt-title" className="pwa-install-prompt__title">
          Install Ash Shaw App
        </h3>

        {/* Description */}
        <p className="pwa-install-prompt__description">
          Get quick access to the portfolio, work offline, and enjoy a native app experience!
        </p>

        {/* Features List */}
        <ul className="pwa-install-prompt__features">
          <li className="pwa-install-prompt__feature">
            <span className="pwa-install-prompt__feature-icon" aria-hidden="true">📱</span>
            <span>Install on your home screen</span>
          </li>
          <li className="pwa-install-prompt__feature">
            <span className="pwa-install-prompt__feature-icon" aria-hidden="true">⚡</span>
            <span>Faster loading and performance</span>
          </li>
          <li className="pwa-install-prompt__feature">
            <span className="pwa-install-prompt__feature-icon" aria-hidden="true">📡</span>
            <span>Works offline with cached content</span>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="pwa-install-prompt__actions">
          <button
            type="button"
            className="pwa-install-prompt__button pwa-install-prompt__button--primary"
            onClick={handleInstall}
            onKeyDown={(e) => handleKeyDown(e, 'install')}
            aria-label="Install Progressive Web App"
          >
            Install App
          </button>
          
          <button
            type="button"
            className="pwa-install-prompt__button pwa-install-prompt__button--secondary"
            onClick={handleDismiss}
            onKeyDown={(e) => handleKeyDown(e, 'dismiss')}
            aria-label="Not now, dismiss prompt"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}