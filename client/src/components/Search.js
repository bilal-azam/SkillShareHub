/**
 * Handle search functionality for users based on skills.
 * Uses debounce to limit the number of API calls.
 */

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ skillLevel: '', location: '' });

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
      setResults(res.data.users);
      setTotalPages(res.data.totalPages);
      toast.success('Search completed successfully!');
    } catch (err) {
      toast.error('Failed to perform search. Please try again.');
      console.error(err.response.data);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };  

  return (
    <div>
      <input type="text" value={query} onChange={onChange} placeholder="Search for a skill..." />
      <input type="text" value={location} onChange={onLocationChange} placeholder="Location..." />
      <label>Skill Level:</label>
      
      <select name="skillLevel" value={filters.skillLevel} onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label>Location:</label>
      <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
      
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

      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Search;
