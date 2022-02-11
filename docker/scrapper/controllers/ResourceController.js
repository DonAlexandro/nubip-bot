const ScheduleTemplate = require('../core/templates/resources/ScheduleTemplate');
const TimetableTemplate = require('../core/templates/resources/TimetableTemplate');
const NewsTemplate = require('../core/templates/resources/NewsTemplate');

/**
 * Controller for routing requested resources.
 */
class ResourceController {
  /**
   * This function searches for timetable image.
   *
   * @param {Request} req - Route's request object.
   * @param {Response} res - Route's response object.
   * @param {NextFunction} next - Next function to move information to the next middleware.
   */
  async timetable(req, res, next) {
    try {
      const data = await TimetableTemplate.init('/node/23920', 'timetable');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  /**
   * This function searches for schedules.
   *
   * @param {Request} req - Route's request object.
   * @param {Response} res - Route's response object.
   * @param {NextFunction} next - Next function to move information to the next middleware.
   */
  async schedule(req, res, next) {
    try {
      const data = await ScheduleTemplate.init('/node/23920', 'schedule');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  /**
   * This function searches for news.
   *
   * @param {Request} req - Route's request object.
   * @param {Response} res - Route's response object.
   * @param {NextFunction} next - Next function to move information to the next middleware.
   */
  async news(req, res, next) {
    try {
      const data = await NewsTemplate.init('/news', 'news');

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResourceController();
