import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
});

export const BUCKET_C = process.env.S3_BUCKET_C;

if (!BUCKET_C) {
  throw new Error("Missing env var: S3_BUCKET_C");
}
