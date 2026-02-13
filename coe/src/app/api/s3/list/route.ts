import { NextResponse } from "next/server";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, BUCKET_C } from "@/app/lib/s3";

const PREFIX = "";

export async function GET() {
  try {
    const out = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET_C,
        Prefix: PREFIX || undefined,
      })
    );

    const contents = out.Contents ?? [];

    const items = await Promise.all(
      contents
        .filter((o) => o.Key && !o.Key.endsWith("/"))
        .map(async (o) => {
          const key = o.Key as string;

          const url = await getSignedUrl(
            s3,
            new GetObjectCommand({ Bucket: BUCKET_C, Key: key }),
            { expiresIn: 60 * 10 } // 10 minutes
          );

          return {
            key,
            url,
            size: o.Size ?? null,
            lastModified: o.LastModified ? o.LastModified.toISOString() : null,
          };
        })
    );

    return NextResponse.json({ items });
  } catch (err: any) {
    console.error("LIST S3 ERROR:", err);
    return NextResponse.json(
      { error: "Failed to list S3 objects." },
      { status: 500 }
    );
  }
}
