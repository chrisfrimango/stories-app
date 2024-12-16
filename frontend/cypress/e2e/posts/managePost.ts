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

Given("I have the following posts:", (dataTable: DataTable) => {
  // Mock API response for posts
  cy.intercept("GET", "**/api/posts", {
    statusCode: 200,
    body: {
      posts: dataTable.hashes().map((row, index) => ({
        id: index + 1,
        title: row.title,
        content: row.content,
        category_name: row.category,
        user_id: 1,
        username: "testuser",
        created_at: new Date().toISOString(),
      })),
    },
  }).as("getPosts");

  // Ensure user is properly authenticated with matching ID
  cy.window().then((win) => {
    win.localStorage.setItem(
      "user_data",
      JSON.stringify({
        id: 1,
        username: "testuser",
        email: "testuser@test.com",
      })
    );
  });

  cy.visit("/blog");
  cy.wait("@getPosts");

  // Verify posts are loaded and visible
  cy.get('[data-testid="post-card"]')
    .should("have.length", dataTable.hashes().length)
    .first()
    .should("be.visible")
    .find('[data-testid="post-title"]')
    .should("be.visible");
});

When("I click on the edit button for {string}", (postTitle: string) => {
  // Add a small delay to ensure the DOM is fully rendered
  cy.wait(500);

  // First find the post card/container
  cy.get('[data-testid="post-card"]')
    .contains(postTitle)
    .parents('[data-testid="post-card"]')
    .within(() => {
      // Verify the action links are visible before trying to click
      cy.get('[data-testid="post-action-links"]').should("be.visible");
      cy.get('[data-testid="edit-button"]')
        .should("be.visible")
        .click({ force: true });
    });

  cy.get('[data-testid="edit-post-modal"]').should("be.visible");
});

When("I update the following fields:", (dataTable: DataTable) => {
  const formData = dataTable.hashes().reduce((acc, row) => {
    acc[row.Field.toLowerCase()] = row.Value;
    return acc;
  }, {} as Record<string, string>);

  testData.post = {
    title: formData.title || "",
    content: formData.content || "",
    category: formData.category || "",
  };

  // Mock the update API call
  cy.intercept("PUT", "**/api/posts/*", {
    statusCode: 200,
    body: {
      post: {
        id: 1,
        title: formData.title,
        content: formData.content,
        category_name: formData.category,
        user_id: "1",
        username: "testuser",
        created_at: new Date().toISOString(),
      },
    },
  }).as("updatePost");

  if (formData.title) {
    cy.get('[data-testid="post-title-input"]')
      .should("be.visible")
      .clear()
      .type(formData.title);
  }
  if (formData.content) {
    cy.get('[data-testid="post-content-input"]')
      .should("be.visible")
      .clear()
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
    case "save changes":
      // First intercept the GET request that will happen after update
      cy.intercept("GET", "**/api/posts", {
        statusCode: 200,
        body: {
          posts: [
            {
              id: 1,
              title: testData.post.title,
              content: testData.post.content,
              category_name: testData.post.category,
              user_id: 1,
              username: "testuser",
              created_at: new Date().toISOString(),
            },
            // Keep the second post to maintain the list
            {
              id: 2,
              title: "Second Post",
              content: "Test content 2",
              category_name: "Travel",
              user_id: 1,
              username: "testuser",
              created_at: new Date().toISOString(),
            },
          ],
        },
      }).as("getPosts");

      // Then click submit and wait for both requests
      cy.get('[data-testid="edit-post-submit"]').should("be.visible").click();
      cy.wait("@updatePost");
      cy.wait("@getPosts"); // Wait for the GET request to complete
      break;
    default:
      cy.get(`button:contains("${buttonText}")`).should("be.visible").click();
  }
});

When("I click on the delete button for {string}", (postTitle: string) => {
  // First setup all intercepts
  cy.intercept("DELETE", "**/api/posts/*", {
    statusCode: 204,
  }).as("deletePost");

  cy.intercept("GET", "**/api/posts", {
    statusCode: 200,
    body: {
      posts: [
        {
          id: 1,
          title: "First Post",
          content: "Test content 1",
          category_name: "Technology",
          user_id: 1,
          username: "testuser",
          created_at: new Date().toISOString(),
        },
      ],
    },
  }).as("getPosts");

  // Setup window.confirm stub BEFORE finding and clicking the delete button
  cy.window().then((win) => {
    cy.stub(win, "confirm").as("confirmStub").returns(true);
  });

  // Wait for posts to be loaded and verify Second Post exists
  cy.get('[data-testid="post-card"]')
    .should("have.length", 2)
    .then(($cards) => {
      // Verify we can find the post we want to delete
      const hasPost = Array.from($cards).some((card) =>
        card.textContent?.includes(postTitle)
      );
      cy.wrap(hasPost).should("be.true");
    });

  // Now find and click the delete button
  cy.get('[data-testid="post-card"]')
    .contains(postTitle)
    .parents('[data-testid="post-card"]')
    .within(() => {
      cy.get('[data-testid="post-delete-link"]').should("be.visible").click();
    });
});

When("I confirm the deletion", () => {
  // Verify the confirm was called
  cy.get("@confirmStub").should("have.been.calledOnce");

  // Now wait for both requests in sequence
  cy.wait("@deletePost", { timeout: 10000 });
  cy.wait("@getPosts", { timeout: 10000 });
});

Then("I should see the updated post in the list", () => {
  // Find the first post card since it should be the updated one
  cy.get('[data-testid="post-card"]')
    .first()
    .within(() => {
      cy.get('[data-testid="post-title"]')
        .should("be.visible")
        .and("have.text", testData.post.title);
      cy.get('[data-testid="post-content"]')
        .should("be.visible")
        .and("contain", testData.post.content);
      cy.get('[data-testid="post-category"]')
        .should("be.visible")
        .and("have.text", testData.post.category);
    });
});

Then("I should see a {string} message", (message: string) => {
  cy.get('[data-testid="alert"]').should("be.visible").and("contain", message);
});

Then("{string} should not be visible in the list", (postTitle: string) => {
  // Add a longer delay to allow the UI to update
  cy.wait(1000);

  // First verify we have posts loaded
  cy.get('[data-testid="post-card"]').should("exist");

  // Then verify the specific post is gone
  cy.contains(postTitle).should("not.exist");
});
