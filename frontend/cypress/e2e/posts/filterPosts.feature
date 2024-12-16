Feature: Filter Blog Posts
  As a blog user
  I want to filter posts by author
  So that I can easily find specific content

  Background:
    Given I am logged in as "testuser"
    And I have the following posts:
      | title          | content        | category    | author     |
      | My First Post  | Test content 1 | Technology  | me         |
      | Second Post    | Test content 2 | Travel      | otheruser  |
      | Another Post   | Test content 3 | Technology  | me         |
      | Travel Story   | Test content 4 | Travel      | otheruser  |

  Scenario: Filter my own posts
    When I click the "my-posts" filter button
    Then I should only see posts by "me"

  Scenario: Filter other users' posts
    When I click the "other-posts" filter button
    Then I should only see posts by "others"

  Scenario: Show all posts
    When I click the "all-posts" filter button
    Then I should see all posts
