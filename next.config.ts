import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "food-m.p-stageenv.xyz",
        pathname: "/food/**",
      },
      //https://cdn.pathao.com/uploads/loop/campaign/
      {
        protocol: "https",
        hostname: "cdn.pathao.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
