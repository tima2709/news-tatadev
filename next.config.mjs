/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'chuiskieizvestia.kg',
            pathname: '/media/**',
          },
        ],
      },
};

export default nextConfig;
