// src/pages/Register.jsx
import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Enter Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Enter Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Enter Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <label>Select Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
