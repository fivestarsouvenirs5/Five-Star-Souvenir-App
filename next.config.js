/** @type {import('next').NextConfig} */
const nextConfig = {
    env:  {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
    },
}

module.exports = nextConfig
