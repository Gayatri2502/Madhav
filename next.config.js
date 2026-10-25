/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  // The app directory is in madhav/src/app
  // We need to tell Next.js to look there
}