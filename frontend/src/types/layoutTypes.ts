export interface HeaderProps {
  children: React.ReactNode;
}

export interface NavBarProps {
  onCreatePost: () => void;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
}

export interface AlertState {
  message: string;
  severity: "success" | "error";
}

export interface AlertContextType {
  showAlert: (message: string, severity: "success" | "error") => void;
}

export interface PageComponents {
  Home: React.ComponentType;
  Login: React.ComponentType;
  Register: React.ComponentType;
}
