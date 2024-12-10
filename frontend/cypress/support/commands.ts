/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      createPost(
        title: string,
        content: string,
        category?: string
      ): Chainable<void>;
      mockAuthState(user?: User): Chainable<void>;
      setupMockProfile(): Chainable<void>;
      editMockProfile(): Chainable<void>;
      mockAuthUser(): Chainable<void>;
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

Cypress.Commands.add("setupMockProfile", () => {
  cy.fixture("profile.json").then((profileData) => {
    // Mock auth context
    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
      win.localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: profileData.id,
          username: profileData.username,
          email: profileData.email,
        })
      );
    });

    // Mock profile API call
    cy.intercept("GET", "**/api/profile/*", {
      statusCode: 200,
      body: profileData,
    }).as("getProfile");
  });
});

Cypress.Commands.add("editMockProfile", () => {
  cy.fixture("editProfile.json").then((profileData) => {
    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
      win.localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: profileData.currentProfile.id,
          username: profileData.currentProfile.username,
          email: profileData.currentProfile.email,
        })
      );
    });

    cy.intercept(
      "GET",
      `${Cypress.env("API_URL")}/api/profile/${
        profileData.currentProfile.idno
      }`,
      {
        statusCode: 200,
        body: profileData.currentProfile,
      }
    ).as("getProfile");
  });
});

Cypress.Commands.add("mockAuthUser", () => {
  cy.window().then((win) => {
    win.localStorage.setItem("auth_token", "fake-token");
    win.localStorage.setItem(
      "user_data",
      JSON.stringify({
        id: "1",
        username: "testuser",
        email: "test@example.com",
      })
    );
  });
});
