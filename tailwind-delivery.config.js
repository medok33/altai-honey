// tailwind-delivery.config.js
module.exports = {
  content: [
    './delivery-vladimir.html',
    // Добавьте другие файлы, если нужно
  ],
  safelist: [
    // Классы шапки
    'bg-white', 'shadow-sm', 'sticky', 'top-0', 'z-50', 'container', 'mx-auto',
    'px-4', 'md:px-6', 'py-3', 'flex', 'items-center', 'justify-between',
    'text-2xl', 'md:text-3xl', 'font-pacifico', 'hidden', 'md:flex', 'items-center',
    'space-x-6', 'md:space-x-8', 'nav-link', 'nav-btn', 'px-4', 'md:px-6', 'py-1',
    'md:py-2', 'rounded-button', 'hover:bg-opacity-90', 'transition-all', 'whitespace-nowrap',
    'md:hidden', 'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'text-2xl',
    'text-gray-800', 'bg-white', 'shadow-md', 'px-4', 'py-3', 'flex', 'flex-col', 'space-y-4',
    
    // Классы футера
    'bg-[#8B4513]', 'py-10', 'md:py-12', 'w-full', 'container', 'mx-auto', 'px-4', 'md:px-6',
    'w-full', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-5', 'gap-6', 'md:gap-8',
    'w-full', 'text-2xl', 'md:text-3xl', 'font-pacifico', 'mb-3', 'md:mb-4', 'block', 'text-xs',
    'text-base', 'md:text-lg', 'font-bold', 'hover:text-gray-300', 'transition-colors', 'flex',
    'items-center', 'footer-link-item', 'bullet', 'mr-2', 'text-sm', 'md:text-base', 'contact-icon',
    'ri-map-pin-line', 'text-white', 'contact-text', 'mt-4', 'md:mt-6', 'font-bold', 'mb-2', 'md:mb-3',
    'flex', 'space-x-2', 'md:space-x-3', 'social-icon-bw', 'vk', 'telegram', 'yandex', 'ri-vk-line',
    'ri-telegram-line', 'ri-shopping-bag-line', 'ri-map-2-line',
    
    // Общие классы
    'flex', 'hidden', 'md:flex', 'items-center', 'justify-between', 'gap-1rem',
    'text-white', 'text-primary', 'text-gray-400', 'text-gray-700', 'bg-white',
    'bg-gray-900', 'bg-gray-800', 'bg-opacity-20', 'rounded-full', 'transition-colors',
    'hover:text-primary', 'hover:bg-opacity-30', 'w-2\.5rem', 'h-2\.5rem', 'text-center',
    
    // Динамические классы
    { pattern: /ri-.*/ }, // Все классы иконок Remix
    { pattern: /(mt|mb|mr|ml|py|px|gap)-.*/ }, // Все отступы
    { pattern: /text-(xs|sm|base|lg|xl)/ }, // Размеры текста
    { pattern: /bg-(gray|primary|secondary)-.*/ }, // Цвета фона
    { pattern: /border-(gray|primary|secondary)-.*/ }, // Цвета границ
    'active', // Для активных элементов меню
    'mobile-menu', // Для мобильного меню
    'carousel-dot-active', // Для активной точки карусели
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFA500',
        secondary: '#8B4513',
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      borderRadius: {
        'button': '8px'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
    float: false,
    clear: false,
    // Отключаем неиспользуемые компоненты для уменьшения размера CSS
    animation: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    filter: false,
    mixBlendMode: false,
    backgroundBlendMode: false,
    boxDecorationBreak: false,
    transformOrigin: false,
    touchAction: false,
    userSelect: false,
    willChange: false,
  }
};
