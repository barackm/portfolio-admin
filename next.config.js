/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.barackm.me', 'res.cloudinary.com', 'www.aldakur.net'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'authorization',
            value: `Bearer ${localStorage.getItem('authToken')}`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
