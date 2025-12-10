import { NextResponse } from "next/server";
import { docClient } from "@/app/lib/dynamoClient";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME_M || "legacy_milestones";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ milestoneID: string }> }
) {
  const { milestoneID } = await context.params; 

  console.log("DELETE called for milestoneID:", milestoneID);

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
    console.error("Error deleting milestone:", err);
    return NextResponse.json(
      { error: "Failed to delete milestone", details: err },
      { status: 500 }
    );
  }
}

