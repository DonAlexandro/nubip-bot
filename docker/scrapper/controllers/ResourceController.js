const axios = require('axios');
const cheerio = require('cheerio');

const ResourceService = require('../services/ResourceService');
const RedisService = require('../services/RedisService');
const { baseUrl } = require('../config');

/**
 * This function fetch information from NUBiP website and parse it, using appropriate service.
 * It's also looking for cached data to improve perfomance
 *
 * @param {string} path - path to NUBiP's webpage, where we can find requested information
 * @param {string} resource - the name of the resource that we are looking for
 *
 * @throws will throw an error if there's no provided resource.
 *
 * @returns {string | object[]} information related to searching resource
 */
async function init(path, resource) {
  try {
    const cachedData = await RedisService.getCachedData(resource);

    if (cachedData && cachedData.length) {
      return cachedData;
    }

    const response = await axios(baseUrl + path);
    const html = response.data;
    const $ = cheerio.load(html);

    const resourceService = new ResourceService($);

    if (!resourceService[resource]) {
      throw new Error(`There is no "${resource}" resource`);
    }

    const data = resourceService[resource]();
    RedisService.cacheData(resource, data);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Controller for routing requested resources
 */
class ResourceController {
  /**
   * This function searchs for timetable image
   *
   * @param {Request} req - route's request object
   * @param {Response} res - route's response object
   * @param {NextFunction} next - next function to move information to the next middleware
   */
  async timetable(req, res, next) {
    try {
      const data = await init('/node/23920', 'timetable');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  /**
   * This function searchs for schedules
   *
   * @param {Request} req - route's request object
   * @param {Response} res - route's response object
   * @param {NextFunction} next - next function to move information to the next middleware
   */
  async schedule(req, res, next) {
    try {
      const data = await init('/node/23920', 'schedule');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  /**
   * This function searchs for news
   *
   * @param {Request} req - route's request object
   * @param {Response} res - route's response object
   * @param {NextFunction} next - next function to move information to the next middleware
   */
  async news(req, res, next) {
    try {
      const data = await init('/news', 'news');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResourceController();
