import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getAlumniData = async (id) => {
  try {
    const response = await api.get(`/alumni/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alumni data:', error);
    return null;
  }
};

export const getDonationStats = async () => {
  try {
    const response = await api.get('/donations/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    return null;
  }
};

export const makeDonation = async (userId, amount) => {
  try {
    const response = await api.post('/donations', { userId, amount });
    return response.data;
  } catch (error) {
    console.error('Error making donation:', error);
    return { success: false };
  }
};

export const getAlumniProfile = async (id) => {
  try {
    const response = await api.get(`/alumni/${id}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alumni profile:', error);
    return null;
  }
};

export const updateAlumniProfile = async (id, profileData) => {
  try {
    const response = await api.put(`/alumni/${id}/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating alumni profile:', error);
    return { success: false };
  }
};

export const getAllAlumni = async () => {
  try {
    const response = await api.get('/alumni');
    return response.data;
  } catch (error) {
    console.error('Error fetching all alumni:', error);
    return [];
  }
};

export const updateAlumni = async (id, alumniData) => {
  try {
    const response = await api.put(`/alumni/${id}`, alumniData);
    return response.data;
  } catch (error) {
    console.error('Error updating alumni:', error);
    return { success: false };
  }
};

export const deleteAlumni = async (id) => {
  try {
    const response = await api.delete(`/alumni/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting alumni:', error);
    return { success: false };
  }
};

export default api;