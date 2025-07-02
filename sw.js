const CACHE_NAME = 'static-cache-v6'; // Увеличена версия до v6
const OFFLINE_URL = '/offline.html';

// Список ресурсов для предварительного кеширования
const urlsToCache = [
  '/',
  OFFLINE_URL,
  
  // Основные страницы
  '/blog/',
  '/faq/',
  '/legal.html',
  '/delivery.html',
  
  // CSS с версиями
  '/assets/css/tailwind.min.css?v=3.1',
  '/assets/fonts/remixicon/remixicon.css?v=3.1',
  '/fonts/fonts.css?v=3.1',
  
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
  '/register-sw.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`Кеширование ${urlsToCache.length} ресурсов`);
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
  // Игнорируем POST-запросы и chrome-extension
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Для HTML-страниц: Network First, затем Cache
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Обновляем кеш при успешном ответе
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request) || 
                 caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Для статических ресурсов: Cache First, затем Network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // 1. Возвращаем кешированный ресурс, если есть
        if (cachedResponse) {
          // Фоновое обновление кеша
          fetch(event.request)
            .then(networkResponse => {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            });
          return cachedResponse;
        }
        
        // 2. Если нет в кеше - загружаем из сети
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
            // Заглушки для различных типов ресурсов
            if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
              return caches.match('/images/favicon.svg');
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
