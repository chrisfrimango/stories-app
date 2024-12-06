import React from "react";
import CreatePostModal from "../../src/components/post/CreatePost";

describe("CreatePost Component", () => {
  beforeEach(() => {
    // Mock the categories data
    cy.intercept("GET", "/api/categories", {
      statusCode: 200,
      body: [
        { id: "1", name: "Technology" },
        { id: "2", name: "Travel" },
      ],
    }).as("getCategories");
    // Mock the create post API call
    cy.intercept("POST", "/api/posts", {
      statusCode: 200,
      body: {
        id: "123",
        title: "Test Post",
        content: "This is a test post",
        category: "1",
      },
    }).as("createPost");

    // Use the custom mount command with TestWrapper
    cy.mount(
      <CreatePostModal isOpen={true} onClose={cy.stub().as("onClose")} />
    );

    // Wait for categories to load
    cy.wait("@getCategories");
    cy.get('select[data-testid="post-category"]')
      .children("option")
      .should("have.length.greaterThan", 1); // 1 default option + categories
  });

  it("renders the modal and form elements", () => {
    cy.get("h2").should("contain", "Create New Post");
    cy.get('input[placeholder="Post title"]').should("exist");
    cy.get('textarea[placeholder="Write your post content..."]').should(
      "exist"
    );
    cy.get('select[data-testid="post-category"]').should("exist");
    cy.get('button[data-testid="submit-post"]').should("exist");
  });

  it("allows filling out the form and submits successfully", () => {
    cy.get('input[placeholder="Post title"]').type("Test Post");
    cy.get('textarea[placeholder="Write your post content..."]').type(
      "This is a test post"
    );
    // cy.get('select[data-testid="post-category"]')
    //   .should("not.be.empty")
    //   .select("Technology");

    cy.get('button[data-testid="submit-post"]').click();

    cy.wait("@createPost");

    // Check for success message
    cy.get("div").should("contain", "Post created successfully!");

    // Verify that onClose was called (modal closed)
    cy.get("@onClose").should("have.been.called");
  });

  // it("displays error message on submission failure", () => {
  //   // Override the successful mock with an error response
  //   cy.intercept("POST", "/api/posts", {
  //     statusCode: 500,
  //     body: { error: "Server error" },
  //   }).as("createPostError");

  //   cy.get('input[placeholder="Post title"]').type("Test Post");
  //   cy.get('textarea[placeholder="Write your post content..."]').type(
  //     "This is a test post"
  //   );
  //   cy.get('select[data-testid="post-category"]').select("Technology");

  //   cy.get('button[data-testid="submit-post"]').click();

  //   cy.wait("@createPostError");

  //   // Check for error message
  //   cy.get("div").should("contain", "Failed to create post");
  // });

  it("validates form fields", () => {
    cy.get('button[data-testid="submit-post"]').click();

    // Check for validation error messages
    cy.get('span[data-testid="error-message"]').should("exist");
  });
});
