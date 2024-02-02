/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your existing Next.js configuration options here
    // For example:
    // reactStrictMode: true,
    // webpack5: true,
  
    webpack: (config, { isServer }) => {
      // Add external modules for server build only
      if (isServer) {
        config.externals.push({
            'node:buffer': 'buffer',
            'node:fs': 'fs',
            'node:https': 'https',
            'node:http': 'http',
            'node:net': 'net'
        });
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;