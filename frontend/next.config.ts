import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '83.166.247.196',
    'localhost',
    '127.0.0.1'
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://83.166.247.196:8000/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
