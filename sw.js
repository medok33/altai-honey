// Версия кеша
const CACHE_NAME = 'static-cache-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  
  // CSS
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
  '/register-sw.js',
  
  // Страницы
  '/blog/',
  '/faq/',
  '/legal.html',
  '/delivery.html'
];

// Установка Service Worker
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

// Активация и очистка старых кешей
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

// Стратегия кеширования: Cache First с обновлением
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Удаляем параметры версий из URL
  const requestUrl = new URL(event.request.url);
  const cacheUrl = requestUrl.origin + requestUrl.pathname;

  // Обработка HTML-страниц
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(cacheUrl, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(cacheUrl) || caches.match('/offline.html');
        })
    );
    return;
  }

  // Обработка остальных ресурсов
  event.respondWith(
    caches.match(cacheUrl)
      .then(cachedResponse => {
        // Всегда обновляем кеш в фоне
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(cacheUrl, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {}); // Игнорируем ошибки фонового обновления

        // Возвращаем кешированный ответ немедленно
        return cachedResponse || fetchPromise;
      })
      .catch(() => {
        if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/)) {
          return caches.match('/images/favicon.svg');
        }
        return new Response('Offline', { status: 503 });
      })
  );
});

// Сообщения для обновления SW
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
