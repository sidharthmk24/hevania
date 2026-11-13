import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "rykclazrboauohqztvry.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "shibhckktucphvxwmjnu.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
