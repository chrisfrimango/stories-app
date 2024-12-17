export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export interface AuthError {
  message: string;
  status: number;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface UserSession {
  id: string;
  email: string;
  username: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserSession | null;
  login: (token: string, userData: UserSession) => void;
  logout: () => void;
  isLoading: boolean;
}
