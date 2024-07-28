import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_API
});