module.exports = {
  content: [
    "./index.html",
    "./delivery.html",
    "./legal.html",
    "./src/**/*.{html,js}",
    "./**/*.html",
    "./**/*.js"
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
        'sans': ['Open Sans', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive']
      }
    }
  },
  plugins: [],
}
