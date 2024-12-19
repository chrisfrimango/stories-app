import { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
}

export interface NavBarProps {
  onCreatePost: () => void;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
}

export interface PageComponents {
  Home: React.ComponentType;
  Login: React.ComponentType;
  Register: React.ComponentType;
}
