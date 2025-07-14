const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    meals: {
        type: String,
        default: ''
    },
    waterIntake: {
        type: Number,
        default: 0 // ml
    },
    sleepHours: {
        type: Number,
        default: 0
    },
    exercise: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DailyLog', dailyLogSchema);
