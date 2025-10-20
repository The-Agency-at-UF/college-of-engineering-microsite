import { NextResponse } from "next/server";
import { s3 } from "@/app/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const EVENTS_BUCKET = process.env.S3_BUCKET!;     
const MILESTONES_BUCKET = process.env.S3_BUCKET_M!; 
const REGION = process.env.AWS_REGION!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const kind = String(formData.get("kind") || "").toLowerCase(); 
    if (kind !== "event" && kind !== "milestone") {
      return NextResponse.json(
        { error: "Missing or invalid 'kind' (must be 'event' or 'milestone')" },
        { status: 400 }
      );
    }
    const bucket = kind === "event" ? EVENTS_BUCKET : MILESTONES_BUCKET;

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const key = `${kind}/uploads/${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(arrayBuffer),
        ContentType: file.type || "application/octet-stream",
      })
    );

    const imageUrl =
      REGION === "us-east-1"
        ? `https://${bucket}.s3.amazonaws.com/${key}`
        : `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ success: true, bucket, key, imageUrl });
  } catch (err) {
    console.error("S3 upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
