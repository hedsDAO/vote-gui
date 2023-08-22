/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", 
      },
      {
        protocol: "https",
        hostname: "www.heds.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
};

module.exports = nextConfig;
