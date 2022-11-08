/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  output: 'standalone',
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'secure.gravatar.com',
      'vercel.wpengine.com',
      'img.icons8.com',
      'images.unsplash.com',
      'tailwindui.com',
      'mdbcdn.b-cdn.net',
      'tuk-cdn.s3.amazonaws.com',
    ],
  },
  reactStrictMode: false,
});
