// tailwind-faq.config.js
module.exports = {
  content: [
    './faq/index.html', // только файл FAQ
  ],
  safelist: [
    // Только необходимые классы для FAQ
    'faq-item', 'border-b', 'mb-6', 'pb-6',
    'text-primary', 'text-secondary', 'text-gray-700',
    'list-disc', 'pl-6', 'mt-2',
    
    // Классы для навигации
    'hidden', 'block', 'md:flex', 'md:hidden',
    
    // Классы для иконок
    { pattern: /ri-.*/ },
    
    // Минимальный набор размеров текста
    { pattern: /text-(xs|sm|base|lg|xl)/ },
    
    // Минимальный набор отступов
    { pattern: /(m|p)(b|t|l|r|y|x)?-\d+/ },
    
    // Цвета
    'bg-white', 'text-white', 'bg-[#F5DEB3]'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B8E23',
        secondary: '#8B4513',
        'gray-700': '#374151',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      borderRadius: {
        DEFAULT: '8px',
        'button': '8px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: true,
    // Отключаем неиспользуемые компоненты
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    isolation: false,
  }
};
