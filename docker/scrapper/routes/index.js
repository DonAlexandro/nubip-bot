const { Router } = require('express');

const ResourceController = require('../controllers/ResourceController');

const router = Router();

router.get('/timetable', (req, res, next) => ResourceController.timetable(req, res, next));
router.get('/schedule', (req, res, next) => ResourceController.schedule(req, res, next));
router.get('/news', (req, res, next) => ResourceController.news(req, res, next));

module.exports = router;
