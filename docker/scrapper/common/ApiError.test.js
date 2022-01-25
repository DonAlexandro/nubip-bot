const ApiError = require('./ApiError');

describe('API Error', () => {
  describe('constructor', () => {
    it('should throw 400 bad request error', () => {
      try {
        throw new ApiError(400, 'Bad Request');
      } catch (error) {
        expect(error.message).toBe('Bad Request');
        expect(error.code).toBe(400);
      }
    });

    it('should throw an error if code was not provided', () => {
      expect(() => {
        throw new ApiError();
      }).toThrow('To throw API Error you must provide both code and message');
    });

    it('should throw an error if message was not provided', () => {
      expect(() => {
        throw new ApiError(400);
      }).toThrow('To throw API Error you must provide both code and message');
    });
  });

  describe('NotFound', () => {
    it('should throw 404 not found error', () => {
      try {
        throw ApiError.NotFound('Not Found');
      } catch (error) {
        expect(error.message).toBe('Not Found');
        expect(error.code).toBe(404);
      }
    });
  });
});
