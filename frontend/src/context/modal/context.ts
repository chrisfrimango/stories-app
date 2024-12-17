import { createContext } from "react";
import { ModalContextType } from "../../types/modalTypes";

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
