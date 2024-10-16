import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.response?.data?.message || 'An error occurred during login' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: error.response?.data?.message || 'An error occurred during registration' };
  }
};

export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
};

export const verifyToken = async () => {
  try {
    const response = await api.get('/auth/verify');
    return response.data;
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false };
  }
};