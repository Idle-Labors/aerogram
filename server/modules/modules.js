import { redisClient } from "../redis.js";
import { db } from "../database/database.js";

export async function rateLimiter(req, res, next) {
  const ipAddress = req.socket.remoteAddress;
  const response = await redisClient.multi().incr(ipAddress);
}

export async function getChannelMessages(req, res) {
  const { channel } = req.params;
  console.log(channel);

  try {
    // Retrieve the messages for the room from Redis list
    const messages = await redisClient.LRANGE(channel, 0, -2);
    console.log(messages);
    // Parse and send the messages as a response
    const parsedMessages = messages.map((message) => JSON.parse(message));
    res.json(parsedMessages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to retrieve messages" });
  }
}

export async function storeRoomMessages() {
  try {
    const rooms = ["Room1", "Room2", "Room3", "Room4", "Room5"];

    for (const room of rooms) {
      const messages = await redisClient.LRANGE(room, 0, -2);
      const parsedMessages = messages.map((message) => JSON.parse(message));

      for (const message of parsedMessages) {
        let values = [
          message.id,
          room,
          message.author,
          message.text,
          message.timestamp,
        ];
        await db.query(
          `INSERT INTO ${room}_messages (id, channel, author, text, timestamp) VALUES ($1, $2, $3, $4, $5)`,
          values
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
}
