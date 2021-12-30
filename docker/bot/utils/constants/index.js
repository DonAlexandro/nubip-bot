const config = {
  token: process.env.TOKEN,
  timetableAPIPath: process.env.API_URI + '/api/timetable',
  scheduleAPIPath: process.env.API_URI + '/api/schedule',
  newsAPIPath: process.env.API_URI + '/api/news'
};

const commands = {
  start: {
    command: '/start',
    description: 'Візьми і заволодій моїми алгоритмами на холодній підлозі',
    regex: /\/start/
  },
  info: {
    command: '/info',
    description: 'Відкриюся глибше лиш для тебе'
  },
  help: {
    command: '/help',
    description: 'Проблеми?'
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

const errorMessage = `Команда виконана не буде, бот прийняв іслам. Відправ ${commands.help.command}, можливо допоможе`;

const startOptions = {
  reply_markup: JSON.stringify({
    keyboard: [[commands.schedule.command], [commands.news.command, commands.timetable.command]]
  })
};

module.exports = { config, commands, startOptions };
