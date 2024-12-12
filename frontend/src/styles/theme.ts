import { DefaultTheme, createTheme } from "@mui/material/styles";

export const theme: DefaultTheme = {
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
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "992px",
  },
};
