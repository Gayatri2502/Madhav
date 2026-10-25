/** @type {import('tailwindcss').Config} */
const { generateTailwindConfig } = require('./madhav/src/themes/theme');

module.exports = {
  content: [
    './madhav/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  ...generateTailwindConfig(),
  plugins: [],
}