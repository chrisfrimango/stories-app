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
  const credentials = dataTable.hashes()[0];
  cy.get('[data-testid="email-input"]').type(credentials.email);
  cy.get('[data-testid="password-input"]').type(credentials.password);
  cy.get('[data-testid="login-button"]').click();
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
});
