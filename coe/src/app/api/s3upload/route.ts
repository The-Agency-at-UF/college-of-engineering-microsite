import { NextResponse } from "next/server";
import { s3 } from "@/app/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const BUCKET = process.env.S3_BUCKET!;
const REGION = process.env.AWS_REGION!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const key = `uploads/${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type,
      })
    );

    // Construct a public URL for the uploaded image
    const imageUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ success: true, imageUrl });
  } catch (err) {
    console.error("S3 upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}