module.exports = {
  // Оптимизированные пути для полного покрытия
  content: [
    // Все HTML-файлы в корне
    './*.html',
    
    // Страницы блога и FAQ
    './blog/**/*.html',
    './faq/**/*.html',
    
    // JavaScript
    './scripts/**/*.{js,ts}',
    './src/**/*.{js,ts,jsx}',
    
    // Временное сохранение старого пути (на 2 недели)
    './scr/**/*.{js,ts}'
  ],

  // Расширенный safelist с защитой всех специфичных классов
  safelist: [
    // Существующие классы
    'modal-open', 'modal-close',
    'step-1', 'step-2', 'step-3',
    
    // Новые классы
    'carpet-size-selector',
    
    // Автозащита по паттернам
    { pattern: /delivery-.*/ },
    { pattern: /carpet-.*/ },
    { pattern: /blog-.*/ },
    { pattern: /post-.*/ },
    { pattern: /step-\d/ }
  ],

  theme: {
    extend: {
      colors: {
        primary: '#6B8E23',
        secondary: '#8B4513',
        orange: '#FFA500',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      // Новые кастомизации для безопасности
      borderRadius: {
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'carpet': '12px'
      }
    }
  },
  plugins: [],
  
  // Экспериментальные функции для совместимости
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true
  }
};
