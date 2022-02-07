const { baseUrl } = require('../config');
const { errorMessages } = require('../utils/constants');

/**
 * Service to load and parse requested information
 */
class ResourceService {
  /**
   * @param {cheerio.CheerioAPI} instance - cheerio instance for getting information from tags
   *
   * @throws will throw an error if instance is not provided
   */
  constructor(instance) {
    if (!instance) {
      throw new Error(errorMessages.resourceService.constructorError);
    }

    this.$ = instance;
  }

  /**
   * This function is looking for image with university's timetable
   *
   * @returns {string} link to image
   */
  timetable() {
    let timetable = 'https://http.cat/404';
    const image = this.$('p').find('img');

    image.each((i, elem) => {
      const src = elem.attribs.src;

      if (src.includes('rozklad_dzvinkiv')) {
        timetable = baseUrl + src;
      }
    });

    return timetable;
  }

  /**
   * This function is looking for files with schedule
   *
   * @returns {Array<{name: string, link: string}>} name of each faculty and link to its schedule
   */
  schedule() {
    const table = this.$('table').not('.MsoNormalTable').children().children().find('td').slice(3).children();

    const scheduleLinks = [];
    const scheduleNames = [];
    const schedules = [];

    table.each((i, elem) => {
      const scheduleLink = this.$(elem).find('a').attr('href');
      const scheduleName = this.$(elem).text();

      if (scheduleLink) {
        scheduleLinks.push({ link: baseUrl + scheduleLink });
      }

      if (!/[0-9]\./.test(scheduleName.trim()) && scheduleName.trim()) {
        scheduleNames.push({ name: scheduleName.trim() });
      }
    });

    scheduleLinks.map((link, index) => {
      const item = Object.assign(link, scheduleNames[index]);
      schedules.push(item);
    });

    return schedules;
  }

  /**
   * This function is looking for news
   *
   * @returns {Array<{title: string, link: string, text: string, date: string}>} latest news from first page
   */
  news() {
    const list = this.$('.wide-column').children();
    const news = [];

    list.each((i, elem) => {
      const title = this.$(elem).find('h3').children();
      const titleLink = title.attr('href');
      const titleText = title.text();

      const text = this.$(elem).find('p').not('.date_and_other').text();
      const date = this.$(elem).find('.date_and_other').text();

      if (titleLink && titleText) {
        news.push({
          title: titleText,
          link: baseUrl + titleLink,
          text: text.replace(/→/, '').trim() || '',
          date: date || ''
        });
      }
    });

    return news;
  }
}

module.exports = ResourceService;
