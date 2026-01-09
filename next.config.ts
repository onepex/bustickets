import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bustickets.ph' },
      { protocol: 'https', hostname: 'book.bustickets.ph' },
      { protocol: 'https', hostname: '12go.asia' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
};

export default nextConfig;
// Deploy trigger Thu Jan  8 09:46:40 +07 2026
