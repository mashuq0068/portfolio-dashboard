// axiosConfig.js
import axios from 'axios';

// Base URL for the API
const baseURL = 'http://localhost:5000/api'; 

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the instance for use across the app
export default axiosInstance;
