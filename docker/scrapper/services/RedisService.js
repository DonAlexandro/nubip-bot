const redis = require('redis');
let client = null;

(async () => {
  client = redis.createClient({
    socket: {
      host: 'redis',
      port: 6379
    }
  });

  client.on('error', (error) => console.log(`Redis connection error: ${error}`));

  await client.connect();
})();

const oneHour = 1000 * 60 * 60;

class RedisService {
  async getCachedData(key) {
    if (!key) {
      throw new Error('You must provide cached data key');
    }

    const data = await client.get(key);

    return JSON.parse(data);
  }

  cacheData(key, data, expiresIn = oneHour) {
    if (!key || !data) {
      throw new Error('To make new cache you must provide key and data');
    }

    client.setEx(key, expiresIn, JSON.stringify(data));
  }
}

module.exports = new RedisService();
