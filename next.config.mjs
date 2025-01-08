/** @type {import('next').NextConfig} */

const apiMediaURL = new URL("/", process.env.API_MEDIA_URL)

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: apiMediaURL.protocol.slice(0, -1),
            hostname: apiMediaURL.hostname,
            pathname: '/media/**',
          },
        ],
      },
};

export default nextConfig;
