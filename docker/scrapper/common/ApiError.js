module.exports = class ApiError extends Error {
  code;
  message;
  source;

  constructor(code, message, source) {
    super(message);

    this.code = code;
    this.message = message;
    this.source = source;
  }
};
