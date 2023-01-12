import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({ name: '', bio: '', newSkill: '', skillLevel: 'Beginner', skills: [] });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/users/profile', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setFormData({
        name: res.data.name,
        bio: res.data.bio,
        skills: res.data.skills,
        newSkill: '',
        skillLevel: 'Beginner'
      });
    };
    fetchProfile();
  }, []);

  const { name, bio, newSkill, skillLevel, skills } = formData;

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

  const addSkill = async () => {
    try {
      const res = await axios.post('/api/users/skills', { name: newSkill, level: skillLevel }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setFormData({ ...formData, skills: res.data, newSkill: '', skillLevel: 'Beginner' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const removeSkill = async skillId => {
    try {
      const res = await axios.delete(`/api/users/skills/${skillId}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setFormData({ ...formData, skills: res.data });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
        <textarea name="bio" value={bio} onChange={onChange} placeholder="Bio" />
        <button type="submit">Update Profile</button>
      </form>

      <div>
        <h3>Skills</h3>
        <ul>
          {skills.map(skill => (
            <li key={skill._id}>
              {skill.name} ({skill.level})
              <button onClick={() => removeSkill(skill._id)}>Remove</button>
            </li>
          ))}
        </ul>
        <input type="text" name="newSkill" value={newSkill} onChange={onChange} placeholder="New Skill" />
        <select name="skillLevel" value={skillLevel} onChange={onChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <button onClick={addSkill}>Add Skill</button>
      </div>
    </div>
  );
};

export default Profile;
