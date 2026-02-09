import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'twinkle-fast': 'twinkle 2s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'drift-slow': 'drift 30s ease-in-out infinite',
        'color-shift': 'colorShift 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'shooting-star': 'shootingStar 3s linear',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        colorShift: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(30deg)' },
          '100%': { filter: 'hue-rotate(0deg)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.1)' },
        },
        shootingStar: {
          '0%': { transform: 'translateX(-100px) translateY(-100px)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(800px) translateY(400px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
