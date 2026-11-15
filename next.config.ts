import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1` produces a fully static copy in `out/` for the public
 * share link. The normal build is unchanged and still optimises images at
 * request time.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const, trailingSlash: true } : {}),
  productionBrowserSourceMaps: false,
  allowedDevOrigins: process.env.FREECODE_PREVIEW_HOST
    ? [process.env.FREECODE_PREVIEW_HOST]
    : [],
  images: {
    formats: ["image/avif", "image/webp"],
    // A static host has no image server, so ship the optimised source files.
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
