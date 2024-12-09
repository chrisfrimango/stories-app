/// <reference types="cypress" />
import ProfileCard from "../../../src/components/profile/ProfileCard";

describe("ProfileCard Component", () => {
  const setupMockProfile = () => {
    cy.fixture("profile.json").then((profileData) => {
      // Mock auth context
      cy.window().then((win) => {
        win.localStorage.setItem("auth_token", "fake-token");
        win.localStorage.setItem(
          "user_data",
          JSON.stringify({
            id: profileData.id,
            username: profileData.username,
            email: profileData.email,
          })
        );
      });

      // Mock profile API call
      cy.intercept("GET", "**/api/profile/*", {
        statusCode: 200,
        body: profileData,
      }).as("getProfile");
    });
  };

  beforeEach(setupMockProfile);

  it("displays profile information correctly", () => {
    cy.mount(<ProfileCard />);
    cy.wait("@getProfile");

    cy.get('[data-testid="profile-username"]').should("contain", "testuser");
    cy.get('[data-testid="profile-email"]').should(
      "contain",
      "test@example.com"
    );
    cy.get('[data-testid="profile-created-date"]').should(
      "contain",
      "2024-03-20"
    );
  });

  it("handles loading state", () => {
    cy.intercept("GET", "**/api/profile/*", {
      delay: 1000,
      statusCode: 200,
      fixture: "profile.json",
    }).as("getProfileDelayed");

    cy.mount(<ProfileCard />);
    cy.get('[data-testid="loading"]').should("exist");
    cy.contains("Loading...").should("be.visible");
    cy.wait("@getProfileDelayed");
  });

  it("handles error state", () => {
    cy.intercept("GET", "**/api/profile/*", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("getProfileError");

    cy.mount(<ProfileCard />);
    cy.wait("@getProfileError");
    cy.get('[data-testid="error-message"]').should("be.visible");
    cy.contains("Something went wrong").should("be.visible");
  });
});
