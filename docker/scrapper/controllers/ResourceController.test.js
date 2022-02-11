const ResourceController = require('./ResourceController');
const { testNews, testSchedules } = require('../utils/tests/testData');
const TimetableTemplate = require('../core/templates/resources/TimetableTemplate');
const ScheduleTemplate = require('../core/templates/resources/ScheduleTemplate');
const NewsTemplate = require('../core/templates/resources/NewsTemplate');

describe('Resource Controller', () => {
  describe('methods', () => {
    const mockResponse = () => {
      const res = {};
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    const prepareTest = async (data, resource) => {
      const req = jest.fn();
      const next = jest.fn();
      const res = mockResponse();
      const templates = {
        timetable: TimetableTemplate,
        schedule: ScheduleTemplate,
        news: NewsTemplate
      };

      const result = { data };
      jest.spyOn(templates[resource], 'init').mockImplementationOnce(() => data);

      await ResourceController[resource](req, res, next);

      return { res, result };
    };

    describe('timetable', () => {
      it('should return link to image with timetable', async () => {
        const { res, result } = await prepareTest('https://nubip.edu.ua/path/to/timetable', 'timetable');

        expect(res.json).toBeCalledWith(result);
      });
    });

    describe('schedule', () => {
      it('should return list of schedules', async () => {
        const { res, result } = await prepareTest(testSchedules, 'schedule');

        expect(res.json).toBeCalledWith(result);
      });
    });

    describe('news', () => {
      it('should return list of news', async () => {
        const { res, result } = await prepareTest(testNews, 'news');

        expect(res.json).toBeCalledWith(result);
      });
    });
  });
});
