Feature: User Authentication
  As a user
  I want to authenticate with the system
  So that I can access protected features

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials:
      | email           | password  |
      | test@email.com | Test123!  |
    Then I should be redirected to the dashboard
    And I should see my username in the header

  Scenario: Failed login attempt
    Given I am on the login page
    When I enter invalid credentials:
      | email           | password |
      | test@email.com | wrong    |
    Then I should see an error message
    And I should remain on the login page
