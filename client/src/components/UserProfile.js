import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingForm from './RatingForm';
import './css/UserProfile.css';

const UserProfile = ({ match }) => {
    const [user, setUser] = useState({});
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${match.params.id}`);
                setUser(res.data);
            } catch (err) {
                console.error(err.response.data.message);
            }
        };

        const fetchRatings = async () => {
            try {
                const res = await axios.get(`/api/ratings/${match.params.id}`);
                setRatings(res.data);
            } catch (err) {
                console.error(err.response.data.message);
            }
        };

        fetchUser();
        fetchRatings();
    }, [match.params.id]);

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <h3>Skills:</h3>
            <ul>
                {user.skills && user.skills.map(skill => (
                    <li key={skill._id}>{skill.name} - {skill.level}</li>
                ))}
            </ul>

            <h3>Ratings:</h3>
            <ul>
                {ratings.map(rating => (
                    <li key={rating._id}>
                        {rating.ratingUser.name}: {rating.ratingValue} stars
                        <p>{rating.comment}</p>
                    </li>
                ))}
            </ul>

            <RatingForm ratedUserId={match.params.id} />
        </div>
    );
};

export default UserProfile;
