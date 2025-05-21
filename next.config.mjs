/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com", // ← اختیاری، اگر از github.com عکس می‌گیری
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // ← ضروری برای GitHub avatar
      },
    ],
  },
};

export default nextConfig;
