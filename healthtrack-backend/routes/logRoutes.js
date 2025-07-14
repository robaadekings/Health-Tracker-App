const express = require('express');
const {
    upsertDailyLog,
    getDailyLog,
    deleteDailyLog,
    listLogs,
    getWeeklySummary,
    getMonthlySummary
} = require('../controllers/logController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

router.route('/')
    .get(listLogs)
    .post(upsertDailyLog);

router.route('/:date')
    .get(getDailyLog)
    .delete(deleteDailyLog);

router.get('/summary/weekly', getWeeklySummary);
router.get('/summary/monthly', getMonthlySummary);

module.exports = router;
