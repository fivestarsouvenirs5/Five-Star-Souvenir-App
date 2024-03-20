/** @type {import('next').NextConfig} */
const nextConfig = {
    env:  {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'wbjgupweslmxelrq.public.blob.vercel-storage.com',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig
