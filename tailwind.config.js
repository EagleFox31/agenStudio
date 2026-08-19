/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1240px',
      },
    },
    extend: {
      maxWidth: {
        content: '1240px',
        prose: '72ch',
      },
      colors: {
        canvas: '#F7F4EE',
        ink: {
          DEFAULT: '#172128',
          muted: '#4A5862',
          light: '#8A99A4',
        },
        teal: {
          DEFAULT: '#007C83',
          deep: '#075C62',
          light: '#E6F3F4',
        },
        magenta: '#B5175B',
        bordeaux: {
          DEFAULT: '#7A092B',
          deep: '#58061F',
          light: '#F7E8EC',
        },
        coral: '#E05A47',
        gold: '#D2A43B',
      },
      fontFamily: {
        heading: ['Sora', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        reveal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
