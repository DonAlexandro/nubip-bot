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
   * @param {string} source - place where error happend
   */
  constructor(code, message, source) {
    super(message);

    this.code = code;
    this.message = message;
    this.source = source;
  }
}

module.exports = ApiError;
