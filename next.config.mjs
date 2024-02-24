import packageJSON from "./package.json" assert { type: "json" };
/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    APP_VERSION: packageJSON.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/Mar-7th/StarRailRes/master/**",
      },
    ],
  },
};

export default nextConfig;
