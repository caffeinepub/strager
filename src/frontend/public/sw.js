// Cache version - increment this to force cache refresh on deployment
const CACHE_VERSION = 7;
const CACHE_NAME = `strager-v${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const CORE_ASSETS = [
  '/',
  '/offline.html',
  `/manifest.webmanifest?v=${CACHE_VERSION}`,
  `/assets/generated/app-icon-s.dim_512x512.png?v=${CACHE_VERSION}`,
  `/assets/generated/app-icon-s.dim_192x192.png?v=${CACHE_VERSION}`,
  `/assets/generated/app-icon-s-maskable.dim_512x512.png?v=${CACHE_VERSION}`,
  '/assets/generated/marketplace-logo.dim_512x128.png',
  '/assets/generated/play-store-feature-graphic.dim_1024x500.png',
  '/assets/generated/play-store-screenshot-1.dim_1080x1920.png',
  '/assets/generated/play-store-screenshot-2.dim_1080x1920.png',
  '/assets/generated/play-store-screenshot-3.dim_1080x1920.png',
  '/assets/generated/play-store-screenshot-4.dim_1080x1920.png'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((error) => {
        console.error('Failed to cache core assets:', error);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - aggressively clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete any cache that doesn't match current version
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first with cache-bypass for manifest and icons
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  const url = new URL(event.request.url);
  const isManifest = url.pathname.includes('manifest.webmanifest');
  const isIcon = url.pathname.includes('app-icon-s');

  // For manifest and icons, always try network first with cache bypass
  if (isManifest || isIcon) {
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then((response) => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
    return;
  }

  // Standard network-first strategy for other requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseToCache = response.clone();
        
        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Try to get from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // For navigation requests, return offline page
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          
          // For other requests, return a basic response
          return new Response('Network error', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
