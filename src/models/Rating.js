const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Rating schema
const RatingSchema = new Schema({
    ratedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratingUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratingValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rating', RatingSchema);
