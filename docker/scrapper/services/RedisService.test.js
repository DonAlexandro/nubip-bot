const RedisService = require('./RedisService');
const { testNews } = require('../utils/tests/testData');
const { errorMessages } = require('../utils/constants');

describe('Redis Service', () => {
  afterAll(() => {
    RedisService.closeConnection();
  });

  describe('methods', () => {
    afterAll(() => {
      RedisService.deleteCachedData('test');
    });

    describe('openConnection', () => {
      it('should create new redis connection', () => {
        RedisService.openConnection();
        expect(RedisService.client).toBeTruthy();
      });
    });

    describe('getCachedData', () => {
      beforeAll(() => {
        RedisService.cacheData('test', testNews);
      });

      it('should get value by key', async () => {
        const data = await RedisService.getCachedData('test');
        expect(data).toStrictEqual(testNews);
      });

      it('should throw an error if key was not provided', async () => {
        try {
          await RedisService.getCachedData();
        } catch (error) {
          expect(error.message).toEqual(errorMessages.redisService.getCachedDataError);
        }
      });
    });

    describe('cacheData', () => {
      it('should create new cached data', async () => {
        RedisService.cacheData('test', testNews);

        const data = await RedisService.getCachedData('test');
        expect(data).toStrictEqual(testNews);
      });

      it('should throw an error if key was not provided', () => {
        expect(() => {
          RedisService.cacheData();
        }).toThrow(errorMessages.redisService.createCachedDataError);
      });

      it('should throw an error if key was not provided', () => {
        expect(() => {
          RedisService.cacheData('test');
        }).toThrow(errorMessages.redisService.createCachedDataError);
      });
    });

    describe('deleteCachedData', () => {
      it('should delete cached data', async () => {
        RedisService.cacheData('test', testNews);
        RedisService.deleteCachedData('test');

        const data = await RedisService.getCachedData('test');
        expect(data).toBe(null);
      });

      it('should throw an error if key was not provided', () => {
        expect(() => {
          RedisService.deleteCachedData();
        }).toThrow(errorMessages.redisService.deleteCachedDataError);
      });
    });
  });
});
