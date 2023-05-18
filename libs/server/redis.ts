import { createClient } from "@redis/client";

const client = createClient({
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => console.log("Redis Client Error", err));

async function getRedisClient() {
  if (client.isOpen) {
    return client;
  }
  await client.connect();
  return client;
}

export default getRedisClient;
