const CACHE_NAME = 'static-cache-v7';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  OFFLINE_URL,
  '/blog/',
  '/faq/',
  '/legal.html',
  '/delivery.html',

  // CSS
  '/assets/css/tailwind.min.css?v=20250701',
  '/assets/fonts/remixicon/remixicon.css?v=20250701',
  '/fonts/fonts.css?v=20250701',

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
  '/register-sw.js?v=20250701'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`Кеширование ${urlsToCache.length} ресурсов`);
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.error('Ошибка при кешировании ресурсов:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кеша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) return;

  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return networkResponse;
        })
        .catch(() => caches.match(event.request) || caches.match(OFFLINE_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          fetch(event.request).then(networkResponse => {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          });
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {
            if (networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
              return caches.match('/images/favicon.svg');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') self.skipWaiting();
});
