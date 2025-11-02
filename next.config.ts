/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ігнорує ESLint-помилки при build
  },
  typescript: {
    ignoreBuildErrors: true, // ігнорує TypeScript-помилки при build
  },
};

export default nextConfig;
