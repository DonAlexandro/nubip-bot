const { responseMessages } = require('../constants');

/**
 * Convert schedules provided by scrapper to correct Telegram API markup
 *
 * @param {Array<{name: string, link: string}>} data - array with schedules
 *
 * @throws will throw an error if data won't be a correct array or won't contain required properties
 *
 * @returns {Array<Array<{text: string, url: string}>>} converted array
 */
exports.scheduleToReplyMarkup = (data) => {
  if (!Array.isArray(data)) {
    throw new Error(responseMessages.scheduleToReplyMarkup.wrongData);
  }

  const schedules = [];

  for (const schedule of data) {
    if (!schedule.link || !schedule.name) {
      throw new Error(responseMessages.scheduleToReplyMarkup.missingProperties);
    }

    schedules.push([{ text: schedule.name || schedule.link, url: schedule.link }]);
  }

  return schedules;
};
