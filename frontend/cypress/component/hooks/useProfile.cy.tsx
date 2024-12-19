import {
  useProfile,
  useUpdateProfile,
  useDeleteProfile,
} from "../../../src/hooks/useProfile";
import { setupMockAuth, setupMockProfile } from "../../support/mockHelpers";

describe("useProfile Hook", () => {
  const userId = "1";

  beforeEach(() => {
    setupMockAuth(userId);
    setupMockProfile(userId);
  });

  const TestComponent = () => {
    const { data: profile, isLoading, error } = useProfile(userId);
    const { mutate: updateProfile } = useUpdateProfile(userId);
    const { mutate: deleteProfile } = useDeleteProfile(userId);

    return (
      <div>
        {isLoading && <div data-testid="loading">Loading...</div>}
        {error && <div data-testid="error">{(error as Error).message}</div>}
        {profile && (
          <div data-testid="profile-data">
            <div data-testid="profile-username">{profile.username}</div>
            <div data-testid="profile-email">{profile.email}</div>
          </div>
        )}
        <button
          data-testid="update-profile"
          onClick={() =>
            updateProfile({ username: "updated", email: "updated@test.com" })
          }
        >
          Update Profile
        </button>
        <button data-testid="delete-profile" onClick={() => deleteProfile()}>
          Delete Profile
        </button>
      </div>
    );
  };

  it("successfully fetches profile data", () => {
    cy.mount(<TestComponent />);
    cy.wait("@getProfile");

    cy.get('[data-testid="profile-username"]').should("be.visible");
    cy.get('[data-testid="profile-email"]').should("be.visible");
  });

  it("shows loading state", () => {
    cy.intercept("GET", "**/api/profile/1", {
      delay: 1000,
      statusCode: 200,
      fixture: "profile.json",
    }).as("getProfileDelayed");

    cy.mount(<TestComponent />);
    cy.get('[data-testid="loading"]').should("be.visible");
    cy.wait("@getProfileDelayed");
    cy.get('[data-testid="loading"]').should("not.exist");
  });

  it("handles profile update", () => {
    const updatedProfile = {
      username: "updated",
      email: "updated@test.com",
    };

    // Mock both GET and PUT requests
    cy.intercept("PUT", "**/api/profile/1", {
      statusCode: 200,
      body: updatedProfile,
    }).as("updateProfile");

    cy.mount(<TestComponent />);
    cy.wait("@getProfile");

    cy.get('[data-testid="update-profile"]').click();
    cy.wait("@updateProfile")
      .its("request.body")
      .should("deep.include", updatedProfile);
  });

  it("handles profile deletion", () => {
    cy.intercept("DELETE", "**/api/profile/1", {
      statusCode: 204,
    }).as("deleteProfile");

    cy.mount(<TestComponent />);
    cy.wait("@getProfile");

    cy.get('[data-testid="delete-profile"]').click();
    cy.wait("@deleteProfile");
  });

  it("handles error states", () => {
    cy.intercept("GET", "**/api/profile/1", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("getProfileError");

    cy.mount(<TestComponent />);
    cy.wait("@getProfileError");
    cy.get('[data-testid="error"]').should("be.visible");
  });
});
