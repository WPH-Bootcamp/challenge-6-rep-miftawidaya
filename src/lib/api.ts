import axios, { AxiosError } from 'axios';
import type { TMDBErrorResponse } from '../types/movie';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<TMDBErrorResponse>) => {
    const message = error.response?.data?.status_message || error.message;

    // Log error for development/monitoring
    if (import.meta.env.DEV) {
      console.error(`[API Error] ${error.config?.url}:`, message);
    }

    return Promise.reject(error);
  }
);
