// sw.js - Service Worker for offline fallback
const CACHE_NAME = 'offline-cache-v1';
// Get the base path from the service worker's own URL
const BASE_PATH = new URL(self.location).pathname.replace('/sw.js', '');
const OFFLINE_URL = `${BASE_PATH}/offline.html`;

// Assets to cache for offline functionality
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/offline.html`,
  // We'll dynamically add built assets in the install event
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...', 'Base path:', BASE_PATH);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('Opened cache');

        // Cache the basic URLs
        await cache.addAll(urlsToCache);

        // Try to cache the main page and assets
        try {
          const response = await fetch(`${BASE_PATH}/`);
          if (response.ok) {
            await cache.put(`${BASE_PATH}/`, response.clone());
          }
        } catch (e) {
          console.log('Could not cache main page during install');
        }

        return cache;
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Ensure the service worker takes control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - implement offline fallback strategy
self.addEventListener('fetch', (event) => {
  // Only handle requests within our base path
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith(BASE_PATH)) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, cache the response
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          console.log('Network failed, serving offline page');
          // If network request fails, serve the offline page
          return caches.open(CACHE_NAME)
            .then((cache) => {
              return cache.match(OFFLINE_URL);
            });
        })
    );
  } else {
    // For other requests (CSS, JS, images), try cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }

          // Not in cache, fetch from network
          return fetch(event.request)
            .then(fetchResponse => {
              // Cache successful responses
              if (fetchResponse.ok) {
                const responseClone = fetchResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, responseClone);
                });
              }
              return fetchResponse;
            });
        })
        .catch(() => {
          console.log('Both cache and network failed for:', event.request.url);
          // Return a basic offline response for failed requests
          if (event.request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
        })
    );
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
