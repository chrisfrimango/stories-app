/// <reference types="cypress" />
import PostList from "../../../src/components/post/PostList";

describe("PostList Component", () => {
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
    cy.intercept("GET", "**/api/posts", {
      statusCode: 200,
      fixture: "posts.json",
    }).as("getPosts");
  });

  describe("Rendering", () => {
    it("renders the grid layout correctly", () => {
      cy.mount(<PostList />);
      cy.wait("@getPosts");

      cy.get('[class*="MuiGrid-container"]').should("exist");
      cy.get('[class*="MuiGrid-item"]').should("have.length", 2);
    });

    it("renders post cards with correct structure", () => {
      cy.mount(<PostList />);
      cy.wait("@getPosts");

      cy.get('[data-testid="post-card"]')
        .should("have.length", 2)
        .each(($card) => {
          cy.wrap($card).within(() => {
            cy.get('[class*="MuiCardMedia-root"]').should("exist");
            cy.get('[class*="MuiCardContent-root"]').should("exist");
            cy.get('[class*="MuiTypography-root"]').should("exist");
          });
        });
    });

    it("displays post content correctly", () => {
      cy.mount(<PostList />);
      cy.wait("@getPosts");

      cy.get('[data-testid="post-card"]')
        .first()
        .within(() => {
          cy.get('[data-testid="post-title"]').should("contain", "Test Post 1");
          cy.get('[data-testid="post-content"]').should(
            "contain",
            "This is test content 1"
          );
          cy.get('[data-testid="post-category"]').should(
            "contain",
            "Technology"
          );
        });
    });
  });

  describe("States", () => {
    it("shows loading state", () => {
      cy.intercept("GET", "**/api/posts", {
        statusCode: 200,
        fixture: "posts.json",
        delay: 1000,
      }).as("getPostsDelayed");

      cy.mount(<PostList />);
      cy.get('[data-testid="loading"]').should("be.visible");
    });

    it("shows empty state", () => {
      cy.intercept("GET", "**/api/posts", {
        statusCode: 200,
        body: { posts: [] },
      }).as("getEmptyPosts");

      cy.mount(<PostList />);
      cy.wait("@getEmptyPosts");
      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("contain", "No posts found");
    });

    it("shows error state", () => {
      cy.intercept("GET", "**/api/posts", {
        statusCode: 500,
        body: { message: "Internal server error" },
      }).as("failedPosts");

      cy.mount(<PostList />);
      cy.wait("@failedPosts");
      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("contain", "Failed to load posts");
    });
  });
});
