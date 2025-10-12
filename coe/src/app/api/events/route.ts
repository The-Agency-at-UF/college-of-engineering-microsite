import { NextResponse } from "next/server";
import { docClient } from "@/app/lib/dynamoClient";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

// GET all events
export async function GET() {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    return NextResponse.json(data.Items ?? []);
  } catch (err) {
    console.error("DynamoDB GET error:", err);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST new event
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ensure event_id exists
    const item = {
      event_id: body.event_id || uuidv4(),
      title: body.title,
      department: body.department,
      description: body.description,
      image_url: body.image_url,
      event_date: body.event_date,
      created_at: new Date().toISOString(),
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return NextResponse.json({ success: true, item });
  } catch (err) {
    console.error("DynamoDB POST error:", err);
    return NextResponse.json({ error: "Failed to insert item" }, { status: 500 });
  }
}