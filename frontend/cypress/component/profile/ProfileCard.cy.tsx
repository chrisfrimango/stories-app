/// <reference types="cypress" />
import ProfileCard from "../../../src/components/profile/ProfileCard";

describe("ProfileCard Component", () => {
  beforeEach(() => {
    cy.setupMockProfile();
  });

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
    cy.get('[data-testid="loading"]').should("not.exist");
    cy.get('[data-testid="profile-username"]').should("contain", "testuser");
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
