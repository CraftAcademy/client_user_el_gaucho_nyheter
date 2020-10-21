describe("Visitor can read a specific article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:articles_index.json",
    });
  });
  context("successfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/1",
        response: "fixture:articles_show.json",
      });
      cy.visit("/");
    });
    it("visitor can click on an article and read its content", () => {
      cy.get("[data-cy='article-1']").click();
      cy.get("[data-cy='content']").should(
        "contain",
        "Det är fullt möjligt att rädda jordens klimat och utplåna fattigdomen"
      );
      cy.get("[data-cy='image']").should("be.visible")
    });
  });
  context("unsuccessfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/1",
        response: {
          error: "Article not found, try again later!",
        },
        status: 404,
      });
      cy.visit("/");
    });
    it("visitor can click on an article and read its content", () => {
      cy.get("[data-cy='article-1']").click();
      cy.get("[data-cy='error-message']").should(
        "contain",
        "Article not found, try again later!"
      );
    });
  });
});
