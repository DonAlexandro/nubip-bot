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

/**
 * Service for manipulations with cache
 */
class RedisService {
  /**
   * Function for fetching cached data
   *
   * @param {string} key - key of cached data in store
   *
   * @throws will throw an error if key param was not provided
   *
   * @returns {string | Array<object>} cached data from store
   */
  async getCachedData(key) {
    if (!key) {
      throw new Error('You must provide cached data key');
    }

    const data = await client.get(key);

    return JSON.parse(data);
  }

  /**
   * Function for caching data
   *
   * @param {string} key - key of cached data in store
   * @param {string | Array<object>} data - data for caching
   * @param {number} [expiresIn] - how long store will be storing data (1hr by default)
   *
   * @throws will throw an error if key or data param were not provided
   */
  cacheData(key, data, expiresIn = oneHour) {
    if (!key || !data) {
      throw new Error('To make new cache you must provide key and data');
    }

    client.setEx(key, expiresIn, JSON.stringify(data));
  }
}

module.exports = new RedisService();
