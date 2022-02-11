const RedisService = require('../../services/RedisService');
const { testNews } = require('../../utils/tests/testData');
const { errorMessages } = require('../../utils/constants');
const ResourceTemplate = require('./ResourceTemplate');

describe('Resource Template', () => {
  describe('methods', () => {
    describe('init', () => {
      let resourceTemplate = null;

      beforeAll(() => {
        resourceTemplate = new ResourceTemplate();
        RedisService.openConnection();
      });

      afterAll(() => {
        RedisService.closeConnection();
      });

      it('should return list of news', async () => {
        const spyInit = jest.spyOn(resourceTemplate, 'init').mockImplementationOnce(() => testNews);

        const data = await resourceTemplate.init('/news', 'news');

        expect(data).toStrictEqual(testNews);

        spyInit.mockRestore();
      });

      it('should throw an error if resource are wrong', async () => {
        const wrongResource = 'unexistingResource';

        try {
          await resourceTemplate.init('/news', wrongResource);
        } catch (error) {
          expect(error.message).toBe(
            errorMessages.resourceController.initWrongResourceError.replace(':resource', wrongResource)
          );
        }
      });

      it('should throw an error if path are wrong', async () => {
        try {
          await resourceTemplate.init('/unexistingPath', 'news');
        } catch (error) {
          expect(error.message).toBe(errorMessages.resourceController.initNotFoundError);
          expect(error.code).toBe(404);
        }
      });

      it('should throw an error if types of params are not type of string', async () => {
        try {
          await resourceTemplate.init(123, null);
        } catch (error) {
          expect(error.message).toBe(errorMessages.resourceController.initParamsError);
        }
      });
    });
  });
});
