/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your existing Next.js configuration options here
    // For example:
    // reactStrictMode: true,
    // webpack5: true,
  
    webpack: (config, { isServer }) => {
      // Add the NormalModuleReplacementPlugin to replace requests prefixed with 'node:'
      if (!isServer) {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
            resource.request = resource.request.replace(/^node:/, "");
          })
        );
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;