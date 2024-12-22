import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("/login");
});

When("I enter valid credentials:", (dataTable: DataTable) => {
  const testCredentials = dataTable.hashes()[0];

  cy.fixture("testData/auth.json").then((userData) => {
    cy.intercept("POST", `${Cypress.env("API_URL")}/users/login`, {
      statusCode: 200,
      body: userData.mockLoginResponse,
    }).as("loginRequest");
  });

  cy.get('[data-testid="email-input"]').type(testCredentials.email);
  cy.get('[data-testid="password-input"]').type(testCredentials.password);
  cy.get('[data-testid="login-button"]').click();

  cy.wait("@loginRequest").then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
  });
});

Then("I should be redirected to the blog", () => {
  cy.url().should("include", "/blog");
});

Then("I should see my username in on the blog page", () => {
  cy.get('[data-testid="welcome-message"]')
    .should("be.visible")
    .and("contain", "Welcome testuser! Stay updated with our latest stories");
});

When("I enter invalid credentials:", (dataTable: DataTable) => {
  const credentials = dataTable.hashes()[0];

  cy.intercept("POST", `${Cypress.env("API_URL")}/users/login`, {
    statusCode: 401,
    body: { message: "Invalid credentials" },
  }).as("failedLogin");

  cy.get('[data-testid="email-input"]').type(credentials.email);
  cy.get('[data-testid="password-input"]').type(credentials.password);
  cy.get('[data-testid="login-button"]').click();

  cy.wait("@failedLogin");
});

Then("I should see an error message", () => {
  cy.get('[data-testid="root-error"]')
    .should("be.visible")
    .and("contain", "Invalid credentials");
});

Then("I should remain on the login page", () => {
  cy.url().should("include", "/login");
});
