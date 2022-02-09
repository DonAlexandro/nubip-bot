/**
 * Global configurations for bot.
 */
const config = {
  token: process.env.TOKEN,
  nodeEnv: process.env.NODE_ENV,
  timetableAPIPath: process.env.API_URI + '/api/timetable',
  scheduleAPIPath: process.env.API_URI + '/api/schedule',
  newsAPIPath: process.env.API_URI + '/api/news'
};

/**
 * Bot commands with descriptions and regexes.
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

const responseMessages = {
  start: 'Привіт, гузлік. Шо ти, розклад шукаєш, новини хочеш глянути? Ну давай, жми на кнопки нижче',
  info: `<b>Хелло слейв'янін!</b>
Я був створений чисто як навчальний проєкт і зараз знаходжуся в бета версії, тому поки що я примітивний, як тьолка з айфоном і чехлом з вушками.
В принципі, є велика імовірність, шо таким і залишуся, або якщо і стану кращим, то ніхто того не замітить :)
Всьо, можеш продовжувати дивитися свій тік-ток і лоскотати себе в штанах`,
  help: `Якшо шось поламалося, то скоріше за все, то шось помінялося на сайті НУБіП, звідки я черпаю інформацію, але зараз вона по якійсь причині стала недоступна
Нам з тобою залишається надіятися, шо мій автор не забив BIG COCK на мене і згодом він все поправить`,
  schedule: 'Вибери факультет:',
  validate: {
    wrongTelegramAPI: 'Provide valid Telegram API object',
    missedChatProperty: 'Provided Telegram API object does not contain chat property',
    missedIdProperty: 'Provided Telegram API object does not contain chat id'
  },
  scheduleToReplyMarkup: {
    wrongData: 'Provide valid data to convert it to markup',
    missingProperties: 'Schedule object must contain name and link'
  }
};

/**
 * Unhandled error response message.
 */
const errorMessage = `Команда виконана не буде, бот прийняв іслам. Відправ ${commands.help.command}, можливо допоможе...`;

/**
 * Keyboard that will appear after /start command.
 */
const startOptions = {
  reply_markup: JSON.stringify({
    keyboard: [[commands.schedule.command], [commands.news.command, commands.timetable.command]]
  })
};

module.exports = { config, commands, startOptions, errorMessage, responseMessages };
