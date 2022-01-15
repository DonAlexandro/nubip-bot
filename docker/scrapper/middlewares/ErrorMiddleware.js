const logger = require('../utils/logger');
const ApiError = require('../common/ApiError');

/**
 * Middleware for exceptions handling
 */
function errorMiddleware(err, req, res, next) {
  logger.error(err.message);

  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(500).json({ message: 'Щось пішло не так, спробуйте пізніше знову' });
}

module.exports = errorMiddleware;
