import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({ name: '', bio: '', skills: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/users/profile', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setFormData({
        name: res.data.name,
        bio: res.data.bio,
        skills: res.data.skills.join(', ')
      });
    };
    fetchProfile();
  }, []);

  const { name, bio, skills } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const skillsArray = skills.split(',').map(skill => skill.trim());
    try {
      await axios.put('/api/users/profile', { name, bio, skills: skillsArray }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      console.log('Profile updated');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
      <textarea name="bio" value={bio} onChange={onChange} placeholder="Bio" />
      <input type="text" name="skills" value={skills} onChange={onChange} placeholder="Skills (comma-separated)" />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
