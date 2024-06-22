describe("Interact with login form", () => {
    it("should display the login form", () => {
      cy.visit("/login");
      cy.get(`[data-testid="signInEmail"]`).should("exist");
      cy.get(`[data-testid="signInPassword"]`).should("exist");
      cy.get(`[data-testid="signInSubmit"]`).should("exist");
    });
  
    it("should allow user to fill out and submit the form to login", () => {
      cy.visit("/login");
      cy.get(`[data-testid="signInEmail"]`).type("kabelomotloung95@gmail.com");
      cy.get(`[data-testid="signInPassword"]`).type("Password#1234");
      cy.get(`[data-testid="signInSubmit"]`).click({ force: true});
  
      cy.wait(2000);
      cy.url().should("include", "/home");
    });
  });
