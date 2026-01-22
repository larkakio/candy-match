import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        soap: {
          blue: '#87CEEB',
          peach: '#FFDAB9',
          purple: '#9370DB',
          gold: '#FFD700',
          coral: '#FF7F50',
          mint: '#98FF98',
          pink: '#FF69B4',
        },
      },
      animation: {
        'slice': 'slice 0.3s ease-out',
        'sparkle': 'sparkle 0.6s ease-out',
      },
      keyframes: {
        slice: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1.5) rotate(180deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
