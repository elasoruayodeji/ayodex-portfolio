import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  allowedDevOrigins: process.env.FREECODE_PREVIEW_HOST
    ? [process.env.FREECODE_PREVIEW_HOST]
    : [],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
