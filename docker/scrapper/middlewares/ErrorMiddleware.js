const logger = require('../utils/logger');
const ApiError = require('../common/ApiError');
const { nodeEnv } = require('../config');
const { errorMessages } = require('../utils/constants');

/**
 * Middleware for exceptions handling
 */
function errorMiddleware(err, req, res) {
  if (nodeEnv !== 'test') {
    logger.error(err.message);
  }

  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(500).json({ message: errorMessages.errorMiddleware.unexpectedError });
}

module.exports = errorMiddleware;
