/**
 * Offline Indicator Component
 * 
 * Displays online/offline status to the user
 * Follows strict BEM architecture and neon design system
 * 
 * @component
 * @accessibility
 * - Screen reader announcements on status change
 * - ARIA live region for dynamic updates
 * - Reduced motion support
 */

import { useState, useEffect } from 'react';
import { WifiHigh, WifiSlash } from '@phosphor-icons/react';
import { onlineStatusMonitor } from '../../utils/pwaService';

interface OfflineIndicatorProps {
  /** Optional CSS class for additional styling */
  className?: string;
}

export function OfflineIndicator({ className = '' }: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const cleanup = onlineStatusMonitor((online) => {
      setIsOnline(online);
      
      // Show notification when status changes
      setShowNotification(true);
      
      // Auto-hide logic: offline persists, online dismisses quickly
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, online ? 2000 : 999999); // 2s for online, persist for offline

      return () => clearTimeout(timer);
    });

    return cleanup;
  }, []);

  // Don't show indicator if online and notification is hidden
  if (isOnline && !showNotification) {
    return null;
  }

  // Extract nested ternaries to avoid bundler issues
  const onlineStatusClass = !isOnline ? 'offline-indicator--offline' : 'offline-indicator--online';
  const visibilityClass = !showNotification ? 'offline-indicator--hidden' : '';

  return (
    <div
      className={`offline-indicator ${onlineStatusClass} ${visibilityClass} ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="offline-indicator__content">
        {/* Icon */}
        <div className="offline-indicator__icon" aria-hidden="true">
          {isOnline ? <WifiHigh /> : <WifiSlash />}
        </div>

        {/* Message */}
        <span className="offline-indicator__message">
          {isOnline ? 'Back online' : 'You are offline'}
        </span>

        {/* Additional Info (only when offline) */}
        {!isOnline && (
          <span className="offline-indicator__info">
            Cached content available
          </span>
        )}
      </div>
    </div>
  );
}