const { Router } = require('express');

const ResourceController = require('../controllers/ResourceController');

const router = Router();

router.get('/timetable', ResourceController.timetable);
router.get('/schedule', ResourceController.schedule);
router.get('/news', ResourceController.news);

module.exports = router;
