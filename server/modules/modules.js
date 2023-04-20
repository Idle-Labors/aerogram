import redisClient from "../redis";

export async function rateLimiter(req, res, next) {
  const ipAddress = req.socket.remoteAddress;
  const response = await redisClient.multi().incr(ipAddress);
}