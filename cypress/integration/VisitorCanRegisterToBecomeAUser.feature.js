describe("User can buy a subscription", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:registration_success.json",
    });
    cy.visit("/");
  });

  context("successfully", () => {
    it("by registrating with valid credentials", () => {
      cy.get('[data-cy="register"]').click();
      cy.get("[data-cy='register-form']").within(() => {
        cy.get("[data-cy='email']").type("user123@mail.com");
        cy.get("[data-cy='password']").type("password");
        cy.get("#password-confirmation").type("password")
        cy.get("[data-cy='submit']").click();
      });
      cy.get("[data-cy=message]").contains(
        "Registration successful, now you have access to El-gaucho mobile app. Visit your appstore!"
      );
    });
  });

  context("with invalid email", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/auth/sign_in",
        response: "fixture:registration_unsuccess.json",
      });
    });

    it("by registrating with valid credentials", () => {
      cy.get('[data-cy="register"]').click();
      cy.get("[data-cy='register-form']").within(() => {
        cy.get("[data-cy='email']").type("usermail.com");
        cy.get("[data-cy='password']").type("password");
        cy.get("#password-confirmation").type("password")
        cy.get("[data-cy='submit']").click();
      });
      cy.get("#message").should("contain", "Email must be valid");
    });
  });
});
