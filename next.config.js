/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'secure.gravatar.com',
      'vercel.wpengine.com',
      'img.icons8.com',
      'images.unsplash.com'
    ],
  },
  experimental: {
    //outputStandalone: true,
  },
}
