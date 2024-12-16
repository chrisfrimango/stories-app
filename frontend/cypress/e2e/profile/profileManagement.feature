Feature: Profile Management
  As a user
  I want to manage my profile
  So that I can maintain my personal information

  Background:
    Given I am logged in as "testuser"
    And I am on my profile page

  Scenario: Edit profile information
    When I click on the edit profile button
    And I update the following information:
      | Field    | Value            |
      | username | updateduser      |
      | email    | updated@test.com |
    And I click "Save Changes"
    Then I should see my updated information
    And I should see a success message

  Scenario: Delete account
    When I click on the delete account button
    Then my account should be deleted
