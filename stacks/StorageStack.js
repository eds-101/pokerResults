import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {

  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads");

  // Create the DynamoDB table
  const table = new Table(stack, "Results", {
    fields: {
      id: "number",
      locationId: "number",
      finishingPositions: [{
        winnerId: "number",
        secondPlaceId: "number",
        thirdPlaceId: "number",
      }],
      playerEntries: [{
        playerId: "number", rebuys: "number"
      }],
      buyIn: "float",
    },
    primaryIndex: { partitionKey: "id", sortKey: "locationId" },
  });

  return {
    table, bucket
  };
}
