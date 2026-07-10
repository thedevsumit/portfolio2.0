/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        cyan: {
          DEFAULT: '#00a8e8',
          50: '#e6f7fc',
          400: '#33bdee',
          500: '#00a8e8',
          600: '#0086bb',
        },
        mint: {
          DEFAULT: '#a6fff3',
          400: '#bffff7',
          500: '#a6fff3',
        },
        teal: {
          DEFAULT: '#20cfc8',
        },
        glow: '#00bfff',

        // Surfaces
        page: '#0a0d14',
        card: '#0a0d13',
        footer: '#0c1220',
        input: '#374151',

        // Text
        primary: '#ffffff',
        secondary: '#d1fafc',
        muted: 'rgba(255,255,255,0.62)',

        // Status
        success: '#22c55e',
        warning: '#eab308',
        danger: '#ef4444',

        // Borders
        border: {
          strong: '#374151',
          soft: 'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        pill: '999px',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #00a8e8, #a6fff3)',
        'radial-fade': 'radial-gradient(ellipse at center, rgba(0,168,232,0.15), transparent 70%)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
