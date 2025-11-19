import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: [
      "coe-milestones-bucket.s3.us-east-1.amazonaws.com", // your S3 bucket
    ],
  },
};

export default nextConfig;
