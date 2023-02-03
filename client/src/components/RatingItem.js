import React from 'react';

const RatingItem = ({ rating }) => {
    return (
        <div className="rating-item">
            <strong>{rating.ratingUser.name}</strong>: {rating.ratingValue} stars
            <p>{rating.comment}</p>
        </div>
    );
};

export default RatingItem;
