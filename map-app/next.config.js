/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Add trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  // If your repo is named paris-restaurant-map, use this:
  // assetPrefix: '/paris-restaurant-map',
  // basePath: '/paris-restaurant-map',
}

module.exports = nextConfig
