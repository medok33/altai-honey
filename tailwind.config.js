module.exports = {
  content: [
    './index.html',
    './**/*.html',
    './**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B8E23',
        secondary: '#8B4513',
        orange: '#FFA500'
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
      minHeight: {
        '70vh': '70vh',
        '80vh': '80vh'
      },
      backgroundImage: {
        'texture': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWRlYjMiIG9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')"
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'pulse': 'pulse 1.5s infinite',
        'modalAppear': 'modalAppear 0.3s ease-out'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        modalAppear: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
