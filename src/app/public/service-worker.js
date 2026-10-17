/**
 * Ash Shaw Makeup Portfolio - Service Worker
 * Version: 1.0.0
 * 
 * PWA Service Worker for offline functionality
 * Caches homepage and critical assets for offline access
 */

const CACHE_VERSION = 'ash-shaw-v1.1.0';
const CACHE_NAME = `ash-shaw-pwa-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/styles/globals.css',
  '/styles/animations.css',
  '/styles/blocks/pwa-install-prompt.css',
  '/styles/blocks/offline-indicator.css',
  '/manifest.json',
  '/offline.html'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

/**
 * Install Event - Precache critical assets
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing service worker...', CACHE_NAME);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching homepage assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Precaching failed:', error);
      })
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating service worker...', CACHE_NAME);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old versions of the cache
              return cacheName.startsWith('ash-shaw-pwa-') && cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

/**
 * Fetch Event - Handle network requests with offline fallback
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Determine cache strategy based on request type
  if (request.destination === 'document') {
    // HTML pages - Network first, fallback to cache
    event.respondWith(networkFirst(request));
  } else if (request.destination === 'style' || request.destination === 'script') {
    // CSS/JS - Stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  } else if (request.destination === 'image') {
    // Images - Cache first
    event.respondWith(cacheFirst(request));
  } else {
    // Everything else - Network first
    event.respondWith(networkFirst(request));
  }
});

/**
 * Cache First Strategy
 * Best for: Images, fonts, static assets
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    
    // Return offline fallback for images
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#0F0F0F" width="400" height="300"/><text fill="#BE00FE" font-family="Arial" font-size="24" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">Offline</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    
    throw error;
  }
}

/**
 * Network First Strategy
 * Best for: HTML pages, API requests, dynamic content
 */
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network failed, using cache:', request.url);
    
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    throw error;
  }
}

/**
 * Stale While Revalidate Strategy
 * Best for: CSS, JavaScript, assets that can be slightly stale
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Return cached version immediately, then update cache in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

/**
 * Message Event - Handle messages from clients
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urls);
    });
  }
});

/**
 * Sync Event - Background sync for offline actions
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-contact-form') {
    event.waitUntil(syncContactFormSubmissions());
  }
});

/**
 * Sync contact form submissions when back online
 */
async function syncContactFormSubmissions() {
  // This would sync any pending contact form submissions
  // stored in IndexedDB when the user was offline
  console.log('[Service Worker] Syncing contact form submissions...');
}

/**
 * Push Event - Handle push notifications (future feature)
 */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Ash Shaw Makeup';
  const options = {
    body: data.body || 'New update available!',
    icon: '/pwa-icons/icon-192x192.png',
    badge: '/pwa-icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'ash-shaw-notification',
    requireInteraction: false,
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/**
 * Notification Click Event
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there's already a window open
        for (let client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

console.log('[Service Worker] Loaded successfully');
