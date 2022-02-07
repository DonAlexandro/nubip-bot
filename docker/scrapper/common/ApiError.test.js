const { errorMessages } = require('../utils/constants');
const ApiError = require('./ApiError');

describe('API Error', () => {
  describe('constructor', () => {
    it('should throw 400 bad request error', () => {
      const message = 'Bad Request';
      const code = 400;

      try {
        throw new ApiError(code, message);
      } catch (error) {
        expect(error.message).toBe(message);
        expect(error.code).toBe(code);
      }
    });

    it('should throw an error if code was not provided', () => {
      expect(() => {
        throw new ApiError();
      }).toThrow(errorMessages.apiError.constructorError);
    });

    it('should throw an error if message was not provided', () => {
      expect(() => {
        throw new ApiError(400);
      }).toThrow(errorMessages.apiError.constructorError);
    });
  });

  describe('NotFound', () => {
    it('should throw 404 not found error', () => {
      const message = 'Not Found';

      try {
        throw ApiError.NotFound(message);
      } catch (error) {
        expect(error.message).toBe(message);
        expect(error.code).toBe(404);
      }
    });
  });
});
