/** @type {import('next').NextConfig} */
const nextConfig = {
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
