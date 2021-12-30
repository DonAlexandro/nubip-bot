const { baseUrl } = require('../config');

module.exports = class ResourceService {
  constructor(instance) {
    if (!instance) {
      throw new Error('Instance of ResourceService are required!');
    }

    this.$ = instance;
  }

  timetable() {
    let timetable = null;
    const image = this.$('p').find('img');

    image.each((i, elem) => {
      const src = elem.attribs.src;

      if (src.includes('rozklad_dzvinkiv')) {
        timetable = baseUrl + src;
      }
    });

    return timetable;
  }

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
        scheduleNames.push({ name: scheduleName });
      }
    });

    scheduleLinks.map((link, index) => {
      const item = Object.assign(link, scheduleNames[index]);
      schedules.push(item);
    });

    return schedules;
  }

  news() {
    const list = this.$('.wide-column').children();
    const news = [];

    list.each((i, elem) => {
      const title = this.$(elem).find('h3').children();
      const titleLink = title.attr('href');
      const titleText = title.text();

      const text = this.$(elem).find('p').not('.date_and_other').text();
      const date = this.$(elem).find('.date_and_other').text();

      if (titleLink && titleText && text && date) {
        news.push({
          title: titleText,
          link: baseUrl + titleLink,
          text: text.replace(/→/, '').trim(),
          date
        });
      }
    });

    return news;
  }
};
