const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'coe-milestones-bucket.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'coe-events-bucket.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'coe-events-bucket.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'coe-carousel-bucket.s3.us-east-1.amazonaws.com',
      },
    ],
    unoptimized: false,
  },
  eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
  },
};

export default nextConfig;
