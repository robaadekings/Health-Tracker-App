const DailyLog = require('../models/DailyLog');

// Create or Update daily log
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

// Get specific daily log by date
const getDailyLog = async (req, res) => {
    const { date } = req.params;
    const log = await DailyLog.findOne({ user: req.user._id, date });

    if (!log) {
        return res.status(404).json({ message: 'No log found for this date.' });
    }

    res.json(log);
};

// Delete specific daily log by date
const deleteDailyLog = async (req, res) => {
    const { date } = req.params;
    const log = await DailyLog.findOneAndDelete({ user: req.user._id, date });

    if (!log) {
        return res.status(404).json({ message: 'No log found to delete.' });
    }

    res.json({ message: 'Log deleted.' });
};

// List all logs (for dashboard history)
const listLogs = async (req, res) => {
    const logs = await DailyLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(logs);
};

// Weekly Summary (Last 7 Days)
const getWeeklySummary = async (req, res) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    const logs = await DailyLog.find({
        user: req.user._id,
        date: { $gte: startDate, $lte: endDate }
    });

    const summary = {
        totalWater: 0,
        avgSleep: 0,
        avgWeight: 0,
        exerciseCount: 0
    };

    logs.forEach(log => {
        summary.totalWater += log.waterIntake;
        summary.avgSleep += log.sleepHours;
        summary.avgWeight += log.weight;
        if (log.exercise) summary.exerciseCount++;
    });

    const days = logs.length || 1;
    summary.avgSleep = +(summary.avgSleep / days).toFixed(1);
    summary.avgWeight = +(summary.avgWeight / days).toFixed(1);

    res.json(summary);
};

// Monthly Summary (Last 30 Days)
const getMonthlySummary = async (req, res) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 29);

    const logs = await DailyLog.find({
        user: req.user._id,
        date: { $gte: startDate, $lte: endDate }
    }).sort('date');

    const response = logs.map(log => ({
        date: log.date,
        waterIntake: log.waterIntake,
        sleepHours: log.sleepHours,
        weight: log.weight,
        exercise: log.exercise
    }));

    res.json(response);
};

module.exports = {
    upsertDailyLog,
    getDailyLog,
    deleteDailyLog,
    listLogs,
    getWeeklySummary,
    getMonthlySummary
};
