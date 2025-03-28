import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data.token;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// User Operations
export const fetchUsers = async (page = 1) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch users');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete user');
  }
};