import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   
const nextConfig = {
  images: {
    domains: [
      "coe-milestones-bucket.s3.us-east-1.amazonaws.com", // your S3 bucket
    ],
  },
  eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
  },
};

export default nextConfig;
