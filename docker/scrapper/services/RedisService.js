const redis = require('redis');
const logger = require('../utils/logger');
const { errorMessages } = require('../utils/constants');
const { nodeEnv } = require('../config');

const oneHour = 60 * 60;

/**
 * Service for manipulations with cache
 */
class RedisService {
  client = null;

  async openConnection() {
    this.client = redis.createClient({
      socket: {
        host: nodeEnv === 'test' ? 'localhost' : 'redis',
        port: 6379
      }
    });

    this.client.on('error', (error) => logger.error(`Redis connection error: ${error}`));

    if (nodeEnv !== 'test') {
      this.client.on('ready', () => logger.info(`Redis is ready to use!`));
    }

    await this.client.connect();
  }

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
      throw new Error(errorMessages.redisService.getCachedDataError);
    }

    const data = await this.client.get(key);

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
      throw new Error(errorMessages.redisService.createCachedDataError);
    }

    this.client.setEx(key, expiresIn, JSON.stringify(data));
  }

  /**
   * Function for deleting cached data
   *
   * @param {string} key - key of cached data in store
   *
   * @throws will throw an error if key was not provided
   */
  deleteCachedData(key) {
    if (!key) {
      throw new Error(errorMessages.redisService.deleteCachedDataError);
    }

    this.client.del(key);
  }

  /**
   * Function for closing connection to redis
   *
   * @throws will throw an error if client isn't connected
   */
  closeConnection() {
    if (!this.client) {
      throw new Error(errorMessages.redisService.closeConnectioError);
    }

    this.client.quit();
  }
}

module.exports = new RedisService();
