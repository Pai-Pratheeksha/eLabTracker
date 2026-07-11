// src/pages/Login.jsx
import { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setError('');
    setIsLoading(true);

    try {
      const data = await loginUser(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem("role", data.user.role); 
      
      if (data.user.role === "student") {
        navigate("/student-dashboard");
      } else if (data.user.role === "faculty") {
        navigate("/faculty-dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='container'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Enter Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        <label>Enter Password:</label>
        <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={credentials.password}
    onChange={handleChange}
    required
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p>
  Don't have an account? <Link to="/register">Register</Link>
</p>
      </form>
    </div>
  );
};

export default Login;
