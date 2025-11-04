import type { NextConfig } from 'next';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_NOTEHUB_TOKEN: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
};

export default nextConfig;
