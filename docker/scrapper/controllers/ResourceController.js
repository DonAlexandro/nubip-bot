const axios = require('axios');
const cheerio = require('cheerio');

const ResourceService = require('../services/ResourceService');
const { baseUrl } = require('../config');

async function init(path, resource) {
  try {
    const response = await axios(baseUrl + path);
    const html = response.data;
    const $ = cheerio.load(html);

    const resourceService = new ResourceService($);

    if (!resourceService[resource]) {
      throw new Error(`There is no "${resource}" resource`);
    }

    const data = resourceService[resource]();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

class ResourceController {
  async timetable(req, res, next) {
    try {
      const data = await init('/node/23920', 'timetable');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async schedule(req, res, next) {
    try {
      const data = await init('/node/23920', 'schedule');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

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
