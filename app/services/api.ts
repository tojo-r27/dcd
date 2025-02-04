import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { useLoaderData, type LoaderFunction } from "react-router";
import { envData } from "~/config/env";

// Types
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

interface ErrorResponse {
  message: string;
  status: number;
  code?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  }
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Custom error class
class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

export const loader: LoaderFunction = async () => {
  const { BASE_URL } = await envData();
  return { BASE_URL }
}

export const createApiClient = () => {
  const { BASE_URL } = useLoaderData();
  let authToken: string | null = null;
  
  // Create Axios instance
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  axiosInstance.interceptors.request.use(
    (config) => {
      if (authToken && !config.url?.includes('/auth/login')) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 401) {
        authToken = null; // Clear token on auth error
      }
      if (error.response) {
        throw new ApiError(
          error.response.data?.message || 'An error occurred',
          error.response.status,
          error.response.data?.code
        );
      }
      throw new ApiError('Network error', 500);
    }
  );

  // Generic request handler
  const request = async <T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await axiosInstance(config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Unknown error occurred', 500);
    }
  };

  return {
    // Login method (no token required)
    login: async (credentials: LoginCredentials) => {
      try {
        const response = await request<LoginResponse>({
          url: '/auth/login',
          method: 'POST',
          data: credentials,
        });
        authToken = response.data.token; // Save token after successful login
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Logout method
    logout: () => {
      authToken = null;
    },

    // Check if user is authenticated
    isAuthenticated: () => !!authToken,

    // Protected methods (require token)
    protected: {
      get: <T>(url: string, config: Omit<AxiosRequestConfig, 'url' | 'method'> = {}) => {
        if (!authToken) throw new ApiError('Authentication required', 401);
        return request<T>({ ...config, url, method: 'GET' });
      },

      post: <T>(url: string, data?: any, config: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}) => {
        if (!authToken) throw new ApiError('Authentication required', 401);
        return request<T>({ ...config, url, method: 'POST', data });
      },

      put: <T>(url: string, data?: any, config: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}) => {
        if (!authToken) throw new ApiError('Authentication required', 401);
        return request<T>({ ...config, url, method: 'PUT', data });
      },

      patch: <T>(url: string, data?: any, config: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}) => {
        if (!authToken) throw new ApiError('Authentication required', 401);
        return request<T>({ ...config, url, method: 'PATCH', data });
      },

      delete: <T>(url: string, config: Omit<AxiosRequestConfig, 'url' | 'method'> = {}) => {
        if (!authToken) throw new ApiError('Authentication required', 401);
        return request<T>({ ...config, url, method: 'DELETE' });
      },
    },

    // Public methods (no token required)
    public: {
      get: <T>(url: string, config: Omit<AxiosRequestConfig, 'url' | 'method'> = {}) =>
        request<T>({ ...config, url, method: 'GET' }),

      post: <T>(url: string, data?: any, config: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> = {}) =>
        request<T>({ ...config, url, method: 'POST', data }),
    },
  }
}