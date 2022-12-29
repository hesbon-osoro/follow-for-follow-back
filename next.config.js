/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://avatars.githubusercontent.com', 'restcountries.eu'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'restcountries.eu',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
