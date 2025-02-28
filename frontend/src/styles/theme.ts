import { createTheme } from "@mui/material/styles";
import type { CustomTheme } from "../types/themeTypes";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#343a40",
    },
    secondary: {
      main: "#6c757d",
    },
    error: {
      main: "#dc3545",
    },
    background: {
      default: "#f8f9fa",
      paper: "#f8f9fa",
    },
    text: {
      primary: "#343a40",
      secondary: "#6c757d",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontFamily: "Georgia, serif",
    },
    h2: {
      fontFamily: "Georgia, serif",
    },
    h3: {
      fontFamily: "Georgia, serif",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  colors: {
    primary: "#343a40",
    secondary: "#6c757d",
    background: "#f8f9fa",
    text: "#343a40",
    textSecondary: "#6c757d",
    textTertiary: "#adb5bd",
    cardBackground: "#f8f9fa",
    hover: "#adb5bd",
    border: "#dee2e6",
    error: "#dc3545",
  },
  fonts: {
    body: "Arial, sans-serif",
    heading: "Georgia, serif",
  },
}) as CustomTheme;

export type { CustomTheme };
