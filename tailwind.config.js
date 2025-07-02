module.exports = {
  // Явно указываем все места, где могут появляться классы Tailwind
  content: [
    // основные HTML в корне
    './index.html',
    './delivery.html',
    './legal.html',
    './offline.html',

    // разделы с HTML в подпапках
    './blog/**/*.html',
    './faq/**/*.html',

    // все HTML вообще (на всякий случай)
    './**/*.html',

    // JS-код, где могут динамически добавляться классы
    './scripts/**/*.{js,ts}',
    './scr/**/*.{js,ts}',
    './src/**/*.{js,ts,jsx}',

    // если у вас есть Vue/React-файлы – добавьте их тоже
    // './src/**/*.{vue,tsx}',
  ],

  // Сохраняем динамические классы, которыми оперируете в JS
  safelist: [
    'modal-open', 'modal-close',
    'step-1', 'step-2', 'step-3',
    // …добавьте здесь любые другие классы, которыми манипулируете через JS
  ],

  theme: {
    extend: {
      colors: {
        primary: '#6B8E23',
        secondary: '#8B4513',
        orange: '#FFA500',
      },
      borderRadius: {
        /* ваша текущая градация */
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      }
    }
  },
  plugins: []
};
