/// <reference types="cypress" />
import Login from "../../../src/pages/Login";

describe("Login Component", () => {
  beforeEach(() => {
    cy.mount(<Login />);
  });

  it("validates email format", () => {
    // Submit form without typing to trigger validation
    cy.get('[data-testid="login-button"]').click();

    // Check for email validation error
    cy.get('[data-testid="email-error"]')
      .should("be.visible")
      .and("contain", "Invalid email address");

    // Type invalid email and check error
    cy.get('[data-testid="email-input"]').type("invalid-email");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email-error"]')
      .should("be.visible")
      .and("contain", "Invalid email address");
  });

  it("validates password requirements", () => {
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("short");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="password-error"]')
      .should("be.visible")
      .and("contain", "Password must be at least 6 characters");
  });

  it("handles successful login", () => {
    cy.fixture("users.json").then((userData) => {
      cy.intercept("POST", `${Cypress.env("API_URL")}/users/login`, {
        statusCode: 200,
        body: userData.mockLoginResponse,
      }).as("loginRequest");

      cy.get('[data-testid="email-input"]').type("test@example.com");
      cy.get('[data-testid="password-input"]').type("Password123!");
      cy.get('[data-testid="login-button"]').click();

      cy.wait("@loginRequest");
    });
  });

  it("handles failed login", () => {
    cy.intercept("POST", `${Cypress.env("API_URL")}/users/login`, {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("failedLogin");

    cy.get('[data-testid="email-input"]').type("wrong@email.com");
    cy.get('[data-testid="password-input"]').type("WrongPass123!");
    cy.get('[data-testid="login-button"]').click();

    cy.wait("@failedLogin");
    cy.get('[data-testid="root-error"]')
      .should("be.visible")
      .and("contain", "Invalid credentials");
  });
});
