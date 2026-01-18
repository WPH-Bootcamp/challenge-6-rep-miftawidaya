import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import type { ApiError } from '../types/common';

const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  console.warn('VITE_BASE_URL is not defined in environment variables');
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for data extraction and global error handling
api.interceptors.response.use(
  (response) => {
    // Return the data directly to simplify usage in services/hooks
    return response.data;
  },
  (error: AxiosError<ApiError>) => {
    const message =
      (error.response?.data as ApiError)?.status_message ||
      error.message ||
      'An unexpected error occurred';

    // Global error notification
    toast.error('API Error', {
      description: message,
    });

    if (error.response?.status === 401) {
      console.error('Unauthorized: Please check your API token.');
    }

    return Promise.reject(error);
  }
);
