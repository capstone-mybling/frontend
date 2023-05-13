/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*", "images.unsplash.com", "ipfs.io"],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
