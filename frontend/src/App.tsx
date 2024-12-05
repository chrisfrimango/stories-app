import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/RouterConfig";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/authContext";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";
import { Loading } from "./ui/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";


const queryClient = new QueryClient();


const muiTheme = createTheme({
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MUIThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthProvider>
              <Suspense fallback={<Loading message="Loading application..." />}>
                <RouterProvider router={router} />
              </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
