import { User } from "../../src/types/api";
import { Post } from "../../src/types/postsTypes";

export const setupMockAuth = (userOrId: User | string) => {
  cy.fixture("testData/users.json").then((userData) => {
    const user = typeof userOrId === "string" ? userData.testUser : userOrId;

    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
      win.localStorage.setItem("user_data", JSON.stringify(user));
    });
  });
};

export const setupMockPost = (post: Post) => {
  cy.intercept("GET", "**/api/posts/*", {
    statusCode: 200,
    body: post,
  }).as("getPost");
};

export const setupMockCategories = () => {
  cy.fixture("testData/categories.json").then((categoriesData) => {
    cy.intercept("GET", "**/api/categories", {
      statusCode: 200,
      body: categoriesData,
    }).as("getCategories");
  });
};

export const setupMockProfile = (userId: string) => {
  cy.fixture("testData/users.json").then((userData) => {
    cy.intercept("GET", `**/api/profile/${userId}`, {
      statusCode: 200,
      body: userData.testUser,
    }).as("getProfile");
  });
};
