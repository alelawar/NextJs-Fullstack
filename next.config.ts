import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'img.clerk.com'], // <- ini penting
  },
};

export default nextConfig;
