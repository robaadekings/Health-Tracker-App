const DailyLog = require('../models/DailyLog');

// Create or update daily log
const upsertDailyLog = async (req, res) => {
    const { date, meals, waterIntake, sleepHours, exercise, weight } = req.body;

    const existingLog = await DailyLog.findOne({ user: req.user._id, date });

    if (existingLog) {
        existingLog.meals = meals || existingLog.meals;
        existingLog.waterIntake = waterIntake || existingLog.waterIntake;
        existingLog.sleepHours = sleepHours || existingLog.sleepHours;
        existingLog.exercise = exercise || existingLog.exercise;
        existingLog.weight = weight || existingLog.weight;

        const updatedLog = await existingLog.save();
        res.json(updatedLog);
    } else {
        const newLog = await DailyLog.create({
            user: req.user._id,
            date,
            meals,
            waterIntake,
            sleepHours,
            exercise,
            weight
        });
        res.status(201).json(newLog);
    }
};

// Get log by date
const getDailyLog = async (req, res) => {
    const { date } = req.params;
    const log = await DailyLog.findOne({ user: req.user._id, date });

    if (!log) {
        return res.status(404).json({ message: 'No log found for this date.' });
    }

    res.json(log);
};

// Delete log by date
const deleteDailyLog = async (req, res) => {
    const { date } = req.params;
    const log = await DailyLog.findOneAndDelete({ user: req.user._id, date });

    if (!log) {
        return res.status(404).json({ message: 'No log found to delete.' });
    }

    res.json({ message: 'Log deleted.' });
};

// List all logs (optional for dashboard)
const listLogs = async (req, res) => {
    const logs = await DailyLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
};

module.exports = {
    upsertDailyLog,
    getDailyLog,
    deleteDailyLog,
    listLogs
};
