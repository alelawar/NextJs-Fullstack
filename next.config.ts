import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'img.clerk.com'], // <- ini penting
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.devtunnels.ms',
        'b0cbvk4k-3000.asse.devtunnels.ms'
      ]
    }
  }
};

export default nextConfig;
