const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile);

module.exports = router;
