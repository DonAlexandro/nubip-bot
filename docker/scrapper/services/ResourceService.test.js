const cheerio = require('cheerio');

const ResourceService = require('./ResourceService');
const { baseUrl } = require('../config');
const {
  src,
  html,
  htmlWithNoImage,
  wrongImageHtml,
  htmlTable,
  htmlMsoNormalTable,
  htmlTableWithoutAnchor,
  htmlTableWithoutName,
  htmlNews,
  htmlNewsWithoutWideColumn,
  htmlNewsWithoutTitle,
  htmlNewsWithoutDateAndText
} = require('../utils/tests/testData');
const { errorMessages } = require('../utils/constants');

describe('Resource Service', () => {
  describe('constructor', () => {
    it('should take cheerio instance', () => {
      const $ = cheerio.load(html);

      const resourceService = new ResourceService($);

      expect(resourceService.$).toBe($);
    });

    it('should throw an error without cheerio instance', () => {
      expect(() => {
        new ResourceService();
      }).toThrow(errorMessages.resourceService.constructorError);
    });
  });

  describe('methods', () => {
    // Take html and call provided method to parse it
    const prepareData = (html, method) => {
      const $ = cheerio.load(html);

      const resourceService = new ResourceService($);

      return resourceService[method]();
    };

    describe('timetable', () => {
      it('should return link to timetable image', () => {
        const data = prepareData(html, 'timetable');
        expect(data).toBe(baseUrl + src);
      });

      it('should return 404 image if image src is wrong', () => {
        const data = prepareData(wrongImageHtml, 'timetable');
        expect(data).toBe('https://http.cat/404');
      });

      it('should return 404 image if there is no image', () => {
        const data = prepareData(htmlWithNoImage, 'timetable');
        expect(data).toBe('https://http.cat/404');
      });
    });

    describe('schedule', () => {
      it('should return list of schedules', () => {
        const data = prepareData(htmlTable, 'schedule');
        expect(data).toStrictEqual([
          {
            name: 'ННІ лісового та садово-паркового господарства',
            link: baseUrl + '/sites/default/files/u284/nni_lisovogo_i_sadovo-parkovogo_gospodarstva_28.12.21.xlsx'
          }
        ]);
      });

      it('should return list with links only if html will not contain names', () => {
        const data = prepareData(htmlTableWithoutName, 'schedule');
        expect(data).toStrictEqual([
          { link: baseUrl + '/sites/default/files/u284/nni_lisovogo_i_sadovo-parkovogo_gospodarstva_28.12.21.xlsx' }
        ]);
      });

      it('should return an empty array because there is no table', () => {
        const data = prepareData(html, 'schedule');
        expect(data).toStrictEqual([]);
      });

      it('should return an empty array because there is only a table with class MsoNormalTable', () => {
        const data = prepareData(htmlMsoNormalTable, 'schedule');
        expect(data).toStrictEqual([]);
      });

      it('should return an empty array if html will not contain links', () => {
        const data = prepareData(htmlTableWithoutAnchor, 'schedule');
        expect(data).toStrictEqual([]);
      });
    });

    describe('news', () => {
      it('should return list of news', () => {
        const data = prepareData(htmlNews, 'news');
        expect(data).toStrictEqual([
          {
            title: 'До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022',
            text: 'НУБіП України здійснює підготовку за 45 спеціальностями, більшості з яких надається підтримка, особливістю якої є участь у Всеукраїнській Олімпіаді, що дає унікальну можливість отримати до + 20 додаткових балів до оцінки сертифіката ЗНО з одного відповід',
            date: '18 січня 2022 року',
            link: baseUrl + '/node/103689'
          }
        ]);
      });

      it('should return list of news with partial information', () => {
        const data = prepareData(htmlNewsWithoutDateAndText, 'news');
        expect(data).toStrictEqual([
          {
            title: 'До уваги випускників 11-х класів: стартувала Олімпіада для вступу – 2022',
            text: '',
            date: '',
            link: baseUrl + '/node/103689'
          }
        ]);
      });

      it('should return an empty array if there will not be div with class wide-column', () => {
        const data = prepareData(htmlNewsWithoutWideColumn, 'news');
        expect(data).toStrictEqual([]);
      });

      it('should return an empty array if there will not be title or link', () => {
        const data = prepareData(htmlNewsWithoutTitle, 'news');
        expect(data).toStrictEqual([]);
      });
    });
  });
});
