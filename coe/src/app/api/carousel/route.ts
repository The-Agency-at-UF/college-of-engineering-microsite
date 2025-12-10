import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  try {
    const bucketName = process.env.S3_BUCKET_C;
    const region = process.env.AWS_REGION || "us-east-1";

    if (!bucketName) {
      console.error("❌ S3_BUCKET_C not set in environment variables");
      return NextResponse.json({ 
        error: "S3_BUCKET_C environment variable not set",
        images: [] 
      });
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error("❌ AWS credentials not set");
      return NextResponse.json({ 
        error: "AWS credentials not configured",
        images: [] 
      });
    }

    console.log(`🔍 Fetching images from bucket: ${bucketName} in region: ${region}`);

    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const cmd = new ListObjectsV2Command({ Bucket: bucketName });
    const res = await s3.send(cmd);

    console.log(`📦 Bucket response: ${res.Contents?.length || 0} total objects`);

    if (!res.Contents || res.Contents.length === 0) {
      console.warn(`⚠️ No objects found in bucket: ${bucketName}`);
      return NextResponse.json({ 
        error: `No objects found in bucket: ${bucketName}`,
        images: [] 
      });
    }

    const imageObjects = res.Contents.filter((obj): obj is { Key: string } =>
      !!obj.Key && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(obj.Key)
    );

    console.log(`🖼️ Found ${imageObjects.length} image files out of ${res.Contents.length} total objects`);

    if (imageObjects.length === 0) {
      console.warn(`⚠️ No image files found in bucket: ${bucketName}`);
      console.log(`Sample object keys:`, res.Contents.slice(0, 5).map(obj => obj.Key));
      return NextResponse.json({ 
        error: `No image files found in bucket: ${bucketName}`,
        images: [] 
      });
    }

    const images = await Promise.all(
      imageObjects.map(async (obj) => {
        const signedUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({ Bucket: bucketName, Key: obj.Key }),
          { expiresIn: 300 } // 5 minutes
        );
        return signedUrl;
      })
    );

    // shuffle the array randomly
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    console.log(`Carousel API: Returning ${images.length} images from bucket ${bucketName}`);
    return NextResponse.json(images);
  } catch (err) {
    console.error("❌ S3 carousel list error:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ 
      error: `S3 error: ${errorMessage}`,
      images: [] 
    });
  }
}

