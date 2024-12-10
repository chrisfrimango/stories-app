/// <reference types="cypress" />
import PostDetail from "../../../src/pages/PostDetail";

describe("PostDetail Component", () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    content: "Test content",
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
    });
  };

  beforeEach(() => {
    setupMockAuth();

    // Mock post fetch
    cy.intercept("GET", "**/api/posts/*", {
      statusCode: 200,
      body: mockPost,
    }).as("getPost");

    // Mock comments fetch
    cy.intercept("GET", "**/api/posts/*/comments", {
      statusCode: 200,
      body: [
        {
          id: 1,
          content: "Great post!",
          user_id: 2,
          username: "commenter",
          created_at: "2024-03-20T11:00:00Z",
        },
      ],
    }).as("getComments");
  });

  it("renders post details correctly", () => {
    cy.mount(<PostDetail postId="1" />);
    cy.wait(["@getPost", "@getComments"]);

    cy.get('[data-testid="post-title"]').should("contain", mockPost.title);
    cy.get('[data-testid="post-content"]').should("contain", mockPost.content);
    cy.get('[data-testid="post-author"]').should("contain", mockPost.username);
    cy.get('[data-testid="post-category"]').should(
      "contain",
      mockPost.category_name
    );
  });

  it("displays comments section", () => {
    cy.mount(<PostDetail postId="1" />);
    cy.wait(["@getPost", "@getComments"]);

    cy.get('[data-testid="comments-section"]').should("be.visible");
    cy.get('[data-testid="comment-item"]').should("have.length", 1);
    cy.get('[data-testid="comment-content"]').should("contain", "Great post!");
  });

  it("allows adding new comments", () => {
    // Mock comment creation
    cy.intercept("POST", "**/api/posts/*/comments", {
      statusCode: 201,
      body: {
        id: 2,
        content: "New comment",
        user_id: 1,
        username: "testuser",
        created_at: new Date().toISOString(),
      },
    }).as("createComment");

    cy.mount(<PostDetail postId="1" />);
    cy.wait(["@getPost", "@getComments"]);

    cy.get('[data-testid="comment-input"]').type("New comment");
    cy.get('[data-testid="submit-comment"]').click();

    cy.wait("@createComment");
    cy.get('[data-testid="comment-item"]').should("have.length", 2);
  });

  it("shows edit/delete buttons for author's own post", () => {
    cy.mount(<PostDetail postId="1" />);
    cy.wait(["@getPost", "@getComments"]);

    cy.get('[data-testid="edit-post-button"]').should("be.visible");
    cy.get('[data-testid="delete-post-button"]').should("be.visible");
  });

  it("handles post deletion", () => {
    // Mock delete API call
    cy.intercept("DELETE", "**/api/posts/*", {
      statusCode: 200,
    }).as("deletePost");

    cy.mount(<PostDetail postId="1" />);
    cy.wait(["@getPost", "@getComments"]);

    // Stub window.confirm to return true
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    cy.get('[data-testid="delete-post-button"]').click();
    cy.wait("@deletePost");

    // Verify success message
    cy.get('[data-testid="success-message"]').should("be.visible");
  });

  it("handles loading state", () => {
    cy.intercept("GET", "**/api/posts/*", {
      delay: 1000,
      statusCode: 200,
      body: mockPost,
    }).as("getPostDelayed");

    cy.mount(<PostDetail postId="1" />);
    cy.get('[data-testid="loading"]').should("be.visible");
    cy.wait("@getPostDelayed");
  });

  it("handles error state", () => {
    cy.intercept("GET", "**/api/posts/*", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("getPostError");

    cy.mount(<PostDetail postId="1" />);
    cy.wait("@getPostError");
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("opens edit modal when edit button is clicked", () => {
    cy.mount(<PostDetail postId="1" />);
    cy.wait(["@getPost", "@getComments"]);

    cy.get('[data-testid="edit-post-button"]').click();
    cy.get('[data-testid="edit-post-modal"]').should("be.visible");
  });
});
