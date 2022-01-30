const ResourceController = require('./ResourceController');
const RedisService = require('../services/RedisService');
const { testNews } = require('../utils/tests/testData');

describe('Resource Controller', () => {
  describe('methods', () => {
    describe('init', () => {
      beforeAll(() => {
        RedisService.openConnection();
      });

      afterAll(() => {
        RedisService.closeConnection();
      });

      it('should return list of news', async () => {
        const spyInit = jest.spyOn(ResourceController, 'init').mockImplementationOnce(() => testNews);

        const data = await ResourceController.init('/news', 'news');

        expect(data).toStrictEqual(testNews);

        spyInit.mockRestore();
      });

      it('should throw an error if resource are wrong', async () => {
        try {
          await ResourceController.init('/news', 'unexistingResource');
        } catch (error) {
          expect(error.message).toBe('There is no "unexistingResource" resource');
        }
      });

      it('should throw an error if path are wrong', async () => {
        try {
          await ResourceController.init('/unexistingPath', 'news');
        } catch (error) {
          expect(error.message).toBe('Інформація не була знайдена на сайті НУБіП');
          expect(error.code).toBe(404);
        }
      });

      it('should throw an error if types of params are not type of string', async () => {
        try {
          await ResourceController.init(123, null);
        } catch (error) {
          expect(error.message).toBe('Path and resource params must be type of string');
        }
      });
    });

    const mockResponse = () => {
      const res = {};
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    const prepareTest = async (data, resource) => {
      const req = jest.fn();
      const next = jest.fn();
      const res = mockResponse();

      const result = { data };

      const spyInit = jest.spyOn(ResourceController, 'init').mockImplementationOnce(() => data);

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
        const { res, result } = await prepareTest(
          [{ name: 'Schedule', link: 'https://nubip.edu.ua/path/to/schedule' }],
          'schedule'
        );

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
