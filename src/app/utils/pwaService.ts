/**
 * PWA Service - Progressive Web App utilities
 * Handles service worker registration, installation, and updates
 * 
 * @module utils/pwaService
 */

// import.meta.env access completely removed — proven unreliable in this bundler

/**
 * Register the service worker
 * @returns Promise that resolves when service worker is registered
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | undefined> {
  // Only register if supported
  if (!('serviceWorker' in navigator)) {
    return undefined;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });

    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available, prompt user to update
            showUpdateNotification();
          }
        });
      }
    });

    return registration;
  } catch (error) {
    // Dev logging removed — import.meta.env.DEV crashes this bundler
    return undefined;
  }
}

/**
 * Unregister all service workers (for debugging)
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      return result;
    }
    return false;
  } catch (error) {
    // Dev logging removed — import.meta.env.DEV crashes this bundler
    return false;
  }
}

/**
 * Check if app is running in standalone mode (installed PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

/**
 * Check if user is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Show update notification when new version is available
 */
function showUpdateNotification(): void {
  // This will be called when a new service worker is available
  // You can implement a UI notification here
  const shouldUpdate = confirm(
    'A new version of the app is available. Reload to update?'
  );
  
  if (shouldUpdate) {
    window.location.reload();
  }
}

/**
 * Check for PWA installation prompt availability
 */
export function checkInstallability(): Promise<boolean> {
  return new Promise((resolve) => {
    // Check if already installed
    if (isStandalone()) {
      resolve(false);
      return;
    }

    // Listen for beforeinstallprompt event
    let deferredPrompt: any = null;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      resolve(true);
    });

    // Timeout after 3 seconds
    setTimeout(() => {
      if (!deferredPrompt) {
        resolve(false);
      }
    }, 3000);
  });
}

/**
 * Prompt user to install PWA
 */
export async function promptInstall(): Promise<boolean> {
  // This needs to be called from a user gesture (click event)
  return new Promise((resolve) => {
    let deferredPrompt: any = null;

    const listener = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show the install prompt
      if (deferredPrompt) {
        deferredPrompt.prompt();
        
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            // Dev logging removed — import.meta.env.DEV crashes this bundler
            resolve(true);
          } else {
            // Dev logging removed — import.meta.env.DEV crashes this bundler
            resolve(false);
          }
          deferredPrompt = null;
        });
      }
    };

    window.addEventListener('beforeinstallprompt', listener, { once: true });

    // Timeout if prompt doesn't appear
    setTimeout(() => {
      window.removeEventListener('beforeinstallprompt', listener);
      resolve(false);
    }, 1000);
  });
}

/**
 * Cache specific URLs for offline access
 */
export async function cacheUrls(urls: string[]): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  
  if (registration.active) {
    registration.active.postMessage({
      type: 'CACHE_URLS',
      urls
    });
  }
}

/**
 * Monitor online/offline status
 */
export function onlineStatusMonitor(callback: (isOnline: boolean) => void): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Initial call
  callback(navigator.onLine);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Get service worker registration
 */
export async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | undefined> {
  if (!('serviceWorker' in navigator)) {
    return undefined;
  }

  try {
    return await navigator.serviceWorker.getRegistration();
  } catch (error) {
    // Dev logging removed — import.meta.env.DEV crashes this bundler
    return undefined;
  }
}