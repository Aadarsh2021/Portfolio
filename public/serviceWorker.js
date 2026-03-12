/**
 * Service Worker for Portfolio Project - Enhanced Caching v3
 * @license MIT
 * This service worker handles caching strategies for different types of resources
 * and provides offline functionality for the portfolio website.
 */

const STATIC_CACHE = 'static-cache-v3';
const DYNAMIC_CACHE = 'dynamic-cache-v2';
const ASSET_CACHE = 'asset-cache-v2';
const FONT_CACHE = 'font-cache-v1';

const CACHE_DURATION = {
  static: 30 * 24 * 60 * 60, // 30 days
  dynamic: 7 * 24 * 60 * 60, // 7 days
  asset: 90 * 24 * 60 * 60,  // 90 days
  font: 180 * 24 * 60 * 60   // 180 days
};

const urlsToCache = {
  static: [
    '/',
    '/index.html',
    '/manifest.json',
    '/offline.html',
    '/static/css/main.bae9cefc.css',
    '/static/js/main.065f94d9.js',
    '/static/js/206.a99b0300.chunk.js'
  ],
  styles: [
    '/static/css/main.*.css'
  ],
  scripts: [
    '/static/js/main.*.js',
    '/static/js/*.chunk.js'
  ],
  assets: [
    '/assets/**/*.{png,jpg,jpeg,gif,svg,webp}',
    '/assets/certificates/*'
  ],
  fonts: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.gstatic.com/**/*'
  ]
};

// Helper function to check cache expiry
const isCacheExpired = (timestamp, duration) => {
  const now = Date.now();
  return (now - timestamp) > (duration * 1000);
};

// Helper function to add timestamp to cached response
const addTimestamp = (response) => {
  const clonedResponse = response.clone();
  const timestamp = Date.now();
  return new Response(clonedResponse.body, {
    headers: {
      ...Object.fromEntries(clonedResponse.headers.entries()),
      'sw-timestamp': timestamp.toString()
    }
  });
};

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(urlsToCache.static);
      }),
      caches.open(ASSET_CACHE).then(cache => {
        return cache.addAll(urlsToCache.assets);
      }),
      caches.open(FONT_CACHE).then(cache => {
        return cache.addAll(urlsToCache.fonts);
      })
    ])
  );
  self.skipWaiting();
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (![STATIC_CACHE, DYNAMIC_CACHE, ASSET_CACHE, FONT_CACHE].includes(cacheName)) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event handler with improved caching strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests and browser-extension requests
  if (event.request.method !== 'GET' || url.origin.includes('chrome-extension')) {
    return;
  }

  // Function to handle network fetch with timeout
  const timeoutFetch = (request, timeout = 5000) => {
    return Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ]);
  };

  // Handle different types of requests
  if (event.request.mode === 'navigate') {
    // HTML navigation - network first with quick fallback
    event.respondWith(
      timeoutFetch(event.request)
        .catch(() => caches.match(event.request))
        .catch(() => caches.match('/offline.html'))
    );
  } 
  else if (url.pathname.startsWith('/static/')) {
    // Static assets - cache first with background sync
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const networkFetch = fetch(event.request).then(response => {
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, addTimestamp(responseToCache));
            });
            return response;
          });
          
          return cachedResponse || networkFetch;
        })
    );
  }
  else if (url.pathname.startsWith('/assets/')) {
    // Asset files - stale while revalidate with expiry
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          const timestamp = parseInt(cachedResponse.headers.get('sw-timestamp'));
          if (!isCacheExpired(timestamp, CACHE_DURATION.asset)) {
            return cachedResponse;
          }
        }

        return fetch(event.request)
          .then(networkResponse => {
            const responseToCache = networkResponse.clone();
            caches.open(ASSET_CACHE).then(cache => {
              cache.put(event.request, addTimestamp(responseToCache));
            });
            return networkResponse;
          })
          .catch(() => cachedResponse);
      })
    );
  }
  else if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    // Fonts - cache first with long expiry
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            const timestamp = parseInt(cachedResponse.headers.get('sw-timestamp'));
            if (!isCacheExpired(timestamp, CACHE_DURATION.font)) {
              return cachedResponse;
            }
          }

          return fetch(event.request)
            .then(networkResponse => {
              const responseToCache = networkResponse.clone();
              caches.open(FONT_CACHE).then(cache => {
                cache.put(event.request, addTimestamp(responseToCache));
              });
              return networkResponse;
            })
            .catch(() => cachedResponse);
        })
    );
  }
  else {
    // Dynamic content - stale while revalidate
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const networkFetch = fetch(event.request)
            .then(networkResponse => {
              const responseToCache = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(event.request, addTimestamp(responseToCache));
              });
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || networkFetch;
        })
    );
  }
});