const CACHE_VERSION = 9;
const CACHE_NAME = `static-cache-v${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  OFFLINE_URL,
  '/blog/index.html',
  '/faq/index.html',
  '/legal.html',
  '/delivery.html',

  // CSS
  '/assets/css/tailwind.min.css',
  '/assets/fonts/remixicon/remixicon.css',
  '/fonts/fonts.css',

  // Fonts
  '/fonts/Pacifico-Regular.woff2',
  '/fonts/OpenSans-Medium.woff2',
  '/fonts/OpenSans-Regular.woff2',
  '/fonts/OpenSans-Bold.woff2',
  '/assets/fonts/remixicon/remixicon.woff2',

  // Images
  '/images/favicon.ico',
  '/images/favicon.svg',
  '/images/apple-touch-icon.png',
  '/images/image-1.webp',
  '/images/image-1-mobile.webp',
  '/images/image-2.webp',
  '/images/image-3.webp',
  '/images/image-4.webp',
  '/images/image-5.webp',
  '/images/image-6.webp',
  '/images/pwa-192.png',
  '/images/pwa-512.png',
  '/images/og-preview.webp',

  // JS
  '/register-sw.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`Кеширование ${urlsToCache.length} ресурсов (версия ${CACHE_VERSION})`);
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('Ошибка при кешировании ресурсов:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Удаление старого кеша:', name);
            return caches.delete(name);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) return;

  // HTML pages: network-first, then cache or offline
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request, {ignoreSearch: true}).then(cached => cached || caches.match(OFFLINE_URL)))
    );
    return;
  }

  // Other GET requests: cache-first with background update
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(cached => {
      if (cached) {
        fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        });
        return cached;
      }
      return fetch(event.request)
        .then(networkResponse => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
            return caches.match('/images/favicon.svg');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
    })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
