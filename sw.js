// AI Bots Progressive Web App (PWA) Service Worker
// Version: 1.3.0 (Cache-First Core + Stale-While-Revalidate Strategy)

const CACHE_NAME = 'aibots-pwa-v5';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './logo.png',
  './logo-exact-hd.svg',
  './logo-hd.svg',
  './css/theme.css',
  './js/app.js',
  './js/app.min.js',
  './js/common.js',
  './js/effects.js',
  './manifest.json',
  './calculator.html',
  './cricketscore.html',
  './qrcode.html',
  './password.html',
  './ledger.html',
  './jsonformatter.html',
  './audiorecorder.html',
  './unitconverter.html',
  './wordcounter.html',
  './cropphoto.html',
  './resizeimage.html'
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

// 3. Fetch Event: Network-First for HTML pages, Stale-While-Revalidate for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore non-GET requests or external API calls
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Network-First for navigation / HTML pages to prevent stale code lock-in
  if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || caches.match('./offline.html');
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate for static assets (css, js, images)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
