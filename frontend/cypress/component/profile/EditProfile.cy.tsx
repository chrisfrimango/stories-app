/// <reference types="cypress" />
import EditProfile from "../../../src/components/profile/EditProfile";
import ProfileCard from "../../../src/components/profile/ProfileCard";
import { createOnCloseSpy } from "../../support/utils";

describe("EditProfile Modal", () => {
  beforeEach(() => {
    cy.editMockProfile();
  });

  it("renders modal content when open", () => {
    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-modal"]').should("be.visible");
    cy.get('[data-testid="edit-profile-name"]').should("have.value", "testuser");
    cy.get('[data-testid="edit-profile-email"]').should(
      "have.value",
      "test@example.com"
    );
    cy.get('[data-testid="edit-profile-bio"]').should("have.value", "Original bio");
  });

  it("validates required fields", () => {
    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-name"]').clear();
    cy.get('[data-testid="edit-profile-email"]').clear();

    cy.get('[data-testid="edit-profile-submit"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("validates email format", () => {
    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-email"]')
      .clear()
      .type("invalid-email-format");
    cy.get('[data-testid="edit-profile-submit"]').click();

    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("handles successful profile update", () => {
    cy.fixture("editProfile.json").then((profileData) => {
      cy.intercept("PUT", "**/api/profile/*", {
        statusCode: 200,
        body: profileData.updatedProfile,
      }).as("updateProfile");

      const onCloseSpy = createOnCloseSpy();

      cy.mount(<EditProfile isOpen={true} onClose={onCloseSpy} />);
      cy.wait("@getProfile");

      cy.get('[data-testid="edit-profile-name"]')
        .clear()
        .type(profileData.updatedProfile.username);
      cy.get('[data-testid="edit-profile-email"]')
        .clear()
        .type(profileData.updatedProfile.email);
      cy.get('[data-testid="edit-profile-bio"]')
        .clear()
        .type(profileData.updatedProfile.bio);

      cy.get('[data-testid="edit-profile-submit"]').click();
      cy.wait("@updateProfile");

      cy.get('[data-testid="success-message"]').should("be.visible");
      cy.get("@onCloseSpy").should("have.been.called");
    });
  });

  it("handles failed profile update", () => {
    cy.intercept("PUT", "**/api/profile/*", {
      statusCode: 400,
      body: { message: "Update failed" },
    }).as("updateProfileError");

    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-submit"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  it("closes modal when cancel is clicked", () => {
    const onCloseSpy = createOnCloseSpy();

    cy.mount(<EditProfile isOpen={true} onClose={onCloseSpy} />);
    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-cancel"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });
});
