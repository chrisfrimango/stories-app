import { defineConfig } from "cypress";

describe("Posts API", () => {
  beforeEach(() => {
    // Rensa och seeda databasen före varje test
    cy.task("db:reset");
    cy.task("db:seed");
  });

  it("GET /api/posts should return correct post structure from database", () => {
    cy.request("GET", "/api/posts").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("posts");
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

  it("POST /api/posts should create and return new post from database", () => {
    const newPost = {
      title: "Test Post",
      content: "Test Content",
      category_id: 1,
    };

    cy.request({
      method: "POST",
      url: "/api/posts",
      body: newPost,
      headers: {
        Authorization: `Bearer ${Cypress.env("auth_token")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);

      // Verify database state
      cy.task("db:query", {
        query: "SELECT * FROM posts WHERE title = $1",
        values: [newPost.title],
      }).then((result) => {
        expect(result.rows[0].title).to.eq(newPost.title);
        expect(result.rows[0].content).to.eq(newPost.content);
      });
    });
  });
});
