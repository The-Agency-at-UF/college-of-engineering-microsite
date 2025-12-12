import { NextResponse } from "next/server";
import { docClient } from "@/app/lib/dynamoClient";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME_M || "legacy_milestones";

// GET one milestone
export async function GET(
  req: Request,
  context: { params: Promise<{ milestoneID: string }> }
) {
  const { milestoneID } = await context.params; 

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { milestone_id: milestoneID },
      })
    );

    return NextResponse.json(result.Item ?? {});
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch milestone" },
      { status: 500 }
    );
  }
}

// PATCH update milestone
export async function PATCH(
  req: Request,
  context: { params: Promise<{ milestoneID: string }> }
) {
  const { milestoneID } = await context.params; 

  try {
    const body = await req.json();

    if (!milestoneID) {
      return NextResponse.json(
        { error: "Missing milestoneID" },
        { status: 400 }
      );
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No fields provided" },
        { status: 400 }
      );
    }

    
    const filtered = Object.fromEntries(
      Object.entries(body).filter(([key]) => key !== "milestone_id")
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
        Key: { milestone_id: milestoneID },
        UpdateExpression: `SET ${updateExpr}`,
        ExpressionAttributeValues: values,
      })
    );

    return NextResponse.json({
      success: true,
      milestone_id: milestoneID,
      updated_fields: filtered,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update milestone" },
      { status: 500 }
    );
  }
}
