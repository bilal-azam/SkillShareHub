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

      <ul>
        {results.map(result => (
          <li key={result.user._id}>
            {result.user.name} - {result.user.skills.map(skill => skill.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
