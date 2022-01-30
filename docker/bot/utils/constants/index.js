/**
 * Global configurations for bot
 */
const config = {
  token: process.env.TOKEN,
  nodeEnv: process.env.NODE_ENV,
  timetableAPIPath: process.env.API_URI + '/api/timetable',
  scheduleAPIPath: process.env.API_URI + '/api/schedule',
  newsAPIPath: process.env.API_URI + '/api/news'
};

/**
 * Bot commands with descriptions and regexes
 */
const commands = {
  start: {
    command: '/start',
    description: 'Візьми і заволодій моїми алгоритмами на холодній підлозі',
    regex: /\/start/
  },
  info: {
    command: '/info',
    description: 'Відкриюся глибше лиш для тебе',
    regex: /\/info/
  },
  help: {
    command: '/help',
    description: 'Проблеми?',
    regex: /\/help/
  },
  timetable: {
    command: 'Розпорядок пар/перерв',
    regex: /Розпорядок пар\/перерв/
  },
  schedule: {
    command: 'Розклад',
    regex: /Розклад/
  },
  news: {
    command: 'Новини',
    regex: /Новини/
  }
};

/**
 * Unhandled error response message
 */
const errorMessage = `Команда виконана не буде, бот прийняв іслам. Відправ ${commands.help.command}, можливо допоможе...`;

/**
 * Keyboard that will appear after /start command
 */
const startOptions = {
  reply_markup: JSON.stringify({
    keyboard: [[commands.schedule.command], [commands.news.command, commands.timetable.command]]
  })
};

module.exports = { config, commands, startOptions, errorMessage };
