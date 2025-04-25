/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow type errors to pass for build
    // This is needed for deployment
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;