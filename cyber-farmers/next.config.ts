import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'encrypted-tbn0.gstatic.com',
      '*.amazonaws.com'  // Allow any Amazon or AWS domain
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      }
    ]
  },
};

export default nextConfig;
