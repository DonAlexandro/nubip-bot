/**
 * Custom error class for handling API exceptions
 */
class ApiError extends Error {
  /** Code of the error */
  code;
  /** Message of the error */
  message;
  /** Where error happend */
  source;

  /**
   * @param {number} code - code of the error
   * @param {string} message - message of the error
   * @param {string} [source] - place where error happened
   */
  constructor(code, message, source = '') {
    if (!code || !message) {
      throw new Error('To throw API Error you must provide both code and message');
    }

    super(message);

    this.code = code;
    this.message = message;
    this.source = source;
  }

  /**
   * Throw 404 not found error
   *
   * @param {string} message - message of the error
   * @param {string} [source] - file/method where error happened
   */
  static NotFound(message, source = '') {
    throw new ApiError(404, message, source);
  }
}

module.exports = ApiError;
