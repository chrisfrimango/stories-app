import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as {string}", (username: string) => {
  const email = `${username}@test.com`;
  const password = "Password123!";
  cy.loginViaUI(email, password);
});

Given("I have the following posts:", (dataTable: DataTable) => {
  cy.intercept("GET", "**/api/posts", {
    statusCode: 200,
    body: {
      posts: dataTable.hashes().map((row, index) => ({
        id: index + 1,
        title: row.title,
        content: row.content,
        category_name: row.category,
        user_id: row.author === "me" ? 1 : 2,
        username: row.author === "me" ? "testuser" : "otheruser",
        created_at: new Date().toISOString(),
      })),
    },
  }).as("getPosts");

  cy.visit("/blog");
  cy.wait("@getPosts");
  cy.get('[data-testid="post-card"]').should("exist");
});

When("I click the {string} filter button", (filterType: string) => {
  cy.get(`[data-testid="filter-${filterType}"]`).click();
  cy.get('[data-testid="post-card"]').should("exist");
});

Then("I should only see posts by {string}", (author: string) => {
  cy.get('[data-testid="post-card"]').each(($card) => {
    if (author === "me") {
      cy.wrap($card)
        .find('[data-testid="post-author"]')
        .should("have.text", "By testuser");
    } else {
      cy.wrap($card)
        .find('[data-testid="post-author"]')
        .should("not.have.text", "By testuser");
    }
  });
});

Then("I should see all posts", () => {
  cy.get('[data-testid="post-card"]').should("have.length.at.least", 1);
});
