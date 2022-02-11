const RedisService = require('../../../services/RedisService');
const TimetableTemplate = require('./TimetableTemplate');
const { threeDayInSeconds } = require('../../../utils/constants');

describe('Timetable Template', () => {
  describe('methods', () => {
    describe('getData', () => {
      it('should create cache with deleting time in three days', () => {
        const resource = 'timetable';
        const data = 'https://nubip.edu.ua/path/to/template';
        const mockResourceService = {
          [resource]: () => data
        };

        const spyCache = jest.spyOn(RedisService, 'cacheData').mockImplementationOnce(() => {});

        TimetableTemplate.getData(mockResourceService, resource);

        expect(spyCache).toBeCalledWith(resource, data, threeDayInSeconds);
      });
    });
  });
});
