const axios = require('axios');
const cheerio = require('cheerio');

const ResourceService = require('../../services/ResourceService');
const RedisService = require('../../services/RedisService');
const { baseUrl } = require('../../config');
const ApiError = require('../../common/ApiError');
const { errorMessages } = require('../../utils/constants');

/**
 * Implements methods for loading, parsing and caching data.
 */
class ResourceTemplate {
  /**
   * This is template method for executing functions. These functions validate params,
   * handle errors, load, cache and return data.
   *
   * @param {string} path - Path to NUBiP's webpage, where we can find requested information.
   * @param {string} resource - The name of the resource that we are looking for.
   * @returns {string | object[]} Information related to searching resource.
   */
  async init(path, resource) {
    try {
      this.validateParams(path, resource);

      // Here we're looking for cached data and return it if there is something
      const cachedData = await RedisService.getCachedData(resource);

      if (cachedData && cachedData.length) {
        return cachedData;
      }

      const resourceService = await this.initializeService(path, resource);
      return this.getData(resourceService, resource);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Validate params in load method. It accepts only strings.
   *
   * @param {string} path - Path to webpage of NULES, where we can find requested information.
   * @param {string} resource - The name of the resource that we are looking for.
   * @throws Will throw an error if there's no provided resource.
   */
  validateParams(path, resource) {
    if (typeof path !== 'string' || typeof resource !== 'string') {
      throw new Error(errorMessages.resourceController.initParamsError);
    }
  }

  /**
   * Gets data from main website and load it to parse engine.
   *
   * @param {string} path - Path to webpage of NULES, where we can find requested information.
   * @param {string} resource - The name of the resource that we are looking for.
   * @throws Will throw an error if provided resource doesn't exist.
   * @returns {ResourceService} - Service for parsing loaded html.
   */
  async initializeService(path, resource) {
    const response = await axios(baseUrl + path); // get data
    const html = response.data;
    const $ = cheerio.load(html); // load to parse engine

    const resourceService = new ResourceService($);

    if (!resourceService[resource]) {
      throw new Error(errorMessages.resourceController.initWrongResourceError.replace(':resource', resource));
    }

    return resourceService;
  }

  /**
   * Handle load function errors.
   *
   * @param {AxiosError | Error | any} error - Catched error.
   * @throws If there was provided wrong path, throw custom not found error.
   * @throws If error is already instance of Error class just throw it.
   * @throws If error is any wrap it in Error class and throw it.
   */
  handleError(error) {
    if (error.response && error.response.status === 404) {
      throw ApiError.NotFound(errorMessages.resourceController.initNotFoundError, 'ResourceController.init');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(error);
  }

  /**
   * Get, cache and return requested data.
   *
   * @param {ResourceService} resourceService - Service for parsing loaded html.
   * @param {string} resource - The name of the resource that we are looking for.
   * @returns {string | object[]} Information related to searching resource.
   */
  getData(resourceService, resource) {
    const data = resourceService[resource]();
    RedisService.cacheData(resource, data);

    return data;
  }
}

module.exports = ResourceTemplate;
