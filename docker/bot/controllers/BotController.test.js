const BotController = require('./BotController');

describe('Bot Controller', () => {
  const mockBot = () => {
    const bot = {};

    bot.sendMessage = jest.fn();
    bot.sendPhoto = jest.fn();

    return bot;
  };

  describe('constructor', () => {
    it('should take Telegram API instance', () => {
      const bot = mockBot();
      const botController = new BotController(bot);

      expect(botController.bot).toBe(bot);
    });

    it('should throw an error if Telegram API instance was not provided', () => {
      expect(() => {
        new BotController();
      }).toThrow('Bot instance is required');
    });
  });
});
