import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portal.macapagalreview.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "macapagalreview.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "/portal.macapagalreview.com/**",
      },
      {
        protocol: "https",
        hostname: "i1.wp.com",
        pathname: "/portal.macapagalreview.com/**",
      },
      {
        protocol: "https",
        hostname: "i2.wp.com",
        pathname: "/portal.macapagalreview.com/**",
      },
    ],
  },
};

export default nextConfig;
