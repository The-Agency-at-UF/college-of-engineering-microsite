import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  try {
    const bucketName = process.env.S3_BUCKET_C;
    const region = process.env.AWS_REGION || "us-east-1";

    if (!bucketName) {
      return NextResponse.json({ 
        error: "Carousel configuration error",
        images: [] 
      });
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json({ 
        error: "Carousel configuration error",
        images: [] 
      });
    }

    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const cmd = new ListObjectsV2Command({ Bucket: bucketName });
    const res = await s3.send(cmd);

    if (!res.Contents || res.Contents.length === 0) {
      return NextResponse.json({ 
        error: "No images found",
        images: [] 
      });
    }

    const imageObjects = res.Contents.filter((obj): obj is { Key: string } =>
      !!obj.Key && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(obj.Key)
    );

    if (imageObjects.length === 0) {
      return NextResponse.json({ 
        error: "No images found",
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

    return NextResponse.json(images);
  } catch (err) {
    return NextResponse.json({ 
      error: "Failed to load images",
      images: [] 
    });
  }
}

