export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        retro: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        mario: {
          red: '#E52521',
          gold: '#FFD700',
          blue: '#049CD8',
          green: '#43B047',
          orange: '#FFA500',
        },
      },
    },
  },
  plugins: [],
}
