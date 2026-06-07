// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function registerUser(formData) {
  const { data } = await API.post('/auth/register', formData);
  return data;
}

export async function loginUser(formData) {
  const { data } = await API.post('/auth/login', formData);
  return data; // contains token and user
}
