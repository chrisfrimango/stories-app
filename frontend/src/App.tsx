import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/RouterConfig";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/authContext";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyle";
import { muiTheme } from "./styles/muiTheme";
import { Loading } from "./ui/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ModalProvider } from "./context/modalContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MUIThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthProvider>
            <ModalProvider>
              <Suspense fallback={<Loading message="Loading application..." />}>
                <RouterProvider router={router} />
              </Suspense>
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </MUIThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
