/// <reference types="cypress" />
import EditProfile from "../../../src/components/profile/EditProfile";

describe("EditProfile Modal", () => {
  const mockProfile = {
    id: "123",
    username: "testuser",
    email: "test@example.com",
    bio: "Original bio",
    created_at: "2024-03-20T10:00:00Z",
  };

  const setupMockAuth = () => {
    cy.intercept("PUT", "**/api/profile/*", {
      statusCode: 200,
      body: { user: mockProfile },
    }).as("updateProfile");

    cy.intercept("GET", "**/api/profile/*", {
      statusCode: 200,
      body: mockProfile,
    }).as("getProfile");

    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
      win.localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: mockProfile.id,
          username: mockProfile.username,
          email: mockProfile.email,
        })
      );
      win.initialModalState = {
        editingProfile: mockProfile,
      };
    });
  };

  beforeEach(() => {
    setupMockAuth();
  });

  it("renders modal content when open", () => {
    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);

    cy.wait("@getProfile");

    cy.get('[data-testid="edit-profile-modal"]').should("be.visible");

    cy.get('[data-testid="edit-profile-name"]')
      .should("be.visible")
      .and("have.value", "testuser");
    cy.get('[data-testid="edit-profile-email"]')
      .should("be.visible")
      .and("have.value", "test@example.com");
    cy.get('[data-testid="edit-profile-bio"]')
      .should("be.visible")
      .and("have.value", "Original bio");
  });

  it("validates required fields", () => {
    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);

    // Clear required fields
    cy.get('[data-testid="edit-profile-name"]').clear();
    cy.get('[data-testid="edit-profile-email"]').clear();

    // Try to submit
    cy.get('[data-testid="edit-profile-submit"]').click();

    // Check validation messages
    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain", "Username is required");
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Email is required"
    );
  });

  it("handles successful profile update", () => {
    const updatedProfile = {
      id: "123",
      username: "updateduser",
      email: "updated@example.com",
      bio: "Updated bio",
      created_at: "2024-03-20T10:00:00Z",
    };

    // Mock successful update
    cy.intercept("PUT", "**/api/profile/*", {
      statusCode: 200,
      body: updatedProfile,
    }).as("updateProfile");

    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<EditProfile isOpen={true} onClose={onCloseSpy} />);

    // Update form fields
    cy.get('[data-testid="edit-profile-name"]').clear().type("updateduser");
    cy.get('[data-testid="edit-profile-email"]')
      .clear()
      .type("updated@example.com");
    cy.get('[data-testid="edit-profile-bio"]').clear().type("Updated bio");

    // Submit form
    cy.get('[data-testid="edit-profile-submit"]').click();
    cy.wait("@updateProfile");

    // Verify success and modal close
    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Profile updated successfully");
    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("handles API errors", () => {
    // Mock failed update
    cy.intercept("PUT", "**/api/profile/*", {
      statusCode: 400,
      body: { message: "Failed to update profile" },
    }).as("updateProfileError");

    cy.mount(<EditProfile isOpen={true} onClose={() => {}} />);

    cy.get('[data-testid="edit-profile-submit"]').click();
    cy.wait("@updateProfileError");

    cy.get('[data-testid="alert"]')
      .should("be.visible")
      .and("contain", "Failed to update profile");
  });

  it("closes modal when cancel is clicked", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(<EditProfile isOpen={true} onClose={onCloseSpy} />);

    cy.get('[data-testid="edit-profile-cancel"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });
});
