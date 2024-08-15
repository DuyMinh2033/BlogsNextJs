/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "images.istockphoto.com",
      "media.istockphoto.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Cho phép tất cả các domain
      },
    ],
  },
};

export default nextConfig;
