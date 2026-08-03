import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/yosakoi-matsuri",
        destination: "https://yosakoi.united-studio.com/",
        permanent: true,
      },
      {
        source: "/yosakoi-matsuri/:path*",
        destination: "https://yosakoi.united-studio.com/",
        permanent: true,
      },
      {
        source: "/studio",
        destination: "https://studio.united-studio.com/",
        permanent: true,
      },
      {
        source: "/studio/:path*",
        destination: "https://studio.united-studio.com/",
        permanent: true,
      },
      {
        source: "/category/yosakoi",
        destination: "https://yosakoi.united-studio.com/",
        permanent: true,
      },
      {
        source: "/category/yosakoi/:path*",
        destination: "https://yosakoi.united-studio.com/",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/archive",
        permanent: true,
      },
      {
        source: "/utattemita",
        destination: "https://utattemita.united-studio.com/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
