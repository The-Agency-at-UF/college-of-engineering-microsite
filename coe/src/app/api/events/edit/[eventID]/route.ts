import { NextResponse } from "next/server";
import { docClient } from "@/app/lib/dynamoClient";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

// GET one event
export async function GET(
  req: Request,
  context: { params: Promise<{ eventID: string }> }
) {
  const { eventID } = await context.params;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { event_id: eventID },
      })
    );

    return NextResponse.json(result.Item ?? {});
  } catch (err) {
    console.error("GET event error:", err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

// PATCH update event
export async function PATCH(
  req: Request,
  context: { params: Promise<{ eventID: string }> }
) {
  const { eventID } = await context.params; 

  try {
    const body = await req.json();

    if (!eventID) {
      return NextResponse.json({ error: "Missing eventID" }, { status: 400 });
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "No fields provided" }, { status: 400 });
    }

    
    const filtered = Object.fromEntries(
      Object.entries(body).filter(([key]) => key !== "event_id")
    );

    const fields = Object.keys(filtered);
    const updateExpr = fields.map((f) => `${f} = :${f}`).join(", ");

    const values: Record<string, unknown> = {};
    fields.forEach((f) => {
      values[`:${f}`] = filtered[f];
    });

    await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { event_id: eventID },
        UpdateExpression: `SET ${updateExpr}`,
        ExpressionAttributeValues: values,
      })
    );

    return NextResponse.json({
      success: true,
      event_id: eventID,
      updated_fields: filtered,
    });
  } catch (err) {
    console.error("PATCH event error:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

