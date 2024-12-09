// Behåll eventuella andra existerande commands här
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): Chainable<void>;
      createPost(
        title: string,
        content: string,
        category?: string
      ): Chainable<void>;
      mockAuthState(user?: Record<string, any>): Chainable<void>;
    }
  }
}

// Authentication command
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.intercept("POST", "/api/users/login", {
    statusCode: 200,
    body: {
      token: "fake-token",
      user: { email, username: email.split("@")[0] },
    },
  }).as("loginRequest");

  cy.visit("/login");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.wait("@loginRequest");
});

// Mock auth state command
Cypress.Commands.add("mockAuthState", (user = null) => {
  const defaultUser = {
    id: 1,
    username: "testuser",
    email: "test@example.com",
  };

  cy.window().then((win) => {
    win.localStorage.setItem("auth_token", "fake-token");
    win.localStorage.setItem("user", JSON.stringify(user || defaultUser));
  });
});
