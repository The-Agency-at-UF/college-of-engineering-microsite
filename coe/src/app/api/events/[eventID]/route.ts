import { NextResponse } from "next/server";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const TABLE_NAME = "legacy_events";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ eventID: string }> }
) {
  const { eventID } = await context.params; 

  try {
    const command = new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ event_id: eventID }),
    });

    await client.send(command);

    return NextResponse.json(
      { message: `Event ${eventID} deleted successfully` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
