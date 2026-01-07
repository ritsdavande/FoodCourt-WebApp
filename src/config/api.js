// API Configuration
// This file centralizes the API base URL configuration
// In production, it uses the REACT_APP_API_URL environment variable
// In development, it uses the proxy configured in package.json

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export default API_BASE_URL;
