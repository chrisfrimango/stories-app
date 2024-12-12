import axios, { AxiosError } from "axios";
import {
  Credentials,
  AuthResponse,
  AuthError,
  RegisterData,
  RegisterResponse,
} from "../types/authTypes";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authService = {
  login: async (credentials: Credentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        "/users/login",
        credentials
      );

      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }
      return response.data;
    } catch (error) {
      const authError: AuthError = {
        message:
          error instanceof AxiosError
            ? error.response?.data?.message || "Login failed"
            : "Login failed",
        status:
          error instanceof AxiosError ? error.response?.status || 500 : 500,
      };
      throw authError;
    }
  },

  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/users/register", data);
    return response.data;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },

  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },
};

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
