/// <reference types="cypress" />
import PostDetail from "../../../src/pages/PostDetail";

describe("PostDetail Component", () => {
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

    // Mock post fetch
    cy.intercept("GET", "**/api/posts/*", {
      statusCode: 200,
      fixture: "post.json",
    }).as("getPost");
  });

  it("renders post details correctly", () => {
    cy.mount(<PostDetail />);
    cy.wait("@getPost");

    cy.get('[data-testid="post-title"]').should("contain", "Test Post 1");
    cy.get('[data-testid="post-content"]').should(
      "contain",
      "This is test content 1"
    );
    cy.get('[data-testid="post-author"]').should("contain", "testuser");
    cy.get('[data-testid="post-category"]').should("contain", "Technology");
  });

  it("shows edit/delete buttons", () => {
    cy.mount(<PostDetail />);
    cy.wait("@getPost");

    cy.get('[data-testid="edit-button"]').should("be.visible");
    cy.get('[data-testid="delete-button"]').should("be.visible");
  });

  it("handles loading state", () => {
    cy.intercept("GET", "**/api/posts/*", {
      delay: 1000,
      statusCode: 200,
      fixture: "post.json",
    }).as("getPostDelayed");

    cy.mount(<PostDetail />);
    cy.get('[data-testid="loading"]')
      .should("be.visible")
      .and("contain", "Loading post...");
    cy.wait("@getPostDelayed");
  });

  it("handles error state", () => {
    cy.intercept("GET", "**/api/posts/*", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("getPostError");

    cy.mount(<PostDetail />);
    cy.wait("@getPostError");
    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "Failed to load post");
  });

  it("handles post deletion", () => {
    // Mock delete API call
    cy.intercept("DELETE", "**/api/posts/*", {
      statusCode: 204,
    }).as("deletePost");

    cy.mount(<PostDetail />);
    cy.wait("@getPost");

    // Stub window.confirm to return true
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    cy.get('[data-testid="delete-button"]').click();
    cy.wait("@deletePost");

    // Verify success message
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Post deleted successfully");
  });
});
