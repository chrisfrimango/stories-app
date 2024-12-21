/// <reference types="cypress" />
import ProfileCard from "../../../src/components/profile/ProfileCard";
import { UserProfile } from "../../../src/types/userTypes";

describe("ProfileCard Component", () => {
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
    });
  });

  it("displays profile information correctly", () => {
    cy.mount(<ProfileCard profile={profileData} />);

    cy.get('[data-testid="profile-username"]').should(
      "contain",
      profileData.username
    );
    cy.get('[data-testid="profile-email"]').should(
      "contain",
      profileData.email
    );
    cy.get('[data-testid="profile-created-date"]').should(
      "contain",
      profileData.created_at
    );
  });
});
