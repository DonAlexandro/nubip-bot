const TelegramAPI = require('node-telegram-bot-api');

const {
  config,
  commands: { start, info, help, timetable, news, schedule }
} = require('./utils/constants');
const BotController = require('./controllers/BotController');

const bot = new TelegramAPI(config.token, { polling: true });
const botController = new BotController(bot);

bot.setMyCommands([
  { command: start.command, description: start.description },
  { command: info.command, description: info.description },
  { command: help.command, description: help.description }
]);

bot.onText(start.regex, (msg) => botController.start(msg));
bot.onText(info.regex, (msg) => botController.info(msg));
bot.onText(help.regex, (msg) => botController.help(msg));
bot.onText(timetable.regex, (msg) => botController.timetable(msg));
bot.onText(news.regex, (msg) => botController.news(msg));
bot.onText(schedule.regex, (msg) => botController.schedule(msg));

bot.on('callback_query', (msg) => {
  const chatId = msg.message.chat.id;
  const data = msg.data;

  bot.sendDocument(chatId, data);
});
