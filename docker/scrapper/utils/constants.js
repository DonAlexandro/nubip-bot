const errorMessages = {
  redisService: {
    getCachedDataError: 'You must provide cached data key',
    createCachedDataError: 'To make a new cache you must provide key and data',
    deleteCachedDataError: 'You must provide cached data key to delete it',
    // prettier-ignore
    closeConnectioError: 'You cannot close connection because it\'s already closed'
  },
  resourceService: {
    constructorError: 'Instance of ResourceService are required'
  },
  apiError: {
    constructorError: 'To throw API Error you must provide both code and message'
  },
  resourceController: {
    initParamsError: 'Path and resource params must be type of string',
    initNotFoundError: 'Інформація не була знайдена на сайті НУБіП',
    initWrongResourceError: 'There is no :resource resource'
  },
  errorMiddleware: {
    unexpectedError: 'Щось пішло не так, спробуйте пізніше знову'
  }
};

const oneDayInSeconds = 60 * 60 * 24;
const threeDayInSeconds = 60 * 60 * 24 * 3;

module.exports = {
  errorMessages,
  oneDayInSeconds,
  threeDayInSeconds
};
