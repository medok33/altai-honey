require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Заголовки безопасности
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://mc.yandex.ru; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none';");
  next();
});

// Обработка заказов
app.post('/send-order', async (req, res) => {
  try {
    const orderData = req.body;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    // Форматируем сообщение для Telegram
    let telegramMessage = `🔥 НОВЫЙ ЗАКАЗ С САЙТА 🔥\n`;
    
    if (orderData.source === 'Быстрый заказ') {
      telegramMessage += `Тип: Быстрый заказ\n`;
      telegramMessage += `Товар: ${orderData.product}\n`;
      telegramMessage += `Количество: ${orderData.quantity} литров\n`;
      telegramMessage += `Стоимость: ${orderData.price} ₽\n`;
      telegramMessage += `Адрес: ${orderData.address}\n`;
      telegramMessage += `Телефон: ${orderData.phone}\n`;
    } else {
      telegramMessage += `Тип: Основная форма\n`;
      telegramMessage += `Имя: ${orderData.name}\n`;
      telegramMessage += `Телефон: ${orderData.phone}\n`;
      telegramMessage += `Email: ${orderData.email}\n`;
      telegramMessage += `Комментарий: ${orderData.message}\n`;
    }
    
    // Отправляем в Telegram
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage
      }
    );
    
    if (response.data.ok) {
      res.status(200).json({ success: true });
    } else {
      console.error('Ошибка отправки в Telegram:', response.data);
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.error('Ошибка обработки заказа:', error);
    res.status(500).json({ success: false });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
