import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// Ensure environment variables are set for security and configuration
if (
  !process.env.S3_BUCKET_M ||
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  console.error("Server Configuration Error: Missing required environment variables for cloud storage.");
  // In a production environment, you might want to avoid detailed error messages.
  // Returning an empty array allows the frontend to gracefully fall back to placeholders.
  throw new Error("Application is not configured correctly. Please contact an administrator.");
}

// Configure the S3 client using environment variables
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_M;
const BUCKET_URL_PREFIX = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`;
const DIRECTORY_PREFIX = "milestone/uploads/department-images/";

/**
 * API route to get department image URLs from the S3 bucket.
 */
export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: DIRECTORY_PREFIX,
    });

    const { Contents } = await s3Client.send(command);

    // Add a log to help debug if no files are found
    if (!Contents || Contents.length === 0) {
      console.warn(`S3 ListObjectsV2Command returned no contents for bucket '${BUCKET_NAME}' with prefix '${DIRECTORY_PREFIX}'. Check permissions and prefix.`);
    }

    const imageUrls = Contents
      ?.filter(file => file.Key && /\.(jpg|jpeg|png|gif|svg)$/i.test(file.Key))
      .map(file => `${BUCKET_URL_PREFIX}${file.Key}`) || [];

    return NextResponse.json(imageUrls);

  } catch (error) {
    console.error("Error fetching from S3:", error);
    return NextResponse.json({ error: "Failed to fetch images from S3" }, { status: 500 });
  }
}
