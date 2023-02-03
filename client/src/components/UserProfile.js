import React from 'react';
import useFetch from '../hooks/useFetch';
import RatingForm from './RatingForm';
import RatingItem from './RatingItem';
import './UserProfile.css';

const UserProfile = ({ match }) => {
    const { data: user, loading: userLoading, error: userError } = useFetch(`/api/users/${match.params.id}`);
    const { data: ratings, loading: ratingsLoading, error: ratingsError } = useFetch(`/api/ratings/${match.params.id}`);

    if (userLoading || ratingsLoading) return <p>Loading...</p>;
    if (userError) return <p>{userError}</p>;
    if (ratingsError) return <p>{ratingsError}</p>;

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
                    <RatingItem key={rating._id} rating={rating} />
                ))}
            </ul>

            <RatingForm ratedUserId={match.params.id} />
        </div>
    );
};

export default UserProfile;
