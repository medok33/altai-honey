// Версия кеша - измените при обновлении ресурсов
const CACHE_NAME = 'static-cache-v1';
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
  
  // JS
  '/register-sw.js'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширование статических ресурсов');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Активируем сразу
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
    }).then(() => self.clients.claim()) // Контроль над всеми клиентами
  );
});

// Стратегия кеширования: Cache First с обновлением
self.addEventListener('fetch', event => {
  // Пропускаем не-GET запросы и chrome-extension
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Для HTML: Network First
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Обновляем кеш
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request) || caches.match('/offline.html');
        })
    );
    return;
  }

  // Для статических ресурсов: Cache First
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Возвращаем кешированный ресурс если есть
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Иначе загружаем из сети и кешируем
        return fetch(event.request).then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return networkResponse;
        });
      })
      .catch(() => {
        // Fallback для изображений
        if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/)) {
          return caches.match('/images/favicon.svg');
        }
      })
  );
});

// Сообщения для обновления SW
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
