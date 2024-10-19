import axios from 'axios';

const API_URL = 'http://localhost:4000';

// User Registration
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/user-api/userregistration`, userData);
};

// Admin Registration
export const registerAdmin = async (adminData) => {
  return await axios.post(`${API_URL}/admin-api/adminregistration`, adminData);
};

// Author Registration
export const registerAuthor = async (authorData) => {
  return await axios.post(`${API_URL}/author-api/authorregistration`, authorData);
};

// Fetch Articles (common for all)
export const fetchArticles = async () => {
  return await axios.get(`${API_URL}/user-api/view-articles`);
};
