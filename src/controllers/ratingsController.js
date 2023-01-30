const Rating = require('../models/Rating');
const User = require('../models/User');

// Submit a new rating
exports.submitRating = async (req, res) => {
    const { ratedUser, ratingValue, comment } = req.body;

    try {
        const newRating = new Rating({
            ratedUser,
            ratingUser: req.user.id,
            ratingValue,
            comment
        });

        await newRating.save();

        res.json({ message: 'Rating submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all ratings for a user
exports.getRatingsForUser = async (req, res) => {
    try {
        const ratings = await Rating.find({ ratedUser: req.params.userId })
            .populate('ratingUser', 'name')
            .sort({ createdAt: -1 });

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
