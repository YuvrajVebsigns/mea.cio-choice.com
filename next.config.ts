import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beracore-media-bucket-test.idr01.zata.ai',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
