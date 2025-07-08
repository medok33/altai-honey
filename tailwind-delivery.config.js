// tailwind-delivery.config.js
module.exports = {
  content: [
    './delivery-vladimir.html',
  ],
  safelist: [
    // Шапка
    'bg-white', 'shadow-sm', 'sticky', 'top-0', 'z-50', 'container', 'mx-auto',
    'px-4', 'md:px-6', 'py-3', 'justify-between',
    'text-2xl', 'md:text-3xl', 'font-pacifico', 'hidden', 'md:flex',
    'space-x-6', 'md:space-x-8', 'nav-link', 'nav-btn', 'px-4', 'md:px-6', 'py-1',
    'md:py-2', 'rounded-button', 'hover:bg-opacity-90', 'transition-all', 'whitespace-nowrap',
    'md:hidden', 'w-10', 'h-10', 'justify-center', 'text-2xl', 'text-gray-800',
    'shadow-md', 'py-3', 'flex-col', 'space-y-4',
    
    // Футер
    'bg-secondary', 'py-10', 'md:py-12', 'container', 'mx-auto', 'px-4', 'md:px-6',
    'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-5', 'gap-6', 'md:gap-8',
    'font-pacifico', 'mb-3', 'md:mb-4', 'block', 'text-xs',
    'text-base', 'md:text-lg', 'font-bold', 'hover:text-gray-300', 'transition-colors',
    'footer-link-item', 'bullet', 'mr-2', 'text-sm', 'md:text-base', 'contact-icon',
    'ri-map-pin-line', 'text-white', 'contact-text', 'mt-4', 'md:mt-6', 'font-bold', 'mb-2', 'md:mb-3',
    'space-x-2', 'md:space-x-3', 'social-icon-bw', 'ri-vk-line',
    'ri-telegram-line', 'ri-shopping-bag-line', 'ri-map-2-line',
    
    // Динамические классы
    { pattern: /ri-.*/ },
    { pattern: /(m|p|mt|mb|mr|ml|mx|my|pt|pb|pr|pl|px|py|gap)-\d+/ },
    { pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/ },
    { pattern: /bg-(gray|primary|secondary|white|black|transparent|current)/ },
    { pattern: /border-(gray|primary|secondary)-/ },
    { pattern: /grid-cols-\d+/ },
    'active',
    'mobile-menu'
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
