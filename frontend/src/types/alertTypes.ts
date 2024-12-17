export interface AlertState {
  message: string;
  severity: "success" | "error";
}

export interface AlertContextType {
  showAlert: (message: string, severity: "success" | "error") => void;
}
