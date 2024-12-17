// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

// Alternatively you can use CommonJS syntax:
// require('./commands')
/// <reference types="cypress" />
import "./commands";
import "@cypress/code-coverage/support";

import { mount } from "cypress/react18";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AlertProvider } from "../../src/context/alert";
import { AuthProvider } from "../../src/context/auth";
import { ModalProvider } from "../../src/context/modal";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "../../src/styles/globalStyle";
import { theme as styledTheme } from "../../src/styles/theme";
import { muiTheme } from "../../src/styles/muiTheme";
import React from "react";

// Ensure window check happens before any component code
if (typeof window === "undefined") {
  throw new Error("Component tests must run in a browser environment");
}

interface TestWrapperProps {
  children: React.ReactNode;
}

export function TestWrapper({ children }: TestWrapperProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  // Get the initial state from window
  const modalState = (window as any).initialModalState;

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={muiTheme}>
          <StyledThemeProvider theme={styledTheme}>
            <GlobalStyle />
            <AuthProvider>
              <AlertProvider>
                <ModalProvider initialState={modalState}>
                  {children}
                </ModalProvider>
              </AlertProvider>
            </AuthProvider>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

// Mount command
Cypress.Commands.add("mount", (component: React.ReactNode) => {
  const wrapped = <TestWrapper>{component}</TestWrapper>;
  return mount(wrapped);
});

// Global error handler
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Cannot read properties of null")) {
    return false;
  }
  // Let other errors fail tests
  return true;
});

// Type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
