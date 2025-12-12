import { NextResponse } from "next/server";
import { docClient } from "@/app/lib/dynamoClient";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME_M || "legacy_milestones";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ milestoneID: string }> }
) {
  const { milestoneID } = await context.params; 

  try {
    await docClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { milestone_id: milestoneID },
      })
    );

    return NextResponse.json(
      { message: `Milestone ${milestoneID} deleted successfully` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete milestone" },
      { status: 500 }
    );
  }
}

