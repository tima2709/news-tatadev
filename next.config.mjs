/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'news.tatadev.dev',
            pathname: '/media/**',
          },
        ],
      },
};

export default nextConfig;
