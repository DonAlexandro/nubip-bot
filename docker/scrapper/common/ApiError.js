const { errorMessages } = require('../utils/constants');

/**
 * Custom error class for handling API exceptions.
 */
class ApiError extends Error {
  /** Code of the error. */
  code;
  /** Message of the error. */
  message;
  /** Where error happend. */
  source;

  /**
   * @param {number} code - Code of the error.
   * @param {string} message - Message of the error.
   * @param {string} [source] - Place where error happened.
   */
  constructor(code, message, source = '') {
    if (!code || !message) {
      throw new Error(errorMessages.apiError.constructorError);
    }

    super(message);

    this.code = code;
    this.message = message;
    this.source = source;
  }

  /**
   * Throw 404 not found error.
   *
   * @param {string} message - Message of the error.
   * @param {string} [source] - File/method where error happened.
   * @throws Will throw 404 not found error.
   */
  static NotFound(message, source = '') {
    throw new ApiError(404, message, source);
  }
}

module.exports = ApiError;
