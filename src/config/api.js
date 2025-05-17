// API configuration

// Set the base URL based on environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sloth-azure.vercel.app/api' // Production API URL
  : 'http://localhost:5000/api';         // Development API URL

// Log the API URL for debugging
console.log('API_URL:', API_URL);

export default API_URL; 