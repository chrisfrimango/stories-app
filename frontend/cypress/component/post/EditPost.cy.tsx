/// <reference types="cypress" />
import EditPost from "../../../src/components/post/EditPost";

describe("EditPost Component", () => {
  const mockPost = {
    id: 1,
    title: "Test Post 1",
    content: "This is test content 1",
    category_id: 1,
    username: "testuser",
    created_at: "2024-03-20T10:00:00Z",
    category_name: "Technology",
  };

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
      // Set the editingPost in the modal context through window
      win.initialModalState = {
        editingPost: mockPost,
      };
    });
  };

  beforeEach(() => {
    setupMockAuth();

    // Mock categories API call
    cy.intercept("GET", "**/api/categories", {
      statusCode: 200,
      body: {
        categories: [
          { id: 1, name: "Technology" },
          { id: 2, name: "Travel" },
          { id: 3, name: "Food" },
          { id: 4, name: "Lifestyle" },
        ],
      },
    }).as("getCategories");
  });

  it("renders with pre-filled data", () => {
    cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    // Verify pre-filled data
    cy.get('[data-testid="post-title-input"]')
      .should("be.visible")
      .and("have.value", "Test Post 1");
    cy.get('[data-testid="post-content-input"]')
      .should("be.visible")
      .and("have.value", "This is test content 1");
    cy.get('[data-testid="category-select"]')
      .should("be.visible")
      .and("have.value", "1");
  });

  it("handles successful post update", () => {
    // Mock successful update
    cy.intercept("PUT", "**/api/posts/*", {
      statusCode: 200,
      body: {
        post: {
          id: 1,
          title: "Updated Post",
          content: "Updated content",
          category_id: 2,
          username: "testuser",
          created_at: new Date().toISOString(),
          category_name: "Travel",
        },
      },
    }).as("updatePost");

    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<EditPost isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getCategories");

    // Update form fields
    cy.get('[data-testid="post-title-input"]').clear().type("Updated Post");
    cy.get('[data-testid="post-content-input"]')
      .clear()
      .type("Updated content");
    cy.get('[data-testid="category-select"]').select("2");

    // Submit form
    cy.get('[data-testid="edit-post-submit"]').click();
    cy.wait("@updatePost");

    // Verify success and modal close
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Post edited successfully");
    cy.get("@onCloseSpy").should("have.been.called");

    // check the new post is in the database
  });

  it("validates required fields", () => {
    cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    // Clear required fields
    cy.get('[data-testid="post-title-input"]').clear();
    cy.get('[data-testid="post-content-input"]').clear();

    // Try to submit
    cy.get('[data-testid="edit-post-submit"]').click();

    // Check validation messages
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Title must be at least 3 characters"
    );
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Content must be at least 10 characters"
    );
  });

  it("handles API errors", () => {
    // Mock failed update
    cy.intercept("PUT", "**/api/posts/*", {
      statusCode: 400,
      body: { message: "Failed to update post" },
    }).as("updatePostError");

    cy.mount(<EditPost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    cy.get('[data-testid="edit-post-submit"]').click();
    cy.wait("@updatePostError");

    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Failed to edit post");
  });

  it("closes modal when cancel is clicked", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<EditPost isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getCategories");

    cy.get('[data-testid="edit-post-cancel"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });
});
