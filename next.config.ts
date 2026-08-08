import type { NextConfig } from "next";
import newsRedirects from "./lib/news/generated/redirects.json";

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.united-studio.com",
        pathname: "/wp-content/**",
      },
    ],
  },
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
        destination: "https://yosakoi.united-studio.com/archive",
        permanent: true,
      },
      {
        source: "/category/yosakoi/:path*",
        destination: "https://yosakoi.united-studio.com/archive",
        permanent: true,
      },
      {
        source: "/category/usi",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/category/music",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/category/voice",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/Portfolio/:path*",
        destination: "https://yosakoi.united-studio.com/archive",
        permanent: true,
      },
      {
        source: "/portfolio/:path*",
        destination: "https://yosakoi.united-studio.com/archive",
        permanent: true,
      },
      {
        source: "/portfolio_cat/:path*",
        destination: "https://yosakoi.united-studio.com/archive",
        permanent: true,
      },
      {
        source: "/portfolio_cat/himabito",
        destination: "https://yosakoi.united-studio.com/archive",
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
      ...newsRedirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
