const RedisService = require('../../../services/RedisService');
const ResourceTemplate = require('../ResourceTemplate');
const { oneDayInSeconds } = require('../../../utils/constants');

/**
 * Here you can find benefits from using template method design pattern.
 * If I need to change some piece of logic in whole algorithm, in this case I wanna increase time for holding schedules
 * cached, I can just redefine one method of it.
 */
class ScheduleTemplate extends ResourceTemplate {
  /**
   * Parse, cache and return requested data.
   *
   * @param {ResourceService} resourceService - Service for parsing loaded html.
   * @param {string} resource - The name of the resource that we are looking for.
   * @returns {string | object[]} Information related to searching resource.
   */
  getData(resourceService, resource) {
    const data = resourceService[resource]();
    RedisService.cacheData(resource, data, oneDayInSeconds);

    return data;
  }
}

module.exports = new ScheduleTemplate();
