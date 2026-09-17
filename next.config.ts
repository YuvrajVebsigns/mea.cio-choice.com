import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beracore-media-bucket-test.idr01.zata.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coremediagroup.sgp1.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
