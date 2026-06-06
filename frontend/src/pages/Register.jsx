// src/pages/Register.jsx
import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    semester: '',
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

  const [showPassword, setShowPassword] = useState(false);

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
        <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEye /> : <FaEyeSlash />}
  </span>
</div>
        <label>Select Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        {formData.role === 'student' && (
  <>
    <label>Select Semester:</label>
    <select
      name="semester"
      value={formData.semester}
      onChange={handleChange}
      required
    >
      <option value="">Select Semester</option>
      <option value="1">Semester 1</option>
      <option value="2">Semester 2</option>
      <option value="3">Semester 3</option>
      <option value="4">Semester 4</option>
      <option value="5">Semester 5</option>
      <option value="6">Semester 6</option>
      <option value="7">Semester 7</option>
      <option value="8">Semester 8</option>
    </select>
  </>
)}
        <button type="submit">Register</button>
        <p>
  Already have an account? <Link to="/login">Login</Link>
</p>
      </form>
    </div>
  );
};

export default Register;
