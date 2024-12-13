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
    cy.get('[data-testid="category-select"] option').should(
      "have.length.gt",
      1
    );

    cy.get('[data-testid="category-select"]')
      .select("2")
      .should("have.value", "2");

    cy.get('[data-testid="category-select-option"]')
      .first()
      .should("have.text", "Technology");
    cy.get('[data-testid="category-select-option"]')
      .last()
      .should("have.text", "Lifestyle");
  });

  it("validates required fields", () => {
    cy.mount(<CreatePost isOpen={true} onClose={() => {}} />);
    cy.wait("@getCategories");

    // Try to submit empty form
    cy.get('[data-testid="submit-post"]').click();

    // Check validation messages
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("handles successful post creation", () => {
    // Mock successful post creation
    cy.intercept("POST", "**/api/posts", {
      statusCode: 201,
      body: {
        post: {
          id: 1,
          title: "Test Post",
          content: "Test Content",
          category_id: 1,
          created_at: new Date().toISOString(),
          user_id: "1",
          username: "testuser", //??
        },
      },
    }).as("createPost");

    const onCloseSpy = cy.spy().as("onCloseSpy");

    cy.mount(<CreatePost isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getCategories");

    // Fill form
    cy.get('[data-testid="post-title-input"]').type("Test Post");
    cy.get('[data-testid="post-content-input"]').type("Test Content");
    cy.get('[data-testid="category-select"]').select("1");

    // Submit form
    cy.get('[data-testid="submit-post"]').click();
    cy.wait("@createPost");

    // Verify success message and modal close
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Post created successfully!");
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
    cy.get('[data-testid="submit-post"]').click();
    cy.wait("@createPostError");

    // Verify error message
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Failed to create post");
  });

  it("closes modal when cancel is clicked", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<CreatePost isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getCategories");

    cy.get('[data-testid="create-post-cancel"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });
});
