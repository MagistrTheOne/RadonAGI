/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental features that might cause connection issues
  // Simplified webpack config to avoid connection issues
  webpack: (config) => {
    return config;
  },
  // Basic configuration only
};

module.exports = nextConfig;
