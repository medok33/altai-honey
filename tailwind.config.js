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
    { pattern: /^js-.*/ }
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
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true
  },
  corePlugins: {
    preflight: false
  }
};
