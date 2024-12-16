import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

const testData = {
  post: {
    title: "",
    content: "",
    category: "",
  },
};
Given("I am logged in as {string}", (username: string) => {
  const email = `${username}@test.com`;
  const password = "Password123!";

  cy.loginViaUI(email, password);
});

Given("I am on the blog page", () => {
  cy.url().should("include", "/blog");
});

When("I click the {string} button", (buttonText: string) => {
  cy.contains('[data-testid="create-post-button"]', buttonText).click({
    multiple: true,
  });

  cy.get('[data-testid="create-post-modal"]').should("be.visible");
});

When("I fill in the following post details:", (dataTable: DataTable) => {
  const formData = dataTable.hashes().reduce((acc, row) => {
    acc[row.Field.toLowerCase()] = row.Value;
    return acc;
  }, {} as Record<string, string>);

  testData.post = {
    title: formData.title || "",
    content: formData.content || "",
    category: formData.category || "",
  };

  cy.intercept("POST", "**/api/posts", {
    statusCode: 201,
    body: {
      post: {
        id: 1,
        title: formData.title,
        content: formData.content,
        category_id: 1,
        category_name: formData.category,
        created_at: new Date().toISOString(),
        user_id: "1",
        username: "testuser",
      },
    },
  }).as("createPost");

  cy.intercept("GET", "**/api/posts/1", {
    statusCode: 200,
    body: {
      post: {
        id: 1,
        title: formData.title,
        content: formData.content,
        category_id: 1,
        category_name: formData.category,
        created_at: new Date().toISOString(),
        user_id: "1",
        username: "testuser",
      },
    },
  }).as("getPost");

  if (formData.title) {
    cy.get('[data-testid="post-title-input"]')
      .should("be.visible")
      .type(formData.title);
  }
  if (formData.content) {
    cy.get('[data-testid="post-content-input"]')
      .should("be.visible")
      .type(formData.content);
  }
  if (formData.category) {
    cy.get('[data-testid="category-select"]')
      .should("be.visible")
      .select(formData.category);
  }
});

When("I click {string}", (buttonText: string) => {
  switch (buttonText.toLowerCase()) {
    case "submit":
      cy.get('[data-testid="submit-post"]').should("be.visible").click();
      cy.wait("@createPost");
      break;
    case "cancel":
      cy.get('[data-testid="create-post-cancel"]').should("be.visible").click();
      break;
    default:
      cy.get(`button:contains("${buttonText}")`).should("be.visible").click();
  }
});

Then("I should see a success message {string}", (message: string) => {
  cy.get('[data-testid="alert"]').should("be.visible").and("contain", message);
});

Then("I should see my new post in the list", () => {
  cy.wait("@getPost");

  cy.get('[data-testid="post-detail-card"]').within(() => {
    cy.get('[data-testid="post-title"]')
      .should("be.visible")
      .and("contain", testData.post.title);

    cy.get('[data-testid="post-content"]')
      .should("be.visible")
      .and("contain", testData.post.content);

    cy.get('[data-testid="post-category"]')
      .should("be.visible")
      .and("contain", testData.post.category);

    cy.get('[data-testid="post-author"]')
      .should("be.visible")
      .and("contain", "testuser");
  });
});

When("I click {string} without filling the form", () => {
  cy.get('[data-testid="submit-post"]').should("be.visible").click();
});
Then("I should see validation errors for required fields", () => {
  cy.get('[data-testid="error-message"]')
    .should("be.visible")
    .and("not.be.empty");
});
