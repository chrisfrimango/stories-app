/// <reference types="cypress" />
import CreatePost from "../../../src/components/post/CreatePost";

describe("CreatePost Component", () => {
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
      body: [
        { id: 1, name: "Technology" },
        { id: 2, name: "Travel" },
      ],
    }).as("getCategories");
  });

  it("renders modal content correctly", () => {
    cy.mount(<CreatePost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    // Check modal elements
    cy.get('[data-testid="create-post-modal"]').should("be.visible");
    cy.get('[data-testid="post-title-input"]').should("be.visible");
    cy.get('[data-testid="post-content-input"]').should("be.visible");
    cy.get('[data-testid="category-select"]').should("be.visible");

    // Verify category options
    cy.get('[data-testid="category-select"]').within(() => {
      cy.contains("Technology").should("exist");
      cy.contains("Travel").should("exist");
    });
  });

  it("validates required fields", () => {
    cy.mount(<CreatePost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    // Try to submit empty form
    cy.get('[data-testid="create-post-submit"]').click();

    // Check validation messages
    cy.get('[data-testid="title-error"]').should("be.visible");
    cy.get('[data-testid="content-error"]').should("be.visible");
  });

  it("handles successful post creation", () => {
    // Mock successful post creation
    cy.intercept("POST", "**/api/posts", {
      statusCode: 201,
      body: {
        id: 1,
        title: "Test Post",
        content: "Test Content",
        category_id: 1,
        created_at: new Date().toISOString(),
        user_id: 1,
      },
    }).as("createPost");

    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<CreatePost isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getCategories");

    // Fill form
    cy.get('[data-testid="post-title-input"]').type("Test Post");
    cy.get('[data-testid="post-content-input"]').type("Test Content");
    cy.get('[data-testid="category-select"]').select("Technology");

    // Submit form
    cy.get('[data-testid="create-post-submit"]').click();
    cy.wait("@createPost");

    // Verify success message and modal close
    cy.get('[data-testid="success-message"]').should("be.visible");
    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("handles API errors", () => {
    // Mock failed API call
    cy.intercept("POST", "**/api/posts", {
      statusCode: 400,
      body: { message: "Failed to create post" },
    }).as("createPostError");

    cy.mount(<CreatePost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    // Fill form
    cy.get('[data-testid="post-title-input"]').type("Test Post");
    cy.get('[data-testid="post-content-input"]').type("Test Content");
    cy.get('[data-testid="category-select"]').select("Technology");

    // Submit form
    cy.get('[data-testid="create-post-submit"]').click();
    cy.wait("@createPostError");

    // Verify error message
    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "Failed to create post");
  });

  it("handles category loading error", () => {
    // Mock failed categories API call
    cy.intercept("GET", "**/api/categories", {
      statusCode: 500,
      body: { message: "Failed to load categories" },
    }).as("getCategoriesError");

    cy.mount(<CreatePost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategoriesError");

    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "Failed to load categories");
  });

  it("closes modal when cancel is clicked", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<CreatePost isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getCategories");

    cy.get('[data-testid="create-post-cancel"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });
});
