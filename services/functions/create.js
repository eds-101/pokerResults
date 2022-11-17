import * as uuid from "uuid";
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = =handler(async (event) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      gameId: 123,
      locationId: uuid.v1(), // A unique uuid
      finishingPositions: data.finishingPositions, // Parsed from request body
      playerEntries: data.playerEntries, // Parsed from request body
      buyIn: data.buyIn, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  // {"finishingPositions": {"winnerId": 100, "secondPlaceId": 101, "thirdPlaceId": 102}, "playerEntries": [{"playerId": 100, "rebuys": 0}, {"playerId": 101, "rebuys": 1}, {"playerId": 102, "rebuys": 0}], "buyIn": 20}

    await dynamoDb.put(params);

    return params.Item
}
