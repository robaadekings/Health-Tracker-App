const express = require('express');
const {
    upsertDailyLog,
    getDailyLog,
    deleteDailyLog,
    listLogs
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

module.exports = router;
