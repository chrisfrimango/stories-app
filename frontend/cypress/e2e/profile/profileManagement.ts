import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

const testData = {
  profile: {
    username: "",
    email: "",
  },
};

Given("I am logged in as {string}", (username: string) => {
  const email = `${username}@test.com`;
  const password = "Password123!";
  cy.loginViaUI(email, password);
});

Given("I am on my profile page", () => {
  cy.intercept("GET", "**/api/profile/*", {
    statusCode: 200,
    body: {
      id: 1,
      username: "testuser",
      email: "testuser@test.com",
      created_at: new Date().toISOString(),
    },
  }).as("getProfile");

  cy.window().then((win) => {
    win.localStorage.setItem(
      "user_data",
      JSON.stringify({
        id: 1,
        username: "testuser",
        email: "testuser@test.com",
      })
    );
  });

  cy.visit("/profile");
  cy.wait("@getProfile");

  cy.get('[data-testid="profile-card"]').should("be.visible");
});

When("I click on the edit profile button", () => {
  cy.get('[data-testid="edit-profile-button"]').should("be.visible").click();

  cy.get('[data-testid="edit-profile-modal"]').should("be.visible");
});

When("I update the following information:", (dataTable: DataTable) => {
  const formData = dataTable.hashes().reduce((acc, row) => {
    acc[row.Field.toLowerCase()] = row.Value;
    return acc;
  }, {} as Record<string, string>);

  testData.profile = {
    username: formData.username || "",
    email: formData.email || "",
  };

  // Mock the update API call
  cy.intercept("PUT", "**/api/profile/*", {
    statusCode: 200,
    body: {
      profile: {
        id: 1,
        username: formData.username,
        email: formData.email,
        created_at: new Date().toISOString(),
      },
    },
  }).as("updateProfile");

  if (formData.username) {
    cy.get('[data-testid="edit-profile-name"]')
      .should("be.visible")
      .clear()
      .type(formData.username);
  }
  if (formData.email) {
    cy.get('[data-testid="edit-profile-email"]')
      .should("be.visible")
      .clear()
      .type(formData.email);
  }
});

When("I click {string}", (buttonText: string) => {
  switch (buttonText.toLowerCase()) {
    case "save changes":
      cy.intercept("GET", "**/api/profile/*", {
        statusCode: 200,
        body: {
          id: 1,
          username: testData.profile.username,
          email: testData.profile.email,
          created_at: new Date().toISOString(),
        },
      }).as("getUpdatedProfile");

      cy.get('[data-testid="edit-profile-submit"]')
        .should("be.visible")
        .click();
      cy.wait("@updateProfile");
      cy.wait("@getUpdatedProfile");
      break;
    default:
      cy.get(`button:contains("${buttonText}")`).should("be.visible").click();
  }
});

Then("I should see my updated information", () => {
  cy.get('[data-testid="profile-username"]')
    .should("be.visible")
    .and("contain", testData.profile.username);
  cy.get('[data-testid="profile-email"]')
    .should("be.visible")
    .and("contain", testData.profile.email);
});

Then("I should see a success message", () => {
  cy.get('[data-testid="alert"]')
    .should("be.visible")
    .and("contain", "Profile updated successfully");
});


When("I click on the delete account button", () => {
  cy.intercept("DELETE", "**/api/profile/*", {
    statusCode: 204,
  }).as("deleteProfile");

  cy.window().then((win) => {
    cy.stub(win, "confirm").as("confirmStub").returns(true);
  });

  cy.get('[data-testid="delete-account-button"]').should("be.visible").click();
});

Then("my account should be deleted", () => {
  cy.get("@confirmStub").should("have.been.calledOnce");
  cy.wait("@deleteProfile");
  cy.url().should("include", "/");
  cy.get('[data-testid="alert"]')
    .should("be.visible")
    .and("contain", "Account deleted successfully");
});
