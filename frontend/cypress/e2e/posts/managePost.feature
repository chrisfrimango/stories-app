Feature: Manage Blog Posts
  As a blog author
  I want to manage my posts
  So that I can maintain my blog content

  Background:
    Given I am logged in as "testuser"
    And I have the following posts:
      | title          | content        | category    |
      | First Post    | Test content 1 | Technology  |
      | Second Post   | Test content 2 | Travel      |

  Scenario: Edit an existing post
    When I click on the edit button for "First Post"
    And I update the following fields:
      | Field    | Value               |
      | title    | Updated First Post  |
      | content  | Updated content     |
      | category | Travel             |
    And I click "Save Changes"
    Then I should see the updated post in the list
    And I should see a "Post edited successfully" message

  Scenario: Delete a post
    When I click on the delete button for "Second Post"
    And I confirm the deletion
    Then "Second Post" should not be visible in the list
    And I should see a "Post deleted successfully" message
