import React, { useState } from 'react';
import axios from 'axios';

const RatingForm = ({ ratedUserId }) => {
    const [ratingValue, setRatingValue] = useState(1);
    const [comment, setComment] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/api/ratings', {
                ratedUser: ratedUserId,
                ratingValue,
                comment
            }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });

            console.log(res.data.message);
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Rating:</label>
            <select value={ratingValue} onChange={(e) => setRatingValue(e.target.value)}>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
            </select>

            <label>Comment:</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

            <button type="submit">Submit Rating</button>
        </form>
    );
};

export default RatingForm;
