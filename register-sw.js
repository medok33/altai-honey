// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован: ', registration.scope);
        
        // Проверка обновлений Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Новый контент доступен
                console.log('Доступен новый контент. Пожалуйста, обновите страницу.');
                
                // Создаем уведомление об обновлении
                const updateNotification = document.createElement('div');
                updateNotification.id = 'sw-update-notification';
                updateNotification.style.cssText = `
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  background: #6B8E23;
                  color: white;
                  padding: 15px 20px;
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                  z-index: 10000;
                  display: flex;
                  align-items: center;
                  max-width: 400px;
                `;
                
                updateNotification.innerHTML = `
                  <div style="margin-right: 15px; font-size: 1.5rem;">🔄</div>
                  <div>
                    <strong>Доступно обновление!</strong>
                    <div style="font-size: 0.9rem; margin-top: 5px;">Обновите страницу, чтобы получить новую версию сайта</div>
                  </div>
                  <button id="sw-update-btn" style="
                    background: white;
                    color: #6B8E23;
                    border: none;
                    border-radius: 4px;
                    padding: 8px 15px;
                    margin-left: 15px;
                    cursor: pointer;
                    font-weight: bold;
                  ">Обновить</button>
                `;
                
                document.body.appendChild(updateNotification);
                
                // Обработчик кнопки обновления
                document.getElementById('sw-update-btn').addEventListener('click', () => {
                  newWorker.postMessage({ action: 'skipWaiting' });
                });
              }
            }
          });
        });
      })
      .catch(error => {
        console.log('Ошибка регистрации ServiceWorker: ', error);
      });

    // Обновление страницы после активации нового Service Worker
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      const notification = document.getElementById('sw-update-notification');
      if (notification) notification.remove();
      window.location.reload();
    });
  });
}
