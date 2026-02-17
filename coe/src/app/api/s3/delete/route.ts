import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET_C } from "@/app/lib/s3";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Missing or invalid key" }, { status: 400 });
    }

    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_C, Key: key }));

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE S3 ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete S3 object." },
      { status: 500 }
    );
  }
}
