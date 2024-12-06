import { createTheme } from "@mui/material";
import { theme } from "./theme";

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: theme.colors.primary,
    },
    background: {
      default: theme.colors.background,
      paper: theme.colors.cardBackground,
    },
    text: {
      primary: theme.colors.text,
      secondary: theme.colors.textSecondary,
    },
  },
});
