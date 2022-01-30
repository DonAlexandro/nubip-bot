const axios = require('axios');
const { startOptions, config, errorMessage } = require('../utils/constants');
const { testNews, testSchedules } = require('../utils/constants/tests');
const { scheduleToReplyMarkup } = require('../utils/functions');
const BotController = require('./BotController');

jest.mock('axios');

describe('Bot Controller', () => {
  const mockBot = {
    sendMessage: jest.fn(),
    sendPhoto: jest.fn()
  };

  const mockMessage = {
    chat: {
      id: 'chat-id'
    }
  };

  describe('constructor', () => {
    it('should take Telegram API instance', () => {
      const botController = new BotController(mockBot);

      expect(botController.bot).toBe(mockBot);
    });

    it('should throw an error if Telegram API instance was not provided', () => {
      expect(() => {
        new BotController();
      }).toThrow('Bot instance is required');
    });
  });

  describe('methods', () => {
    let botController = null;

    beforeEach(() => {
      botController = new BotController(mockBot);
    });

    afterEach(() => {
      botController = null;
    });

    describe('validate', () => {
      it('should throw an error if msg is not a object', () => {
        expect(() => {
          botController.validate(123);
        }).toThrow('Provide valid Telegram API object');

        expect(() => {
          botController.validate(null);
        }).toThrow('Provide valid Telegram API object');

        expect(() => {
          botController.validate(undefined);
        }).toThrow('Provide valid Telegram API object');

        expect(() => {
          botController.validate(false);
        }).toThrow('Provide valid Telegram API object');
      });

      it('should throw an error if msg does not contain chat object', () => {
        expect(() => {
          botController.validate({});
        }).toThrow('Provided Telegram API object does not contain chat property');
      });

      it('should throw an error if msg does not contain chat object', () => {
        expect(() => {
          botController.validate({ chat: {} });
        }).toThrow('Provided Telegram API object does not contain chat id');
      });
    });

    describe('commandWrapper', () => {
      it('should resolve callback', () => {
        const callback = jest.fn();

        botController.commandWrapper(mockMessage, callback);

        expect(callback).toBeCalled();
      });

      it('should inform user when error happened', () => {
        const callback = jest.fn(() => {
          const message = 'Some message';
          // more logic...
          throw new Error(message);
        });

        botController.commandWrapper(mockMessage, callback);

        expect(mockBot.sendMessage).toBeCalledWith(mockMessage.chat.id, errorMessage);
      });
    });

    describe('start', () => {
      it('should send start message', () => {
        botController.start(mockMessage);

        expect(mockBot.sendMessage).toBeCalledWith(
          mockMessage.chat.id,
          'Привіт, гузлік. Шо ти, розклад шукаєш, новини хочеш глянути? Ну давай, жми на кнопки нижче',
          startOptions
        );
      });
    });

    describe('info', () => {
      it('should send info message', () => {
        botController.info(mockMessage);

        expect(mockBot.sendMessage).toBeCalledWith(
          mockMessage.chat.id,
          `<b>Хелло слейв'янін!</b>
Я був створений чисто як навчальний проєкт і зараз находжуся в альфа версії, тому поки що я примітивний, як тьолка з айфоном і чехлом з вушками.
В принципі, є велика імовірність, шо таким і залишуся, або якщо і стану кращим, то ніхто того не замітить :)
Всьо, можеш продовжувати дивитися свій тік-ток і лоскотати себе в штанах`,
          { parse_mode: 'HTML' }
        );
      });
    });

    describe('help', () => {
      it('should send help message', () => {
        mockBot.sendMessage = jest.fn();
        botController.help(mockMessage);

        expect(mockBot.sendMessage).toBeCalledWith(
          mockMessage.chat.id,
          `Якшо шось поламалося, то скоріше за все, то шось помінялося на сайті НУБіП, звідки я черпаю інформацію, але зараз вона по якійсь причині стала недоступна
Нам з тобою залишається надіятися, шо мій автор не забив BIG COCK на мене і згодом він все поправить`
        );
      });
    });

    describe('timetable', () => {
      it('should send image with timetable', async () => {
        const mockLinkToTimetable = 'https://nubip.website.ua/path/to/timetable';

        axios.get.mockResolvedValue({ data: { data: mockLinkToTimetable } });

        await botController.timetable(mockMessage);

        expect(axios.get).toBeCalledWith(config.timetableAPIPath);
        expect(mockBot.sendPhoto).toBeCalledWith(mockMessage.chat.id, mockLinkToTimetable);
      });
    });

    describe('news', () => {
      it('should send few messages with news', async () => {
        axios.get.mockResolvedValue({ data: { data: testNews } });
        mockBot.sendMessage = jest.fn();

        await botController.news(mockMessage);

        expect(axios.get).toBeCalledWith(config.newsAPIPath);
        expect(mockBot.sendMessage).toBeCalledTimes(2);
      });
    });

    describe('schedule', () => {
      it('should send links to schedules', async () => {
        axios.get.mockResolvedValue({ data: { data: testSchedules } });
        mockBot.sendMessage = jest.fn();

        await botController.schedule(mockMessage);

        const schedules = scheduleToReplyMarkup(testSchedules);

        expect(axios.get).toBeCalledWith(config.scheduleAPIPath);
        expect(mockBot.sendMessage).toBeCalledWith(mockMessage.chat.id, 'Вибери факультет:', {
          reply_markup: JSON.stringify({ inline_keyboard: schedules })
        });
      });
    });
  });
});
