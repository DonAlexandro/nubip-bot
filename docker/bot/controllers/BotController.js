const axios = require('axios');
const { TelegramAPI } = require('node-telegram-bot-api');
const { config, startOptions, errorMessage, responseMessages } = require('../utils/constants');
const { scheduleToReplyMarkup } = require('../utils/functions');

/**
 * Controller for manipulation with bot's commands.
 */
class BotController {
  /**
   * @param {TelegramAPI} bot - Telegram bot API.
   */
  constructor(bot) {
    if (!bot) {
      throw new Error('Bot instance is required');
    }

    this.bot = bot;
  }

  /**
   * Validate Telegram API message object.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   * @throws Will throw an error if msg object is falsy value, it's not an object, it has no chat or id properties.
   * @returns {TelegramAPI.Message} Validated msg object.
   */
  validate(msg) {
    if (!msg || typeof msg !== 'object') {
      throw new Error(responseMessages.validate.wrongTelegramAPI);
    } else if (!msg.chat) {
      throw new Error(responseMessages.validate.missedChatProperty);
    } else if (!msg.chat.id) {
      throw new Error(responseMessages.validate.missedIdProperty);
    }

    return msg;
  }

  /**
   * Common wrapper for every function to handle errors in one place and validate msg object.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   * @param {Function} callback - Wrapped function.
   */
  async commandWrapper(msg, callback) {
    try {
      const validMsg = this.validate(msg);
      await callback(validMsg);
    } catch (error) {
      this.bot.sendMessage(msg?.chat?.id, errorMessage);

      if (config.nodeEnv !== 'test') {
        console.error(error);
      }
    }
  }

  /**
   * Handle start command.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   */
  start(msg) {
    this.commandWrapper(msg, (validMsg) => {
      const chatId = validMsg.chat.id;

      this.bot.sendMessage(chatId, responseMessages.start, startOptions);
    });
  }

  /**
   * Handle info command.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   */
  info(msg) {
    this.commandWrapper(msg, (validMsg) => {
      const chatId = validMsg.chat.id;

      this.bot.sendMessage(chatId, responseMessages.info, { parse_mode: 'HTML' });
    });
  }

  /**
   * Handle help command.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   */
  help(msg) {
    this.commandWrapper(msg, (validMsg) => {
      const chatId = validMsg.chat.id;

      this.bot.sendMessage(chatId, responseMessages.help);
    });
  }

  /**
   * Send image with timetable.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   */
  async timetable(msg) {
    await this.commandWrapper(msg, async (validMsg) => {
      const chatId = validMsg.chat.id;

      const response = await axios.get(config.timetableAPIPath);
      const body = response.data;

      this.bot.sendPhoto(chatId, body.data);
    });
  }

  /**
   * Send a bunch of latest news.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   */
  async news(msg) {
    await this.commandWrapper(msg, async (validMsg) => {
      const chatId = validMsg.chat.id;

      const response = await axios.get(config.newsAPIPath);
      const body = response.data;

      for (const article of body.data) {
        this.bot.sendMessage(
          chatId,
          `<b>${article.title}</b> \n <i>${article.date}</i> \n\n ${article.text} \n <a href="${article.link}">Читати продовження...</a>`,
          { parse_mode: 'HTML' }
        );
      }
    });
  }

  /**
   * Send links to schedules.
   *
   * @param {TelegramAPI.Message} msg - Object with message info.
   */
  async schedule(msg) {
    await this.commandWrapper(msg, async (validMsg) => {
      const chatId = validMsg.chat.id;

      const response = await axios.get(config.scheduleAPIPath);
      const body = response.data;

      const schedules = scheduleToReplyMarkup(body.data);

      this.bot.sendMessage(chatId, responseMessages.schedule, {
        reply_markup: JSON.stringify({ inline_keyboard: schedules })
      });
    });
  }
}

module.exports = BotController;
