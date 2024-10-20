import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', './src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
}

