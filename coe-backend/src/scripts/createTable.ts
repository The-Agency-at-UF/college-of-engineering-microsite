import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

async function createTable() {
  const command = new CreateTableCommand({
    TableName: "legacy_events",
    AttributeDefinitions: [{ AttributeName: "event_id", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "event_id", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST"
  });

  try {
    const response = await client.send(command);
    console.log("Table created:", response.TableDescription?.TableName);
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

createTable();
