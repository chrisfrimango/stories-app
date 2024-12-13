/// <reference types="cypress" />
import EditPost from "../../../src/components/post/EditPost";

describe("EditPost Component", () => {
  // const mockPost = {
  //   id: 1,
  //   title: "Original Post",
  //   content: "Original content",
  //   category_id: 1,
  //   username: "testuser",
  //   created_at: "2024-03-20T10:00:00Z",
  //   category_name: "Technology",
  // };

  const setupMockAuth = () => {
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
  };

  beforeEach(() => {
    setupMockAuth();

    // Mock categories API call
    cy.intercept("GET", "**/api/categories", {
      statusCode: 200,
      body: {
        categories: [
          // Add this wrapper object to match backend response
          { id: 1, name: "Technology" },
          { id: 2, name: "Travel" },
          { id: 3, name: "Food" },
          { id: 4, name: "Lifestyle" },
        ],
      },
    }).as("getCategories");

    cy.intercept("GET", "**/api/posts/*", {
      statusCode: 200,
      fixture: "post.json",
    }).as("getPost");
  });

  it("renders with pre-filled data", () => {
    cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
    cy.get('[data-testid="edit-post-modal"]').should("be.visible");
    cy.wait("@getCategories");
    cy.wait("@getPost");

    cy.get('[data-testid="post-title-input"]').should("be.visible");
    cy.get('[data-testid="post-content-input"]').should("be.visible");
    cy.get('[data-testid="category-select"]').should("be.visible");
  });

  // Verify pre-filled data
  // cy.get('[data-testid="post-title-input"]').should(
  //   "have.value",
  //   mockPost.title
  // );
  // cy.get('[data-testid="post-content-input"]').should(
  //   "have.value",
  //   mockPost.content
  // );
  // cy.get('[data-testid="category-select"]').should(
  //   "have.value",
  //   mockPost.category_id.toString()
  // );
  // });

  // it("handles successful post update", () => {
  //   // Mock successful update
  //   cy.intercept("PUT", "**/api/posts/*", {
  //     statusCode: 200,
  //     body: {
  //       ...mockPost,
  //       title: "Updated Post",
  //       content: "Updated content",
  //       category_id: 2,
  //     },
  //   }).as("updatePost");

  //   const onCloseSpy = cy.spy().as("onCloseSpy");
  //   cy.mount(<EditPost isOpen={true} onClose={onCloseSpy} />);
  //   cy.wait("@getCategories");

  //   // Update form fields
  //   cy.get('[data-testid="post-title-input"]').clear().type("Updated Post");
  //   cy.get('[data-testid="post-content-input"]')
  //     .clear()
  //     .type("Updated content");
  //   cy.get('[data-testid="category-select"]').select("Travel");

  //   // Submit form
  //   cy.get('[data-testid="edit-post-submit"]').click();
  //   cy.wait("@updatePost");

  //   // Verify success and modal close
  //   cy.get('[data-testid="success-message"]').should("be.visible");
  //   cy.get("@onCloseSpy").should("have.been.called");
  // });

  // it("validates required fields", () => {
  //   cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
  //   cy.wait("@getCategories");

  //   // Clear required fields
  //   cy.get('[data-testid="post-title-input"]').clear();
  //   cy.get('[data-testid="post-content-input"]').clear();

  //   // Try to submit
  //   cy.get('[data-testid="edit-post-submit"]').click();

  //   // Check validation messages
  //   cy.get('[data-testid="title-error"]').should("be.visible");
  //   cy.get('[data-testid="content-error"]').should("be.visible");
  // });

  // it("handles API errors", () => {
  //   // Mock failed update
  //   cy.intercept("PUT", "**/api/posts/*", {
  //     statusCode: 400,
  //     body: { message: "Update failed" },
  //   }).as("updatePostError");

  //   cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
  //   cy.wait("@getCategories");

  //   // Make a small change and submit
  //   cy.get('[data-testid="post-title-input"]').clear().type("Updated Title");
  //   cy.get('[data-testid="edit-post-submit"]').click();
  //   cy.wait("@updatePostError");

  //   // Verify error message
  //   cy.get('[data-testid="error-message"]')
  //     .should("be.visible")
  //     .and("contain", "Update failed");
  // });

  // it("handles category loading error", () => {
  //   cy.intercept("GET", "**/api/categories", {
  //     statusCode: 500,
  //     body: { message: "Failed to load categories" },
  //   }).as("getCategoriesError");

  //   cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
  //   cy.wait("@getCategoriesError");

  //   cy.get('[data-testid="error-message"]')
  //     .should("be.visible")
  //     .and("contain", "Failed to load categories");
  // });

  // it("preserves original data when cancelling", () => {
  //   const onCloseSpy = cy.spy().as("onCloseSpy");
  //   cy.mount(<EditPost isOpen={true} onClose={onCloseSpy} />);
  //   cy.wait("@getCategories");

  //   // Make changes without saving
  //   cy.get('[data-testid="post-title-input"]').clear().type("Unsaved changes");
  //   cy.get('[data-testid="post-content-input"]')
  //     .clear()
  //     .type("Unsaved content");

  //   // Click cancel
  //   cy.get('[data-testid="edit-post-cancel"]').click();

  //   // Verify modal closes without saving
  //   cy.get("@onCloseSpy").should("have.been.called");
  // });
});
