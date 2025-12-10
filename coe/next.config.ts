import type { NextConfig } from "next";
   
const nextConfig = {
  images: {
    domains: [
      "coe-milestones-bucket.s3.us-east-1.amazonaws.com", // milestones S3 bucket
      "coe-events-bucket.s3.amazonaws.com", // events S3 bucket
      "coe-events-bucket.s3.us-east-1.amazonaws.com", // events S3 bucket (region-specific)
    ],
  },
  eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
  },
};

export default nextConfig;
