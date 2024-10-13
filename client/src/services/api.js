import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const lipidProfiles = {
  getAll: (userId) => api.get(`/lipid-profiles/${userId}`),
  create: (data) => api.post('/lipid-profiles', data),
};

export const runningMetrics = {
  getAll: (userId) => api.get(`/running-metrics/${userId}`),
  create: (data) => api.post('/running-metrics', data),
};

export const bodyComposition = {
  getAll: (userId) => api.get(`/body-composition/${userId}`),
  create: (data) => api.post('/body-composition', data),
};

export default api;