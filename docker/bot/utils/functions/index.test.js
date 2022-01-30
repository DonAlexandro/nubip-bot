const { scheduleToReplyMarkup } = require('.');
const { testSchedules } = require('../constants/tests');

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
    }).toThrow('Provide valid data to convert it to markup');

    expect(() => {
      scheduleToReplyMarkup(123);
    }).toThrow('Provide valid data to convert it to markup');

    expect(() => {
      scheduleToReplyMarkup('123');
    }).toThrow('Provide valid data to convert it to markup');

    expect(() => {
      scheduleToReplyMarkup(false);
    }).toThrow('Provide valid data to convert it to markup');

    expect(() => {
      scheduleToReplyMarkup(null);
    }).toThrow('Provide valid data to convert it to markup');

    expect(() => {
      scheduleToReplyMarkup(undefined);
    }).toThrow('Provide valid data to convert it to markup');
  });

  it('should throw an error if some object does not contain required properties', () => {
    expect(() => {
      scheduleToReplyMarkup([{ propery: 'test', test: 'property' }]);
    }).toThrow('Schedule object must contain name and link');
  });
});
