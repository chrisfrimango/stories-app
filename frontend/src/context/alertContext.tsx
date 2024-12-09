import React, { createContext, useContext, useState } from "react";
import { Alert } from "@mui/material";
import { AlertState, AlertContextType } from "../types/layoutTypes";

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = (message: string, severity: "success" | "error") => {
    setAlert({ message, severity });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          data-testid="alert"
          severity={alert.severity}
          sx={{
            position: "fixed",
            top: 30,
            left: 20,
            zIndex: 2000,
            minWidth: "300px",
            transition: "all 0.5s ease-in-out",
          }}
        >
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
