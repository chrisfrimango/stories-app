/// <reference types="cypress" />
import EditProfile from "../../../src/components/profile/EditProfile";
import ProfileCard from "../../../src/components/profile/ProfileCard";

describe("EditProfile Modal", () => {
  const setupMockProfile = () => {
    cy.fixture("editProfile.json").then((profileData) => {
      // Mock auth context
      cy.window().then((win) => {
        win.localStorage.setItem("auth_token", "fake-token");
        win.localStorage.setItem(
          "user_data",
          JSON.stringify({
            id: profileData.currentProfile.id,
            username: profileData.currentProfile.username,
            email: profileData.currentProfile.email,
          })
        );
      });

      // Mock profile API call with ID in URL
      cy.intercept(
        "GET",
        `${Cypress.env("API_URL")}/api/profile/${
          profileData.currentProfile.idno
        }`,
        {
          statusCode: 200,
          body: profileData.currentProfile,
        }
      ).as("getProfile");
    });
  };

  beforeEach(setupMockProfile);

  it("renders modal content when open", () => {
    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-modal"]').should("be.visible");
    cy.get('[data-testid="edit-profile-name"]').should(
      "have.value",
      "testuser"
    );
    cy.get('[data-testid="edit-profile-email"]').should(
      "have.value",
      "test@example.com"
    );
    cy.get('[data-testid="edit-profile-bio"]').should(
      "have.value",
      "Original bio"
    );
  });

  // it("validates required fields", () => {
  //   cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
  //   cy.wait("@getProfile");

  //   // Clear required fields
  //   cy.get('[data-testid="edit-profile-name"]').clear();
  //   cy.get('[data-testid="edit-profile-email"]').clear();

  //   // Try to submit
  //   cy.get('[data-testid="edit-profile-submit"]').click();

  //   // Check error messages
  //   cy.get('[data-testid="error-message"]').should("be.visible");
  // });

  // it("validates email format", () => {
  //   cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
  //   cy.wait("@getProfile");

  //   cy.get('[data-testid="edit-profile-email"]')
  //     .clear()
  //     .type("invalid-email-format");

  //   cy.get('[data-testid="edit-profile-submit"]').click();
  //   cy.get('[data-testid="error-message"]').should("be.visible");
  // });

  // it("handles successful profile update", () => {
  //   cy.fixture("editProfile.json").then((profileData) => {
  //     // Mock the update profile API call
  //     cy.intercept("PUT", "**/api/profile/*", {
  //       statusCode: 200,
  //       body: profileData.updatedProfile,
  //     }).as("updateProfile");

  //     cy.mount(
  //       <EditProfile isOpen={true} onClose={cy.spy().as("onCloseSpy")} />
  //     );
  //     cy.wait("@getProfile");

  //     // Fill in form with updated data
  //     cy.get('[data-testid="edit-profile-name"]')
  //       .clear()
  //       .type(profileData.updatedProfile.username);
  //     cy.get('[data-testid="edit-profile-email"]')
  //       .clear()
  //       .type(profileData.updatedProfile.email);
  //     cy.get('[data-testid="edit-profile-bio"]')
  //       .clear()
  //       .type(profileData.updatedProfile.bio);

  //     // Submit form
  //     cy.get('[data-testid="edit-profile-submit"]').click();

  //     // Wait for API call
  //     cy.wait("@updateProfile");

  //     // Verify success message and modal close
  //     cy.get('[data-testid="success-message"]').should("be.visible");
  //     cy.get("@onCloseSpy").should("have.been.called");
  //   });
  // });

  // it("handles failed profile update", () => {
  //   // Mock failed API call
  //   cy.intercept("PUT", "**/api/profile/*", {
  //     statusCode: 400,
  //     body: { message: "Update failed" },
  //   }).as("updateProfileError");

  //   cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);
  //   cy.wait("@getProfile");

  //   // Try to submit form
  //   cy.get('[data-testid="edit-profile-submit"]').click();

  //   // Verify error message
  //   cy.get('[data-testid="error-message"]').should("be.visible");
  // });

  // it("closes modal when cancel is clicked", () => {
  //   const onCloseSpy = cy.spy().as("onCloseSpy");
  //   cy.mount(<EditProfile isOpen={true} onClose={onCloseSpy} />);
  //   cy.wait("@getProfile");

  //   cy.get('[data-testid="edit-profile-cancel"]').click();
  //   cy.get("@onCloseSpy").should("have.been.called");
  // });

  // it("opens modal when edit profile button is clicked", () => {
  //   // Mount both ProfileCard and EditProfile components
  //   cy.mount(
  //     <>
  //       <ProfileCard />
  //       <EditProfile isOpen={false} onClose={() => {}} />
  //     </>
  //   );
  //   cy.wait("@getProfile");

  //   // Click the edit button
  //   cy.get('[data-testid="edit-profile-button"]').click();

  //   // Verify modal appears
  //   cy.get('[data-testid="edit-profile-modal"]').should("be.visible");

  //   // Verify form is populated with current profile data
  //   cy.get('[data-testid="edit-profile-name"]').should(
  //     "have.value",
  //     "testuser"
  //   );
  //   cy.get('[data-testid="edit-profile-email"]').should(
  //     "have.value",
  //     "test@example.com"
  //   );
  //   cy.get('[data-testid="edit-profile-bio"]').should(
  //     "have.value",
  //     "Original bio"
  //   );
  // });
});
