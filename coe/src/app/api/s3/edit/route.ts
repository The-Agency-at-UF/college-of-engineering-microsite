import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, BUCKET_C } from "@/app/lib/s3";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const filename =
      typeof body.filename === "string" && body.filename.length > 0
        ? body.filename
        : "upload";

    const contentType =
      typeof body.contentType === "string" && body.contentType.length > 0
        ? body.contentType
        : "application/octet-stream";

    const keyOverride =
      typeof body.keyOverride === "string" && body.keyOverride.length > 0
        ? body.keyOverride
        : null;

    const prefix = ""; 

    const key = keyOverride ? keyOverride : `${prefix}${filename}`;

    const url = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: BUCKET_C,
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn: 60 * 10 }
    );

    return NextResponse.json({ key, url });
  } catch (err: any) {
    console.error("PRESIGN PUT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create upload URL." },
      { status: 500 }
    );
  }
}

