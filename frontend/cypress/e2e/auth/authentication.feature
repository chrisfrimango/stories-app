Feature: User Authentication
  As a user
  I want to authenticate with the system
  So that I can access protected features

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter valid credentials:
      | email           | password  |
      | test@email.com | Test123!  |
    Then I should be redirected to the blog
    And I should see my username in on the blog page

  Scenario: Failed login with invalid password
    When I enter invalid credentials:
      | email           | password    |
      | test@email.com | WrongPass!  |
    Then I should see an error message
    And I should remain on the login page

  Scenario: Failed login with invalid email
    When I enter invalid credentials:
      | email              | password  |
      | wrong@email.com    | Test123!  |
    Then I should see an error message
    And I should remain on the login page
