import { NextResponse } from "next/server";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const TABLE_NAME = "legacy_milestones";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ milestoneID: string }> }
) {
  const { milestoneID } = await context.params; 

  console.log("DELETE called for milestoneID:", milestoneID);

  try {
    const command = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ milestone_id: milestoneID }),
    });

    await client.send(command);

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

