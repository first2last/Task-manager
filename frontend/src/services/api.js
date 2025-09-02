import axios from 'axios';

// Correct way to handle environment-based URLs
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://task-manager-9ua1.onrender.com/api'  // Add /api here
  : 'http://localhost:5000/api';  // Add /api here too

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login instead of reload
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
