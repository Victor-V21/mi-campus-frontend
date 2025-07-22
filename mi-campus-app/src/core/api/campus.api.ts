import axios from 'axios';

export const personsApi = axios.create({
baseURL: import.meta.env.VITE_API_URL
});
