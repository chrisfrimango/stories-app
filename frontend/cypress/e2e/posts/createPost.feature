Feature: Create Blog Post
  As a logged-in user
  I want to create a new blog post
  So that I can share my content with others

  Background:
    Given I am logged in as "testuser"
    Given I am on the blog page

  Scenario: Successfully create a new post
    When I click the "Create Post" button
    And I fill in the following post details:
      | Field    | Value           |
      | title    | Test Post Title |
      | content  | Test content    |
      | category | Technology      |
    And I click "Submit"
    Then I should see a success message "Post created successfully!"
    And I should see my new post in the list

  Scenario: Validation errors when submitting empty form
    When I click the "Create Post" button
    And I click "Submit" without filling the form
    Then I should see validation errors for required fields
