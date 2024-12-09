import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on my profile page", () => {
  cy.mockAuthState();
  cy.visit("/profile");
});

When("I update the following information:", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.get(`[data-testid="${row.Field}-input"]`)
      .clear()
      .type(row.Value);
  });
});

Then("I should see my updated information", () => {
  cy.get('[data-testid="profile-username"]')
    .should("contain", "updateduser");
  cy.get('[data-testid="profile-bio"]')
    .should("contain", "Updated bio");
});
