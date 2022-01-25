const axios = require('axios');
const cheerio = require('cheerio');

const ResourceService = require('../services/ResourceService');
const RedisService = require('../services/RedisService');
const { baseUrl } = require('../config');
const ApiError = require('../common/ApiError');

/**
 * Controller for routing requested resources
 */
class ResourceController {
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
  async init(path, resource) {
    try {
      // Function can accept only strings as a params so need to check it
      if (typeof path !== 'string' || typeof resource !== 'string') {
        throw new Error('Path and resource params must be type of string');
      }

      // Here we're looking for cached data and return it if there is something
      const cachedData = await RedisService.getCachedData(resource);

      if (cachedData && cachedData.length) {
        return cachedData;
      }

      // Here we're getting data from main website and load it to parse engine
      const response = await axios(baseUrl + path); // getting data
      const html = response.data;
      const $ = cheerio.load(html); // load to parse engine

      const resourceService = new ResourceService($);

      // If there was provided unexisiting resource, throw an error about this
      if (!resourceService[resource]) {
        throw new Error(`There is no "${resource}" resource`);
      }

      // Parse, cache and return loaded data
      const data = resourceService[resource]();
      RedisService.cacheData(resource, data);

      return data;
    } catch (error) {
      // If there was provided wrong path, throw an error about this
      if (error.response && error.response.status === 404) {
        throw ApiError.NotFound('Інформація не була знайдена на сайті НУБіП', 'ResourceController.init');
      }

      // If error is already instance of Error just throw it
      if (error instanceof Error) {
        throw error;
      }

      // Wrap unhandled error in Error class and throw it
      throw new Error(error);
    }
  }

  /**
   * This function searchs for timetable image
   *
   * @param {Request} req - route's request object
   * @param {Response} res - route's response object
   * @param {NextFunction} next - next function to move information to the next middleware
   */
  async timetable(req, res, next) {
    try {
      const data = await this.init('/node/23920', 'timetable');

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
      const data = await this.init('/node/23920', 'schedule');

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
      const data = await this.init('/news', 'news');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResourceController();
