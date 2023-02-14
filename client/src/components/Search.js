import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Search = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [availability, setAvailability] = useState('');
  const [results, setResults] = useState([]);

  const onChange = (e) => setQuery(e.target.value);
  const onLocationChange = (e) => setLocation(e.target.value);
  const onProficiencyChange = (e) => setProficiency(e.target.value);
  const onAvailabilityChange = (e) => setAvailability(e.target.value);

  const onSearch = async () => {
    try {
      const res = await axios.get('/api/users/search', {
        params: {
          skill: query,
          location,
          proficiency,
          availability,
        },
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setResults(res.data);
      toast.success('Search completed successfully!');
    } catch (err) {
      toast.error('Failed to perform search. Please try again.');
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={onChange} placeholder="Search for a skill..." />
      <input type="text" value={location} onChange={onLocationChange} placeholder="Location..." />
      <select value={proficiency} onChange={onProficiencyChange}>
        <option value="">Select Proficiency</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <input type="text" value={availability} onChange={onAvailabilityChange} placeholder="Availability..." />
      <button onClick={onSearch}>Search</button>

      <div>
        <label>Sort by:</label>
        <select>
          <option value="matchStrength">Match Strength</option>
          <option value="name">Name</option>
        </select>
      </div>

      <ul>
        {results.map(result => (
          <li key={result.user._id}>
            {result.user.name} - Skills: {result.user.skills.map(skill => skill.name).join(', ')} (Match: {result.matchStrength})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
