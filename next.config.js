/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60 * 60 * 2,
    remotePatterns: [
      { protocol: 'https', hostname: 'bsm-cms-images.s3.eu-west-2.amazonaws.com', port: '' },
      { protocol: 'https', hostname: 'dinxiwhaebootclzzzmr.supabase.co', port: '' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    });
    return config;
  },
  experimental: {
    outputFileTracingExcludes: {
      // Avoids including canvas in the trace to avoid 50 Mb+ serverless functions
      '*': ['node_modules/.pnpm/canvas@*'],
    },
  },
};

module.exports = nextConfig;
