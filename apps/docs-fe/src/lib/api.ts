// /src/lib/api.ts

import axios from 'axios';
import {useAuth} from '../store/useAuth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//TODO: for testing until login with msg is implemented
// auto-logout on 401
/* api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // sessionStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(err);
  },
); */
