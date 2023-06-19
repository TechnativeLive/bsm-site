/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60 * 60 * 2,
    remotePatterns: [
      { protocol: 'https', hostname: 'bsm-cms-images.s3.eu-west-2.amazonaws.com', port: '' },
    ],
  },
};

module.exports = nextConfig;
