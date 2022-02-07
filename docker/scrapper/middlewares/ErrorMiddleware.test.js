const ApiError = require('../common/ApiError');
const { errorMessages } = require('../utils/constants');
const errorMiddleware = require('./ErrorMiddleware');

describe('Error Middleware', () => {
  const mockResponse = () => {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
  };

  it('should return custom error', () => {
    const error = new ApiError(400, 'Bad Request');
    const res = mockResponse();
    const req = jest.fn();

    errorMiddleware(error, req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ message: 'Bad Request' });
  });

  it('should return 500 internal error', () => {
    const error = new Error('Internal error');
    const res = mockResponse();
    const req = jest.fn();

    errorMiddleware(error, req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ message: errorMessages.errorMiddleware.unexpectedError });
  });
});
