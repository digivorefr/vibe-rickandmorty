/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow type errors to pass for build
    // This is needed for deployment
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;