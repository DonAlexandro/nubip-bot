const { scheduleToReplyMarkup } = require('.');
const { testSchedules } = require('../constants/tests');
const { responseMessages } = require('../constants/');

describe('Utils functions', () => {
  it('should convert array with schedules to correct Telegram markup', () => {
    const schedules = scheduleToReplyMarkup(testSchedules);

    expect(schedules).toStrictEqual([
      [{ text: 'Schedule #1', url: 'https://nubip.edu.ua/path/to/schedule/1' }],
      [{ text: 'Schedule #2', url: 'https://nubip.edu.ua/path/to/schedule/2' }]
    ]);
  });

  it('should throw an error if provided data is not array', () => {
    expect(() => {
      scheduleToReplyMarkup({});
    }).toThrow(responseMessages.scheduleToReplyMarkup.wrongData);

    expect(() => {
      scheduleToReplyMarkup(123);
    }).toThrow(responseMessages.scheduleToReplyMarkup.wrongData);

    expect(() => {
      scheduleToReplyMarkup('123');
    }).toThrow(responseMessages.scheduleToReplyMarkup.wrongData);

    expect(() => {
      scheduleToReplyMarkup(false);
    }).toThrow(responseMessages.scheduleToReplyMarkup.wrongData);

    expect(() => {
      scheduleToReplyMarkup(null);
    }).toThrow(responseMessages.scheduleToReplyMarkup.wrongData);

    expect(() => {
      scheduleToReplyMarkup(undefined);
    }).toThrow(responseMessages.scheduleToReplyMarkup.wrongData);
  });

  it('should throw an error if some object does not contain required properties', () => {
    expect(() => {
      scheduleToReplyMarkup([{ propery: 'test', test: 'property' }]);
    }).toThrow(responseMessages.scheduleToReplyMarkup.missingProperties);
  });
});
