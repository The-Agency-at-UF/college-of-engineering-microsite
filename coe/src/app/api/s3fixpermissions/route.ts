import { NextResponse } from "next/server";
import { s3 } from "@/app/lib/s3Client";
import { CopyObjectCommand, GetObjectCommand, PutObjectAclCommand } from "@aws-sdk/client-s3";

const EVENTS_BUCKET = process.env.S3_BUCKET!;     
const MILESTONES_BUCKET = process.env.S3_BUCKET_M!; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, kind } = body;

    if (!key || !kind) {
      return NextResponse.json(
        { error: "Missing 'key' or 'kind' parameter" },
        { status: 400 }
      );
    }

    if (kind !== "event" && kind !== "milestone") {
      return NextResponse.json(
        { error: "Invalid 'kind' (must be 'event' or 'milestone')" },
        { status: 400 }
      );
    }

    const bucket = kind === "event" ? EVENTS_BUCKET : MILESTONES_BUCKET;

    // First, try to get the object to check its ContentType
    let contentType = 'application/octet-stream';
    try {
      const getObject = await s3.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );
      contentType = getObject.ContentType || contentType;
    } catch {
      // Use default ContentType if metadata cannot be retrieved
    }

    // Method 1: Try CopyObjectCommand (works even when ACLs are disabled)
    // Copy the object to itself with new ACL
    try {
      await s3.send(
        new CopyObjectCommand({
          Bucket: bucket,
          CopySource: `${bucket}/${key}`,
          Key: key,
          ACL: 'public-read',
          ContentType: contentType,
          MetadataDirective: 'COPY',
        })
      );

      return NextResponse.json({ 
        success: true, 
        message: `File ${key} is now publicly accessible`,
        bucket,
        key,
        method: 'CopyObject'
      });
    } catch (copyErr: unknown) {
      // Method 2: Fallback to PutObjectAclCommand
      try {
        await s3.send(
          new PutObjectAclCommand({
            Bucket: bucket,
            Key: key,
            ACL: 'public-read',
          })
        );

        return NextResponse.json({ 
          success: true, 
          message: `File ${key} is now publicly accessible`,
          bucket,
          key,
          method: 'PutObjectAcl'
        });
      } catch (aclErr: unknown) {
        // Provide detailed error message
        const copyError = copyErr as { message?: string; Code?: string; name?: string };
        const aclError = aclErr as { message?: string; Code?: string; name?: string };
        const errorMessage = aclError.message || copyError.message || "Unknown error";
        const errorCode = aclError.Code || copyError.Code || aclError.name || copyError.name;
        
        return NextResponse.json(
          { 
            error: "Failed to fix permissions", 
            details: errorMessage,
            code: errorCode,
            suggestion: "The bucket may have ACLs disabled. You may need to enable ACLs in the bucket settings or use a bucket policy instead."
          },
          { status: 500 }
        );
      }
    }
  } catch (err: unknown) {
    const error = err as { message?: string; Code?: string; name?: string };
    return NextResponse.json(
      { 
        error: "Failed to fix permissions", 
        details: error.message || "Unknown error",
        code: error.Code || error.name
      },
      { status: 500 }
    );
  }
}

