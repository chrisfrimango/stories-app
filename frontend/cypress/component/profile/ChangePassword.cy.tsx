/// <reference types="cypress" />
import ChangePassword from "../../../src/components/profile/ChangePassword";

describe("ChangePassword Modal", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
      win.localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: "1",
          username: "testuser",
          email: "test@example.com",
          password: "oldpass",
        })
      );
    });
  });

  it("renders when open", () => {
    cy.mount(<ChangePassword isOpen={true} onClose={() => {}} />);
    cy.get('[data-testid="change-password-modal"]').should("be.visible");
  });

  it("validates password requirements", () => {
    cy.mount(<ChangePassword isOpen={true} onClose={() => {}} />);

    cy.get('[data-testid="current-password-input"]').type("oldpass");
    cy.get('[data-testid="new-password-input"]').type("short");
    cy.get('[data-testid="confirm-password-input"]').type("short");

    cy.get('[data-testid="change-password-save"]').click();
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Password must be at least 6 characters"
    );
  });

  it("validates password match", () => {
    cy.mount(<ChangePassword isOpen={true} onClose={() => {}} />);

    cy.get('[data-testid="current-password-input"]').type("oldpass");
    cy.get('[data-testid="new-password-input"]').type("NewPassword123!");
    cy.get('[data-testid="confirm-password-input"]').type(
      "DifferentPassword123!"
    );

    cy.get('[data-testid="change-password-save"]').click();
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Passwords don't match"
    );
  });

  it("handles successful password change", () => {
    cy.intercept("PUT", "**/api/profile/1/change-password", {
      statusCode: 200,
      body: { message: "Password updated successfully" },
    }).as("changePassword");

    const onCloseSpy = cy.spy().as("onCloseSpy");

    cy.mount(<ChangePassword isOpen={true} onClose={onCloseSpy} />);

    cy.get('[data-testid="current-password-input"]').type("oldpass");
    cy.get('[data-testid="new-password-input"]').type("NewPassword123!");
    cy.get('[data-testid="confirm-password-input"]').type("NewPassword123!");

    cy.get('[data-testid="change-password-save"]').click();
    cy.wait("@changePassword");

    cy.get('[data-testid="alert"]').should(
      "contain",
      "Password changed successfully!"
    );
    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("resets inputs and closes modal when cancel is clicked", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");

    cy.mount(<ChangePassword isOpen={true} onClose={onCloseSpy} />);

    cy.get('[data-testid="current-password-input"]').type("oldpass");
    cy.get('[data-testid="new-password-input"]').type("NewPassword123!");
    cy.get('[data-testid="confirm-password-input"]').type("NewPassword123!");

    cy.get('[data-testid="change-password-cancel"]').click();

    cy.get("@onCloseSpy").should("have.been.called");

    // Re-open to verify inputs are cleared
    cy.mount(<ChangePassword isOpen={true} onClose={onCloseSpy} />);
    cy.get('[data-testid="current-password-input"]').should("have.value", "");
    cy.get('[data-testid="new-password-input"]').should("have.value", "");
    cy.get('[data-testid="confirm-password-input"]').should("have.value", "");
  });
});
