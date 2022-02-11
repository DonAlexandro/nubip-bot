const RedisService = require('../../../services/RedisService');
const ResourceTemplate = require('../ResourceTemplate');

/**
 * Increases time for holding timetable to 3 days.
 */
class TimetableTemplate extends ResourceTemplate {
  /**
   * Get, cache and return requested data.
   *
   * @param {ResourceService} resourceService - Service for parsing loaded html.
   * @param {string} resource - The name of the resource that we are looking for.
   * @returns {string | object[]} Information related to searching resource.
   */
  getData(resourceService, resource) {
    const threeDaysInSeconds = 60 * 60 * 24 * 3; // how long to store timetable
    const data = resourceService[resource]();
    RedisService.cacheData(resource, data, threeDaysInSeconds);

    return data;
  }
}

module.exports = new TimetableTemplate();
