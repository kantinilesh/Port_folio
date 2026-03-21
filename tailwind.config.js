export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        accent: '#c4a35a',
        surface: {
          DEFAULT: '#0a0a0a',
          light: '#111111',
          lighter: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
}
