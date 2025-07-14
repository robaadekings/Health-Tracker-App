const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            height: user.height,
            weight: user.weight,
            goals: user.goals,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.age = req.body.age || user.age;
        user.height = req.body.height || user.height;
        user.weight = req.body.weight || user.weight;
        user.goals = req.body.goals || user.goals;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            age: updatedUser.age,
            height: updatedUser.height,
            weight: updatedUser.weight,
            goals: updatedUser.goals,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { getUserProfile, updateUserProfile };
