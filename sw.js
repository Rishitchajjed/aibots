// AI Bots Progressive Web App (PWA) Service Worker
// Version: 1.1.0 (Cache-First Core + Stale-While-Revalidate Strategy)

const CACHE_NAME = 'aibots-pwa-v2';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './logo.png',
  './css/theme.css',
  './js/app.min.js',
  './js/common.js',
  './js/effects.js',
  './manifest.json'
];

// 1. Install Event: Pre-cache core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Some precache assets could not be loaded:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Stale-While-Revalidate with Offline Fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore non-GET requests or external API calls (e.g. Google Apps Script)
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Fetch fresh version in the background
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // If network fails and request is a navigation page, serve offline.html
        if (request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
      });

      // Return cached version immediately if available, else wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
