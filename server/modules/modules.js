import { redisClient } from "../redis.js";

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

export function getActiveUsers(req, res) {
  redisClient.LRANGE("onlineUsers", 0, -1, (err, onlineUsers) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to retrieve online users" });
    } else {
      res.json(onlineUsers);
    }
  });
}
