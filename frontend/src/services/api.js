// services/api.js
import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseData = error.response?.data || {};
    const message = responseData.message || responseData.error || error.message || 'Request failed';

    if (error.response) {
      error.response.data = {
        ...responseData,
        message,
      };
    } else {
      error.response = {
        data: {
          message,
        },
      };
    }

    return Promise.reject(error);
  },
);

export function getAuthHeaders(contentType = null) {
  const headers = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  return headers;
}

export async function registerUser(formData) {
  const { data } = await API.post('/auth/register', formData);
  return data;
}

export async function loginUser(formData) {
  const { data } = await API.post('/auth/login', formData);
  return data; // contains token and user
}
