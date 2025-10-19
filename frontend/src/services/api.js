// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Vite proxy will handle forwarding to http://localhost:5000
  withCredentials: true, // If your backend uses cookies
});

export async function registerUser(formData) {
  const { data } = await API.post('/auth/register', formData);
  return data;
}

export async function loginUser(formData) {
  const { data } = await API.post('/auth/login', formData);
  return data; // contains token and user
}
