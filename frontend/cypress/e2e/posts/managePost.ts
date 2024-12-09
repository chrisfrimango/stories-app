import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I have the following posts:", (dataTable) => {
  // Mock API response for posts
  cy.intercept("GET", "/api/posts", {
    statusCode: 200,
    body: {
      posts: dataTable.hashes().map((row, index) => ({
        id: index + 1,
        ...row,
        user_id: 1,
        created_at: new Date().toISOString()
      }))
    }
  }).as("getPosts");

  cy.visit("/blog");
  cy.wait("@getPosts");
});

When("I click on the edit button for {string}", (postTitle: string) => {
  cy.get(`[data-testid="post-${postTitle.toLowerCase().replace(' ', '-')}"]`)
    .find('[data-testid="edit-button"]')
    .click();
});

When("I update the following fields:", (dataTable) => {
  dataTable.hashes().forEach((row) => {
    const fieldId = `${row.Field.toLowerCase()}-input`;
    cy.get(`[data-testid="${fieldId}"]`)
      .clear()
      .type(row.Value);
  });
});

Then("I should see the updated post in the list", () => {
  cy.get('[data-testid="posts-list"]')
    .should("contain", "Updated First Post")
    .and("contain", "Updated content");
});
