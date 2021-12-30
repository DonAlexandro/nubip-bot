const TelegramAPI = require('node-telegram-bot-api');
const axios = require('axios');

const {
  config,
  commands: { start, info, help, timetable, news },
  startOptions
} = require('./utils/constants');

const bot = new TelegramAPI(config.token, { polling: true });

bot.setMyCommands([
  { command: start.command, description: start.description },
  { command: info.command, description: info.description },
  { command: help.command, description: help.description }
]);

bot.onText(start.regex, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    'Привіт, гузлік. Шо ти, розклад шукаєш, новини хочеш глянути? Ну давай, жми на кнопки нижче',
    startOptions
  );
});

bot.onText(timetable.regex, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios(config.timetableAPIPath);
    const body = response.data;

    bot.sendPhoto(chatId, body.data);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, errorMessage);
  }
});

bot.onText(news.regex, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios(config.newsAPIPath);
    const body = response.data;

    body.data.forEach((article) => {
      bot.sendMessage(
        chatId,
        `<b>${article.title}</b> \n <i>${article.date}</i> \n\n ${article.text} \n <a href="${article.link}">Читати продовження...</a>`,
        { parse_mode: 'HTML' }
      );
    });
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, errorMessage);
  }
});
