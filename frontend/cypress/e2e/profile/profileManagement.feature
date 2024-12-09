Feature: Profile Management
  As a logged-in user
  I want to manage my profile
  So that I can keep my information up to date

  Background:
    Given I am logged in as "testuser"
    And I am on my profile page

  Scenario: Update profile information
    When I click on "Edit Profile"
    And I update the following information:
      | Field    | Value           |
      | username | updateduser     |
      | bio      | Updated bio     |
    And I click "Save Changes"
    Then I should see my updated information
    And I should see a success message
