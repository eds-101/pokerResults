import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {

  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads");

  // Create the DynamoDB table
  const table = new Table(stack, "PokerGameResults", {
    fields: {
      gameId: "number",
      locationId: "string",
    },
    primaryIndex: { partitionKey: "gameId", sortKey: "locationId" },
  });

  // Create the DynamoDB table
  const playersTable = new Table(stack, "Players", {
    fields: {
      playerId: "number",
      name: "string",
    },
    primaryIndex: { partitionKey: "playerId" },
  });

  return {
    table, playersTable, bucket
  };
}
