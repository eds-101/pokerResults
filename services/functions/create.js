import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      id: 123,
      locationId: uuid.v1(), // A unique uuid
      finishingPositions: data.finishingPositions, // Parsed from request body
      playerEntries: data.playerEntries, // Parsed from request body
      buyIn: data.buyIn, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  // {"finishingPositions": {"winnerId": 100, "secondPlaceId": 101, "thirdPlaceId": 102}, "playerEntries": [{"playerId": 100, "rebuys": 0}, {"playerId": 101, "rebuys": 1}, {"playerId": 102, "rebuys": 0}], "buyIn": 20}
  // {"finishingPositions": {"winnerId": 100, "secondPlaceId": 101, "thirdPlaceId": 102}, "buyIn": 20}
  // {  "buyIn": 20}

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
