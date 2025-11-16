import { NextResponse } from "next/server";
import { docClient } from "@/app/lib/dynamoClient";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME_M!;
if (!TABLE_NAME) {
  throw new Error("DYNAMO_TABLE_NAME_M is not set");
}

// GET all milestones
export async function GET() {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return NextResponse.json(data.Items ?? []);
  } catch (err) {
    console.error("DynamoDB GET milestones error:", err);
    return NextResponse.json({ error: "Failed to fetch milestones" }, { status: 500 });
  }
}

// POST create milestone
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const desc = body.summary ?? body.description ?? null;
    const date = body.milestone_date ?? body.event_date;
    if (!body.title || !date || !body.department) { /* 400 */ }

    const item = {
        milestone_id: body.milestone_id || uuidv4(),
        title: body.title,
        description: desc,
        image_url: body.image_url ?? null,
        milestone_date: date,
        department: body.department,
        tags: Array.isArray(body.tags) ? body.tags : [],
        media_type: body.media_type ?? "image",
        created_at: new Date().toISOString(),
    };


    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
        ConditionExpression: "attribute_not_exists(milestone_id)",
      })
    );

    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    const status =
      err?.name === "ConditionalCheckFailedException" ? 409 : 500;
    console.error("DynamoDB POST milestone error:", err);
    return NextResponse.json({ error: "Failed to insert milestone" }, { status });
  }
}
