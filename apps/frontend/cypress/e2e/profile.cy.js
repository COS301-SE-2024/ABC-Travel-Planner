describe("View profile info", () => {
    beforeEach(() => {
      cy.login("kabelomotloung95@gmail.com", "Password#1234");
    });
    it("should display account page", () => {
      cy.visit("/account");
        cy.url().should("include", "/account");
    });
    it("Should be able to view profile", () => {
      cy.visit("/account");
      cy.get(`[data-testid="accountContainer"]`).should("exist");


    });
    it("Should be able to view account name", () => {
      cy.visit("/account");
      cy.get(`[data-testid="accountName"]`).should("exist");
      cy.get(`[data-testid="accountName"]`).should("contain", "Kabelo Motloung");

    });
    it("Should display correct account email", () => {
      cy.visit("/account");
      cy.get(`[data-testid="accountEmail"]`).should("exist");
      cy.get(`[data-testid="accountEmail"]`).should("contain", "kabelomotloung95@gmail.com");
        
    });
});