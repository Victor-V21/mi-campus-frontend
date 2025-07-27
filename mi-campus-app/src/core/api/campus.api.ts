import axios from 'axios';

export const authcampusApi = axios.create({
baseURL: import.meta.env.VITE_API_URL
});
