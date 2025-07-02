const CACHE_NAME = 'static-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  
  // CSS
  '/assets/css/tailwind.min.css',
  '/assets/fonts/remixicon/remixicon.css',
  '/fonts/fonts.css',
  
  // Шрифты
  '/fonts/Pacifico-Regular.woff2',
  '/fonts/OpenSans-Medium.woff2',
  '/fonts/OpenSans-Regular.woff2',
  '/fonts/OpenSans-Bold.woff2',
  '/assets/fonts/remixicon/remixicon.woff2',
  
  // Изображения
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
  '/register-sw.js',
  
  // Страницы
  '/blog/',
  '/faq/',
  '/legal.html',
  '/delivery.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширование статических ресурсов');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
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
  // Полностью игнорируем HTTP-кеш для всех запросов
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Всегда возвращаем кешированный ресурс, если он есть
        if (cachedResponse) return cachedResponse;
        
        // Для некритических ресурсов: загружаем из сети
        return fetch(event.request)
          .then(networkResponse => {
            // Кешируем только успешные ответы
            if (networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Для изображений возвращаем заглушку
            if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/)) {
              return caches.match('/images/favicon.svg');
            }
            // Для страниц возвращаем offline.html
            if (event.request.headers.get('Accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
