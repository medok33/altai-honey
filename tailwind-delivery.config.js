/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./delivery-vladimir.html"],

  theme: {
    extend: {
      colors: {
        primary: "#FFA500",   // цвет из :root
        secondary: "#8B4513",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        }
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        pacifico: ["Pacifico", "cursive"]
      },
      borderRadius: {
        button: "0.5rem",
      }
    }
  },

  plugins: [],
  safelist: [] // Не нужен, если все классы используются через @apply
};
