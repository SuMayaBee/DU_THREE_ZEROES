import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  reactStrictMode: false 
};

export default nextConfig;
