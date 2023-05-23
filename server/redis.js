import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient();
await redisClient.connect();
console.log(redisClient.isReady);

await redisClient.on("ready", () => {
  console.log("Redis connection is established");
});

redisClient.on("error", (err) => {
  console.error(err);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

export { redisClient, redisGetAsync, redisSetAsync };
