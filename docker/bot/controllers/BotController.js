const axios = require('axios');
const { config, startOptions, errorMessage } = require('../utils/constants');

/**
 * Controller for manipulation with bot's commands
 */
class BotController {
  /**
   * @param {TelegramBot} bot - instance of telegram bot
   */
  constructor(bot) {
    if (!bot) {
      throw new Error('Bot instance is required!');
    }

    this.bot = bot;
  }

  /**
   * Handle start command
   *
   * @param {TelegramAPI.Message} msg - object with message info
   */
  start(msg) {
    const chatId = msg.chat.id;

    this.bot.sendMessage(
      chatId,
      'Привіт, гузлік. Шо ти, розклад шукаєш, новини хочеш глянути? Ну давай, жми на кнопки нижче',
      startOptions
    );
  }

  /**
   * Handle info command
   *
   * @param {TelegramAPI.Message} msg - object with message info
   */
  info(msg) {
    const chatId = msg.chat.id;

    this.bot.sendMessage(
      chatId,
      `<b>Хелло слейв'янін!</b>
Я був створений чисто як навчальний проєкт і зараз находжуся в альфа версії, тому поки що я примітивний, як тьолка з айфоном і чехлом з вушками.
В принципі, є велика імовірність, шо таким і залишуся, або якщо і стану кращим, то ніхто того не замітить :)
Всьо, можеш продовжувати дивитися свій тік-ток і лоскотати себе в штанах`,
      { parse_mode: 'HTML' }
    );
  }

  /**
   * Handle help command
   *
   * @param {TelegramAPI.Message} msg - object with message info
   */
  help(msg) {
    const chatId = msg.chat.id;

    this.bot.sendMessage(
      chatId,
      `Якшо шось поламалося, то скоріше за все, то шось помінялося на сайті НУБіП, звідки я черпаю інформацію, але зараз вона по якійсь причині стала недоступна
Нам з тобою залишається надіятися, шо мій автор не забив BIG COCK на мене і згодом він все поправить`
    );
  }

  /**
   * Send image with timetable
   *
   * @param {TelegramAPI.Message} msg - object with message info
   */
  async timetable(msg) {
    const chatId = msg.chat.id;

    try {
      const response = await axios(config.timetableAPIPath);
      const body = response.data;

      this.bot.sendPhoto(chatId, body.data);
    } catch (error) {
      this.bot.sendMessage(chatId, errorMessage);
      console.error(error);
    }
  }

  /**
   * Send a bunch of latest news
   *
   * @param {TelegramAPI.Message} msg - object with message info
   */
  async news(msg) {
    const chatId = msg.chat.id;

    try {
      const response = await axios(config.newsAPIPath);
      const body = response.data;

      body.data.forEach((article) => {
        this.bot.sendMessage(
          chatId,
          `<b>${article.title}</b> \n <i>${article.date}</i> \n\n ${article.text} \n <a href="${article.link}">Читати продовження...</a>`,
          { parse_mode: 'HTML' }
        );
      });
    } catch (error) {
      this.bot.sendMessage(chatId, errorMessage);
      console.error(error);
    }
  }

  /**
   * Send links to schedules
   *
   * @param {TelegramAPI.Message} msg - object with message info
   */
  async schedule(msg) {
    const chatId = msg.chat.id;

    try {
      const response = await axios(config.scheduleAPIPath);
      const body = response.data;

      const schedules = [];

      body.data.forEach((schedule) => {
        schedules.push([{ text: schedule.name, url: schedule.link }]);
      });

      this.bot.sendMessage(chatId, 'Вибери факультет:', {
        reply_markup: JSON.stringify({ inline_keyboard: schedules })
      });
    } catch (error) {
      this.bot.sendMessage(chatId, errorMessage);
      console.error(error);
    }
  }
}

module.exports = BotController;
