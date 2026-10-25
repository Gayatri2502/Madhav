/** @type {import('tailwindcss').Config} */
const { generateTailwindConfig } = require('./src/themes/theme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  ...generateTailwindConfig(),
  plugins: [],
}