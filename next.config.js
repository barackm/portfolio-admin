/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.barackm.me', 'res.cloudinary.com', 'www.aldakur.net'],
  },
};

module.exports = nextConfig;
