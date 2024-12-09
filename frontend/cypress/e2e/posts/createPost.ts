import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as {string}", (username: string) => {
  cy.intercept("POST", "/api/users/login", {
    statusCode: 200,
    body: {
      token: "fake-jwt-token",
      user: {
        id: 1,
        username,
        email: "test@example.com"
      }
    }
  }).as("login");

  // Set auth token
  cy.window().then((win) => {
    win.localStorage.setItem("auth_token", "fake-jwt-token");
    win.localStorage.setItem("user", JSON.stringify({
      username,
      email: "test@example.com"
    }));
  });
});

When("I fill in the following post details:", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    switch(row.Field) {
      case "title":
        cy.get('[data-testid="post-title"]').type(row.Value);
        break;
      case "content":
        cy.get('[data-testid="post-content"]').type(row.Value);
        break;
      case "category":
        cy.get('[data-testid="post-category"]').select(row.Value);
        break;
    }
  });
});

Then("I should see validation errors for required fields", () => {
  cy.get('[data-testid="error-message"]').should("be.visible");
});
