import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "lodash",
      "gsap",
      "@gsap/react",
      "react-toastify",
      "@iconify/react",
      "apexcharts",
      "react-apexcharts",
      "swiper",
      "firebase",
      "@tiptap/react",
      "@tiptap/pm",
      "@tiptap/starter-kit",
      "@tiptap/extension-text-style",
      "@dnd-kit/core",
      "@reduxjs/toolkit",
      "react-redux",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
