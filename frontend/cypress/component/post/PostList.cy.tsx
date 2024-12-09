/// <reference types="cypress" />
import PostList from "../../../src/components/post/PostList";

describe("PostList Component", () => {
  it("handles error state", () => {
    cy.intercept("GET", "**/api/posts", {
      statusCode: 500,
      body: { message: "Internal server error" },
      delay: 100,
    }).as("failedPosts");

    cy.mount(<PostList />);

    cy.wait("@failedPosts").then((interception) => {
      expect(interception.response.statusCode).to.equal(500);
    });

    cy.get('[data-testid="error-message"]', { timeout: 10000 })
      .should("exist")
      .and("be.visible")
      .and("contain", "Error loading posts");
  });

  it("handles empty state", () => {
    cy.intercept("GET", "**/api/posts*", {
      statusCode: 200,
      body: { posts: [] },
    }).as("getEmptyPosts");

    cy.mount(<PostList />);
    cy.wait("@getEmptyPosts");

    cy.get('[data-testid="empty-state"]')
      .should("be.visible")
      .and("contain", "No posts found");
  });

  it("displays posts correctly", () => {
    cy.intercept("GET", "**/api/posts", {
      statusCode: 200,
      fixture: "posts.json",
    }).as("getPosts");

    cy.mount(<PostList />);
    cy.wait("@getPosts");

    cy.get('[data-testid="post-card"]').should("have.length", 2);

    cy.get('[data-testid="post-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="post-title"]').should("contain", "Test Post 1");
        cy.get('[data-testid="post-content"]').should(
          "contain",
          "This is test content 1"
        );
      });
  });
});
