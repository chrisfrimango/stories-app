import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";
interface UserSession {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserSession | null;
  login: (token: string, userData: UserSession) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UserSession | null>(() => {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  });

  const login = (token: string, userData: UserSession) => {
    setIsLoading(true);
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
