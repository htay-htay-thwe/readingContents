/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
     "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      animation: {
        'glow-border': 'glow-border 1.5s ease-in-out infinite',
      },
      keyframes: {
        'glow-border': {
          '0%, 100%': { borderColor: '#4ADA8E', boxShadow: '0 0 2px 2px #4ADA8E' },
          '50%': { borderColor: '#8BDBA4', boxShadow: '0 0 5px 5px #8BDBA4' },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

