describe("Posts API", () => {
  beforeEach(() => {
    cy.intercept("GET", "/src/**/*.tsx", { statusCode: 200 });
    cy.visit("/");
  });

  it("should generate fixtures from current database", () => {
    cy.request({
      url: `${Cypress.env("API_URL")}/posts`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.writeFile("cypress/fixtures/actual-posts.json", response.body);
    });
  });
});

describe("Posts API Structure", () => {
  beforeEach(() => {
    cy.fixture("testData/posts.json").then((postsData) => {
      cy.intercept("GET", `${Cypress.env("API_URL")}/posts`, {
        statusCode: 200,
        body: { posts: postsData.posts },
      }).as("getPosts");
    });

    cy.window().then((win) => {
      win.localStorage.setItem("auth_token", "fake-token");
      win.localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: "1",
          username: "testuser",
          email: "test@example.com",
        })
      );
    });
  });

  it("should return correct post structure", () => {
    cy.request({
      url: `${Cypress.env("API_URL")}/posts`,
      headers: {
        Authorization: `Bearer fake-token`,
      },
    }).then((response) => {
      expect(response.body.posts[0]).to.have.all.keys([
        "id",
        "title",
        "content",
        "user_id",
        "category_id",
        "created_at",
        "updated_at",
        "username",
        "category_name",
      ]);
    });
  });
});
