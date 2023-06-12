import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import scrollbar from 'tailwind-scrollbar';
import radix from 'tailwindcss-radix';
import { Icons, SCALE, type Options } from 'tailwindcss-plugin-icons';
import typography from '@tailwindcss/typography';
import path from 'path';

const flattenColorPalette: any = (colors: any) =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
          }))
        : [{ [`${color}`]: values }]
    )
  );

const icons: Options = ({ theme }) => ({
  local: {
    icons: {
      meta: {},
    },
    location: path.resolve(__dirname, './components/icons.json'),
    scale: 2.5,
  },
  ic: {
    icons: {
      'baseline-launch': {
        [SCALE]: 1,
      },
      'baseline-keyboard-arrow-down': {},
      'baseline-keyboard-arrow-right': {},
      'baseline-facebook': {},
      'baseline-tiktok': {
        [SCALE]: 2.5,
      },
    },
    scale: 1.5,
  },
  basil: {
    icons: {
      'cancel-outline': {},
      'instagram-outline': {},
      'facebook-outline': {},
      'twitter-outline': {},
      'menu-solid': {},
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
  plugins: [
    scrollbar,
    radix,
    typography,
    Icons(icons),
    plugin(function ({ addUtilities, matchUtilities, addBase, theme }) {
      addBase({
        ':root': {
          '--tw-corner-size': '8px',
          '--tw-corner-color': 'white',
        },
      });

      addUtilities({
        '.corner-none': {
          '--tw-corner-size': '0',
          '--tw-corner-color': 'transparent',
        },
      });

      matchUtilities(
        {
          corner: (value) => ({
            '--tw-corner-size': value,
            position: 'absolute',
            width: '0',
            height: '0',
            bottom: '0',
            right: '0',
            'border-bottom': 'var(--tw-corner-size) solid var(--tw-corner-color)',
            'border-left': 'var(--tw-corner-size) solid transparent',
          }),

          'corner-tl': (value) => ({
            '--tw-corner-size': value,
            position: 'absolute',
            width: '0',
            height: '0',
            top: '0',
            left: '0',
            'border-top': 'var(--tw-corner-size) solid var(--tw-corner-color)',
            'border-right': 'var(--tw-corner-size) solid transparent',
          }),

          'corner-tr': (value) => ({
            '--tw-corner-size': value,
            position: 'absolute',
            width: '0',
            height: '0',
            top: '0',
            right: '0',
            'border-top': 'var(--tw-corner-size) solid var(--tw-corner-color)',
            'border-left': 'var(--tw-corner-size) solid transparent',
          }),

          'corner-br': (value) => ({
            '--tw-corner-size': value,
            position: 'absolute',
            width: '0',
            height: '0',
            bottom: '0',
            right: '0',
            'border-bottom': 'var(--tw-corner-size) solid var(--tw-corner-color)',
            'border-left': 'var(--tw-corner-size) solid transparent',
          }),

          'corner-bl': (value) => ({
            '--tw-corner-size': value,
            position: 'absolute',
            width: '0',
            height: '0',
            bottom: '0',
            left: '0',
            'border-bottom': 'var(--tw-corner-size) solid var(--tw-corner-color)',
            'border-right': 'var(--tw-corner-size) solid transparent',
          }),
        },
        {
          values: { ...theme('spacing') },
          type: ['length'],
        }
      );

      matchUtilities(
        {
          corner: (value) => ({
            '--tw-corner-color': value,
          }),
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: ['color'],
        }
      );
    }),
  ],
  theme: {
    extend: {
      animation: {
        appear: 'appear 300ms ease-in-out both',
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
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
