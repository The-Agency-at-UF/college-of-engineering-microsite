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

    // Determine ContentType - ensure videos get proper MIME type
    let contentType = file.type || "application/octet-stream";
    
    if (!contentType || contentType === "application/octet-stream") {
      // Fallback: guess from file extension
      const ext = file.name.split('.').pop()?.toLowerCase();
      
      if (ext === 'mp4') contentType = 'video/mp4';
      else if (ext === 'webm') contentType = 'video/webm';
      else if (ext === 'mov') contentType = 'video/quicktime';
      else if (ext === 'avi') contentType = 'video/x-msvideo';
      else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
      else if (ext === 'png') contentType = 'image/png';
      else if (ext === 'gif') contentType = 'image/gif';
      else if (ext === 'pdf') contentType = 'application/pdf';
    }

    // Note: ACL is not set because bucket uses "Bucket owner enforced" setting
    // Public access must be controlled via bucket policy instead
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(arrayBuffer),
        ContentType: contentType,
        CacheControl: 'max-age=31536000', // Cache for 1 year
      })
    );

    const imageUrl =
      REGION === "us-east-1"
        ? `https://${bucket}.s3.amazonaws.com/${key}`
        : `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ success: true, bucket, key, imageUrl });
  } catch (err) {
    return NextResponse.json({ 
      error: "Upload failed", 
      details: process.env.NODE_ENV === 'development' ? (err instanceof Error ? err.message : String(err)) : undefined
    }, { status: 500 });
  }
}
