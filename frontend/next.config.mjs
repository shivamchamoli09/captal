/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    esmExternals: false,
  },
  images: {
    domains: ["assets.coingecko.com", "s2.coinmarketcap.com"],
  },
};

export default nextConfig;
