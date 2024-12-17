import { createContext } from "react";
import { AlertContextType } from "../../types/alertTypes";

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);
