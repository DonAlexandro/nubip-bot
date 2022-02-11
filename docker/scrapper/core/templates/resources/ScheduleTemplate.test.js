const RedisService = require('../../../services/RedisService');
const { testSchedules } = require('../../../utils/tests/testData');
const ScheduleTemplate = require('./ScheduleTemplate');
const { oneDayInSeconds } = require('../../../utils/constants');

describe('Schedule Template', () => {
  describe('methods', () => {
    describe('getData', () => {
      it('should create cache with deleting time in one day', () => {
        const resource = 'schedule';
        const mockResourceService = {
          [resource]: () => testSchedules
        };

        const spyCache = jest.spyOn(RedisService, 'cacheData').mockImplementationOnce(() => {});

        ScheduleTemplate.getData(mockResourceService, resource);

        expect(spyCache).toBeCalledWith(resource, testSchedules, oneDayInSeconds);
      });
    });
  });
});
