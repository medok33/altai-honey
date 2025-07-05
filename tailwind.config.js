// D:\сайт 05.07.2025\altai-honey-main\tailwind.config.js
module.exports = {
  content: [
    './*.html',
    './**/*.html',
    './assets/css/**/*.css',
    './css/**/*.css',
    './images/css/**/*.css',
    './src/**/*.css',
    './scripts/**/*.{js,ts}',
    './src/**/*.{js,ts,jsx}',
    './scr/**/*.{js,ts}',
    './images/icons/**/*.svg'
  ],
  safelist: [
    'modal-open', 'modal-close',
    'step-1', 'step-2', 'step-3',
    'carpet-size-selector',
    'blog-post-card',
    'floating-back-button',
    'texture-bg',
    'section-animate',
    'section-visible',
    'active-nav-link-alt',
    'hero-overlay',
    
    // Добавлены классы для FAQ
    'faq-item', 'border-b', 'mb-6', 'pb-6',
    'text-primary', 'text-secondary', 'text-gray-700',
    'list-disc', 'pl-6', 'mt-2',
    
    // Классы для исправления подчеркивания
    'no-underline', 'underline-none',
    
    { pattern: /delivery-.*/ },
    { pattern: /carpet-.*/ },
    { pattern: /blog-.*/ },
    { pattern: /post-.*/ },
    { pattern: /step-\d/ },
    { pattern: /image-.*/ },
    { pattern: /texture-.*/ },
    { pattern: /ri-.*/ },
    { pattern: /nav-.*/ },
    { pattern: /hero-.*/ },
    { pattern: /icon-.*/ },
    { pattern: /map-.*/ },
    { pattern: /swiper-.*/ },
    { pattern: /^is-.*/ },
    { pattern: /^js-.*/ },
    
    // Добавлены паттерны для FAQ
    { pattern: /faq-.*/ },
    { pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)/ },
    { pattern: /font-(normal|medium|semibold|bold)/ },
    { pattern: /border-(b|t|l|r)/ },
    { pattern: /mb-\d+/ },
    { pattern: /pb-\d+/ }
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B8E23',
        secondary: '#8B4513',
        orange: '#FFA500',
        
        // Добавлены цвета для текста
        'gray-700': '#374151',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px'
      },
      backgroundImage: {
        'texture': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWRlYjMiIG9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')"
      },
      
      // Добавлены расширения для решения проблемы подчеркивания
      textDecoration: {
        'none-important': 'none !important',
      },
      borderWidth: {
        '1': '1px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    
    // Добавлен кастомный плагин для сброса подчеркивания
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-underline': {
          'text-decoration': 'none !important',
        },
        '.underline-none': {
          'text-decoration': 'none !important',
        },
        '.reset-underline a': {
          'text-decoration': 'none !important',
        },
        '.reset-underline p': {
          'text-decoration': 'none !important',
        },
        '.reset-underline': {
          'text-decoration': 'none !important',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true
  },
  corePlugins: {
    // Включаем preflight для сброса стилей
    preflight: true,
    
    // Отключаем ненужные corePlugins для уменьшения размера
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    isolation: false,
  }
};
