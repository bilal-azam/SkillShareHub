const express = require('express');
const router = express.Router();
const { submitRating, getRatingsForUser } = require('../controllers/ratingsController');
const auth = require('../middleware/auth');

// @route   POST /api/ratings
// @desc    Submit a new rating
// @access  Private
router.post('/', auth, submitRating);

// @route   GET /api/ratings/:userId
// @desc    Get all ratings for a user
// @access  Public
router.get('/:userId', getRatingsForUser);

module.exports = router;
