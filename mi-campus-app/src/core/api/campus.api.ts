import axios from 'axios';

export const miCampusApi= axios.create({
baseURL: import.meta.env.VITE_API_URL
});