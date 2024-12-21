/// <reference types="cypress" />
import ProfileCard from "../../../src/components/profile/ProfileCard";
import { UserProfile } from "../../../src/types/userTypes";

describe("Delete Profile Functionality", () => {
  let profileData: UserProfile;

  beforeEach(() => {
    cy.fixture("testData/profile.json").then((data) => {
      profileData = data;

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

      cy.intercept("DELETE", "**/api/profile/*", {
        statusCode: 204,
      }).as("deleteProfile");
    });
  });

  it("displays delete account button", () => {
    cy.mount(<ProfileCard profile={profileData} />);

    cy.get('[data-testid="delete-account-button"]')
      .should("be.visible")
      .and("contain", "Delete account");
  });

  it("shows confirmation dialog when delete button is clicked", () => {
    cy.mount(<ProfileCard profile={profileData} />);

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
    cy.mount(<ProfileCard profile={profileData} />);

    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false);
    });

    cy.get('[data-testid="delete-account-button"]').click();

    cy.get("@deleteProfile").should("not.exist");
  });

  it("handles successful profile deletion", () => {
    cy.mount(<ProfileCard profile={profileData} />);

    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
      cy.spy(win.localStorage, "removeItem").as("localStorageRemove");
    });

    cy.get('[data-testid="delete-account-button"]').click();
    cy.wait("@deleteProfile");

    cy.get("@localStorageRemove").should("have.been.calledWith", "auth_token");
    cy.get("@localStorageRemove").should("have.been.calledWith", "user_data");

    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Account deleted successfully");
  });

  it("handles failed profile deletion", () => {
    cy.intercept("DELETE", "**/api/profile/*", {
      statusCode: 500,
      body: { message: "Failed to delete profile" },
    }).as("deleteProfileError");

    cy.mount(<ProfileCard profile={profileData} />);

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
