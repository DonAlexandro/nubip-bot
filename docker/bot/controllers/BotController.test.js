const axios = require('axios');
const { startOptions, config, errorMessage, responseMessages } = require('../utils/constants');
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
        }).toThrow(responseMessages.validate.wrongTelegramAPI);

        expect(() => {
          botController.validate(null);
        }).toThrow(responseMessages.validate.wrongTelegramAPI);

        expect(() => {
          botController.validate(undefined);
        }).toThrow(responseMessages.validate.wrongTelegramAPI);

        expect(() => {
          botController.validate(false);
        }).toThrow(responseMessages.validate.wrongTelegramAPI);
      });

      it('should throw an error if msg does not contain chat object', () => {
        expect(() => {
          botController.validate({});
        }).toThrow(responseMessages.validate.missedChatProperty);
      });

      it('should throw an error if msg does not contain chat object', () => {
        expect(() => {
          botController.validate({ chat: {} });
        }).toThrow(responseMessages.validate.missedIdProperty);
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

        expect(mockBot.sendMessage).toBeCalledWith(mockMessage.chat.id, responseMessages.start, startOptions);
      });
    });

    describe('info', () => {
      it('should send info message', () => {
        botController.info(mockMessage);

        expect(mockBot.sendMessage).toBeCalledWith(mockMessage.chat.id, responseMessages.info, { parse_mode: 'HTML' });
      });
    });

    describe('help', () => {
      it('should send help message', () => {
        mockBot.sendMessage = jest.fn();
        botController.help(mockMessage);

        expect(mockBot.sendMessage).toBeCalledWith(mockMessage.chat.id, responseMessages.help);
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
        expect(mockBot.sendMessage).toBeCalledWith(mockMessage.chat.id, responseMessages.schedule, {
          reply_markup: JSON.stringify({ inline_keyboard: schedules })
        });
      });
    });
  });
});
