import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // increase the limit as needed (e.g. '10mb', '20mb')
    },
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
