/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // only used in example images right now
      { protocol: 'https', hostname: 'res.cloudinary.com', port: '' },
      { protocol: 'https', hostname: 'bsm-cms-images.s3.eu-west-2.amazonaws.com', port: '' },
    ],
  },
};

module.exports = nextConfig;
