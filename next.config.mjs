/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'news.tatadev.dev',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
