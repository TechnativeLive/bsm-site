import { Config } from 'tailwindcss';
import scrollbar from 'tailwind-scrollbar';
import radix from 'tailwindcss-radix';
import { Icons, type Options } from 'tailwindcss-plugin-icons';

const icons: Options = ({ theme }) => ({
  ic: {
    icons: {
      'twotone-keyboard-arrow-right': {},
      'baseline-facebook': {},
    },
    scale: 1.5,
  },
  basil: {
    icons: {
      'instagram-outline': {},
    },
    scale: 2.5,
  },
});

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [scrollbar, radix, Icons(icons)],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
        numeric: ['var(--font-numeric)'],
      },
      colors: {
        primary: {
          DEFAULT: '#002550',
          50: '#EEFEFF',
          100: '#D7FBFF',
          200: '#A9F1FF',
          300: '#7BE3FF',
          400: '#4DD0FF',
          500: '#20B9FF',
          600: '#0099F1',
          700: '#0072C3',
          800: '#005095',
          900: '#003267',
          950: '#002550',
        },
        secondary: {
          DEFAULT: '#FFED00',
          50: '#FDFFCF',
          100: '#FDFFB8',
          200: '#FFFF8A',
          300: '#FFFB5C',
          400: '#FFF52E',
          500: '#FFED00',
          600: '#D6C200',
          700: '#AD9900',
          800: '#857200',
          900: '#5C4D00',
          950: '#473B00',
        },
        neutral: '#9B9B9B',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        slide: 'cubic-bezier(.2, 0, .05, 1)',
      },
      maxWidth: {
        '2/5': '40%',
        '3/5': '60%',
      },
    },
  },
} satisfies Config;
