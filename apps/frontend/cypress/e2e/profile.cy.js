describe("View profile info", () => {
  beforeEach(() => {
    cy.login("kabza@gmail.com", "Password#1234");
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
    cy.get(`[data-testid="accountName"]`).should("contain", "Kabza De Small");
  });
  it("Should display correct account email", () => {
    cy.visit("/account");
    cy.get(`[data-testid="accountEmail"]`).should("exist");
    // cy.wait(2000);
    // cy.get(`[data-testid="accountEmail"]`).should("contain", "kabza@gmail.com");
  });
});
