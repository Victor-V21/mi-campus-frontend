import axios from 'axios';

export const miCampusApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // p.ej: http://localhost:5245/api
});

miCampusApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
