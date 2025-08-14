import axios from 'axios';

export const authCampusApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});