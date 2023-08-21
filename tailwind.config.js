/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'space-grotesk': ['Space Grotesk Variable', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...colors,
        'heds-bg': '#2D2934',
        'heds-bg-dark': '#28242D',
        'heds-bg-light': "#3C3644",
        'heds-bg-red': `#D56767`,
        // test colors
        'h-black-900': '#000000ff',
        'h-black-800': '#101019ff',
        'h-black-700': '#2d2934ff',
        'h-red-dark': '#8c2c34ff',
        'h-red-light': '#ca535dff',
        'h-yellow-dark': '#ffb41fff',
        'h-yellow-light': '#ffc95cff',
        'h-blue-dark': '#37718eff',
        'h-blue-light': '#6995aaff',
      }
    },
  },
  plugins: [],
}
