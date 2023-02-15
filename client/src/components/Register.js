// Register.js

import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      // Proceed with registration
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} required placeholder="Name" />
      <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
      <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
      <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required placeholder="Confirm Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
