import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const onChange = e => setQuery(e.target.value);

  const onSearch = async () => {
    try {
      const res = await axios.get(`/api/users/search?skill=${query}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setResults(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={onChange} placeholder="Search for a skill..." />
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
