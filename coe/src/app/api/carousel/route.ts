import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  try {
    const bucketName = process.env.S3_BUCKET_C;
    const region = process.env.AWS_REGION || "us-east-1";

    if (!bucketName) {
      console.error("S3_BUCKET_C not set");
      return NextResponse.json([]); // return empty array instead of error object
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

    const images = await Promise.all(
      (res.Contents || [])
        .filter((obj): obj is { Key: string } =>
          !!obj.Key && /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(obj.Key)
        )
        .map(async (obj) => {
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
    console.error("S3 carousel list error:", err);
    return NextResponse.json([]); // always return array
  }
}
