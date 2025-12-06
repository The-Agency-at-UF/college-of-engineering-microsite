import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  try {
    const bucketName = process.env.S3_BUCKET_C;
    const region = process.env.AWS_REGION || "us-east-1";

    if (!bucketName) return NextResponse.json({ error: "S3_BUCKET_C not set" }, { status: 500 });

    const s3 = new S3Client({ region });
    const cmd = new ListObjectsV2Command({ Bucket: bucketName });
    const res = await s3.send(cmd);

    const images = await Promise.all(
      (res.Contents || [])
        .filter((obj): obj is { Key: string } => !!obj.Key && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(obj.Key))
        .map(async (obj) => {
          return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucketName, Key: obj.Key }), { expiresIn: 300 });
        })
    );

    // Shuffle images
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    return NextResponse.json(images);
  } catch (err) {
    console.error("S3 carousel error:", err);
    return NextResponse.json([]);
  }
}
