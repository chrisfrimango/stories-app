/// <reference types="cypress" />
import ProfileCard from "../../../src/components/profile/ProfileCard";

describe("Delete Profile Functionality", () => {
  beforeEach(() => {
    cy.fixture("profile.json").then((profileData) => {
      // Setup mock auth state
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

      // Mock delete profile API call
      cy.intercept("DELETE", "**/api/profile/*", {
        statusCode: 204,
        body: { message: "Profile deleted successfully" },
      }).as("deleteProfile");
    });
  });

  it("displays delete account button", () => {
    cy.mount(<ProfileCard />);
    cy.wait("@getProfile");

    cy.get('[data-testid="delete-account-button"]')
      .should("be.visible")
      .and("contain", "Delete account");
  });

  it("shows confirmation dialog when delete button is clicked", () => {
    cy.mount(<ProfileCard />);
    cy.wait("@getProfile");

    // Spy on window.confirm
    cy.window().then((win) => {
      cy.stub(win, "confirm").as("confirmStub").returns(false);
    });

    cy.get('[data-testid="delete-account-button"]').click();
    cy.get("@confirmStub").should(
      "have.been.calledWith",
      "Are you sure you want to delete your account?"
    );
  });

  it("cancels deletion when user clicks cancel in confirmation", () => {
    cy.mount(<ProfileCard />);
    cy.wait("@getProfile");

    // Stub window.confirm to return false (user clicks Cancel)
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false);
    });

    cy.get('[data-testid="delete-account-button"]').click();

    // Verify no delete request was made
    cy.get("@deleteProfile").should("not.exist");
  });

  it("handles successful profile deletion", () => {
    cy.mount(<ProfileCard />);
    cy.wait("@getProfile");

    // Stub window.confirm to return true (user confirms deletion)
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
      // Spy on localStorage.removeItem
      cy.spy(win.localStorage, "removeItem").as("localStorageRemove");
    });

    cy.get('[data-testid="delete-account-button"]').click();
    cy.wait("@deleteProfile");

    // Verify localStorage items were removed
    cy.get("@localStorageRemove").should("have.been.calledWith", "auth_token");
    cy.get("@localStorageRemove").should("have.been.calledWith", "user_data");

   // Verify success message
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Account deleted successfully");
  });

  it("handles failed profile deletion", () => {
    // Override the default mock with an error response
    cy.intercept("DELETE", "**/api/profile/*", {
      statusCode: 500,
      body: { message: "Failed to delete profile" },
    }).as("deleteProfileError");

    cy.mount(<ProfileCard />);
    cy.wait("@getProfile");

    // Stub window.confirm to return true
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    cy.get('[data-testid="delete-account-button"]').click();

    cy.wait("@deleteProfileError");
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Failed to delete account");
  });
});
