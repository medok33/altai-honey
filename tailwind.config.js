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
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      },
      minHeight: {
        '70vh': '70vh',
        '80vh': '80vh'
      },
      boxShadow: {
        'custom': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      animation: {
        'pulse': 'pulse 1.5s infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'modalAppear': 'modalAppear 0.3s ease-out'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
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
