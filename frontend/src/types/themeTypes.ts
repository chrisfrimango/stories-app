import { Theme } from "@mui/material/styles";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      textSecondary: string;
      textTertiary: string;
      cardBackground: string;
      hover: string;
      border: string;
      error: string;
    };
    fonts: {
      body: string;
      heading: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      primary?: string;
      secondary?: string;
      background?: string;
      text?: string;
      textSecondary?: string;
      textTertiary?: string;
      cardBackground?: string;
      hover?: string;
      border?: string;
      error?: string;
    };
    fonts?: {
      body?: string;
      heading?: string;
    };
  }
}

export interface CustomTheme extends Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    cardBackground: string;
    hover: string;
    border: string;
    error: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
}
